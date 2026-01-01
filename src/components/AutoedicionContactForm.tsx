import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

export const AutoedicionContactForm = () => {
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('services_contacts').insert({
        nombre: data.nombre,
        apellidos: '',
        email: data.email,
        telefono: data.telefono || '',
        servicio: 'Autoedición',
        descripcion: `
Título: ${data.titulo_libro}
Páginas: ${data.paginas}
Corrección: ${data.correccion}
Traducción: ${data.traduccion}
Plazo deseado: ${data.plazo} días
${data.mensaje ? `Mensaje: ${data.mensaje}` : ''}
        `.trim(),
      });

      if (error) throw error;

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
    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold text-foreground mb-2">Cuéntanos tu proyecto</h3>
      <p className="text-muted-foreground mb-8">Te enviaremos un presupuesto personalizado sin compromiso</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono (opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+34 600 000 000" {...field} />
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
                  <FormLabel>Título provisional del libro *</FormLabel>
                  <FormControl>
                    <Input placeholder="El título de tu obra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="paginas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número aproximado de páginas *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="150" {...field} />
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
                  <FormLabel>¿En cuánto tiempo quieres publicar?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="correccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Necesitas corrección?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">No necesito corrección</SelectItem>
                      <SelectItem value="ortho">Ortotipográfica</SelectItem>
                      <SelectItem value="style">De estilo</SelectItem>
                      <SelectItem value="complete">Completa (orto + estilo)</SelectItem>
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
                  <FormLabel>¿Te interesa traducción?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="ingles">Sí, al inglés</SelectItem>
                      <SelectItem value="frances">Sí, al francés</SelectItem>
                      <SelectItem value="italiano">Sí, al italiano</SelectItem>
                      <SelectItem value="portugues">Sí, al portugués</SelectItem>
                      <SelectItem value="aleman">Sí, al alemán</SelectItem>
                      <SelectItem value="catalan">Sí, al catalán</SelectItem>
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
                <FormLabel>Mensaje o comentarios (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos más sobre tu proyecto, género literario, dudas..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
