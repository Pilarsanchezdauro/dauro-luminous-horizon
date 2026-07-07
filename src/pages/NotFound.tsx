import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Página no encontrada | Grupo Dauro</title>
        <meta
          name="description"
          content="La página que buscas no existe. Vuelve al inicio o visita el blog y la tienda de Grupo Dauro."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <Navigation />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-10 shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Error 404</p>
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
              Página no encontrada
            </h1>
            <p className="text-muted-foreground mb-8">
              No existe contenido en{" "}
              <span className="font-mono text-foreground/80">{location.pathname}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/">Ir al inicio</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/blog">Ver el blog</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/tienda">Ir a la tienda</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
