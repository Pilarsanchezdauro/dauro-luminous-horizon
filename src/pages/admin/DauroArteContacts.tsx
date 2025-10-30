import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  servicio: string;
  descripcion: string;
  enlace_web: string | null;
  documento_file_path: string | null;
  created_at: string;
}

export default function DauroArteContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('dauro_arte_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los contactos',
        variant: 'destructive',
      });
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const downloadFile = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from('dauro-arte-documents')
      .download(filePath);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo descargar el archivo',
        variant: 'destructive',
      });
      return;
    }

    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'documento';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="flex justify-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contactos DauroArte</h1>
        <p className="text-muted-foreground mt-2">
          Solicitudes de consultoría artística recibidas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total: {contacts.length} contactos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Web</TableHead>
                <TableHead>Documento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    {new Date(contact.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>{contact.nombre} {contact.apellidos}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.telefono}</TableCell>
                  <TableCell>{contact.servicio}</TableCell>
                  <TableCell>
                    {contact.enlace_web && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(contact.enlace_web!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {contact.documento_file_path && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(contact.documento_file_path!)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
