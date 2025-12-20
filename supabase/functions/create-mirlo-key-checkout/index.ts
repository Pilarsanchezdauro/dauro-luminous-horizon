import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[MIRLO-KEY-CHECKOUT] ${step}${detailsStr}`);
};

// Mapeo de precios a niveles y montos
const PRICE_MAP: Record<string, { tier: string; amount: number }> = {
  "price_1SgNvrKwgkYylEGzQFuT3ahP": { tier: "bronce", amount: 3000 },
  "price_1SgNw6KwgkYylEGzzh79WJg4": { tier: "plata", amount: 7500 },
  "price_1SgNwJKwgkYylEGzp43kTg3G": { tier: "oro", amount: 25000 },
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    logStep("Stripe key verified");

    const { priceId, tierName, email } = await req.json();
    
    if (!priceId) {
      throw new Error("Price ID is required");
    }
    
    const priceInfo = PRICE_MAP[priceId];
    if (!priceInfo) {
      throw new Error("Invalid price ID");
    }
    
    logStep("Request parsed", { priceId, tierName, email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get origin for redirect URLs
    const origin = req.headers.get("origin") || "https://grupodauro.com";
    logStep("Using origin", { origin });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/mirlo-key?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/mirlo-key?canceled=true`,
      customer_email: email || undefined,
      metadata: {
        product: "Dauro Mirlo Key",
        tier: priceInfo.tier,
      },
      payment_intent_data: {
        metadata: {
          product: "Dauro Mirlo Key",
          tier: priceInfo.tier,
        },
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Initialize Supabase client with service role to insert the purchase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Generate certificate ID
      const certificateId = `MK-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
      
      // Register purchase as pending
      const { error: insertError } = await supabase
        .from("mirlo_key_purchases")
        .insert({
          email: email || "pending@checkout.com",
          tier: priceInfo.tier,
          certificate_id: certificateId,
          stripe_session_id: session.id,
          amount_paid: priceInfo.amount,
          currency: "eur",
          status: "pending",
        });
      
      if (insertError) {
        logStep("Error inserting purchase record", { error: insertError.message });
      } else {
        logStep("Purchase record created", { certificateId, status: "pending" });
      }
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-mirlo-key-checkout", { message: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
