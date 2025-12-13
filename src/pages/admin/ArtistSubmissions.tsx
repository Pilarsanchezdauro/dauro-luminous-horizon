import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, ExternalLink, Download, Music, Palette, Camera, Theater, User } from "lucide-react";

interface ArtistSubmission {
  id: string;
  created_at: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  categoria_artistica: string;
  descripcion: string;
  experiencia_profesional: string | null;
  redes_sociales: Record<string, string | null> | null;
  web_personal: string | null;
  referencias: string | null;
  portfolio_file_path: string | null;
  curriculum_file_path: string | null;
}

const categoryIcons: Record<string, any> = {
  cantante: Music,
  pintor: Palette,
  fotografo: Camera,
  actor: Theater,
  otro: User,
};

const categoryLabels: Record<string, string> = {
  cantante: "Cantante / Músico",
  pintor: "Pintor / Artista Visual",
  fotografo: "Fotógrafo",
  actor: "Actor / Intérprete",
  otro: "Otra disciplina",
};

export default function ArtistSubmissions() {
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["artist-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artist_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ArtistSubmission[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("artist_submissions")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-submissions"] });
      toast.success("Solicitud eliminada");
    },
    onError: () => {
      toast.error("Error al eliminar la solicitud");
    },
  });

  const getFileUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage
      .from("artist-submissions")
      .getPublicUrl(path);
    return data.publicUrl;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Solicitudes de Artistas</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solicitudes de Artistas</h1>
        <Badge variant="secondary">{submissions?.length || 0} solicitudes</Badge>
      </div>

      {submissions && submissions.length > 0 ? (
        <div className="grid gap-4">
          {submissions.map((submission) => {
            const Icon = categoryIcons[submission.categoria_artistica] || User;
            return (
              <Card key={submission.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {submission.nombre} {submission.apellidos}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {categoryLabels[submission.categoria_artistica] ||
                            submission.categoria_artistica}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString("es-ES")}
                      </span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar solicitud?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(submission.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                        {submission.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teléfono:</span>{" "}
                      <a href={`tel:${submission.telefono}`} className="hover:underline">
                        {submission.telefono}
                      </a>
                    </div>
                    {submission.web_personal && (
                      <div>
                        <span className="text-muted-foreground">Web:</span>{" "}
                        <a
                          href={submission.web_personal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Ver web <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Descripción</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.descripcion}
                    </p>
                  </div>

                  {submission.experiencia_profesional && (
                    <div>
                      <h4 className="font-medium mb-1">Experiencia profesional</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {submission.experiencia_profesional}
                      </p>
                    </div>
                  )}

                  {submission.redes_sociales && Object.values(submission.redes_sociales).some(Boolean) && (
                    <div>
                      <h4 className="font-medium mb-2">Redes sociales</h4>
                      <div className="flex flex-wrap gap-2">
                        {submission.redes_sociales.instagram && (
                          <Badge variant="secondary">IG: {submission.redes_sociales.instagram}</Badge>
                        )}
                        {submission.redes_sociales.youtube && (
                          <a
                            href={submission.redes_sociales.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                              YouTube <ExternalLink className="h-3 w-3 ml-1" />
                            </Badge>
                          </a>
                        )}
                        {submission.redes_sociales.spotify && (
                          <a
                            href={submission.redes_sociales.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                              Spotify <ExternalLink className="h-3 w-3 ml-1" />
                            </Badge>
                          </a>
                        )}
                        {submission.redes_sociales.otras && (
                          <Badge variant="secondary">{submission.redes_sociales.otras}</Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {submission.referencias && (
                    <div>
                      <h4 className="font-medium mb-1">Referencias</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {submission.referencias}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    {submission.portfolio_file_path && (
                      <a
                        href={getFileUrl(submission.portfolio_file_path) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar Portfolio
                        </Button>
                      </a>
                    )}
                    {submission.curriculum_file_path && (
                      <a
                        href={getFileUrl(submission.curriculum_file_path) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar CV
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No hay solicitudes de artistas todavía</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
