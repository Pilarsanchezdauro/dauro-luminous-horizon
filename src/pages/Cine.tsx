import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Film, Video, Award, Users } from "lucide-react";
import cineBg from "@/assets/cine-bg.jpg";

const Cine = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cineBg})`,
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Cine
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Producción audiovisual, narrativas innovadoras y cine de autor
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dauro Cine produce contenido audiovisual que explora nuevas narrativas y formas de 
            expresión cinematográfica. Desde cortometrajes experimentales hasta largometrajes 
            documentales, nuestro compromiso es crear obras que emocionen y hagan reflexionar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Producciones</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">8</div>
            <div className="text-sm text-muted-foreground">Premios</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">20+</div>
            <div className="text-sm text-muted-foreground">Festivales</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">30+</div>
            <div className="text-sm text-muted-foreground">Colaboradores</div>
          </div>
        </div>

        {/* Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Nuestros servicios
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <Film className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-bold mb-3">Producción</h3>
              <p className="text-muted-foreground text-sm">
                Cortometrajes, documentales y largometrajes
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <Video className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-bold mb-3">Postproducción</h3>
              <p className="text-muted-foreground text-sm">
                Edición, color grading y efectos visuales
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-bold mb-3">Distribución</h3>
              <p className="text-muted-foreground text-sm">
                Festivales y plataformas de streaming
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-bold mb-3">Formación</h3>
              <p className="text-muted-foreground text-sm">
                Talleres y masterclasses de cine
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Proyectos destacados
          </h2>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <Film className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-playfair font-bold mb-4">
                  Título del Proyecto 1
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Cortometraje de ficción que explora las relaciones humanas en la era digital. 
                  Seleccionado en más de 10 festivales internacionales.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Ficción
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    2024
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    25 min
                  </span>
                </div>
                <Button variant="outline">Ver trailer</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <Film className="h-16 w-16 text-primary" />
              </div>
              <div className="lg:order-1">
                <h3 className="text-3xl font-playfair font-bold mb-4">
                  Título del Proyecto 2
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Documental sobre el proceso creativo de artistas contemporáneos. 
                  Premiado en el Festival de Cine Documental.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Documental
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    2023
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    52 min
                  </span>
                </div>
                <Button variant="outline">Ver trailer</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-secondary p-12 rounded-3xl">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
            ¿Tienes un proyecto audiovisual?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Trabajamos con directores, productores y creadores de contenido. 
            Cuéntanos tu idea y exploremos cómo hacerla realidad.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Proponer proyecto
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cine;
