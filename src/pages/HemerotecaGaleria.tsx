import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookImage, Camera, X } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useGaleriaHemeroteca, type FotoGaleria } from "@/hooks/useGaleriaHemeroteca";

/** Cuántas fotos se añaden cada vez que se pide ver más. */
const TANDA = 96;

const HemerotecaGaleria = () => {
  const { data, isLoading, isError } = useGaleriaHemeroteca();
  const [anio, setAnio] = useState<string | null>(null);
  const [tipo, setTipo] = useState<"todo" | "foto" | "grafico">("todo");
  const [visibles, setVisibles] = useState(TANDA);
  const [abierta, setAbierta] = useState<number | null>(null);

  const base = data?.base ?? "";
  const todas = useMemo(() => data?.fotos ?? [], [data]);

  const anios = useMemo(() => {
    const cuenta = new Map<string, number>();
    todas.forEach((f) => cuenta.set(f.a, (cuenta.get(f.a) ?? 0) + 1));
    return Array.from(cuenta.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [todas]);

  const fotos = useMemo(
    () =>
      todas.filter(
        (f) =>
          (!anio || f.a === anio) &&
          (tipo === "todo" ||
            (tipo === "foto" ? f.p === 1 : f.p !== 1))
      ),
    [todas, anio, tipo]
  );

  const cuantasFotografias = useMemo(
    () => todas.filter((f) => f.p === 1).length,
    [todas]
  );

  const mostradas = fotos.slice(0, visibles);
  const quedan = fotos.length - mostradas.length;

  const elegirAnio = (valor: string | null) => {
    setAnio(valor);
    setVisibles(TANDA);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const elegirTipo = (valor: "todo" | "foto" | "grafico") => {
    setTipo(valor);
    setVisibles(TANDA);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mover = useCallback(
    (paso: number) => {
      setAbierta((actual) => {
        if (actual === null) return actual;
        const siguiente = actual + paso;
        if (siguiente < 0 || siguiente >= fotos.length) return actual;
        return siguiente;
      });
    },
    [fotos.length]
  );

  // Con la foto ampliada: flechas para pasar, Escape para cerrar, y la página
  // de detrás no se mueve.
  useEffect(() => {
    if (abierta === null) return;
    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAbierta(null);
      if (evento.key === "ArrowRight") mover(1);
      if (evento.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", alPulsar);
    const desbordeAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = desbordeAnterior;
    };
  }, [abierta, mover]);

  const foto: FotoGaleria | null = abierta !== null ? fotos[abierta] ?? null : null;

  return (
    <div className="min-h-screen">
      <SEO
        title="Galería de la Hemeroteca - Grupo Cultural Dauro"
        description="Casi dos mil fotografías de la vida cultural de Grupo Dauro entre 2006 y 2025: presentaciones de libros, autores, exposiciones y encuentros literarios en Granada."
        keywords="galería Grupo Dauro, fotos presentaciones libros Granada, archivo fotográfico editorial"
        url="https://www.grupodauro.com/blog/hemeroteca/galeria"
      />
      <Navigation />

      <section className="relative pt-32 pb-10 bg-gradient-to-b from-muted/60 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
            La galería
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isLoading
              ? "Reuniendo las fotografías del archivo…"
              : `${todas.length.toLocaleString("es-ES")} fotografías de presentaciones, autores y
                 exposiciones, de 2006 a 2025. Pulsa cualquiera para verla y llegar a su artículo.`}
          </p>
        </div>
      </section>

      <main className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fotografías o material gráfico */}
          {!isLoading && !isError && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Button
                variant={tipo === "todo" ? "default" : "outline"}
                size="sm"
                onClick={() => elegirTipo("todo")}
                className="gap-1.5"
              >
                Todo
                <span className="text-xs opacity-60">{todas.length}</span>
              </Button>
              <Button
                variant={tipo === "foto" ? "default" : "outline"}
                size="sm"
                onClick={() => elegirTipo("foto")}
                className="gap-1.5"
              >
                <Camera className="h-3.5 w-3.5" />
                Fotografías
                <span className="text-xs opacity-60">{cuantasFotografias}</span>
              </Button>
              <Button
                variant={tipo === "grafico" ? "default" : "outline"}
                size="sm"
                onClick={() => elegirTipo("grafico")}
                className="gap-1.5"
              >
                <BookImage className="h-3.5 w-3.5" />
                Carteles y portadas
                <span className="text-xs opacity-60">
                  {todas.length - cuantasFotografias}
                </span>
              </Button>
            </div>
          )}

          {/* Años */}
          {!isLoading && !isError && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Button
                variant={anio === null ? "default" : "outline"}
                size="sm"
                onClick={() => elegirAnio(null)}
              >
                Todos los años
              </Button>
              {anios.map(([valor, cuantas]) => (
                <Button
                  key={valor}
                  variant={anio === valor ? "default" : "outline"}
                  size="sm"
                  onClick={() => elegirAnio(valor === anio ? null : valor)}
                  className="gap-1.5"
                >
                  {valor}
                  <span className="text-xs opacity-60">{cuantas}</span>
                </Button>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center py-20 text-muted-foreground">
              No se ha podido cargar la galería. Vuelve a intentarlo en un momento.
            </p>
          )}

          {isLoading && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
              {Array.from({ length: 16 }).map((_, indice) => (
                <div
                  key={indice}
                  className="mb-3 md:mb-4 rounded-lg bg-muted animate-pulse break-inside-avoid"
                  style={{ height: 140 + ((indice * 47) % 160) }}
                />
              ))}
            </div>
          )}

          {/* El mosaico */}
          {!isLoading && !isError && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
              {mostradas.map((imagen, indice) => (
                <button
                  key={imagen.u + indice}
                  onClick={() => setAbierta(indice)}
                  className="group relative mb-3 md:mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Ampliar: ${imagen.t}`}
                >
                  <img
                    src={base + imagen.u}
                    alt={imagen.t}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-[11px] font-semibold tracking-wide text-primary-foreground/80">
                      {imagen.a}
                    </span>
                    <span className="line-clamp-3 text-left text-xs leading-snug text-white">
                      {imagen.t}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {!isLoading && !isError && fotos.length === 0 && (
            <p className="text-center py-20 text-muted-foreground">
              No hay fotografías de ese año.
            </p>
          )}

          {quedan > 0 && (
            <div className="text-center mt-10">
              <Button variant="outline" onClick={() => setVisibles((v) => v + TANDA)}>
                Ver más fotografías
                <span className="ml-2 text-xs opacity-60">quedan {quedan}</span>
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-16">
            <Link to="/blog/hemeroteca" className="text-primary hover:underline">
              Volver a la hemeroteca
            </Link>
          </p>
        </div>
      </main>

      {/* Foto ampliada */}
      {foto && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={foto.t}
          onClick={() => setAbierta(null)}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setAbierta(null)}
              className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center gap-2 px-2 sm:gap-4 sm:px-4 min-h-0"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              onClick={() => mover(-1)}
              disabled={abierta === 0}
              className="shrink-0 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-20"
              aria-label="Anterior"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <img
              src={base + foto.u}
              alt={foto.t}
              className="max-h-full max-w-full object-contain"
            />

            <button
              onClick={() => mover(1)}
              disabled={abierta === fotos.length - 1}
              className="shrink-0 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-20"
              aria-label="Siguiente"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>

          <div
            className="px-6 py-5 text-center"
            onClick={(evento) => evento.stopPropagation()}
          >
            <p className="mx-auto max-w-2xl text-sm text-white/90">{foto.t}</p>
            <p className="mt-1 text-xs text-white/50">
              {foto.a} · {(abierta ?? 0) + 1} de {fotos.length.toLocaleString("es-ES")}
            </p>
            <Link
              to={`/blog/${foto.s}`}
              className="mt-3 inline-block text-sm text-primary hover:underline"
            >
              Leer el artículo
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HemerotecaGaleria;
