import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  image_url: string | null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating RSS feed...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    console.log(`Found ${posts?.length || 0} published posts`);

    const siteUrl = 'https://grupodauro.com';
    const buildDate = new Date().toUTCString();
    
    // Generate RSS XML
    const rssItems = (posts as BlogPost[]).map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.published_at).toUTCString();
      const imageUrl = post.image_url ? 
        (post.image_url.startsWith('http') ? post.image_url : `${siteUrl}${post.image_url}`) : 
        `${siteUrl}/og-image.jpg`;

      // Clean content for RSS (remove markdown, limit length)
      const cleanContent = post.content
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove markdown images
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/##\s/g, '') // Remove headings
        .substring(0, 500);

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>info@grupodauro.com (${post.author})</author>
      <category><![CDATA[${post.category}]]></category>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[
        <img src="${imageUrl}" alt="${post.title}" />
        <p>${post.excerpt}</p>
        <p>${cleanContent}...</p>
        <p><a href="${postUrl}">Leer más en Grupo Cultural Dauro</a></p>
      ]]></content:encoded>
      <media:content url="${imageUrl}" medium="image" />
    </item>`;
    }).join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Grupo Cultural Dauro - Blog</title>
    <link>${siteUrl}</link>
    <description>Arte, Literatura, Cine e Inteligencia Artificial - Últimas publicaciones del blog de Grupo Cultural Dauro</description>
    <language>es</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/favicon.png</url>
      <title>Grupo Cultural Dauro</title>
      <link>${siteUrl}</link>
    </image>
    <copyright>© ${new Date().getFullYear()} Grupo Cultural Dauro</copyright>
    <managingEditor>info@grupodauro.com (Grupo Cultural Dauro)</managingEditor>
    <webMaster>info@grupodauro.com (Grupo Cultural Dauro)</webMaster>
    ${rssItems}
  </channel>
</rss>`;

    console.log('RSS feed generated successfully');

    return new Response(rssXml, {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error: any) {
    console.error('Error generating RSS feed:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
