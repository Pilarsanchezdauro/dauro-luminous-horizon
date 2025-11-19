import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, MessageSquare, FileText, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_category: string;
  event_name: string;
  metadata: any;
  created_at: string;
  session_id: string;
  user_id: string | null;
}

interface MetricCard {
  title: string;
  value: number;
  icon: any;
  description: string;
}

export default function Analytics() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      const ranges = {
        "24h": new Date(now.getTime() - 24 * 60 * 60 * 1000),
        "7d": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        "30d": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      };

      const { data, error } = await supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", ranges[timeRange].toISOString())
        .order("created_at", { ascending: false })
        .limit(500);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMetrics = (): MetricCard[] => {
    const aiInteractions = events.filter(e => e.event_type === "ai_interaction");
    const formSubmissions = events.filter(e => e.event_type === "form_submission");
    const blogEngagement = events.filter(e => e.event_type === "blog_engagement");
    const uniqueSessions = new Set(events.map(e => e.session_id)).size;

    return [
      {
        title: "Interacciones IA",
        value: aiInteractions.length,
        icon: MessageSquare,
        description: "Consultas al asistente",
      },
      {
        title: "Formularios",
        value: formSubmissions.filter(e => !e.event_name.includes("error")).length,
        icon: FileText,
        description: "Conversiones exitosas",
      },
      {
        title: "Blog Engagement",
        value: blogEngagement.length,
        icon: TrendingUp,
        description: "Lecturas y compartidos",
      },
      {
        title: "Sesiones Únicas",
        value: uniqueSessions,
        icon: Users,
        description: "Visitantes únicos",
      },
    ];
  };

  const getAIMetrics = () => {
    const aiEvents = events.filter(e => e.event_type === "ai_interaction");
    const queryCompleted = aiEvents.filter(e => e.event_name === "query_completed");
    const avgResponseLength = queryCompleted.length > 0
      ? Math.round(queryCompleted.reduce((sum, e) => sum + (e.metadata?.response_length || 0), 0) / queryCompleted.length)
      : 0;

    return {
      totalQueries: queryCompleted.length,
      avgResponseLength,
      withSources: queryCompleted.filter(e => e.metadata?.has_sources).length,
      fromCache: queryCompleted.filter(e => e.metadata?.from_cache).length,
      audioPlays: aiEvents.filter(e => e.event_name === "audio_played").length,
      errors: aiEvents.filter(e => e.event_name === "query_error").length,
    };
  };

  const getFormMetrics = () => {
    const formEvents = events.filter(e => e.event_type === "form_submission");
    const byForm: Record<string, number> = {};
    
    formEvents.forEach(e => {
      const formName = e.event_name.replace("_error", "");
      if (!e.event_name.includes("error")) {
        byForm[formName] = (byForm[formName] || 0) + 1;
      }
    });

    return {
      total: formEvents.filter(e => !e.event_name.includes("error")).length,
      errors: formEvents.filter(e => e.event_name.includes("error")).length,
      byForm,
    };
  };

  const getBlogMetrics = () => {
    const blogEvents = events.filter(e => e.event_type === "blog_engagement");
    const postViews = blogEvents.filter(e => e.event_name === "post_viewed");
    const postReads = blogEvents.filter(e => e.event_name === "post_read");
    const postShares = blogEvents.filter(e => e.event_name === "post_shared");

    const avgReadingTime = postReads.length > 0
      ? Math.round(postReads.reduce((sum, e) => sum + (e.metadata?.reading_time_seconds || 0), 0) / postReads.length)
      : 0;

    return {
      views: postViews.length,
      reads: postReads.length,
      shares: postShares.length,
      avgReadingTime,
      readRate: postViews.length > 0 ? Math.round((postReads.length / postViews.length) * 100) : 0,
    };
  };

  const metrics = getMetrics();
  const aiMetrics = getAIMetrics();
  const formMetrics = getFormMetrics();
  const blogMetrics = getBlogMetrics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Métricas de uso del asistente IA, formularios y blog
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant={timeRange === "24h" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTimeRange("24h")}
          >
            24 horas
          </Badge>
          <Badge
            variant={timeRange === "7d" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTimeRange("7d")}
          >
            7 días
          </Badge>
          <Badge
            variant={timeRange === "30d" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTimeRange("30d")}
          >
            30 días
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ai">Asistente IA</TabsTrigger>
          <TabsTrigger value="forms">Formularios</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="events">Eventos Recientes</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Consultas Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{aiMetrics.totalQueries}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Errores: {aiMetrics.errors}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Respuestas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{aiMetrics.avgResponseLength}</div>
                <p className="text-sm text-muted-foreground mt-2">Caracteres promedio</p>
                <p className="text-sm text-muted-foreground">
                  Con fuentes: {aiMetrics.withSources}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{aiMetrics.audioPlays}</div>
                <p className="text-sm text-muted-foreground mt-2">Reproducciones</p>
                <p className="text-sm text-muted-foreground">
                  Desde caché: {aiMetrics.fromCache}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formMetrics.total}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Errores: {formMetrics.errors}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Por Formulario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(formMetrics.byForm).map(([form, count]) => (
                    <div key={form} className="flex justify-between">
                      <span className="text-sm">{form.replace(/_/g, " ")}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Vistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{blogMetrics.views}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Tasa de lectura: {blogMetrics.readRate}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lecturas Completas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{blogMetrics.reads}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Tiempo promedio: {Math.floor(blogMetrics.avgReadingTime / 60)}:{(blogMetrics.avgReadingTime % 60).toString().padStart(2, '0')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compartidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{blogMetrics.shares}</div>
                <p className="text-sm text-muted-foreground mt-2">En redes sociales</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Eventos Recientes</CardTitle>
              <CardDescription>Últimos {events.length} eventos registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Metadata</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.slice(0, 50).map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-xs">
                        {format(new Date(event.created_at), "dd/MM HH:mm", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.event_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{event.event_category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{event.event_name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                        {event.metadata && JSON.stringify(event.metadata).substring(0, 50)}...
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
