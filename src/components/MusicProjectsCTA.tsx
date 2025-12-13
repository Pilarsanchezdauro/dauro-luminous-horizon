import { Link } from "react-router-dom";
import { Play, Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MusicProjectsCTA() {
  return (
    <section className="py-12">
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-background to-primary/10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/15 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Video/Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <video
                  src="/videos/logo-free-dauro-productions.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative w-32 h-32 md:w-40 md:h-40 object-contain rounded-full"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Music className="w-4 h-4" />
                <span>Dauro Free Productions</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Descubre nuestros proyectos musicales
              </h3>
              
              <p className="text-muted-foreground mb-6 max-w-xl">
                Explora las producciones musicales y audiovisuales de Dauro Free Productions. 
                Canciones originales, videoclips y proyectos artísticos de nuestros representados.
              </p>
              
              <Link to="/grupo-dauro/musica">
                <Button size="lg" className="group gap-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Ver proyectos musicales
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
