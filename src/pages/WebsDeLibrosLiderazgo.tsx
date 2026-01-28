import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, BookOpen, Feather, Share2, ArrowDown, Home, Brain, Lightbulb, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import LiderazgoFlipbook from "@/components/LiderazgoFlipbook";

// Color palette extracted from book cover typography
// Primary blue: #1a3a5c (darker professional blue matching cover text)
// Accent: #c9a45c (gold/bronze accent)

const WebsDeLibrosLiderazgo = () => {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const synopsisRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);
  const authorRef = useRef<HTMLElement>(null);
  const flipbookRef = useRef<HTMLElement>(null);
  const [bookHover, setBookHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Features section animations
      const featuresSection = featuresRef.current;
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const cards = featuresSection.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            const cardEl = card as HTMLElement;
            const delay = index * 0.1;
            const cardProgress = Math.min(1, Math.max(0, progress - delay));
            cardEl.style.opacity = `${cardProgress}`;
            cardEl.style.transform = `translateY(${30 - cardProgress * 30}px)`;
          });
        }
      }

      // Synopsis section animations
      const synopsisSection = synopsisRef.current;
      if (synopsisSection) {
        const rect = synopsisSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const title = synopsisSection.querySelector('.synopsis-title') as HTMLElement;
          const content = synopsisSection.querySelector('.synopsis-content') as HTMLElement;
          
          if (title) {
            title.style.opacity = `${progress}`;
            title.style.transform = `translateX(${-30 + progress * 30}px)`;
          }
          if (content) {
            content.style.opacity = `${progress}`;
          }
        }
      }

      // Book section animations
      const bookSection = bookRef.current;
      if (bookSection) {
        const rect = bookSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const bookImage = bookSection.querySelector('.book-image-container') as HTMLElement;
          
          if (bookImage) {
            bookImage.style.opacity = `${progress}`;
          }
        }
      }

      // Author section animations
      const authorSection = authorRef.current;
      if (authorSection) {
        const rect = authorSection.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
          const photo = authorSection.querySelector('.author-photo') as HTMLElement;
          const bio = authorSection.querySelector('.author-bio') as HTMLElement;
          
          if (photo) {
            photo.style.opacity = `${progress}`;
            photo.style.transform = `scale(${0.9 + progress * 0.1})`;
          }
          if (bio) {
            bio.style.opacity = `${progress}`;
            bio.style.transform = `translateY(${20 - progress * 20}px)`;
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
        <title>La Construcción Discursiva del Liderazgo | Antonio Rodríguez Jiménez</title>
        <meta name="description" content="De Platón a la inteligencia artificial. Una obra que analiza cómo se construye el liderazgo a través del poder del discurso." />
        <meta property="og:title" content="La Construcción Discursiva del Liderazgo" />
        <meta property="og:description" content="De Platón a la inteligencia artificial. Por Antonio Rodríguez Jiménez." />
        <meta property="og:image" content="/products/construccion-discursiva-liderazgo.png" />
      </Helmet>

      <div className="min-h-screen bg-[#f8f6f1] text-[#1a1a1a] overflow-x-hidden selection:bg-[#1a3a5c] selection:text-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-[#f8f6f1]/95 backdrop-blur-sm border-b border-[#1a3a5c]/10">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[#1a3a5c] hover:text-[#1a3a5c]/70 transition-colors group"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm tracking-[0.2em] uppercase font-medium">Grupo Dauro</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm tracking-[0.2em] uppercase font-medium text-[#1a3a5c] hidden sm:block">Antonio Rodríguez Jiménez</span>
            <Button 
              className="bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90 text-xs tracking-widest uppercase"
              onClick={() => document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Comprar Ahora
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="min-h-screen relative flex items-center overflow-hidden pt-20"
          style={{
            background: 'linear-gradient(135deg, #f8f6f1 0%, #e8e4db 50%, #f0ece5 100%)'
          }}
        >
          {/* Decorative neural network pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a3a5c' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%231a3a5c' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left content */}
            <div className="space-y-8 text-center lg:text-left pt-8 lg:pt-0">
              <div className="inline-block px-4 py-2 border border-[#1a3a5c]/30 rounded-full text-[#1a3a5c] text-xs tracking-[0.3em] uppercase font-medium">
                Novedad Editorial 2026
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-[#1a3a5c]">La Construcción</span>
                <br />
                <span className="text-[#1a3a5c]">Discursiva</span>
                <br />
                <span className="text-[#1a3a5c]">del </span>
                <span className="italic text-[#c9a45c] font-semibold">Liderazgo</span>
              </h1>
              
              <blockquote className="border-l-4 border-[#c9a45c] pl-6 text-lg md:text-xl text-[#4a4a4a] italic max-w-lg mx-auto lg:mx-0">
                "¿Es el liderazgo una cualidad innata o una narrativa construida con el poder del lenguaje?"
              </blockquote>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90 font-medium tracking-wide h-12 px-8"
                  onClick={() => document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Comprar Ahora
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-[#1a3a5c]/30 text-[#1a3a5c] hover:bg-[#1a3a5c]/5 font-medium tracking-wide h-12 px-8"
                  onClick={() => document.getElementById('synopsis-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Leer Sinopsis
                </Button>
              </div>
            </div>

            {/* Right - Book cover with animation */}
            <div className="flex justify-center lg:justify-end">
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setBookHover(true)}
                onMouseLeave={() => setBookHover(false)}
                style={{ perspective: '1000px' }}
              >
                {/* Floating animation container */}
                <div 
                  className="relative transition-all duration-700 ease-out"
                  style={{
                    animation: 'float-book 6s ease-in-out infinite',
                    transform: bookHover ? 'rotateY(-10deg) rotateX(5deg) scale(1.05)' : 'rotateY(0) rotateX(0) scale(1)',
                  }}
                >
                  {/* Book shadow */}
                  <div 
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-[#1a3a5c]/20 blur-2xl rounded-full transition-all duration-700"
                    style={{
                      transform: bookHover ? 'scaleX(1.2) translateY(10px)' : 'scaleX(1)',
                      opacity: bookHover ? 0.4 : 0.3,
                    }}
                  />
                  
                  {/* Book cover */}
                  <img 
                    alt="La Construcción Discursiva del Liderazgo - Portada" 
                    className="w-full max-w-sm lg:max-w-md rounded-sm shadow-2xl transition-shadow duration-500"
                    src="/products/construccion-discursiva-liderazgo.png"
                    style={{
                      boxShadow: bookHover 
                        ? '0 25px 50px -12px rgba(26, 58, 92, 0.4), 0 10px 30px -10px rgba(0, 0, 0, 0.3)'
                        : '0 15px 35px -10px rgba(26, 58, 92, 0.25), 0 5px 15px -5px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  
                  {/* Light reflection effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button 
            onClick={scrollToContent}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1a3a5c]/50 flex flex-col items-center gap-2 cursor-pointer hover:text-[#1a3a5c] transition-colors"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Descubre más</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </section>

        {/* Features Section */}
        <section 
          ref={featuresRef}
          className="py-20 md:py-32 bg-white"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="feature-card text-center p-8 rounded-2xl bg-[#f8f6f1] border border-[#1a3a5c]/10 opacity-0" style={{ transform: 'translateY(30px)' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[#1a3a5c]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a3a5c] mb-4 tracking-tight">Raíces Filosóficas</h3>
                <p className="text-[#4a4a4a] leading-relaxed">
                  Un análisis riguroso que conecta las teorías clásicas del liderazgo con los desafíos éticos contemporáneos.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="feature-card text-center p-8 rounded-2xl bg-[#f8f6f1] border border-[#1a3a5c]/10 opacity-0" style={{ transform: 'translateY(30px)' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-[#1a3a5c]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a3a5c] mb-4 tracking-tight">Era Digital</h3>
                <p className="text-[#4a4a4a] leading-relaxed">
                  Cómo la Inteligencia Artificial está redefiniendo la autoridad, la toma de decisiones y la comunicación humana.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="feature-card text-center p-8 rounded-2xl bg-[#f8f6f1] border border-[#1a3a5c]/10 opacity-0" style={{ transform: 'translateY(30px)' }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-[#1a3a5c]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a3a5c] mb-4 tracking-tight">Práctica Discursiva</h3>
                <p className="text-[#4a4a4a] leading-relaxed">
                  Herramientas concretas para entender y mejorar la construcción del discurso de liderazgo en cualquier ámbito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Flipbook Section */}
        <section 
          id="flipbook-section"
          ref={flipbookRef}
          className="py-20 md:py-32 bg-[#1a3a5c]"
        >
          <div className="container mx-auto px-4 md:px-8">
            <LiderazgoFlipbook />
          </div>
        </section>

        {/* Synopsis Section */}
        <section 
          id="synopsis-section"
          ref={synopsisRef}
          className="py-20 md:py-32 bg-[#0f2840] text-white"
        >
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-white/80 text-xs tracking-[0.3em] uppercase mb-6 font-medium">
                Sinopsis Oficial
              </span>
              <h2 className="synopsis-title text-3xl md:text-4xl lg:text-5xl font-bold opacity-0 tracking-tight" style={{ transform: 'translateX(-30px)' }}>
                La Construcción Discursiva del Liderazgo
              </h2>
            </div>
            
            <div className="synopsis-content space-y-6 text-lg text-white/80 leading-relaxed opacity-0">
              <p>
                ¿Qué tienen en común un filósofo de la antigua Grecia, un CEO de Silicon Valley y un líder político actual? <span className="text-[#c9a45c] font-medium">La capacidad de construir la realidad a través de la palabra.</span>
              </p>
              <p>
                El liderazgo no es un conjunto de habilidades innatas, sino una compleja construcción discursiva que se ha redefinido a lo largo de la historia. En esta obra reveladora, <span className="text-white font-medium">Antonio Rodríguez Jiménez</span> desmonta los mitos del liderazgo para analizar su verdadera esencia: una lucha de narrativas donde el poder del discurso es la herramienta fundamental.
              </p>
              <p>
                Con un enfoque que integra la filosofía, la lingüística y la economía, este libro traza un recorrido que va desde los fundamentos del liderazgo en la filosofía clásica hasta los desafíos que plantea la inteligencia artificial.
              </p>
              <p>
                El libro explora cómo se ejerce la influencia en profesiones tan diversas como el derecho, la comunicación, las finanzas o las artes, demostrando que la comunicación y el poder son inseparables.
              </p>
              <blockquote className="border-l-4 border-[#c9a45c] pl-6 my-8 text-xl italic text-white/90">
                ¿Estamos preparados para los nuevos modelos de liderazgo en el siglo XXI? ¿Cómo podemos utilizar el discurso de manera consciente y responsable?
              </blockquote>
              <p className="text-[#c9a45c] font-medium">
                Una obra imprescindible para quienes buscan comprender y dominar el sutil arte de la influencia en un mundo definido por la información y la comunicación.
              </p>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section 
          id="book-section"
          ref={bookRef}
          className="py-20 md:py-32 bg-[#f8f6f1]"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Book Image */}
              <div className="book-image-container flex justify-center opacity-0">
                <div 
                  className="relative group"
                  style={{ 
                    perspective: '1000px',
                    animation: 'float-book 6s ease-in-out infinite',
                  }}
                >
                  <img 
                    alt="La Construcción Discursiva del Liderazgo" 
                    className="w-full max-w-sm rounded-sm shadow-2xl shadow-[#1a3a5c]/20 group-hover:shadow-[#1a3a5c]/30 transition-shadow duration-500"
                    src="/products/construccion-discursiva-liderazgo.png"
                  />
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#c9a45c]/30 -z-10 rounded-sm hidden md:block" />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#1a3a5c]/20 -z-10 rounded-sm hidden md:block" />
                </div>
              </div>

              {/* Book Info */}
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-3 py-1 border border-[#c9a45c] rounded-full text-[#c9a45c] text-xs tracking-widest mb-6 uppercase font-medium">
                    Disponible Ahora
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-4 tracking-tight">
                    Adquiere tu ejemplar
                  </h2>
                  <p className="text-lg text-[#4a4a4a]">
                    Disponible en formato físico y digital. Únete a la conversación sobre el futuro del liderazgo.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg"
                      className="bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90 font-medium tracking-wide h-14 px-8 text-base"
                      onClick={() => window.open('https://grupodauro.com/producto/construccion-discursiva-liderazgo', '_blank')}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Comprar (17€)
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-[#1a3a5c]/30 hover:bg-[#1a3a5c]/5 text-[#1a3a5c] font-medium tracking-wide h-14 px-8 text-base"
                      onClick={() => window.open('https://www.amazon.es', '_blank')}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      Versión Kindle
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-[#4a4a4a] pt-4 border-t border-[#1a3a5c]/10">
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#1a3a5c]" />
                    <span>Envío gratuito a España</span>
                  </div>
                  <button 
                    className="flex items-center gap-2 hover:text-[#1a3a5c] transition-colors cursor-pointer"
                    onClick={async () => {
                      const shareData = {
                        title: 'La Construcción Discursiva del Liderazgo',
                        text: 'De Platón a la inteligencia artificial - Por Antonio Rodríguez Jiménez',
                        url: window.location.href
                      };
                      
                      if (navigator.share && navigator.canShare?.(shareData)) {
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          await navigator.clipboard.writeText(window.location.href);
                          alert('Enlace copiado al portapapeles');
                        }
                      } else {
                        await navigator.clipboard.writeText(window.location.href);
                        alert('Enlace copiado al portapapeles');
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section 
          ref={authorRef}
          className="py-20 md:py-32 bg-white border-t border-[#1a3a5c]/10"
        >
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Author Photo */}
              <div className="author-photo flex-shrink-0 opacity-0" style={{ transform: 'scale(0.9)' }}>
                <div className="w-48 h-64 md:w-56 md:h-72 rounded-[50%] overflow-hidden border-4 border-[#1a3a5c]/20 shadow-2xl shadow-[#1a3a5c]/10">
                  <img 
                    src="/dauro-ciencia-director-2025.jpg" 
                    alt="Antonio Rodríguez Jiménez - Autor"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="author-bio flex-1 text-center md:text-left opacity-0" style={{ transform: 'translateY(20px)' }}>
                <h3 className="text-2xl md:text-3xl text-[#c9a45c] mb-2 font-semibold tracking-tight">Sobre el Autor</h3>
                <h4 className="text-xl md:text-2xl text-[#1a3a5c] mb-4 font-bold tracking-tight">Antonio Rodríguez Jiménez</h4>
                <p className="text-sm uppercase tracking-widest text-[#4a4a4a] mb-6 font-medium">Doctor en Teoría de la Literatura y Comunicación</p>
                
                <div className="space-y-4 text-[#4a4a4a] leading-relaxed">
                  <p>
                    Nacido en Córdoba (España), es doctor en Teoría de la Literatura y Literatura Comparada y en Comunicación. Actualmente, trabaja como profesor titular en el Departamento de Ciencias Comerciales y de la Comunicación de la Universidad de Guadalajara (México) desde 2013.
                  </p>
                  <p>
                    Tiene en su haber <span className="text-[#1a3a5c] font-semibold">67 libros publicados</span>. Es miembro del Sistema Nacional de Investigadores de CONAHCYT (Nivel II) y académico numerario de la Academia Hispanoamericana de Buenas Letras.
                  </p>
                  <p>
                    Fue coordinador durante 22 años del suplemento <em>Cuadernos del Sur</em> y posteriormente director del Instituto Cervantes en Fez (Marruecos).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a3a5c] py-8 text-center text-white/60 text-xs border-t border-white/10">
          <p>© {new Date().getFullYear()} Antonio Rodríguez Jiménez · Dauro Ciencia</p>
        </footer>

        {/* CSS for book floating animation */}
        <style>{`
          @keyframes float-book {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default WebsDeLibrosLiderazgo;
