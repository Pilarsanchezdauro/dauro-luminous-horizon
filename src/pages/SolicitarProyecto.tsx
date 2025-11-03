import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import PortfolioInquiryForm from '@/components/PortfolioInquiryForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function SolicitarProyecto() {
  return (
    <>
      <SEO
        title="Solicita tu Proyecto - Grupo Cultural Dauro"
        description="¿Tienes un proyecto en mente? Consulta nuestros servicios en desarrollo web, booktrailers, audiovisual, avatares y más. Solicita tu presupuesto personalizado."
        keywords="solicitar proyecto, presupuesto web, booktrailer, audiovisual, desarrollo web, producción audiovisual, avatares, diseño corporativo"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
                <Badge variant="secondary" className="text-base px-4 py-1">
                  Servicios Profesionales
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solicita tu Proyecto
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Completa el formulario y cuéntanos tu idea. Estudiaremos tu proyecto y te enviaremos un presupuesto personalizado sin compromiso.
              </p>
            </div>

            {/* Services Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Servicios Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Desarrollo Web Profesional</li>
                    <li>• Booktrailers y Videos Promocionales</li>
                    <li>• Producción Audiovisual y Cinematográfica</li>
                    <li>• Creación de Avatares y Personajes</li>
                    <li>• Arte Visual y Pintura Digital</li>
                    <li>• Imagen Corporativa y Branding</li>
                    <li>• Producción Musical</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Proceso de Trabajo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Completa el formulario con tu proyecto</li>
                    <li>2. Revisamos tu consulta en 24-48h</li>
                    <li>3. Te enviamos presupuesto personalizado</li>
                    <li>4. Reunión para definir detalles</li>
                    <li>5. Desarrollo y seguimiento del proyecto</li>
                    <li>6. Entrega y revisiones finales</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Formulario de Consulta</CardTitle>
                <CardDescription>
                  Todos los campos marcados con * son obligatorios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioInquiryForm />
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">¿Tienes dudas?</h3>
              <p className="text-sm text-muted-foreground">
                Si prefieres hablar directamente con nosotros, puedes contactarnos en{' '}
                <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">
                  info@grupodauro.com
                </a>{' '}
                o llamarnos al teléfono que encontrarás en nuestra{' '}
                <a href="/contacto" className="text-primary hover:underline">
                  página de contacto
                </a>.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
