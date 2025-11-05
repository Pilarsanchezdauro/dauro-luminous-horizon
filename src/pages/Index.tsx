import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, User, Upload } from "lucide-react";
import { getLatestPosts } from "@/data/blogData";
import { SEO } from "@/components/SEO";
import { DauroWidget } from "@/components/DauroWidget";
import editorialBg from "@/assets/editorial-bg.jpg";
import arteBg from "@/assets/arte-bg.jpg";
import cineBg from "@/assets/cine-bg.jpg";
import iaBg from "@/assets/ia-bg.jpg";

const Index = () => {
  const latestPosts = getLatestPosts(3);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Grupo Cultural Dauro",
    "url": "https://grupodauro.com",
    "description": "Grupo cultural dedicado al arte, literatura, cine e inteligencia artificial",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://grupodauro.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      <SEO
        title="Grupo Cultural Dauro - Arte, Literatura, Cine e Inteligencia Artificial"
        description="Descubre el Grupo Cultural Dauro: editorial de calidad, galería de arte contemporáneo, producción cinematográfica y servicios creativos con IA en Granada. Promovemos la cultura y el talento."
        keywords="editorial Granada, galería arte Granada, producción audiovisual, servicios IA, cultura Granada, literatura contemporánea, arte moderno, cine independiente"
        url="https://grupodauro.com"
        structuredData={homeStructuredData}
      />
      <Navigation />
      <Hero />

      {/* Widget Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-3">
              Pregunta a Grupo Dauro
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Consulta sobre nuestro catálogo, autores y servicios, o busca información actualizada sobre cultura y literatura
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <DauroWidget />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
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

        {/* Portfolio CTA Section - SEO Optimized */}
        <section className="my-32">
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-3xl p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
                  Descubre Nuestros Proyectos Destacados
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Explora nuestro portafolio de trabajos en desarrollo web, booktrailers, producción audiovisual, creación de avatares y más. Cada proyecto refleja nuestro compromiso con la calidad y la innovación.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <h3 className="font-semibold mb-1">Proyectos Web</h3>
                  <p className="text-sm text-muted-foreground">
                    Sitios profesionales y aplicaciones
                  </p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <h3 className="font-semibold mb-1">Booktrailers</h3>
                  <p className="text-sm text-muted-foreground">
                    Videos promocionales creativos
                  </p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <h3 className="font-semibold mb-1">Producción Audiovisual</h3>
                  <p className="text-sm text-muted-foreground">
                    Cine, documentales y contenido
                  </p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                  <div className="text-4xl font-bold text-primary mb-2">20+</div>
                  <h3 className="font-semibold mb-1">Avatares & Branding</h3>
                  <p className="text-sm text-muted-foreground">
                    Identidad visual corporativa
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/portafolio">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 h-auto w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
                  >
                    Ver Portafolio Completo
                  </Button>
                </Link>
                <Link to="/solicitar-proyecto">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 py-6 h-auto w-full sm:w-auto border-2 hover:border-primary/60 transition-all"
                  >
                    Solicita tu Proyecto
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tool CTA Section */}
        <section className="my-32">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/30 shadow-2xl hover:shadow-[0_25px_80px_-15px_rgba(224,74,92,0.5)] transition-all duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(224,74,92,0.15),transparent_70%)]" />
              <div className="relative p-8 md:p-12 text-center">
                <div className="inline-block mb-6">
                  <div className="bg-primary/10 backdrop-blur-sm rounded-full px-6 py-2 border border-primary/30">
                    <span className="text-sm font-semibold text-primary">🎨 Herramienta Gratuita</span>
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Crea portadas de libro con IA
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Usa nuestra herramienta de inteligencia artificial completamente gratuita. 
                  Diseña portadas profesionales en minutos sin conocimientos de diseño.
                </p>
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-7 h-auto shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link to="/generador-portadas" className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6" />
                    Crear mi portada gratis
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Sin registro • Sin costos ocultos • Resultados instantáneos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section - Latest News */}
        <section className="my-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">
              Últimas noticias del blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mantente al día con nuestras publicaciones más recientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {latestPosts.map((post, index) => (
              <Link 
                key={index} 
                to="/blog"
                className="group bg-card rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="text-primary text-sm font-semibold">
                    Leer más →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button 
                variant="outline" 
                size="lg"
                className="hover:border-primary/60 hover:text-primary transition-all"
              >
                Ver todas las publicaciones
              </Button>
            </Link>
          </div>
        </section>

        {/* Authors CTA Section */}
        <section className="my-32">
          <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-20 rounded-3xl border-2 border-primary/20 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-10">
                <Upload className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6">
                  ¿Eres autor de obras literarias?
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
                  Publicamos obras de calidad que merecen ser leídas. Si tienes un manuscrito 
                  terminado o un proyecto editorial en mente, nos encantaría conocerlo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 text-center">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Evaluación profesional</h3>
                  <p className="text-sm text-muted-foreground">
                    Revisamos tu obra con criterio editorial experto
                  </p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 text-center">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Publicación de calidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Diseño, edición y distribución profesional
                  </p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 text-center">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Promoción efectiva</h3>
                  <p className="text-sm text-muted-foreground">
                    Difusión en medios y presencia en librerías
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link to="/grupo-dauro/editorial">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                  >
                    Enviar mi obra
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Antiguo Blog Section */}
        <section className="my-32">
          <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-12 lg:p-20 rounded-3xl border-2 border-primary/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6">Desde 2000</p>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-playfair font-bold mb-6">
                ¿Quieres ver nuestros trabajos desde el año 2000?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ve a nuestro antiguo blog donde encontrarás toda una hemeroteca 
                interesante de nuestros autores
              </p>
              <a href="https://grupodauro.wpcomstaging.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight max-w-full break-words px-4">
              ¿Listo para crear<br />algo <span className="italic">extraordinario</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Únete a nosotros en la vanguardia de la cultura y la innovación
            </p>
            <Link to="/servicios">
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
