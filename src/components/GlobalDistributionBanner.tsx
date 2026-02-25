import { Link } from "react-router-dom";
import { Globe, ExternalLink, Truck, MapPin, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISTRIBUTION_NETWORK, ACTIVE_COUNTRIES, TOTAL_COUNTRIES } from "@/data/distributionNetwork";

interface GlobalDistributionBannerProps {
  /** "full" = homepage style with CTA. "compact" = inline for author pages. "mini" = single line for popups. "detailed" = full network with channels */
  variant?: "full" | "compact" | "mini" | "detailed";
}

export const GlobalDistributionBanner = ({ variant = "full" }: GlobalDistributionBannerProps) => {
  if (variant === "mini") {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">
          <Globe className="w-3.5 h-3.5" />
        </span>
        <span>
          Distribución en <strong className="text-foreground">toda Europa, EE.UU. y Latinoamérica</strong>
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Tu libro, en todo el mundo</h3>
            <p className="text-sm text-muted-foreground">Distribución en toda Europa, EE.UU. y Latinoamérica</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {DISTRIBUTION_NETWORK.map((c) => (
            <span key={c.country} className="inline-flex items-center gap-1.5 bg-background/80 border border-border px-3 py-1.5 rounded-full text-sm">
              <span>{c.flag}</span>
              <span className="text-foreground font-medium">{c.short}</span>
            </span>
          ))}
        </div>
        {/* Top distributors */}
        <div className="space-y-1.5 mb-4">
          {ACTIVE_COUNTRIES.slice(0, 4).map((c) => (
            <div key={c.country} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{c.flag}</span>
              <span className="font-medium text-foreground">{c.country}:</span>
              <span>{c.distributor}</span>
              {c.channels.length > 0 && (
                <span className="text-xs">({c.channels.map(ch => ch.name).join(", ")})</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Tus lectores compran con <strong className="text-foreground">envío local</strong> y sin aduanas desde su propio país.
        </p>
        <Link to="/tienda" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold mt-3 hover:underline">
          Ver red completa de distribución <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <section className="my-16" aria-labelledby="red-distribucion-detalle">
        <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-border rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Store className="w-4 h-4" />
              Red de distribución y puntos de venta
            </div>
            <h2 id="red-distribucion-detalle" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dónde encontrar nuestros libros
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trabajamos con distribuidores locales en cada país para que los lectores compren con envío local, sin aduanas y al mejor precio.
            </p>
          </div>

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

                {c.storeUrl && (
                  <a
                    href={c.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-2 hover:underline"
                  >
                    Tienda online <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ¿Conoces un punto de venta que debamos incluir? <Link to="/contacto" className="text-primary font-medium hover:underline">Recomiéndanoslo</Link>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Full variant — for homepage
  return (
    <section className="my-32" aria-labelledby="distribucion-global-home">
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2 border-primary/20 rounded-3xl p-8 md:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Truck className="w-4 h-4" />
              Distribución internacional
            </div>
            <h2 id="distribucion-global-home" className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
              Nuestros libros, en todo el mundo
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Si eres <strong className="text-foreground">autor</strong>, tu libro llegará a lectores de <strong className="text-foreground">toda Europa, EE.UU. y Latinoamérica</strong> con distribuidores locales y envío nacional en cada territorio. Si eres <strong className="text-foreground">lector</strong>, compra desde tu país sin aduanas.
            </p>
          </div>

          {/* Country flags row */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {DISTRIBUTION_NETWORK.map((c) => (
              <span key={c.country} className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border px-4 py-2.5 rounded-xl text-sm hover:border-primary/40 transition-colors">
                <span className="text-xl">{c.flag}</span>
                <span className="font-medium text-foreground">{c.short}</span>
              </span>
            ))}
          </div>

          {/* Top distributors highlight */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 max-w-4xl mx-auto">
            {ACTIVE_COUNTRIES.filter(c => c.channels.length > 0).slice(0, 6).map((c) => (
              <div key={c.country} className="bg-background/60 backdrop-blur-sm border border-border rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-semibold text-foreground text-sm">{c.country}</span>
                </div>
                <p className="text-xs text-muted-foreground">{c.distributor}</p>
                {c.channels.length > 0 && (
                  <p className="text-xs text-primary mt-1">{c.channels.map(ch => ch.name).join(" · ")}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tienda">
              <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all">
                <Globe className="w-5 h-5 mr-2" />
                Ver tiendas por país
              </Button>
            </Link>
            <Link to="/autoedicion">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 hover:border-primary/60 transition-all">
                Publica tu libro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
