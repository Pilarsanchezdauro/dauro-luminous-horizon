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
import ServicesContactForm from "@/components/ServicesContactForm";

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-primary/20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-32 left-20 w-3 h-3 bg-primary rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8 animate-fade-in">
            <span className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm border-2 border-primary/40 rounded-full text-primary font-bold text-sm tracking-wider">
              INNOVACIÓN CULTURAL
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-foreground mb-6 animate-fade-in-up leading-tight">
            Nuestros Servicios
          </h1>
          <p className="text-xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto font-light animate-fade-in-up-delayed leading-relaxed">
            Innovación técnica con visión cultural
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up-delayed">
            <div className="w-20 h-1 bg-primary rounded-full" />
            <div className="w-12 h-1 bg-accent rounded-full" />
            <div className="w-8 h-1 bg-primary/60 rounded-full" />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Intro */}
          <div className="max-w-5xl mx-auto mb-16 lg:mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 lg:p-16 rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <Zap className="h-14 w-14 text-primary animate-pulse" />
                  </div>
                  <p className="text-lg lg:text-2xl text-[#111111] leading-relaxed text-center font-light">
                    En <span className="font-bold text-primary">Grupo Cultural Dauro</span> combinamos arte, tecnología y pensamiento para desarrollar proyectos 
                    editoriales, audiovisuales y digitales con <span className="font-semibold text-primary">precisión técnica</span> y <span className="font-semibold text-accent">profundidad estética</span>.
                    Cada servicio está diseñado para unir la inteligencia técnica con la sensibilidad artística.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${isEven ? 'from-primary to-accent' : 'from-accent to-primary'} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                  
                  <div
                    className={`relative ${isEven ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-primary/20' : 'bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 border-accent/30'} border-2 hover:border-primary/50 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 flex flex-col max-h-[380px] overflow-hidden backdrop-blur-sm`}
                  >
                    {/* Animated Background Blobs */}
                    <div className={`absolute ${isEven ? 'top-0 right-0' : 'bottom-0 left-0'} w-40 h-40 ${isEven ? 'bg-primary/15' : 'bg-accent/25'} rounded-full blur-3xl group-hover:bg-primary/30 group-hover:scale-150 transition-all duration-700`} />
                    <div className={`absolute ${isEven ? 'bottom-0 left-0' : 'top-0 right-0'} w-32 h-32 ${isEven ? 'bg-accent/20' : 'bg-primary/15'} rounded-full blur-3xl group-hover:bg-accent/30 group-hover:scale-150 transition-all duration-700`} style={{ transitionDelay: '100ms' }} />
                    
                    <div className="relative z-10">
                      <div className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block mb-4">
                        {service.icon}
                      </div>
                      <h2 className="text-[24px] md:text-[28px] font-bold text-[#111111] mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="text-[17px] md:text-[19px] font-semibold text-primary mb-4">
                        {service.subtitle}
                      </p>

                    <div className="space-y-4 mb-4 overflow-hidden flex-1">
                      <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-primary/10">
                        <h3 className="text-[14px] md:text-[15px] font-bold text-primary mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          Hacemos:
                        </h3>
                        <ul className="space-y-2">
                          {service.hacemos.slice(0, 5).map((item, idx) => (
                            <li key={idx} className="text-[14px] md:text-[15px] font-normal text-[#333333] leading-[1.4] flex items-start gap-2">
                              <span className="text-primary mt-1">▪</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-accent/10">
                        <h3 className="text-[14px] md:text-[15px] font-bold text-accent mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          Aplicaciones:
                        </h3>
                        <ul className="space-y-2">
                          {service.aplicaciones.slice(0, 5).map((item, idx) => (
                            <li key={idx} className="text-[14px] md:text-[15px] font-normal text-[#333333] leading-[1.4] flex items-start gap-2">
                              <span className="text-accent mt-1">▪</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="mt-auto">
                      <AccordionItem value={service.id} className="border-0">
                        <AccordionTrigger className="hover:no-underline p-0 pb-0 [&[data-state=open]>button]:mb-3">
                          <Button
                            className="w-full bg-gradient-to-r from-[#E31B23] to-[#C3131A] hover:from-[#C3131A] hover:to-[#E31B23] text-white font-bold text-[16px] rounded-2xl py-6 px-6 shadow-[0_8px_20px_rgba(227,27,35,0.3)] transition-all duration-300 border-0 hover:scale-105 hover:shadow-[0_12px_30px_rgba(227,27,35,0.4)] group-hover:animate-pulse"
                          >
                            <span className="flex items-center justify-center gap-2">
                              Más información
                              <span className="text-xl">→</span>
                            </span>
                          </Button>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 animate-accordion-down">
                          <div className="relative mt-4">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20" />
                            <div className="relative bg-white/95 p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-primary/20 max-h-[380px] md:max-h-[440px] overflow-y-auto backdrop-blur-sm">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                                <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111]">
                                  {service.title}
                                </h3>
                              </div>
                              <div className="text-[15px] md:text-[17px] font-normal text-[#333333] leading-[1.7] whitespace-pre-line">
                                {service.masInfo}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700 animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 lg:p-16 rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/20 rounded-full animate-pulse">
                    <FileText className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-center mb-4 text-[#111111]">
                  Solicitar información de servicios
                </h2>
                <div className="flex justify-center gap-3 mb-6">
                  <div className="w-16 h-1 bg-primary rounded-full" />
                  <div className="w-10 h-1 bg-accent rounded-full" />
                  <div className="w-6 h-1 bg-primary/60 rounded-full" />
                </div>
                <p className="text-center text-[#555555] text-lg mb-10 max-w-2xl mx-auto">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible
                </p>
                <ServicesContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
