import { SEO } from '@/components/SEO';
import { BudgetCalculator } from '@/components/BudgetCalculator';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

const PresupuestadorCiencia = () => {
  return (
    <>
      <SEO
        title="Presupuestador de Publicación Académica | Dauro Ciencia"
        description="Calcula el presupuesto orientativo para publicar tu obra académica, tesis doctoral o investigación con Dauro Ciencia. Presupuesto personalizado sin compromiso."
        keywords="presupuesto publicación académica, publicar tesis, editar libro científico, presupuesto editorial académico"
        url="https://www.grupodauro.com/presupuestador-ciencia"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <Link 
              to="/dauro-ciencia" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Dauro Ciencia
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Presupuestador Académico
                </h1>
                <p className="text-muted-foreground">
                  Dauro Ciencia • Sello Editorial Científico
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl">
              Calcula un presupuesto orientativo para la publicación de tu obra académica. 
              Nuestro equipo te contactará para ofrecerte un presupuesto personalizado adaptado 
              a las características específicas de tu investigación.
            </p>
          </div>
        </div>
        
        {/* Calculator */}
        <div className="container mx-auto px-4 py-12">
          <BudgetCalculator />
          
          {/* Additional Info */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Los precios mostrados son orientativos. El presupuesto final dependerá de las 
              características específicas de tu obra: extensión, complejidad gráfica, 
              requisitos de maquetación académica y servicios adicionales.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              ¿Tienes dudas? Contacta directamente con nosotros en{' '}
              <a href="mailto:ciencia@grupodauro.com" className="text-primary hover:underline">
                ciencia@grupodauro.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresupuestadorCiencia;
