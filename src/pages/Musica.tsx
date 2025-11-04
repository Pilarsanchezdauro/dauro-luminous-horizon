import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Music, Play, Award, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import mascotLogo from "@/assets/mascot.png";
import DauroArteContactForm from "@/components/DauroArteContactForm";

const Musica = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Dauro Música",
    "url": "https://grupodauro.com/grupo-dauro/musica",
    "description": "Producción musical, composición original y proyectos artísticos"
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Dauro Música - Producción Musical y Composición Original"
        description="Producción musical innovadora: composición original, grabaciones, videoclips musicales y proyectos artísticos. Creamos música que emociona y trasciende fronteras."
        keywords="producción musical, composición original, música original, videoclips musicales, producción música Granada, música de autor"
        url="https://grupodauro.com/grupo-dauro/musica"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Música
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Producción musical, composición original y proyectos artísticos
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
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              Música que Conecta Culturas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Dauro Música produce contenido musical original que explora la fusión de culturas, 
              tradiciones y nuevas sonoridades. Desde composiciones originales hasta producciones 
              multimedia, nuestro compromiso es crear música que emocione y trascienda fronteras.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-3xl border-2 border-primary/10">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">10+</p>
            <p className="text-sm text-muted-foreground">Proyectos Musicales</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">2</p>
            <p className="text-sm text-muted-foreground">Países Unidos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">5+</p>
            <p className="text-sm text-muted-foreground">Videoclips</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">100%</p>
            <p className="text-sm text-muted-foreground">Producción Original</p>
          </div>
        </div>

        {/* Servicios */}
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-12 text-center">
            Nuestros Servicios Musicales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Music className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Composición Original</h3>
              <p className="text-muted-foreground text-sm">
                Música original para proyectos culturales, audiovisuales y artísticos.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Play className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Videoclips</h3>
              <p className="text-muted-foreground text-sm">
                Producción audiovisual de videoclips musicales con identidad visual única.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Award className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Proyectos Artísticos</h3>
              <p className="text-muted-foreground text-sm">
                Colaboraciones multidisciplinares que fusionan música, poesía y artes visuales.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Users className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Colaboraciones</h3>
              <p className="text-muted-foreground text-sm">
                Trabajamos con artistas internacionales para crear obras que trasciendan fronteras.
              </p>
            </div>
          </div>
        </div>

        {/* Proyectos destacados */}
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-12 text-center">
            Proyectos Destacados
          </h2>

          {/* Una Voz para Dos Tierras */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Imagen */}
              <div className="order-2 lg:order-1">
                <img 
                  src="/projects/una-voz-dos-tierras-musica.png" 
                  alt="Una Voz para Dos Tierras - Canción oficial presentación antología poética Lorena Avelar" 
                  className="w-full rounded-2xl shadow-2xl border-4 border-primary/20"
                />
              </div>

              {/* Contenido */}
              <div className="order-1 lg:order-2 space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Canción Oficial
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                    Una Voz para Dos Tierras
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Canción oficial para la presentación de la antología poética de <strong>Lorena Avelar</strong> 
                  "Una voz para dos tierras". Una composición musical que fusiona las tradiciones de España y 
                  México, celebrando el puente cultural entre ambos países.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  Este proyecto musical forma parte de la presentación editorial de la antología poética, 
                  uniendo la palabra escrita con la música en una experiencia artística integral que honra 
                  la riqueza cultural de dos naciones hermanas.
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Música Original</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">España-México</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Poesía</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Fusión Cultural</span>
                </div>

                <div className="pt-4">
                  <a 
                    href="https://www.youtube.com/watch?v=8R2AV-h1Dzg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Play className="h-5 w-5" />
                    Ver Videoclip en YouTube
                  </a>
                </div>

                {/* Video embed */}
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/8R2AV-h1Dzg"
                    title="Una Voz para Dos Tierras - Lorena Avelar"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ojos de Blues */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Contenido */}
              <div className="order-1 space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Colaboración con May Walker
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                    Ojos de Blues
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Con la inestimable colaboración de <strong>May Walker</strong>, "Ojos de Blues" nos cuenta 
                  que no hay un lugar mejor donde dejar atrás los momentos amargos que nuestra increíble ciudad, 
                  <strong> Granada</strong>.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  Una pieza musical que celebra el poder sanador de Granada, mezclando el blues con la esencia 
                  de nuestra tierra. Un tributo sonoro a la capacidad de la ciudad para transformar la melancolía 
                  en esperanza.
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Blues</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Granada</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">May Walker</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Música Original</span>
                </div>

                <div className="pt-4">
                  <a 
                    href="https://www.youtube.com/watch?v=Fsr64OQOFQg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Play className="h-5 w-5" />
                    Ver en YouTube
                  </a>
                </div>
              </div>

              {/* Video embed */}
              <div className="order-2">
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Fsr64OQOFQg"
                    title="Ojos de Blues - May Walker y Grupo Dauro"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-12 rounded-3xl border-2 border-primary/20 text-center">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              ¿Tienes un Proyecto Musical?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Colaboramos con artistas, poetas y creadores para dar vida a proyectos musicales únicos. 
              Cuéntanos tu idea y creemos algo extraordinario juntos.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contáctanos
            </Button>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div id="contact-form" className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-8 text-center">
            Contacta con Nosotros
          </h2>
          <DauroArteContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Musica;
