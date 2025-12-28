import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ShoppingCart, Loader2, BookOpen, RotateCcw } from "lucide-react";
import { getAllProducts } from "@/lib/shopify";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";

export const NovedadesSection = () => {
  const [novedades, setNovedades] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadNovedades = async () => {
      try {
        const allProducts = await getAllProducts();
        
        const novedadProducts = allProducts.filter((p: ShopifyProduct) => {
          const tags = p.node.tags || [];
          const tagsLower = tags.map((t: string) => t.toLowerCase());
          return tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new') || tagsLower.includes('segunda edicion') || tagsLower.includes('segunda edición') || tagsLower.includes('2a edicion') || tagsLower.includes('2a edición');
        });

        setNovedades(novedadProducts.slice(0, 4));
      } catch (error) {
        console.error('Error loading novedades:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNovedades();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
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
      <section className="py-24 bg-gradient-to-b from-background via-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (novedades.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-card/30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header con estilo editorial */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">Recién llegados</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
            Novedades <span className="text-primary">Editoriales</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Las últimas publicaciones que están marcando tendencia en el mundo literario
          </p>
        </div>

        {/* Grid de productos con diseño asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {novedades.map((product, index) => {
            const price = product.node.priceRange.minVariantPrice;
            const image = product.node.images?.edges?.[0]?.node;
            const isHovered = hoveredIndex === index;
            
            return (
              <Link 
                to={`/tienda/producto/${product.node.handle}`}
                key={product.node.id}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`
                  relative bg-card rounded-3xl overflow-hidden
                  border-2 transition-all duration-500 ease-out
                  ${isHovered ? 'border-primary shadow-2xl shadow-primary/20 -translate-y-2' : 'border-border/50 shadow-lg'}
                `}>
                  {/* Imagen con overlay */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {image ? (
                      <>
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className={`
                            w-full h-full object-cover transition-all duration-700
                            ${isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'}
                          `}
                        />
                        <div className={`
                          absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent
                          transition-opacity duration-300
                          ${isHovered ? 'opacity-80' : 'opacity-40'}
                        `} />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <BookOpen className="h-16 w-16 text-muted-foreground/50" />
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {(() => {
                        const tags = product.node.tags || [];
                        const tagsLower = tags.map((t: string) => t.toLowerCase());
                        const isSegundaEdicion = tagsLower.includes('segunda edicion') || tagsLower.includes('segunda edición') || tagsLower.includes('2a edicion') || tagsLower.includes('2a edición');
                        const isNovedad = tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
                        
                        return (
                          <>
                            {isNovedad && (
                              <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1.5 shadow-lg">
                                <Sparkles className="h-3 w-3 mr-1.5" />
                                Novedad
                              </Badge>
                            )}
                            {isSegundaEdicion && (
                              <Badge className="bg-secondary text-secondary-foreground font-semibold px-3 py-1.5 shadow-lg">
                                <RotateCcw className="h-3 w-3 mr-1.5" />
                                2ª Edición
                              </Badge>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    {/* Precio flotante */}
                    <div className={`
                      absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2
                      shadow-lg transition-all duration-300
                      ${isHovered ? 'scale-110' : 'scale-100'}
                    `}>
                      <span className="font-bold text-primary">
                        {parseFloat(price.amount).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className={`
                      font-serif font-bold text-xl mb-3 line-clamp-2 transition-colors duration-300 uppercase
                      ${isHovered ? 'text-primary' : 'text-foreground'}
                    `}>
                      {product.node.title}
                    </h3>
                    
                    {product.node.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {product.node.description}
                      </p>
                    )}
                    
                    {/* Botón añadir al carrito */}
                    <Button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`
                        w-full transition-all duration-300 group/btn
                        ${isHovered ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
                      `}
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
                      Añadir al carrito
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA final con diseño destacado */}
        <div className="text-center">
          <Link to="/tienda">
            <Button 
              size="lg" 
              variant="outline" 
              className="group px-8 py-6 text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <span>Explorar todas las novedades</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NovedadesSection;
