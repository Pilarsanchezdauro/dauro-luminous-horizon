import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type VerifyStatus = "valid" | "invalid" | "expired" | "limit";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ status: "invalid" satisfies VerifyStatus, error: "Token is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: purchase, error: purchaseError } = await supabase
      .from("ebook_purchases")
      .select("id, download_count, max_downloads, expires_at, shopify_product_id")
      .eq("download_token", token)
      .maybeSingle();

    if (purchaseError || !purchase) {
      return new Response(
        JSON.stringify({ status: "invalid" satisfies VerifyStatus, error: "Invalid token" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const downloadCount = purchase.download_count ?? 0;
    const maxDownloads = purchase.max_downloads ?? 5;

    if (downloadCount >= maxDownloads) {
      return new Response(
        JSON.stringify({
          status: "limit" satisfies VerifyStatus,
          error: `Download limit reached (${maxDownloads})`,
          remainingDownloads: 0,
          maxDownloads,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (purchase.expires_at && new Date(purchase.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ status: "expired" satisfies VerifyStatus, error: "Download link expired" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { data: ebook, error: ebookError } = await supabase
      .from("product_ebooks")
      .select("ebook_url, product_title, is_active")
      .eq("shopify_product_id", purchase.shopify_product_id)
      .eq("is_active", true)
      .maybeSingle();

    if (ebookError || !ebook) {
      return new Response(
        JSON.stringify({ status: "invalid" satisfies VerifyStatus, error: "Ebook not available" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        status: "valid" satisfies VerifyStatus,
        ebookUrl: ebook.ebook_url,
        productTitle: ebook.product_title,
        remainingDownloads: Math.max(0, maxDownloads - downloadCount),
        maxDownloads,
        expiresAt: purchase.expires_at,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in verify-ebook-download:", errorMessage);
    return new Response(
      JSON.stringify({ status: "invalid" satisfies VerifyStatus, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
