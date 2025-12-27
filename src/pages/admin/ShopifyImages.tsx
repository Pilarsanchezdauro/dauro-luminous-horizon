import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ImageIcon, Loader2, CheckCircle2, XCircle, AlertCircle, ArrowRight, Search, BookOpen } from "lucide-react";

interface SyncResult {
  productId: number;
  title: string;
  barcode: string | null;
  imageUrl: string | null;
  status: string;
  matchType?: string;
  titleVariations?: string[];
  error?: string;
}

interface SyncResponse {
  summary: {
    totalProducts: number;
    matched: number;
    updated: number;
    skipped: number;
    errors: number;
    dryRun: boolean;
    lastProductId: number;
    hasMore: boolean;
    foundByBarcode: number;
    foundByTitle: number;
    noBarcode: number;
    noImageFound: number;
    alreadyHasImage: number;
  };
  results: SyncResult[];
}

const BASE_IMAGE_URL = "https://cdn.shopify.com/s/files/1/0737/2190/5317/files/";

export default function ShopifyImages() {
  const [dryRun, setDryRun] = useState(true);
  const [tryByTitle, setTryByTitle] = useState(true);
  const [limit, setLimit] = useState(30);
  const [sinceId, setSinceId] = useState(0);
  const [response, setResponse] = useState<SyncResponse | null>(null);
  const [totalUpdated, setTotalUpdated] = useState(0);
  const [accumulatedStats, setAccumulatedStats] = useState({
    totalProducts: 0,
    foundByBarcode: 0,
    foundByTitle: 0,
    noBarcode: 0,
    noImageFound: 0,
    alreadyHasImage: 0,
  });

  const syncMutation = useMutation({
    mutationFn: async ({ dryRun, limit, sinceId, tryByTitle }: { dryRun: boolean; limit: number; sinceId: number; tryByTitle: boolean }) => {
      const { data, error } = await supabase.functions.invoke('associate-shopify-images', {
        body: {
          baseImageUrl: BASE_IMAGE_URL,
          dryRun,
          limit,
          sinceId,
          tryByTitle,
        },
      });

      if (error) throw error;
      return data as SyncResponse;
    },
    onSuccess: (data) => {
      setResponse(data);
      
      // Accumulate stats
      setAccumulatedStats(prev => ({
        totalProducts: prev.totalProducts + data.summary.totalProducts,
        foundByBarcode: prev.foundByBarcode + data.summary.foundByBarcode,
        foundByTitle: prev.foundByTitle + data.summary.foundByTitle,
        noBarcode: prev.noBarcode + data.summary.noBarcode,
        noImageFound: prev.noImageFound + data.summary.noImageFound,
        alreadyHasImage: prev.alreadyHasImage + data.summary.alreadyHasImage,
      }));
      
      if (!data.summary.dryRun) {
        setTotalUpdated(prev => prev + data.summary.updated);
      }
      
      if (data.summary.hasMore && data.summary.lastProductId) {
        setSinceId(data.summary.lastProductId);
      }
      
      toast.success(`Procesados ${data.summary.totalProducts} productos`, {
        description: `${data.summary.matched} coincidencias (${data.summary.foundByBarcode} por ISBN, ${data.summary.foundByTitle} por título)`,
      });
    },
    onError: (error) => {
      toast.error("Error al sincronizar", {
        description: error.message,
      });
    },
  });

  const handleSync = () => {
    syncMutation.mutate({ dryRun, limit, sinceId, tryByTitle });
  };

  const handleContinue = () => {
    if (response?.summary.lastProductId) {
      syncMutation.mutate({ dryRun, limit, sinceId: response.summary.lastProductId, tryByTitle });
    }
  };

  const handleReset = () => {
    setSinceId(0);
    setResponse(null);
    setTotalUpdated(0);
    setAccumulatedStats({
      totalProducts: 0,
      foundByBarcode: 0,
      foundByTitle: 0,
      noBarcode: 0,
      noImageFound: 0,
      alreadyHasImage: 0,
    });
  };

  const getStatusBadge = (status: string, matchType?: string) => {
    switch (status) {
      case 'updated':
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {matchType === 'title' ? 'Por título' : 'Por ISBN'}
          </Badge>
        );
      case 'would_update':
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            {matchType === 'title' ? 'Por título' : 'Por ISBN'}
          </Badge>
        );
      case 'skipped_has_image':
        return <Badge variant="secondary">Ya tiene imagen</Badge>;
      case 'skipped_no_barcode':
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Sin ISBN</Badge>;
      case 'no_image_found':
        return <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" />No encontrada</Badge>;
      case 'update_failed':
      case 'update_error':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Asociar Imágenes de Shopify</h1>
        <p className="text-muted-foreground">
          Asocia automáticamente las imágenes subidas a Shopify Files con los productos usando el ISBN o el título.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Configuración
            </CardTitle>
            <CardDescription>
              Configura los parámetros de sincronización
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dry-run">Modo prueba (Dry Run)</Label>
                <p className="text-sm text-muted-foreground">
                  Solo muestra qué productos se actualizarían
                </p>
              </div>
              <Switch
                id="dry-run"
                checked={dryRun}
                onCheckedChange={setDryRun}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="try-title">Buscar por título</Label>
                <p className="text-sm text-muted-foreground">
                  Si no encuentra por ISBN, intenta por título
                </p>
              </div>
              <Switch
                id="try-title"
                checked={tryByTitle}
                onCheckedChange={setTryByTitle}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="limit">Productos por lote</Label>
              <Input
                id="limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value) || 30)}
                min={1}
                max={50}
              />
              <p className="text-xs text-muted-foreground">
                Máximo 50 productos por lote para evitar timeouts
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="since-id">Desde Product ID</Label>
              <Input
                id="since-id"
                type="number"
                value={sinceId}
                onChange={(e) => setSinceId(parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                0 = desde el principio. Se actualiza automáticamente.
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSync}
                disabled={syncMutation.isPending}
                className="flex-1"
              >
                {syncMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    {dryRun ? 'Analizar' : 'Ejecutar'}
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {response?.summary.hasMore && (
              <Button 
                onClick={handleContinue}
                disabled={syncMutation.isPending}
                variant="secondary"
                className="w-full"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continuar con siguiente lote
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen Acumulado</CardTitle>
            <CardDescription>Estadísticas de todos los lotes procesados</CardDescription>
          </CardHeader>
          <CardContent>
            {accumulatedStats.totalProducts > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="text-2xl font-bold">{accumulatedStats.totalProducts}</div>
                    <div className="text-xs text-muted-foreground">Total procesados</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{accumulatedStats.alreadyHasImage}</div>
                    <div className="text-xs text-muted-foreground">Ya tienen imagen</div>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{accumulatedStats.foundByBarcode}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <BookOpen className="w-3 h-3" /> Por ISBN
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{accumulatedStats.foundByTitle}</div>
                    <div className="text-xs text-muted-foreground">Por título</div>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{accumulatedStats.noBarcode}</div>
                    <div className="text-xs text-muted-foreground">Sin ISBN</div>
                  </div>
                  <div className="text-center p-3 bg-red-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{accumulatedStats.noImageFound}</div>
                    <div className="text-xs text-muted-foreground">Sin imagen</div>
                  </div>
                </div>

                {totalUpdated > 0 && (
                  <div className="p-3 bg-green-500/20 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">
                      Total actualizados: {totalUpdated}
                    </div>
                  </div>
                )}

                {response?.summary.hasMore && (
                  <div className="p-2 bg-yellow-500/10 rounded text-center text-sm">
                    Hay más productos. Último ID: {response.summary.lastProductId}
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Modo: {response?.summary.dryRun ? 'Análisis' : 'Ejecución real'}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Ejecuta el análisis para ver resultados
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {response && response.results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalle de productos (último lote)</CardTitle>
            <CardDescription>
              {response.results.length} productos en este lote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {response.results.map((result) => (
                  <div
                    key={result.productId}
                    className="flex items-center justify-between p-2 rounded-lg border bg-card hover:bg-accent/5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-sm">
                        {result.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.barcode || 'Sin código'} • ID: {result.productId}
                      </div>
                      {result.imageUrl && (
                        <a 
                          href={result.imageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline truncate block"
                        >
                          {result.imageUrl.split('/').pop()}
                        </a>
                      )}
                      {result.titleVariations && result.titleVariations.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Variaciones: {result.titleVariations.slice(0, 2).join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {getStatusBadge(result.status, result.matchType)}
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
}
