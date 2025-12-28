import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Loader2, ArrowLeft, Award, Gem, Film, Trophy, FileCheck, BookOpen, User, Tag, BookMarked, CreditCard } from "lucide-react";
import { getProductByHandle, createCheckoutForProduct } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { parseProductDescription } from "@/lib/description-parser";

export default function ProductDetail() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (handle) {
      loadProduct();
    }
  }, [handle]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const data = await getProductByHandle(handle!);
      if (!data) {
        toast.error("Producto no encontrado");
        navigate('/tienda');
        return;
      }
      setProduct(data);
      const firstVariant = data.variants.edges[0]?.node;
      if (firstVariant) {
        setSelectedVariant(firstVariant);
        const options: Record<string, string> = {};
        firstVariant.selectedOptions.forEach((opt: any) => {
          options[opt.name] = opt.value;
        });
        setSelectedOptions(options);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error("Error al cargar el producto");
      navigate('/tienda');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const variant = product.variants.edges.find((edge: any) => {
      return edge.node.selectedOptions.every((opt: any) => 
        newOptions[opt.name] === opt.value
      );
    });

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const productData: ShopifyProduct = {
      node: product
    };

    const cartItem = {
      product: productData,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Producto agregado al carrito", {
      position: "top-center",
    });
  };

  const handleBuyNow = async () => {
    if (!handle) return;
    
    setIsCheckoutLoading(true);
    try {
      const checkoutUrl = await createCheckoutForProduct(handle);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error("Error al procesar la compra", {
        description: "Por favor intenta nuevamente"
      });
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-28">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!product) {
    return null;
  }

  const productUrl = `https://grupodauro.com/producto/${product.handle}`;
  const productImage = product.images.edges[0]?.node?.url || 'https://grupodauro.com/og-image.jpg';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": productImage,
    "url": productUrl,
    "offers": {
      "@type": "Offer",
      "price": parseFloat(selectedVariant.price.amount).toFixed(2),
      "priceCurrency": selectedVariant.price.currencyCode,
      "availability": selectedVariant.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": productUrl,
      "seller": {
        "@type": "Organization",
        "name": "Grupo Cultural Dauro"
      }
    },
    "brand": {
      "@type": "Organization",
      "name": "Ediciones Dauro"
    }
  };

  return (
    <>
      <SEO
        title={product.title}
        description={product.description || `Compra ${product.title} en la tienda de Grupo Cultural Dauro. ${selectedVariant.price.currencyCode} ${parseFloat(selectedVariant.price.amount).toFixed(2)}`}
        keywords={`${product.title}, libro, comprar, Ediciones Dauro, literatura, Granada, ${product.tags?.join(', ')}`}
        image={productImage}
        url={productUrl}
        type="product"
        structuredData={structuredData}
      />

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1 pt-28">
          <div className="container mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={() => navigate('/tienda')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a la tienda
              </Button>
              <CartDrawer />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                {product.images.edges[0]?.node && (
                  <Card className="overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/30">
                    <CardContent className="p-8 flex items-center justify-center min-h-[600px]">
                      <img
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || `${product.title} - Comprar libro en Ediciones Dauro`}
                        width="600"
                        height="800"
                        className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                      />
                    </CardContent>
                  </Card>
                )}
                
                {product.images.edges.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.edges.slice(1, 5).map((edge: any, index: number) => (
                      <Card key={index} className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary">
                        <CardContent className="p-0">
                          <img
                            src={edge.node.url}
                            alt={edge.node.altText || `${product.title} - Vista ${index + 2}`}
                            loading="lazy"
                            width="200"
                            height="200"
                            className="w-full h-full object-cover aspect-square"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags?.some((tag: string) => ['novedad', 'novedades', 'nuevo', 'new'].includes(tag.toLowerCase())) && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <Tag className="w-4 h-4" />
                        Novedad
                      </div>
                    )}
                    {product.tags?.some((tag: string) => ['segunda edicion', 'segunda edición', '2a edicion', '2a edición', '2ª edición', '2ª edicion'].includes(tag.toLowerCase())) && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        2ª Edición
                      </div>
                    )}
                    {product.tags?.some((tag: string) => tag.toLowerCase() === 'bestseller') && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <Award className="w-4 h-4" />
                        Éxito de Ventas
                      </div>
                    )}
                    {product.tags?.some((tag: string) => tag.toLowerCase() === 'joya') && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <Gem className="w-4 h-4" />
                        Joya
                      </div>
                    )}
                    {product.tags?.some((tag: string) => tag.toLowerCase() === 'premio andalucía de la crítica') && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <Trophy className="w-4 h-4" />
                        Premio Andalucía de la Crítica
                      </div>
                    )}
                    {product.tags?.some((tag: string) => tag.toLowerCase() === 'basada en hechos reales') && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <FileCheck className="w-4 h-4" />
                        Basada en Hechos Reales
                      </div>
                    )}
                    {product.tags?.some((tag: string) => tag.toLowerCase() === 'cine') && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <Film className="w-4 h-4" />
                        Llevada al Cine
                      </div>
                    )}
                    {product.tags?.some((tag: string) => ['segunda mano', 'segunda-mano', 'descatalogado'].includes(tag.toLowerCase())) && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm uppercase tracking-wide">
                        <BookMarked className="w-4 h-4" />
                        Segunda Mano
                      </div>
                    )}
                  </div>
                  
                  {/* Segunda Mano Info Box */}
                  {product.tags?.some((tag: string) => ['segunda mano', 'segunda-mano', 'descatalogado'].includes(tag.toLowerCase())) && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <BookMarked className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold text-amber-800 dark:text-amber-200">Ejemplar de Segunda Mano</p>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Este libro está descatalogado y se vende como ejemplar único de segunda mano. 
                            El libro se encuentra en <strong>buen estado de conservación</strong>, con posibles marcas menores de uso propias de un libro leído.
                          </p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                            Una vez vendido, no habrá más unidades disponibles.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <h1 className="text-4xl font-bold mb-4 uppercase">{product.title}</h1>
                  <p className="text-3xl font-bold text-primary mb-6">
                    {selectedVariant.price.currencyCode}{' '}
                    {parseFloat(selectedVariant.price.amount).toFixed(2)}
                  </p>
                </div>

                {product.description && (() => {
                  const { sinopsis, autor, paginas } = parseProductDescription(product.description);
                  return (
                    <div className="space-y-6">
                      {sinopsis && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold">Sinopsis</h2>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {sinopsis}
                          </p>
                        </div>
                      )}
                      
                      {autor && (
                        <div className="border-t pt-6">
                          <div className="flex items-center gap-2 mb-3">
                            <User className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold">Sobre el autor</h2>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {autor.replace(/^(EL AUTOR|LA AUTORA|LOS AUTORES|LAS AUTORAS)\s*/i, '')}
                          </p>
                        </div>
                      )}
                      
                      {(product.productType || paginas) && (
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t pt-4">
                          {product.productType && (
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4" />
                              <span><strong>Género:</strong> {product.productType}</span>
                            </div>
                          )}
                          {paginas && (
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span><strong>Páginas:</strong> {paginas}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {product.options && product.options.length > 0 && (
                  <div className="space-y-4">
                    {product.options.map((option: any) => (
                      <div key={option.name}>
                        <label className="text-sm font-medium mb-2 block">
                          {option.name}
                        </label>
                        <Select
                          value={selectedOptions[option.name]}
                          onValueChange={(value) => handleOptionChange(option.name, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {option.values.map((value: string) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <Button 
                    onClick={handleBuyNow}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    disabled={!selectedVariant?.availableForSale || isCheckoutLoading}
                  >
                    {isCheckoutLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        {selectedVariant?.availableForSale 
                          ? 'Comprar Ahora' 
                          : 'Agotado'}
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full"
                    size="lg"
                    variant="outline"
                    disabled={!selectedVariant?.availableForSale}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Agregar al Carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
