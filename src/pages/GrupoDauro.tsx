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
                Somos un colectivo cultural dedicado a promover y crear arte,
                literatura, cine y proyectos innovadores que integran
                inteligencia artificial.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Nacimos con la vocación de ser un puente entre la tradición
                cultural y la vanguardia tecnológica, creando espacios donde la
                creatividad humana se potencia con herramientas del siglo XXI.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nuestro trabajo abarca desde la publicación de obras literarias
                hasta la producción audiovisual, pasando por la representación
                artística y el desarrollo de soluciones creativas basadas en IA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Nuestra Misión
                </h3>
                <p className="text-muted-foreground">
                  Impulsar la cultura contemporánea a través de proyectos que
                  fusionen tradición e innovación, democratizando el acceso al
                  arte y la literatura.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                  Nuestra Visión
                </h3>
                <p className="text-muted-foreground">
                  Ser referentes en la creación y difusión cultural,
                  reconocidos por nuestra capacidad de integrar arte,
                  tecnología y narrativas que inspiren.
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
