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

// Obtener el apellido principal de un autor (último apellido normalmente)
function getMainSurname(author: string): string {
  const normalized = normalizeAuthorName(author);
  const parts = normalized.split(" ").filter(p => p.length > 2);
  // Devolver el último apellido (o el nombre si solo hay uno)
  return parts.length > 0 ? parts[parts.length - 1] : normalized;
}

// Comprobar si dos nombres de autor coinciden
export function authorsMatch(author1: string, author2: string): boolean {
  const normalized1 = normalizeAuthorName(author1);
  const normalized2 = normalizeAuthorName(author2);
  
  // Coincidencia exacta
  if (normalized1 === normalized2) return true;
  
  // Obtener partes de cada nombre
  const parts1 = normalized1.split(" ").filter(p => p.length > 2);
  const parts2 = normalized2.split(" ").filter(p => p.length > 2);
  
  // Comprobar si comparten apellido principal (último)
  const surname1 = parts1[parts1.length - 1] || "";
  const surname2 = parts2[parts2.length - 1] || "";
  
  // Typo correction: si los apellidos son muy similares (ej: "blanco" vs "blanco")
  if (surname1 === surname2 && surname1.length > 3) {
    // Verificar que al menos un nombre/palabra coincida o sea similar
    const commonParts = parts1.filter(p1 => 
      parts2.some(p2 => p1 === p2 || 
        (p1.length > 3 && p2.length > 3 && (p1.includes(p2) || p2.includes(p1))))
    );
    if (commonParts.length > 0) return true;
  }
  
  // Uno contiene al otro (para variaciones de nombre)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    // Solo si la diferencia no es demasiado grande
    const minLen = Math.min(normalized1.length, normalized2.length);
    const maxLen = Math.max(normalized1.length, normalized2.length);
    return minLen >= maxLen * 0.5; // Al menos 50% del nombre más largo
  }
  
  return false;
}

// Obtener la versión canónica de un autor (la más completa y correcta)
function getCanonicalAuthorName(existingName: string, newName: string): string {
  // Preferir nombres con más partes (más completos)
  const existingParts = existingName.split(/\s+/).length;
  const newParts = newName.split(/\s+/).length;
  
  if (newParts > existingParts) return newName;
  if (existingParts > newParts) return existingName;
  
  // Si tienen el mismo número de partes, preferir mayúsculas/minúsculas correctas
  const existingHasProperCase = existingName !== existingName.toUpperCase() && existingName !== existingName.toLowerCase();
  const newHasProperCase = newName !== newName.toUpperCase() && newName !== newName.toLowerCase();
  
  if (newHasProperCase && !existingHasProperCase) return newName;
  if (existingHasProperCase && !newHasProperCase) return existingName;
  
  // Preferir el más largo
  return newName.length > existingName.length ? newName : existingName;
}

// Extraer todos los autores únicos de una lista de productos
export function extractUniqueAuthors(products: any[]): string[] {
  const authorsMap = new Map<string, { canonical: string, count: number }>(); // normalized surname -> {canonical, count}
  
  products.forEach(product => {
    const title = product.node?.title || product.title;
    const author = extractAuthorFromTitle(title);
    
    if (author) {
      const mainSurname = getMainSurname(author);
      
      // Buscar si ya existe un autor con el mismo apellido principal
      let foundKey: string | null = null;
      for (const [key, data] of authorsMap.entries()) {
        if (authorsMatch(author, data.canonical)) {
          foundKey = key;
          break;
        }
      }
      
      if (foundKey) {
        const existing = authorsMap.get(foundKey)!;
        authorsMap.set(foundKey, {
          canonical: getCanonicalAuthorName(existing.canonical, author),
          count: existing.count + 1
        });
      } else {
        authorsMap.set(mainSurname, { canonical: author, count: 1 });
      }
    }
  });
  
  // Ordenar alfabéticamente y devolver los nombres canónicos
  return Array.from(authorsMap.values())
    .map(v => v.canonical)
    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
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
