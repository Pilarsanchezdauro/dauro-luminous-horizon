import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const categoryLabels: Record<string, string> = {
  webs: 'Desarrollo Web',
  booktrailers: 'Booktrailers',
  cine: 'Cine y Audiovisual',
  avatares: 'Avatares y Personajes',
  pintura: 'Pintura y Arte Visual',
  'imagen-corporativa': 'Imagen Corporativa',
  musica: 'Música y Producción',
  otro: 'Otro Servicio',
};

export default function PortfolioInquiries() {
  const queryClient = useQueryClient();

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['portfolio-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('portfolio_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-inquiries'] });
      toast.success('Consulta eliminada');
    },
    onError: (error) => {
      console.error('Error deleting inquiry:', error);
      toast.error('Error al eliminar la consulta');
    },
  });

  if (isLoading) {
    return <div>Cargando consultas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Consultas de Portafolio</h2>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {inquiries?.length || 0} consultas
        </Badge>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries && inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    {new Date(inquiry.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell className="font-medium">
                    {inquiry.nombre} {inquiry.apellidos}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {inquiry.email}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {categoryLabels[inquiry.categoria] || inquiry.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>{inquiry.empresa || '-'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Detalles de la Consulta</DialogTitle>
                          <DialogDescription>
                            Recibida el {new Date(inquiry.created_at).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-1">Nombre</h4>
                              <p>{inquiry.nombre} {inquiry.apellidos}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Email</h4>
                              <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
                                {inquiry.email}
                              </a>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Teléfono</h4>
                              <a href={`tel:${inquiry.telefono}`} className="text-primary hover:underline">
                                {inquiry.telefono}
                              </a>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Empresa</h4>
                              <p>{inquiry.empresa || 'No especificada'}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Categoría</h4>
                              <Badge variant="outline">
                                {categoryLabels[inquiry.categoria] || inquiry.categoria}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Presupuesto</h4>
                              <p>{inquiry.presupuesto || 'No especificado'}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Plazo</h4>
                              <p>{inquiry.plazo || 'No especificado'}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Descripción del Proyecto</h4>
                            <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                              {inquiry.descripcion}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar consulta?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente la consulta
                            de {inquiry.nombre} {inquiry.apellidos}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(inquiry.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay consultas de portafolio
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
