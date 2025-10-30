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
  nombre: z.string().min(1, "El nombre es obligatorio").max(100),
  apellidos: z.string().min(1, "Los apellidos son obligatorios").max(100),
  email: z.string().email("Email inválido").max(255),
  telefono: z.string().min(9, "Teléfono inválido").max(20),
  titulo_obra: z.string().min(1, "El título de la obra es obligatorio").max(200),
  tipo_obra: z.string().min(1, "Selecciona un tipo de obra"),
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
      // Create form element
      const formElement = document.createElement('form');
      formElement.action = 'https://formsubmit.co/info@grupodauro.com';
      formElement.method = 'POST';
      formElement.enctype = 'multipart/form-data';
      formElement.style.display = 'none';

      // Add all fields
      const fields = {
        'Nombre': data.nombre,
        'Apellidos': data.apellidos,
        'Email': data.email,
        'Teléfono': data.telefono,
        'Título de la Obra': data.titulo_obra,
        'Tipo de Obra': data.tipo_obra,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        formElement.appendChild(input);
      });

      // Add file inputs
      const obraInput = document.createElement('input');
      obraInput.type = 'file';
      obraInput.name = 'Obra';
      const obraDataTransfer = new DataTransfer();
      obraDataTransfer.items.add(obraFile);
      obraInput.files = obraDataTransfer.files;
      formElement.appendChild(obraInput);

      const cvInput = document.createElement('input');
      cvInput.type = 'file';
      cvInput.name = 'Currículum';
      const cvDataTransfer = new DataTransfer();
      cvDataTransfer.items.add(curriculumFile);
      cvInput.files = cvDataTransfer.files;
      formElement.appendChild(cvInput);

      document.body.appendChild(formElement);
      formElement.submit();

      toast({
        title: "¡Propuesta enviada!",
        description: "Hemos recibido tu propuesta editorial. Te contactaremos pronto.",
      });

      reset();
      setObraFile(null);
      setCurriculumFile(null);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar la propuesta. Inténtalo de nuevo.",
        variant: "destructive",
      });
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
