# Guía para Configurar Imágenes Open Graph en Todo el Sitio

## 🎯 Configuración actual

El sitio ya está configurado para mostrar imágenes correctamente en WhatsApp y redes sociales:

✅ **Páginas principales** - Usan imagen genérica del sitio (`/og-image.jpg`)
✅ **Posts del blog** - Cada uno tiene su imagen personalizada
✅ **Pre-renderizado automático** - Se genera HTML estático en cada deploy

---

## 📱 Para compartir páginas principales (Inicio, Editorial, Arte, etc.)

Estas páginas usan la imagen genérica del sitio. Para personalizarlas:

### 1. Edita `scripts/prerender-pages.js`

Encuentra la página que quieres personalizar:

```javascript
{
  path: 'editorial',
  title: 'Editorial Dauro - Publicación de Obras Literarias',
  description: 'Editorial independiente...',
  image: '/og-editorial.jpg'  // ← Cambia a tu imagen personalizada
}
```

### 2. Crea la imagen Open Graph

- Dimensiones: **1200 x 630 píxeles**
- Guarda en: `public/og-[nombre].jpg`
- Diseño: Logo + título de la sección + visual relevante

---

## ✅ Checklist para cada nuevo post del blog

### 1. Preparar la imagen Open Graph

**Requisitos de la imagen:**
- Dimensiones: **1200 x 630 píxeles** (obligatorio para redes sociales)
- Formato: PNG o JPG
- Peso: < 1MB recomendado
- Ubicación: carpeta `public/`
- Nombre: `og-[slug-del-post].png` o `.jpg`

**Ejemplo:**
```
public/og-mi-nuevo-post.png  ← Imagen para compartir en redes
```

### 2. Añadir el post en `src/data/blogData.ts`

**Campos obligatorios para compartir correctamente:**

```typescript
{
  title: "Título del Post",
  excerpt: "Descripción breve que aparecerá en WhatsApp/redes (150-200 caracteres ideal)",
  date: "1 Enero 2025",
  author: "Grupo Dauro",
  image: importedImage,           // ← Imagen para mostrar en el blog
  ogImage: "/og-mi-nuevo-post.png", // ← CRÍTICO: Imagen para redes sociales
  category: "literatura",
  slug: "mi-nuevo-post",           // ← URL del post
  content: `Contenido del post...`
}
```

### 3. Actualizar el script de pre-renderizado

**Edita `scripts/prerender-blog.js`** y añade tu post al array `blogPosts`:

```javascript
const blogPosts = [
  // ... posts existentes ...
  {
    slug: 'mi-nuevo-post',        // ← Mismo slug que en blogData.ts
    title: 'Título del Post',     // ← Mismo título
    excerpt: 'Descripción breve', // ← Mismo excerpt
    image: '/og-mi-nuevo-post.png', // ← Ruta de la imagen OG
    date: '1 Enero 2025',         // ← Mismo date
    author: 'Grupo Dauro'         // ← Mismo author
  }
];
```

### 4. Deploy y verificar

Después del deploy:

1. **Limpia el cache de Facebook/WhatsApp:**
   - Ve a: https://developers.facebook.com/tools/debug/
   - Pega la URL de tu post: `https://grupodauro.com/blog/mi-nuevo-post`
   - Presiona "Scrape Again"

2. **Verifica en WhatsApp:**
   - Envía el enlace en un chat
   - Deberías ver la imagen, título y descripción correctos

## 🎨 Cómo crear imágenes Open Graph de 1200x630px

### Opción 1: Con Canva (recomendado)
1. Crea un diseño con dimensiones 1200 x 630 px
2. Añade el título del post, imagen principal y logo de Grupo Dauro
3. Exporta como PNG o JPG
4. Guarda en `public/og-nombre-post.png`

### Opción 2: Con Photoshop/GIMP
1. Nuevo documento: 1200 x 630 px, 72 dpi
2. Diseña el preview del post
3. Exporta para web (PNG o JPG optimizado)
4. Guarda en `public/og-nombre-post.png`

### Opción 3: Automatizada con código
Si tienes muchos posts, puedes usar herramientas como:
- `@vercel/og` para generar imágenes automáticamente
- Puppeteer para capturas de pantalla
- Canvas API de Node.js

## ❌ Errores comunes a evitar

### ⚠️ Error 1: Olvidar el campo `ogImage`
```typescript
// ❌ MAL - La imagen no aparecerá en WhatsApp
{
  title: "Mi Post",
  image: importedImage,
  // falta ogImage
}

// ✅ BIEN
{
  title: "Mi Post", 
  image: importedImage,
  ogImage: "/og-mi-post.png"  // ← Añade esto siempre
}
```

### ⚠️ Error 2: Imagen en `src/assets/` en vez de `public/`
```typescript
// ❌ MAL - WhatsApp no puede acceder a src/assets/
ogImage: importedImage  // ← Esto es un import, no una URL pública

// ✅ BIEN - Archivo en public/ con ruta absoluta
ogImage: "/og-mi-post.png"  // ← Empieza con /
```

### ⚠️ Error 3: No actualizar el script de pre-renderizado
```javascript
// Si no añades el post aquí, no se generará el HTML estático
// y WhatsApp/Facebook no verán los meta tags correctos
```

### ⚠️ Error 4: Dimensiones incorrectas de imagen
- Facebook/LinkedIn: Requiere 1200x630px
- WhatsApp: Acepta varias, pero 1200x630px es óptimo
- Twitter: Prefiere 1200x675px pero acepta 1200x630px

## 📝 Plantilla rápida para copiar y pegar

**En blogData.ts:**
```typescript
{
  title: "[TÍTULO DEL POST]",
  excerpt: "[DESCRIPCIÓN CORTA PARA REDES SOCIALES]",
  date: "[DÍA MES AÑO]",
  author: "Grupo Dauro",
  image: [IMPORTED_IMAGE],
  ogImage: "/og-[slug].png",
  category: "[literatura|arte|cine|ia]",
  slug: "[slug-del-post]",
  bookImage: "[opcional]",
  bookLink: "[opcional]",
  content: `[CONTENIDO COMPLETO]`
}
```

**En prerender-blog.js:**
```javascript
{
  slug: '[slug-del-post]',
  title: '[TÍTULO DEL POST]',
  excerpt: '[DESCRIPCIÓN CORTA]',
  image: '/og-[slug].png',
  date: '[DÍA MES AÑO]',
  author: 'Grupo Dauro'
}
```

## 🔍 Testing antes del deploy

Puedes verificar localmente que todo funciona:

1. **Build local:**
   ```bash
   npm run build
   node scripts/prerender-blog.js
   ```

2. **Verifica que se generó el HTML:**
   ```bash
   ls dist/blog/[slug-del-post]/index.html
   ```

3. **Revisa el contenido:**
   ```bash
   cat dist/blog/[slug-del-post]/index.html
   ```
   Deberías ver todos los meta tags Open Graph con las URLs correctas.

## 📱 Resultado esperado

Cuando todo esté correcto, al compartir en WhatsApp verás:

```
┌─────────────────────────────┐
│  [Imagen Open Graph]        │
│                             │
├─────────────────────────────┤
│ Título del Post             │
│ Descripción del post...     │
│                             │
│ grupodauro.com              │
└─────────────────────────────┘
```

## 🚀 Resumen: 4 pasos simples

1. ✅ Crea imagen 1200x630px → guarda en `public/og-[slug].png`
2. ✅ Añade post en `blogData.ts` con campo `ogImage`
3. ✅ Añade post en `prerender-blog.js`
4. ✅ Deploy → Limpia cache en Facebook Debugger

---

**¿Preguntas?** Revisa posts existentes como ejemplo en `src/data/blogData.ts`
