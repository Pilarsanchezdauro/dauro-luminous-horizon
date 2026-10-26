import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import BookCoverRequestForm from '@/components/BookCoverRequestForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Palette, Sparkles } from 'lucide-react';
import mascotLogo from '@/assets/mascot.png';
import libroBesos from '@/assets/libro-besos.png';
import libroBoabdil from '@/assets/libro-boabdil.png';
import libroHorizonte from '@/assets/libro-horizonte-interior.png';
import libroLatido from '@/assets/libro-latido.png';

const portadasMuestra = [
  { src: libroBesos, alt: 'Cubierta diseñada por Grupo Dauro: Besos' },
  { src: libroBoabdil, alt: 'Cubierta diseñada por Grupo Dauro: Boabdil' },
  { src: libroHorizonte, alt: 'Cubierta diseñada por Grupo Dauro: Horizonte interior' },
  { src: libroLatido, alt: 'Cubierta diseñada por Grupo Dauro: Latido' },
];

const preguntasFrecuentes = [
  {
    pregunta: '¿Cuánto cuesta una cubierta profesional?',
    respuesta:
      'Trabajamos con presupuesto cerrado desde 450 €, que se concreta según la complejidad del diseño (fotografía, ilustración, colección). El precio se fija antes de empezar y no cambia durante el proceso. Las revisiones están incluidas hasta que la cubierta te convenza.',
  },
  {
    pregunta: '¿Qué incluye exactamente el encargo?',
    respuesta:
      'La cubierta completa: portada, lomo y contraportada, con los textos que nos facilites (sinopsis, biografía) compuestos tipográficamente. Entregamos los archivos finales listos para imprenta (PDF con sangrado), para Amazon KDP y la versión de ebook, además de una imagen promocional para redes.',
  },
  {
    pregunta: '¿Sirve para publicar en Amazon KDP?',
    respuesta:
      'Sí. Calculamos las medidas exactas que exige Amazon según el número de páginas, el tamaño del libro y el tipo de papel, con el lomo ajustado y el espacio para el código de barras. Recibes el archivo preparado para subirlo a KDP sin rechazos.',
  },
  {
    pregunta: '¿Puedo encargar la cubierta si mi libro ya está publicado?',
    respuesta:
      'Sí, el rediseño de cubiertas de libros ya publicados es uno de los encargos más habituales. Una cubierta nueva es la forma más directa de relanzar un libro que no está funcionando en tienda.',
  },
  {
    pregunta: '¿Cuánto tarda?',
    respuesta:
      'Recibes las primeras propuestas en pocos días laborables. El plazo total depende de las rondas de revisión, pero lo habitual es tener la cubierta definitiva en una o dos semanas.',
  },
  {
    pregunta: '¿De quién son los derechos del diseño?',
    respuesta:
      'Recibes los derechos de uso completos para tu libro en todos los formatos y canales de venta, sin límite de tiempo ni de tirada. La autoría del diseño queda acreditada a Grupo Dauro.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: preguntasFrecuentes.map((f) => ({
    '@type': 'Question',
    name: f.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
  })),
};

export default function SolicitarPortada() {
  return (
    <>
      <SEO
        title="Diseño de Portadas de Libros Profesional | Presupuesto sin compromiso"
        description="Diseño profesional de portadas para tu libro, también si publicas por tu cuenta. Cubiertas personalizadas y optimizadas para venta en Amazon, Casa del Libro y librerías. Presupuesto cerrado desde 450 €."
        keywords="diseño portada libro, portada personalizada, diseño editorial profesional, portada Amazon, portada profesional, diseñador portadas, cover design, portada novela, portada poesía, cuanto cuesta portada libro, medidas portada KDP, rediseño cubierta libro"
        structuredData={faqStructuredData}
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-32 pb-16 relative overflow-hidden">
          {/* Floating mascot logos */}
          <img 
            src={mascotLogo} 
            alt="" 
            className="absolute top-20 right-10 w-20 h-20 opacity-[0.03] animate-float-diagonal pointer-events-none"
            style={{ animationDelay: '1s' }}
          />
          <img 
            src={mascotLogo} 
            alt="" 
            className="absolute bottom-80 left-16 w-16 h-16 opacity-[0.025] animate-float-horizontal pointer-events-none"
            style={{ animationDelay: '4s' }}
          />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Solicitar Portada Personalizada
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Una cubierta única y profesional para tu libro, aunque no publiques con nosotros. Del diseño se encarga nuestro equipo editorial, con presupuesto cerrado desde 450 € y revisiones incluidas hasta que la cubierta te convenza.
              </p>
            </div>

            {/* Portadas de muestra */}
            <div className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-center mb-6 text-foreground">
                Cubiertas de nuestro catálogo
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {portadasMuestra.map((portada) => (
                  <img
                    key={portada.alt}
                    src={portada.src}
                    alt={portada.alt}
                    loading="lazy"
                    className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Más de 2.000 obras publicadas avalan nuestro criterio editorial.
              </p>
            </div>

            {/* Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Palette className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">Diseño Profesional</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Portadas creadas por diseñadores con años de experiencia en el sector editorial
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">100% Personalizado</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Cada diseño es único y adaptado específicamente a tu libro y tu visión
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">Múltiples Revisiones</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Trabajamos contigo hasta conseguir la portada perfecta para tu obra
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Cuéntanos sobre tu libro</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo para comenzar el diseño de tu portada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookCoverRequestForm />
              </CardContent>
            </Card>

            {/* Preguntas frecuentes */}
            <div className="mt-16">
              <h2 className="font-playfair text-3xl font-bold text-center mb-8 text-foreground">
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {preguntasFrecuentes.map((faq) => (
                  <Card key={faq.pregunta}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{faq.pregunta}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {faq.respuesta}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
