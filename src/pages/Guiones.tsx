import { Link } from "react-router-dom";
import { Clapperboard, ArrowRight, Film, BookOpen, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { guiones } from "@/data/guionesData";

/**
 * Índice público de los guiones de Grupo Cultural Dauro (/guiones).
 * Las fichas completas viven en /grupo-dauro/cine/:slug; esta página es la
 * puerta de entrada que se enlaza desde fuera (correos a autores, redes).
 */
const Guiones = () => {
  return (
    <>
      <SEO
        title="Nuestros Guiones | De la novela a la serie — Grupo Cultural Dauro"
        description="Convertimos los libros de nuestro catálogo en guiones de serie y de cine. Tres guiones escritos y en preproducción: El Hidalgo Don Rodrigo de Cervantes, Latido y El Huésped de las Tinieblas."
        keywords="guiones de serie, adaptación literaria, novela a serie, preproducción audiovisual, biblia de serie, guionistas, Grupo Dauro, Dauro Cine"
        url="https://www.grupodauro.com/guiones"
      />

      <Navigation />

      <main className="min-h-screen bg-background pt-28">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                <Clapperboard className="w-4 h-4" />
                <span>Nuestros guiones</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                De la novela a la serie
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                No enviamos novelas esperando que alguien las lea. Escribimos el guion, la biblia
                de serie y los personajes, y con eso nos sentamos con productores.
              </p>
              <p className="mt-6 text-base md:text-lg text-foreground font-medium">
                Actualmente trabajamos en la <span className="text-primary">preproducción de las series</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Los guiones */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                Tres guiones escritos
              </h2>
              <p className="text-muted-foreground">
                Dos nacen de novelas de nuestro catálogo. El tercero es un guion original de
                Juan José Porto, supervisor creativo de Dauro Cine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guiones.map((g) => (
                <Link
                  key={g.slug}
                  to={`/grupo-dauro/cine/${g.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={g.imagen}
                      alt={g.titulo}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {g.titulo}
                    </h3>
                    {g.subtitulo && (
                      <p className="text-sm text-muted-foreground italic mb-3">{g.subtitulo}</p>
                    )}
                    <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
                      {g.genero}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{g.autorObra}</p>
                    <p className="text-sm text-muted-foreground mb-4">{g.formato}</p>
                    <div className="mt-auto flex items-center gap-2 text-primary text-sm font-medium">
                      <span>Ver el guion</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 text-center">
                Cómo llega un libro nuestro a una serie
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">El libro</h3>
                  <p className="text-sm text-muted-foreground">
                    Editamos la obra hasta dejarla impecable. Un texto a medias no llega a
                    ninguna mesa.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Film className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">El guion</h3>
                  <p className="text-sm text-muted-foreground">
                    Nuestro equipo escribe la adaptación: biblia de serie, arcos, personajes,
                    escaleta y guion técnico.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">Los productores</h3>
                  <p className="text-sm text-muted-foreground">
                    Lo movemos con productores, con personas concretas del sector, no con
                    buzones de empresa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              ¿Tu novela puede ser una serie?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              El thriller, la novela histórica y el drama con personajes fuertes son el material
              que se adapta. Si crees que tu obra lo es, hablemos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/grupo-dauro/cine"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <Clapperboard className="w-4 h-4" />
                Conocer Dauro Cine
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:border-primary/50 transition-colors"
              >
                Escríbenos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Guiones;
