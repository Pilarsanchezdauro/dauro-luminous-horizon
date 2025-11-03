import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Download } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

interface BookCoverRequest {
  id: string;
  created_at: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  titulo_libro: string;
  autor: string;
  genero: string | null;
  dimensiones: string | null;
  estilo_preferido: string | null;
  descripcion: string;
  referencia_visual_path: string | null;
  presupuesto: string | null;
  plazo: string | null;
}

export default function BookCoverRequests() {
  const { data: requests, isLoading } = useQuery({
    queryKey: ['book-cover-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('book_cover_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BookCoverRequest[];
    },
  });

  const downloadFile = async (path: string) => {
    const { data, error } = await supabase.storage
      .from('booktrailer-files')
      .download(path);

    if (error) {
      console.error('Error downloading file:', error);
      return;
    }

    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = path.split('/').pop() || 'file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Solicitudes de Portadas</h1>
          <p className="text-muted-foreground">Gestiona las solicitudes de diseño de portadas</p>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Solicitudes de Portadas</h1>
        <p className="text-muted-foreground">
          {requests?.length || 0} solicitudes de diseño de portadas
        </p>
      </div>

      {requests && requests.length > 0 ? (
        <div className="grid gap-6">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">{request.titulo_libro}</CardTitle>
                    <CardDescription>
                      por {request.autor} • {request.nombre} {request.apellidos}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {format(new Date(request.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Teléfono</p>
                    <p className="text-sm text-muted-foreground">{request.telefono}</p>
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-3">
                  {request.genero && (
                    <div>
                      <p className="text-sm font-medium mb-1">Género</p>
                      <Badge variant="secondary">{request.genero}</Badge>
                    </div>
                  )}

                  {request.dimensiones && (
                    <div>
                      <p className="text-sm font-medium mb-1">Dimensiones / Formato</p>
                      <p className="text-sm text-muted-foreground">{request.dimensiones}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-1">Descripción del libro</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {request.descripcion}
                    </p>
                  </div>

                  {request.estilo_preferido && (
                    <div>
                      <p className="text-sm font-medium mb-1">Estilo preferido</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {request.estilo_preferido}
                      </p>
                    </div>
                  )}

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-2 gap-4">
                    {request.presupuesto && (
                      <div>
                        <p className="text-sm font-medium mb-1">Presupuesto</p>
                        <Badge variant="outline">{request.presupuesto}</Badge>
                      </div>
                    )}
                    {request.plazo && (
                      <div>
                        <p className="text-sm font-medium mb-1">Plazo</p>
                        <Badge variant="outline">{request.plazo}</Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reference Image */}
                {request.referencia_visual_path && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Imagen de referencia</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(request.referencia_visual_path!)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar referencia
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center">
              No hay solicitudes de portadas aún
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
