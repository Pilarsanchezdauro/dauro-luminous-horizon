import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HelmetProvider } from "react-helmet-async";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import FloatingAuthorCard from "@/components/FloatingAuthorCard";

// La home carga al instante; el resto de páginas se cargan bajo demanda
// (code-splitting) para reducir el JavaScript inicial que descarga el visitante.
import Index from "./pages/Index";

const GrupoDauro = lazy(() => import("./pages/GrupoDauro"));
const Editorial = lazy(() => import("./pages/Editorial"));
const Arte = lazy(() => import("./pages/Arte"));
const Cine = lazy(() => import("./pages/Cine"));
const GuionSerie = lazy(() => import("./pages/GuionSerie"));
const Musica = lazy(() => import("./pages/Musica"));
const IA = lazy(() => import("./pages/IA"));
const Servicios = lazy(() => import("./pages/Servicios"));
const Tienda = lazy(() => import("./pages/Tienda"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogStats = lazy(() => import("./pages/BlogStats"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Terminos = lazy(() => import("./pages/Terminos"));
const CompromisoEtico = lazy(() => import("./pages/CompromisoEtico"));
const ArchivoHistorico = lazy(() => import("./pages/ArchivoHistorico"));
const Gracias = lazy(() => import("./pages/Gracias"));
const GraciasDauroCiencia = lazy(() => import("./pages/GraciasDauroCiencia"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const DauroArteContacts = lazy(() => import("./pages/admin/DauroArteContacts"));
const EditorialSubmissions = lazy(() => import("./pages/admin/EditorialSubmissions"));
const ServicesContacts = lazy(() => import("./pages/admin/ServicesContacts"));
const BlogPosts = lazy(() => import("./pages/admin/BlogPosts"));
const BlogPostForm = lazy(() => import("./pages/admin/BlogPostForm"));
const RssFeed = lazy(() => import("./pages/RssFeed"));
const Portafolio = lazy(() => import("./pages/Portafolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/admin/Projects"));
const ProjectForm = lazy(() => import("./pages/admin/ProjectForm"));
const WebRequests = lazy(() => import("./pages/admin/WebRequests"));
const BooktrailerRequests = lazy(() => import("./pages/admin/BooktrailerRequests"));
const PortfolioInquiries = lazy(() => import("./pages/admin/PortfolioInquiries"));
const SolicitarBooktrailer = lazy(() => import("./pages/SolicitarBooktrailer"));
const SolicitarWeb = lazy(() => import("./pages/SolicitarWeb"));
const SolicitarProyecto = lazy(() => import("./pages/SolicitarProyecto"));
const SolicitarPortada = lazy(() => import("./pages/SolicitarPortada"));
const SolicitarRepresentacion = lazy(() => import("./pages/SolicitarRepresentacion"));
const GeneradorPortadas = lazy(() => import("./pages/GeneradorPortadas"));
const BookCoverRequests = lazy(() => import("./pages/admin/BookCoverRequests"));
const ImageSeoManager = lazy(() => import("./pages/admin/ImageSeoManager"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const AIMonitoring = lazy(() => import("./pages/admin/AIMonitoring"));
const ArtistSubmissions = lazy(() => import("./pages/admin/ArtistSubmissions"));
const LeBrunCollection = lazy(() => import("./pages/LeBrunCollection"));
const DauroMirloKey = lazy(() => import("./pages/DauroMirloKey"));
const Catalogo = lazy(() => import("./pages/Catalogo"));
const CatalogProducts = lazy(() => import("./pages/admin/CatalogProducts"));
const ShopifySync = lazy(() => import("./pages/admin/ShopifySync"));
const ShopifyImages = lazy(() => import("./pages/admin/ShopifyImages"));
const ProductEbooks = lazy(() => import("./pages/admin/ProductEbooks"));
const DescargarEbook = lazy(() => import("./pages/DescargarEbook"));
const MisEbooks = lazy(() => import("./pages/MisEbooks"));
const GraciasCompra = lazy(() => import("./pages/GraciasCompra"));
const ShopifyGenres = lazy(() => import("./pages/admin/ShopifyGenres"));
const ProductClassifier = lazy(() => import("./pages/admin/ProductClassifier"));
const Autoedicion = lazy(() => import("./pages/Autoedicion"));
const DauroCiencia = lazy(() => import("./pages/DauroCiencia"));
const PresupuestadorCiencia = lazy(() => import("./pages/PresupuestadorCiencia"));
const PresupuestadorAutoedicion = lazy(() => import("./pages/PresupuestadorAutoedicion"));
const WebsDeLibrosIndex = lazy(() => import("./pages/WebsDeLibrosIndex"));
const WebsDeLibrosLeonardo = lazy(() => import("./pages/WebsDeLibrosLeonardo"));
const WebsDeLibrosLiderazgo = lazy(() => import("./pages/WebsDeLibrosLiderazgo"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <ExitIntentPopup />
          <WhatsAppFloatingButton />
          <FloatingAuthorCard />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-label="Cargando" /></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/grupo-dauro" element={<GrupoDauro />} />
            <Route path="/grupo-dauro/editorial" element={<Editorial />} />
            <Route path="/autoedicion" element={<Autoedicion />} />
            <Route path="/presupuestador" element={<PresupuestadorAutoedicion />} />
            <Route path="/webs-de-libros" element={<WebsDeLibrosIndex />} />
            <Route path="/webs-de-libros/carlos-blanco/leonardo-da-vinci" element={<WebsDeLibrosLeonardo />} />
            <Route path="/webs-de-libros/antonio-rodriguez/liderazgo-discursivo" element={<WebsDeLibrosLiderazgo />} />
            <Route path="/dauro-ciencia" element={<DauroCiencia />} />
            <Route path="/presupuestador-ciencia" element={<PresupuestadorCiencia />} />
            <Route path="/grupo-dauro/arte" element={<Arte />} />
            <Route path="/grupo-dauro/cine" element={<Cine />} />
            <Route path="/grupo-dauro/cine/:slug" element={<GuionSerie />} />
            <Route path="/grupo-dauro/musica" element={<Musica />} />
            <Route path="/grupo-dauro/ia" element={<IA />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/tienda/producto/:handle" element={<ProductDetail />} />
            <Route path="/producto/:handle" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/stats" element={<BlogStats />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/feed.xml" element={<RssFeed />} />
            <Route path="/rss.xml" element={<RssFeed />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/portafolio/lebrun-collection" element={<LeBrunCollection />} />
            <Route path="/portafolio/:slug" element={<ProjectDetail />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/solicitar-booktrailer" element={<SolicitarBooktrailer />} />
            <Route path="/solicitar-web" element={<SolicitarWeb />} />
            <Route path="/solicitar-proyecto" element={<SolicitarProyecto />} />
            <Route path="/solicitar-portada" element={<SolicitarPortada />} />
            <Route path="/generador-portadas" element={<GeneradorPortadas />} />
            <Route path="/artistas/solicitud" element={<SolicitarRepresentacion />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/gracias-dauro-ciencia" element={<GraciasDauroCiencia />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/compromiso-etico" element={<CompromisoEtico />} />
            <Route path="/archivo-historico" element={<ArchivoHistorico />} />
            <Route path="/mirlo-key" element={<DauroMirloKey />} />
            <Route path="/descargar-ebook" element={<DescargarEbook />} />
            <Route path="/mis-ebooks" element={<MisEbooks />} />
            <Route path="/gracias-compra" element={<GraciasCompra />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="dauro-arte" element={<DauroArteContacts />} />
              <Route path="editorial" element={<EditorialSubmissions />} />
              <Route path="servicios" element={<ServicesContacts />} />
              <Route path="blog-posts" element={<BlogPosts />} />
              <Route path="blog-posts/new" element={<BlogPostForm />} />
              <Route path="blog-posts/edit/:id" element={<BlogPostForm />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="projects/:id" element={<ProjectForm />} />
              <Route path="web-requests" element={<WebRequests />} />
              <Route path="booktrailer-requests" element={<BooktrailerRequests />} />
              <Route path="book-cover-requests" element={<BookCoverRequests />} />
              <Route path="portfolio-inquiries" element={<PortfolioInquiries />} />
              <Route path="image-seo" element={<ImageSeoManager />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="ai-monitoring" element={<AIMonitoring />} />
              <Route path="artist-submissions" element={<ArtistSubmissions />} />
              <Route path="catalog-products" element={<CatalogProducts />} />
              <Route path="ebooks" element={<ProductEbooks />} />
              <Route path="shopify-sync" element={<ShopifySync />} />
              <Route path="shopify-images" element={<ShopifyImages />} />
              <Route path="shopify-genres" element={<ShopifyGenres />} />
              <Route path="product-classifier" element={<ProductClassifier />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
