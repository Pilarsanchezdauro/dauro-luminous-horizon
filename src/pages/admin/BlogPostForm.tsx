import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Eye, Share2, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const formSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(200),
  slug: z.string().min(1, 'El slug es obligatorio').regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  excerpt: z.string().min(10, 'El extracto debe tener al menos 10 caracteres').max(500),
  content: z.string().min(50, 'El contenido debe tener al menos 50 caracteres'),
  author: z.string().min(1, 'El autor es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  tags: z.string(),
  image_url: z.string().url('URL inválida').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'scheduled']),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BlogPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSocialDialog, setShowSocialDialog] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'draft',
      author: 'Grupo Dauro',
    },
  });

  const title = watch('title');
  const status = watch('status');

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Set form values
      Object.keys(data).forEach((key) => {
        if (key === 'tags') {
          setValue('tags', data[key]?.join(', ') || '');
        } else if (key in formSchema.shape) {
          setValue(key as keyof FormData, data[key] || '');
        }
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo cargar el post',
        variant: 'destructive',
      });
      navigate('/admin/blog-posts');
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue('title', newTitle);
    if (!isEditing) {
      setValue('slug', generateSlug(newTitle));
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [];

      const postData: any = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        category: data.category,
        tags,
        image_url: data.image_url || null,
        status: data.status,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
      }

      toast({
        title: isEditing ? 'Post actualizado' : 'Post creado',
        description: isEditing
          ? 'El post ha sido actualizado correctamente'
          : 'El post ha sido creado correctamente',
      });

      navigate('/admin/blog-posts');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo guardar el post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSocialTexts = (data: FormData) => {
    const postUrl = `${window.location.origin}/blog/${data.slug}`;
    const hashtags = data.tags
      ? data.tags.split(',').map((tag) => `#${tag.trim().replace(/\s+/g, '')}`).join(' ')
      : '';

    // Twitter/X (280 caracteres)
    const twitterText = `${data.title}

${data.excerpt.substring(0, 120)}...

Lee más: ${postUrl}

${hashtags}`.substring(0, 280);

    // Facebook (más largo, formato conversacional)
    const facebookText = `📚 ${data.title}

${data.excerpt}

👉 Lee el artículo completo aquí: ${postUrl}

${hashtags}`;

    // LinkedIn (profesional)
    const linkedinText = `${data.title}

${data.excerpt}

Descubre más en nuestro blog: ${postUrl}

${hashtags}`;

    return { twitterText, facebookText, linkedinText, postUrl };
  };

  const handleShowSocialDialog = async (data: FormData) => {
    setLoading(true);
    
    try {
      // Primero guardamos el post como publicado
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [];

      const postData: any = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        category: data.category,
        tags,
        image_url: data.image_url || null,
        status: 'published',
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        published_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) throw error;
      }

      toast({
        title: '¡Post publicado!',
        description: 'Ahora puedes compartirlo en redes sociales',
      });

      // Mostramos el diálogo con los textos generados
      setShowSocialDialog(true);
    } catch (error: any) {
      toast({
        title: 'Error al publicar',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: 'Copiado',
        description: 'Texto copiado al portapapeles',
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo copiar el texto',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/blog-posts')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Editar Post' : 'Nuevo Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contenido Principal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="Título del post"
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="url-del-post"
              />
              {errors.slug && (
                <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt">Extracto *</Label>
              <Textarea
                id="excerpt"
                {...register('excerpt')}
                placeholder="Breve descripción del post"
                rows={3}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Contenido *</Label>
              <Textarea
                id="content"
                {...register('content')}
                placeholder="Contenido completo del post (admite Markdown)"
                rows={12}
                className="font-mono text-sm"
              />
              {errors.content && (
                <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input
                id="image_url"
                {...register('image_url')}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errors.image_url && (
                <p className="text-sm text-destructive mt-1">{errors.image_url.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadatos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  {...register('author')}
                  placeholder="Nombre del autor"
                />
                {errors.author && (
                  <p className="text-sm text-destructive mt-1">{errors.author.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Input
                  id="category"
                  {...register('category')}
                  placeholder="Editorial, Arte, Cine, etc."
                />
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
              <Input
                id="tags"
                {...register('tags')}
                placeholder="literatura, cultura, arte"
              />
            </div>

            <div>
              <Label htmlFor="status">Estado *</Label>
              <Select
                value={status}
                onValueChange={(value) => setValue('status', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="scheduled">Programado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO y Redes Sociales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Meta Título (máx. 60 caracteres)</Label>
              <Input
                id="meta_title"
                {...register('meta_title')}
                placeholder="Título para buscadores"
                maxLength={60}
              />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Descripción (máx. 160 caracteres)</Label>
              <Textarea
                id="meta_description"
                {...register('meta_description')}
                placeholder="Descripción para buscadores"
                maxLength={160}
                rows={3}
              />
            </div>

          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={handleSubmit(handleShowSocialDialog)}
            disabled={loading}
            className="bg-gradient-to-r from-primary to-accent"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {loading ? 'Publicando...' : 'Publicar en Redes'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (watch('slug')) {
                window.open(`/blog/${watch('slug')}`, '_blank');
              } else {
                toast({
                  title: 'Error',
                  description: 'Guarda el post primero para previsualizarlo',
                  variant: 'destructive',
                });
              }
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
        </div>
      </form>

      <Dialog open={showSocialDialog} onOpenChange={setShowSocialDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compartir en Redes Sociales</DialogTitle>
          </DialogHeader>
          
          {(() => {
            const formData = watch();
            const { twitterText, facebookText, linkedinText, postUrl } = generateSocialTexts(formData);
            
            return (
              <div className="space-y-6">
                {/* Twitter/X */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Twitter / X</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(twitterText, 'twitter')}
                      >
                        {copiedField === 'twitter' ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copiar
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={twitterText}
                      readOnly
                      rows={6}
                      className="font-mono text-sm mb-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {twitterText.length}/280 caracteres
                    </p>
                    <Button
                      className="mt-2 w-full"
                      variant="secondary"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, '_blank')}
                    >
                      Abrir en Twitter/X
                    </Button>
                  </CardContent>
                </Card>

                {/* Facebook */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Facebook</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(facebookText, 'facebook')}
                      >
                        {copiedField === 'facebook' ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copiar
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={facebookText}
                      readOnly
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <Button
                      className="mt-2 w-full"
                      variant="secondary"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank')}
                    >
                      Abrir en Facebook
                    </Button>
                  </CardContent>
                </Card>

                {/* LinkedIn */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>LinkedIn</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(linkedinText, 'linkedin')}
                      >
                        {copiedField === 'linkedin' ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copiar
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={linkedinText}
                      readOnly
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <Button
                      className="mt-2 w-full"
                      variant="secondary"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank')}
                    >
                      Abrir en LinkedIn
                    </Button>
                  </CardContent>
                </Card>

                <div className="pt-4 border-t">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setShowSocialDialog(false);
                      navigate('/admin/blog-posts');
                    }}
                  >
                    Finalizar
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
