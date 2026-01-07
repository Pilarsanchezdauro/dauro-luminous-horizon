import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Brain,
  Percent,
  Shield,
  BookOpen,
  Palette,
  FileText,
  Truck,
  Smartphone,
  ShoppingBag,
  Award,
  GraduationCap,
  Users,
  Microscope,
  FlaskConical,
  Scale,
  TrendingUp,
  Atom,
  PenTool,
  Check,
  Send,
  Clock,
  Package,
  FileCheck,
  Sparkles,
  Heart,
  Stethoscope,
  Cog,
  BookMarked,
  Gavel,
  BarChart3,
  TestTube,
  Brush,
} from "lucide-react";
import { toast } from "sonner";
import dauroCienciaSello from "@/assets/dauro-ciencia-sello.png";

// Pricing tables
const BASE_PRICES: Record<number, number> = {
  100: 439,
  150: 439,
  200: 479,
  250: 509,
  300: 539,
};

const CORRECTION_PRICES: Record<string, number> = {
  "0-100": 289,
  "101-150": 329,
  "151-200": 419,
  "201-250": 479,
  "251-300": 539,
};

const COPIES_OPTIONS = [25, 50, 100, 200];

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

const TARGET_AUDIENCE = [
  {
    title: "Estudiantes de Grado",
    description: "Publica tu TFG y destaca en tu currículum académico",
    icon: GraduationCap,
  },
  {
    title: "Estudiantes de Máster",
    description: "Convierte tu TFM en una publicación con ISBN",
    icon: Award,
  },
  {
    title: "Doctorandos",
    description: "Dale visibilidad a tu tesis doctoral con distribución nacional",
    icon: Microscope,
  },
  {
    title: "Profesores e Investigadores",
    description: "Publica tus investigaciones con rigor editorial",
    icon: FlaskConical,
  },
];

const INCLUDED_SERVICES = [
  { text: "Maquetación académica profesional", icon: BookOpen },
  { text: "Diseño de portada personalizado", icon: Palette },
  { text: "ISBN editorial y depósito legal", icon: FileText },
  { text: "Distribución Libros.cc y Logista", icon: Truck },
  { text: "Formato ebook incluido", icon: Smartphone },
  { text: "Alta en Amazon, Casa del Libro, FNAC", icon: ShoppingBag },
  { text: "Revisión científica por expertos + IA (opcional)", icon: Brain },
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
    title: "Presupuesto personalizado",
    description: "Te enviamos presupuesto en 24-48h",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "Revisión científica",
    description: "Evaluación por expertos asistida por IA (opcional)",
    icon: Brain,
  },
  {
    step: 4,
    title: "Corrección y maquetación",
    description: "Preparamos tu libro con calidad académica",
    icon: BookOpen,
  },
  {
    step: 5,
    title: "Diseño de portada",
    description: "Portada académica profesional",
    icon: Palette,
  },
  {
    step: 6,
    title: "ISBN y distribución",
    description: "Alta en todas las plataformas",
    icon: Truck,
  },
  {
    step: 7,
    title: "Recibe tus ejemplares",
    description: "Entrega en 15-20 días laborables",
    icon: Package,
  },
];

const WHY_DAURO = [
  "Más de 1.000 libros publicados",
  "26 años de experiencia editorial",
  "Distribución en +4.000 librerías",
  "Revisión científica especializada",
  "Certificado válido para CV académico",
  "7% más económico que la competencia",
  "Atención personalizada",
  "Trato directo con editores profesionales",
];

const FAQ_ITEMS = [
  {
    question: "¿Puedo publicar mi TFG o TFM?",
    answer:
      "Sí, publicamos todo tipo de trabajos académicos: TFG, TFM, tesis doctorales, investigaciones y ensayos. Tu trabajo recibirá el mismo tratamiento profesional que cualquier otra publicación editorial.",
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
      "El proceso completo, desde la recepción del manuscrito hasta la entrega de ejemplares, tarda aproximadamente 4-6 semanas, dependiendo de los servicios contratados.",
  },
  {
    question: "¿Puedo pedir más ejemplares después?",
    answer:
      "Sí, puedes solicitar reimpresiones en cualquier momento. Al tener el ISBN asignado, las reimpresiones son más rápidas y económicas.",
  },
  {
    question: "¿Cómo funciona la distribución?",
    answer:
      "Tu libro estará disponible en más de 4.000 librerías a través de Logista, además de plataformas online como Amazon, Casa del Libro y FNAC. También se incluye en Libros.cc para distribución especializada.",
  },
  {
    question: "¿Mantengo los derechos de autor?",
    answer:
      "Sí, el 100% de los derechos de autor son tuyos. No hay cláusulas ocultas ni costes de rescisión. Puedes retirar tu libro cuando quieras sin ningún coste.",
  },
  {
    question: "¿Puedo incluir gráficos, tablas e imágenes?",
    answer:
      "Sí, maquetamos tu libro con todos los elementos gráficos necesarios: tablas, gráficos, imágenes, fórmulas matemáticas, etc., respetando los estándares académicos.",
  },
];

const COMPARISON_DATA = [
  {
    feature: "Precio base 50 ej. (200 págs)",
    dauro: "479€",
    circuloRojo: "445€",
    eae: '"Gratis"*',
  },
  {
    feature: "Corrección incluida",
    dauro: "Opcional",
    circuloRojo: "No incluida",
    eae: "No",
  },
  {
    feature: "Revisión científica",
    dauro: "Expertos + IA 159€",
    circuloRojo: "No disponible",
    eae: "No",
  },
  { feature: "Sello Académico", dauro: "✓", circuloRojo: "✗", eae: "✗" },
  { feature: "Distribución Logista", dauro: "✓", circuloRojo: "✓", eae: "✗" },
  {
    feature: "Derechos de autor",
    dauro: "100% tuyos",
    circuloRojo: "100% tuyos",
    eae: "Cláusulas ocultas",
  },
  { feature: "Coste de rescisión", dauro: "0€", circuloRojo: "0€", eae: "750€" },
];

function getCorrectionPrice(pages: number): number {
  if (pages <= 100) return CORRECTION_PRICES["0-100"];
  if (pages <= 150) return CORRECTION_PRICES["101-150"];
  if (pages <= 200) return CORRECTION_PRICES["151-200"];
  if (pages <= 250) return CORRECTION_PRICES["201-250"];
  return CORRECTION_PRICES["251-300"];
}

function getBasePrice(pages: number): number {
  if (pages <= 100) return BASE_PRICES[100];
  if (pages <= 150) return BASE_PRICES[150];
  if (pages <= 200) return BASE_PRICES[200];
  if (pages <= 250) return BASE_PRICES[250];
  return BASE_PRICES[300];
}

export default function DauroCiencia() {
  // Calculator state
  const [pages, setPages] = useState(150);
  const [copies, setCopies] = useState(50);
  const [includeAIReview, setIncludeAIReview] = useState(false);
  const [includeCorrection, setIncludeCorrection] = useState(false);
  const [includePremiumCover, setIncludePremiumCover] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    universidad: "",
    tipoTrabajo: "",
    paginas: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculation = useMemo(() => {
    const basePrice = getBasePrice(pages);
    const aiReviewCost = includeAIReview ? 159 : 0;
    const correctionCost = includeCorrection ? getCorrectionPrice(pages) : 0;
    const premiumCoverCost = includePremiumCover ? 75 : 0;

    // Adjust for copies (approximate multiplier)
    let copiesMultiplier = 1;
    if (copies === 25) copiesMultiplier = 0.7;
    if (copies === 100) copiesMultiplier = 1.5;
    if (copies === 200) copiesMultiplier = 2.2;

    const adjustedBase = Math.round(basePrice * copiesMultiplier);
    const total = adjustedBase + aiReviewCost + correctionCost + premiumCoverCost;

    return {
      basePrice: adjustedBase,
      aiReviewCost,
      correctionCost,
      premiumCoverCost,
      total,
    };
  }, [pages, copies, includeAIReview, includeCorrection, includePremiumCover]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xvgogvdo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: "Solicitud Dauro Ciencia",
          presupuestoEstimado: `${calculation.total}€`,
        }),
      });

      if (response.ok) {
        toast.success("¡Solicitud enviada! Te contactaremos en 24-48h.");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          universidad: "",
          tipoTrabajo: "",
          paginas: "",
          mensaje: "",
        });
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

  const scrollToPricing = () => {
    document.getElementById("calculador")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Dauro Ciencia - Editorial Universitaria | Publica tu TFG, TFM o Tesis</title>
        <meta
          name="description"
          content="Editorial universitaria con revisión científica por expertos y asistida por IA. Publica tu investigación desde 439€. ISBN, distribución nacional e internacional y certificado académico incluidos."
        />
        <meta property="og:title" content="Dauro Ciencia - Editorial Universitaria" />
        <meta
          property="og:description"
          content="Publica tu investigación con rigor científico. Editorial universitaria con revisión por expertos y asistida por IA desde 439€."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Sello de garantía */}
            <div className="flex justify-center mb-6">
              <img 
                src={dauroCienciaSello} 
                alt="Sello Dauro Ciencia - Garantía de calidad académica" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>

            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Sello académico de Grupo Dauro · Más de 1.000 libros publicados
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Publica tu investigación con{" "}
              <span className="text-primary">rigor científico</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Editorial universitaria con revisión científica por expertos y asistida por IA. Desde{" "}
              <span className="font-bold text-primary">439€</span>. ISBN, distribución nacional
              e internacional y certificado académico incluidos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={scrollToForm}>
                Solicitar presupuesto
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={scrollToPricing}>
                Ver tarifas
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

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Revisión por expertos + IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Evaluación por especialistas asistidos por IA, con Sello Académico Dauro Ciencia válido para tu CV
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Percent className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">7% más económico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Precios competitivos respecto a otras editoriales académicas sin renunciar a
                  la calidad
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Tú mantienes los derechos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  El 100% de los derechos de autor son tuyos. Publica y vende como quieras
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Qué incluye tu publicación
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {INCLUDED_SERVICES.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-background rounded-lg border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Calculator Section */}
      <section id="calculador" className="py-20 bg-background scroll-mt-28">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Calculador de presupuesto
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Configura tu publicación y obtén un precio estimado en tiempo real
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator */}
            <Card className="p-6">
              <div className="space-y-8">
                {/* Pages Slider */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Número de páginas: <span className="text-primary">{pages}</span>
                  </Label>
                  <Slider
                    value={[pages]}
                    onValueChange={(value) => setPages(value[0])}
                    min={50}
                    max={400}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50</span>
                    <span>400</span>
                  </div>
                </div>

                {/* Copies Selector */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Ejemplares</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {COPIES_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        variant={copies === option ? "default" : "outline"}
                        onClick={() => setCopies(option)}
                        className="w-full"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Additional Services */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Servicios adicionales</Label>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="aiReview"
                      checked={includeAIReview}
                      onCheckedChange={(checked) => setIncludeAIReview(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="aiReview"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Revisión científica + Sello Académico
                        <span className="text-primary ml-2">+159€</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="correction"
                      checked={includeCorrection}
                      onCheckedChange={(checked) => setIncludeCorrection(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="correction"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Corrección completa
                        <span className="text-primary ml-2">+{getCorrectionPrice(pages)}€</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="premiumCover"
                      checked={includePremiumCover}
                      onCheckedChange={(checked) => setIncludePremiumCover(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="premiumCover"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Portada premium
                        <span className="text-primary ml-2">+75€</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Precio base ({copies} ejemplares, {pages} págs.)</span>
                    <span>{calculation.basePrice}€</span>
                  </div>
                  {calculation.aiReviewCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Revisión científica + Sello</span>
                      <span>+{calculation.aiReviewCost}€</span>
                    </div>
                  )}
                  {calculation.correctionCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Corrección completa</span>
                      <span>+{calculation.correctionCost}€</span>
                    </div>
                  )}
                  {calculation.premiumCoverCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Portada premium</span>
                      <span>+{calculation.premiumCoverCost}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-4 border-t">
                    <span>Total estimado</span>
                    <span className="text-primary">{calculation.total}€</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={scrollToForm}>
                  Solicitar presupuesto gratuito
                </Button>
              </div>
            </Card>

            {/* Pricing Tables */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Precios base (50 ejemplares)</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Páginas</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(BASE_PRICES).map(([pags, price]) => (
                      <TableRow key={pags}>
                        <TableCell>{pags}</TableCell>
                        <TableCell className="text-right font-medium">{price}€</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Precios corrección completa</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Páginas</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Hasta 100</TableCell>
                      <TableCell className="text-right font-medium">289€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>101-150</TableCell>
                      <TableCell className="text-right font-medium">329€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>151-200</TableCell>
                      <TableCell className="text-right font-medium">419€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>201-250</TableCell>
                      <TableCell className="text-right font-medium">479€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>251-300</TableCell>
                      <TableCell className="text-right font-medium">539€</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Para quién es Dauro Ciencia
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {TARGET_AUDIENCE.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Scientific Review Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Brain className="w-4 h-4 mr-2" />
                Revisión híbrida exclusiva
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Evaluación por expertos asistidos por IA especializada
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Combinamos el criterio de académicos expertos con tecnología de IA entrenada en cada disciplina para ofrecer una revisión rigurosa y completa de tu manuscrito.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {SCIENTIFIC_BRANCHES.map((branch, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <branch.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{branch.name}</span>
                </div>
              ))}
            </div>

            <Card className="p-8 bg-background border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold mb-4">Incluye:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Informe de evaluación detallado</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Recomendaciones de mejora</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Sello Académico Dauro Ciencia</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Válido para CV y acreditaciones</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">159€</div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-green-600">70€ más barato</span> que un
                    informe de lectura tradicional
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Compara y decide</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Característica</TableHead>
                  <TableHead className="text-center bg-primary/5 font-bold">
                    Dauro Ciencia
                  </TableHead>
                  <TableHead className="text-center">Círculo Rojo</TableHead>
                  <TableHead className="text-center">Editorial Académica Española</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPARISON_DATA.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell className="text-center bg-primary/5 font-semibold">
                      {row.dauro}
                    </TableCell>
                    <TableCell className="text-center">{row.circuloRojo}</TableCell>
                    <TableCell className="text-center">{row.eae}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              *Editorial Académica Española cobra precios elevados por libro y 750€ si quieres
              retirarte
            </p>
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
              Solicitar presupuesto gratuito
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
                ¿Listo para publicar tu investigación?
              </h2>
              <p className="text-lg text-muted-foreground">
                Solicita tu presupuesto gratuito y sin compromiso
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
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="universidad">Universidad/Centro</Label>
                    <Input
                      id="universidad"
                      value={formData.universidad}
                      onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipoTrabajo">Tipo de trabajo *</Label>
                    <Select
                      value={formData.tipoTrabajo}
                      onValueChange={(value) => setFormData({ ...formData, tipoTrabajo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tfg">TFG</SelectItem>
                        <SelectItem value="tfm">TFM</SelectItem>
                        <SelectItem value="tesis">Tesis Doctoral</SelectItem>
                        <SelectItem value="investigacion">Investigación</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paginas">Número de páginas</Label>
                    <Input
                      id="paginas"
                      type="number"
                      value={formData.paginas}
                      onChange={(e) => setFormData({ ...formData, paginas: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mensaje">Cuéntanos sobre tu proyecto</Label>
                  <Textarea
                    id="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Describe brevemente tu trabajo académico..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Empezar ahora"}
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
