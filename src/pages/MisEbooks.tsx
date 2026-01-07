import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Book, Download, Mail, Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface EbookPurchase {
  id: string;
  download_token: string;
  created_at: string;
  download_count: number;
  max_downloads: number;
  shopify_product_id: string;
  product_ebooks: {
    product_title: string;
    ebook_url: string;
    file_type: string;
  } | null;
}

const MisEbooks = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [purchases, setPurchases] = useState<EbookPurchase[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Por favor, introduce tu email");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // First get user's ebook purchases
      const { data: purchasesData, error: purchasesError } = await supabase
        .from("ebook_purchases")
        .select("*")
        .eq("email", email.toLowerCase().trim())
        .order("created_at", { ascending: false });

      if (purchasesError) throw purchasesError;

      if (!purchasesData || purchasesData.length === 0) {
        setPurchases([]);
        toast.info("No se encontraron ebooks asociados a este email");
        return;
      }

      // Get all product_ebooks to match by ID (handles both numeric and GID formats)
      const { data: ebooksData, error: ebooksError } = await supabase
        .from("product_ebooks")
        .select("*")
        .eq("is_active", true);

      if (ebooksError) throw ebooksError;

      // Match purchases with ebooks (normalize IDs for comparison)
      const transformedData = purchasesData.map(purchase => {
        const numericPurchaseId = purchase.shopify_product_id.replace(/^gid:\/\/shopify\/Product\//, '');
        
        const matchingEbook = ebooksData?.find(ebook => {
          const numericEbookId = ebook.shopify_product_id.replace(/^gid:\/\/shopify\/Product\//, '');
          return numericEbookId === numericPurchaseId;
        });

        return {
          ...purchase,
          product_ebooks: matchingEbook ? {
            product_title: matchingEbook.product_title,
            ebook_url: matchingEbook.ebook_url,
            file_type: matchingEbook.file_type
          } : null
        };
      }).filter(p => p.product_ebooks !== null); // Only show purchases with valid ebook files

      setPurchases(transformedData);

      if (transformedData.length === 0) {
        toast.info("No se encontraron ebooks asociados a este email");
      } else {
        toast.success(`Se encontraron ${transformedData.length} ebook(s)`);
      }
    } catch (error) {
      console.error("Error fetching ebooks:", error);
      toast.error("Error al buscar tus ebooks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (purchase: EbookPurchase) => {
    if (!purchase.product_ebooks) {
      toast.error("No se encontró el archivo del ebook");
      return;
    }

    // Check download limit
    if (purchase.download_count >= purchase.max_downloads) {
      toast.error("Has alcanzado el límite de descargas para este ebook");
      return;
    }

    try {
      // Increment download count
      const { error } = await supabase.rpc("increment_ebook_download", {
        p_token: purchase.download_token,
      });

      if (error) {
        console.error("Error incrementing download:", error);
      }

      // Update local state
      setPurchases(prev => prev.map(p => 
        p.id === purchase.id 
          ? { ...p, download_count: p.download_count + 1 }
          : p
      ));

      // Open download link
      window.open(purchase.product_ebooks.ebook_url, "_blank");
      toast.success("¡Descarga iniciada!");
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Error al descargar el ebook");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Mis Ebooks | Grupo Dauro</title>
        <meta name="description" content="Accede a tus ebooks comprados en Grupo Dauro. Introduce el email de tu compra para descargar tus libros digitales." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-28 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Book className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mis Ebooks</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Introduce el email con el que realizaste tu compra para acceder a tus ebooks y descargarlos.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Buscar mis compras
              </CardTitle>
              <CardDescription>
                Usaremos el email de tu pedido en Shopify para encontrar tus ebooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading} className="sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      Buscar ebooks
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {hasSearched && (
            <div className="space-y-4">
              {purchases.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Tus ebooks ({purchases.length})
                  </h2>
                  {purchases.map((purchase) => (
                    <Card key={purchase.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-6">
                          <h3 className="font-semibold text-lg mb-2">
                            {purchase.product_ebooks?.product_title || "Ebook"}
                          </h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Comprado el {formatDate(purchase.created_at)}</p>
                            <p>
                              Descargas: {purchase.download_count} de {purchase.max_downloads}
                            </p>
                            {purchase.product_ebooks?.file_type && (
                              <p className="uppercase">
                                Formato: {purchase.product_ebooks.file_type}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="p-6 bg-muted/50 flex items-center justify-center sm:w-48">
                          <Button
                            onClick={() => handleDownload(purchase)}
                            disabled={purchase.download_count >= purchase.max_downloads}
                            className="w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </>
              ) : (
                <Card className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No se encontraron ebooks</h3>
                  <p className="text-muted-foreground mb-6">
                    No hay ebooks asociados a este email. Asegúrate de usar el mismo email con el que realizaste tu compra.
                  </p>
                  <Link to="/tienda">
                    <Button variant="outline">
                      <Book className="w-4 h-4 mr-2" />
                      Explorar tienda
                    </Button>
                  </Link>
                </Card>
              )}
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-12 bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Si tienes problemas para acceder a tus ebooks o no recuerdas el email de tu compra, 
                contacta con nosotros y te ayudaremos.
              </p>
              <Link to="/contacto">
                <Button variant="outline" size="sm">
                  Contactar soporte
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MisEbooks;
