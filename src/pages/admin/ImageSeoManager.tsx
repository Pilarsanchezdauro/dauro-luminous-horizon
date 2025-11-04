import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  generateSeoFilename, 
  generateAltText, 
  detectContentType,
  normalizeForFilename,
  type ContentType 
} from '@/lib/image-seo-automation';
import { Copy, FileText, Image as ImageIcon, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageSeoManager() {
  const [filename, setFilename] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<ContentType>('default');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const detectedType = detectContentType({ title, description, type: contentType });
  const optimizedFilename = filename ? generateSeoFilename(filename, { title, type: detectedType }) : '';
  const altText = filename ? generateAltText(filename, { title, type: detectedType }) : '';

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Copiado al portapapeles');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast.error('Error al copiar');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Gestor de SEO para Imágenes</h1>
            <p className="text-muted-foreground">
              Herramienta para optimizar nombres de archivo y generar alt text automáticamente.
              Ingresa la información de tu imagen y obtén sugerencias optimizadas para SEO.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Información de la Imagen</CardTitle>
                <CardDescription>
                  Completa los campos para generar nombres y alt text optimizados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="filename">Nombre de archivo original</Label>
                  <Input
                    id="filename"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="Ej: imagen001.jpg o don-rodrigo.png"
                  />
                </div>

                <div>
                  <Label htmlFor="title">Título/Nombre del contenido</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Don Rodrigo de Vivar"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ej: Retrato del personaje principal de la novela histórica"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo de contenido</Label>
                  <Select
                    value={contentType}
                    onValueChange={(value) => setContentType(value as ContentType)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">General</SelectItem>
                      <SelectItem value="person">Persona</SelectItem>
                      <SelectItem value="institution">Institución</SelectItem>
                      <SelectItem value="company">Empresa/Logo</SelectItem>
                      <SelectItem value="work">Obra/Libro</SelectItem>
                      <SelectItem value="event">Evento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {filename && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Nombre de Archivo Optimizado
                    </CardTitle>
                    <CardDescription>
                      Tipo detectado: <span className="font-medium text-foreground">{detectedType}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm break-all">
                      {optimizedFilename}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => copyToClipboard(optimizedFilename, 'filename')}
                    >
                      {copiedField === 'filename' ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar nombre
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Alt Text Generado
                    </CardTitle>
                    <CardDescription>
                      Texto alternativo optimizado para accesibilidad y SEO
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg text-sm">
                      {altText}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => copyToClipboard(altText, 'alttext')}
                    >
                      {copiedField === 'alttext' ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar alt text
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-base">Metadatos Automáticos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Autor:</span>
                      <span className="font-medium">Grupo Dauro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Copyright:</span>
                      <span className="font-medium">© Grupo Dauro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium capitalize">{detectedType}</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Guías de Uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Nombres de archivo:</strong> Se normalizan automáticamente eliminando acentos, 
                  convirtiendo espacios en guiones y usando solo minúsculas. El formato es: 
                  <code className="mx-1 px-2 py-1 bg-muted rounded">grupo-dauro-{'{tipo}'}-{'{nombre}'}.ext</code>
                </p>
                <p>
                  <strong className="text-foreground">Alt text:</strong> Se genera automáticamente siguiendo plantillas 
                  específicas por tipo de contenido, siempre incluyendo "Grupo Dauro" para reforzar la marca.
                </p>
                <p>
                  <strong className="text-foreground">Tipos de contenido:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Persona:</strong> Para retratos de autores, artistas, directores</li>
                  <li><strong>Institución:</strong> Para universidades, organizaciones</li>
                  <li><strong>Empresa:</strong> Para logos y marcas comerciales</li>
                  <li><strong>Obra:</strong> Para portadas de libros, publicaciones</li>
                  <li><strong>Evento:</strong> Para presentaciones, festivales, exposiciones</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
