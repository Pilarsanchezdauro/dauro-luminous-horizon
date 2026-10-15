import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, BookOpen, ArrowRight, Check, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const location = useLocation();

  // No mostrar en las páginas que ya SON el embudo de publicación (sería redundante):
  // servicios editoriales (y su ruta antigua) y la página de valoración.
  const hidePopupHere =
    location.pathname === '/servicios-editoriales' ||
    location.pathname === '/autoedicion' ||
    location.pathname === '/valoracion';

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('exitIntentShown');
    if (alreadyShown || hidePopupHere) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, hidePopupHere]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || hidePopupHere) return null;

  const benefits = [
    { icon: Check, text: <>Edición, maquetación, portada e ISBN</> },
    { icon: Globe, text: <>Distribución en librerías de <strong className="text-foreground">España y América</strong></> },
    { icon: Check, text: <><strong className="text-foreground">+2.000 obras</strong> publicadas · autores premiados</> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-card border-2 border-primary/20 rounded-3xl shadow-2xl max-w-lg w-full animate-scale-in overflow-hidden">
        {/* Glow decorativo, como en las tarjetas de la web */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative p-8 sm:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5">
            <BookOpen className="w-4 h-4" />
            Publica con Dauro
          </div>

          <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-3 leading-tight">
            ¿Quieres <span className="text-primary">publicar tu libro</span>?
          </h2>

          <p className="flex items-start gap-2 text-base font-semibold text-foreground mb-4">
            <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span>Envíanos tu obra y te respondemos en <span className="text-primary">48 horas</span>.</span>
          </p>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            Si tu manuscrito está terminado y nos convence, lo editamos{' '}
            <strong className="text-foreground">sin coste para ti</strong>; si necesita trabajo,
            son servicios editoriales con presupuesto.
          </p>

          <ul className="space-y-3 mb-8">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <b.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              <Link to="/valoracion" onClick={handleClose}>
                Publica tu libro
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Ahora no
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
