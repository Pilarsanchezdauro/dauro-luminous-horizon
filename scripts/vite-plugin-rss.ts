import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://grupodauro.com';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  content?: string;
}

function extractBlogPostsFromSource(rootDir: string): BlogPost[] {
  try {
    const blogDataPath = resolve(rootDir, 'src/data/blogData.ts');
    const content = readFileSync(blogDataPath, 'utf-8');
    
    const postsMatch = content.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[([\s\S]*?)\n\];/);
    
    if (!postsMatch) {
      console.warn('[rss] Could not find blogPosts array in blogData.ts');
      return [];
    }
    
    const posts: BlogPost[] = [];
    const arrayContent = postsMatch[1];
    const postBlocks = arrayContent.split(/\n  \{/).slice(1);
    
    postBlocks.forEach(block => {
      const post: Partial<BlogPost> = {};
      
      const titleMatch = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
      if (titleMatch) post.title = titleMatch[1];
      
      const excerptMatch = block.match(/excerpt:\s*["'`]([^"'`]+)["'`]/);
      if (excerptMatch) post.excerpt = excerptMatch[1];
      
      const dateMatch = block.match(/date:\s*["'`]([^"'`]+)["'`]/);
      if (dateMatch) post.date = dateMatch[1];
      
      const authorMatch = block.match(/author:\s*["'`]([^"'`]+)["'`]/);
      if (authorMatch) post.author = authorMatch[1];
      
      const slugMatch = block.match(/slug:\s*["'`]([^"'`]+)["'`]/);
      if (slugMatch) post.slug = slugMatch[1];
      
      const categoryMatch = block.match(/category:\s*["'`]([^"'`]+)["'`]/);
      if (categoryMatch) post.category = categoryMatch[1];
      
      const ogImageMatch = block.match(/ogImage:\s*["'`]([^"'`]+)["'`]/);
      if (ogImageMatch) {
        post.image = ogImageMatch[1];
      } else {
        const imageMatch = block.match(/image:\s*["'`](\/[^"'`]+)["'`]/);
        if (imageMatch) {
          post.image = imageMatch[1];
        }
      }
      
      if (post.title && post.slug && post.excerpt && post.date) {
        posts.push(post as BlogPost);
      }
    });
    
    return posts;
  } catch (error) {
    console.error('[rss] Error reading blogData.ts:', error);
    return [];
  }
}

function parseSpanishDate(dateStr: string): Date {
  const months: Record<string, number> = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
    'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
    'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };
  
  const parts = dateStr.toLowerCase().split(' ');
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]] ?? 0;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date();
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getCategoryLabel(category: string): string {
  const categoryMap: Record<string, string> = {
    'literatura': 'Literatura',
    'arte': 'Arte',
    'cine': 'Cine',
    'ia': 'Inteligencia Artificial',
    'consejos': 'Consejos para Autores',
    'musica': 'Música'
  };
  return categoryMap[category] || category;
}

function generateRssFeed(blogPosts: BlogPost[]): string {
  const buildDate = new Date().toUTCString();
  
  const rssItems = blogPosts.map((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = parseSpanishDate(post.date).toUTCString();
    const imageUrl = post.image ? 
      (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`) : 
      `${baseUrl}/og-image.jpg`;
    const safeTitle = escapeXml(post.title);
    const safeExcerpt = escapeXml(post.excerpt);
    const safeAuthor = escapeXml(post.author || 'Grupo Dauro');
    const safeCategory = escapeXml(getCategoryLabel(post.category));

    return `    <item>
      <title>${safeTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>info@grupodauro.com (${safeAuthor})</author>
      <category>${safeCategory}</category>
      <description>${safeExcerpt}</description>
      <content:encoded><![CDATA[
        <img src="${imageUrl}" alt="${safeTitle}" style="max-width:100%;height:auto;" />
        <p>${post.excerpt}</p>
        <p><a href="${postUrl}">Leer artículo completo en Grupo Cultural Dauro</a></p>
      ]]></content:encoded>
      <media:content url="${imageUrl}" medium="image" />
      <media:thumbnail url="${imageUrl}" />
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Grupo Cultural Dauro - Blog</title>
    <link>${baseUrl}</link>
    <description>Arte, Literatura, Cine e Inteligencia Artificial - Últimas publicaciones del blog de Grupo Cultural Dauro</description>
    <language>es-ES</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/favicon.png</url>
      <title>Grupo Cultural Dauro</title>
      <link>${baseUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
    <copyright>© ${new Date().getFullYear()} Grupo Cultural Dauro. Todos los derechos reservados.</copyright>
    <managingEditor>info@grupodauro.com (Grupo Cultural Dauro)</managingEditor>
    <webMaster>info@grupodauro.com (Grupo Cultural Dauro)</webMaster>
    <category>Cultura</category>
    <category>Literatura</category>
    <category>Arte</category>
    <docs>https://www.rssboard.org/rss-specification</docs>
${rssItems}
  </channel>
</rss>`;
}

export function rssFeedPlugin() {
  let rootDir: string;
  
  return {
    name: 'vite-plugin-rss-feed',
    configResolved(config: { root: string }) {
      rootDir = config.root;
    },
    closeBundle() {
      console.log('📰 Generating RSS feed...');
      
      const blogPosts = extractBlogPostsFromSource(rootDir);
      const rssFeed = generateRssFeed(blogPosts);
      
      const distPath = resolve(rootDir, 'dist/feed.xml');
      writeFileSync(distPath, rssFeed, 'utf-8');
      
      console.log(`✅ RSS feed generated: ${blogPosts.length} articles\n`);
    }
  };
}
