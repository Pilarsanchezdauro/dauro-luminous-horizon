import { useState } from 'react';
import { processImageForSeo, isImageFile, type ContentType } from '@/lib/image-seo-automation';
import { toast } from 'sonner';

interface ImageContext {
  title?: string;
  description?: string;
  type?: ContentType;
  formType?: string;
}

interface ProcessedImage {
  file: File;
  altText: string;
  preview: string;
  metadata: {
    author: string;
    copyright: string;
    contentType: ContentType;
  };
}

export function useImageSeoUpload() {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = async (
    files: FileList | File[],
    context: ImageContext
  ): Promise<ProcessedImage[]> => {
    setIsProcessing(true);
    const processed: ProcessedImage[] = [];

    try {
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        if (!isImageFile(file)) {
          toast.warning(`${file.name} no es una imagen válida`);
          continue;
        }

        // Aplicar automatización SEO
        const result = processImageForSeo(file, context);

        // Crear preview
        const preview = URL.createObjectURL(result.processedFile);

        processed.push({
          file: result.processedFile,
          altText: result.altText,
          preview,
          metadata: result.metadata,
        });

        console.log('📸 Imagen procesada con SEO:', {
          original: file.name,
          optimized: result.processedFile.name,
          altText: result.altText,
          contentType: result.metadata.contentType,
        });
      }

      setProcessedImages(processed);
      
      if (processed.length > 0) {
        toast.success(
          `${processed.length} imagen${processed.length > 1 ? 'es' : ''} optimizada${processed.length > 1 ? 's' : ''} con SEO automático`
        );
      }

      return processed;
    } catch (error) {
      console.error('Error procesando imágenes:', error);
      toast.error('Error al procesar las imágenes');
      return [];
    } finally {
      setIsProcessing(false);
    }
  };

  const clearProcessed = () => {
    // Limpiar URLs de preview
    processedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setProcessedImages([]);
  };

  return {
    processedImages,
    isProcessing,
    processFiles,
    clearProcessed,
  };
}
