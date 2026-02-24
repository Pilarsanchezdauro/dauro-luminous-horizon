import { Link } from "react-router-dom";
import { Globe, ExternalLink, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORES = [
  { flag: "🇪🇺", name: "Europa" },
  { flag: "🇺🇸", name: "EE.UU." },
  { flag: "🇲🇽", name: "México" },
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇨🇱", name: "Chile" },
  { flag: "🇪🇨", name: "Ecuador" },
  { flag: "🇧🇴", name: "Bolivia" },
  { flag: "🇨🇷", name: "Costa Rica" },
  { flag: "🇬🇹", name: "Guatemala" },
  { flag: "🇻🇪", name: "Venezuela" },
];

interface GlobalDistributionBannerProps {
  /** "full" = homepage style with CTA. "compact" = inline for author pages. "mini" = single line for popups */
  variant?: "full" | "compact" | "mini";
}

export const GlobalDistributionBanner = ({ variant = "full" }: GlobalDistributionBannerProps) => {
  if (variant === "mini") {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">
          <Globe className="w-3.5 h-3.5" />
        </span>
        <span>
          Distribución en <strong className="text-foreground">11 países</strong>: Europa, EE.UU. y Latinoamérica
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
            <p className="text-sm text-muted-foreground">Distribución directa en 11 países</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {STORES.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1.5 bg-background/80 border border-border px-3 py-1.5 rounded-full text-sm">
              <span>{s.flag}</span>
              <span className="text-foreground font-medium">{s.name}</span>
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Tus lectores compran con <strong className="text-foreground">envío local</strong> y sin aduanas desde su propio país.
        </p>
        <Link to="/tienda" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold mt-3 hover:underline">
          Ver todas las tiendas <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
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
              Si eres <strong className="text-foreground">autor</strong>, tu libro llegará a lectores de <strong className="text-foreground">Europa, Estados Unidos y Latinoamérica</strong> con envío local en cada país. Si eres <strong className="text-foreground">lector</strong>, compra desde tu país sin aduanas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {STORES.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border px-4 py-2.5 rounded-xl text-sm hover:border-primary/40 transition-colors">
                <span className="text-xl">{s.flag}</span>
                <span className="font-medium text-foreground">{s.name}</span>
              </span>
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
