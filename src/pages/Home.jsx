import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import { Cutout, Reveal, Counter, Marquee } from '../components/ui.jsx'
import { PRODUCTS, QUOTES } from '../data.js'

export default function Home() {
  useEffect(() => { document.title = 'RetroVante — Leather Jackets' }, [])
  return (
    <>
      <Hero />
      <Marquee items={['Full-grain', 'Hand-finished', 'Small-batch', 'Lifetime repair']} />

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div><div className="eyebrow">The collection</div><h2>Three icons.<br /><span className="serif">Zero filler.</span></h2></div>
            <Link className="link" to="/products">View all</Link>
          </div>
          <div className="g3">
            {PRODUCTS.slice(0, 3).map((p) => (
              <Reveal as={Link} to="/products" className="card" key={p.name}>
                <Cutout jk={p.jk} alt={`${p.name} leather jacket`} />
                <div className="meta"><div><h3>{p.name}</h3><div className="tag">{p.cat}</div></div><div className="price">{p.price}</div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grey">
        <div className="wrap g2">
          <Reveal><Cutout jk="back" alt="Back of the Marshal varsity jacket" ratio="r45" /></Reveal>
          <Reveal>
            <div className="eyebrow">Our idea</div>
            <h2 className="mt">Fewer jackets. <span className="serif">Better ones.</span></h2>
            <p className="lead">We make a handful of silhouettes, then spend months getting every seam, zip and curve right. Leather gets better with age — we build for that.</p>
            <p className="mt2"><Link className="link" to="/about">Our story</Link></p>
          </Reveal>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <div className="eyebrow">By the numbers</div>
          <h2 className="mt mb" style={{ maxWidth: '14ch' }}>Built in public. Worn for life.</h2>
          <div className="stats">
            <div><Counter end={12000} suffix="+" /><span>Jackets delivered</span></div>
            <div><Counter end={38} /><span>Countries shipped</span></div>
            <div><Counter end={98} suffix="%" /><span>Would buy again</span></div>
            <div><Counter end={10} suffix=" yrs" /><span>Repair guarantee</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap g2">
          <Reveal>
            <div className="eyebrow">Bespoke</div>
            <h2 className="mt">Made to your <span className="serif">measure.</span></h2>
            <p className="lead mt2">Choose your hide, lining and hardware. We cut to your measurements and ship in 4–6 weeks.</p>
            <p className="mt2"><Link className="btn" to="/services">Explore services</Link></p>
          </Reveal>
          <Reveal><Cutout jk="interior" alt="Shearling-lined interior" ratio="r11" /></Reveal>
        </div>
      </section>

      <section className="grey">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Testimonials</div><h2>In their words</h2></div><Link className="link" to="/testimonials">Read more</Link></div>
          <div className="g3">
            {QUOTES.slice(0, 3).map(([q, n, c]) => (
              <Reveal className="quote" key={n}><p>“{q}”</p><cite>{n} — {c}</cite></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
