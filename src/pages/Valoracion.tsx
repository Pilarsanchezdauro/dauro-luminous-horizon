import { Link } from "react-router-dom";
import { FileSearch, Clock, CheckCircle2, XCircle, Euro, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

/**
 * Cómo valoramos una obra (/valoracion).
 * Esta pagina es el EMBUDO GRATUITO y no lleva ni un precio: el autor envia la obra,
 * la leemos en 48 h y le damos una de tres respuestas. Si necesita trabajo editorial, se
 * lo decimos y le pasamos el presupuesto.
 *
 * Decidido por Pilar el 5-11-2026:
 *  - El informe de valoracion de pago se fue a /servicios-editoriales. Aqui chocaba:
 *    no se puede pedir la obra gratis y cobrar por leerla en la misma pagina.
 *  - Pagar el trabajo editorial en ejemplares ya NO es una opcion.
 *  - El bloque de las dos puertas no va al final: la pagina entera ya las explica.
 */


const SALIDAS = [
  {
    icono: XCircle,
    titulo: "No encaja",
    texto:
      "Tu obra no entra en la línea de nuestro catálogo. Te lo decimos sin rodeos y sin coste. Otra editorial puede verlo de otro modo.",
  },
  {
    icono: CheckCircle2,
    titulo: "Nos interesa y la editamos",
    texto:
      "Queremos publicarla bajo el sello Dauro. Apostamos por tu obra y la editamos sin coste para ti: no pagas nada.",
  },
  {
    icono: FileSearch,
    titulo: "Tiene recorrido",
    texto:
      "Hay trabajo por hacer antes de publicarla. Te decimos qué es y te pasamos el presupuesto, sin coste y sin compromiso.",
  },
];

const Valoracion = () => {
  return (
    <>
      <SEO
        title="Publica tu libro con Dauro | Cómo valoramos tu obra — Grupo Dauro"
        description="Envíanos tu obra entera y te respondemos en 48 horas, sin coste: te decimos si no encaja, si apostamos por ella y la editamos sin coste para ti, o si necesita trabajo editorial antes de publicarse. En ese caso te explicamos cuál y te pasamos el presupuesto."
        keywords="cómo publicar un libro, publicar tu libro, enviar manuscrito a editorial, informe de valoración editorial, valoración de manuscritos, servicios editoriales, intervención editorial, publicar novela, Grupo Dauro"
        url="https://www.grupodauro.com/valoracion"
      />

      <Navigation />

      <main className="min-h-screen bg-background pt-28">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                <FileSearch className="w-4 h-4" />
                <span>Cómo valoramos tu obra</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-6">
                Publica tu libro con Dauro
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Leemos todo lo que nos llega, pero no publicamos todo lo que leemos. Aquí tienes,
                sin letra pequeña, lo que hacemos con tu manuscrito desde que nos lo envías.
              </p>
            </div>
          </div>
        </section>

        {/* Paso 1: el filtro */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </span>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
                  Tu obra, la sinopsis y unas líneas sobre ti
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Para el primer contacto nos envías <strong className="text-foreground">tu obra</strong>,
                la sinopsis y unas líneas sobre ti. La leemos nosotros: no decidimos por un resumen ni
                por las primeras páginas.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium mb-4">
                <Clock className="w-5 h-5" />
                <span>Te respondemos en 48 horas, y este paso es gratuito.</span>
              </div>
              <p className="text-muted-foreground mb-8">
                De aquí salen <strong className="text-foreground">dos formas de editar</strong>
                {" "}—que la asumamos entera nosotros, o que haya trabajo previo que pagar— y la
                posibilidad de que la obra no encaje en nuestro catálogo.
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                {SALIDAS.map((s) => (
                  <div
                    key={s.titulo}
                    className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    <s.icono className="w-6 h-6 text-primary mb-3" />
                    <h3 className="font-bold text-foreground mb-2">{s.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Paso 2: el trabajo editorial */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </span>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
                  Si hay trabajo que hacer, se encarga nuestro equipo editorial
                </h2>
              </div>
              <p className="text-muted-foreground mb-8">
                La intervención editorial la ejecuta nuestro equipo, no tú: corrección, estilo, verificación
                de datos y las piezas que le falten al libro. Tú revisas el resultado y das el visto bueno.
                La edición —maquetación, cubierta, ISBN, depósito legal, impresión, distribución y promoción—
                la asume siempre la editorial.
              </p>

              <div className="p-6 rounded-2xl border border-border bg-card">
                <Euro className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Presupuesto cerrado</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Al leerte vemos qué le falta al libro, y con eso te pasamos el presupuesto: lo
                  conoces antes de que empecemos y no se amplía a mitad de camino. La mitad al
                  comenzar y la mitad a la entrega del texto trabajado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-10 lg:p-14 rounded-3xl border-2 border-primary/20">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-4">
                Envíanos tu obra y la leemos
              </h2>
              <p className="text-muted-foreground mb-8">
                Entera, con la sinopsis y unas líneas sobre ti. Este primer paso es gratuito y no
                te compromete a nada.
              </p>
              <Link
                to="/grupo-dauro/editorial#enviar-obra"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium text-lg transition-colors"
              >
                Enviar mi obra
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Aquí NO va el bloque de las dos puertas: la página entera ya las explica, y
          ponerlo detrás del botón de enviar reabría una decisión ya cerrada. */}

      <Footer />
    </>
  );
};

export default Valoracion;
