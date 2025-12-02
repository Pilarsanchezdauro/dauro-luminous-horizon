import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import christmasBg from "@/assets/christmas-music-bg.jpg";

const ChristmasMusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/navidad-en-el-arte.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    
    audio.addEventListener('canplaythrough', () => {
      console.log("Audio loaded and ready to play");
      setIsLoaded(true);
    });
    
    audio.addEventListener('error', (e) => {
      console.error("Audio error:", e);
      console.error("Audio src:", audio.src);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      console.log("No audio ref");
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log("Attempting to play audio...");
        await audioRef.current.play();
        console.log("Audio playing successfully");
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Card con imagen */}
      <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
        {/* Imagen de fondo */}
        <img 
          src={christmasBg} 
          alt="El arte de la navidad" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Botón de play centrado */}
        <button
          onClick={toggleMusic}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={isPlaying ? "Pausar música navideña" : "Reproducir música navideña"}
        >
          <div className={`w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${isPlaying ? 'animate-pulse' : ''}`}>
            {isPlaying ? (
              <Pause className="w-7 h-7 text-primary" />
            ) : (
              <Music className="w-7 h-7 text-primary" />
            )}
          </div>
        </button>
        
        {/* Texto inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
          <p className="text-white text-xs font-medium drop-shadow-lg">
            {isPlaying ? "Reproduciendo..." : "🎵 El arte de la navidad"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChristmasMusicButton;
