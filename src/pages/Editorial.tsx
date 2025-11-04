import { useState } from "react";
import { Link } from "react-router-dom";
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

const Editorial = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Publisher",
    "name": "Ediciones Dauro",
    "url": "https://grupodauro.com/grupo-dauro/editorial",
    "description": "Editorial de calidad que publica literatura contemporánea y rescata obras fundamentales"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <SEO
        title="Editorial Dauro - Literatura de Calidad y Autores Contemporáneos"
        description="Descubre Ediciones Dauro: publicamos literatura de calidad, damos voz a autores contemporáneos y rescatamos obras fundamentales. Envía tu manuscrito y forma parte de nuestro catálogo."
        keywords="editorial España, publicar libro, editorial literatura, autores contemporáneos, editorial Granada, enviar manuscrito, publicar novela"
        url="https://grupodauro.com/grupo-dauro/editorial"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${editorialBg})`,
            filter: "brightness(0.6)",
          }}
        />
        
        {/* Animated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-32 right-20 w-3 h-3 bg-white rounded-full animate-ping" />
        <div className="absolute top-40 left-32 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 right-1/4 w-4 h-4 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8 animate-fade-in">
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full text-white font-bold text-sm tracking-wider">
              EXCELENCIA EDITORIAL
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-white mb-6 animate-fade-in-up leading-tight">
            Dauro Editorial
          </h1>
          <p className="text-xl lg:text-3xl text-white/90 max-w-4xl mx-auto font-light mb-4 animate-fade-in-up-delayed leading-relaxed">
            Cuna de autores de éxito
          </p>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up-delayed">
            Más de 1.000 obras publicadas. Presencia en 4.000 librerías de España y Portugal.
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up-delayed">
            <div className="w-20 h-1 bg-white rounded-full" />
            <div className="w-12 h-1 bg-primary rounded-full" />
            <div className="w-8 h-1 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 lg:px-10 py-20">
        {/* Intro */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 lg:p-16 rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6 text-[#111111]">
                  Más de dos décadas de excelencia editorial
                </h2>
                <p className="text-lg lg:text-xl text-[#333333] leading-relaxed mb-4">
                  Desde el año 2000, Dauro Editorial se ha consolidado como una de las editoriales independientes más sólidas y respetadas del panorama cultural español.
                </p>
                <p className="text-lg lg:text-xl text-[#333333] leading-relaxed">
                  Con más de mil obras publicadas, nuestro catálogo abarca narrativa, poesía, ensayo, historia, biografía, arte y pensamiento contemporáneo, reflejando un compromiso constante con la calidad literaria y la excelencia editorial.
                </p>
              </div>
            </div>
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
                <a href="https://www.edicionesdauro.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Descubrir nuestro catálogo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Eres autor? ¿Tienes un manuscrito?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Estamos siempre buscando nuevas propuestas editoriales. 
            Envíanos tu proyecto y lo evaluaremos con atención.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 relative z-10"
            onClick={() => setIsFormOpen(true)}
          >
            Enviar propuesta editorial
          </Button>
        </div>
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
