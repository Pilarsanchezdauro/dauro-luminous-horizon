import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    dauroArte: 0,
    editorial: 0,
    servicios: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [dauroArte, editorial, servicios] = await Promise.all([
        supabase.from('dauro_arte_contacts').select('id', { count: 'exact', head: true }),
        supabase.from('editorial_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('services_contacts').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        dauroArte: dauroArte.count || 0,
        editorial: editorial.count || 0,
        servicios: servicios.count || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido al panel de administración de Grupo Dauro
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contactos DauroArte
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dauroArte}</div>
            <CardDescription>
              Solicitudes de consultoría artística
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Propuestas Editoriales
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.editorial}</div>
            <CardDescription>
              Manuscritos y propuestas recibidas
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contactos Servicios
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.servicios}</div>
            <CardDescription>
              Solicitudes de servicios
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
