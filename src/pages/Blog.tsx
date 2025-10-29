import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "El futuro de la edición literaria en la era digital",
      excerpt:
        "Reflexiones sobre cómo la tecnología está transformando la manera en que creamos, distribuimos y consumimos literatura.",
      date: "15 Enero 2025",
      author: "Equipo Dauro",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    },
    {
      title: "Arte contemporáneo y nuevas narrativas visuales",
      excerpt:
        "Un recorrido por las tendencias actuales del arte contemporáneo y cómo los artistas están redefiniendo los límites de la expresión visual.",
      date: "10 Enero 2025",
      author: "María González",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    },
    {
      title: "La inteligencia artificial como herramienta creativa",
      excerpt:
        "Exploramos cómo la IA está abriendo nuevas posibilidades en los procesos creativos sin sustituir la esencia humana del arte.",
      date: "5 Enero 2025",
      author: "Carlos Ruiz",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    },
  ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
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
