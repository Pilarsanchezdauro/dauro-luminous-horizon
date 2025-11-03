import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Globe, Users, Video, Palette, Briefcase, Film, Music, Youtube, Mail } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PortfolioInquiryForm from '@/components/PortfolioInquiryForm';

const categoryIcons = {
  webs: Globe,
  booktrailers: Video,
  pintura: Palette,
  'imagen-corporativa': Briefcase,
  cine: Film,
  musica: Music,
  avatares: Users,
};

const categoryLabels = {
  webs: 'Webs',
  booktrailers: 'Booktrailers',
  pintura: 'Pintura',
  'imagen-corporativa': 'Imagen Corporativa',
  cine: 'Cine',
  musica: 'Música',
  avatares: 'Avatares',
};

export default function ProjectDetail() {
  const { slug } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="aspect-video bg-muted rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Proyecto no encontrado</h1>
          <Link to="/portafolio">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al portafolio
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const Icon = categoryIcons[project.category];
  const links = project.links as Array<{ url: string; label: string }> || [];
  const galleryImages = project.gallery_images as Array<{ url: string; caption?: string }> || [];

  return (
    <>
      <SEO
        title={project.title}
        description={project.summary}
        image={project.main_image_url || undefined}
        type="article"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          <Link to="/portafolio">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al portafolio
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">
                  <Icon className="w-3 h-3 mr-1" />
                  {categoryLabels[project.category]}
                </Badge>
                {project.featured && <Badge>Destacado</Badge>}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {project.client && <span className="font-medium">{project.client}</span>}
                {project.year && <span>{project.year}</span>}
              </div>
            </div>

            {/* Main Image or Video */}
            {links.length > 0 && links[0].url.includes('youtube') ? (
              <div className="aspect-video">
                <iframe
                  src={links[0].url.replace('watch?v=', 'embed/')}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={project.title}
                />
              </div>
            ) : project.main_image_url ? (
              <img
                src={project.main_image_url}
                alt={project.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            ) : null}

            {/* Summary */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">{project.summary}</p>
                {project.category === 'pintura' && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground font-medium">
                      © Todos los derechos reservados. Esta obra no puede ser copiada ni utilizada sin el permiso expreso de su autora <strong>Pilar Sánchez</strong>, CEO del Grupo Dauro.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {project.description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="whitespace-pre-wrap">{project.description}</p>
                </div>
              </div>
            )}

            {/* Services */}
            {project.services && project.services.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Servicios</h2>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-base px-4 py-2">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Galería</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {galleryImages.map((img, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <CardContent className="p-2">
                              <img
                                src={img.url}
                                alt={img.caption || `Imagen ${index + 1}`}
                                className="w-full aspect-video object-cover rounded"
                              />
                              {img.caption && (
                                <p className="text-sm text-muted-foreground mt-2 px-2">
                                  {img.caption}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Enlaces</h2>
                <div className="flex flex-wrap gap-3">
                  {links.map((link, index) => (
                    <Button key={index} asChild variant="outline">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Etiquetas</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Booktrailer CTA Section */}
            {project.category === 'booktrailers' && (
              <div className="mb-8">
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-8 md:p-12">
                  <div className="text-center space-y-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Te gustó este booktrailer?
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
                        <Link to="/solicitar-booktrailer" className="flex items-center gap-2">
                          <Mail className="w-5 h-5" />
                          Solicita tu booktrailer
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form for All Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">
                ¿Te interesa un proyecto similar?
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <PortfolioInquiryForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
