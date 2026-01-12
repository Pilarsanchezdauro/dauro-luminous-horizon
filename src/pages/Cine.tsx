import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Film, Video, Award, Users, PenTool, Clapperboard, BookOpen, ExternalLink, Newspaper, Scissors, FileText, Tv } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import cineBg from "@/assets/cine-bg.jpg";
import mascotLogo from "@/assets/mascot.png";
import DauroArteContactForm from "@/components/DauroArteContactForm";

const Cine = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Dauro Cine",
    "url": "https://grupodauro.com/grupo-dauro/cine",
    "description": "Guionismo para cine y televisión, desarrollo de series, preproducción audiovisual y narrativas innovadoras"
  };

  const pressLinks = [
    {
      title: "El Mexicano",
      url: "https://el-mexicano.com/internacional/nombran-a-academico-de-la-uag-como-director-de-editorial-espanola/2184468"
    },
    {
      title: "La Región Tam",
      url: "https://laregiontam.com.mx/2023/08/05/nombran-a-academico-de-la-uag-como-director-de-editorial-espanola/"
    },
    {
      title: "Tijuana Informativo",
      url: "https://tijuanainformativo.info/index.php/noticias-de-impacto-nacional-economicas-politica-y-social/item/158201-nombran-a-academico-de-la-uag-como-director-de-editorial-espanola"
    }
  ];
  return (
    <div className="min-h-screen">
      <SEO
        title="Dauro Cine - Guionistas de Cine y TV | Series y Preproducción Audiovisual"
        description="Guionistas especializados en series de televisión, cine y desarrollo de proyectos audiovisuales. Expertos en preproducción, adaptación literaria y edición. Bajo la supervisión de Juan José Porto."
        keywords="guionistas cine, guion series televisión, preproducción audiovisual, adaptación literaria cine, desarrollo series TV, Juan José Porto, guion cinematográfico"
        url="https://grupodauro.com/grupo-dauro/cine"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cineBg})`,
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Cine
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Guionistas de cine y televisión · Especialistas en series y preproducción audiovisual
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
        
        {/* Intro - Guionismo */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/public/projects/reinas-cortometraje.png')] bg-cover bg-center opacity-[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
              <PenTool className="w-8 h-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-center">
                Guionistas de Cine y Televisión
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10 mb-4">
              Somos <strong className="text-foreground">guionistas especializados en series de televisión y cine</strong>, 
              con amplia experiencia en el desarrollo de narrativas complejas y adaptaciones literarias. 
              Nuestro equipo interviene en todas las fases de la <strong className="text-foreground">preproducción</strong>: 
              desde la conceptualización inicial hasta el guion técnico final.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center relative z-10">
              Además, participamos en la <strong className="text-foreground">edición y postproducción narrativa</strong>, 
              asegurando que la visión del proyecto se mantenga fiel desde la página hasta la pantalla. 
              No intervenimos en la dirección ni la grabación, permitiéndonos enfocarnos exclusivamente 
              en lo que mejor sabemos hacer: <strong className="text-primary">contar historias que cautivan</strong>.
            </p>
          </div>
        </div>

        {/* Director Section - Juan José Porto */}
        <section className="mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                Dirección Creativa
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Los proyectos de Dauro Cine están supervisados por un referente del cine español
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Photo */}
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <div className="relative">
                    <img 
                      src="/dauro-cine-director.jpg" 
                      alt="Juan José Porto - Director Creativo de Dauro Cine"
                      className="w-64 h-80 object-cover object-top rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
                      <p className="text-white font-playfair font-bold text-lg">Juan José Porto</p>
                      <p className="text-white/80 text-sm">Supervisor Creativo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Juan José Porto</strong> es un profesional polifacético con más de cinco décadas de trayectoria en el periodismo, el cine y la literatura. <strong className="text-foreground">Pionero de la comedia nostálgica en el cine español</strong> con "El último guateque" (1978), ha dirigido <strong className="text-primary">14 largometrajes</strong> y trabajado como guionista con directores como León Klimovsky y John Gilling.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Como guionista, ha escrito para cine obras como "Trauma", "El francotirador", "La cruz del diablo" o "Jenaro, el de los catorce" (con Alfredo Landa). Es también reconocido biógrafo de <strong className="text-foreground">Luis Buñuel</strong> y <strong className="text-foreground">Gustavo Adolfo Bécquer</strong>, con numerosos ensayos publicados.
                    </p>
                  </div>
                </Card>

                {/* Awards & Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/30 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Premio Luis Buñuel</p>
                        <p className="text-sm text-muted-foreground">Nuevos valores del cine (ex aequo con José Luis Garci)</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/30 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Newspaper className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Premio Mariano José de Larra</p>
                        <p className="text-sm text-muted-foreground">Premio Nacional de Periodismo</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/30 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Film className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">14 Largometrajes</p>
                        <p className="text-sm text-muted-foreground">Como director cinematográfico</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/30 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Premio Benito Pérez Galdós</p>
                        <p className="text-sm text-muted-foreground">Premio Nacional de Novela por "La víbora"</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Series en Desarrollo */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
              Series en Desarrollo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Actualmente trabajamos en la adaptación de dos novelas para formato serie
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Serie 1 - El hidalgo don Rodrigo */}
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src="/projects/don-rodrigo-cervantes.png" 
                  alt="El hidalgo don Rodrigo de Cervantes - Serie en desarrollo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tv className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Serie de TV</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-3">
                  El hidalgo don Rodrigo de Cervantes
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Adaptación de la novela homónima de <strong className="text-foreground">Francisco del Valle</strong>. 
                  Una épica historia ambientada en el Siglo de Oro español que sigue la vida de Rodrigo de Cervantes, 
                  padre del ilustre Miguel de Cervantes, en su lucha por la dignidad y el honor familiar.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Drama histórico</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Siglo de Oro</span>
                  <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-sm rounded-full">En desarrollo</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tienda/el-hidalgo-don-rodrigo-de-cervantes" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Ver novela original
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Serie 2 - Latido */}
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 group">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src="/products/latido-hq.jpg" 
                  alt="Latido - Serie en desarrollo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tv className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Serie de TV</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-3">
                  Latido
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Adaptación de la novela de <strong className="text-foreground">Carmen Alcaide</strong>. 
                  Una historia íntima y emotiva que explora las profundidades del amor, la pérdida y la resiliencia 
                  humana a través de personajes complejos y situaciones que tocan el corazón.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Drama</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Romance</span>
                  <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-sm rounded-full">En desarrollo</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tienda/latido-apasionadamente-vuestro" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Ver novela original
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-3xl border-2 border-primary/10">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">15+</p>
            <p className="text-sm text-muted-foreground">Producciones</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">12+</p>
            <p className="text-sm text-muted-foreground">Premios</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">30+</p>
            <p className="text-sm text-muted-foreground">Festivales</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">35+</p>
            <p className="text-sm text-muted-foreground">Colaboradores</p>
          </div>
        </div>

        {/* Services - Enfocados en guionismo y preproducción */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Nos especializamos en las fases creativas y narrativas del proceso audiovisual
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <FileText className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Guion</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Guiones originales, adaptaciones literarias y series de TV
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Clapperboard className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Preproducción</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Desarrollo creativo, storyboard y planificación narrativa
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Scissors className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Edición</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Edición narrativa y supervisión de montaje
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <Tv className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Series TV</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Desarrollo de formatos seriales y biblia de serie
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Proyectos destacados
          </h2>
          
          <div className="space-y-12">
            {/* Proyecto 1 - Reinas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/projects/reinas-poster.png" 
                  alt="Reinas - Cortometraje" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div>
                <h3 className="text-3xl font-playfair font-bold mb-4">
                  Reinas
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Tres mujeres que, tras sucesivos fracasos y excesos, terminan "coronadas" por la vida. 
                  En un ambiente de fiesta permanente donde sus propias miserias brillan incluso más que las luces de neón, 
                  el cortometraje utiliza la ironía y el drama para retratar la vulnerabilidad y las contradicciones de sus protagonistas, 
                  explorando temas como el fracaso, los sueños incumplidos y la supervivencia emocional.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  Con Virtudes Olvera (actriz y guionista). Seleccionado en el Festival de Terror de Sabadell y otros certámenes de cine independiente.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Drama
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Independiente
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Cortometraje
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  asChild
                >
                  <a href="https://cortosdemetraje.com/cortometrajes/reinas-2/" target="_blank" rel="noopener noreferrer">Ver más</a>
                </Button>
              </div>
            </div>

            {/* Proyecto 2 - Reinvention */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/projects/reinvention-poster.png" 
                  alt="Reinvention - Cortometraje" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="lg:order-1">
                <h3 className="text-3xl font-playfair font-bold mb-4">
                  Reinvention K365D
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Dirigido por Pepe Luis Pareja y producido por Chichinagranaina Producciones en asociación con Sauro Productions (ahora Grupo Dauro). 
                  La trama gira en torno a Carmenchu y Emilio, una pareja cuya relación está totalmente acabada, aunque ninguno se atreve a ponerle fin. 
                  Transitan su día a día en una rutina vacía, marcada por horas frente a la televisión, adicción al móvil y conflictos constantes.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  Un ruido ensordecedor sacude sus vidas, actuando como detonante de posibles cambios. 
                  Mezcla drama y humor cotidiano, mostrando la dificultad de afrontar rupturas y el miedo al cambio. 
                  Nominado a Mejor Actriz en el Festival de Cine de Benagalbón.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Drama
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Humor
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Cortometraje
                  </span>
                </div>
                <Button 
                  variant="outline"
                  asChild
                >
                  <a href="https://youtu.be/0Slt7Myc4bA" target="_blank" rel="noopener noreferrer">Ver trailer</a>
                </Button>
              </div>
            </div>

            {/* Proyecto 3 - El Día */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/projects/el-dia.png" 
                  alt="El Día - Largometraje" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div>
                <h3 className="text-3xl font-playfair font-bold mb-4">
                  El Día
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Dirigida por Tao Mijares y producida por Tao Producciones SA de CV en colaboración con Grupo Dauro. 
                  Se proyectó como parte del lanzamiento de Sauro Productions y tuvo su estreno internacional online con Grupo Dauro. 
                  La historia sigue a Lorena atrapada en un "poema urbano" durante 24 horas, como metáfora de la vida contemporánea 
                  y símbolo de libertad y humanidad.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  Lorena va cerrando olvidos, rememorando recuerdos y enfrentándose a los retos de cada instante, explorando 
                  los miedos, amores perdidos y el desarraigo. La obra reflexiona sobre cómo la vida se construye a partir de 
                  lo que amamos y lo que la sociedad nos arrebata. Publicada también como libro por Dauro Ediciones (ISBN: 9788494783098).
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  <strong>Datos técnicos:</strong> Duración 1h 42min | México, 2009 | Protagonista: Juliana Guajardo | 
                  Seleccionada en festivales internacionales de India, Colombia, EE.UU., Francia y México, ganando múltiples premios 
                  incluyendo Mejor Edición, Mejor Música y Mejor Película.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Drama
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Experimental
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Largometraje
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  asChild
                >
                  <a href="https://youtu.be/4_6CzclR7GU?si=IOoXfCVl-YmczIkD" target="_blank" rel="noopener noreferrer">Ver trailer</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                ¿Tienes un proyecto audiovisual?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trabajamos con directores, productores y creadores de contenido. 
                Cuéntanos tu idea y exploremos cómo hacerla realidad.
              </p>
            </div>
            <DauroArteContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cine;
