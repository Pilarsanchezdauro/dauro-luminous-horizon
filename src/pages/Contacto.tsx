import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import mascotLogo from "@/assets/mascot.png";
import logoDauroContact from "@/assets/logo-dauro-contact.png";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

const Contacto = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const formspreeEndpoint = 'https://formspree.io/f/mzzklylj';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      toast({
        description: (
          <div className="flex items-start gap-3">
            <img src={logoDauroContact} alt="Grupo Dauro" className="w-12 h-12 flex-shrink-0 animate-fade-in" />
            <div>
              <p className="font-semibold text-base mb-1">¡Estamos encantados de que te pongas en contacto con nosotros!</p>
              <p className="text-sm text-muted-foreground">En menos de 48 horas contactaremos contigo.</p>
            </div>
          </div>
        ),
        duration: 6000,
      });

      formRef.current?.reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-24 right-10 w-20 h-20 opacity-[0.03] animate-float-diagonal pointer-events-none"
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-32 left-16 w-16 h-16 opacity-[0.02] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '4s' }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hablemos</span>
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-foreground animate-fade-in-up">
              Contacto
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up-delayed">
              ¿Tienes un proyecto en mente? ¿Quieres colaborar con nosotros?
            </p>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in-up-delayed-more">
              Nos encantaría escucharte.
            </p>
          </div>
        </div>
        
        {/* Decorative lines */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      <main className="pb-16 relative overflow-hidden">
        {/* More floating mascots through the page */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-20 left-1/4 w-24 h-24 opacity-[0.035] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '7s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-96 right-1/3 w-20 h-20 opacity-[0.04] animate-float-circle pointer-events-none"
          style={{ animationDelay: '10s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-40 left-1/3 w-28 h-28 opacity-[0.02] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '2s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-96 right-20 w-16 h-16 opacity-[0.03] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '5s' }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="relative group">
                {/* Decorative glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative bg-card p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300">
                  {/* Inner glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                  
                  <h2 className="text-2xl font-bold mb-6 relative z-10">
                    Envíanos un mensaje
                  </h2>
                    <form 
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-6 relative z-10"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Nombre
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Tu nombre"
                          className="w-full"
                          required
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
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="w-full"
                          required
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
                          name="subject"
                          type="text"
                          placeholder="¿En qué podemos ayudarte?"
                          className="w-full"
                          required
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
                          name="message"
                          placeholder="Cuéntanos más sobre tu consulta..."
                          className="w-full min-h-[150px]"
                          required
                        />
                      </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    size="lg"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
                </div>
              </div>

                {/* Contact Info */}
                <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-3xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 relative overflow-hidden group">
                  {/* Background image */}
                  <div className="absolute inset-0 bg-[url('/public/projects/grupo-dauro.png')] bg-cover bg-center opacity-[0.04]" />
                  {/* Decorative blob */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
                  
                  <h2 className="text-2xl font-bold mb-6 relative z-10">
                    Información de contacto
                  </h2>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-start gap-4 group/item">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:Info@grupodauro.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          Info@grupodauro.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group/item">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Teléfono</h3>
                        <a
                          href="tel:+34958281183"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +34 958 28 11 83
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group/item">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Dirección</h3>
                        <p className="text-muted-foreground">
                          Calle Almajara 11<br />
                          18008 Granada, España
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-3xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                  <h3 className="text-xl font-bold mb-4 relative z-10">
                    Horario de atención al público
                  </h3>
                  <div className="text-muted-foreground relative z-10">
                    <p className="font-medium">Lunes a Viernes: 10:00 - 14:00</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-8 rounded-3xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.3)] transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                  <h3 className="text-xl font-bold mb-4 relative z-10">
                    Síguenos en redes sociales
                  </h3>
                  <div className="flex gap-4 relative z-10">
                    <a
                      href="https://www.facebook.com/grupodauro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/grupodauro/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://x.com/EdicionesDauro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Twitter/X"
                    >
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a
                      href="https://es.pinterest.com/Grupoculturaldauro/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Pinterest"
                    >
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@grupodauro2900"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Youtube"
                    >
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
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
