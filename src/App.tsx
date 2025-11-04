import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HelmetProvider } from "react-helmet-async";
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
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import Gracias from "./pages/Gracias";
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
import GeneradorPortadas from "./pages/GeneradorPortadas";
import BookCoverRequests from "./pages/admin/BookCoverRequests";
import ImageSeoManager from "./pages/admin/ImageSeoManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/grupo-dauro" element={<GrupoDauro />} />
            <Route path="/grupo-dauro/editorial" element={<Editorial />} />
            <Route path="/grupo-dauro/arte" element={<Arte />} />
            <Route path="/grupo-dauro/cine" element={<Cine />} />
            <Route path="/grupo-dauro/musica" element={<Musica />} />
            <Route path="/grupo-dauro/ia" element={<IA />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/producto/:handle" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/feed.xml" element={<RssFeed />} />
            <Route path="/rss.xml" element={<RssFeed />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/portafolio/:slug" element={<ProjectDetail />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/solicitar-booktrailer" element={<SolicitarBooktrailer />} />
            <Route path="/solicitar-web" element={<SolicitarWeb />} />
            <Route path="/solicitar-proyecto" element={<SolicitarProyecto />} />
            <Route path="/solicitar-portada" element={<SolicitarPortada />} />
            <Route path="/generador-portadas" element={<GeneradorPortadas />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
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
