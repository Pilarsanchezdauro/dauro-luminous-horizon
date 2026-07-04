import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogData";

const categoryLabels: Record<string, string> = {
  webs: "Desarrollo Web",
  booktrailers: "Booktrailer",
  portadas: "Portada de Libro",
  branding: "Branding & Identidad",
  otros: "Otros Proyectos"
};

const spanishMonths: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
};

// Fechas del blog tipo "3 Julio 2026" o "19 de febrero de 2026"
const parseBlogDate = (date: string): number => {
  const parts = date.toLowerCase().split(/\s+/).filter((p) => p !== "de");
  const day = parseInt(parts[0], 10);
  const month = spanishMonths[parts[1]] ?? 0;
  const year = parseInt(parts[2], 10);
  const time = new Date(year, month, day).getTime();
  return Number.isFinite(time) ? time : 0;
};

export const LatestWorks = () => {
  // Fetch latest projects
  const { data: projects } = useQuery({
    queryKey: ["latest-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(2);

      if (error) throw error;
      return data;
    },
  });

  // Latest blog post from the static blog data (same source as /blog)
  const blogPost = blogPosts.find((post) => !post.hidden && post.slug);

  const hasContent = (projects && projects.length > 0) || blogPost;

  if (!hasContent) return null;

  // Lo publicado más recientemente aparece primero, sea proyecto o artículo
  const cards = [
    ...(projects?.map((project) => ({
      type: "project" as const,
      time: new Date(project.created_at).getTime() || 0,
      project,
    })) ?? []),
    ...(blogPost
      ? [{ type: "post" as const, time: parseBlogDate(blogPost.date), post: blogPost }]
      : []),
  ].sort((a, b) => b.time - a.time);

  return (
    <section className="my-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
          Noticias destacadas del Grupo
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Descubre nuestros proyectos más recientes y publicaciones destacadas
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) =>
          card.type === "project" ? (
            <Card key={`project-${card.project.id}`} className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <Link to={`/portafolio/${card.project.slug}`} className="block">
                {card.project.main_image_url && (
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={card.project.main_image_url}
                      alt={card.project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[card.project.category] || card.project.category}
                    </Badge>
                    {card.project.year && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {card.project.year}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {card.project.title}
                  </h3>
                  {card.project.client && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Cliente: {card.project.client}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {card.project.summary}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                    Ver proyecto
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Card>
          ) : (
            <Card key={`post-${card.post.slug}`} className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <Link to={`/blog/${card.post.slug}`} className="block">
                {card.post.image && (
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={card.post.image}
                      alt={card.post.imageAlt || card.post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {card.post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {card.post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {card.post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <User className="h-3 w-3" />
                    {card.post.author}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {card.post.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                    Leer artículo
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Card>
          )
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <Button asChild size="lg" className="gap-2">
          <Link to="/portafolio">
            Ver todo el portafolio
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <Link to="/blog">
            Ver todos los artículos
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
