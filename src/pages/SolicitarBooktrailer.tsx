import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BooktrailerRequestForm from "@/components/BooktrailerRequestForm";
import { SEO } from "@/components/SEO";

const SolicitarBooktrailer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Solicitar Booktrailer - Grupo Dauro"
        description="Solicita tu booktrailer personalizado. Sube imágenes, comparte tu visión y deja que creemos el booktrailer perfecto para tu libro."
      />
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Solicita tu Booktrailer
            </h1>
            <p className="text-lg text-muted-foreground">
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
