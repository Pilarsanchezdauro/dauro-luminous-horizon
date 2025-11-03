import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Credit packages configuration
const PACKAGES = {
  '10': {
    price_id: 'price_1SPWnFKwgkYylEGzBbUhvh69',
    credits: 10,
    name: 'Paquete 10 Portadas'
  },
  '20': {
    price_id: 'price_1SPWnZKwgkYylEGzrwcQuheP',
    credits: 20,
    name: 'Paquete 20 Portadas'
  },
  '30': {
    price_id: 'price_1SPWnrKwgkYylEGzE0psqYRx',
    credits: 30,
    name: 'Paquete 30 Portadas'
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { package_id, email }: { package_id: '10' | '20' | '30'; email: string } = await req.json();

    if (!package_id || !PACKAGES[package_id]) {
      throw new Error("Invalid package ID");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const selectedPackage = PACKAGES[package_id];

    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: selectedPackage.price_id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/generador-portadas?payment=success`,
      cancel_url: `${req.headers.get("origin")}/generador-portadas?payment=canceled`,
      metadata: {
        credits: selectedPackage.credits.toString(),
        email: email,
        package_name: selectedPackage.name
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
