import { Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChristmasSongAnnouncement = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-[5%] text-4xl opacity-30">🎄</div>
        <div className="absolute top-1/3 right-[5%] text-3xl opacity-30">✨</div>
        <div className="absolute bottom-1/4 left-[15%] text-2xl opacity-30">🎵</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full">
              <Music className="w-4 h-4" />
              <span className="text-sm font-medium">Dauro Free Productions</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video Preview */}
            <div className="order-1 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/mKHhpGMBVcI"
                  title="El Arte es Navidad - Grupo Dauro 2025"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                🎄 Ya tenemos lista nuestra canción de Navidad 2025
              </h2>
              
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                "El Arte es Navidad"
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
                <p>
                  Producida por <strong className="text-foreground">Dauro Free Productions</strong>, la nueva línea de música y cine de Grupo Dauro.
                </p>
                
                <p className="text-sm md:text-base">
                  Un año más seguimos apostando por el <strong className="text-foreground">talento emergente</strong> y dando voz a artistas noveles. En esta ocasión contamos con la interpretación de <strong className="text-foreground">José Carrera</strong>, instructor y personal trainer Graduado en INEF, máster en Educación y entrenador de fútbol, que además de ponernos en forma nos sorprende con una sensibilidad especial y una voz preciosa.
                </p>
                
                <p className="text-foreground italic text-sm md:text-base">
                  "El Arte es Navidad" es un homenaje a la creatividad, a la belleza que nos conecta y a la magia que renace cada diciembre.
                </p>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <a 
                  href="https://youtu.be/mKHhpGMBVcI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ver en YouTube
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChristmasSongAnnouncement;
