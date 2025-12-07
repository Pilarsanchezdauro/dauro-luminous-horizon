import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ExternalLink, Share2, Facebook, Twitter, Linkedin, Link2, Check, BarChart3 } from "lucide-react";
import { blogPosts, getPostsByCategory, categoryLabels, type BlogCategory } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";
import presentacionLatido from "@/assets/presentacion-latido.jpg";
import libroLatido from "@/assets/libro-latido.png";
import mascotLogo from "@/assets/mascot.png";
import heroCulturalBg from "@/assets/hero-cultural-bg.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "todas">("todas");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const getFilteredPosts = () => {
    if (activeCategory === "todas") return blogPosts;
    return getPostsByCategory(activeCategory);
  };
  
  const filteredPosts = getFilteredPosts();
  const featuredPost = activeCategory === "todas" ? blogPosts[0] : null;

  const getShareUrl = (postSlug?: string) => {
    const baseUrl = window.location.hostname.includes('lovableproject.com') 
      ? 'https://grupodauro.com' 
      : window.location.origin;
    return postSlug ? `${baseUrl}/blog/${postSlug}` : baseUrl;
  };

  const copyToClipboard = async (post: typeof blogPosts[0]) => {
    if (!post.slug) return;
    
    const shareUrl = getShareUrl(post.slug);
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

  const handleShare = (platform: string, post: typeof blogPosts[0]) => {
    if (!post.slug) return;
    
    const shareUrl = getShareUrl(post.slug);
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
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Grupo Cultural Dauro",
    "url": "https://grupodauro.com/blog",
    "description": "Noticias, eventos y novedades sobre arte, literatura, cine e inteligencia artificial",
    "publisher": {
      "@type": "Organization",
      "name": "Grupo Cultural Dauro"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Noticias Culturales y Eventos"
        description="Lee las últimas noticias del mundo cultural: presentaciones de libros, eventos de arte, estrenos cinematográficos y novedades sobre IA creativa. Blog actualizado del Grupo Dauro."
        keywords="blog cultura, noticias arte, eventos literarios, presentaciones libros, actualidad cultural, blog Granada cultura"
        url="https://grupodauro.com/blog"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroCulturalBg})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6">
            Presentaciones, reflexiones, novedades y análisis sobre arte, cultura, literatura y tecnología
          </p>
          <Link to="/blog/stats">
            <Button variant="secondary" size="lg" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Ver Estadísticas
            </Button>
          </Link>
        </div>
      </section>
      
      <main className="pb-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-20 right-10 w-20 h-20 opacity-[0.03] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-80 left-16 w-16 h-16 opacity-[0.025] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '4s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-60 right-1/4 w-24 h-24 opacity-[0.04] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '7s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-20 left-1/3 w-20 h-20 opacity-[0.035] animate-float-circle pointer-events-none"
          style={{ animationDelay: '10s' }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          <div className="max-w-6xl mx-auto">
            {/* Category Tabs */}
            <Tabs defaultValue="todas" className="mb-12" onValueChange={(value) => setActiveCategory(value as BlogCategory | "todas")}>
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 max-w-4xl mx-auto h-auto gap-1">
                <TabsTrigger value="todas" className="text-xs sm:text-sm py-2 sm:py-3">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="consejos" className="text-xs sm:text-sm py-2 sm:py-3">
                  Consejos
                </TabsTrigger>
                <TabsTrigger value="literatura" className="text-xs sm:text-sm py-2 sm:py-3">
                  Literatura
                </TabsTrigger>
                <TabsTrigger value="arte" className="text-xs sm:text-sm py-2 sm:py-3">
                  Arte
                </TabsTrigger>
                <TabsTrigger value="cine" className="text-xs sm:text-sm py-2 sm:py-3">
                  Cine
                </TabsTrigger>
                <TabsTrigger value="ia" className="text-xs sm:text-sm py-2 sm:py-3">
                  IA
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Featured Post - First post with full content (only on "todas" view) */}
            {featuredPost && featuredPost.content && (
              <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl mb-16">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={`${featuredPost.title} - Evento cultural en Granada`}
                    width="1200"
                    height="630"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </span>
                  </div>
                  <h2 className="text-4xl font-playfair font-bold mb-6 text-foreground">
                    {featuredPost.title}
                  </h2>

                  {/* Share buttons for featured post */}
                  {featuredPost.slug && (
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Compartir:
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('facebook', featuredPost)}
                        className="gap-2"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('twitter', featuredPost)}
                        className="gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('linkedin', featuredPost)}
                        className="gap-2"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('whatsapp', featuredPost)}
                        className="gap-2"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(featuredPost)}
                        className="gap-2"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                        {copied ? "¡Copiado!" : "Copiar enlace"}
                      </Button>
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                    {featuredPost.content.split('\n').map((paragraph, idx) => {
                      if (paragraph.trim() === '---') {
                        return <hr key={idx} className="my-8 border-border" />;
                      }
                      if (paragraph.match(/^[-*] /)) {
                        return (
                          <li key={idx} className="mb-2 ml-6 list-disc text-muted-foreground">
                            {paragraph.replace(/^[-*] /, '')}
                          </li>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={idx} className="text-xl font-playfair font-semibold mt-6 mb-3 text-foreground">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h3 key={idx} className="text-2xl font-playfair font-bold mt-8 mb-4 text-foreground">
                            {paragraph.replace('## ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <p key={idx} className="font-semibold mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      if (paragraph.trim()) {
                        // Parse inline bold text
                        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={idx} className="mb-4">
                            {parts.map((part, partIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Book image and purchase link */}
                  {featuredPost.bookImage && featuredPost.bookLink && (
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-8 mt-8">
                      <div className="flex-shrink-0">
                        <img
                          src={featuredPost.bookImage}
                          alt={featuredPost.category === "literatura" ? "Portada del libro Latido de Carmen Alcaide - Editorial Dauro" : featuredPost.category === "ia" ? "Colección NFT Argentina - Arte digital" : "Don Rodrigo de Cervantes - Proyecto editorial"}
                          loading="lazy"
                          width="300"
                          height="400"
                          className="w-48 h-auto shadow-2xl rounded-lg"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">
                          {featuredPost.category === "literatura" ? "Disponible ahora" : featuredPost.category === "ia" ? "Descubre la colección" : "Sigue el proyecto"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {featuredPost.category === "literatura" 
                            ? "Latido. Apasionadamente vuestro de Carmen Alcaide ya está disponible en librerías y en nuestra tienda online."
                            : featuredPost.category === "ia"
                            ? "Descubre y adquiere los NFTs oficiales de la Selección Argentina."
                            : "Descubre más avances, imágenes y fragmentos del proceso creativo en nuestro canal de YouTube."}
                        </p>
                        <Button
                          asChild
                          size="lg"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <a
                            href={featuredPost.bookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            {featuredPost.category === "literatura" ? "Comprar ahora" : featuredPost.category === "ia" ? "Ver colección NFT" : "Ver canal de YouTube"}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* Posts grid */}
            {filteredPosts.length > 0 ? (
              <>
                {activeCategory !== "todas" && (
                  <h2 className="text-3xl font-playfair font-bold mb-8 text-foreground">
                    {categoryLabels[activeCategory as BlogCategory]}
                  </h2>
                )}
                {activeCategory === "todas" && (
                  <h2 className="text-3xl font-playfair font-bold mb-8 text-foreground">
                    Más artículos
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(activeCategory === "todas" ? filteredPosts.slice(1) : filteredPosts).map((post, index) => (
                <article
                  key={index}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={`${post.title} - Artículo del blog Grupo Dauro`}
                      loading="lazy"
                      width="600"
                      height="400"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-primary/10 text-primary">
                        {categoryLabels[post.category]}
                      </div>
                      <h2 className="text-2xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        {post.content && post.slug && (
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="text-primary font-semibold hover:underline inline-block"
                          >
                            Leer más →
                          </Link>
                        )}
                        {post.slug && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="gap-2"
                                onClick={(e) => e.preventDefault()}
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleShare('facebook', post)}>
                                <Facebook className="h-4 w-4 mr-2" />
                                Facebook
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleShare('twitter', post)}>
                                <Twitter className="h-4 w-4 mr-2" />
                                Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleShare('linkedin', post)}>
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleShare('whatsapp', post)}>
                                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                WhatsApp
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(post)}>
                                {copied ? <Check className="h-4 w-4 mr-2" /> : <Link2 className="h-4 w-4 mr-2" />}
                                {copied ? "¡Copiado!" : "Copiar enlace"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  Próximamente artículos sobre {categoryLabels[activeCategory as BlogCategory]}...
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                Próximamente más artículos...
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
