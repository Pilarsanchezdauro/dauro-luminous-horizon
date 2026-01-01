import { useState } from 'react';

interface BlogCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function BlogCardImage({ src, alt, className = '' }: BlogCardImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageRatio, setImageRatio] = useState<'wide' | 'tall' | 'square'>('wide');

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    
    // Detectar proporción de la imagen
    if (ratio > 1.3) {
      setImageRatio('wide');
    } else if (ratio < 0.8) {
      setImageRatio('tall');
    } else {
      setImageRatio('square');
    }
    
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Ajustar object-position según la proporción
  const getObjectPosition = () => {
    switch (imageRatio) {
      case 'tall':
        return 'object-[center_20%]'; // Para imágenes verticales, mostrar más de arriba
      case 'square':
        return 'object-center';
      case 'wide':
      default:
        return 'object-center';
    }
  };

  if (hasError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Imagen no disponible</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {/* Skeleton mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width="600"
        height="400"
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-all duration-500
          ${getObjectPosition()}
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
          group-hover:scale-105
        `}
      />
      
      {/* Gradiente sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
