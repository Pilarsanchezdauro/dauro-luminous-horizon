/**
 * Automatización SEO para imágenes - Grupo Dauro
 * Sistema que normaliza nombres, genera alt text y gestiona metadatos
 */

export type ContentType = 'person' | 'institution' | 'company' | 'work' | 'event' | 'default';

interface ImageContext {
  title?: string;
  description?: string;
  type?: ContentType;
  formType?: string;
}

/**
 * Detecta el tipo de contenido basado en el contexto
 */
export function detectContentType(context: ImageContext): ContentType {
  const { title = '', description = '', formType = '' } = context;
  const combinedText = `${title} ${description} ${formType}`.toLowerCase();

  // Detección basada en palabras clave
  if (combinedText.match(/\b(autor|escritor|artista|director|persona|retrato)\b/)) {
    return 'person';
  }
  if (combinedText.match(/\b(universidad|instituto|escuela|organización|institución)\b/)) {
    return 'institution';
  }
  if (combinedText.match(/\b(empresa|compañía|marca|logo)\b/)) {
    return 'company';
  }
  if (combinedText.match(/\b(libro|obra|portada|publicación|novela|poesía)\b/)) {
    return 'work';
  }
  if (combinedText.match(/\b(evento|presentación|congreso|festival|exposición)\b/)) {
    return 'event';
  }

  // Detección por tipo de formulario
  if (formType.includes('editorial') || formType.includes('book')) {
    return 'work';
  }
  if (formType.includes('portfolio') || formType.includes('project')) {
    return 'work';
  }

  return 'default';
}

/**
 * Normaliza texto para nombres de archivo
 */
export function normalizeForFilename(text: string, maxLength: number = 80): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .replace(/^-|-$/g, '') // Eliminar guiones al inicio/fin
    .slice(0, maxLength);
}

/**
 * Genera nombre de archivo SEO-friendly
 */
export function generateSeoFilename(
  originalFilename: string,
  context: ImageContext
): string {
  const contentType = context.type || detectContentType(context);
  const extension = originalFilename.split('.').pop() || 'jpg';
  
  let baseName = '';
  
  if (context.title) {
    baseName = normalizeForFilename(context.title);
  } else {
    // Usar nombre original sin extensión
    baseName = normalizeForFilename(
      originalFilename.replace(/\.[^/.]+$/, '')
    );
  }

  // Construir nombre con patrón: grupo-dauro-{type}-{name}.ext
  return `grupo-dauro-${contentType}-${baseName}.${extension}`;
}

/**
 * Genera alt text descriptivo según el tipo de contenido
 */
export function generateAltText(
  filename: string,
  context: ImageContext
): string {
  const contentType = context.type || detectContentType(context);
  const title = context.title || filename.replace(/\.[^/.]+$/, '');

  const templates: Record<ContentType, string> = {
    person: `Retrato de ${title} – Grupo Dauro`,
    institution: `Imagen de la institución ${title} – Grupo Dauro`,
    company: `Logo de ${title} – Grupo Dauro`,
    work: `Portada de ${title} – Grupo Dauro`,
    event: `Imagen del evento ${title} – Grupo Dauro`,
    default: `Imagen de ${title} – Grupo Dauro`,
  };

  return templates[contentType];
}

/**
 * Procesa un archivo de imagen aplicando todas las transformaciones SEO
 */
export function processImageForSeo(
  file: File,
  context: ImageContext
): {
  processedFile: File;
  altText: string;
  metadata: {
    author: string;
    copyright: string;
    contentType: ContentType;
  };
} {
  const contentType = context.type || detectContentType(context);
  const newFilename = generateSeoFilename(file.name, { ...context, type: contentType });
  const altText = generateAltText(file.name, { ...context, type: contentType });

  // Crear nuevo archivo con el nombre optimizado
  const processedFile = new File([file], newFilename, {
    type: file.type,
    lastModified: file.lastModified,
  });

  return {
    processedFile,
    altText,
    metadata: {
      author: 'Grupo Dauro',
      copyright: '© Grupo Dauro',
      contentType,
    },
  };
}

/**
 * Valida que un archivo sea una imagen
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Obtiene sugerencias de contexto basadas en el nombre del archivo
 */
export function suggestContextFromFilename(filename: string): Partial<ImageContext> {
  const cleanName = filename.replace(/\.[^/.]+$/, '');
  
  return {
    title: cleanName
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  };
}
