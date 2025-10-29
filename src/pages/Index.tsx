import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import editorialBg from "@/assets/editorial-bg.jpg";
import arteBg from "@/assets/arte-bg.jpg";
import cineBg from "@/assets/cine-bg.jpg";
import iaBg from "@/assets/ia-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Editorial Section */}
        <SectionCard
          title="Editorial"
          description="Publicamos literatura de calidad que trasciende el tiempo. Damos voz a autores contemporáneos y rescatamos obras fundamentales."
          image={editorialBg}
          link="/grupo-dauro/editorial"
        />

        {/* Arte Section */}
        <SectionCard
          title="Arte"
          description="Promovemos el arte contemporáneo. Representamos artistas, organizamos exposiciones y creamos puentes entre creadores y coleccionistas."
          image={arteBg}
          link="/grupo-dauro/arte"
          reversed
        />

        {/* Cine Section */}
        <SectionCard
          title="Cine"
          description="Producimos y distribuimos contenido audiovisual de calidad. Apostamos por narrativas innovadoras que exploran nuevas formas de contar historias."
          image={cineBg}
          link="/grupo-dauro/cine"
        />

        {/* IA Section */}
        <SectionCard
          title="Inteligencia Artificial"
          description="Exploramos las posibilidades creativas de la IA en el arte y la cultura. Desarrollamos proyectos que fusionan tecnología y expresión artística."
          image={iaBg}
          link="/grupo-dauro/ia"
          reversed
        />

        {/* Antiguo Blog Section */}
        <section className="my-32">
          <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-12 lg:p-20 rounded-3xl border-2 border-primary/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <p className="text-6xl lg:text-7xl font-bold text-primary mb-6">Desde 2000</p>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
                ¿Quieres ver nuestros trabajos desde el año 2000?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ve a nuestro antiguo blog donde encontrarás toda una hemeroteca 
                interesante de nuestros autores
              </p>
              <a href="#" className="inline-block">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                >
                  Visitar Antiguo Blog
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="my-32">
          <div className="text-center py-24 px-4 border-y-2 border-foreground/10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              ¿Listo para crear<br />algo <span className="italic">extraordinario</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Únete a nosotros en la vanguardia de la cultura y la innovación
            </p>
            <Link to="/contacto">
              <Button 
                size="lg" 
                className="text-sm uppercase tracking-wider px-12 py-6 bg-accent text-white hover:bg-accent/90 transition-all"
              >
                Contáctanos
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
