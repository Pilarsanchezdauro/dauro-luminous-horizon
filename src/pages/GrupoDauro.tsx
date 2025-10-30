import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpeg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpeg";
import gallery9 from "@/assets/gallery-9.jpeg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpeg";
import gallery12 from "@/assets/gallery-12.jpeg";
import gallery13 from "@/assets/gallery-13.webp";

const GrupoDauro = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10, gallery11, gallery12, gallery13];
  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 9);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-8 text-foreground">
              Grupo Cultural Dauro
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Desde el año 2000, Grupo Cultural Dauro impulsa la creación, la edición y la innovación cultural desde una vocación clara: unir la herencia artística con la tecnología del futuro.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Nacimos como una editorial independiente con una mirada abierta al arte, la literatura y el pensamiento contemporáneo. Con el tiempo, nos hemos convertido en un grupo creativo multidisciplinar que abarca la edición literaria, la producción audiovisual, la dirección técnica de guion y el desarrollo de proyectos basados en inteligencia artificial.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Con más de 1.000 obras publicadas, nuestra labor editorial ha consolidado un catálogo diverso y exigente que incluye narrativa, poesía, ensayo, investigación y colecciones especializadas. A lo largo de estas dos décadas, las publicaciones de Dauro y sus autores han sido reconocidos con numerosos galardones, entre ellos el Premio Andalucía de la Crítica en sus distintas modalidades, reafirmando nuestro compromiso con la excelencia literaria.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                El grupo está liderado por profesionales de prestigio internacional, creadores y editores premiados y reconocidos por su aportación al pensamiento y la cultura, que combinan sensibilidad artística, conocimiento técnico y visión innovadora.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hoy, Dauro continúa expandiendo su alcance: producimos obras audiovisuales generadas mediante IA, desarrollamos sistemas de análisis y catalogación cultural, y diseñamos soluciones de comunicación que combinan creatividad, precisión y belleza.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Nuestro propósito no ha cambiado: dar forma a las ideas, elevar la palabra y convertir la cultura en una experiencia viva, inteligente y transformadora.
              </p>
            </div>

            {/* Destacado de trayectoria */}
            <div className="relative my-16 py-12 px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
              <div className="relative text-center">
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary mb-4">
                  Desde 2000
                </p>
                <p className="text-xl lg:text-2xl text-foreground font-medium">
                  Impulsando la creación, edición e innovación cultural
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Más de 1.000 obras publicadas
                </h3>
                <p className="text-muted-foreground">
                  Nuestro catálogo editorial incluye narrativa, poesía, ensayo, investigación y colecciones especializadas, con obras y autores galardonados con premios de prestigio como el Premio Andalucía de la Crítica.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Liderazgo reconocido
                </h3>
                <p className="text-muted-foreground">
                  Profesionales de prestigio internacional, creadores y editores premiados que combinan sensibilidad artística, conocimiento técnico y visión innovadora.
                </p>
              </div>
            </div>

            {/* Galería de fotos */}
            <div className="mt-24">
              <h2 className="text-4xl font-playfair font-bold mb-8 text-center text-foreground">
                Nuestra Trayectoria en Imágenes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayedImages.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  >
                    <img
                      src={image}
                      alt={`Actividad cultural de Grupo Dauro ${index + 1}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              {!showAll && galleryImages.length > 9 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Ver más fotos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal para imagen ampliada */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage || ""}
              alt="Imagen ampliada"
              className="max-w-full max-h-[95vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GrupoDauro;
