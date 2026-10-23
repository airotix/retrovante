import React from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Reveal } from '../components/ui.jsx'
import { TIERS } from '../data.js'

export default function Pricing() {
  return (
    <>
      <PageHead name="Pricing" lead="Starting prices. Final price depends on hide and options.">
        Simple. <span className="serif">Transparent.</span>
      </PageHead>
      <section>
        <div className="wrap g3">
          {TIERS.map((t) => (
            <Reveal className={`box ${t.f ? 'feat' : ''}`} key={t.n}>
              <div className="eyebrow">{t.s}</div><h3 className="box-t">{t.n}</h3><div className="amt">{t.p}</div>
              <ul>{t.l.map((x) => <li key={x}>{x}</li>)}</ul>
              <Link className="btn" to="/contact">Get started</Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="grey slim"><div className="wrap center"><p className="lead">Orders over 10 units? <Link className="link" to="/contact">Ask about team pricing.</Link></p></div></section>
    </>
  )
}
