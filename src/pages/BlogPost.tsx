import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ExternalLink, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link2, Check, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import NotFound from "./NotFound";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { useAnalytics } from "@/hooks/useAnalytics";
import GuideDownloadForm from "@/components/GuideDownloadForm";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { trackBlogEngagement } = useAnalytics();
  const [readingTime, setReadingTime] = useState(0);

  // Track page view and reading time
  useEffect(() => {
    if (!post) return;

    trackBlogEngagement('post_viewed', {
      post_slug: post.slug,
      post_title: post.title,
      post_category: post.category
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
        trackBlogEngagement('post_read', {
          post_slug: post.slug,
          reading_time_seconds: readingTime
        });
      }
    };
  }, [post, slug, trackBlogEngagement]);

  if (!post) {
    return <NotFound />;
  }

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
      ? 'https://grupodauro.com' 
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
      ? 'https://grupodauro.com' 
      : window.location.origin;
    
    // If the image starts with /, it's already a path from root
    const imagePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${imagePath}`;
  };

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

  // Helper to parse inline markdown (bold, italic, links)
  const parseInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      // Bold **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(remaining.slice(0, boldMatch.index));
        }
        parts.push(<strong key={keyIndex++}>{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
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
      // Imágenes en markdown: ![alt](url)
      const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        return (
          <div key={idx} className="my-8">
            <img
              src={imageMatch[2]}
              alt={imageMatch[1] || "Imagen del artículo"}
              loading="lazy"
              width="1200"
              height="800"
              className="w-full rounded-lg shadow-lg"
            />
            {imageMatch[1] && (
              <p className="text-sm text-center text-muted-foreground mt-2 italic">
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
        <title>{post.title} | Grupo Dauro</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={getShareUrl()} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getShareUrl()} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={getAbsoluteImageUrl(post.ogImage || post.image)} />
        <meta property="og:image:secure_url" content={getAbsoluteImageUrl(post.ogImage || post.image)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Grupo Cultural Dauro" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={getCategoryLabel(post.category)} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={getShareUrl()} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={getAbsoluteImageUrl(post.ogImage || post.image)} />
        <meta name="twitter:image:alt" content={post.title} />
        
        {/* Structured Data / JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": getAbsoluteImageUrl(post.ogImage || post.image),
            "author": {
              "@type": "Organization",
              "name": post.author,
              "url": "https://grupodauro.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Grupo Cultural Dauro",
              "logo": {
                "@type": "ImageObject",
                "url": "https://grupodauro.com/og-logo.png"
              }
            },
            "datePublished": post.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": getShareUrl()
            },
            "articleSection": getCategoryLabel(post.category),
            "inLanguage": "es-ES"
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
<div className="relative h-96 overflow-hidden">
                <img
                  src={post.image}
                  alt={`${post.title} - Artículo completo del blog Grupo Cultural Dauro`}
                  width="1200"
                  height="630"
                  className="w-full h-full object-cover object-top"
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

                <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                  {post.content ? renderContent(post.content) : <p>{post.excerpt}</p>}
                </div>


                {/* Imágenes adicionales (image2, image3) */}
                {(post.image2 || post.image3) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {post.image2 && (
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={post.image2}
                          alt={`${post.title} - Imagen 2`}
                          loading="lazy"
                          width="600"
                          height="400"
                          className="w-full h-64 object-cover"
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
                          className="w-full h-64 object-cover"
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

                {/* CTA for posts with just bookLink (no bookImage) - like the cover generator */}
                {post.bookLink && !post.bookImage && (
                  <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 rounded-xl border-2 border-primary/30 mt-8 text-center">
                    <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">
                      🚀 ¡Pruébalo ahora!
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                      Crea tu portada gratuita en segundos. Sin registro, sin costos ocultos.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
                    >
                      {post.bookLink.startsWith('/') || post.bookLink.startsWith('#') ? (
                        <Link to={post.bookLink} className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Crear mi portada gratis
                        </Link>
                      ) : (
                        <a
                          href={post.bookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Ver más
                        </a>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Sin registro • Sin costos ocultos • Resultados instantáneos
                    </p>
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
