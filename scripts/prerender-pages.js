import { writeFileSync, mkdirSync, readFileSync } from 'fs';
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
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'grupo-dauro/editorial',
    title: 'Editorial Dauro - Publicación de Obras Literarias',
    description: 'Editorial independiente especializada en literatura de calidad. Publicamos novela, poesía y ensayo.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'grupo-dauro/arte',
    title: 'Dauro Arte - Galería y Servicios Artísticos',
    description: 'Galería de arte contemporáneo y servicios de consultoría artística en Granada.',
    image: '/og-arte.jpg'
  },
  {
    path: 'grupo-dauro/cine',
    title: 'Dauro Cine - Producción Audiovisual',
    description: 'Producción cinematográfica independiente y servicios audiovisuales de calidad.',
    image: '/og-cine.jpg'
  },
  {
    path: 'grupo-dauro/ia',
    title: 'Dauro IA - Inteligencia Artificial con Identidad Estética',
    description: 'Servicios creativos con IA: generación de contenido, diseño y estrategia digital.',
    image: '/og-ia.jpg'
  },
  {
    path: 'servicios',
    title: 'Servicios Culturales y Creativos',
    description: 'Consultoría cultural, diseño editorial, producción audiovisual y servicios creativos con IA.',
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'blog',
    title: 'Blog - Noticias Culturales y Eventos',
    description: 'Últimas noticias del mundo cultural: presentaciones de libros, eventos de arte, estrenos y novedades sobre IA creativa.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'contacto',
    title: 'Contacto - Grupo Cultural Dauro',
    description: 'Ponte en contacto con el Grupo Cultural Dauro para proyectos editoriales, artísticos o audiovisuales.',
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'portafolio/jose-carrera',
    title: 'José Carrera - Cantante | Grupo Cultural Dauro',
    description: 'Cantante con voz serena y contenida que acompaña y potencia proyectos empresariales mediante canciones y videoclips de alta calidad.',
    image: '/og-jose-carrera-2025.jpg'
  },
  {
    path: 'tienda',
    title: 'Tienda Cultural - Libros y Productos Exclusivos',
    description: 'Descubre nuestra selección de libros, obras de arte y productos culturales exclusivos del Grupo Dauro.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'portafolio',
    title: 'Portafolio - Proyectos y Trabajos Destacados',
    description: 'Explora nuestro portafolio de proyectos: diseño editorial, branding, producción audiovisual y creaciones con IA.',
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'grupo-dauro/musica',
    title: 'Dauro Música - Producción Musical y Artistas',
    description: 'Descubre nuestra división musical: producción, representación de artistas y proyectos sonoros de calidad.',
    image: '/og-el-arte-es-navidad.png'
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

// Use the built SPA index.html as template so each route
// returns the full app shell with route-specific SEO meta tags
const distPath = resolve(__dirname, '../dist');
const templatePath = resolve(distPath, 'index.html');
let templateHtml = '';

try {
  templateHtml = readFileSync(templatePath, 'utf-8');
} catch (error) {
  console.error('❌ Error reading base template index.html for prerender-pages:', error);
  process.exit(1);
}

function generatePageHTML(page) {
  const safeTitle = escapeHtml(page.title);
  const safeDescription = escapeHtml(page.description);
  const url = `${baseUrl}/${page.path}`;
  const imageUrl = `${baseUrl}${page.image}`;

  let html = templateHtml;
 
  // Remove any existing meta tags that we'll override so each route has a single, correct source of truth
  html = html
    .replace(/<link rel="canonical"[^>]*>\s*/g, '')
    .replace(/<meta property="og:url"[^>]*>\s*/g, '')
    .replace(/<meta property="og:image[^"]*"[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:url"[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:image"[^>]*>\s*/g, '');
 
  // Primary title and description
  html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(/<meta name="title"[^>]*>/, `<meta name="title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${safeDescription}" />`);


  // Open Graph basics
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${safeDescription}" />`);

  // Twitter basics
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${safeDescription}" />`);

  const extraMeta = `
  <link rel="canonical" href="${url}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:secure_url" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content="${safeTitle}" />
  <meta name="twitter:url" content="${url}" />
  <meta name="twitter:image" content="${imageUrl}" />
  `;

  if (html.includes('<!-- SEO_DYNAMIC_META -->')) {
    html = html.replace('<!-- SEO_DYNAMIC_META -->', extraMeta);
  } else {
    html = html.replace('</head>', `${extraMeta}\n  </head>`);
  }

  return html;
}

// Generate HTML files for each page

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
