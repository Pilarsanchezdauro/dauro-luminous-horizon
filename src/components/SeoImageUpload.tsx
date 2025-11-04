import { useRef, useState } from 'react';
import { Upload, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useImageSeoUpload } from '@/hooks/use-image-seo-upload';
import type { ContentType } from '@/lib/image-seo-automation';

interface SeoImageUploadProps {
  onImagesProcessed: (images: Array<{ file: File; altText: string }>) => void;
  defaultTitle?: string;
  defaultType?: ContentType;
  maxImages?: number;
  formType?: string;
  showPreview?: boolean;
}

export function SeoImageUpload({
  onImagesProcessed,
  defaultTitle = '',
  defaultType,
  maxImages = 5,
  formType = '',
  showPreview = true,
}: SeoImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { processedImages, isProcessing, processFiles, clearProcessed } = useImageSeoUpload();
  
  const [title, setTitle] = useState(defaultTitle);
  const [contentType, setContentType] = useState<ContentType | undefined>(defaultType);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const processed = await processFiles(files, {
      title: title || undefined,
      type: contentType,
      formType,
    });

    if (processed.length > 0) {
      onImagesProcessed(
        processed.map((img) => ({
          file: img.file,
          altText: img.altText,
        }))
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = processedImages.filter((_, i) => i !== index);
    onImagesProcessed(
      newImages.map((img) => ({
        file: img.file,
        altText: img.altText,
      }))
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-2 mb-3">
          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Las imágenes se optimizarán automáticamente para SEO: se renombrarán, se generará alt text descriptivo y se aplicarán metadatos de Grupo Dauro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="image-title">Título/Nombre del contenido</Label>
            <Input
              id="image-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Don Rodrigo de Vivar"
            />
          </div>

          <div>
            <Label htmlFor="content-type">Tipo de contenido</Label>
            <Select
              value={contentType}
              onValueChange={(value) => setContentType(value as ContentType)}
            >
              <SelectTrigger id="content-type">
                <SelectValue placeholder="Autodetectar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="person">Persona</SelectItem>
                <SelectItem value="institution">Institución</SelectItem>
                <SelectItem value="company">Empresa/Logo</SelectItem>
                <SelectItem value="work">Obra/Libro</SelectItem>
                <SelectItem value="event">Evento</SelectItem>
                <SelectItem value="default">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          max={maxImages}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing || processedImages.length >= maxImages}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isProcessing ? 'Procesando...' : 'Seleccionar imágenes'}
        </Button>
      </div>

      {showPreview && processedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {processedImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.preview}
                alt={image.altText}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="mt-1 text-xs text-muted-foreground truncate">
                {image.file.name}
              </div>
              <div className="text-xs text-primary truncate">
                Alt: {image.altText}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
