import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const projectSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  slug: z.string().min(1, 'El slug es obligatorio'),
  category: z.enum(['youtube', 'web', 'imagen', 'guion']),
  client: z.string().optional(),
  year: z.coerce.number().optional(),
  summary: z.string().min(1, 'El resumen es obligatorio'),
  description: z.string().optional(),
  main_image_url: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [links, setLinks] = useState<Array<{ url: string; label: string }>>([]);
  const [newLink, setNewLink] = useState({ url: '', label: '' });

  const { data: project } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      
      // Load arrays
      if (data.services) setServices(data.services);
      if (data.tags) setTags(data.tags);
      if (data.links) setLinks(data.links as Array<{ url: string; label: string }>);
      
      return data;
    },
    enabled: isEditing,
  });

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'web',
      client: '',
      summary: '',
      description: '',
      main_image_url: '',
      published: false,
      featured: false,
    },
    values: project ? {
      title: project.title,
      slug: project.slug,
      category: project.category as 'youtube' | 'web' | 'imagen' | 'guion',
      client: project.client || '',
      year: project.year || undefined,
      summary: project.summary,
      description: project.description || '',
      main_image_url: project.main_image_url || '',
      published: project.published,
      featured: project.featured,
    } : undefined,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const projectData = {
        title: data.title,
        slug: data.slug,
        category: data.category,
        client: data.client || null,
        year: data.year || null,
        summary: data.summary,
        description: data.description || null,
        main_image_url: data.main_image_url || null,
        published: data.published,
        featured: data.featured,
        services,
        tags,
        links,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success(isEditing ? 'Proyecto actualizado' : 'Proyecto creado');
      navigate('/admin/projects');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al guardar el proyecto');
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    saveMutation.mutate(data);
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/admin/projects')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a proyectos
      </Button>

      <div>
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (!isEditing) {
                            form.setValue('slug', generateSlug(e.target.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL) *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Se genera automáticamente del título
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="imagen">Imagen</SelectItem>
                        <SelectItem value="guion">Guion</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumen *</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormDescription>Breve descripción del proyecto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Completa</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="main_image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Imagen Principal</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Ej: Edición de video"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newService.trim()) {
                        setServices([...services, newService.trim()]);
                        setNewService('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newService.trim()) {
                      setServices([...services, newService.trim()]);
                      setNewService('');
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-md"
                  >
                    <span>{service}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 px-1"
                      onClick={() => setServices(services.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enlaces</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  placeholder="Etiqueta"
                />
                <Input
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="https://..."
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newLink.label.trim() && newLink.url.trim()) {
                      setLinks([...links, newLink]);
                      setNewLink({ url: '', label: '' });
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 bg-secondary p-2 rounded">
                    <span className="font-medium">{link.label}:</span>
                    <span className="text-sm text-muted-foreground flex-1">{link.url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setLinks(links.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Etiquetas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Ej: diseño"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newTag.trim()) {
                        setTags([...tags, newTag.trim()]);
                        setNewTag('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newTag.trim()) {
                      setTags([...tags, newTag.trim()]);
                      setNewTag('');
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-md"
                  >
                    <span>{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 px-1"
                      onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Publicado</FormLabel>
                      <FormDescription>
                        El proyecto será visible públicamente
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Destacado</FormLabel>
                      <FormDescription>Mostrar como proyecto destacado</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending
                ? 'Guardando...'
                : isEditing
                ? 'Actualizar Proyecto'
                : 'Crear Proyecto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/projects')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
