import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import BookCoverRequestForm from '@/components/BookCoverRequestForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Palette, Sparkles } from 'lucide-react';
import mascotLogo from '@/assets/mascot.png';

export default function SolicitarPortada() {
  return (
    <>
      <SEO
        title="Diseño de Portadas de Libros Profesional | Solicita Presupuesto Gratis"
        description="Diseño profesional de portadas para tu libro. Portadas personalizadas, atractivas y optimizadas para venta en Amazon, Casa del Libro y librerías. Presupuesto sin compromiso."
        keywords="diseño portada libro, portada personalizada, diseño editorial profesional, portada Amazon, portada profesional, diseñador portadas, cover design, portada novela, portada poesía"
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
                Crea una portada única y profesional para tu libro con nuestro equipo de diseñadores expertos
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

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
