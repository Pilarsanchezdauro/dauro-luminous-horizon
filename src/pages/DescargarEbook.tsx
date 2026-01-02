import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Download, CheckCircle, XCircle, Loader2, BookOpen, AlertCircle } from "lucide-react";

export default function DescargarEbook() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "expired" | "limit">("loading");
  const [ebookUrl, setEbookUrl] = useState<string | null>(null);
  const [productTitle, setProductTitle] = useState<string | null>(null);
  const [remainingDownloads, setRemainingDownloads] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      verifyDownload();
    } else {
      setStatus("invalid");
      setError("No se proporcionó un token de descarga válido");
    }
  }, [token]);

  const verifyDownload = async () => {
    if (!token) return;

    try {
      const { data, error: invokeError } = await supabase.functions.invoke(
        "verify-ebook-download",
        { body: { token } },
      );

      if (invokeError || !data) {
        console.error("Error verifying download:", invokeError);
        setStatus("invalid");
        setError("Error al verificar la descarga");
        return;
      }

      if (data.status === "valid") {
        setEbookUrl(data.ebookUrl);
        setProductTitle(data.productTitle);
        setRemainingDownloads(data.remainingDownloads ?? 0);
        setStatus("valid");
        setError(null);
        return;
      }

      if (data.status === "expired") {
        setStatus("expired");
        setError("Este enlace de descarga ha expirado");
        return;
      }

      if (data.status === "limit") {
        setStatus("limit");
        setError(`Has alcanzado el límite de ${data.maxDownloads ?? 5} descargas`);
        return;
      }

      setStatus("invalid");
      setError("Token de descarga no válido o no encontrado");
    } catch (err) {
      console.error("Error verifying download:", err);
      setStatus("invalid");
      setError("Error al verificar la descarga");
    }
  };

  const handleDownload = async () => {
    if (!ebookUrl || !token) return;

    try {
      // Increment download count using edge function
      await supabase.functions.invoke("increment-ebook-download", {
        body: { token },
      });
    } catch (err) {
      console.error("Error incrementing download count:", err);
    }

    // Decrease remaining downloads in UI
    setRemainingDownloads((prev) => Math.max(0, prev - 1));

    // Open download URL
    window.open(ebookUrl, "_blank");
  };

  return (
    <>
      <SEO
        title="Descargar Ebook - Grupo Cultural Dauro"
        description="Descarga tu ebook adquirido en Ediciones Dauro"
        keywords="ebook, descarga, libro digital, Ediciones Dauro"
      />

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1 pt-28">
          <div className="container mx-auto px-6 py-12 max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  {status === "loading" && (
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  )}
                  {status === "valid" && (
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  )}
                  {(status === "invalid" || status === "expired" || status === "limit") && (
                    <XCircle className="h-16 w-16 text-red-500" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {status === "loading" && "Verificando descarga..."}
                  {status === "valid" && "¡Tu ebook está listo!"}
                  {status === "invalid" && "Enlace no válido"}
                  {status === "expired" && "Enlace expirado"}
                  {status === "limit" && "Límite de descargas alcanzado"}
                </CardTitle>
                {productTitle && (
                  <CardDescription className="text-lg mt-2">
                    {productTitle}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="space-y-6">
                {status === "valid" && (
                  <>
                    <p className="text-muted-foreground">
                      Haz clic en el botón para descargar tu ebook. 
                      Te quedan <strong>{remainingDownloads}</strong> descargas disponibles.
                    </p>
                    
                    <Button onClick={handleDownload} size="lg" className="w-full">
                      <Download className="h-5 w-5 mr-2" />
                      Descargar Ebook
                    </Button>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p className="text-left">
                        Este enlace es personal e intransferible. Tienes un máximo de 5 descargas 
                        y el enlace expira en 30 días desde la compra.
                      </p>
                    </div>
                  </>
                )}

                {error && status !== "valid" && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{error}</p>
                    
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <Link to="/tienda">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Ir a la tienda
                        </Link>
                      </Button>
                      <Button asChild variant="ghost">
                        <Link to="/contacto">Contactar soporte</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}