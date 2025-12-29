import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Truck, MapPin, Package, Globe, AlertTriangle } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

type ShippingDestination = "peninsula" | "baleares" | "canarias" | "europa" | "uk" | "mundial";

interface ShippingRate {
  label: string;
  baseCost: number;
  perBookExtra: number;
  freeThreshold: number | null;
  hasCustoms: boolean;
}

const SHIPPING_RATES: Record<ShippingDestination, ShippingRate> = {
  peninsula: {
    label: "España Peninsular",
    baseCost: 3.50,
    perBookExtra: 1.00,
    freeThreshold: 15,
    hasCustoms: false,
  },
  baleares: {
    label: "Islas Baleares",
    baseCost: 5.50,
    perBookExtra: 1.50,
    freeThreshold: null,
    hasCustoms: false,
  },
  canarias: {
    label: "Islas Canarias",
    baseCost: 8.00,
    perBookExtra: 2.00,
    freeThreshold: null,
    hasCustoms: false,
  },
  europa: {
    label: "Unión Europea",
    baseCost: 12.00,
    perBookExtra: 3.00,
    freeThreshold: null,
    hasCustoms: false,
  },
  uk: {
    label: "Reino Unido",
    baseCost: 18.00,
    perBookExtra: 5.00,
    freeThreshold: null,
    hasCustoms: true,
  },
  mundial: {
    label: "Resto del mundo",
    baseCost: 20.00,
    perBookExtra: 6.00,
    freeThreshold: null,
    hasCustoms: true,
  },
};

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shippingDestination, setShippingDestination] = useState<ShippingDestination>("peninsula");
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  // Calculate shipping cost
  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0;
    
    const rate = SHIPPING_RATES[shippingDestination];
    
    // Check if free shipping applies
    if (rate.freeThreshold && subtotal >= rate.freeThreshold) {
      return 0;
    }
    
    // Calculate shipping based on number of books
    const extraBooks = Math.max(0, totalItems - 1);
    return rate.baseCost + (extraBooks * rate.perBookExtra);
  }, [items, shippingDestination, subtotal, totalItems]);

  const isFreeShipping = shippingCost === 0 && items.length > 0;
  const currentRate = SHIPPING_RATES[shippingDestination];
  const totalWithShipping = subtotal + shippingCost;

  const handleCheckout = async () => {
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Error al crear el checkout", {
        description: "Por favor intenta nuevamente"
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Tu carrito está vacío" : `${totalItems} ${totalItems !== 1 ? 'productos' : 'producto'} en tu carrito`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product.node.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className="font-semibold">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-3 pt-4 border-t bg-background">
                {/* Shipping destination selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Destino de envío
                  </label>
                  <Select
                    value={shippingDestination}
                    onValueChange={(value: ShippingDestination) => setShippingDestination(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peninsula">
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          España Peninsular
                        </span>
                      </SelectItem>
                      <SelectItem value="baleares">
                        <span className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Islas Baleares
                        </span>
                      </SelectItem>
                      <SelectItem value="canarias">
                        <span className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Islas Canarias
                        </span>
                      </SelectItem>
                      <SelectItem value="europa">
                        <span className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Unión Europea
                        </span>
                      </SelectItem>
                      <SelectItem value="uk">
                        <span className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Reino Unido ⚠️
                        </span>
                      </SelectItem>
                      <SelectItem value="mundial">
                        <span className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Resto del mundo ⚠️
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Customs warning */}
                {currentRate.hasCustoms && (
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-2">
                    <p className="text-xs text-red-800 dark:text-red-200 flex items-start gap-1">
                      <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Costes aduaneros adicionales</strong> no incluidos. Aranceles e impuestos de importación a cargo del comprador.
                        {shippingDestination === "uk" && " Brexit: costes elevados."}
                      </span>
                    </p>
                  </div>
                )}

                {/* Price breakdown */}
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío ({currentRate.label})</span>
                    {isFreeShipping ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">¡Gratis!</span>
                    ) : (
                      <span>€ {shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  {currentRate.freeThreshold && subtotal < currentRate.freeThreshold && (
                    <p className="text-xs text-muted-foreground">
                      Añade € {(currentRate.freeThreshold - subtotal).toFixed(2)} más para envío gratis
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-semibold">Total estimado</span>
                  <span className="text-xl font-bold">
                    € {totalWithShipping.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  El coste final se confirmará en el checkout.{' '}
                  <Link to="/terminos#politica-envios" className="underline hover:text-foreground" onClick={() => setIsOpen(false)}>
                    Ver política de envíos
                  </Link>
                </p>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Finalizar Compra
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
