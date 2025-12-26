/**
 * Parsea la descripción del producto para separar la sinopsis del autor
 * y eliminar referencias a previsualización de la obra
 */

interface ParsedDescription {
  sinopsis: string;
  autor: string;
  paginas: string | null;
  isbn: string | null;
  editorial: string | null;
}

export function parseProductDescription(description: string): ParsedDescription {
  if (!description) {
    return { sinopsis: '', autor: '', paginas: null, isbn: null, editorial: null };
  }

  let text = description;
  
  // Eliminar referencias a previsualización/primeras páginas
  const previewPatterns = [
    /ACCEDE A LA LECTURA DE LAS PRIMERAS PÁGINAS[^\n]*/gi,
    /ACCEDE A LAS PRIMERAS PÁGINAS DE [^\n]+/gi,
    /ACCEDE A LAS PRIMERAS PÁGINAS[^\n]*/gi,
    /LEER PRIMERAS PÁGINAS[^.]*\.?/gi,
    /VER PREVISUALIZACIÓN[^.]*\.?/gi,
    /PREVISUALIZAR OBRA[^.]*\.?/gi,
    /DESCARGAR MUESTRA[^.]*\.?/gi,
    /HAGA CLIC AQUÍ PARA[^.]*\.?/gi,
    /PINCHE AQUÍ PARA[^.]*\.?/gi,
    /PULSE AQUÍ PARA[^.]*\.?/gi,
    /📖\s*Ver primeras páginas\s*📖/gi,
  ];
  
  previewPatterns.forEach(pattern => {
    text = text.replace(pattern, '');
  });

  // Extraer metadatos con emojis (formato nuevo de Shopify)
  const paginasMatchEmoji = text.match(/📄\s*Páginas:\s*(\d+)/i);
  const isbnMatchEmoji = text.match(/📘\s*ISBN:\s*([\d\-X]+)/i);
  const editorialMatchEmoji = text.match(/📚\s*Editorial:\s*([^\n📖📄🌐📘📅]+)/i);
  const autorMatchEmoji = text.match(/Autor(?:a)?:\s*([^\n📚📖📄🌐📘📅]+)/i);
  
  // Extraer metadatos sin emojis (formato antiguo)
  const paginasMatch = text.match(/Páginas:\s*(\d+)/i);
  const isbnMatch = text.match(/ISBN:\s*([\d\-X]+)/i);
  
  const paginas = paginasMatchEmoji?.[1] || paginasMatch?.[1] || null;
  const isbn = isbnMatchEmoji?.[1] || isbnMatch?.[1] || null;
  const editorial = editorialMatchEmoji?.[1]?.trim() || null;
  
  // Eliminar líneas de metadatos del texto
  const metadataPatterns = [
    /📄\s*Páginas:\s*\d+/gi,
    /📘\s*ISBN:\s*[\d\-X]+/gi,
    /📚\s*Editorial:\s*[^\n📖📄🌐📘📅]+/gi,
    /🌐\s*Idioma:\s*[^\n📖📄📘📅]+/gi,
    /📅\s*Fecha de edición:\s*[^\n📖📄🌐📘]+/gi,
    /Autor(?:a)?:\s*[^\n📚📖📄🌐📘📅]+/gi,
    /Páginas:\s*\d+/gi,
  ];
  
  metadataPatterns.forEach(pattern => {
    text = text.replace(pattern, '');
  });

  // Buscar la sección del autor (formato largo con biografía)
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

  // Si no encontramos sección de autor larga, usar el nombre del autor de metadatos
  if (!autor && autorMatchEmoji?.[1]) {
    autor = autorMatchEmoji[1].trim();
  }

  // Limpiar "LA OBRA" del inicio de la sinopsis si existe
  sinopsis = sinopsis.replace(/^LA OBRA\s*/i, '').trim();
  
  // Limpiar espacios extra
  sinopsis = sinopsis.replace(/\s+/g, ' ').trim();
  autor = autor.replace(/\s+/g, ' ').trim();

  return { sinopsis, autor, paginas, isbn, editorial };
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
