import { useState } from "react";
import { Calculator, Package, Truck, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

type Destination = "peninsula" | "canarias" | "baleares" | "europa" | "uk" | "mundial";

interface ShippingRate {
  label: string;
  baseCost: number;
  perBookExtra: number;
  freeThreshold: number | null;
}

const SHIPPING_RATES: Record<Destination, ShippingRate> = {
  peninsula: {
    label: "España Peninsular",
    baseCost: 3.50,
    perBookExtra: 1.00,
    freeThreshold: 15, // Free shipping for orders >= 15€
  },
  baleares: {
    label: "Islas Baleares",
    baseCost: 5.50,
    perBookExtra: 1.50,
    freeThreshold: null, // Always paid
  },
  canarias: {
    label: "Islas Canarias",
    baseCost: 8.00,
    perBookExtra: 2.00,
    freeThreshold: null, // Always paid
  },
  europa: {
    label: "Unión Europea",
    baseCost: 12.00,
    perBookExtra: 3.00,
    freeThreshold: null, // Always paid
  },
  uk: {
    label: "Reino Unido",
    baseCost: 18.00,
    perBookExtra: 5.00,
    freeThreshold: null, // Always paid + customs
  },
  mundial: {
    label: "Resto del mundo",
    baseCost: 20.00,
    perBookExtra: 6.00,
    freeThreshold: null, // Always paid + customs
  },
};

// Countries with customs requirements
const CUSTOMS_DESTINATIONS: Destination[] = ["uk", "mundial"];

export const ShippingCalculator = () => {
  const [destination, setDestination] = useState<Destination>("peninsula");
  const [orderTotal, setOrderTotal] = useState<string>("");
  const [bookCount, setBookCount] = useState<string>("1");
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  const calculateShipping = () => {
    const total = parseFloat(orderTotal) || 0;
    const books = parseInt(bookCount) || 1;
    const rate = SHIPPING_RATES[destination];

    // Check if free shipping applies
    if (rate.freeThreshold && total >= rate.freeThreshold) {
      setCalculatedCost(0);
      setIsFreeShipping(true);
      return;
    }

    // Calculate shipping cost
    const extraBooks = Math.max(0, books - 1);
    const cost = rate.baseCost + (extraBooks * rate.perBookExtra);
    setCalculatedCost(cost);
    setIsFreeShipping(false);
  };

  const getDestinationIcon = (dest: Destination) => {
    switch (dest) {
      case "peninsula":
        return <MapPin className="h-4 w-4" />;
      case "baleares":
      case "canarias":
        return <Package className="h-4 w-4" />;
      case "europa":
        return <Truck className="h-4 w-4" />;
      case "mundial":
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Calculator className="h-4 w-4" />
          Calcular envío
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Calculador de gastos de envío
          </DialogTitle>
          <DialogDescription>
            Introduce los datos de tu pedido para calcular los gastos de envío estimados.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination">Destino</Label>
            <Select
              value={destination}
              onValueChange={(value: Destination) => {
                setDestination(value);
                setCalculatedCost(null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona destino" />
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

          {/* Order total */}
          <div className="space-y-2">
            <Label htmlFor="orderTotal">Importe del pedido (€)</Label>
            <Input
              id="orderTotal"
              type="number"
              min="0"
              step="0.01"
              placeholder="Ej: 25.00"
              value={orderTotal}
              onChange={(e) => {
                setOrderTotal(e.target.value);
                setCalculatedCost(null);
              }}
            />
          </div>

          {/* Book count */}
          <div className="space-y-2">
            <Label htmlFor="bookCount">Número de libros</Label>
            <Input
              id="bookCount"
              type="number"
              min="1"
              placeholder="1"
              value={bookCount}
              onChange={(e) => {
                setBookCount(e.target.value);
                setCalculatedCost(null);
              }}
            />
          </div>

          <Button onClick={calculateShipping} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular
          </Button>

          {/* Result */}
          {calculatedCost !== null && (
            <>
              <Card className={isFreeShipping ? "border-green-500 bg-green-50 dark:bg-green-950/30" : "border-amber-500 bg-amber-50 dark:bg-amber-950/30"}>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Gastos de envío estimados a {SHIPPING_RATES[destination].label}
                    </p>
                    {isFreeShipping ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ¡GRATIS!
                        </span>
                        <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {calculatedCost.toFixed(2)} €
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Customs warning for UK and international */}
              {CUSTOMS_DESTINATIONS.includes(destination) && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-xs text-red-800 dark:text-red-200">
                    <strong>⚠️ Atención:</strong> Este precio <strong>NO incluye</strong> aranceles, impuestos de importación ni costes de tramitación aduanera, que varían según el país y son responsabilidad del comprador.
                    {destination === "uk" && " Los envíos a Reino Unido tienen costes aduaneros especialmente elevados debido al Brexit."}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Info note */}
          <div className="text-xs text-muted-foreground space-y-1 border-t pt-4">
            <p><strong>Nota:</strong> Este cálculo es orientativo.</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Envío gratuito a España peninsular para pedidos ≥ 15€</li>
              <li>Canarias, Baleares e internacional siempre con gastos de envío</li>
              <li>Reino Unido y otros países: costes aduaneros adicionales</li>
              <li>El coste definitivo se mostrará en el proceso de compra</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
