import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Home, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDauro from "@/assets/logo-dauro-gracias.png";
import { SEO } from "@/components/SEO";

export default function Gracias() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/20">
      <SEO
        title="Propuesta recibida"
        description="Hemos recibido tu propuesta. Te responderemos muy pronto."
        noindex
      />
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full text-center space-y-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img 
                src={logoDauro} 
                alt="Grupo Dauro - Ave de la libertad y el pensamiento crítico" 
                className="h-32 w-32 md:h-40 md:w-40 relative z-10 drop-shadow-2xl animate-scale-in"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ¡Propuesta Recibida!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Gracias por confiar en <span className="font-semibold text-foreground">Grupo Dauro</span>. 
              Tu propuesta ha sido recibida con éxito y es muy importante para nosotros.
            </p>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 md:p-10 space-y-6 shadow-xl">
            <div className="flex items-center justify-center gap-3 text-lg">
              <Clock className="h-6 w-6 text-primary" />
              <p className="font-semibold text-foreground">
                Valoración de tu propuesta
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro equipo revisará cuidadosamente tu propuesta y nos pondremos en contacto contigo 
              en las <span className="font-bold text-primary">próximas 48 horas</span> a través del email que nos has proporcionado.
            </p>
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  Recibirás un correo de confirmación en breve
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Volver al inicio
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="outline" className="gap-2">
                Visitar el blog
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas ayuda urgente?{" "}
              <a 
                href="mailto:info@grupodauro.com" 
                className="text-primary hover:underline font-medium"
              >
                info@grupodauro.com
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}