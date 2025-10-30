import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import GrupoDauro from "./pages/GrupoDauro";
import Editorial from "./pages/Editorial";
import Arte from "./pages/Arte";
import Cine from "./pages/Cine";
import IA from "./pages/IA";
import Servicios from "./pages/Servicios";
import Tienda from "./pages/Tienda";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/grupo-dauro/ia" element={<IA />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/libros" element={<Tienda />} />
            <Route path="/tienda/arte" element={<Tienda />} />
            <Route path="/tienda/musica" element={<Tienda />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="dauro-arte" element={<DauroArteContacts />} />
              <Route path="editorial" element={<EditorialSubmissions />} />
              <Route path="servicios" element={<ServicesContacts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
