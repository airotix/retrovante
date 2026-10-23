import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Products from './pages/Products.jsx'
import Portfolio from './pages/Portfolio.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Pricing from './pages/Pricing.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Journal from './pages/Journal.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <Layout>
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
