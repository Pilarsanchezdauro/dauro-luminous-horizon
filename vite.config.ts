import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from "./scripts/vite-plugin-sitemap";
import { rssFeedPlugin } from "./scripts/vite-plugin-rss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && sitemapPlugin(),
    mode === "production" && rssFeedPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Partimos las librerías en trozos propios: se descargan en paralelo
        // y el navegador los guarda en caché entre páginas y entre despliegues
        // (React/Radix/Supabase cambian poco), así las visitas son más rápidas.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/scheduler/")
          )
            return "react-vendor";
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("lucide-react")) return "icons";
          // OJO: NO partir recharts/d3 ni jspdf/html2canvas — tienen dependencias
          // circulares y al separarlas se rompe el orden de inicialización
          // ("Cannot access ... before initialization"). Se quedan en el chunk
          // de la página que las usa (que ya es de carga diferida).
          // El resto lo decide Rollup.
        },
      },
    },
  },
}));
