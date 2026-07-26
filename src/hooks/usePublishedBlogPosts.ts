import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HEMEROTECA_CATEGORY, mapDbPostToUiPost, type DbBlogPostRow, type UiBlogPost } from "@/lib/blog";

export const usePublishedBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts", "published"],
    queryFn: async (): Promise<UiBlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, created_at, published_at, title, slug, excerpt, content, author, category, tags, image_url, meta_title, meta_description"
        )
        .eq("status", "published")
        // La hemeroteca (el archivo del blog antiguo de WordPress) tiene su
        // propia página: si entrara aquí, sus 1.600 artículos sepultarían al
        // blog actual.
        .neq("category", HEMEROTECA_CATEGORY)
        .order("published_at", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) throw error;
      return (data as unknown as DbBlogPostRow[]).map(mapDbPostToUiPost);
    },
    staleTime: 60_000,
  });
};
