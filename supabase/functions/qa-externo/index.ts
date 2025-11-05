import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    console.log('Consulta externa recibida:', query);

    const PPLX_API_KEY = Deno.env.get('PPLX_API_KEY');
    if (!PPLX_API_KEY) {
      throw new Error('PPLX_API_KEY no configurada');
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PPLX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente que responde en español de España. Proporciona información actualizada y cita siempre tus fuentes con enlaces. Sé conciso pero informativo.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error de Perplexity:', error);
      throw new Error('Error al procesar la consulta externa');
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    
    // Extraer citas si están disponibles
    const cites = data.citations || [];

    console.log('Respuesta de actualidad generada exitosamente');

    return new Response(
      JSON.stringify({ 
        text,
        cites: cites.map((url: string) => ({ url, title: url }))
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error en qa-externo:', error);
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
