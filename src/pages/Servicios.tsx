import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video, FileText, Edit, Image, Zap, BookOpen } from "lucide-react";

const Servicios = () => {
  const services = [
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

En Grupo Cultural Dauro transformamos manuscritos en obras acabadas con la calidad y profesionalidad que merece cada proyecto literario.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navigation />

      <main className="container mx-auto px-6 lg:px-10 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-4 text-[#111111]">
              Nuestros Servicios
            </h1>
            <p className="text-lg lg:text-xl text-[#333333] mb-3 font-semibold">
              Innovación técnica con visión cultural.
            </p>
            <p className="text-base lg:text-lg text-[#333333] max-w-4xl mx-auto leading-relaxed">
              En Grupo Cultural Dauro combinamos arte, tecnología y pensamiento para desarrollar proyectos 
              editoriales, audiovisuales y digitales con precisión técnica y profundidad estética.
              Cada servicio está diseñado para unir la inteligencia técnica con la sensibilidad artística.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E9E9E9] rounded-[14px] p-[18px] md:p-[22px] shadow-[0_6px_18px_rgba(0,0,0,0.05)] flex flex-col max-h-[340px]"
              >
                {service.icon}
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
                        className="w-full bg-[#E31B23] hover:bg-[#C3131A] text-white font-bold text-[15px] rounded-[10px] py-[10px] px-4 shadow-[0_4px_10px_rgba(227,27,35,0.22)] transition-all duration-[200ms] border-0"
                      >
                        Más información
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 animate-accordion-down">
                      <div className="bg-white p-5 md:p-6 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E9E9E9] max-h-[380px] md:max-h-[440px] overflow-y-auto">
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
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
