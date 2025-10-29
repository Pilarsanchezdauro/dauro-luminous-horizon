import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const GrupoDauro = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-8 text-foreground">
              Grupo Cultural Dauro
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Desde el año 2000, Grupo Cultural Dauro impulsa la creación, la edición y la innovación cultural desde una vocación clara: unir la herencia artística con la tecnología del futuro.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Nacimos como una editorial independiente con una mirada abierta al arte, la literatura y el pensamiento contemporáneo. Con el tiempo, nos hemos convertido en un grupo creativo multidisciplinar que abarca la edición literaria, la producción audiovisual, la dirección técnica de guion y el desarrollo de proyectos basados en inteligencia artificial.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Con más de 1.000 obras publicadas, nuestra labor editorial ha consolidado un catálogo diverso y exigente que incluye narrativa, poesía, ensayo, investigación y colecciones especializadas. A lo largo de estas dos décadas, las publicaciones de Dauro y sus autores han sido reconocidos con numerosos galardones, entre ellos el Premio Andalucía de la Crítica en sus distintas modalidades, reafirmando nuestro compromiso con la excelencia literaria.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                El grupo está liderado por profesionales de prestigio internacional, creadores y editores premiados y reconocidos por su aportación al pensamiento y la cultura, que combinan sensibilidad artística, conocimiento técnico y visión innovadora.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hoy, Dauro continúa expandiendo su alcance: producimos obras audiovisuales generadas mediante IA, desarrollamos sistemas de análisis y catalogación cultural, y diseñamos soluciones de comunicación que combinan creatividad, precisión y belleza.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Nuestro propósito no ha cambiado: dar forma a las ideas, elevar la palabra y convertir la cultura en una experiencia viva, inteligente y transformadora.
              </p>
            </div>

            {/* Destacado de trayectoria */}
            <div className="relative my-16 py-12 px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
              <div className="relative text-center">
                <p className="text-6xl lg:text-7xl font-playfair font-bold text-primary mb-4">
                  Desde 2000
                </p>
                <p className="text-xl lg:text-2xl text-foreground font-medium">
                  Impulsando la creación, edición e innovación cultural
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Más de 1.000 obras publicadas
                </h3>
                <p className="text-muted-foreground">
                  Nuestro catálogo editorial incluye narrativa, poesía, ensayo, investigación y colecciones especializadas, con obras y autores galardonados con premios de prestigio como el Premio Andalucía de la Crítica.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Liderazgo reconocido
                </h3>
                <p className="text-muted-foreground">
                  Profesionales de prestigio internacional, creadores y editores premiados que combinan sensibilidad artística, conocimiento técnico y visión innovadora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GrupoDauro;
