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
  metaTitle?: string; // SEO <title> conciso (~60 car.); si falta se usa title
  metaDescription?: string; // SEO meta description (~155 car.); si falta se usa excerpt
  keywords?: string; // Palabras clave separadas por comas
  imageAlt?: string; // Texto alternativo SEO de la imagen de portada
  category: BlogCategory;
  slug?: string;
  content?: string;
  bookImage?: string;
  bookLink?: string;
  amazonLink?: string;
  image2?: string;
  image3?: string;
  gallery?: string[];
  hidden?: boolean; // Hide from blog listing (still accessible via direct URL)
}

export const blogPosts: BlogPost[] = [
  {
    title: "Una presentación campera y por estricta invitación: «Los fotones creen en Dios», de Francisco López Barrios, se estrena en O Grove",
    excerpt: "Nada de salón de actos: el jardín de una casa privada junto al mar, un mantel rojo bajo los árboles, guitarras, un embajador, un alcalde y amigos convocados uno a uno. Así presentó Francisco López Barrios su novela «Los fotones creen en Dios» en O Grove.",
    date: "21 Agosto 2026",
    author: "Grupo Dauro",
    image: "/blog/fotones-presentacion/portada-mesa.jpg",
    ogImage: "/blog/fotones-presentacion/portada-mesa.jpg",
    imageAlt: "Francisco López Barrios, entre Álex Piñeiro Reboredo y Charo Fernández Cotta, en la presentación de Los fotones creen en Dios en O Grove",
    metaTitle: "La presentación campera de «Los fotones creen en Dios»",
    metaDescription: "Crónica de la presentación de la novela de Francisco López Barrios en O Grove: una velada campera por estricta invitación, con un embajador, un alcalde, guitarras y firma de ejemplares.",
    keywords: "Los fotones creen en Dios, Francisco López Barrios, presentación libro O Grove, Grupo Dauro, novela literaria",
    category: "literatura",
    slug: "presentacion-los-fotones-creen-en-dios-o-grove",
    bookLink: "https://tiendaspain.grupodauro.com/shop/los-fotones-creen-en-dios-18029",
    amazonLink: "https://www.amazon.es/dp/B0H95MJS2H",
    gallery: [
      "/blog/fotones-presentacion/mesa-campera.jpg",
      "/blog/fotones-presentacion/publico-jardin.jpg",
      "/blog/fotones-presentacion/paco-y-amigos.jpg",
    ],
    content: `## Nada de tarima, nada de micrófono solemne: una huerta, un mantel rojo y guitarras

Hay autores que presentan sus libros en salones de actos. Y luego está **Francisco López Barrios**.

El 13 de agosto, en **O Grove** —el pueblo gallego donde el autor granadino terminó de escribir la novela—, **«Los fotones creen en Dios»** se presentó como se presentan las cosas importantes de verdad: entre amigos. Nada de local público: el jardín trasero de una **casa privada junto al mar**, protegido del viento, cedido para la ocasión por Miguel, el alma del célebre Náutico de San Vicente —ese escenario mítico por el que pasan, en petit comité, Joaquín Sabina y media música española cuando recalan en Galicia—. Y una regla que Paco defendió con la misma sonrisa con la que la impuso: **por estricta invitación**. Cada asistente estaba allí porque el autor lo había querido allí.

## Un embajador, un alcalde y una boya amarilla por lámpara

La lista de invitados dice mucho de quién es Francisco López Barrios: por aquel jardín pasaron **Miguel Utray**, embajador de España en Filipinas, **José Antonio Cacabelos**, alcalde de O Grove, un histórico dirigente político gallego y empresarios y hosteleros de la ría, mezclados sin protocolo alguno con vecinos y amigos de siempre. Todo bajo una **boya amarilla reconvertida en lámpara**, con las hamacas al fondo y un manzano dando sombra a la mesa presidencial.

## La originalidad de Paco

Quien conozca su literatura no se sorprenderá. El hombre que ha metido en una misma novela los aceleradores de partículas y el misticismo sufí, los espacios cuánticos de castigo del río Darro y los resucitados que pasean por Granada con toda naturalidad, no iba a hacer una presentación de folleto. Hizo una **velada campera**, mitad romería mitad tertulia, donde se habló de física y de espíritu con una copa de albariño en la mano.

En la mesa, el autor conversó sobre la novela flanqueado por dos periodistas: el gallego **Álex Piñeiro Reboredo**, que ofició de presentador, y **Charo Fernández Cotta**, periodista y escritora llegada desde Sevilla para la ocasión. Hubo lectura, hubo risas, hubo preguntas de las buenas y una larga **firma de ejemplares**.

Y como remate, fiel a sí mismo, Paco reunió a **veintidós comensales bajo los árboles** en la comida anual de la **cofradía agrocultural La Hierbabuena** —mantel rojo, guitarras y sombreros de paja—, con su regla de oro de siempre: aquí se viene invitado, pero la cuenta se paga entre todos, a partes iguales y con los recibos en la mano. Este año las cuentas las llevó una juez. Salieron exactas.

> *«Estamos en el umbral de un mundo en el que la síntesis de materia y espiritualidad se realizará de manera imperceptible.»*

## La novela

**«Los fotones creen en Dios»** (Grupo Dauro, 2026) es una novela de fronteras: entre la física y la mística, entre el pasado y el porvenir, entre la carcajada y el vértigo. Una Granada donde el tiempo se pliega, una trama de espionaje que cruza el Estrecho y un autor —Premio Ciudad de Granada de novela y Premio Andalucía de la Crítica— en plena forma.

- 📖 En papel (22 €) y ebook (9,99 €) en [nuestra tienda](https://tiendaspain.grupodauro.com/shop/los-fotones-creen-en-dios-18029) y en [Amazon](https://www.amazon.es/dp/B0H95MJS2H).
- 🌐 En [la web del libro](https://losfotonescreenendios.grupodauro.com) puedes hojear las 25 primeras páginas y ver todas las fotos de la presentación.
`,
  },
  {
    title: "«Pelayo. Leyenda y Vida I»: la novela histórica de Tony de Haro sobre el origen de la Reconquista y el nacimiento del Reino de Asturias",
    excerpt: "Asturias, año 692. Un niño nace entre la nieve y un pueblo corea su nombre. Veinte años después plantará cara al mayor ejército del mundo. Tony de Haro debuta en la novela histórica con «Pelayo. Leyenda y Vida I», el origen de la Reconquista. Ya a la venta.",
    date: "3 Julio 2026",
    author: "Grupo Dauro",
    image: "/blog/pelayo-leyenda-y-vida.jpg",
    ogImage: "/blog/pelayo-leyenda-y-vida.jpg",
    category: "literatura",
    slug: "pelayo-leyenda-y-vida-tony-de-haro",
    bookLink: "https://tiendaspain.grupodauro.com/shop/pelayo-leyenda-y-vida-i-18016",
    content: `## «¡He aquí a mi hijo Pelayo, vuestro futuro señor! ¡De él cantarán los juglares hazañas eternas!»

Nadie creyó al padre. Debieron hacerlo.

Asturias, año 692. La nieve cae sobre un recién nacido en una torre del norte mientras un pueblo entero corea su nombre. Veinte años después, ese niño cabalgará entre ciudades en llamas, cruzará un reino que se desgarra entre traiciones y conspiraciones, y plantará cara al ejército más poderoso que el mundo ha conocido.

Así arranca **«Pelayo. Leyenda y Vida I»**, la primera novela de **Tony de Haro** y el comienzo de una gran saga histórica que publicamos en Grupo Dauro.

## El origen de la Reconquista, en clave de gran novela histórica

Mientras Pelayo crece —cazando lobos, aprendiendo en quién puede fiarse un hombre—, al otro lado del Estrecho se forja la tormenta perfecta: un conde cegado por la venganza abre las puertas de Hispania al invasor. Cuando el reino visigodo cae de rodillas, cuando los más valientes se rinden y los más poderosos huyen, un solo hombre decide que él no.

> *«Un solo hombre decidió que él no. Que él jamás.»*

**«Pelayo»** es una novela histórica monumental sobre el origen de la Reconquista y el nacimiento del Reino de Asturias: 690 páginas de épica, honor, traición y aventura, con el rigor de la investigación y el pulso de la mejor novela de aventuras.

## La historia detrás del libro: un linaje que se remonta a Pelayo

Detrás de esta novela hay una historia real casi tan asombrosa como la que cuenta. **Tony de Haro** —nombre literario de Antonio Domínguez— vive entre **Granada y Almuñécar desde niño**, y es hijo del **internacional pintor Antonio Domínguez de Haro**, [a quien despedimos hace poco en su Almuñécar natal](/blog/antonio-dominguez-de-haro-pintor-almunecar).

Una **talla románica** y un viejo **sello de la Orden del Santo Sepulcro**, conservados en la familia, encendieron una investigación que reveló algo extraordinario: su **linaje materno se remonta al propio Pelayo**. De esa mezcla de herencia, arte e Historia nace esta novela.

## Ficha del libro

- **Título:** Pelayo. Leyenda y Vida I
- **Autor:** Tony de Haro
- **Editorial:** Grupo Dauro
- **ISBN:** 979-13-991166-7-0
- **Formato:** 15 × 21 cm, rústica con solapas, 690 páginas — 25,90 €
- **Género:** novela histórica · saga «Leyenda y Vida» (vol. I)

## Dónde conseguirla

- En [nuestra tienda](https://tiendaspain.grupodauro.com/shop/pelayo-leyenda-y-vida-i-18016), en papel
- En tu librería habitual (distribuye Quares)
- Y toda la información, con las primeras páginas para hojear, en la web del libro: [pelayo.grupodauro.com](https://pelayo.grupodauro.com)

Si tienes un club de lectura, escríbenos: organizamos **encuentros con el autor**, presenciales u online, y tenemos guía de lectura disponible.

*Grupo Dauro · Editorial independiente en Granada desde 1996 · info@grupodauro.com · WhatsApp +34 640 91 90 90*`,
  },
  {
    title: "«Cartas desde la otra orilla»: la primera novela de Carmen Puerta Extremera, un misterio de secretos de familia entre la Guerra Civil y el presente",
    excerpt: "Un joven entierra a un abuelo al que apenas conoció y encuentra, en un cajón que debería estar vacío, cartas escritas en secreto durante medio siglo a una mujer llamada Ángela. La poeta Carmen Puerta Extremera debuta en la novela con una historia de misterio, memoria y amor que ya está a la venta en papel y ebook.",
    metaTitle: "Cartas desde la otra orilla · Novela de Carmen Puerta",
    metaDescription: "«Cartas desde la otra orilla», primera novela de Carmen Puerta Extremera: misterio y secretos de familia entre la Guerra Civil y hoy. En papel y ebook.",
    keywords: "Cartas desde la otra orilla, Carmen Puerta Extremera, novela de misterio, secretos de familia, novela Guerra Civil, novela española 2026, misterio familiar, Grupo Dauro, comprar novela",
    imageAlt: "Portada de «Cartas desde la otra orilla», novela de Carmen Puerta Extremera publicada por Grupo Dauro",
    date: "3 Julio 2026",
    author: "Grupo Dauro",
    image: "/blog/cartas-desde-la-otra-orilla.jpg",
    ogImage: "/blog/cartas-desde-la-otra-orilla.jpg",
    category: "literatura",
    slug: "cartas-desde-la-otra-orilla-carmen-puerta-extremera",
    bookLink: "https://tiendaspain.grupodauro.com/shop/cartas-desde-la-otra-orilla-18026",
    amazonLink: "https://www.amazon.es/dp/B0H7JSW6KK",
    content: `## Hay cartas que cruzan el tiempo. Y secretos que una familia guarda durante generaciones.

Cuando Ángel viaja a un pueblo perdido de Andalucía para enterrar a un abuelo al que apenas conoció, cree que solo serán tres días. Pero en la casa del muerto, en un cajón que debería estar vacío, aparece un sobre con un nombre de mujer —**Ángela**— y un puñado de cartas escritas en secreto a lo largo de medio siglo.

¿Quién fue Ángela? ¿Por qué su abuelo le escribió toda la vida sin llegar a enviárselas? ¿Y por qué, en aquella vieja casa junto al río, Ángel empieza a sentir que no está nunca del todo solo?

Así arranca **«Cartas desde la otra orilla»**, la primera novela de **Carmen Puerta Extremera**, que publicamos en [Grupo Dauro](/grupo-dauro/editorial) con la ilusión de quien sabe que tiene entre manos una de esas historias que se leen con el corazón encogido.

## Una novela de misterio y secretos de familia

**«Cartas desde la otra orilla»** es una novela de misterio en el sentido más hondo: el que no va de detectives, sino de **secretos de familia**. A través de las cartas-poema que el abuelo escribió en secreto —de la **Guerra Civil española** al presente—, Ángel irá destejiendo una herida cosida a tres generaciones: la guerra, el hambre, los amores renunciados y los hijos criados por quien no los engendró.

Dos fuerzas tiran de él a la vez. Una es **Miriam**, la nieta de la vieja nodriza: un amor inmediato y luminoso, envenenado por una sospecha que crece página a página. La otra es lo inexplicable: una respiración que no es la suya, una mano fría en la frente, una mujer que se aparece junto al río y se desvanece.

> *«Lo que el tiempo calla, la memoria lo reclama.»*

## La poeta que se atrevió con la novela

**Carmen Puerta Extremera** (Cazorla, Jaén, 1963) escribe desde Navarra, donde echó raíces siendo niña. Poeta con **siete poemarios publicados** —entre ellos «La otra orilla», que conoció tres ediciones—, preside la Asociación Navarra de Escritoras y Escritores y cofundó Aldara Ediciones.

Su debut en la narrativa tiene la prosa de una poeta: sensorial y contenida. Cada página está escrita con la precisión de quien lleva toda la vida pesando las palabras, y eso se nota en una historia donde la emoción nunca se desborda: se contiene, como los secretos.

## Ficha del libro

- **Título:** Cartas desde la otra orilla
- **Autora:** Carmen Puerta Extremera
- **Editorial:** Grupo Dauro
- **ISBN:** 979-13-991166-6-3
- **Formato papel:** 15 × 21 cm, rústica con solapas, 212 páginas — 17,00 €
- **Ebook (EPUB y Kindle):** 7,99 €
- **Género:** novela de misterio, secretos de familia, ficción contemporánea española

## Dónde conseguirla

- En [nuestra tienda](https://tiendaspain.grupodauro.com/shop/cartas-desde-la-otra-orilla-18026), en papel y en [ebook](https://tiendaspain.grupodauro.com/shop/cartas-desde-la-otra-orilla-ebook-18028)
- En [Amazon](https://www.amazon.es/dp/B0H7JSW6KK), en papel y Kindle
- En tu librería habitual (distribuye Quares)
- Y toda la información, con las primeras páginas para hojear, en la web del libro: [cartasdesdelaotraorilla.grupodauro.com](https://cartasdesdelaotraorilla.grupodauro.com)

Si tienes un club de lectura, escríbenos: organizamos **encuentros con la autora**, presenciales u online, y tenemos guía de lectura disponible. Y si eres librero, [aquí tienes la ficha técnica](https://cartasdesdelaotraorilla.grupodauro.com/ficha-tecnica.pdf).

## Sigue descubriendo nuestro catálogo

- ¿Otra novela recién nacida? Lee sobre [«Pelayo. Leyenda y Vida I», de Tony de Haro](/blog/pelayo-leyenda-y-vida-tony-de-haro), la novela histórica sobre el origen de la Reconquista.
- ¿Eres autor y sueñas con publicar? Descubre cómo [editamos tu libro en Grupo Dauro](/grupo-dauro/editorial) y visita el [blog de la editorial](/blog).

*Grupo Dauro · Editorial independiente en Granada desde 1996 · info@grupodauro.com · WhatsApp +34 640 91 90 90*`,
  },

  {
    title: "La Singularidad Esencial: el libro que desafía todo lo que creías saber sobre el cambio personal",
    excerpt: "Cuando mejorar ya no basta. Cuando adaptarse es insuficiente. Cuando necesitas un punto de no retorno. El nuevo libro de Pilar Sánchez propone un sistema probabilístico de 90 días para romper con tu vida anterior.",
    date: "29 Diciembre 2025",
    author: "Grupo Dauro",
    image: "/blog/la-singularidad-esencial.png",
    ogImage: "/blog/la-singularidad-esencial.png",
    category: "literatura",
    slug: "la-singularidad-esencial-pilar-sanchez",
    bookLink: "https://www.grupodauro.com/producto/la-singularidad-esencial",
    amazonLink: "https://leer.amazon.es/sample/B0GCWFLTBV?clientId=share",
    content: `## Cuando mejorar ya no basta. Cuando adaptarse es insuficiente. Cuando necesitas un punto de no retorno.

## Un libro que nace de la experiencia, no de la teoría

Pilar Sánchez tiene 61 años y ha pasado toda su vida saltando al vacío.

No es una metáfora. Es literal. Empresaria, escritora, productora de cine, presidenta de Grupo Dauro, fundadora de más de una docena de empresas, superviviente de tres crisis financieras importantes. Ha tocado el éxito y lo ha perdido. Ha construido y ha destruido. Ha caído tan hondo que no veía la superficie, y ha vuelto a subir.

*«Mi realidad supera muchas veces la ficción. No lo digo para impresionarte. Lo digo para que entiendas que lo que vas a leer en este libro no viene de la teoría. No viene de estudiar lo que otros hicieron. Viene de haberlo vivido. Cada concepto, cada advertencia que encontrarás aquí tiene detrás una cicatriz mía.»*

Después de cuatro libros sobre desarrollo personal, Pilar sentía que faltaba algo. Una pieza más grande que no había logrado capturar. Fragmentos de algo más amplio que no conseguía ver completo.

**La Singularidad Esencial es esa pieza.**

## ¿Qué es la Singularidad Esencial?

En física, una singularidad es un punto donde las reglas conocidas dejan de aplicarse. Un momento donde el sistema anterior colapsa y emerge algo completamente nuevo.

Este libro propone que en la vida personal existe un equivalente: **el punto de no retorno que lo cambia todo**.

No se trata de mejorar hábitos. No se trata de optimizar rutinas. No se trata de pequeños ajustes incrementales. Se trata de reconocer cuándo tu sistema de vida actual ha llegado a su límite estadístico y necesitas cruzar un umbral irreversible hacia algo genuinamente diferente.

**La diferencia con otros enfoques es radical: este libro está basado en probabilidad y sistemas, no en pensamiento mágico.**

## Lo que NO encontrarás en este libro

- «Confía en el proceso»
- «Todo pasa por algo»
- «Vibra alto»
- «Visualiza tu futuro ideal»
- Afirmaciones vacías
- Promesas de transformación instantánea

## Lo que SÍ encontrarás

- **Un sistema probabilístico de 90 días** fundamentado en cómo funciona realmente el cambio neurobiológico
- **Herramientas para identificar tu Punto de Ruptura**: el momento exacto donde el costo de seguir igual supera el costo de cambiar
- **El concepto del Vacío Productivo**: esa fase de incertidumbre necesaria que la mayoría de la gente interpreta erróneamente como fracaso
- **La diferencia entre cambiar resultados y cambiar sistemas**: por qué los pequeños ajustes nunca funcionan a largo plazo
- **Cómo leer los indicadores adelantados**: señales que te dicen si vas por buen camino antes de que los resultados sean visibles
- **La aritmética de lo invisible**: entender que la transformación real es acumulativa y estadística, no mágica ni instantánea

## La estructura: cuatro fases de la travesía

El libro se organiza en cuatro partes que reflejan el viaje completo de transformación:

### PARTE I — EL DERRUMBE
*El Punto de Ruptura • El Vacío Productivo*

Reconocer que tu sistema actual ha llegado a su límite. Atravesar la incertidumbre sin anestesiarla.

### PARTE II — LA CONSTRUCCIÓN
*El Laboratorio de Prototipos • La Arquitectura del Nuevo Sistema • La Consolidación*

Diseñar conscientemente un nuevo sistema de vida. Experimentar, ajustar, consolidar.

### PARTE III — LA RESISTENCIA
*El Campo de Fuerza Invisible • La Nostalgia del Abismo*

Todo lo que intentará devolverte al sistema anterior: el entorno, las personas cercanas, tú mismo. Y la extraña tentación de volver a lo que no funcionaba.

### PARTE IV — DESPUÉS DE LA TRAVESÍA
*La Reconquista de lo Abandonado • La Ingeniería del Entorno • La Aritmética de lo Invisible • La Economía de las Renuncias*

Integrar lo nuevo con lo valioso del pasado. Diseñar un entorno que sostenga el cambio. Entender los números invisibles del progreso. Decidir qué dejar ir definitivamente.

## Para quién es este libro

**Este libro es para ti si:**

- Sientes que has llegado a un techo que ninguna mejora incremental va a romper
- Has probado múltiples enfoques de desarrollo personal y ninguno ha producido cambios duraderos
- Intuyes que necesitas algo más radical que «mejores hábitos»
- Estás dispuesto a cuestionar el sistema completo de tu vida, no solo los síntomas
- Prefieres la honestidad brutal a las promesas reconfortantes
- Quieres entender la mecánica real del cambio, no su versión romantizada

**No es para ti si:**

- Buscas soluciones rápidas o fórmulas mágicas
- Prefieres que te digan lo que quieres oír
- No estás dispuesto a atravesar un período de incertidumbre real

## Una cita del libro

*«Hay algo que necesitas saber antes de continuar: ignorar tu Punto de Ruptura no hace que desaparezca. Solo garantiza que reaparecerá con mayor intensidad más adelante.*

*Cada vez que sientes la señal y eliges anestesiarla —con más trabajo, más distracciones, más racionalización— no estás resolviendo nada. Estás acumulando presión en un sistema que eventualmente colapsará, pero sin tu participación consciente en el proceso.*

*La diferencia entre atravesar tu Punto de Ruptura conscientemente versus esperar a que el sistema colapse por sí solo es la diferencia entre demoler intencionalmente una estructura obsoleta para construir algo nuevo, y esperar a que se derrumbe sobre ti.»*

## Sobre la autora

**Pilar Sánchez** es empresaria, escritora, editora y productora de cine. Presidenta de Grupo Dauro, ha fundado y dirigido más de una docena de empresas a lo largo de su carrera. Su formación abarca Finanzas Internacionales, Derecho Internacional y Psicología, lo que le otorga una perspectiva única que integra la visión empresarial con la comprensión profunda del comportamiento humano.

Ha sido reconocida con la Medalla de Oro al Mérito Profesional y el premio de Empresaria Asociada de BPW Madrid. *La Singularidad Esencial* es su quinto libro.

## Ficha técnica

| | |
|---|---|
| **Título** | La Singularidad Esencial |
| **Subtítulo** | El sistema probabilístico de 90 días para romper con tu vida anterior y construir una que se parezca más a ti |
| **Autora** | Pilar Sánchez |
| **Editorial** | Grupo Dauro |
| **Páginas** | 232 |
| **ISBN** | 979-13-991166-3-2 |

## Consigue tu ejemplar

**La Singularidad Esencial ya está disponible.**

Sin misticismo. Sin promesas vacías. Solo la física brutal del cambio real.`
  },
  {
    title: "La España Quebrantada: Manuel Orozco presenta su nuevo ensayo",
    excerpt: "En Grupo Dauro seguimos apostando por la diversidad de voces y el debate de ideas. Hoy presentamos 'La España Quebrantada', el nuevo ensayo de Manuel E. Orozco Redondo, una obra que invita a la reflexión sobre la historia contemporánea de nuestro país.",
    date: "28 Diciembre 2025",
    author: "Grupo Dauro",
    image: "/blog/la-espana-quebrantada.jpg",
    ogImage: "/blog/la-espana-quebrantada.jpg",
    category: "literatura",
    slug: "la-espana-quebrantada-manuel-orozco",
    bookLink: "https://www.grupodauro.com/producto/la-espana-quebrantada",
    amazonLink: "https://leer.amazon.es/sample/8412849671?clientId=share",
    content: `En Grupo Dauro seguimos apostando por la diversidad de voces y el debate de ideas. Hoy presentamos **"La España Quebrantada"**, el nuevo ensayo de **Manuel E. Orozco Redondo**, una obra que invita a la reflexión sobre la historia contemporánea de nuestro país desde una perspectiva personal y sin concesiones.

## Sobre el libro

*La España Quebrantada* es un ensayo político en el que el autor realiza un recorrido crítico por algunos de los episodios más relevantes de nuestra historia reciente: la Primera y la Segunda República, la Guerra Civil y el periodo democrático actual.

Su mirada se extiende también a cuestiones de plena actualidad como las ideologías contemporáneas, el control cultural, los nacionalismos, la inmigración y lo que el autor denomina "la decadencia europea".

Se trata de una obra que, sin duda, generará debate. **Y eso es precisamente lo que buscamos.**

## Nuestra filosofía editorial

En Grupo Dauro creemos que el intercambio de ideas es fundamental para el crecimiento de una sociedad. Por ello, damos espacio a todas las opiniones y perspectivas, vengan de donde vengan, siempre que se expresen desde el respeto y no incurran en apología de ningún tipo.

No es necesario compartir las tesis de un autor para reconocer el valor de su aportación al debate público. La pluralidad de voces enriquece, y el lector es siempre lo suficientemente inteligente para sacar sus propias conclusiones.

## Sobre el autor

**Manuel E. Orozco Redondo** es Doctor en Filosofía y Letras por la Universidad de Granada, Catedrático de Instituto y fue Inspector de Educación en Jaén. Hijo del humanista Manuel Orozco Díaz, ha dedicado su carrera al análisis de la sociedad, la educación y la cultura occidental.

Entre sus obras anteriores destacan *Ganivet, crítico de la modernidad y la postmodernidad* (2014), *Figuras de la Granada de Lorca* (2018) y *Con Granada en el alma* (2022).

## Ficha técnica

| | |
|---|---|
| **Título** | La España Quebrantada |
| **Autor** | Manuel E. Orozco Redondo |
| **Editorial** | Grupo Dauro |
| **Páginas** | 346 |
| **Formato** | 15 × 21 cm, tapa blanda con solapas |
| **ISBN** | 978-84-128496-7-7 |
| **PVP** | 20,00 € |
| **Fecha de publicación** | 28 de diciembre de 2025 |

## Disponible ahora

El libro ya está disponible en nuestra tienda online y en las principales plataformas de distribución.

**¿Te atreves a formar tu propia opinión?**

---

*Grupo Dauro - Porque las ideas merecen ser escuchadas*`
  },
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
