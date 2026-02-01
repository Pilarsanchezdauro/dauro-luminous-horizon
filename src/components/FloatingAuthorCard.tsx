import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Author {
  id: string;
  name: string;
  image: string;
}

const AUTHORS: Author[] = [
  { id: "benito", name: "Benito Lamenca", image: "/authors/benito-lamenca.png" },
  { id: "carlos", name: "Carlos Blanco", image: "/authors/carlos-blanco.png" },
  { id: "carmen", name: "Carmen Alcaide", image: "/authors/carmen-alcaide.png" },
  { id: "miguel", name: "Miguel Puche", image: "/authors/miguel-puche.png" },
  { id: "paco", name: "Paco López Barrios", image: "/authors/paco-lopez-barrios.png" },
  { id: "manuel", name: "Manuel Orozco", image: "/authors/manuel-orozco.png" },
  { id: "antonio", name: "Antonio Rodríguez Jiménez", image: "/authors/antonio-rodriguez-jimenez.png" },
  { id: "eleazar", name: "Eleazar Santana", image: "/authors/eleazar-santana.png" },
  { id: "pilar", name: "Pilar Sánchez", image: "/authors/pilar-sanchez.png" },
];

const INTERVAL_MS = 15000; // Cada 15 segundos
const DISPLAY_DURATION_MS = 8000; // Se muestra durante 8 segundos

const FloatingAuthorCard = () => {
  const isMobile = useIsMobile();
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [side, setSide] = useState<"left" | "right">("left");
  const [dismissedAuthors, setDismissedAuthors] = useState<Set<string>>(new Set());
  const [isPaused, setIsPaused] = useState(false);

  // No mostrar en móvil
  if (isMobile) return null;

  const showRandomAuthor = useCallback(() => {
    if (isPaused) return;
    
    // Filtrar autores que ya fueron cerrados en esta sesión
    const availableAuthors = AUTHORS.filter(a => !dismissedAuthors.has(a.id));
    
    if (availableAuthors.length === 0) {
      // Resetear si todos fueron cerrados
      setDismissedAuthors(new Set());
      return;
    }

    const randomAuthor = availableAuthors[Math.floor(Math.random() * availableAuthors.length)];
    const randomSide = Math.random() > 0.5 ? "left" : "right";
    
    setSide(randomSide);
    setCurrentAuthor(randomAuthor);
    setIsVisible(true);

    // Auto-ocultar después de DISPLAY_DURATION_MS
    setTimeout(() => {
      setIsVisible(false);
    }, DISPLAY_DURATION_MS);
  }, [dismissedAuthors, isPaused]);

  useEffect(() => {
    // Mostrar el primero después de 5 segundos
    const initialTimeout = setTimeout(() => {
      showRandomAuthor();
    }, 5000);

    // Intervalo para mostrar nuevos autores
    const interval = setInterval(() => {
      showRandomAuthor();
    }, INTERVAL_MS);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showRandomAuthor]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (currentAuthor) {
      setDismissedAuthors(prev => new Set(prev).add(currentAuthor.id));
    }
  };

  const handleCardClick = () => {
    // Navegar a la tienda con filtro por autor
    if (currentAuthor) {
      window.location.href = `/tienda?autor=${encodeURIComponent(currentAuthor.name)}`;
    }
  };

  if (!currentAuthor) return null;

  return (
    <div
      className={`fixed z-40 transition-all duration-700 ease-out cursor-pointer
        ${side === "left" ? "left-0" : "right-0"}
        ${isVisible 
          ? "translate-x-0 opacity-100" 
          : side === "left" 
            ? "-translate-x-full opacity-0" 
            : "translate-x-full opacity-0"
        }
        bottom-24 sm:bottom-32
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        onClick={handleCardClick}
        className={`relative group bg-gradient-to-b from-background/95 to-background border border-border/50 shadow-2xl backdrop-blur-sm
          ${side === "left" ? "rounded-r-xl" : "rounded-l-xl"}
          overflow-hidden
        `}
      >
        {/* Botón cerrar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className={`absolute top-2 z-10 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full p-1 transition-colors duration-200 opacity-0 group-hover:opacity-100
            ${side === "left" ? "right-2" : "left-2"}
          `}
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Contenido de la tarjeta */}
        <div className="flex flex-col items-center p-4 sm:p-5">
          {/* Imagen del autor */}
          <div className="relative w-28 h-40 sm:w-36 sm:h-48 overflow-hidden rounded-lg shadow-lg">
            <img
              src={currentAuthor.image}
              alt={currentAuthor.name}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay degradado */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Nombre del autor */}
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-sm sm:text-base font-serif font-semibold text-foreground tracking-wide">
              {currentAuthor.name}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Ver obras →
            </p>
          </div>
        </div>

        {/* Borde decorativo */}
        <div className={`absolute top-0 bottom-0 w-1 bg-primary
          ${side === "left" ? "right-0" : "left-0"}
        `} />
      </div>
    </div>
  );
};

export default FloatingAuthorCard;
