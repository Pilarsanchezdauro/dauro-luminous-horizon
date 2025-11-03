import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const webRequestSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es requerido').max(100),
  apellidos: z.string().trim().min(1, 'Los apellidos son requeridos').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  telefono: z.string().trim().min(1, 'El teléfono es requerido').max(20),
  empresa: z.string().trim().max(200).optional(),
  tipo_web: z.string().min(1, 'Selecciona el tipo de web'),
  descripcion: z.string().trim().min(1, 'La descripción es requerida').max(2000),
  funcionalidades: z.string().trim().max(2000).optional(),
  referencia_web: z.string().trim().url('URL inválida').optional().or(z.literal('')),
  presupuesto: z.string().optional(),
  plazo: z.string().optional(),
});

type WebRequestFormData = z.infer<typeof webRequestSchema>;

export default function WebRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const form = useForm<WebRequestFormData>({
    resolver: zodResolver(webRequestSchema),
    defaultValues: {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      empresa: '',
      tipo_web: '',
      descripcion: '',
      funcionalidades: '',
      referencia_web: '',
      presupuesto: '',
      plazo: '',
    },
  });

  const onSubmit = async (data: WebRequestFormData) => {
    try {
      setIsSubmitting(true);

      let documentPath: string | null = null;

      // Upload document file if provided
      if (documentFile) {
        const fileExt = documentFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('dauro-arte-documents')
          .upload(fileName, documentFile);

        if (uploadError) throw uploadError;
        documentPath = fileName;
      }

      // Insert the request
      const { error: insertError } = await supabase.from('web_requests').insert({
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        empresa: data.empresa || null,
        tipo_web: data.tipo_web,
        descripcion: data.descripcion,
        funcionalidades: data.funcionalidades || null,
        referencia_web: data.referencia_web || null,
        presupuesto: data.presupuesto || null,
        plazo: data.plazo || null,
        documento_file_path: documentPath,
      });

      if (insertError) throw insertError;

      toast.success('¡Solicitud enviada con éxito!');
      navigate('/gracias');
    } catch (error: any) {
      console.error('Error submitting web request:', error);
      toast.error('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Información Personal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              name="apellidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tus apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="600 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de tu empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Web Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detalles del Proyecto Web</h3>

          <FormField
            control={form.control}
            name="tipo_web"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Web *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de web" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="corporativa">Web Corporativa</SelectItem>
                    <SelectItem value="ecommerce">Tienda Online / E-commerce</SelectItem>
                    <SelectItem value="blog">Blog / Magazine</SelectItem>
                    <SelectItem value="portafolio">Portafolio / Personal</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="aplicacion">Aplicación Web</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del Proyecto *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe tu proyecto web: objetivo, público objetivo, contenido principal..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="funcionalidades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funcionalidades Deseadas (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej: formulario de contacto, integración con redes sociales, sistema de pagos, área privada..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referencia_web"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Web de Referencia (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="presupuesto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presupuesto Aproximado (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="menos-1000">Menos de 1.000€</SelectItem>
                      <SelectItem value="1000-3000">1.000€ - 3.000€</SelectItem>
                      <SelectItem value="3000-5000">3.000€ - 5.000€</SelectItem>
                      <SelectItem value="5000-10000">5.000€ - 10.000€</SelectItem>
                      <SelectItem value="mas-10000">Más de 10.000€</SelectItem>
                      <SelectItem value="consultar">A consultar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plazo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plazo Deseado (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un plazo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="urgente">Urgente (menos de 1 mes)</SelectItem>
                      <SelectItem value="1-2-meses">1-2 meses</SelectItem>
                      <SelectItem value="2-3-meses">2-3 meses</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormLabel>Documento Adicional (opcional)</FormLabel>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setDocumentFile(file);
              }}
            />
            <p className="text-xs text-muted-foreground">
              Puedes adjuntar un documento con más información (PDF, DOC, DOCX)
            </p>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </Button>
      </form>
    </Form>
  );
}