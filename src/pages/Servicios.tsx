import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Edit, Image, Zap, BookOpen, Music, Palette, BadgeDollarSign } from "lucide-react";
import ServicesContactForm from "@/components/ServicesContactForm";
import mascotLogo from "@/assets/mascot.png";
import heroDauro from "@/assets/hero-dauro.jpg";
import { SEO } from "@/components/SEO";

const Servicios = () => {
  // Permite enlazar a una ficha concreta, p. ej. /servicios#marca-artista
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(t);
  }, [hash]);

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
      title: "Guion y Producción Ejecutiva",
      subtitle: "Del texto a la imagen.",
      hacemos: [
        "Guion literario",
        "Guion técnico",
        "Adaptación de obras a guion",
        "Biblia, escaleta y dossier",
        "Apoyo en producción ejecutiva",
      ],
      aplicaciones: [
        "Series y largometrajes",
        "Documental",
        "Obras literarias adaptadas",
        "Proyectos en desarrollo",
      ],
      masInfo: `Escribimos el guion y acompañamos al proyecto mientras se levanta.

No somos productora: no rodamos ni financiamos. Lo que aportamos es el texto y la gestión del desarrollo.

Guion literario y guion técnico:
— Adaptación de novelas y obras propias al formato audiovisual.
— Guion literario: estructura, tramas, personajes y diálogos.
— Guion técnico: secuencias, planos, continuidad y notas de dirección.
— Biblia de serie, escaleta, dossier y ficha técnica.

Producción ejecutiva:
— Preparación del dossier con el que el proyecto se presenta.
— Planificación de fases, calendario y necesidades de cada etapa.
— Interlocución con la productora que asume la inversión y seguimiento del desarrollo.

La productora produce y financia; nosotros ponemos el guion y llevamos la coordinación ejecutiva.`,
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
      enlace: { to: "/solicitar-portada", label: "Solicita el diseño de la cubierta de tu libro" },
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
      title: "Tasación de Obras de Arte y Joyas",
      subtitle: "El valor de la obra, por escrito.",
      hacemos: [
        "Tasación de obras de arte",
        "Tasación de joyas",
        "Valoración de colecciones",
        "Informes técnicos y periciales",
        "Asesoría en compra y venta",
      ],
      aplicaciones: [
        "Procedimientos judiciales",
        "Seguros y herencias",
        "Compraventa de arte",
        "Colecciones privadas",
      ],
      masInfo: `Tasamos obras y colecciones y entregamos el informe por escrito y firmado, con la metodología a la vista: descripción de la pieza, estado de conservación, comparables de mercado y conclusión de valor.

Las tasaciones las firma Pilar Sánchez, perito judicial, n.º de colegiado 618 en la Asociación Española de Peritos Judiciales (AEPEJU), y máster en tasación de obras de arte y joyas por el Ateneo de Argentina.

Incluye:
— Tasación de pintura, escultura y obra gráfica.
— Tasación de joyas, alta joyería y piezas de colección.
— Valoración de colecciones completas.
— Informes periciales para procedimientos judiciales.
— Informes para seguros, herencias, donaciones y reparto de bienes.
— Estudio técnico de la pieza cuando el encargo lo requiere.
— Asesoramiento en la compra y en la venta.

Si la obra necesita un estudio de autoría que va más allá de la tasación, te lo decimos y se deriva al especialista que corresponda.`,
    },
    {
      id: "marca-artista",
      icon: <Music className="h-12 w-12 text-primary mb-4" />,
      title: "Producción Musical con IA y Marca de Artista",
      subtitle: "De tu grabación a la canción publicada.",
      hacemos: [
        "Producción musical con IA",
        "Mezcla, máster y lanzamiento",
        "Marca e identidad del artista",
        "Videoclips con IA y portadas",
        "Canciones por encargo con tu voz digital",
      ],
      aplicaciones: [
        "Artistas y cantantes",
        "Lanzamiento de single o álbum",
        "Empresas y marcas",
        "Celebraciones y eventos",
      ],
      masInfo: `Producimos tu música con inteligencia artificial a partir de tu propia grabación, la publicamos y construimos la imagen que la acompaña. El trabajo se hace en línea.

No somos sello discográfico: no fichamos artistas ni seleccionamos maquetas. Trabajamos por encargo, con cada artista que nos lo pide.

Producción musical con IA, a partir de tu grabación:
— Base y arreglo.
— Voz sintetizada a partir de tu voz.
— Mezcla y máster.
— Gestión técnica del lanzamiento: distribuidora y perfiles de artista en las plataformas.

Marca de artista:
— Identidad del artista: nombre, concepto y aplicación a todos los soportes.
— Logotipo y sus aplicaciones.
— Web del artista y textos de presentación.
— Material visual y presencia en redes.
— Videoclips con inteligencia artificial y dirección artística propia.
— Portadas de single, EP y álbum.
— Si lo pides, videoclip rodado contigo y sesión de fotos, con profesionales externos que contratamos y coordinamos.

Canciones por encargo con tu voz digital:
Con tu autorización, creamos canciones para empresas y eventos con tu voz digital: sintonías, himnos, canciones corporativas o de celebración. Los ingresos de cada encargo se reparten contigo en las condiciones que se pactan por escrito.

No hacemos conciertos, actuaciones en directo ni eventos presenciales. Lo único que se hace fuera de línea es el rodaje del videoclip y la sesión de fotos, cuando el artista los pide.

En nuestra sección de música están los videoclips y las piezas ya publicadas por Dauro Música.`,
      enlace: { to: "/grupo-dauro/musica", label: "Ver Dauro Música: proyectos y preguntas frecuentes" },
    },
    {
      id: "gestion-arte",
      icon: <Palette className="h-12 w-12 text-primary mb-4" />,
      title: "Gestión y Venta de Obras de Arte",
      subtitle: "Entre quien vende y quien compra.",
      hacemos: [
        "Intermediación en la venta",
        "Valoración previa",
        "Asesoría a coleccionistas",
        "Promoción de artistas",
        "Documentación de la operación",
      ],
      aplicaciones: [
        "Galerías y marchantes",
        "Coleccionistas privados",
        "Artistas contemporáneos",
        "Herencias y reparto de bienes",
      ],
      masInfo: `Ponemos en contacto a quien vende con quien compra y llevamos la operación hasta el final.

Incluye:
— Intermediación en la compraventa de obra.
— Valoración previa, para salir al mercado con un precio sostenible.
— Asesoramiento a coleccionistas en sus adquisiciones.
— Promoción de los artistas a los que representamos.
— Documentación de la operación: procedencia, certificados y factura.

Trabajamos por encargo, y la comisión se pacta por escrito antes de empezar.`,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Servicios Creativos y Editoriales | Grupo Cultural Dauro"
        description="Servicios profesionales para autores y creadores: edición, maquetación, diseño de portadas, guion literario y técnico, producción ejecutiva, producción musical con IA, marca de artista, videoclips y tasación de obras de arte y joyas."
        keywords="servicios editoriales, edición de libros, maquetación, diseño portadas, corrección estilo, ISBN, publicar libro, guion literario, guion técnico, producción ejecutiva, producción musical con IA, mezcla y máster, voz digital, videoclips, tasación de arte, tasación de joyas, perito judicial"
        url="https://www.grupodauro.com/servicios"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Servicios Creativos - Grupo Cultural Dauro",
          "url": "https://www.grupodauro.com/servicios",
          "description": "Servicios profesionales de edición, diseño, guion y producción ejecutiva, producción musical con IA, marca de artista, videoclips y tasación de obras de arte y joyas para autores y creadores.",
          "provider": {
            "@type": "Organization",
            "name": "Grupo Cultural Dauro",
            "url": "https://www.grupodauro.com"
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
                  id={service.id}
                  className={`scroll-mt-28 group ${isEven ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-primary/20' : 'bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 border-accent/30'} border-2 hover:border-primary/40 rounded-3xl p-6 md:p-8 shadow-[0_6px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] flex flex-col max-h-[340px] relative overflow-hidden`}
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
                        <AccordionTrigger className="hover:no-underline p-0 pb-0 [&[data-state=open]>span]:mb-3">
                          <span
                            className="w-full inline-flex items-center justify-center bg-[#E31B23] hover:bg-[#C3131A] text-white font-bold text-[15px] rounded-[10px] py-[10px] px-4 shadow-[0_4px_10px_rgba(227,27,35,0.22)] transition-all duration-[200ms] border-0 hover:scale-105"
                          >
                            Más información
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 animate-accordion-down">
                          <div className="bg-white/95 p-5 md:p-6 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E9E9E9] max-h-[380px] md:max-h-[440px] overflow-y-auto backdrop-blur-sm">
                            <h3 className="text-[20px] md:text-[22px] font-bold text-[#111111] mb-3">
                              {service.title}
                            </h3>
                            <div className="text-[15px] md:text-[16px] font-normal text-[#333333] leading-[1.5] whitespace-pre-line">
                              {service.masInfo}
                            </div>
                            {service.enlace && (
                              <Link
                                to={service.enlace.to}
                                className="inline-block mt-4 text-[15px] font-semibold text-[#E31B23] hover:underline"
                              >
                                {service.enlace.label} →
                              </Link>
                            )}
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
