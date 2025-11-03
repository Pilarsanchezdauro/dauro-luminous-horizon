import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import WebRequestForm from '@/components/WebRequestForm';

export default function SolicitarWeb() {
  return (
    <>
      <SEO
        title="Solicitar Desarrollo Web"
        description="Solicita el desarrollo de tu proyecto web. Diseño y desarrollo web profesional adaptado a tus necesidades."
        keywords="desarrollo web, diseño web, página web, solicitar web, presupuesto web"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solicita tu Proyecto Web
              </h1>
              <p className="text-lg text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo para desarrollar tu proyecto web
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 md:p-8">
              <WebRequestForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}