import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contacto = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-foreground text-center">
              Contacto
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente? ¿Quieres colaborar con nosotros?
              Nos encantaría escucharte.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <h2 className="text-2xl font-playfair font-bold mb-6">
                  Envíanos un mensaje
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Nombre
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos más sobre tu consulta..."
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    Enviar mensaje
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-playfair font-bold mb-6">
                    Información de contacto
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:info@grupodauro.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          info@grupodauro.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Teléfono</h3>
                        <p className="text-muted-foreground">
                          +34 XXX XXX XXX
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Dirección</h3>
                        <p className="text-muted-foreground">
                          Granada, España
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10">
                  <h3 className="text-xl font-playfair font-bold mb-4">
                    Horario de atención
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Lunes a Viernes: 9:00 - 18:00</p>
                    <p>Sábado: 10:00 - 14:00</p>
                    <p>Domingo: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;
