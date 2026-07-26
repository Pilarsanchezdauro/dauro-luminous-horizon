import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HEMEROTECA_CATEGORY } from "@/lib/blog";

export const HEMEROTECA_POR_PAGINA = 24;

export type HemerotecaItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string | null;
  image_url: string | null;
  tags: string[] | null;
};

export type HemerotecaFiltros = {
  busqueda: string;
  anio: string | null;
  pagina: number;
};

/**
 * Artículos del archivo histórico, paginados desde el servidor.
 *
 * Son más de mil seiscientos y cada uno lleva su texto completo: traerlos
 * todos de una vez descargaría varios megas en el navegador de quien entre.
 * Por eso aquí se pide solo la página que se está viendo y sin el campo
 * `content`, que únicamente hace falta al abrir el artículo.
 */
export const useHemerotecaPosts = ({ busqueda, anio, pagina }: HemerotecaFiltros) => {
  return useQuery({
    queryKey: ["hemeroteca", busqueda, anio, pagina],
    queryFn: async () => {
      const desde = (pagina - 1) * HEMEROTECA_POR_PAGINA;

      let consulta = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, image_url, tags", { count: "exact" })
        .eq("status", "published")
        .eq("category", HEMEROTECA_CATEGORY);

      if (busqueda.trim()) {
        // Escapamos los comodines para que un % escrito por la persona
        // busque un % y no "cualquier cosa".
        const termino = busqueda.trim().replace(/[%_]/g, "\\$&");
        consulta = consulta.ilike("title", `%${termino}%`);
      }

      if (anio) {
        consulta = consulta
          .gte("published_at", `${anio}-01-01`)
          .lt("published_at", `${Number(anio) + 1}-01-01`);
      }

      const { data, error, count } = await consulta
        .order("published_at", { ascending: false })
        .range(desde, desde + HEMEROTECA_POR_PAGINA - 1);

      if (error) throw error;

      return {
        articulos: (data ?? []) as HemerotecaItem[],
        total: count ?? 0,
      };
    },
    staleTime: 60_000,
  });
};
