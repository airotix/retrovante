import React from 'react'
import { PageHead, Cutout, Monogram, Reveal } from '../components/ui.jsx'

const TEAM = [['Elias Ferrant', 'Founder & Head Cutter'], ['Noor Hadid', 'Creative Director'], ['Tomas Vega', 'Master Tanner']]

export default function About() {
  return (
    <>
      <PageHead name="About" lead="RetroVante began with one idea: a leather jacket should be the last one you ever need to buy.">
        Quiet craft. <span className="serif">Loud results.</span>
      </PageHead>
      <section>
        <div className="wrap g2">
          <Reveal><Cutout jk="rancher" alt="The Rancher shearling-collar jacket" ratio="r45" /></Reveal>
          <Reveal>
            <div className="eyebrow">Since 2014</div>
            <h2 className="mt mb">Our story</h2>
            <p className="lead">What began as a repair bench has become a small studio of cutters, tanners and stitchers. We still start every jacket on paper, and finish every one by hand.</p>
            <p className="body">We source full-grain hides from traceable tanneries, avoid chrome-heavy shortcuts where we can, and design silhouettes that stay out of fashion's way.</p>
          </Reveal>
        </div>
      </section>
      <section className="dark">
        <div className="wrap g2">
          <div><div className="eyebrow">Mission</div><h2 className="mt">Make fewer things.<br /><span className="serif">Make them last.</span></h2></div>
          <ul className="rules">
            <li><b>Honest materials</b> — full-grain only, never bonded or corrected.</li>
            <li><b>Repairable by design</b> — every part can be replaced.</li>
            <li><b>Small batches</b> — made to order, never overproduced.</li>
          </ul>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Team</div><h2>The people</h2></div></div>
          <div className="g3">
            {TEAM.map(([n, r]) => (
              <Reveal key={n}><Monogram name={n} /><h3 className="mt2">{n}</h3><div className="eyebrow">{r}</div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
