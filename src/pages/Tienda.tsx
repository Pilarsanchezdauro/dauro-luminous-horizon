import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Globe, ShoppingBag, Truck, MapPin, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AMERICA_COUNTRIES, EUROPE_COUNTRIES, COUNTRIES_WITH_STORE, TOTAL_COUNTRIES, EUROPE_COUNT } from "@/data/distributionNetwork";

// España es la tienda directa (sección "Compra directa"); aquí solo las de América.
const distributionStores = COUNTRIES_WITH_STORE
  .filter(c => c.country !== "España")
  .map(c => ({
    flag: c.flag,
    name: c.country,
    subtitle: c.distributor,
    url: c.storeUrl!,
  }));

const storeStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo Cultural Dauro",
  "url": "https://www.grupodauro.com",
  "logo": "https://www.grupodauro.com/og-logo.png",
  "description": "Editorial y grupo cultural con distribución internacional de libros en Europa, Estados Unidos y Latinoamérica.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Granada",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "areaServed": [
    { "@type": "Place", "name": "España" },
    { "@type": "Place", "name": "Europa" },
    { "@type": "Place", "name": "Alemania" },
    { "@type": "Place", "name": "Andorra" },
    { "@type": "Place", "name": "Austria" },
    { "@type": "Place", "name": "Bélgica" },
    { "@type": "Place", "name": "Chipre" },
    { "@type": "Place", "name": "Dinamarca" },
    { "@type": "Place", "name": "Estonia" },
    { "@type": "Place", "name": "Finlandia" },
    { "@type": "Place", "name": "Francia" },
    { "@type": "Place", "name": "Grecia" },
    { "@type": "Place", "name": "Países Bajos" },
    { "@type": "Place", "name": "Hungría" },
    { "@type": "Place", "name": "Irlanda" },
    { "@type": "Place", "name": "Italia" },
    { "@type": "Place", "name": "Luxemburgo" },
    { "@type": "Place", "name": "Polonia" },
    { "@type": "Place", "name": "Portugal" },
    { "@type": "Place", "name": "Suecia" },
    { "@type": "Place", "name": "Suiza" },
    { "@type": "Place", "name": "Estados Unidos" },
    { "@type": "Place", "name": "México" },
    { "@type": "Place", "name": "Argentina" },
    { "@type": "Place", "name": "Colombia" },
    { "@type": "Place", "name": "Chile" },
    { "@type": "Place", "name": "Ecuador" },
    { "@type": "Place", "name": "Bolivia" },
    { "@type": "Place", "name": "Costa Rica" },
    { "@type": "Place", "name": "Guatemala" },
    { "@type": "Place", "name": "Venezuela" }
  ],
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Product",
      "name": "Libros y publicaciones de Grupo Cultural Dauro",
      "category": "Libros"
    },
    "availableDeliveryMethod": {
      "@type": "DeliveryMethod",
      "name": "Envío internacional"
    }
  },
  "sameAs": [
    "https://www.grupodauro.com"
  ]
};

const Tienda = () => {
  return (
    <>
      <SEO
        title="Comprar Libros Online — Envío a Europa, USA y Latinoamérica"
        description="Compra libros de Grupo Cultural Dauro con envío a España, Europa, Estados Unidos, México, Argentina, Colombia, Chile y más. Tienda directa y distribución internacional."
        keywords="comprar libros online, editorial española, envío internacional libros, libros España, libros Latinoamérica, libros Europa, editorial Granada, Grupo Dauro, distribución libros"
        url="https://www.grupodauro.com/tienda"
        image="/og-editorial.jpg"
        structuredData={storeStructuredData}
      />
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">

          {/* Hero */}
          <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/20 border border-border p-10 md:p-16 mb-16 text-center">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="relative">
              <Globe className="mx-auto h-16 w-16 text-primary mb-8 animate-pulse" strokeWidth={1.5} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                Nuestros libros, en toda Europa, EE.UU. y Latinoamérica
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Disponibles en <strong className="text-foreground">España</strong>, <strong className="text-foreground">toda Europa</strong>, <strong className="text-foreground">Estados Unidos</strong> y los principales países de <strong className="text-foreground">Latinoamérica</strong>. Elige tu zona y recibe tu pedido con envío local, sin aduanas.
              </p>
            </div>
          </header>

          {/* ¿Dónde comprar? — dos canales: nuestra tienda (España) vs España+Europa */}
          <section className="mb-20" aria-labelledby="donde-comprar">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h2 id="donde-comprar" className="text-2xl md:text-3xl font-bold text-foreground">¿Dónde comprar nuestros libros?</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Dos canales distintos: nuestra <strong className="text-foreground">tienda propia en España</strong> y la red de <strong className="text-foreground">impresión y envío local que cubre España y toda Europa</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* 1 · Nuestra tienda (España, independiente) */}
              <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-7 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">1 · Nuestra tienda · España</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5 flex-1">
                  Tienda propia de Grupo Dauro, independiente y gestionada por nosotros. Compra online con todo el catálogo y envío desde España.
                </p>
                <a
                  href="https://tiendaspain.grupodauro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-5 py-3 hover:opacity-90 transition"
                >
                  <span>🇪🇸</span> Ir a la tienda
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* 2 · España y toda Europa (impresión y envío local) */}
              <div className="rounded-2xl border border-border bg-card p-7 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">2 · España y toda Europa</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Imprimimos en España y enviamos a domicilio, <strong className="text-foreground">sin aduanas</strong>, en España y <strong className="text-foreground">{EUROPE_COUNT} países europeos</strong> más. Compra online en nuestra tienda europea.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-lg text-xs">
                    <span className="text-base leading-none">🇪🇸</span>
                    <span className="font-semibold text-foreground">España</span>
                  </span>
                  {EUROPE_COUNTRIES.map((c) => (
                    <span key={c.country} className="inline-flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-lg text-xs">
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="font-medium text-foreground">{c.short}</span>
                    </span>
                  ))}
                </div>
                <a
                  href="https://tienda.grupodauro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/40 text-primary font-semibold px-5 py-3 hover:bg-primary/5 transition mb-3"
                >
                  <span>🇪🇺</span> Ir a la tienda (Europa)
                  <ExternalLink className="h-4 w-4" />
                </a>
                <div className="mt-auto text-xs text-muted-foreground">
                  También en tu librería habitual · <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a>
                </div>
              </div>
            </div>
          </section>

          {/* Distribución internacional */}
          <section aria-labelledby="distribucion-internacional">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 id="distribucion-internacional" className="text-2xl md:text-3xl font-bold text-foreground">Tiendas online en América</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tiendas propias por país en América. Compra desde el tuyo con impresión y envío local, sin aduanas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {distributionStores.map((store) => (
                <a
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent/20 hover:border-primary/40 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-4xl leading-none">{store.flag}</span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {store.name}
                    </span>
                    {store.subtitle && (
                      <span className="text-xs text-muted-foreground">{store.subtitle}</span>
                    )}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </section>

          {/* Distribuidores y puntos de venta en América */}
          <section className="mt-20 border-t border-border pt-12" aria-labelledby="distribuidores-red">
            <div className="flex items-center gap-3 mb-3">
              <Store className="h-6 w-6 text-primary" />
              <h2 id="distribuidores-red" className="text-2xl md:text-3xl font-bold text-foreground">Distribuidores y puntos de venta en América</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Además de las tiendas online, en América trabajamos con distribuidores locales para que encuentres nuestros libros en librerías físicas y marketplaces.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AMERICA_COUNTRIES.map((c) => (
                <div
                  key={c.country}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{c.country}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {c.distributor}
                      </p>
                    </div>
                  </div>

                  {c.channels.length > 0 && (
                    <div className="space-y-1 mb-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Puntos de venta</p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.channels.map((ch) => (
                          <span
                            key={ch.name}
                            className="inline-flex items-center bg-primary/5 text-foreground text-xs px-2.5 py-1 rounded-lg border border-primary/10"
                          >
                            {ch.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {c.note && (
                    <p className="text-xs text-muted-foreground italic">{c.note}</p>
                  )}

                  {c.expanding && !c.note && (
                    <p className="text-xs text-muted-foreground italic">Distribución con acuerdos locales</p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              ¿Conoces un punto de venta que debamos incluir?{" "}
              <Link to="/contacto" className="text-primary font-medium hover:underline">Recomiéndanoslo</Link>.
            </p>
          </section>

          {/* FAQ / info SEO */}
          <section className="mt-20 border-t border-border pt-12" aria-labelledby="faq-envios">
            <h2 id="faq-envios" className="text-xl font-bold text-foreground mb-6">Preguntas frecuentes sobre envíos</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿Puedo comprar desde cualquier país?</h3>
                <p className="text-muted-foreground">Sí. En España tienes nuestra tienda propia; en España y toda Europa imprimimos y enviamos a domicilio sin aduanas (pídelo en tu librería o escríbenos); y en América hay tienda online en cada país. Si tu país no aparece, escríbenos y te lo resolvemos.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿Quién gestiona la distribución internacional?</h3>
                <p className="text-muted-foreground">Contamos con almacenes y distribución en cada zona, de modo que tu pedido se imprime y se envía localmente, con envío nacional y sin aduanas.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿Los precios incluyen gastos de envío?</h3>
                <p className="text-muted-foreground">El coste del transporte se calcula automáticamente cuando introduces tu dirección de envío durante el proceso de compra.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿Qué métodos de pago aceptáis?</h3>
                <p className="text-muted-foreground">Puedes pagar con tarjeta de crédito/débito o mediante PayPal, según la tienda en la que realices tu compra.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿Enviáis a Baleares y Canarias?</h3>
                <p className="text-muted-foreground">Sí. Tanto Baleares como Canarias están incluidos en nuestras zonas de envío.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿También vendéis ebooks?</h3>
                <p className="text-muted-foreground">Sí. Muchos de nuestros títulos están disponibles en formato digital. Puedes encontrarlos tanto en nuestra tienda directa como en plataformas de ebooks.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Tienda;
