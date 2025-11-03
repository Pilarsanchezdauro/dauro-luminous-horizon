import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This script reads blog posts from the build and generates static HTML files
// with proper Open Graph meta tags for social media sharing

// IMPORTANT: When adding new blog posts, make sure to:
// 1. Add an 'ogImage' field pointing to a file in public/ (e.g., "/og-my-post.png")
// 2. The ogImage should be 1200x630px for optimal display on social media
// 3. The script will automatically generate the pre-rendered HTML

const blogPosts = [
  {
    slug: 'una-voz-para-dos-tierras-presentaciones',
    title: 'Una voz para dos tierras: un viaje poético entre continentes',
    excerpt: 'El periplo de presentaciones del libro Una voz para dos tierras, de Lorena Avelar, ha sido un auténtico puente entre culturas.',
    image: '/og-una-voz-dos-tierras.png',
    date: '1 Noviembre 2025',
    author: 'Equipo Dauro'
  },
  {
    slug: 'presentacion-latido-carmen-alcaide',
    title: 'Presentación de Latido. Apasionadamente vuestro en el Cuarto Real de Santo Domingo',
    excerpt: 'Granada, 28 de octubre de 2025. Ayer presentamos en el Cuarto Real de Santo Domingo Latido. Apasionadamente vuestro, la nueva novela de Carmen Alcaide.',
    image: '/og-latido-presentacion.jpg',
    date: '28 Octubre 2025',
    author: 'Equipo Dauro'
  },
  {
    slug: 'el-hidalgo-don-rodrigo-guion',
    title: 'El Hidalgo Don Rodrigo de Cervantes: de las páginas al guion',
    excerpt: 'Después de más de un año de escritura, documentación y desarrollo creativo, Grupo Dauro se complace en anunciar que el guion de la serie está casi terminado.',
    image: '/og-don-rodrigo.png',
    date: '29 Octubre 2025',
    author: 'Grupo Dauro'
  },
  {
    slug: 'nfts-oficiales-seleccion-argentina',
    title: 'Grupo Dauro crea los NFTs oficiales de los últimos partidos de la Selección Argentina',
    excerpt: 'El arte, la innovación y el fútbol argentino se unen en un proyecto sin precedentes.',
    image: '/og-nft-argentina.png',
    date: '30 Octubre 2025',
    author: 'Grupo Dauro'
  },
  {
    slug: 'ia-con-identidad-estetica',
    title: 'IA con identidad estética: la apuesta de Grupo Dauro IA',
    excerpt: 'En un momento donde todo se acelera, apostamos por crear con intención, con belleza, con estructura.',
    image: '/og-ia-con-arte.png',
    date: '31 Octubre 2025',
    author: 'Grupo Dauro'
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

function generateBlogPostHTML(post) {
  const safeTitle = escapeHtml(post.title);
  const safeExcerpt = escapeHtml(post.excerpt);
  const safeAuthor = escapeHtml(post.author);
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | Grupo Dauro</title>
  <meta name="description" content="${safeExcerpt}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${baseUrl}/blog/${post.slug}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeExcerpt}" />
  <meta property="og:image" content="${baseUrl}${post.image}" />
  <meta property="og:image:secure_url" content="${baseUrl}${post.image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/${post.image.endsWith('.png') ? 'png' : 'jpeg'}" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:site_name" content="Grupo Cultural Dauro" />
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:author" content="${safeAuthor}" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${baseUrl}/blog/${post.slug}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeExcerpt}" />
  <meta name="twitter:image" content="${baseUrl}${post.image}" />
  <meta name="twitter:image:alt" content="${safeTitle}" />
  
  <!-- WhatsApp specific meta tags -->
  <meta property="og:image:alt" content="${safeTitle}" />
  
  <meta http-equiv="refresh" content="0;url=/blog/${post.slug}" />
  <script>window.location.href = '/blog/${post.slug}';</script>
</head>
<body>
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 100px auto; text-align: center; padding: 20px;">
    <h1>${safeTitle}</h1>
    <p>Redirigiendo al artículo...</p>
    <p><a href="/blog/${post.slug}" style="color: #0066cc;">Haz clic aquí si no eres redirigido automáticamente</a></p>
  </div>
</body>
</html>`;
}

// Generate HTML files for each blog post
const distPath = resolve(__dirname, '../dist/blog');

try {
  mkdirSync(distPath, { recursive: true });
  
  blogPosts.forEach(post => {
    const postDir = resolve(distPath, post.slug);
    mkdirSync(postDir, { recursive: true });
    
    const html = generateBlogPostHTML(post);
    const filePath = resolve(postDir, 'index.html');
    
    writeFileSync(filePath, html, 'utf-8');
    console.log(`✓ Generated: /blog/${post.slug}/`);
  });
  
  console.log(`\n✅ ${blogPosts.length} blog posts pre-rendered successfully!`);
  console.log('\n📱 For WhatsApp/Social Media sharing:');
  console.log('   After deploy, use Facebook Sharing Debugger to refresh cache:');
  console.log('   https://developers.facebook.com/tools/debug/\n');
} catch (error) {
  console.error('❌ Error pre-rendering blog posts:', error);
  process.exit(1);
}
