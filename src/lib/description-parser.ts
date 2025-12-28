/**
 * Parsea la descripción del producto para separar la sinopsis del autor
 * Respeta el HTML original de Shopify sin alterarlo
 */

interface ParsedDescription {
  sinopsis: string;
  sinopsisHtml: string;
  autor: string;
  autorHtml: string;
  paginas: string | null;
  isbn: string | null;
  editorial: string | null;
}

/**
 * Patrones para encontrar la sección del autor
 */
const AUTOR_PATTERNS = [
  /(<[^>]*>)*\s*(EL AUTOR|LA AUTORA|SOBRE EL AUTOR|SOBRE LA AUTORA|BIOGRAFÍA DEL AUTOR|BIOGRAFÍA DE LA AUTORA|LOS AUTORES|LAS AUTORAS|AUTOR:)\s*(<[^>]*>)*/i,
];

/**
 * Extrae metadatos del texto
 */
function extractMetadata(text: string): { paginas: string | null; isbn: string | null; editorial: string | null } {
  const paginasMatch = text.match(/(?:📄\s*)?Páginas:\s*(\d+)/i);
  const isbnMatch = text.match(/(?:📘\s*)?ISBN:\s*([\d\-X]+)/i);
  const editorialMatch = text.match(/(?:📚\s*)?Editorial:\s*([^\n📖📄🌐📘📅]+)/i);
  
  return {
    paginas: paginasMatch?.[1] || null,
    isbn: isbnMatch?.[1] || null,
    editorial: editorialMatch?.[1]?.trim() || null
  };
}

/**
 * Limpia el encabezado del autor del HTML
 */
function cleanAuthorHeader(html: string): string {
  return html.replace(/^(<[^>]*>)*\s*(EL AUTOR|LA AUTORA|LOS AUTORES|LAS AUTORAS|SOBRE EL AUTOR|SOBRE LA AUTORA|BIOGRAFÍA DEL AUTOR|BIOGRAFÍA DE LA AUTORA|AUTOR:)\s*(<[^>]*>)*/i, '').trim();
}

export function parseProductDescription(description: string, descriptionHtml?: string): ParsedDescription {
  if (!description && !descriptionHtml) {
    return { sinopsis: '', sinopsisHtml: '', autor: '', autorHtml: '', paginas: null, isbn: null, editorial: null };
  }

  const text = description || '';
  const html = descriptionHtml || '';
  
  // Extraer metadatos del texto plano
  const { paginas, isbn, editorial } = extractMetadata(text);
  
  // Si hay HTML, usarlo directamente y solo dividir por autor
  let sinopsisHtml = html;
  let autorHtml = '';
  
  if (html) {
    // Buscar dónde empieza la sección del autor en el HTML
    for (const pattern of AUTOR_PATTERNS) {
      const match = html.match(pattern);
      if (match && match.index !== undefined) {
        sinopsisHtml = html.substring(0, match.index).trim();
        autorHtml = html.substring(match.index).trim();
        // Limpiar el encabezado del autor
        autorHtml = cleanAuthorHeader(autorHtml);
        break;
      }
    }
  }
  
  // Procesar texto plano de forma similar
  let sinopsis = text;
  let autor = '';
  
  const textPatterns = [
    /\b(EL AUTOR|LA AUTORA|SOBRE EL AUTOR|SOBRE LA AUTORA|BIOGRAFÍA DEL AUTOR|BIOGRAFÍA DE LA AUTORA|LOS AUTORES|LAS AUTORAS|AUTOR:)\b/i
  ];
  
  for (const pattern of textPatterns) {
    const match = text.match(pattern);
    if (match && match.index !== undefined) {
      sinopsis = text.substring(0, match.index).trim();
      autor = text.substring(match.index).trim();
      // Limpiar encabezado
      autor = autor.replace(/^(EL AUTOR|LA AUTORA|LOS AUTORES|LAS AUTORAS|SOBRE EL AUTOR|SOBRE LA AUTORA|BIOGRAFÍA DEL AUTOR|BIOGRAFÍA DE LA AUTORA|AUTOR:)\s*/i, '').trim();
      break;
    }
  }

  // Si no hay HTML pero sí texto, generar HTML básico
  if (!sinopsisHtml && sinopsis) {
    sinopsisHtml = sinopsis.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
  }
  if (!autorHtml && autor) {
    autorHtml = autor.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
  }

  return { 
    sinopsis: sinopsis.replace(/\s+/g, ' ').trim(), 
    sinopsisHtml, 
    autor, 
    autorHtml, 
    paginas, 
    isbn, 
    editorial 
  };
}

/**
 * Obtiene solo la sinopsis limpia para mostrar en tarjetas
 */
export function getSynopsisOnly(description: string, maxLength: number = 200): string {
  const { sinopsis } = parseProductDescription(description);
  
  if (!sinopsis) return '';
  
  if (sinopsis.length <= maxLength) {
    return sinopsis;
  }
  
  // Cortar en la última palabra completa
  const truncated = sinopsis.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}
