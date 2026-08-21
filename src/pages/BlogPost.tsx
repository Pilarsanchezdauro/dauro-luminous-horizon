import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { blogPosts as staticBlogPosts } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import NotFound from "./NotFound";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { useAnalytics } from "@/hooks/useAnalytics";
import GuideDownloadForm from "@/components/GuideDownloadForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapDbPostToUiPost, type DbBlogPostRow, type UiBlogPost } from "@/lib/blog";

const sanitizeHtmlBasic = (html: string) => {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, "$1=$2#$2");
};

// Treat content as HTML only when it includes block-level HTML tags.
// This avoids breaking Markdown rendering when the content only contains inline HTML like <a> buttons.
const isRichHtmlContent = (content: string) =>
  /<(p|h1|h2|h3|h4|ul|ol|li|blockquote|hr|br|div|section|article)\b/i.test(content);

const BlogPost = () => {
  const { slug } = useParams();
  const { trackBlogEngagement } = useAnalytics();
  const { toast } = useToast();

  const { data: dbPost, isLoading: isLoadingDbPost } = useQuery({
    queryKey: ["blog-post", slug],
    enabled: !!slug,
    queryFn: async (): Promise<UiBlogPost | null> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, created_at, published_at, title, slug, excerpt, content, author, category, tags, image_url, meta_title, meta_description"
        )
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return mapDbPostToUiPost(data as unknown as DbBlogPostRow);
    },
    staleTime: 60_000,
  });

  const post =
    dbPost ||
    (staticBlogPosts.find((p) => p.slug === slug) as UiBlogPost | undefined);

  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  // Track page view and reading time
  useEffect(() => {
    if (!post) return;

    trackBlogEngagement("post_viewed", {
      post_slug: post.slug,
      post_title: post.title,
      post_category: post.category,
    });

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setReadingTime(elapsed);
    }, 5000); // Update every 5 seconds

    return () => {
      clearInterval(interval);
      // Track reading time on unmount
      if (readingTime > 10) {
        trackBlogEngagement("post_read", {
          post_slug: post.slug,
          reading_time_seconds: readingTime,
        });
      }
    };
  }, [post, slug, trackBlogEngagement, readingTime]);

  if (isLoadingDbPost) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-muted-foreground">
              Cargando artículo...
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;
  const imageAltText = post.imageAlt || post.title;

  // Fecha en español ("3 Julio 2026") -> ISO ("2026-07-03") para los buscadores
  const toIsoDate = (dateStr: string) => {
    const months: Record<string, string> = {
      enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
      julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
    };
    const parts = dateStr.toLowerCase().split(/\s+/).filter((p) => p !== "de");
    if (parts.length >= 3) {
      const day = parts[0].padStart(2, "0");
      const month = months[parts[1]] || "01";
      return `${parts[2]}-${month}-${day}`;
    }
    return new Date().toISOString().split("T")[0];
  };
  const isoDate = toIsoDate(post.date);
  const ogImageType = (post.ogImage || post.image).toLowerCase().endsWith(".png")
    ? "image/png"
    : "image/jpeg";

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'literatura': 'Literatura',
      'arte': 'Arte',
      'cine': 'Cine',
      'ia': 'Inteligencia Artificial',
      'consejos': 'Consejos para Autores',
      'musica': 'Música'
    };
    return categoryMap[category] || category;
  };

  const getShareUrl = () => {
    // Use the production domain or current origin if in production
    const baseUrl = window.location.hostname.includes('lovableproject.com') 
      ? 'https://www.grupodauro.com' 
      : window.location.origin;
    return `${baseUrl}/blog/${post.slug}`;
  };

  const getAbsoluteImageUrl = (imageUrl: string) => {
    // If it's already an absolute URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Get the base URL
    const baseUrl = window.location.hostname.includes('lovableproject.com') 
      ? 'https://www.grupodauro.com' 
      : window.location.origin;
    
    // If the image starts with /, it's already a path from root
    const imagePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${imagePath}`;
  };

  const ogImageUrl = getAbsoluteImageUrl(post.ogImage || post.image);

  const handleShare = (platform: string) => {
    const shareUrl = getShareUrl();
    const shareTitle = post.title;
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      
      // Track social share
      trackBlogEngagement('post_shared', {
        post_slug: post.slug,
        platform,
        reading_time_seconds: readingTime
      });
    }
  };

  const copyToClipboard = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace ha sido copiado al portapapeles",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    }
  };

  // Helper to parse inline markdown: **bold** y enlaces [texto](url).
  // Los enlaces internos (empiezan por /) usan <Link> para SEO y navegación SPA;
  // los externos usan <a target="_blank">. Esto es imprescindible para que los
  // enlaces internos cuenten como tales de cara al posicionamiento.
  const parseInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let keyIndex = 0;
    const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/;

    while (remaining.length > 0) {
      const match = remaining.match(pattern);
      if (match && match.index !== undefined) {
        if (match.index > 0) {
          parts.push(remaining.slice(0, match.index));
        }

        if (match[1] !== undefined) {
          // Negrita **texto**
          parts.push(<strong key={keyIndex++}>{match[1]}</strong>);
        } else {
          // Enlace [texto](url)
          const linkText = match[2];
          const url = match[3];
          if (url.startsWith("/") || url.startsWith("#")) {
            parts.push(
              <Link key={keyIndex++} to={url} className="text-primary hover:underline">
                {linkText}
              </Link>
            );
          } else {
            parts.push(
              <a
                key={keyIndex++}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {linkText}
              </a>
            );
          }
        }

        remaining = remaining.slice(match.index + match[0].length);
        continue;
      }

      // No more matches, add remaining text
      parts.push(remaining);
      break;
    }

    return parts.length > 0 ? parts : text;
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, idx) => {
      // HTML links/buttons - render as raw HTML
      if (paragraph.trim().startsWith('<a ') && paragraph.includes('href=')) {
        return (
          <div 
            key={idx} 
            className="my-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtmlBasic(paragraph) }} 
          />
        );
      }

      // Imágenes en markdown: ![alt](url)
      const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        // La imagen nunca se muestra por encima de su tamaño real: estirar una
        // foto pequeña al ancho de la columna la deja borrosa. Y con un alto
        // contenido, para que un reportaje con varias fotos siga siendo legible.
        return (
          <div key={idx} className="my-6 md:my-8 flex flex-col items-center">
            <img
              src={imageMatch[2]}
              alt={imageMatch[1] || "Imagen del artículo"}
              loading="lazy"
              width="1200"
              height="800"
              className="max-w-full w-auto h-auto max-h-[45vh] md:max-h-[55vh] object-contain rounded-lg shadow-lg"
            />
            {imageMatch[1] && (
              <p className="text-xs sm:text-sm text-center text-muted-foreground mt-2 italic px-2">
                {imageMatch[1]}
              </p>
            )}
          </div>
        );
      }

      // Horizontal rule ---
      if (paragraph.trim() === '---') {
        return <hr key={idx} className="my-8 border-border" />;
      }

      // List items - and *
      if (paragraph.match(/^[-*] /)) {
        return (
          <li key={idx} className="mb-2 ml-6 list-disc text-muted-foreground">
            {parseInlineMarkdown(paragraph.replace(/^[-*] /, ''))}
          </li>
        );
      }

      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-playfair font-semibold mt-6 mb-3 text-foreground">
            {parseInlineMarkdown(paragraph.replace('### ', ''))}
          </h3>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl font-playfair font-bold mt-8 mb-4 text-foreground">
            {parseInlineMarkdown(paragraph.replace('## ', ''))}
          </h2>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={idx} className="font-semibold mb-2 text-foreground">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (paragraph.trim()) {
        return (
          <p key={idx} className="mb-4">
            {parseInlineMarkdown(paragraph)}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metaTitle} | Grupo Dauro</title>
        <meta name="description" content={metaDescription} />
        {post.keywords && <meta name="keywords" content={post.keywords} />}
        <meta name="author" content={post.author} />
        <link rel="canonical" href={getShareUrl()} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getShareUrl()} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content={ogImageType} />
        <meta property="og:image:alt" content={imageAltText} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Grupo Cultural Dauro" />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:modified_time" content={isoDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={getCategoryLabel(post.category)} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={getShareUrl()} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={imageAltText} />
        
        {/* Structured Data / JSON-LD */}
        <script type="application/ld+json">
           {JSON.stringify({
             "@context": "https://schema.org",
             "@type": "Article",
             "headline": metaTitle,
             "description": metaDescription,
             "image": ogImageUrl,
             "author": {
               "@type": "Organization",
               "name": post.author,
               "url": "https://www.grupodauro.com",
             },
             "publisher": {
               "@type": "Organization",
               "name": "Grupo Cultural Dauro",
               "logo": {
                 "@type": "ImageObject",
                 "url": "https://www.grupodauro.com/og-logo.png",
               },
             },
             "datePublished": isoDate,
             "dateModified": isoDate,
             "mainEntityOfPage": {
               "@type": "WebPage",
               "@id": getShareUrl(),
             },
             "articleSection": getCategoryLabel(post.category),
             "inLanguage": "es-ES",
           })}
        </script>

        {/* Breadcrumbs para resultados enriquecidos de Google */}
        <script type="application/ld+json">
           {JSON.stringify({
             "@context": "https://schema.org",
             "@type": "BreadcrumbList",
             "itemListElement": [
               { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.grupodauro.com" },
               { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.grupodauro.com/blog" },
               { "@type": "ListItem", "position": 3, "name": getCategoryLabel(post.category), "item": `https://www.grupodauro.com/blog?categoria=${post.category}` },
               { "@type": "ListItem", "position": 4, "name": post.title, "item": getShareUrl() },
             ],
           })}
        </script>
      </Helmet>
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>

              <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl">
                {/* Hero image - responsive height */}
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={post.image}
                    alt={imageAltText}
                    width="1200"
                    height="630"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <h1 className="text-4xl font-playfair font-bold mb-6 text-foreground">
                  {post.title}
                </h1>

                {/* Share buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Compartir:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="gap-2"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="gap-2"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                    className="gap-2"
                  >
                    <svg 
                      className="h-4 w-4" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                    {copied ? "¡Copiado!" : "Copiar enlace"}
                  </Button>
                </div>

                <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-playfair prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:mb-2 mb-8">
                  {post.content ? (
                    isRichHtmlContent(post.content) ? (
                      <div
                        className="blog-content [&>p]:mb-6 [&>p]:leading-[1.8] [&>p]:text-muted-foreground [&>p]:text-base md:[&>p]:text-lg [&>h2]:text-2xl [&>h2]:font-playfair [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-foreground [&>h2]:border-b [&>h2]:border-border [&>h2]:pb-3 [&>h3]:text-xl [&>h3]:font-playfair [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-foreground [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-3 [&>ul]:my-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-3 [&>ol]:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:bg-muted/30 [&>blockquote]:py-4 [&>blockquote]:rounded-r-lg [&>hr]:my-10 [&>hr]:border-border [&>strong]:text-foreground [&>strong]:font-semibold [&_strong]:text-foreground [&_strong]:font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtmlBasic(post.content),
                        }}
                      />
                    ) : (
                      renderContent(post.content)
                    )
                  ) : (
                    <p>{post.excerpt}</p>
                  )}
                </article>

                {/* Botón de compra del libro */}
                {post.bookLink && (
                  <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
                    <h3 className="text-xl font-playfair font-bold mb-3 text-foreground">
                      ¿Te interesa este libro?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Adquiérelo ahora en nuestra tienda online
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      {post.bookLink.startsWith('http') ? (
                        <a href={post.bookLink} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="gap-2">
                            <BookOpen className="h-5 w-5" />
                            Comprar ahora
                          </Button>
                        </a>
                      ) : (
                        <Link to={post.bookLink}>
                          <Button size="lg" className="gap-2">
                            <BookOpen className="h-5 w-5" />
                            Comprar ahora
                          </Button>
                        </Link>
                      )}
                      {post.amazonLink && (
                        <a href={post.amazonLink} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" variant="outline" className="gap-2 border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-white">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.228l.044-.114zm6.047-4.8c0-1.138.263-2.07.79-2.794.526-.724 1.216-1.195 2.07-1.41a9.466 9.466 0 012.61-.24l1.17.054v-.96c0-.81-.065-1.37-.196-1.68-.24-.546-.702-.82-1.386-.82-.576 0-.996.156-1.26.466-.264.31-.396.78-.396 1.41h-2.85c.036-1.386.456-2.37 1.26-2.952.804-.582 1.938-.874 3.402-.874 1.608 0 2.766.396 3.474 1.188.708.792 1.062 1.944 1.062 3.456v6.12l.102 1.836h-2.496l-.24-1.236h-.054c-.216.4-.546.744-.99 1.032-.444.288-1.008.432-1.692.432-.984 0-1.782-.324-2.394-.972-.612-.648-.918-1.482-.918-2.502l.03-.054zm2.94-.06c0 .528.12.948.36 1.26.24.312.57.468.99.468.504 0 .906-.168 1.206-.504.3-.336.45-.75.45-1.242v-1.17c-.522-.036-.93-.054-1.224-.054-.624 0-1.092.156-1.404.468-.312.312-.468.744-.468 1.296l.09-.522zM24 17.754c0 .06-.022.116-.066.168-.044.052-.11.088-.198.108l-.096.024-.12-.036c-.078-.036-.14-.084-.186-.144-.046-.06-.07-.134-.07-.222l.036-.09c.024-.054.054-.1.09-.138.036-.038.078-.07.126-.094a.362.362 0 01.156-.036c.08 0 .15.028.21.084.06.056.09.132.09.228l.028.148zm-4.794-2.25c-.468.864-1.41 1.704-2.826 2.52a.98.98 0 01-.162.066c-.034.012-.08.018-.138.018-.116 0-.196-.038-.24-.114-.044-.076-.036-.162.024-.258l.174-.24c.396-.456.72-.93.972-1.422.252-.492.378-.936.378-1.332 0-.048-.018-.084-.054-.108a.227.227 0 00-.126-.036c-.312 0-.582.114-.81.342-.228.228-.396.498-.504.81-.108.312-.162.618-.162.918l.018.24-.036.114c-.048.08-.114.12-.198.12-.168 0-.3-.078-.396-.234a1.027 1.027 0 01-.144-.546c0-.432.09-.846.27-1.242.18-.396.432-.726.756-.99.324-.264.696-.396 1.116-.396.36 0 .678.102.954.306.276.204.414.486.414.846 0 .54-.228 1.11-.684 1.71l-.066.084h.012c.252-.144.486-.306.702-.486.216-.18.396-.366.54-.558l.072-.102c.024-.036.054-.066.09-.09a.193.193 0 01.114-.036c.084 0 .15.036.198.108.048.072.072.156.072.252v.048l-.036.078z"/>
                            </svg>
                            Leer muestra en Amazon
                          </Button>
                        </a>
                      )}
                    </div>
                    {post.amazonLink && (
                      <p className="text-sm text-muted-foreground mt-3">
                        También disponible en Amazon
                      </p>
                    )}
                  </div>
                )}

                {/* Imágenes adicionales (image2, image3) */}
                {(post.image2 || post.image3) && (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-8">
                    {post.image2 && (
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={post.image2}
                          alt={`${post.title} - Imagen 2`}
                          loading="lazy"
                          width="600"
                          height="400"
                          className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] object-contain bg-muted/20"
                        />
                      </div>
                    )}
                    {post.image3 && (
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={post.image3}
                          alt={`${post.title} - Imagen 3`}
                          loading="lazy"
                          width="600"
                          height="400"
                          className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] object-contain bg-muted/20"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Galería de imágenes */}
                {post.gallery && post.gallery.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-playfair font-bold mb-4 text-foreground">
                      Galería
                    </h3>
                    <div className="space-y-4">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="relative rounded-lg overflow-hidden shadow-2xl w-full cursor-zoom-in hover:opacity-95 transition-opacity"
                      >
                        <img
                          src={post.gallery[selectedGalleryImage]}
                          alt={`${post.title} - Galería imagen ${selectedGalleryImage + 1}`}
                          loading="lazy"
                          width="1200"
                          height="800"
                          className="w-full h-96 object-cover"
                        />
                      </button>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {post.gallery.map((image, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedGalleryImage(idx)}
                            className={`rounded-lg overflow-hidden border-2 transition-all ${
                              selectedGalleryImage === idx
                                ? 'border-primary shadow-lg scale-105'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${post.title} - Miniatura ${idx + 1}`}
                              loading="lazy"
                              width="150"
                              height="100"
                              className="w-full h-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Book image and link for posts with additional content */}
                {post.bookImage && post.bookLink && (
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-xl border border-primary/10 mt-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="flex-shrink-0">
                        <img
                          src={post.bookImage}
                          alt={post.category === "literatura" ? "Portada del libro - Comprar en Editorial Dauro" : post.category === "ia" ? "NFT Argentina - Colección digital" : "Proyecto cultural relacionado"}
                          loading="lazy"
                          width="300"
                          height="400"
                          className="w-48 h-auto shadow-2xl rounded-lg"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">
                          {post.category === "literatura" ? "Disponible ahora" : post.category === "ia" ? "Descubre la colección" : "Sigue el proyecto"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {post.category === "literatura" 
                            ? "Ya disponible en librerías y en nuestra tienda online."
                            : post.category === "ia"
                            ? "Descubre y adquiere los NFTs oficiales de la Selección Argentina."
                            : "Descubre más avances, imágenes y fragmentos del proceso creativo en nuestro canal de YouTube."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-primary/90"
                          >
                            <a
                              href={post.bookLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              {post.category === "literatura" ? "Comprar en tienda" : post.category === "ia" ? "Ver colección NFT" : "Ver canal de YouTube"}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          {post.amazonLink && (
                            <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                              <a
                                href={post.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                Comprar en Amazon
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA discreto para artistas en posts de categoría arte */}
                {post.category === "arte" && (
                  <div className="mt-12 p-6 bg-muted/30 border border-border/50 rounded-xl">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          ¿Eres artista visual?
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Grupo Dauro representa a artistas plásticos para la gestión y difusión de su obra.
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        <Link to="/artistas/solicitud" className="flex items-center gap-2">
                          Solicitar representación
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Formulario de descarga de la guía - al final de todos los posts */}
                <div className="mt-12">
                  <GuideDownloadForm 
                    pdfUrl="/docs/guia-editorial-autores.pdf"
                    guideTitle="Guía Editorial para Autores"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center bg-black/95">
            <img
              src={post?.gallery?.[selectedGalleryImage]}
              alt={`${post?.title} - Galería imagen ampliada ${selectedGalleryImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPost;
