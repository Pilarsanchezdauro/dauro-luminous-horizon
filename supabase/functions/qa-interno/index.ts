import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- Odoo (tienda propia de Grupo Dauro) ---
// Catálogo en vivo desde Odoo por JSON-RPC. Ya NO se usa Shopify.
const ODOO_URL = Deno.env.get('ODOO_URL') || 'https://grupo-dauro1.odoo.com/jsonrpc';
const ODOO_DB = Deno.env.get('ODOO_DB') || 'grupo-dauro1';
const ODOO_USER = Deno.env.get('ODOO_USER') || 'info@grupodauro.com';
const ODOO_API_KEY = Deno.env.get('ODOO_API_KEY');
const TIENDA = 'https://tiendaspain.grupodauro.com';

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute

// Configuración de caché
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos
let productsCache: any = null;
let cacheTimestamp = 0;
let odooUid: number | null = null;

// Rate limiting function
async function checkRateLimit(ip: string, functionName: string): Promise<{ allowed: boolean; remaining: number }> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

  const { data: existing, error: fetchError } = await supabase
    .from('ai_rate_limits')
    .select('*')
    .eq('ip_address', ip)
    .eq('function_name', functionName)
    .maybeSingle();

  if (fetchError) {
    console.error('Error fetching rate limit:', fetchError);
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW };
  }

  if (!existing) {
    await supabase.from('ai_rate_limits').insert({
      ip_address: ip,
      function_name: functionName,
      request_count: 1,
      window_start: now.toISOString()
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  const recordWindowStart = new Date(existing.window_start);

  if (recordWindowStart < windowStart) {
    await supabase
      .from('ai_rate_limits')
      .update({ request_count: 1, window_start: now.toISOString() })
      .eq('id', existing.id);
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (existing.request_count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  await supabase
    .from('ai_rate_limits')
    .update({ request_count: existing.request_count + 1 })
    .eq('id', existing.id);

  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - existing.request_count - 1 };
}

function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

// --- JSON-RPC a Odoo ---
async function odooRpc(service: string, method: string, args: any[]): Promise<any> {
  const resp = await fetch(ODOO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { service, method, args }, id: 1 }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(JSON.stringify(data.error).slice(0, 400));
  return data.result;
}

async function odooLogin(): Promise<number> {
  if (odooUid) return odooUid;
  const uid = await odooRpc('common', 'login', [ODOO_DB, ODOO_USER, ODOO_API_KEY]);
  if (!uid) throw new Error('No se pudo autenticar en Odoo (revisa ODOO_API_KEY)');
  odooUid = uid;
  return uid;
}

// Catálogo en vivo desde Odoo (con caché de 5 min)
async function fetchOdooCatalog(): Promise<{ products: any[]; fromCache: boolean }> {
  const now = Date.now();
  if (productsCache && (now - cacheTimestamp) < CACHE_DURATION_MS) {
    return { products: productsCache, fromCache: true };
  }
  const uid = await odooLogin();
  const rows = await odooRpc('object', 'execute_kw', [
    ODOO_DB, uid, ODOO_API_KEY,
    'product.template', 'search_read',
    [[['is_published', '=', true], ['list_price', '>', 0]]],
    { fields: ['name', 'list_price', 'website_url', 'description_sale'], limit: 500, order: 'name asc' },
  ]);
  productsCache = rows;
  cacheTimestamp = now;
  console.log(`Catálogo Odoo actualizado: ${rows.length} productos`);
  return { products: rows, fromCache: false };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    const { allowed, remaining } = await checkRateLimit(clientIP, 'qa-interno');

    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Límite de consultas excedido. Por favor, espera un momento antes de intentar de nuevo.', rateLimited: true }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '0', 'Retry-After': '60' } },
      );
    }

    const { query, messages = [] } = await req.json();
    console.log('Consulta interna recibida:', query);

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY no configurada');

    // Catálogo en vivo desde Odoo
    const { products, fromCache } = await fetchOdooCatalog();

    let catalogoTexto = `CATÁLOGO EN VIVO (tienda Odoo de Grupo Dauro, ${products.length} títulos; precios y enlaces reales):\n`;
    for (const p of products) {
      let line = `- "${p.name}" — ${Number(p.list_price).toFixed(2)} €`;
      if (p.description_sale) {
        const desc = String(p.description_sale).replace(/\s+/g, ' ').trim().slice(0, 140);
        if (desc) line += ` — ${desc}`;
      }
      line += ` — ${TIENDA}${p.website_url || ''}`;
      catalogoTexto += line + '\n';
    }

    const contexto = `
Grupo Dauro es una editorial con más de 2.000 obras publicadas y distribución en librerías de
España y América. Vende sus libros en su propia tienda online (Odoo).

CÓMO SE PUBLICA CON DAURO (explícalo siempre que pregunten por publicar o por el precio de publicar):
Grupo Dauro no publica cualquier libro, elige. Hay dos caminos:
1) Si la obra ya está terminada y encaja en nuestra línea, la editamos bajo nuestro sello SIN
   COSTE para el autor, que percibe sus derechos.
2) Si el manuscrito necesita trabajo (corrección, estructura, estilo), ese trabajo son
   SERVICIOS EDITORIALES, con un presupuesto cerrado que el autor conoce antes de empezar.
NUNCA digas que publicamos gratis cualquier libro ni prometas la publicación. No des por el chat
precios de la intervención (dependen del presupuesto). Para empezar, el autor envía las 15
primeras páginas y una sinopsis desde la web (sección «Publica tu libro» / «Valoración») y
respondemos en 48 horas; ese primer paso es gratuito. No uses la palabra «autoedición»: es
«servicios editoriales».

USO DEL CATÁLOGO:
- Responde solo con libros que estén en el catálogo de abajo (es el real y actualizado).
- Da el precio y el enlace de la tienda cuando recomiendes o encuentres un libro.
- El género y el autor suelen estar en la descripción de cada título; úsalos para responder por
  géneros ("¿qué poesía tenéis?") o por autor.
- Si el usuario menciona solo parte de un título o un apellido, confirma antes: "¿Te refieres a
  [título] de [autor]?". Si hay varias coincidencias, enséñalas.

CONTACTO:
- WhatsApp: +34 640 91 90 90
- Email: info@grupodauro.com
- Llamadas y citas: solo de 11:00 a 13:00.
- Grupo Dauro · Legal International & Finances Experts Group S.L. · C/ Almajara 11 · 18008 Granada.

${catalogoTexto}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres el asistente de Grupo Dauro, editorial. Respondes en español de España, con un tono cercano, profesional y sobrio (máximo 700 tokens). No prometas nada que no esté en el contexto; si no sabes algo, ofrece poner en contacto con el equipo (WhatsApp +34 640 91 90 90 o info@grupodauro.com, en horario de 11:00 a 13:00).

Usa el siguiente contexto para responder:\n\n${contexto}\n\nSi la pregunta no tiene que ver con Grupo Dauro, invita amablemente a usar el modo "Actualidad".`
          },
          ...messages.slice(-10).map((msg: any) => ({ role: msg.role, content: msg.content })),
        ],
        temperature: 0.2,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error de OpenAI:', error);
      throw new Error('Error al procesar la consulta');
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    const fuentesInternas = [
      { title: 'Tienda Grupo Dauro', url: TIENDA + '/shop' },
      { title: 'Cómo publicar con Dauro', url: 'https://www.grupodauro.com/valoracion' },
    ];

    return new Response(
      JSON.stringify({
        text,
        fuentesInternas,
        metadata: {
          fromCache,
          catalogUpdatedAt: fromCache ? new Date(cacheTimestamp).toISOString() : new Date().toISOString(),
          totalProducts: products.length,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': remaining.toString() } },
    );
  } catch (error) {
    console.error('Error en qa-interno:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Error desconocido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
