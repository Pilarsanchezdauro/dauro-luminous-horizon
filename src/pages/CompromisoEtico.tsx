import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const CompromisoEtico = () => {
  return (
    <>
      <SEO
        title="Compromiso Ético y Transparencia Editorial"
        description="Información oficial sobre transparencia, ética profesional y aclaración pública sobre reseñas no representativas. Grupo Dauro."
        keywords="compromiso ético, transparencia editorial, Grupo Dauro, ética profesional, política institucional"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-8">
                Compromiso Ético y Transparencia Editorial
              </h1>

              <div className="prose prose-lg max-w-none space-y-6 text-foreground/80">
                <p className="text-lg leading-relaxed">
                  En <strong>Ediciones Dauro</strong> y <strong>Grupo Dauro</strong> trabajamos desde hace años con un modelo profesional basado en la honestidad, el respeto a los autores y la calidad en cada proceso editorial. Nuestro equipo ha acompañado a cientos de autores en la publicación de sus obras, ofreciendo siempre un trato cercano y un trabajo técnico riguroso.
                </p>

                <p className="text-lg leading-relaxed">
                  En los últimos años, han aparecido en internet ciertas reseñas y comentarios que no reflejan la realidad de nuestro trabajo ni la experiencia habitual de nuestros autores y clientes. Algunas de estas publicaciones se originan en antiguos trabajadores que, tras abandonar la empresa y crear sus propios proyectos editoriales, difundieron opiniones inexactas destinadas a dañar nuestra reputación. Otras proceden de autores que, por diversas expectativas personales, atribuyeron a factores externos resultados comerciales que no dependían de nuestro trabajo editorial.
                </p>

                <div className="bg-muted/30 p-8 rounded-lg my-8 border-l-4 border-primary">
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
                    Aclaraciones importantes
                  </h2>
                  
                  <p className="text-lg leading-relaxed mb-4">
                    Por responsabilidad profesional, no señalamos a personas concretas, pero sí dejamos constancia pública de que:
                  </p>

                  <ul className="list-disc list-inside space-y-4 text-foreground/80">
                    <li className="leading-relaxed">
                      Las opiniones negativas surgidas en estos contextos <strong>no representan nuestro funcionamiento real</strong>.
                    </li>
                    <li className="leading-relaxed">
                      El rendimiento comercial de un libro depende de múltiples factores: género, mercado, visibilidad del autor, promoción propia, demanda del lector y momento editorial. <strong>No existe un sistema que garantice un "best seller"</strong>, ni en Dauro ni en ninguna editorial del mundo.
                    </li>
                    <li className="leading-relaxed">
                      La inmensa mayoría de nuestros autores avalan nuestra <strong>profesionalidad, dedicación y transparencia</strong>.
                    </li>
                    <li className="leading-relaxed">
                      Siempre estamos disponibles para <strong>aclarar dudas de manera directa, honesta y documentada</strong>.
                    </li>
                  </ul>
                </div>

                <h2 className="font-playfair text-2xl font-bold text-foreground mt-12 mb-4">
                  Nuestra misión
                </h2>

                <p className="text-lg leading-relaxed">
                  Nuestra misión continúa siendo la misma: <strong>trabajar con rigor, respeto y excelencia</strong>, acompañando a nuestros autores con profesionalidad y poniendo a su disposición todas las herramientas que una editorial seria puede ofrecer.
                </p>

                <p className="text-lg leading-relaxed">
                  Invitamos a cualquier lector, autor o colaborador a <strong>contactar directamente con nosotros</strong> para contrastar información. La transparencia forma parte de nuestra identidad.
                </p>

                <div className="bg-primary/10 p-8 rounded-lg my-8 border border-primary/20">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">
                    Contacto directo
                  </h3>
                  <p className="text-lg font-semibold text-foreground mb-3">
                    📧 Email: <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a>
                  </p>
                  <p className="text-foreground/70">
                    Responderemos todas tus consultas con total claridad y transparencia.
                  </p>
                </div>

                <div className="border-t border-border pt-6 mt-12">
                  <p className="text-sm text-foreground/60 italic">
                    Última actualización: Enero 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CompromisoEtico;
