import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, BookOpen, Film, Brain, Palette, Users, Target, Sparkles, TrendingUp, Music, Frame, FileText, Search, Gem, PenTool, GraduationCap } from "lucide-react";
import { SEO } from "@/components/SEO";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpeg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpeg";
import gallery9 from "@/assets/gallery-9.jpeg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpeg";
import gallery12 from "@/assets/gallery-12.jpeg";
import gallery13 from "@/assets/gallery-13.webp";
import mascotLogo from "@/assets/mascot.png";
import logoDauroHero from "@/assets/logo-dauro-hero.png";

const GrupoDauro = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10, gallery11, gallery12, gallery13];
  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 9);

  return (
    <div className="min-h-screen">
      <SEO
        title="Grupo Cultural Dauro | Editorial y Servicios para Autores en Granada"
        description="Grupo Cultural Dauro: editorial independiente, servicios de autoedición, maquetación, diseño de portadas y publicación de libros. Más de 2000 obras publicadas desde el año 2000."
        keywords="Grupo Cultural Dauro, editorial Granada, publicar libro Granada, autoedición Granada, servicios editoriales, maquetación libros, diseño portadas, publicar mi libro, editorial independiente España"
        url="https://www.grupodauro.com/grupo-dauro"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${logoDauroHero})`,
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Grupo Cultural Dauro
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Arte, tecnología y pensamiento desde el año 2000
          </p>
        </div>
      </section>
      
      <main className="pb-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-16 right-10 w-20 h-20 opacity-[0.025] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-96 left-8 w-16 h-16 opacity-[0.03] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '4s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-96 right-1/4 w-24 h-24 opacity-[0.035] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '7s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-48 left-1/3 w-20 h-20 opacity-[0.04] animate-float-circle pointer-events-none"
          style={{ animationDelay: '10s' }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          <div className="max-w-5xl mx-auto">
            
            {/* Introducción destacada */}
            <div className="text-center mb-16">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Desde el año 2000, <span className="text-primary font-semibold">Grupo Cultural Dauro</span> impulsa la creación, la edición y la innovación cultural desde una vocación clara: unir la herencia artística con la tecnología del futuro.
              </p>
            </div>

            {/* Sección: Nuestra Historia */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-foreground">Nuestros Orígenes</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Nacimos como una editorial independiente con una mirada abierta al arte, la literatura y el pensamiento contemporáneo. Con el tiempo, nos hemos convertido en un grupo creativo multidisciplinar.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 rounded-2xl border border-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-foreground">Evolución Constante</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Abarcamos la edición literaria, la producción audiovisual, la dirección técnica de guion y el desarrollo de proyectos basados en inteligencia artificial.
                </p>
              </div>
            </div>

            {/* Sección: Lo que hacemos - pilares */}
            <div className="mb-16">
              <h2 className="text-3xl font-playfair font-bold text-center mb-10 text-foreground">
                Nuestras Áreas de Actividad
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Edición Literaria</h4>
                  <p className="text-xs text-muted-foreground">Narrativa, poesía, ensayo e investigación.</p>
                </div>
                
                <a href="/dauro-ciencia" className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Dauro Ciencia</h4>
                  <p className="text-xs text-muted-foreground">Editorial universitaria con revisión científica.</p>
                </a>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <PenTool className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Servicios Editoriales</h4>
                  <p className="text-xs text-muted-foreground">Corrección, maquetación y diseño editorial.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Film className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Producción Audiovisual</h4>
                  <p className="text-xs text-muted-foreground">Booktrailers, cortometrajes y multimedia.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Producción Musical</h4>
                  <p className="text-xs text-muted-foreground">Composición, grabación y producción musical.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Diseño & Branding</h4>
                  <p className="text-xs text-muted-foreground">Identidad visual y proyectos creativos.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Frame className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Representación Artística</h4>
                  <p className="text-xs text-muted-foreground">Gestión y representación de obras de arte.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Informes Técnicos</h4>
                  <p className="text-xs text-muted-foreground">Documentación técnica de alto nivel.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Peritaje de Arte</h4>
                  <p className="text-xs text-muted-foreground">Autenticación y valoración de obras.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Gem className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Tasación de Arte</h4>
                  <p className="text-xs text-muted-foreground">Valoración económica de obras de arte.</p>
                </div>
                
                <div className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Inteligencia Artificial</h4>
                  <p className="text-xs text-muted-foreground">Análisis y catalogación cultural con IA.</p>
                </div>
              </div>
            </div>

            {/* Cifras destacadas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
                <p className="text-3xl md:text-4xl font-playfair font-bold text-primary">+1.000</p>
                <p className="text-sm text-muted-foreground mt-1">Obras Publicadas</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
                <p className="text-3xl md:text-4xl font-playfair font-bold text-primary">+200</p>
                <p className="text-sm text-muted-foreground mt-1">Proyectos Web</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
                <p className="text-3xl md:text-4xl font-playfair font-bold text-primary">+300</p>
                <p className="text-sm text-muted-foreground mt-1">Booktrailers</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
                <p className="text-3xl md:text-4xl font-playfair font-bold text-primary">+5.000</p>
                <p className="text-sm text-muted-foreground mt-1">Informes Técnicos</p>
              </div>
            </div>

            {/* Sección: Liderazgo y reconocimiento */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-foreground">Liderazgo Reconocido</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El grupo está liderado por profesionales de prestigio internacional, creadores y editores premiados y reconocidos por su aportación al pensamiento y la cultura, que combinan sensibilidad artística, conocimiento técnico y visión innovadora.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Las publicaciones de Dauro y sus autores han sido reconocidos con numerosos galardones, entre ellos el <span className="text-primary font-medium">Premio Andalucía de la Crítica</span> en sus distintas modalidades.
                </p>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-foreground">Mirando al Futuro</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hoy, Dauro continúa expandiendo su alcance: producimos obras audiovisuales generadas mediante IA, desarrollamos sistemas de análisis y catalogación cultural, y diseñamos soluciones de comunicación que combinan creatividad, precisión y belleza.
                </p>
              </div>
            </div>

            {/* Propósito */}
            <div className="relative mb-16 py-12 px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative text-center max-w-3xl mx-auto">
                <Target className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Nuestro Propósito</h3>
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  "Dar forma a las ideas, elevar la palabra y convertir la cultura en una experiencia viva, inteligente y transformadora."
                </p>
              </div>
            </div>

            {/* Destacado de trayectoria */}
            <div className="relative my-16 py-12 px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
              <div className="relative text-center">
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary mb-4">
                  Desde 2000
                </p>
                <p className="text-xl lg:text-2xl text-foreground font-medium">
                  Impulsando la creación, edición e innovación cultural
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Más de 1.000 obras publicadas
                </h3>
                <p className="text-muted-foreground">
                  Nuestro catálogo editorial incluye narrativa, poesía, ensayo, investigación y colecciones especializadas, con obras y autores galardonados con premios de prestigio como el Premio Andalucía de la Crítica.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Liderazgo reconocido
                </h3>
                <p className="text-muted-foreground">
                  Profesionales de prestigio internacional, creadores y editores premiados que combinan sensibilidad artística, conocimiento técnico y visión innovadora.
                </p>
              </div>
            </div>

            {/* Premios y Reconocimientos */}
            <div className="mt-16">
              <h3 className="text-2xl font-playfair font-bold mb-8 text-center text-foreground">
                Premios y Reconocimientos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Premio Andalucía</p>
                    <p className="text-sm text-muted-foreground">Crítica Literaria</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Certificación</p>
                    <p className="text-sm text-muted-foreground">Calidad Editorial</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Producción</p>
                    <p className="text-sm text-muted-foreground">Audiovisual Premiada</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-br from-green-500/10 to-green-600/5 p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">+25 Años</p>
                    <p className="text-sm text-muted-foreground">Excelencia Cultural</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Galería de fotos */}
            <div className="mt-24">
              <h2 className="text-4xl font-playfair font-bold mb-8 text-center text-foreground">
                Nuestra Trayectoria en Imágenes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayedImages.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  >
                    <img
                      src={image}
                      alt={`Actividad cultural de Grupo Dauro ${index + 1}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              {!showAll && galleryImages.length > 9 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Ver más fotos
                  </button>
                </div>
              )}
              
              {/* Enlace al archivo histórico */}
              <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border text-center">
                <p className="text-muted-foreground mb-4">
                  ¿Quieres ver más? Visita nuestro <strong>archivo histórico</strong> con todas las galerías desde nuestros inicios. 
                  <span className="block text-sm mt-1 italic">
                    (La página puede tardar en cargar debido a la cantidad de contenido)
                  </span>
                </p>
                <a
                  href="https://grupodauro.wpcomstaging.com/?s=galeria#jp-carousel-14909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Explorar Archivo Histórico Completo
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para imagen ampliada */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage || ""}
              alt="Imagen ampliada"
              className="max-w-full max-h-[95vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GrupoDauro;
