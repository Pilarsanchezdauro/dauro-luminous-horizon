import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronLeft, ChevronRight, Images, Search, X } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { BlogCardImage } from "@/components/BlogCardImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatSpanishDate } from "@/lib/blog";
import {
  HEMEROTECA_POR_PAGINA,
  useHemerotecaPosts,
} from "@/hooks/useHemerotecaPosts";

// El blog antiguo empezó en diciembre de 2006 y se apagó en 2025.
const PRIMER_ANIO = 2006;
const ULTIMO_ANIO = 2025;

const Hemeroteca = () => {
  const [texto, setTexto] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [anio, setAnio] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);

  // No lanzamos una consulta por cada tecla: esperamos a que pare de escribir.
  useEffect(() => {
    const espera = setTimeout(() => {
      setBusqueda(texto);
      setPagina(1);
    }, 400);
    return () => clearTimeout(espera);
  }, [texto]);

  const { data, isLoading, isError } = useHemerotecaPosts({ busqueda, anio, pagina });

  const articulos = data?.articulos ?? [];
  const total = data?.total ?? 0;
  const paginas = Math.max(1, Math.ceil(total / HEMEROTECA_POR_PAGINA));

  const anios = useMemo(
    () =>
      Array.from({ length: ULTIMO_ANIO - PRIMER_ANIO + 1 }, (_, i) => String(ULTIMO_ANIO - i)),
    []
  );

  const hayFiltros = Boolean(busqueda || anio);

  const limpiar = () => {
    setTexto("");
    setBusqueda("");
    setAnio(null);
    setPagina(1);
  };

  const cambiarPagina = (nueva: number) => {
    setPagina(nueva);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Hemeroteca - El archivo del blog de Grupo Dauro"
        description="Casi veinte años de vida cultural de Grupo Dauro: presentaciones de libros, autores, exposiciones y noticias publicadas entre 2006 y 2025."
        keywords="hemeroteca Grupo Dauro, archivo blog, presentaciones libros Granada, historia editorial Dauro"
        url="https://www.grupodauro.com/blog/hemeroteca"
      />
      <Navigation />

      <section className="relative pt-32 pb-12 bg-gradient-to-b from-muted/60 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
            Hemeroteca
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            El archivo completo de nuestro blog entre 2006 y 2025. Presentaciones,
            autores, exposiciones y noticias de casi veinte años de vida cultural.
          </p>
          <Link to="/blog/hemeroteca/galeria">
            <Button variant="outline" className="gap-2">
              <Images className="h-4 w-4" />
              Ver la galería de fotografías
            </Button>
          </Link>
        </div>
      </section>

      <main className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Buscador */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={texto}
                onChange={(evento) => setTexto(evento.target.value)}
                placeholder="Buscar por título: un autor, un libro, un acto…"
                className="pl-10"
                aria-label="Buscar en la hemeroteca"
              />
            </div>

            {/* Filtro por año */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Button
                variant={anio === null ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setAnio(null);
                  setPagina(1);
                }}
              >
                Todos los años
              </Button>
              {anios.map((valor) => (
                <Button
                  key={valor}
                  variant={anio === valor ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setAnio(valor === anio ? null : valor);
                    setPagina(1);
                  }}
                >
                  {valor}
                </Button>
              ))}
            </div>

            {/* Resumen de resultados */}
            <div className="flex items-center justify-between gap-4 mb-8 text-sm text-muted-foreground">
              <p>
                {isLoading && "Buscando…"}
                {!isLoading && total > 0 && (
                  <>
                    {total.toLocaleString("es-ES")} {total === 1 ? "artículo" : "artículos"}
                    {anio && ` en ${anio}`}
                  </>
                )}
                {/* Con total 0 el mensaje lo da el bloque de abajo, que explica
                    si es que no hay coincidencias o que aún no está cargado. */}
              </p>
              {hayFiltros && (
                <Button variant="ghost" size="sm" onClick={limpiar} className="gap-1">
                  <X className="h-3 w-3" />
                  Quitar filtros
                </Button>
              )}
            </div>

            {isError && (
              <p className="text-center py-16 text-muted-foreground">
                No se ha podido cargar la hemeroteca. Vuelve a intentarlo en un momento.
              </p>
            )}

            {isLoading && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, indice) => (
                  <div key={indice} className="rounded-lg overflow-hidden border">
                    <div className="h-48 bg-muted animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                      <div className="h-5 bg-muted animate-pulse rounded" />
                      <div className="h-5 bg-muted animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sin resultados y sin filtros: el archivo todavía no está cargado.
                Mientras tanto, se ofrece el blog original, que sigue en pie. */}
            {!isLoading && !isError && total === 0 && !hayFiltros && (
              <div className="text-center py-16 max-w-xl mx-auto">
                <p className="text-muted-foreground mb-6">
                  Estamos trasladando aquí los artículos publicados entre 2006 y 2025.
                  Mientras terminamos, puedes consultarlos en el blog original.
                </p>
                <a
                  href="https://grupodauro.wordpress.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Ir al blog original</Button>
                </a>
              </div>
            )}

            {!isLoading && !isError && total === 0 && hayFiltros && (
              <p className="text-center py-16 text-muted-foreground">
                No hemos encontrado ningún artículo con esa búsqueda.
              </p>
            )}

            {!isLoading && !isError && total > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articulos.map((articulo) => (
                  <article
                    key={articulo.id}
                    className="group rounded-lg overflow-hidden border bg-card hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <Link to={`/blog/${articulo.slug}`} className="block">
                      {articulo.image_url ? (
                        <BlogCardImage
                          src={articulo.image_url}
                          alt={articulo.title}
                          className="h-48"
                        />
                      ) : (
                        <div className="h-48 bg-muted flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                      )}
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <time className="text-xs text-muted-foreground mb-2">
                        {formatSpanishDate(articulo.published_at)}
                      </time>
                      <h2 className="font-playfair font-bold text-lg leading-snug mb-2">
                        <Link
                          to={`/blog/${articulo.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {articulo.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {articulo.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Paginación */}
            {!isLoading && paginas > 1 && (
              <nav
                className="flex items-center justify-center gap-4 mt-12"
                aria-label="Paginación de la hemeroteca"
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagina <= 1}
                  onClick={() => cambiarPagina(pagina - 1)}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {pagina} de {paginas}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagina >= paginas}
                  onClick={() => cambiarPagina(pagina + 1)}
                  className="gap-1"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            )}

            <p className="text-center text-sm text-muted-foreground mt-16">
              ¿Buscas lo último?{" "}
              <Link to="/blog" className="text-primary hover:underline">
                Vuelve al blog
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hemeroteca;
