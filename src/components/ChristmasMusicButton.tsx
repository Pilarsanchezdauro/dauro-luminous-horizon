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
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group overflow-hidden"
      style={{ backgroundImage: `url(${christmasBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      aria-label={isPlaying ? "Pausar música navideña" : "Reproducir música navideña"}
    >
      {/* Overlay for better icon visibility */}
      <div className="absolute inset-0 bg-black/30 rounded-full" />
      
      {/* Decorative ring */}
      <div className={`absolute inset-0 rounded-full border-2 border-yellow-400/50 ${isPlaying ? 'animate-spin' : 'animate-pulse'}`} style={{ animationDuration: isPlaying ? '3s' : '2s' }} />
      
      {/* Icon */}
      <div className="relative z-10 text-white">
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Music className="w-6 h-6" />
        )}
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isPlaying ? "Pausar música" : "🎵 El arte de la navidad"}
      </span>
    </button>
  );
};

export default ChristmasMusicButton;
