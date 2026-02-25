import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Globe, ShoppingBag, ShoppingCart, Truck, MapPin, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { DISTRIBUTION_NETWORK, COUNTRIES_WITH_STORE, TOTAL_COUNTRIES } from "@/data/distributionNetwork";

const distributionStores = COUNTRIES_WITH_STORE.map(c => ({
  flag: c.flag,
  name: c.country,
  subtitle: c.country === "España" ? "Distribuidores: " + c.distributor : c.distributor,
  url: c.storeUrl!,
}));

const storeStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo Cultural Dauro",
  "url": "https://grupodauro.com",
  "logo": "https://grupodauro.com/og-logo.png",
  "description": "Editorial y grupo cultural con distribución internacional de libros en Europa, Estados Unidos y Latinoamérica.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Granada",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "areaServed": [
    { "@type": "Place", "name": "Europa" },
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
    "https://grupodauro.com"
  ]
};

const Tienda = () => {
  return (
    <>
      <SEO
        title="Comprar Libros Online — Envío a Europa, USA y Latinoamérica"
        description="Compra libros de Grupo Cultural Dauro con envío a España, Europa, Estados Unidos, México, Argentina, Colombia, Chile y más. Tienda directa y distribución internacional."
        keywords="comprar libros online, editorial española, envío internacional libros, libros España, libros Latinoamérica, libros Europa, editorial Granada, Ediciones Dauro, distribución libros"
        url="https://grupodauro.com/tienda"
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
                Disponibles en <strong className="text-foreground">España</strong>, toda <strong className="text-foreground">Europa</strong> (excepto Reino Unido), <strong className="text-foreground">Estados Unidos</strong> y los principales países de <strong className="text-foreground">Latinoamérica</strong> a través de distribuidores locales. Elige tu zona y recibe tu pedido con envío local.
              </p>
            </div>
          </header>

          {/* Compra directa */}
          <section className="mb-20" aria-labelledby="compra-directa">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h2 id="compra-directa" className="text-2xl md:text-3xl font-bold text-foreground">Compra directa</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Nuestras tiendas propias con todo el catálogo, gestionadas directamente por Grupo Dauro. Atención personalizada y envío desde España.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <Link
                to="/shop"
                className="group flex items-center gap-5 p-7 rounded-2xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-5xl">🇪🇸</span>
                <div className="flex-1">
                  <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors block">
                    Ediciones Dauro
                  </span>
                  <span className="text-sm text-muted-foreground">Catálogo completo</span>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
              <Link
                to="/shop"
                className="group flex items-center gap-5 p-7 rounded-2xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1">
                  <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors block">
                    Tienda Online
                  </span>
                  <span className="text-sm text-muted-foreground">Compra directa con envío desde España</span>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            </div>
          </section>

          {/* Distribución internacional */}
          <section aria-labelledby="distribucion-internacional">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 id="distribucion-internacional" className="text-2xl md:text-3xl font-bold text-foreground">Tiendas online internacionales</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Red de tiendas gestionadas por <strong className="text-foreground">Quares</strong>, nuestro socio de distribución internacional. Compra desde tu país con envío local y sin aduanas.
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

          {/* Red de distribuidores y puntos de venta */}
          <section className="mt-20 border-t border-border pt-12" aria-labelledby="distribuidores-red">
            <div className="flex items-center gap-3 mb-3">
              <Store className="h-6 w-6 text-primary" />
              <h2 id="distribuidores-red" className="text-2xl md:text-3xl font-bold text-foreground">Distribuidores y puntos de venta</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Trabajamos con distribuidores locales en cada país para garantizar disponibilidad en librerías físicas y marketplaces.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DISTRIBUTION_NETWORK.map((c) => (
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
                <p className="text-muted-foreground">Sí. Tenemos tiendas específicas para Europa, Estados Unidos y los principales países de Latinoamérica. Si tu país no aparece, puedes comprar a través de la tienda europea o contactarnos directamente.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">¿Quién gestiona la distribución internacional?</h3>
                <p className="text-muted-foreground">La distribución fuera de España la gestiona Quares, una empresa especializada en distribución editorial internacional con almacenes en cada zona.</p>
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
