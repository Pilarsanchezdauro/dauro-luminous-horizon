import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Volume2 } from "lucide-react";

export const DauroWidget = () => {
  const [mode, setMode] = useState<"interno" | "externo">("interno");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    sources?: Array<{ url: string; title: string }>;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);

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

  const handleAudio = async () => {
    if (!result?.text) return;

    setIsPlayingAudio(true);
    try {
      const { data, error } = await supabase.functions.invoke("audio-sinopsis", {
        body: { text: result.text },
      });

      if (error) throw error;

      // El edge function devuelve el audio como blob
      const blob = await data;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(url);
      };
      
      audio.onerror = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(url);
      };
      
      await audio.play();
    } catch (error) {
      console.error("Error al reproducir audio:", error);
      setIsPlayingAudio(false);
      alert("No se pudo generar el audio. Intenta de nuevo.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAsk();
    }
  };

  return (
    <section
      className="dauro-widget-wrap"
      data-mode={mode}
      aria-label="Asistente cultural Grupo Dauro"
    >
      {/* Tabs */}
      <div className="dauro-widget-tabs" role="tablist" aria-label="Modo de consulta">
        <button
          className={`dauro-widget-tab ${mode === "interno" ? "is-active" : ""}`}
          role="tab"
          aria-selected={mode === "interno"}
          onClick={() => setMode("interno")}
          title="Catálogo (interno)"
        >
          Catálogo
        </button>
        <button
          className={`dauro-widget-tab ${mode === "externo" ? "is-active" : ""}`}
          role="tab"
          aria-selected={mode === "externo"}
          onClick={() => setMode("externo")}
          title="Actualidad con citas"
        >
          Actualidad
        </button>
      </div>

      {/* Input Bar */}
      <div className="dauro-widget-bar">
        <input
          className="dauro-widget-input"
          type="search"
          placeholder="Pregunta sobre libros, autores o eventos…"
          aria-label="Pregunta a Grupo Dauro"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className="dauro-widget-btn"
          onClick={handleAsk}
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2">Pensando...</span>
            </>
          ) : (
            "Preguntar"
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="dauro-widget-result" aria-live="polite">
          <div className="dauro-widget-answer">{result.text}</div>

          {/* Audio button for internal mode */}
          {mode === "interno" && (
            <div className="dauro-widget-actions">
              <button
                className="dauro-widget-audio-btn"
                onClick={handleAudio}
                disabled={isPlayingAudio}
                title="Escuchar sinopsis"
              >
                <Volume2 className="h-4 w-4" />
                <span className="ml-1.5">
                  {isPlayingAudio ? "Reproduciendo..." : "Escuchar sinopsis"}
                </span>
              </button>
            </div>
          )}

          {/* Sources */}
          {result.sources && result.sources.length > 0 && (
            <ul className="dauro-widget-sources">
              {result.sources.map((source, idx) => (
                <li key={idx}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <style>{`
        .dauro-widget-wrap {
          font: inherit;
          color: inherit;
          display: grid;
          gap: var(--gap, 0.75rem);
          padding: 1rem 0;
        }
        
        .dauro-widget-tabs {
          display: inline-flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .dauro-widget-tab {
          font: inherit;
          color: inherit;
          background: transparent;
          padding: 0.4rem 0.75rem;
          border: 1px solid var(--border-color, rgba(0, 0, 0, 0.15));
          border-radius: var(--radius, 0.5rem);
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .dauro-widget-tab:hover {
          border-color: var(--color-primary, currentColor);
        }
        
        .dauro-widget-tab.is-active {
          border-color: var(--color-primary, currentColor);
          font-weight: 600;
        }
        
        .dauro-widget-bar {
          display: flex;
          gap: 0.5rem;
          align-items: stretch;
        }
        
        .dauro-widget-input {
          flex: 1;
          font: inherit;
          color: inherit;
          background: transparent;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius, 0.5rem);
          border: 1px solid var(--border-color, rgba(0, 0, 0, 0.15));
          outline-color: var(--color-primary, currentColor);
        }
        
        .dauro-widget-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .dauro-widget-btn {
          font: inherit;
          color: white;
          background: var(--color-primary, hsl(var(--primary, currentColor)));
          padding: 0.55rem 0.9rem;
          border: 0;
          border-radius: var(--radius, 0.5rem);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: opacity 0.2s;
        }
        
        .dauro-widget-btn:hover:not(:disabled) {
          opacity: 0.9;
        }
        
        .dauro-widget-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .dauro-widget-result {
          font: inherit;
          color: inherit;
          display: grid;
          gap: 0.6rem;
        }
        
        .dauro-widget-answer {
          white-space: pre-wrap;
          line-height: inherit;
        }
        
        .dauro-widget-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .dauro-widget-audio-btn {
          font: inherit;
          color: inherit;
          background: transparent;
          border: 1px solid var(--border-color, rgba(0, 0, 0, 0.15));
          border-radius: var(--radius, 0.5rem);
          padding: 0.4rem 0.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }
        
        .dauro-widget-audio-btn:hover:not(:disabled) {
          border-color: var(--color-primary, currentColor);
        }
        
        .dauro-widget-audio-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .dauro-widget-sources {
          margin: 0.25rem 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.25rem;
        }
        
        .dauro-widget-sources a {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 2px;
          opacity: 0.8;
        }
        
        .dauro-widget-sources a:hover {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
