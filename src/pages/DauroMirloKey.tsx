import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Key, Book, Palette, Film, Users, Archive, Shield, CreditCard, Mail, MapPin, ArrowRight, Check, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

// Configuración de los niveles de la Key
const KEY_TIERS = {
  bronce: {
    name: "Mirlo Bronce",
    price: 30,
    priceId: "price_1SgNvrKwgkYylEGzQFuT3ahP",
    description: "Acceso cultural esencial al universo literario y editorial del Grupo Dauro.",
    color: "from-amber-700 to-amber-900",
    borderColor: "border-amber-600",
    icon: "🥉"
  },
  plata: {
    name: "Mirlo Plata",
    price: 75,
    priceId: "price_1SgNw6KwgkYylEGzzh79WJg4",
    description: "Acceso ampliado al arte, catálogo audiovisual y contenidos exclusivos.",
    color: "from-gray-400 to-gray-600",
    borderColor: "border-gray-400",
    icon: "🥈"
  },
  oro: {
    name: "Mirlo Oro",
    price: 250,
    priceId: "price_1SgNwJKwgkYylEGzp43kTg3G",
    description: "Mecenazgo cultural, experiencias exclusivas y acceso a arte físico.",
    color: "from-yellow-500 to-yellow-700",
    borderColor: "border-yellow-500",
    icon: "🥇"
  }
};

const DauroMirloKey = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (tier: keyof typeof KEY_TIERS) => {
    setLoading(tier);
    try {
      const { data, error } = await supabase.functions.invoke('create-mirlo-key-checkout', {
        body: { priceId: KEY_TIERS[tier].priceId, tierName: KEY_TIERS[tier].name }
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error("Error al procesar la solicitud. Inténtalo de nuevo.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Dauro Mirlo Key | Llave Cultural del Grupo Dauro"
        description="Accede al universo literario, artístico y audiovisual del Grupo Dauro con la Dauro Mirlo Key. Tu llave cultural permanente."
        image="/og-grupo-dauro.jpg"
        keywords="Dauro Mirlo Key, llave cultural, Grupo Dauro, cultura, literatura, arte, mecenazgo"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-background/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-8 animate-fade-in">
            <Key className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-foreground">Llave Cultural Fundacional</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight animate-fade-in-up">
            DAURO MIRLO KEY
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 font-serif italic mb-4 animate-fade-in-up-delayed">
            La llave cultural del Grupo Dauro
          </p>
          
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-12 animate-fade-in-up-delayed-more">
            Accede al universo literario, artístico y audiovisual de Grupo Dauro.
          </p>
          
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg animate-scale-in"
            onClick={() => document.getElementById('niveles')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Acceder a la Llave Cultural
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Qué es Dauro Mirlo Key */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              ¿Qué es la Dauro Mirlo Key?
            </h2>
            
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                La <strong className="text-foreground">Dauro Mirlo Key</strong> es una <strong className="text-primary">llave cultural permanente</strong> que te conecta 
                con el patrimonio creativo del Grupo Dauro: más de 1.000 obras literarias, producciones audiovisuales 
                originales, arte contemporáneo y experiencias culturales exclusivas.
              </p>
              
              <div className="bg-accent/50 border border-border rounded-2xl p-8 mt-8">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-foreground font-semibold mb-2">Compromiso Institucional</p>
                    <p className="text-muted-foreground text-base">
                      La Dauro Mirlo Key <strong>no es un producto financiero</strong>, no es inversión y no es especulación. 
                      Es un pase cultural que da acceso al universo creativo del Grupo Dauro y a su comunidad cultural: 
                      la <strong>Dauro Mirlo Network</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Los Tres Niveles */}
      <section id="niveles" className="py-24 bg-accent/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Los Tres Niveles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el nivel que mejor se adapte a tu conexión con la cultura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(KEY_TIERS).map(([key, tier]) => (
              <Card 
                key={key} 
                className={`relative overflow-hidden border-2 ${tier.borderColor} bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${tier.color}`} />
                
                <CardHeader className="text-center pt-8">
                  <div className="text-4xl mb-4">{tier.icon}</div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-xl text-muted-foreground">€</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Pago único</p>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => handlePurchase(key as keyof typeof KEY_TIERS)}
                    disabled={loading === key}
                  >
                    {loading === key ? "Procesando..." : "Obtener esta Key"}
                    <Key className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye la Key */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Valor Cultural
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Con tu Dauro Mirlo Key accedes a un universo cultural en constante expansión.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Book, title: "Literatura", desc: "Catálogo editorial Dauro, fragmentos exclusivos y portadas originales" },
              { icon: Palette, title: "Arte", desc: "Dauro Arte: obras digitales y físicas de artistas contemporáneos" },
              { icon: Film, title: "Audiovisual", desc: "Series como El Hidalgo Don Rodrigo, Bécquer y Latido" },
              { icon: Archive, title: "Archivo Cultural", desc: "Acceso al patrimonio histórico y documental del Grupo" },
              { icon: Users, title: "Comunidad", desc: "Forma parte de la Dauro Mirlo Network" },
              { icon: Sparkles, title: "Experiencias", desc: "Eventos exclusivos, presentaciones y encuentros culturales" }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fase Fundacional */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Key className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-primary">Fase Actual</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Llave Cultural Fundacional
                  </h2>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  La Dauro Mirlo Key se lanza inicialmente como <strong className="text-foreground">Llave Cultural Fundacional</strong>. 
                  Se trata de una fase OFF-CHAIN donde la adquisición se realiza de forma directa 
                  y segura, con certificado digital único para cada titular.
                </p>
                
                <div className="bg-accent/50 border border-border rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-foreground text-base m-0">
                      Cuando la infraestructura blockchain del partner tecnológico esté finalizada, 
                      cada Key fundacional podrá convertirse <strong>1:1</strong> en su versión on-chain, 
                      <strong> sin coste adicional</strong> para el titular.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona la compra */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cómo Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proceso simple, seguro y directo.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Elige tu nivel", desc: "Selecciona Bronce, Plata u Oro según tus preferencias" },
              { step: "02", title: "Pago seguro", desc: "Compra en euros con tarjeta o métodos de pago tradicionales" },
              { step: "03", title: "Certificado digital", desc: "Recibe tu certificado con número único de Key" },
              { step: "04", title: "Acceso inmediato", desc: "Disfruta de tus beneficios culturales desde el primer momento" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Grupo Dauro */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Sobre Grupo Dauro
            </h2>
            
            <div className="prose prose-lg mx-auto text-muted-foreground mb-12">
              <p className="text-center text-lg">
                Grupo Dauro es una entidad cultural con sede en Reino Unido y Granada (España), 
                dedicada a la creación, producción y difusión de contenidos culturales de alto valor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Editorial Dauro", desc: "Más de 1.000 libros publicados, premios Andalucía de la Crítica" },
                { title: "Dauro Free Production", desc: "Producción audiovisual de series y documentales" },
                { title: "Dauro Arte", desc: "Representación y promoción de artistas contemporáneos" },
                { title: "Dauro IA", desc: "Innovación tecnológica al servicio de la cultura" }
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8">
              <strong className="text-foreground">Dirección:</strong> Pilar Sánchez (CEO)
            </p>
          </div>
        </div>
      </section>

      {/* Contacto y Legal */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-2">
                <CreditCard className="w-6 h-6 text-primary mb-2" />
                <a href="https://grupodauro.com" className="text-primary-foreground hover:text-primary transition-colors font-medium">
                  grupodauro.com
                </a>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-2">
                <Mail className="w-6 h-6 text-primary mb-2" />
                <a href="mailto:info@grupodauro.com" className="text-primary-foreground hover:text-primary transition-colors">
                  info@grupodauro.com
                </a>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-2">
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <span className="text-primary-foreground/80">Granada, España</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary-foreground/20">
              <p className="text-center text-primary-foreground/60 text-sm">
                <strong>Aviso legal:</strong> La Dauro Mirlo Key no es un producto financiero, 
                no constituye inversión y no promete rentabilidad económica. 
                Es exclusivamente un pase cultural para acceder al ecosistema del Grupo Dauro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DauroMirloKey;
