import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tv, Users, MapPin, Clock, Film, ExternalLink, ArrowLeft, PenTool } from "lucide-react";
import { getGuion } from "@/data/guionesData";
import DauroArteContactForm from "@/components/DauroArteContactForm";

const SITE = "https://www.grupodauro.com";

const GuionSerie = () => {
  const { slug } = useParams();
  const guion = slug ? getGuion(slug) : undefined;

  if (!guion) {
    return <Navigate to="/grupo-dauro/cine" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: guion.titulo,
    alternateName: guion.subtitulo,
    url: `${SITE}/grupo-dauro/cine/${guion.slug}`,
    image: `${SITE}${guion.ogImage}`,
    description: guion.logline,
    genre: guion.genero.split(" · "),
    inLanguage: "es",
    countryOfOrigin: { "@type": "Country", name: "España" },
    productionCompany: {
      "@type": "Organization",
      name: "Grupo Cultural Dauro",
      url: SITE,
    },
    creator: [
      { "@type": "Person", name: guion.autor },
      { "@type": "Person", name: "Pilar Sánchez" },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guiones", item: `${SITE}/grupo-dauro/cine` },
      { "@type": "ListItem", position: 3, name: guion.titulo, item: `${SITE}/grupo-dauro/cine/${guion.slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={guion.seoTitle}
        description={guion.seoDescription}
        keywords={`${guion.titulo}, ${guion.autor}, serie de televisión, ${guion.genero}, guion de serie, guiones de series históricas, adaptación novela a serie, Grupo Cultural Dauro`}
        url={`${SITE}/grupo-dauro/cine/${guion.slug}`}
        image={guion.ogImage}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${guion.imagen})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-neutral-950/85 to-neutral-950/70" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            to="/grupo-dauro/cine"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a Guiones
          </Link>

          <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-center">
            {/* Cartel */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary via-primary/40 to-transparent rounded-2xl blur opacity-40" />
                <img
                  src={guion.imagen}
                  alt={`Cartel de ${guion.titulo}`}
                  className="relative w-full rounded-xl shadow-2xl object-cover aspect-[2/3]"
                />
              </div>
            </div>

            {/* Cabecera */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
                  <Tv className="w-3.5 h-3.5" /> Serie de TV · {guion.estado}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-none mb-3">
                {guion.titulo}
              </h1>
              {guion.subtitulo && (
                <p className="text-xl md:text-2xl italic text-white/60 font-playfair mb-6">
                  {guion.subtitulo}
                </p>
              )}
              <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mb-8">
                {guion.logline}
              </p>

              {/* Cifras */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
                {guion.datos.map((d) => (
                  <div key={d.etiqueta}>
                    <p className="text-2xl font-bold text-primary leading-none">{d.valor}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wide mt-1">{d.etiqueta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Ficha rápida */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {[
            { icon: Film, label: "Género", value: guion.genero },
            { icon: Clock, label: "Formato", value: guion.formato },
            { icon: MapPin, label: "Época", value: guion.epoca },
            { icon: MapPin, label: "Localizaciones", value: guion.localizaciones },
          ].map((f) => (
            <Card key={f.label} className="p-5 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/15">
              <f.icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{f.label}</p>
              <p className="text-sm text-foreground leading-snug">{f.value}</p>
            </Card>
          ))}
        </div>

        {/* Sinopsis */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <PenTool className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-playfair font-bold">Sinopsis</h2>
          </div>
          <div className="space-y-4">
            {guion.sinopsis.map((p, i) => (
              <p key={i} className="text-lg text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-foreground">Obra original:</span>
              <span className="text-muted-foreground">{guion.autorObra}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-foreground">Guion:</span>
              <span className="text-muted-foreground">{guion.adaptacion}</span>
            </div>
          </div>
        </section>

        {/* Personajes */}
        {guion.personajes.length > 0 && (
          <section className="max-w-5xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-playfair font-bold">Personajes</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {guion.personajes.map((p) => (
                <Card key={p.nombre} className="p-6 border-primary/15 hover:border-primary/40 transition-colors">
                  <h3 className="text-xl font-playfair font-bold mb-1">{p.nombre}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{p.rol}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.descripcion}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Enlaces / CTA */}
        <section className="max-w-3xl mx-auto mb-16 flex flex-wrap gap-4 justify-center">
          {guion.enlaceExtra && (
            <Button asChild size="lg">
              <a href={guion.enlaceExtra.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> {guion.enlaceExtra.texto}
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <Link to="/grupo-dauro/cine" className="flex items-center gap-2">
              <Film className="w-4 h-4" /> Ver todos los guiones
            </Link>
          </Button>
        </section>

        {/* Contacto */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              ¿Productora o coproductor interesado?
            </h2>
            <p className="text-lg text-muted-foreground">
              Este guion está en desarrollo con Grupo Cultural Dauro. Si quieres recibir la biblia
              de serie completa o explorar una coproducción, escríbenos.
            </p>
          </div>
          <DauroArteContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuionSerie;
