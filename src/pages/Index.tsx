import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { BookOpen, Palette, Film, Sparkles } from "lucide-react";
import editorialBg from "@/assets/editorial-bg.jpg";
import arteBg from "@/assets/arte-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section */}
        <SectionCard
          title="Dauro Editorial"
          description="Nuestra editorial es un espacio dedicado a dar voz a autores contemporáneos y rescatar obras fundamentales. Publicamos literatura de calidad que trasciende el tiempo, combinando la tradición editorial con la innovación tecnológica."
          image={editorialBg}
          link="/grupo-dauro/editorial"
          icon={<BookOpen className="h-12 w-12" />}
        />

        {/* Arte Section */}
        <SectionCard
          title="Dauro Arte"
          description="Promovemos y difundimos el arte contemporáneo a través de exposiciones, representación de artistas y venta de obras. Creamos puentes entre creadores y coleccionistas, fomentando el diálogo cultural y la apreciación artística."
          image={arteBg}
          link="/grupo-dauro/arte"
          icon={<Palette className="h-12 w-12" />}
          reversed
        />

        {/* Cine Section */}
        <div className="py-16">
          <div className="bg-gradient-to-br from-secondary to-card rounded-3xl p-8 lg:p-12 shadow-lg">
            <div className="max-w-3xl">
              <Film className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
                Dauro Cine
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Producimos contenido audiovisual que explora nuevas narrativas
                y formas de expresión cinematográfica. Desde cortometrajes
                hasta largometrajes, nuestro compromiso es crear obras que
                emocionen y hagan reflexionar.
              </p>
              <a
                href="/grupo-dauro/cine"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Ver proyectos
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* IA Section */}
        <div className="py-16 mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12 border border-primary/10">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
                Dauro IA
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Integramos la inteligencia artificial en procesos creativos
                para ofrecer servicios innovadores. Desde la generación de
                contenidos hasta la optimización de workflows editoriales,
                exploramos las posibilidades que ofrece la tecnología al
                servicio de la cultura.
              </p>
              <a
                href="/grupo-dauro/ia"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Descubre nuestros servicios IA
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
