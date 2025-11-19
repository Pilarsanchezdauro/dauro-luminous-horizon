import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import WebRequestForm from '@/components/WebRequestForm';
import mascotLogo from '@/assets/mascot.png';

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
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Solicita tu Proyecto Web
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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