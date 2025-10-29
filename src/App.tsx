import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GrupoDauro from "./pages/GrupoDauro";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
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
          <Route path="/grupo-dauro/editorial" element={<GrupoDauro />} />
          <Route path="/grupo-dauro/arte" element={<GrupoDauro />} />
          <Route path="/grupo-dauro/cine" element={<GrupoDauro />} />
          <Route path="/grupo-dauro/ia" element={<GrupoDauro />} />
          <Route path="/servicios" element={<GrupoDauro />} />
          <Route path="/servicios/editoriales" element={<GrupoDauro />} />
          <Route path="/servicios/musicales" element={<GrupoDauro />} />
          <Route path="/servicios/cine" element={<GrupoDauro />} />
          <Route path="/servicios/arte" element={<GrupoDauro />} />
          <Route path="/tienda" element={<GrupoDauro />} />
          <Route path="/tienda/libros" element={<GrupoDauro />} />
          <Route path="/tienda/arte" element={<GrupoDauro />} />
          <Route path="/tienda/musica" element={<GrupoDauro />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
