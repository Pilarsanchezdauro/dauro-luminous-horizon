import { useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

// Vídeo de YouTube que no se carga hasta que la persona pulsa «Reproducir vídeo».
// Así YouTube no instala cookies sin una acción expresa (ver /cookies).
// Al reproducir se usa youtube-nocookie.com (modo de privacidad mejorada de YouTube).

export const getYouTubeId = (url: string): string | null => {
  const match = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
};

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export const YouTubeEmbed = ({ videoId, title, className = "" }: YouTubeEmbedProps) => {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full h-full border-0 ${className}`}
      />
    );
  }

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Reproducir vídeo: ${title}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Play className="h-5 w-5 fill-current" />
          Reproducir vídeo
        </button>
        <p className="max-w-xs text-xs text-white/90">
          Al reproducirlo, YouTube (Google) puede instalar cookies en tu navegador.{" "}
          <Link to="/cookies" className="underline hover:text-white">
            Más información
          </Link>
        </p>
      </div>
    </div>
  );
};
