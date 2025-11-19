import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ExternalLink, Archive, Clock, BookOpen, Image, FileText } from "lucide-react";

const ArchivoHistorico = () => {
  return (
    <>
      <SEO
        title="Archivo Histórico Digital"
        description="Accede a nuestro archivo histórico digital con publicaciones, proyectos y contenido cultural de Grupo Dauro desde sus inicios."
        keywords="archivo histórico, Grupo Dauro, publicaciones antiguas, contenido histórico, editorial"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Archive className="h-12 w-12 text-primary" />
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
                  Archivo Histórico Digital
                </h1>
              </div>

              <div className="space-y-8 text-foreground/80">
                <p className="text-xl leading-relaxed">
                  Bienvenido al archivo histórico digital de <strong>Grupo Cultural Dauro</strong>. 
                  Este espacio preserva nuestra trayectoria editorial y cultural desde nuestros inicios.
                </p>

                <div className="bg-muted/30 p-8 rounded-lg border border-border">
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
                    ¿Qué encontrarás en el archivo?
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Publicaciones antiguas</h3>
                        <p className="text-sm text-foreground/70">
                          Catálogo de obras publicadas en años anteriores, incluyendo títulos descatalogados.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Image className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Proyectos culturales</h3>
                        <p className="text-sm text-foreground/70">
                          Documentación de eventos, exposiciones y actividades culturales realizadas.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Artículos y reseñas</h3>
                        <p className="text-sm text-foreground/70">
                          Contenido periodístico y crítica literaria de nuestros primeros años.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Historia del grupo</h3>
                        <p className="text-sm text-foreground/70">
                          Cronología, hitos y evolución de Grupo Dauro a lo largo de los años.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Importante: Sitio externo
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Al continuar, serás redirigido a nuestro archivo histórico alojado en un servidor externo. 
                    Este contenido se mantiene con fines documentales y puede diferir en diseño y funcionalidad de nuestra web actual.
                  </p>
                  <p className="text-sm text-foreground/60">
                    URL de destino: <span className="font-mono">grupodauro.wpcomstaging.com</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1"
                  >
                    <a
                      href="https://grupodauro.wpcomstaging.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Acceder al Archivo Histórico
                    </a>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <a href="/">
                      Volver a la página principal
                    </a>
                  </Button>
                </div>

                <div className="border-t border-border pt-6 mt-8">
                  <p className="text-sm text-foreground/60 italic">
                    El archivo histórico se mantiene como referencia documental. Para información actualizada sobre nuestros servicios y publicaciones, visita las secciones principales de esta web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ArchivoHistorico;
