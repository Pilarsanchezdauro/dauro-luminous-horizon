import { useState, useRef, useEffect } from "react";
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
import { Plus, Trash2, Download, Edit, ExternalLink, BookOpen, Upload, Loader2, FileText, Check, Copy, Link, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getProducts } from "@/lib/shopify";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Shopify product search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const [showProductSearch, setShowProductSearch] = useState(false);

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
    setUploadedFileName(null);
    setUploadProgress(0);
    setSearchQuery("");
    setShopifyProducts([]);
    setShowProductSearch(false);
  };

  // Search Shopify products
  const searchShopifyProducts = async (query: string) => {
    if (!query || query.length < 2) {
      setShopifyProducts([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const { products } = await getProducts(20, undefined, `title:*${query}*`);
      setShopifyProducts(products);
    } catch (error) {
      console.error("Error searching products:", error);
      toast.error("Error al buscar productos en Shopify");
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showProductSearch && searchQuery) {
        searchShopifyProducts(searchQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, showProductSearch]);

  const selectShopifyProduct = (product: any) => {
    setFormData({
      ...formData,
      shopify_product_id: product.node.id,
      product_title: product.node.title,
    });
    setShowProductSearch(false);
    setSearchQuery("");
    setShopifyProducts([]);
    toast.success("Producto seleccionado: " + product.node.title);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'];
    const allowedExtensions = ['pdf', 'epub', 'mobi'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast.error("Tipo de archivo no permitido. Solo PDF, EPUB o MOBI.");
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("El archivo es demasiado grande. Máximo 50MB.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${timestamp}-${sanitizedName}`;

      setUploadProgress(30);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('ebooks')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      setUploadProgress(80);

      // Get signed URL (valid for 10 years)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('ebooks')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 10); // 10 years

      if (signedUrlError) throw signedUrlError;

      setUploadProgress(100);

      // Update form with file info
      setFormData({
        ...formData,
        ebook_url: signedUrlData.signedUrl,
        file_name: file.name,
        file_type: fileExtension,
      });
      
      setUploadedFileName(file.name);
      toast.success("Archivo subido correctamente");
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error("Error al subir archivo: " + error.message);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
    setUploadedFileName(ebook.file_name);
    setIsDialogOpen(true);
  };

  const toggleActive = (ebook: ProductEbook) => {
    updateMutation.mutate({
      id: ebook.id,
      data: { is_active: !ebook.is_active },
    });
  };

  const copyDownloadLink = async (ebook: ProductEbook) => {
    try {
      // Check if there's an existing purchase token for this product
      const { data: existingPurchase, error: fetchError } = await supabase
        .from("ebook_purchases")
        .select("download_token, expires_at, download_count, max_downloads")
        .eq("shopify_product_id", ebook.shopify_product_id)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;

      let token: string;

      if (existingPurchase && existingPurchase.download_count < existingPurchase.max_downloads) {
        // Use existing valid token
        token = existingPurchase.download_token;
      } else {
        // Create a new test purchase token
        const { data: newPurchase, error: insertError } = await supabase
          .from("ebook_purchases")
          .insert({
            email: "admin@dauro.es",
            shopify_order_id: `admin-test-${Date.now()}`,
            shopify_product_id: ebook.shopify_product_id,
            max_downloads: 10,
          })
          .select("download_token")
          .single();

        if (insertError) throw insertError;
        token = newPurchase.download_token;
      }

      // Generate the download URL
      const baseUrl = window.location.origin;
      const downloadUrl = `${baseUrl}/descargar-ebook?token=${token}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(downloadUrl);
      toast.success("Enlace copiado al portapapeles", {
        description: "El enlace de descarga de prueba está listo para compartir"
      });
    } catch (error: any) {
      console.error("Error generating download link:", error);
      toast.error("Error al generar enlace: " + error.message);
    }
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
              {/* Shopify Product Search */}
              <div className="space-y-2">
                <Label>Buscar Producto en Shopify *</Label>
                {formData.shopify_product_id ? (
                  <div className="border rounded-lg p-3 bg-green-500/10 border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium text-sm">{formData.product_title}</p>
                          <p className="text-xs text-muted-foreground">{formData.shopify_product_id}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData({ ...formData, shopify_product_id: "", product_title: "" });
                          setShowProductSearch(true);
                        }}
                      >
                        Cambiar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por título del producto..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowProductSearch(true);
                        }}
                        onFocus={() => setShowProductSearch(true)}
                        className="pl-9"
                      />
                      {isSearching && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
                      )}
                    </div>
                    
                    {showProductSearch && shopifyProducts.length > 0 && (
                      <ScrollArea className="h-48 border rounded-lg">
                        <div className="p-2 space-y-1">
                          {shopifyProducts.map((product) => (
                            <button
                              key={product.node.id}
                              type="button"
                              onClick={() => selectShopifyProduct(product)}
                              className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted text-left transition-colors"
                            >
                              {product.node.images?.edges?.[0]?.node?.url && (
                                <img 
                                  src={product.node.images.edges[0].node.url} 
                                  alt={product.node.title}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{product.node.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {parseFloat(product.node.priceRange?.minVariantPrice?.amount || 0).toFixed(2)} €
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                    
                    {showProductSearch && searchQuery.length >= 2 && !isSearching && shopifyProducts.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        No se encontraron productos
                      </p>
                    )}
                    
                    {showProductSearch && searchQuery.length < 2 && (
                      <p className="text-xs text-muted-foreground">
                        Escribe al menos 2 caracteres para buscar
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* File Upload Section */}
              <div className="space-y-3">
                <Label>Archivo del Ebook *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.epub,.mobi"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="ebook-file-upload"
                    disabled={isUploading}
                  />
                  
                  {isUploading ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Subiendo archivo...</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  ) : uploadedFileName ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{uploadedFileName}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Cambiar
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="ebook-file-upload"
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer py-4"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="font-medium">Haz clic para subir</p>
                        <p className="text-xs text-muted-foreground">
                          PDF, EPUB o MOBI (máx. 50MB)
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Manual URL (alternative) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">o introduce una URL externa</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <Input
                  id="ebook_url"
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formData.ebook_url}
                  onChange={(e) => {
                    setFormData({ ...formData, ebook_url: e.target.value });
                    if (e.target.value && !uploadedFileName) {
                      setUploadedFileName(null);
                    }
                  }}
                />
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
              
              {/* Botón de copiar enlace de descarga - solo visible al editar */}
              {editingEbook && (
                <div className="border rounded-lg p-4 bg-muted/30 space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Enlace de Descarga
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Genera un enlace de descarga de prueba para compartir con el cliente o verificar el funcionamiento.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => copyDownloadLink(editingEbook)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Enlace de Descarga
                  </Button>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || isUploading}>
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
                          onClick={() => copyDownloadLink(ebook)}
                          title="Copiar enlace de descarga"
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(ebook.ebook_url, "_blank")}
                          title="Ver archivo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(ebook)}
                          title="Editar"
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
                          title="Eliminar"
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
            <li><strong>Sube el archivo directamente</strong> usando el botón de subida o usa una URL externa</li>
            <li>Añade el ebook con el ID del producto y el título</li>
            <li>Cuando un cliente compre el ebook, recibirá un email con el enlace de descarga</li>
          </ol>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">💡 Consejo</p>
            <p className="text-sm text-muted-foreground">
              Los archivos subidos directamente se almacenan de forma segura y generan URLs firmadas 
              válidas por 10 años. Esto es más seguro que usar enlaces externos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
