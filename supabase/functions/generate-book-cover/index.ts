import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute (image generation is expensive)

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
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check rate limit
    const clientIP = getClientIP(req);
    console.log('Client IP:', clientIP);
    
    const { allowed, remaining } = await checkRateLimit(clientIP, 'generate-book-cover');
    
    if (!allowed) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(
        JSON.stringify({ 
          error: 'Límite de generación de portadas excedido. Por favor, espera un momento antes de intentar de nuevo.',
          rateLimited: true
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60'
          },
        },
      );
    }

    const { titulo, autor, genero, estilo, instrucciones, color1, color2, sorprenderColores } = await req.json();

    const IDEOGRAM_API_KEY = Deno.env.get('IDEOGRAM_API_KEY');
    if (!IDEOGRAM_API_KEY) {
      throw new Error('IDEOGRAM_API_KEY no está configurada');
    }

    // Construir el prompt basado en los inputs
    let prompt = `Professional book cover design for "${titulo}"`;
    
    if (autor) {
      prompt += ` by ${autor}`;
    }
    
    if (genero) {
      prompt += `, ${genero} genre`;
    }

    // Agregar estilo visual
    const estiloDescriptions: Record<string, string> = {
      'minimalista': 'minimalist and clean design, simple geometric shapes',
      'ilustrativo': 'illustrated style, artistic and creative',
      'fotografico': 'photographic style, realistic imagery',
      'abstracto': 'abstract art style, creative and modern',
      'vintage': 'vintage retro style, classic book cover aesthetic',
      'dark-gotico': 'dark gothic style, mysterious and dramatic',
      'bauhaus': 'Bauhaus design style, geometric shapes, bold primary colors, modernist typography, clean lines, constructivist aesthetic',
      'realista': 'realistic style, hyper-realistic imagery, photorealistic details, lifelike textures and lighting'
    };
    
    if (estilo && estiloDescriptions[estilo]) {
      prompt += `, ${estiloDescriptions[estilo]}`;
    }

    // Agregar colores si no se eligió sorprender
    if (!sorprenderColores && color1 && color2) {
      prompt += `, color palette using ${color1} and ${color2}`;
    }

    // Agregar instrucciones adicionales
    if (instrucciones) {
      prompt += `, ${instrucciones}`;
    }

    prompt += '. Professional book cover layout with title and author name prominently displayed.';

    console.log('Generando portada con prompt:', prompt);

    // Llamada a Ideogram API
    const response = await fetch('https://api.ideogram.ai/generate', {
      method: 'POST',
      headers: {
        'Api-Key': IDEOGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_request: {
          prompt: prompt,
          aspect_ratio: 'ASPECT_10_16', // Formato vertical típico de portadas
          model: 'V_2',
          magic_prompt_option: 'AUTO'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Ideogram API:', response.status, errorText);
      throw new Error(`Error de Ideogram API: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !data.data[0] || !data.data[0].url) {
      throw new Error('No se recibió imagen de Ideogram');
    }

    const imageUrl = data.data[0].url;

    return new Response(
      JSON.stringify({ image: imageUrl }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': remaining.toString()
        } 
      }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error al generar la portada' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 500 
      }
    );
  }
});