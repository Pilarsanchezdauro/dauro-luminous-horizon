import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main pages to pre-render
const pages = [
  {
    path: 'grupo-dauro',
    title: 'Grupo Dauro - Quiénes Somos',
    description: 'Conoce al Grupo Cultural Dauro: editorial, galería de arte y producción cinematográfica en Granada.',
    image: '/og-image.jpg'
  },
  {
    path: 'editorial',
    title: 'Editorial Dauro - Publicación de Obras Literarias',
    description: 'Editorial independiente especializada en literatura de calidad. Publicamos novela, poesía y ensayo.',
    image: '/og-image.jpg'
  },
  {
    path: 'arte',
    title: 'Dauro Arte - Galería y Servicios Artísticos',
    description: 'Galería de arte contemporáneo y servicios de consultoría artística en Granada.',
    image: '/og-image.jpg'
  },
  {
    path: 'cine',
    title: 'Dauro Cine - Producción Audiovisual',
    description: 'Producción cinematográfica independiente y servicios audiovisuales de calidad.',
    image: '/og-image.jpg'
  },
  {
    path: 'ia',
    title: 'Dauro IA - Inteligencia Artificial con Identidad Estética',
    description: 'Servicios creativos con IA: generación de contenido, diseño y estrategia digital.',
    image: '/og-image.jpg'
  },
  {
    path: 'servicios',
    title: 'Servicios Culturales y Creativos',
    description: 'Consultoría cultural, diseño editorial, producción audiovisual y servicios creativos con IA.',
    image: '/og-image.jpg'
  },
  {
    path: 'blog',
    title: 'Blog - Noticias Culturales y Eventos',
    description: 'Últimas noticias del mundo cultural: presentaciones de libros, eventos de arte, estrenos y novedades sobre IA creativa.',
    image: '/og-image.jpg'
  },
  {
    path: 'contacto',
    title: 'Contacto - Grupo Cultural Dauro',
    description: 'Ponte en contacto con el Grupo Cultural Dauro para proyectos editoriales, artísticos o audiovisuales.',
    image: '/og-image.jpg'
  }
];

const baseUrl = 'https://grupodauro.com';

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generatePageHTML(page) {
  const safeTitle = escapeHtml(page.title);
  const safeDescription = escapeHtml(page.description);
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | Grupo Dauro</title>
  <meta name="description" content="${safeDescription}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${baseUrl}/${page.path}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:image" content="${baseUrl}${page.image}" />
  <meta property="og:image:secure_url" content="${baseUrl}${page.image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:site_name" content="Grupo Cultural Dauro" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${baseUrl}/${page.path}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${baseUrl}${page.image}" />
  <meta name="twitter:image:alt" content="${safeTitle}" />
  
  <!-- WhatsApp specific -->
  <meta property="og:image:alt" content="${safeTitle}" />
  
  <meta http-equiv="refresh" content="0;url=/${page.path}" />
  <script>window.location.href = '/${page.path}';</script>
</head>
<body>
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 100px auto; text-align: center; padding: 20px;">
    <h1>${safeTitle}</h1>
    <p>Redirigiendo...</p>
    <p><a href="/${page.path}" style="color: #0066cc;">Haz clic aquí si no eres redirigido automáticamente</a></p>
  </div>
</body>
</html>`;
}

// Generate HTML files for each page
const distPath = resolve(__dirname, '../dist');

try {
  mkdirSync(distPath, { recursive: true });
  
  pages.forEach(page => {
    const pageDir = resolve(distPath, page.path);
    mkdirSync(pageDir, { recursive: true });
    
    const html = generatePageHTML(page);
    const filePath = resolve(pageDir, 'index.html');
    
    writeFileSync(filePath, html, 'utf-8');
    console.log(`✓ Generated: /${page.path}/`);
  });
  
  console.log(`\n✅ ${pages.length} pages pre-rendered successfully!`);
  console.log('\n📱 Open Graph images configured for:');
  console.log('   - All main pages');
  console.log('   - All blog posts');
  console.log('\n🔄 Next steps after deploy:');
  console.log('   1. Test links in WhatsApp');
  console.log('   2. Use Facebook Sharing Debugger if needed:');
  console.log('      https://developers.facebook.com/tools/debug/\n');
} catch (error) {
  console.error('❌ Error pre-rendering pages:', error);
  process.exit(1);
}
