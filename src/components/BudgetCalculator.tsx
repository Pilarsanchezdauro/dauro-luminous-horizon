import { useState, useMemo } from 'react';
import { Calculator, Clock, FileText, Languages, Check } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const PRICE_TIERS = [
  { min: 1, max: 100, price: 690 },
  { min: 101, max: 150, price: 850 },
  { min: 151, max: 200, price: 990 },
  { min: 201, max: 250, price: 1150 },
  { min: 251, max: 300, price: 1290 },
  { min: 301, max: 400, price: 1490 },
];

const DEADLINE_MULTIPLIERS = [
  { days: 120, label: '120 días (4 meses)', multiplier: 1 },
  { days: 90, label: '90 días (3 meses)', multiplier: 1.20 },
  { days: 60, label: '60 días (2 meses)', multiplier: 1.35 },
  { days: 45, label: '45 días', multiplier: 1.50 },
  { days: 30, label: '30 días (urgente)', multiplier: 1.75 },
];

const CORRECTION_OPTIONS = [
  { id: 'none', label: 'Sin corrección', pricePerWord: 0 },
  { id: 'ortho', label: 'Corrección ortotipográfica', pricePerWord: 0.008 },
  { id: 'style', label: 'Corrección de estilo', pricePerWord: 0.012 },
  { id: 'complete', label: 'Corrección completa', pricePerWord: 0.018 },
];

interface BudgetCalculatorProps {
  onRequestQuote: () => void;
}

export const BudgetCalculator = ({ onRequestQuote }: BudgetCalculatorProps) => {
  const [pages, setPages] = useState(150);
  const [deadline, setDeadline] = useState('120');
  const [correction, setCorrection] = useState('none');
  const [includeSalesPanel, setIncludeSalesPanel] = useState(false);

  const calculation = useMemo(() => {
    // Base price by pages
    let basePrice = 0;
    if (pages > 400) {
      basePrice = 1490; // Show base, but indicate consultation needed
    } else {
      const tier = PRICE_TIERS.find(t => pages >= t.min && pages <= t.max);
      basePrice = tier?.price || 690;
    }

    // Deadline multiplier
    const deadlineOption = DEADLINE_MULTIPLIERS.find(d => d.days === parseInt(deadline));
    const multiplier = deadlineOption?.multiplier || 1;
    const adjustedPrice = basePrice * multiplier;

    // Correction cost (estimate ~250 words per page)
    const estimatedWords = pages * 250;
    const correctionOption = CORRECTION_OPTIONS.find(c => c.id === correction);
    const correctionCost = estimatedWords * (correctionOption?.pricePerWord || 0);

    // Sales panel
    const salesPanelCost = includeSalesPanel ? 75 : 0;

    const total = adjustedPrice + correctionCost + salesPanelCost;

    return {
      basePrice,
      adjustedPrice,
      correctionCost,
      salesPanelCost,
      total,
      isConsultation: pages > 400,
      estimatedWords,
    };
  }, [pages, deadline, correction, includeSalesPanel]);

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Calcula tu presupuesto</h3>
          <p className="text-muted-foreground">Precio orientativo en tiempo real</p>
        </div>
      </div>

      <div className="space-y-8 flex-1 flex flex-col">
        {/* Pages Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4" />
              Número de páginas
            </Label>
            <span className="text-2xl font-bold text-primary">{pages}</span>
          </div>
          <Slider
            value={[pages]}
            onValueChange={(value) => setPages(value[0])}
            min={50}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>50</span>
            <span>500+</span>
          </div>
        </div>

        {/* Deadline Select */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4" />
            Plazo de entrega
          </Label>
          <Select value={deadline} onValueChange={setDeadline}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DEADLINE_MULTIPLIERS.map((option) => (
                <SelectItem key={option.days} value={option.days.toString()}>
                  {option.label} {option.multiplier > 1 && `(+${Math.round((option.multiplier - 1) * 100)}%)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Correction Select */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base">
            <FileText className="w-4 h-4" />
            Corrección
          </Label>
          <Select value={correction} onValueChange={setCorrection}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CORRECTION_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label} {option.pricePerWord > 0 && `(${option.pricePerWord} €/palabra)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {correction !== 'none' && (
            <p className="text-sm text-muted-foreground">
              Estimación: ~{calculation.estimatedWords.toLocaleString()} palabras
            </p>
          )}
        </div>

        {/* Sales Panel Checkbox */}
        <div className="flex items-center space-x-3">
          <Checkbox
            id="salesPanel"
            checked={includeSalesPanel}
            onCheckedChange={(checked) => setIncludeSalesPanel(checked as boolean)}
          />
          <Label htmlFor="salesPanel" className="cursor-pointer">
            Panel de ventas en tiempo real (+75 €)
          </Label>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-border pt-6 space-y-3 mt-auto">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Precio base ({pages} páginas)</span>
            <span>{calculation.basePrice.toLocaleString()} €</span>
          </div>
          {deadline !== '120' && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ajuste por plazo</span>
              <span>+{(calculation.adjustedPrice - calculation.basePrice).toLocaleString()} €</span>
            </div>
          )}
          {calculation.correctionCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Corrección</span>
              <span>+{calculation.correctionCost.toLocaleString()} €</span>
            </div>
          )}
          {calculation.salesPanelCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Panel de ventas</span>
              <span>+{calculation.salesPanelCost} €</span>
            </div>
          )}
          
          <div className="border-t border-border pt-4 mt-4">
            {calculation.isConsultation ? (
              <div className="text-center">
                <p className="text-lg text-muted-foreground">Para más de 400 páginas</p>
                <p className="text-2xl font-bold text-primary">Consultar precio</p>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total estimado</span>
                <span className="text-3xl font-bold text-primary">
                  {Math.round(calculation.total).toLocaleString()} €
                </span>
              </div>
            )}
          </div>
        </div>

        <Button onClick={onRequestQuote} size="lg" className="w-full text-lg py-6">
          Solicitar presupuesto definitivo
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          * Precio orientativo. El presupuesto final puede variar según el manuscrito.
        </p>
      </div>
    </div>
  );
};
