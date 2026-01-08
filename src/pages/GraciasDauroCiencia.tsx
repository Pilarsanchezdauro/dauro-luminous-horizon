import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Home, Mail, Clock, GraduationCap, BookOpen, Award, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import dauroCienciaSello from "@/assets/dauro-ciencia-sello.png";

export default function GraciasDauroCiencia() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-primary/5 to-accent/20">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center space-y-10 animate-fade-in">
          {/* Sello académico con efecto */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150"></div>
              <img 
                src={dauroCienciaSello} 
                alt="Sello Académico Dauro Ciencia - Garantía de calidad editorial universitaria" 
                className="h-36 w-36 md:h-48 md:w-48 relative z-10 drop-shadow-2xl animate-scale-in"
              />
            </div>
          </div>
          
          {/* Mensaje de confirmación */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                ¡Solicitud Recibida!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Gracias por confiar en <span className="font-bold text-primary">Dauro Ciencia</span>. 
              Tu proyecto académico está en las mejores manos.
            </p>
          </div>

          {/* Lo que significa publicar con Dauro Ciencia */}
          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-7 w-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Publicar en Dauro Ciencia significa...
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4 items-start p-4 bg-muted/30 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Reconocimiento Académico</h3>
                  <p className="text-muted-foreground text-sm">
                    Tu investigación obtiene el sello de calidad que universidades y tribunales valoran. Un distintivo que avala la rigurosidad de tu trabajo.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-4 bg-muted/30 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">ISBN Propio y Depósito Legal</h3>
                  <p className="text-muted-foreground text-sm">
                    Tu obra queda registrada oficialmente como publicación, citable en trabajos académicos y reconocida en tu currículum profesional.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-4 bg-muted/30 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Alcance Internacional</h3>
                  <p className="text-muted-foreground text-sm">
                    Distribución en +4.000 librerías de España, Amazon Global, Casa del Libro, FNAC y las principales plataformas digitales.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-4 bg-muted/30 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Legado que Trasciende</h3>
                  <p className="text-muted-foreground text-sm">
                    Convertir tu TFG, TFM o tesis en libro es dejar huella. Tu conocimiento disponible para futuras generaciones de investigadores.
                  </p>
                </div>
              </div>
            </div>

            {/* Próximos pasos */}
            <div className="pt-6 border-t border-border/50 space-y-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <Clock className="h-6 w-6 text-primary" />
                <p className="font-semibold text-foreground">
                  ¿Qué ocurre ahora?
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Nuestro equipo editorial revisará tu solicitud y te enviaremos un <span className="font-bold text-primary">presupuesto personalizado en 24-48 horas</span>. 
                Un editor especializado en tu área de conocimiento te acompañará en todo el proceso de publicación.
              </p>
              <div className="flex items-center justify-center gap-3 text-muted-foreground pt-2">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  Revisa tu bandeja de entrada (y spam) para no perderte nuestro email
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Volver al inicio
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="outline" className="gap-2">
                Leer nuestro blog
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Contacto urgente */}
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              ¿Tienes alguna pregunta urgente?{" "}
              <a 
                href="mailto:ciencia@grupodauro.com" 
                className="text-primary hover:underline font-medium"
              >
                ciencia@grupodauro.com
              </a>
              {" "}o llámanos al{" "}
              <a 
                href="tel:+34958253877" 
                className="text-primary hover:underline font-medium"
              >
                958 25 38 77
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
