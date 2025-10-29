import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import editorialBg from "@/assets/editorial-bg.jpg";
import arteBg from "@/assets/arte-bg.jpg";

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

        {/* Bottom CTA */}
        <section className="py-30">
          <div className="bg-muted rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 organic-shape" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 text-primary">
                PROMOVEMOS LA CULTURA
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-10 font-light">
                Desde 2004 trabajando en la intersección entre arte, literatura, cine y tecnología
              </p>
              <Link to="/contacto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-7 rounded-full font-semibold">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
