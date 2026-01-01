import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import type { BudgetQuoteRequest } from '@/components/BudgetCalculator';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjnjlgd';

const formSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  titulo_libro: z.string().min(1, 'El título es obligatorio'),
  paginas: z.string().min(1, 'Indica el número de páginas'),
  correccion: z.string(),
  traduccion: z.string(),
  plazo: z.string(),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const AutoedicionContactForm = ({ preset }: { preset?: BudgetQuoteRequest | null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      titulo_libro: '',
      paginas: '',
      correccion: 'no',
      traduccion: 'no',
      plazo: '120',
      mensaje: '',
    },
  });

  useEffect(() => {
    if (!preset) return;

    const correctionMap: Record<string, FormData['correccion']> = {
      none: 'no',
      ortho: 'ortho',
      style: 'style',
      complete: 'complete',
    };

    form.setValue('paginas', String(preset.pages));
    form.setValue('plazo', preset.deadline);
    form.setValue('correccion', correctionMap[preset.correction] ?? 'no');

    const lines = [
      `Presupuesto orientativo: ${preset.estimatedTotal.toLocaleString()} €`,
      `Páginas: ${preset.pages}`,
      `Plazo: ${preset.deadline} días`,
      `Corrección: ${preset.correction}`,
      `Panel de ventas: ${preset.includeSalesPanel ? 'Sí' : 'No'}`,
    ];

    const currentMessage = (form.getValues('mensaje') ?? '').trim();
    if (!currentMessage) {
      form.setValue('mensaje', lines.join('\n'));
    }

    form.setFocus('nombre');
  }, [preset, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || 'No proporcionado',
          titulo_libro: data.titulo_libro,
          paginas: data.paginas,
          correccion: data.correccion,
          traduccion: data.traduccion,
          plazo: `${data.plazo} días`,
          mensaje: data.mensaje || 'Sin mensaje adicional',
          _subject: `Nueva solicitud de autoedición: ${data.titulo_libro}`,
        }),
      });

      if (!response.ok) throw new Error('Error en el envío');

      toast.success('¡Solicitud enviada!', {
        description: 'Te contactaremos pronto con tu presupuesto personalizado.',
      });
      form.reset();
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
    <div id="contact-form" className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Send className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Cuéntanos tu proyecto</h3>
          <p className="text-muted-foreground">Te enviaremos un presupuesto personalizado sin compromiso</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+34 600 000 000" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titulo_libro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Título del libro *</FormLabel>
                  <FormControl>
                    <Input placeholder="El título de tu obra" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="paginas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Nº de páginas *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="150" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plazo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Plazo de publicación</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="120">120 días (4 meses)</SelectItem>
                      <SelectItem value="90">90 días (3 meses)</SelectItem>
                      <SelectItem value="60">60 días (2 meses)</SelectItem>
                      <SelectItem value="45">45 días</SelectItem>
                      <SelectItem value="30">30 días (urgente)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="correccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">¿Corrección?</FormLabel>
                   <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">No necesito</SelectItem>
                      <SelectItem value="ortho">Ortotipográfica</SelectItem>
                      <SelectItem value="style">De estilo</SelectItem>
                      <SelectItem value="complete">Completa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="traduccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">¿Traducción?</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="ingles">Inglés</SelectItem>
                      <SelectItem value="frances">Francés</SelectItem>
                      <SelectItem value="otro">Otro idioma</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Mensaje (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos más sobre tu proyecto..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-center text-sm text-muted-foreground mt-auto">
            * Sin compromiso. Respuesta en menos de 24 horas.
          </p>

          <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting}>
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
        </form>
      </Form>
    </div>
  );
};
