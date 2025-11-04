import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoDauroToast from "@/assets/logo-dauro-toast.png";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const formSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  apellidos: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().min(9, "Teléfono inválido").max(20),
  titulo_obra: z.string().trim().min(1, "El título de la obra es obligatorio").max(200),
  tipo_obra: z.string().trim().min(1, "Selecciona un tipo de obra"),
});

type FormData = z.infer<typeof formSchema>;

interface SubmitWorkFormProps {
  onSuccess?: () => void;
}

export default function SubmitWorkForm({ onSuccess }: SubmitWorkFormProps) {
  const [obraFile, setObraFile] = useState<File | null>(null);
  const [curriculumFile, setCurriculumFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const tipoObra = watch("tipo_obra");

  const validateFile = (file: File | null, fieldName: string): boolean => {
    if (!file) {
      toast({
        title: "Error",
        description: `Debes subir tu ${fieldName}`,
        variant: "destructive",
      });
      return false;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Error",
        description: `${fieldName} debe ser PDF o Word`,
        variant: "destructive",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: `${fieldName} no debe superar 50MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from("editorial-submissions")
      .upload(path, file);

    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }

    return data.path;
  };

  const onSubmit = async (data: FormData) => {
    if (!obraFile || !curriculumFile) {
      toast({
        title: "Error",
        description: "Debes adjuntar tanto la obra como el currículum.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let obraFilePath = null;
      let curriculumFilePath = null;

      // Upload manuscript file
      const obraFileExt = obraFile.name.split('.').pop();
      const obraFileName = `obra-${Date.now()}-${Math.random().toString(36).substring(7)}.${obraFileExt}`;
      const obraPath = `manuscripts/${obraFileName}`;

      const { error: obraUploadError } = await supabase.storage
        .from('editorial-submissions')
        .upload(obraPath, obraFile);

      if (obraUploadError) {
        throw new Error('Error al subir la obra');
      }

      obraFilePath = obraPath;

      // Upload curriculum file
      const cvFileExt = curriculumFile.name.split('.').pop();
      const cvFileName = `cv-${Date.now()}-${Math.random().toString(36).substring(7)}.${cvFileExt}`;
      const cvPath = `cvs/${cvFileName}`;

      const { error: cvUploadError } = await supabase.storage
        .from('editorial-submissions')
        .upload(cvPath, curriculumFile);

      if (cvUploadError) {
        throw new Error('Error al subir el curriculum');
      }

      curriculumFilePath = cvPath;

      // Generar URLs públicas de los archivos
      const { data: { publicUrl: obraUrl } } = supabase.storage
        .from('editorial-submissions')
        .getPublicUrl(obraFilePath);
      
      const { data: { publicUrl: cvUrl } } = supabase.storage
        .from('editorial-submissions')
        .getPublicUrl(curriculumFilePath);

      // Preparar datos para Formspree (sin archivos grandes, solo URLs)
      const formspreeEndpoint = 'https://formspree.io/f/mldoyzjb';
      
      const formspreeData = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        titulo_obra: data.titulo_obra,
        tipo_obra: data.tipo_obra,
        _subject: `Nueva propuesta editorial: ${data.titulo_obra}`,
        manuscrito_url: obraUrl,
        curriculum_url: cvUrl,
        mensaje: `Nueva propuesta editorial recibida de ${data.nombre} ${data.apellidos}.\n\n📚 MANUSCRITO:\n${obraUrl}\n\n📄 CURRÍCULUM VITAE:\n${cvUrl}\n\nDescarga los archivos haciendo clic en los enlaces.`,
      };
      
      const [formspreeResponse, supabaseResponse] = await Promise.all([
        // Enviar a Formspree solo con URLs (sin archivos pesados)
        fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formspreeData),
        }),
        // Guardar en Supabase
        supabase
          .from('editorial_submissions')
          .insert({
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            titulo_obra: data.titulo_obra,
            tipo_obra: data.tipo_obra,
            obra_file_path: obraFilePath,
            curriculum_file_path: curriculumFilePath,
          }),
      ]);

      if (!formspreeResponse.ok) {
        console.error('Error en Formspree:', await formspreeResponse.text());
      }

      if (supabaseResponse.error) {
        throw supabaseResponse.error;
      }

      toast({
        description: (
          <div className="flex flex-col gap-4 p-2">
            <div className="flex items-center gap-3">
              <img src={logoDauroToast} alt="Grupo Dauro" className="h-16 w-16" />
              <div>
                <h3 className="text-lg font-bold text-foreground">¡Propuesta Recibida con Éxito!</h3>
                <p className="text-sm text-muted-foreground mt-1">Grupo Dauro</p>
              </div>
            </div>
            <div className="space-y-2 border-t pt-3">
              <p className="text-base leading-relaxed">
                💚 <strong>Gracias por confiar en nosotros.</strong> Tu propuesta es muy importante para Grupo Dauro.
              </p>
              <p className="text-sm text-muted-foreground">
                Nuestro equipo revisará cuidadosamente tu obra y nos pondremos en contacto contigo en las <strong className="text-primary">próximas 48 horas</strong> a través del email que nos has proporcionado.
              </p>
            </div>
          </div>
        ),
        duration: 8000,
      });

      reset();
      setObraFile(null);
      setCurriculumFile(null);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/gracias');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error al enviar la propuesta",
        description: "Por favor, intenta de nuevo. Si el problema persiste, contáctanos directamente en info@grupodauro.com",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    setter(file);
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
        <Label htmlFor="titulo_obra">Título de la obra *</Label>
        <Input
          id="titulo_obra"
          {...register("titulo_obra")}
          placeholder="El título de tu obra"
          className="mt-2"
        />
        {errors.titulo_obra && (
          <p className="text-sm text-destructive mt-1">{errors.titulo_obra.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tipo_obra">Tipo de obra *</Label>
        <Select
          value={tipoObra}
          onValueChange={(value) => setValue("tipo_obra", value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona el tipo de obra" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novela">Novela</SelectItem>
            <SelectItem value="cuento">Libro de cuentos</SelectItem>
            <SelectItem value="poesia">Poesía</SelectItem>
            <SelectItem value="ensayo">Ensayo</SelectItem>
            <SelectItem value="biografia">Biografía</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
        {errors.tipo_obra && (
          <p className="text-sm text-destructive mt-1">{errors.tipo_obra.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="obra">Manuscrito de la obra * (PDF o Word, máx. 50MB)</Label>
        <div className="mt-2">
          <input
            id="obra"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, setObraFile)}
            className="hidden"
          />
          <label
            htmlFor="obra"
            className="flex items-center justify-center w-full p-4 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
          >
            {obraFile ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{obraFile.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setObraFile(null);
                  }}
                  className="p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Upload className="h-5 w-5" />
                <span>Haz clic para subir tu obra</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="curriculum">Curriculum vitae * (PDF o Word, máx. 50MB)</Label>
        <div className="mt-2">
          <input
            id="curriculum"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, setCurriculumFile)}
            className="hidden"
          />
          <label
            htmlFor="curriculum"
            className="flex items-center justify-center w-full p-4 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
          >
            {curriculumFile ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{curriculumFile.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurriculumFile(null);
                  }}
                  className="p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Upload className="h-5 w-5" />
                <span>Haz clic para subir tu CV</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar propuesta editorial"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        * Campos obligatorios
      </p>
    </form>
  );
}
