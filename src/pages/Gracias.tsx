import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Gracias() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/20">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500 animate-scale-in" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              ¡Mensaje recibido con éxito!
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Gracias por ponerte en contacto con nosotros. Tu mensaje es muy importante para el equipo de Grupo Dauro.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-8 space-y-4">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <p>
                Te responderemos a la mayor brevedad posible a través del email que nos has proporcionado.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Normalmente respondemos en un plazo de 24-48 horas laborables.
            </p>
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