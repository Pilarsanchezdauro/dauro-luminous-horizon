import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import editorialBg from "@/assets/editorial-bg.jpg";
import SubmitWorkForm from "@/components/SubmitWorkForm";

const Editorial = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
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
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            DAURO EDITORIAL
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-semibold mb-4">
            Cuna de autores de éxito
          </p>
          <p className="text-base lg:text-lg text-white/80 max-w-4xl mx-auto">
            Más de 1.000 obras publicadas. Presencia en 4.000 librerías de España y Portugal. 
            Distribución global y un compromiso firme con la excelencia literaria.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-background p-8 lg:p-12 rounded-3xl">
            <p className="text-lg leading-relaxed text-foreground mb-6">
              Desde el año 2000, Dauro Editorial se ha consolidado como una de las editoriales independientes 
              más sólidas y respetadas del panorama cultural español.
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              Con más de mil obras publicadas, nuestro catálogo abarca narrativa, poesía, ensayo, historia, 
              biografía, arte y pensamiento contemporáneo, reflejando un compromiso constante con la calidad 
              literaria y la excelencia editorial.
            </p>
          </div>
        </div>

        {/* Distribution Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 lg:p-12 rounded-3xl border border-primary/10">
            <h3 className="text-2xl lg:text-3xl font-playfair font-bold mb-6 text-center">
              Distribución nacional e internacional
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-8">
              Nuestros libros están disponibles en más de 4.000 librerías de España y Portugal, 
              y pueden adquirirse en las principales plataformas internacionales:
            </p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="text-center px-4 py-2 bg-background rounded-lg shadow-sm">
                <span className="font-semibold text-foreground">Amazon</span>
              </div>
              <div className="text-center px-4 py-2 bg-background rounded-lg shadow-sm">
                <span className="font-semibold text-foreground">Casa del Libro</span>
              </div>
              <div className="text-center px-4 py-2 bg-background rounded-lg shadow-sm">
                <span className="font-semibold text-foreground">El Corte Inglés</span>
              </div>
              <div className="text-center px-4 py-2 bg-background rounded-lg shadow-sm">
                <span className="font-semibold text-foreground">Agapea</span>
              </div>
              <div className="text-center px-4 py-2 bg-background rounded-lg shadow-sm">
                <span className="font-semibold text-foreground">FNAC</span>
              </div>
            </div>
            <p className="text-base text-muted-foreground text-center mt-6">
              Y todas las grandes redes de distribución del mundo del libro.
            </p>
          </div>
        </div>

        {/* Authors Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-background p-8 lg:p-12 rounded-3xl">
            <h3 className="text-2xl lg:text-3xl font-playfair font-bold mb-6">
              Autores consolidados y nuevas voces
            </h3>
            <p className="text-lg leading-relaxed text-foreground mb-4">
              A lo largo de más de dos décadas, hemos construido un sello que combina rigor editorial, 
              sensibilidad artística y proyección internacional.
            </p>
            <p className="text-lg leading-relaxed text-foreground mb-4">
              Autores de gran prestigio literario forman parte de nuestro elenco, junto a nuevas voces 
              que van consolidándose gracias a la confianza, el cuidado y la profesionalidad que 
              caracterizan cada publicación.
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              En Dauro Editorial, creemos en el poder de la palabra como forma de cultura y de memoria. 
              Editamos con la precisión de un artesano y la mirada del futuro: desde el manuscrito 
              hasta el lector, cuidando cada etapa del proceso creativo.
            </p>
          </div>
        </div>

        {/* Legacy Quote */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-[#F8F8F8] dark:bg-muted/30 p-12 lg:p-16 rounded-3xl text-center">
            <blockquote className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-6">
              "Editamos con la precisión de un artesano y la mirada del futuro."
            </blockquote>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Nuestro legado no es solo un catálogo: es un universo literario vivo, 
              donde la tradición y la innovación conviven para seguir siendo —como desde el principio— 
              la cuna de autores de éxito.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105"
              onClick={() => setIsFormOpen(true)}
            >
              Descubrir nuestro catálogo
            </Button>
          </div>
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
