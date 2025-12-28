/**
 * Parsea la descripción del producto para separar la sinopsis del autor
 * y eliminar referencias a previsualización de la obra
 * Soporta tanto texto plano como HTML
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
 * Convierte texto plano a HTML preservando saltos de línea
 */
function textToHtml(text: string): string {
  if (!text) return '';
  return text
    .split(/\n\n+/)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`)
    .join('');
}

/**
 * Limpia el HTML de patrones no deseados
 */
function cleanHtml(html: string): string {
  if (!html) return '';
  
  let cleaned = html;
  
  // Eliminar referencias a previsualización/primeras páginas
  const previewPatterns = [
    /ACCEDE A LA LECTURA DE LAS PRIMERAS PÁGINAS[^<]*/gi,
    /ACCEDE A LECTURA DE LAS PRIMERAS PÁGINAS[^<]*/gi,
    /ACCEDE A LAS PRIMERAS PÁGINAS DE [^<]+/gi,
    /ACCEDE A LAS PRIMERAS PÁGINAS[^<]*/gi,
    /LEER PRIMERAS PÁGINAS[^<]*\.?/gi,
    /VER PREVISUALIZACIÓN[^<]*\.?/gi,
    /PREVISUALIZAR OBRA[^<]*\.?/gi,
    /DESCARGAR MUESTRA[^<]*\.?/gi,
    /HAGA CLIC AQUÍ PARA[^<]*\.?/gi,
    /PINCHE AQUÍ PARA[^<]*\.?/gi,
    /PULSE AQUÍ PARA[^<]*\.?/gi,
    /📖\s*Ver primeras páginas\s*📖/gi,
  ];
  
  previewPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  // Eliminar líneas de metadatos del texto
  const metadataPatterns = [
    /📄\s*Páginas:\s*\d+/gi,
    /📘\s*ISBN:\s*[\d\-X]+/gi,
    /📚\s*Editorial:\s*[^<\n📖📄🌐📘📅]+/gi,
    /🌐\s*Idioma:\s*[^<\n📖📄📘📅]+/gi,
    /📅\s*Fecha de edición:\s*[^<\n📖📄🌐📘]+/gi,
  ];
  
  metadataPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  // Limpiar párrafos vacíos
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, '');
  cleaned = cleaned.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '<br/>');
  
  return cleaned.trim();
}

export function parseProductDescription(description: string, descriptionHtml?: string): ParsedDescription {
  if (!description && !descriptionHtml) {
    return { sinopsis: '', sinopsisHtml: '', autor: '', autorHtml: '', paginas: null, isbn: null, editorial: null };
  }

  const text = description || '';
  const html = descriptionHtml || '';
  
  // Extraer metadatos
  const paginasMatchEmoji = text.match(/📄\s*Páginas:\s*(\d+)/i);
  const isbnMatchEmoji = text.match(/📘\s*ISBN:\s*([\d\-X]+)/i);
  const editorialMatchEmoji = text.match(/📚\s*Editorial:\s*([^\n📖📄🌐📘📅]+)/i);
  const paginasMatch = text.match(/Páginas:\s*(\d+)/i);
  const isbnMatch = text.match(/ISBN:\s*([\d\-X]+)/i);
  
  const paginas = paginasMatchEmoji?.[1] || paginasMatch?.[1] || null;
  const isbn = isbnMatchEmoji?.[1] || isbnMatch?.[1] || null;
  const editorial = editorialMatchEmoji?.[1]?.trim() || null;
  
  // Patrones para encontrar la sección del autor
  const autorPatterns = [
    /\bEL AUTOR\b/i,
    /\bLA AUTORA\b/i,
    /\bSOBRE EL AUTOR\b/i,
    /\bSOBRE LA AUTORA\b/i,
    /\bBIOGRAFÍA DEL AUTOR\b/i,
    /\bBIOGRAFÍA DE LA AUTORA\b/i,
    /\bLOS AUTORES\b/i,
    /\bLAS AUTORAS\b/i,
  ];

  // Procesar texto plano
  let sinopsis = text;
  let autor = '';

  for (const pattern of autorPatterns) {
    const match = text.match(pattern);
    if (match && match.index !== undefined) {
      sinopsis = text.substring(0, match.index).trim();
      autor = text.substring(match.index).trim();
      break;
    }
  }

  // Limpiar "LA OBRA" del inicio
  sinopsis = sinopsis.replace(/^LA OBRA\s*/i, '').trim();
  
  // Procesar HTML si está disponible
  let sinopsisHtml = html;
  let autorHtml = '';
  
  if (html) {
    // Buscar separadores en HTML para autor
    for (const pattern of autorPatterns) {
      const regex = new RegExp(`(<[^>]*>)?(${pattern.source})`, 'i');
      const match = html.match(regex);
      if (match && match.index !== undefined) {
        sinopsisHtml = html.substring(0, match.index).trim();
        autorHtml = html.substring(match.index).trim();
        break;
      }
    }
    
    // Limpiar "LA OBRA" del HTML
    sinopsisHtml = sinopsisHtml.replace(/^(<[^>]*>)*\s*LA OBRA\s*/i, '$1');
    
    // Limpiar encabezados de autor del HTML
    autorHtml = autorHtml.replace(/^(<[^>]*>)*(EL AUTOR|LA AUTORA|LOS AUTORES|LAS AUTORAS|SOBRE EL AUTOR|SOBRE LA AUTORA|BIOGRAFÍA DEL AUTOR|BIOGRAFÍA DE LA AUTORA)\s*/i, '$1');
  }
  
  // Limpiar contenido
  sinopsisHtml = cleanHtml(sinopsisHtml);
  autorHtml = cleanHtml(autorHtml);
  
  // Si no hay HTML, generar desde texto plano
  if (!sinopsisHtml && sinopsis) {
    sinopsisHtml = textToHtml(sinopsis);
  }
  if (!autorHtml && autor) {
    autorHtml = textToHtml(autor.replace(/^(EL AUTOR|LA AUTORA|LOS AUTORES|LAS AUTORAS|SOBRE EL AUTOR|SOBRE LA AUTORA|BIOGRAFÍA DEL AUTOR|BIOGRAFÍA DE LA AUTORA)\s*/i, ''));
  }

  // Limpiar espacios del texto plano
  sinopsis = sinopsis.replace(/\s+/g, ' ').trim();
  autor = autor.replace(/^(EL AUTOR|LA AUTORA|LOS AUTORES|LAS AUTORAS)\s*/i, '').replace(/\s+/g, ' ').trim();

  return { sinopsis, sinopsisHtml, autor, autorHtml, paginas, isbn, editorial };
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
