import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Por favor, introduce un email válido").max(255),
});

interface GuideDownloadFormProps {
  pdfUrl: string;
  guideTitle?: string;
}

const GuideDownloadForm = ({ pdfUrl, guideTitle = "Guía Editorial para Autores" }: GuideDownloadFormProps) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [errors, setErrors] = useState<{ nombre?: string; email?: string }>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = formSchema.safeParse({ nombre, email });
    if (!result.success) {
      const fieldErrors: { nombre?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "nombre") fieldErrors.nombre = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Trigger download first (most important action)
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = guideTitle.replace(/\s+/g, "-").toLowerCase() + ".pdf";
      link.target = "_self";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track the download request in analytics (non-blocking, fire and forget)
      supabase.from("analytics_events").insert({
        event_type: "guide_download",
        event_name: "guide_download_request",
        event_category: "lead_generation",
        page_url: window.location.href,
        metadata: {
          nombre,
          email,
          guide_title: guideTitle,
        },
      });

      setIsDownloaded(true);
      toast({
        title: "¡Descarga iniciada!",
        description: "Gracias por tu interés. La guía se está descargando.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "No se pudo procesar la solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDownloaded) {
    return (
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20 text-center">
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-playfair font-bold mb-2 text-foreground">
          ¡Gracias por descargar la guía!
        </h3>
        <p className="text-muted-foreground mb-4">
          Esperamos que te sea útil para tu proceso editorial.
        </p>
        <Button
          onClick={() => {
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = guideTitle.replace(/\s+/g, "-").toLowerCase() + ".pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <Download className="h-8 w-8 text-primary" />
        <h3 className="text-xl font-playfair font-bold text-foreground">
          Descarga la guía completa en PDF
        </h3>
      </div>
      <p className="text-muted-foreground mb-6">
        Introduce tu nombre y email para recibir la guía de 23 páginas con todos los consejos.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={errors.nombre ? "border-destructive" : ""}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Descargar guía gratuita
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Al descargar, aceptas nuestra{" "}
          <a href="/privacidad" className="text-primary hover:underline">
            política de privacidad
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default GuideDownloadForm;
