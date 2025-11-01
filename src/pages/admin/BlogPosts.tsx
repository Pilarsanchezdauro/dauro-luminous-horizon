import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, ExternalLink, Share2 } from 'lucide-react';
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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  category: string;
  published_at: string | null;
  created_at: string;
  published_to_social: boolean;
  social_publish_error: string | null;
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, status, author, category, published_at, created_at, published_to_social, social_publish_error')
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

  const handlePublishToSocial = async (postId: string) => {
    setPublishingId(postId);
    
    try {
      const { data, error } = await supabase.functions.invoke('publish-to-social', {
        body: { postId },
      });

      if (error) throw error;

      toast({
        title: '¡Publicado!',
        description: 'El post ha sido enviado a tus redes sociales',
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Error al publicar',
        description: error.message || 'No se pudo publicar en redes sociales',
        variant: 'destructive',
      });
    } finally {
      setPublishingId(null);
    }
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
                <TableHead>Redes Sociales</TableHead>
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
                    {post.published_to_social ? (
                      <Badge variant="default" className="bg-green-500">
                        Publicado
                      </Badge>
                    ) : post.social_publish_error ? (
                      <Badge variant="destructive">Error</Badge>
                    ) : post.status === 'published' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublishToSocial(post.id)}
                        disabled={publishingId === post.id}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        {publishingId === post.id ? 'Publicando...' : 'Publicar'}
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('es-ES')
                      : new Date(post.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {post.status === 'published' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
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
    </div>
  );
}
