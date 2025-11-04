import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const bookCoverSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es requerido').max(100),
  apellidos: z.string().trim().min(1, 'Los apellidos son requeridos').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  telefono: z.string().trim().min(9, 'Teléfono inválido').max(20),
  titulo_libro: z.string().trim().min(1, 'El título del libro es requerido').max(200),
  autor: z.string().trim().min(1, 'El autor es requerido').max(200),
  genero: z.string().optional(),
  dimensiones: z.string().optional(),
  estilo_preferido: z.string().trim().optional(),
  descripcion: z.string().trim().min(50, 'La descripción debe tener al menos 50 caracteres').max(2000),
  presupuesto: z.string().optional(),
  plazo: z.string().optional(),
});

type BookCoverFormData = z.infer<typeof bookCoverSchema>;

export default function BookCoverRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const form = useForm<BookCoverFormData>({
    resolver: zodResolver(bookCoverSchema),
    defaultValues: {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      titulo_libro: '',
      autor: '',
      genero: '',
      dimensiones: '',
      estilo_preferido: '',
      descripcion: '',
      presupuesto: '',
      plazo: '',
    },
  });

  const handleReferenceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Solo se aceptan imágenes JPG, PNG o WEBP');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('La imagen no debe superar 20MB');
      return;
    }

    setReferenceImage(file);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `references/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('booktrailer-files')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    return fileName;
  };

  const onSubmit = async (data: BookCoverFormData) => {
    setIsSubmitting(true);
    try {
      let referenceImagePath: string | null = null;

      // Upload reference image if provided
      if (referenceImage) {
        referenceImagePath = await uploadFile(referenceImage);
        if (!referenceImagePath) {
          toast.error('Error al subir la imagen de referencia');
          setIsSubmitting(false);
          return;
        }
      }

      // Generar URL pública de la imagen
      let referenceImageUrl = '';
      if (referenceImagePath) {
        const { data: { publicUrl } } = supabase.storage
          .from('booktrailer-files')
          .getPublicUrl(referenceImagePath);
        referenceImageUrl = publicUrl;
      }

      // Enviar a Formspree y guardar en base de datos en paralelo
      const formspreeEndpoint = 'https://formspree.io/f/mzzklylj';
      
      const [formspreeResponse, supabaseResponse] = await Promise.all([
        // Enviar a Formspree
        fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            tipo_formulario: 'Portada de Libro',
            _subject: `Nueva solicitud de portada: ${data.titulo_libro}`,
            referencia_url: referenceImageUrl || 'No adjuntada',
            mensaje_archivos: referenceImageUrl ? `Imagen de referencia: ${referenceImageUrl}` : 'Sin imagen de referencia',
          }),
        }),
        // Guardar en Supabase
        supabase
          .from('book_cover_requests')
          .insert([{
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            titulo_libro: data.titulo_libro,
            autor: data.autor,
            genero: data.genero || null,
            dimensiones: data.dimensiones || null,
            estilo_preferido: data.estilo_preferido || null,
            descripcion: data.descripcion,
            presupuesto: data.presupuesto || null,
            plazo: data.plazo || null,
            referencia_visual_path: referenceImagePath,
          }]),
      ]);

      if (!formspreeResponse.ok) {
        console.error('Error en Formspree:', await formspreeResponse.text());
      }

      if (supabaseResponse.error) {
        console.error('Error inserting data:', supabaseResponse.error);
        toast.error('Error al enviar la solicitud');
        setIsSubmitting(false);
        return;
      }

      toast.success('¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.');
      form.reset();
      setReferenceImage(null);
      navigate('/gracias');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Input placeholder="+34 600 000 000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="titulo_libro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del libro *</FormLabel>
              <FormControl>
                <Input placeholder="Título de tu libro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="autor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor *</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del autor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género literario</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="novela">Novela</SelectItem>
                    <SelectItem value="poesia">Poesía</SelectItem>
                    <SelectItem value="ensayo">Ensayo</SelectItem>
                    <SelectItem value="infantil">Infantil/Juvenil</SelectItem>
                    <SelectItem value="biografia">Biografía</SelectItem>
                    <SelectItem value="historia">Historia</SelectItem>
                    <SelectItem value="ciencia-ficcion">Ciencia Ficción</SelectItem>
                    <SelectItem value="fantasia">Fantasía</SelectItem>
                    <SelectItem value="thriller">Thriller/Suspense</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dimensiones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensiones o formato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el formato" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bolsillo">Bolsillo (11 x 18 cm)</SelectItem>
                  <SelectItem value="estandar">Estándar (15 x 21 cm)</SelectItem>
                  <SelectItem value="grande">Grande (17 x 24 cm)</SelectItem>
                  <SelectItem value="ebook">eBook / Digital</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
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
              <FormLabel>Descripción del libro *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe brevemente de qué trata tu libro, la temática principal y el mensaje que quieres transmitir (mínimo 50 caracteres)"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Cuéntanos sobre tu libro para que podamos crear una portada que refleje su esencia
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estilo_preferido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estilo o elementos visuales deseados</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe el estilo visual que te gustaría (minimalista, vintage, moderno, ilustrado, fotográfico, etc.) y cualquier elemento específico que desees incluir"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ayúdanos a entender tu visión estética para la portada
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="presupuesto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presupuesto aproximado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rango de presupuesto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="menos-200">Menos de 200€</SelectItem>
                    <SelectItem value="200-400">200€ - 400€</SelectItem>
                    <SelectItem value="400-600">400€ - 600€</SelectItem>
                    <SelectItem value="mas-600">Más de 600€</SelectItem>
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
                <FormLabel>Plazo de entrega deseado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cuándo lo necesitas?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="urgente">Urgente (1 semana)</SelectItem>
                    <SelectItem value="normal">Normal (2-3 semanas)</SelectItem>
                    <SelectItem value="flexible">Flexible (1 mes)</SelectItem>
                    <SelectItem value="sin-prisa">Sin prisa (más de 1 mes)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Reference Image Upload */}
        <div>
          <FormLabel>Imagen de referencia (opcional)</FormLabel>
          <FormDescription className="mb-2">
            Si tienes una idea visual o un boceto, súbelo aquí para ayudarnos a entender mejor tu visión
          </FormDescription>
          <div className="mt-2">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {referenceImage ? referenceImage.name : 'Haz clic para subir imagen de referencia'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG o WEBP (máx. 20MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={handleReferenceImageChange}
              />
            </label>
            {referenceImage && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{referenceImage.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setReferenceImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando solicitud...
            </>
          ) : (
            'Enviar solicitud de portada'
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          * Campos obligatorios. Nos pondremos en contacto contigo en un plazo de 24-48 horas.
        </p>
      </form>
    </Form>
  );
}
