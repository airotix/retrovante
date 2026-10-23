import { build } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: '.prerender', emptyOutDir: true } })
const { render, SEO, pageMeta, structuredData } = await import(pathToFileURL(path.resolve('.prerender/entry-server.js')))
const template = await readFile('dist/index.html', 'utf8')
const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
for (const route of [...Object.keys(SEO), '/404']) {
  const meta = pageMeta(route)
  const schema = JSON.stringify(structuredData(route)).replace(/</g, '\\u003c')
  const head = `
    <title>${escape(meta.title)}</title>
    <meta name="description" content="${escape(meta.description)}" />
    <meta name="robots" content="${meta.robots}" />
    <link rel="canonical" href="${escape(meta.url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="RetroVante" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(meta.title)}" />
    <meta property="og:description" content="${escape(meta.description)}" />
    <meta property="og:url" content="${escape(meta.url)}" />
    <meta property="og:image" content="${escape(meta.image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="RetroVante — Leather that remembers. Full-grain leather jackets." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(meta.title)}" />
    <meta name="twitter:description" content="${escape(meta.description)}" />
    <meta name="twitter:image" content="${escape(meta.image)}" />
    <meta name="twitter:image:alt" content="RetroVante — Leather that remembers. Full-grain leather jackets." />
    <script id="site-schema" type="application/ld+json">${schema}</script>`
  const html = template.replace(/\s*<title>.*?<\/title>/s, '').replace(/\s*<meta name="description"[^>]*>/, '').replace('</head>', `${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)
  const file = route === '/' ? 'dist/index.html' : `dist${route}.html`
  await writeFile(file, html)
}
const origin = new URL(pageMeta('/').url).origin
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(SEO).map((route) => `  <url><loc>${escape(pageMeta(route).url)}</loc></url>`).join('\n')}\n</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
console.log(`Pre-rendered ${Object.keys(SEO).length} pages, a 404 page, sitemap and sharing metadata for ${origin}`)
