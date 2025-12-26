/**
 * Parsea la descripción del producto para separar la sinopsis del autor
 * y eliminar referencias a previsualización de la obra
 */

interface ParsedDescription {
  sinopsis: string;
  autor: string;
  paginas: string | null;
}

export function parseProductDescription(description: string): ParsedDescription {
  if (!description) {
    return { sinopsis: '', autor: '', paginas: null };
  }

  let text = description;
  
  // Eliminar referencias a previsualización/primeras páginas
  const previewPatterns = [
    /ACCEDE A LA LECTURA DE LAS PRIMERAS PÁGINAS[^.]*\.?/gi,
    /ACCEDE A LAS PRIMERAS PÁGINAS[^.]*\.?/gi,
    /LEER PRIMERAS PÁGINAS[^.]*\.?/gi,
    /VER PREVISUALIZACIÓN[^.]*\.?/gi,
    /PREVISUALIZAR OBRA[^.]*\.?/gi,
    /DESCARGAR MUESTRA[^.]*\.?/gi,
    /HAGA CLIC AQUÍ PARA[^.]*\.?/gi,
    /PINCHE AQUÍ PARA[^.]*\.?/gi,
    /PULSE AQUÍ PARA[^.]*\.?/gi,
  ];
  
  previewPatterns.forEach(pattern => {
    text = text.replace(pattern, '');
  });

  // Extraer páginas si existe
  const paginasMatch = text.match(/Páginas:\s*(\d+)/i);
  const paginas = paginasMatch ? paginasMatch[1] : null;
  
  // Eliminar la línea de páginas del texto
  text = text.replace(/Páginas:\s*\d+/gi, '');

  // Buscar la sección del autor
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

  // Limpiar "LA OBRA" del inicio de la sinopsis si existe
  sinopsis = sinopsis.replace(/^LA OBRA\s*/i, '').trim();
  
  // Limpiar espacios extra
  sinopsis = sinopsis.replace(/\s+/g, ' ').trim();
  autor = autor.replace(/\s+/g, ' ').trim();

  return { sinopsis, autor, paginas };
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
