import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, BookOpen, Sparkles, Loader2, Play, Pause, Info, X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

interface Message {
  role: "user" | "assistant";
  content: string;
  metadata?: {
    fromCache: boolean;
    catalogUpdatedAt: string;
    totalProducts: number;
  };
  sources?: Array<{ url: string; title: string }>;
}

const SEARCH_EXAMPLES = [
  // Servicios
  "¿Cómo funciona el generador de portadas gratis?",
  "¿Qué servicios de autoedición ofrecéis?",
  "¿Hacéis booktrailers para libros?",
  "¿Cómo puedo unirme a vuestro canal de WhatsApp?",
  "¿Ofrecéis representación artística?",
  "¿Qué servicios de diseño web tenéis?",
  "¿Tenéis servicio de corrección de textos?",
  // Catálogo por géneros
  "¿Qué libros tenéis de poesía?",
  "¿Tenéis novelas históricas?",
  "¿Qué libros de narrativa contemporánea hay?",
  "¿Tenéis ensayos o libros de no ficción?",
  "¿Qué libros infantiles o juveniles tenéis?",
  "¿Tenéis libros de autoayuda o desarrollo personal?",
  "¿Qué biografías o memorias hay disponibles?",
  "¿Tenéis libros sobre arte o cultura?"
];

export const DauroWidget = () => {
  const { trackAIInteraction } = useAnalytics();
  const [mode, setMode] = useState<"interno" | "externo">("interno");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_EXAMPLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAsk = async (searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    if (!queryToUse.trim()) return;

    // Track query start
    trackAIInteraction('query_started', {
      mode,
      query_length: queryToUse.length,
      has_context: messages.length > 0
    });

    // Agregar mensaje del usuario
    const userMessage: Message = {
      role: "user",
      content: queryToUse
    };
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);
    setAudioError(null);

    try {
      const endpoint = mode === "interno" ? "qa-interno" : "qa-externo";
      
      // Enviar historial completo de mensajes
      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: { 
          query: queryToUse,
          messages: [...messages, userMessage] // Incluir historial
        },
      });

      if (error) throw error;

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        role: "assistant",
        content: data.text,
        sources: data.cites || data.fuentesInternas || [],
        metadata: data.metadata,
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Track successful response
      trackAIInteraction('query_completed', {
        mode,
        query_length: queryToUse.length,
        response_length: data.text.length,
        has_sources: (data.cites?.length || data.fuentesInternas?.length || 0) > 0,
        from_cache: data.metadata?.fromCache || false
      });
      
      // Scroll al final
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la consulta");
      
      // Track error
      trackAIInteraction('query_error', {
        mode,
        query_length: queryToUse.length,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchExample = (example: string) => {
    setQuery(example);
    handleAsk(example);
  };

  const handleClear = () => {
    setQuery("");
    setMessages([]);
    setAudioError(null);
    setIsPlayingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  };

  const handleAudioPlayPause = async (messageIndex: number) => {
    if (mode !== "interno") return;
    
    const message = messages[messageIndex];
    if (!message || message.role !== "assistant") return;

    // Si ya estamos reproduciendo, pausar
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      trackAIInteraction('audio_paused', { message_length: message.content.length });
      return;
    }

    // Si ya existe el audio, reproducir
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play();
      setIsPlayingAudio(true);
      return;
    }

    // Generar nuevo audio
    setIsLoadingAudio(true);
    setAudioError(null);

    try {
      // Usar fetch directamente para obtener la respuesta binaria
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/audio-sinopsis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: message.content }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al generar el audio');
      }

      // Obtener el blob directamente de la respuesta
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        setIsPlayingAudio(true);
      }
    } catch (error) {
      console.error("Error al reproducir audio:", error);
      setAudioError("No se pudo reproducir el audio. Intenta de nuevo.");
      setIsPlayingAudio(false);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAsk();
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="bg-gradient-to-br from-card via-card/95 to-primary/10 rounded-2xl shadow-xl border-2 border-primary/20 p-8 md:p-12 backdrop-blur-sm">
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
                    Asistente con IA para consultar nuestro catálogo de libros por género, 
                    servicios de autoedición, diseño de portadas, booktrailers, diseño web, 
                    representación artística y más. ¡Únete a nuestro canal de WhatsApp!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tu asistente cultural inteligente. Mantén una conversación natural sobre nuestro catálogo y servicios.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Button
            variant={mode === "interno" ? "default" : "outline"}
            onClick={() => {
              setMode("interno");
              setMessages([]);
            }}
            className="gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Catálogo
          </Button>
          <Button
            variant={mode === "externo" ? "default" : "outline"}
            onClick={() => {
              setMode("externo");
              setMessages([]);
            }}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Actualidad
          </Button>
        </div>

        {/* Conversación */}
        {messages.length > 0 && (
          <div className="space-y-4 max-h-[500px] overflow-y-auto mb-6 pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-xl border p-4 animate-enter ${
                  message.role === "user"
                    ? "bg-primary/5 border-primary/20 ml-8"
                    : "bg-background/50 border-border mr-8"
                }`}
              >
                {/* Metadata indicator for assistant messages */}
                {message.role === "assistant" && mode === "interno" && message.metadata && (
                  <div className="flex items-center justify-between text-xs bg-muted/50 rounded-lg px-3 py-2 mb-3 border border-border/50">
                    <div className="flex items-center gap-2">
                      {message.metadata.fromCache ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-muted-foreground">
                            Datos en caché ({message.metadata.totalProducts} productos)
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-muted-foreground">
                            Datos frescos de Shopify ({message.metadata.totalProducts} productos)
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(message.metadata.catalogUpdatedAt).toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                  </div>
                )}

                <div className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>

                {/* Audio player for assistant messages in internal mode */}
                {message.role === "assistant" && mode === "interno" && (
                  <div className="flex items-center gap-3 pt-3 mt-3 border-t border-border/50">
                    <Button
                      onClick={() => handleAudioPlayPause(index)}
                      disabled={isLoadingAudio}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      {isLoadingAudio ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generando audio...
                        </>
                      ) : isPlayingAudio ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Escuchar respuesta
                        </>
                      )}
                    </Button>
                    {audioError && (
                      <span className="text-sm text-destructive">{audioError}</span>
                    )}
                  </div>
                )}

                {/* Sources for assistant messages */}
                {message.role === "assistant" && message.sources && message.sources.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-border/50">
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Fuentes consultadas:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {message.sources.map((source, sourceIndex) => (
                        <a
                          key={sourceIndex}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-muted/50 hover:bg-muted rounded-full text-xs transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {source.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Search Input */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder={messages.length > 0 ? "Escribe tu respuesta..." : SEARCH_EXAMPLES[placeholderIndex]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="pl-10 pr-10 h-12 text-base transition-all"
            />
            {(query || messages.length > 0) && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Limpiar conversación"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <Button
            onClick={() => handleAsk()}
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
              "Enviar"
            )}
          </Button>
        </div>

        {/* Popular Searches - solo mostrar si no hay conversación */}
        {messages.length === 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground text-center mb-3">
              Búsquedas populares:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SEARCH_EXAMPLES.slice(0, 4).map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchExample(example)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full transition-all hover-scale cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Audio element oculto */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlayingAudio(false)}
          onError={() => {
            setIsPlayingAudio(false);
            setAudioError("No se pudo reproducir el audio. Intenta de nuevo.");
          }}
          onPlay={() => setIsPlayingAudio(true)}
          onPause={() => setIsPlayingAudio(false)}
          className="hidden"
        />
      </div>
    </section>
  );
};
