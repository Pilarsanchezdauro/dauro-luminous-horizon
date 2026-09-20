import { Link } from "react-router-dom";
import { FileSearch, Clock, CheckCircle2, XCircle, BookOpen, Euro, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

/**
 * Cómo valoramos una obra (/valoracion).
 * Publica el embudo acordado el 20-sep-2026: filtro gratuito de 48 h con tres salidas,
 * informe de valoración de pago por tramos de extensión (enlaces de compra en la tienda),
 * y las dos formas de pagar el trabajo editorial: en dinero o en ejemplares.
 */

const TRAMOS = [
  { extension: "Hasta 100 páginas", precio: "90 €", url: "https://tiendaspain.grupodauro.com/shop/product/18037" },
  { extension: "De 101 a 200 páginas", precio: "145 €", url: "https://tiendaspain.grupodauro.com/shop/product/18038" },
  { extension: "De 201 a 300 páginas", precio: "195 €", url: "https://tiendaspain.grupodauro.com/shop/product/18039" },
  { extension: "De 301 a 400 páginas", precio: "245 €", url: "https://tiendaspain.grupodauro.com/shop/product/18040" },
  { extension: "De 401 a 500 páginas", precio: "295 €", url: "https://tiendaspain.grupodauro.com/shop/product/18041" },
];

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
      "Queremos publicarla bajo el sello Dauro. La edición corre íntegramente de nuestra cuenta: no pagas nada.",
  },
  {
    icono: FileSearch,
    titulo: "Tiene recorrido",
    texto:
      "Hay trabajo por hacer antes de publicarla. Qué trabajo y cuánto es lo que responde nuestro informe de valoración.",
  },
];

const Valoracion = () => {
  return (
    <>
      <SEO
        title="Cómo valoramos tu obra | Informe de valoración editorial — Grupo Dauro"
        description="Envía quince páginas y te respondemos en 48 horas: si tu obra no encaja, si queremos editarla por nuestra cuenta o si merece un informe de valoración. El informe cuesta desde 90 € según la extensión y se descuenta íntegro si después contratas el trabajo editorial."
        keywords="informe de valoración editorial, valoración de manuscritos, enviar manuscrito a editorial, editorial Granada, intervención editorial, publicar novela, Grupo Dauro"
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
                Leemos todo lo que nos llega
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Pero no publicamos todo lo que leemos. Aquí está, sin letra pequeña, lo que hacemos
                con tu manuscrito desde que nos lo mandas.
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
                  Las quince primeras páginas
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Para el primer contacto nos mandas <strong className="text-foreground">las quince primeras
                páginas</strong>, la sinopsis y unas líneas sobre ti. No hace falta el manuscrito entero:
                con quince páginas sabemos si una obra se sostiene.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium mb-8">
                <Clock className="w-5 h-5" />
                <span>Te respondemos en 48 horas, y este paso es gratuito.</span>
              </div>

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

        {/* Paso 2: el informe */}
        <section className="py-16 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </span>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
                  El informe de valoración
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                De cinco a seis páginas en las que nuestro comité analiza tu obra apartado por apartado
                —arquitectura y trama, personajes, rigor documental, estilo y viabilidad—, con una nota
                de potencial y el plan de trabajo que necesitaría. Lo tienes en una semana.
              </p>
              <p className="text-muted-foreground mb-8">
                Es un trabajo de lectura y análisis, y por eso se paga. El precio depende de la extensión
                de la obra. <strong className="text-foreground">Si después contratas con nosotros el trabajo
                editorial dentro de los treinta días siguientes, el importe se te descuenta íntegro.</strong>
              </p>

              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {TRAMOS.map((t, i) => (
                  <div
                    key={t.extension}
                    className={`flex flex-wrap items-center justify-between gap-4 p-5 ${
                      i !== TRAMOS.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{t.extension}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-foreground">{t.precio}</span>
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Contratar
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Una página estándar son 347 palabras. Para obras de más de 500 páginas, escríbenos a{" "}
                <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">
                  info@grupodauro.com
                </a>{" "}
                y te pasamos el precio. El informe es un diagnóstico privado para ti: no es un aval ni una
                recomendación ante terceros.
              </p>
            </div>
          </div>
        </section>

        {/* Paso 3: el trabajo editorial */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </span>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
                  Si hay trabajo que hacer, lo hacemos nosotros
                </h2>
              </div>
              <p className="text-muted-foreground mb-8">
                La intervención editorial la ejecuta nuestro equipo, no tú: corrección, estilo, verificación
                de datos y las piezas que le falten al libro. Tú revisas el resultado y das el visto bueno.
                La edición —maquetación, cubierta, ISBN, depósito legal, impresión, distribución y promoción—
                corre siempre de nuestra cuenta.
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <Euro className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-2">Lo pagas en dinero</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Presupuesto cerrado antes de empezar, sin ampliaciones a mitad de camino. La mitad al
                    comenzar y la mitad a la entrega del texto trabajado.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <BookOpen className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-2">O lo pagas en ejemplares</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    En lugar de pagar el trabajo, te comprometes a comprar una primera tirada de tu propio
                    libro a precio de autor. En vez de pagar una corrección, inviertes en libros que puedes
                    vender, firmar y regalar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-10 lg:p-14 rounded-3xl border-2 border-primary/20">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-4">
                Empieza por las quince páginas
              </h2>
              <p className="text-muted-foreground mb-8">
                Este primer paso es gratuito y no te compromete a nada.
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

      <Footer />
    </>
  );
};

export default Valoracion;
