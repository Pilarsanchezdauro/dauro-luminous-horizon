import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, CheckCircle, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface GenreUpdate {
  handle: string;
  title: string;
  genre: string;
}

interface UpdateResult {
  success: boolean;
  handle: string;
  title: string;
  genre: string;
  error?: string;
}

const ShopifyGenres = () => {
  const [csvData, setCsvData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dryRun, setDryRun] = useState(true);
  const [results, setResults] = useState<UpdateResult[]>([]);
  const [summary, setSummary] = useState<any>(null);

  const parseCSV = (csv: string): GenreUpdate[] => {
    const lines = csv.trim().split('\n');
    const products: GenreUpdate[] = [];
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV with possible quoted values
      const matches = line.match(/(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g);
      if (matches && matches.length >= 3) {
        const cols = matches.map(m => m.replace(/^,/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
        products.push({
          handle: cols[0]?.trim() || '',
          title: cols[1]?.trim() || '',
          genre: cols[2]?.trim() || '',
        });
      } else {
        // Try simple comma split
        const cols = line.split(',');
        if (cols.length >= 3) {
          products.push({
            handle: cols[0]?.trim() || '',
            title: cols[1]?.trim() || '',
            genre: cols[cols.length - 1]?.trim() || '',
          });
        }
      }
    }
    
    return products.filter(p => p.handle && p.genre);
  };

  const handleUpdate = async () => {
    const products = parseCSV(csvData);
    
    if (products.length === 0) {
      toast.error("No se encontraron productos válidos en el CSV");
      return;
    }

    setIsLoading(true);
    setResults([]);
    setSummary(null);

    try {
      // Process in batches of 20 to avoid timeout
      const batchSize = 20;
      const allResults: UpdateResult[] = [];
      let totalUpdated = 0;
      let totalErrors = 0;

      for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize);
        
        toast.info(`Procesando lote ${Math.floor(i / batchSize) + 1} de ${Math.ceil(products.length / batchSize)}...`);

        const { data, error } = await supabase.functions.invoke('update-shopify-genres', {
          body: { products: batch, dryRun },
        });

        if (error) {
          console.error('Error:', error);
          toast.error(`Error en lote ${Math.floor(i / batchSize) + 1}: ${error.message}`);
          totalErrors += batch.length;
          continue;
        }

        if (data?.results) {
          allResults.push(...data.results);
        }
        if (data?.summary) {
          totalUpdated += data.summary.updated || 0;
          totalErrors += data.summary.errors || 0;
        }

        // Small delay between batches
        if (i + batchSize < products.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      setResults(allResults);
      setSummary({
        totalProducts: products.length,
        updated: totalUpdated,
        errors: totalErrors,
        dryRun,
      });

      if (dryRun) {
        toast.success(`Vista previa completada: ${products.length} productos listos para actualizar`);
      } else {
        toast.success(`Actualización completada: ${totalUpdated} productos actualizados, ${totalErrors} errores`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al procesar la actualización");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleCSV = () => {
    setCsvData(`Handle,Title,Género (product.metafields.shopify.genre)
itaca-en-crisis-mario-romero-jerez,ÍTACA EN CRISIS – MARIO ROMERO JEREZ,Narrativa
zona-proxima-purificacion-fernandez-segura,ZONA PRÓXIMA – PURIFICACIÓN FERNÁNDEZ SEGURA,Poesía
yo-soy-todos-los-besos-que-nunca-pude-darte-francisco-lopez-barrios,Yo soy todos los besos que nunca pude darte – Francisco López Barrios,Narrativa`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Actualizar Géneros en Shopify</h1>
        <p className="text-muted-foreground">
          Sube un CSV con los handles de productos y sus géneros para actualizar el campo product_type en Shopify
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formato del CSV</CardTitle>
          <CardDescription>
            El CSV debe tener 3 columnas: Handle, Title, Género. La primera fila se considera cabecera.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="dry-run"
                checked={dryRun}
                onCheckedChange={setDryRun}
              />
              <Label htmlFor="dry-run">
                Modo prueba (no ejecuta cambios reales)
              </Label>
            </div>
            <Button variant="outline" size="sm" onClick={loadSampleCSV}>
              Cargar ejemplo
            </Button>
          </div>

          <Textarea
            placeholder="Pega aquí el contenido del CSV..."
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {parseCSV(csvData).length} productos detectados
            </p>
            <Button
              onClick={handleUpdate}
              disabled={isLoading || parseCSV(csvData).length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {dryRun ? "Vista previa" : "Actualizar géneros"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Badge variant="outline" className="text-base">
                Total: {summary.totalProducts}
              </Badge>
              <Badge variant="default" className="text-base bg-green-600">
                Actualizados: {summary.updated}
              </Badge>
              {summary.errors > 0 && (
                <Badge variant="destructive" className="text-base">
                  Errores: {summary.errors}
                </Badge>
              )}
              {summary.dryRun && (
                <Badge variant="secondary" className="text-base">
                  Modo prueba
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados ({results.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Handle: {result.handle}
                      </p>
                      <p className="text-sm">
                        Género: <span className="font-medium">{result.genre}</span>
                      </p>
                      {result.error && (
                        <p className="text-sm text-red-600 mt-1">{result.error}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShopifyGenres;
