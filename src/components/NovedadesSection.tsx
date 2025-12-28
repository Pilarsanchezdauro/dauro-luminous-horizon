import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import { getAllProducts } from "@/lib/shopify";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";

export const NovedadesSection = () => {
  const [novedades, setNovedades] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadNovedades = async () => {
      try {
        const allProducts = await getAllProducts();
        
        // Filter products with "novedad" tag
        const novedadProducts = allProducts.filter((p: ShopifyProduct) => {
          const tags = p.node.tags || [];
          const tagsLower = tags.map((t: string) => t.toLowerCase());
          return tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
        });

        // Sort by id (products created later usually have higher IDs)
        // Since publishedAt/createdAt aren't in the type, we just use the order from the API
        setNovedades(novedadProducts.slice(0, 4));
      } catch (error) {
        console.error('Error loading novedades:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNovedades();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success(`${product.node.title} añadido al carrito`);
  };

  if (isLoading) {
    return (
      <section className="my-20">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (novedades.length === 0) {
    return null;
  }

  return (
    <section className="my-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Recién llegados</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
          Novedades Editoriales
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubre las últimas publicaciones de Ediciones Dauro
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {novedades.map((product) => {
          const price = product.node.priceRange.minVariantPrice;
          const image = product.node.images?.edges?.[0]?.node;
          
          return (
            <div 
              key={product.node.id} 
              className="group bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <Link to={`/tienda/producto/${product.node.handle}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                      <span className="text-muted-foreground">Sin imagen</span>
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Novedad
                  </Badge>
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/tienda/producto/${product.node.handle}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.node.title}
                  </h3>
                </Link>
                <p className="text-xl font-bold text-primary mb-3">
                  {parseFloat(price.amount).toFixed(2)} {price.currencyCode}
                </p>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Añadir al carrito
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link to="/tienda">
          <Button size="lg" variant="outline" className="group">
            Ver todas las novedades
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NovedadesSection;
