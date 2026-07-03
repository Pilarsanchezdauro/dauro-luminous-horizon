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
        {/* Latest Projects */}
        {projects?.map((project) => (
          <Card key={project.id} className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
            <Link to={`/portafolio/${project.slug}`} className="block">
              {project.main_image_url && (
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={project.main_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {categoryLabels[project.category] || project.category}
                  </Badge>
                  {project.year && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.year}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.client && (
                  <p className="text-sm text-muted-foreground mb-3">
                    Cliente: {project.client}
                  </p>
                )}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.summary}
                </p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  Ver proyecto
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </Card>
        ))}

        {/* Latest Blog Post */}
        {blogPost && (
          <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
            <Link to={`/blog/${blogPost.slug}`} className="block">
              {blogPost.image && (
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {blogPost.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {blogPost.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {blogPost.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <User className="h-3 w-3" />
                  {blogPost.author}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {blogPost.excerpt}
                </p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  Leer artículo
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </Card>
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
