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
import { Download, Trash2, ExternalLink } from 'lucide-react';

interface WebRequest {
  id: string;
  created_at: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  empresa: string | null;
  tipo_web: string;
  descripcion: string;
  funcionalidades: string | null;
  referencia_web: string | null;
  presupuesto: string | null;
  plazo: string | null;
  documento_file_path: string | null;
}

const tipoWebLabels: Record<string, string> = {
  corporativa: 'Web Corporativa',
  ecommerce: 'E-commerce',
  blog: 'Blog',
  portafolio: 'Portafolio',
  landing: 'Landing Page',
  aplicacion: 'Aplicación Web',
  otro: 'Otro',
};

export default function WebRequests() {
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['web-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('web_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WebRequest[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('web_requests').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web-requests'] });
      toast.success('Solicitud eliminada correctamente');
    },
    onError: (error) => {
      toast.error('Error al eliminar la solicitud');
      console.error('Error:', error);
    },
  });

  const downloadDocument = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('dauro-arte-documents')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'document';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Documento descargado');
    } catch (error) {
      toast.error('Error al descargar el documento');
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
          <h1 className="text-3xl font-bold">Solicitudes de Desarrollo Web</h1>
          <p className="text-muted-foreground">
            Gestiona las solicitudes de proyectos web
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
                      <Badge variant="secondary">
                        {tipoWebLabels[request.tipo_web] || request.tipo_web}
                      </Badge>
                      {request.empresa && (
                        <Badge variant="outline">{request.empresa}</Badge>
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
                  {(request.presupuesto || request.plazo) && (
                    <div>
                      <p className="font-semibold text-sm">Requisitos</p>
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
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Descripción</p>
                  <p className="text-sm text-muted-foreground">
                    {request.descripcion}
                  </p>
                </div>

                {request.funcionalidades && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Funcionalidades</p>
                    <p className="text-sm text-muted-foreground">
                      {request.funcionalidades}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {request.referencia_web && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={request.referencia_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver Referencia
                      </a>
                    </Button>
                  )}
                  {request.documento_file_path && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadDocument(request.documento_file_path!)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Documento
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No hay solicitudes de desarrollo web todavía
          </CardContent>
        </Card>
      )}
    </div>
  );
}