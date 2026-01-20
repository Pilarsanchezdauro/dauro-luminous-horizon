import { useEffect, useRef } from "react";
import { ShoppingCart, BookOpen, Feather, Share2, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const WebsDeLibros = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Portrait section animations
      const portraitSection = portraitRef.current;
      if (portraitSection) {
        const rect = portraitSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const portrait = portraitSection.querySelector('.portrait-image') as HTMLElement;
          const roles = portraitSection.querySelectorAll('.role-title');
          if (portrait) {
            portrait.style.opacity = `${progress}`;
            portrait.style.transform = `translateX(${-50 + progress * 50}px)`;
          }
          roles.forEach((role, index) => {
            const roleEl = role as HTMLElement;
            const delay = index * 0.15;
            const roleProgress = Math.min(1, Math.max(0, progress - delay));
            roleEl.style.opacity = `${roleProgress}`;
            roleEl.style.transform = `translateY(${20 - roleProgress * 20}px)`;
          });
        }
      }

      // Question section animations
      const questionSection = questionRef.current;
      if (questionSection) {
        const rect = questionSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const subtitle = questionSection.querySelector('.question-subtitle') as HTMLElement;
          const title = questionSection.querySelector('.question-title') as HTMLElement;
          const details = questionSection.querySelector('.question-details') as HTMLElement;
          
          if (subtitle) {
            subtitle.style.opacity = `${progress}`;
          }
          if (title) {
            title.style.opacity = `${progress}`;
            title.style.transform = `scale(${0.9 + progress * 0.1})`;
          }
          if (details) {
            details.style.opacity = `${progress}`;
            details.style.transform = `translateY(${20 - progress * 20}px)`;
          }
        }
      }

      // Book section animations
      const bookSection = bookRef.current;
      if (bookSection) {
        const rect = bookSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const bookImage = bookSection.querySelector('.book-image') as HTMLElement;
          const badge = bookSection.querySelector('.book-badge') as HTMLElement;
          
          if (bookImage) {
            bookImage.style.opacity = `${progress}`;
            bookImage.style.transform = `rotateY(${90 - progress * 90}deg)`;
          }
          if (badge) {
            badge.style.opacity = `${progress}`;
            badge.style.transform = `translateX(${20 - progress * 20}px)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Leonardo da Vinci: La Tragedia de la Perfección | Carlos Blanco</title>
        <meta name="description" content="Una indagación poética y filosófica en la grandeza de la mente humana. Ensayo de Carlos Blanco sobre Leonardo da Vinci." />
        <meta property="og:title" content="Leonardo da Vinci: La Tragedia de la Perfección" />
        <meta property="og:description" content="Una indagación poética y filosófica en la grandeza de la mente humana. Por Carlos Blanco." />
        <meta property="og:image" content="/webs-libros/leonardo/portada-libro.jpg" />
      </Helmet>

      <div className="min-h-[400vh] bg-[#0a0a0a] text-white overflow-x-hidden font-sans selection:bg-primary selection:text-primary-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-transparent">
          <span className="text-sm tracking-[0.3em] uppercase font-medium">Carlos Blanco</span>
          <Button 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 text-xs tracking-widest uppercase"
            onClick={() => document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Comprar Ahora
          </Button>
        </header>

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img 
              alt="Leonardo Sketches Background" 
              className="w-full h-full object-cover"
              src="/webs-libros/leonardo/hero-bg.png"
            />
          </div>
          
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tighter animate-fade-in">
              LEONARDO
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest uppercase">
              Lo tenía todo
            </p>
          </div>

          <button 
            onClick={scrollToContent}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 cursor-pointer hover:text-white/80 transition-colors"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Descubre la verdad</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </section>

        {/* Portrait Section */}
        <section 
          ref={portraitRef}
          className="h-screen sticky top-0 bg-[#0a0a0a] flex items-center justify-center z-10"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent" />
          
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-20">
            <div className="portrait-image relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm border border-white/10 group opacity-0" style={{ transform: 'translateX(-50px)' }}>
              <img 
                alt="Leonardo Portrait" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                src="/webs-libros/leonardo/leonardo-portrait-dark.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 font-serif italic text-3xl text-primary">Da Vinci</div>
            </div>

            <div className="space-y-8 md:space-y-12 text-center md:text-left">
              {['PINTOR', 'INVENTOR', 'CIENTÍFICO', 'GENIO'].map((role, index) => (
                <div key={role} className="role-title relative opacity-0" style={{ transform: 'translateY(20px)' }}>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white/90 hover:text-primary transition-colors cursor-default">
                    {role}
                  </h2>
                  <div className="h-px w-0 bg-primary mt-2 transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question Section */}
        <section 
          ref={questionRef}
          className="h-screen sticky top-0 bg-[#050505] flex items-center justify-center z-20 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
            <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-30">
            <p className="question-subtitle text-primary font-serif italic text-xl md:text-2xl lg:text-3xl mb-8 opacity-0">
              Pero había algo que lo atormentaba...
            </p>
            
            <h2 className="question-title text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight text-white mb-12 opacity-0" style={{ transform: 'scale(0.9)' }}>
              ¿Y si la <span className="text-primary italic">perfección</span> fuera una <span className="text-red-500">condena</span>?
            </h2>

            <div className="question-details grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-xs md:text-sm tracking-widest text-white/60 uppercase opacity-0" style={{ transform: 'translateY(20px)' }}>
              <div className="border-t border-white/10 pt-4">Obras inacabadas</div>
              <div className="border-t border-white/10 pt-4">Proyectos abandonados</div>
              <div className="border-t border-white/10 pt-4">Una búsqueda sin fin</div>
            </div>
          </div>
        </section>

        {/* Book Section */}
        <section 
          id="book-section"
          ref={bookRef}
          className="min-h-screen relative bg-[#0a0a0a] z-30 py-16 md:py-24 flex flex-col items-center justify-center"
        >
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Book Image */}
            <div className="lg:col-span-5 relative group" style={{ perspective: '1000px' }}>
              <div className="book-image relative z-10 transition-transform duration-500 group-hover:scale-105 shadow-2xl opacity-0" style={{ transform: 'rotateY(90deg)', transformStyle: 'preserve-3d' }}>
                <img 
                  alt="Libro: La Tragedia de la Perfección" 
                  className="w-full max-w-md mx-auto rounded-sm shadow-2xl shadow-primary/20"
                  src="/webs-libros/leonardo/portada-libro.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm" />
              </div>
              <div className="absolute -top-6 md:-top-10 -left-6 md:-left-10 w-full h-full border border-primary/30 -z-10 rounded-sm hidden md:block" />
              <div className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 w-full h-full border border-white/10 -z-10 rounded-sm hidden md:block" />
            </div>

            {/* Book Info */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <div>
                <div 
                  className="book-badge inline-block px-3 py-1 border border-primary/50 rounded-full text-primary text-xs tracking-widest mb-6 opacity-0"
                  style={{ transform: 'translateX(20px)' }}
                >
                  NOVEDAD EDITORIAL
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                  Leonardo da Vinci: <br />
                  <span className="text-primary italic">La tragedia de la perfección</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 font-light">
                  Por <span className="text-white font-medium">Carlos Blanco</span>
                </p>
              </div>

              <div className="space-y-6 text-base md:text-lg text-white/80 font-light leading-relaxed">
                <p>
                  Una indagación poética y filosófica en la grandeza de la mente humana. 
                  Redactado a dos voces, una que juzga a Leonardo y otra que pretende ser él.
                </p>
                <blockquote className="border-l-2 border-primary pl-6 italic text-white/60">
                  "Un valioso estímulo para la reflexión sobre el significado más profundo de nuestra existencia."
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-primary text-black hover:bg-primary/90 font-serif tracking-wide h-12 md:h-14 px-6 md:px-8 text-base md:text-lg"
                  onClick={() => window.open('https://dauro.es/tienda', '_blank')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar Tapa Blanda (21€)
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-white font-serif tracking-wide h-12 md:h-14 px-6 md:px-8 text-base md:text-lg"
                  onClick={() => window.open('https://dauro.es/tienda', '_blank')}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Versión Ebook (9.99€)
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-white/60 pt-6 md:pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4" />
                  <span>Envío gratuito a España</span>
                </div>
                <button 
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Leonardo da Vinci: La Tragedia de la Perfección',
                        text: 'Una indagación poética y filosófica sobre Leonardo da Vinci',
                        url: window.location.href
                      });
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-40 bg-[#050505] py-8 text-center text-white/40 text-xs border-t border-white/5">
          <p>© {new Date().getFullYear()} Carlos Blanco · Editorial Dauro</p>
        </footer>
      </div>
    </>
  );
};

export default WebsDeLibros;
