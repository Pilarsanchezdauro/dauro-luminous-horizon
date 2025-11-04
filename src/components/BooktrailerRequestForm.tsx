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

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const booktrailerSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es requerido').max(100),
  apellidos: z.string().trim().min(1, 'Los apellidos son requeridos').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  telefono: z.string().trim().min(9, 'Teléfono inválido').max(20),
  titulo_libro: z.string().trim().min(1, 'El título del libro es requerido').max(200),
  autor: z.string().trim().min(1, 'El autor es requerido').max(200),
  genero: z.string().optional(),
  sinopsis: z.string().trim().min(50, 'La sinopsis debe tener al menos 50 caracteres').max(2000),
  tono: z.string().optional(),
  elementos_visuales: z.string().trim().optional(),
  referencias: z.string().trim().optional(),
  presupuesto: z.string().optional(),
  plazo: z.string().optional(),
});

type BooktrailerFormData = z.infer<typeof booktrailerSchema>;

export default function BooktrailerRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  const form = useForm<BooktrailerFormData>({
    resolver: zodResolver(booktrailerSchema),
    defaultValues: {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      titulo_libro: '',
      autor: '',
      genero: '',
      sinopsis: '',
      tono: '',
      elementos_visuales: '',
      referencias: '',
      presupuesto: '',
      plazo: '',
    },
  });

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setCoverImage(file);
  };

  const handleAdditionalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name}: Tipo de archivo no permitido`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: El archivo supera 20MB`);
        return false;
      }
      return true;
    });

    if (additionalFiles.length + validFiles.length > 5) {
      toast.error('Máximo 5 archivos adicionales');
      return;
    }

    setAdditionalFiles(prev => [...prev, ...validFiles]);
  };

  const removeAdditionalFile = (index: number) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('booktrailer-files')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    return fileName;
  };

  const onSubmit = async (data: BooktrailerFormData) => {
    setIsSubmitting(true);
    try {
      let coverImagePath: string | null = null;
      const additionalFilePaths: string[] = [];

      // Upload cover image
      if (coverImage) {
        coverImagePath = await uploadFile(coverImage, 'covers');
        if (!coverImagePath) {
          toast.error('Error al subir la imagen de portada');
          setIsSubmitting(false);
          return;
        }
      }

      // Upload additional files
      for (const file of additionalFiles) {
        const path = await uploadFile(file, 'additional');
        if (path) {
          additionalFilePaths.push(path);
        }
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
            tipo_formulario: 'Booktrailer',
            _subject: `Nueva solicitud de booktrailer: ${data.titulo_libro}`,
          }),
        }),
        // Guardar en Supabase
        supabase
          .from('booktrailer_requests')
          .insert([{
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            titulo_libro: data.titulo_libro,
            autor: data.autor,
            genero: data.genero || null,
            sinopsis: data.sinopsis,
            tono: data.tono || null,
            elementos_visuales: data.elementos_visuales || null,
            referencias: data.referencias || null,
            presupuesto: data.presupuesto || null,
            plazo: data.plazo || null,
            imagen_portada_path: coverImagePath,
            material_adicional_paths: additionalFilePaths.length > 0 ? additionalFilePaths : null,
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
      setCoverImage(null);
      setAdditionalFiles([]);
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
          name="sinopsis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sinopsis del libro *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe brevemente de qué trata tu libro (mínimo 50 caracteres)"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Cuéntanos la historia principal de tu libro
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tono deseado para el booktrailer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Qué atmósfera buscas?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="epico">Épico</SelectItem>
                  <SelectItem value="misterioso">Misterioso</SelectItem>
                  <SelectItem value="romantico">Romántico</SelectItem>
                  <SelectItem value="dramatico">Dramático</SelectItem>
                  <SelectItem value="alegre">Alegre</SelectItem>
                  <SelectItem value="inspirador">Inspirador</SelectItem>
                  <SelectItem value="suspense">Suspense</SelectItem>
                  <SelectItem value="emotivo">Emotivo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="elementos_visuales"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elementos visuales deseados</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe qué elementos visuales te gustaría ver (paisajes, personajes, objetos específicos, colores, etc.)"
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
          name="referencias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencias o ejemplos</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="¿Hay otros booktrailers que te gusten? Comparte enlaces o describe el estilo que buscas"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
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
                    <SelectItem value="menos-500">Menos de 500€</SelectItem>
                    <SelectItem value="500-1000">500€ - 1.000€</SelectItem>
                    <SelectItem value="1000-2000">1.000€ - 2.000€</SelectItem>
                    <SelectItem value="mas-2000">Más de 2.000€</SelectItem>
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
                    <SelectItem value="urgente">Urgente (1-2 semanas)</SelectItem>
                    <SelectItem value="normal">Normal (3-4 semanas)</SelectItem>
                    <SelectItem value="flexible">Flexible (1-2 meses)</SelectItem>
                    <SelectItem value="sin-prisa">Sin prisa (más de 2 meses)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <FormLabel>Imagen de portada del libro</FormLabel>
          <div className="mt-2">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {coverImage ? coverImage.name : 'Haz clic para subir la portada'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG o WEBP (máx. 20MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={handleCoverImageChange}
              />
            </label>
          </div>
        </div>

        {/* Additional Files Upload */}
        <div>
          <FormLabel>Material adicional (opcional)</FormLabel>
          <FormDescription className="mb-2">
            Puedes subir hasta 5 archivos (imágenes, PDFs, documentos) que te ayuden a explicar tu visión
          </FormDescription>
          <div>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Haz clic para subir archivos adicionales
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Imágenes, PDF, Word (máx. 20MB cada uno)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={ACCEPTED_FILE_TYPES.join(',')}
                multiple
                onChange={handleAdditionalFilesChange}
              />
            </label>
          </div>
          
          {additionalFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {additionalFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-accent/30 rounded">
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAdditionalFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando solicitud...
            </>
          ) : (
            'Enviar solicitud de booktrailer'
          )}
        </Button>
      </form>
    </Form>
  );
}