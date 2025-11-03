import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  try {
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured");
    }

    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );

    console.log("Webhook event received:", event.type);

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.payment_status === "paid" && session.metadata) {
        const { credits, email } = session.metadata;
        
        if (!credits || !email) {
          console.error("Missing metadata in session:", session.metadata);
          return new Response("Missing metadata", { status: 400 });
        }

        const supabase = createClient(
          Deno.env.get("SUPABASE_URL") ?? "",
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // Check if record already exists for this payment
        const { data: existingRecord } = await supabase
          .from("cover_credits")
          .select("*")
          .eq("stripe_payment_intent_id", session.payment_intent as string)
          .single();

        if (existingRecord) {
          console.log("Credits already added for this payment:", session.payment_intent);
          return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        // Check if user has existing credits
        const { data: existingCredits } = await supabase
          .from("cover_credits")
          .select("*")
          .eq("email", email)
          .single();

        const creditsToAdd = parseInt(credits);

        if (existingCredits) {
          // Update existing record
          const { error } = await supabase
            .from("cover_credits")
            .update({
              credits_remaining: existingCredits.credits_remaining + creditsToAdd,
              total_credits_purchased: existingCredits.total_credits_purchased + creditsToAdd,
              stripe_payment_intent_id: session.payment_intent as string,
              stripe_customer_id: session.customer as string
            })
            .eq("id", existingCredits.id);

          if (error) {
            console.error("Error updating credits:", error);
            throw error;
          }
        } else {
          // Create new record
          const { error } = await supabase
            .from("cover_credits")
            .insert({
              email,
              credits_remaining: creditsToAdd,
              total_credits_purchased: creditsToAdd,
              stripe_payment_intent_id: session.payment_intent as string,
              stripe_customer_id: session.customer as string
            });

          if (error) {
            console.error("Error inserting credits:", error);
            throw error;
          }
        }

        console.log(`Successfully added ${creditsToAdd} credits for ${email}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
