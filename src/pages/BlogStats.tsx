import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye, BookOpen, Share2, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";

interface BlogStats {
  totalViews: number;
  totalReads: number;
  totalShares: number;
  topPosts: Array<{
    title: string;
    slug: string;
    views: number;
    reads: number;
  }>;
  categoryTrends: Array<{
    category: string;
    count: number;
  }>;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function BlogStats() {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  useEffect(() => {
    fetchBlogStats();
  }, [timeRange]);

  const fetchBlogStats = async () => {
    setLoading(true);
    try {
      const now = new Date();
      let startDate = new Date(0); // All time by default
      
      if (timeRange === "7d") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (timeRange === "30d") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      // Fetch all blog analytics events
      const { data: events, error: eventsError } = await supabase
        .from("analytics_events")
        .select("*")
        .eq("event_category", "blog")
        .gte("created_at", startDate.toISOString());

      if (eventsError) throw eventsError;

      // Calculate total metrics
      const totalViews = events?.filter(e => e.event_name === "post_viewed").length || 0;
      const totalReads = events?.filter(e => e.event_name === "post_read").length || 0;
      const totalShares = events?.filter(e => e.event_name === "post_shared").length || 0;

      // Get post views and reads by slug
      const postMetrics = new Map<string, { views: number; reads: number }>();
      
      events?.forEach(event => {
        const metadata = event.metadata as Record<string, any> | null;
        const slug = metadata?.slug;
        if (!slug) return;
        
        if (!postMetrics.has(slug)) {
          postMetrics.set(slug, { views: 0, reads: 0 });
        }
        
        const metrics = postMetrics.get(slug)!;
        if (event.event_name === "post_viewed") {
          metrics.views++;
        } else if (event.event_name === "post_read") {
          metrics.reads++;
        }
      });

      // Fetch post details for top posts
      const topSlugs = Array.from(postMetrics.entries())
        .sort((a, b) => b[1].views - a[1].views)
        .slice(0, 10)
        .map(([slug]) => slug);

      const { data: posts, error: postsError } = await supabase
        .from("blog_posts")
        .select("title, slug, category")
        .in("slug", topSlugs)
        .eq("status", "published");

      if (postsError) throw postsError;

      // Create top posts array with complete data
      const topPosts = topSlugs
        .map(slug => {
          const post = posts?.find(p => p.slug === slug);
          const metrics = postMetrics.get(slug)!;
          return post ? {
            title: post.title,
            slug: post.slug,
            views: metrics.views,
            reads: metrics.reads,
          } : null;
        })
        .filter(Boolean) as BlogStats["topPosts"];

      // Calculate category trends
      const categoryMap = new Map<string, number>();
      
      events?.forEach(event => {
        const metadata = event.metadata as Record<string, any> | null;
        const category = metadata?.category;
        if (category && event.event_name === "post_viewed") {
          categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
        }
      });

      const categoryTrends = Array.from(categoryMap.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

      setStats({
        totalViews,
        totalReads,
        totalShares,
        topPosts,
        categoryTrends,
      });
    } catch (error) {
      console.error("Error fetching blog stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const readRate = stats ? (stats.totalReads / Math.max(stats.totalViews, 1) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Estadísticas del Blog - Grupo Dauro"
        description="Descubre las publicaciones más leídas, tendencias de categorías y métricas de engagement del blog de Grupo Dauro."
        url="https://grupodauro.com/blog/stats"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Estadísticas del Blog</h1>
          <p className="text-muted-foreground">
            Descubre las publicaciones más populares y tendencias de nuestro blog
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === "7d"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Últimos 7 días
          </button>
          <button
            onClick={() => setTimeRange("30d")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === "30d"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Últimos 30 días
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Todo el tiempo
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stats?.totalViews.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lecturas Completas</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stats?.totalReads.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compartidos</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stats?.totalShares.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Lectura</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{readRate}%</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Posts Más Leídos</CardTitle>
              <CardDescription>Las publicaciones con más visualizaciones</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : stats?.topPosts && stats.topPosts.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={stats.topPosts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="title" 
                      angle={-45}
                      textAnchor="end"
                      height={120}
                      interval={0}
                      tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--foreground))" }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="views" name="Vistas" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="reads" name="Lecturas" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">No hay datos disponibles</p>
              )}
            </CardContent>
          </Card>

          {/* Category Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencias por Categoría</CardTitle>
              <CardDescription>Distribución de vistas por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : stats?.categoryTrends && stats.categoryTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={stats.categoryTrends}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) => 
                        `${category}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.categoryTrends.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">No hay datos disponibles</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Posts List */}
        {!loading && stats?.topPosts && stats.topPosts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Ranking Detallado</CardTitle>
              <CardDescription>Lista completa de posts más populares</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topPosts.map((post, index) => (
                  <div 
                    key={post.slug}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-2xl font-bold text-muted-foreground w-8 flex-shrink-0">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <a 
                          href={`/blog/${post.slug}`}
                          className="font-medium hover:text-primary transition-colors truncate block"
                        >
                          {post.title}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{post.views}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{post.reads}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
