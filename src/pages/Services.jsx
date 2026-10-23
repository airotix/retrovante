import React from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Cutout, Reveal } from '../components/ui.jsx'
import { SERVICES } from '../data.js'

export default function Services() {
  return (
    <>
      <PageHead name="Services" lead="From first fitting to the twentieth winter — we look after your leather.">
        Beyond the <span className="serif">jacket.</span>
      </PageHead>
      <section>
        <div className="wrap">
          {SERVICES.map(([t, d, p], i) => (
            <Reveal className="svc" key={t}>
              <span className="n">0{i + 1}</span><h3>{t}</h3><p className="body">{d}</p><span className="eyebrow ink">{p}</span>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="grey">
        <div className="wrap g2">
          <Reveal><Cutout jk="aviator" alt="The Aviator shearling jacket" ratio="r11" /></Reveal>
          <Reveal><h2>Need something specific?</h2><p className="lead mt2">Tell us what you have in mind and we will reply within one working day.</p><p className="mt2"><Link className="btn" to="/contact">Start a request</Link></p></Reveal>
        </div>
      </section>
    </>
  )
}
