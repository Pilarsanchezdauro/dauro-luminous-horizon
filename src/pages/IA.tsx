import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap, Code, Palette, BookOpen, Building2, Landmark } from "lucide-react";
import { SEO } from "@/components/SEO";
import iaBg from "@/assets/ia-bg.jpg";
import mascotLogo from "@/assets/mascot.png";
import logoDauroIA from "@/assets/logo-dauro-ia.png";
const IA = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dauro IA - Inteligencia Artificial Creativa",
    "url": "https://grupodauro.com/grupo-dauro/ia",
    "description": "Servicios creativos con inteligencia artificial: generación de imágenes, textos, música y contenido multimedia",
    "provider": {
      "@type": "Organization",
      "name": "Grupo Cultural Dauro"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Dauro IA - Creatividad e Inteligencia Artificial"
        description="Servicios creativos con IA: generación de imágenes artísticas, textos creativos, música original y contenido multimedia. Fusionamos arte y tecnología para proyectos únicos."
        keywords="inteligencia artificial arte, IA creatividad, generación imágenes IA, música IA, contenido IA, servicios IA creativos, arte generativo"
        url="https://grupodauro.com/grupo-dauro/ia"
        image="https://grupodauro.com/og-dauro-ia.jpg"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${iaBg})`,
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <img 
            src={logoDauroIA} 
            alt="Dauro IA - Inteligencia Artificial Creativa" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-2xl"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro IA
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Visión Artística. Creación IA. Belleza Inteligente.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-28 left-12 w-20 h-20 opacity-[0.035] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '3s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-64 right-16 w-16 h-16 opacity-[0.025] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '8s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-80 left-1/4 w-24 h-24 opacity-[0.03] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '11s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-32 right-1/3 w-20 h-20 opacity-[0.045] animate-float-circle pointer-events-none"
          style={{ animationDelay: '14s' }}
        />
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/public/projects/dauro-ia.png')] bg-cover bg-center opacity-[0.05]" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              IA para Cualquier Sector. Con ADN Cultural.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Nuestros servicios de inteligencia artificial están diseñados para <strong className="text-foreground">cualquier sector</strong>: 
              empresas, instituciones, industria, salud, educación... Pero cuando tu proyecto necesita 
              <strong className="text-foreground"> belleza, cultura o estética</strong>, ahí es donde marcamos la diferencia.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10 mt-4">
              <span className="text-primary font-semibold">Llevamos la cultura y la belleza en nuestro ADN.</span> Más de 20 años 
              en el mundo del arte nos han enseñado que incluso los datos necesitan estética para comunicar.
            </p>
            <p className="text-primary font-semibold mt-6 text-center relative z-10">
              🎯 Todos nuestros servicios son personalizados
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Servicios Culturales */}
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Valoración y Gestión Patrimonial</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Gestiona activos artísticos, históricos o inmobiliarios con precisión IA.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Clasificación automatizada de colecciones</li>
              <li>• Estimación de valor de patrimonio</li>
              <li>• Inventariado inteligente</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Documentoscopia y Verificación</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Autenticidad documental para instituciones, notarías y administración pública.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Análisis de tintas y firmas</li>
              <li>• Verificación de certificados oficiales</li>
              <li>• Detección de falsificaciones</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Redacción y Contenidos IA</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Textos institucionales, editoriales y corporativos con estilo profesional.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Informes y memorias institucionales</li>
              <li>• Contenido web y comunicación</li>
              <li>• Corrección y estilo editorial</li>
            </ul>
          </div>

          {/* Servicios Institucionales */}
          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Landmark className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Soluciones Institucionales</h3>
            <p className="text-muted-foreground text-sm mb-4">
              IA para ayuntamientos, universidades, gobiernos y organismos públicos.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Atención ciudadana automatizada</li>
              <li>• Análisis de datos públicos</li>
              <li>• Digitalización de archivos</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Building2 className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Branding y Comunicación</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Identidad visual y narrativa para empresas e instituciones.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Naming y eslóganes</li>
              <li>• Sistemas gráficos generativos</li>
              <li>• Campañas institucionales</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Zap className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Producción Audiovisual</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Vídeos corporativos, institucionales y promocionales con IA.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Vídeos y presentaciones</li>
              <li>• Avatares y portavoces virtuales</li>
              <li>• Contenido para redes sociales</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Code className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Visualización de Datos</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Los datos también necesitan estética para comunicar con impacto.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Dashboards con diseño</li>
              <li>• Infografías automatizadas</li>
              <li>• Informes visuales</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Formación en IA</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Capacita a tu equipo o institución para trabajar con IA generativa.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Formación a medida</li>
              <li>• Cursos para funcionarios</li>
              <li>• Talleres corporativos</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Sparkles className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Webs y Plataformas</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Diseño web para empresas, instituciones y proyectos culturales.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Portales institucionales</li>
              <li>• E-commerce y catálogos</li>
              <li>• Aplicaciones a medida</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Code className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Música y Audio IA</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Identidad sonora para marcas, instituciones y producciones.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Música original</li>
              <li>• Locuciones y doblaje</li>
              <li>• Podcasts automatizados</li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Brain className="h-10 w-10 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Modelos IA Personalizados</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Tu propia IA entrenada con tu archivo, datos y estilo institucional.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Chatbots especializados</li>
              <li>• Asistentes virtuales</li>
              <li>• IA de atención al público</li>
            </ul>
          </div>
        </div>

        {/* Trayectoria */}
        <section className="mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-12 rounded-3xl border-2 border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              Nuestra trayectoria no empezó con la moda de la IA
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Llevamos más de 20 años creando con tecnología, arte y visión. Hemos diseñado 
              ideas, campañas y narrativas para autores, editoriales, museos, asociaciones y marcas.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hemos usado inteligencia artificial mucho antes de que tuviera nombre de tendencia. 
              Hoy lo llamamos IA Generativa. <span className="text-primary font-semibold">Nosotras siempre lo llamamos creación con visión.</span>
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">+20</p>
                <p className="text-sm text-muted-foreground">años en cultura y arte</p>
              </div>
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">+150</p>
                <p className="text-sm text-muted-foreground">proyectos con IA</p>
              </div>
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">98%</p>
                <p className="text-sm text-muted-foreground">de satisfacción</p>
              </div>
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">Global</p>
                <p className="text-sm text-muted-foreground">proyectos internacionales</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-4">
            ¿Para quién trabajamos?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Desde grandes corporaciones hasta instituciones culturales. 
            <strong className="text-foreground"> Cualquier sector que necesite IA con criterio estético</strong>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_10px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Palette className="h-10 w-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-playfair font-bold mb-2">Galerías y Museos</h3>
              <p className="text-muted-foreground text-sm">
                Gestión de colecciones, valoración de obras y experiencias digitales inmersivas
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl mb-4 flex items-center justify-center border border-accent/30 group-hover:border-primary/40 group-hover:shadow-[0_10px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BookOpen className="h-10 w-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-playfair font-bold mb-2">Editoriales y Autores</h3>
              <p className="text-muted-foreground text-sm">
                Asistencia en escritura, corrección estilística y optimización de procesos editoriales
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_10px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Building2 className="h-10 w-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-playfair font-bold mb-2">Empresas y Marcas</h3>
              <p className="text-muted-foreground text-sm">
                Branding cultural, producción audiovisual y soluciones creativas con IA
              </p>
            </div>

            <div className="text-center group">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl mb-4 flex items-center justify-center border border-accent/30 group-hover:border-primary/40 group-hover:shadow-[0_10px_40px_-10px_rgba(224,74,92,0.4)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Landmark className="h-10 w-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-playfair font-bold mb-2">Entidades Públicas</h3>
              <p className="text-muted-foreground text-sm">
                Ayuntamientos, universidades e instituciones gubernamentales con IA generativa
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Listo para dar el salto cuántico?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Tu visión, impulsada por nuestra experticia en inteligencia artificial, 
            tiene el poder de redefinir tu industria. Este es el momento. Esta es la señal.
          </p>
          <a href="https://dauroia.com/" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 text-lg px-8 py-6">
              Descubre Nuestras Soluciones
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IA;
