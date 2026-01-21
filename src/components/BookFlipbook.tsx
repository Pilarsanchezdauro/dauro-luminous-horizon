import { useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  src: string;
  pageNumber: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ src, pageNumber }, ref) => {
  return (
    <div ref={ref} className="bg-[#f5f0e6] shadow-lg">
      <img 
        src={src} 
        alt={`Página ${pageNumber}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
});

Page.displayName = "Page";

interface BookFlipbookProps {
  pages: string[];
  className?: string;
}

const BookFlipbook = ({ pages, className = "" }: BookFlipbookProps) => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const goToPrevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const goToNextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <div className="flex items-center gap-2 text-primary mb-2">
        <BookOpen className="w-5 h-5" />
        <span className="text-sm tracking-widest uppercase font-medium">Lee las primeras páginas</span>
      </div>
      
      <div className="relative group">
        {/* @ts-ignore - HTMLFlipBook types are not perfect */}
        <HTMLFlipBook
          ref={bookRef}
          width={300}
          height={420}
          size="stretch"
          minWidth={250}
          maxWidth={500}
          minHeight={350}
          maxHeight={700}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="shadow-2xl shadow-black/50"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={false}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={true}
        >
          {pages.map((page, index) => (
            <Page key={index} src={page} pageNumber={index + 1} />
          ))}
        </HTMLFlipBook>
        
        {/* Navigation overlay buttons */}
        <button
          onClick={goToPrevPage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          disabled={currentPage === 0}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNextPage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          disabled={currentPage >= totalPages - 1}
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Page indicator and navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>
        
        <span className="text-white/60 text-sm tabular-nums">
          {currentPage + 1} / {totalPages}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <p className="text-white/40 text-xs text-center max-w-md">
        Desliza o haz clic en las esquinas para pasar de página. Estas son las primeras páginas del libro.
      </p>
    </div>
  );
};

export default BookFlipbook;
