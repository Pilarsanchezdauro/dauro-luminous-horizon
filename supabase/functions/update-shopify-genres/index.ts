import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { products, dryRun = true } = await req.json();
    
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No products provided');
    }

    const shopifyAccessToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    const shopifyStoreDomain = 'dauro-luminous-horizon-6vj19.myshopify.com';
    
    if (!shopifyAccessToken) {
      throw new Error('SHOPIFY_ACCESS_TOKEN not configured');
    }

    console.log(`Processing ${products.length} products for genre update (dryRun: ${dryRun})`);

    const results: UpdateResult[] = [];
    let updatedCount = 0;
    let errorCount = 0;

    for (const product of products as GenreUpdate[]) {
      const { handle, title, genre } = product;

      if (!handle || !genre) {
        results.push({
          success: false,
          handle: handle || 'unknown',
          title: title || 'unknown',
          genre: genre || 'unknown',
          error: 'Missing handle or genre',
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
          error: `Would update product_type to: "${genre}"`,
        });
        updatedCount++;
        continue;
      }

      try {
        // First, get the product ID by handle
        const getProductResponse = await fetch(
          `https://${shopifyStoreDomain}/admin/api/2024-01/products.json?handle=${encodeURIComponent(handle)}`,
          {
            headers: {
              'X-Shopify-Access-Token': shopifyAccessToken,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!getProductResponse.ok) {
          const errorText = await getProductResponse.text();
          results.push({
            success: false,
            handle,
            title,
            genre,
            error: `Failed to fetch product: ${getProductResponse.status} - ${errorText}`,
          });
          errorCount++;
          continue;
        }

        const productData = await getProductResponse.json();
        
        if (!productData.products || productData.products.length === 0) {
          results.push({
            success: false,
            handle,
            title,
            genre,
            error: 'Product not found',
          });
          errorCount++;
          continue;
        }

        const shopifyProduct = productData.products[0];

        // Update the product with the genre as product_type
        const updateResponse = await fetch(
          `https://${shopifyStoreDomain}/admin/api/2024-01/products/${shopifyProduct.id}.json`,
          {
            method: 'PUT',
            headers: {
              'X-Shopify-Access-Token': shopifyAccessToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product: {
                id: shopifyProduct.id,
                product_type: genre,
              },
            }),
          }
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          results.push({
            success: false,
            handle,
            title,
            genre,
            error: `Update failed: ${updateResponse.status} - ${errorText}`,
          });
          errorCount++;
        } else {
          updatedCount++;
          results.push({
            success: true,
            handle,
            title,
            genre,
          });
          console.log(`Updated: ${handle} -> ${genre}`);
        }

        // Rate limiting - Shopify allows ~2 requests/second
        await new Promise(resolve => setTimeout(resolve, 600));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
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

    console.log('Summary:', summary);

    return new Response(
      JSON.stringify({
        success: true,
        summary,
        results: results.slice(0, 100), // Limit results for response size
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
