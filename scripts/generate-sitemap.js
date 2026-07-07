import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This script generates a dynamic sitemap.xml including all blog posts from blogData.ts

const baseUrl = 'https://www.grupodauro.com';

// Static pages configuration
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/grupo-dauro', priority: '0.9', changefreq: 'monthly' },
  { path: '/grupo-dauro/editorial', priority: '1.0', changefreq: 'weekly' }, // Alta prioridad para autores
  { path: '/grupo-dauro/arte', priority: '0.8', changefreq: 'monthly' },
  { path: '/grupo-dauro/cine', priority: '0.8', changefreq: 'monthly' },
  { path: '/grupo-dauro/ia', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/shop', priority: '0.8', changefreq: 'weekly' },
  { path: '/tienda', priority: '0.9', changefreq: 'weekly' },
  { path: '/catalogo', priority: '0.9', changefreq: 'weekly' },
  { path: '/servicios', priority: '1.0', changefreq: 'monthly' }, // Alta prioridad para autores
  { path: '/portafolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/contacto', priority: '0.8', changefreq: 'monthly' },
  { path: '/solicitar-proyecto', priority: '0.7', changefreq: 'monthly' },
  { path: '/solicitar-web', priority: '0.7', changefreq: 'monthly' },
  { path: '/solicitar-booktrailer', priority: '0.8', changefreq: 'monthly' },
  { path: '/solicitar-portada', priority: '0.9', changefreq: 'monthly' }, // Alta prioridad para autores
  { path: '/generador-portadas', priority: '0.9', changefreq: 'monthly' }, // Herramienta gratuita
  { path: '/compromiso-etico', priority: '0.6', changefreq: 'yearly' },
  { path: '/archivo-historico', priority: '0.5', changefreq: 'yearly' },
  { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { path: '/terminos', priority: '0.3', changefreq: 'yearly' },
];

// Read and parse blogData.ts to extract posts
function extractBlogPostsFromSource() {
  const blogDataPath = resolve(__dirname, '../src/data/blogData.ts');
  const content = readFileSync(blogDataPath, 'utf-8');
  
  const postsMatch = content.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  
  if (!postsMatch) {
    console.error('Could not find blogPosts array in blogData.ts');
    return [];
  }
  
  const posts = [];
  const arrayContent = postsMatch[1];
  const postBlocks = arrayContent.split(/\n  \{/).slice(1);
  
  postBlocks.forEach(block => {
    const post = {};
    
    const titleMatch = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (titleMatch) post.title = titleMatch[1];
    
    const dateMatch = block.match(/date:\s*["'`]([^"'`]+)["'`]/);
    if (dateMatch) post.date = dateMatch[1];
    
    const slugMatch = block.match(/slug:\s*["'`]([^"'`]+)["'`]/);
    if (slugMatch) post.slug = slugMatch[1];
    
    const ogImageMatch = block.match(/ogImage:\s*["'`]([^"'`]+)["'`]/);
    if (ogImageMatch) {
      post.image = ogImageMatch[1];
    } else {
      const imageMatch = block.match(/image:\s*["'`](\/[^"'`]+)["'`]/);
      if (imageMatch) {
        post.image = imageMatch[1];
      }
    }
    
    if (post.title && post.slug) {
      posts.push(post);
    }
  });
  
  return posts;
}

function parseSpanishDate(dateStr) {
  const months = {
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

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap(blogPosts) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Generated automatically on ${today} -->
  <!-- Static Pages -->
`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `
  <!-- Blog Posts (${blogPosts.length} articles) -->
`;

  // Add blog posts
  blogPosts.forEach(post => {
    const lastmod = parseSpanishDate(post.date);
    const safeTitle = escapeXml(post.title);
    
    xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`;
    
    if (post.image) {
      xml += `
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${safeTitle}</image:title>
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

// Main execution
console.log('🗺️  Generating sitemap.xml...\n');

const blogPosts = extractBlogPostsFromSource();

console.log(`Found ${blogPosts.length} blog posts`);
console.log(`Found ${staticPages.length} static pages`);
console.log(`Total URLs: ${blogPosts.length + staticPages.length}\n`);

const sitemap = generateSitemap(blogPosts);

// Write to dist folder (for build) and public folder (for development)
const distPath = resolve(__dirname, '../dist/sitemap.xml');
const publicPath = resolve(__dirname, '../public/sitemap.xml');

try {
  writeFileSync(publicPath, sitemap, 'utf-8');
  console.log(`✓ Written: public/sitemap.xml`);
  
  // Also try to write to dist if it exists
  try {
    writeFileSync(distPath, sitemap, 'utf-8');
    console.log(`✓ Written: dist/sitemap.xml`);
  } catch {
    // dist folder might not exist yet, that's ok
  }
  
  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`\n📊 Summary:`);
  console.log(`   • Static pages: ${staticPages.length}`);
  console.log(`   • Blog posts: ${blogPosts.length}`);
  console.log(`   • Total URLs: ${staticPages.length + blogPosts.length}`);
  console.log(`\n🔍 Submit your sitemap to Google Search Console:`);
  console.log(`   ${baseUrl}/sitemap.xml\n`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
