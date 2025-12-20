import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[MIRLO-KEY-CHECKOUT] ${step}${detailsStr}`);
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

    const { priceId, tierName } = await req.json();
    
    if (!priceId) {
      throw new Error("Price ID is required");
    }
    logStep("Request parsed", { priceId, tierName });

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
      success_url: `${origin}/mirlo-key?success=true&tier=${encodeURIComponent(tierName || '')}`,
      cancel_url: `${origin}/mirlo-key?canceled=true`,
      metadata: {
        product: "Dauro Mirlo Key",
        tier: tierName || "Unknown",
      },
      payment_intent_data: {
        metadata: {
          product: "Dauro Mirlo Key",
          tier: tierName || "Unknown",
        },
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

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
