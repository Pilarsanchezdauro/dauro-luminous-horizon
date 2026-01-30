import { SEO } from '@/components/SEO';
import { AutoedicionCalculator } from '@/components/AutoedicionCalculator';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

const PresupuestadorAutoedicion = () => {
  return (
    <>
      <SEO
        title="Presupuestador de Autoedición | Grupo Dauro"
        description="Calcula el presupuesto para publicar tu libro con Grupo Dauro. Maquetación, ISBN, ebook, corrección, impresión, marketing y distribución. Presupuesto instantáneo."
        keywords="presupuesto autoedición, publicar libro precio, editar libro coste, imprimir libro, ISBN, ebook"
        url="https://grupodauro.com/presupuestador"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <Link 
              to="/autoedicion" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Autoedición
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  Presupuestador de Autoedición
                </h1>
                <p className="text-sm text-muted-foreground">
                  Grupo Dauro Editorial
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Calculator */}
        <div className="container mx-auto px-4 py-8">
          <AutoedicionCalculator />
        </div>
      </div>
    </>
  );
};

export default PresupuestadorAutoedicion;
