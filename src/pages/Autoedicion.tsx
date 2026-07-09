import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Check, ArrowRight, Star, Clock, Shield, 
  Globe, CreditCard, FileText, Palette, Package, 
  BarChart3, Languages, ChevronRight, Award, Users, Trophy, Calendar,
  Video, Megaphone, Monitor, Share2, ShoppingBag, Library, Heart, GraduationCap, ExternalLink
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { AutoedicionCalculator } from '@/components/AutoedicionCalculator';
import GuideDownloadForm from '@/components/GuideDownloadForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlobalDistributionBanner } from '@/components/GlobalDistributionBanner';

const INCLUDED_FEATURES = [
  { icon: FileText, title: 'Maquetación profesional interior', description: 'Diseño tipográfico cuidado y legible' },
  { icon: Palette, title: 'Diseño de portada personalizada', description: 'Portada única creada para tu libro' },
  { icon: Shield, title: 'ISBN y alta legal', description: 'Registro oficial en la Agencia del ISBN' },
  { icon: BookOpen, title: 'Ebook gratis incluido', description: 'Versión digital lista para todas las plataformas' },
  { icon: Globe, title: 'Distribución global', description: 'Amazon, Casa del Libro, Fnac, El Corte Inglés, Kobo, Apple Books...' },
  { icon: Package, title: 'Impresión bajo demanda', description: 'Sin stock ni inversión en ejemplares' },
  { icon: CreditCard, title: 'Financiación sin intereses', description: 'Pago en 2 plazos sin coste adicional' },
  { icon: BarChart3, title: 'Panel de ventas (opcional)', description: 'Consulta tus ventas en tiempo real' },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Envías tu manuscrito', description: 'Nos cuentas tu proyecto y recibimos tu texto.' },
  { step: 2, title: 'Presupuesto personalizado', description: 'Te enviamos precio exacto según páginas, plazo y servicios.' },
  { step: 3, title: 'Revisión y maquetación', description: 'Trabajamos tu libro con calidad artesanal y tecnológica.' },
  { step: 4, title: 'Diseño de portada', description: 'Portada profesional a tu gusto, con revisiones incluidas.' },
  { step: 5, title: 'ISBN y distribución', description: 'Alta oficial en todas las plataformas de venta.' },
  { step: 6, title: 'Tu libro en tus manos', description: 'Recíbelo impreso y en digital. Listo para vender.' },
];


const TRANSLATION_PRICES = [
  { language: 'Inglés', price: '0,04 €/palabra' },
  { language: 'Francés', price: '0,04 €/palabra' },
  { language: 'Italiano', price: '0,04 €/palabra' },
  { language: 'Portugués', price: '0,04 €/palabra' },
  { language: 'Alemán', price: '0,05 €/palabra' },
  { language: 'Catalán / Euskera / Gallego', price: '0,035 €/palabra' },
  { language: 'Otros idiomas europeos', price: '0,06 €/palabra' },
  { language: 'Chino / Japonés / Árabe', price: 'Consultar' },
];

const FEATURED_AUTHORS = [
  { name: 'Autores premiados con el Premio Andalucía de la Crítica', highlight: true },
  { name: 'Escritores con obras traducidas a múltiples idiomas', highlight: true },
  { name: 'Autores con presencia en ferias internacionales', highlight: false },
  { name: 'Escritores con trayectoria literaria consolidada', highlight: false },
];

const WHY_DAURO = [
  'Más de 2.000 obras publicadas',
  'Autores premiados en el catálogo (Premio Andalucía de la Crítica, entre otros)',
  'Equipo editorial profesional con trato directo',
  'Financiación en 2 plazos sin intereses',
  'Ebook gratis con cada publicación',
  'Descuento permanente de autor para tus ejemplares',
  'Servicio de traducción profesional a múltiples idiomas',
  'Contrato temporal y transparente',
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Autoedición de Libros Profesional - Dauro Editorial",
  "description": "Servicio de autoedición y autopublicación profesional para autores. Incluye maquetación, diseño de portada personalizada, ISBN oficial, ebook gratis y distribución global en Amazon, Casa del Libro, Fnac, El Corte Inglés y más. 26 años de experiencia editorial en Granada.",
  "provider": {
    "@type": "Organization",
    "name": "Dauro Editorial",
    "url": "https://www.grupodauro.com",
    "foundingDate": "1999",
    "logo": "https://www.grupodauro.com/og-logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Granada",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.edicionesdauro.com"
    ]
  },
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "serviceType": "Autoedición y Publicación de Libros",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Autoedición",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Autoedición Básica",
        "description": "Maquetación interior, portada personalizada, ISBN y alta legal, ebook incluido",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "690",
          "priceCurrency": "EUR",
          "minPrice": "690"
        }
      },
      {
        "@type": "Offer",
        "name": "Autoedición con Distribución",
        "description": "Incluye distribución global en Amazon, Casa del Libro, Fnac, El Corte Inglés y más plataformas",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "990",
          "priceCurrency": "EUR"
        }
      }
    ]
  }
};

// Translation Section Component
function TranslationSection() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  const LANGUAGES = [
    { value: 'ingles', label: 'Inglés', price: '0,04 €/palabra' },
    { value: 'frances', label: 'Francés', price: '0,04 €/palabra' },
    { value: 'italiano', label: 'Italiano', price: '0,04 €/palabra' },
    { value: 'portugues', label: 'Portugués', price: '0,04 €/palabra' },
    { value: 'aleman', label: 'Alemán', price: '0,05 €/palabra' },
    { value: 'catalan', label: 'Catalán', price: '0,035 €/palabra' },
    { value: 'euskera', label: 'Euskera', price: '0,035 €/palabra' },
    { value: 'gallego', label: 'Gallego', price: '0,035 €/palabra' },
    { value: 'ruso', label: 'Ruso', price: '0,06 €/palabra' },
    { value: 'polaco', label: 'Polaco', price: '0,06 €/palabra' },
    { value: 'holandes', label: 'Holandés', price: '0,06 €/palabra' },
    { value: 'chino', label: 'Chino mandarín', price: 'Consultar' },
    { value: 'japones', label: 'Japonés', price: 'Consultar' },
    { value: 'arabe', label: 'Árabe', price: 'Consultar' },
    { value: 'hindi', label: 'Hindi', price: 'Consultar' },
    { value: 'coreano', label: 'Coreano', price: 'Consultar' },
  ];

  const selectedPrice = LANGUAGES.find(l => l.value === selectedLanguage)?.price;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Languages className="w-4 h-4" />
              Servicio de traducción profesional
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lleva tu libro al siguiente nivel
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Alcanza lectores en todo el mundo con traducciones profesionales de calidad editorial
            </p>
          </div>

          {/* Tesis Doctoral highlight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                  🎓 Tesis Doctorales: Rigor académico garantizado
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Las tesis doctorales requieren una traducción con máximo rigor científico. Nuestro equipo de traductores especializados en ámbitos académicos garantiza la precisión terminológica y el respeto a las convenciones de cada disciplina.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Selector de idioma */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                Selecciona el idioma de destino:
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full md:w-96">
                  <SelectValue placeholder="Elige un idioma..." />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label} — <span className="text-primary font-medium">{lang.price}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedPrice && (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-foreground">
                    <strong>Precio por palabra:</strong>{' '}
                    <span className="text-primary text-xl font-bold">{selectedPrice}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Tabla de precios resumida */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {TRANSLATION_PRICES.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <span className="text-foreground">{item.language}</span>
                  <span className="font-semibold text-primary">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Ejemplos orientativos:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Novela de 50.000 palabras → Traducción al inglés: <strong className="text-foreground">2.000 €</strong></li>
                <li>• Novela de 70.000 palabras → Traducción al francés: <strong className="text-foreground">2.800 €</strong></li>
                <li>• Tesis doctoral de 30.000 palabras → Traducción al inglés: <strong className="text-foreground">1.200 €</strong></li>
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-foreground">La traducción incluye:</h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {[
                  'Traducción completa del manuscrito',
                  'Revisión por traductor literario profesional',
                  'Adaptación cultural y estilística',
                  'Entrega en formato editable',
                  'Terminología especializada (tesis)',
                  'Revisión nativa garantizada'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground mb-4">
                ¿Quieres llevar tu libro o tesis a lectores internacionales?
              </p>
              <Link to="/servicios#contacto">
                <Button size="lg" className="gap-2">
                  Solicitar presupuesto de traducción
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Autoedicion() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Autoedición de Libros | Publica tu Libro desde 690€ con ISBN y Distribución - Dauro Editorial"
        description="Publica tu libro con calidad editorial profesional desde 690€. Incluye maquetación, portada personalizada, ISBN, ebook gratis y distribución en Amazon, Casa del Libro, Fnac y más. 26 años de experiencia. Financiación sin intereses en 2 plazos."
        keywords="autoedición libros, publicar libro España, editorial autoedición, autopublicación profesional, editar mi libro, ISBN libro, maquetación libros, diseño portada libro, ebook incluido, distribución Amazon, publicar novela, publicar poesía, imprimir libro bajo demanda, editorial Granada, autopublicar libro barato, publicar libro online"
        image="/og-editorial.jpg"
        url="https://www.grupodauro.com/autoedicion"
        structuredData={structuredData}
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Credenciales destacadas */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Calendar className="w-4 h-4" />
                26 años editando
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                +2.000 obras publicadas
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Trophy className="w-4 h-4" />
                CEOs premiados
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Publica tu primer libro con{' '}
              <span className="text-primary">calidad profesional</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Autoedición artesanal y tecnológica. Precios justos. Plazos a tu medida.
            </p>
            
            <p className="text-lg text-primary font-medium mb-4">
              "Tu libro, con calidad de bestseller. Si nos enamora tu obra, la editamos sin coste para ti."
            </p>

            <p className="text-base text-muted-foreground mb-8 flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Tus libros disponibles en <strong className="text-foreground">11 países</strong>: Europa, EE.UU. y Latinoamérica</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToForm}>
                Calcula tu presupuesto
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={scrollToForm}>
                Solicitar información
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Calidad bestseller</h3>
              <p className="text-muted-foreground">
                Maquetación profesional, portada de autor, ISBN y distribución real en <strong className="text-foreground">11 países</strong> de Europa, EE.UU. y Latinoamérica.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Precios competitivos</h3>
              <p className="text-muted-foreground">
                Más económico que los grandes grupos editoriales, sin costes ocultos ni sorpresas.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Tú decides el ritmo</h3>
              <p className="text-muted-foreground">
                Elige tu plazo de entrega y ajusta el precio según tu necesidad. Desde 30 días.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Qué incluye tu publicación
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para publicar tu libro con éxito
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INCLUDED_FEATURES.map((feature, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribución Internacional para Autores */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <GlobalDistributionBanner variant="compact" />
        </div>
      </section>

      {/* Budget Calculator Section */}
      <section className="py-16 bg-muted/30" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calcula tu presupuesto
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Obtén una estimación instantánea del coste de publicar tu libro
            </p>
          </div>

          <AutoedicionCalculator />
        </div>
      </section>

      {/* Autores de Prestigio */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Trophy className="w-4 h-4" />
                Autores de prestigio en nuestro catálogo
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Únete a autores reconocidos
              </h2>
              <p className="text-xl text-muted-foreground">
                Nuestro catálogo incluye escritores galardonados con los premios más prestigiosos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {FEATURED_AUTHORS.map((author, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-5 rounded-xl border ${
                    author.highlight 
                      ? 'bg-primary/5 border-primary/30' 
                      : 'bg-card border-border'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    author.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-foreground">{author.name}</span>
                </div>
              ))}
            </div>

            {/* CEO Premiados y Trayectoria */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">CEOs Premiados</h3>
                <p className="text-muted-foreground text-sm">
                  Dirección editorial con múltiples reconocimientos en el sector cultural
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">26 Años</h3>
                <p className="text-muted-foreground text-sm">
                  Más de dos décadas de experiencia editando obras de calidad
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">+2.000 Obras</h3>
                <p className="text-muted-foreground text-sm">
                  Un catálogo con más de dos mil títulos publicados de todos los géneros
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Translation Service */}
      <TranslationSection />

      {/* Marketing Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Megaphone className="w-4 h-4" />
                Servicios de promoción
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Te ayudamos a dar a conocer tu libro
              </h2>
              <p className="text-xl text-muted-foreground">
                Servicios de marketing y promoción para impulsar tu obra
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free service */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  GRATIS
                </div>
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <Megaphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Publicidad para presentaciones
                </h3>
                <p className="text-muted-foreground mb-6">
                  Creamos todo el material publicitario para las presentaciones de tu libro sin ningún coste adicional.
                </p>
                <ul className="space-y-3">
                  {[
                    'Carteles y diseños promocionales',
                    'Material para redes sociales',
                    'Notas de prensa',
                    'Invitaciones digitales'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Paid services */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="absolute top-4 right-4 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
                  PRECIOS ECONÓMICOS
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Servicios adicionales
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Booktrailer</h4>
                      <p className="text-sm text-muted-foreground">Vídeo promocional profesional para dar a conocer tu libro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Marca de autor</h4>
                      <p className="text-sm text-muted-foreground">Identidad visual personal: logo, colores y estilo propio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Página web de autor</h4>
                      <p className="text-sm text-muted-foreground">Tu espacio online profesional para mostrar tu obra</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Share2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Plan de marketing digital</h4>
                      <p className="text-sm text-muted-foreground">Estrategia completa para redes sociales y promoción online</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground mt-6 pt-6 border-t border-border">
                  Consulta precios personalizados según tus necesidades
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Atención Personalizada */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Lo que nos hace diferentes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Valor real superior al coste
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                No somos una fábrica de libros. Cada proyecto recibe atención individual porque tu historia merece ser tratada como única
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Atención Personalizada */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Atención personalizada real
                </h3>
                <p className="text-muted-foreground mb-6">
                  Tendrás contacto directo con nuestro equipo editorial durante todo el proceso. Sin intermediarios, sin respuestas automáticas.
                </p>
                <ul className="space-y-3">
                  {[
                    'Un editor asignado a tu proyecto',
                    'Comunicación directa por teléfono y WhatsApp',
                    'Resolución de dudas en tiempo real',
                    'Asesoramiento editorial honesto'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Valor Superior */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Todo incluido, sin sorpresas
                </h3>
                <p className="text-muted-foreground mb-6">
                  Lo que otras editoriales cobran como extras, nosotros lo incluimos. Precio cerrado desde el primer día.
                </p>
                <ul className="space-y-3">
                  {[
                    'ISBN y depósito legal incluidos',
                    'Ebook en formato profesional gratis',
                    'Distribución en plataformas incluida',
                    'Material promocional sin coste extra'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quote/Testimonial style emphasis */}
            <div className="mt-12 text-center bg-card border border-border rounded-2xl p-8">
              <p className="text-2xl md:text-3xl font-medium text-foreground italic mb-4">
                "No buscamos el mayor volumen de publicaciones, sino los mejores resultados para cada autor"
              </p>
              <p className="text-primary font-semibold">— Filosofía Dauro Editorial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Proceso paso a paso
            </h2>
            <p className="text-xl text-muted-foreground">
              Así es como publicamos tu libro
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {PROCESS_STEPS.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1 pb-6 border-b border-border last:border-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Dauro */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Por qué Dauro Editorial
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {WHY_DAURO.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{reason}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToForm}>
                Solicitar presupuesto gratuito
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explora más
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubre nuestro catálogo y herramientas para autores
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Tienda */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-playfair font-bold text-foreground">
                  Tienda Online
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Explora nuestro catálogo completo de libros publicados. Novelas, ensayos, poesía y más géneros de autores nacionales e internacionales. Envío a toda España y compra segura.
              </p>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                Más de 500 títulos disponibles con envío gratuito en pedidos superiores a 20€.
              </p>
              <Button asChild className="w-full gap-2 mt-auto">
                <Link to="/tienda">
                  <ShoppingBag className="h-4 w-4" />
                  Visitar tienda
                </Link>
              </Button>
            </div>

            {/* Guía Editorial con formulario */}
            <GuideDownloadForm pdfUrl="/docs/guia-editorial-autores.pdf" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
