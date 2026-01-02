import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, BookOpen, Mail, ArrowRight, Download, ShoppingBag } from "lucide-react";

const GraciasCompra = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="¡Gracias por tu compra! | Grupo Dauro"
        description="Tu pedido ha sido procesado correctamente. Gracias por confiar en Grupo Dauro."
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="max-w-2xl w-full">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/30">
                <CardContent className="p-8 md:p-12 text-center">
                  {/* Success Icon */}
                  <div className="mb-6 animate-in zoom-in duration-300 delay-200">
                    <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Thank you message */}
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    ¡Gracias por tu compra!
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Tu pedido ha sido procesado correctamente. En breve recibirás un email de confirmación de Shopify.
                  </p>

                  {/* Info cards */}
                  <div className="grid gap-4 md:grid-cols-2 mb-8">
                    <div className="p-4 rounded-lg bg-muted/50 text-left">
                      <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">¿Compraste un ebook?</h3>
                          <p className="text-sm text-muted-foreground">
                            Accede a tus descargas en la sección "Mis Ebooks" usando el email de tu compra.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 text-left">
                      <div className="flex items-start gap-3">
                        <ShoppingBag className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">¿Libro físico?</h3>
                          <p className="text-sm text-muted-foreground">
                            Lo enviaremos a la dirección indicada. Recibirás un email con el seguimiento.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email reminder */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span>Revisa tu bandeja de entrada (y spam) para el email de confirmación</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg" className="gap-2">
                      <Link to="/mis-ebooks">
                        <BookOpen className="w-4 h-4" />
                        Acceder a Mis Ebooks
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" size="lg" className="gap-2">
                      <Link to="/tienda">
                        Seguir comprando
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Support link */}
                  <p className="mt-8 text-sm text-muted-foreground">
                    ¿Tienes alguna pregunta?{" "}
                    <Link to="/contacto" className="text-primary hover:underline">
                      Contáctanos
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GraciasCompra;