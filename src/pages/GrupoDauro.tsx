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
                Con más de 1.000 obras publicadas, nuestra labor editorial ha consolidado un catálogo diverso y exigente que incluye narrativa, poesía, ensayo, investigación y colecciones especializadas. Hemos realizado más de 200 proyectos web, producido más de 300 booktrailers, desarrollado más de 400 avatares y proyectos de branding, y elaborado más de 5.000 informes técnicos. A lo largo de estas dos décadas, las publicaciones de Dauro y sus autores han sido reconocidos con numerosos galardones, entre ellos el Premio Andalucía de la Crítica en sus distintas modalidades, reafirmando nuestro compromiso con la excelencia literaria.
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

            {/* Premios y Reconocimientos */}
            <div className="mt-16">
              <h3 className="text-2xl font-playfair font-bold mb-8 text-center text-foreground">
                Premios y Reconocimientos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Premio Andalucía</p>
                    <p className="text-sm text-muted-foreground">Crítica Literaria</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Certificación</p>
                    <p className="text-sm text-muted-foreground">Calidad Editorial</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Producción</p>
                    <p className="text-sm text-muted-foreground">Audiovisual Premiada</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-br from-green-500/10 to-green-600/5 p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">+25 Años</p>
                    <p className="text-sm text-muted-foreground">Excelencia Cultural</p>
                  </div>
                </div>
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
