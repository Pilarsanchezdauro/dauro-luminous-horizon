import type { BlogCategory, BlogPost as StaticBlogPost } from "@/data/blogData";

export type UiBlogPost = StaticBlogPost & {
  id?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  publishedAt?: string | null;
};

export type DbBlogPostRow = {
  id: string;
  created_at?: string;
  published_at: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[] | null;
  image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export const normalizeBlogCategory = (category?: string | null): BlogCategory => {
  const c = (category || "").toLowerCase().trim();

  if (c.includes("arte")) return "arte";
  if (c.includes("cine")) return "cine";
  if (c === "ia" || c.includes("inteligencia") || c.includes("i.a")) return "ia";
  if (c.includes("música") || c.includes("musica")) return "musica";
  if (c.includes("consej")) return "consejos";

  // "Novedades" y cualquier otra etiqueta editorial la mostramos dentro de Literatura
  return "literatura";
};

const capitalizeFirst = (text: string) =>
  text.length ? text.charAt(0).toUpperCase() + text.slice(1) : text;

export const formatSpanishDate = (iso?: string | null): string => {
  const date = iso ? new Date(iso) : new Date();

  const parts = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value || "";
  const month = capitalizeFirst(parts.find((p) => p.type === "month")?.value || "");
  const year = parts.find((p) => p.type === "year")?.value || "";

  // Formato consistente con los posts estáticos: "31 Diciembre 2025"
  return [day, month, year].filter(Boolean).join(" ");
};

export const mapDbPostToUiPost = (row: DbBlogPostRow): UiBlogPost => {
  const image = row.image_url || "/og-image.jpg";
  const category = normalizeBlogCategory(row.category);
  const date = formatSpanishDate(row.published_at || row.created_at || null);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author || "Grupo Dauro",
    category,
    date,
    image,
    ogImage: image,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    publishedAt: row.published_at,
  };
};
