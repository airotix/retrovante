import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'))
const HowItWorks = lazy(() => import('./pages/HowItWorks.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const Testimonials = lazy(() => import('./pages/Testimonials.jsx'))
const Journal = lazy(() => import('./pages/Journal.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/blog" element={<Navigate to="/journal" replace />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <div className="eyebrow">404</div>
        <h1>Lost the <span className="serif">thread.</span></h1>
        <p className="lead">That page does not exist.</p>
        <Link className="btn" to="/">Back home</Link>
      </div>
    </section>
  )
}
