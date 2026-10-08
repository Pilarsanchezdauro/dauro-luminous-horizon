import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

interface BookInfo {
  title: string;
  slug: string;
  cover: string;
  description: string;
  /** Si está definido, la tarjeta enlaza a este sitio externo en una pestaña nueva. */
  external?: string;
}

interface AuthorInfo {
  name: string;
  slug: string;
  books: BookInfo[];
}

const authors: AuthorInfo[] = [
  {
    name: "Anastassia Espinel Suares",
    slug: "anastassia-espinel-suares",
    books: [
      {
        title: "Una vida en Roma",
        slug: "una-vida-en-roma",
        cover: "/webs-libros/roma/portada.jpg",
        description: "Novela histórica. De la cuna a la urna funeraria en la Roma del siglo I: una sola vida para contarlas todas, y detrás de cada escena, un dato.",
        external: "https://unavidaenroma.grupodauro.com"
      }
    ]
  },
  {
    name: "José Luis Sánchez Iglesias",
    slug: "jose-luis-sanchez-iglesias",
    books: [
      {
        title: "La sota de espadas",
        slug: "la-sota-de-espadas",
        cover: "/webs-libros/sota/portada.jpg",
        description: "Novela negra en Salamanca. Una mujer aparece asesinada con la sota de espadas entre los dientes, y el inspector Rocasolano sospecha que la escena ha sido preparada.",
        external: "https://lasotadeespadas.grupodauro.com"
      }
    ]
  },
  {
    name: "Francisco López Barrios",
    slug: "francisco-lopez-barrios",
    books: [
      {
        title: "Los fotones creen en Dios",
        slug: "los-fotones-creen-en-dios",
        cover: "/webs-libros/fotones/portada.jpg",
        description: "Física, mística y misterio en Granada. Web del autor con flipbook de las primeras páginas, agenda de presentaciones y sala de prensa.",
        external: "https://losfotonescreenendios.grupodauro.com"
      }
    ]
  },
  {
    name: "Carmen Puerta Extremera",
    slug: "carmen-puerta-extremera",
    books: [
      {
        title: "Cartas desde la otra orilla",
        slug: "cartas-desde-la-otra-orilla",
        cover: "/webs-libros/cartas/portada.png",
        description: "Novela de misterio. Un sobre con un nombre de mujer y medio siglo de cartas escritas en secreto.",
        external: "https://cartasdesdelaotraorilla.grupodauro.com"
      }
    ]
  },
  {
    name: "Tony de Haro",
    slug: "tony-de-haro",
    books: [
      {
        title: "Pelayo · Leyenda y Vida I",
        slug: "pelayo",
        cover: "/webs-libros/pelayo/portada.jpg",
        description: "Novela histórica. Caída y nacimiento de imperios entre los siglos VII y VIII: el origen del hombre antes que la leyenda.",
        external: "https://pelayo.grupodauro.com"
      }
    ]
  },
  {
    name: "Carlos Blanco",
    slug: "carlos-blanco",
    books: [
      {
        title: "Leonardo da Vinci: La Tragedia de la Perfección",
        slug: "leonardo-da-vinci",
        cover: "/webs-libros/leonardo/portada-libro.jpg",
        description: "Una indagación poética y filosófica en la grandeza de la mente humana."
      }
    ]
  },
  {
    name: "Antonio Rodríguez Jiménez",
    slug: "antonio-rodriguez",
    books: [
      {
        title: "La Construcción Discursiva del Liderazgo",
        slug: "liderazgo-discursivo",
        cover: "/products/construccion-discursiva-liderazgo.png",
        description: "De Platón a la inteligencia artificial. Un análisis del liderazgo como construcción narrativa."
      }
    ]
  }
];

const WebsDeLibrosIndex = () => {
  // Una sola cuadrícula con todos los libros (antes se agrupaba por autor y, como cada
  // autor tiene un solo libro, salía una portada gigante por fila).
  const allBooks = authors.flatMap((author) =>
    author.books.map((book) => ({ ...book, author: author.name, authorSlug: author.slug }))
  );

  return (
    <>
      <SEO
        title="Webs de Libros | Páginas Web Exclusivas para Autores"
        description="Landing pages exclusivas para libros de nuestros autores. Cada obra merece su propio espacio digital con reseñas, extractos y compra directa."
        keywords="webs de libros, landing page libro, página web autor, marketing editorial, promoción libros online"
        url="https://www.grupodauro.com/webs-de-libros"
      />

      <Navigation />
      
      <main className="min-h-screen bg-background pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Webs de Libros</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                Páginas Web Dedicadas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Cada libro merece su propio espacio. Descubre las landings exclusivas de nuestros autores.
              </p>
            </div>
          </div>
        </section>

        {/* Books Grid (todas las obras en una sola cuadrícula) */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {allBooks.map((book) => {
                const cardClass = "group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col";
                const inner = (
                  <>
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={book.cover}
                        alt={book.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-xs text-muted-foreground mb-1">{book.author}</p>
                      <h3 className="text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {book.description}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-primary text-sm font-medium">
                        <span>{book.external ? "Visitar la web" : "Ver landing"}</span>
                        {book.external
                          ? <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </div>
                    </div>
                  </>
                );
                return book.external ? (
                  <a
                    key={book.slug}
                    href={book.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={book.slug}
                    to={`/webs-de-libros/${book.authorSlug}/${book.slug}`}
                    className={cardClass}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              ¿Quieres una web para tu libro?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Creamos páginas web exclusivas para promocionar tu obra. Diseño profesional, animaciones y optimización SEO.
            </p>
            <Link
              to="/solicitar-web"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Solicitar presupuesto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WebsDeLibrosIndex;
