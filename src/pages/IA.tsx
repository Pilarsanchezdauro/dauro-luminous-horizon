import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap, Code } from "lucide-react";
import iaBg from "@/assets/ia-bg.jpg";

const IA = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${iaBg})`,
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro IA
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Inteligencia artificial al servicio de la creatividad y la cultura
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Integramos la inteligencia artificial en procesos creativos para ofrecer servicios 
            innovadores. Desde la generación de contenidos hasta la optimización de workflows 
            editoriales, exploramos las posibilidades que ofrece la tecnología al servicio de la cultura.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-12 w-12 text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Generación de Contenido</h3>
            <p className="text-muted-foreground mb-6">
              Asistencia en escritura creativa, copywriting, generación de ideas y desarrollo 
              de narrativas con herramientas de IA generativa.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Textos publicitarios y marketing</li>
              <li>• Sinopsis y desarrollos narrativos</li>
              <li>• Traducción y localización</li>
              <li>• Generación de diálogos y guiones</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-10 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-12 w-12 text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Análisis y Optimización</h3>
            <p className="text-muted-foreground mb-6">
              Análisis de tendencias, optimización de procesos editoriales y herramientas 
              de análisis de texto para mejorar la calidad editorial.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Análisis de legibilidad y estilo</li>
              <li>• Detección de inconsistencias</li>
              <li>• Optimización SEO de contenidos</li>
              <li>• Predicción de tendencias literarias</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Zap className="h-12 w-12 text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Automatización de Tareas</h3>
            <p className="text-muted-foreground mb-6">
              Automatizamos procesos repetitivos para que los equipos se centren en la 
              creatividad y el valor añadido.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Corrección ortotipográfica avanzada</li>
              <li>• Categorización automática de contenidos</li>
              <li>• Generación de metadatos</li>
              <li>• Resúmenes y extractos automáticos</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-10 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Code className="h-12 w-12 text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Soluciones Personalizadas</h3>
            <p className="text-muted-foreground mb-6">
              Desarrollamos herramientas de IA específicas para las necesidades de cada cliente 
              en el sector cultural y editorial.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Chatbots culturales y educativos</li>
              <li>• Sistemas de recomendación de lectura</li>
              <li>• Herramientas de escritura asistida</li>
              <li>• Análisis de audiencias</li>
            </ul>
          </div>
        </div>

        {/* Philosophy */}
        <section className="mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-12 rounded-3xl border-2 border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              Nuestra filosofía
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Creemos que la IA es una herramienta que debe potenciar la creatividad humana, 
              no sustituirla. Nuestro enfoque es colaborativo: la tecnología como aliada del 
              proceso creativo, preservando siempre la esencia y el criterio humano.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Trabajamos con ética, transparencia y respeto por los derechos de autor. 
              La IA debe servir a los creadores, no al revés.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Casos de uso
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Editoriales</h3>
              <p className="text-muted-foreground text-sm">
                Optimización de procesos, análisis de manuscritos y herramientas de corrección avanzada
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-accent/30 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Brain className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Autores</h3>
              <p className="text-muted-foreground text-sm">
                Asistencia en escritura, investigación, desarrollo de personajes y narrativas
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Instituciones</h3>
              <p className="text-muted-foreground text-sm">
                Digitalización de archivos, sistemas de búsqueda inteligentes y preservación cultural
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Quieres integrar IA en tu proyecto cultural?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Analizamos tus necesidades y diseñamos soluciones personalizadas que respeten 
            tu visión creativa y optimicen tus procesos.
          </p>
          <a href="https://dauroia.com/" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 text-lg px-8 py-6">
              Solicitar consultoría
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IA;
