import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import libroBoabdil from "@/assets/libro-boabdil.png";
import libroBesos from "@/assets/libro-besos.png";
import libroLatido from "@/assets/libro-latido.png";
import libroHorizonte from "@/assets/libro-horizonte-interior.png";
import nftArgentinaMexico from "@/assets/nft-argentina-mexico.png";
import nftArgentinaCollection from "@/assets/nft-argentina-collection.png";
import nftArgentinaPuertoRico from "@/assets/nft-argentina-puertorico.png";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.jpg";

const Tienda = () => {
  const libros = [
    {
      id: 1,
      title: "El latido de la ciudad",
      author: "Rodrigo de Zayas",
      description: "Una reflexión profunda sobre la vida urbana contemporánea",
      price: "18.90",
      image: libroLatido,
      disponible: true,
    },
    {
      id: 2,
      title: "Los besos del sol",
      author: "Rodrigo de Zayas",
      description: "Poesía que captura la esencia del Mediterráneo",
      price: "16.50",
      image: libroBesos,
      disponible: true,
    },
    {
      id: 3,
      title: "Boabdil, el chico que perdió Granada",
      author: "Rodrigo de Zayas",
      description: "Historia del último rey nazarí de Granada",
      price: "22.00",
      image: libroBoabdil,
      disponible: true,
    },
    {
      id: 4,
      title: "El horizonte interior",
      author: "Rodrigo de Zayas",
      description: "Un viaje introspectivo a través de la narrativa",
      price: "19.90",
      image: libroHorizonte,
      disponible: true,
    },
  ];

  const obrasArte = [
    {
      id: 1,
      title: "Abstracción Contemporánea I",
      artist: "Artista Dauro",
      technique: "Óleo sobre lienzo",
      dimensions: "100 x 80 cm",
      price: "1.200",
      image: gallery1,
      disponible: true,
    },
    {
      id: 2,
      title: "Paisaje Urbano",
      artist: "Artista Dauro",
      technique: "Técnica mixta",
      dimensions: "120 x 90 cm",
      price: "1.500",
      image: gallery2,
      disponible: true,
    },
    {
      id: 3,
      title: "Composición Geométrica",
      artist: "Artista Dauro",
      technique: "Acrílico sobre lienzo",
      dimensions: "80 x 80 cm",
      price: "950",
      image: gallery3,
      disponible: true,
    },
  ];

  const nfts = [
    {
      id: 1,
      title: "Argentina x México",
      collection: "Colección Cultural",
      description: "NFT exclusivo celebrando la cultura latinoamericana",
      price: "0.5 ETH",
      image: nftArgentinaMexico,
      blockchain: "Ethereum",
      disponible: true,
    },
    {
      id: 2,
      title: "Argentina Collection",
      collection: "Serie Especial",
      description: "Pieza única de arte digital argentino",
      price: "0.8 ETH",
      image: nftArgentinaCollection,
      blockchain: "Ethereum",
      disponible: true,
    },
    {
      id: 3,
      title: "Argentina x Puerto Rico",
      collection: "Colección Cultural",
      description: "Fusión artística entre dos culturas",
      price: "0.6 ETH",
      image: nftArgentinaPuertoRico,
      blockchain: "Ethereum",
      disponible: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              <a 
                href="https://www.edicionesdauro.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Tienda Dauro
              </a>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestro catálogo de libros, obras de arte y NFTs
            </p>
          </div>

          <Tabs defaultValue="libros" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="libros" className="text-lg">Libros</TabsTrigger>
              <TabsTrigger value="arte" className="text-lg">Obras de Arte</TabsTrigger>
              <TabsTrigger value="nfts" className="text-lg">NFTs</TabsTrigger>
            </TabsList>

            <TabsContent value="libros" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Catálogo Editorial</h2>
                <p className="text-muted-foreground">Narrativa, ensayo y poesía de Grupo Dauro</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {libros.map((libro) => (
                  <Card key={libro.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={libro.image}
                        alt={libro.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold mb-1 line-clamp-2">{libro.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{libro.author}</p>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{libro.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{libro.price}€</span>
                        <Button size="sm" className="gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Añadir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arte" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Obras de Arte</h2>
                <p className="text-muted-foreground">Piezas originales de artistas representados por Dauro</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {obrasArte.map((obra) => (
                  <Card key={obra.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={obra.image}
                        alt={obra.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{obra.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{obra.artist}</p>
                      <p className="text-xs text-muted-foreground mb-1">{obra.technique}</p>
                      <p className="text-xs text-muted-foreground mb-4">{obra.dimensions}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-2xl font-bold text-primary">{obra.price}€</span>
                        <Button className="gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Consultar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nfts" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Colección NFT</h2>
                <p className="text-muted-foreground">Arte digital exclusivo en blockchain</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nfts.map((nft) => (
                  <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-shadow group border-2">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                      <img
                        src={nft.image}
                        alt={nft.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          {nft.blockchain}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{nft.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{nft.collection}</p>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{nft.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-xl font-bold text-primary">{nft.price}</span>
                        <Button className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Ver NFT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Envío gratuito en pedidos superiores a 50€
            </h3>
            <p className="text-muted-foreground">
              Recibe tus productos en 3-5 días laborables. Pagos seguros con tarjeta o criptomonedas.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tienda;
