import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import bookSample from "@/assets/book-sample.jpg";
import artSample from "@/assets/art-sample.jpg";
import { Link } from "react-router-dom";

const Tienda = () => {
  const products = [
    {
      id: 1,
      title: "Título del Libro 1",
      author: "Autor 1",
      category: "Libros",
      price: "18.90",
      image: bookSample,
      link: "/tienda/libros"
    },
    {
      id: 2,
      title: "Obra de Arte 1",
      author: "Artista 1",
      category: "Arte",
      price: "450.00",
      image: artSample,
      link: "/tienda/arte"
    },
    {
      id: 3,
      title: "Título del Libro 2",
      author: "Autor 2",
      category: "Libros",
      price: "22.50",
      image: bookSample,
      link: "/tienda/libros"
    },
    {
      id: 4,
      title: "Álbum Musical 1",
      author: "Compositor 1",
      category: "Música",
      price: "15.00",
      image: artSample,
      link: "/tienda/musica"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-foreground">
              Tienda Dauro
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestro catálogo de libros, obras de arte y música
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Link to="/tienda/libros">
              <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                <h3 className="text-2xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors">
                  Libros
                </h3>
                <p className="text-muted-foreground">
                  Narrativa, ensayo y poesía de nuestro catálogo editorial
                </p>
              </div>
            </Link>

            <Link to="/tienda/arte">
              <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                <h3 className="text-2xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors">
                  Arte
                </h3>
                <p className="text-muted-foreground">
                  Obras originales de artistas representados por Dauro
                </p>
              </div>
            </Link>

            <Link to="/tienda/musica">
              <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                <h3 className="text-2xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors">
                  Música
                </h3>
                <p className="text-muted-foreground">
                  Composiciones y álbumes de nuestros músicos
                </p>
              </div>
            </Link>
          </div>

          {/* Featured Products */}
          <section>
            <h2 className="text-3xl font-playfair font-bold mb-8">
              Productos destacados
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-primary font-semibold">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-playfair font-bold mb-1 mt-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {product.price}€
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Añadir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info Banner */}
          <div className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10 text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Envío gratuito en pedidos superiores a 50€
            </h3>
            <p className="text-muted-foreground">
              Recibe tus productos en 3-5 días laborables. Pagos seguros.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tienda;
