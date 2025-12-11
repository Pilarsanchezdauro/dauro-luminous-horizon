import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Activity, Clock, Zap, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, subHours, startOfHour } from 'date-fns';
import { es } from 'date-fns/locale';

interface RateLimitRecord {
  id: string;
  ip_address: string;
  function_name: string;
  request_count: number;
  window_start: string;
  created_at: string;
}

interface FunctionStats {
  name: string;
  totalRequests: number;
  uniqueIPs: number;
  avgRequestsPerIP: number;
}

const FUNCTION_COLORS: Record<string, string> = {
  'qa-interno': '#3b82f6',
  'qa-externo': '#8b5cf6',
  'audio-sinopsis': '#10b981',
  'generate-book-cover': '#f59e0b',
};

const FUNCTION_LIMITS: Record<string, number> = {
  'qa-interno': 10,
  'qa-externo': 10,
  'audio-sinopsis': 5,
  'generate-book-cover': 3,
};

export default function AIMonitoring() {
  const [records, setRecords] = useState<RateLimitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ai_rate_limits')
      .select('*')
      .gte('window_start', subHours(new Date(), 24).toISOString())
      .order('window_start', { ascending: false });

    if (!error && data) {
      setRecords(data);
    }
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Calculate function stats
  const functionStats: FunctionStats[] = ['qa-interno', 'qa-externo', 'audio-sinopsis', 'generate-book-cover'].map(name => {
    const fnRecords = records.filter(r => r.function_name === name);
    const uniqueIPs = new Set(fnRecords.map(r => r.ip_address)).size;
    const totalRequests = fnRecords.reduce((acc, r) => acc + r.request_count, 0);
    return {
      name,
      totalRequests,
      uniqueIPs,
      avgRequestsPerIP: uniqueIPs > 0 ? Math.round(totalRequests / uniqueIPs * 10) / 10 : 0,
    };
  });

  // Hourly distribution for line chart
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = subHours(startOfHour(new Date()), 23 - i);
    const hourRecords = records.filter(r => {
      const recordHour = startOfHour(new Date(r.window_start));
      return recordHour.getTime() === hour.getTime();
    });
    return {
      hour: format(hour, 'HH:mm', { locale: es }),
      requests: hourRecords.reduce((acc, r) => acc + r.request_count, 0),
    };
  });

  // Pie chart data
  const pieData = functionStats.filter(f => f.totalRequests > 0).map(f => ({
    name: f.name,
    value: f.totalRequests,
  }));

  // Top IPs
  const ipCounts = records.reduce((acc, r) => {
    acc[r.ip_address] = (acc[r.ip_address] || 0) + r.request_count;
    return acc;
  }, {} as Record<string, number>);

  const topIPs = Object.entries(ipCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([ip, count]) => ({ ip: ip.substring(0, 15) + (ip.length > 15 ? '...' : ''), count }));

  // Recent activity
  const recentRecords = records.slice(0, 10);

  const totalRequests = functionStats.reduce((acc, f) => acc + f.totalRequests, 0);
  const totalUniqueIPs = new Set(records.map(r => r.ip_address)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monitoreo de IA</h1>
          <p className="text-muted-foreground">
            Estadísticas de uso de las funciones de IA en las últimas 24 horas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Actualizado: {format(lastUpdated, 'HH:mm:ss', { locale: es })}
          </span>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">últimas 24 horas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IPs Únicos</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUniqueIPs}</div>
            <p className="text-xs text-muted-foreground">usuarios distintos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Función más usada</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {functionStats.sort((a, b) => b.totalRequests - a.totalRequests)[0]?.name || '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {functionStats.sort((a, b) => b.totalRequests - a.totalRequests)[0]?.totalRequests || 0} solicitudes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros Activos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground">en base de datos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Requests by Function */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes por Función</CardTitle>
            <CardDescription>Distribución de uso por tipo de función</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={functionStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalRequests" name="Solicitudes">
                    {functionStats.map((entry) => (
                      <Cell key={entry.name} fill={FUNCTION_COLORS[entry.name] || '#8884d8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Uso</CardTitle>
            <CardDescription>Porcentaje por función</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={FUNCTION_COLORS[entry.name] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No hay datos disponibles
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad por Hora</CardTitle>
          <CardDescription>Solicitudes en las últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rate Limits Info */}
        <Card>
          <CardHeader>
            <CardTitle>Límites Configurados</CardTitle>
            <CardDescription>Solicitudes máximas por minuto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(FUNCTION_LIMITS).map(([name, limit]) => {
                const stats = functionStats.find(f => f.name === name);
                return (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: FUNCTION_COLORS[name] }} 
                      />
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">{limit} req/min</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({stats?.uniqueIPs || 0} IPs)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top IPs */}
        <Card>
          <CardHeader>
            <CardTitle>IPs más Activos</CardTitle>
            <CardDescription>Usuarios con más solicitudes</CardDescription>
          </CardHeader>
          <CardContent>
            {topIPs.length > 0 ? (
              <div className="space-y-3">
                {topIPs.map((item, index) => (
                  <div key={item.ip} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-5">{index + 1}.</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{item.ip}</code>
                    </div>
                    <span className="font-medium">{item.count} solicitudes</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                No hay datos disponibles
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas solicitudes registradas</CardDescription>
        </CardHeader>
        <CardContent>
          {recentRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Función</th>
                    <th className="text-left py-2 px-2">IP</th>
                    <th className="text-left py-2 px-2">Solicitudes</th>
                    <th className="text-left py-2 px-2">Inicio Ventana</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRecords.map((record) => (
                    <tr key={record.id} className="border-b border-muted">
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: FUNCTION_COLORS[record.function_name] || '#888' }} 
                          />
                          {record.function_name}
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <code className="bg-muted px-1 rounded text-xs">
                          {record.ip_address.substring(0, 20)}...
                        </code>
                      </td>
                      <td className="py-2 px-2">{record.request_count}</td>
                      <td className="py-2 px-2 text-muted-foreground">
                        {format(new Date(record.window_start), 'dd/MM HH:mm', { locale: es })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No hay actividad reciente
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
