import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from("ebook_purchases")
      .select("*")
      .eq("download_token", token)
      .single();

    if (purchaseError || !purchase) {
      console.error("Purchase not found:", purchaseError);
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check limits
    if (purchase.download_count >= purchase.max_downloads) {
      return new Response(
        JSON.stringify({ error: "Download limit reached" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (new Date(purchase.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Download link expired" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Increment purchase download count
    const { error: updateError } = await supabase
      .from("ebook_purchases")
      .update({ download_count: purchase.download_count + 1 })
      .eq("id", purchase.id);

    if (updateError) {
      console.error("Error updating purchase:", updateError);
    }

    // Get and increment product ebook download count
    const { data: ebook } = await supabase
      .from("product_ebooks")
      .select("download_count")
      .eq("shopify_product_id", purchase.shopify_product_id)
      .single();

    if (ebook) {
      await supabase
        .from("product_ebooks")
        .update({ download_count: (ebook.download_count || 0) + 1 })
        .eq("shopify_product_id", purchase.shopify_product_id);
    }

    console.log(`Download incremented for token: ${token}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in increment-ebook-download:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});