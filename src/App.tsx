import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
