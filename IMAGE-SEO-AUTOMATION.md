# Sistema de Automatización SEO para Imágenes - Grupo Dauro

## Descripción

Sistema automático que optimiza todas las imágenes del sitio web para SEO, generando nombres de archivo descriptivos, alt text optimizado y metadatos consistentes.

## Características

### 1. Normalización Automática de Nombres

- Convierte a minúsculas
- Elimina acentos y caracteres especiales
- Reemplaza espacios con guiones
- Formato: `grupo-dauro-{tipo}-{nombre}.ext`

**Ejemplo:**
- Original: `Retrato García Lorca.JPG`
- Optimizado: `grupo-dauro-person-retrato-garcia-lorca.jpg`

### 2. Generación de Alt Text

Genera alt text descriptivo según el tipo de contenido:

- **Persona**: `Retrato de {título} – Grupo Dauro`
- **Institución**: `Imagen de la institución {título} – Grupo Dauro`
- **Empresa**: `Logo de {título} – Grupo Dauro`
- **Obra**: `Portada de {título} – Grupo Dauro`
- **Evento**: `Imagen del evento {título} – Grupo Dauro`
- **General**: `Imagen de {título} – Grupo Dauro`

### 3. Metadatos Automáticos

Todas las imágenes incluyen:
- **Autor**: Grupo Dauro
- **Copyright**: © Grupo Dauro
- **Tipo de contenido**: Detectado automáticamente

## Componentes del Sistema

### 1. Librería de Utilidades (`src/lib/image-seo-automation.ts`)

Funciones disponibles:

```typescript
// Detectar tipo de contenido
detectContentType(context: ImageContext): ContentType

// Normalizar texto para nombres de archivo
normalizeForFilename(text: string, maxLength?: number): string

// Generar nombre de archivo SEO
generateSeoFilename(originalFilename: string, context: ImageContext): string

// Generar alt text
generateAltText(filename: string, context: ImageContext): string

// Procesar imagen completa
processImageForSeo(file: File, context: ImageContext): ProcessedImage

// Validar que sea una imagen
isImageFile(file: File): boolean

// Sugerir contexto desde nombre de archivo
suggestContextFromFilename(filename: string): Partial<ImageContext>
```

### 2. Hook Personalizado (`src/hooks/use-image-seo-upload.tsx`)

Hook React para facilitar el procesamiento de imágenes:

```typescript
const { processedImages, isProcessing, processFiles, clearProcessed } = useImageSeoUpload();

// Procesar archivos
const processed = await processFiles(files, {
  title: 'Don Rodrigo de Vivar',
  type: 'person',
  formType: 'editorial'
});
```

### 3. Componente de Upload (`src/components/SeoImageUpload.tsx`)

Componente React reutilizable con UI completa:

```typescript
<SeoImageUpload
  onImagesProcessed={(images) => {
    // Manejar imágenes procesadas
  }}
  defaultTitle="Mi Título"
  defaultType="work"
  maxImages={5}
  formType="editorial"
  showPreview={true}
/>
```

### 4. Gestor de Admin (`/admin/image-seo`)

Herramienta web para:
- Generar nombres de archivo optimizados
- Previsualizar alt text
- Probar diferentes tipos de contenido
- Copiar resultados al portapapeles

## Tipos de Contenido

### Person (Persona)
**Uso**: Retratos de autores, artistas, directores
**Palabras clave**: autor, escritor, artista, director, persona, retrato

### Institution (Institución)
**Uso**: Universidades, organizaciones, centros culturales
**Palabras clave**: universidad, instituto, escuela, organización, institución

### Company (Empresa)
**Uso**: Logos, marcas comerciales
**Palabras clave**: empresa, compañía, marca, logo

### Work (Obra)
**Uso**: Portadas de libros, publicaciones, obras artísticas
**Palabras clave**: libro, obra, portada, publicación, novela, poesía

### Event (Evento)
**Uso**: Presentaciones, festivales, exposiciones
**Palabras clave**: evento, presentación, congreso, festival, exposición

### Default (General)
**Uso**: Cualquier otro tipo de imagen

## Uso en Formularios Existentes

### Método 1: Usar el componente completo

```typescript
import { SeoImageUpload } from '@/components/SeoImageUpload';

function MyForm() {
  const handleImages = (images) => {
    images.forEach(({ file, altText }) => {
      // Subir archivo con nombre optimizado
      // Guardar altText en base de datos
    });
  };

  return (
    <SeoImageUpload
      onImagesProcessed={handleImages}
      defaultTitle={formData.title}
      formType="editorial"
    />
  );
}
```

### Método 2: Usar el hook directamente

```typescript
import { useImageSeoUpload } from '@/hooks/use-image-seo-upload';

function MyForm() {
  const { processFiles } = useImageSeoUpload();

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    const processed = await processFiles(files, {
      title: 'Mi Título',
      type: 'work'
    });
    
    // Usar processed.file y processed.altText
  };

  return <input type="file" onChange={handleFileUpload} />;
}
```

### Método 3: Usar las utilidades directamente

```typescript
import { processImageForSeo } from '@/lib/image-seo-automation';

function handleFile(file: File) {
  const { processedFile, altText, metadata } = processImageForSeo(file, {
    title: 'Don Rodrigo de Vivar',
    type: 'person'
  });
  
  // Usar processedFile para upload
  // Guardar altText en base de datos
}
```

## Integración con Formularios Existentes

### BookCoverRequestForm
```typescript
// Agregar al formulario de solicitud de portadas
<SeoImageUpload
  onImagesProcessed={handleReferenceImages}
  defaultTitle={formData.bookTitle}
  defaultType="work"
  formType="book-cover"
/>
```

### SubmitWorkForm
```typescript
// Agregar al formulario de propuestas editoriales
<SeoImageUpload
  onImagesProcessed={handleCoverImage}
  defaultTitle={formData.title}
  defaultType="work"
  formType="editorial"
/>
```

### ProjectForm (Admin)
```typescript
// Agregar al formulario de proyectos
<SeoImageUpload
  onImagesProcessed={handleProjectImages}
  defaultTitle={formData.title}
  formType="project"
/>
```

## Detección Automática

El sistema detecta automáticamente el tipo de contenido basándose en:

1. **Contexto del formulario** (`formType`)
   - `editorial` o `book` → `work`
   - `portfolio` o `project` → `work`

2. **Palabras clave en título y descripción**
   - Analiza el texto combinado
   - Busca patrones específicos
   - Asigna el tipo más relevante

3. **Tipo manual** (opcional)
   - Permite override manual cuando sea necesario

## Mejores Prácticas

### Para Desarrolladores

1. **Siempre proporcionar contexto**
   ```typescript
   processFiles(files, {
     title: formData.title,        // IMPORTANTE
     description: formData.summary,
     type: 'work',                  // opcional si hay buena descripción
     formType: 'editorial'          // ayuda a la detección
   });
   ```

2. **Validar tipo de archivo**
   ```typescript
   if (isImageFile(file)) {
     // procesar
   }
   ```

3. **Limpiar previews**
   ```typescript
   useEffect(() => {
     return () => clearProcessed(); // cleanup
   }, []);
   ```

### Para Editores de Contenido

1. **Nombres descriptivos**: Usar títulos claros y descriptivos
2. **Tipo correcto**: Seleccionar el tipo adecuado cuando sea ambiguo
3. **Revisar resultados**: Usar el gestor de admin para verificar

## Beneficios SEO

1. **Nombres descriptivos**: Mejoran el ranking en búsqueda de imágenes
2. **Alt text optimizado**: Mejora accesibilidad y SEO
3. **Consistencia de marca**: "Grupo Dauro" en todos los alt texts
4. **Metadatos completos**: Atribución y copyright automáticos
5. **URLs amigables**: Nombres de archivo legibles y descriptivos

## Próximos Pasos (Opcional)

### Procesamiento Batch de Imágenes Existentes

Para aplicar SEO a imágenes ya subidas:

1. Crear script que liste todas las imágenes en storage
2. Para cada imagen:
   - Obtener metadata desde base de datos
   - Generar nuevo nombre y alt text
   - Actualizar referencias en BD
   - Opcional: renombrar archivo en storage

### Integración con Edge Functions

Para procesamiento del lado del servidor:

```typescript
// supabase/functions/process-image-seo/index.ts
import { processImageForSeo } from './image-seo-automation.ts';

serve(async (req) => {
  const { file, context } = await req.json();
  const result = processImageForSeo(file, context);
  return new Response(JSON.stringify(result));
});
```

## Soporte

Para dudas o problemas:
- Revisar la documentación en este archivo
- Consultar ejemplos en los componentes existentes
- Usar el gestor web en `/admin/image-seo` para pruebas

---

**Versión**: 1.0  
**Última actualización**: 2025  
**Autor**: Lovable AI para Grupo Cultural Dauro
