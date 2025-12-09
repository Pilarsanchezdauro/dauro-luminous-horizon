import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This script reads blog posts from blogData.ts and generates static HTML files
// with proper Open Graph meta tags and structured data for social media sharing and SEO

// Read and parse blogData.ts to extract posts
function extractBlogPostsFromSource() {
  const blogDataPath = resolve(__dirname, '../src/data/blogData.ts');
  const content = readFileSync(blogDataPath, 'utf-8');
  
  // Extract the blogPosts array using regex
  const postsMatch = content.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  
  if (!postsMatch) {
    console.error('Could not find blogPosts array in blogData.ts');
    return [];
  }
  
  const posts = [];
  const arrayContent = postsMatch[1];
  
  // Split by post objects (they start with { and newline)
  const postBlocks = arrayContent.split(/\n  \{/).slice(1);
  
  postBlocks.forEach(block => {
    const post = {};
    
    // Extract title
    const titleMatch = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (titleMatch) post.title = titleMatch[1];
    
    // Extract excerpt
    const excerptMatch = block.match(/excerpt:\s*["'`]([^"'`]+)["'`]/);
    if (excerptMatch) post.excerpt = excerptMatch[1];
    
    // Extract date
    const dateMatch = block.match(/date:\s*["'`]([^"'`]+)["'`]/);
    if (dateMatch) post.date = dateMatch[1];
    
    // Extract author
    const authorMatch = block.match(/author:\s*["'`]([^"'`]+)["'`]/);
    if (authorMatch) post.author = authorMatch[1];
    
    // Extract slug
    const slugMatch = block.match(/slug:\s*["'`]([^"'`]+)["'`]/);
    if (slugMatch) post.slug = slugMatch[1];
    
    // Extract ogImage (preferred) or image
    const ogImageMatch = block.match(/ogImage:\s*["'`]([^"'`]+)["'`]/);
    if (ogImageMatch) {
      post.image = ogImageMatch[1];
    } else {
      // Try to get image from the image field (if it's a string path, not an import)
      const imageMatch = block.match(/image:\s*["'`](\/[^"'`]+)["'`]/);
      if (imageMatch) {
        post.image = imageMatch[1];
      }
    }
    
    // Extract category
    const categoryMatch = block.match(/category:\s*["'`]([^"'`]+)["'`]/);
    if (categoryMatch) post.category = categoryMatch[1];
    
    // Only add posts with required fields
    if (post.title && post.slug && post.excerpt) {
      // Set default image if not found
      if (!post.image) {
        post.image = '/og-image.jpg';
      }
      posts.push(post);
    }
  });
  
  return posts;
}

const baseUrl = 'https://grupodauro.com';

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseSpanishDate(dateStr) {
  // Parse dates like "7 Diciembre 2025" to ISO format
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

function getCategoryInSpanish(category) {
  const categoryMap = {
    'literatura': 'Literatura',
    'arte': 'Arte',
    'cine': 'Cine',
    'ia': 'Inteligencia Artificial',
    'consejos': 'Consejos para Autores',
    'musica': 'Música'
  };
  return categoryMap[category] || category;
}

function generateArticleStructuredData(post) {
  const isoDate = parseSpanishDate(post.date);
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${baseUrl}${post.image}`,
    "author": {
      "@type": "Organization",
      "name": post.author || "Grupo Cultural Dauro",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Grupo Cultural Dauro",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/og-logo.png`
      }
    },
    "datePublished": isoDate,
    "dateModified": isoDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "articleSection": getCategoryInSpanish(post.category),
    "inLanguage": "es-ES"
  };
}

function generateBlogPostHTML(post) {
  const safeTitle = escapeHtml(post.title);
  const safeExcerpt = escapeHtml(post.excerpt);
  const safeAuthor = escapeHtml(post.author || 'Grupo Dauro');
  const isoDate = parseSpanishDate(post.date);
  const structuredData = generateArticleStructuredData(post);
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | Grupo Dauro</title>
  <meta name="description" content="${safeExcerpt}" />
  <meta name="author" content="${safeAuthor}" />
  <link rel="canonical" href="${baseUrl}/blog/${post.slug}" />
  
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
  <meta property="og:image:alt" content="${safeTitle}" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:site_name" content="Grupo Cultural Dauro" />
  <meta property="article:published_time" content="${isoDate}" />
  <meta property="article:modified_time" content="${isoDate}" />
  <meta property="article:author" content="${safeAuthor}" />
  <meta property="article:section" content="${getCategoryInSpanish(post.category)}" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${baseUrl}/blog/${post.slug}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeExcerpt}" />
  <meta name="twitter:image" content="${baseUrl}${post.image}" />
  <meta name="twitter:image:alt" content="${safeTitle}" />
  
  <!-- Structured Data / JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  
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

// Main execution
console.log('📖 Reading blog posts from blogData.ts...\n');

const blogPosts = extractBlogPostsFromSource();

if (blogPosts.length === 0) {
  console.error('❌ No blog posts found!');
  process.exit(1);
}

console.log(`Found ${blogPosts.length} blog posts:\n`);
blogPosts.forEach(post => {
  console.log(`  • ${post.slug}`);
});
console.log('');

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
  
  console.log(`\n✅ ${blogPosts.length} blog posts pre-rendered with JSON-LD structured data!`);
  console.log('\n📱 For WhatsApp/Social Media sharing:');
  console.log('   After deploy, use Facebook Sharing Debugger to refresh cache:');
  console.log('   https://developers.facebook.com/tools/debug/');
  console.log('\n🔍 For Google rich results:');
  console.log('   Test your structured data at:');
  console.log('   https://search.google.com/test/rich-results\n');
} catch (error) {
  console.error('❌ Error pre-rendering blog posts:', error);
  process.exit(1);
}
