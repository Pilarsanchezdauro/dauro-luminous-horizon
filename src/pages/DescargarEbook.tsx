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
    try {
      // Check purchase record
      const { data: purchase, error: purchaseError } = await supabase
        .from("ebook_purchases")
        .select("*")
        .eq("download_token", token)
        .single();

      if (purchaseError || !purchase) {
        setStatus("invalid");
        setError("Token de descarga no válido o no encontrado");
        return;
      }

      // Check if expired
      if (new Date(purchase.expires_at) < new Date()) {
        setStatus("expired");
        setError("Este enlace de descarga ha expirado");
        return;
      }

      // Check download limit
      if (purchase.download_count >= purchase.max_downloads) {
        setStatus("limit");
        setError(`Has alcanzado el límite de ${purchase.max_downloads} descargas`);
        return;
      }

      // Get ebook info
      const { data: ebook, error: ebookError } = await supabase
        .from("product_ebooks")
        .select("*")
        .eq("shopify_product_id", purchase.shopify_product_id)
        .eq("is_active", true)
        .single();

      if (ebookError || !ebook) {
        setStatus("invalid");
        setError("El ebook no está disponible actualmente");
        return;
      }

      // Generate signed URL from private bucket (valid for 1 hour)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("ebooks")
        .createSignedUrl(ebook.ebook_url, 3600);

      if (signedUrlError || !signedUrlData?.signedUrl) {
        console.error("Error generating signed URL:", signedUrlError);
        setStatus("invalid");
        setError("Error al generar el enlace de descarga");
        return;
      }

      setEbookUrl(signedUrlData.signedUrl);
      setProductTitle(ebook.product_title);
      setRemainingDownloads(purchase.max_downloads - purchase.download_count);
      setStatus("valid");
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