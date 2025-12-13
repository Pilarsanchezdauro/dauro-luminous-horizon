import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Loader2, Music, Palette, Camera, Theater } from "lucide-react";

const formSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellidos: z.string().min(2, "Los apellidos son obligatorios"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(9, "Teléfono inválido"),
  categoria_artistica: z.string().min(1, "Selecciona una categoría"),
  descripcion: z.string().min(50, "Describe tu trabajo artístico (mínimo 50 caracteres)"),
  experiencia_profesional: z.string().optional(),
  web_personal: z.string().url("URL inválida").optional().or(z.literal("")),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  spotify: z.string().optional(),
  otras_redes: z.string().optional(),
  referencias: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const categorias = [
  { value: "cantante", label: "Cantante / Músico", icon: Music },
  { value: "pintor", label: "Pintor / Artista Visual", icon: Palette },
  { value: "fotografo", label: "Fotógrafo", icon: Camera },
  { value: "actor", label: "Actor / Intérprete", icon: Theater },
  { value: "otro", label: "Otra disciplina artística", icon: Palette },
];

export function ArtistSubmissionForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [curriculumFile, setCurriculumFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      categoria_artistica: "",
      descripcion: "",
      experiencia_profesional: "",
      web_personal: "",
      instagram: "",
      youtube: "",
      spotify: "",
      otras_redes: "",
      referencias: "",
    },
  });

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Formato no permitido. Usa PDF, DOC, DOCX, JPG, PNG o WEBP.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("El archivo no puede superar los 10MB.");
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File, prefix: string): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${prefix}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from("artist-submissions")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }

    return filePath;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setFile(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      let portfolioPath: string | null = null;
      let curriculumPath: string | null = null;

      if (portfolioFile) {
        portfolioPath = await uploadFile(portfolioFile, "portfolio");
        if (!portfolioPath) {
          toast.error("Error al subir el portfolio");
          setIsSubmitting(false);
          return;
        }
      }

      if (curriculumFile) {
        curriculumPath = await uploadFile(curriculumFile, "curriculum");
        if (!curriculumPath) {
          toast.error("Error al subir el currículum");
          setIsSubmitting(false);
          return;
        }
      }

      const redesSociales = {
        instagram: data.instagram || null,
        youtube: data.youtube || null,
        spotify: data.spotify || null,
        otras: data.otras_redes || null,
      };

      // Get public URLs for uploaded files
      let portfolioUrl = "";
      let curriculumUrl = "";
      
      if (portfolioPath) {
        const { data: urlData } = supabase.storage
          .from("artist-submissions")
          .getPublicUrl(portfolioPath);
        portfolioUrl = urlData.publicUrl;
      }
      
      if (curriculumPath) {
        const { data: urlData } = supabase.storage
          .from("artist-submissions")
          .getPublicUrl(curriculumPath);
        curriculumUrl = urlData.publicUrl;
      }

      // Send to Formspree for email notification
      const formspreeData = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        categoria_artistica: data.categoria_artistica,
        descripcion: data.descripcion,
        experiencia_profesional: data.experiencia_profesional || "No indicada",
        web_personal: data.web_personal || "No indicada",
        instagram: data.instagram || "No indicado",
        youtube: data.youtube || "No indicado",
        spotify: data.spotify || "No indicado",
        otras_redes: data.otras_redes || "No indicadas",
        referencias: data.referencias || "No indicadas",
        portfolio_url: portfolioUrl || "No adjunto",
        curriculum_url: curriculumUrl || "No adjunto",
        _subject: `Nueva solicitud de representación artística: ${data.nombre} ${data.apellidos}`,
      };

      const formspreeResponse = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formspreeData),
      });

      if (!formspreeResponse.ok) {
        console.error("Formspree error:", await formspreeResponse.text());
      }

      // Save to Supabase
      const { error } = await supabase.from("artist_submissions").insert({
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        categoria_artistica: data.categoria_artistica,
        descripcion: data.descripcion,
        experiencia_profesional: data.experiencia_profesional || null,
        web_personal: data.web_personal || null,
        redes_sociales: redesSociales,
        referencias: data.referencias || null,
        portfolio_file_path: portfolioPath,
        curriculum_file_path: curriculumPath,
      });

      if (error) {
        console.error("Error submitting:", error);
        toast.error("Error al enviar la solicitud. Inténtalo de nuevo.");
        setIsSubmitting(false);
        return;
      }

      toast.success("¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.");
      navigate("/gracias");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Datos personales */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Datos personales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              {...form.register("nombre")}
              placeholder="Tu nombre"
              className="bg-background/50"
            />
            {form.formState.errors.nombre && (
              <p className="text-sm text-destructive">{form.formState.errors.nombre.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellidos">Apellidos *</Label>
            <Input
              id="apellidos"
              {...form.register("apellidos")}
              placeholder="Tus apellidos"
              className="bg-background/50"
            />
            {form.formState.errors.apellidos && (
              <p className="text-sm text-destructive">{form.formState.errors.apellidos.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="tu@email.com"
              className="bg-background/50"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              {...form.register("telefono")}
              placeholder="+34 600 000 000"
              className="bg-background/50"
            />
            {form.formState.errors.telefono && (
              <p className="text-sm text-destructive">{form.formState.errors.telefono.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Información artística */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Información artística
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría artística *</Label>
            <Select
              onValueChange={(value) => form.setValue("categoria_artistica", value)}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecciona tu disciplina" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.categoria_artistica && (
              <p className="text-sm text-destructive">
                {form.formState.errors.categoria_artistica.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción de tu trabajo artístico *</Label>
            <Textarea
              id="descripcion"
              {...form.register("descripcion")}
              placeholder="Cuéntanos sobre tu trayectoria, estilo artístico, logros y qué te hace único..."
              className="bg-background/50 min-h-[120px]"
            />
            {form.formState.errors.descripcion && (
              <p className="text-sm text-destructive">{form.formState.errors.descripcion.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experiencia">Experiencia profesional</Label>
            <Textarea
              id="experiencia"
              {...form.register("experiencia_profesional")}
              placeholder="Proyectos anteriores, colaboraciones, exposiciones, conciertos, publicaciones..."
              className="bg-background/50 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referencias">Referencias profesionales</Label>
            <Textarea
              id="referencias"
              {...form.register("referencias")}
              placeholder="Personas o entidades que puedan dar referencias de tu trabajo..."
              className="bg-background/50"
            />
          </div>
        </div>
      </div>

      {/* Presencia online */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Presencia online
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="web">Web personal</Label>
            <Input
              id="web"
              {...form.register("web_personal")}
              placeholder="https://tu-web.com"
              className="bg-background/50"
            />
            {form.formState.errors.web_personal && (
              <p className="text-sm text-destructive">{form.formState.errors.web_personal.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              {...form.register("instagram")}
              placeholder="@tu_usuario"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              id="youtube"
              {...form.register("youtube")}
              placeholder="URL de tu canal"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotify">Spotify / Plataformas musicales</Label>
            <Input
              id="spotify"
              {...form.register("spotify")}
              placeholder="URL de tu perfil"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="otras_redes">Otras redes o plataformas</Label>
            <Input
              id="otras_redes"
              {...form.register("otras_redes")}
              placeholder="TikTok, SoundCloud, Behance, etc."
              className="bg-background/50"
            />
          </div>
        </div>
      </div>

      {/* Archivos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Documentación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Portfolio / Dossier artístico</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="portfolio"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                onChange={(e) => handleFileChange(e, setPortfolioFile)}
              />
              <label htmlFor="portfolio" className="cursor-pointer">
                {portfolioFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm">{portfolioFile.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Sube tu portfolio (PDF, DOC o imágenes)
                    </p>
                    <p className="text-xs text-muted-foreground">Máx. 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Currículum artístico</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="curriculum"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setCurriculumFile)}
              />
              <label htmlFor="curriculum" className="cursor-pointer">
                {curriculumFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm">{curriculumFile.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Sube tu CV artístico (PDF o DOC)
                    </p>
                    <p className="text-xs text-muted-foreground">Máx. 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
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
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enviando solicitud...
          </>
        ) : (
          "Enviar solicitud de representación"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Al enviar este formulario, aceptas nuestra{" "}
        <a href="/privacidad" className="underline hover:text-primary">
          política de privacidad
        </a>
        . Revisaremos tu solicitud y nos pondremos en contacto contigo.
      </p>
    </form>
  );
}
