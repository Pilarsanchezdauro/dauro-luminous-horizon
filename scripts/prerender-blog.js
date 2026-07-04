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

    // SEO overrides opcionales (título/descr. concisos, keywords, alt de imagen)
    const metaTitleMatch = block.match(/metaTitle:\s*["'`]([^"'`]+)["'`]/);
    if (metaTitleMatch) post.metaTitle = metaTitleMatch[1];

    const metaDescMatch = block.match(/metaDescription:\s*["'`]([^"'`]+)["'`]/);
    if (metaDescMatch) post.metaDescription = metaDescMatch[1];

    const keywordsMatch = block.match(/keywords:\s*["'`]([^"'`]+)["'`]/);
    if (keywordsMatch) post.keywords = keywordsMatch[1];

    const imageAltMatch = block.match(/imageAlt:\s*["'`]([^"'`]+)["'`]/);
    if (imageAltMatch) post.imageAlt = imageAltMatch[1];

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

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription || post.excerpt,
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

  if (post.keywords) {
    article.keywords = post.keywords;
  }

  return article;
}

function generateBreadcrumbStructuredData(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${baseUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": getCategoryInSpanish(post.category), "item": `${baseUrl}/blog?categoria=${post.category}` },
      { "@type": "ListItem", "position": 4, "name": post.title, "item": `${baseUrl}/blog/${post.slug}` }
    ]
  };
}

// Use SPA index.html as template so each blog post
// returns full app shell plus article-specific SEO meta
const blogTemplatePath = resolve(__dirname, '../dist/index.html');
let blogTemplateHtml = '';

try {
  blogTemplateHtml = readFileSync(blogTemplatePath, 'utf-8');
} catch (error) {
  console.error('❌ Error reading base template index.html for prerender-blog:', error);
  process.exit(1);
}

function generateBlogPostHTML(post) {
  // Título/descr. concisos para buscadores (fallback al largo si no hay override)
  const safeTitle = escapeHtml(post.metaTitle || post.title);
  const safeDescription = escapeHtml(post.metaDescription || post.excerpt);
  const safeImageAlt = escapeHtml(post.imageAlt || post.title);
  const safeAuthor = escapeHtml(post.author || 'Grupo Dauro');
  const isoDate = parseSpanishDate(post.date);
  const structuredData = generateArticleStructuredData(post);
  const breadcrumbData = generateBreadcrumbStructuredData(post);
  const url = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = `${baseUrl}${post.image}`;

  let html = blogTemplateHtml;

  // Remove any existing meta tags that we'll override so each article has a single, correct source of truth
  html = html
    .replace(/<link rel="canonical"[^>]*>\s*/g, '')
    .replace(/<meta name="keywords"[^>]*>\s*/g, '')
    .replace(/<meta property="og:url"[^>]*>\s*/g, '')
    .replace(/<meta property="og:image[^"]*"[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:url"[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:image"[^>]*>\s*/g, '');

  // Primary title and description
  html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle} | Grupo Dauro</title>`);
  html = html.replace(/<meta name="title"[^>]*>/, `<meta name="title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${safeDescription}" />`);
  html = html.replace(/<meta name="author"[^>]*>/, `<meta name="author" content="${safeAuthor}" />`);


  // Open Graph
  html = html.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="article" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${safeDescription}" />`);

  // Twitter
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${safeDescription}" />`);

  const keywordsMeta = post.keywords ? `\n  <meta name="keywords" content="${escapeHtml(post.keywords)}" />` : '';

  const extraMeta = `
  <link rel="canonical" href="${url}" />${keywordsMeta}
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:secure_url" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/${post.image.endsWith('.png') ? 'png' : 'jpeg'}" />
  <meta property="og:image:alt" content="${safeImageAlt}" />
  <meta property="article:published_time" content="${isoDate}" />
  <meta property="article:modified_time" content="${isoDate}" />
  <meta property="article:author" content="${safeAuthor}" />
  <meta property="article:section" content="${getCategoryInSpanish(post.category)}" />
  <meta name="twitter:url" content="${url}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:image:alt" content="${safeImageAlt}" />
  `;

  const structuredDataScript = `
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(breadcrumbData, null, 2)}
  </script>`;

  const metaBlock = `${extraMeta}\n${structuredDataScript}`;

  if (html.includes('<!-- SEO_DYNAMIC_META_BLOG -->')) {
    html = html.replace('<!-- SEO_DYNAMIC_META_BLOG -->', metaBlock);
  } else {
    html = html.replace('</head>', `${metaBlock}\n  </head>`);
  }

  return html;
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
