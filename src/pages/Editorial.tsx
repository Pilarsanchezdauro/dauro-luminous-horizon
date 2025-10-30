import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import editorialBg from "@/assets/editorial-bg.jpg";
import SubmitWorkForm from "@/components/SubmitWorkForm";

const Editorial = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${editorialBg})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
            Dauro Editorial
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Damos voz a autores contemporáneos y rescatamos obras fundamentales de la literatura
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
            Donde las Palabras Cobran Vida
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dauro Editorial es más que una casa editorial. Somos un espacio donde la tradición 
            literaria se encuentra con la innovación, donde cada libro es una puerta a nuevas 
            experiencias y reflexiones. Publicamos obras que trascienden el tiempo y conectan 
            con los lectores del siglo XXI.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Catálogo Diverso</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Ficción, ensayo, poesía y obras académicas
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Users className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Autores Emergentes</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Apostamos por nuevas voces literarias
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <Award className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Calidad Editorial</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Cuidamos cada detalle del proceso
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] text-center relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
            <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-playfair font-bold mb-3 relative z-10">Distribución Global</h3>
            <p className="text-muted-foreground text-sm relative z-10">
              Presencia en librerías de todo el mundo
            </p>
          </div>
        </div>

        {/* Líneas editoriales */}
        <section className="mb-20">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">
            Nuestras líneas editoriales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Ficción Contemporánea</h3>
              <p className="text-muted-foreground mb-4 relative z-10">
                Novelas y cuentos que exploran la condición humana desde perspectivas frescas 
                y originales. Narrativas que desafían y emocionan.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 p-8 rounded-3xl border-2 border-accent/30 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Ensayo Cultural</h3>
              <p className="text-muted-foreground mb-4 relative z-10">
                Reflexiones profundas sobre arte, sociedad, filosofía y cultura. 
                Textos que invitan al pensamiento crítico y al diálogo.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300" />
              <h3 className="text-2xl font-playfair font-bold mb-4 relative z-10">Poesía y Clásicos</h3>
              <p className="text-muted-foreground mb-4 relative z-10">
                Nuevas voces poéticas y reediciones cuidadas de obras fundamentales. 
                Preservamos y renovamos la tradición literaria.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-12 lg:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 relative z-10">
            ¿Eres autor? ¿Tienes un manuscrito?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Estamos siempre buscando nuevas propuestas editoriales. 
            Envíanos tu proyecto y lo evaluaremos con atención.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.5)] transition-all duration-300 hover:scale-105 relative z-10"
            onClick={() => setIsFormOpen(true)}
          >
            Enviar propuesta editorial
          </Button>
        </div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">
              Envía tu propuesta editorial
            </DialogTitle>
          </DialogHeader>
          <SubmitWorkForm onSuccess={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Editorial;
