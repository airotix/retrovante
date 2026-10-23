import React from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Cutout, Reveal } from '../components/ui.jsx'
import { STEPS } from '../data.js'

export default function HowItWorks() {
  return (
    <>
      <PageHead name="How It Works" lead="Straightforward from first click to first wear.">
        Five steps. <span className="serif">No guesswork.</span>
      </PageHead>
      <section>
        <div className="wrap">
          {STEPS.map(([t, d], i) => (
            <Reveal className="step" key={t}><span className="n">0{i + 1}</span><h2 className="step-t">{t}</h2><p className="body">{d}</p></Reveal>
          ))}
        </div>
      </section>
      <section className="dark">
        <div className="wrap g2">
          <div><h2>Ready to start?</h2><p className="lead mt2">Most orders ship in 4–6 weeks.</p><p className="mt2"><Link className="btn" to="/products">Choose your jacket</Link></p></div>
          <Cutout jk="nightshift" alt="The Nightshift belted jacket" ratio="r32" />
        </div>
      </section>
    </>
  )
}
