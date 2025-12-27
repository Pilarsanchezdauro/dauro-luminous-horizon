import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Filter } from "lucide-react";
import { Link } from "react-router-dom";

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
}

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [familiaFilter, setFamiliaFilter] = useState<string>("all");

  const { data: products, isLoading } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_products")
        .select("*")
        .eq("activo", true)
        .order("titulo");
      
      if (error) throw error;
      return data as CatalogProduct[];
    },
  });

  const { data: familias } = useQuery({
    queryKey: ["catalog-familias"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_products")
        .select("familia")
        .eq("activo", true)
        .not("familia", "is", null);
      
      if (error) throw error;
      const uniqueFamilias = [...new Set(data?.map(p => p.familia).filter(Boolean))];
      return uniqueFamilias.sort();
    },
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFamilia = familiaFilter === "all" || product.familia === familiaFilter;
    
    return matchesSearch && matchesFamilia;
  }).sort((a, b) => {
    // Products with images first, then by title
    const aHasImage = a.imagen_url ? 0 : 1;
    const bHasImage = b.imagen_url ? 0 : 1;
    if (aHasImage !== bHasImage) return aHasImage - bHasImage;
    return a.titulo.localeCompare(b.titulo);
  });

  const cleanFamiliaName = (familia: string) => {
    return familia.replace(/^\[\d+\]\s*/, "");
  };

  const getExcerpt = (descripcion: string | null, maxLength: number = 150) => {
    if (!descripcion) return "";
    const cleanText = descripcion
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/SINOPSIS|EL AUTOR|LA AUTORA|LA OBRA|ACCEDE A LA LECTURA.*/gi, "")
      .trim();
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + "...";
  };

  return (
    <>
      <SEO 
        title="Catálogo de Libros | Ediciones Dauro"
        description="Explora nuestro catálogo completo de libros. Narrativa, poesía, ensayo y más géneros literarios."
      />
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Catálogo de Libros
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explora nuestra colección de obras literarias
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, ISBN o contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={familiaFilter} onValueChange={setFamiliaFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los géneros</SelectItem>
                {familias?.map((familia) => (
                  <SelectItem key={familia} value={familia || ""}>
                    {cleanFamiliaName(familia || "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6 text-center">
            {filteredProducts?.length || 0} libros encontrados
          </p>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/catalogo/${product.codigo || product.id}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                      {product.imagen_url ? (
                        <img
                          src={product.imagen_url}
                          alt={product.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <BookOpen className="h-16 w-16 text-primary/30" />
                      )}
                      {product.segunda_mano && (
                        <Badge className="absolute top-2 right-2 bg-amber-500">
                          Segunda mano
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.titulo}
                      </h3>
                      {product.familia && (
                        <Badge variant="outline" className="text-xs mb-2">
                          {cleanFamiliaName(product.familia)}
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {getExcerpt(product.descripcion, 80)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {product.pvp ? `${product.pvp.toFixed(2)} €` : "Consultar"}
                        </span>
                        {product.isbn && (
                          <span className="text-xs text-muted-foreground">
                            ISBN: {product.isbn.slice(-4)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron libros</h3>
              <p className="text-muted-foreground">
                Prueba con otros términos de búsqueda o filtros
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Catalogo;
