import { useState, useMemo } from 'react';
import { Calculator, Clock, FileText, BookCopy, Send, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Base prices by page range (for 50 copies)
const PRICE_TIERS = [
  { min: 1, max: 100, price: 390 },
  { min: 101, max: 150, price: 490 },
  { min: 151, max: 200, price: 590 },
  { min: 201, max: 250, price: 690 },
  { min: 251, max: 300, price: 790 },
  { min: 301, max: 400, price: 890 },
];

// Copy options with price per additional copy beyond base 50
const COPIES_OPTIONS = [
  { copies: 50, label: '50 ejemplares', extraCost: 0 },
  { copies: 75, label: '75 ejemplares', extraCost: 95 },
  { copies: 100, label: '100 ejemplares', extraCost: 175 },
  { copies: 150, label: '150 ejemplares', extraCost: 290 },
  { copies: 200, label: '200 ejemplares', extraCost: 390 },
  { copies: 300, label: '300 ejemplares', extraCost: 550 },
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

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjnjlgd';

export type BudgetQuoteRequest = {
  pages: number;
  copies: number;
  deadline: string;
  correction: string;
  includeSalesPanel: boolean;
  estimatedTotal: number;
  isConsultation: boolean;
};

export const BudgetCalculator = () => {
  const [pages, setPages] = useState(150);
  const [copies, setCopies] = useState('50');
  const [deadline, setDeadline] = useState('120');
  const [correction, setCorrection] = useState('none');
  const [includeSalesPanel, setIncludeSalesPanel] = useState(false);
  
  // Contact form fields
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tituloLibro, setTituloLibro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculation = useMemo(() => {
    // Base price by pages
    let basePrice = 0;
    if (pages > 400) {
      basePrice = 890; // Show base, but indicate consultation needed
    } else {
      const tier = PRICE_TIERS.find(t => pages >= t.min && pages <= t.max);
      basePrice = tier?.price || 390;
    }

    // Copies extra cost
    const copiesOption = COPIES_OPTIONS.find(c => c.copies === parseInt(copies));
    const copiesCost = copiesOption?.extraCost || 0;

    // Deadline multiplier
    const deadlineOption = DEADLINE_MULTIPLIERS.find(d => d.days === parseInt(deadline));
    const multiplier = deadlineOption?.multiplier || 1;
    const adjustedPrice = (basePrice + copiesCost) * multiplier;

    // Correction cost (estimate ~250 words per page)
    const estimatedWords = pages * 250;
    const correctionOption = CORRECTION_OPTIONS.find(c => c.id === correction);
    const correctionCost = estimatedWords * (correctionOption?.pricePerWord || 0);

    // Sales panel
    const salesPanelCost = includeSalesPanel ? 75 : 0;

    const total = adjustedPrice + correctionCost + salesPanelCost;

    return {
      basePrice,
      copiesCost,
      adjustedPrice,
      correctionCost,
      salesPanelCost,
      total,
      isConsultation: pages > 400,
      estimatedWords,
    };
  }, [pages, copies, deadline, correction, includeSalesPanel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim() || !email.trim()) {
      toast.error('Por favor, completa los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    const correctionLabel = CORRECTION_OPTIONS.find(c => c.id === correction)?.label || 'Sin corrección';
    const deadlineLabel = DEADLINE_MULTIPLIERS.find(d => d.days === parseInt(deadline))?.label || deadline;
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          telefono: telefono || 'No proporcionado',
          titulo_libro: tituloLibro || 'No especificado',
          paginas: pages,
          ejemplares: copies,
          plazo: deadlineLabel,
          correccion: correctionLabel,
          panel_ventas: includeSalesPanel ? 'Sí' : 'No',
          presupuesto_estimado: `${Math.round(calculation.total).toLocaleString()} €`,
          _subject: `Nueva solicitud de autoedición: ${tituloLibro || 'Sin título'}`,
        }),
      });

      if (!response.ok) throw new Error('Error en el envío');

      toast.success('¡Solicitud enviada!', {
        description: 'Te contactaremos pronto con tu presupuesto personalizado.',
      });
      
      // Reset contact fields
      setNombre('');
      setEmail('');
      setTelefono('');
      setTituloLibro('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error al enviar', {
        description: 'Por favor, inténtalo de nuevo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 bg-primary/10 rounded-xl shrink-0">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Calcula tu presupuesto</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Precio orientativo en tiempo real</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Pages Slider */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Label className="flex items-center gap-2 text-sm sm:text-base">
              <FileText className="w-4 h-4 shrink-0" />
              Número de páginas
            </Label>
            <span className="text-xl sm:text-2xl font-bold text-primary">{pages}</span>
          </div>
          <div className="px-1">
            <Slider
              value={[pages]}
              onValueChange={(value) => setPages(value[0])}
              min={50}
              max={500}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-1">
            <span>50</span>
            <span>500+</span>
          </div>
        </div>

        {/* Copies Select */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="flex items-center gap-2 text-sm sm:text-base">
            <BookCopy className="w-4 h-4 shrink-0" />
            Número de ejemplares
          </Label>
          <Select value={copies} onValueChange={setCopies}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COPIES_OPTIONS.map((option) => (
                <SelectItem key={option.copies} value={option.copies.toString()}>
                  {option.label} {option.extraCost > 0 && `(+${option.extraCost} €)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Deadline Select */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="flex items-center gap-2 text-sm sm:text-base">
            <Clock className="w-4 h-4 shrink-0" />
            Plazo de entrega
          </Label>
          <Select value={deadline} onValueChange={setDeadline}>
            <SelectTrigger className="w-full">
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
        <div className="space-y-2 sm:space-y-3">
          <Label className="flex items-center gap-2 text-sm sm:text-base">
            <FileText className="w-4 h-4 shrink-0" />
            Corrección
          </Label>
          <Select value={correction} onValueChange={setCorrection}>
            <SelectTrigger className="w-full">
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
            <p className="text-xs sm:text-sm text-muted-foreground">
              Estimación: ~{calculation.estimatedWords.toLocaleString()} palabras
            </p>
          )}
        </div>

        {/* Sales Panel Checkbox */}
        <div className="flex items-start sm:items-center space-x-3">
          <Checkbox
            id="salesPanel"
            checked={includeSalesPanel}
            onCheckedChange={(checked) => setIncludeSalesPanel(checked as boolean)}
            className="mt-0.5 sm:mt-0"
          />
          <Label htmlFor="salesPanel" className="cursor-pointer text-sm sm:text-base leading-tight">
            Panel de ventas en tiempo real (+75 €)
          </Label>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-border pt-3 sm:pt-4 space-y-2">
          <div className="flex justify-between text-xs sm:text-sm gap-2">
            <span className="text-muted-foreground">Precio base ({pages} páginas, 50 ej.)</span>
            <span className="font-medium shrink-0">{calculation.basePrice.toLocaleString()} €</span>
          </div>
          {calculation.copiesCost > 0 && (
            <div className="flex justify-between text-xs sm:text-sm gap-2">
              <span className="text-muted-foreground">Ejemplares adicionales (+{parseInt(copies) - 50})</span>
              <span className="font-medium shrink-0">+{calculation.copiesCost.toLocaleString()} €</span>
            </div>
          )}
          {deadline !== '120' && (
            <div className="flex justify-between text-xs sm:text-sm gap-2">
              <span className="text-muted-foreground">Ajuste por plazo</span>
              <span className="font-medium shrink-0">+{(calculation.adjustedPrice - calculation.basePrice - calculation.copiesCost).toLocaleString()} €</span>
            </div>
          )}
          {calculation.correctionCost > 0 && (
            <div className="flex justify-between text-xs sm:text-sm gap-2">
              <span className="text-muted-foreground">Corrección</span>
              <span className="font-medium shrink-0">+{calculation.correctionCost.toLocaleString()} €</span>
            </div>
          )}
          {calculation.salesPanelCost > 0 && (
            <div className="flex justify-between text-xs sm:text-sm gap-2">
              <span className="text-muted-foreground">Panel de ventas</span>
              <span className="font-medium shrink-0">+{calculation.salesPanelCost} €</span>
            </div>
          )}
          
          <div className="border-t border-border pt-2 sm:pt-3 mt-2">
            {calculation.isConsultation ? (
              <div className="text-center">
                <p className="text-sm sm:text-lg text-muted-foreground">Para más de 400 páginas</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">Consultar precio</p>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-2">
                <span className="text-base sm:text-lg font-semibold">Total estimado</span>
                <span className="text-2xl sm:text-3xl font-bold text-primary shrink-0">
                  {Math.round(calculation.total).toLocaleString()} €
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="border-t border-border pt-4 sm:pt-6 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Déjanos tus datos y te enviaremos un presupuesto personalizado
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm">Nombre *</Label>
              <Input
                id="nombre"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-sm">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="+34 600 000 000"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-sm">Título del libro</Label>
              <Input
                id="titulo"
                placeholder="El título de tu obra"
                value={tituloLibro}
                onChange={(e) => setTituloLibro(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full text-sm sm:text-base py-4 sm:py-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Solicitar presupuesto gratuito
            </>
          )}
        </Button>

        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          * Sin compromiso. Respuesta en menos de 24 horas.
        </p>
      </form>
    </div>
  );
};