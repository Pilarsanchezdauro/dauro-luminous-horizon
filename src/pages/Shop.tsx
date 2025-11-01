import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Loader2 } from "lucide-react";
import { getProducts } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts(20);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error("Error al cargar productos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Producto agregado al carrito", {
      position: "top-center",
    });
  };

  return (
    <>
      <Helmet>
        <title>Tienda - Grupo Cultural Dauro</title>
        <meta name="description" content="Descubre nuestra colección de productos culturales. Arte, literatura y más en la tienda de Grupo Cultural Dauro." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1 pt-28">
          <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Tienda</h1>
                <p className="text-xl text-muted-foreground">
                  Descubre nuestra colección de productos culturales
                </p>
              </div>
              <CartDrawer />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No hay productos disponibles</h2>
                <p className="text-muted-foreground">
                  Pronto agregaremos nuevos productos a nuestra tienda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.node.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/producto/${product.node.handle}`} className="block">
                      {product.node.images.edges[0]?.node && (
                        <div className="aspect-square overflow-hidden bg-secondary/20">
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.images.edges[0].node.altText || product.node.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                    </Link>
                    
                    <CardHeader>
                      <Link to={`/producto/${product.node.handle}`}>
                        <CardTitle className="hover:text-primary transition-colors line-clamp-2">
                          {product.node.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="line-clamp-2">
                        {product.node.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <p className="text-2xl font-bold">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full"
                        disabled={!product.node.variants.edges[0]?.node.availableForSale}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.node.variants.edges[0]?.node.availableForSale 
                          ? 'Agregar al Carrito' 
                          : 'Agotado'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
