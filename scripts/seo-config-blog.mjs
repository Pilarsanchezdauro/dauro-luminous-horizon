#!/usr/bin/env node
/**
 * Completa seo.config.json con las entradas del blog (src/data/blogData.ts) y deja el resultado en
 * node_modules/.cache/seo.config.completo.json, que es lo que lee scripts/seo-build.mjs.
 *
 *   "build": "vite build && node scripts/seo-config-blog.mjs && node scripts/seo-build.mjs node_modules/.cache/seo.config.completo.json"
 *
 * Así, al añadir un artículo en blogData.ts, su página (title, description, canónica, Open Graph,
 * JSON-LD Article + BreadcrumbList y texto visible sin JavaScript) y su línea del sitemap salen solas.
 * Si un artículo ya está en seo.config.json a mano, se respeta lo de seo.config.json.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, openSync, readSync, closeSync } from 'node:fs'
import { join, dirname } from 'node:path'

const RAIZ = process.cwd()
const SALIDA = join(RAIZ, 'node_modules', '.cache', 'seo.config.completo.json')
const cfg = JSON.parse(readFileSync(join(RAIZ, 'seo.config.json'), 'utf8'))
const SITE = cfg.sitio.replace(/\/$/, '')
const MARCA = ' | Grupo Dauro'

// ---------- lectura de blogData.ts (mismo criterio que usaba el sitemap: bloques «\n  {») ----------
const fuente = readFileSync(join(RAIZ, 'src/data/blogData.ts'), 'utf8')
const m = fuente.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[([\s\S]*?)\n\];/)
if (!m) {
  console.error('seo-config-blog: no encuentro el array blogPosts en src/data/blogData.ts')
  process.exit(1)
}
const bloques = m[1].split(/\n  \{/).slice(1)

function campo(bloque, nombre) {
  // Solo campos de primer nivel (4 espacios), para no confundirse con texto dentro de «content»
  const re = new RegExp(`(?:^|\\n)    ${nombre}:\\s*(["'\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`)
  const r = bloque.match(re)
  if (!r) return undefined
  return r[2].replace(/\\(["'`\\])/g, '$1').replace(/\\n/g, ' ')
}
const booleano = (bloque, nombre) => new RegExp(`(?:^|\\n)    ${nombre}:\\s*true`).test(bloque)

const MESES = { enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06', julio: '07',
  agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12' }
function fechaISO(texto = '') {
  const [d, mes, a] = texto.toLowerCase().trim().split(/\s+/)
  return MESES[mes] && /^\d{4}$/.test(a || '') ? `${a}-${MESES[mes]}-${String(d).padStart(2, '0')}` : undefined
}
const CATEGORIAS = { literatura: 'Literatura', arte: 'Arte', cine: 'Cine', ia: 'Inteligencia artificial',
  consejos: 'Consejos para autores', musica: 'Música' }

// ---------- tamaño real de la imagen (JPEG/PNG) para og:image:width/height ----------
function medidas(rutaPublica) {
  const f = join(RAIZ, 'public', rutaPublica.replace(/^\//, ''))
  if (!existsSync(f)) return null
  const fd = openSync(f, 'r')
  const buf = Buffer.alloc(256 * 1024)
  const n = readSync(fd, buf, 0, buf.length, 0)
  closeSync(fd)
  if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const tipo = buf.toString('ascii', 12, 16)
    if (tipo === 'VP8X') return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) }
    if (tipo === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
    if (tipo === 'VP8L') { const b = buf.readUInt32LE(21); return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 } }
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i + 9 < n) {
      if (buf[i] !== 0xff) { i++; continue }
      const marca = buf[i + 1]
      const largo = buf.readUInt16BE(i + 2)
      if (marca >= 0xc0 && marca <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marca)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) }
      }
      i += 2 + largo
    }
  }
  return null
}

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
function recortar(texto, max) {
  if (texto.length <= max) return texto
  const corte = texto.slice(0, max - 1)
  return corte.slice(0, corte.lastIndexOf(' ')).replace(/[\s,;:.—-]+$/, '') + '…'
}

// Título ≤65: el del artículo + « | Grupo Dauro» si cabe; si es largo, la parte antes de «:», « — » o «,»
function tituloCorto(base) {
  if (base.length <= 65) return (base + MARCA).length <= 65 ? base + MARCA : base
  for (const sep of [':', ' — ', ' - ', ',']) {
    const parte = base.split(sep)[0].trim()
    if (parte.length >= 20 && parte.length < base.length) return (parte + MARCA).length <= 65 ? parte + MARCA : recortar(parte, 65)
  }
  return recortar(base, 65)
}

// ---------- una página por artículo ----------
const posts = []
for (const b of bloques) {
  const p = {
    title: campo(b, 'title'), excerpt: campo(b, 'excerpt'), date: campo(b, 'date'), slug: campo(b, 'slug'),
    metaTitle: campo(b, 'metaTitle'), metaDescription: campo(b, 'metaDescription'), keywords: campo(b, 'keywords'),
    imageAlt: campo(b, 'imageAlt'), ogImage: campo(b, 'ogImage'), image: campo(b, 'image'), category: campo(b, 'category'),
    hidden: booleano(b, 'hidden'),
  }
  if (p.title && p.slug && p.excerpt) posts.push(p)
}
if (!posts.length) {
  console.error('seo-config-blog: no he encontrado ningún artículo en blogData.ts')
  process.exit(1)
}

const paginas = { ...cfg.paginas }
let nuevos = 0
for (const p of posts) {
  const ruta = `/blog/${p.slug}`
  if (paginas[ruta]) continue
  const url = `${SITE}${ruta}`
  const base = p.metaTitle || p.title
  const title = tituloCorto(base)
  const description = recortar(p.metaDescription || p.excerpt, 160)
  const imagenLocal = [p.ogImage, p.image].find((i) => i && i.startsWith('/') && existsSync(join(RAIZ, 'public', i.slice(1))))
  const tam = imagenLocal ? medidas(imagenLocal) : null
  const fecha = fechaISO(p.date)
  const imagenAbs = SITE + (imagenLocal || cfg.defecto.imagen)
  const articulo = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: recortar(base, 110), description,
    image: imagenAbs,
    ...(fecha ? { datePublished: fecha, dateModified: fecha } : {}),
    inLanguage: 'es',
    author: { '@type': 'Organization', name: 'Grupo Dauro', url: `${SITE}/` },
    publisher: { '@type': 'Organization', name: 'Grupo Dauro', url: `${SITE}/`,
      logo: { '@type': 'ImageObject', url: `${SITE}/og-logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(CATEGORIAS[p.category] ? { articleSection: CATEGORIAS[p.category] } : {}),
    ...(p.keywords ? { keywords: p.keywords } : {}),
  }
  const migas = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: base, item: url },
    ],
  }
  paginas[ruta] = {
    title, description,
    ogType: 'article',
    ...(imagenLocal ? { imagen: imagenLocal } : {}),
    ...(tam ? { imagenAncho: tam.w, imagenAlto: tam.h } : {}),
    ...(p.imageAlt ? { imagenAlt: p.imageAlt } : {}),
    contenido: `<article><h1>${esc(p.title)}</h1>${p.date ? `<p><time${fecha ? ` datetime="${fecha}"` : ''}>${esc(p.date)}</time> · Grupo Dauro</p>` : ''}<p>${esc(p.excerpt)}</p><p><a href="/blog">Más noticias en el blog de Grupo Dauro</a></p></article>`,
    ...(fecha ? { lastmod: fecha } : {}),
    changefreq: 'monthly',
    prioridad: '0.7',
    jsonld: [articulo, migas],
  }
  nuevos++
}

// El índice del blog enlaza todos los artículos visibles (los robots sin JavaScript también los encuentran)
if (paginas['/blog'] && !paginas['/blog'].contenido) {
  const b = paginas['/blog']
  const lista = posts.filter((p) => !p.hidden)
    .map((p) => `<li><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></li>`).join('')
  paginas['/blog'] = { ...b, contenido: `<h1>${esc(b.h1 || 'Blog')}</h1><p>${esc(b.description)}</p><ul>${lista}</ul><p><a href="/blog/hemeroteca">Hemeroteca 2006-2025</a></p>` }
}

mkdirSync(dirname(SALIDA), { recursive: true })
writeFileSync(SALIDA, JSON.stringify({ ...cfg, paginas }, null, 2))
console.log(`seo-config-blog: ${nuevos} artículos del blog añadidos → ${SALIDA.replace(RAIZ, '.')}`)
