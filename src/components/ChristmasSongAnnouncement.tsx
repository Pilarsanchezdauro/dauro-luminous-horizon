import { Music, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChristmasSongAnnouncement = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-30">🎄</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-30">✨</div>
        <div className="absolute bottom-1/4 left-1/3 text-2xl opacity-30">🎵</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">Free Dauro Production</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            🎄 Ya tenemos lista nuestra canción de Navidad 2025
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
            "El Arte es Navidad"
          </h3>

          {/* Description */}
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
            <p>
              Producida por <strong className="text-foreground">Free Dauro Production</strong>, la nueva línea de música y cine de Grupo Dauro.
            </p>
            
            <p>
              Un año más seguimos apostando por el <strong className="text-foreground">talento emergente</strong> y dando voz a artistas noveles. En esta ocasión contamos con la interpretación de <strong className="text-foreground">José Carrera</strong>, instructor y personal trainer Graduado en INEF, máster en Educación y entrenador de fútbol, que además de ponernos en forma nos sorprende con una sensibilidad especial y una voz preciosa que llena de emoción esta canción original.
            </p>
            
            <p className="text-foreground italic">
              "El Arte es Navidad" es un homenaje a la creatividad, a la belleza que nos conecta y a la magia que renace cada diciembre.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8 py-6"
          >
            <a 
              href="https://youtu.be/mKHhpGMBVcI" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Escuchar en YouTube
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </Button>

          <p className="mt-4 text-muted-foreground text-sm">
            🎄✨ Si te apetece escucharla, aquí te la dejamos
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChristmasSongAnnouncement;
