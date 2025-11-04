import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Link as LinkIcon } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png"
];

const formSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  apellidos: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().min(9, "Teléfono inválido").max(20),
  servicio: z.string().min(1, "Selecciona un servicio"),
  descripcion: z.string().trim().min(10, "La descripción debe tener al menos 10 caracteres").max(2000),
  enlace_web: z.string().trim().url("URL inválida").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface DauroArteContactFormProps {
  onSuccess?: () => void;
}

export default function DauroArteContactForm({ onSuccess }: DauroArteContactFormProps) {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const servicio = watch("servicio");

  const validateFile = (file: File | null): boolean => {
    if (!file) return true; // El archivo es opcional

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Error",
        description: "El documento debe ser PDF, Word, JPG o PNG",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: "El documento no debe superar 10MB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from("dauro-arte-documents")
      .upload(path, file);

    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }

    return data.path;
  };

  const onSubmit = async (data: FormData) => {
    if (!validateFile(documentFile)) return;

    setIsSubmitting(true);

    try {
      let documentFilePath = null;

      // Upload file to Supabase Storage if present
      if (documentFile) {
        const fileExt = documentFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `dauro-arte/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('dauro-arte-documents')
          .upload(filePath, documentFile);

        if (uploadError) {
          throw new Error('Error al subir el documento');
        }

        documentFilePath = filePath;
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
            tipo_formulario: 'Dauro Arte',
            _subject: `Nueva consulta Dauro Arte: ${data.servicio}`,
          }),
        }),
        // Guardar en Supabase
        supabase
          .from('dauro_arte_contacts')
          .insert({
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            servicio: data.servicio,
            descripcion: data.descripcion,
            enlace_web: data.enlace_web || null,
            documento_file_path: documentFilePath,
          }),
      ]);

      if (!formspreeResponse.ok) {
        console.error('Error en Formspree:', await formspreeResponse.text());
      }

      if (supabaseResponse.error) {
        throw supabaseResponse.error;
      }

      toast({
        title: "¡Gracias por confiar en nosotros! 🎨",
        description: "Tu consulta está en buenas manos. Nuestro equipo la revisará con atención y te responderá muy pronto.",
      });

      reset();
      setDocumentFile(null);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Ups, algo no salió bien 😔",
        description: "Por favor, inténtalo de nuevo en unos momentos. Si el problema persiste, contáctanos directamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDocumentFile(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            {...register("nombre")}
            placeholder="Tu nombre"
            className="mt-2"
          />
          {errors.nombre && (
            <p className="text-sm text-destructive mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="apellidos">Apellidos *</Label>
          <Input
            id="apellidos"
            {...register("apellidos")}
            placeholder="Tus apellidos"
            className="mt-2"
          />
          {errors.apellidos && (
            <p className="text-sm text-destructive mt-1">{errors.apellidos.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className="mt-2"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input
            id="telefono"
            {...register("telefono")}
            placeholder="+34 XXX XXX XXX"
            className="mt-2"
          />
          {errors.telefono && (
            <p className="text-sm text-destructive mt-1">{errors.telefono.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="servicio">Servicio solicitado *</Label>
        <Select
          value={servicio}
          onValueChange={(value) => setValue("servicio", value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona el servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="informes_periciales">Informes periciales de obras de arte</SelectItem>
            <SelectItem value="tasacion_valoracion">Tasación y valoración de obras de arte</SelectItem>
            <SelectItem value="analisis_autenticidad">Análisis de firma, autenticidad y documentoscopia</SelectItem>
            <SelectItem value="gestion_venta">Gestión y venta de obras de arte</SelectItem>
            <SelectItem value="portfolio_artistico">Creación y gestión de portfolio artístico</SelectItem>
            <SelectItem value="museos_instituciones">Servicios especializados para museos e instituciones</SelectItem>
            <SelectItem value="otros">Otros</SelectItem>
          </SelectContent>
        </Select>
        {errors.servicio && (
          <p className="text-sm text-destructive mt-1">{errors.servicio.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción de la consulta *</Label>
        <Textarea
          id="descripcion"
          {...register("descripcion")}
          placeholder="Describe tu consulta o proyecto en detalle..."
          className="mt-2 min-h-[120px]"
        />
        {errors.descripcion && (
          <p className="text-sm text-destructive mt-1">{errors.descripcion.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="enlace_web" className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          Enlace web (opcional)
        </Label>
        <Input
          id="enlace_web"
          {...register("enlace_web")}
          placeholder="https://ejemplo.com"
          className="mt-2"
          type="url"
        />
        {errors.enlace_web && (
          <p className="text-sm text-destructive mt-1">{errors.enlace_web.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="documento">
          Documento (opcional - PDF, Word, JPG o PNG, máx. 10MB)
        </Label>
        <div className="mt-2">
          <input
            id="documento"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="documento"
            className="flex items-center justify-center w-full p-4 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
          >
            {documentFile ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{documentFile.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setDocumentFile(null);
                  }}
                  className="p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Upload className="h-5 w-5" />
                <span>Haz clic para subir un documento</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full text-white"
        style={{ backgroundColor: '#E31B23' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C3131A'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E31B23'}
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar consulta"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        * Campos obligatorios
      </p>
    </form>
  );
}