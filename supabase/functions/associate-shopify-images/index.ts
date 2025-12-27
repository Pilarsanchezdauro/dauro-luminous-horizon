import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ShopifyProduct {
  id: number;
  title: string;
  variants: Array<{
    barcode: string | null;
  }>;
  image: { src?: string } | null;
}

// Normalize ISBN: remove dashes, spaces, and BC prefix
function normalizeISBN(isbn: string | null): string | null {
  if (!isbn) return null;
  return isbn.replace(/[-\s]/g, '').replace(/^BC/i, '').trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { baseImageUrl, dryRun = true, limit = 50, offset = 0 } = await req.json();
    
    if (!baseImageUrl) {
      return new Response(
        JSON.stringify({ error: 'baseImageUrl is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const shopifyDomain = 'dauro-luminous-horizon-6vj19.myshopify.com';
    const accessToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    
    if (!accessToken) {
      throw new Error('Shopify access token not configured');
    }

    console.log(`Fetching products (limit: ${limit}, offset: ${offset})...`);
    
    // Fetch products without images only
    const fetchResponse: Response = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/products.json?limit=${limit}&fields=id,title,variants,image`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!fetchResponse.ok) {
      throw new Error(`Failed to fetch products: ${fetchResponse.status}`);
    }
    
    const data = await fetchResponse.json();
    const products: ShopifyProduct[] = data.products;
    
    console.log(`Processing ${products.length} products`);
    
    const results: Array<{
      productId: number;
      title: string;
      barcode: string | null;
      imageUrl: string | null;
      status: string;
      error?: string;
    }> = [];
    
    let matchedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Extensions to try
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];
    
    for (const product of products) {
      const barcode = product.variants[0]?.barcode;
      const hasImage = product.image?.src;
      
      if (!barcode) {
        results.push({
          productId: product.id,
          title: product.title,
          barcode: null,
          imageUrl: null,
          status: 'skipped_no_barcode',
        });
        skippedCount++;
        continue;
      }
      
      if (hasImage) {
        results.push({
          productId: product.id,
          title: product.title,
          barcode,
          imageUrl: hasImage,
          status: 'skipped_has_image',
        });
        skippedCount++;
        continue;
      }
      
      // Try to find matching image with normalized ISBN
      const normalizedISBN = normalizeISBN(barcode);
      let matchedUrl: string | null = null;
      
      if (normalizedISBN) {
        for (const ext of extensions) {
          const url = `${baseImageUrl}${normalizedISBN}.${ext}`;
          try {
            const checkResponse = await fetch(url, { method: 'HEAD' });
            if (checkResponse.ok) {
              matchedUrl = url;
              console.log(`Found image for ${product.title}: ${url}`);
              break;
            }
          } catch {
            // URL not found
          }
        }
      }
      
      if (!matchedUrl) {
        results.push({
          productId: product.id,
          title: product.title,
          barcode,
          imageUrl: null,
          status: 'no_image_found',
        });
        continue;
      }
      
      matchedCount++;
      
      if (dryRun) {
        results.push({
          productId: product.id,
          title: product.title,
          barcode,
          imageUrl: matchedUrl,
          status: 'would_update',
        });
      } else {
        // Update product with image
        try {
          const updateResponse = await fetch(
            `https://${shopifyDomain}/admin/api/2024-01/products/${product.id}.json`,
            {
              method: 'PUT',
              headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                product: {
                  id: product.id,
                  images: [{ src: matchedUrl }],
                },
              }),
            }
          );
          
          if (updateResponse.ok) {
            updatedCount++;
            console.log(`Updated ${product.title}`);
            results.push({
              productId: product.id,
              title: product.title,
              barcode,
              imageUrl: matchedUrl,
              status: 'updated',
            });
          } else {
            const errorText = await updateResponse.text();
            errorCount++;
            results.push({
              productId: product.id,
              title: product.title,
              barcode,
              imageUrl: matchedUrl,
              status: 'update_failed',
              error: errorText,
            });
          }
          
          // Rate limiting - 2 requests per second
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (e: unknown) {
          errorCount++;
          const errorMessage = e instanceof Error ? e.message : String(e);
          results.push({
            productId: product.id,
            title: product.title,
            barcode,
            imageUrl: matchedUrl,
            status: 'update_error',
            error: errorMessage,
          });
        }
      }
    }
    
    return new Response(
      JSON.stringify({
        summary: {
          totalProducts: products.length,
          matched: matchedCount,
          updated: updatedCount,
          skipped: skippedCount,
          errors: errorCount,
          dryRun,
        },
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
