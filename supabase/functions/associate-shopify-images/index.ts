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

// Get ISBN variations: with and without BC prefix
function getISBNVariations(isbn: string | null): string[] {
  if (!isbn) return [];
  
  const cleaned = isbn.replace(/[-\s]/g, '').trim();
  const withoutBC = cleaned.replace(/^BC/i, '');
  const withBC = cleaned.startsWith('BC') || cleaned.startsWith('bc') ? cleaned : `BC${cleaned}`;
  
  const variations: string[] = [];
  
  // Add without BC prefix (most common for images)
  if (withoutBC.length > 0) variations.push(withoutBC);
  
  // Add with BC prefix
  if (withBC !== withoutBC) variations.push(withBC);
  
  // Add original cleaned version if different
  if (!variations.includes(cleaned)) variations.push(cleaned);
  
  return variations;
}

// Normalize title for image matching - multiple variations
function getTitleVariations(title: string): string[] {
  // Get the part before the dash (author separator)
  const mainTitle = title.split('–')[0].split('-')[0].trim();
  
  const variations: string[] = [];
  
  // Variation 1: lowercase with dashes
  const v1 = mainTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars except spaces
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with dashes
  if (v1.length > 2) variations.push(v1);
  
  // Variation 2: lowercase with underscores
  const v2 = mainTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_');
  if (v2.length > 2 && v2 !== v1) variations.push(v2);
  
  // Variation 3: no spaces at all
  const v3 = mainTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  if (v3.length > 2 && v3 !== v1 && v3 !== v2) variations.push(v3);
  
  // Variation 4: Keep original casing with dashes
  const v4 = mainTitle
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  if (v4.length > 2 && !variations.includes(v4.toLowerCase())) variations.push(v4);
  
  return variations;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      baseImageUrl, 
      dryRun = true, 
      limit = 50, 
      sinceId = 0,
      tryByTitle = true,
      analyzeOnly = false
    } = await req.json();
    
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

    console.log(`Fetching products (limit: ${limit}, since_id: ${sinceId}, tryByTitle: ${tryByTitle})...`);
    
    // Fetch products using since_id for pagination
    const url = sinceId > 0 
      ? `https://${shopifyDomain}/admin/api/2024-01/products.json?limit=${limit}&since_id=${sinceId}&fields=id,title,variants,image`
      : `https://${shopifyDomain}/admin/api/2024-01/products.json?limit=${limit}&fields=id,title,variants,image`;
    
    const fetchResponse: Response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });
    
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
      matchType?: string;
      titleVariations?: string[];
      error?: string;
    }> = [];
    
    let matchedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let foundByBarcode = 0;
    let foundByTitle = 0;
    let noBarcode = 0;
    let noImageFound = 0;
    let alreadyHasImage = 0;
    
    // Extensions to try
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];
    
    for (const product of products) {
      const barcode = product.variants[0]?.barcode;
      const hasImage = product.image?.src;
      
      // Track products that already have image
      if (hasImage) {
        alreadyHasImage++;
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
      
      let matchedUrl: string | null = null;
      let matchType: string = '';
      
      // First try by barcode/ISBN with all variations
      if (barcode) {
        const isbnVariations = getISBNVariations(barcode);
        
        if (isbnVariations.length > 0) {
          for (const isbnVar of isbnVariations) {
            if (matchedUrl) break;
            for (const ext of extensions) {
              const testUrl = `${baseImageUrl}${isbnVar}.${ext}`;
              try {
                const checkResponse = await fetch(testUrl, { method: 'HEAD' });
                if (checkResponse.ok) {
                  matchedUrl = testUrl;
                  matchType = 'barcode';
                  foundByBarcode++;
                  console.log(`Found image for ${product.title} by barcode variation "${isbnVar}": ${testUrl}`);
                  break;
                }
              } catch {
                // URL not found
              }
            }
          }
        }
      } else {
        noBarcode++;
      }
      
      // If not found by barcode, try by title variations
      const titleVariations = tryByTitle ? getTitleVariations(product.title) : [];
      
      if (!matchedUrl && tryByTitle && titleVariations.length > 0) {
        for (const variation of titleVariations) {
          if (matchedUrl) break;
          
          for (const ext of extensions) {
            const testUrl = `${baseImageUrl}${variation}.${ext}`;
            try {
              const checkResponse = await fetch(testUrl, { method: 'HEAD' });
              if (checkResponse.ok) {
                matchedUrl = testUrl;
                matchType = 'title';
                foundByTitle++;
                console.log(`Found image for ${product.title} by title variation "${variation}": ${testUrl}`);
                break;
              }
            } catch {
              // URL not found
            }
          }
        }
      }
      
      if (!matchedUrl) {
        noImageFound++;
        results.push({
          productId: product.id,
          title: product.title,
          barcode,
          imageUrl: null,
          status: barcode ? 'no_image_found' : 'skipped_no_barcode',
          titleVariations: tryByTitle ? titleVariations : undefined,
        });
        continue;
      }
      
      matchedCount++;
      
      if (dryRun || analyzeOnly) {
        results.push({
          productId: product.id,
          title: product.title,
          barcode,
          imageUrl: matchedUrl,
          status: 'would_update',
          matchType,
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
              matchType,
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
              matchType,
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
            matchType,
            error: errorMessage,
          });
        }
      }
    }
    
    // Get the last product ID for pagination
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    
    return new Response(
      JSON.stringify({
        summary: {
          totalProducts: products.length,
          matched: matchedCount,
          updated: updatedCount,
          skipped: skippedCount,
          errors: errorCount,
          dryRun,
          lastProductId,
          hasMore: products.length === limit,
          // Analysis stats
          foundByBarcode,
          foundByTitle,
          noBarcode,
          noImageFound,
          alreadyHasImage,
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
