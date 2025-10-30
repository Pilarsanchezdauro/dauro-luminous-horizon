import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ExternalLink, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import NotFound from "./NotFound";
import { useState } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!post) {
    return <NotFound />;
  }

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, idx) => {
      // Imágenes en markdown: ![alt](url)
      const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        return (
          <div key={idx} className="my-8">
            <img
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="w-full rounded-lg shadow-lg"
            />
            {imageMatch[1] && (
              <p className="text-sm text-center text-muted-foreground mt-2 italic">
                {imageMatch[1]}
              </p>
            )}
          </div>
        );
      }

      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl font-playfair font-bold mt-8 mb-4 text-foreground">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={idx} className="font-semibold mb-2">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (paragraph.trim()) {
        return (
          <p key={idx} className="mb-4">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>

            <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <h1 className="text-4xl font-playfair font-bold mb-6 text-foreground">
                  {post.title}
                </h1>
                <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                  {post.content ? renderContent(post.content) : <p>{post.excerpt}</p>}
                </div>

                {/* Imágenes adicionales (image2, image3) */}
                {(post.image2 || post.image3) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {post.image2 && (
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={post.image2}
                          alt="Imagen adicional del artículo"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    {post.image3 && (
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={post.image3}
                          alt="Imagen adicional del artículo"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Galería de imágenes */}
                {post.gallery && post.gallery.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-playfair font-bold mb-4 text-foreground">
                      Galería
                    </h3>
                    <div className="space-y-4">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="relative rounded-lg overflow-hidden shadow-2xl w-full cursor-zoom-in hover:opacity-95 transition-opacity"
                      >
                        <img
                          src={post.gallery[selectedGalleryImage]}
                          alt={`Imagen de galería ${selectedGalleryImage + 1}`}
                          className="w-full h-96 object-cover"
                        />
                      </button>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {post.gallery.map((image, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedGalleryImage(idx)}
                            className={`rounded-lg overflow-hidden border-2 transition-all ${
                              selectedGalleryImage === idx
                                ? 'border-primary shadow-lg scale-105'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Miniatura ${idx + 1}`}
                              className="w-full h-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Book image and link for posts with additional content */}
                {post.bookImage && post.bookLink && (
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-8 mt-8">
                    <div className="flex-shrink-0">
                      <img
                        src={post.bookImage}
                        alt={post.category === "literatura" ? "Portada del libro" : "Imagen relacionada"}
                        className="w-48 h-auto shadow-2xl rounded-lg"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">
                        {post.category === "literatura" ? "Disponible ahora" : post.category === "ia" ? "Descubre la colección" : "Sigue el proyecto"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {post.category === "literatura" 
                          ? "Ya disponible en librerías y en nuestra tienda online."
                          : post.category === "ia"
                          ? "Descubre y adquiere los NFTs oficiales de la Selección Argentina."
                          : "Descubre más avances, imágenes y fragmentos del proceso creativo en nuestro canal de YouTube."}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <a
                          href={post.bookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {post.category === "literatura" ? "Comprar ahora" : post.category === "ia" ? "Ver colección NFT" : "Ver canal de YouTube"}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center bg-black/95">
            <img
              src={post?.gallery?.[selectedGalleryImage]}
              alt={`Imagen de galería ${selectedGalleryImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPost;
