import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main pages to pre-render
// IMPORTANTE: title y description deben coincidir EXACTAMENTE con el <SEO> del
// componente React de cada página (src/pages/*.tsx). Si cambias uno, cambia el otro.
const pages = [
  {
    path: 'grupo-dauro',
    title: 'Grupo Cultural Dauro | Editorial y Servicios para Autores en Granada',
    description: 'Grupo Cultural Dauro: editorial independiente, servicios de autoedición, maquetación, diseño de portadas y publicación de libros. Más de 2000 obras publicadas desde el año 2000.',
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'grupo-dauro/editorial',
    title: 'Publicar Libro | Editorial Dauro - Edición de Libros en España',
    description: '¿Quieres publicar tu libro? Editorial Dauro ofrece edición profesional, autoedición y publicación con distribución en 4000 librerías. Envía tu manuscrito gratis.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'autoedicion',
    title: 'Autoedición de Libros | Publica tu Libro desde 690€ con ISBN y Distribución - Dauro Editorial',
    description: 'Publica tu libro con calidad editorial profesional desde 690€. Incluye maquetación, portada personalizada, ISBN, ebook gratis y distribución en Amazon, Casa del Libro, Fnac y más. 26 años de experiencia. Financiación sin intereses en 2 plazos.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'grupo-dauro/arte',
    title: 'Dauro Arte · Representación de Obras y Artistas de Alto Nivel',
    description: 'Representamos obras y artistas de alto nivel: gestión, promoción y venta de arte contemporáneo con red internacional de coleccionistas. También tasación, peritaje y autenticación de obras.',
    image: '/og-arte.jpg'
  },
  {
    path: 'grupo-dauro/cine',
    title: 'Dauro Cine - Guionistas de Cine y TV | Series y Preproducción Audiovisual',
    description: 'Guionistas especializados en series de televisión, cine y desarrollo de proyectos audiovisuales. Expertos en preproducción, adaptación literaria y edición. Bajo la supervisión de Juan José Porto.',
    image: '/og-cine.jpg'
  },
  {
    path: 'grupo-dauro/cine/el-hidalgo-don-rodrigo',
    title: 'El Hidalgo Don Rodrigo de Cervantes — Serie de Drama Histórico | Guion Dauro',
    description: 'Serie de drama histórico basada en la novela de Francisco del Valle Sánchez. La infancia de Miguel de Cervantes y el origen de Don Quijote, en la España de Felipe II (1553–1556). Adaptación de guion de Pilar Sánchez para Grupo Cultural Dauro.',
    image: '/og-don-rodrigo.png'
  },
  {
    path: 'grupo-dauro/cine/latido',
    title: 'Latido. Apasionadamente vuestro — Serie sobre la Transición | Guion Dauro',
    description: 'Serie de drama, romance y thriller político basada en la novela de Carmen Alcaide. Amor y Historia en la España de la Transición (1973–1979). Adaptación de guion de Pilar Sánchez para Grupo Cultural Dauro.',
    image: '/og-latido-presentacion.jpg'
  },
  {
    path: 'grupo-dauro/cine/el-huesped-de-las-tinieblas',
    title: 'El Huésped de las Tinieblas — Serie de Juan José Porto | Guion Dauro',
    description: 'Nuevo proyecto de serie de Juan José Porto para Grupo Cultural Dauro. Actualmente en desarrollo. Drama y thriller de la mano de un referente del cine español.',
    image: '/og-cine.jpg'
  },
  {
    path: 'grupo-dauro/ia',
    title: 'División Tecnológica · IA para Empresas | Software a Medida, IA Generativa y Cursos',
    description: 'La división tecnológica de Grupo Dauro: desarrollamos software a medida e integraciones con IA generativa, implantamos inteligencia artificial segura en empresas —sin fugas de datos— y formamos a tu equipo con cursos de IA.',
    image: '/og-ia.jpg'
  },
  {
    path: 'servicios',
    title: 'Servicios Creativos y Editoriales | Grupo Cultural Dauro',
    description: 'Servicios profesionales para autores y creadores: edición, maquetación, diseño de portadas, guionismo, producción audiovisual, IA creativa y tasación de arte.',
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'blog',
    title: 'Blog - Noticias Culturales y Eventos',
    description: 'Lee las últimas noticias del mundo cultural: presentaciones de libros, eventos de arte, estrenos cinematográficos y novedades sobre IA creativa. Blog actualizado del Grupo Dauro.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'contacto',
    title: 'Contacto | Envía tu Manuscrito - Editorial Dauro Granada',
    description: '¿Quieres publicar tu libro? Contacta con Editorial Dauro para enviar tu manuscrito, solicitar presupuesto de edición o información sobre autoedición. Respuesta en 48h.',
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
    title: 'Comprar Libros Online — Envío a Europa, USA y Latinoamérica',
    description: 'Compra libros de Grupo Cultural Dauro con envío a España, Europa, Estados Unidos, México, Argentina, Colombia, Chile y más. Tienda directa y distribución internacional.',
    image: '/og-editorial.jpg'
  },
  {
    path: 'portafolio',
    title: 'Portafolio Creativo | Webs, Booktrailers, Diseño y Branding',
    description: 'Explora nuestro portafolio de proyectos creativos: webs de libros, booktrailers, diseño de portadas, imagen corporativa, producción musical y pintura.',
    image: '/og-grupo-dauro.jpg'
  },
  {
    path: 'grupo-dauro/musica',
    title: 'Dauro Música - Producción Musical y Composición Original',
    description: 'Producción musical innovadora: composición original, grabaciones, videoclips musicales y proyectos artísticos. Creamos música que emociona y trasciende fronteras.',
    image: '/og-el-arte-es-navidad.png'
  },
  {
    path: 'solicitar-portada',
    title: 'Diseño de Portadas de Libros | Solicita Presupuesto Gratis',
    description: 'Diseño profesional de portadas para tu libro. Portadas personalizadas, atractivas y optimizadas para venta. Solicita presupuesto sin compromiso.',
    image: '/og-generador-portadas-gratis.png'
  },
  {
    path: 'solicitar-booktrailer',
    title: 'Booktrailers Profesionales | Promociona tu Libro con Vídeo',
    description: 'Creamos booktrailers cinematográficos para promocionar tu libro. Vídeos profesionales que captan la esencia de tu obra.',
    image: '/og-cine.jpg'
  },
  {
    path: 'dauro-ciencia',
    title: 'Dauro Ciencia | Publicar Tesis Doctoral e Investigación Científica',
    description: 'Publica tu tesis doctoral o investigación con sello académico. Evaluación por expertos con agentes tecnológicos. ISBN, distribución en Europa, EE.UU. y Latinoamérica.',
    image: '/og-dauro-ciencia.jpg'
  }
];


const baseUrl = 'https://www.grupodauro.com';

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
