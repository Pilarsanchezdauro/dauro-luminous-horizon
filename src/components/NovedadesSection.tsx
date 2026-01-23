import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ShoppingCart, Loader2, BookOpen, RotateCcw, Trophy } from "lucide-react";
import { getAllProducts } from "@/lib/shopify";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";

// Libros premiados específicos (por título)
const LIBROS_PREMIADOS = [
  'yo soy todos los besos que nunca pude darte',
  'horizonte interior',
  'boabdil el príncipe del día y de la noche',
  'boabdil el principe del dia y de la noche',
  'boabdil, el príncipe del día y de la noche',
  'boabdil, el principe del dia y de la noche',
];

// Helper to check if product is "premiado" (awarded book)
const isPremiado = (product: ShopifyProduct) => {
  const titleLower = product.node.title.toLowerCase().trim();
  return LIBROS_PREMIADOS.some(titulo => titleLower.includes(titulo) || titulo.includes(titleLower));
};

export const NovedadesSection = () => {
  const [novedades, setNovedades] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadNovedades = async () => {
      try {
        const allProducts = await getAllProducts();
        
        // Filtrar productos premiados y novedades
        const novedadProducts = allProducts.filter((p: ShopifyProduct) => {
          const tags = p.node.tags || [];
          const tagsLower = tags.map((t: string) => t.toLowerCase());
          const esNovedad = tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new') || tagsLower.includes('segunda edicion') || tagsLower.includes('segunda edición') || tagsLower.includes('2a edicion') || tagsLower.includes('2a edición');
          const esPremiado = isPremiado(p);
          return esNovedad || esPremiado;
        });

        // Ordenar: premiados primero, luego por fecha
        const sortedNovedades = novedadProducts.sort((a, b) => {
          const aIsPremiado = isPremiado(a) ? 0 : 1;
          const bIsPremiado = isPremiado(b) ? 0 : 1;
          if (aIsPremiado !== bIsPremiado) return aIsPremiado - bIsPremiado;
          
          const dateA = new Date(a.node.createdAt || 0).getTime();
          const dateB = new Date(b.node.createdAt || 0).getTime();
          return dateB - dateA;
        });

        setNovedades(sortedNovedades.slice(0, 4));
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
                    
                                    {/* Badge EBOOK - Esquina superior izquierda */}
                                    {(() => {
                                      const tags = product.node.tags || [];
                                      const tagsLower = tags.map((t: string) => t.toLowerCase());
                                      const hasEbook = tagsLower.includes('ebook');
                                      return hasEbook ? (
                                        <div className="absolute top-4 left-4 bg-cyan-500 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                                          Ebook
                                        </div>
                                      ) : null;
                                    })()}
                                    
                                    {/* Badges DERECHA - Novedad/Premio */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                      {(() => {
                                        const tags = product.node.tags || [];
                                        const tagsLower = tags.map((t: string) => t.toLowerCase());
                                        const isSegundaEdicion = tagsLower.includes('segunda edicion') || tagsLower.includes('segunda edición') || tagsLower.includes('2a edicion') || tagsLower.includes('2a edición');
                                        const isNovedadTag = tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
                                        const esPremiado = isPremiado(product);
                                        
                                        return (
                                          <>
                                            {isNovedadTag && (
                                              <div className="bg-emerald-600 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                                                Novedad
                                              </div>
                                            )}
                                            {esPremiado && (
                                              <div className="bg-amber-500 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md animate-pulse">
                                                Premio
                                              </div>
                                            )}
                                            {isSegundaEdicion && (
                                              <div className="flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-blue-600 bg-white/90 backdrop-blur-sm transform -rotate-12 shadow-lg">
                                                <div className="text-center">
                                                  <span className="block text-blue-600 font-black text-[9px] uppercase tracking-tight leading-none">2ª</span>
                                                  <span className="block text-blue-600 font-bold text-[7px] uppercase tracking-wide leading-tight">Edición</span>
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        );
                                      })()}
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
                    
                    {/* Precios por formato */}
                    <div className="space-y-1.5 mb-4">
                      {(() => {
                        const physicalVariant = product.node.variants.edges.find(
                          v => !v.node.title.toLowerCase().includes('ebook')
                        );
                        const ebookVariant = product.node.variants.edges.find(
                          v => v.node.title.toLowerCase().includes('ebook')
                        );
                        const tags = product.node.tags || [];
                        const tagsLower = tags.map((t: string) => t.toLowerCase());
                        const hasEbook = tagsLower.includes('ebook');
                        
                        return (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium border border-amber-200 dark:border-amber-800">
                                <BookOpen className="w-3 h-3" />
                                Papel
                              </span>
                              <span className="text-base font-bold">
                                {physicalVariant ? `${parseFloat(physicalVariant.node.price.amount).toFixed(2)} €` : `${parseFloat(price.amount).toFixed(2)} €`}
                              </span>
                            </div>
                            {hasEbook && (
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-xs font-medium border border-cyan-200 dark:border-cyan-800">
                                  <BookOpen className="w-3 h-3" />
                                  Ebook
                                </span>
                                <span className="text-base font-bold text-cyan-700 dark:text-cyan-300">
                                  {ebookVariant ? `${parseFloat(ebookVariant.node.price.amount).toFixed(2)} €` : '9.99 €'}
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    
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
