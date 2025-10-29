import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import heroBg from "@/assets/hero-culture-bg.png";

const Hero = () => {
  const parallaxOffset = useParallax(0.5);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-[8vh] md:pt-[10vh] pb-[6vh] md:pb-[8vh]">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      
      {/* Large background shapes */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
      />
      <div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${-parallaxOffset * 0.4}px)` }}
      />
      
      {/* Geometric shapes with parallax */}
      <div 
        className="absolute top-20 right-20 w-32 h-32 border-2 border-accent/30 rounded-full transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
      />
      <div 
        className="absolute bottom-40 left-20 w-24 h-24 border-2 border-accent/30 rotate-45 transition-transform duration-100"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-primary/20 rounded-full transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
      />

      {/* Content */}
      <div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      >
        <p className="text-[1.25rem] md:text-[2rem] font-normal leading-[1.15] md:leading-[1.1] tracking-[0.01em] md:tracking-[0.02em] text-[#666666] mb-6 md:mb-8 animate-fade-in text-center max-w-[95%] md:max-w-none mx-auto">
          En Grupo Dauro Transformamos La Cultura en Experiencia
        </p>
        <h1 className="text-[4rem] md:text-[7.5rem] font-black leading-[0.95] tracking-normal mb-5 animate-fade-in-up text-[#111111]">
          HAGÁMOSLO
          <br />
          <span className="italic text-[#E31B23]">EXCEPCIONAL</span>
        </h1>
        <p className="text-[1.125rem] md:text-[1.375rem] font-normal leading-[1.45] md:leading-[1.4] text-[#333333] mb-7 max-w-[92%] md:max-w-[840px] mx-auto animate-fade-in-up-delayed text-center">
          Creamos proyectos que combinan arte, pensamiento y tecnología para conectar la emoción humana con la innovación. Convertimos cada idea en algo vivo, profundo y memorable.
        </p>
        <Button 
          className="text-base font-bold uppercase px-7 py-4 rounded-lg bg-[#111111] text-white hover:bg-[#E31B23] transition-all duration-200 animate-fade-in-up-delayed-more"
        >
          EXPLORAR
        </Button>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10 hover:opacity-50 transition-opacity text-foreground"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
