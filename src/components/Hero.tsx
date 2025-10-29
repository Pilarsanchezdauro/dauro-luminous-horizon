import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-foreground/10 rounded-full" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-foreground/10 rotate-45" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8 animate-fade-in">
          Creamos productos culturales de calidad
        </p>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 animate-fade-in-up leading-none">
          HAGÁMOSLO
          <br />
          <span className="italic">EXCEPCIONAL</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delayed">
          Somos Grupo Cultural Dauro. Editorial, arte, cine e inteligencia artificial.
          <br />Transformando ideas en experiencias culturales memorables.
        </p>
        <Button 
          size="lg" 
          className="text-sm uppercase tracking-wider px-12 py-6 animate-fade-in-up-delayed-more border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
        >
          Explorar
        </Button>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10 hover:opacity-50 transition-opacity"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
