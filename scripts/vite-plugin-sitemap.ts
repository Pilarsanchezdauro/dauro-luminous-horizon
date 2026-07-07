import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://www.grupodauro.com';

// Static pages configuration
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/grupo-dauro', priority: '0.8', changefreq: 'monthly' },
  { path: '/grupo-dauro/editorial', priority: '0.9', changefreq: 'monthly' },
  { path: '/autoedicion', priority: '0.9', changefreq: 'monthly' },
  { path: '/grupo-dauro/arte', priority: '0.9', changefreq: 'monthly' },
  { path: '/grupo-dauro/cine', priority: '0.9', changefreq: 'monthly' },
  { path: '/grupo-dauro/cine/el-hidalgo-don-rodrigo', priority: '0.8', changefreq: 'monthly' },
  { path: '/grupo-dauro/cine/latido', priority: '0.8', changefreq: 'monthly' },
  { path: '/grupo-dauro/cine/el-huesped-de-las-tinieblas', priority: '0.7', changefreq: 'monthly' },
  { path: '/grupo-dauro/musica', priority: '0.8', changefreq: 'monthly' },
  { path: '/grupo-dauro/ia', priority: '0.9', changefreq: 'monthly' },
  { path: '/dauro-ciencia', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/shop', priority: '0.8', changefreq: 'weekly' },
  { path: '/tienda', priority: '0.8', changefreq: 'weekly' },
  { path: '/catalogo', priority: '0.8', changefreq: 'weekly' },
  { path: '/servicios', priority: '0.8', changefreq: 'monthly' },
  { path: '/portafolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/contacto', priority: '0.7', changefreq: 'monthly' },
  { path: '/solicitar-proyecto', priority: '0.7', changefreq: 'monthly' },
  { path: '/solicitar-web', priority: '0.7', changefreq: 'monthly' },
  { path: '/solicitar-booktrailer', priority: '0.7', changefreq: 'monthly' },
  { path: '/solicitar-portada', priority: '0.7', changefreq: 'monthly' },
  { path: '/generador-portadas', priority: '0.6', changefreq: 'monthly' },
  { path: '/presupuestador', priority: '0.6', changefreq: 'monthly' },
  { path: '/presupuestador-ciencia', priority: '0.5', changefreq: 'monthly' },
  { path: '/artistas/solicitud', priority: '0.6', changefreq: 'monthly' },
  { path: '/webs-de-libros', priority: '0.6', changefreq: 'monthly' },
  { path: '/webs-de-libros/carlos-blanco/leonardo-da-vinci', priority: '0.6', changefreq: 'yearly' },
  { path: '/webs-de-libros/antonio-rodriguez/liderazgo-discursivo', priority: '0.6', changefreq: 'yearly' },
  { path: '/compromiso-etico', priority: '0.6', changefreq: 'yearly' },
  { path: '/archivo-historico', priority: '0.5', changefreq: 'yearly' },
  { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { path: '/terminos', priority: '0.3', changefreq: 'yearly' },
];

function extractBlogPostsFromSource(rootDir: string) {
  try {
    const blogDataPath = resolve(rootDir, 'src/data/blogData.ts');
    const content = readFileSync(blogDataPath, 'utf-8');
    
    const postsMatch = content.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[([\s\S]*?)\n\];/);
    
    if (!postsMatch) {
      console.warn('[sitemap] Could not find blogPosts array in blogData.ts');
      return [];
    }
    
    const posts: Array<{ title: string; date: string; slug: string; image?: string; imageTitle?: string; imageAlt?: string }> = [];
    const arrayContent = postsMatch[1];
    const postBlocks = arrayContent.split(/\n  \{/).slice(1);

    postBlocks.forEach(block => {
      const post: { title?: string; date?: string; slug?: string; image?: string; imageTitle?: string; imageAlt?: string } = {};

      const titleMatch = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
      if (titleMatch) post.title = titleMatch[1];

      const dateMatch = block.match(/date:\s*["'`]([^"'`]+)["'`]/);
      if (dateMatch) post.date = dateMatch[1];

      const slugMatch = block.match(/slug:\s*["'`]([^"'`]+)["'`]/);
      if (slugMatch) post.slug = slugMatch[1];

      // Título conciso y alt para el sitemap de imágenes (SEO de Google Imágenes)
      const metaTitleMatch = block.match(/metaTitle:\s*["'`]([^"'`]+)["'`]/);
      post.imageTitle = metaTitleMatch ? metaTitleMatch[1] : post.title;

      const imageAltMatch = block.match(/imageAlt:\s*["'`]([^"'`]+)["'`]/);
      if (imageAltMatch) post.imageAlt = imageAltMatch[1];

      const ogImageMatch = block.match(/ogImage:\s*["'`]([^"'`]+)["'`]/);
      if (ogImageMatch) {
        post.image = ogImageMatch[1];
      } else {
        const imageMatch = block.match(/image:\s*["'`](\/[^"'`]+)["'`]/);
        if (imageMatch) {
          post.image = imageMatch[1];
        }
      }

      if (post.title && post.slug && post.date) {
        posts.push(post as { title: string; date: string; slug: string; image?: string; imageTitle?: string; imageAlt?: string });
      }
    });
    
    return posts;
  } catch (error) {
    console.error('[sitemap] Error reading blogData.ts:', error);
    return [];
  }
}

function parseSpanishDate(dateStr: string): string {
  const months: Record<string, string> = {
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
    'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
    'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
  };
  
  const parts = dateStr.toLowerCase().split(' ');
  if (parts.length >= 3) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1]] || '01';
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap(blogPosts: Array<{ title: string; date: string; slug: string; image?: string; imageTitle?: string; imageAlt?: string }>): string {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Generated automatically on ${today} -->
  <!-- Static Pages -->
`;

  staticPages.forEach(page => {
    // Sin lastmod en páginas estáticas: una fecha de build idéntica en todas
    // anula el valor de la señal para Google (los posts sí llevan su fecha real)
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `
  <!-- Blog Posts (${blogPosts.length} articles) -->
`;

  blogPosts.forEach(post => {
    const lastmod = parseSpanishDate(post.date);
    const safeImageTitle = escapeXml(post.imageTitle || post.title);
    const safeCaption = escapeXml(post.imageAlt || post.title);

    xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`;

    if (post.image) {
      xml += `
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${safeImageTitle}</image:title>
      <image:caption>${safeCaption}</image:caption>
    </image:image>`;
    }

    xml += `
  </url>
`;
  });

  xml += `
</urlset>`;

  return xml;
}

export function sitemapPlugin() {
  let rootDir: string;
  
  return {
    name: 'vite-plugin-sitemap',
    configResolved(config: { root: string }) {
      rootDir = config.root;
    },
    closeBundle() {
      console.log('\n🗺️  Generating sitemap.xml...');
      
      const blogPosts = extractBlogPostsFromSource(rootDir);
      const sitemap = generateSitemap(blogPosts);
      
      const distPath = resolve(rootDir, 'dist/sitemap.xml');
      writeFileSync(distPath, sitemap, 'utf-8');
      
      console.log(`✅ Sitemap generated: ${staticPages.length} pages + ${blogPosts.length} blog posts\n`);
    }
  };
}
