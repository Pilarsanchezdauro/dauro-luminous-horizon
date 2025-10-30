import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  titulo_obra: string;
  tipo_obra: string;
  obra_file_path: string | null;
  curriculum_file_path: string | null;
  created_at: string;
}

export default function EditorialSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('editorial_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las propuestas',
        variant: 'destructive',
      });
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const downloadFile = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from('editorial-submissions')
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
        <h1 className="text-3xl font-bold">Propuestas Editoriales</h1>
        <p className="text-muted-foreground mt-2">
          Manuscritos y propuestas recibidas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total: {submissions.length} propuestas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Obra</TableHead>
                <TableHead>CV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    {new Date(submission.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>{submission.nombre} {submission.apellidos}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.titulo_obra}</TableCell>
                  <TableCell>{submission.tipo_obra}</TableCell>
                  <TableCell>
                    {submission.obra_file_path && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(submission.obra_file_path!)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {submission.curriculum_file_path && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(submission.curriculum_file_path!)}
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
