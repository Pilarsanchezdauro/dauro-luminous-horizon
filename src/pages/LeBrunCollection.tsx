import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ExternalLink, Frame, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Gallery images - artwork samples
const galleryImages = [
  { url: '/projects/alegria-compartida.jpg', title: 'Alegría Compartida', medium: 'Óleo sobre lienzo' },
  { url: '/projects/esperanza.jpg', title: 'Esperanza', medium: 'Acrílico sobre lienzo' },
  { url: '/projects/serenidad.jpg', title: 'Serenidad', medium: 'Técnica mixta' },
  { url: '/projects/inspiracion.jpg', title: 'Inspiración', medium: 'Óleo sobre lienzo' },
  { url: '/projects/gratitud.jpg', title: 'Gratitud', medium: 'Acrílico sobre lienzo' },
  { url: '/projects/reflexion.jpg', title: 'Reflexión', medium: 'Técnica mixta' },
  { url: '/projects/optimismo.jpg', title: 'Optimismo', medium: 'Óleo sobre lienzo' },
  { url: '/projects/compasion.jpg', title: 'Compasión', medium: 'Acrílico sobre lienzo' },
];

const inquirySchema = z.object({
  nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  apellidos: z.string().trim().min(2, 'Los apellidos deben tener al menos 2 caracteres').max(100),
  email: z.string().trim().email('Introduce un email válido').max(255),
  telefono: z.string().trim().min(9, 'Introduce un teléfono válido').max(20),
  obraInteres: z.string().trim().max(200).optional(),
  mensaje: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres').max(2000),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function LeBrunCollection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('portfolio_inquiries')
        .insert({
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          categoria: 'obras-arte',
          descripcion: `Obra de interés: ${data.obraInteres || 'No especificada'}\n\nMensaje: ${data.mensaje}`,
        });

      if (error) throw error;

      setIsSubmitted(true);
      reset();
      toast({
        title: 'Consulta enviada',
        description: 'Nos pondremos en contacto contigo pronto.',
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: 'Error',
        description: 'No se pudo enviar la consulta. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="LeBrun Collection | Colección de Arte Exclusiva"
        description="Descubre la LeBrun Collection, una exclusiva colección de obras de arte contemporáneo gestionada por Grupo Dauro. Peritaje, tasación y adquisición de obras."
        keywords="LeBrun Collection, arte contemporáneo, colección arte, peritaje arte, tasación obras, galería arte"
        image="https://www.grupodauro.com/og-lebrun-collection.jpg"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-28">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('/projects/fiesta-nocturna.jpg')`,
            }}
          />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 border-white/30 text-white/90 text-sm px-4 py-2">
              <Frame className="w-4 h-4 mr-2" />
              Colección Exclusiva
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6">
              LeBrun Collection
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Una exclusiva selección de obras de arte contemporáneo, cuidadosamente curada para coleccionistas exigentes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="#galeria">Explorar Galería</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10" asChild>
                <a href="#contacto">Consultar Disponibilidad</a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre la Colección</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      La <strong className="text-foreground">LeBrun Collection</strong> representa una cuidadosa selección de obras de arte contemporáneo que capturan la esencia de las emociones humanas a través de diversos estilos y técnicas artísticas.
                    </p>
                    <p>
                      Cada pieza de nuestra colección ha sido seleccionada por su calidad técnica, originalidad y capacidad de transmitir emociones profundas. Trabajamos con artistas reconocidos y talentos emergentes para ofrecer una propuesta artística única.
                    </p>
                    <p>
                      A través de <strong className="text-foreground">Grupo Dauro</strong>, ofrecemos servicios completos de asesoramiento, peritaje y tasación para coleccionistas, inversores y amantes del arte.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img 
                      src="/projects/nostalgia.jpg" 
                      alt="Obra de la colección"
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    <img 
                      src="/projects/tranquilidad.jpg" 
                      alt="Obra de la colección"
                      className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src="/projects/orgullo.jpg" 
                      alt="Obra de la colección"
                      className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                    />
                    <img 
                      src="/projects/tristeza.jpg" 
                      alt="Obra de la colección"
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ofrecemos un servicio integral para coleccionistas y amantes del arte
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Frame className="h-6 w-6 text-primary" />
                    </div>
                    Adquisición de Obras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Asesoramiento personalizado para la adquisición de obras de arte. Te ayudamos a encontrar la pieza perfecta para tu colección.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    Peritaje y Autenticación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Servicio profesional de peritaje y autenticación de obras de arte. Certificación de autenticidad y estado de conservación.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    Tasación Profesional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Valoración y tasación de obras de arte para seguros, herencias, compraventa y otros fines legales y comerciales.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Galería de Obras</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explora una selección de obras disponibles en nuestra colección
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                    <p className="text-xs text-white/70">{image.medium}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                ¿Interesado en alguna obra? Contáctanos para conocer disponibilidad y precios.
              </p>
              <Button asChild>
                <a href="#contacto">Consultar Disponibilidad</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <h3 className="text-white font-semibold text-lg">{galleryImages[selectedImage].title}</h3>
                <p className="text-white/70 text-sm">{galleryImages[selectedImage].medium}</p>
              </div>
              <button
                className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contacto" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Consulta sobre la Colección</h2>
                  <p className="text-muted-foreground mb-8">
                    ¿Te interesa adquirir una obra o necesitas nuestros servicios de peritaje y tasación? Completa el formulario y nos pondremos en contacto contigo.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Ubicación</h3>
                        <p className="text-muted-foreground text-sm">Granada, España</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href="mailto:arte@grupodauro.com" className="text-muted-foreground text-sm hover:text-primary">
                          arte@grupodauro.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Sitio Web</h3>
                        <a 
                          href="https://lebruncollection.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-primary"
                        >
                          lebruncollection.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Nota:</strong> Todas las obras están sujetas a disponibilidad. Los precios se comunican bajo petición tras verificar el interés del coleccionista.
                    </p>
                  </div>
                </div>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">¡Consulta enviada!</h3>
                        <p className="text-muted-foreground mb-6">
                          Hemos recibido tu consulta. Nos pondremos en contacto contigo pronto.
                        </p>
                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                          Enviar otra consulta
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre *</Label>
                            <Input
                              id="nombre"
                              {...register('nombre')}
                              placeholder="Tu nombre"
                            />
                            {errors.nombre && (
                              <p className="text-sm text-destructive">{errors.nombre.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellidos">Apellidos *</Label>
                            <Input
                              id="apellidos"
                              {...register('apellidos')}
                              placeholder="Tus apellidos"
                            />
                            {errors.apellidos && (
                              <p className="text-sm text-destructive">{errors.apellidos.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="tu@email.com"
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            {...register('telefono')}
                            placeholder="+34 600 000 000"
                          />
                          {errors.telefono && (
                            <p className="text-sm text-destructive">{errors.telefono.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="obraInteres">Obra de interés (opcional)</Label>
                          <Input
                            id="obraInteres"
                            {...register('obraInteres')}
                            placeholder="Nombre de la obra que te interesa"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mensaje">Mensaje *</Label>
                          <Textarea
                            id="mensaje"
                            {...register('mensaje')}
                            placeholder="Cuéntanos sobre tu interés en la colección..."
                            rows={4}
                          />
                          {errors.mensaje && (
                            <p className="text-sm text-destructive">{errors.mensaje.message}</p>
                          )}
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                          {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Descubre más servicios de arte
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Grupo Dauro ofrece servicios completos de peritaje, tasación y gestión de obras de arte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/servicios">Ver todos los servicios</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portafolio?categoria=obras-arte">Más obras de arte</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
