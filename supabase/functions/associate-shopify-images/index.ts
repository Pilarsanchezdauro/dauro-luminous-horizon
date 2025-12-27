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

// Normalize ISBN: remove dashes and spaces
function normalizeISBN(isbn: string | null): string | null {
  if (!isbn) return null;
  return isbn.replace(/[-\s]/g, '').trim();
}

// Try different ISBN formats to find matching image URL
function findMatchingImageUrl(
  barcode: string, 
  baseUrl: string, 
  extension: string = 'jpg'
): string[] {
  const normalized = normalizeISBN(barcode);
  if (!normalized) return [];
  
  // Try various formats
  const formats = [
    normalized, // Plain: 9788417458270
    barcode, // Original with dashes: 978-84-17458-27-0
    barcode.replace(/-/g, ''), // Without dashes
    `BC${normalized}`, // With BC prefix
    `BC${barcode.replace(/-/g, '')}`,
  ];
  
  const urls: string[] = [];
  const extensions = [extension, 'jpg', 'jpeg', 'png', 'webp'];
  
  for (const format of formats) {
    for (const ext of extensions) {
      urls.push(`${baseUrl}${format}.${ext}`);
    }
  }
  
  return [...new Set(urls)]; // Remove duplicates
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { baseImageUrl, dryRun = true, extension = 'jpg' } = await req.json();
    
    if (!baseImageUrl) {
      return new Response(
        JSON.stringify({ error: 'baseImageUrl is required. Example: https://cdn.shopify.com/s/files/1/xxxx/xxxx/files/' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const shopifyDomain = Deno.env.get('SHOPIFY_STORE_DOMAIN');
    const accessToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    
    if (!shopifyDomain || !accessToken) {
      throw new Error('Shopify credentials not configured');
    }

    console.log('Fetching all products from Shopify...');
    
    // Fetch all products
    let allProducts: ShopifyProduct[] = [];
    let nextPageUrl: string | null = `https://${shopifyDomain}/admin/api/2024-01/products.json?limit=250`;
    
    while (nextPageUrl) {
      const fetchResponse: Response = await fetch(nextPageUrl, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      });
      
      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch products: ${fetchResponse.status}`);
      }
      
      const data = await fetchResponse.json();
      allProducts = allProducts.concat(data.products);
      
      // Check for pagination
      const linkHeader: string | null = fetchResponse.headers.get('Link');
      if (linkHeader && linkHeader.includes('rel="next"')) {
        const matchResult: RegExpMatchArray | null = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        nextPageUrl = matchResult ? matchResult[1] : null;
      } else {
        nextPageUrl = null;
      }
    }
    
    console.log(`Found ${allProducts.length} products`);
    
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
    
    for (const product of allProducts) {
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
      
      // Try to find matching image
      const possibleUrls = findMatchingImageUrl(barcode, baseImageUrl, extension);
      let matchedUrl: string | null = null;
      
      for (const url of possibleUrls) {
        try {
          const checkResponse = await fetch(url, { method: 'HEAD' });
          if (checkResponse.ok) {
            matchedUrl = url;
            break;
          }
        } catch (e) {
          // URL not found, continue
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
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 300));
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
          totalProducts: allProducts.length,
          matched: matchedCount,
          updated: updatedCount,
          skipped: skippedCount,
          errors: errorCount,
          dryRun,
        },
        results: results.slice(0, 100), // Limit results for response size
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
