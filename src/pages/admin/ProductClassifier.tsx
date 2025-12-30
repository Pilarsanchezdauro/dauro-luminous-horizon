import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, Save, Check, X, Filter } from "lucide-react";
import { toast } from "sonner";
import { getAllProducts } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";

interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    productType: string;
    images: {
      edges: Array<{
        node: {
          url: string;
        };
      }>;
    };
  };
}

const NONE_CATEGORY = "__none__";

const CATEGORIES = [
  { id: NONE_CATEGORY, label: "Sin categoría" },
  { id: "Narrativa", label: "Narrativa" },
  { id: "Novela Histórica", label: "Novela Histórica" },
  { id: "Relato", label: "Relato" },
  { id: "Cultura y Sociedad", label: "Cultura y Sociedad" },
  { id: "Poesía", label: "Poesía" },
  { id: "Granada", label: "Granada" },
  { id: "Ensayo", label: "Ensayo" },
  { id: "Teatro", label: "Teatro" },
  { id: "Infantil y Juvenil", label: "Infantil y Juvenil" },
  { id: "Memorias", label: "Memorias" },
  { id: "Desarrollo Personal", label: "Desarrollo Personal" },
  { id: "Miscelánea", label: "Miscelánea" },
  { id: "Crónica", label: "Crónica" },
  { id: "Música", label: "Música" },
];

export default function ProductClassifier() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [savingProducts, setSavingProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Error al cargar productos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (productHandle: string, newCategory: string) => {
    // Convert placeholder back to empty string for actual storage
    const actualCategory = newCategory === NONE_CATEGORY ? "" : newCategory;
    setPendingChanges(prev => ({
      ...prev,
      [productHandle]: actualCategory
    }));
  };

  const saveProduct = async (product: ShopifyProduct) => {
    const newCategory = pendingChanges[product.node.handle];
    if (newCategory === undefined) return;

    const productId = product.node.id.replace('gid://shopify/Product/', '');
    
    setSavingProducts(prev => new Set(prev).add(product.node.handle));
    
    try {
      const { data, error } = await supabase.functions.invoke("update-shopify-genres", {
        body: {
          products: [
            {
              handle: product.node.handle,
              title: product.node.title,
              genre: newCategory,
            },
          ],
          dryRun: false,
        },
      });

      if (error) throw error;

      const result = data?.results?.[0];
      if (!result?.success) {
        throw new Error(result?.error || "Actualización fallida");
      }

      // Update local state
      setProducts((prev) =>
        prev.map((p) =>
          p.node.handle === product.node.handle
            ? { ...p, node: { ...p.node, productType: newCategory } }
            : p
        )
      );

      // Remove from pending changes
      setPendingChanges((prev) => {
        const next = { ...prev };
        delete next[product.node.handle];
        return next;
      });

      toast.success(`"${product.node.title}" actualizado a ${newCategory || "Sin categoría"}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      console.error("Error saving product:", error);
      toast.error("No se pudo guardar", { description: message });
    } finally {
      setSavingProducts(prev => {
        const next = new Set(prev);
        next.delete(product.node.handle);
        return next;
      });
    }
  };

  const cancelChange = (productHandle: string) => {
    setPendingChanges(prev => {
      const next = { ...prev };
      delete next[productHandle];
      return next;
    });
  };

  const saveAllPending = async () => {
    const handles = Object.keys(pendingChanges);
    if (handles.length === 0) return;

    const productsPayload = handles
      .map(handle => {
        const product = products.find(p => p.node.handle === handle);
        return {
          handle,
          title: product?.node.title || '',
          genre: pendingChanges[handle]
        };
      })
      // Avoid sending undefined genres
      .filter(p => p.genre !== undefined);

    setSavingProducts(new Set(handles));

    try {
      const { data, error } = await supabase.functions.invoke('update-shopify-genres', {
        body: { products: productsPayload, dryRun: false }
      });

      if (error) throw error;

      const results = (data?.results ?? []) as Array<{
        success: boolean;
        handle: string;
        error?: string;
      }>;

      const succeededHandles = new Set(results.filter((r) => r.success).map((r) => r.handle));
      const failed = results.filter((r) => !r.success);

      // Update local state only for succeeded
      setProducts((prev) =>
        prev.map((p) => {
          if (succeededHandles.has(p.node.handle)) {
            return { ...p, node: { ...p.node, productType: pendingChanges[p.node.handle] } };
          }
          return p;
        })
      );

      // Keep pending changes that failed (so user can retry)
      setPendingChanges((prev) => {
        const next: Record<string, string> = {};
        for (const handle of Object.keys(prev)) {
          if (!succeededHandles.has(handle)) next[handle] = prev[handle];
        }
        return next;
      });

      if (failed.length > 0) {
        const firstMsg = failed[0]?.error || "Error desconocido";
        toast.error("Algunos productos no se pudieron actualizar", {
          description: `Errores: ${failed.length}. Ej: ${firstMsg}`,
        });
      } else {
        toast.success(`${handles.length} productos actualizados`);
      }
    } catch (error) {
      console.error("Error saving products:", error);
      toast.error("Error al guardar productos");
    } finally {
      setSavingProducts(new Set());
    }
  };

  // Helpers (comparación sin acentos / sin mayúsculas)
  const normalizeKey = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const getCategoryKey = (raw: string | null | undefined) => {
    const v = (raw ?? "").trim();
    return v ? normalizeKey(v) : "sin-categoria";
  };

  const filterableCategories = CATEGORIES.filter((c) => c.id !== NONE_CATEGORY);

  // Filter products - excluir "Libro antiguo" de la vista principal (salvo que se filtre explícitamente por esa categoría)
  const LIBRO_ANTIGUO_KEY = normalizeKey("Libro antiguo");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.node.handle.toLowerCase().includes(searchQuery.toLowerCase());

    const currentCategory = pendingChanges[product.node.handle] ?? product.node.productType ?? "";
    const currentKey = getCategoryKey(currentCategory);

    // Ocultar "Libro antiguo" en vista "all" pero mostrar si se filtra explícitamente
    const isLibroAntiguo = currentKey === LIBRO_ANTIGUO_KEY;
    const hideLibroAntiguo = filterCategory === "all" && isLibroAntiguo;

    const matchesFilter = filterCategory === "all" ? true : currentKey === filterCategory;

    return matchesSearch && matchesFilter && !hideLibroAntiguo;
  });

  // Count by category (normalized)
  const categoryCounts = products.reduce((acc, product) => {
    const category = pendingChanges[product.node.handle] ?? product.node.productType ?? "";
    const key = getCategoryKey(category);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pendingCount = Object.keys(pendingChanges).length;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Clasificador de Productos</h1>
                <p className="text-muted-foreground">
                  Asigna categorías a los productos de Shopify de forma rápida
                </p>
              </div>
              {pendingCount > 0 && (
                <Button onClick={saveAllPending} disabled={savingProducts.size > 0}>
                  {savingProducts.size > 0 ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Guardar {pendingCount} cambio{pendingCount !== 1 ? 's' : ''}
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              <Card
                className={`cursor-pointer transition-colors ${filterCategory === "all" ? "border-primary" : ""}`}
                onClick={() => setFilterCategory("all")}
              >
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-colors ${filterCategory === "sin-categoria" ? "border-primary" : ""}`}
                onClick={() => setFilterCategory("sin-categoria")}
              >
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-orange-500">{categoryCounts["sin-categoria"] || 0}</p>
                  <p className="text-xs text-muted-foreground">Sin categoría</p>
                </CardContent>
              </Card>
              {filterableCategories
                .filter((cat) => (categoryCounts[normalizeKey(cat.id)] || 0) > 0)
                .slice(0, 4)
                .map((cat) => {
                  const key = normalizeKey(cat.id);
                  return (
                    <Card
                      key={cat.id}
                      className={`cursor-pointer transition-colors ${filterCategory === key ? "border-primary" : ""}`}
                      onClick={() => setFilterCategory(key)}
                    >
                      <CardContent className="p-3 text-center">
                        <p className="text-2xl font-bold">{categoryCounts[key] || 0}</p>
                        <p className="text-xs text-muted-foreground truncate">{cat.label}</p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="sin-categoria">Sin categoría</SelectItem>
                  {filterableCategories.map((cat) => {
                    const key = normalizeKey(cat.id);
                    return (
                      <SelectItem key={cat.id} value={key}>
                        {cat.label} ({categoryCounts[key] || 0})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Products table */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Imagen</TableHead>
                          <TableHead>Título</TableHead>
                          <TableHead className="w-48">Categoría actual</TableHead>
                          <TableHead className="w-56">Nueva categoría</TableHead>
                          <TableHead className="w-24">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => {
                          const currentCategory = product.node.productType || "";
                          const pendingCategory = pendingChanges[product.node.handle];
                          const hasChanges = pendingCategory !== undefined;
                          const isSaving = savingProducts.has(product.node.handle);

                          return (
                            <TableRow key={product.node.id} className={hasChanges ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                              <TableCell>
                                {product.node.images.edges[0]?.node?.url ? (
                                  <img
                                    src={product.node.images.edges[0].node.url}
                                    alt={product.node.title}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                                    Sin img
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <p className="font-medium line-clamp-2">{product.node.title}</p>
                                <p className="text-xs text-muted-foreground">{product.node.handle}</p>
                              </TableCell>
                              <TableCell>
                                {currentCategory ? (
                                  <Badge variant="secondary">{currentCategory}</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                                    Sin categoría
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={(pendingCategory ?? currentCategory) || NONE_CATEGORY}
                                  onValueChange={(value) => handleCategoryChange(product.node.handle, value)}
                                >
                                  <SelectTrigger className={hasChanges ? "border-yellow-500" : ""}>
                                    <SelectValue placeholder="Seleccionar categoría" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {CATEGORIES.map(cat => (
                                      <SelectItem key={cat.id} value={cat.id}>
                                        {cat.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                {hasChanges && (
                                  <div className="flex gap-1">
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={() => saveProduct(product)}
                                      disabled={isSaving}
                                    >
                                      {isSaving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Check className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => cancelChange(product.node.handle)}
                                      disabled={isSaving}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}