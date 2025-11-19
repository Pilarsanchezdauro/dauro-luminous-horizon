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
                  En <strong>Ediciones Dauro</strong> y <strong>Grupo Dauro</strong> trabajamos desde hace años con un modelo profesional basado en la honestidad, el respeto a los autores y la calidad en cada proceso editorial.
                </p>

                <p className="text-lg leading-relaxed">
                  Sabemos que en el camino de cualquier editorial independiente es natural encontrar opiniones diversas, especialmente en plataformas públicas de reseñas. Sin embargo, queremos aclarar lo siguiente:
                </p>

                <div className="bg-muted/30 p-6 rounded-lg my-8">
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">
                    Origen de algunas valoraciones negativas
                  </h2>
                  <ul className="list-disc list-inside space-y-3 text-foreground/70">
                    <li>Algunas proceden de <strong>antiguos empleados</strong> cuya relación laboral finalizó en desacuerdo.</li>
                    <li>Otras están redactadas por <strong>autores que no obtuvieron el éxito comercial esperado</strong> con sus obras, lo cual, lamentablemente, no depende únicamente del trabajo editorial.</li>
                    <li>En muchos casos, estas críticas no reflejan la experiencia real de la mayoría de autores y colaboradores satisfechos con nuestros servicios.</li>
                  </ul>
                </div>

                <h2 className="font-playfair text-2xl font-bold text-foreground mt-8 mb-4">
                  Nuestro compromiso profesional
                </h2>
                
                <p className="text-lg leading-relaxed">
                  Mantenemos una línea de comunicación abierta y transparente con todos nuestros autores. Desde el momento de la firma del contrato, explicamos claramente:
                </p>

                <ul className="list-disc list-inside space-y-3 text-foreground/70 ml-4">
                  <li>Los alcances del proceso editorial.</li>
                  <li>Las expectativas realistas sobre distribución y ventas.</li>
                  <li>La importancia de la promoción activa por parte del autor.</li>
                  <li>Nuestro acompañamiento en cada etapa del proyecto.</li>
                </ul>

                <p className="text-lg leading-relaxed mt-6">
                  El mundo editorial es complejo y competitivo. <strong>No todas las obras logran el mismo éxito</strong>, y eso no significa falta de profesionalismo, sino la naturaleza misma del mercado literario.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-foreground mt-8 mb-4">
                  Invitación al diálogo
                </h2>

                <p className="text-lg leading-relaxed">
                  Si tienes dudas sobre nuestros servicios, te invitamos a contactarnos directamente:
                </p>

                <div className="bg-primary/10 p-6 rounded-lg my-6 border-l-4 border-primary">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    📧 Email: <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a>
                  </p>
                  <p className="text-foreground/70">
                    Responderemos todas tus preguntas con total claridad y transparencia.
                  </p>
                </div>

                <p className="text-lg leading-relaxed font-semibold text-foreground mt-8">
                  Creemos firmemente en la ética profesional, la transparencia y el respeto mutuo entre autores y editores. 
                  Nuestro historial de publicaciones y colaboraciones habla por sí mismo.
                </p>

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
