import { useState, useMemo, useCallback } from 'react';
import { 
  Calculator, BookOpen, FileText, Printer,
  Megaphone, Share2, Send, Loader2, CheckCircle2, 
  ArrowLeft, Sparkles, GraduationCap, Download
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';

// Page ranges with base maquetación price and print prices
const PAGE_RANGES = [
  { min: 50, max: 150, base: 300, print: { 1: 5, 5: 20, 10: 35, 25: 80, 50: 145, 100: 275 } },
  { min: 151, max: 250, base: 350, print: { 1: 6, 5: 25, 10: 45, 25: 100, 50: 185, 100: 350 } },
  { min: 251, max: 350, base: 400, print: { 1: 7, 5: 30, 10: 55, 25: 125, 50: 235, 100: 450 } },
  { min: 351, max: 450, base: 475, print: { 1: 8, 5: 35, 10: 65, 25: 150, 50: 285, 100: 550 } },
  { min: 451, max: 550, base: 550, print: { 1: 9, 5: 40, 10: 75, 25: 175, 50: 335, 100: 650 } },
  { min: 551, max: 650, base: 650, print: { 1: 10, 5: 45, 10: 85, 25: 200, 50: 385, 100: 750 } },
  { min: 651, max: 750, base: 750, print: { 1: 11, 5: 50, 10: 95, 25: 225, 50: 435, 100: 850 } },
  { min: 751, max: 850, base: 875, print: { 1: 12, 5: 55, 10: 105, 25: 250, 50: 485, 100: 950 } },
  { min: 851, max: 1000, base: 1000, print: { 1: 14, 5: 65, 10: 125, 25: 300, 50: 585, 100: 1150 } },
];

const PRINT_OPTIONS = [
  { copies: 0, label: 'No necesito ejemplares impresos' },
  { copies: 1, label: '1 ejemplar' },
  { copies: 5, label: '5 ejemplares' },
  { copies: 10, label: '10 ejemplares' },
  { copies: 25, label: '25 ejemplares' },
  { copies: 50, label: '50 ejemplares' },
  { copies: 100, label: '100 ejemplares' },
];

const SIZE_OPTIONS = [
  { id: 'a6', name: 'A6: hasta 14,8 cm x 21 cm', desc: 'El tamaño más habitual para novelas, poesía, divulgación...' },
  { id: 'a5', name: 'A5 ampliado: hasta 17 cm x 24 cm', desc: 'Recomendado para libros con imágenes (fotos, dibujos...)' },
  { id: 'a4', name: 'A4: hasta 21 cm x 29,7 cm', desc: 'Para manuales, cómics, catálogos...' },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjnjlgd';

export const AutoedicionCalculator = () => {
  // Progressive reveal state
  const [showFullCalculator, setShowFullCalculator] = useState(false);
  
  // Book configuration
  const [bookType, setBookType] = useState<'general' | 'tesis'>('general');
  const [pages, setPages] = useState(150);
  const [pagesInput, setPagesInput] = useState('');
  const [bookSize, setBookSize] = useState('a6');
  
  // Services
  const [maqueta, setMaqueta] = useState<'no' | 'si'>('si');
  const [isbn, setIsbn] = useState<'no' | 'si'>('si');
  const [ebook, setEbook] = useState<'no' | 'si'>('no');
  const [correccion, setCorreccion] = useState<'no' | 'orto' | 'estilo'>('no');
  const [printCopies, setPrintCopies] = useState(0);
  const [marketing, setMarketing] = useState<'no' | 'si'>('no');
  
  // Distribution
  const [distribucion, setDistribucion] = useState<'no' | 'si'>('no');
  const [distAmazonPapel, setDistAmazonPapel] = useState(false);
  const [distLibrerias, setDistLibrerias] = useState(false);
  const [distAmazonEbook, setDistAmazonEbook] = useState(false);
  
  // Contact form
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tituloLibro, setTituloLibro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  // Get current page range
  const currentRange = useMemo(() => {
    const range = PAGE_RANGES.find(r => pages >= r.min && pages <= r.max);
    return range || PAGE_RANGES[PAGE_RANGES.length - 1];
  }, [pages]);

  const isConsultation = pages > 1000;

  // Calculate all prices
  const calculation = useMemo(() => {
    const isTesis = bookType === 'tesis';
    
    const maquetaPrice = maqueta === 'si' ? currentRange.base : 0;
    const isbnPrice = isbn === 'si' ? 45 : 0;
    const ebookPrice = ebook === 'si' ? (isTesis ? 0 : 235) : 0;
    const ebookFree = isTesis && ebook === 'si';
    
    let correccionPrice = 0;
    if (correccion === 'orto') {
      correccionPrice = pages * 1.5;
    } else if (correccion === 'estilo') {
      correccionPrice = pages * 2.5;
    }
    
    const printPrice = printCopies > 0 
      ? currentRange.print[printCopies as keyof typeof currentRange.print] || 0 
      : 0;
    
    const marketingPrice = marketing === 'si' ? 550 : 0;
    
    let distribucionPrice = 0;
    if (distribucion === 'si') {
      if (distAmazonPapel) distribucionPrice += 55;
      if (distLibrerias) distribucionPrice += 55;
      if (distAmazonEbook) distribucionPrice += 55;
    }
    
    const subtotal = maquetaPrice + isbnPrice + ebookPrice + correccionPrice + printPrice + marketingPrice + distribucionPrice;
    
    const allServices = maqueta === 'si' && isbn === 'si' && ebook === 'si' && 
                       correccion !== 'no' && printCopies > 0 && marketing === 'si' && 
                       distribucion === 'si';
    
    const discountPercent = isTesis && allServices ? 20 : 0;
    const discountAmount = subtotal * (discountPercent / 100);
    const freeWeb = allServices;
    const freeIAValuation = isTesis;
    const total = subtotal - discountAmount;
    
    return {
      maquetaPrice,
      isbnPrice,
      ebookPrice,
      ebookFree,
      correccionPrice,
      printPrice,
      marketingPrice,
      distribucionPrice,
      subtotal,
      discountPercent,
      discountAmount,
      freeWeb,
      freeIAValuation,
      total,
      allServices,
    };
  }, [bookType, maqueta, isbn, ebook, correccion, pages, printCopies, marketing, distribucion, distAmazonPapel, distLibrerias, distAmazonEbook, currentRange]);

  const handlePagesChange = useCallback((value: string) => {
    setPagesInput(value);
    const num = parseInt(value);
    if (!isNaN(num) && num >= 50) {
      setPages(Math.min(num, 1500));
    }
  }, []);

  const handleCalculate = useCallback(() => {
    const num = parseInt(pagesInput);
    if (!isNaN(num) && num >= 50) {
      setPages(Math.min(num, 1500));
      setShowFullCalculator(true);
      toast.success('Calculadora activada', {
        description: 'Ahora puedes personalizar tu presupuesto'
      });
    } else {
      toast.error('Introduce un número válido de páginas (mínimo 50)');
    }
  }, [pagesInput]);

  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(192, 57, 43); // Primary red
    doc.text('Presupuesto de Autoedición', 20, 25);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('Grupo Dauro Editorial', 20, 35);
    doc.text(`Fecha: ${fecha}`, 20, 42);
    
    // Line
    doc.setDrawColor(192, 57, 43);
    doc.setLineWidth(0.5);
    doc.line(20, 48, 190, 48);
    
    // Book details
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Datos del libro', 20, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text(`Tipo: ${bookType === 'tesis' ? 'Tesis doctoral' : 'Libro general'}`, 20, 70);
    doc.text(`Páginas: ${pages}`, 20, 77);
    doc.text(`Tamaño: ${SIZE_OPTIONS.find(s => s.id === bookSize)?.name || bookSize}`, 20, 84);
    
    // Services
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Servicios seleccionados', 20, 100);
    
    let y = 110;
    doc.setFontSize(11);
    doc.setTextColor(60);
    
    if (maqueta === 'si') {
      doc.text(`• Maquetación interior y cubierta: ${calculation.maquetaPrice} €`, 20, y);
      y += 7;
    }
    if (isbn === 'si') {
      doc.text(`• ISBN y depósito legal: ${calculation.isbnPrice} €`, 20, y);
      y += 7;
    }
    if (ebook === 'si') {
      doc.text(`• Ebook EPUB: ${calculation.ebookFree ? 'GRATIS (Tesis doctoral)' : calculation.ebookPrice + ' €'}`, 20, y);
      y += 7;
    }
    if (correccion !== 'no') {
      const tipo = correccion === 'orto' ? 'ortotipográfica' : 'de estilo + ortotipográfica';
      doc.text(`• Corrección ${tipo}: ${Math.round(calculation.correccionPrice)} €`, 20, y);
      y += 7;
    }
    if (printCopies > 0) {
      doc.text(`• Impresión (${printCopies} ejemplares): ${calculation.printPrice} €`, 20, y);
      y += 7;
    }
    if (marketing === 'si') {
      doc.text(`• Pack Marketing Completo: ${calculation.marketingPrice} €`, 20, y);
      y += 7;
    }
    if (distribucion === 'si') {
      const canales = [];
      if (distAmazonPapel) canales.push('Amazon papel');
      if (distLibrerias) canales.push('Librerías españolas');
      if (distAmazonEbook) canales.push('Amazon ebook');
      doc.text(`• Distribución (${canales.join(', ')}): ${calculation.distribucionPrice} €`, 20, y);
      y += 7;
    }
    
    // Bonuses
    if (bookType === 'tesis') {
      y += 5;
      doc.setTextColor(39, 174, 96);
      doc.text('Beneficios Tesis Doctoral incluidos:', 20, y);
      y += 7;
      doc.text('• Valoración por Agentes IA: GRATIS', 20, y);
      y += 7;
    }
    if (calculation.freeWeb) {
      doc.setTextColor(39, 174, 96);
      doc.text('• Web dedicada al autor: INCLUIDA', 20, y);
      y += 7;
    }
    
    // Discount
    if (calculation.discountAmount > 0) {
      y += 5;
      doc.setTextColor(39, 174, 96);
      doc.text(`Descuento Tesis Doctoral (20%): -${Math.round(calculation.discountAmount)} €`, 20, y);
      y += 10;
    }
    
    // Total
    y += 10;
    doc.setDrawColor(192, 57, 43);
    doc.line(20, y, 190, y);
    y += 10;
    
    doc.setFontSize(16);
    doc.setTextColor(192, 57, 43);
    doc.text(`TOTAL ESTIMADO: ${Math.round(calculation.total).toLocaleString()} €`, 20, y);
    
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text('(Los precios NO incluyen IVA: 4% libros, 21% servicios)', 20, y);
    
    // Footer
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text('Este presupuesto es orientativo. Para confirmar, contacta con nosotros:', 20, y);
    y += 7;
    doc.setTextColor(192, 57, 43);
    doc.text('editorial@grupodauro.com | +34 958 215 318', 20, y);
    y += 7;
    doc.text('www.grupodauro.com', 20, y);
    
    // Save
    doc.save(`presupuesto-autoedicion-${pages}pag-${fecha.replace(/\s/g, '-')}.pdf`);
    toast.success('Presupuesto descargado');
  }, [bookType, pages, bookSize, maqueta, isbn, ebook, correccion, printCopies, marketing, distribucion, distAmazonPapel, distLibrerias, distAmazonEbook, calculation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim() || !email.trim()) {
      toast.error('Por favor, completa los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    const serviciosContratados = [];
    if (maqueta === 'si') serviciosContratados.push('Maquetación');
    if (isbn === 'si') serviciosContratados.push('ISBN');
    if (ebook === 'si') serviciosContratados.push('Ebook');
    if (correccion === 'orto') serviciosContratados.push('Corrección ortotipográfica');
    if (correccion === 'estilo') serviciosContratados.push('Corrección de estilo');
    if (printCopies > 0) serviciosContratados.push(`${printCopies} ejemplares impresos`);
    if (marketing === 'si') serviciosContratados.push('Pack Marketing');
    if (distribucion === 'si') {
      const canales = [];
      if (distAmazonPapel) canales.push('Amazon papel');
      if (distLibrerias) canales.push('Librerías españolas');
      if (distAmazonEbook) canales.push('Amazon ebook');
      serviciosContratados.push(`Distribución: ${canales.join(', ')}`);
    }
    
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
          tipo_libro: bookType === 'tesis' ? 'Tesis doctoral' : 'Libro general',
          paginas: pages,
          tamano: SIZE_OPTIONS.find(s => s.id === bookSize)?.name || bookSize,
          servicios: serviciosContratados.join(', '),
          presupuesto_estimado: `${Math.round(calculation.total).toLocaleString()} €`,
          descuento_aplicado: calculation.discountPercent > 0 ? `${calculation.discountPercent}% (-${Math.round(calculation.discountAmount)} €)` : 'Ninguno',
          _subject: `Presupuesto autoedición: ${tituloLibro || 'Sin título'} - ${Math.round(calculation.total)} €`,
        }),
      });

      if (!response.ok) throw new Error('Error en el envío');

      setSubmittedName(nombre.split(' ')[0]);
      setIsSuccess(true);
      
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

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedName('');
    setShowFullCalculator(false);
    setPagesInput('');
    setBookType('general');
    setPages(150);
    setBookSize('a6');
    setMaqueta('si');
    setIsbn('si');
    setEbook('no');
    setCorreccion('no');
    setPrintCopies(0);
    setMarketing('no');
    setDistribucion('no');
    setDistAmazonPapel(false);
    setDistLibrerias(false);
    setDistAmazonEbook(false);
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 md:p-12 shadow-xl max-w-3xl mx-auto text-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                <div className="relative p-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg shadow-primary/25">
                  <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">¡Presupuesto enviado!</span>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Gracias{submittedName ? `, ${submittedName}` : ''}
              </h3>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                Hemos recibido tu presupuesto. Nuestro equipo editorial lo revisará y te contactaremos en menos de 24 horas.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6 max-w-sm mx-auto">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Total estimado:</span><br />
                <span className="text-2xl font-bold text-primary">{Math.round(calculation.total).toLocaleString()} €</span>
              </p>
            </div>

            <Button variant="outline" size="lg" onClick={handleReset} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Calcular otro presupuesto
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Calculadora de precios
        </h3>
        <p className="text-muted-foreground mb-4">
          Consigue un <span className="text-primary font-semibold underline decoration-primary/30">presupuesto personalizado</span>,{' '}
          <span className="text-primary font-semibold underline decoration-primary/30">instantáneo y descargable</span> de todos nuestros servicios.
        </p>
        <p className="text-sm text-muted-foreground/80 italic border-l-4 border-primary/30 pl-4">
          💡 Para calcular las páginas, copia tu texto en un documento A5 con Times New Roman a 1,5 de interlineado. 
          El resultado será muy aproximado a la extensión final de tu libro.
        </p>
      </div>

      {/* Step 1: Pages selection */}
      {!showFullCalculator ? (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Indica las páginas</h4>
            
            <div className="flex flex-wrap items-center gap-3 p-5 rounded-xl border-2 border-border bg-muted/30">
              <span className="text-lg">📖</span>
              <span className="text-sm sm:text-base">Mi libro ocupará</span>
              <Input
                type="number"
                value={pagesInput}
                onChange={(e) => handlePagesChange(e.target.value)}
                className="w-24 text-center font-bold bg-background text-lg"
                placeholder="150"
                min={50}
                max={1500}
              />
              <span className="text-sm sm:text-base">páginas</span>
              <Button 
                type="button" 
                onClick={handleCalculate}
                disabled={!pagesInput}
                className="ml-auto"
                size="lg"
              >
                CALCULAR
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Full Calculator */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Pages Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">
                  {pages} páginas (rango {currentRange.min}-{currentRange.max})
                </span>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowFullCalculator(false);
                  setPagesInput(pages.toString());
                }}
              >
                Cambiar
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-8">
              Precio base maquetación: {currentRange.base} €
            </p>
          </div>

          {/* Book Type */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Tipo de libro
            </h4>
            <RadioGroup value={bookType} onValueChange={(v) => setBookType(v as 'general' | 'tesis')} className="space-y-3">
              <label className={cn(
                "flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all",
                bookType === 'general' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              )}>
                <RadioGroupItem value="general" className="mt-1" />
                <span className="ml-3 font-medium">Libro general (novela, ensayo, poesía...)</span>
              </label>
              <label className={cn(
                "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                bookType === 'tesis' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              )}>
                <div className="flex items-start">
                  <RadioGroupItem value="tesis" className="mt-1" />
                  <div className="ml-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <span className="font-medium">Tesis doctoral</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      🎁 Ebook GRATIS + 20% descuento + Valoración IA GRATIS si contratas todos los servicios
                    </p>
                  </div>
                </div>
              </label>
            </RadioGroup>

            {bookType === 'tesis' && (
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                <p className="font-semibold text-green-800 dark:text-green-200 mb-2">🎓 Beneficios exclusivos Tesis Doctoral:</p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>🎁 Ebook GRATIS (valor 235 €)</li>
                  <li>🤖 Valoración por Agentes Tecnológicos Avanzados GRATIS</li>
                  <li>💰 20% de descuento si contratas todos los servicios</li>
                </ul>
              </div>
            )}
          </section>

          {/* Book Size */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold">Elige el tamaño</h4>
            <div className="space-y-2">
              {SIZE_OPTIONS.map((size) => (
                <label
                  key={size.id}
                  className={cn(
                    "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                    bookSize === size.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      bookSize === size.id ? "border-primary" : "border-muted-foreground"
                    )}>
                      {bookSize === size.id && <div className="w-3 h-3 rounded-full bg-primary" />}
                    </div>
                    <input
                      type="radio"
                      name="bookSize"
                      value={size.id}
                      checked={bookSize === size.id}
                      onChange={() => setBookSize(size.id)}
                      className="sr-only"
                    />
                    <span className="font-medium">{size.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8 mt-1">{size.desc}</p>
                </label>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-6">
            <h4 className="text-lg font-semibold">El presupuesto</h4>
            <p className="text-sm text-muted-foreground italic">
              Todos los precios se actualizan automáticamente según el rango de páginas seleccionado.
            </p>

            {/* Maquetación */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold">Pbook (Maquetación para imprenta y Amazon papel)</Label>
              <RadioGroup value={maqueta} onValueChange={(v) => setMaqueta(v as 'no' | 'si')} className="space-y-2">
                <ServiceOption value="no" label="No necesito maqueta" price={null} selected={maqueta === 'no'} />
                <ServiceOption 
                  value="si" 
                  label="Quiero maqueta de interior y cubierta" 
                  price={`${currentRange.base} €`} 
                  selected={maqueta === 'si'} 
                />
              </RadioGroup>
            </div>

            {/* ISBN */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold">ISBN</Label>
              <RadioGroup value={isbn} onValueChange={(v) => setIsbn(v as 'no' | 'si')} className="space-y-2">
                <ServiceOption value="no" label="No necesito ISBN" price={null} selected={isbn === 'no'} />
                <ServiceOption value="si" label="Quiero ISBN de Grupo Dauro (incluye depósito legal)" price="45 €" selected={isbn === 'si'} />
              </RadioGroup>
            </div>

            {/* Ebook */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold">Ebook</Label>
              {bookType === 'tesis' && (
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-800 dark:text-green-200 text-sm mb-2">
                  🎁 ¡Ebook GRATIS para tesis doctorales!
                </div>
              )}
              <RadioGroup value={ebook} onValueChange={(v) => setEbook(v as 'no' | 'si')} className="space-y-2">
                <ServiceOption value="no" label="No necesito ebook" price={null} selected={ebook === 'no'} />
                <ServiceOption 
                  value="si" 
                  label="Quiero ebook epub (Kindle, Apple, etc.)" 
                  price={bookType === 'tesis' ? 'GRATIS' : '235 €'} 
                  selected={ebook === 'si'}
                  highlight={bookType === 'tesis'}
                />
              </RadioGroup>
            </div>

            {/* Correction */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold">Corrección ortotipográfica y/o estilo</Label>
              <p className="text-xs text-muted-foreground">Precio calculado según número de páginas × tarifa/página</p>
              <RadioGroup value={correccion} onValueChange={(v) => setCorreccion(v as 'no' | 'orto' | 'estilo')} className="space-y-2">
                <ServiceOption value="no" label="No necesito corrección" price={null} selected={correccion === 'no'} />
                <ServiceOption 
                  value="orto" 
                  label="Corrección ortotipográfica" 
                  sublabel="1,50 €/página"
                  price={`${(pages * 1.5).toLocaleString()} €`} 
                  selected={correccion === 'orto'} 
                />
                <ServiceOption 
                  value="estilo" 
                  label="Corrección de estilo + ortotipográfica" 
                  sublabel="2,50 €/página"
                  price={`${(pages * 2.5).toLocaleString()} €`} 
                  selected={correccion === 'estilo'} 
                />
              </RadioGroup>
            </div>

            {/* Print */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Imprenta (incluye envío España peninsular)
              </Label>
              <p className="text-xs text-muted-foreground">Precios según rango de páginas del libro</p>
              <RadioGroup value={printCopies.toString()} onValueChange={(v) => setPrintCopies(parseInt(v))} className="space-y-2">
                {PRINT_OPTIONS.map((opt) => (
                  <ServiceOption 
                    key={opt.copies}
                    value={opt.copies.toString()} 
                    label={opt.label} 
                    price={opt.copies > 0 ? `${currentRange.print[opt.copies as keyof typeof currentRange.print]} €` : null} 
                    selected={printCopies === opt.copies} 
                  />
                ))}
              </RadioGroup>
            </div>

            {/* Marketing */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                Marketing
              </Label>
              <p className="text-xs text-muted-foreground">Pack completo de promoción para tu libro.</p>
              <RadioGroup value={marketing} onValueChange={(v) => setMarketing(v as 'no' | 'si')} className="space-y-2">
                <ServiceOption value="no" label="No necesito servicios de marketing" price={null} selected={marketing === 'no'} />
                <ServiceOption 
                  value="si" 
                  label="Pack Marketing Completo" 
                  sublabel="Banners para redes sociales, ficha promocional, mockups 3D, nota de prensa"
                  price="550 €" 
                  selected={marketing === 'si'} 
                />
              </RadioGroup>
              {calculation.allServices && (
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-800 dark:text-green-200 text-sm">
                  🎁 ¡REGALO! Incluimos una web dedicada al autor dentro de nuestro sistema.
                </div>
              )}
            </div>

            {/* Distribution */}
            <div className="space-y-2">
              <Label className="text-primary font-semibold flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Distribución
              </Label>
              <RadioGroup value={distribucion} onValueChange={(v) => setDistribucion(v as 'no' | 'si')} className="space-y-2">
                <ServiceOption value="no" label="No quiero distribución" price={null} selected={distribucion === 'no'} />
                <ServiceOption value="si" label="Sí quiero distribución" price={null} selected={distribucion === 'si'} />
              </RadioGroup>

              {distribucion === 'si' && (
                <div className="ml-6 mt-3 space-y-2">
                  <p className="text-sm font-medium">Elige los canales:</p>
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                    <Checkbox checked={distAmazonPapel} onCheckedChange={(c) => setDistAmazonPapel(!!c)} />
                    <span className="text-sm">Papel Amazon (mundial) 12 meses: <strong>55 €</strong></span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                    <Checkbox checked={distLibrerias} onCheckedChange={(c) => setDistLibrerias(!!c)} />
                    <span className="text-sm">Papel librerías españolas 12 meses: <strong>55 €</strong></span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                    <Checkbox checked={distAmazonEbook} onCheckedChange={(c) => setDistAmazonEbook(!!c)} />
                    <span className="text-sm">Ebook Amazon (mundial) 12 meses: <strong>55 €</strong></span>
                  </label>
                </div>
              )}
            </div>
          </section>

          {/* Summary */}
          <section className="bg-muted/50 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold">Resumen</h4>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={generatePDF}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>
            </div>
            
            <div className="space-y-2 text-sm">
              <SummaryRow 
                label="Maqueta interior y cubierta" 
                value={calculation.maquetaPrice > 0 ? `${calculation.maquetaPrice} €` : '0 €'} 
              />
              <SummaryRow label="ISBN" value={calculation.isbnPrice > 0 ? `${calculation.isbnPrice} €` : '0 €'} />
              <SummaryRow 
                label="Ebook" 
                value={calculation.ebookFree ? 'GRATIS' : (calculation.ebookPrice > 0 ? `${calculation.ebookPrice} €` : '0 €')} 
                highlight={calculation.ebookFree}
              />
              {bookType === 'tesis' && (
                <SummaryRow label="🤖 Valoración Agentes IA" value="GRATIS" highlight />
              )}
              <SummaryRow 
                label="Corrección" 
                value={calculation.correccionPrice > 0 ? `${Math.round(calculation.correccionPrice)} €` : '0 €'} 
              />
              <SummaryRow 
                label="Ejemplares" 
                value={calculation.printPrice > 0 ? `${calculation.printPrice} €` : '0 €'} 
              />
              <SummaryRow label="Distribución" value={calculation.distribucionPrice > 0 ? `${calculation.distribucionPrice} €` : '0 €'} />
              <SummaryRow label="Marketing" value={calculation.marketingPrice > 0 ? `${calculation.marketingPrice} €` : '0 €'} />
              {calculation.freeWeb && (
                <SummaryRow label="🎁 Web dedicada al autor" value="INCLUIDA" highlight />
              )}
              {calculation.discountAmount > 0 && (
                <div className="bg-green-100 dark:bg-green-900/30 -mx-6 px-6 py-2">
                  <SummaryRow 
                    label={`🎓 Descuento Tesis Doctoral (${calculation.discountPercent}%)`} 
                    value={`-${Math.round(calculation.discountAmount)} €`} 
                    highlight 
                  />
                </div>
              )}
            </div>

            <div className="border-t-2 border-border pt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">Total</span>
              {isConsultation ? (
                <span className="text-xl font-bold text-primary">Consultar</span>
              ) : (
                <span className="text-3xl font-bold text-primary">{Math.round(calculation.total).toLocaleString()} €</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground italic">
              (Los precios NO incluyen IVA: 4% libros, 21% servicios)
            </p>
          </section>

          {/* Contact Fields */}
          <section className="border-t border-border pt-6 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Déjanos tus datos y te enviaremos el presupuesto por email
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input id="nombre" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" type="tel" placeholder="+34 600 000 000" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titulo">Título del libro</Label>
                <Input id="titulo" placeholder="El título de tu obra" value={tituloLibro} onChange={(e) => setTituloLibro(e.target.value)} />
              </div>
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full py-6 text-base" disabled={isSubmitting}>
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

          <p className="text-center text-xs text-muted-foreground">
            * Sin compromiso. Respuesta en menos de 24 horas.
          </p>
        </form>
      )}
    </div>
  );
};

// Helper components
const ServiceOption = ({ 
  value, 
  label, 
  sublabel,
  price, 
  selected,
  highlight 
}: { 
  value: string; 
  label: string; 
  sublabel?: string;
  price: string | null; 
  selected: boolean;
  highlight?: boolean;
}) => (
  <label className={cn(
    "flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all",
    selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
  )}>
    <div className="flex items-start gap-3">
      <RadioGroupItem value={value} className="mt-0.5" />
      <div>
        <span className="font-medium">{label}</span>
        {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
      </div>
    </div>
    {price && (
      <span className={cn(
        "font-bold shrink-0 ml-2",
        highlight ? "text-green-600 dark:text-green-400" : "text-primary"
      )}>
        {price}
      </span>
    )}
  </label>
);

const SummaryRow = ({ 
  label, 
  value, 
  highlight 
}: { 
  label: string; 
  value: string; 
  highlight?: boolean;
}) => (
  <div className="flex justify-between py-1 border-b border-border/50">
    <span className={cn(highlight && "text-green-700 dark:text-green-400")}>{label}</span>
    <span className={cn("font-bold", highlight && "text-green-700 dark:text-green-400")}>{value}</span>
  </div>
);

export default AutoedicionCalculator;
