import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Download, Trash2 } from 'lucide-react';

interface BooktrailerRequest {
  id: string;
  created_at: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  titulo_libro: string;
  autor: string;
  genero: string | null;
  sinopsis: string;
  tono: string | null;
  elementos_visuales: string | null;
  referencias: string | null;
  presupuesto: string | null;
  plazo: string | null;
  imagen_portada_path: string | null;
  material_adicional_paths: string[] | null;
}

export default function BooktrailerRequests() {
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['booktrailer-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booktrailer_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BooktrailerRequest[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('booktrailer_requests').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booktrailer-requests'] });
      toast.success('Solicitud eliminada correctamente');
    },
    onError: (error) => {
      toast.error('Error al eliminar la solicitud');
      console.error('Error:', error);
    },
  });

  const downloadFile = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('booktrailer-files')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Archivo descargado');
    } catch (error) {
      toast.error('Error al descargar el archivo');
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <div className="p-8">Cargando solicitudes...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Solicitudes de Booktrailer</h1>
          <p className="text-muted-foreground">
            Gestiona las solicitudes de booktrailers
          </p>
        </div>
      </div>

      {requests && requests.length > 0 ? (
        <div className="grid gap-6">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle>
                      {request.nombre} {request.apellidos}
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary">{request.titulo_libro}</Badge>
                      {request.genero && (
                        <Badge variant="outline">{request.genero}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
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
                          onClick={() => deleteMutation.mutate(request.id)}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-sm">Contacto</p>
                    <p className="text-sm">{request.email}</p>
                    <p className="text-sm">{request.telefono}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Libro</p>
                    <p className="text-sm">
                      <span className="font-medium">Autor:</span> {request.autor}
                    </p>
                    {(request.presupuesto || request.plazo) && (
                      <>
                        {request.presupuesto && (
                          <p className="text-sm">
                            <span className="font-medium">Presupuesto:</span>{' '}
                            {request.presupuesto}
                          </p>
                        )}
                        {request.plazo && (
                          <p className="text-sm">
                            <span className="font-medium">Plazo:</span> {request.plazo}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Sinopsis</p>
                  <p className="text-sm text-muted-foreground">{request.sinopsis}</p>
                </div>

                {request.tono && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Tono</p>
                    <p className="text-sm text-muted-foreground">{request.tono}</p>
                  </div>
                )}

                {request.elementos_visuales && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Elementos Visuales</p>
                    <p className="text-sm text-muted-foreground">
                      {request.elementos_visuales}
                    </p>
                  </div>
                )}

                {request.referencias && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Referencias</p>
                    <p className="text-sm text-muted-foreground">
                      {request.referencias}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {request.imagen_portada_path && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(request.imagen_portada_path!)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Portada
                    </Button>
                  )}
                  {request.material_adicional_paths &&
                    request.material_adicional_paths.length > 0 && (
                      <>
                        {request.material_adicional_paths.map((path, index) => (
                          <Button
                            key={path}
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(path)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Material {index + 1}
                          </Button>
                        ))}
                      </>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No hay solicitudes de booktrailers todavía
          </CardContent>
        </Card>
      )}
    </div>
  );
}