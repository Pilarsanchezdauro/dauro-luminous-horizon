import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[MIRLO-KEY-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    // For now, we'll process without signature verification
    // In production, you should set up STRIPE_WEBHOOK_SECRET
    const webhookSecret = Deno.env.get("STRIPE_MIRLO_WEBHOOK_SECRET");
    
    let event: Stripe.Event;
    
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        logStep("Webhook signature verified");
      } catch (err) {
        logStep("Webhook signature verification failed", { error: String(err) });
        return new Response(JSON.stringify({ error: "Webhook signature verification failed" }), {
          status: 400,
        });
      }
    } else {
      // Parse event without verification (for development)
      event = JSON.parse(body);
      logStep("Webhook parsed without signature verification");
    }

    logStep("Event type", { type: event.type });

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      logStep("Processing completed checkout", { 
        sessionId: session.id, 
        customerEmail: session.customer_email,
        paymentStatus: session.payment_status 
      });

      if (session.payment_status === "paid") {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        
        if (!supabaseUrl || !supabaseServiceKey) {
          throw new Error("Supabase credentials not configured");
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Update the purchase record to completed
        const { data: updatedPurchase, error: updateError } = await supabase
          .from("mirlo_key_purchases")
          .update({ 
            status: "completed",
            email: session.customer_email || session.customer_details?.email || "unknown@email.com",
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq("stripe_session_id", session.id)
          .select()
          .single();

        if (updateError) {
          logStep("Error updating purchase", { error: updateError.message });
          
          // If no record exists, create one
          if (updateError.code === "PGRST116") {
            const tier = session.metadata?.tier || "bronce";
            const certificateId = `MK-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
            
            const { error: insertError } = await supabase
              .from("mirlo_key_purchases")
              .insert({
                email: session.customer_email || session.customer_details?.email || "unknown@email.com",
                tier: tier,
                certificate_id: certificateId,
                stripe_session_id: session.id,
                stripe_payment_intent_id: session.payment_intent as string,
                amount_paid: session.amount_total || 0,
                currency: session.currency || "eur",
                status: "completed",
              });

            if (insertError) {
              logStep("Error creating purchase record", { error: insertError.message });
            } else {
              logStep("New purchase record created", { certificateId });
            }
          }
        } else {
          logStep("Purchase updated to completed", { 
            certificateId: updatedPurchase?.certificate_id 
          });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in mirlo-key-webhook", { message: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
