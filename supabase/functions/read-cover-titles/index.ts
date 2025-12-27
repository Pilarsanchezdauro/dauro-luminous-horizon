/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SHOPIFY_STORE = Deno.env.get('SHOPIFY_STORE_URL') || 'dauro-libros.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const AI_GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';

// Normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate similarity between two strings
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);
  
  if (s1 === s2) return 1;
  
  const words1 = s1.split(' ').filter(w => w.length > 2);
  const words2 = s2.split(' ').filter(w => w.length > 2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  let matches = 0;
  for (const word of words1) {
    if (words2.some(w => w.includes(word) || word.includes(w))) {
      matches++;
    }
  }
  
  return matches / Math.max(words1.length, words2.length);
}

// Fetch image and convert to base64
async function fetchImageAsBase64(imageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(`Failed to fetch image ${imageUrl}: ${response.status}`);
      return null;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);
    
    // Determine mime type from URL
    const ext = imageUrl.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
    
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`Error fetching image ${imageUrl}:`, error);
    return null;
  }
}

// Read title from cover image using AI vision
async function readCoverTitle(imageUrl: string, filename: string): Promise<string | null> {
  try {
    // First, fetch the image and convert to base64
    console.log(`  Fetching image...`);
    const base64Image = await fetchImageAsBase64(imageUrl);
    if (!base64Image) {
      console.error(`  Could not fetch image`);
      return null;
    }
    
    console.log(`  Sending to AI...`);
    const response = await fetch(AI_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Lee el título del libro que aparece en esta portada. Responde SOLO con el título exacto del libro, sin autor ni editorial ni subtítulo. Si no puedes leer el título claramente, responde exactamente "NO_TITLE".'
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        max_tokens: 100
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI API error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();
    const title = data.choices?.[0]?.message?.content?.trim();
    
    if (!title || title === 'NO_TITLE' || title.includes('NO_TITLE')) {
      return null;
    }
    
    return title;
  } catch (error) {
    console.error('Error reading cover:', error);
    return null;
  }
}

// Get products without images from Shopify
async function getProductsWithoutImages(limit: number = 50): Promise<any[]> {
  const url = `https://${SHOPIFY_STORE}/admin/api/2024-10/products.json?limit=${limit}&fields=id,title,images`;

  console.log(`Fetching products from Shopify: ${url}`);
  
  const response = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN!,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Shopify API error: ${response.status} - ${errorText}`);
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const data = await response.json();
  // Filter products without images
  const productsWithoutImages = data.products.filter((p: any) => !p.images || p.images.length === 0);
  console.log(`Found ${productsWithoutImages.length} products without images out of ${data.products.length} total`);
  return productsWithoutImages;
}

// Get all available cover images from CDN (already uploaded to Shopify Files)
function getAvailableCovers(): { filename: string; url: string }[] {
  // Use the production URL which is publicly accessible
  const baseUrl = 'https://www.grupodauro.com/products/';
  
  const files = [
    'aecio.jpg',
    'boabdil.jpg',
    'codigo-h-dinero.jpg',
    'del-palmar-de-troya.jpg',
    'el-arte-de-brindar.jpg',
    'el-hidalgo-don-rodrigo.jpg',
    'elena-alpujarra.jpg',
    'elucubraciones.jpg',
    'horizonte-interior.jpg',
    'impulso-integral.jpg',
    'jungla.jpg',
    'la-abadesa-santa-isabel.jpg',
    'la-caza-captura-muerte-abuelita.jpg',
    'la-ultima-condena.jpg',
    'latido-apasionadamente-vuestro.jpg',
    'migracion-revolucion-interior.jpg',
    'miguel-hernandez-contraluz.jpg',
    'mundos-perdidos.jpg',
    'no-volveran-oscuras-golondrinas.jpg',
    'sonido-agua-acequias.jpg',
    'tiempos-de-candil.jpg',
    'una-vida-redonda.jpg',
    'una-voz-dos-tierras.jpg',
    'yo-soy-todos-los-besos.jpg',
  ];

  return files.map(f => ({ filename: f, url: baseUrl + f }));
}

// Upload image to Shopify
async function uploadImageToProduct(productId: string, imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/2024-10/products/${productId}/images.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: { src: imageUrl }
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error(`Error uploading image to product ${productId}:`, error);
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dryRun = true, limit = 10 } = await req.json();

    console.log(`Starting cover reading (dryRun: ${dryRun}, limit: ${limit})...`);

    // Get available covers
    const covers = getAvailableCovers();
    console.log(`Found ${covers.length} cover images to analyze`);

    // Read titles from covers using AI vision
    const coverTitles: { filename: string; url: string; title: string }[] = [];
    
    for (const cover of covers.slice(0, limit)) {
      console.log(`Reading cover: ${cover.filename}...`);
      const title = await readCoverTitle(cover.url, cover.filename);
      if (title) {
        console.log(`  -> Title found: "${title}"`);
        coverTitles.push({ ...cover, title });
      } else {
        console.log(`  -> Could not read title`);
      }
    }

    console.log(`Successfully read ${coverTitles.length} titles from covers`);

    // Get products without images
    let productsWithoutImages: any[] = [];
    try {
      productsWithoutImages = await getProductsWithoutImages(250);
    } catch (shopifyError) {
      console.error('Shopify error, continuing with empty products list:', shopifyError);
    }
    
    console.log(`Found ${productsWithoutImages.length} products without images`);

    // Try to match covers to products
    const matches: { product: string; productId: string; cover: string; title: string; similarity: number }[] = [];
    const used = new Set<string>();

    for (const ct of coverTitles) {
      let bestMatch: { product: any; similarity: number } | null = null;

      for (const product of productsWithoutImages) {
        if (used.has(product.id)) continue;
        
        const similarity = calculateSimilarity(ct.title, product.title);
        if (similarity > 0.4 && (!bestMatch || similarity > bestMatch.similarity)) {
          bestMatch = { product, similarity };
        }
      }

      if (bestMatch) {
        used.add(bestMatch.product.id);
        matches.push({
          product: bestMatch.product.title,
          productId: bestMatch.product.id,
          cover: ct.filename,
          title: ct.title,
          similarity: bestMatch.similarity
        });

        if (!dryRun) {
          console.log(`Uploading ${ct.filename} to "${bestMatch.product.title}"...`);
          const success = await uploadImageToProduct(bestMatch.product.id, ct.url);
          if (success) {
            console.log(`  -> Success!`);
          } else {
            console.log(`  -> Failed`);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        dryRun,
        coversAnalyzed: coverTitles.length,
        productsWithoutImages: productsWithoutImages.length,
        matches,
        coverTitles: coverTitles.map(ct => ({ filename: ct.filename, title: ct.title }))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
