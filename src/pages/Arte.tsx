import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileCheck, TrendingUp, FileSearch, ShoppingBag, Briefcase, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import DauroArteContactForm from "@/components/DauroArteContactForm";

const Arte = () => {
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: '#111111' }}
            >
              DAURO ARTE
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold mb-8" style={{ color: '#111111' }}>
              Análisis. Valor. Autenticidad.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introducción */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <p className="text-base lg:text-lg leading-relaxed mb-6 relative z-10" style={{ color: '#333333' }}>
              En Dauro Arte combinamos el conocimiento artístico con la ciencia y la tecnología para ofrecer un servicio integral de análisis, certificación y gestión de obras de arte.
              Trabajamos con coleccionistas, museos, instituciones y artistas de trayectoria consolidada, garantizando rigor técnico, discreción y excelencia profesional.
            </p>
            <p className="text-base lg:text-lg leading-relaxed relative z-10" style={{ color: '#333333' }}>
              Nuestro equipo está formado por peritos judiciales, historiadores del arte, analistas documentales e ingenieros en IA, capaces de unir la sensibilidad estética con la objetividad científica.
              Cada informe, valoración o proyecto nace con un mismo propósito: preservar la autenticidad del arte y proteger su valor real.
            </p>
          </div>
        </div>

        {/* Servicios */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 
            className="text-3xl lg:text-4xl font-bold text-center mb-12"
            style={{ color: '#111111' }}
          >
            Nuestros Servicios
          </h2>
          
          <div className="space-y-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const listItems = service.includes || service.applications || service.services || service.offers || [];
              
              return (
                <div
                  key={index} 
                  className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-6 lg:p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div 
                      className="flex-shrink-0 p-3 rounded-lg"
                      style={{ backgroundColor: 'rgba(227, 27, 35, 0.1)' }}
                    >
                      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" style={{ color: '#E31B23' }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-xl lg:text-2xl font-bold mb-3"
                        style={{ color: '#111111' }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="text-sm lg:text-base mb-4 leading-relaxed"
                        style={{ color: '#333333' }}
                      >
                        {service.description}
                      </p>
                      
                      {listItems.length > 0 && (
                        <div className="mb-4">
                          <p 
                            className="text-sm lg:text-base font-semibold mb-2"
                            style={{ color: '#E31B23' }}
                          >
                            {service.includes ? 'Incluye:' : 
                             service.applications ? 'Aplicaciones:' : 
                             service.services ? 'Servicios:' : 
                             'Ofrecemos:'}
                          </p>
                          <ul className="space-y-1 text-sm lg:text-base" style={{ color: '#333333' }}>
                            {listItems.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2" style={{ color: '#E31B23' }}>•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <Link to="/contacto">
                        <Button 
                          className="text-white font-medium px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                          style={{ 
                            backgroundColor: '#E31B23',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C3131A'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E31B23'}
                        >
                          Más información
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visión */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 lg:p-12 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            <h2 
              className="text-3xl lg:text-4xl font-bold text-center mb-8 relative z-10"
              style={{ color: '#111111' }}
            >
              Nuestra Visión
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-6 text-center relative z-10" style={{ color: '#333333' }}>
              En Dauro Arte entendemos el arte como patrimonio intelectual, técnico y emocional.
              Nuestra misión es garantizar su autenticidad, proteger su legado y ampliar su valor cultural y económico, integrando la historia, la ciencia y la inteligencia artificial.
            </p>
            <p 
              className="text-lg lg:text-xl font-semibold text-center relative z-10"
              style={{ color: '#E31B23' }}
            >
              Cultura, tecnología y verdad: tres pilares de una misma visión.
            </p>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <h2 
              className="text-3xl lg:text-4xl font-bold text-center mb-4 relative z-10"
              style={{ color: '#111111' }}
            >
              Solicitar informe o valoración
            </h2>
            <p className="text-center text-gray-600 mb-8 relative z-10">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible
            </p>
            <div className="relative z-10">
              <DauroArteContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Arte;
