import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ExternalLink } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import presentacionLatido from "@/assets/presentacion-latido.jpg";
import libroLatido from "@/assets/libro-latido.png";

const Blog = () => {
  const posts = blogPosts;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-foreground">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Reflexiones, novedades y análisis sobre arte, cultura,
                literatura y tecnología
              </p>
            </div>

            {/* Featured Post - First post with full content */}
            {posts[0] && posts[0].content && (
              <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl mb-16">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={presentacionLatido}
                    alt={posts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {posts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {posts[0].author}
                    </span>
                  </div>
                  <h2 className="text-4xl font-playfair font-bold mb-6 text-foreground">
                    {posts[0].title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                    {posts[0].content.split('\n').map((paragraph, idx) => {
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
                  {posts[0].bookImage && posts[0].bookLink && (
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-8 mt-8">
                      <div className="flex-shrink-0">
                        <img
                          src={libroLatido}
                          alt="Portada Latido"
                          className="w-48 h-auto shadow-2xl rounded-lg"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">
                          Disponible ahora
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Latido. Apasionadamente vuestro de Carmen Alcaide ya está disponible en librerías y en nuestra tienda online.
                        </p>
                        <Button
                          asChild
                          size="lg"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <a
                            href={posts[0].bookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Comprar ahora
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* Other posts grid */}
            <h2 className="text-3xl font-playfair font-bold mb-8 text-foreground">
              Más artículos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post, index) => (
                <article
                  key={index}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
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
                    <h2 className="text-2xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="text-primary font-semibold hover:underline">
                      Leer más →
                    </button>
                  </div>
                </article>
              ))}
            </div>

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
