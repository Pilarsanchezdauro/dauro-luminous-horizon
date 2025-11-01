import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Loader2, Book, Palette, Image, Award, Gem, Film, ExternalLink, Trophy } from "lucide-react";
import { getProducts } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import editorialBg from "@/assets/editorial-bg.jpg";

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("libros");
  const [bookCategory, setBookCategory] = useState<string>("todos");
  const addItem = useCartStore(state => state.addItem);

  // For now, all products are books. Arte and NFT sections will be populated later
  const bookProducts = products;
  const artProducts: ShopifyProduct[] = [];
  const nftProducts: ShopifyProduct[] = [];

  // All book categories
  const bookCategories = [
    { id: "todos", label: "Todos" },
    { id: "narrativa", label: "Narrativa" },
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

  // Filter books by selected category using tags
  const filteredBooks = bookCategory === "todos" 
    ? bookProducts 
    : bookProducts.filter(p => {
        const tags = p.node.tags || [];
        const tagsLower = tags.map(t => t.toLowerCase());
        return tagsLower.includes(bookCategory.toLowerCase()) || 
               (bookCategory === "desarrollo personal" && tagsLower.includes("autoayuda"));
      });

  // Count books per category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "todos") return bookProducts.length;
    return bookProducts.filter(p => {
      const tags = p.node.tags || [];
      const tagsLower = tags.map(t => t.toLowerCase());
      return tagsLower.includes(categoryId.toLowerCase()) ||
             (categoryId === "desarrollo personal" && tagsLower.includes("autoayuda"));
    }).length;
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts(50);
      setProducts(data);
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

  return (
    <>
      <Helmet>
        <title>Tienda - Grupo Cultural Dauro</title>
        <meta name="description" content="Descubre nuestra colección de productos culturales. Arte, literatura y más en la tienda de Grupo Cultural Dauro." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${editorialBg})`,
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
                                  alt={product.node.images.edges[0].node.altText || product.node.title}
                                  className="w-full h-full object-contain hover:scale-105 transition-all duration-300 drop-shadow-2xl grayscale hover:grayscale-0"
                                />
                                {/* Bestseller Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'bestseller') && (
                                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wide">
                                    <Award className="w-3.5 h-3.5" />
                                    Éxito de Ventas
                                  </div>
                                )}
                                {/* Premio Andalucía de la Crítica Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'premio andalucía de la crítica') && (
                                  <div className="absolute top-16 right-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wide">
                                    <Trophy className="w-3.5 h-3.5" />
                                    Premio Andalucía
                                  </div>
                                )}
                                {/* Cine Badge */}
                                {product.node.tags?.some(tag => tag.toLowerCase() === 'cine') && (
                                  <div className="absolute top-28 right-4 bg-gradient-to-r from-red-600 to-rose-700 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wide">
                                    <Film className="w-3.5 h-3.5" />
                                    Llevada al Cine
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
                            <CardDescription className="line-clamp-2">
                              {product.node.description}
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
