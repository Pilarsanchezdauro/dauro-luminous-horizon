import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SHOPIFY_STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
const SHOPIFY_STORE_DOMAIN = 'grupo-dauro.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';

// Función para obtener productos de Shopify
async function fetchShopifyProducts() {
  const query = `
    query GetProducts {
      products(first: 100) {
        edges {
          node {
            id
            title
            description
            productType
            vendor
            tags
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN || '',
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    console.error('Error fetching Shopify products:', response.status);
    return [];
  }

  const data = await response.json();
  return data.data?.products?.edges || [];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    console.log('Consulta interna recibida:', query);

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY no configurada');
    }

    // Obtener productos actualizados de Shopify
    console.log('Obteniendo productos de Shopify...');
    const shopifyProducts = await fetchShopifyProducts();
    console.log(`Productos obtenidos: ${shopifyProducts.length}`);

    // Organizar productos por categoría/tipo
    const productosPorCategoria: Record<string, any[]> = {};
    shopifyProducts.forEach((edge: any) => {
      const product = edge.node;
      const tipo = product.productType || 'Sin categoría';
      if (!productosPorCategoria[tipo]) {
        productosPorCategoria[tipo] = [];
      }
      productosPorCategoria[tipo].push(product);
    });

    // Construir el catálogo dinámicamente
    let catalogoTexto = 'CATÁLOGO COMPLETO (actualizado en tiempo real):\n\n';
    
    for (const [categoria, productos] of Object.entries(productosPorCategoria)) {
      catalogoTexto += `${categoria.toUpperCase()}:\n`;
      productos.forEach((product: any) => {
        catalogoTexto += `- "${product.title}"`;
        if (product.description) {
          const descCorta = product.description.substring(0, 100);
          catalogoTexto += ` - ${descCorta}`;
        }
        if (product.vendor) {
          catalogoTexto += ` (${product.vendor})`;
        }
        if (product.tags && product.tags.length > 0) {
          catalogoTexto += ` [${product.tags.join(', ')}]`;
        }
        catalogoTexto += '\n';
      });
      catalogoTexto += '\n';
    }

    // Contexto sobre Grupo Dauro con catálogo dinámico de Shopify
    const contexto = `
Grupo Dauro es una editorial y productora cultural con sede en Granada, España.

${catalogoTexto}

SERVICIOS:
- Editorial: publicación de libros físicos y digitales
- Dauro Arte: diseño gráfico, branding, portadas de libros
- Dauro Cine: producción audiovisual, booktrailers
- Dauro Música: producción musical, canciones con IA
- Dauro IA: servicios creativos con inteligencia artificial

EVENTOS:
- Presentaciones de libros en Granada
- Eventos culturales y literarios
- Talleres de escritura y creatividad
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres el asistente cultural de Grupo Dauro. Responde en español de España, de forma clara y concisa (máximo 700 tokens). Usa el siguiente contexto para responder preguntas sobre el catálogo, autores y servicios:\n\n${contexto}\n\nSi la pregunta no está relacionada con Grupo Dauro, invita amablemente al usuario a usar el modo "Actualidad" para consultas generales.`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 700
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error de OpenAI:', error);
      throw new Error('Error al procesar la consulta');
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    // Simular fuentes internas (en producción, estas vendrían del RAG)
    const fuentesInternas = [
      {
        title: 'Catálogo Grupo Dauro',
        url: 'https://grupodauro.com/tienda'
      },
      {
        title: 'Servicios Dauro',
        url: 'https://grupodauro.com/servicios'
      }
    ];

    console.log('Respuesta generada exitosamente');

    return new Response(
      JSON.stringify({ 
        text, 
        fuentesInternas 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error en qa-interno:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
