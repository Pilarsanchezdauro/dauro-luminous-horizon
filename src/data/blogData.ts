import donRodrigoMain from "@/assets/don-rodrigo-main.png";
import donRodrigoPortrait from "@/assets/don-rodrigo-portrait.png";
import nftArgentinaMexico from "@/assets/nft-argentina-mexico.png";
import nftArgentinaPuertoRico from "@/assets/nft-argentina-puertorico.png";
import nftArgentinaCollection from "@/assets/nft-argentina-collection.png";
import iaConArte from "@/assets/ia-con-arte.png";
import logoDauroIA from "@/assets/logo-dauro-ia.png";
import latidoPresentacion from "@/assets/latido-presentacion-principal.jpg";
import libroLatido from "@/assets/libro-latido.png";

export type BlogCategory = "literatura" | "arte" | "cine" | "ia";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: BlogCategory;
  slug?: string;
  content?: string;
  bookImage?: string;
  bookLink?: string;
  amazonLink?: string;
  image2?: string;
  image3?: string;
  gallery?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "Presentación de 'Latido. Apasionadamente vuestro' en el Cuarto Real de Santo Domingo",
    excerpt: "Granada, 28 de octubre de 2025. Ayer presentamos en el Cuarto Real de Santo Domingo Latido. Apasionadamente vuestro, la nueva novela de Carmen Alcaide, con un anuncio inesperado: estamos trabajando en la adaptación de la obra a serie de televisión.",
    date: "28 Octubre 2025",
    author: "Equipo Dauro",
    image: latidoPresentacion,
    category: "literatura",
    slug: "presentacion-latido-carmen-alcaide",
    bookImage: libroLatido,
    bookLink: "https://www.edicionesdauro.com/articulo/1186-LATIDO-Apasionamente-vuestro/",
    amazonLink: "https://www.amazon.es/Latido-Apasionadamente-vuestro-Carmen-Alcaide/dp/8412849663",
    gallery: [
      "/latido-presentacion-1.jpg",
      "/latido-presentacion-2.jpg",
      "/latido-presentacion-3.jpg",
      "/latido-presentacion-4.jpg",
      "/latido-presentacion-5.jpg",
      "/latido-presentacion-6.jpg",
      "/latido-presentacion-7.jpg",
      "/latido-presentacion-8.jpg",
      "/latido-presentacion-9.jpg",
      "/latido-presentacion-10.jpg",
      "/latido-presentacion-11.jpg",
      "/latido-presentacion-12.jpg",
      "/latido-presentacion-13.jpg"
    ],
    content: `Granada, 28 de octubre de 2025

Ayer presentamos en el Cuarto Real de Santo Domingo Latido. Apasionadamente vuestro, la nueva novela de Carmen Alcaide, en un formato de tertulia que sorprendió gratamente a los asistentes con un anuncio inesperado: estamos trabajando en la adaptación de la obra a serie de televisión.

## Una tertulia que se convirtió en noticia

La presentación, lejos de seguir el formato tradicional, se desarrolló como una conversación íntima entre Carmen Alcaide (autora), Pilar Sánchez (nuestra presidenta) y María José M. Bonilla (nuestra directora editorial), quienes durante 45 minutos desgranaron los entresijos de esta ambiciosa novela de 560 páginas ambientada en la Transición española.

Carmen Alcaide, filóloga y profesora jubilada, compartió el proceso creativo detrás de Ilya Sinclair, su complejo protagonista: un exmilitar angloespañol miembro de los GEO que debe equilibrar su peligrosa profesión con una vida personal marcada por cuatro mujeres que dejan huella en su camino. La autora explicó cómo capturó no solo el contexto histórico de los años 1975-1982, sino también las formas de pensar y expresarse de aquella época, un trabajo de precisión que refleja su formación filológica.

## El anuncio: de la página a la pantalla

El momento clave de la tarde llegó cuando nuestra presidenta, Pilar Sánchez, reveló que hemos dado un paso adelante como editorial: estamos desarrollando la adaptación de Latido a serie de televisión, un proyecto en el que Pilar dirige el guion.

"Llevaba tiempo pensando que las novelas de Carmen son muy cinematográficas", explicó. "Cuando empezamos a recibir consultas de productoras buscando obras de autoras con potencial audiovisual, supimos que teníamos a Carmen. Inicialmente pensamos en Anónimo florentino, pero María José identificó que Latido cumplía con todos los requisitos para una serie".

Este es nuestro segundo proyecto de guion, tras El hidalgo don Rodrigo de Francisco del Valle. Pilar, con formación en dirección de cine, lidera la escritura del guion en un proceso colaborativo donde Carmen Alcaide y María José aportan sus profundos conocimientos de la obra.

## Un reto narrativo particular

Uno de los aspectos más interesantes revelados durante la tertulia fue el desafío específico que plantea Latido para su adaptación: Carmen escribió la novela desde el punto de vista de cada personaje, una multiplicidad de voces que funciona perfectamente en papel pero que requiere decisiones cruciales en el lenguaje audiovisual.

"Tenemos que decidir desde qué perspectiva contar cada escena sin perder esa riqueza de puntos de vista", explicó Pilar. Las tres trabajan escena por escena, reuniéndose regularmente para dar forma a un guion que mantiene la esencia de la novela: la tensión constante entre deber y deseo, la humanidad de sus personajes, y un contexto histórico poco explorado en ficción española de calidad.

## Productoras interesadas y timing perfecto

Aunque por acuerdos de confidencialidad no podemos revelar nombres, Pilar confirmó que ya existen conversaciones avanzadas con productoras de prestigio interesadas en el proyecto.

El momento no podría ser más oportuno: se cumplen 50 años desde la muerte de Franco, hay un interés renovado en la Transición española, y las plataformas buscan contenido español de calidad con potencial internacional. La Transición, con su carga histórica y emocional, sigue siendo un período relativamente inexplorado en ficción audiovisual de alta calidad.

## Una obra que captura la complejidad humana

A lo largo de la tertulia, se fue revelando la riqueza de Latido: un protagonista moralmente ambiguo pero profundamente humano, cuatro mujeres que representan diferentes caminos vitales (Iris, Marta, y dos más cuyas identidades mantuvimos en misterio para no hacer spoilers), relaciones masculinas complejas que incluyen el tratamiento sensible de la homosexualidad en una época difícil, y un contexto histórico que no es mero decorado sino parte fundamental del conflicto.

"Todos los personajes tienen matices", señaló Pilar. "Nadie es completamente bueno o malo. Los personajes aman sabiendo que pueden traicionar; y traicionan sin dejar de amar."

## Grupo Dauro: más allá de la publicación tradicional

Esta iniciativa representa un paso significativo para nosotros como editorial independiente: la demostración de que podemos ser no solo publicadores, sino incubadores de proyectos transmedia que acompañan a nuestros autores en todas las fases creativas.

Desde que publicamos Anónimo florentino en 2013, pasando por Razón de amor en 2018, hemos visto a Carmen Alcaide madurar su voz hasta llegar a Latido, una obra que sintetiza su capacidad para crear mundos visuales, personajes complejos y tramas que funcionan tanto en página como en pantalla.

## Próximos pasos

El guion está en desarrollo activo, las conversaciones con productoras avanzan, y desde Grupo Dauro iremos informando a través de nuestras redes sociales sobre la evolución del proyecto.

Mientras tanto, Latido. Apasionadamente vuestro ya está disponible para los lectores que quieran adentrarse en esta historia donde amor, lealtad, celos y supervivencia se entrelazan en uno de los períodos más fascinantes de nuestra historia reciente.

**Latido. Apasionadamente vuestro**  
Carmen Alcaide  
Grupo Dauro, 2025  
Disponible en librerías y en nuestra tienda online.`
  },
  {
    title: "El Hidalgo Don Rodrigo de Cervantes: de las páginas al guion",
    excerpt: "Después de más de un año de escritura, documentación y desarrollo creativo, Grupo Dauro se complace en anunciar que el guion de la serie El Hidalgo Don Rodrigo de Cervantes está casi terminado.",
    date: "29 Octubre 2025",
    author: "Grupo Dauro",
    image: donRodrigoMain,
    category: "cine",
    slug: "el-hidalgo-don-rodrigo-guion",
    bookImage: donRodrigoPortrait,
    bookLink: "https://www.youtube.com/@grupodauro2900",
    content: `⚜️ El Hidalgo Don Rodrigo de Cervantes: de las páginas al guion

Después de más de un año de escritura, documentación y desarrollo creativo, Grupo Dauro se complace en anunciar que el guion de la serie El Hidalgo Don Rodrigo de Cervantes está casi terminado.

Este ambicioso proyecto audiovisual se basa en la obra homónima del escritor Francisco del Valle, publicada por Grupo Dauro, que rescata del silencio la figura casi desconocida de Don Rodrigo de Cervantes, el padre del autor del Quijote.

## 📜 Un hombre olvidado por la Historia

Muy poco se ha escrito sobre Rodrigo de Cervantes, aquel cirujano sangrador que, con sus manos y su esfuerzo, sostuvo a una familia marcada por las deudas, los desplazamientos y los sueños.

Su vida transcurre en una España desgarrada por la desigualdad, la ambición y los cambios de un siglo que oscilaba entre la fe y la ruina.

Francisco del Valle lo convierte en un personaje trágico, orgulloso y profundamente humano, en quien se adivinan ya los rasgos del idealismo y la rebeldía que más tarde encarnará su hijo Miguel.

El guion de la serie toma esta esencia y la transforma en una narrativa visual intensa, que combina la fidelidad histórica con una mirada moderna y cinematográfica.

## ⚔️ Entre la Historia y la ficción

Ambientada en la segunda mitad del siglo XVI, El Hidalgo Don Rodrigo de Cervantes nos lleva por los caminos polvorientos de Castilla, los hospitales donde los cirujanos luchan con las manos desnudas, las calles de Alcalá y Valladolid, los mercados, las tabernas y los oscuros rincones de una España que busca su alma entre guerras y rezos.

La serie, inspirada en el estilo narrativo de producciones como Yellowstone o Vikingos, combina ritmo ágil, emoción y rigor histórico, con personajes complejos, dilemas morales y una estética visual que transporta al espectador a un tiempo de sombras y esplendor.

## 🎬 Un proyecto de creación y memoria

Desde Grupo Dauro, este proyecto representa un paso más en la difusión de la literatura histórica española y en la conversión del patrimonio literario en relato audiovisual.

El guion, desarrollado a partir de la obra de Francisco del Valle, mantiene su tono épico y reflexivo, explorando la figura de un hombre que luchó por conservar su dignidad cuando el mundo parecía olvidarla.

El Hidalgo Don Rodrigo de Cervantes no es solo una serie: es un homenaje al padre del genio, al hombre común que forjó, sin saberlo, las raíces de la imaginación cervantina.

## 📺 Síguenos y descubre más

Muy pronto compartiremos más avances, imágenes y fragmentos del proceso creativo.`
  },
  {
    title: "Grupo Dauro crea los NFTs oficiales de los últimos partidos de la Selección Argentina, con arte final de Manuel Francisco Sánchez y la tecnología de Hipercapital Finance",
    excerpt: "El arte, la innovación y el fútbol argentino se unen en un proyecto sin precedentes. Grupo Dauro, en colaboración con Hipercapital Finance y el artista español Manuel Francisco Sánchez, ha creado los NFTs oficiales que representan los cuatro últimos partidos amistosos de la Selección Argentina.",
    date: "30 Octubre 2025",
    author: "Grupo Dauro",
    image: nftArgentinaCollection,
    category: "ia",
    slug: "nfts-oficiales-seleccion-argentina",
    bookImage: nftArgentinaPuertoRico,
    bookLink: "https://hipercapitalfinance.com/argentina-nft",
    content: `El arte, la innovación y el fútbol argentino se unen en un proyecto sin precedentes.

Grupo Dauro, en colaboración con Hipercapital Finance y el artista español Manuel Francisco Sánchez, ha creado los NFTs oficiales que representan los cuatro últimos partidos amistosos de la Selección Argentina, dentro del proyecto The Last Four, desarrollado por VMG Sports.

Estos NFTs transforman el legado deportivo en obras digitales coleccionables, una fusión de arte contemporáneo y tecnología blockchain que inmortaliza los encuentros frente a Venezuela, Puerto Rico, México y Honduras.

## Un proceso creativo y técnico único

Cada NFT ha sido producido por Grupo Dauro con un proceso creativo y técnico único.

El arte final lleva la firma de Manuel Francisco Sánchez, reconocido por su capacidad para plasmar en color la emoción del deporte y el sentimiento de todo un país.

Por su parte, Hipercapital Finance aporta la certificación en blockchain, asegurando la autenticidad, la trazabilidad y el valor digital de cada obra.

## Edición limitada y exclusividad

Cada partido cuenta con una edición limitada de cien mil NFTs, numerados y registrados, y cada uno incluye la participación en el sorteo de la camiseta oficial del encuentro, lo que convierte cada pieza en un recuerdo único e irrepetible.

## Una nueva forma de vivir el fútbol

La colección representa una nueva forma de vivir el fútbol argentino: uniendo arte, historia y tecnología en un mismo concepto.

Con The Last Four, el coleccionismo digital da un paso adelante, y cada NFT se convierte en un fragmento de la historia de la Selección Argentina.`
  },
  {
    title: "IA con identidad estética: la apuesta de Grupo Dauro IA",
    excerpt: "En un momento donde todo se acelera, se automatiza y se simplifica, en Grupo Dauro IA apostamos por lo contrario: por crear con intención, con belleza, con estructura. Nuestra propuesta no es usar la inteligencia artificial como una herramienta de producción rápida, sino como una extensión estética del pensamiento humano.",
    date: "31 Octubre 2025",
    author: "Grupo Dauro",
    image: iaConArte,
    category: "ia",
    slug: "ia-con-identidad-estetica",
    bookImage: logoDauroIA,
    bookLink: "https://www.dauroia.com",
    content: `En un momento donde todo se acelera, se automatiza y se simplifica, en Grupo Dauro IA apostamos por lo contrario: por crear con intención, con belleza, con estructura. Nuestra propuesta no es usar la inteligencia artificial como una herramienta de producción rápida, sino como una extensión estética del pensamiento humano.

Trabajamos con IA, sí. Pero no delegamos en ella. Dialogamos con ella. La dirigimos. La integramos.

## El arte no es un lujo: es el lenguaje

Desde nuestras raíces como editores, creadores y consultores culturales, entendimos muy pronto que el arte no es solo un campo de expresión, sino una forma de organizar el conocimiento, el mensaje y la presencia. Por eso, cuando empezamos a trabajar con inteligencia artificial, no lo hicimos desde la técnica, sino desde la estética.

Para nosotros, lo importante no es lo que la IA puede generar por sí sola, sino lo que puede construir cuando está al servicio de una mirada humana. Una voz. Un símbolo. Una idea que merece forma, tono y emoción.

## IA + mano humana: una colaboración necesaria

Lo que ves en nuestros vídeos, presentaciones, branding, informes o visuales no es contenido genérico. Es el resultado de un proceso en el que la IA se pone al servicio de una narrativa: la de cada autor, cada marca, cada organización.

Nuestros proyectos integran:

- Dirección artística
- Decisiones de estilo
- Curaduría visual
- Edición textual con intención
- Y siempre, un concepto profundo detrás

La IA no sustituye. Acompaña. Expande. Responde a una dirección clara.

## IA con identidad estética

Hemos elegido un lema que resume nuestra visión:
**"Inteligencia artificial con identidad estética"**

Porque no basta con que algo funcione. Tiene que decir algo. Tiene que tener presencia, coherencia, personalidad. Desde un avatar hasta una marca, desde una portada hasta una narrativa visual. Cada elemento que generamos tiene esa intención.

En Grupo Dauro IA no enseñamos a usar herramientas. Enseñamos a usarlas con criterio.

## ¿Te gustaría aplicar este enfoque a tu proyecto?

Si quieres usar la inteligencia artificial sin perder estilo, sin renunciar a tu esencia creativa, sin caer en el contenido genérico… estás en el lugar adecuado.`
  },
];

export const getLatestPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const categoryLabels: Record<BlogCategory, string> = {
  literatura: "Literatura",
  arte: "Arte",
  cine: "Cine",
  ia: "Inteligencia Artificial"
};
