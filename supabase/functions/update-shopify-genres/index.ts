import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenreUpdate {
  handle: string;
  title: string;
  genre: string;
}

interface UpdateResult {
  success: boolean;
  handle: string;
  title: string;
  genre: string;
  error?: string;
}

const SHOPIFY_ADMIN_API_VERSION = "2025-07";
const SHOPIFY_STORE_DOMAIN = "dauro-luminous-horizon-6vj19.myshopify.com";

async function adminGraphqlRequest(query: string, variables: Record<string, unknown>) {
  const shopifyAccessToken =
    Deno.env.get("SHOPIFY_ADMIN_ACCESS_TOKEN") || Deno.env.get("SHOPIFY_ACCESS_TOKEN");

  if (!shopifyAccessToken) {
    throw new Error("SHOPIFY_ACCESS_TOKEN not configured");
  }

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Admin GraphQL HTTP ${res.status}: ${text}`);
  }

  const json = JSON.parse(text);
  if (json.errors?.length) {
    throw new Error(
      `Admin GraphQL errors: ${json.errors.map((e: any) => e.message).join(", ")}`,
    );
  }

  return json.data;
}

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      productType
    }
  }
`;

const PRODUCT_UPDATE_MUTATION = `
  mutation ProductUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        productType
      }
      userErrors {
        field
        message
      }
    }
  }
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { products, dryRun = true } = await req.json();

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error("No products provided");
    }

    console.log(
      `update-shopify-genres: processing ${products.length} products (dryRun: ${dryRun})`,
    );

    const results: UpdateResult[] = [];
    let updatedCount = 0;
    let errorCount = 0;

    for (const product of products as GenreUpdate[]) {
      const { handle, title, genre } = product;

      // Permitir "Sin categoría" (""), pero no undefined/null
      if (!handle || genre === undefined || genre === null) {
        results.push({
          success: false,
          handle: handle || "unknown",
          title: title || "unknown",
          genre: (genre as any) ?? "unknown",
          error: "Missing handle or genre",
        });
        errorCount++;
        continue;
      }

      if (dryRun) {
        results.push({
          success: true,
          handle,
          title,
          genre,
          error: `Would update productType to: "${genre}"`,
        });
        updatedCount++;
        continue;
      }

      try {
        // 1) Obtener el ID real por handle (evita actualizar productos equivocados)
        const data = await adminGraphqlRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        const productNode = data?.productByHandle;

        if (!productNode?.id) {
          results.push({
            success: false,
            handle,
            title,
            genre,
            error: "Product not found by handle",
          });
          errorCount++;
          continue;
        }

        // 2) Actualizar "Tipo de producto" (productType)
        const upd = await adminGraphqlRequest(PRODUCT_UPDATE_MUTATION, {
          input: {
            id: productNode.id,
            productType: genre,
          },
        });

        const userErrors = upd?.productUpdate?.userErrors ?? [];
        if (userErrors.length > 0) {
          const msg = userErrors.map((e: any) => e.message).join(", ");
          results.push({
            success: false,
            handle,
            title,
            genre,
            error: `Update failed: ${msg}`,
          });
          errorCount++;
          continue;
        }

        results.push({ success: true, handle, title, genre });
        updatedCount++;
        console.log(`Updated productType: ${handle} -> ${genre}`);

        // Rate limiting suave
        await new Promise((r) => setTimeout(r, 350));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        results.push({
          success: false,
          handle,
          title,
          genre,
          error: `Update error: ${errorMessage}`,
        });
        errorCount++;
      }
    }

    const summary = {
      totalProducts: products.length,
      updated: updatedCount,
      errors: errorCount,
      dryRun,
    };

    console.log("Summary:", summary);

    return new Response(
      JSON.stringify({
        success: true,
        summary,
        results: results.slice(0, 100),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error:", err);
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
