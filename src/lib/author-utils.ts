/**
 * Utilidades para extraer y normalizar nombres de autores de los títulos de productos
 * 
 * Formatos típicos de títulos:
 * - "TÍTULO – Autor"
 * - "TÍTULO - Autor" 
 * - "TÍTULO — Autor"
 * - "Título – Nombre Apellido Apellido"
 */

// Extraer el autor del título del producto
export function extractAuthorFromTitle(title: string): string | null {
  if (!title) return null;
  
  // Separador típico con espacios alrededor del guión (–, —, -)
  const parts = title.split(/\s[–—-]\s/);

  if (parts.length >= 2) {
    const potentialAuthor = parts[parts.length - 1].trim();
    
    // Validar que sea un nombre de autor válido
    if (
      potentialAuthor &&
      potentialAuthor.toLowerCase() !== "nan" &&
      potentialAuthor.length > 2 &&
      potentialAuthor.length < 60 && // Los nombres no son muy largos
      !potentialAuthor.match(/^\d+$/) && // No es solo números
      !potentialAuthor.toLowerCase().includes('ebook') &&
      !potentialAuthor.toLowerCase().includes('libro')
    ) {
      return potentialAuthor;
    }
  }

  return null;
}

// Extraer solo el título sin el autor
export function extractTitleWithoutAuthor(fullTitle: string): string {
  if (!fullTitle) return fullTitle;
  
  const parts = fullTitle.split(/\s[–—-]\s/);
  
  if (parts.length >= 2) {
    // Devolver todo excepto la última parte (que es el autor)
    return parts.slice(0, -1).join(' – ').trim();
  }
  
  return fullTitle;
}

// Normalizar nombre del autor para comparación
export function normalizeAuthorName(author: string): string {
  return author
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9\s]/g, "") // Solo letras, números y espacios
    .replace(/\s+/g, " ") // Normalizar espacios múltiples
    .trim();
}

// Comprobar si dos nombres de autor coinciden
export function authorsMatch(author1: string, author2: string): boolean {
  const normalized1 = normalizeAuthorName(author1);
  const normalized2 = normalizeAuthorName(author2);
  
  // Coincidencia exacta
  if (normalized1 === normalized2) return true;
  
  // Uno contiene al otro (para variaciones de nombre)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    // Solo si la diferencia no es demasiado grande
    const minLen = Math.min(normalized1.length, normalized2.length);
    const maxLen = Math.max(normalized1.length, normalized2.length);
    return minLen >= maxLen * 0.5; // Al menos 50% del nombre más largo
  }
  
  return false;
}

// Extraer todos los autores únicos de una lista de productos
export function extractUniqueAuthors(products: any[]): string[] {
  const authorsMap = new Map<string, string>(); // normalized -> original
  
  products.forEach(product => {
    const title = product.node?.title || product.title;
    const author = extractAuthorFromTitle(title);
    
    if (author) {
      const normalized = normalizeAuthorName(author);
      
      // Verificar si ya existe un autor similar
      let found = false;
      for (const [existingNorm, existingOriginal] of authorsMap.entries()) {
        if (authorsMatch(author, existingOriginal)) {
          // Preferir el nombre más largo/completo
          if (author.length > existingOriginal.length) {
            authorsMap.delete(existingNorm);
            authorsMap.set(normalized, author);
          }
          found = true;
          break;
        }
      }
      
      if (!found) {
        authorsMap.set(normalized, author);
      }
    }
  });
  
  // Ordenar alfabéticamente y devolver los nombres originales
  return Array.from(authorsMap.values()).sort((a, b) => 
    a.localeCompare(b, 'es', { sensitivity: 'base' })
  );
}

// Filtrar productos por autor
export function filterProductsByAuthor(products: any[], targetAuthor: string): any[] {
  if (!targetAuthor || targetAuthor === "todos") return products;
  
  return products.filter(product => {
    const title = product.node?.title || product.title;
    const productAuthor = extractAuthorFromTitle(title);
    
    if (!productAuthor) return false;
    
    return authorsMatch(productAuthor, targetAuthor);
  });
}

// Contar productos por autor
export function countProductsByAuthor(products: any[], targetAuthor: string): number {
  return filterProductsByAuthor(products, targetAuthor).length;
}
