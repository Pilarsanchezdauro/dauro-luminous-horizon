import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-dauro.jpg";

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image - Grayscale */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale-image opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
      </div>

      {/* Organic Shapes */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/40 organic-shape z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/30 organic-shape-2 z-10" />
      
      {/* Geometric Elements */}
      <div className="absolute top-10 right-20 z-10">
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-primary">
          <line x1="10" y1="10" x2="70" y2="70" stroke="currentColor" strokeWidth="3" />
          <line x1="70" y1="10" x2="10" y2="70" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      <div className="absolute bottom-40 right-40 z-10">
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-primary">
          <path d="M 10 30 L 30 10 L 50 30 L 30 10" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 max-w-5xl">
        <div className="space-y-8">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-primary leading-none animate-fade-in-up">
            diseñamos
            <br />
            e investigamos
            <br />
            <span className="text-foreground">en cultura</span>
          </h1>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-2xl font-light animate-fade-in-up-delayed">
            Una nueva mirada al arte, la literatura, el cine y la inteligencia artificial
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up-delayed-more">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-7 rounded-full font-semibold group"
            >
              Descubre más
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </button>
    </section>
  );
};

export default Hero;
