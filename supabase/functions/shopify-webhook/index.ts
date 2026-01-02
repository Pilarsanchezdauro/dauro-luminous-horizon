import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-shop-domain, x-shopify-topic",
};

// SKU to credits mapping
const SKU_TO_CREDITS: Record<string, number> = {
  "COVER-CREDITS-10": 10,
  "COVER-CREDITS-20": 20,
  "COVER-CREDITS-30": 30,
};

// Send notification to admin about ebook purchase via Formspree
async function sendAdminNotification(
  customerEmail: string, 
  productTitle: string, 
  orderNumber: string,
  formspreeFormId: string
): Promise<boolean> {
  try {
    const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        _replyto: customerEmail,
        _subject: `🎉 Nueva venta de ebook: ${productTitle}`,
        email: "info@grupodauro.com",
        tipo: "Venta de Ebook",
        producto: productTitle,
        cliente_email: customerEmail,
        numero_pedido: orderNumber,
        message: `Se ha realizado una nueva compra de ebook.\n\nProducto: ${productTitle}\nCliente: ${customerEmail}\nNúmero de pedido: ${orderNumber}\n\nEl cliente puede descargar su ebook en: https://grupodauro.com/mis-ebooks`,
      }),
    });

    if (!response.ok) {
      console.error("Formspree error:", await response.text());
      return false;
    }

    console.log(`Admin notification sent for ebook purchase: ${productTitle}`);
    return true;
  } catch (error) {
    console.error("Error sending admin notification via Formspree:", error);
    return false;
  }
}

// Verify Shopify webhook signature
async function verifyShopifyWebhook(body: string, hmacHeader: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(body);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray as any));

  return hashBase64 === hmacHeader;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const shopifyHmac = req.headers.get("x-shopify-hmac-sha256");
    const shopifyTopic = req.headers.get("x-shopify-topic");
    
    console.log("Received Shopify webhook:", { topic: shopifyTopic });

    if (!shopifyHmac) {
      console.error("Missing Shopify HMAC header");
      return new Response(JSON.stringify({ error: "Missing HMAC header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawBody = await req.text();
    const webhookSecret = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    
    if (!webhookSecret) {
      console.error("SHOPIFY_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify webhook authenticity
    const isValid = await verifyShopifyWebhook(rawBody, shopifyHmac, webhookSecret);
    if (!isValid) {
      console.error("Invalid Shopify webhook signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only process order creation events
    if (shopifyTopic !== "orders/create") {
      console.log("Ignoring non-order webhook:", shopifyTopic);
      return new Response(JSON.stringify({ message: "Webhook received but not processed" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = JSON.parse(rawBody);
    console.log("Processing order:", { 
      orderId: order.id, 
      orderNumber: order.order_number,
      email: order.email 
    });

    // Check if order is paid
    if (order.financial_status !== "paid") {
      console.log("Order not paid yet, skipping processing");
      return new Response(JSON.stringify({ message: "Order not paid" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Process each line item in the order
    let totalCreditsAdded = 0;
    const ebookProductIds: { productId: string; title: string; quantity: number }[] = [];
    
    for (const item of order.line_items) {
      const sku = item.sku;
      const quantity = item.quantity;
      const credits = SKU_TO_CREDITS[sku];

      if (credits) {
        const creditsToAdd = credits * quantity;
        console.log(`Found credit product: ${sku}, adding ${creditsToAdd} credits (${credits} x ${quantity})`);
        totalCreditsAdded += creditsToAdd;
      } else {
        // Check if this is an ebook product
        const productId = item.product_id?.toString();
        if (productId) {
          ebookProductIds.push({ 
            productId: `gid://shopify/Product/${productId}`, 
            title: item.title,
            quantity: item.quantity 
          });
        }
        console.log(`Item ${item.title} (SKU: ${sku}) - checking for ebook`);
      }
    }

    // Process ebooks
    const formspreeFormId = Deno.env.get("FORMSPREE_EBOOK_FORM_ID");
    let ebooksProcessed = 0;
    
    for (const ebookItem of ebookProductIds) {
      // Check if this product has an ebook associated
      const { data: productEbook } = await supabase
        .from("product_ebooks")
        .select()
        .eq("shopify_product_id", ebookItem.productId)
        .eq("is_active", true)
        .maybeSingle();

      if (productEbook) {
        console.log(`Found ebook for product: ${ebookItem.title}`);
        
        // Check if purchase already exists for this order/product
        const { data: existingPurchase } = await supabase
          .from("ebook_purchases")
          .select()
          .eq("shopify_order_id", order.id.toString())
          .eq("shopify_product_id", ebookItem.productId)
          .maybeSingle();

        if (existingPurchase) {
          console.log(`Ebook purchase already exists for order ${order.id}, product ${ebookItem.productId}`);
          continue;
        }

        // Create ebook purchase record
        const { data: newPurchase, error: purchaseError } = await supabase
          .from("ebook_purchases")
          .insert({
            email: order.email,
            shopify_order_id: order.id.toString(),
            shopify_product_id: ebookItem.productId,
          })
          .select()
          .single();

        if (purchaseError) {
          console.error("Error creating ebook purchase:", purchaseError);
          continue;
        }

        console.log(`Created ebook purchase with token: ${newPurchase.download_token}`);
        ebooksProcessed++;

        // Send notification to admin via Formspree
        if (formspreeFormId) {
          await sendAdminNotification(
            order.email,
            ebookItem.title,
            order.order_number?.toString() || order.id.toString(),
            formspreeFormId
          );
        } else {
          console.warn("FORMSPREE_EBOOK_FORM_ID not configured, skipping admin notification");
        }
      }
    }

    // If no credits and no ebooks, return early
    if (totalCreditsAdded === 0 && ebooksProcessed === 0) {
      console.log("No credit products or ebooks found in order");
      return new Response(JSON.stringify({ message: "No special products in order" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Skip credit processing if no credits to add
    if (totalCreditsAdded === 0) {
      return new Response(
        JSON.stringify({ 
          message: "Ebooks processed successfully",
          ebooksProcessed: ebooksProcessed,
          email: order.email 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if credits for this order already exist
    const { data: existingCredits } = await supabase
      .from("cover_credits")
      .select()
      .eq("shopify_order_id", order.id.toString())
      .single();

    if (existingCredits) {
      console.log("Credits for this order already assigned");
      return new Response(JSON.stringify({ message: "Credits already assigned" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get existing credits or create new record
    const { data: userCredits } = await supabase
      .from("cover_credits")
      .select()
      .eq("email", order.email)
      .maybeSingle();

    if (userCredits) {
      // Update existing credits
      const { error: updateError } = await supabase
        .from("cover_credits")
        .update({
          credits_remaining: userCredits.credits_remaining + totalCreditsAdded,
          total_credits_purchased: userCredits.total_credits_purchased + totalCreditsAdded,
        })
        .eq("email", order.email);

      if (updateError) {
        console.error("Error updating credits:", updateError);
        throw updateError;
      }

      console.log(`Updated ${order.email}: added ${totalCreditsAdded} credits`);
    } else {
      // Create new credit record
      const { error: insertError } = await supabase
        .from("cover_credits")
        .insert({
          email: order.email,
          credits_remaining: totalCreditsAdded,
          total_credits_purchased: totalCreditsAdded,
          shopify_order_id: order.id.toString(),
        });

      if (insertError) {
        console.error("Error inserting credits:", insertError);
        throw insertError;
      }

      console.log(`Created new credit record for ${order.email}: ${totalCreditsAdded} credits`);
    }

    // Create a record specifically for this order
    const { error: orderRecordError } = await supabase
      .from("cover_credits")
      .insert({
        email: order.email,
        credits_remaining: 0, // Already added to main account
        total_credits_purchased: totalCreditsAdded,
        shopify_order_id: order.id.toString(),
      });

    if (orderRecordError) {
      console.log("Note: Could not create order record (this is OK if it already exists)");
    }

    return new Response(
      JSON.stringify({ 
        message: "Order processed successfully",
        credits: totalCreditsAdded,
        ebooksProcessed: ebooksProcessed,
        email: order.email 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
