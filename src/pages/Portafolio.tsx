import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Youtube, Globe, Image, FileText } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'youtube' | 'web' | 'imagen' | 'guion';
  client: string | null;
  year: number | null;
  summary: string;
  main_image_url: string | null;
  tags: string[] | null;
  featured: boolean;
}

const categoryIcons = {
  youtube: Youtube,
  web: Globe,
  imagen: Image,
  guion: FileText,
};

const categoryLabels = {
  youtube: 'YouTube',
  web: 'Web',
  imagen: 'Imagen',
  guion: 'Guion',
};

export default function Portafolio() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', categoryFilter, yearFilter],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('year', { ascending: false });

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      if (yearFilter !== 'all') {
        query = query.eq('year', parseInt(yearFilter));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
  });

  // Get unique years for filter
  const years = Array.from(
    new Set(projects?.map((p) => p.year).filter(Boolean) as number[])
  ).sort((a, b) => b - a);

  return (
    <>
      <SEO
        title="Portafolio de Proyectos"
        description="Descubre nuestros proyectos creativos en YouTube, web, diseño gráfico y guiones. Un portafolio completo de trabajos realizados para diferentes clientes."
        keywords="portafolio, proyectos, trabajos, youtube, web, diseño, guiones, creatividad"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Portafolio</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestros proyectos creativos y trabajos realizados
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="imagen">Imagen</SelectItem>
                <SelectItem value="guion">Guion</SelectItem>
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los años</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year?.toString() || ''}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const Icon = categoryIcons[project.category];
                return (
                  <Link key={project.id} to={`/portafolio/${project.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                      <div className="relative aspect-video bg-muted overflow-hidden">
                        {project.main_image_url ? (
                          <img
                            src={project.main_image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                        {project.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            Destacado
                          </Badge>
                        )}
                        <Badge className="absolute top-2 left-2 bg-secondary">
                          <Icon className="w-3 h-3 mr-1" />
                          {categoryLabels[project.category]}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          {project.client && <span>{project.client}</span>}
                          {project.client && project.year && <span>•</span>}
                          {project.year && <span>{project.year}</span>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.summary}
                        </p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron proyectos con los filtros seleccionados
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
