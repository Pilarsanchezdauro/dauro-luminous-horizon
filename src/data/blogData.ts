import donRodrigoMain from "@/assets/don-rodrigo-main.png";
import donRodrigoPortrait from "@/assets/don-rodrigo-portrait.png";
import nftArgentinaMexico from "@/assets/nft-argentina-mexico.png";
import nftArgentinaPuertoRico from "@/assets/nft-argentina-puertorico.png";
import nftArgentinaCollection from "@/assets/nft-argentina-collection.png";
import iaConArte from "@/assets/ia-con-arte.png";
import logoDauroIA from "@/assets/logo-dauro-ia.png";
import latidoPresentacion from "@/assets/latido-presentacion-principal.jpg";
import libroLatido from "@/assets/libro-latido.png";
import lorenaAvelar from "@/assets/lorena-avelar.jpg";
import unaVozDosTierrasPortada from "@/assets/una-voz-dos-tierras-portada.png";
import elArteEsNavidad from "@/assets/el-arte-es-navidad.png";

export type BlogCategory = "literatura" | "arte" | "cine" | "ia" | "consejos" | "musica";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  ogImage?: string; // Open Graph image URL (public path)
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
    title: "Muere Antonio Domínguez de Haro en su Almuñécar natal, el pintor que no abandonó el mar ni el arte hasta el final",
    excerpt: "Anoche falleció en Almuñécar Antonio Domínguez de Haro, uno de los artistas españoles que con mayor coherencia y fidelidad construyó una obra propia a lo largo de toda una vida. Desde Grupo Dauro queremos rendirle homenaje desde el respeto y la admiración.",
    date: "14 Diciembre 2024",
    author: "Familia Dauro",
    image: "/blog/antonio-dominguez-de-haro.webp",
    ogImage: "/blog/antonio-dominguez-de-haro.webp",
    category: "arte",
    slug: "antonio-dominguez-de-haro-pintor-almunecar",
    gallery: [
      "/blog/dominguez-de-haro-obra-1.jpeg",
      "/blog/dominguez-de-haro-obra-2.jpeg",
      "/blog/dominguez-de-haro-obra-3.webp"
    ],
    content: `## Un creador constante hasta el final

Anoche falleció en Almuñécar Antonio Domínguez de Haro, uno de los artistas españoles que con mayor coherencia y fidelidad construyó una obra propia a lo largo de toda una vida. Hoy, a las 16:30, será despedido en su ciudad natal, junto a su familia y a quienes le acompañaron en su trayectoria personal y artística.

Desde Grupo Dauro queremos rendirle homenaje desde el respeto y la admiración. No hablamos desde la convivencia diaria, sino desde el conocimiento profundo de su obra, desde el trato personal mantenido a lo largo de los años y desde el reconocimiento sincero a un artista cuya dimensión trascendió ampliamente nuestras fronteras.

**Antonio Domínguez de Haro fue, ante todo, un creador constante.**
**Un pintor que nunca dejó de pintar, ni siquiera al final.**

## El mar como estructura vital

Nacido en Almuñécar en 1928, desarrolló una carrera que se extendió durante más de siete décadas. Su vínculo con el mar no fue circunstancial ni temático: fue estructural. Buceador, observador paciente y estudioso del mundo submarino, convirtió ese universo oculto en el eje central de una obra profundamente personal, reconocible y ajena a modas.

## Reconocimiento internacional

Mientras en España su nombre fue, en demasiadas ocasiones, tratado con discreción, fuera de nuestras fronteras su trabajo alcanzó un reconocimiento sólido y sostenido. Su obra fue valorada, expuesta y coleccionada especialmente en el ámbito internacional, donde se entendió con claridad la singularidad de su lenguaje plástico y la profundidad de su propuesta artística.

## Una visión única del mundo submarino

Antonio Domínguez de Haro no pintaba paisajes marinos: interpretaba la vida submarina. Sus cuadros no buscan el impacto inmediato, sino una relación más lenta y profunda con el espectador. Hay en ellos color, movimiento, formas orgánicas y una sensibilidad que conecta arte y naturaleza sin artificio ni grandilocuencia.

## Un legado protegido

Durante los últimos años, su hijo Tony Domínguez de Haro, como representante, acompañó y protegió su obra con rigor y dedicación, asegurando la continuidad y el cuidado de un legado que hoy adquiere aún mayor valor. Antonio siguió pintando hasta el final, no por disciplina ni obligación, sino porque crear era, sencillamente, su manera natural de estar en el mundo.

## Parte de una estirpe silenciosa

Hoy no es momento de balances ni de reivindicaciones forzadas, pero sí de señalar una realidad: la historia del arte español está llena de creadores que fueron antes reconocidos fuera que dentro, y Antonio Domínguez de Haro forma parte de esa estirpe silenciosa y coherente.

Desde Grupo Dauro acompañaremos hoy a su familia en su despedida, con respeto y gratitud, conscientes de que su obra permanece y seguirá encontrando nuevas miradas, dentro y fuera de España.

---

**El mar de Almuñécar, al que dedicó su vida, no pierde a uno de sus intérpretes.**
**Lo conserva.**

*Gracias, Antonio.*
*Por la constancia.*
*Por la fidelidad a tu mirada.*
*Y por una obra que seguirá hablando por ti.*

— Familia Dauro`
  },
  {
    title: "Crea Portadas Gratis con IA: Visualiza tu libro antes de publicar",
    excerpt: "Descubre nuestro generador gratuito de portadas con inteligencia artificial. Crea diseños profesionales para tu libro en segundos y visualiza cómo quedará antes de dar el paso definitivo.",
    date: "7 Diciembre 2025",
    author: "Grupo Dauro",
    image: "/og-generador-portadas-gratis.png",
    ogImage: "/og-generador-portadas-gratis.png",
    category: "consejos",
    slug: "generador-portadas-gratis-ia",
    bookLink: "/#generador-portadas-gratis",
    content: `## Visualiza tu libro antes de publicar

¿Alguna vez has imaginado cómo quedaría la portada de tu libro? Ahora puedes verlo en segundos, totalmente **gratis**, gracias a nuestro generador de portadas con inteligencia artificial.

## ¿Qué es el Generador de Portadas?

Es una herramienta online que te permite crear diseños de portadas profesionales para tu libro utilizando inteligencia artificial. Solo tienes que:

- **Introducir el título** de tu obra
- **Añadir el nombre del autor**
- **Describir brevemente** la temática o estilo que imaginas
- **Seleccionar el género** literario

¡Y en pocos segundos tendrás varias propuestas de portada!

## ¿Para qué sirve?

### 📚 Para autores que están escribiendo
Visualizar una portada mientras escribes puede ser una fuente de inspiración increíble. Ver tu nombre y tu título en una portada profesional te motiva a seguir adelante.

### 🎨 Para decidir el estilo visual
¿No sabes si tu novela debería tener una portada minimalista, ilustrada o fotográfica? Prueba diferentes estilos y descubre qué funciona mejor.

### 💡 Para presentar tu proyecto
Si necesitas mostrar tu libro a editores, agentes o en crowdfunding, una portada atractiva marca la diferencia.

### 🎁 Totalmente gratis
Ofrecemos generaciones gratuitas para que puedas experimentar sin compromiso. Es nuestra forma de apoyar a los autores en sus primeros pasos.

## ¿Cómo funciona la IA?

Nuestro generador utiliza modelos avanzados de inteligencia artificial entrenados en millones de imágenes. A partir de tu descripción, crea diseños únicos que respetan los estándares profesionales del sector editorial.

## ¿Y si quiero una portada profesional definitiva?

El generador gratuito es perfecto para visualizar ideas, pero para tu portada final recomendamos trabajar con nuestro equipo de diseñadores profesionales. Ellos crean portadas personalizadas que destacan en librerías y plataformas online.

---

## 🚀 Pruébalo ahora

No esperes más. Introduce los datos de tu libro y descubre cómo podría lucir tu próxima obra.

**Es gratis, es rápido y puede ser el impulso que necesitas para dar el siguiente paso en tu carrera literaria.**`
  },
  {
    title: "El Arte es Navidad: nuestra canción original para estas fiestas",
    excerpt: "Grupo Dauro presenta 'El Arte es Navidad', una composición original que celebra la creatividad y el espíritu navideño. Una producción propia que une música, poesía y el compromiso cultural que nos define.",
    date: "7 Diciembre 2025",
    author: "Grupo Dauro",
    image: elArteEsNavidad,
    ogImage: "/og-el-arte-es-navidad.png",
    category: "musica",
    slug: "el-arte-es-navidad-cancion",
    bookLink: "https://youtu.be/mKHhpGMBVcI",
    content: `## El Arte es Navidad

Desde Grupo Dauro queremos compartir con todos vosotros nuestra producción musical navideña: **El Arte es Navidad**.

Esta canción original representa nuestro compromiso con la cultura y la creatividad, llevado a un nuevo formato. Porque el arte no solo se lee, también se escucha, se siente y se comparte.

## Una producción 100% Dauro

*El Arte es Navidad* ha sido compuesta, producida y editada íntegramente por nuestro equipo. Desde la letra hasta los arreglos musicales, cada detalle refleja la identidad artística que nos caracteriza desde hace más de dos décadas.

## Escúchala ahora

<iframe width="100%" height="315" src="https://www.youtube.com/embed/mKHhpGMBVcI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## El espíritu navideño en clave cultural

La Navidad es tiempo de compartir, de reunirse y de celebrar. Para nosotros, también es momento de recordar que el arte nos une, nos inspira y nos acompaña en los momentos más especiales.

Con esta canción queremos transmitir un mensaje de esperanza, creatividad y celebración. Porque donde hay arte, hay vida. Y donde hay vida, hay motivos para celebrar.

## Comparte la magia

Te invitamos a escuchar *El Arte es Navidad*, a compartirla con quienes más quieres y a dejarte llevar por el espíritu creativo de estas fiestas.

---

*¡Feliz Navidad de parte de todo el equipo de Grupo Dauro!*`
  },
  {
    title: "Guía Editorial para Autores: lo esencial que debes saber antes de publicar",
    excerpt: "Publicar un libro es emocionante, pero también exige preparación. En Grupo Dauro recibimos cada año decenas de manuscritos… y casi todos comparten los mismos errores. Hemos creado una guía práctica para ayudarte.",
    date: "7 Diciembre 2025",
    author: "Equipo Dauro",
    image: "/og-consejos-autores.png",
    ogImage: "/og-consejos-autores.png",
    category: "consejos",
    slug: "guia-editorial-para-autores",
    content: `Publicar un libro es emocionante, pero también exige preparación.

En Grupo Dauro recibimos cada año decenas de manuscritos… y casi todos comparten los mismos errores: repeticiones, falta de capítulos, exceso de datos, diálogos artificiales, incoherencias, títulos débiles y expectativas irreales sobre las ventas o el trabajo editorial.

Para ayudar a nuestros autores a evitar estos problemas sin abrumarlos, hemos creado una **guía práctica**, directa y fácil de aplicar, donde reunimos lo más importante que debe saber un escritor antes de publicar.

Una herramienta pensada para que el proceso editorial sea más rápido, más claro y más profesional.

## Lo que encontrarás en esta guía

No es un manual interminable. No es teoría académica. Es información concreta, con ejemplos y recomendaciones claras:

### ✔️ Cómo entregar un manuscrito bien preparado
Formato, revisión básica, uso de estilos, coherencia y capítulos.

### ✔️ Los errores de estilo más comunes
Repeticiones, verbos débiles, diálogos inverosímiles, párrafos eternos.

### ✔️ Datos y documentación: cuánto es suficiente
¿Por qué una novela no puede convertirse en Wikipedia?

### ✔️ Lo que hace una editorial… y lo que no
La realidad del trabajo editorial que muchos autores desconocen.

### ✔️ Mitos que debemos desterrar
Incluido el mítico "la editorial se queda todo menos mi 10%".

### ✔️ Aspectos legales y técnicos
ISBN, citas, derechos, imágenes, etc.

### ✔️ Consejos de promoción realistas
Porque sí: la visibilidad también depende del autor.

## Ejemplos que verás dentro de la guía

### 🔸 El inicio que no engancha
"María se despertó, se duchó, desayunó…" — Esto hunde una novela antes de empezar.

### 🔸 El diálogo que nadie usaría en la vida real
"—Como ya sabes, hermano, papá murió en 1987…" — Los lectores no hablan como manuales de instrucciones.

### 🔸 El exceso de datos
"Aleación del 0,2%… guerra de 1873…" — Una novela no debe convertirse en un ensayo técnico.

### 🔸 El mito de que "la editorial no hace nada"
Sin movimiento del autor, ningún libro se impulsa solo.

## ¿Por qué hemos creado esta guía?

Porque lo que muchos autores necesitan no es un tratado teórico, sino una orientación clara y honesta que les permita:

- Entregar un texto más profesional
- Comprender mejor el proceso editorial
- Evitar retrasos innecesarios
- Tener expectativas realistas
- Participar activamente en la vida de su obra

Con esta guía bien aprovechada, se consigue.

## Mensaje final

Un libro nace del autor, pero crece gracias a la colaboración con la editorial. Esta guía existe para que ambos hablemos el mismo idioma desde el principio.

---

*¿Te gustaría recibir la guía completa en PDF? Contáctanos a través de nuestro formulario y te la enviaremos.*`
  },
  {
    title: "Una voz para dos tierras: un viaje poético entre continentes",
    excerpt: "El periplo de presentaciones del libro Una voz para dos tierras, de Lorena Avelar, ha sido un auténtico puente entre culturas. Hemos tenido el privilegio de acompañar a la autora en un recorrido lleno de emoción, poesía y encuentros significativos a ambos lados del Atlántico.",
    date: "1 Noviembre 2025",
    author: "Equipo Dauro",
    image: unaVozDosTierrasPortada,
    ogImage: "/og-una-voz-dos-tierras.png",
    category: "literatura",
    slug: "una-voz-para-dos-tierras-presentaciones",
    bookImage: "/products/una-voz-dos-tierras.jpg",
    bookLink: "/producto/una-voz-para-dos-tierras",
    content: `El periplo de presentaciones del libro **Una voz para dos tierras**, de Lorena Avelar, ha sido un auténtico puente entre culturas. Hemos tenido el privilegio de acompañar a la autora en un recorrido lleno de emoción, poesía y encuentros significativos a ambos lados del Atlántico.

## Un viaje poético por España

Este ciclo ha culminado con cuatro presentaciones en España que han dejado huella en cada rincón:

📍 **Madrid**, en la emblemática Casa de México en España, donde todo comenzó y donde la poesía tendió su primer lazo entre las dos tierras.

📍 **Monachil**, en la Casa de la Cultura, rodeados de montañas y palabras compartidas.

📍 **Albolote**, otra parada entrañable en la Casa de la Cultura, donde el público nos recibió con calidez.

📍 **Valencia**, ciudad abierta y luminosa, donde la poesía resonó con fuerza.

## Regreso a las raíces

Y, como no podía ser de otra manera, este viaje también regresó a sus raíces con dos presentaciones en **México**, país natal de la autora, donde la emoción fue aún más intensa y el reencuentro con lectores y amigos dio un cierre simbólico y entrañable a este trayecto.

## Más que un libro: un puente cultural

*Una voz para dos tierras* no solo ha unido a autores y lectores, sino también a dos culturas, dos idiomas compartidos y una sola pasión: la poesía.

Desde el equipo editorial de Grupo Dauro, no podemos estar más orgullosos de haber acompañado esta obra en su camino. Gracias a todas las instituciones, lectores y personas que han hecho posible esta gira.

## Hasta pronto

Esto no es un adiós, sino un hasta pronto. Porque los libros, como los buenos viajes, siempre dejan la puerta entreabierta para volver.`
  },
  {
    title: "Presentación de 'Latido. Apasionadamente vuestro' en el Cuarto Real de Santo Domingo",
    excerpt: "Granada, 28 de octubre de 2025. Ayer presentamos en el Cuarto Real de Santo Domingo Latido. Apasionadamente vuestro, la nueva novela de Carmen Alcaide, con un anuncio inesperado: estamos trabajando en la adaptación de la obra a serie de televisión.",
    date: "28 Octubre 2025",
    author: "Equipo Dauro",
    image: latidoPresentacion,
    ogImage: "/og-latido-presentacion.jpg",
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
    ogImage: "/og-don-rodrigo.png",
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
    ogImage: "/og-nft-argentina.png",
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
    ogImage: "/og-ia-con-arte.png",
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
  ia: "Inteligencia Artificial",
  consejos: "Consejos para Autores",
  musica: "Música"
};
