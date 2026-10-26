import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { SEO, pageMeta } from '../.prerender/entry-server.js'

const titles = new Set()
const descriptions = new Set()
for (const route of [...Object.keys(SEO), '/404']) {
  const file = route === '/' ? 'dist/index.html' : `dist${route}.html`
  const html = await readFile(file, 'utf8')
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: one main heading`)
  assert.equal((html.match(/<title>/g) || []).length, 1, `${route}: one title`)
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${route}: one canonical`)
  assert.ok(html.includes(`href="${pageMeta(route).url}"`), `${route}: canonical URL`)
  const title = html.match(/<title>(.*?)<\/title>/s)[1]
  assert.ok(!titles.has(title), `${route}: unique title`)
  titles.add(title)
  const description = html.match(/<meta name="description" content="([^"]+)"/)[1]
  assert.ok(!descriptions.has(description), `${route}: unique description`)
  descriptions.add(description)
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'))
  assert.ok(html.includes(`property="og:image" content="${pageMeta(route).image}"`))
  const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(schema['@context'], 'https://schema.org')
  assert.ok(schema['@graph'].some((item) => item['@type'] === 'WebSite' && item.name === 'RetroVante'))
  assert.ok(html.includes('<main'), `${route}: page content is in initial HTML`)
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets\/[^"?#]+|[^"?#]+\.(?:png|svg|ico|webmanifest)))"/g)) await access(`dist${asset}`)
  for (const [, link] of html.matchAll(/href="(\/[^"?#]*)"/g)) {
    if (link.includes('.')) continue
    assert.ok(SEO[link], `${route}: internal link ${link} resolves`)
  }
  if (route === '/404') assert.ok(html.includes('content="noindex, follow"'))
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
assert.equal((sitemap.match(/<loc>/g) || []).length, Object.keys(SEO).length)
for (const route of Object.keys(SEO)) assert.ok(sitemap.includes(`<loc>${pageMeta(route).url}</loc>`))
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${new URL(pageMeta('/').url).origin}/sitemap.xml`))
const manifest = JSON.parse(await readFile('dist/site.webmanifest', 'utf8'))
for (const icon of manifest.icons) await access(`dist${icon.src}`)
assert.ok(!(await readFile('dist/_redirects', 'utf8')).includes('/index.html  200'))
console.log('Passed: 11 crawlable pages + 404, unique metadata, canonical URLs, structured data, local assets, internal links, sitemap, robots and app icons.')
