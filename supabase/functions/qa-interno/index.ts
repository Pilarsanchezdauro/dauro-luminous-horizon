import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SHOPIFY_STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
const SHOPIFY_STORE_DOMAIN = 'grupo-dauro.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';

// Configuración de caché
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos
let productsCache: any = null;
let cacheTimestamp = 0;

// Función para obtener productos de Shopify (con caché)
async function fetchShopifyProducts(): Promise<{ products: any[], fromCache: boolean }> {
  const now = Date.now();
  
  // Verificar si el caché es válido
  if (productsCache && (now - cacheTimestamp) < CACHE_DURATION_MS) {
    console.log('Usando productos en caché');
    return { products: productsCache, fromCache: true };
  }
  
  console.log('Obteniendo productos frescos de Shopify...');
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
    // Si hay error pero existe caché antiguo, usarlo
    if (productsCache) {
      console.log('Error en Shopify, usando caché antiguo como fallback');
      return { products: productsCache, fromCache: true };
    }
    return { products: [], fromCache: false };
  }

  const data = await response.json();
  const products = data.data?.products?.edges || [];
  
  // Actualizar caché
  productsCache = products;
  cacheTimestamp = now;
  console.log(`Caché actualizado con ${products.length} productos`);
  
  return { products, fromCache: false };
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
    const { products: shopifyProducts, fromCache } = await fetchShopifyProducts();
    console.log(`Productos obtenidos: ${shopifyProducts.length} (${fromCache ? 'caché' : 'frescos'})`);

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

INSTRUCCIONES PARA BÚSQUEDAS PARCIALES:
- Si el usuario menciona parte de un título (ej: "latido", "código H", "migración", "aecio"), identifícalo y pregunta: "¿Te refieres a [TÍTULO COMPLETO] de [AUTOR]?"
- Si el usuario menciona un apellido de autor (ej: "Alcaide", "Hernández"), identifícalo y pregunta: "¿Te refieres a [NOMBRE COMPLETO]?"
- Si hay varias coincidencias, menciona todas las opciones disponibles
- Después de confirmar, proporciona la información completa del libro o autor

INFORMACIÓN DETALLADA DE LIBROS DESTACADOS:

1. "El código H del dinero"
   - Autor: No especificado en catálogo
   - Género: Desarrollo Personal / Finanzas
   - Descripción: Relato autobiográfico de un financiero internacional que desmonta conceptos del dinero, revela fraudes bancarios y enseña a ver el sistema financiero desde una perspectiva personal y disruptiva. Para inconformistas y curiosos sobre el mundo de las finanzas.

2. "La migración como revolución interior"
   - Autor: No especificado en catálogo
   - Género: Desarrollo Personal / Testimonio
   - Descripción: Historia real sobre transformar la migración en una oportunidad de cambio personal profundo. Dirigido a personas en proceso de transición o transformación vital, no solo migratoria.

3. "Latido. Apasionadamente vuestro"
   - Autor: Carmen Alcaide
   - Género: Narrativa / Novela contemporánea
   - Descripción: Un joven exmilitar vive el lado más peligroso y emocional de la España de la Transición, enfrentando pasiones, traiciones y decisiones complejas dentro de un thriller emocional y de acción.
   - Evento: Presentación el 29 de enero de 2025, 19:00h, Biblioteca de Andalucía, Granada

4. "Elena y la Alpujarra"
   - Autor: No especificado en catálogo
   - Género: Narrativa histórica
   - Descripción: Relato de la vida rural y las dificultades posguerra en la Alpujarra, centrado en Elena y su familia y mezclando hechos reales y ficción para retratar la dureza y belleza de la vida en la montaña.

5. "Aecio"
   - Autor: No especificado en catálogo
   - Género: Novela Histórica
   - Descripción: Ambientada en el siglo V durante los últimos días del Imperio Romano, narra el ascenso de Aecio en medio del caos, luchando por mantener la gloria romana ante la presión bárbara.

6. "Elucubraciones"
   - Autor: No especificado en catálogo
   - Género: Narrativa / Autoficción filosófica
   - Descripción: Obra póstuma de reflexiones, delirios y pensamientos intensos al borde de la muerte, explorando los límites de la mente y la existencia, con una narrativa cruda y visceral.

7. "Mundos Perdidos"
   - Autor: No especificado en catálogo
   - Género: Ensayo / Narrativa filosófica
   - Descripción: Recopilación de relatos y escritos sobre mundos míticos y exóticos, que mezcla ficción histórica, filosofía y exploración literaria de civilizaciones antiguas, arte y pensamiento.

8. "No volverán las oscuras golondrinas..."
   - Autor: No especificado en catálogo
   - Género: Relatos
   - Descripción: Cinco relatos sobre pasión, crudeza y ternura, abordando temas como el amor perdido, derrotas históricas y la profunda reflexión literaria con fuerte crítica social y estilística propia.

9. "Una voz para dos tierras"
   - Autor: No especificado en catálogo
   - Género: Narrativa (histórica/social)
   - Descripción: Explora raíces, pertenencia y la relación entre diferentes culturas o lugares.

10. "El arte de brindar. Poesía líquida para el alma"
    - Autor: No especificado en catálogo
    - Género: Poesía
    - Descripción: Libro de poemas para el crecimiento personal y la contemplación, centrado en el brindis como celebración del alma.

11. "Del Palmar de Troya al Instituto Cervantes. Crónicas irreverentes"
    - Autor: No especificado en catálogo
    - Género: Crónica / Ensayo
    - Descripción: Recoge crónicas de tono irreverente que van desde el fenómeno del Palmar de Troya hasta reflexiones sobre la cultura y lengua española, usando el humor y la crítica.

12. "Miguel Hernández a contraluz"
    - Autor: No especificado en catálogo
    - Género: Biografía / Estudio literario
    - Descripción: Análisis vital y literario de Miguel Hernández, centrado en los temas de amor y dolor en su poesía, y el contexto ideológico y social que lo rodeó.

13. "El hidalgo don Rodrigo de Cervantes"
    - Autor: No especificado en catálogo
    - Género: Narrativa histórica
    - Descripción: Explora la figura histórica de don Rodrigo de Cervantes (padre de Miguel de Cervantes) y la época en la que vivió. Profundiza en las raíces familiares y contexto sociopolítico.

14. "La alborada del ruiseñor"
    - Autor: No especificado en catálogo
    - Género: Narrativa
    - Descripción: Novela centrada en la superación y el optimismo, ambientada posiblemente en algún periodo histórico español.

15. "20 mujeres inolvidables"
    - Autor: No especificado en catálogo
    - Género: Ensayo biográfico / Social
    - Descripción: Recopilación de biografías de 20 mujeres que dejaron huella; enfoque divulgativo y social, resaltando el impacto femenino en la historia y la cultura.

${catalogoTexto}

SERVICIOS:
- Editorial: publicación de libros físicos y digitales
- Dauro Arte: diseño gráfico, branding, portadas de libros con IA
- Dauro Cine: producción audiovisual, booktrailers, documentales
- Dauro Música: producción musical, canciones con IA
- Dauro IA: servicios creativos con inteligencia artificial, arte generativo, NFTs

CONTACTO:
- Email: info@grupodauro.com
- Teléfono: +34 958 22 46 82
- Dirección: Calle Tendillas de Santa Paula, 5, 18009 Granada, España

EVENTOS PRÓXIMOS:
- Presentación "Latido. Apasionadamente vuestro" de Carmen Alcaide: 29 de enero de 2025, 19:00h, Biblioteca de Andalucía, Granada (Acceso libre hasta completar aforo)
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
            content: `Eres el asistente cultural de Grupo Dauro. Responde en español de España, de forma clara y concisa (máximo 700 tokens).

IMPORTANTE - BÚSQUEDAS PARCIALES:
- Cuando el usuario mencione parte de un título o apellido de autor, SIEMPRE pregunta primero para confirmar: "¿Te refieres a [título completo] de [autor completo]?" antes de dar información
- Usa el contexto para identificar coincidencias parciales
- Si hay varias opciones, menciónalas todas

Usa el siguiente contexto para responder:\n\n${contexto}\n\nSi la pregunta no está relacionada con Grupo Dauro, invita amablemente al usuario a usar el modo "Actualidad" para consultas generales.`
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
        fuentesInternas,
        metadata: {
          fromCache,
          catalogUpdatedAt: fromCache ? new Date(cacheTimestamp).toISOString() : new Date().toISOString(),
          totalProducts: shopifyProducts.length
        }
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
