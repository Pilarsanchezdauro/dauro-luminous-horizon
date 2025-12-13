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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioInquiryForm from '@/components/PortfolioInquiryForm';
import { MusicProjectsCTA } from '@/components/MusicProjectsCTA';

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

// Artist booking agency layout component
function ArtistLayout({ project, links, galleryImages }: { 
  project: any; 
  links: Array<{ url: string; text: string }>; 
  galleryImages: Array<{ url: string; caption?: string }>;
}) {
  const Icon = categoryIcons[project.category];
  const youtubeLink = links.find(l => l.url.includes('youtube'));

  // Use the main_image_url from database
  const mainImageUrl = project.main_image_url;

  return (
    <>
      <SEO
        title={`${project.title} | Artista representado por Grupo Dauro`}
        description={project.summary}
        image={`https://grupodauro.com/og-${project.slug}.jpg`}
        url={`https://grupodauro.com/portafolio/${project.slug}`}
        type="article"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          <Link to="/portafolio">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al portafolio
            </Button>
          </Link>

          {/* Artist Header - Clean professional layout */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12 mb-12">
              {/* Photo Column */}
              <div className="flex flex-col items-center lg:items-start">
                {mainImageUrl && (
                  <div className="w-full max-w-[400px]">
                    <img
                      src={mainImageUrl}
                      alt={project.title}
                      className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl"
                    />
                  </div>
                )}
                
                {/* Quick contact button mobile */}
                <div className="lg:hidden mt-6 w-full max-w-[400px]">
                  <Button size="lg" className="w-full" asChild>
                    <a href="#contacto">
                      <Mail className="mr-2 h-5 w-5" />
                      Solicitar contratación
                    </a>
                  </Button>
                </div>
              </div>

              {/* Info Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Icon className="w-3 h-3 mr-1" />
                    {categoryLabels[project.category]}
                  </Badge>
                  {project.featured && <Badge>Artista destacado</Badge>}
                </div>

                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
                  {project.client && (
                    <p className="text-xl text-muted-foreground">{project.client}</p>
                  )}
                </div>

                {/* Bio summary */}
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-lg leading-relaxed">{project.summary}</p>
                </div>

                {/* Full description */}
                {project.description && (
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-semibold mb-3">Biografía</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
                  </div>
                )}

                {/* Services/Skills */}
                {project.services && project.services.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Servicios disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-sm px-3 py-1">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking conditions for artists */}
                {project.category.startsWith('artistas') && (
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <h3 className="text-lg font-semibold mb-2">Condiciones de contratación</h3>
                    {project.category === 'artistas-cantantes' ? (
                      <>
                        <p className="text-muted-foreground text-sm">
                          <strong>Disponible para:</strong> Contratación de su voz para proyectos empresariales, grabación de canciones y videoclips musicales con su imagen para expansión de marca.
                        </p>
                        <p className="text-muted-foreground text-sm mt-2">
                          <strong>No disponible para:</strong> Actuaciones en directo.
                        </p>
                      </>
                    ) : project.category === 'artistas-pintores' ? (
                      <p className="text-muted-foreground text-sm">
                        <strong>Disponible para:</strong> Contratación para realizar la portada de tu libro, recrear la portada de tu libro en lienzo, crear tu marca artística, cualquier pintura por encargo.
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        <strong>Disponible para:</strong> Contratación para proyectos artísticos y comerciales.
                      </p>
                    )}
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-sm text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                {links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {links.map((link, index) => {
                      const isExternal = link.url.startsWith('http');
                      const isYoutube = link.url.includes('youtube');
                      return (
                        <Button 
                          key={index} 
                          variant={isYoutube ? "default" : "outline"}
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

                {/* Desktop contact button */}
                <div className="hidden lg:block pt-4">
                  <Button size="lg" asChild>
                    <a href="#contacto">
                      <Mail className="mr-2 h-5 w-5" />
                      Solicitar contratación
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Section */}
            {youtubeLink && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Material audiovisual</h2>
                <div className="aspect-video max-w-4xl rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={youtubeLink.url.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    title={project.title}
                  />
                </div>
              </section>
            )}

            {/* Photo Gallery by Category */}
            {galleryImages.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Galería de obras</h2>
                {(() => {
                  // Group images by category
                  const imagesByCategory = galleryImages.reduce((acc, img) => {
                    const cat = (img as any).category || 'Otras obras';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(img);
                    return acc;
                  }, {} as Record<string, typeof galleryImages>);
                  
                  const categories = Object.keys(imagesByCategory);
                  
                  // If only one category, show without tabs
                  if (categories.length <= 1) {
                    return (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryImages.map((img, index) => (
                          <div 
                            key={index} 
                            className="relative overflow-hidden rounded-lg aspect-[3/4] group"
                          >
                            <img
                              src={img.url}
                              alt={(img as any).alt || `${project.title} - Obra ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }
                  
                  // Multiple categories - show with tabs
                  return (
                    <Tabs defaultValue={categories[0]} className="w-full">
                      <TabsList className="mb-6 flex-wrap h-auto gap-2">
                        {categories.map((cat) => (
                          <TabsTrigger key={cat} value={cat} className="text-sm">
                            {cat} ({imagesByCategory[cat].length})
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {categories.map((cat) => (
                        <TabsContent key={cat} value={cat}>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {imagesByCategory[cat].map((img, index) => (
                              <div 
                                key={index} 
                                className="relative overflow-hidden rounded-lg aspect-[3/4] group"
                              >
                                <img
                                  src={img.url}
                                  alt={(img as any).alt || `${project.title} - ${cat} ${index + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  );
                })()}
              </section>
            )}

            {/* Contact / Booking Section */}
            <section id="contacto" className="scroll-mt-24">
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="pt-8 pb-8">
                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-start">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Contratación</h2>
                      <p className="text-muted-foreground">
                        ¿Interesado en contratar a <strong>{project.title}</strong>? Completa el formulario y nos pondremos en contacto contigo.
                      </p>
                      <div className="p-3 bg-background/50 rounded-md border border-border/50 text-sm space-y-2">
                        <p className="font-medium">Servicios disponibles orientativos:</p>
                        {project.category === 'artistas-cantantes' ? (
                          <>
                            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                              <li>Contratación de su voz para proyectos</li>
                              <li>Grabación de canciones personalizadas</li>
                              <li>Videoclips musicales con su imagen para expansión de marca</li>
                            </ul>
                            <p className="text-muted-foreground/80 italic mt-2">
                              * No disponible para actuaciones en directo
                            </p>
                          </>
                        ) : project.category === 'artistas-pintores' ? (
                          <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Encargos de obra original y series limitadas</li>
                            <li>Licencias de uso de imagen para proyectos editoriales y empresariales</li>
                            <li>Exposición y venta de obras a través de Grupo Dauro</li>
                          </ul>
                        ) : (
                          <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Proyectos artísticos y comerciales a medida</li>
                            <li>Colaboraciones con marcas y entidades</li>
                            <li>Acciones especiales bajo propuesta</li>
                          </ul>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {project.slug === 'jose-carrera' ? (
                          <>
                            <video
                              src="/videos/logo-free-dauro-productions.mp4"
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-10 h-10 object-contain"
                            />
                            <span>Representado por Dauro Free Productions</span>
                          </>
                        ) : project.category === 'artistas-pintores' ? (
                          <>
                            <PaintBucket className="h-4 w-4" />
                            <span>Representado por Grupo Dauro</span>
                          </>
                        ) : (
                          <>
                            <Briefcase className="h-4 w-4" />
                            <span>Representado por Grupo Dauro</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <PortfolioInquiryForm />
                    </div>
                  </div>
              </CardContent>
            </Card>
          </section>

          {/* Music Projects CTA */}
          <MusicProjectsCTA />
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
