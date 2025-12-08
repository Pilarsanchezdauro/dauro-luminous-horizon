import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, BookOpen, Loader2, CreditCard, Check, X, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const estilos = [
  { id: 'minimalista', label: 'Minimalista', icon: '💎' },
  { id: 'ilustrativo', label: 'Ilustrativo', icon: '🎨' },
  { id: 'fotografico', label: 'Fotográfico', icon: '📷' },
  { id: 'abstracto', label: 'Abstracto', icon: '🌀' },
  { id: 'vintage', label: 'Vintage', icon: '📚' },
  { id: 'dark-gotico', label: 'Dark/Gótico', icon: '🦇' },
  { id: 'bauhaus', label: 'Bauhaus', icon: '🔷' }
];

const generos = [
  'Fantasía', 'Romance', 'Ciencia Ficción', 'Misterio', 'Terror',
  'Historia', 'Biografía', 'Autoayuda', 'Poesía', 'Thriller'
];

const PACKAGES = [
  { 
    id: '10', 
    credits: 10, 
    price: 10, 
    name: 'Paquete Básico',
    productHandle: 'creditos-generador-de-portadas-10-covers'
  },
  { 
    id: '20', 
    credits: 20, 
    price: 20, 
    name: 'Paquete Popular', 
    popular: true,
    productHandle: 'creditos-generador-de-portadas-20-covers'
  },
  { 
    id: '30', 
    credits: 30, 
    price: 30, 
    name: 'Paquete Pro',
    productHandle: 'creditos-generador-de-portadas-30-covers'
  }
];

export default function GeneradorPortadas() {
  const [searchParams] = useSearchParams();
  const { isAdmin } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [estilo, setEstilo] = useState('ilustrativo');
  const [instrucciones, setInstrucciones] = useState('');
  const [color1, setColor1] = useState('#000000');
  const [color2, setColor2] = useState('#8B0000');
  const [sorprenderColores, setSorprenderColores] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // User state
  const [email, setEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  
  // Limits state
  const [generationsUsed, setGenerationsUsed] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  // Get user IP address on mount
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpAddress(data.ip))
      .catch(err => console.error('Error getting IP:', err));
  }, []);

  // Check for payment success
  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      toast.success('¡Pago completado! Tus créditos estarán disponibles en breve.');
      checkLimits();
    } else if (payment === 'canceled') {
      toast.error('Pago cancelado');
    }
  }, [searchParams]);

  // Check limits when component mounts or email changes
  useEffect(() => {
    if (email || ipAddress) {
      checkLimits();
    }
  }, [email, ipAddress]);

  const checkLimits = async () => {
    try {
      const identifier = email || ipAddress;
      if (!identifier) return;

      // Check usage - get the most recent record if multiple exist
      const { data: usageData } = await supabase
        .from('cover_generation_usage')
        .select('*')
        .or(email ? `email.eq.${email}` : `ip_address.eq.${ipAddress}`)
        .order('last_generated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (usageData) {
        setGenerationsUsed(usageData.generations_count);
      }

      // Check credits if user has email
      if (email) {
        const { data: creditsData } = await supabase
          .from('cover_credits')
          .select('*')
          .eq('email', email)
          .single();

        if (creditsData) {
          setAvailableCredits(creditsData.credits_remaining);
        }
      }
    } catch (error) {
      console.error('Error checking limits:', error);
    }
  };

  const getMaxFreeGenerations = () => {
    return email ? 3 : 2;
  };

  const getRemainingFreeGenerations = () => {
    const max = getMaxFreeGenerations();
    const remaining = max - generationsUsed;
    return Math.max(0, remaining);
  };

  const canGenerate = () => {
    // Admins always can generate
    if (isAdmin) return true;
    
    const freeRemaining = getRemainingFreeGenerations();
    return freeRemaining > 0 || availableCredits > 0;
  };

  const handleEmailSubmit = () => {
    if (!emailInput.trim() || !emailInput.includes('@')) {
      toast.error('Por favor, ingresa un email válido');
      return;
    }
    setEmail(emailInput);
    setShowEmailDialog(false);
    toast.success('¡Email registrado! Ahora tienes 3 generaciones gratis.');
  };

  const handleGenerar = async () => {
    if (!titulo.trim()) {
      toast.error('Por favor, ingresa el título del libro');
      return;
    }

    if (!canGenerate()) {
      setShowPurchaseDialog(true);
      return;
    }

    // If user hasn't provided email and has used 2 generations, ask for email (not for admins)
    if (!isAdmin && !email && generationsUsed >= 2) {
      setShowEmailDialog(true);
      return;
    }

    setIsGenerating(true);

    try {
      // Generate cover
      const { data, error } = await supabase.functions.invoke('generate-book-cover', {
        body: {
          titulo,
          autor,
          genero,
          estilo,
          instrucciones,
          color1: sorprenderColores ? undefined : color1,
          color2: sorprenderColores ? undefined : color2,
          sorprenderColores
        }
      });

      if (error) throw error;

      if (data?.image) {
        setGeneratedImage(data.image);
        
        // Update usage (skip for admins)
        if (!isAdmin) {
          await updateUsage();
        }
        
        toast.success('¡Portada generada con éxito!');
      } else {
        throw new Error('No se recibió imagen');
      }
    } catch (error: any) {
      console.error('Error generando portada:', error);
      toast.error(error.message || 'Error al generar la portada. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateUsage = async () => {
    try {
      const identifier = email || ipAddress;
      if (!identifier) return;

      // Check if record exists - get the most recent one
      const { data: existing } = await supabase
        .from('cover_generation_usage')
        .select('*')
        .or(email ? `email.eq.${email}` : `ip_address.eq.${ipAddress}`)
        .order('last_generated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('cover_generation_usage')
          .update({
            generations_count: existing.generations_count + 1,
            last_generated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) throw error;
        setGenerationsUsed(existing.generations_count + 1);
      } else {
        // Create new record
        const { error } = await supabase
          .from('cover_generation_usage')
          .insert({
            email: email || null,
            ip_address: ipAddress || null,
            generations_count: 1
          });

        if (error) throw error;
        setGenerationsUsed(1);
      }

      // If using credits, decrease them
      if (getRemainingFreeGenerations() === 0 && availableCredits > 0) {
        const { data: creditsData } = await supabase
          .from('cover_credits')
          .select('*')
          .eq('email', email)
          .single();

        if (creditsData) {
          await supabase
            .from('cover_credits')
            .update({
              credits_remaining: creditsData.credits_remaining - 1
            })
            .eq('id', creditsData.id);

          setAvailableCredits(creditsData.credits_remaining - 1);
        }
      }
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  const handlePurchase = async (packageId: string) => {
    console.log('handlePurchase called with packageId:', packageId);
    console.log('Current email:', email);
    
    if (!email) {
      toast.error('Por favor, ingresa tu email primero');
      setShowPurchaseDialog(false);
      setShowEmailDialog(true);
      return;
    }

    const selectedPackage = PACKAGES.find(p => p.id === packageId);
    console.log('Selected package:', selectedPackage);
    
    if (!selectedPackage) {
      toast.error('Paquete no encontrado');
      return;
    }

    try {
      console.log('Starting checkout creation...');
      toast.loading('Creando checkout...', { id: 'checkout-loading' });
      
      // Import the function dynamically to avoid circular dependencies
      const { createCheckoutForProduct } = await import('@/lib/shopify');
      console.log('createCheckoutForProduct imported');
      
      // Create checkout programmatically with Shopify Storefront API
      console.log('Calling createCheckoutForProduct with handle:', selectedPackage.productHandle);
      const checkoutUrl = await createCheckoutForProduct(selectedPackage.productHandle, 1);
      console.log('Checkout URL created:', checkoutUrl);
      
      toast.dismiss('checkout-loading');
      toast.success('Redirigiendo al checkout...');
      
      // Open checkout in new tab
      console.log('Opening checkout in new tab');
      const opened = window.open(checkoutUrl, '_blank');
      console.log('Window opened:', opened !== null);
      
      setShowPurchaseDialog(false);
    } catch (error: any) {
      console.error('Error creating checkout:', error);
      toast.dismiss('checkout-loading');
      toast.error(`Error: ${error.message || 'No se pudo crear el checkout'}`);
    }
  };

  return (
    <>
      <SEO
        title="Generador de Portadas con IA - Grupo Dauro"
        description="Crea portadas profesionales para tus libros usando inteligencia artificial. Genera diseños únicos en segundos."
        keywords="generador de portadas, diseño de portadas, IA, inteligencia artificial, portadas de libros"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Generador de Portadas con IA
              </h1>
              <p className="text-lg text-muted-foreground">
                Crea portadas profesionales para tus libros en segundos
              </p>
            </div>

            {/* Credits Banner */}
            <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <p className="text-lg font-medium">
                {isAdmin ? (
                  <>
                    <Crown className="inline w-5 h-5 mr-2 text-yellow-500" />
                    <span className="font-bold text-primary">Acceso ilimitado de administrador</span>
                  </>
                ) : availableCredits > 0 ? (
                  <>
                    <Check className="inline w-5 h-5 mr-2 text-green-500" />
                    Tienes <span className="font-bold text-primary">{availableCredits}</span> créditos disponibles
                  </>
                ) : getRemainingFreeGenerations() > 0 ? (
                  <>
                    Generaciones gratis restantes: <span className="font-bold text-primary">{getRemainingFreeGenerations()}</span> de {getMaxFreeGenerations()}
                    {!email && generationsUsed >= 1 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setShowEmailDialog(true)}
                        className="ml-2"
                      >
                        + Obtén 1 gratis con tu email
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <X className="inline w-5 h-5 mr-2 text-destructive" />
                    Has usado todas tus generaciones gratuitas.{' '}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setShowPurchaseDialog(true)}
                      className="p-0 h-auto"
                    >
                      Compra más créditos
                    </Button>
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Panel Izquierdo - Formulario */}
              <div className="bg-card border rounded-lg p-6 space-y-6">
                <div className="space-y-4">
                  {/* Título */}
                  <div>
                    <Label htmlFor="titulo">Título del Libro</Label>
                    <Input
                      id="titulo"
                      placeholder="El Último Dragón"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>

                  {/* Autor */}
                  <div>
                    <Label htmlFor="autor">Autor</Label>
                    <Input
                      id="autor"
                      placeholder="Ana López"
                      value={autor}
                      onChange={(e) => setAutor(e.target.value)}
                    />
                  </div>

                  {/* Género */}
                  <div>
                    <Label htmlFor="genero">Género</Label>
                    <Select value={genero} onValueChange={setGenero}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un género" />
                      </SelectTrigger>
                      <SelectContent>
                        {generos.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estilos */}
                  <div>
                    <Label>Estilo Visual</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {estilos.map((est) => (
                        <button
                          key={est.id}
                          onClick={() => setEstilo(est.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                            estilo === est.id
                              ? 'border-accent bg-accent/10'
                              : 'border-border hover:border-accent/50'
                          }`}
                        >
                          <span className="text-2xl">{est.icon}</span>
                          <span className="text-xs font-medium">{est.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Instrucciones adicionales */}
                  <div>
                    <Label htmlFor="instrucciones">Instrucciones Adicionales (Opcional)</Label>
                    <Textarea
                      id="instrucciones"
                      placeholder="épico, mágico, atardecer"
                      value={instrucciones}
                      onChange={(e) => setInstrucciones(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Colores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="color1">Color 1</Label>
                      <Input
                        id="color1"
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        disabled={sorprenderColores}
                        className="h-12 cursor-pointer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color2">Color 2</Label>
                      <Input
                        id="color2"
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        disabled={sorprenderColores}
                        className="h-12 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Checkbox sorprender */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sorprender"
                      checked={sorprenderColores}
                      onCheckedChange={(checked) => setSorprenderColores(checked as boolean)}
                    />
                    <Label
                      htmlFor="sorprender"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      😱 ¡Sorpréndeme con los colores!
                    </Label>
                  </div>

                  {/* Botón Generar */}
                  <Button
                    onClick={handleGenerar}
                    disabled={isGenerating || !canGenerate()}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generar Portada
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Panel Derecho - Preview */}
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-center h-full min-h-[600px]">
                  {generatedImage ? (
                    <div className="space-y-4 w-full">
                      <img
                        src={generatedImage}
                        alt="Portada generada"
                        className="w-full rounded-lg shadow-lg"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = generatedImage;
                            link.download = `portada-${titulo.toLowerCase().replace(/\s+/g, '-')}.png`;
                            link.click();
                          }}
                        >
                          Descargar
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setGeneratedImage(null)}
                        >
                          Nueva Portada
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <BookOpen className="w-24 h-24 mx-auto text-muted-foreground/30" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Tu portada profesional te espera</h3>
                        <p className="text-sm text-muted-foreground">
                          Completa el formulario y haz clic en "Generar"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Email Dialog */}
        <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¡Obtén 1 generación extra gratis!</DialogTitle>
              <DialogDescription>
                Ingresa tu email para desbloquear una generación adicional y poder comprar más créditos en el futuro.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button onClick={handleEmailSubmit} className="w-full">
                Desbloquear generación extra
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Purchase Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Compra más créditos para seguir creando</DialogTitle>
              <DialogDescription>
                Elige el paquete que mejor se adapte a tus necesidades
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <Card key={pkg.id} className={pkg.popular ? 'border-primary shadow-lg' : ''}>
                  {pkg.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded-t-lg">
                      Más Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>
                      {pkg.credits} portadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{pkg.price}€</div>
                      <div className="text-sm text-muted-foreground">
                        {(pkg.price / pkg.credits).toFixed(2)}€ por portada
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePurchase(pkg.id)}
                      className="w-full"
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Comprar ahora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </>
  );
}
