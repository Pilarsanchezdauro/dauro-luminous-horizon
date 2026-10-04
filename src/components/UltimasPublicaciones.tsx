import { Button } from "@/components/ui/button";

/**
 * "Nuestras últimas publicaciones": las obras más recientes editadas por Dauro.
 * Prueba viva del mensaje de arriba (editamos libros de verdad y los llevamos a la
 * tienda). Las portadas y los enlaces salen de la tienda Odoo (tiendaspain.grupodauro.com),
 * que es la fuente de verdad; añadir aquí un título nuevo es copiar su id de producto.
 *
 * Todas las portadas van en un marco idéntico (mismo fondo neutro, mismo tamaño,
 * object-contain) para que la mezcla de colores de las cubiertas no distorsione la home.
 * Colocar justo debajo del bloque de las dos puertas (PuertasEditorial) en la home.
 */

type Publicacion = {
  id: number;
  titulo: string;
  autor: string;
  precio: string;
  url: string;
};

const TIENDA = "https://tiendaspain.grupodauro.com";

const PUBLICACIONES: Publicacion[] = [
  {
    id: 18029,
    titulo: "Los fotones creen en Dios",
    autor: "Francisco López Barrios",
    precio: "22 €",
    url: `${TIENDA}/shop/los-fotones-creen-en-dios-18029`,
  },
  {
    id: 18044,
    titulo: "Una vida en Roma",
    autor: "Anastasia Espinel Suárez",
    precio: "17 €",
    url: `${TIENDA}/shop/una-vida-en-roma-18044`,
  },
  {
    id: 18042,
    titulo: "La sota de espadas",
    autor: "José Luis Sánchez Iglesias",
    precio: "18 €",
    url: `${TIENDA}/shop/la-sota-de-espadas-18042`,
  },
  {
    id: 18016,
    titulo: "Pelayo. Leyenda y Vida I",
    autor: "Tony de Haro",
    precio: "25,90 €",
    url: `${TIENDA}/shop/pelayo-leyenda-y-vida-i-18016`,
  },
  {
    id: 18026,
    titulo: "Cartas desde la otra orilla",
    autor: "Carmen Puerta Extremera",
    precio: "17 €",
    url: `${TIENDA}/shop/cartas-desde-la-otra-orilla-18026`,
  },
];

export const UltimasPublicaciones = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full my-20 md:my-28">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-5">
          Nuestras últimas <span className="text-primary">publicaciones</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Libros que hemos editado y llevado a las librerías de España y América. Esto es
          lo que hacemos cuando una obra está lista.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6 max-w-6xl mx-auto">
        {PUBLICACIONES.map((libro) => (
          <a
            key={libro.id}
            href={libro.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_rgba(224,74,92,0.4)] transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Marco uniforme: misma proporción y mismo fondo para todas las portadas */}
            <div className="aspect-[3/4] bg-muted/40 flex items-center justify-center p-4">
              <img
                src={`${TIENDA}/web/image/product.template/${libro.id}/image_1024`}
                alt={`Portada de ${libro.titulo}`}
                loading="lazy"
                className="max-h-full w-auto object-contain rounded-md shadow-md ring-1 ring-black/5 group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow border-t border-primary/10">
              <h3 className="text-base font-playfair font-bold leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {libro.titulo}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{libro.autor}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-base font-bold">{libro.precio}</span>
                <span className="text-primary text-xs font-semibold">Ver →</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-10">
        <a href={`${TIENDA}/shop`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="hover:border-primary/60 hover:text-primary transition-all">
            Ver todo el catálogo
          </Button>
        </a>
      </div>
    </section>
  );
};

export default UltimasPublicaciones;
