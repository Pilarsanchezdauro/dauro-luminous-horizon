import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Globe, MapPin } from "lucide-react";
import { SEO } from "@/components/SEO";

const stores = [
  { flag: "🇪🇸", name: "España", url: "https://tienda.grupodauro.com" },
  { flag: "🇲🇽", name: "México", url: "https://mexico.grupodauro.com" },
  { flag: "🇦🇷", name: "Argentina", url: "https://argentina.grupodauro.com" },
  { flag: "🇨🇱", name: "Chile", url: "https://chile.grupodauro.com" },
  { flag: "🇪🇨", name: "Ecuador", url: "https://ecuador.grupodauro.com" },
  { flag: "🇺🇸", name: "USA", url: "https://usa.grupodauro.com" },
  { flag: "🇨🇴", name: "Colombia", url: "https://colombia.grupodauro.com" },
  { flag: "🇧🇴", name: "Bolivia", url: "https://bolivia.grupodauro.com" },
  { flag: "🇨🇷", name: "Costa Rica", url: "https://costarica.grupodauro.com" },
  { flag: "🇬🇹", name: "Guatemala", url: "https://guatemala.grupodauro.com" },
  { flag: "🇻🇪", name: "Venezuela", url: "https://venezuela.grupodauro.com" },
];

const Tienda = () => {
  return (
    <>
      <SEO
        title="Tienda Internacional | Grupo Cultural Dauro"
        description="Compra nuestros libros desde España, Latinoamérica, USA y toda Europa. Envíos internacionales disponibles."
      />
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Hero banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 border border-border p-8 md:p-12 mb-12 text-center">
            <Globe className="mx-auto h-14 w-14 text-primary mb-6 opacity-80" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Nuestros libros, en todo el mundo
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nuestros libros están disponibles en <strong className="text-foreground">toda Europa</strong> (excepto Reino Unido), <strong className="text-foreground">Estados Unidos</strong> y en los principales países de <strong className="text-foreground">Latinoamérica</strong>. Poco a poco iremos ampliando a más tiendas alrededor del mundo.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Elige tu país y accede a nuestra tienda más cercana</span>
            </div>
          </div>

          {/* Store grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent/20 hover:border-primary/40 transition-all duration-200"
              >
                <span className="text-3xl">{store.flag}</span>
                <span className="text-base font-medium text-card-foreground group-hover:text-primary transition-colors">
                  {store.name}
                </span>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Tienda;
