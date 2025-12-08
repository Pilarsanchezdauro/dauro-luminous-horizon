import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
      'bauhaus': 'Bauhaus design style, geometric shapes, bold primary colors, modernist typography, clean lines, constructivist aesthetic'
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
          'Content-Type': 'application/json' 
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
