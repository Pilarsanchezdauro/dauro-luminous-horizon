import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, BookOpen, Sparkles, Loader2, Play, Pause, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const SEARCH_EXAMPLES = [
  "¿Qué libros ha publicado Grupo Dauro sobre poesía?",
  "Noticias recientes sobre literatura andaluza",
  "Información sobre los servicios editoriales",
  "¿Qué autores andaluces tenéis en catálogo?",
  "Eventos culturales en Granada"
];

export const DauroWidget = () => {
  const [mode, setMode] = useState<"interno" | "externo">("interno");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    sources?: Array<{ url: string; title: string }>;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_EXAMPLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    setAudioError(null);

    try {
      const endpoint = mode === "interno" ? "qa-interno" : "qa-externo";
      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: { query: query.trim() },
      });

      if (error) throw error;

      setResult({
        text: data.text,
        sources: data.cites || data.fuentesInternas || [],
      });
    } catch (error) {
      console.error("Error:", error);
      setResult({
        text: "Ha ocurrido un error. Por favor, intenta de nuevo.",
        sources: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioPlayPause = async () => {
    if (!result?.text) return;

    // Si ya estamos reproduciendo, pausar
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    // Si ya existe el audio, reproducir
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play();
      setIsPlayingAudio(true);
      return;
    }

    // Generar nuevo audio
    setIsPlayingAudio(true);
    setAudioError(null);

    try {
      const { data, error } = await supabase.functions.invoke("audio-sinopsis", {
        body: { text: result.text },
      });

      if (error) throw error;

      // Crear blob y URL
      const audioBlob = new Blob([data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error al reproducir audio:", error);
      setAudioError("No se pudo reproducir el audio. Intenta de nuevo.");
      setIsPlayingAudio(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAsk();
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="bg-gradient-to-br from-background via-background to-primary/5 rounded-2xl shadow-lg border border-border p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Pregunta a Grupo Dauro
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    Este asistente usa inteligencia artificial para responder preguntas culturales,
                    consultar el catálogo y ofrecer información de la web de Grupo Dauro.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground italic font-serif max-w-2xl mx-auto mb-4">
            Tu asistente cultural inteligente
          </p>
          
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Busca en todo el catálogo, nuestros artículos, o la red cultural actual.
            <br />
            Pregunta cualquier cosa sobre libros, autores, eventos o cultura.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Button
            variant={mode === "interno" ? "default" : "outline"}
            onClick={() => setMode("interno")}
            className="gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Catálogo
          </Button>
          <Button
            variant={mode === "externo" ? "default" : "outline"}
            onClick={() => setMode("externo")}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Actualidad
          </Button>
        </div>

        {/* Search Input */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder={SEARCH_EXAMPLES[placeholderIndex]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="pl-10 h-12 text-base transition-all"
            />
          </div>
          <Button
            onClick={handleAsk}
            disabled={isLoading || !query.trim()}
            size="lg"
            className="px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Pensando...
              </>
            ) : (
              "Preguntar"
            )}
          </Button>
        </div>

        {/* Examples */}
        <div className="text-xs text-muted-foreground text-center mb-6">
          <p className="font-semibold mb-1">Ejemplos:</p>
          <p className="italic">
            "¿Qué libros ha publicado Grupo Dauro sobre poesía?" •
            "Noticias recientes sobre literatura andaluza" •
            "Información sobre los servicios editoriales"
          </p>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-background/50 rounded-xl border border-border p-6 space-y-4 animate-fade-in">
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {result.text}
              </p>
            </div>

            {/* Audio Player for internal mode */}
            {mode === "interno" && (
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAudioPlayPause}
                    disabled={!result.text}
                    className="gap-2"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Escuchar sinopsis
                      </>
                    )}
                  </Button>
                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlayingAudio(false)}
                    onError={() => {
                      setIsPlayingAudio(false);
                      setAudioError("No se pudo reproducir el audio. Intenta de nuevo.");
                    }}
                    onPlay={() => setIsPlayingAudio(true)}
                    onPause={() => setIsPlayingAudio(false)}
                    className="flex-1 h-8"
                    controls
                    style={{ display: audioRef.current?.src ? 'block' : 'none' }}
                  />
                </div>
                {audioError && (
                  <p className="text-sm text-destructive mt-2">{audioError}</p>
                )}
              </div>
            )}

            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-2">
                  {mode === "interno" ? "Fuentes consultadas:" : "Fuentes consultadas:"}
                </h4>
                <ul className="space-y-1">
                  {result.sources.map((source, idx) => (
                    <li key={idx} className="text-sm">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {source.title || source.url}
                      </a>
                    </li>
                  ))}
                </ul>
                {mode === "interno" && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    Fuente: contenido de grupodauro.com
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
