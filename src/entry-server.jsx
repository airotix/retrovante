import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
export { SEO, pageMeta, structuredData } from './seo.js'
export function render(path) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>)
}
