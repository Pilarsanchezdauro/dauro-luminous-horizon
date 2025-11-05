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
    console.log('Consulta interna recibida:', query);

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY no configurada');
    }

    // Contexto sobre Grupo Dauro con información precisa del catálogo
    const contexto = `
Grupo Dauro es una editorial y productora cultural con sede en Granada, España.

CATÁLOGO COMPLETO POR GÉNEROS:

NARRATIVA HISTÓRICA Y BIOGRAFÍA:
- "El Hidalgo Don Rodrigo" - Novela histórica sobre Rodrigo Díaz de Vivar
- "Boabdil, el Perdedor" - Novela histórica sobre el último rey nazarí
- "La Última Condena" - Novela histórica
- "Miguel Hernández a Contraluz" - Biografía y análisis literario del poeta
- "Antonio Gil Carrasco" - Biografía
- "La Abadesa Santa Isabel" - Biografía histórica

NARRATIVA CONTEMPORÁNEA:
- "Una Voz, Dos Tierras" - Novela sobre migración y dualidad cultural (Lorena Avelar)
- "Del Palmar de Troya a la Iglesia de Roma" - Narrativa testimonial
- "La Caza, Captura y Muerte de la Abuelita" - Narrativa contemporánea
- "Mundos Perdidos" - Narrativa
- "Una Vida Redonda" - Narrativa autobiográfica

POESÍA:
- "Yo Soy Todos Los Besos Que Nunca Pude Darte" - Poesía amorosa
- "No Volverán las Oscuras Golondrindas" - Poesía
- "El Sonido del Agua en las Acequias" - Poesía naturalista

ENSAYO Y REFLEXIÓN:
- "Latido: Apasionadamente Vuestro" - Ensayo sobre arte, cultura y creatividad (NO ES POESÍA)
- "Horizonte Interior" - Reflexiones filosóficas y espirituales
- "El Impulso Integral" - Ensayo de desarrollo personal
- "Migración Revolución Interior" - Ensayo sobre transformación personal
- "Código H: El Dinero de la Felicidad" - Ensayo sobre finanzas y bienestar

LITERATURA INFANTIL Y JUVENIL:
- "Tiempos de Candil" - Literatura infantil
- "La Jungla" - Literatura infantil/juvenil
- "Elucubraciones" - Literatura juvenil

MISCELÁNEA:
- "El Arte de Brindar" - Libro gastronómico/cultural
- "Elena de la Alpujarra" - Narrativa regional
- "Aecio" - Ficción histórica

AUTORES DESTACADOS:
- Lorena Avelar - "Una Voz, Dos Tierras"
- Diversos autores andaluces de narrativa histórica
- Poetas contemporáneos locales y nacionales

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
