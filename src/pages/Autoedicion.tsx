import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, Check, ArrowRight, Star, Clock, Shield, 
  Globe, CreditCard, FileText, Palette, Package, 
  BarChart3, Languages, ChevronRight, Award, Users, Trophy, Calendar,
  Video, Megaphone, Monitor, Share2, ShoppingBag, Library, Heart, GraduationCap, ExternalLink
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubmitWorkForm from '@/components/SubmitWorkForm';
import { PuertasEditorial } from '@/components/PuertasEditorial';
import GuideDownloadForm from '@/components/GuideDownloadForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlobalDistributionBanner } from '@/components/GlobalDistributionBanner';

// Informe de valoración. Vino de /valoracion el 5-11-2026: allí chocaba con el envío
// gratuito de la obra, y su sitio es esta página, que es la de los servicios de pago.
const TRAMOS_INFORME = [
  { extension: 'Hasta 100 páginas', precio: '90 €', url: 'https://tiendaspain.grupodauro.com/shop/product/18037' },
  { extension: 'De 101 a 200 páginas', precio: '145 €', url: 'https://tiendaspain.grupodauro.com/shop/product/18038' },
  { extension: 'De 201 a 300 páginas', precio: '195 €', url: 'https://tiendaspain.grupodauro.com/shop/product/18039' },
  { extension: 'De 301 a 400 páginas', precio: '245 €', url: 'https://tiendaspain.grupodauro.com/shop/product/18040' },
  { extension: 'De 401 a 500 páginas', precio: '295 €', url: 'https://tiendaspain.grupodauro.com/shop/product/18041' },
];

// Los servicios editoriales son trabajos que se contratan SIN publicar con
// nosotros: el autor encarga, paga y se lleva el trabajo. Por eso aqui no hay
// ISBN, ni deposito legal, ni distribucion, ni panel de ventas: todo eso solo
// existe cuando el libro sale con el sello de Dauro, y eso es la otra puerta.
const FAMILIAS_SERVICIO = [
  {
    titulo: 'Saber qué tienes entre manos',
    entradilla: 'Antes de mover la obra, o antes de seguir escribiéndola.',
    servicios: [
      {
        nombre: 'Informe de valoración',
        texto: 'Cinco o seis páginas del comité: arquitectura y trama, personajes, rigor documental, estilo y viabilidad, con una nota de potencial y el plan de trabajo que necesitaría.',
      },
      {
        nombre: 'Lectura de diagnóstico',
        texto: 'Una lectura y una respuesta breve: si la obra se sostiene y qué es lo primero que habría que resolver. Para quien no quiere el informe entero.',
      },
      {
        nombre: 'Informe de marcas de inteligencia artificial',
        texto: 'Si has escrito con ayuda de IA, te decimos dónde se nota: fórmulas que se repiten, vocabulario corto, diálogos mal cerrados, capítulos sin acontecimiento. Con las cifras del texto, no con impresiones.',
      },
      {
        nombre: 'Informe de similitud',
        texto: 'Comparamos tu obra con lo publicado para que sepas a qué se parece y en qué se distingue antes de que te lo diga otro.',
      },
    ],
  },
  {
    titulo: 'Trabajar el texto',
    entradilla: 'Lo hace nuestro equipo y tú das el visto bueno. Siempre sobre tu archivo, con control de cambios: ves cada palabra que se quita y cada palabra que se pone.',
    servicios: [
      {
        nombre: 'Corrección ortotipográfica',
        texto: 'Ortografía, puntuación, rayas de diálogo, comillas, cursivas y todo lo que delata a un texto sin revisar.',
      },
      {
        nombre: 'Corrección de estilo',
        texto: 'Lo anterior y la prosa: repeticiones, muletillas, frases que no se sostienen, párrafos que sobran.',
      },
      {
        nombre: 'Intervención editorial',
        texto: 'La más profunda: ajustar la extensión, rehacer un desenlace, cerrar el arco de un personaje, redistribuir capítulos. No se corrige, se reconstruye.',
      },
      {
        nombre: 'Escritura por encargo',
        texto: 'Tú pones la historia, los materiales y la voz; el libro lo escribimos nosotros con tu visto bueno capítulo a capítulo.',
      },
      {
        nombre: 'Traducción',
        texto: 'A los principales idiomas europeos, con tarifa por palabra. Más abajo tienes los precios.',
      },
      {
        nombre: 'Adaptación a guion',
        texto: 'De tu novela a guion de cine o a biblia de serie, con el tratamiento y las escaletas.',
      },
    ],
  },
  {
    titulo: 'Convertirlo en un libro',
    entradilla: 'El objeto terminado, listo para que lo lleves donde quieras.',
    servicios: [
      {
        nombre: 'Maquetación de interior',
        texto: 'Con la tipografía y la caja de nuestro catálogo, o con la que nos pidas. Entregamos el archivo listo para imprenta.',
      },
      {
        nombre: 'Cubierta y portada',
        texto: 'Diseño original a partir de un briefing contigo, con sus revisiones y los archivos finales para papel y para pantalla.',
      },
      {
        nombre: 'Conversión a ebook',
        texto: 'EPUB con su cubierta, su índice y su maquetación, listo para subir a la plataforma que elijas.',
      },
      {
        nombre: 'Producción de audiolibro',
        texto: 'Tu libro leído, con voz de inteligencia artificial y los archivos listos para distribuir.',
      },
    ],
  },
  {
    titulo: 'Darlo a conocer',
    entradilla: 'Lo que hace falta cuando el libro ya existe.',
    servicios: [
      {
        nombre: 'Ficha de Amazon KDP',
        texto: 'Título y subtítulo, descripción, las siete palabras clave, las tres categorías y el precio. Lista para pegar.',
      },
      {
        nombre: 'Web del libro',
        texto: 'Una página propia con su dominio: el libro, el autor, dónde comprarlo y la agenda de presentaciones.',
      },
      {
        nombre: 'Booktrailer',
        texto: 'El vídeo de presentación de tu obra, con guion, montaje y versiones para cada red.',
      },
      {
        nombre: 'Dossier de prensa',
        texto: 'Nota de prensa, biografía, sinopsis y material gráfico para medios, librerías y presentaciones.',
      },
    ],
  },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Nos cuentas qué necesitas', description: 'El texto, en qué punto está y qué trabajo tienes en mente.' },
  { step: 2, title: 'Lo miramos y te damos precio', description: 'Presupuesto cerrado por escrito, sin ampliaciones a mitad de camino.' },
  { step: 3, title: 'Trabajamos sobre tu archivo', description: 'Con control de cambios: ves cada decisión y la aceptas o la rechazas.' },
  { step: 4, title: 'Lo revisas tú', description: 'Nada se da por bueno sin tu visto bueno. La última palabra es tuya.' },
  { step: 5, title: 'Te entregamos el trabajo', description: 'Los archivos son tuyos y haces con ellos lo que quieras.' },
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
  'Veintiséis años editando y más de 2.000 obras publicadas',
  'El trabajo lo hace nuestro equipo editorial, con trato directo y sin intermediarios',
  'Presupuesto cerrado por escrito antes de empezar',
  'Siempre sobre tu archivo y con control de cambios: ves cada decisión',
  'La última palabra sobre tu texto es tuya, sin excepción',
  'Los archivos que te entregamos son tuyos y puedes hacer con ellos lo que quieras',
  'Atención también los sábados, de 9:00 a 14:00 h',
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Servicios Editoriales Profesionales - Dauro Editorial",
  "description": "Servicios editoriales profesionales para autores cuyo manuscrito necesita trabajo antes de publicarse. Incluyen corrección, maquetación, diseño de portada personalizada, ISBN oficial, ebook y distribución global en Amazon, Casa del Libro, Fnac, El Corte Inglés y más. 26 años de experiencia editorial.",
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
    "sameAs": []
  },
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "serviceType": "Servicios editoriales y publicación de libros",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios editoriales",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Edición básica",
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
        "name": "Edición con distribución",
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
              Traducción, con la tarifa delante
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const location = useLocation();

  // Se llega aquí desde el bloque de las dos puertas con #enviar-obra: se abre el
  // formulario directamente, sin obligar al autor a buscar el botón.
  useEffect(() => {
    if (location.hash === '#enviar-obra') {
      setIsFormOpen(true);
      requestAnimationFrame(() => {
        document.getElementById('enviar-obra')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, [location.hash]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Servicios Editoriales | Corrección, Maquetación, Portada e ISBN — Dauro"
        description="¿Tu manuscrito necesita trabajo antes de publicarse? Nuestros servicios editoriales incluyen corrección, maquetación, portada, ISBN, ebook y distribución en Amazon, Casa del Libro, Fnac y más. 26 años de experiencia. Presupuesto cerrado y financiación en 2 plazos."
        keywords="servicios editoriales, publicar libro España, editar mi libro, corrección de estilo, maquetación libros, diseño portada libro, ISBN libro, ebook incluido, distribución Amazon, publicar novela, publicar poesía, imprimir libro bajo demanda, presupuesto edición libro"
        image="/og-editorial.jpg"
        url="https://www.grupodauro.com/servicios-editoriales"
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
              Servicios editoriales,{' '}
              <span className="text-primary">sin publicar con nosotros</span></h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Valoramos, corregimos, maquetamos, diseñamos la cubierta y traducimos. Tú encargas el trabajo, lo pagas y te lo llevas: el libro es tuyo y lo publicas donde quieras.
            </p>
            
            <p className="text-lg text-primary font-medium mb-4">
              Veintiséis años editando. El mismo equipo que trabaja los libros de nuestro catálogo.
            </p>

            <p className="text-base text-muted-foreground mb-8 flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Trabajamos con autores de España, Europa y América, y todo el proceso se hace a distancia</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToForm}>
                Envíanos tu manuscrito
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
              <h3 className="text-xl font-bold text-foreground mb-3">El criterio de la casa</h3>
              <p className="text-muted-foreground">
                El mismo equipo y el mismo criterio que aplicamos a los libros de nuestro catálogo. <strong className="text-foreground">No hay una versión barata del trabajo.</strong>
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Precios competitivos</h3>
              <p className="text-muted-foreground">
                Presupuesto cerrado antes de empezar. Ni costes ocultos ni ampliaciones a mitad de camino.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Tú decides qué contratas</h3>
              <p className="text-muted-foreground">
                Encargas lo que necesitas y cuando lo necesitas: un servicio, varios, o todos en orden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* El catalogo de servicios sueltos: lo que se puede encargar sin publicar. */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Qué puedes encargarnos
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada uno de estos trabajos se contrata por separado. Puedes pedir uno solo, varios o
              todos, y en cualquier momento: con el manuscrito a medias, terminado o ya publicado
              por tu cuenta.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {FAMILIAS_SERVICIO.map((familia) => (
              <div key={familia.titulo}>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                  {familia.titulo}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-3xl">{familia.entradilla}</p>
                <div className="grid md:grid-cols-2 gap-5">
                  {familia.servicios.map((srv) => (
                    <div
                      key={srv.nombre}
                      className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                    >
                      <h4 className="font-bold text-foreground mb-2">{srv.nombre}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{srv.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-12 p-6 rounded-2xl border border-border bg-muted/40">
            <h3 className="font-bold text-foreground mb-2">Lo que no va por aquí</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El <strong className="text-foreground">ISBN</strong>, el{' '}
              <strong className="text-foreground">depósito legal</strong>, la{' '}
              <strong className="text-foreground">distribución</strong> en librerías y el{' '}
              <strong className="text-foreground">panel de ventas</strong> no se contratan sueltos,
              y no es por capricho: el ISBN identifica al editor, y si lo ponemos nosotros el editor
              somos nosotros. Todo eso solo existe cuando el libro sale con el sello de
              una editorial.
            </p>
          </div>
        </div>
      </section>

      {/* El precio sale de la obra, no de un formulario que rellena el autor: aquí va el
          envío del manuscrito, y el presupuesto se lo damos después de leerlo. */}
      <section id="enviar-obra" className="py-16 bg-muted/30" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Cuánto cuesta? Depende de tu libro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No es lo mismo un texto que solo necesita una corrección ortotipográfica que uno
              al que hay que reconstruirle la estructura. Por eso no te damos un precio antes
              de leerte: te damos{' '}
              <strong className="text-foreground">el precio de tu libro</strong>, en un
              presupuesto cerrado y sin ampliaciones a mitad de camino.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Envíanos la obra y te diremos qué necesita y cuánto cuesta. Este paso es gratuito
              y no te compromete a nada.
            </p>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => setIsFormOpen(true)}>
              Envíanos tu manuscrito
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* El informe de valoración: un servicio aparte, por escrito y de pago. */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              ¿Y si quieres el diagnóstico por escrito?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              La respuesta a tu envío es gratuita y te dice si publicamos, si la obra no encaja o
              qué trabajo necesitaría. Si además quieres el{' '}
              <strong className="text-foreground">análisis completo por escrito</strong>, eso es un
              informe de valoración y se contrata aparte.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              De cinco a seis páginas en las que nuestro comité analiza la obra apartado por
              apartado —arquitectura y trama, personajes, rigor documental, estilo y viabilidad—,
              con una nota de potencial y el plan de trabajo que necesitaría. Lo tienes en una
              semana.{' '}
              <strong className="text-foreground">
                Si después nos contratas el trabajo editorial dentro de los treinta días
                siguientes, el importe se te descuenta íntegro.
              </strong>
            </p>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {TRAMOS_INFORME.map((t, i) => (
                <div
                  key={t.extension}
                  className={`flex flex-wrap items-center justify-between gap-4 p-5 ${
                    i !== TRAMOS_INFORME.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{t.extension}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">{t.precio}</span>
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Contratar
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Una página estándar son 347 palabras. Para obras de más de 500 páginas, escríbenos a{' '}
              <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">
                info@grupodauro.com
              </a>{' '}
              y te pasamos el precio. El informe es un diagnóstico privado para ti: no es un aval ni
              una recomendación ante terceros.
            </p>
          </div>
        </div>
      </section>

      {/* Traduccion: el otro servicio con tarifa publica, junto al informe. */}
      <TranslationSection />

      {/* Process Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Proceso paso a paso
            </h2>
            <p className="text-xl text-muted-foreground">
              Así trabajamos cada encargo
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
                Por qué encargárnoslo a nosotros
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

      {/* El formulario va detras de un boton: la pagina queda limpia y el autor lo abre
          cuando ya ha decidido mandarnos la obra. */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">
              Envíanos tu manuscrito
            </DialogTitle>
          </DialogHeader>
          <SubmitWorkForm onSuccess={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* La unica salida a «publicar con nosotros» de toda la pagina, y va al final:
          quien viene a encargar un trabajo no tiene que tropezarse con ella antes. */}
      <section className="pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              Hasta aquí, lo que puedes encargarnos sin publicar con nosotros.{' '}
              <strong className="text-foreground">¿Y si lo que quieres es publicar?</strong> Entonces
              el camino es otro, y hay dos.
            </p>
          </div>
        </div>
      </section>

      <PuertasEditorial />

      <Footer />
    </div>
  );
}
