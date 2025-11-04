import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileCheck, TrendingUp, FileSearch, ShoppingBag, Briefcase, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import DauroArteContactForm from "@/components/DauroArteContactForm";

const Arte = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Dauro Arte",
    "url": "https://grupodauro.com/grupo-dauro/arte",
    "description": "Galería de arte y servicios de tasación, peritaje y asesoramiento artístico",
    "priceRange": "€€€"
  };

  const services = [
    {
      icon: FileCheck,
      title: "Informes periciales de obras de arte",
      description: "Elaboramos informes técnicos y jurídicos con validez oficial, integrando criterios de autenticidad, análisis de materiales y contexto histórico.",
      includes: [
        "Estudios técnicos, estéticos y materiales",
        "Análisis de procedencia y datación",
        "Dictámenes judiciales y extrajudiciales",
        "Documentación certificada con respaldo pericial"
      ]
    },
    {
      icon: TrendingUp,
      title: "Tasación y valoración de obras de arte",
      description: "Realizamos tasaciones y valoraciones patrimoniales con rigor metodológico y respaldo documental. Determinamos el valor real de mercado mediante comparativas internacionales, autenticidad y estado de conservación.",
      applications: [
        "Patrimonios y herencias artísticas",
        "Fondos de inversión cultural",
        "Seguros y valoraciones fiscales",
        "Colecciones privadas o institucionales"
      ]
    },
    {
      icon: FileSearch,
      title: "Análisis de firma, autenticidad y documentoscopia",
      description: "Aplicamos IA avanzada, visión artificial y técnicas de documentoscopia forense para verificar la autenticidad de obras, firmas y documentos asociados. Combinamos el sistema NEGA (Neural Graphic Analysis) con métodos de laboratorio tradicionales.",
      includes: [
        "Escaneo de alta resolución y análisis de trazos",
        "Estudio de tintas, soportes y papel",
        "Comparación con bases de datos certificadas",
        "Informe técnico con validación humana y trazabilidad forense"
      ]
    },
    {
      icon: ShoppingBag,
      title: "Gestión y venta de obras de arte",
      description: "Gestionamos operaciones de venta, adquisición y cesión de obras de arte de primer nivel, con red de compradores y coleccionistas internacionales.",
      services: [
        "Intermediación profesional y confidencial",
        "Verificación documental y certificación previa",
        "Asesoramiento en negociación y contratos",
        "Obras de artistas como Picasso, Basquiat, Warhol, Miró, Kandinsky, entre otros"
      ]
    },
    {
      icon: Briefcase,
      title: "Creación y gestión de portfolio artístico",
      description: "En Dauro Arte construimos y gestionamos el portfolio integral de artistas consolidados. Creamos su catálogo técnico y visual, documentamos su trayectoria, certificamos su obra y proyectamos su imagen en el circuito internacional del arte.",
      offers: [
        "Elaboración completa del catálogo de obra",
        "Documentación técnica y archivo digital",
        "Identidad visual y posicionamiento artístico",
        "Coordinación de publicaciones, ferias y exposiciones"
      ]
    },
    {
      icon: Building2,
      title: "Servicios especializados para museos e instituciones",
      description: "Diseñamos informes y proyectos de catalogación técnica y digital para colecciones públicas y privadas, combinando arte, conservación y tecnología.",
      offers: [
        "Auditorías técnicas y documentoscópicas",
        "Catalogación y digitalización con IA",
        "Modelos 3D y documentación avanzada",
        "Informes curatoriales y de conservación"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-primary/20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-32 left-20 w-3 h-3 bg-primary rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8 animate-fade-in">
            <span className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm border-2 border-primary/40 rounded-full text-primary font-bold text-sm tracking-wider">
              ANÁLISIS Y VALORACIÓN
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-foreground mb-6 animate-fade-in-up leading-tight">
            DAURO ARTE
          </h1>
          <p className="text-xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto font-light animate-fade-in-up-delayed leading-relaxed">
            Análisis. Valor. Autenticidad.
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up-delayed">
            <div className="w-20 h-1 bg-primary rounded-full" />
            <div className="w-12 h-1 bg-accent rounded-full" />
            <div className="w-8 h-1 bg-primary/60 rounded-full" />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 lg:px-10 py-20">
        {/* Introducción */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 lg:p-16 rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="relative z-10">
                <p className="text-lg lg:text-xl text-[#333333] leading-relaxed mb-6">
                  En Dauro Arte combinamos el conocimiento artístico con la ciencia y la tecnología para ofrecer un servicio integral de análisis, certificación y gestión de obras de arte.
                  Trabajamos con coleccionistas, museos, instituciones y artistas de trayectoria consolidada, garantizando rigor técnico, discreción y excelencia profesional.
                </p>
                <p className="text-lg lg:text-xl text-[#333333] leading-relaxed">
                  Nuestro equipo está formado por peritos judiciales, historiadores del arte, analistas documentales e ingenieros en IA, capaces de unir la sensibilidad estética con la objetividad científica.
                  Cada informe, valoración o proyecto nace con un mismo propósito: preservar la autenticidad del arte y proteger su valor real.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-center mb-12 text-[#111111]">
            Nuestros Servicios
          </h2>
          
          <div className="space-y-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const listItems = service.includes || service.applications || service.services || service.offers || [];
              
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                  <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-10 rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                    <div className="absolute top-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" style={{ transitionDelay: '100ms' }} />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="flex-shrink-0 p-4 rounded-xl bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl lg:text-3xl font-playfair font-bold mb-3 text-[#111111] group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-base lg:text-lg mb-4 leading-relaxed text-[#333333]">
                          {service.description}
                        </p>
                        
                        {listItems.length > 0 && (
                          <div className="mb-6">
                            <p className="text-base lg:text-lg font-bold mb-3 text-primary">
                              {service.includes ? 'Incluye:' : 
                               service.applications ? 'Aplicaciones:' : 
                               service.services ? 'Servicios:' : 
                               'Ofrecemos:'}
                            </p>
                            <ul className="space-y-2 text-sm lg:text-base text-[#333333]">
                              {listItems.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2 text-primary font-bold">▪</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Link to="/contacto">
                          <Button className="bg-gradient-to-r from-[#E31B23] to-[#C3131A] hover:from-[#C3131A] hover:to-[#E31B23] text-white font-bold text-base rounded-2xl py-6 px-8 shadow-[0_8px_20px_rgba(227,27,35,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_30px_rgba(227,27,35,0.4)]">
                            Más información →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visión */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700 animate-pulse" />
            <div className="relative bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-10 lg:p-16 rounded-3xl border-2 border-accent/30 hover:border-primary/50 shadow-2xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-8 text-[#111111]">
                  Nuestra Visión
                </h2>
                <p className="text-lg lg:text-xl leading-relaxed mb-6 text-[#333333]">
                  En Dauro Arte entendemos el arte como patrimonio intelectual, técnico y emocional.
                  Nuestra misión es garantizar su autenticidad, proteger su legado y ampliar su valor cultural y económico, integrando la historia, la ciencia y la inteligencia artificial.
                </p>
                <p className="text-xl lg:text-2xl font-bold text-primary">
                  Cultura, tecnología y verdad: tres pilares de una misma visión.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700 animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-10 lg:p-16 rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:shadow-[0_30px_90px_-20px_rgba(224,74,92,0.5)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-center mb-4 text-[#111111]">
                  Solicitar informe o valoración
                </h2>
                <div className="flex justify-center gap-3 mb-6">
                  <div className="w-16 h-1 bg-primary rounded-full" />
                  <div className="w-10 h-1 bg-accent rounded-full" />
                  <div className="w-6 h-1 bg-primary/60 rounded-full" />
                </div>
                <p className="text-center text-[#555555] text-lg mb-10">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible
                </p>
                <DauroArteContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Arte;
