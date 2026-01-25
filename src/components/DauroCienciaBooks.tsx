import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ArrowRight, GraduationCap, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_DOMAIN = "dauro-luminous-horizon-6vj19.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "8765bcd785f87943aa829ab10985ffde";

// Academic book handles to display
const ACADEMIC_BOOK_HANDLES = [
  "filosofia-de-la-ulterioridad-carlos-blanco",
  "la-construccion-discursiva-del-liderazgo-antonio-rodriguez-jimenez",
  "la-singularidad-esencial-carlos-blanco",
  "pensamiento-y-vida-carlos-blanco",
  "leonardo-da-vinci-o-la-tragedia-de-la-perfeccion-carlos-blanco",
  "logos-y-sofos-dialogo-sobre-la-ciencia-y-el-arte-carlos-blanco",
  "filosofia-teologia-y-el-sentido-de-la-historia-carlos-blanco",
  "el-nacimiento-de-la-civilizacion-egipcia-carlos-blanco",
  "libro-de-las-recreaciones-carlos-alberto-blanco",
  "la-espana-quebrantada-manuel-garcia-fernandez",
];

// Keywords to match academic books
const ACADEMIC_KEYWORDS = [
  "liderazgo",
  "construcción discursiva",
];

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Error de conexión con la tienda");
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    console.error("Shopify errors:", data.errors);
    return null;
  }

  return data;
}

const PRODUCTS_QUERY = `
  query GetAcademicBooks($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

function useAcademicBooks() {
  return useQuery({
    queryKey: ["dauro-ciencia-books"],
    queryFn: async () => {
      // Search for Carlos Blanco's books and specific academic titles
      const data = await storefrontApiRequest(PRODUCTS_QUERY, {
        first: 50,
        query: "Carlos Blanco OR Antonio Rodriguez OR La singularidad OR Pensamiento OR Leonardo da Vinci OR Filosofía OR liderazgo",
      });

      if (!data?.data?.products?.edges) return [];

      const products = data.data.products.edges.map(
        (edge: { node: ShopifyProduct }) => edge.node
      );

      // Filter to only include academic books (by handle or specific titles)
      const academicBooks = products.filter((product: ShopifyProduct) => {
        const isAcademicHandle = ACADEMIC_BOOK_HANDLES.some((h) =>
          product.handle.toLowerCase().includes(h.split("-")[0])
        );
        const isCarlosBlanco = product.title.toLowerCase().includes("carlos blanco");
        const isAntonioRodriguez = 
          product.title.toLowerCase().includes("antonio rodríguez") || 
          product.title.toLowerCase().includes("liderazgo");
        const isAcademicTitle = 
          product.title.toLowerCase().includes("filosofía") ||
          product.title.toLowerCase().includes("singularidad") ||
          product.title.toLowerCase().includes("pensamiento y vida") ||
          product.title.toLowerCase().includes("leonardo da vinci") ||
          product.title.toLowerCase().includes("civilización egipcia");
        
        // Exclude ebooks (we want physical books)
        const isEbook = product.title.toLowerCase().includes("ebook");
        
        return (isCarlosBlanco || isAntonioRodriguez || isAcademicTitle || isAcademicHandle) && !isEbook;
      });

      // Remove duplicates by title (keep the one with better data)
      const uniqueBooks = academicBooks.reduce((acc: ShopifyProduct[], book: ShopifyProduct) => {
        const normalizedTitle = book.title.toLowerCase().replace(/\s+/g, " ").trim();
        const existingIndex = acc.findIndex(
          (b) => b.title.toLowerCase().replace(/\s+/g, " ").trim() === normalizedTitle
        );
        if (existingIndex === -1) {
          acc.push(book);
        } else if (book.images.edges.length > 0 && acc[existingIndex].images.edges.length === 0) {
          acc[existingIndex] = book;
        }
        return acc;
      }, []);

      return uniqueBooks.slice(0, 8);
    },
    staleTime: 1000 * 60 * 10,
  });
}

function BookCard({ product }: { product: ShopifyProduct }) {
  const imageUrl = product.images.edges[0]?.node.url || "/placeholder.svg";
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  // Extract author from title if present
  const titleParts = product.title.split(" – ");
  const title = titleParts[0].trim();
  const author = titleParts[1]?.trim() || "";

  return (
    <Link to={`/producto/${product.handle}`} className="group">
      <Card className="h-full overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-card">
        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.images.edges[0]?.node.altText || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground">
              <GraduationCap className="w-3 h-3 mr-1" />
              Académico
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {author && (
            <p className="text-sm text-muted-foreground mb-3">{author}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {price.toFixed(2).replace(".", ",")}€
            </span>
            <Button size="sm" variant="outline" className="gap-1">
              <ShoppingCart className="w-4 h-4" />
              Ver
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BookSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DauroCienciaBooks() {
  const { data: books, isLoading, error } = useAcademicBooks();

  if (error) {
    console.error("Error loading academic books:", error);
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Catálogo Académico
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Obras académicas destacadas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Publicaciones de autores reconocidos en filosofía, ciencias sociales e investigación.
              Cada obra cuenta con el sello de calidad Dauro Ciencia.
            </p>
          </div>

          {/* Books Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <BookSkeleton key={i} />
              ))}
            </div>
          ) : books && books.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {books.map((book) => (
                <BookCard key={book.id} product={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron libros académicos en este momento.</p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link to="/tienda?categoria=dauro-ciencia">
              <Button size="lg" className="gap-2">
                Ver todo el catálogo académico
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
