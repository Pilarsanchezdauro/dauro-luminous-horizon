import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BooktrailerRequestForm from "@/components/BooktrailerRequestForm";
import { SEO } from "@/components/SEO";
import mascotLogo from "@/assets/mascot.png";

const SolicitarBooktrailer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Solicitar Booktrailer - Grupo Dauro"
        description="Solicita tu booktrailer personalizado. Sube imágenes, comparte tu visión y deja que creemos el booktrailer perfecto para tu libro."
      />
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-32 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-20 right-10 w-20 h-20 opacity-[0.03] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-80 left-16 w-16 h-16 opacity-[0.025] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '4s' }}
        />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Solicita tu Booktrailer
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Completa el formulario con los detalles de tu libro y tu visión para el booktrailer
            </p>
          </div>
          
          <BooktrailerRequestForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SolicitarBooktrailer;
