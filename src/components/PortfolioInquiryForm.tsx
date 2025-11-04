import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const portfolioInquirySchema = z.object({
  nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'Máximo 100 caracteres'),
  apellidos: z.string().trim().min(2, 'Los apellidos deben tener al menos 2 caracteres').max(100, 'Máximo 100 caracteres'),
  email: z.string().trim().email('Email inválido').max(255, 'Máximo 255 caracteres'),
  telefono: z.string().trim().min(9, 'Teléfono inválido').max(20, 'Máximo 20 caracteres'),
  empresa: z.string().trim().max(150, 'Máximo 150 caracteres').optional(),
  categoria: z.string().min(1, 'Selecciona una categoría'),
  descripcion: z.string().trim().min(20, 'La descripción debe tener al menos 20 caracteres').max(2000, 'Máximo 2000 caracteres'),
  presupuesto: z.string().trim().max(100, 'Máximo 100 caracteres').optional(),
  plazo: z.string().trim().max(100, 'Máximo 100 caracteres').optional(),
});

type PortfolioInquiryFormData = z.infer<typeof portfolioInquirySchema>;

const categories = [
  { value: 'webs', label: 'Desarrollo Web' },
  { value: 'booktrailers', label: 'Booktrailers' },
  { value: 'cine', label: 'Cine y Audiovisual' },
  { value: 'avatares', label: 'Avatares y Personajes' },
  { value: 'pintura', label: 'Pintura y Arte Visual' },
  { value: 'imagen-corporativa', label: 'Imagen Corporativa' },
  { value: 'musica', label: 'Música y Producción' },
  { value: 'otro', label: 'Otro Servicio' },
];

export default function PortfolioInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PortfolioInquiryFormData>({
    resolver: zodResolver(portfolioInquirySchema),
  });

  const selectedCategory = watch('categoria');

  const onSubmit = async (data: PortfolioInquiryFormData) => {
    setIsSubmitting(true);
    
    try {
      // Enviar a Formspree y guardar en base de datos en paralelo
      const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Reemplaza con tu endpoint de Formspree
      
      const [formspreeResponse, supabaseResponse] = await Promise.all([
        // Enviar a Formspree
        fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            empresa: data.empresa || '',
            categoria: categories.find(c => c.value === data.categoria)?.label || data.categoria,
            descripcion: data.descripcion,
            presupuesto: data.presupuesto || '',
            plazo: data.plazo || '',
            _subject: `Nueva consulta de portafolio: ${data.categoria}`,
          }),
        }),
        // Guardar en Supabase
        supabase
          .from('portfolio_inquiries')
          .insert([{
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            empresa: data.empresa || null,
            categoria: data.categoria,
            descripcion: data.descripcion,
            presupuesto: data.presupuesto || null,
            plazo: data.plazo || null,
          }]),
      ]);

      // Verificar errores
      if (!formspreeResponse.ok) {
        console.error('Error en Formspree:', await formspreeResponse.text());
      }
      
      if (supabaseResponse.error) throw supabaseResponse.error;

      toast.success('¡Consulta enviada con éxito!', {
        description: 'Nos pondremos en contacto contigo pronto.',
      });
      
      reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Error al enviar la consulta', {
        description: 'Por favor, inténtalo de nuevo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            {...register('nombre')}
            placeholder="Tu nombre"
            className={errors.nombre ? 'border-destructive' : ''}
          />
          {errors.nombre && (
            <p className="text-sm text-destructive">{errors.nombre.message}</p>
          )}
        </div>

        {/* Apellidos */}
        <div className="space-y-2">
          <Label htmlFor="apellidos">Apellidos *</Label>
          <Input
            id="apellidos"
            {...register('apellidos')}
            placeholder="Tus apellidos"
            className={errors.apellidos ? 'border-destructive' : ''}
          />
          {errors.apellidos && (
            <p className="text-sm text-destructive">{errors.apellidos.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="tu@email.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input
            id="telefono"
            type="tel"
            {...register('telefono')}
            placeholder="+34 600 000 000"
            className={errors.telefono ? 'border-destructive' : ''}
          />
          {errors.telefono && (
            <p className="text-sm text-destructive">{errors.telefono.message}</p>
          )}
        </div>
      </div>

      {/* Empresa */}
      <div className="space-y-2">
        <Label htmlFor="empresa">Empresa (opcional)</Label>
        <Input
          id="empresa"
          {...register('empresa')}
          placeholder="Nombre de tu empresa"
        />
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoría del Proyecto *</Label>
        <Select
          onValueChange={(value) => setValue('categoria', value)}
          value={selectedCategory}
        >
          <SelectTrigger className={errors.categoria ? 'border-destructive' : ''}>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoria && (
          <p className="text-sm text-destructive">{errors.categoria.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción del Proyecto *</Label>
        <Textarea
          id="descripcion"
          {...register('descripcion')}
          placeholder="Describe tu proyecto con el mayor detalle posible..."
          rows={6}
          className={errors.descripcion ? 'border-destructive' : ''}
        />
        {errors.descripcion && (
          <p className="text-sm text-destructive">{errors.descripcion.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Presupuesto */}
        <div className="space-y-2">
          <Label htmlFor="presupuesto">Presupuesto Estimado (opcional)</Label>
          <Input
            id="presupuesto"
            {...register('presupuesto')}
            placeholder="Ej: 1000-3000€"
          />
        </div>

        {/* Plazo */}
        <div className="space-y-2">
          <Label htmlFor="plazo">Plazo de Entrega (opcional)</Label>
          <Input
            id="plazo"
            {...register('plazo')}
            placeholder="Ej: 2-3 meses"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar Consulta'
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        * Campos obligatorios. Nos pondremos en contacto contigo en un plazo de 24-48 horas.
      </p>
    </form>
  );
}
