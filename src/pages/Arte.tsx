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
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dauro Arte es un espacio dedicado a la promoción y difusión del arte contemporáneo. 
            Representamos a artistas visuales y musicales, organizamos exposiciones y facilitamos 
            la adquisición de obras originales. Creamos puentes entre creadores y coleccionistas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <Palette className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-2xl font-playfair font-bold mb-4">Representación de Artistas</h3>
            <p className="text-muted-foreground mb-6">
              Gestionamos la carrera de artistas visuales emergentes y consolidados. 
              Promoción, ventas, exposiciones y desarrollo de proyectos artísticos.
            </p>
            <Link to="/grupo-dauro/arte/artistas">
              <Button variant="outline">Ver artistas representados</Button>
            </Link>
          </div>

          <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <Eye className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-2xl font-playfair font-bold mb-4">Exposiciones y Eventos</h3>
            <p className="text-muted-foreground mb-6">
              Organizamos muestras individuales y colectivas en espacios culturales. 
              Eventos de inauguración, encuentros con artistas y visitas guiadas.
            </p>
            <Button variant="outline">Ver agenda de exposiciones</Button>
          </div>

          <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <ShoppingBag className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-2xl font-playfair font-bold mb-4">Venta de Obras</h3>
            <p className="text-muted-foreground mb-6">
              Catálogo de obras disponibles: pinturas, esculturas, fotografía y arte digital. 
              Asesoramiento personalizado para coleccionistas y compradores.
            </p>
            <Link to="/tienda/arte">
              <Button variant="outline">Explorar catálogo</Button>
            </Link>
          </div>

          <div className="bg-card p-10 rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <Music className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-2xl font-playfair font-bold mb-4">Música y Composición</h3>
            <p className="text-muted-foreground mb-6">
              Representamos compositores y músicos. Producción de álbumes, gestión de derechos 
              y promoción de proyectos musicales contemporáneos.
            </p>
            <Link to="/tienda/musica">
              <Button variant="outline">Ver catálogo musical</Button>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Obra {i}
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-bold mb-2">Artista {i}</h3>
                <p className="text-muted-foreground text-sm">Pintura contemporánea</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/5 to-accent/5 p-12 rounded-3xl border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
            ¿Eres artista o coleccionista?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contacta con nosotros para conocer cómo podemos ayudarte a desarrollar tu 
            carrera artística o encontrar la obra perfecta para tu colección.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contacto">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contactar
              </Button>
            </Link>
            <Link to="/tienda/arte">
              <Button size="lg" variant="outline">
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
