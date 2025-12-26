import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Search, Upload, Download, Trash2, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface CatalogProduct {
  id: string;
  codigo: string | null;
  titulo: string;
  isbn: string | null;
  familia: string | null;
  pvp: number | null;
  descripcion: string | null;
  editorial: string | null;
  paginas: number | null;
  activo: boolean | null;
  segunda_mano: boolean | null;
  imagen_url: string | null;
  created_at: string;
}

const CatalogProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [importData, setImportData] = useState("");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-catalog-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as CatalogProduct[];
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, activo }: { id: string; activo: boolean }) => {
      const { error } = await supabase
        .from("catalog_products")
        .update({ activo })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-catalog-products"] });
      toast.success("Estado actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar el estado");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("catalog_products")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-catalog-products"] });
      toast.success("Producto eliminado");
    },
    onError: () => {
      toast.error("Error al eliminar");
    },
  });

  const importMutation = useMutation({
    mutationFn: async (jsonData: string) => {
      const products = JSON.parse(jsonData);
      if (!Array.isArray(products)) {
        throw new Error("El JSON debe ser un array de productos");
      }

      const { error } = await supabase
        .from("catalog_products")
        .upsert(products, { onConflict: "codigo" });
      
      if (error) throw error;
      return products.length;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["admin-catalog-products"] });
      toast.success(`${count} productos importados correctamente`);
      setIsImportOpen(false);
      setImportData("");
    },
    onError: (error) => {
      toast.error(`Error al importar: ${error.message}`);
    },
  });

  const filteredProducts = products?.filter(product =>
    product.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportProducts = () => {
    if (!products) return;
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "catalogo-productos.json";
    a.click();
  };

  const cleanFamiliaName = (familia: string) => {
    return familia.replace(/^\[\d+\]\s*/, "");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
          <p className="text-muted-foreground">
            {products?.length || 0} productos en el catálogo
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar JSON
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Importar Productos</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>JSON de productos</Label>
                  <Textarea
                    placeholder='[{"codigo": "123", "titulo": "Mi Libro", "isbn": "978-...", "pvp": 15, "familia": "Narrativa", "activo": true}]'
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Campos disponibles:</p>
                  <code className="text-xs">
                    codigo, titulo, isbn, familia, pvp, descripcion, editorial, paginas, activo, segunda_mano, imagen_url
                  </code>
                </div>
                <Button 
                  onClick={() => importMutation.mutate(importData)}
                  disabled={!importData.trim() || importMutation.isPending}
                >
                  {importMutation.isPending ? "Importando..." : "Importar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={exportProducts}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por título, ISBN o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>PVP</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>2ª Mano</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">
                    {product.codigo || "-"}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {product.titulo}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {product.isbn || "-"}
                  </TableCell>
                  <TableCell>
                    {product.familia ? (
                      <Badge variant="outline">
                        {cleanFamiliaName(product.familia)}
                      </Badge>
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    {product.pvp ? `${product.pvp.toFixed(2)} €` : "-"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.activo ?? false}
                      onCheckedChange={(checked) => 
                        toggleActiveMutation.mutate({ id: product.id, activo: checked })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {product.segunda_mano ? (
                      <Badge variant="secondary">Sí</Badge>
                    ) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará "{product.titulo}" del catálogo.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(product.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CatalogProducts;
