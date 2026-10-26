import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta, structuredData } from '../seo.js'

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = pageMeta(pathname)
    document.title = meta.title
    const values = { description: meta.description, robots: meta.robots, 'og:title': meta.title, 'og:description': meta.description, 'og:url': meta.url, 'og:image': meta.image, 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:image': meta.image }
    for (const [key, content] of Object.entries(values)) {
      const attr = key.startsWith('og:') ? 'property' : 'name'
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.append(el) }
      el.content = content
    }
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
    canonical.href = meta.url
    let schema = document.getElementById('site-schema')
    if (!schema) { schema = document.createElement('script'); schema.id = 'site-schema'; schema.type = 'application/ld+json'; document.head.append(schema) }
    schema.textContent = JSON.stringify(structuredData(pathname))
  }, [pathname])
  return null
}
