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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 max-w-6xl">
        <div className="space-y-10 text-center">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl xl:text-[180px] font-extrabold leading-none animate-fade-in-up tracking-tighter">
            <span className="block text-foreground">Grupo Cultural</span>
            <span className="block gradient-text glow-effect">Dauro</span>
          </h1>
          
          <p className="text-xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto font-light animate-fade-in-up-delayed leading-relaxed tracking-wide">
            Una nueva mirada al arte, la literatura, el cine y la inteligencia artificial
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-8 animate-fade-in-up-delayed-more justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-8 rounded-full font-bold group relative overflow-hidden shadow-[0_0_60px_hsl(354_85%_62%/0.6)] hover:shadow-[0_0_80px_hsl(354_85%_62%/0.8)] transition-all duration-300"
            >
              <span className="relative z-10">Descubre más</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        <ChevronDown className="h-10 w-10 text-primary drop-shadow-[0_0_20px_hsl(354_85%_62%/0.8)]" />
      </button>
    </section>
  );
};

export default Hero;
