import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Users, Award, TrendingUp, ShoppingCart, Store, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import editorialBg from "@/assets/editorial-bg.jpg";
import libroHorizonte from "@/assets/libro-horizonte-interior.png";
import libroBesos from "@/assets/libro-besos.png";
import libroBoabdil from "@/assets/libro-boabdil.png";
import SubmitWorkForm from "@/components/SubmitWorkForm";
import GuideDownloadForm from "@/components/GuideDownloadForm";
import mascotLogo from "@/assets/mascot.png";

const Editorial = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#enviar-obra") {
      setIsFormOpen(true);
      requestAnimationFrame(() => {
        document
          .getElementById("enviar-obra")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [location.hash]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Publisher",
    "name": "Ediciones Dauro",
    "url": "https://grupodauro.com/grupo-dauro/editorial",
    "description": "Editorial independiente con más de 2000 obras publicadas. Publicamos tu libro con distribución en 4000 librerías. Envía tu manuscrito.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Granada",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "foundingDate": "2000",
    "numberOfEmployees": "10-50",
    "sameAs": [
      "https://www.edicionesdauro.com"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Publicación de libros",
          "description": "Servicio completo de edición y publicación de libros con ISBN, distribución nacional e internacional"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Autoedición profesional",
          "description": "Servicios de autoedición con acompañamiento editorial profesional"
        }
      }
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo puedo publicar mi libro con Ediciones Dauro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Envía tu manuscrito a través de nuestro formulario de contacto. Nuestro comité editorial evaluará tu obra y te contactará en un plazo de 2-4 semanas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta publicar un libro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos diferentes modalidades de publicación. Contacta con nosotros para recibir un presupuesto personalizado según las características de tu obra."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué librerías estarán disponibles mis libros?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestros libros están disponibles en más de 4.000 librerías de España y Portugal, además de Amazon, Casa del Libro, FNAC y El Corte Inglés."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Publicar Libro | Editorial Dauro - Edición de Libros en España"
        description="¿Quieres publicar tu libro? Editorial Dauro ofrece edición profesional, autoedición y publicación con distribución en 4000 librerías. Envía tu manuscrito gratis. Más de 2000 obras publicadas."
        keywords="publicar libro, editorial España, edición de libros, autoedición, cómo publicar mi libro, editorial Granada, enviar manuscrito, publicar novela, autopublicación, editar libro, editorial independiente, publicar libro gratis, coste publicar libro, ISBN libro"
        url="https://grupodauro.com/grupo-dauro/editorial"
        structuredData={structuredData}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${editorialBg})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Publica tu Libro con Nosotros
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
            Editorial profesional para autores exigentes
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Más de 1.000 obras publicadas. Distribución en 4.000 librerías de España y Portugal. Tu libro en Amazon, Casa del Libro, FNAC y El Corte Inglés.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-32 right-16 w-20 h-20 opacity-[0.04] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '2s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-80 left-10 w-16 h-16 opacity-[0.03] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '7s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-72 right-1/4 w-24 h-24 opacity-[0.035] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '10s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-40 left-1/3 w-20 h-20 opacity-[0.025] animate-float-circle pointer-events-none"
          style={{ animationDelay: '13s' }}
        />
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/public/projects/portadas-libros-1.png')] bg-cover bg-center opacity-[0.06]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              Más de dos décadas de excelencia editorial
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10 mb-4">
              Desde el año 2000, Dauro Editorial se ha consolidado como una de las editoriales independientes más sólidas y respetadas del panorama cultural español.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Con más de mil obras publicadas, nuestro catálogo abarca narrativa, poesía, ensayo, historia, biografía, arte y pensamiento contemporáneo, reflejando un compromiso constante con la calidad literaria y la excelencia editorial.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Catálogo Diverso</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Ficción, ensayo, poesía y obras académicas
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Users className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Autores Emergentes</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Apostamos por nuevas voces literarias
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Award className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Calidad Editorial</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Cuidamos cada detalle del proceso
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Distribución Global</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Presencia en librerías de todo el mundo
            </p>
          </div>
        </div>

        {/* Distribución */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 lg:p-12 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              Distribución Global
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-8 max-w-3xl mx-auto relative z-10">
              Nuestros libros están disponibles en más de 4.000 librerías de España y Portugal y en todas las grandes redes de venta online.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <span className="font-medium">Amazon</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                <Store className="h-5 w-5 text-primary" />
                <span className="font-medium">Casa del Libro</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                <Store className="h-5 w-5 text-primary" />
                <span className="font-medium">El Corte Inglés</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                <Store className="h-5 w-5 text-primary" />
                <span className="font-medium">Agapea</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                <Store className="h-5 w-5 text-primary" />
                <span className="font-medium">FNAC</span>
              </div>
            </div>
          </div>
        </section>

        {/* Premios Literarios Section */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-playfair font-bold text-foreground">Premios Andalucía de la Crítica</h2>
            </div>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Nuestros autores destacan en los más prestigiosos premios literarios
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Boabdil - Novela */}
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl shadow-lg overflow-hidden border border-primary/20 hover:border-primary/40 hover:shadow-[0_15px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.03]">
              <div className="aspect-[2/3] overflow-hidden">
                <img 
                  src={libroBoabdil} 
                  alt="Boabdil, el príncipe del día y de la noche - Antonio Enrique" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2.5 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-2">
                  NOVELA
                </span>
                <h3 className="text-lg font-playfair font-bold text-foreground mb-1">Boabdil</h3>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Antonio Enrique</p>
                <p className="text-[10px] text-muted-foreground italic mb-3">El príncipe del día y de la noche</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full h-8 text-xs group-hover:bg-primary group-hover:text-white transition-all"
                  asChild
                >
                  <a href="https://www.edicionesdauro.com/?buscar=boabdil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5">
                    Ver libro
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Yo soy todos los besos - Relato */}
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 rounded-2xl shadow-lg overflow-hidden border border-accent/30 hover:border-primary/40 hover:shadow-[0_15px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.03]">
              <div className="aspect-[2/3] overflow-hidden">
                <img 
                  src={libroBesos} 
                  alt="Yo soy todos los besos que nunca pude darte - Francisco López Barrios" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2.5 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-2">
                  RELATO
                </span>
                <h3 className="text-lg font-playfair font-bold text-foreground mb-1">Yo soy todos los besos</h3>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Francisco López Barrios</p>
                <p className="text-[10px] text-muted-foreground italic mb-3">XXII Premio Andalucía de la Crítica</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full h-8 text-xs group-hover:bg-primary group-hover:text-white transition-all"
                  asChild
                >
                  <a href="https://www.edicionesdauro.com/?buscar=Yo+soy+todos+los+besos+que+nunca+supe+darte" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5">
                    Ver libro
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Horizonte interior - Poesía */}
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl shadow-lg overflow-hidden border border-primary/20 hover:border-primary/40 hover:shadow-[0_15px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.03]">
              <div className="aspect-[2/3] overflow-hidden">
                <img 
                  src={libroHorizonte} 
                  alt="Horizonte interior - Juvenal Soto" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2.5 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-2">
                  POESÍA
                </span>
                <h3 className="text-lg font-playfair font-bold text-foreground mb-1">Horizonte interior</h3>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Juvenal Soto</p>
                <p className="text-[10px] text-muted-foreground italic mb-3">Premio Andalucía de la Crítica</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full h-8 text-xs group-hover:bg-primary group-hover:text-white transition-all"
                  asChild
                >
                  <a href="https://www.edicionesdauro.com/?buscar=juvenal+soto" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5">
                    Ver libro
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Autores */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              Autores consolidados y nuevas voces
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10 mb-4">
              A lo largo de más de dos décadas, hemos construido un sello que combina rigor editorial, sensibilidad artística y proyección internacional.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Autores de gran prestigio literario forman parte de nuestro elenco, junto a nuevas voces que van consolidándose gracias a la confianza, el cuidado y la profesionalidad que caracterizan cada publicación.
            </p>
          </div>
        </section>

        {/* Líneas editoriales */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Nuestras líneas editoriales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Ficción Contemporánea</h3>
              <p className="text-muted-foreground mb-4 relative z-10">
                Novelas y cuentos que exploran la condición humana desde perspectivas frescas 
                y originales. Narrativas que desafían y emocionan.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Ensayo Cultural</h3>
              <p className="text-muted-foreground mb-4 relative z-10">
                Reflexiones profundas sobre arte, sociedad, filosofía y cultura. 
                Textos que invitan al pensamiento crítico y al diálogo.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Poesía y Clásicos</h3>
              <p className="text-muted-foreground mb-4 relative z-10">
                Nuevas voces poéticas y reediciones cuidadas de obras fundamentales. 
                Preservamos y renovamos la tradición literaria.
              </p>
            </div>
          </div>
        </section>

        {/* Filosofía Editorial */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-12 lg:p-16 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            <blockquote className="text-3xl lg:text-4xl xl:text-5xl font-playfair font-bold text-center mb-8 relative z-10 leading-tight">
              "Editamos con la precisión de un artesano y la mirada del futuro"
            </blockquote>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-6 max-w-3xl mx-auto relative z-10">
              En Dauro Editorial, creemos en el poder de la palabra como forma de cultura y de memoria. Desde el manuscrito hasta el lector, cuidamos cada etapa del proceso creativo.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-8 max-w-3xl mx-auto relative z-10">
              Nuestro legado no es solo un catálogo: es un universo literario vivo, donde la tradición y la innovación conviven para seguir siendo —como desde el principio— la cuna de autores de éxito.
            </p>
            <div className="text-center relative z-10">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/tienda" className="inline-flex items-center gap-2">
                  Descubrir nuestro catálogo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Guía Editorial para Autores */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
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

        {/* CTA */}
        <div
          id="enviar-obra"
          className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Eres autor? ¿Tienes un manuscrito?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Estamos siempre buscando nuevas propuestas editoriales. Envíanos tu proyecto y lo evaluaremos con atención.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 relative z-10"
            onClick={() => setIsFormOpen(true)}
          >
            Enviar propuesta editorial
          </Button>
        </div>
        {/* CTA Tienda */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 p-10 lg:p-14 rounded-3xl border border-primary/10 relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-all duration-500" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/15 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold mb-3 text-foreground">
                  Explora nuestro catálogo completo
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Más de mil obras de narrativa, poesía, ensayo e historia te esperan en nuestra tienda online.
                </p>
              </div>
              
              <Link
                to="/tienda"
                className="group/btn inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-[0_15px_40px_-10px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                <BookOpen className="h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                Ver todos nuestros libros
                <ExternalLink className="h-4 w-4 opacity-70 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">
              Envía tu propuesta editorial
            </DialogTitle>
          </DialogHeader>
          <SubmitWorkForm onSuccess={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Editorial;
