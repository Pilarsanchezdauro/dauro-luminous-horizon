import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Download, Edit, ExternalLink, BookOpen } from "lucide-react";

interface ProductEbook {
  id: string;
  shopify_product_id: string;
  product_title: string;
  ebook_url: string;
  file_name: string | null;
  file_type: string | null;
  download_count: number;
  is_active: boolean;
  created_at: string;
}

export default function ProductEbooks() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState<ProductEbook | null>(null);
  const [formData, setFormData] = useState({
    shopify_product_id: "",
    product_title: "",
    ebook_url: "",
    file_name: "",
    file_type: "pdf",
  });

  const { data: ebooks, isLoading } = useQuery({
    queryKey: ["product-ebooks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_ebooks")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProductEbook[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("product_ebooks").insert({
        shopify_product_id: data.shopify_product_id,
        product_title: data.product_title,
        ebook_url: data.ebook_url,
        file_name: data.file_name || null,
        file_type: data.file_type || "pdf",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-ebooks"] });
      toast.success("Ebook añadido correctamente");
      resetForm();
    },
    onError: (error) => {
      toast.error("Error al añadir ebook: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProductEbook> }) => {
      const { error } = await supabase
        .from("product_ebooks")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-ebooks"] });
      toast.success("Ebook actualizado");
      resetForm();
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("product_ebooks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-ebooks"] });
      toast.success("Ebook eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      shopify_product_id: "",
      product_title: "",
      ebook_url: "",
      file_name: "",
      file_type: "pdf",
    });
    setEditingEbook(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.shopify_product_id || !formData.product_title || !formData.ebook_url) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    if (editingEbook) {
      updateMutation.mutate({
        id: editingEbook.id,
        data: {
          shopify_product_id: formData.shopify_product_id,
          product_title: formData.product_title,
          ebook_url: formData.ebook_url,
          file_name: formData.file_name || null,
          file_type: formData.file_type || "pdf",
        },
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (ebook: ProductEbook) => {
    setEditingEbook(ebook);
    setFormData({
      shopify_product_id: ebook.shopify_product_id,
      product_title: ebook.product_title,
      ebook_url: ebook.ebook_url,
      file_name: ebook.file_name || "",
      file_type: ebook.file_type || "pdf",
    });
    setIsDialogOpen(true);
  };

  const toggleActive = (ebook: ProductEbook) => {
    updateMutation.mutate({
      id: ebook.id,
      data: { is_active: !ebook.is_active },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Ebooks</h1>
          <p className="text-muted-foreground">
            Asocia archivos de ebook a productos de Shopify para descargas tras compra
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir Ebook
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingEbook ? "Editar Ebook" : "Añadir Nuevo Ebook"}</DialogTitle>
              <DialogDescription>
                Asocia un archivo de ebook a un producto de Shopify
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopify_product_id">ID del Producto en Shopify *</Label>
                <Input
                  id="shopify_product_id"
                  placeholder="gid://shopify/Product/123456789"
                  value={formData.shopify_product_id}
                  onChange={(e) => setFormData({ ...formData, shopify_product_id: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Puedes encontrar este ID en la URL del producto en Shopify
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product_title">Título del Producto *</Label>
                <Input
                  id="product_title"
                  placeholder="Mi Libro en Ebook"
                  value={formData.product_title}
                  onChange={(e) => setFormData({ ...formData, product_title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ebook_url">URL del Ebook *</Label>
                <Input
                  id="ebook_url"
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formData.ebook_url}
                  onChange={(e) => setFormData({ ...formData, ebook_url: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enlace directo al archivo (Google Drive, Dropbox, etc.)
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="file_name">Nombre del Archivo</Label>
                  <Input
                    id="file_name"
                    placeholder="mi-libro.pdf"
                    value={formData.file_name}
                    onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file_type">Tipo de Archivo</Label>
                  <Input
                    id="file_type"
                    placeholder="pdf, epub, mobi"
                    value={formData.file_type}
                    onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingEbook ? "Guardar Cambios" : "Añadir Ebook"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Ebooks Configurados
          </CardTitle>
          <CardDescription>
            Lista de ebooks asociados a productos. El cliente recibirá el enlace de descarga tras la compra.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Cargando...</div>
          ) : ebooks && ebooks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Archivo</TableHead>
                  <TableHead>Descargas</TableHead>
                  <TableHead>Activo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ebooks.map((ebook) => (
                  <TableRow key={ebook.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ebook.product_title}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {ebook.shopify_product_id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="uppercase text-xs bg-secondary px-2 py-1 rounded">
                          {ebook.file_type || "pdf"}
                        </span>
                        {ebook.file_name && (
                          <span className="text-sm text-muted-foreground">{ebook.file_name}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {ebook.download_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={ebook.is_active}
                        onCheckedChange={() => toggleActive(ebook)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(ebook.ebook_url, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(ebook)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("¿Eliminar este ebook?")) {
                              deleteMutation.mutate(ebook.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay ebooks configurados</p>
              <p className="text-sm">Añade un ebook para empezar</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <ol className="list-decimal pl-4 space-y-2">
            <li>Crea el producto ebook en Shopify con el tipo de producto "Ebook"</li>
            <li>Copia el ID del producto de Shopify (formato: gid://shopify/Product/XXXXX)</li>
            <li>Sube el archivo PDF/EPUB a Google Drive, Dropbox u otro servicio</li>
            <li>Obtén el enlace de descarga directa del archivo</li>
            <li>Añade el ebook aquí con el ID del producto y la URL del archivo</li>
            <li>Cuando un cliente compre el ebook, recibirá un email con el enlace de descarga</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}