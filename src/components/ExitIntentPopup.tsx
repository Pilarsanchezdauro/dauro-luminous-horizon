import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const location = useLocation();

  // Don't show on autoedicion page
  const isAutoedicionPage = location.pathname === '/autoedicion';

  useEffect(() => {
    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem('exitIntentShown');
    if (alreadyShown || isAutoedicionPage) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Add delay before enabling the listener (don't show immediately)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, isAutoedicionPage]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || isAutoedicionPage) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm opacity-90">¡Espera!</p>
              <h2 className="text-2xl font-bold">¿Tienes un libro en mente?</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-lg text-foreground mb-4">
            <strong>Publica tu libro con calidad profesional</strong> desde 690€. 
            Si nos enamora tu obra, la editamos sin coste para ti.
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-muted-foreground">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">✓</span>
              Maquetación + portada + ISBN + distribución global
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">✓</span>
              Ebook gratis incluido
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">✓</span>
              26 años de experiencia · +1.000 libros publicados
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="flex-1 text-base">
              <Link to="/autoedicion" onClick={handleClose}>
                Calcula tu presupuesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleClose}
              className="text-muted-foreground"
            >
              Ahora no
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Sin compromiso · Respuesta en 24h
          </p>
        </div>
      </div>
    </div>
  );
};
