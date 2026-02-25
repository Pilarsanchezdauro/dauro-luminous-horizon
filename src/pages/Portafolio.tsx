import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, Users, Video, Palette, Briefcase, Film, Music, Youtube, Mail, BookOpen, Mic, PaintBucket, UserPlus, Library, ShoppingBag } from 'lucide-react';
import mascotLogo from '@/assets/mascot.png';
import heroExceptionalBg from '@/assets/hero-exceptional-bg.jpg';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string | null;
  year: number | null;
  summary: string;
  main_image_url: string | null;
  tags: string[] | null;
  featured: boolean;
}

import { Frame } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  webs: Globe,
  booktrailers: Video,
  pintura: Palette,
  'imagen-corporativa': Briefcase,
  cine: Film,
  musica: Music,
  avatares: Users,
  'portadas-libros': BookOpen,
  'artistas-cantantes': Mic,
  'artistas-pintores': PaintBucket,
  'obras-arte': Frame,
  'produccion-musical': Music,
  'libros': Library,
};

const categoryLabels: Record<string, string> = {
  webs: 'Webs',
  booktrailers: 'Booktrailers',
  pintura: 'Pintura',
  'imagen-corporativa': 'Imagen Corporativa',
  cine: 'Cine',
  musica: 'Música',
  avatares: 'Avatares',
  'portadas-libros': 'Portadas de Libros',
  'artistas-cantantes': 'Cantantes',
  'artistas-pintores': 'Pintores',
  'obras-arte': 'Obras de Arte',
  'produccion-musical': 'Producción Musical',
  'libros': 'Libros',
};

export default function Portafolio() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('categoria');
  const [categoryFilter, setCategoryFilter] = useState<string>(urlCategory || 'all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  // Update filter when URL changes
  useEffect(() => {
    if (urlCategory) {
      // Handle "artistas" as showing both artist categories
      if (urlCategory === 'artistas') {
        setCategoryFilter('artistas');
      } else {
        setCategoryFilter(urlCategory);
      }
    } else {
      setCategoryFilter('all');
    }
  }, [urlCategory]);

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
        if (categoryFilter === 'artistas') {
          // Show both artist categories
          query = query.or('category.eq.artistas-cantantes,category.eq.artistas-pintores');
        } else {
          query = query.eq('category', categoryFilter);
        }
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

  // Check if viewing artists category
  const isArtistsCategory = categoryFilter === 'artistas' || 
    categoryFilter === 'artistas-cantantes' || 
    categoryFilter === 'artistas-pintores';

  return (
    <>
      <SEO
        title="Portafolio Creativo | Webs, Booktrailers, Diseño y Branding"
        description="Explora nuestro portafolio de proyectos creativos: webs de libros, booktrailers, diseño de portadas, imagen corporativa, producción musical y pintura."
        keywords="portafolio creativo, diseño editorial, booktrailers, webs de libros, imagen corporativa, diseño portadas, producción musical, pintura, branding cultural"
        url="https://grupodauro.com/portafolio"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Portafolio Creativo - Grupo Cultural Dauro",
          "url": "https://grupodauro.com/portafolio",
          "description": "Portafolio de proyectos creativos realizados por Grupo Cultural Dauro: webs, booktrailers, diseño gráfico, branding y producción audiovisual."
        }}
      />
      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroExceptionalBg})`,
              filter: "brightness(0.6)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
              Nuestro Portafolio
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Explora algunos de nuestros proyectos y trabajos realizados
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 py-16 relative overflow-hidden">
          {/* Floating mascot logos */}
          <img 
            src={mascotLogo} 
            alt="" 
            className="absolute top-20 right-12 w-20 h-20 opacity-[0.03] animate-float-diagonal pointer-events-none"
            style={{ animationDelay: '2s' }}
          />
          <img 
            src={mascotLogo} 
            alt="" 
            className="absolute top-64 left-16 w-16 h-16 opacity-[0.025] animate-float-horizontal pointer-events-none"
            style={{ animationDelay: '5s' }}
          />
          <img 
            src={mascotLogo} 
            alt="" 
            className="absolute bottom-80 right-1/4 w-24 h-24 opacity-[0.04] animate-float-vertical pointer-events-none"
            style={{ animationDelay: '8s' }}
          />
          <img 
            src={mascotLogo} 
            alt="" 
            className="absolute bottom-40 left-1/3 w-20 h-20 opacity-[0.035] animate-float-circle pointer-events-none"
            style={{ animationDelay: '11s' }}
          />
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center relative z-10">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="libros">Libros</SelectItem>
                <SelectItem value="webs">Webs</SelectItem>
                <SelectItem value="booktrailers">Booktrailers</SelectItem>
                <SelectItem value="pintura">Pintura</SelectItem>
                <SelectItem value="portadas-libros">Portadas de Libros</SelectItem>
                <SelectItem value="imagen-corporativa">Imagen Corporativa</SelectItem>
                <SelectItem value="cine">Cine</SelectItem>
                <SelectItem value="musica">Música</SelectItem>
                <SelectItem value="avatares">Avatares</SelectItem>
                <SelectItem value="obras-arte">Obras de Arte</SelectItem>
                <SelectItem value="produccion-musical">Producción Musical</SelectItem>
                <SelectItem value="artistas">Todos los Artistas</SelectItem>
                <SelectItem value="artistas-cantantes">Cantantes</SelectItem>
                <SelectItem value="artistas-pintores">Pintores</SelectItem>
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
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
                const Icon = categoryIcons[project.category] || Globe;
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
                          {categoryLabels[project.category] || project.category}
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

          {/* Web Development CTA Section */}
          {categoryFilter === 'webs' && projects && projects.length > 0 && (
            <div className="mt-16 mb-8">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      ¿Necesitas una web profesional?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Solicita tu proyecto web personalizado
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <Link to="/solicitar-web" className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Solicitar mi web
                      </Link>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/contacto" className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Más información
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booktrailer CTA Section */}
          {categoryFilter === 'booktrailers' && projects && projects.length > 0 && (
            <div className="mt-16 mb-8">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      ¿Te gustaron nuestros booktrailers?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Descubre más trabajos o solicita el tuyo
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <a 
                        href="https://www.youtube.com/@grupodauro2900" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Youtube className="w-5 h-5" />
                        Ver más en YouTube
                      </a>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/contacto" className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Solicita tu booktrailer
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Portadas de Libros CTA Section */}
          {categoryFilter === 'portadas-libros' && projects && projects.length > 0 && (
            <div className="mt-16 mb-8">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Crea tu propia portada con IA
                    </h2>
                    <p className="text-lg text-muted-foreground mb-2">
                      Usa nuestra herramienta gratuita de inteligencia artificial
                    </p>
                    <p className="text-muted-foreground">
                      O visita nuestra tienda para ver todos los libros publicados
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <Link to="/generador-portadas" className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Crear portada gratis con IA
                      </Link>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/tienda" className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Ver tienda
                      </Link>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/contacto" className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Solicita tu portada
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Obras de Arte CTA Section - Always show when category is selected */}
          {categoryFilter === 'obras-arte' && (
            <div className="mt-16 mb-8">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Representación y Gestión de Obras de Arte
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Especializados en la intermediación y gestión de obras de arte de alto valor. Ofrecemos asesoramiento experto, peritaje y acompañamiento integral en procesos de adquisición y venta.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <a 
                        href="https://lebruncollection.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Frame className="w-5 h-5" />
                        Visitar LeBrun Collection
                      </a>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/contacto" className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Consultar disponibilidad
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Libros CTA Section - Redirect to Tienda */}
          {categoryFilter === 'libros' && (
            <div className="mt-16 mb-8">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Descubre nuestro catálogo de libros
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Más de 2000 obras publicadas desde el año 2000. Encuentra tu próxima lectura en nuestra tienda.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <Link to="/tienda" className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Ir a la Tienda
                      </Link>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/editorial" className="flex items-center gap-2">
                        <Library className="w-5 h-5" />
                        Conocer la Editorial
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Artists CTA Section */}
          {isArtistsCategory && projects && projects.length > 0 && (
            <div className="mt-16 mb-8">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      ¿Eres artista y buscas representación?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Envíanos tu portfolio y currículum. Buscamos talento para impulsar carreras artísticas.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <Link to="/artistas/solicitud" className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Quiero ser representado
                      </Link>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2"
                      asChild
                    >
                      <Link to="/contacto" className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Más información
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
