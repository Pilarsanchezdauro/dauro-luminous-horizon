import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Blog posts data
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
    title: 'Presentación de \'Latido. Apasionadamente vuestro\' en el Cuarto Real de Santo Domingo',
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

function generateBlogPostHTML(post) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title} | Grupo Dauro</title>
  <meta name="description" content="${post.excerpt}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${baseUrl}/blog/${post.slug}" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.excerpt}" />
  <meta property="og:image" content="${baseUrl}${post.image}" />
  <meta property="og:image:secure_url" content="${baseUrl}${post.image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:site_name" content="Grupo Cultural Dauro" />
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:author" content="${post.author}" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${baseUrl}/blog/${post.slug}" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.excerpt}" />
  <meta name="twitter:image" content="${baseUrl}${post.image}" />
  <meta name="twitter:image:alt" content="${post.title}" />
  
  <meta http-equiv="refresh" content="0;url=/blog/${post.slug}" />
  <script>window.location.href = '/blog/${post.slug}';</script>
</head>
<body>
  <p>Redirigiendo...</p>
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
    console.log(`✓ Generated: ${filePath}`);
  });
  
  console.log('\n✓ Blog posts pre-rendered successfully!');
} catch (error) {
  console.error('Error pre-rendering blog posts:', error);
  process.exit(1);
}
