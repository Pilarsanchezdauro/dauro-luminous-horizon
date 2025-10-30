import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ExternalLink, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen">
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
                  alt={post.title}
                  className="w-full h-full object-cover"
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
                <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                  {post.content ? (
                    post.content.split('\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="text-2xl font-playfair font-bold mt-8 mb-4 text-foreground">
                            {paragraph.replace('## ', '')}
                          </h2>
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
                    })
                  ) : (
                    <p>{post.excerpt}</p>
                  )}
                </div>

                {/* Book image and link for posts with additional content */}
                {post.bookImage && post.bookLink && (
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-8 mt-8">
                    <div className="flex-shrink-0">
                      <img
                        src={post.bookImage}
                        alt={post.category === "literatura" ? "Portada del libro" : "Imagen relacionada"}
                        className="w-48 h-auto shadow-2xl rounded-lg"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">
                        {post.category === "literatura" ? "Disponible ahora" : "Sigue el proyecto"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {post.category === "literatura" 
                          ? "Ya disponible en librerías y en nuestra tienda online."
                          : "Descubre más avances, imágenes y fragmentos del proceso creativo en nuestro canal de YouTube."}
                      </p>
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
                          {post.category === "literatura" ? "Comprar ahora" : "Ver canal de YouTube"}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
