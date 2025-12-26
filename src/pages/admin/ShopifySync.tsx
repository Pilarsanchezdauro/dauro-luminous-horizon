import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RefreshCw, AlertCircle, CheckCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SyncResult {
  success: boolean;
  productId?: number;
  title: string;
  error?: string;
}

interface SyncResponse {
  success: boolean;
  summary?: {
    totalExcelProducts: number;
    totalShopifyProducts: number;
    matched: number;
    updated: number;
    notFound: number;
    dryRun: boolean;
  };
  results?: SyncResult[];
  error?: string;
}

const ShopifySync = () => {
  const [jsonData, setJsonData] = useState("");
  const [dryRun, setDryRun] = useState(true);
  const [response, setResponse] = useState<SyncResponse | null>(null);

  const syncMutation = useMutation({
    mutationFn: async (data: { products: any[]; dryRun: boolean }) => {
      const { data: result, error } = await supabase.functions.invoke("sync-shopify-products", {
        body: data,
      });
      
      if (error) throw error;
      return result as SyncResponse;
    },
    onSuccess: (data) => {
      setResponse(data);
      if (data.success) {
        const msg = data.summary?.dryRun 
          ? `Simulación completada: ${data.summary?.matched} productos coinciden`
          : `Actualización completada: ${data.summary?.updated} productos actualizados`;
        toast.success(msg);
      } else {
        toast.error(data.error || "Error en la sincronización");
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSync = () => {
    try {
      const products = JSON.parse(jsonData);
      if (!Array.isArray(products)) {
        toast.error("El JSON debe ser un array de productos");
        return;
      }
      syncMutation.mutate({ products, dryRun });
    } catch (e) {
      toast.error("JSON inválido");
    }
  };

  const exampleJson = `[
  {
    "codigo": "702",
    "titulo": "ACCIDENTES DE TRABAJO",
    "isbn": "9788494783005",
    "familia": "[01] Narrativa",
    "pvp": 19,
    "descripcion": "SINOPSIS\\n\\nEl ideario que identifica su obra...",
    "editorial": "Ediciones Dauro"
  }
]`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sincronizar Shopify con Excel</h1>
        <p className="text-muted-foreground">
          Actualiza las descripciones y géneros de productos en Shopify con datos del Excel
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Datos del Excel (JSON)
            </CardTitle>
            <CardDescription>
              Pega aquí el JSON con los productos del Excel para actualizar Shopify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={exampleJson}
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="dry-run"
                  checked={dryRun}
                  onCheckedChange={setDryRun}
                />
                <Label htmlFor="dry-run">
                  Modo simulación (no actualiza Shopify)
                </Label>
              </div>
              
              <Badge variant={dryRun ? "secondary" : "destructive"}>
                {dryRun ? "Simulación" : "Actualización real"}
              </Badge>
            </div>

            <Button 
              onClick={handleSync} 
              disabled={!jsonData.trim() || syncMutation.isPending}
              className="w-full"
            >
              {syncMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {dryRun ? "Simular sincronización" : "Sincronizar con Shopify"}
                </>
              )}
            </Button>

            {!dryRun && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Atención</AlertTitle>
                <AlertDescription>
                  Los cambios se aplicarán directamente en tu tienda Shopify. 
                  Esta acción no se puede deshacer fácilmente.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>
              {response?.summary ? (
                <span>
                  {response.summary.matched} coincidencias de {response.summary.totalExcelProducts} productos
                </span>
              ) : (
                "Los resultados de la sincronización aparecerán aquí"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {response?.summary && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Productos Excel</p>
                    <p className="text-2xl font-bold">{response.summary.totalExcelProducts}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Productos Shopify</p>
                    <p className="text-2xl font-bold">{response.summary.totalShopifyProducts}</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <p className="text-muted-foreground">Coincidencias</p>
                    <p className="text-2xl font-bold text-green-600">{response.summary.matched}</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <p className="text-muted-foreground">No encontrados</p>
                    <p className="text-2xl font-bold text-amber-600">{response.summary.notFound}</p>
                  </div>
                </div>

                {response.summary.updated > 0 && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Actualización completada</AlertTitle>
                    <AlertDescription>
                      Se actualizaron {response.summary.updated} productos en Shopify
                    </AlertDescription>
                  </Alert>
                )}

                <ScrollArea className="h-[300px] border rounded-lg p-4">
                  <div className="space-y-2">
                    {response.results?.map((result, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2 rounded text-sm ${
                          result.success ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{result.title}</p>
                            {result.error && (
                              <p className="text-xs text-muted-foreground">{result.error}</p>
                            )}
                            {result.productId && (
                              <p className="text-xs text-muted-foreground">ID: {result.productId}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {!response && (
              <div className="text-center py-12 text-muted-foreground">
                <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Pega el JSON y ejecuta la sincronización</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ol className="list-decimal pl-4 space-y-2 text-sm">
            <li>Exporta tu Excel a CSV (separado por tabuladores)</li>
            <li>Usa el script <code>node scripts/excel-to-catalog-json.js input.csv output.json</code></li>
            <li>Copia el contenido del JSON generado y pégalo arriba</li>
            <li>Primero ejecuta en <strong>modo simulación</strong> para ver las coincidencias</li>
            <li>Revisa los resultados y luego desactiva el modo simulación para actualizar Shopify</li>
          </ol>
          
          <p className="mt-4 text-muted-foreground">
            La sincronización cruza productos por título (normalizado). 
            Se actualizará la descripción (body_html) y el tipo de producto (product_type) con el género.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopifySync;
