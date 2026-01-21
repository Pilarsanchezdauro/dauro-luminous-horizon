import { useRef, useState, forwardRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, BookOpen, Maximize2, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  src: string;
  pageNumber: number;
  isCover?: boolean;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ src, pageNumber, isCover }, ref) => {
  return (
    <div ref={ref} className={`${isCover ? 'bg-[#1a1a1a]' : 'bg-[#f8f5ed]'} shadow-xl`}>
      <img 
        src={src} 
        alt={isCover ? "Portada del libro" : `Página ${pageNumber}`}
        className="w-full h-full object-contain"
        loading={pageNumber <= 4 ? "eager" : "lazy"}
      />
    </div>
  );
});

Page.displayName = "Page";

interface BookFlipbookProps {
  pages: string[];
  coverImage?: string;
  className?: string;
}

const BookFlipbook = ({ pages, coverImage, className = "" }: BookFlipbookProps) => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const allPages = coverImage ? [coverImage, ...pages] : pages;
  const totalPages = allPages.length;

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const goToPrevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const goToNextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const goToStart = () => {
    bookRef.current?.pageFlip()?.flip(0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  const bookWidth = isFullscreen ? 550 : 400;
  const bookHeight = isFullscreen ? 770 : 560;

  const FlipbookContent = () => (
    <>
      {/* Book Container with decorative elements */}
      <div className="relative">
        {/* Decorative glow */}
        <div className="absolute inset-0 -m-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl rounded-full pointer-events-none" />
        
        {/* Book shadow base */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/40 blur-xl rounded-full" />
        
        <div className="relative group">
          {/* @ts-ignore - HTMLFlipBook types are not perfect */}
          <HTMLFlipBook
            ref={bookRef}
            width={bookWidth}
            height={bookHeight}
            size="stretch"
            minWidth={isFullscreen ? 450 : 320}
            maxWidth={isFullscreen ? 700 : 600}
            minHeight={isFullscreen ? 630 : 450}
            maxHeight={isFullscreen ? 980 : 840}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="shadow-2xl shadow-black/70 rounded-sm overflow-hidden"
            style={{}}
            startPage={currentPage}
            drawShadow={true}
            flippingTime={600}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.6}
            showPageCorners={true}
            disableFlipByClick={false}
            swipeDistance={20}
            clickEventForward={true}
            useMouseEvents={true}
          >
            {allPages.map((page, index) => (
              <Page 
                key={index} 
                src={page} 
                pageNumber={index} 
                isCover={coverImage && index === 0}
              />
            ))}
          </HTMLFlipBook>
          
          {/* Side navigation buttons */}
          <button
            onClick={goToPrevPage}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0 shadow-lg"
            disabled={currentPage === 0}
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={goToNextPage}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0 shadow-lg"
            disabled={currentPage >= totalPages - 1}
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Progress bar */}
        <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-lg tabular-nums">
              {currentPage + 1}
            </span>
            <span className="text-white/40">/</span>
            <span className="text-white/60 text-lg tabular-nums">
              {totalPages}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            Siguiente
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        {/* Back to start */}
        {currentPage > 2 && (
          <Button
            variant="link"
            size="sm"
            onClick={goToStart}
            className="text-primary/70 hover:text-primary text-xs"
          >
            Volver al inicio
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Regular inline view */}
      <div className={`flex flex-col items-center gap-8 ${className}`}>
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 text-primary">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <BookOpen className="w-6 h-6" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-white">
            Lee las primeras páginas
          </h3>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Descubre el inicio de esta fascinante obra. Haz clic en las esquinas o desliza para pasar página.
          </p>
        </div>
        
        <FlipbookContent />

        {/* Fullscreen button */}
        <Button
          variant="outline"
          size="lg"
          onClick={toggleFullscreen}
          className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary gap-2"
        >
          <Maximize2 className="w-5 h-5" />
          Ver a pantalla completa
        </Button>

        {/* CTA */}
        <p className="text-white/40 text-sm text-center max-w-lg px-4">
          ¿Te gusta lo que lees? Consigue el libro completo y sumérgete en la fascinante vida de Leonardo da Vinci.
        </p>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFullscreen(false);
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Cerrar pantalla completa"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Minimize hint */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-white/50 text-sm">
            <Minimize2 className="w-4 h-4" />
            <span className="hidden md:inline">Pulsa ESC o haz clic fuera para cerrar</span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-serif text-white mb-6 text-center">
            Leonardo da Vinci: La Tragedia de la Perfección
          </h3>

          <FlipbookContent />
        </div>
      )}
    </>
  );
};

export default BookFlipbook;
