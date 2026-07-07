// Datos de los guiones de serie de Grupo Cultural Dauro.
// Fuente: biblias de serie oficiales (adaptación: Pilar Sánchez).
// Cada guion se publica en /grupo-dauro/cine/:slug

export interface GuionPersonaje {
  nombre: string;
  rol: string;
  descripcion: string;
}

export interface GuionDato {
  etiqueta: string;
  valor: string;
}

export interface Guion {
  slug: string;
  titulo: string;
  subtitulo?: string;
  autor: string;
  autorObra: string; // "Basado en la novela de ..."
  adaptacion: string;
  estado: "En desarrollo" | "En preproducción" | "Terminado";
  logline: string;
  sinopsis: string[]; // párrafos
  genero: string;
  formato: string;
  epoca: string;
  localizaciones: string;
  datos: GuionDato[]; // cifras destacadas (portada)
  personajes: GuionPersonaje[];
  tags: string[];
  imagen: string; // cartel / imagen principal
  ogImage: string;
  enlaceExtra?: { texto: string; url: string };
  blog?: string;
  seoTitle: string;
  seoDescription: string;
}

export const guiones: Guion[] = [
  {
    slug: "el-hidalgo-don-rodrigo",
    titulo: "El Hidalgo Don Rodrigo de Cervantes",
    subtitulo: "La historia que explica cómo nació Don Quijote",
    autor: "Francisco del Valle Sánchez",
    autorObra: "Basado en la novela de Francisco del Valle Sánchez",
    adaptacion: "Adaptación del guion: Pilar Sánchez",
    estado: "En desarrollo",
    logline:
      "En la España de Felipe II, una familia de hidalgos acosada por deudas, prestamistas e Inquisición recorre el país buscando un lugar donde respirar. El padre lucha. La madre sostiene. Y el hijo de siete años —curioso, preguntón, incapaz de dejar pasar nada sin preguntar por qué— lo ve todo, lo escucha todo y lo guarda todo. Medio siglo después lo contará en la obra más leída de la lengua española: Don Quijote de la Mancha.",
    sinopsis: [
      "Serie de drama histórico que narra la vida de una familia de hidalgos acosada por deudas, prestamistas e Inquisición. Entre 1553 y 1556, los Cervantes recorren España desde Valladolid hasta Córdoba y finalmente Sevilla, perseguidos por una implacable red financiera y vigilados de cerca por el Santo Oficio.",
      "Don Rodrigo es médico y cirujano, hombre de honor obsesionado con los libros de caballería —exactamente como el personaje que su hijo creará medio siglo después—. Cree que la realidad debería funcionar con las reglas del Amadís, y en los momentos de mayor crisis lo demuestra. A su lado, Leo, su esposa de Esquivias, es la columna vertebral real de la familia. Y entre ellos, Miguelito: siete años al inicio, diez al final, un niño extraordinariamente curioso que está en todas las conversaciones importantes, en todos los umbrales, en todos los momentos que los adultos creen privados.",
      "La serie propone una lectura radicalmente nueva del Quijote: no como obra de un genio aislado, sino como la memoria activa de un niño que lo vivió todo y que nunca dejó de preguntar por qué. Cada capítulo contiene «Semillas del Quijote» —momentos concretos de la infancia de Miguel que medio siglo después reaparecen transformados en la novela—. Una historia de familia, deuda, fe y supervivencia filmada en escenarios reales del siglo XVI: Valladolid, la Sierra Morena, Córdoba y la Giralda de Sevilla como plano final.",
    ],
    genero: "Drama histórico · Ficción basada en hechos reales",
    formato: "1 temporada · 12 capítulos · 45–73 min/ep. · ~10 h",
    epoca: "España, 1553–1556 · Siglo XVI",
    localizaciones: "Valladolid · Sierra Morena · Córdoba · Cabra · Sevilla",
    datos: [
      { etiqueta: "Capítulos", valor: "12" },
      { etiqueta: "Duración total", valor: "~10 h" },
      { etiqueta: "Escenas escritas", valor: "~492" },
      { etiqueta: "Semillas del Quijote", valor: "35+" },
    ],
    personajes: [
      {
        nombre: "Don Rodrigo de Cervantes",
        rol: "Protagonista · 40 años",
        descripcion:
          "Médico y cirujano, hombre de honor obsesionado con los libros de caballería —igual que el hidalgo que su hijo creará décadas después—. Cree que la realidad debería funcionar con las reglas del Amadís. En los momentos de mayor crisis, blande la espada contra gigantes imaginarios.",
      },
      {
        nombre: "Leo",
        rol: "Esposa · La columna vertebral de la familia",
        descripcion:
          "Esposa de Rodrigo, natural de Esquivias. Sostiene a la familia cuando todo se derrumba: la fuerza silenciosa y real que mantiene a los Cervantes en pie a través de deudas, huidas y persecución.",
      },
      {
        nombre: "Miguelito",
        rol: "El niño que lo archiva todo · 7–10 años",
        descripcion:
          "Extraordinariamente curioso, preguntón, incapaz de dejar pasar nada sin preguntar por qué. Lo ve todo, lo escucha todo, lo pregunta todo y lo guarda todo. Medio siglo después será Miguel de Cervantes, autor del Quijote.",
      },
    ],
    tags: ["Drama histórico", "Siglo de Oro", "Cervantes", "En desarrollo"],
    imagen: "/products/el-hidalgo-don-rodrigo.jpg",
    ogImage: "/og-don-rodrigo.png",
    enlaceExtra: {
      texto: "Ver canal del proyecto",
      url: "https://www.youtube.com/@ElHidalgoDonRodrigodeCervantes",
    },
    blog: "/blog/el-hidalgo-don-rodrigo-guion",
    seoTitle:
      "El Hidalgo Don Rodrigo de Cervantes — Serie de Drama Histórico | Guion Dauro",
    seoDescription:
      "Serie de drama histórico basada en la novela de Francisco del Valle Sánchez. La infancia de Miguel de Cervantes y el origen de Don Quijote, en la España de Felipe II (1553–1556). Adaptación de guion de Pilar Sánchez para Grupo Cultural Dauro.",
  },
  {
    slug: "latido",
    titulo: "Latido",
    subtitulo: "Apasionadamente vuestro",
    autor: "Carmen Alcaide",
    autorObra: "Basada en la novela de Carmen Alcaide",
    adaptacion: "Adaptación del guion: Pilar Sánchez",
    estado: "En desarrollo",
    logline:
      "En la España de la Transición, un joven de origen anglohispano no puede amar de una sola manera: ama varias veces, a varias personas, de formas contradictorias, sin renunciar a ninguna. La Historia —Franco muerto, el GEO, ETA, la Constitución— no es el telón de fondo: es el material con el que están hechos los personajes.",
    sinopsis: [
      "Ilya Sinclair, 18 años, hijo de padre inglés y madre española, trabaja como instructor deportivo en Mallorca en el verano de 1973. Su novia, Iris, modelo de 16 años, está embarazada; se aman con esa intensidad que no vuelve a repetirse. En Nochevieja, en la finca familiar escocesa, un reencuentro dará un giro a la vida de todos.",
      "Durante los seis años siguientes, España cambia de piel: el asesinato de Carrero Blanco, la Marcha Verde, la muerte de Franco, la coronación del Rey, las primeras elecciones democráticas, la Constitución de 1978, la primera promoción del GEO. Ilya atraviesa todos esos hitos mientras intenta sostener simultáneamente cuatro relaciones de amor, sin renunciar a ninguna. En paralelo, Roberto Landa, capitán de los SAS británicos y su mejor amigo desde niños, carga un secreto que no puede decirle nunca.",
      "La serie cierra en mayo de 1979, en Madrid. La novela de Carmen Alcaide concluye en la página 557 con una explosión; la 558 contiene únicamente un silencio deliberado. La serie respeta ese silencio: no hay resolución. El espectador sale con lo mismo que Ilya tiene en los ojos en el último plano.",
    ],
    genero: "Drama · Romance · Histórico · Thriller político",
    formato: "1 temporada · 14 episodios · 55–68 min/ep. · ~14 h",
    epoca: "España, 1973–1979 · La Transición",
    localizaciones: "Madrid · Mallorca · San Sebastián · Bilbao · Marbella · Escocia · Irlanda",
    datos: [
      { etiqueta: "Episodios", valor: "14" },
      { etiqueta: "Secuencias", valor: "164" },
      { etiqueta: "Perspectivas", valor: "4 POV" },
      { etiqueta: "Año de inicio", valor: "1973" },
    ],
    personajes: [
      {
        nombre: "Ilya Sinclair",
        rol: "Protagonista · Teniente del GEO",
        descripcion:
          "18 años al inicio, 24 al final. Hijo de padre inglés y madre española. Impulsivo, leal hasta el extremo, incapaz de la cobardía pero también de elegir. Centro gravitacional de la serie: todo orbita alrededor de él, pero él no orbita alrededor de nadie.",
      },
      {
        nombre: "Marta",
        rol: "Esposa · Primer amor de infancia",
        descripcion:
          "La constante estable de la serie. Bondad sin ingenuidad. Le ofrece a Ilya exactamente lo que él no puede darse a sí mismo: la fidelidad absoluta, la certeza, el calor sin trampa. No es ciega: elige no ver.",
      },
      {
        nombre: "Iris",
        rol: "Modelo · Amor imposible",
        descripcion:
          "16 años al inicio, 23 al final. Modelo de la Casa Bellefort. La única mujer de la serie que sostiene la misma intensidad que Ilya sin perder de vista la realidad. Su arco: de joven deslumbrada a mujer adulta que toma una decisión propia.",
      },
      {
        nombre: "Roberto Landa",
        rol: "Capitán de los SAS · Mejor amigo",
        descripcion:
          "Mejor amigo de Ilya desde que eran niños. El hombre que más cuida a Ilya en toda la serie… y el que más daño podría hacerle. Carga un secreto que no puede confesarle nunca.",
      },
    ],
    tags: ["Drama", "Romance", "Histórico", "Thriller político", "En desarrollo"],
    imagen: "/products/latido-apasionadamente-vuestro.jpg",
    ogImage: "/og-latido-presentacion.jpg",
    enlaceExtra: {
      texto: "Ver la presentación",
      url: "https://www.grupodauro.com/blog/presentacion-latido-carmen-alcaide",
    },
    blog: "/blog/presentacion-latido-carmen-alcaide",
    seoTitle:
      "Latido. Apasionadamente vuestro — Serie sobre la Transición | Guion Dauro",
    seoDescription:
      "Serie de drama, romance y thriller político basada en la novela de Carmen Alcaide. Amor y Historia en la España de la Transición (1973–1979). Adaptación de guion de Pilar Sánchez para Grupo Cultural Dauro.",
  },
  {
    slug: "el-huesped-de-las-tinieblas",
    titulo: "El Huésped de las Tinieblas",
    autor: "Juan José Porto",
    autorObra: "Guion original de Juan José Porto",
    adaptacion: "Supervisión creativa: Juan José Porto",
    estado: "En desarrollo",
    logline:
      "El nuevo proyecto de serie firmado por Juan José Porto —director, guionista y supervisor creativo de Dauro Cine—, con más de cinco décadas de trayectoria en el cine y la literatura españoles.",
    sinopsis: [
      "El Huésped de las Tinieblas es el tercer gran guion de serie en el que trabaja Grupo Cultural Dauro, de la mano de Juan José Porto: pionero de la comedia nostálgica del cine español, director de catorce largometrajes, guionista y biógrafo reconocido.",
      "El proyecto se encuentra actualmente en desarrollo. Iremos ampliando su ficha —sinopsis completa, personajes y biblia de serie— a medida que avance la escritura.",
    ],
    genero: "Drama · Thriller",
    formato: "Serie de televisión · En desarrollo",
    epoca: "Por confirmar",
    localizaciones: "Por confirmar",
    datos: [
      { etiqueta: "Estado", valor: "En desarrollo" },
      { etiqueta: "Autor", valor: "J. J. Porto" },
    ],
    personajes: [],
    tags: ["Drama", "Thriller", "En desarrollo"],
    imagen: "/dauro-cine-director.jpg",
    ogImage: "/og-cine.jpg",
    blog: undefined,
    seoTitle:
      "El Huésped de las Tinieblas — Serie de Juan José Porto | Guion Dauro",
    seoDescription:
      "Nuevo proyecto de serie de Juan José Porto para Grupo Cultural Dauro. Actualmente en desarrollo. Drama y thriller de la mano de un referente del cine español.",
  },
];

export const getGuion = (slug: string): Guion | undefined =>
  guiones.find((g) => g.slug === slug);
