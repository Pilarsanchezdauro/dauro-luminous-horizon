import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Palette, Eye, ShoppingBag, Music } from "lucide-react";
import arteBg from "@/assets/arte-bg.jpg";
import { Link } from "react-router-dom";

const Arte = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${arteBg})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Arte
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Galería, representación artística y promoción del arte contemporáneo
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
            Arte que Conecta y Transforma
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dauro Arte es un espacio dedicado a la promoción y difusión del arte contemporáneo. 
            Representamos a artistas visuales y musicales, organizamos exposiciones y facilitamos 
            la adquisición de obras originales. Creamos puentes entre creadores y coleccionistas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Palette className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Representación de Artistas</h3>
            <p className="text-muted-foreground text-sm mb-6 relative z-10">
              Gestionamos la carrera de artistas visuales emergentes y consolidados. 
              Promoción, ventas, exposiciones y desarrollo de proyectos artísticos.
            </p>
            <Link to="/grupo-dauro/arte/artistas" className="relative z-10">
              <Button variant="outline" className="group-hover:border-primary/60 transition-colors">
                Ver artistas representados
              </Button>
            </Link>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Eye className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Exposiciones y Eventos</h3>
            <p className="text-muted-foreground text-sm mb-6 relative z-10">
              Organizamos muestras individuales y colectivas en espacios culturales. 
              Eventos de inauguración, encuentros con artistas y visitas guiadas.
            </p>
            <Button variant="outline" className="relative z-10 group-hover:border-primary/60 transition-colors">
              Ver agenda de exposiciones
            </Button>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <ShoppingBag className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Venta de Obras</h3>
            <p className="text-muted-foreground text-sm mb-6 relative z-10">
              Catálogo de obras disponibles: pinturas, esculturas, fotografía y arte digital. 
              Asesoramiento personalizado para coleccionistas y compradores.
            </p>
            <Link to="/tienda/arte" className="relative z-10">
              <Button variant="outline" className="group-hover:border-primary/60 transition-colors">
                Explorar catálogo
              </Button>
            </Link>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Music className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Música y Composición</h3>
            <p className="text-muted-foreground text-sm mb-6 relative z-10">
              Representamos compositores y músicos. Producción de álbumes, gestión de derechos 
              y promoción de proyectos musicales contemporáneos.
            </p>
            <Link to="/tienda/musica" className="relative z-10">
              <Button variant="outline" className="group-hover:border-primary/60 transition-colors">
                Ver catálogo musical
              </Button>
            </Link>
          </div>
        </div>

        {/* Artists Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-4">
            Artistas representados
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Trabajamos con creadores que exploran nuevas formas de expresión visual y sonora
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center group">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-6 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Palette className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-playfair font-bold mb-2">Artista {i}</h3>
                <p className="text-muted-foreground text-sm">Pintura contemporánea</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Eres artista o coleccionista?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Contacta con nosotros para conocer cómo podemos ayudarte a desarrollar tu 
            carrera artística o encontrar la obra perfecta para tu colección.
          </p>
          <div className="flex gap-4 justify-center flex-wrap relative z-10">
            <Link to="/contacto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105">
                Contactar
              </Button>
            </Link>
            <Link to="/tienda/arte">
              <Button size="lg" variant="outline" className="hover:border-primary/60">
                Ver obras disponibles
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Arte;
