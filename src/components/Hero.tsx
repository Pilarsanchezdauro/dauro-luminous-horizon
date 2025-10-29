import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-dauro.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: "transform",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-white mb-6 animate-fade-in-up leading-tight">
          Grupo Cultural Dauro
        </h1>
        <p
          className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-12 font-light animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Una nueva mirada al arte, la literatura, el cine y la inteligencia
          artificial
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Descubre nuestro universo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-6 rounded-full transition-all duration-300"
          >
            Ver tienda
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-10 w-10 text-white/80 hover:text-white transition-colors" />
      </button>
    </section>
  );
};

export default Hero;
