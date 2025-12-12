import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Globe, Users, Video, Palette, Briefcase, Film, Music, Youtube, Mail, BookOpen, Mic, PaintBucket } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PortfolioInquiryForm from '@/components/PortfolioInquiryForm';

const categoryIcons = {
  webs: Globe,
  booktrailers: Video,
  pintura: Palette,
  'portadas-libros': BookOpen,
  'imagen-corporativa': Briefcase,
  cine: Film,
  musica: Music,
  avatares: Users,
  'artistas-cantantes': Mic,
  'artistas-pintores': PaintBucket,
};

const categoryLabels = {
  webs: 'Webs',
  booktrailers: 'Booktrailers',
  pintura: 'Pintura',
  'portadas-libros': 'Portadas de Libros',
  'imagen-corporativa': 'Imagen Corporativa',
  cine: 'Cine',
  musica: 'Música',
  avatares: 'Avatares',
  'artistas-cantantes': 'Cantantes',
  'artistas-pintores': 'Pintores',
};

// Artist-specific layout component
function ArtistLayout({ project, links, galleryImages }: { 
  project: any; 
  links: Array<{ url: string; text: string }>; 
  galleryImages: Array<{ url: string; caption?: string }>;
}) {
  const Icon = categoryIcons[project.category];
  const isYoutubeLink = links.length > 0 && links[0].url.includes('youtube');

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

        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
          {project.main_image_url && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${project.main_image_url})` }}
            />
          )}
          
          <div className="container mx-auto px-4 pt-24 pb-16 relative z-20">
            <Link to="/portafolio">
              <Button variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al portafolio
              </Button>
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Artist Photo */}
              <div className="flex justify-center order-1 md:order-2">
                {project.main_image_url && (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-transparent rounded-2xl blur-2xl" />
                    <img
                      src={project.main_image_url}
                      alt={project.title}
                      className="relative max-h-[500px] w-auto object-contain rounded-xl shadow-2xl animate-fade-in"
                    />
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="text-center md:text-left order-2 md:order-1 space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    <Icon className="w-3 h-3 mr-1" />
                    {categoryLabels[project.category]}
                  </Badge>
                  {project.featured && <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Destacado</Badge>}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  {project.title}
                </h1>
                
                {project.client && (
                  <p className="text-xl text-white/70 font-medium">{project.client}</p>
                )}
                
                <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                  {project.summary}
                </p>

                {/* Quick Links */}
                {links.length > 0 && (
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-4">
                    {links.map((link, index) => {
                      const isExternal = link.url.startsWith('http');
                      const isYoutube = link.url.includes('youtube');
                      return (
                        <Button 
                          key={index} 
                          size="lg" 
                          className={isYoutube ? 'bg-red-600 hover:bg-red-700' : ''}
                          asChild
                        >
                          {isExternal ? (
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {isYoutube ? <Youtube className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                              {link.text}
                            </a>
                          ) : (
                            <Link to={link.url}>{link.text}</Link>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-16">
            
            {/* Video Section */}
            {isYoutubeLink && (
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Escucha su música</h2>
                <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={links[0].url.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    title={project.title}
                  />
                </div>
              </section>
            )}

            {/* Description */}
            {project.description && (
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Biografía</h2>
                <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur border-border/50">
                  <CardContent className="pt-8 pb-8">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-center">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Photo Gallery */}
            {galleryImages.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-3xl font-bold text-center">Galería</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((img, index) => (
                    <div 
                      key={index} 
                      className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={img.url}
                        alt={img.caption || `${project.title} - Foto ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {img.caption && (
                        <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Services/Skills */}
            {project.services && project.services.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Especialidades</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {project.services.map((service) => (
                    <Badge 
                      key={service} 
                      variant="outline" 
                      className="text-base px-6 py-3 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <section className="space-y-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Contact / Booking */}
            <section className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">¿Interesado en contratar a {project.title}?</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Contáctanos para eventos, colaboraciones o proyectos musicales
                </p>
              </div>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-6">
                  <PortfolioInquiryForm />
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

// Default project layout
function DefaultProjectLayout({ project, links, galleryImages }: { 
  project: any; 
  links: Array<{ url: string; text: string }>; 
  galleryImages: Array<{ url: string; caption?: string }>;
}) {
  const Icon = categoryIcons[project.category];

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
                  {links.map((link, index) => {
                    const isExternal = link.url.startsWith('http');
                    const showIcon = isExternal || link.text.toLowerCase().includes('tienda');
                    return (
                      <Button key={index} asChild variant="outline" size="lg">
                        {isExternal ? (
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {showIcon && <ExternalLink className="mr-2 h-4 w-4" />}
                            {link.text}
                          </a>
                        ) : (
                          <Link to={link.url}>
                            {link.text}
                          </Link>
                        )}
                      </Button>
                    );
                  })}
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

  const links = project.links as Array<{ url: string; text: string }> || [];
  const galleryImages = project.gallery_images as Array<{ url: string; caption?: string }> || [];

  // Use artist-specific layout for artist categories
  if (project.category.startsWith('artistas-')) {
    return <ArtistLayout project={project} links={links} galleryImages={galleryImages} />;
  }

  // Default layout for other projects
  return <DefaultProjectLayout project={project} links={links} galleryImages={galleryImages} />;
}
