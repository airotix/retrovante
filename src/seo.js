export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://retrovante.com').replace(/\/$/, '')
export const SEO = {
  '/': ['RetroVante | Full-Grain Leather Jackets', 'Discover RetroVante leather jackets: biker, bomber, shearling and classic styles. Explore the collection, made-to-measure options and leather repair services.'],
  '/products': ['Leather Jackets: Biker, Bomber & Shearling | RetroVante', 'Explore nine RetroVante jacket styles, from classic racers and bombers to shearling and biker jackets. Compare designs and find your next leather jacket.'],
  '/about': ['Our Story & Leather Craft | RetroVante', 'Meet RetroVante and discover our approach to small-batch leather jackets, careful pattern cutting, hand finishing and repairable design.'],
  '/services': ['Custom Leather Jackets & Repairs | RetroVante', 'Explore made-to-measure leather jackets, alterations, restoration, leather care and team orders. Contact RetroVante to discuss your project.'],
  '/portfolio': ['Custom Jacket Projects | RetroVante', 'Explore RetroVante jacket projects, including team commissions, heritage-inspired designs and one-of-a-kind bespoke leather jackets.'],
  '/how-it-works': ['How Our Leather Jackets Are Made | RetroVante', 'Follow the RetroVante process from consultation and measurements to leather selection, cutting, fitting and finishing your jacket.'],
  '/pricing': ['Leather Jacket & Bespoke Pricing | RetroVante', 'Compare starting prices for RetroVante ready-to-wear, made-to-measure and bespoke leather jackets. Explore options and request a fitting.'],
  '/testimonials': ['Customer Stories | RetroVante', 'Read stories about wearing RetroVante leather jackets, finding the right fit and making a jacket part of everyday life.'],
  '/journal': ['Leather Care & Style Journal | RetroVante', 'Explore the RetroVante journal for leather care, jacket styles, materials and a closer look at the craft behind the collection.'],
  '/faq': ['Leather Jacket Fit, Care & Shipping FAQ | RetroVante', 'Find answers about RetroVante jacket sizing, delivery, returns, materials, leather care and repairs. Get in touch for help with your order.'],
  '/contact': ['Contact & Book a Fitting | RetroVante', 'Contact RetroVante about leather jackets, private fittings, bespoke commissions, alterations or repairs. Tell us what you have in mind.'],
}
export function pageMeta(path) {
  const route = path.replace(/\/+$/, '') || '/'
  const [title, description] = SEO[route] || ['Page Not Found | RetroVante', 'This page could not be found. Explore RetroVante leather jackets or contact our team.']
  return { title, description, url: `${SITE_URL}${route === '/' ? '/' : route}`, image: `${SITE_URL}/social-card.png`, robots: SEO[route] ? 'index, follow, max-image-preview:large' : 'noindex, follow' }
}
export function structuredData(path) {
  const meta = pageMeta(path)
  const graph = [
    { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'RetroVante', url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png` },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'RetroVante', alternateName: 'RetroVante Leather', url: `${SITE_URL}/`, publisher: { '@id': `${SITE_URL}/#organization` } },
    { '@type': 'WebPage', name: meta.title, description: meta.description, url: meta.url, isPartOf: { '@id': `${SITE_URL}/#website` } },
  ]
  if (path !== '/' && SEO[path]) graph.push({ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: meta.title.split(' | ')[0], item: meta.url },
  ] })
  return { '@context': 'https://schema.org', '@graph': graph }
}
