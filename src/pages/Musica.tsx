import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Music, Play, Award, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import mascotLogo from "@/assets/mascot.png";
import DauroArteContactForm from "@/components/DauroArteContactForm";

const Musica = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Dauro Música",
    "url": "https://grupodauro.com/grupo-dauro/musica",
    "description": "Producción musical, composición original y proyectos artísticos"
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Dauro Música - Producción Musical y Composición Original"
        description="Producción musical innovadora: composición original, grabaciones, videoclips musicales y proyectos artísticos. Creamos música que emociona y trasciende fronteras."
        keywords="producción musical, composición original, música original, videoclips musicales, producción música Granada, música de autor"
        url="https://grupodauro.com/grupo-dauro/musica"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Música
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Producción musical, composición original y proyectos artísticos
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-24 left-10 w-20 h-20 opacity-[0.025] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-72 right-20 w-16 h-16 opacity-[0.03] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '6s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-60 left-1/4 w-24 h-24 opacity-[0.02] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '9s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-20 right-1/3 w-20 h-20 opacity-[0.04] animate-float-circle pointer-events-none"
          style={{ animationDelay: '12s' }}
        />
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-center relative z-10">
              Música que Conecta Culturas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Dauro Música produce contenido musical original que explora la fusión de culturas, 
              tradiciones y nuevas sonoridades. Desde composiciones originales hasta producciones 
              multimedia, nuestro compromiso es crear música que emocione y trascienda fronteras.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-3xl border-2 border-primary/10">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">10+</p>
            <p className="text-sm text-muted-foreground">Proyectos Musicales</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">2</p>
            <p className="text-sm text-muted-foreground">Países Unidos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">5+</p>
            <p className="text-sm text-muted-foreground">Videoclips</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">100%</p>
            <p className="text-sm text-muted-foreground">Producción Original</p>
          </div>
        </div>

        {/* Servicios */}
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-12 text-center">
            Nuestros Servicios Musicales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Music className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Composición Original</h3>
              <p className="text-muted-foreground text-sm">
                Música original para proyectos culturales, audiovisuales y artísticos.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Play className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Videoclips</h3>
              <p className="text-muted-foreground text-sm">
                Producción audiovisual de videoclips musicales con identidad visual única.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Award className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Proyectos Artísticos</h3>
              <p className="text-muted-foreground text-sm">
                Colaboraciones multidisciplinares que fusionan música, poesía y artes visuales.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 group">
              <Users className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3">Colaboraciones</h3>
              <p className="text-muted-foreground text-sm">
                Trabajamos con artistas internacionales para crear obras que trasciendan fronteras.
              </p>
            </div>
          </div>
        </div>

        {/* Proyectos destacados */}
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-12 text-center">
            Proyectos Destacados
          </h2>

          {/* Una Voz para Dos Tierras */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl mb-12">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Canción Oficial
                </div>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                  Una Voz para Dos Tierras
                </h3>
              </div>

              <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                Canción oficial para la presentación de la antología poética de <strong>Lorena Avelar</strong> 
                "Una voz para dos tierras". Una composición musical que fusiona las tradiciones de España y 
                México, celebrando el puente cultural entre ambos países.
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm text-center max-w-3xl mx-auto">
                Este proyecto musical forma parte de la presentación editorial de la antología poética, 
                uniendo la palabra escrita con la música en una experiencia artística integral que honra 
                la riqueza cultural de dos naciones hermanas.
              </p>

              <div className="flex gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Música Original</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">España-México</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Poesía</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Fusión Cultural</span>
              </div>

              {/* Video embed */}
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/8R2AV-h1Dzg"
                    title="Una Voz para Dos Tierras - Lorena Avelar"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <a 
                  href="https://www.youtube.com/watch?v=8R2AV-h1Dzg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Play className="h-5 w-5" />
                  Ver Videoclip en YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Si cuento - Ojos de Blues */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Contenido */}
              <div className="order-1 space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Colaboración con May Walker
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                    Si cuento
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium">Ojos de Blues</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Con la inestimable colaboración de <strong>May Walker</strong>, "Si cuento" nos cuenta 
                  que no hay un lugar mejor donde dejar atrás los momentos amargos que nuestra increíble ciudad, 
                  <strong> Granada</strong>.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  Una pieza musical que celebra el poder sanador de Granada, mezclando el blues con la esencia 
                  de nuestra tierra. Un tributo sonoro a la capacidad de la ciudad para transformar la melancolía 
                  en esperanza.
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Blues</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Granada</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">May Walker</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Música Original</span>
                </div>

                <div className="pt-4">
                  <a 
                    href="https://www.youtube.com/watch?v=Fsr64OQOFQg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Play className="h-5 w-5" />
                    Ver en YouTube
                  </a>
                </div>
              </div>

              {/* Video embed */}
              <div className="order-2">
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Fsr64OQOFQg"
                    title="Si cuento - Ojos de Blues con May Walker"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sin ti - Ojos de Blues */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl mb-12">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Ojos de Blues
                </div>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                  Sin ti
                </h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Video embed */}
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/J0xzs2bA6CQ"
                      title="Sin ti - Ojos de Blues"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Granada, conocida ya como <strong>la Liverpool de Andalucía</strong>, es la cuna de innumerables 
                    y magníficos grupos musicales, de entre los que en 2020 nace la Banda <strong>OJOS DE BLUES</strong>, 
                    grupo de temas propios, con un estilo que navega con reminiscencias del blues o soul hasta el 
                    pop-rock y rock más sinfónico.
                  </p>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Sin caer en ningún recurso fácil, la pasión y el sentimiento están presentes en todas sus obras, 
                    las cuales, bien estructuradas, no dejan nada al azar, apreciándose en algunas de ellas, sentidas 
                    referencias y guiños a la ciudad de Granada.
                  </p>

                  <div className="pt-4">
                    <a 
                      href="https://www.youtube.com/watch?v=J0xzs2bA6CQ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      <Play className="h-5 w-5" />
                      Ver en YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Información detallada del grupo */}
              <div className="border-t-2 border-primary/10 pt-8">
                <h4 className="text-2xl font-playfair font-bold mb-4 text-center">Sobre Ojos de Blues</h4>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Detrás de sus composiciones se advierten muchas horas de trabajo y disciplina, letras que 
                    encajan a la perfección y arreglos musicales cuidadosamente elaborados por todos sus componentes.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Sus músicos, la mayoría provenientes de otras experimentadas formaciones, aportan variadísimos 
                    recursos para conseguir unas construcciones musicales redondas, bien terminadas, que cuentan 
                    historias cercanas.
                  </p>

                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl">
                    <h5 className="font-semibold mb-3">Formación:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Toño</strong> - Batería (preciosismo y energía)</li>
                      <li>• <strong>Fernando</strong> - Teclados (experiencia y buen gusto)</li>
                      <li>• <strong>Manuel</strong> - Bajo (experiencia y mejor hacer)</li>
                      <li>• <strong>Fegor</strong> - Guitarra (la magia de la guitarra)</li>
                      <li>• <strong>Gabriel</strong> - Voz (gran trabajo como vocalista)</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground leading-relaxed italic text-center">
                    El resultado es un heterodoxo cóctel musical donde impera el interés por el buen gusto y la 
                    preocupación por hacer buena música sin que sea necesario caer en estridencias.
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap justify-center mt-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Blues</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Soul</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Pop-Rock</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Rock Sinfónico</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Granada</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Temas Propios</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ausencia - Tres Coma Catorce */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl mb-12">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Tres Coma Catorce
                </div>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                  Ausencia
                </h3>
                <p className="text-lg text-primary font-medium">Tema Impactante</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Video embed */}
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/BSKMUAiAez4"
                      title="Ausencia - Tres Coma Catorce"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>"Ausencia"</strong> es el segundo tema del dúo <strong>Tres Coma Catorce</strong>, 
                    una obra que explora temas profundos sobre la vida, la libertad, los sueños y las decisiones 
                    que marcan nuestro camino. Una composición que no deja indiferente.
                  </p>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    El videoclip, producido por Grupo Dauro, presenta una narrativa visual impactante que 
                    complementa la intensidad lírica de la canción. Una reflexión sobre la búsqueda de identidad, 
                    el precio de las decisiones y la ausencia que nos transforma.
                  </p>

                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl">
                    <h5 className="font-semibold mb-3">Información del Registro:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Título:</strong> Ausencia - Tres Coma Catorce</li>
                      <li>• <strong>Registro:</strong> SAFECREATIVE</li>
                      <li>• <strong>Identificador:</strong> 2006174448080</li>
                      <li>• <strong>Fecha:</strong> 17 de junio de 2020</li>
                      <li>• <strong>Derechos:</strong> Todos los derechos reservados Grupo Dauro - Dauro Música</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://www.youtube.com/watch?v=BSKMUAiAez4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      <Play className="h-5 w-5" />
                      Ver Videoclip en YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Música Original</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Videoclip</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Composición Propia</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Registro SAFECREATIVE</span>
              </div>
            </div>
          </div>

          {/* Cous Kush - Tres Coma Catorce */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Tres Coma Catorce - Primer Tema
                </div>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                  Cous Kush
                </h3>
                <p className="text-lg text-primary font-medium">La Fusión de Dos Almas</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contenido */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>"Cous Kush"</strong> es la primera canción del dúo granadino <strong>Tres Coma Catorce</strong>, 
                    integrado por <strong>Serbio</strong> y <strong>Montabes</strong>. El grupo nació durante el mes de 
                    enero de 2020 de la mano de Dauro Música.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Su recorrido vital proviene de la fusión de dos almas de gran sensibilidad que se unieron siendo 
                    músicos callejeros. Con un estilo desenfadado y a la vez cautivador, nos muestran la canción más 
                    fresca de su repertorio.
                  </p>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Un soplo de aire fresco que nos hace olvidar por un momento los malos momentos, con una increíble 
                    unión de estilos: <strong>Rap conciencia</strong>, <strong>poético</strong> y <strong>pop</strong>, 
                    mezclados con el clasicismo del violín dominado magistralmente por Serbio y con la potente voz 
                    de barítono de Montabes.
                  </p>

                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl">
                    <h5 className="font-semibold mb-3">El Dúo:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Serbio</strong> - Violín magistral y composición</li>
                      <li>• <strong>Montabes</strong> - Voz de barítono potente</li>
                      <li>• <strong>Origen:</strong> Granada, músicos callejeros</li>
                      <li>• <strong>Formación:</strong> Enero 2020 con Dauro Música</li>
                      <li>• <strong>Estilo:</strong> Rap conciencia, poético y pop con violín</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://www.youtube.com/watch?v=PXr2CWQYgTM" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      <Play className="h-5 w-5" />
                      Ver en YouTube
                    </a>
                  </div>
                </div>

                {/* Video embed */}
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/PXr2CWQYgTM"
                      title="Cous Kush - Tres Coma Catorce"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Rap Conciencia</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Pop</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Violín</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Música Callejera</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Granada</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Primer Tema</span>
              </div>
            </div>
          </div>

          {/* Eres mi ritmo - Alciades Ferran con IA */}
          <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl mb-12">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <span>🤖</span>
                  <span>Creado con Inteligencia Artificial</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                  Eres mi ritmo
                </h3>
                <p className="text-lg text-primary font-medium">Alciades Ferran</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Video embed */}
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/6r74NU6mQFI"
                      title="Eres mi ritmo - Alciades Ferran"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>"Eres mi ritmo"</strong> es una canción de amor, alegría y luz creada con 
                    <strong> inteligencia artificial y sensibilidad humana</strong>. Bajo la voz de 
                    <strong> Alciades Ferran</strong>, una creación artística de Dauro IA, esta obra 
                    une la emoción del arte con la innovación tecnológica.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Cada nota, cada palabra y cada imagen surgen de un diálogo entre humanos y máquinas: 
                    <strong> emoción real guiando la creación digital</strong>. En "Eres mi ritmo", la 
                    inteligencia artificial no sustituye el alma: la amplifica.
                  </p>

                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl">
                    <h5 className="font-semibold mb-3">Producción con IA:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Voz y composición:</strong> Generadas por IA - Alciades Ferran</li>
                      <li>• <strong>Producción artística:</strong> Dauro IA</li>
                      <li>• <strong>Vídeo:</strong> Tecnología IA + dirección humana</li>
                      <li>• <strong>Concepto:</strong> Fusión de arte y tecnología</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <p className="text-sm text-muted-foreground">
                        Si quieres aprender a crear con inteligencia artificial, explorar herramientas 
                        creativas o formar parte de esta nueva era del arte, visita{" "}
                        <a 
                          href="https://www.dauroia.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold"
                        >
                          www.dauroia.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://www.youtube.com/watch?v=6r74NU6mQFI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      <Play className="h-5 w-5" />
                      Ver Videoclip en YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Inteligencia Artificial</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Dauro IA</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Pop</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Innovación</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Alciades Ferran</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Arte + Tecnología</span>
              </div>
            </div>
          </div>
        </div>

        {/* Más proyectos en el archivo */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-muted/50 via-background to-muted/30 p-8 lg:p-12 rounded-3xl border-2 border-border hover:border-primary/30 transition-all duration-300">
            <div className="text-center space-y-6">
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold">
                Más Proyectos Musicales en Nuestro Archivo
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explora más producciones, colaboraciones y proyectos musicales en nuestro archivo histórico. 
                Años de música, artistas y creaciones que han marcado nuestra trayectoria.
              </p>
              <a 
                href="https://grupodauro.wpcomstaging.com/category/dauromusica/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
              >
                <Music className="h-5 w-5" />
                Ver archivo de música
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-12 rounded-3xl border-2 border-primary/20 text-center">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
              ¿Tienes un Proyecto Musical?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Colaboramos con artistas, poetas y creadores para dar vida a proyectos musicales únicos. 
              Cuéntanos tu idea y creemos algo extraordinario juntos.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contáctanos
            </Button>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div id="contact-form" className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-8 text-center">
            Contacta con Nosotros
          </h2>
          <DauroArteContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Musica;
