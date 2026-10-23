import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PAGES } from '../data.js'
import Seo from './Seo.jsx'

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const NAV_MAIN = [['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/services', 'Services'], ['/pricing', 'Pricing']]
const NAV_MORE = [['/portfolio', 'Portfolio'], ['/how-it-works', 'How It Works'], ['/testimonials', 'Testimonials'], ['/journal', 'Journal'], ['/faq', 'FAQ']]

function Header({ open, setOpen, menuButton }) {
  const { pathname } = useLocation()
  const moreActive = NAV_MORE.some(([p]) => p === pathname)
  return (
    <header className={`site ${open ? 'menu-open' : ''}`}>
      <div className="bar">
        <Link to="/" className="logo" tabIndex={open ? -1 : undefined} aria-label="RetroVante — home">RETROVANTE<sup>°</sup></Link>
        <nav className="bar-links" aria-label="Primary">
          {NAV_MAIN.map(([to, n]) => <NavLink key={to} to={to} end={to === '/'}>{n}</NavLink>)}
          <details className="more" key={pathname}>
            <summary className={moreActive ? 'active' : ''}>More <span aria-hidden="true">▾</span></summary>
            <div className="drop">{NAV_MORE.map(([to, n]) => <NavLink key={to} to={to}>{n}</NavLink>)}</div>
          </details>
        </nav>
        <Link to="/contact" className="cta-pill">Book a Fitting</Link>
        <button ref={menuButton} className="menu-btn mono" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'} <span className="burger" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>
  )
}

function Menu({ open, setOpen, menuButton }) {
  const first = useRef(null)
  const menu = useRef(null)
  const wasOpen = useRef(false)
  useEffect(() => {
    document.body.classList.toggle('lock', open)
    if (open) first.current?.focus()
    else if (wasOpen.current) menuButton.current?.focus()
    wasOpen.current = open
    const keyboard = (e) => {
      if (!open) return
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
      if (e.key === 'Tab') {
        const links = [...menu.current.querySelectorAll('a')]
        const controls = [menuButton.current, ...links]
        const current = controls.indexOf(document.activeElement)
        e.preventDefault()
        controls[(current + (e.shiftKey ? -1 : 1) + controls.length) % controls.length]?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1121px)')
    const resize = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', resize)
    window.addEventListener('keydown', keyboard)
    return () => { desktop.removeEventListener('change', resize); window.removeEventListener('keydown', keyboard); document.body.classList.remove('lock') }
  }, [open, setOpen, menuButton])
  return (
    <nav ref={menu} id="menu" className={`menu ${open ? 'open' : ''}`} aria-label="Site menu" aria-hidden={!open}>
      <ul>
        {PAGES.map((p, i) => (
          <li key={p.path} style={{ '--i': i }}>
            <NavLink to={p.path} onClick={() => setOpen(false)} end={p.path === '/'} ref={i === 0 ? first : null} tabIndex={open ? 0 : -1}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>{p.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="menu-foot mono">hello@retrovante.com<span>Free shipping · 30-day returns · Lifetime repair</span></div>
    </nav>
  )
}

function Footer({ open }) {
  return (
    <footer className="site" inert={open ? '' : undefined}>
      <div className="wrap">
        <div className="fcta">
          <h2>Wear it<br />for <span className="serif">decades.</span></h2>
          <Link className="btn" to="/products">Shop the collection</Link>
        </div>
        <div className="fgrid">
          <div>
            <Link to="/" className="logo">RETROVANTE<sup>°</sup></Link>
            <p className="fnote">Full-grain leather jackets, cut in small batches and built to outlast trends.</p>
          </div>
          <div><h4>Explore</h4><ul>{[['/products', 'Products'], ['/portfolio', 'Portfolio'], ['/pricing', 'Pricing'], ['/journal', 'Journal']].map(([to, n]) => <li key={to}><Link to={to}>{n}</Link></li>)}</ul></div>
          <div><h4>Company</h4><ul>{[['/about', 'About'], ['/services', 'Services'], ['/how-it-works', 'How it works'], ['/testimonials', 'Testimonials']].map(([to, n]) => <li key={to}><Link to={to}>{n}</Link></li>)}</ul></div>
          <div><h4>Support</h4><ul><li><Link to="/faq">FAQ</Link></li><li><Link to="/contact">Contact</Link></li><li><a href="mailto:hello@retrovante.com">hello@retrovante.com</a></li></ul></div>
        </div>
        <div className="legal"><span>© 2026 RetroVante. All rights reserved.</span><span>Crafted in small batches</span></div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <>
      <a className="skip" href="#main" tabIndex={open ? -1 : undefined}>Skip to content</a>
      <Seo />
      <ScrollManager />
      <Header open={open} setOpen={setOpen} menuButton={menuButton} />
      <Menu open={open} setOpen={setOpen} menuButton={menuButton} />
      <main id="main" tabIndex={-1} inert={open ? '' : undefined}>{children}</main>
      <Footer open={open} />
    </>
  )
}
