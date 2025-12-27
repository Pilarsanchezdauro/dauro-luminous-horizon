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
import { ShoppingCart, Loader2, Book, Palette, Image, Award, Gem, Film, ExternalLink, Trophy, FileCheck, Search, ArrowUpDown, Library } from "lucide-react";
import { getAllProducts, getCollections, getAllCollectionProducts } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { getSynopsisOnly } from "@/lib/description-parser";
import heroCultureBg from "@/assets/hero-culture-bg.png";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("titulo-asc");
  const addItem = useCartStore(state => state.addItem);

  // For now, all products are books. Arte and NFT sections will be populated later
  const bookProducts = products;
  const artProducts: ShopifyProduct[] = [];
  const nftProducts: ShopifyProduct[] = [];

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

  // Filter books by search query first
  const searchFilteredBooks = searchQuery.trim() 
    ? bookProducts.filter(p => {
        const query = searchQuery.toLowerCase();
        const title = p.node.title?.toLowerCase() || '';
        const description = p.node.description?.toLowerCase() || '';
        return title.includes(query) || description.includes(query);
      })
    : bookProducts;

  // Then filter by selected category using tags
  const categoryFilteredBooks = bookCategory === "todos" 
    ? searchFilteredBooks 
    : searchFilteredBooks.filter(p => {
        const tags = p.node.tags || [];
        const tagsLower = tags.map((t: string) => t.toLowerCase());
        return tagsLower.includes(bookCategory.toLowerCase()) || 
               (bookCategory === "desarrollo personal" && tagsLower.includes("autoayuda"));
      });

  // Sort the filtered books
  const filteredBooks = [...categoryFilteredBooks].sort((a, b) => {
    switch (sortBy) {
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

  // Count books per category (based on search-filtered books)
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "todos") return searchFilteredBooks.length;
    return searchFilteredBooks.filter(p => {
      const tags = p.node.tags || [];
      const tagsLower = tags.map((t: string) => t.toLowerCase());
      return tagsLower.includes(categoryId.toLowerCase()) ||
             (categoryId === "desarrollo personal" && tagsLower.includes("autoayuda"));
    }).length;
  };

  useEffect(() => {
    loadCollections();
  }, []);

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
      if (selectedCollection === "todos") {
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
        const filteredProducts = allData.filter((p: any) => !excludedProductIds.has(p.node.id));
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
              filter: "brightness(0.6)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background" />
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6">
              Nuestras Obras Destacadas
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Aquí encontrarás una selección de nuestras obras más destacadas: libros, arte y NFTs culturales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <p className="text-lg text-white/80">
                Catálogo editorial completo en:
              </p>
              <Button asChild variant="secondary" size="lg">
                <a href="https://www.edicionesdauro.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  www.edicionesdauro.com
                </a>
              </Button>
            </div>
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
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="libros" className="flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    Libros ({bookProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="arte" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Arte ({artProducts.length})
                  </TabsTrigger>
                  <TabsTrigger value="nfts" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    NFTs ({nftProducts.length})
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
                      {collections.length > 0 && (
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
                      )}

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

                      {/* Category filters */}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {filteredBooks.map((product) => (
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
                                {/* Bestseller Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'bestseller') && (
                                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wide">
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
                                {/* Premio Andalucía de la Crítica Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'premio andalucía de la crítica') && (
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
                              </div>
                            )}
                          </Link>
                          
                          <CardHeader>
                            <Link to={`/producto/${product.node.handle}`}>
                              <CardTitle className="hover:text-primary transition-colors line-clamp-2">
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
                      )}
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
