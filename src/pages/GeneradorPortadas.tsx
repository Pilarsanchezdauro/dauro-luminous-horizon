import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const estilos = [
  { id: 'minimalista', label: 'Minimalista', icon: '💎' },
  { id: 'ilustrativo', label: 'Ilustrativo', icon: '🎨' },
  { id: 'fotografico', label: 'Fotográfico', icon: '📷' },
  { id: 'abstracto', label: 'Abstracto', icon: '🌀' },
  { id: 'vintage', label: 'Vintage', icon: '📚' },
  { id: 'dark-gotico', label: 'Dark/Gótico', icon: '🦇' }
];

const generos = [
  'Fantasía', 'Romance', 'Ciencia Ficción', 'Misterio', 'Terror',
  'Historia', 'Biografía', 'Autoayuda', 'Poesía', 'Thriller'
];

export default function GeneradorPortadas() {
  const navigate = useNavigate();
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
  const [generationsLeft, setGenerationsLeft] = useState(2);

  const handleGenerar = async () => {
    if (!titulo.trim()) {
      toast.error('Por favor, ingresa el título del libro');
      return;
    }

    if (generationsLeft <= 0) {
      toast.error('Has alcanzado el límite de generaciones gratuitas');
      return;
    }

    setIsGenerating(true);

    try {
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
        setGenerationsLeft(prev => prev - 1);
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
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Generador de Portadas con IA
              </h1>
              <p className="text-lg text-muted-foreground">
                Crea portadas profesionales para tus libros en segundos
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
                    disabled={isGenerating || generationsLeft <= 0}
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

                  <p className="text-xs text-center text-muted-foreground">
                    Completa el formulario y haz clic en "Generar". Tienes {generationsLeft} creaciones gratis para probar la herramienta.
                  </p>
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
                          Completa el formulario y haz clic en "Generar". Tienes {generationsLeft} creaciones gratis para probar la herramienta.
                        </p>
                      </div>
                    </div>
                  )}
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
