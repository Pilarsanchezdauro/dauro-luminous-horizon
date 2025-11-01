import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Loader2, ArrowLeft } from "lucide-react";
import { getProductByHandle } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

export default function ProductDetail() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <>
      <Helmet>
        <title>{product.title} - Grupo Cultural Dauro</title>
        <meta name="description" content={product.description || `Compra ${product.title} en la tienda de Grupo Cultural Dauro`} />
      </Helmet>

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
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        className="w-full h-auto object-cover"
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
                            alt={edge.node.altText || `${product.title} ${index + 2}`}
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
                  <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                  <p className="text-3xl font-bold text-primary mb-6">
                    {selectedVariant.price.currencyCode}{' '}
                    {parseFloat(selectedVariant.price.amount).toFixed(2)}
                  </p>
                </div>

                {product.description && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>
                )}

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

                <div className="space-y-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full"
                    size="lg"
                    disabled={!selectedVariant?.availableForSale}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {selectedVariant?.availableForSale 
                      ? 'Agregar al Carrito' 
                      : 'Agotado'}
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
