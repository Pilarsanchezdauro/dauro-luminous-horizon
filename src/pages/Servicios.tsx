import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Film, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const Servicios = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-foreground">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones profesionales para creadores, artistas y proyectos culturales
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <BookOpen className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-3xl font-playfair font-bold mb-4">Servicios Editoriales</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Acompañamos a autores y editoriales en todo el proceso de creación y publicación 
                de obras literarias.
              </p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li>• Corrección y edición de textos</li>
                <li>• Asesoramiento editorial</li>
                <li>• Diseño de portadas y maquetación</li>
                <li>• Distribución y promoción</li>
                <li>• Conversión a ebook y audiolibro</li>
              </ul>
              <Link to="/servicios/editoriales">
                <Button>Más información</Button>
              </Link>
            </div>

            <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <Music className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-3xl font-playfair font-bold mb-4">Servicios Musicales</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Producción, gestión y promoción de proyectos musicales contemporáneos.
              </p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li>• Producción musical</li>
                <li>• Gestión de derechos de autor</li>
                <li>• Distribución digital</li>
                <li>• Promoción y marketing musical</li>
                <li>• Composición para proyectos</li>
              </ul>
              <Link to="/servicios/musicales">
                <Button>Más información</Button>
              </Link>
            </div>

            <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <Film className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-3xl font-playfair font-bold mb-4">Servicios de Cine</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Producción audiovisual integral para proyectos cinematográficos y multimedia.
              </p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li>• Producción de cortometrajes</li>
                <li>• Documentales y video arte</li>
                <li>• Postproducción y VFX</li>
                <li>• Distribución en festivales</li>
                <li>• Servicios de rodaje</li>
              </ul>
              <Link to="/servicios/cine">
                <Button>Más información</Button>
              </Link>
            </div>

            <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <Palette className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-3xl font-playfair font-bold mb-4">Servicios de Arte</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Gestión integral de carrera artística y asesoramiento para coleccionistas.
              </p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li>• Representación de artistas</li>
                <li>• Organización de exposiciones</li>
                <li>• Asesoramiento para coleccionistas</li>
                <li>• Valoración de obras</li>
                <li>• Marketing artístico</li>
              </ul>
              <Link to="/servicios/arte">
                <Button>Más información</Button>
              </Link>
            </div>
          </div>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-4xl font-playfair font-bold text-center mb-12">
              Cómo trabajamos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Consulta inicial</h3>
                <p className="text-sm text-muted-foreground">
                  Analizamos tu proyecto y necesidades
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Propuesta</h3>
                <p className="text-sm text-muted-foreground">
                  Diseñamos un plan personalizado
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Desarrollo</h3>
                <p className="text-sm text-muted-foreground">
                  Ejecutamos con seguimiento continuo
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold mb-2">Entrega</h3>
                <p className="text-sm text-muted-foreground">
                  Resultados profesionales garantizados
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-primary/5 to-accent/5 p-12 rounded-3xl border border-primary/10">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cuéntanos tu idea y exploremos juntos cómo podemos ayudarte a hacerla realidad.
            </p>
            <Link to="/contacto">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Solicitar presupuesto
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
