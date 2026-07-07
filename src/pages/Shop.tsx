import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Loader2, Book, Palette, Image, Award, Gem, Film, ExternalLink, Trophy, FileCheck, Search, ArrowUpDown, Library, Tag, Tablet, BookMarked, Music, Calculator, GraduationCap, User } from "lucide-react";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { getAllProducts, getCollections, getAllCollectionProducts } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { getSynopsisOnly } from "@/lib/description-parser";
import heroCultureBg from "@/assets/hero-culture-bg.png";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { extractUniqueAuthors, filterProductsByAuthor, extractAuthorFromTitle } from "@/lib/author-utils";

interface ShopifyCollection {
  node: {
    id: string;
    title: string;
    handle: string;
  };
}

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("libros");
  const [bookCategory, setBookCategory] = useState<string>("todos");
  const [selectedGenre, setSelectedGenre] = useState<string>("todos");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("todos");
  const [booksScope, setBooksScope] = useState<"todas" | "antiguos">("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("novedades");
  const [ebookProductIds, setEbookProductIds] = useState<Set<string>>(new Set());
  const [ebookProducts, setEbookProducts] = useState<ShopifyProduct[]>([]);
  const [visibleBooksCount, setVisibleBooksCount] = useState(20);
  const addItem = useCartStore(state => state.addItem);

  // Filter products by type
  // Segunda Mano: products with "segunda mano" or "descatalogado" tag
  const segundaManoProducts = products.filter(p => {
    const tags = p.node.tags || [];
    const tagsLower = tags.map((t: string) => t.toLowerCase());
    return tagsLower.includes('segunda mano') || tagsLower.includes('descatalogado') || tagsLower.includes('segunda-mano');
  });
  
  // Música: products with "música" tag or productType "Música"
  const musicProducts = products.filter(p => {
    const tags = p.node.tags || [];
    const tagsLower = tags.map((t: string) => t.toLowerCase());
    const productTypeLower = (p.node.productType || '').toLowerCase();
    return tagsLower.includes('música') || tagsLower.includes('musica') || tagsLower.includes('disco') || productTypeLower === 'música' || productTypeLower === 'musica';
  });
  const musicIds = new Set(musicProducts.map(p => p.node.id));

  // Regular books exclude segunda mano and music products
  const segundaManoIds = new Set(segundaManoProducts.map(p => p.node.id));

  const isLibroAntiguo = (p: ShopifyProduct) => {
    const productType = (p.node.productType || "").toLowerCase().trim();
    const tags = (p.node.tags || []).map((t: string) => t.toLowerCase().trim());

    const ANTIQUO_TAGS = new Set([
      "libro antiguo",
      "libros antiguos",
      "libro-antiguo",
      "libros-antiguos",
      "antiguo",
      "antiguos",
    ]);

    return (
      productType.includes("libro antiguo") ||
      productType.includes("libros antiguos") ||
      productType.includes("antiguo") ||
      tags.some((t) => ANTIQUO_TAGS.has(t))
    );
  };

  // bookProductsBase: exclude segunda mano and music
  const bookProductsBase = products.filter(
    p => !segundaManoIds.has(p.node.id) && !musicIds.has(p.node.id)
  );

  // bookProducts: for "Todas las obras", exclude libros antiguos
  // Libros antiguos only visible in their dedicated section
  const bookProducts = bookProductsBase.filter(p => !isLibroAntiguo(p));
  
  // Libros antiguos (separate collection)
  const librosAntiguos = bookProductsBase.filter(isLibroAntiguo);
  const artProducts: ShopifyProduct[] = [];
  const nftProducts: ShopifyProduct[] = [];

  // Dauro Ciencia: products with "dauro-ciencia" tag or from specific academic authors
  const DAURO_CIENCIA_AUTHORS = [
    'carlos blanco',
    'antonio rodríguez',
    'antonio rodriguez',
    'antonio rodríguez jiménez',
    'antonio rodriguez jimenez',
  ];
  const dauroCienciaProducts = products.filter(p => {
    const tags = p.node.tags || [];
    const tagsLower = tags.map((t: string) => t.toLowerCase());
    const title = p.node.title.toLowerCase();
    const description = (p.node.description || '').toLowerCase();
    
    // Check for dauro-ciencia tag
    if (tagsLower.includes('dauro-ciencia') || tagsLower.includes('dauro ciencia') || tagsLower.includes('ciencia')) {
      return true;
    }
    
    // Check for specific authors or titles
    const isCarlosBlanco = title.includes('carlos blanco') || description.includes('carlos blanco') ||
      title.includes('leonardo da vinci') || title.includes('pensamiento y vida') || title.includes('singularidad esencial');
    const isAntonioRodriguez = title.includes('propuestas pedagógicas') || title.includes('propuestas pedagogicas') ||
      title.includes('modelos educativos') || description.includes('antonio rodríguez') || description.includes('antonio rodriguez');
    
    return isCarlosBlanco || isAntonioRodriguez;
  });
  const dauroCienciaIds = new Set(dauroCienciaProducts.map(p => p.node.id));

  // Normalize genre names (merge similar ones like "Libro" and "Libros")
  const normalizeGenre = (genre: string): string => {
    const lower = genre.toLowerCase().trim();
    // Normalize "libro" and "libros" to "Libro"
    if (lower === 'libro' || lower === 'libros') return 'Libro';
    // Normalize ebook variations
    if (lower === 'ebook' || lower === 'ebooks' || lower === 'e-book' || lower === 'e-books') return 'Ebook';
    return genre;
  };

  // Extract unique genres (productType) from products, normalized
  const availableGenres = Array.from(
    new Set(
      bookProducts
        .map(p => p.node.productType ? normalizeGenre(p.node.productType) : null)
        .filter((type): type is string => !!type && type.trim() !== '')
    )
  ).sort((a, b) => a.localeCompare(b));

  // All book categories
  const bookCategories = [
    { id: "todos", label: "Todos" },
    { id: "narrativa", label: "Narrativa" },
    { id: "novela histórica", label: "Novela Histórica" },
    { id: "relato", label: "Relato" },
    { id: "cultura y sociedad", label: "Cultura y Sociedad" },
    { id: "poesía", label: "Poesía" },
    { id: "granada", label: "Granada" },
    { id: "ensayo", label: "Ensayo" },
    { id: "teatro", label: "Teatro" },
    { id: "infantil y juvenil", label: "Infantil y Juvenil" },
    { id: "memorias", label: "Memorias" },
    { id: "desarrollo personal", label: "Desarrollo Personal" },
    { id: "miscelánea", label: "Miscelánea" },
    { id: "crónica", label: "Crónica" },
    { id: "dauro-ciencia", label: "Dauro Ciencia" },
  ];

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleBooksCount(20);
  }, [searchQuery, selectedGenre, bookCategory, selectedCollection, sortBy, booksScope, selectedAuthor]);

  // Extract unique authors from all book products for the filter
  const availableAuthors = extractUniqueAuthors(bookProducts);

  // Filter books by search query first
  const searchFilteredBooks = searchQuery.trim() 
    ? bookProducts.filter(p => {
        const query = searchQuery.toLowerCase();
        const title = p.node.title?.toLowerCase() || '';
        const description = p.node.description?.toLowerCase() || '';
        return title.includes(query) || description.includes(query);
      })
    : bookProducts;

  // Filter by genre (productType) - using normalized comparison
  const genreFilteredBooks = selectedGenre === "todos"
    ? searchFilteredBooks
    : searchFilteredBooks.filter(p => 
        p.node.productType && normalizeGenre(p.node.productType) === selectedGenre
      );

  // Helper to check if product belongs to Dauro Ciencia
  const isDauroCiencia = (p: ShopifyProduct) => {
    const tags = p.node.tags || [];
    const tagsLower = tags.map((t: string) => t.toLowerCase());
    const title = p.node.title.toLowerCase();
    const description = (p.node.description || '').toLowerCase();
    
    // Check for dauro-ciencia tag first
    if (tagsLower.includes('dauro-ciencia') || tagsLower.includes('dauro ciencia')) {
      return true;
    }
    
    // ALL Carlos Blanco works (academic author)
    const isCarlosBlanco = title.includes('carlos blanco') || 
      description.includes('carlos blanco') ||
      title.includes('leonardo da vinci') || 
      title.includes('pensamiento y vida') || 
      title.includes('singularidad esencial');
    
    // Only specific Antonio Rodríguez academic works (not poetry like "La escala del tiempo")
    const isAntonioRodriguezAcademic = title.includes('propuestas pedagógicas') || 
      title.includes('propuestas pedagogicas') ||
      title.includes('modelos educativos comparados');
    
    return isCarlosBlanco || isAntonioRodriguezAcademic;
  };

  // Then filter by selected category using productType or special categories
  const categoryFilteredBooks = bookCategory === "todos" 
    ? genreFilteredBooks 
    : bookCategory === "dauro-ciencia"
      ? genreFilteredBooks.filter(p => isDauroCiencia(p))
      : genreFilteredBooks.filter(p => {
          const productType = (p.node.productType || '').toLowerCase().trim();
          return productType === bookCategory.toLowerCase();
        });

  // Libros premiados específicos (por título)
  const LIBROS_PREMIADOS = [
    'yo soy todos los besos que nunca pude darte',
    'horizonte interior',
    'boabdil el príncipe del día y de la noche',
    'boabdil el principe del dia y de la noche',
    'boabdil, el príncipe del día y de la noche',
    'boabdil, el principe del dia y de la noche',
    'alguacil de la casa y corte',
  ];

  // Libros premiados que NO deben mostrar badge de "Novedad" aunque tengan el tag
  const PREMIADOS_SIN_NOVEDAD = [
    'alguacil de la casa y corte',
  ];

  // Helper to check if product is "premiado" (awarded book)
  const isPremiado = (product: ShopifyProduct) => {
    const titleLower = product.node.title.toLowerCase().trim();
    return LIBROS_PREMIADOS.some(titulo => titleLower.includes(titulo) || titulo.includes(titleLower));
  };

  // Helper to check if product is a "novedad" (new arrival)
  // Excluye libros premiados que no deben mostrar novedad
  const isNovedad = (product: ShopifyProduct) => {
    const titleLower = product.node.title.toLowerCase().trim();
    const esPremiadoSinNovedad = PREMIADOS_SIN_NOVEDAD.some(titulo => titleLower.includes(titulo));
    if (esPremiadoSinNovedad) return false;
    
    const tags = product.node.tags || [];
    const tagsLower = tags.map((t: string) => t.toLowerCase());
    return tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
  };

  // Aplicar “Libros antiguos”: ocultar por defecto y mostrar solo en su vista
  const scopedBooks =
    booksScope === "antiguos"
      ? librosAntiguos
      : categoryFilteredBooks;

  // Filter by selected author
  const authorFilteredBooks = filterProductsByAuthor(scopedBooks, selectedAuthor);

  // Sort the filtered books - products without images go to the end
  const filteredBooks = [...authorFilteredBooks].sort((a, b) => {
    // First: products with images come before products without images
    const aHasImage = (a.node.images.edges.length > 0 && a.node.images.edges[0]?.node?.url) ? 0 : 1;
    const bHasImage = (b.node.images.edges.length > 0 && b.node.images.edges[0]?.node?.url) ? 0 : 1;
    if (aHasImage !== bHasImage) return aHasImage - bHasImage;
    
    // Then apply the selected sort order
    switch (sortBy) {
      case "novedades":
        // Premiados primero, luego novedades, luego por fecha
        const aIsPremiado = isPremiado(a) ? 0 : 1;
        const bIsPremiado = isPremiado(b) ? 0 : 1;
        if (aIsPremiado !== bIsPremiado) return aIsPremiado - bIsPremiado;
        
        const aIsNovedad = isNovedad(a) ? 0 : 1;
        const bIsNovedad = isNovedad(b) ? 0 : 1;
        if (aIsNovedad !== bIsNovedad) return aIsNovedad - bIsNovedad;
        // Within novedades, sort by creation date (most recent first)
        const dateA = new Date(a.node.createdAt || 0).getTime();
        const dateB = new Date(b.node.createdAt || 0).getTime();
        return dateB - dateA;
      case "titulo-asc":
        return a.node.title.localeCompare(b.node.title);
      case "titulo-desc":
        return b.node.title.localeCompare(a.node.title);
      case "precio-asc":
        return parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount);
      case "precio-desc":
        return parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount);
      case "reciente":
        return b.node.id.localeCompare(a.node.id);
      case "antiguo":
        return a.node.id.localeCompare(b.node.id);
      default:
        return 0;
    }
  });

  // Count books per genre (based on search-filtered books) - using normalized comparison
  const getGenreCount = (genre: string) => {
    if (genre === "todos") return searchFilteredBooks.length;
    return searchFilteredBooks.filter(p => 
      p.node.productType && normalizeGenre(p.node.productType) === genre
    ).length;
  };

  // Count books per category (based on productType or special categories)
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "todos") return genreFilteredBooks.length;
    if (categoryId === "dauro-ciencia") {
      return genreFilteredBooks.filter(p => isDauroCiencia(p)).length;
    }
    return genreFilteredBooks.filter(p => {
      const productType = (p.node.productType || '').toLowerCase().trim();
      return productType === categoryId.toLowerCase();
    }).length;
  };

  useEffect(() => {
    loadCollections();
    loadEbookProductIds();
  }, []);

  const loadEbookProductIds = async () => {
    try {
      const { data, error } = await supabase
        .from('product_ebooks')
        .select('shopify_product_id')
        .eq('is_active', true);
      
      if (error) throw error;
      
      const ids = new Set(data?.map(e => e.shopify_product_id) || []);
      setEbookProductIds(ids);
    } catch (error) {
      console.error('Error loading ebook product IDs:', error);
    }
  };

  // Update ebook products when products or ebookProductIds change
  useEffect(() => {
    if (products.length > 0 && ebookProductIds.size > 0) {
      const ebooksFiltered = products.filter(p => {
        const numericId = p.node.id.replace('gid://shopify/Product/', '');
        return ebookProductIds.has(numericId) || ebookProductIds.has(p.node.id);
      });
      setEbookProducts(ebooksFiltered);
    }
  }, [products, ebookProductIds]);

  const hasEbook = (productId: string): boolean => {
    // Extract numeric ID from Shopify GID format
    const numericId = productId.replace('gid://shopify/Product/', '');
    return ebookProductIds.has(numericId) || ebookProductIds.has(productId);
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCollection]);

  const loadCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
      toast.error("No se pudieron cargar las colecciones");
    }
  };

  // Collections to exclude from the main "todos" view - now empty to include all books
  const EXCLUDED_COLLECTIONS: string[] = [];

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      if (selectedCollection === "todos" || selectedCollection === "novedades") {
        // Load collections if needed
        const collectionsData =
          collections.length > 0 ? collections : await getCollections().catch(() => []);
        if (collections.length === 0 && collectionsData.length > 0) {
          setCollections(collectionsData);
        }

        // Load ALL products - filtering for "Libros Antiguos" happens in the display logic
        const allData = await getAllProducts();

        // Helper to check if product is a novedad
        const isNovedadCheck = (p: any) => {
          const tags = p.node.tags || [];
          const tagsLower = tags.map((t: string) => t.toLowerCase());
          return tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
        };

        let filteredProducts = [...allData];

        // If "novedades" is selected, filter to only products with novedad tag
        if (selectedCollection === "novedades") {
          filteredProducts = filteredProducts.filter(isNovedadCheck);
          // Sort by published date (most recent first)
          filteredProducts.sort((a: any, b: any) => {
            const dateA = new Date(a.node.publishedAt || a.node.createdAt || 0);
            const dateB = new Date(b.node.publishedAt || b.node.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        } else if (selectedCollection === "todos") {
          // For "todos", put novedades first sorted by date, then the rest
          const novedades = filteredProducts.filter(isNovedadCheck);
          const otros = filteredProducts.filter((p: any) => !isNovedadCheck(p));

          // Sort novedades by published date (most recent first)
          novedades.sort((a: any, b: any) => {
            const dateA = new Date(a.node.publishedAt || a.node.createdAt || 0);
            const dateB = new Date(b.node.publishedAt || b.node.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });

          filteredProducts = [...novedades, ...otros];
        }

        setProducts(filteredProducts);
      } else {
        const { products: collectionProducts } = await getAllCollectionProducts(selectedCollection);
        setProducts(collectionProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error("Error al cargar productos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Producto agregado al carrito", {
      position: "top-center",
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Tienda Grupo Cultural Dauro",
    "description": "Tienda oficial de Grupo Cultural Dauro con libros, arte y NFTs culturales",
    "url": "https://www.grupodauro.com/tienda",
    "image": "https://www.grupodauro.com/og-image.jpg",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Productos Culturales",
      "itemListElement": bookProducts.slice(0, 10).map((product, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": product.node.title,
          "image": product.node.images.edges[0]?.node?.url,
          "description": product.node.description,
          "url": `https://www.grupodauro.com/producto/${product.node.handle}`
        },
        "price": parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2),
        "priceCurrency": product.node.priceRange.minVariantPrice.currencyCode
      }))
    }
  };

  return (
    <>
      <SEO
        title="Librería Online | Comprar Libros - Editorial Dauro"
        description="Compra libros de narrativa, poesía, ensayo e historia en la librería online de Editorial Dauro. Envío a toda España. Más de 2000 títulos disponibles."
        keywords="comprar libros online, librería online, libros narrativa, libros poesía, libros ensayo, editorial Dauro, libros Granada, literatura española, novela histórica"
        image="https://www.grupodauro.com/og-image.jpg"
        url="https://www.grupodauro.com/shop"
        structuredData={structuredData}
      />

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroCultureBg})`,
              filter: "brightness(0.85)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background/80" />
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
              Nuestras Obras Destacadas
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Aquí encontrarás una selección de nuestras obras más destacadas: libros, arte y NFTs culturales
            </p>
          </div>
        </section>

        <main className="flex-1">
          <div className="container mx-auto px-6 py-12">
            <div className="flex justify-end mb-8">
              <CartDrawer />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-7 mb-8">
                  <TabsTrigger value="libros" className="flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    <span className="hidden sm:inline">Libros</span> ({bookProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="dauro-ciencia" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Ciencia</span> ({dauroCienciaProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="ebooks" className="flex items-center gap-2">
                    <Tablet className="h-4 w-4" />
                    <span className="hidden sm:inline">Ebooks</span> ({ebookProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="musica" className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span className="hidden sm:inline">Música</span> ({musicProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="segunda-mano" className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    <span className="hidden sm:inline">2ª Mano</span> ({segundaManoProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="arte" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Arte</span> ({artProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="nfts" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    <span className="hidden sm:inline">NFTs</span> ({nftProducts.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="libros">
                  {bookProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">No hay libros disponibles</h2>
                      <p className="text-muted-foreground">
                        Pronto agregaremos nuevos libros a nuestra tienda
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Collection selector */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Button
                          variant={booksScope === "todas" && selectedCollection === "todos" ? "default" : "outline"}
                          onClick={() => {
                            setBooksScope("todas");
                            setSelectedCollection("todos");
                          }}
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Library className="h-4 w-4" />
                          Todas las obras
                        </Button>
                        <Button
                          variant={booksScope === "todas" && selectedCollection === "novedades" ? "default" : "outline"}
                          onClick={() => {
                            setBooksScope("todas");
                            setSelectedCollection("novedades");
                          }}
                          size="sm"
                        >
                          Novedades
                        </Button>
                        {collections.map(col => (
                          <Button
                            key={col.node.id}
                            variant={booksScope === "todas" && selectedCollection === col.node.handle ? "default" : "outline"}
                            onClick={() => {
                              setBooksScope("todas");
                              setSelectedCollection(col.node.handle);
                            }}
                            size="sm"
                          >
                            {col.node.title}
                          </Button>
                        ))}
                      </div>

                      {/* Search and sort controls */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Buscar por título o autor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                          <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Ordenar por..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="novedades">Novedades primero</SelectItem>
                              <SelectItem value="titulo-asc">Título A-Z</SelectItem>
                              <SelectItem value="titulo-desc">Título Z-A</SelectItem>
                              <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                              <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
                              <SelectItem value="reciente">Más recientes</SelectItem>
                              <SelectItem value="antiguo">Más antiguos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {searchQuery && (
                          <span className="text-sm text-muted-foreground self-center">
                            {searchFilteredBooks.length} resultado{searchFilteredBooks.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {/* Genre filter - TEMPORALMENTE OCULTO hasta clasificar productos */}
                      {/* {availableGenres.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Filtrar por género:</span>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant={selectedGenre === "todos" ? "default" : "outline"}
                              onClick={() => setSelectedGenre("todos")}
                              size="sm"
                            >
                              Todos ({getGenreCount("todos")})
                            </Button>
                            {availableGenres.map(genre => (
                              <Button
                                key={genre}
                                variant={selectedGenre === genre ? "default" : "outline"}
                                onClick={() => setSelectedGenre(genre)}
                                size="sm"
                              >
                                {genre} ({getGenreCount(genre)})
                              </Button>
                            ))}
                          </div>
                        </div>
                      )} */}

                      {/* Nota sobre política de envíos con calculador */}
                      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <p className="text-sm text-amber-800 dark:text-amber-200">
                            <strong>📦 Importante:</strong> Antes de realizar tu compra, consulta nuestra{' '}
                            <Link to="/terminos#politica-envios" className="underline hover:text-amber-600 dark:hover:text-amber-300 font-medium">
                              política de gastos de envío
                            </Link>
                            . Los libros menores de 15€ tienen coste de transporte.
                          </p>
                          <ShippingCalculator />
                        </div>
                      </div>

                      {/* Category and Author filters with accordion */}
                      <Accordion type="multiple" className="mb-6 space-y-2">
                        <AccordionItem value="categories" className="border rounded-lg px-4">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4" />
                              <span className="font-medium">
                                Filtrar por categoría: {bookCategory === "todos" ? "Todas" : bookCategories.find(c => c.id === bookCategory)?.label || bookCategory}
                              </span>
                              <span className="text-muted-foreground text-sm">({getCategoryCount(bookCategory)})</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex gap-2 flex-wrap pt-2">
                              {bookCategories.map(cat => (
                                <Button
                                  key={cat.id}
                                  variant={bookCategory === cat.id ? "default" : "outline"}
                                  onClick={() => setBookCategory(cat.id)}
                                  size="sm"
                                >
                                  {cat.label} ({getCategoryCount(cat.id)})
                                </Button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Author filter with search */}
                        <AccordionItem value="authors" className="border rounded-lg px-4">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium">
                                Filtrar por autor: {selectedAuthor === "todos" ? "Todos" : selectedAuthor}
                              </span>
                              {selectedAuthor !== "todos" && (
                                <span className="text-muted-foreground text-sm">
                                  ({filterProductsByAuthor(scopedBooks, selectedAuthor).length})
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-2 space-y-3">
                              {/* Author search input */}
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="text"
                                  placeholder="Escribe el nombre del autor..."
                                  value={selectedAuthor === "todos" ? "" : selectedAuthor}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                      setSelectedAuthor("todos");
                                    } else {
                                      setSelectedAuthor(value);
                                    }
                                  }}
                                  className="pl-10"
                                />
                              </div>
                              
                              {/* Author suggestions */}
                              {availableAuthors.length > 0 && (
                                <div className="flex gap-2 flex-wrap max-h-40 overflow-y-auto">
                                  <Button
                                    variant={selectedAuthor === "todos" ? "default" : "outline"}
                                    onClick={() => setSelectedAuthor("todos")}
                                    size="sm"
                                  >
                                    Todos los autores
                                  </Button>
                                  {availableAuthors
                                    .filter(author => {
                                      // Si hay texto escrito, filtrar autores que coincidan
                                      if (selectedAuthor !== "todos" && selectedAuthor !== "") {
                                        const searchLower = selectedAuthor.toLowerCase();
                                        return author.toLowerCase().includes(searchLower);
                                      }
                                      return true;
                                    })
                                    .map(author => {
                                      const count = filterProductsByAuthor(scopedBooks, author).length;
                                      if (count === 0) return null;
                                      return (
                                        <Button
                                          key={author}
                                          variant={selectedAuthor === author ? "default" : "outline"}
                                          onClick={() => setSelectedAuthor(author)}
                                          size="sm"
                                        >
                                          {author} ({count})
                                        </Button>
                                      );
                                    })}
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {filteredBooks.length === 0 ? (
                        <div className="text-center py-20">
                          <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <h2 className="text-2xl font-semibold mb-2">No hay libros en esta categoría</h2>
                        </div>
                      ) : (
                        <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {filteredBooks.slice(0, visibleBooksCount).map((product) => (
                        <Card key={product.node.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                          <Link to={`/producto/${product.node.handle}`} className="block relative">
                            {product.node.images.edges[0]?.node && (
                              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-t-lg flex items-center justify-center p-4 relative">
                                <img
                                  src={product.node.images.edges[0].node.url}
                                  alt={product.node.images.edges[0].node.altText || `${product.node.title} - Libro disponible en Ediciones Dauro`}
                                  loading="lazy"
                                  width="400"
                                  height="533"
                                  className="w-full h-full object-contain hover:scale-105 transition-all duration-300 drop-shadow-2xl grayscale hover:grayscale-0"
                                />
                                {/* BADGES ESQUINA SUPERIOR IZQUIERDA - Ebook */}
                                {hasEbook(product.node.id) && (
                                  <div className="absolute top-2 left-2 bg-cyan-500 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                                    Ebook
                                  </div>
                                )}
                                {/* BADGES ESQUINA SUPERIOR DERECHA - Novedad/Premio */}
                                {isNovedad(product) && (
                                  <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                                    Novedad
                                  </div>
                                )}
                                {/* Premio Badge - debajo de novedad */}
                                {isPremiado(product) && (
                                  <div className={`absolute ${isNovedad(product) ? 'top-9' : 'top-2'} right-2 bg-amber-500 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md animate-pulse`}>
                                    Premio
                                  </div>
                                )}
                                {/* Premio Andalucía de la Crítica Badge */}
                                {!isPremiado(product) && product.node.tags?.some(tag => tag.toLowerCase() === 'premio andalucía de la crítica') && (
                                  <div className={`absolute ${isNovedad(product) ? 'top-9' : 'top-2'} right-2 bg-blue-600 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md`}>
                                    Premio
                                  </div>
                                )}
                                {/* Bestseller Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'bestseller') && (
                                  <div className={`absolute ${isNovedad(product) && isPremiado(product) ? 'top-16' : isNovedad(product) || isPremiado(product) ? 'top-9' : 'top-2'} right-2 bg-yellow-500 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md`}>
                                    Éxito
                                  </div>
                                )}
                                {/* Segunda Edición Stamp */}
                                {product.node.tags?.some((tag: string) => ['segunda edicion', 'segunda edición', '2a edicion', '2a edición', '2ª edición', '2ª edicion'].includes(tag.toLowerCase())) && (
                                  <div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-blue-600 bg-white/90 backdrop-blur-sm transform -rotate-12 shadow-lg">
                                    <div className="text-center">
                                      <span className="block text-blue-600 font-black text-[9px] uppercase tracking-tight leading-none">2ª</span>
                                      <span className="block text-blue-600 font-bold text-[7px] uppercase tracking-wide leading-tight">Edición</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </Link>
                          
                          <CardHeader>
                            <Link to={`/producto/${product.node.handle}`}>
                              <CardTitle className="hover:text-primary transition-colors line-clamp-2 uppercase">
                                {product.node.title}
                              </CardTitle>
                            </Link>
                            <CardDescription className="line-clamp-3">
                              {getSynopsisOnly(product.node.description, 150)}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="flex-1">
                            {/* Formatos disponibles con precios - Estilo compacto */}
                            <div className="space-y-1.5">
                              {(() => {
                                const physicalVariant = product.node.variants.edges.find(
                                  v => !v.node.title.toLowerCase().includes('ebook')
                                );
                                const ebookVariant = product.node.variants.edges.find(
                                  v => v.node.title.toLowerCase().includes('ebook')
                                );
                                
                                return (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium border border-amber-200 dark:border-amber-800">
                                        <Book className="w-3 h-3" />
                                        Papel
                                      </span>
                                      <span className="text-base font-bold">
                                        {physicalVariant ? `${parseFloat(physicalVariant.node.price.amount).toFixed(2)} €` : `${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} €`}
                                      </span>
                                    </div>
                                    {hasEbook(product.node.id) && (
                                      <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-xs font-medium border border-cyan-200 dark:border-cyan-800">
                                          <Tablet className="w-3 h-3" />
                                          Ebook
                                        </span>
                                        <span className="text-base font-bold text-cyan-700 dark:text-cyan-300">
                                          {ebookVariant ? `${parseFloat(ebookVariant.node.price.amount).toFixed(2)} €` : '9.99 €'}
                                        </span>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                            
                            {product.node.productType && (
                              <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                                <Tag className="w-3 h-3" />
                                <span>{product.node.productType}</span>
                              </div>
                            )}
                          </CardContent>
                          
                          <CardFooter>
                            <Button 
                              onClick={() => handleAddToCart(product)}
                              className="w-full"
                              disabled={!product.node.variants.edges[0]?.node.availableForSale}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {product.node.variants.edges[0]?.node.availableForSale 
                                ? 'Agregar al Carrito' 
                                : 'Agotado'}
                            </Button>
                          </CardFooter>
                        </Card>
                          ))}
                        </div>
                        
                        {/* Ver más button */}
                        {visibleBooksCount < filteredBooks.length && (
                          <div className="flex justify-center mt-8">
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => setVisibleBooksCount(prev => prev + 20)}
                              className="min-w-[200px]"
                            >
                              Ver más ({filteredBooks.length - visibleBooksCount} restantes)
                            </Button>
                          </div>
                        )}
                        </>
                      )}
                    </>
                  )}
                </TabsContent>

                {/* DAURO CIENCIA TAB */}
                <TabsContent value="dauro-ciencia">
                  {dauroCienciaProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">Publicaciones académicas próximamente</h2>
                      <p className="text-muted-foreground">
                        Estamos preparando nuestra colección de obras académicas y científicas.
                      </p>
                      <Link to="/dauro-ciencia">
                        <Button className="mt-6 gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Conoce Dauro Ciencia
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Header con descripción */}
                      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>
                          <h2 className="text-2xl font-playfair font-bold">Dauro Ciencia</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Nuestra línea editorial académica con sello de calidad universitaria. Tesis doctorales, TFG, TFM 
                          y obras de investigación convertidas en libro con ISBN, depósito legal y distribución internacional.
                        </p>
                        <Link to="/dauro-ciencia">
                          <Button variant="outline" size="sm" className="gap-2">
                            Publica tu investigación
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {dauroCienciaProducts.map((product) => (
                          <Card key={product.node.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                            <Link to={`/producto/${product.node.handle}`} className="block relative">
                              {product.node.images.edges[0]?.node && (
                                <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-t-lg flex items-center justify-center p-4">
                                  <img
                                    src={product.node.images.edges[0].node.url}
                                    alt={product.node.images.edges[0].node.altText || `${product.node.title} - Publicación académica Dauro Ciencia`}
                                    loading="lazy"
                                    width="400"
                                    height="533"
                                    className="w-full h-full object-contain hover:scale-105 transition-all duration-300 drop-shadow-2xl"
                                  />
                                  {/* Sello Académico Badge */}
                                  <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <GraduationCap className="w-3 h-3" />
                                    Sello Académico
                                  </div>
                                  {/* Ebook Badge */}
                                  {hasEbook(product.node.id) && (
                                    <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                      <Tablet className="w-3 h-3" />
                                      Ebook
                                    </div>
                                  )}
                                </div>
                              )}
                            </Link>
                            
                            <CardHeader>
                              <Link to={`/producto/${product.node.handle}`}>
                                <CardTitle className="hover:text-primary transition-colors line-clamp-2 uppercase text-sm">
                                  {product.node.title}
                                </CardTitle>
                              </Link>
                              <CardDescription className="line-clamp-3">
                                {getSynopsisOnly(product.node.description, 120)}
                              </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="flex-1">
                              <div className="space-y-2">
                                {(() => {
                                  const physicalVariant = product.node.variants.edges.find(
                                    v => !v.node.title.toLowerCase().includes('ebook')
                                  );
                                  const ebookVariant = product.node.variants.edges.find(
                                    v => v.node.title.toLowerCase().includes('ebook')
                                  );
                                  
                                  return (
                                    <>
                                      <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-md text-xs font-medium">
                                          <Book className="w-3 h-3" />
                                          <span>Papel</span>
                                        </div>
                                        <span className="text-lg font-bold">
                                          {physicalVariant ? `${parseFloat(physicalVariant.node.price.amount).toFixed(2)} €` : `${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} €`}
                                        </span>
                                      </div>
                                      {hasEbook(product.node.id) && ebookVariant && (
                                        <div className="flex items-center gap-2">
                                          <div className="flex items-center gap-1 px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-md text-xs font-medium">
                                            <Tablet className="w-3 h-3" />
                                            <span>Ebook</span>
                                          </div>
                                          <span className="text-lg font-bold text-cyan-700 dark:text-cyan-300">
                                            {parseFloat(ebookVariant.node.price.amount).toFixed(2)} €
                                          </span>
                                        </div>
                                      )}
                                    </>
                                  );
                                })()}
                              </div>
                            </CardContent>
                            
                            <CardFooter>
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                className="w-full"
                                disabled={!product.node.variants.edges[0]?.node.availableForSale}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {product.node.variants.edges[0]?.node.availableForSale 
                                  ? 'Agregar al Carrito' 
                                  : 'Agotado'}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="ebooks">
                  {ebookProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <Tablet className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">Ebooks próximamente</h2>
                      <p className="text-muted-foreground">
                        Estamos preparando versiones digitales de nuestros libros. ¡Vuelve pronto!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <p className="text-muted-foreground">
                          Versiones digitales de nuestros libros. Descarga inmediata en formato EPUB.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {ebookProducts.map((product) => (
                          <Card key={product.node.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-cyan-500/30 bg-gradient-to-b from-cyan-50/10 to-transparent dark:from-cyan-950/20">
                            <Link to={`/producto/${product.node.handle}`} className="block">
                              {product.node.images.edges[0]?.node && (
                                <div className="aspect-[3/4] overflow-hidden relative">
                                  <img
                                    src={product.node.images.edges[0].node.url}
                                    alt={product.node.images.edges[0].node.altText || product.node.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  {/* Ebook Badge */}
                                  <div className="absolute top-2 left-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <Tablet className="w-3 h-3" />
                                    Ebook
                                  </div>
                                  {/* Descarga Inmediata */}
                                  <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm">
                                    📥 Descarga inmediata
                                  </div>
                                </div>
                              )}
                            </Link>
                            
                            <CardContent className="flex-1 flex flex-col justify-between pt-4">
                              <Link to={`/producto/${product.node.handle}`} className="block hover:text-primary transition-colors">
                                <h3 className="font-playfair font-semibold text-sm md:text-lg line-clamp-2 mb-2 uppercase">
                                  {product.node.title}
                                </h3>
                              </Link>
                              <div>
                                <p className="text-cyan-600 dark:text-cyan-400 font-bold text-base md:text-xl">
                                  {/* Mostrar precio de variante ebook si existe, sino el mínimo */}
                                  {product.node.variants.edges.find(v => 
                                    v.node.title.toLowerCase().includes('ebook')
                                  )?.node.price.currencyCode || product.node.priceRange.minVariantPrice.currencyCode}{' '}
                                  {parseFloat(
                                    product.node.variants.edges.find(v => 
                                      v.node.title.toLowerCase().includes('ebook')
                                    )?.node.price.amount || product.node.priceRange.minVariantPrice.amount
                                  ).toFixed(2)}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Formato EPUB
                                </p>
                              </div>
                            </CardContent>
                            
                            <CardFooter>
                              <Button 
                                onClick={() => {
                                  // Encontrar la variante ebook
                                  const ebookVariant = product.node.variants.edges.find(v => 
                                    v.node.title.toLowerCase().includes('ebook')
                                  );
                                  if (ebookVariant) {
                                    const cartItem = {
                                      product,
                                      variantId: ebookVariant.node.id,
                                      variantTitle: ebookVariant.node.title,
                                      price: ebookVariant.node.price,
                                      quantity: 1,
                                      selectedOptions: ebookVariant.node.selectedOptions || []
                                    };
                                    addItem(cartItem);
                                    toast.success("Ebook agregado al carrito", { position: "top-center" });
                                  } else {
                                    handleAddToCart(product);
                                  }
                                }}
                                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Comprar Ebook
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="segunda-mano">
                  {segundaManoProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <BookMarked className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">No hay libros de segunda mano</h2>
                      <p className="text-muted-foreground">
                        Pronto agregaremos libros descatalogados y de segunda mano
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <p className="text-muted-foreground">
                          Libros descatalogados disponibles en segunda mano. Ejemplares únicos en buen estado.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {segundaManoProducts.map((product) => (
                          <Card key={product.node.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-amber-500/30 bg-gradient-to-b from-amber-50/10 to-transparent dark:from-amber-950/20">
                            <Link to={`/producto/${product.node.handle}`} className="block">
                              {product.node.images.edges[0]?.node && (
                                <div className="aspect-[3/4] overflow-hidden relative">
                                  <img
                                    src={product.node.images.edges[0].node.url}
                                    alt={product.node.images.edges[0].node.altText || product.node.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  {/* Segunda Mano Badge */}
                                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <BookMarked className="w-3 h-3" />
                                    Segunda Mano
                                  </div>
                                  {/* Ebook Badge */}
                                  {hasEbook(product.node.id) && (
                                    <div className="absolute top-2 left-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                      <Tablet className="w-3 h-3" />
                                      Ebook
                                    </div>
                                  )}
                                </div>
                              )}
                            </Link>
                            
                            <CardContent className="flex-1 flex flex-col justify-between pt-4">
                              <Link to={`/producto/${product.node.handle}`} className="block hover:text-primary transition-colors">
                                <h3 className="font-playfair font-semibold text-sm md:text-lg line-clamp-2 mb-2 uppercase">
                                  {product.node.title}
                                </h3>
                              </Link>
                              <p className="text-primary font-bold text-base md:text-xl">
                                {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                                {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                              </p>
                            </CardContent>
                            
                            <CardFooter>
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                className="w-full"
                                variant="outline"
                                disabled={!product.node.variants.edges[0]?.node.availableForSale}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {product.node.variants.edges[0]?.node.availableForSale 
                                  ? 'Agregar al Carrito' 
                                  : 'Agotado'}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="musica">
                  {musicProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-semibold mb-2">No hay productos musicales</h2>
                      <p className="text-muted-foreground">
                        Pronto agregaremos discos y álbumes a nuestra tienda
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <p className="text-muted-foreground">
                          Discos, álbumes y producciones musicales de nuestros artistas.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {musicProducts.map((product) => (
                          <Card key={product.node.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-purple-500/30 bg-gradient-to-b from-purple-50/10 to-transparent dark:from-purple-950/20">
                            <Link to={`/producto/${product.node.handle}`} className="block">
                              {product.node.images.edges[0]?.node && (
                                <div className="aspect-square overflow-hidden relative">
                                  <img
                                    src={product.node.images.edges[0].node.url}
                                    alt={product.node.images.edges[0].node.altText || product.node.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  {/* Music Badge */}
                                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <Music className="w-3 h-3" />
                                    Música
                                  </div>
                                </div>
                              )}
                            </Link>
                            
                            <CardContent className="flex-1 flex flex-col justify-between pt-4">
                              <Link to={`/producto/${product.node.handle}`} className="block hover:text-primary transition-colors">
                                <h3 className="font-playfair font-semibold text-sm md:text-lg line-clamp-2 mb-2 uppercase">
                                  {product.node.title}
                                </h3>
                              </Link>
                              <p className="text-primary font-bold text-base md:text-xl">
                                {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                                {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                              </p>
                            </CardContent>
                            
                            <CardFooter>
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                className="w-full"
                                variant="outline"
                                disabled={!product.node.variants.edges[0]?.node.availableForSale}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {product.node.variants.edges[0]?.node.availableForSale 
                                  ? 'Agregar al Carrito' 
                                  : 'Agotado'}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="arte">
                  <div className="text-center py-20">
                    <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Colección de Arte</h2>
                    <p className="text-muted-foreground mb-4">
                      Próximamente dispondremos de obras de arte únicas
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="nfts">
                  <div className="text-center py-20">
                    <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Colección NFT</h2>
                    <p className="text-muted-foreground mb-4">
                      Explora nuestra colección exclusiva de NFTs culturales
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
