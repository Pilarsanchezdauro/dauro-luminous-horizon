import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Shield,
  BookOpen,
  Palette,
  FileText,
  Truck,
  Smartphone,
  ShoppingBag,
  Award,
  GraduationCap,
  Microscope,
  FlaskConical,
  Check,
  Send,
  Package,
  FileCheck,
  Sparkles,
  Stethoscope,
  Cog,
  BookMarked,
  Gavel,
  BarChart3,
  TestTube,
  Brush,
  Globe,
  ExternalLink,
  Newspaper,
  Users,
  Camera,
  User,
  Search,
  FileWarning,
  BookCheck,
  PenTool,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const SCIENTIFIC_BRANCHES = [
  { name: "Ciencias de la Salud", icon: Stethoscope },
  { name: "Ingenierías", icon: Cog },
  { name: "Ciencias Sociales", icon: Users },
  { name: "Humanidades", icon: BookMarked },
  { name: "Ciencias Jurídicas", icon: Gavel },
  { name: "Ciencias Económicas", icon: BarChart3 },
  { name: "Ciencias Experimentales", icon: TestTube },
  { name: "Arte y Diseño", icon: Brush },
];

const INCLUDED_SERVICES = [
  { text: "Maquetación académica profesional", icon: BookOpen },
  { text: "Diseño de portada personalizado", icon: Palette },
  { text: "ISBN editorial y depósito legal", icon: FileText },
  { text: "Distribución Libros.cc y Logista", icon: Truck },
  { text: "Formato ebook incluido", icon: Smartphone },
  { text: "Alta en Amazon, Casa del Libro, FNAC", icon: ShoppingBag },
  { text: "Revisión científica por expertos + IA", icon: Brain },
  { text: "Sello Académico Dauro Ciencia", icon: Award },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Envía tu manuscrito",
    description: "Rellena el formulario con tu trabajo académico",
    icon: Send,
  },
  {
    step: 2,
    title: "Evaluación inicial",
    description: "Analizamos tu propuesta con nuestro método IA",
    icon: Brain,
  },
  {
    step: 3,
    title: "Propuesta personalizada",
    description: "Te contactamos con opciones adaptadas a tu proyecto",
    icon: FileCheck,
  },
  {
    step: 4,
    title: "Edición y diseño",
    description: "Trabajamos juntos en tu publicación",
    icon: BookOpen,
  },
  {
    step: 5,
    title: "Publicación y distribución",
    description: "Tu obra disponible en todo el mundo",
    icon: Package,
  },
];

const WHY_DAURO = [
  "Más de 1.000 libros publicados",
  "26 años de experiencia editorial",
  "Distribución en +4.000 librerías",
  "Revisión científica especializada",
  "Certificado válido para CV académico",
  "Atención personalizada",
  "Trato directo con editores profesionales",
  "Diseño cuidado y profesional",
];

const FAQ_ITEMS = [
  {
    question: "¿Puedo publicar mi tesis doctoral?",
    answer:
      "Sí, publicamos todo tipo de trabajos académicos: tesis doctorales, investigaciones y ensayos. Tu trabajo recibirá el mismo tratamiento profesional que cualquier otra publicación editorial.",
  },
  {
    question: "¿Qué incluye la revisión científica?",
    answer:
      "Incluye una evaluación realizada por expertos académicos asistidos por IA especializada en tu rama de conocimiento, un informe detallado con recomendaciones de mejora, y el Sello Académico Dauro Ciencia válido para tu CV.",
  },
  {
    question: "¿El certificado es válido para mi CV?",
    answer:
      "Sí, el certificado de evaluación académica de Dauro Ciencia es un documento oficial que puedes incluir en tu currículum y presentar en procesos de acreditación.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso completo?",
    answer:
      "El proceso completo, desde la recepción del manuscrito hasta la entrega de ejemplares, tarda aproximadamente 4-6 semanas, dependiendo de la complejidad del proyecto.",
  },
  {
    question: "¿Cómo funciona la distribución?",
    answer:
      "Tu libro estará disponible en más de 4.000 librerías a través de Logista, además de plataformas online como Amazon, Casa del Libro y FNAC. También se incluye en Libros.cc para distribución especializada.",
  },
  {
    question: "¿Cómo funciona el contrato de publicación?",
    answer:
      "El contrato tiene una duración de 3 años debido a los acuerdos de distribución internacional. Durante este período, los derechos de explotación son compartidos para garantizar la máxima difusión de tu obra. Una vez finalizado el contrato, puedes renovarlo o recuperar todos los derechos.",
  },
  {
    question: "¿Puedo incluir gráficos, tablas e imágenes?",
    answer:
      "Sí, maquetamos tu libro con todos los elementos gráficos necesarios: tablas, gráficos, imágenes, fórmulas matemáticas, etc., respetando los estándares académicos.",
  },
];

const EDITORIAL_SERVICES = [
  { text: "Evaluación y análisis de manuscritos", icon: Search },
  { text: "Edición y corrección especializada", icon: PenTool },
  { text: "Diseño editorial científico", icon: Palette },
  { text: "Formación en IA para investigadores", icon: Brain },
  { text: "Asesoramiento para publicación académica", icon: Lightbulb },
];

export default function DauroCiencia() {
  const navigate = useNavigate();

  // Contact form state
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    universidad: "",
    tipoTrabajo: "",
    descripcion: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mgovgpgg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: "Nueva propuesta Dauro Ciencia - Publicación Académica",
          origen: "Página Dauro Ciencia (Nueva versión)",
        }),
      });

      if (response.ok) {
        navigate("/gracias-dauro-ciencia");
      } else {
        throw new Error("Error al enviar");
      }
    } catch {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMetodo = () => {
    document.getElementById("metodo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Dauro Ciencia | Sello Editorial Científico con Evaluación por IA</title>
        <meta
          name="description"
          content="El primer sello editorial científico que legitima la IA. Evaluación por expertos asistidos por inteligencia artificial. ISBN, distribución internacional y visibilidad para tu investigación."
        />
        <meta 
          name="keywords" 
          content="publicar tesis doctoral, editorial universitaria, editorial académica, publicar investigación, editorial científica España, sello académico, Dauro Ciencia, evaluación IA"
        />
        <meta name="author" content="Ediciones Dauro - Grupo Cultural Dauro" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://grupodauro.com/dauro-ciencia" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://grupodauro.com/dauro-ciencia" />
        <meta property="og:title" content="Dauro Ciencia | Sello Editorial Científico con Evaluación por IA" />
        <meta
          property="og:description"
          content="El primer sello editorial científico que legitima la IA. Evaluación por expertos asistidos por inteligencia artificial. ISBN, distribución internacional y visibilidad para tu trabajo."
        />
        <meta property="og:image" content="https://grupodauro.com/og-dauro-ciencia.jpg" />
        <meta property="og:locale" content="es_ES" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dauro Ciencia | Sello Editorial Científico" />
        <meta name="twitter:description" content="El primer sello editorial científico que legitima la IA. Evaluación por expertos + IA." />
        <meta name="twitter:image" content="https://grupodauro.com/og-dauro-ciencia.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dauro Ciencia",
            "description": "El primer sello editorial científico que legitima la IA. Evaluación por expertos asistidos por inteligencia artificial.",
            "url": "https://grupodauro.com/dauro-ciencia",
            "logo": "https://grupodauro.com/dauro-ciencia-logo.png",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Grupo Cultural Dauro",
              "url": "https://grupodauro.com"
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/dauro-ciencia-logo.png" 
                alt="Dauro Ciencia - Sello Editorial Científico" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>

            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              El primer sello editorial científico que legitima la IA
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Publica tu investigación con{" "}
              <span className="text-primary">rigor científico</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Evaluación por expertos asistidos por inteligencia artificial.
              ISBN, distribución internacional y visibilidad para tu trabajo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={scrollToForm}>
                Envía tu propuesta
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={scrollToMetodo}>
                Conoce nuestro método
              </Button>
            </div>

            {/* Credenciales del equipo */}
            <div className="mt-10 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Equipo directivo con experiencia académica</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Nuestros directivos son universitarios, científicos e investigadores con libros publicados de éxito y premiados. Entendemos tus necesidades porque somos como tú.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credenciales Institucionales - Sello, Certificado, Memorándum */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Garantía de seriedad editorial
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Credenciales institucionales
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nuestro compromiso con el rigor científico está respaldado por documentos oficiales y un sello de calidad reconocido.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Sello Académico */}
              <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-card to-primary/5 text-center group hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-125 group-hover:scale-150 transition-transform"></div>
                    <img 
                      src="/dauro-ciencia-sello.png" 
                      alt="Sello Académico Dauro Ciencia - Garantía de calidad editorial universitaria" 
                      className="h-28 w-28 relative z-10 drop-shadow-lg"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Sello Académico</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Distintivo de calidad que avala la rigurosidad científica de cada obra publicada.
                </p>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <Award className="w-3 h-3 mr-1" />
                  Válido para CV académico
                </Badge>
              </Card>

              {/* Certificado */}
              <Card className="p-6 border-2 hover:border-primary/30 text-center group hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <FileText className="w-14 h-14 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Certificado Oficial</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Documento que acredita la evaluación científica de tu obra por nuestro comité editorial.
                </p>
                <a 
                  href="/docs/dauro-ciencia-certificado.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                >
                  Ver certificado modelo
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>

              {/* Memorándum */}
              <Card className="p-6 border-2 hover:border-primary/30 text-center group hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <BookMarked className="w-14 h-14 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Memorándum Científico</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nuestra declaración de principios: «La Nueva Legitimidad Científica» y el uso ético de la IA.
                </p>
                <a 
                  href="/docs/memorandum-dauro-ciencia.docx" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                >
                  Descargar memorándum
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            </div>

            {/* Quote destacada */}
            <div className="mt-10 p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center">
              <blockquote className="text-xl md:text-2xl font-medium text-foreground italic max-w-3xl mx-auto">
                "La inteligencia artificial, guiada por el criterio de expertos, potencia el rigor científico y eleva la calidad de cada publicación."
              </blockquote>
              <p className="mt-4 text-muted-foreground">
                — Principios de Dauro Ciencia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director Section - Antonio Rodríguez Jiménez */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Dirección Académica
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Liderazgo académico de prestigio internacional
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Director Photo & Info */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden border-2 border-primary/20 group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-white">
                    <img 
                      src="/dauro-ciencia-director.jpg" 
                      alt="Dr. Antonio Rodríguez Jiménez - Director de Dauro Ciencia"
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">Dr. Antonio Rodríguez Jiménez</h3>
                      <p className="text-primary-foreground/80 text-sm">Director de Dauro Ciencia</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Bio & Credentials */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 border-2">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      El <strong className="text-foreground">Dr. Antonio Rodríguez Jiménez</strong> es un respetado académico y autor con <strong className="text-foreground">doctorados en Teoría de la Literatura, Literatura Comparada y Comunicación</strong>. Su destacada carrera incluye la publicación de <strong className="text-primary">67 libros</strong> y numerosos estudios de investigación.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Es <strong className="text-foreground">Investigador Nacional Nivel II</strong> del Sistema Nacional de Investigación (SNI-Conahcyt) de México, adscrito a <strong className="text-foreground">El Colegio de Jalisco</strong>, centro de Estudios Regionales. Imparte clases en la <strong className="text-foreground">Universidad de Guadalajara</strong>.
                    </p>
                  </div>
                </Card>

                {/* Credentials Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">67 Libros Publicados</p>
                        <p className="text-sm text-muted-foreground">Autor e investigador prolífico</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">SNI Nivel II</p>
                        <p className="text-sm text-muted-foreground">El Colegio de Jalisco · Conahcyt</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">22 Años Cuadernos del Sur</p>
                        <p className="text-sm text-muted-foreground">Coordinador del suplemento literario</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Director Instituto Cervantes</p>
                        <p className="text-sm text-muted-foreground">Fez, Marruecos</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Academies */}
                <Card className="p-4 border-2">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Miembro numerario</strong> de la <em>Academia Hispanoamericana de Buenas Letras</em> en Madrid y de la <em>Academia de Buenas Letras de Granada</em>.
                  </p>
                </Card>

                {/* Press Coverage */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Newspaper className="w-4 h-4" />
                    Cobertura en prensa
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href="https://el-mexicano.com/internacional/nombran-a-academico-de-la-uag-como-director-de-editorial-espanola/2184468" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      El Mexicano <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://laregiontam.com.mx/2023/08/05/nombran-a-academico-de-la-uag-como-director-de-editorial-espanola/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      La Región <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://www.uag.mx/es/mediahub/dr-antonio-rodriguez-jimenez-academico-de-la-uag-nuevo-director-de-dauro-ciencia/2023-07" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      UAG MediaHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Método Section - NEW */}
      <section id="metodo" className="py-20 bg-background scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Brain className="w-4 h-4 mr-2" />
                Evaluación híbrida exclusiva
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestro método: rigor amplificado por IA
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                En Dauro Ciencia, cada manuscrito es evaluado por académicos expertos que utilizan 
                inteligencia artificial como herramienta de análisis. Esto nos permite:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Análisis de originalidad</h3>
                <p className="text-sm text-muted-foreground">A escala, verificando la autenticidad de tu trabajo</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileWarning className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Detección de inconsistencias</h3>
                <p className="text-sm text-muted-foreground">Identificación de problemas metodológicos</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookCheck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Comparación sistemática</h3>
                <p className="text-sm text-muted-foreground">Con literatura existente en tu campo</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Evaluación documentada</h3>
                <p className="text-sm text-muted-foreground">Más profunda y detallada</p>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <p className="text-xl font-medium text-foreground">
                No sustituimos el criterio humano. <span className="text-primary">Lo amplificamos.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dos líneas de publicación - NEW */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Dos líneas de publicación
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Programa Doctoral</h3>
              <p className="text-muted-foreground mb-6">
                Para doctorandos y recién doctorados que desean publicar su tesis doctoral 
                con ISBN y distribución profesional.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Evaluación de tu tesis por expertos + IA</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Edición profesional completa</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Diseño de portada personalizado</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>ISBN y depósito legal</span>
                </li>
              </ul>
              <Button className="w-full" onClick={scrollToForm}>
                Más información <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <FlaskConical className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Investigadores Consolidados</h3>
              <p className="text-muted-foreground mb-6">
                Para profesores, científicos e investigadores con trayectoria que buscan 
                visibilidad internacional para su trabajo.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Evaluación por expertos asistidos por IA</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Proceso editorial completo</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Distribución internacional</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Visibilidad: fotografía, biografía, perfil web</span>
                </li>
              </ul>
              <Button className="w-full" onClick={scrollToForm}>
                Propón tu proyecto <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Qué incluye tu publicación */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Qué incluye tu publicación
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {INCLUDED_SERVICES.map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-medium text-sm">{service.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* International Distribution Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Truck className="w-4 h-4 mr-2" />
                Distribución global
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tu obra disponible en todo el mundo
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                El contrato de 3 años nos permite garantizar acuerdos de distribución internacional estables que benefician directamente a tu publicación.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  ¿Por qué 3 años?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Los acuerdos con distribuidores internacionales como Logista, Amazon Global y redes de librerías requieren compromisos mínimos de permanencia para incluir títulos en sus catálogos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Garantiza presencia estable en catálogos internacionales</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Permite negociar mejores condiciones de distribución</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Asegura visibilidad continua de tu obra</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  Dónde estará tu libro
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-semibold text-sm">+4.000</p>
                    <p className="text-xs text-muted-foreground">Librerías España</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-semibold text-sm">Amazon</p>
                    <p className="text-xs text-muted-foreground">Global</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-semibold text-sm">Casa del Libro</p>
                    <p className="text-xs text-muted-foreground">España</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-semibold text-sm">FNAC</p>
                    <p className="text-xs text-muted-foreground">Europa</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-semibold text-sm">Libros.cc</p>
                    <p className="text-xs text-muted-foreground">Especializado</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="font-semibold text-sm">Logista</p>
                    <p className="text-xs text-muted-foreground">Distribución</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-background rounded-2xl p-8 text-center border">
              <h3 className="text-xl font-bold mb-3">Al finalizar los 3 años</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Puedes renovar el contrato para mantener la distribución, o recuperar todos los derechos de tu obra sin coste alguno. Tú decides el futuro de tu publicación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visibilidad para el científico - NEW */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Camera className="w-4 h-4 mr-2" />
                Visibilidad para el científico
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ponemos cara a la ciencia
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                En Dauro Ciencia, el autor no es un código alfanumérico. Cada publicación incluye:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Fotografía profesional</h3>
                <p className="text-sm text-muted-foreground">Del autor en su publicación</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Biografía académica</h3>
                <p className="text-sm text-muted-foreground">Completa y profesional</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Perfil visible</h3>
                <p className="text-sm text-muted-foreground">En nuestra web y catálogo</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Diseño de portada</h3>
                <p className="text-sm text-muted-foreground">Personalizado y cuidado</p>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <p className="text-xl font-medium text-foreground">
                Porque el conocimiento tiene <span className="text-primary">rostro humano</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Editoriales - NEW */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <PenTool className="w-4 h-4 mr-2" />
              Servicios editoriales
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apoyo integral para investigadores
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Además de la publicación, ofrecemos servicios complementarios para investigadores:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {EDITORIAL_SERVICES.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm text-left">{service.text}</span>
                </div>
              ))}
            </div>

            <Button size="lg" onClick={scrollToForm}>
              Solicita información personalizada
            </Button>
          </div>
        </div>
      </section>

      {/* Áreas de publicación */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Áreas de publicación
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Contamos con expertos evaluadores en todas las ramas del conocimiento
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SCIENTIFIC_BRANCHES.map((branch, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <branch.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{branch.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Proceso paso a paso
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-8">
                {PROCESS_STEPS.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 relative z-10">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="pt-3">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dauro Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por qué Dauro Ciencia
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {WHY_DAURO.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="text-lg px-8" onClick={scrollToForm}>
              Envía tu propuesta
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Preguntas frecuentes
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background rounded-lg border px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-20 bg-background scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Tienes un proyecto de investigación?
              </h2>
              <p className="text-lg text-muted-foreground">
                Cuéntanos tu idea. Evaluamos cada propuesta de forma personalizada.
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="universidad">Institución/Universidad</Label>
                    <Input
                      id="universidad"
                      value={formData.universidad}
                      onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tipoTrabajo">Tipo de proyecto *</Label>
                  <Select
                    value={formData.tipoTrabajo}
                    onValueChange={(value) => setFormData({ ...formData, tipoTrabajo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tesis">Tesis doctoral</SelectItem>
                      <SelectItem value="investigacion">Investigación / Ensayo científico</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="descripcion">Breve descripción de tu trabajo *</Label>
                  <Textarea
                    id="descripcion"
                    required
                    rows={4}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Cuéntanos sobre tu proyecto de investigación..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar propuesta"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
