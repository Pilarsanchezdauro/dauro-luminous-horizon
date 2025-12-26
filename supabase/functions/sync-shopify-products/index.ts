import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ExcelProduct {
  codigo: string;
  titulo: string;
  isbn: string;
  familia: string;
  pvp: number;
  descripcion: string;
  editorial: string;
}

interface UpdateResult {
  success: boolean;
  productId?: number;
  title: string;
  error?: string;
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanDescription(desc: string): string {
  if (!desc) return '';
  
  return desc
    .replace(/\\</g, '<')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\[0\]/g, '')
    .replace(/ACCEDE A LA LECTURA DE LAS PRIMERAS PÁGINAS.*/gi, '')
    .trim();
}

function cleanFamilia(familia: string): string {
  if (!familia) return '';
  // Remove [01], [02], etc. prefix
  return familia.replace(/^\[\d+\]\s*/, '').trim();
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { products: excelProducts, dryRun = true } = await req.json();
    
    if (!Array.isArray(excelProducts) || excelProducts.length === 0) {
      throw new Error('No products provided');
    }

    const shopifyAccessToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    const shopifyStoreDomain = 'dauro-luminous-horizon-6vj19.myshopify.com';
    
    if (!shopifyAccessToken) {
      throw new Error('SHOPIFY_ACCESS_TOKEN not configured');
    }

    console.log(`Processing ${excelProducts.length} products from Excel (dryRun: ${dryRun})`);

    // Fetch all Shopify products
    const allShopifyProducts: any[] = [];
    let nextPageUrl: string | null = `https://${shopifyStoreDomain}/admin/api/2024-01/products.json?limit=250`;
    
    while (nextPageUrl) {
      console.log(`Fetching products from: ${nextPageUrl}`);
      
      const response: Response = await fetch(nextPageUrl, {
        headers: {
          'X-Shopify-Access-Token': shopifyAccessToken,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch Shopify products: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      allShopifyProducts.push(...data.products);
      
      // Check for pagination
      const linkHeader: string | null = response.headers.get('Link');
      if (linkHeader) {
        const nextMatch: RegExpMatchArray | null = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        nextPageUrl = nextMatch ? nextMatch[1] : null;
      } else {
        nextPageUrl = null;
      }
    }

    console.log(`Fetched ${allShopifyProducts.length} products from Shopify`);

    // Create a map of normalized titles to Shopify products
    const shopifyProductMap = new Map<string, any>();
    for (const product of allShopifyProducts) {
      const normalizedTitle = normalizeTitle(product.title);
      shopifyProductMap.set(normalizedTitle, product);
      
      // Also try without author part (after – or -)
      const titleWithoutAuthor = product.title.split(/\s*[–-]\s*/)[0];
      const normalizedWithoutAuthor = normalizeTitle(titleWithoutAuthor);
      if (!shopifyProductMap.has(normalizedWithoutAuthor)) {
        shopifyProductMap.set(normalizedWithoutAuthor, product);
      }
    }

    const results: UpdateResult[] = [];
    let matchedCount = 0;
    let updatedCount = 0;

    for (const excelProduct of excelProducts) {
      const normalizedExcelTitle = normalizeTitle(excelProduct.titulo);
      
      // Try to find matching Shopify product
      let shopifyProduct = shopifyProductMap.get(normalizedExcelTitle);
      
      // If not found, try without EBOOK suffix
      if (!shopifyProduct) {
        const titleWithoutEbook = normalizedExcelTitle.replace(/\s*ebook\s*$/i, '');
        shopifyProduct = shopifyProductMap.get(titleWithoutEbook);
      }

      if (!shopifyProduct) {
        results.push({
          success: false,
          title: excelProduct.titulo,
          error: 'No matching Shopify product found',
        });
        continue;
      }

      matchedCount++;

      // Prepare update data
      const cleanedDescription = cleanDescription(excelProduct.descripcion);
      const cleanedFamilia = cleanFamilia(excelProduct.familia);

      if (dryRun) {
        results.push({
          success: true,
          productId: shopifyProduct.id,
          title: shopifyProduct.title,
          error: `Would update: body_html (${cleanedDescription.length} chars), product_type: "${cleanedFamilia}"`,
        });
      } else {
        // Actually update the product
        try {
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
                  body_html: cleanedDescription,
                  product_type: cleanedFamilia || shopifyProduct.product_type,
                },
              }),
            }
          );

          if (!updateResponse.ok) {
            const errorText = await updateResponse.text();
            results.push({
              success: false,
              productId: shopifyProduct.id,
              title: shopifyProduct.title,
              error: `Update failed: ${updateResponse.status} - ${errorText}`,
            });
          } else {
            updatedCount++;
            results.push({
              success: true,
              productId: shopifyProduct.id,
              title: shopifyProduct.title,
            });
          }

          // Rate limiting - Shopify allows ~2 requests/second
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          results.push({
            success: false,
            productId: shopifyProduct.id,
            title: shopifyProduct.title,
            error: `Update error: ${errorMessage}`,
          });
        }
      }
    }

    const summary = {
      totalExcelProducts: excelProducts.length,
      totalShopifyProducts: allShopifyProducts.length,
      matched: matchedCount,
      updated: updatedCount,
      notFound: excelProducts.length - matchedCount,
      dryRun,
    };

    console.log('Summary:', summary);

    return new Response(
      JSON.stringify({
        success: true,
        summary,
        results: results.slice(0, 50), // Limit results to first 50 for response size
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
