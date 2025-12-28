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
import { ShoppingCart, Loader2, Book, Palette, Image, Award, Gem, Film, ExternalLink, Trophy, FileCheck, Search, ArrowUpDown, Library, Tag, Tablet, BookMarked, Music } from "lucide-react";
import { getAllProducts, getCollections, getAllCollectionProducts } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { getSynopsisOnly } from "@/lib/description-parser";
import heroCultureBg from "@/assets/hero-culture-bg.png";
import { supabase } from "@/integrations/supabase/client";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("novedades");
  const [ebookProductIds, setEbookProductIds] = useState<Set<string>>(new Set());
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
  const bookProducts = products.filter(p => !segundaManoIds.has(p.node.id) && !musicIds.has(p.node.id));
  const artProducts: ShopifyProduct[] = [];
  const nftProducts: ShopifyProduct[] = [];

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
  ];

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleBooksCount(20);
  }, [searchQuery, selectedGenre, bookCategory, selectedCollection, sortBy]);

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

  // Then filter by selected category using tags
  const categoryFilteredBooks = bookCategory === "todos" 
    ? genreFilteredBooks 
    : genreFilteredBooks.filter(p => {
        const tags = p.node.tags || [];
        const tagsLower = tags.map((t: string) => t.toLowerCase());
        return tagsLower.includes(bookCategory.toLowerCase()) || 
               (bookCategory === "desarrollo personal" && tagsLower.includes("autoayuda"));
      });

  // Libros premiados específicos (por título)
  const LIBROS_PREMIADOS = [
    'yo soy todos los besos que nunca pude darte',
    'horizonte interior',
    'boabdil el príncipe del día y de la noche',
    'boabdil el principe del dia y de la noche',
    'boabdil, el príncipe del día y de la noche',
    'boabdil, el principe del dia y de la noche',
  ];

  // Helper to check if product is "premiado" (awarded book)
  const isPremiado = (product: ShopifyProduct) => {
    const titleLower = product.node.title.toLowerCase().trim();
    return LIBROS_PREMIADOS.some(titulo => titleLower.includes(titulo) || titulo.includes(titleLower));
  };

  // Helper to check if product is a "novedad" (new arrival)
  const isNovedad = (product: ShopifyProduct) => {
    const tags = product.node.tags || [];
    const tagsLower = tags.map((t: string) => t.toLowerCase());
    return tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
  };

  // Sort the filtered books - products without images go to the end
  const filteredBooks = [...categoryFilteredBooks].sort((a, b) => {
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

  // Count books per category (based on genre-filtered books)
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "todos") return genreFilteredBooks.length;
    return genreFilteredBooks.filter(p => {
      const tags = p.node.tags || [];
      const tagsLower = tags.map((t: string) => t.toLowerCase());
      return tagsLower.includes(categoryId.toLowerCase()) ||
             (categoryId === "desarrollo personal" && tagsLower.includes("autoayuda"));
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

  // Collections to exclude from the main "todos" view
  const EXCLUDED_COLLECTIONS = ['libros-antiguos'];

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      if (selectedCollection === "todos" || selectedCollection === "novedades") {
        // Load all products and filter out those from excluded collections
        const [allData, ...excludedCollectionsData] = await Promise.all([
          getAllProducts(),
          ...EXCLUDED_COLLECTIONS.map(handle => getAllCollectionProducts(handle).catch(() => ({ products: [] })))
        ]);
        
        // Get IDs of products to exclude
        const excludedProductIds = new Set(
          excludedCollectionsData.flatMap(({ products }) => 
            products.map((p: any) => p.node.id)
          )
        );
        
        // Filter out excluded products
        let filteredProducts = allData.filter((p: any) => !excludedProductIds.has(p.node.id));
        
        // Helper to check if product is a novedad
        const isNovedad = (p: any) => {
          const tags = p.node.tags || [];
          const tagsLower = tags.map((t: string) => t.toLowerCase());
          return tagsLower.includes('novedad') || tagsLower.includes('novedades') || tagsLower.includes('nuevo') || tagsLower.includes('new');
        };
        
        // If "novedades" is selected, filter to only products with novedad tag
        if (selectedCollection === "novedades") {
          filteredProducts = filteredProducts.filter(isNovedad);
          // Sort by published date (most recent first)
          filteredProducts.sort((a: any, b: any) => {
            const dateA = new Date(a.node.publishedAt || a.node.createdAt || 0);
            const dateB = new Date(b.node.publishedAt || b.node.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        } else if (selectedCollection === "todos") {
          // For "todos", put novedades first sorted by date, then the rest
          const novedades = filteredProducts.filter(isNovedad);
          const otros = filteredProducts.filter((p: any) => !isNovedad(p));
          
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
    "url": "https://grupodauro.com/tienda",
    "image": "https://grupodauro.com/og-image.jpg",
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
          "url": `https://grupodauro.com/producto/${product.node.handle}`
        },
        "price": parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2),
        "priceCurrency": product.node.priceRange.minVariantPrice.currencyCode
      }))
    }
  };

  return (
    <>
      <SEO
        title="Tienda - Obras Destacadas"
        description="Descubre nuestra colección de productos culturales: libros, arte y NFTs. Ediciones Dauro, editorial independiente de Granada especializada en literatura andaluza."
        keywords="tienda, libros, editorial Dauro, comprar libros online, literatura Granada, arte, NFTs culturales"
        image="https://grupodauro.com/og-image.jpg"
        url="https://grupodauro.com/tienda"
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
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="libros" className="flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    <span className="hidden sm:inline">Libros</span> ({bookProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="musica" className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span className="hidden sm:inline">Música</span> ({musicProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="segunda-mano" className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    <span className="hidden sm:inline">Segunda Mano</span> ({segundaManoProducts.length})
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
                          variant={selectedCollection === "todos" ? "default" : "outline"}
                          onClick={() => setSelectedCollection("todos")}
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Library className="h-4 w-4" />
                          Todas las obras
                        </Button>
                        <Button
                          variant={selectedCollection === "novedades" ? "default" : "outline"}
                          onClick={() => setSelectedCollection("novedades")}
                          size="sm"
                        >
                          Novedades
                        </Button>
                        {collections.map(col => (
                          <Button
                            key={col.node.id}
                            variant={selectedCollection === col.node.handle ? "default" : "outline"}
                            onClick={() => setSelectedCollection(col.node.handle)}
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

                      {/* Genre filter (productType) */}
                      {availableGenres.length > 0 && (
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
                      )}

                      {/* Category filters (tags) */}
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {bookCategories.map(category => (
                          <Button
                            key={category.id}
                            variant={bookCategory === category.id ? "default" : "outline"}
                            onClick={() => setBookCategory(category.id)}
                            size="sm"
                          >
                            {category.label} ({getCategoryCount(category.id)})
                          </Button>
                        ))}
                      </div>

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
                              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-t-lg flex items-center justify-center p-4">
                                <img
                                  src={product.node.images.edges[0].node.url}
                                  alt={product.node.images.edges[0].node.altText || `${product.node.title} - Libro disponible en Ediciones Dauro`}
                                  loading="lazy"
                                  width="400"
                                  height="533"
                                  className="w-full h-full object-contain hover:scale-105 transition-all duration-300 drop-shadow-2xl grayscale hover:grayscale-0"
                                />
                                {/* Novedad Badge */}
                                {isNovedad(product) && (
                                  <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <Tag className="w-3 h-3" />
                                    Novedad
                                  </div>
                                )}
                                {/* Bestseller Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'bestseller') && (
                                  <div className={`absolute ${isNovedad(product) ? 'top-10' : 'top-2'} right-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide`}>
                                    <Award className="w-3 h-3" />
                                    Éxito
                                  </div>
                                )}
                                {/* Joya Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'joya') && (
                                  <div className="absolute top-10 right-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <Gem className="w-3 h-3" />
                                    Joya
                                  </div>
                                )}
                                {/* Premio Badge - Libros premiados */}
                                {isPremiado(product) && (
                                  <div className="absolute top-[4.5rem] right-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide animate-pulse">
                                    <Trophy className="w-3 h-3" />
                                    Premio
                                  </div>
                                )}
                                {/* Premio Andalucía de la Crítica Badge */}
                                {!isPremiado(product) && product.node.tags?.some(tag => tag.toLowerCase() === 'premio andalucía de la crítica') && (
                                  <div className="absolute top-[4.5rem] right-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <Trophy className="w-3 h-3" />
                                    Premio
                                  </div>
                                )}
                                {/* Basada en Hechos Reales Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'basada en hechos reales') && (
                                  <div className="absolute top-[6.5rem] right-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <FileCheck className="w-3 h-3" />
                                    H. Reales
                                  </div>
                                )}
                                {/* Cine Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'cine') && (
                                  <div className="absolute top-[8.5rem] right-2 bg-gradient-to-r from-red-600 to-rose-700 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
                                    <Film className="w-3 h-3" />
                                    Cine
                                  </div>
                                )}
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
                            <p className="text-2xl font-bold">
                              {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                              {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                            </p>
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
