import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import GuideDownloadForm from "@/components/GuideDownloadForm";
import { GlobalDistributionBanner } from "@/components/GlobalDistributionBanner";
import editorialBg from "@/assets/editorial-bg.jpg";
import arteBg from "@/assets/arte-bg.jpg";
import cineBg from "@/assets/cine-bg.jpg";
import iaBg from "@/assets/ia-bg.jpg";

const Index = () => {
  const latestPosts = getLatestPosts(3);
  const location = useLocation();

  // Scroll to anchor when navigating from another page
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Small delay to ensure the DOM is ready
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Grupo Cultural Dauro",
    "url": "https://www.grupodauro.com",
    "description": "Grupo cultural y tecnológico en Granada: editorial de libros, guiones de cine y televisión, representación de arte y soluciones de inteligencia artificial.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.grupodauro.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      <SEO
        title="Grupo Dauro | Editorial, Guiones de Cine y TV, Arte y Tecnología IA"
        description="Grupo cultural y tecnológico en Granada: editamos libros con distribución en 4000 librerías, escribimos guiones de series, representamos obras y artistas, y creamos soluciones de inteligencia artificial para empresas."
        keywords="grupo cultural Granada, editorial Granada, publicar libro, guiones de series, guionistas cine y televisión, representación de artistas, obras de arte, inteligencia artificial para empresas, IA generativa, cursos de IA"
        url="https://www.grupodauro.com"
        structuredData={homeStructuredData}
      />
      <Navigation />
      <Hero />

      {/* Widget Section */}
      <section className="py-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <DauroWidget />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* 1 · LIBROS / Editorial Section */}
        <SectionCard
          title="Libros que perduran"
          description="Más de 2.000 obras publicadas y autores premiados. Editamos con criterio, distribuimos en 4.000 librerías de España y Portugal, y damos voz a grandes obras. ¿Tienes un manuscrito? Lo llevamos a las librerías."
          image={editorialBg}
          link="/autoedicion"
        />

        {/* 2 · GUIONES / Cine Section */}
        <SectionCard
          title="Guiones y Series"
          description="Uno de nuestros fuertes. Guionistas de cine y televisión especializados en series y adaptaciones literarias. Desarrollamos biblias, guiones técnicos y preproducción para proyectos audiovisuales de primer nivel."
          image={cineBg}
          link="/grupo-dauro/cine"
          reversed
        />

        {/* 3 · ARTE / Representación Section */}
        <SectionCard
          title="Representación Artística"
          description="Representamos obras y artistas de alto nivel. Gestión, promoción y venta de arte contemporáneo, con tasación, peritaje y certificación de autenticidad avalados por expertos."
          image={arteBg}
          link="/grupo-dauro/arte"
        />

        {/* 4 · TECNOLOGÍA / IA Section */}
        <SectionCard
          title="División Tecnológica · IA"
          description="Nuestra división más nueva y en plena expansión. Creamos programas e integraciones con IA generativa, soluciones a medida para empresas y formación y cursos de inteligencia artificial."
          image={iaBg}
          link="/grupo-dauro/ia"
          reversed
        />

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

        {/* Global Distribution Section */}
        <GlobalDistributionBanner variant="full" />

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
                Nuestra hemeroteca reúne el archivo completo del blog entre 2006 y 2025:
                presentaciones, autores, exposiciones y casi dos mil fotografías
              </p>
              <Link to="/blog/hemeroteca" className="inline-block">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                >
                  Ver la hemeroteca
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Guide Download Form */}
        <section className="my-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold mb-4">
                Guía Editorial para Autores
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ¿Estás pensando en publicar tu libro? Descarga nuestra guía gratuita 
                con consejos prácticos sobre preparación de manuscritos, errores comunes, 
                aspectos legales (ISBN, derechos) y estrategias de promoción.
              </p>
            </div>
            <GuideDownloadForm 
              pdfUrl="/docs/guia-editorial-autores.pdf"
              guideTitle="Guía Editorial para Autores"
            />
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
                className="text-sm uppercase tracking-wider px-12 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
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
