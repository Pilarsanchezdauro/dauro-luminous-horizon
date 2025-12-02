import { Gift, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const ChristmasBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#1a472a] via-[#2d5a3d] to-[#1a472a] text-white py-3 px-4 overflow-hidden z-[60]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-80" />
        <div className="absolute top-1 right-20 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-2 right-1/3 w-2 h-2 bg-yellow-200 rounded-full animate-pulse opacity-80" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 relative">
        {/* Left decoration */}
        <div className="hidden md:flex items-center gap-2 text-yellow-300">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        {/* Main content */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-red-400 animate-bounce" style={{ animationDuration: '2s' }} />
            <span className="font-bold text-lg sm:text-xl">
              🎄 ¡Regala Libros Únicos esta Navidad!
            </span>
          </div>
          <span className="text-sm sm:text-base text-green-200 hidden sm:inline">
            Descubre nuestra colección especial
          </span>
        </div>

        {/* CTA Button */}
        <Link to="/tienda">
          <Button 
            size="sm"
            className="bg-[#C41E3A] hover:bg-[#A31830] text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Ver Tienda
          </Button>
        </Link>

        {/* Right decoration */}
        <div className="hidden md:flex items-center gap-2 text-yellow-300">
          <Sparkles className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="w-4 h-4 text-white/70 hover:text-white" />
        </button>
      </div>

      {/* Bottom border decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
    </div>
  );
};

export default ChristmasBanner;
