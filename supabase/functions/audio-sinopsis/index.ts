import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute (audio is more expensive)

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
    
    const { allowed, remaining } = await checkRateLimit(clientIP, 'audio-sinopsis');
    
    if (!allowed) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(
        JSON.stringify({ 
          error: 'Límite de generación de audio excedido. Por favor, espera un momento antes de intentar de nuevo.',
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

    const { text } = await req.json();
    console.log('Solicitud de audio recibida, longitud del texto:', text?.length);

    if (!text) {
      throw new Error('El texto es requerido');
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY no configurada');
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1-hd',
        input: text,
        voice: 'nova',
        response_format: 'mp3',
        speed: 0.95,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error de OpenAI TTS:', error);
      throw new Error('Error al generar el audio');
    }

    console.log('Audio generado exitosamente');

    // Devolver el audio directamente como stream
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'X-RateLimit-Remaining': remaining.toString()
      },
    });
  } catch (error) {
    console.error('Error en audio-sinopsis:', error);
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