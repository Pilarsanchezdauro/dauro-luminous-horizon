#!/usr/bin/env node
/**
 * SEO interno para webs SPA (React + Vite) de Grupo Dauro. Se ejecuta DESPUÉS de `vite build`.
 *
 *   "build": "vite build && node scripts/seo-build.mjs"
 *
 * Lee seo.config.json (raíz del proyecto) y, a partir de dist/index.html, genera:
 *   - dist/<ruta>/index.html por cada página, con SU title, description, canonical, Open Graph,
 *     Twitter, JSON-LD y un contenido HTML visible dentro de <div id="root"> (lo ven Google, Bing,
 *     WhatsApp, LinkedIn y los buscadores con IA, que no ejecutan JavaScript; React lo sustituye
 *     al arrancar con createRoot, así que el visitante no nota nada).
 *   - dist/sitemap.xml   (todas las páginas con indexar !== false)
 *   - dist/llms.txt      (resumen para ChatGPT, Claude, Perplexity…)
 *   - dist/robots.txt    (solo si config.robots existe; si no, se respeta public/robots.txt)
 *
 * Vercel sirve primero los archivos que existen, así que /conferencias → dist/conferencias/index.html
 * sin tocar vercel.json (la reescritura general a /index.html sigue para el resto de rutas).
 * Si falta alguna etiqueta base en index.html, la AÑADE; si la config tiene errores, el build FALLA
 * (mejor no publicar que publicar roto).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

const RAIZ = process.cwd()
const cfg = JSON.parse(readFileSync(join(RAIZ, process.argv[2] || 'seo.config.json'), 'utf8'))
const DIST = join(RAIZ, cfg.dist || 'dist')
const SITE = cfg.sitio.replace(/\/$/, '')
const base = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (u) => (!u ? u : u.startsWith('http') ? u : SITE + (u.startsWith('/') ? u : '/' + u))
const urlDe = (ruta) => SITE + (ruta === '/' ? '/' : ruta.replace(/\/$/, ''))

function poner(html, tipo, clave, valor) {
  if (valor === undefined || valor === null || valor === '') return html
  if (tipo === 'title') {
    return /<title>[\s\S]*?<\/title>/.test(html)
      ? html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(valor)}</title>`)
      : html.replace('</head>', `  <title>${esc(valor)}</title>\n  </head>`)
  }
  if (tipo === 'link') {
    const re = new RegExp(`<link[^>]*rel="${clave}"[^>]*>`)
    const tag = `<link rel="${clave}" href="${esc(valor)}" />`
    return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
  }
  const re = new RegExp(`<meta[^>]*${tipo}="${clave.replace(/[.:]/g, '\\$&')}"[^>]*>`)
  const tag = `<meta ${tipo}="${clave}" content="${esc(valor)}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

const d = cfg.defecto || {}
const errores = []
const paginas = Object.entries(cfg.paginas || {})
if (!paginas.find(([r]) => r === '/')) errores.push('Falta la página «/» en seo.config.json')
for (const [ruta, p] of paginas) {
  if (!ruta.startsWith('/')) errores.push(`Ruta sin «/» inicial: ${ruta}`)
  if (!p.title) errores.push(`${ruta}: falta title`)
  if (!p.description) errores.push(`${ruta}: falta description`)
  else if (p.description.length > 170) console.warn(`aviso ${ruta}: description de ${p.description.length} caracteres (ideal ≤160)`)
}
if (errores.length) {
  console.error('seo-build: ERRORES en la configuración:\n  ' + errores.join('\n  '))
  process.exit(1)
}

for (const [ruta, p] of paginas) {
  const url = urlDe(ruta)
  const img = abs(p.imagen || d.imagen)
  const titOG = p.ogTitle || p.title
  const desOG = p.ogDescription || p.description
  let html = base
  html = html.replace(/<html[^>]*>/, (m) => (/lang=/.test(m) ? m : m.replace('<html', `<html lang="${cfg.idioma || 'es'}"`)))
  html = poner(html, 'title', '', p.title)
  html = poner(html, 'name', 'description', p.description)
  html = poner(html, 'link', 'canonical', url)
  if (p.indexar === false) html = poner(html, 'name', 'robots', 'noindex, follow')
  html = poner(html, 'property', 'og:type', p.ogType || (ruta === '/' ? 'website' : d.ogType || 'website'))
  html = poner(html, 'property', 'og:site_name', cfg.nombre)
  html = poner(html, 'property', 'og:locale', cfg.locale || 'es_ES')
  html = poner(html, 'property', 'og:url', url)
  html = poner(html, 'property', 'og:title', titOG)
  html = poner(html, 'property', 'og:description', desOG)
  if (img) {
    html = poner(html, 'property', 'og:image', img)
    html = poner(html, 'property', 'og:image:secure_url', img)
    html = poner(html, 'property', 'og:image:width', String(p.imagenAncho || d.imagenAncho || 1200))
    html = poner(html, 'property', 'og:image:height', String(p.imagenAlto || d.imagenAlto || 630))
    html = poner(html, 'property', 'og:image:alt', p.imagenAlt || d.imagenAlt || titOG)
    html = poner(html, 'name', 'twitter:image', img)
  }
  html = poner(html, 'name', 'twitter:card', 'summary_large_image')
  html = poner(html, 'name', 'twitter:title', titOG)
  html = poner(html, 'name', 'twitter:description', desOG)
  if (cfg.verificacion?.google) html = poner(html, 'name', 'google-site-verification', cfg.verificacion.google)
  if (cfg.verificacion?.bing) html = poner(html, 'name', 'msvalidate.01', cfg.verificacion.bing)
  // JSON-LD: el global de la web (Organization/Person/WebSite) en la portada + el propio de cada página
  html = html.replace(/\s*<script type="application\/ld\+json" data-seo-build>[\s\S]*?<\/script>/g, '')
  const ld = [...(ruta === '/' ? cfg.jsonld || [] : []), ...(p.jsonld || [])]
  if (ld.length) {
    const json = JSON.stringify(ld.length === 1 ? ld[0] : ld).replace(/</g, '\\u003c')
    html = html.replace('</head>', `  <script type="application/ld+json" data-seo-build>${json}</script>\n  </head>`)
  }
  // Contenido visible sin JavaScript (React lo reemplaza al montar)
  const contenido = p.contenido || (p.h1 ? `<h1>${esc(p.h1)}</h1><p>${esc(p.description)}</p>` : '')
  if (contenido) html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${contenido}</div>`)
  const destino = ruta === '/' ? join(DIST, 'index.html') : join(DIST, ruta.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, html)
}

// sitemap.xml
const hoy = new Date().toISOString().slice(0, 10)
const urls = paginas.filter(([, p]) => p.indexar !== false).map(([ruta, p]) =>
  `  <url>\n    <loc>${urlDe(ruta)}</loc>\n    <lastmod>${p.lastmod || hoy}</lastmod>\n    <changefreq>${p.changefreq || (ruta === '/' ? 'weekly' : 'monthly')}</changefreq>\n    <priority>${p.prioridad ?? (ruta === '/' ? '1.0' : '0.8')}</priority>\n  </url>`)
const extra = (cfg.sitemapExtra || []).map((u) => `  <url>\n    <loc>${abs(u)}</loc>\n    <lastmod>${hoy}</lastmod>\n  </url>`)
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls, ...extra].join('\n')}\n</urlset>\n`)

// llms.txt
const llms = [
  `# ${cfg.nombre}`, '', `> ${cfg.resumen || paginas.find(([r]) => r === '/')[1].description}`, '',
  ...(cfg.llmsDetalle ? [cfg.llmsDetalle, ''] : []),
  '## Páginas', '',
  ...paginas.filter(([, p]) => p.indexar !== false).map(([ruta, p]) => `- [${p.title}](${urlDe(ruta)}): ${p.description}`),
  '', ...(cfg.contacto ? ['## Contacto', '', cfg.contacto, ''] : []),
].join('\n')
writeFileSync(join(DIST, 'llms.txt'), llms)

// robots.txt (opcional)
if (cfg.robots) {
  writeFileSync(join(DIST, 'robots.txt'), cfg.robots.replace(/\{SITE\}/g, SITE).trimEnd() + `\n\nSitemap: ${SITE}/sitemap.xml\n`)
}

console.log(`seo-build: ${paginas.length} páginas con metadatos propios · sitemap (${urls.length + extra.length} URL) · llms.txt${cfg.robots ? ' · robots.txt' : ''}`)
