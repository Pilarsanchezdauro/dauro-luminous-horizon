import { submitForm } from "@/lib/submitForm";
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

// 50MB: es el tope del bucket editorial-submissions (file_size_limit = 52428800, migración
// del 4-nov-2025). Si algún día hace falta más, hay que subirlo antes ALLÍ: el bucket manda.
// OJO (22-oct-2026): el bucket admite 50 MB, pero la Edge Function
// dauro-ciencia-upload-files, que es por donde sube el fichero, TODAVÍA rechaza
// todo lo que pase de 20 MB en producción. Hasta que se despliegue la función con
// su nuevo tope, el cliente tiene que anunciar 20 MB: si no, el autor sube 30 MB,
// espera, y le falla al final.
const MAX_FILE_SIZE = 20 * 1024 * 1024;
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
  // Estos dos no son <input>: se rellenan con setValue. Si llegan sin valor, zod responde
  // "Required" en inglés, así que se le da el mensaje en español también para ese caso.
  tipo_obra: z
    .string({ required_error: "Selecciona un tipo de obra", invalid_type_error: "Selecciona un tipo de obra" })
    .trim()
    .min(1, "Selecciona un tipo de obra"),
  via: z
    .string({ required_error: "Elige qué buscas", invalid_type_error: "Elige qué buscas" })
    .trim()
    .min(1, "Elige qué buscas"),
});

// Las dos puertas de la casa. Se guarda la clave y se manda también la etiqueta, para
// que la propuesta entre en Odoo ya clasificada por vía y no haya que adivinarlo.
const VIAS = [
  {
    valor: "editorial",
    titulo: "Quiero que la editorial asuma la edición",
    texto:
      "Entendemos que si has llegado hasta aquí es porque crees en tu obra, y así la vamos a " +
      "leer: entera y con atención. Si apostamos por ella, la editamos sin coste para ti y " +
      "percibes tus derechos de autor. Es el camino más exigente de los dos, porque la " +
      "editorial asume toda la inversión: por eso leemos despacio y con criterio.",
  },
  {
    valor: "servicios",
    titulo: "Quiero información sobre servicios editoriales",
    texto:
      "Del trabajo que la obra necesite —corrección, estructura, estilo, maquetación, " +
      "cubierta— se encarga nuestro equipo editorial, con un presupuesto cerrado que conoces " +
      "antes de empezar.",
  },
];

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
    // TRAMPA (23-oct-2026): «tipo_obra» y «via» no son <input>, así que sin valor de
    // partida llegan a zod como undefined y el error sale como «Required», en inglés.
    // Arrancándolos en cadena vacía se dispara el min(1) y el autor lee el mensaje bueno.
    defaultValues: { tipo_obra: "", via: "" },
  });

  const tipoObra = watch("tipo_obra");
  const via = watch("via");

  // El formulario es largo y vive dentro de un contenedor con scroll propio: al fallar la
  // validación los mensajes se pintan, pero pueden quedar por encima de lo que el autor ve,
  // y parece que el botón no hace nada. Lo llevamos hasta el primero y se lo decimos.
  // (Victoria Eugenia Muñoz avisó el 23-oct-2026 de que «al pulsar en Enviar no responde».)
  const alFaltarDatos = () => {
    window.setTimeout(() => {
      const primero = document.querySelector<HTMLElement>(".text-destructive");
      if (!primero) return;
      primero.scrollIntoView({ behavior: "smooth", block: "center" });
      // y dejamos el foco en el campo que falta, para quien va con el teclado
      const campo = primero.parentElement?.querySelector<HTMLElement>(
        "input, select, textarea, button[aria-pressed], [role=combobox]"
      );
      campo?.focus({ preventScroll: true });
    }, 80);
    toast({
      title: "Faltan datos por completar",
      description:
        "Te llevamos hasta el primer campo que falta. Complétalo y vuelve a darle a enviar.",
      variant: "destructive",
    });
  };

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
        description: `${fieldName} no debe superar 20MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // El bucket "editorial-submissions" es privado: la subida se hace a través de
  // la edge function (service role), que devuelve la ruta y una URL firmada de
  // 30 días para los enlaces del email. Función compartida con Dauro Ciencia.
  const uploadViaFunction = async (
    file: File,
    field: "obra" | "curriculum"
  ): Promise<{ path: string; signedUrl: string }> => {
    const formData = new FormData();
    formData.append(field, file);

    const { data, error } = await supabase.functions.invoke(
      "dauro-ciencia-upload-files",
      { body: formData }
    );

    if (error || !data?.[field]?.path || !data?.[field]?.signedUrl) {
      console.error("Error uploading file:", error, data);
      throw new Error(`Error al subir ${field === "obra" ? "la obra" : "el currículum"}`);
    }

    return data[field];
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

    if (!validateFile(obraFile, "manuscrito") || !validateFile(curriculumFile, "currículum")) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Subir a través de la edge function (bucket privado + URL firmada de 30 días)
      const obraUpload = await uploadViaFunction(obraFile, "obra");
      const cvUpload = await uploadViaFunction(curriculumFile, "curriculum");

      const obraFilePath = obraUpload.path;
      const curriculumFilePath = cvUpload.path;
      const obraUrl = obraUpload.signedUrl;
      const cvUrl = cvUpload.signedUrl;

      // Preparar datos para Formspree (sin archivos grandes, solo URLs)
      const formspreeEndpoint = 'https://formspree.io/f/mldoyzjb';
      const viaElegida = VIAS.find((v) => v.valor === data.via);
      
      const formspreeData = {
        _replyto: data.email,
        _subject: `📚 Nueva Propuesta Editorial: ${data.titulo_obra}`,
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        titulo_obra: data.titulo_obra,
        tipo_obra: data.tipo_obra,
        via: data.via,
        via_etiqueta: viaElegida?.titulo ?? data.via,
        manuscrito_url: obraUrl,
        curriculum_url: cvUrl,
        mensaje: `🎉 NUEVA PROPUESTA EDITORIAL RECIBIDA\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 DATOS DEL AUTOR:\n   • Nombre: ${data.nombre} ${data.apellidos}\n   • Email: ${data.email}\n   • Teléfono: ${data.telefono}\n\n📚 DATOS DE LA OBRA:\n   • Título: ${data.titulo_obra}\n   • Tipo: ${data.tipo_obra}\n\n🚪 VÍA ELEGIDA POR EL AUTOR:\n   • ${viaElegida?.titulo ?? data.via}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📥 DESCARGAR ARCHIVOS:\n\n📖 MANUSCRITO:\n${obraUrl}\n\n📄 CURRÍCULUM VITAE:\n${cvUrl}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 Haz clic en los enlaces para descargar los archivos directamente.\n⚠️ Los enlaces caducan a los 30 días; después, los archivos siguen disponibles en el panel de administración (grupodauro.com/admin/editorial).\n\nGrupo Dauro Editorial`,
      };
      
      const [formspreeResponse, supabaseResponse] = await Promise.all([
        // Enviar a Formspree solo con URLs (sin archivos pesados)
        submitForm("dauro-manuscrito", formspreeEndpoint, {
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
    <form onSubmit={handleSubmit(onSubmit, alFaltarDatos)} className="space-y-6">
      {/* Condiciones a la vista antes de enviar: cierra la "rendija" de quien
          cree que publicamos cualquier obra sin coste en cualquier caso. */}
      <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed">
        <p className="font-playfair font-bold text-base mb-2">Antes de enviar, cómo trabajamos</p>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Si tu obra ya está terminada</strong> y encaja en
            nuestro catálogo, apostamos por ella y la editamos{" "}
            <strong className="text-foreground">sin coste para ti</strong>; tú percibes tus derechos.
          </li>
          <li>
            <strong className="text-foreground">Si necesita trabajo</strong> (corrección, estructura,
            estilo), de ese trabajo se encarga nuestro equipo editorial: son{" "}
            <strong className="text-foreground">servicios editoriales</strong>, con un presupuesto
            cerrado que conoces antes de empezar.
          </li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          Te respondemos en <strong className="text-foreground">48 horas</strong>. Este primer paso es
          gratuito y no te compromete a nada.
        </p>
      </div>

      {/* Qué busca el autor. Entra en Odoo con la propuesta, para que la oportunidad
          nazca clasificada por vía y no haya que deducirlo después. */}
      <div>
        <Label className="text-base">¿Qué buscas? *</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Elige el camino que tienes en mente. No es una decisión cerrada: leemos tu obra en
          cualquiera de los dos casos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VIAS.map((v) => (
            <button
              key={v.valor}
              type="button"
              onClick={() => setValue("via", v.valor, { shouldValidate: true })}
              aria-pressed={via === v.valor}
              className={`text-left rounded-xl border-2 p-4 transition-colors ${
                via === v.valor
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="block font-semibold text-foreground mb-1">{v.titulo}</span>
              <span className="block text-sm text-muted-foreground leading-relaxed">{v.texto}</span>
            </button>
          ))}
        </div>
        {errors.via && <p className="text-sm text-destructive mt-2">{errors.via.message}</p>}
        <p className="text-sm text-muted-foreground mt-3">
          <strong className="text-foreground">Elijas la que elijas, tendrás una respuesta razonada.</strong>{" "}
          Si al leerla vemos que la obra necesita trabajo editorial antes de publicarse, te lo diremos
          y te explicaremos en qué consiste y qué coste tiene. A partir de ahí, decides tú.
        </p>
      </div>

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
        <Label htmlFor="obra">Tu obra * (PDF o Word, máx. 20MB)</Label>
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
        <Label htmlFor="curriculum">Sinopsis y unas líneas sobre ti * (PDF o Word, máx. 20MB)</Label>
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
                <span>Haz clic para subir la sinopsis</span>
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
