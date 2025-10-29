export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug?: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "El futuro de la edición literaria en la era digital",
    excerpt:
      "Reflexiones sobre cómo la tecnología está transformando la manera en que creamos, distribuimos y consumimos literatura.",
    date: "15 Enero 2025",
    author: "Equipo Dauro",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
  },
  {
    title: "Arte contemporáneo y nuevas narrativas visuales",
    excerpt:
      "Un recorrido por las tendencias actuales del arte contemporáneo y cómo los artistas están redefiniendo los límites de la expresión visual.",
    date: "10 Enero 2025",
    author: "María González",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
  },
  {
    title: "La inteligencia artificial como herramienta creativa",
    excerpt:
      "Exploramos cómo la IA está abriendo nuevas posibilidades en los procesos creativos sin sustituir la esencia humana del arte.",
    date: "5 Enero 2025",
    author: "Carlos Ruiz",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
];

export const getLatestPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};
