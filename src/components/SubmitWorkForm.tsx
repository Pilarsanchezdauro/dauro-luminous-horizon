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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
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
        description: `${fieldName} no debe superar 10MB`,
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

      // Insert data into database
      const { error: insertError } = await supabase
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
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "¡Tu obra está en camino! 📚✨",
        description: "Gracias por compartir tu creatividad con nosotros. Evaluaremos tu propuesta con el cariño que merece y te contactaremos pronto.",
      });

      reset();
      setObraFile(null);
      setCurriculumFile(null);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Oh no, algo falló 😓",
        description: "Por favor, intenta enviarnos tu obra nuevamente. Si persiste el error, escríbenos a info@grupodauro.com",
        variant: "destructive",
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
        <Label htmlFor="obra">Manuscrito de la obra * (PDF o Word, máx. 10MB)</Label>
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
        <Label htmlFor="curriculum">Curriculum vitae * (PDF o Word, máx. 10MB)</Label>
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
