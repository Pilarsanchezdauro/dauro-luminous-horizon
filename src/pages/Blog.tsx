import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ExternalLink } from "lucide-react";
import { blogPosts, getPostsByCategory, categoryLabels, type BlogCategory } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";
import presentacionLatido from "@/assets/presentacion-latido.jpg";
import libroLatido from "@/assets/libro-latido.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "todas">("todas");
  
  const getFilteredPosts = () => {
    if (activeCategory === "todas") return blogPosts;
    return getPostsByCategory(activeCategory);
  };
  
  const filteredPosts = getFilteredPosts();
  const featuredPost = activeCategory === "todas" ? blogPosts[0] : null;

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
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-foreground">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Presentaciones, reflexiones, novedades y análisis sobre arte, cultura,
                literatura y tecnología
              </p>
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="todas" className="mb-12" onValueChange={(value) => setActiveCategory(value as BlogCategory | "todas")}>
              <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto h-auto">
                <TabsTrigger value="todas" className="text-sm sm:text-base py-3">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="literatura" className="text-sm sm:text-base py-3">
                  Literatura
                </TabsTrigger>
                <TabsTrigger value="arte" className="text-sm sm:text-base py-3">
                  Arte
                </TabsTrigger>
                <TabsTrigger value="cine" className="text-sm sm:text-base py-3">
                  Cine
                </TabsTrigger>
                <TabsTrigger value="ia" className="text-sm sm:text-base py-3">
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
                  <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                    {featuredPost.content.split('\n').map((paragraph, idx) => {
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
                        return (
                          <p key={idx} className="mb-4">
                            {paragraph}
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
                      {post.content && post.slug && (
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="text-primary font-semibold hover:underline inline-block"
                        >
                          Leer más →
                        </Link>
                      )}
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
