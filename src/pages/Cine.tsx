import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Film, Video, Award, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import cineBg from "@/assets/cine-bg.jpg";
import mascotLogo from "@/assets/mascot.png";

const Cine = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Dauro Cine",
    "url": "https://grupodauro.com/grupo-dauro/cine",
    "description": "Producción audiovisual, narrativas innovadoras y cine de autor"
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Dauro Cine - Producción Audiovisual y Cine de Autor"
        description="Producción cinematográfica innovadora: cortometrajes, documentales, videoclips y contenido audiovisual de calidad. Apostamos por narrativas originales y cine independiente."
        keywords="producción audiovisual, cine independiente, cortometrajes, documentales, videoclips, producción cine Granada, cine autor"
        url="https://grupodauro.com/grupo-dauro/cine"
        structuredData={structuredData}
      />
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Cine
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Producción audiovisual, narrativas innovadoras y cine de autor
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-24 left-10 w-20 h-20 opacity-[0.025] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-72 right-20 w-16 h-16 opacity-[0.03] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '6s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-60 left-1/4 w-24 h-24 opacity-[0.02] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '9s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-20 right-1/3 w-20 h-20 opacity-[0.04] animate-float-circle pointer-events-none"
          style={{ animationDelay: '12s' }}
        />
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/public/projects/reinas-cortometraje.png')] bg-cover bg-center opacity-[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              Narrativas que Emocionan y Transforman
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Dauro Cine produce contenido audiovisual que explora nuevas narrativas y formas de 
              expresión cinematográfica. Desde cortometrajes experimentales hasta largometrajes 
              documentales, nuestro compromiso es crear obras que emocionen y hagan reflexionar.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-3xl border-2 border-primary/10">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">15+</p>
            <p className="text-sm text-muted-foreground">Producciones</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">8</p>
            <p className="text-sm text-muted-foreground">Premios</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">20+</p>
            <p className="text-sm text-muted-foreground">Festivales</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">30+</p>
            <p className="text-sm text-muted-foreground">Colaboradores</p>
          </div>
        </div>

        {/* Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Nuestros servicios
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Film className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Producción</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Cortometrajes, documentales y largometrajes
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Video className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Postproducción</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Edición, color grading y efectos visuales
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Award className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Distribución</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Festivales y plataformas de streaming
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Users className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Formación</h3>
              <p className="text-muted-foreground text-sm relative z-10">
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
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Tienes un proyecto audiovisual?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Trabajamos con directores, productores y creadores de contenido. 
            Cuéntanos tu idea y exploremos cómo hacerla realidad.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 relative z-10">
            Proponer proyecto
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cine;
