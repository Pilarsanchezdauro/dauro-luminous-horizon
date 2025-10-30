import donRodrigoMain from "@/assets/don-rodrigo-main.png";
import donRodrigoPortrait from "@/assets/don-rodrigo-portrait.png";

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
}

export const blogPosts: BlogPost[] = [
  {
    title: "Presentación de 'Latido. Apasionadamente vuestro' en el Cuarto Real de Santo Domingo",
    excerpt: "Granada, 28 de octubre de 2025. Ayer presentamos en el Cuarto Real de Santo Domingo Latido. Apasionadamente vuestro, la nueva novela de Carmen Alcaide, con un anuncio inesperado: estamos trabajando en la adaptación de la obra a serie de televisión.",
    date: "28 Octubre 2025",
    author: "Equipo Dauro",
    image: "/src/assets/presentacion-latido.jpg",
    category: "literatura",
    slug: "presentacion-latido-carmen-alcaide",
    bookImage: "/src/assets/libro-latido.png",
    bookLink: "https://www.edicionesdauro.com/articulo/1186-LATIDO-Apasionamente-vuestro/",
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
    bookLink: "https://www.youtube.com/@GrupoDauroEditorial",
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
    title: "El futuro de la edición literaria en la era digital",
    excerpt:
      "Reflexiones sobre cómo la tecnología está transformando la manera en que creamos, distribuimos y consumimos literatura.",
    date: "15 Enero 2025",
    author: "Equipo Dauro",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    category: "literatura",
    slug: "futuro-edicion-literaria-era-digital",
  },
  {
    title: "Arte contemporáneo y nuevas narrativas visuales",
    excerpt:
      "Un recorrido por las tendencias actuales del arte contemporáneo y cómo los artistas están redefiniendo los límites de la expresión visual.",
    date: "10 Enero 2025",
    author: "María González",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    category: "arte",
    slug: "arte-contemporaneo-narrativas-visuales",
  },
  {
    title: "La inteligencia artificial como herramienta creativa",
    excerpt:
      "Exploramos cómo la IA está abriendo nuevas posibilidades en los procesos creativos sin sustituir la esencia humana del arte.",
    date: "5 Enero 2025",
    author: "Carlos Ruiz",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    category: "ia",
    slug: "ia-herramienta-creativa",
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
