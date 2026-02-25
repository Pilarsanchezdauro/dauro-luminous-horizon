import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video, FileText, Edit, Image, Zap, BookOpen, Music, Palette, BadgeDollarSign, Clapperboard } from "lucide-react";
import ServicesContactForm from "@/components/ServicesContactForm";
import mascotLogo from "@/assets/mascot.png";
import heroDauro from "@/assets/hero-dauro.jpg";
import { SEO } from "@/components/SEO";

const Servicios = () => {
  const services = [
    {
      id: "publicacion",
      icon: <BookOpen className="h-12 w-12 text-primary mb-4" />,
      title: "Edición y Publicación",
      subtitle: "Del manuscrito a la obra final.",
      hacemos: [
        "Evaluación y curaduría editorial",
        "Diseño y maquetación profesional",
        "Corrección de estilo",
        "ISBN y registro legal",
        "Publicación impresa y digital",
        "Distribución global en toda Europa, EE.UU. y Latinoamérica",
      ],
      aplicaciones: [
        "Libros de autor",
        "Ensayos y antologías",
        "Catálogos culturales",
        "Publicaciones institucionales",
      ],
      masInfo: `Acompañamos a autores y proyectos culturales desde el manuscrito hasta la publicación final.
Nuestro proceso editorial combina rigor técnico, criterio estético y gestión profesional del libro.

Cada obra pasa por un flujo completo de:
— Evaluación editorial y curaduría conceptual.
— Corrección de estilo y revisión de contenidos.
— Diseño gráfico, maquetación y preparación de archivos.
— Gestión de ISBN, depósito legal y distribución.
— Publicación en formato impreso, digital y audiolibro.
— Distribución internacional en toda Europa (excepto Reino Unido), EE.UU. y Latinoamérica, con envío local en cada país.

En Grupo Cultural Dauro transformamos manuscritos en obras acabadas con la calidad y profesionalidad que merece cada proyecto literario.`,
    },
    {
      id: "guion",
      icon: <FileText className="h-12 w-12 text-primary mb-4" />,
      title: "Adaptación y Dirección Técnica de Guion",
      subtitle: "Del texto a la imagen.",
      hacemos: [
        "Adaptación de obras a guiones",
        "Guiones literarios y técnicos",
        "Análisis de personajes",
        "Diseño de secuencias y planos",
        "Creación de storyboards",
      ],
      aplicaciones: [
        "Cine y documental",
        "Videoarte y poesía visual",
        "Narrativas experimentales",
        "Obras literarias adaptadas",
      ],
      masInfo: `En Grupo Cultural Dauro, convertimos la palabra en imagen.
Adaptamos obras literarias, guiones previos o ideas conceptuales al lenguaje cinematográfico, definiendo su estructura narrativa, técnica y visual.

Nuestro proceso combina análisis narrativo, dirección artística y planificación técnica para crear una hoja de ruta completa del proyecto.
Desde el concepto hasta el storyboard, cada paso está pensado para que la idea respire coherencia estética y narrativa.

Incluye:
— Adaptación literaria y técnica.
— Diseño narrativo de secuencias y planos.
— Creación de storyboards visuales (manuales o generados con IA).
— Análisis de personajes, ambiente y simbología visual.
— Dirección técnica y estética del guion.

Nuestro objetivo: unir la visión artística con la precisión técnica, haciendo que cada historia se vea antes de ser filmada.`,
    },
    {
      id: "audiovisual",
      icon: <Video className="h-12 w-12 text-primary mb-4" />,
      title: "Producción Audiovisual con IA",
      subtitle: "La creación visual del futuro.",
      hacemos: [
        "Vídeo generativo IA",
        "Escenas y personajes digitales",
        "Montaje asistido algorítmico",
        "Voz y música sintéticas",
        "Postproducción inteligente",
      ],
      aplicaciones: [
        "Proyectos culturales",
        "Videopoesía y arte",
        "Piezas institucionales",
        "Laboratorio creativo",
      ],
      masInfo: `En Grupo Cultural Dauro trabajamos exclusivamente con inteligencia artificial generativa aplicada al audiovisual.
Creamos vídeos, secuencias y composiciones visuales con algoritmos avanzados, guiados por una dirección artística humana.
Nuestra metodología combina la experimentación estética con la ingeniería creativa.

Desarrollamos:
— Videopoesía, videoarte y ensayos visuales.
— Piezas institucionales con enfoque artístico.
— Integraciones audiovisuales en entornos culturales.
— Contenidos editoriales y educativos con IA.

Cada obra es una síntesis entre máquina y sensibilidad humana: una mirada contemporánea al lenguaje de la imagen.`,
    },
    {
      id: "escritura",
      icon: <Edit className="h-12 w-12 text-primary mb-4" />,
      title: "Escritura, Edición y Datos",
      subtitle: "La palabra con método.",
      hacemos: [
        "Redacción técnica y literaria",
        "Edición y corrección",
        "Metadatos (DC, XMP)",
        "Indexación y taxonomías",
        "IA para contenidos",
      ],
      aplicaciones: [
        "Libros y catálogos",
        "Guiones y dossieres",
        "Archivo y preservación",
        "Comunicación cultural",
      ],
      masInfo: `Nos especializamos en la arquitectura del texto: escritura, edición y gestión de información en entornos culturales.
Combinamos precisión lingüística con sistemas de IA que amplifican la capacidad de análisis y catalogación.

Incluye:
— Redacción literaria, técnica y conceptual.
— Edición y corrección profesional.
— Creación de taxonomías y estructuras de datos.
— Indexación e integración de metadatos (Dublin Core, IPTC, XMP).
— Generación y validación de contenidos con IA supervisada.

En Dauro, la palabra no solo comunica: organiza, preserva y genera conocimiento.`,
    },
    {
      id: "diseno",
      icon: <Image className="h-12 w-12 text-primary mb-4" />,
      title: "Imagen, Diseño e Identidad Visual",
      subtitle: "Estética con precisión técnica.",
      hacemos: [
        "Branding editorial",
        "Dirección de arte",
        "Retoque y restauración",
        "Impresión y web",
        "Sistemas visuales",
      ],
      aplicaciones: [
        "Portadas y colecciones",
        "Catálogos y revistas",
        "Exposición y web",
        "Material institucional",
      ],
      masInfo: `Diseñamos sistemas visuales con precisión técnica y coherencia cultural.
Nuestro enfoque une la estética editorial, la ingeniería visual y la dirección de arte contemporánea.

Desarrollamos:
— Identidad visual y branding cultural.
— Diseño de portadas, catálogos y colecciones.
— Restauración y digitalización avanzada de imagen.
— Producción gráfica optimizada para impresión y web.
— Integración visual entre arte, diseño e IA.

Cada imagen está pensada para hablar el idioma de la cultura: belleza con estructura, arte con método.`,
    },
    {
      id: "innovacion",
      icon: <Zap className="h-12 w-12 text-primary mb-4" />,
      title: "Innovación Cultural y Tecnología",
      subtitle: "IA aplicada a la cultura.",
      hacemos: [
        "Flujos de trabajo con IA",
        "Automatización creativa",
        "Análisis predictivo",
        "Integración DAM/CMS",
        "Consultoría transformación",
      ],
      aplicaciones: [
        "Editorial y museos",
        "Centros culturales",
        "Archivos digitales",
        "Estrategia de datos",
      ],
      masInfo: `Investigamos e implementamos tecnologías emergentes aplicadas a la cultura y las artes.
Transformamos procesos editoriales, visuales y de gestión en entornos automatizados, analíticos y creativos.

Incluye:
— Modelos predictivos y analítica cultural con IA.
— Automatización de edición, indexación y archivado.
— Integración de sistemas DAM/CMS.
— Consultoría en transformación digital cultural.
— Desarrollo de metodologías híbridas entre arte y ciencia de datos.

Nuestro objetivo: que la tecnología no sustituya la creación, sino que la expanda.`,
    },
    {
      id: "tasacion-arte",
      icon: <BadgeDollarSign className="h-12 w-12 text-primary mb-4" />,
      title: "Tasación y Valoración de Obras de Arte",
      subtitle: "El valor justo de cada obra.",
      hacemos: [
        "Tasación pericial de obras",
        "Valoración de colecciones",
        "Informes técnicos certificados",
        "Autenticación de piezas",
        "Asesoría en adquisiciones",
      ],
      aplicaciones: [
        "Seguros y herencias",
        "Compraventa de arte",
        "Colecciones privadas",
        "Instituciones culturales",
      ],
      masInfo: `Ofrecemos servicios profesionales de tasación y valoración de obras de arte con rigor técnico y conocimiento del mercado.
Nuestros peritos cualificados emiten informes certificados reconocidos por aseguradoras, entidades financieras y organismos oficiales.

Incluye:
— Tasación pericial de pintura, escultura y obra gráfica.
— Valoración integral de colecciones artísticas.
— Informes técnicos para seguros, herencias y donaciones.
— Autenticación y certificación de obras.
— Asesoramiento en compraventa y adquisición de arte.

Cada valoración combina análisis técnico, conocimiento histórico y visión de mercado para establecer el valor justo de cada pieza.`,
    },
    {
      id: "produccion-musical",
      icon: <Music className="h-12 w-12 text-primary mb-4" />,
      title: "Producción Musical",
      subtitle: "Del concepto al sonido final.",
      hacemos: [
        "Producción de álbumes y singles",
        "Composición y arreglos",
        "Grabación profesional",
        "Mezcla y masterización",
        "Distribución digital",
      ],
      aplicaciones: [
        "Artistas emergentes",
        "Bandas sonoras",
        "Proyectos culturales",
        "Música para audiovisual",
      ],
      masInfo: `En Dauro Free Productions desarrollamos proyectos musicales completos, desde la idea inicial hasta la distribución final.
Trabajamos con artistas y proyectos culturales que buscan una producción profesional con identidad propia.

Incluye:
— Producción integral de álbumes, EP y singles.
— Composición original y arreglos musicales.
— Grabación en estudio profesional.
— Mezcla, masterización y postproducción de audio.
— Gestión de distribución en plataformas digitales.

Cada proyecto musical recibe un tratamiento artístico y técnico que respeta la visión del artista mientras alcanza los estándares de calidad profesional.`,
    },
    {
      id: "gestion-arte",
      icon: <Palette className="h-12 w-12 text-primary mb-4" />,
      title: "Gestión y Venta de Obras de Arte",
      subtitle: "Conectamos arte y coleccionistas.",
      hacemos: [
        "Intermediación artística",
        "Gestión de ventas",
        "Consignación de obras",
        "Asesoría a coleccionistas",
        "Promoción de artistas",
      ],
      aplicaciones: [
        "Galerías y marchantes",
        "Coleccionistas privados",
        "Artistas contemporáneos",
        "Subastas y ferias",
      ],
      masInfo: `Facilitamos la conexión entre artistas, coleccionistas y el mercado del arte con un enfoque profesional y transparente.
Gestionamos la venta de obras con criterio estético, conocimiento del mercado y ética profesional.

Incluye:
— Intermediación en compraventa de obras de arte.
— Gestión de consignaciones y depósitos.
— Asesoramiento a coleccionistas en adquisiciones.
— Promoción y posicionamiento de artistas.
— Participación en ferias, subastas y eventos del sector.

Nuestro objetivo es generar valor para artistas y coleccionistas, construyendo relaciones duraderas basadas en la confianza y el conocimiento.`,
    },
    {
      id: "produccion-audiovisual",
      icon: <Clapperboard className="h-12 w-12 text-primary mb-4" />,
      title: "Producción Audiovisual",
      subtitle: "Historias que cobran vida.",
      hacemos: [
        "Producción de cortometrajes",
        "Documentales culturales",
        "Videoclips musicales",
        "Contenido corporativo",
        "Postproducción profesional",
      ],
      aplicaciones: [
        "Festivales de cine",
        "Proyectos culturales",
        "Instituciones y empresas",
        "Artistas y músicos",
      ],
      masInfo: `En Dauro Free Productions desarrollamos proyectos audiovisuales con visión artística y rigor técnico.
Desde la preproducción hasta la entrega final, cada proyecto recibe un tratamiento cinematográfico profesional.

Incluye:
— Producción de cortometrajes de ficción y documental.
— Realización de documentales culturales e históricos.
— Videoclips y contenido visual para artistas.
— Vídeos corporativos e institucionales.
— Postproducción, colorimetría y efectos visuales.

Cada producción combina narrativa visual, dirección artística y técnica profesional para crear piezas audiovisuales con identidad y calidad.`,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Servicios Creativos y Editoriales | Grupo Cultural Dauro"
        description="Servicios profesionales para autores y creadores: edición, maquetación, diseño de portadas, guionismo, producción audiovisual, IA creativa y tasación de arte."
        keywords="servicios editoriales, edición de libros, maquetación, diseño portadas, corrección estilo, ISBN, publicar libro, autoedición, producción audiovisual, tasación arte, IA creativa"
        url="https://grupodauro.com/servicios"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Servicios Creativos - Grupo Cultural Dauro",
          "url": "https://grupodauro.com/servicios",
          "description": "Servicios profesionales de edición, diseño, producción audiovisual, IA creativa y tasación de arte para autores y creadores.",
          "provider": {
            "@type": "Organization",
            "name": "Grupo Cultural Dauro",
            "url": "https://grupodauro.com"
          },
          "areaServed": [
            { "@type": "Place", "name": "España" },
            { "@type": "Place", "name": "Europa" },
            { "@type": "Place", "name": "Latinoamérica" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Creativos",
            "itemListElement": services.map(s => ({
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": s.title, "description": s.subtitle }
            }))
          }
        }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroDauro})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Innovación técnica con visión cultural
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 lg:px-10 py-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-20 right-12 w-20 h-20 opacity-[0.03] animate-float-diagonal pointer-events-none"
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-96 left-20 w-16 h-16 opacity-[0.02] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '3s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-64 right-1/4 w-24 h-24 opacity-[0.04] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '6s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-20 left-1/3 w-20 h-20 opacity-[0.025] animate-float-circle pointer-events-none"
          style={{ animationDelay: '9s' }}
        />
        
        <div className="max-w-7xl mx-auto">
          {/* Intro with background image */}
          <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/public/projects/grupo-dauro.png')] bg-cover bg-center opacity-5" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
              <p className="text-base lg:text-lg text-[#333333] leading-relaxed text-center relative z-10">
                En Grupo Cultural Dauro combinamos arte, tecnología y pensamiento para desarrollar proyectos 
                editoriales, audiovisuales y digitales con precisión técnica y profundidad estética.
                Cada servicio está diseñado para unir la inteligencia técnica con la sensibilidad artística.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  className={`group ${isEven ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-primary/20' : 'bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 border-accent/30'} border-2 hover:border-primary/40 rounded-3xl p-6 md:p-8 shadow-[0_6px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] flex flex-col max-h-[340px] relative overflow-hidden`}
                >
                  <div className={`absolute ${isEven ? 'top-0 right-0' : 'bottom-0 left-0'} w-32 h-32 ${isEven ? 'bg-primary/10' : 'bg-accent/20'} rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300`} />
                  <div className="relative z-10">
                    <div className="group-hover:scale-110 transition-transform duration-300 inline-block">
                      {service.icon}
                    </div>
                    <h2 className="text-[22px] md:text-[26px] font-bold text-[#111111] mb-2 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-[16px] md:text-[18px] font-semibold text-primary mb-3">
                      {service.subtitle}
                    </p>

                    <div className="space-y-[10px] mb-3 overflow-hidden flex-1">
                      <div>
                        <h3 className="text-[13px] md:text-[14px] font-semibold text-[#111111] mb-1">
                          Hacemos:
                        </h3>
                        <ul className="space-y-[4px]">
                          {service.hacemos.slice(0, 5).map((item, idx) => (
                            <li key={idx} className="text-[14px] md:text-[15px] font-normal text-[#333333] leading-[1.35]">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[13px] md:text-[14px] font-semibold text-[#111111] mb-1">
                          Aplicaciones:
                        </h3>
                        <ul className="space-y-[4px]">
                          {service.aplicaciones.slice(0, 5).map((item, idx) => (
                            <li key={idx} className="text-[14px] md:text-[15px] font-normal text-[#333333] leading-[1.35]">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="mt-auto">
                      <AccordionItem value={service.id} className="border-0">
                        <AccordionTrigger className="hover:no-underline p-0 pb-0 [&[data-state=open]>button]:mb-3">
                          <Button
                            className="w-full bg-[#E31B23] hover:bg-[#C3131A] text-white font-bold text-[15px] rounded-[10px] py-[10px] px-4 shadow-[0_4px_10px_rgba(227,27,35,0.22)] transition-all duration-[200ms] border-0 hover:scale-105"
                          >
                            Más información
                          </Button>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 animate-accordion-down">
                          <div className="bg-white/95 p-5 md:p-6 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E9E9E9] max-h-[380px] md:max-h-[440px] overflow-y-auto backdrop-blur-sm">
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#111111] mb-3">
                              {service.title}
                            </h3>
                            <div className="text-[15px] md:text-[16px] font-normal text-[#333333] leading-[1.5] whitespace-pre-line">
                              {service.masInfo}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <h2 
              className="text-3xl lg:text-4xl font-playfair font-bold text-center mb-4 relative z-10"
              style={{ color: '#111111' }}
            >
              Solicitar información de servicios
            </h2>
            <p className="text-center text-gray-600 mb-8 relative z-10">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible
            </p>
            <div className="relative z-10">
              <ServicesContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
