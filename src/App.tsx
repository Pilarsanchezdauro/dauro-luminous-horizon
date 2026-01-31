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
import Index from "./pages/Index";
import GrupoDauro from "./pages/GrupoDauro";
import Editorial from "./pages/Editorial";
import Arte from "./pages/Arte";
import Cine from "./pages/Cine";
import Musica from "./pages/Musica";
import IA from "./pages/IA";
import Servicios from "./pages/Servicios";
import Tienda from "./pages/Tienda";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogStats from "./pages/BlogStats";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import CompromisoEtico from "./pages/CompromisoEtico";
import ArchivoHistorico from "./pages/ArchivoHistorico";
import Gracias from "./pages/Gracias";
import GraciasDauroCiencia from "./pages/GraciasDauroCiencia";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DauroArteContacts from "./pages/admin/DauroArteContacts";
import EditorialSubmissions from "./pages/admin/EditorialSubmissions";
import ServicesContacts from "./pages/admin/ServicesContacts";
import BlogPosts from "./pages/admin/BlogPosts";
import BlogPostForm from "./pages/admin/BlogPostForm";
import RssFeed from "./pages/RssFeed";
import Portafolio from "./pages/Portafolio";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/admin/Projects";
import ProjectForm from "./pages/admin/ProjectForm";
import WebRequests from "./pages/admin/WebRequests";
import BooktrailerRequests from "./pages/admin/BooktrailerRequests";
import PortfolioInquiries from "./pages/admin/PortfolioInquiries";
import SolicitarBooktrailer from "./pages/SolicitarBooktrailer";
import SolicitarWeb from "./pages/SolicitarWeb";
import SolicitarProyecto from "./pages/SolicitarProyecto";
import SolicitarPortada from "./pages/SolicitarPortada";
import SolicitarRepresentacion from "./pages/SolicitarRepresentacion";
import GeneradorPortadas from "./pages/GeneradorPortadas";
import BookCoverRequests from "./pages/admin/BookCoverRequests";
import ImageSeoManager from "./pages/admin/ImageSeoManager";
import Analytics from "./pages/admin/Analytics";
import AIMonitoring from "./pages/admin/AIMonitoring";
import ArtistSubmissions from "./pages/admin/ArtistSubmissions";
import LeBrunCollection from "./pages/LeBrunCollection";
import DauroMirloKey from "./pages/DauroMirloKey";
import Catalogo from "./pages/Catalogo";
import CatalogProducts from "./pages/admin/CatalogProducts";
import ShopifySync from "./pages/admin/ShopifySync";
import ShopifyImages from "./pages/admin/ShopifyImages";
import ProductEbooks from "./pages/admin/ProductEbooks";
import DescargarEbook from "./pages/DescargarEbook";
import MisEbooks from "./pages/MisEbooks";
import GraciasCompra from "./pages/GraciasCompra";
import ShopifyGenres from "./pages/admin/ShopifyGenres";
import ProductClassifier from "./pages/admin/ProductClassifier";
import Autoedicion from "./pages/Autoedicion";
import DauroCiencia from "./pages/DauroCiencia";
import PresupuestadorCiencia from "./pages/PresupuestadorCiencia";
import PresupuestadorAutoedicion from "./pages/PresupuestadorAutoedicion";
import WebsDeLibrosIndex from "./pages/WebsDeLibrosIndex";
import WebsDeLibrosLeonardo from "./pages/WebsDeLibrosLeonardo";
import WebsDeLibrosLiderazgo from "./pages/WebsDeLibrosLiderazgo";

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
            <Route path="/grupo-dauro/musica" element={<Musica />} />
            <Route path="/grupo-dauro/ia" element={<IA />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:handle" element={<ProductDetail />} />
            <Route path="/tienda/producto/:handle" element={<ProductDetail />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
