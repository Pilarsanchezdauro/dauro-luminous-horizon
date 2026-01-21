import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts } from "@/lib/shopify";
import { 
  extractAuthorFromTitle, 
  extractTitleWithoutAuthor, 
  authorsMatch 
} from "@/lib/author-utils";
import { User } from "lucide-react";

interface AuthorWorksProps {
  currentProductHandle: string;
  productTitle: string;
}

export function AuthorWorks({ currentProductHandle, productTitle }: AuthorWorksProps) {
  const [otherWorks, setOtherWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthorWorks() {
      const author = extractAuthorFromTitle(productTitle);
      setAuthorName(author);
      
      if (!author) {
        setLoading(false);
        return;
      }

      try {
        // Obtener productos buscando por el nombre del autor
        const response = await getProducts(50, undefined, author);
        const edges = response?.products ?? [];

        if (Array.isArray(edges) && edges.length > 0) {
          // Filtrar productos del mismo autor, excluyendo el actual
          const authorProducts = edges.filter((edge: any) => {
            const product = edge.node;

            // Excluir el producto actual
            if (product.handle === currentProductHandle) {
              return false;
            }

            // Verificar que el título contenga el nombre del autor
            const productAuthor = extractAuthorFromTitle(product.title);
            if (!productAuthor) return false;

            // Comparar autores usando la función mejorada
            return authorsMatch(productAuthor, author);
          });

          setOtherWorks(authorProducts.slice(0, 4)); // Máximo 4 obras
        }
      } catch (error) {
        console.error("Error fetching author works:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthorWorks();
  }, [currentProductHandle, productTitle]);

  // No mostrar si no hay autor o no hay otras obras
  if (!authorName || otherWorks.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-serif font-bold text-foreground">
          Otras obras de {authorName}
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {otherWorks.map((edge: any) => {
          const product = edge.node;
          const image = product.images?.edges?.[0]?.node;
          const price = product.priceRange?.minVariantPrice;
          
          // Extraer solo el título sin el autor
          const cleanTitle = extractTitleWithoutAuthor(product.title);
          
          return (
            <Link
              key={product.handle}
              to={`/producto/${product.handle}`}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                <div className="aspect-[2/3] relative overflow-hidden bg-muted">
                  {image?.url ? (
                    <img
                      src={image.url}
                      alt={image.altText || cleanTitle}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Sin imagen
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                    {cleanTitle}
                  </h3>
                  {price && (
                    <p className="text-sm font-semibold text-primary">
                      {parseFloat(price.amount).toFixed(2)} €
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
