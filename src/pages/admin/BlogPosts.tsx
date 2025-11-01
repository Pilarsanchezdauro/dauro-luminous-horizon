import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, ExternalLink, Copy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  category: string;
  published_at: string | null;
  created_at: string;
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [socialContent, setSocialContent] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, tags, status, author, category, published_at, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts((data || []) as BlogPost[]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      toast({
        title: 'Post eliminado',
        description: 'El post ha sido eliminado correctamente',
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el post',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handlePrepareForSocial = (post: BlogPost) => {
    const postUrl = `https://grupodauro.com/blog/${post.slug}`;
    const hashtags = post.tags?.map((tag: string) => `#${tag.replace(/\s+/g, '')}`).join(' ') || '';
    
    const content = `${post.title}

${post.excerpt}

Leer más: ${postUrl}

${hashtags}`;
    
    setSocialContent(content);
    setSelectedPost(post);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(socialContent);
    toast({
      title: '¡Copiado!',
      description: 'El contenido ha sido copiado al portapapeles. Ahora puedes pegarlo en Grupo Dauro.',
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      published: 'default',
      draft: 'secondary',
      scheduled: 'destructive',
    };
    
    return (
      <Badge variant={variants[status] || 'default'}>
        {status === 'published' ? 'Publicado' : status === 'draft' ? 'Borrador' : 'Programado'}
      </Badge>
    );
  };

  if (loading) {
    return <div className="flex justify-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Posts del Blog</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona los artículos de tu blog y publícalos en redes sociales
          </p>
        </div>
        <Link to="/admin/blog-posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total: {posts.length} posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('es-ES')
                      : new Date(post.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {post.status === 'published' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrepareForSocial(post)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar para redes
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/blog-posts/edit/${post.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El post será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contenido listo para Grupo Dauro</DialogTitle>
            <DialogDescription>
              Copia este contenido y pégalo manualmente en el grupo de Facebook
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={socialContent}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
            <Button onClick={handleCopyContent} className="w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copiar al portapapeles
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
