import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap, Code } from "lucide-react";
import { SEO } from "@/components/SEO";
import iaBg from "@/assets/ia-bg.jpg";

const IA = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dauro IA - Inteligencia Artificial Creativa",
    "url": "https://grupodauro.com/grupo-dauro/ia",
    "description": "Servicios creativos con inteligencia artificial: generación de imágenes, textos, música y contenido multimedia",
    "provider": {
      "@type": "Organization",
      "name": "Grupo Cultural Dauro"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Dauro IA - Creatividad e Inteligencia Artificial"
        description="Servicios creativos con IA: generación de imágenes artísticas, textos creativos, música original y contenido multimedia. Fusionamos arte y tecnología para proyectos únicos."
        keywords="inteligencia artificial arte, IA creatividad, generación imágenes IA, música IA, contenido IA, servicios IA creativos, arte generativo"
        url="https://grupodauro.com/grupo-dauro/ia"
        structuredData={structuredData}
      />
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
          <p className="text-lg lg:text-xl text-white/80 mb-4 uppercase tracking-wider">DAURO IA</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Visión Artística,<br/>
            <span className="text-primary">Creación IA</span><br/>
            Belleza Inteligente
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            No solo creamos portales a nuevas realidades. Tu visión, impulsada por nuestra 
            experticia en inteligencia artificial, tiene el poder de redefinir tu industria.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
            Servicios con Visión Artística
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            En Grupo Dauro IA desarrollamos tecnología con alma. Unimos la precisión de la 
            inteligencia artificial con la sensibilidad del arte para crear soluciones que 
            inspiran, emocionan y funcionan.
          </p>
          <p className="text-primary font-semibold mt-4">
            🎯 Todos nuestros servicios son personalizados
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Valoración de Arte con IA</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Gestiona tu patrimonio artístico con precisión tecnológica y estética profesional.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Clasificación automatizada</li>
              <li>• Estimación de valor</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Documentoscopia Avanzada</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Autenticidad documental garantizada con inteligencia artificial.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Análisis de tintas y firmas</li>
              <li>• Verificación de certificados</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Escritura Creativa Asistida</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Narrativas con estilo, redactadas con precisión estética.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Contenidos editoriales</li>
              <li>• Corrección con IA artística</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Branding Cultural</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Construimos marcas que cuentan una historia y emocionan.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Naming y eslóganes</li>
              <li>• Sistemas gráficos generativos</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Zap className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Producción Audiovisual</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Tu mensaje en movimiento, con estética cuidada y voz propia.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Vídeos y presentaciones</li>
              <li>• Avatares parlantes</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Code className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Composición Musical con IA</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Diseñamos el sonido que acompaña tu visión.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Música original</li>
              <li>• Identidad sonora</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Webs Artísticas</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Diseños que conectan estética, emoción y funcionalidad.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Webs para artistas</li>
              <li>• E-commerce artístico</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Formación Profesional</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Capacita a tu equipo para trabajar con IA sin perder el alma del arte.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Formación a medida</li>
              <li>• Presencial u online</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Code className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Modelos IA Personalizados</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Tu propia inteligencia artificial con tu tono, archivo y estilo.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Modelos entrenados</li>
              <li>• IA especializada</li>
            </ul>
          </div>
        </div>

        {/* Trayectoria */}
        <section className="mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-12 rounded-3xl border-2 border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              Nuestra trayectoria no empezó con la moda de la IA
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Llevamos más de 20 años creando con tecnología, arte y visión. Hemos diseñado 
              ideas, campañas y narrativas para autores, editoriales, museos, asociaciones y marcas.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hemos usado inteligencia artificial mucho antes de que tuviera nombre de tendencia. 
              Hoy lo llamamos IA Generativa. <span className="text-primary font-semibold">Nosotras siempre lo llamamos creación con visión.</span>
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">+20</p>
                <p className="text-sm text-muted-foreground">años en cultura y arte</p>
              </div>
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">+150</p>
                <p className="text-sm text-muted-foreground">proyectos con IA</p>
              </div>
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">98%</p>
                <p className="text-sm text-muted-foreground">de satisfacción</p>
              </div>
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">Global</p>
                <p className="text-sm text-muted-foreground">proyectos internacionales</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-4">
            Casos de uso
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            En Grupo Dauro IA aplicamos inteligencia artificial desde una perspectiva artística, 
            emocional y estratégica
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Galerías y Museos</h3>
              <p className="text-muted-foreground text-sm">
                Gestión de colecciones, valoración de obras y experiencias digitales inmersivas
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-accent/30 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Brain className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Editoriales y Autores</h3>
              <p className="text-muted-foreground text-sm">
                Asistencia en escritura, corrección estilística y optimización de procesos editoriales
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3">Empresas y Marcas</h3>
              <p className="text-muted-foreground text-sm">
                Branding cultural, producción audiovisual y soluciones creativas con IA
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Listo para dar el salto cuántico?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Tu visión, impulsada por nuestra experticia en inteligencia artificial, 
            tiene el poder de redefinir tu industria. Este es el momento. Esta es la señal.
          </p>
          <a href="https://dauroia.com/" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 text-lg px-8 py-6">
              Descubre Nuestras Soluciones
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IA;
