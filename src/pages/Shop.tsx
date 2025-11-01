import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Loader2, Book, Palette, Image } from "lucide-react";
import { getProducts } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

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

  // Get unique book categories from tags
  const bookCategories = Array.from(
    new Set(
      bookProducts.flatMap(p => 
        // Extract main category from tags
        ['narrativa', 'desarrollo personal', 'novela histórica', 'ensayo', 'poesía', 'teatro']
          .filter(cat => p.node.title.toLowerCase().includes(cat) || p.node.description?.toLowerCase().includes(cat))
      )
    )
  ).sort();

  // Filter books by selected category
  const filteredBooks = bookCategory === "todos" 
    ? bookProducts 
    : bookProducts.filter(p => {
        const text = `${p.node.title} ${p.node.description}`.toLowerCase();
        return text.includes(bookCategory.toLowerCase());
      });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts(20);
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
        
        <main className="flex-1 pt-28">
          <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Tienda</h1>
                <p className="text-xl text-muted-foreground">
                  Explora nuestras colecciones de libros, arte y NFTs
                </p>
              </div>
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
                        <Button
                          variant={bookCategory === "todos" ? "default" : "outline"}
                          onClick={() => setBookCategory("todos")}
                          size="sm"
                        >
                          Todos ({bookProducts.length})
                        </Button>
                        <Button
                          variant={bookCategory === "narrativa" ? "default" : "outline"}
                          onClick={() => setBookCategory("narrativa")}
                          size="sm"
                        >
                          Narrativa ({bookProducts.filter(p => {
                            const text = `${p.node.title} ${p.node.description}`.toLowerCase();
                            return text.includes('narrativa') || text.includes('novela');
                          }).length})
                        </Button>
                        <Button
                          variant={bookCategory === "desarrollo personal" ? "default" : "outline"}
                          onClick={() => setBookCategory("desarrollo personal")}
                          size="sm"
                        >
                          Desarrollo Personal ({bookProducts.filter(p => {
                            const text = `${p.node.title} ${p.node.description}`.toLowerCase();
                            return text.includes('desarrollo personal') || text.includes('autoayuda');
                          }).length})
                        </Button>
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
                          <Link to={`/producto/${product.node.handle}`} className="block">
                            {product.node.images.edges[0]?.node && (
                              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-t-lg flex items-center justify-center p-4">
                                <img
                                  src={product.node.images.edges[0].node.url}
                                  alt={product.node.images.edges[0].node.altText || product.node.title}
                                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
                                />
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
