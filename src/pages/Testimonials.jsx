import React from 'react'
import { PageHead, Cutout, Reveal } from '../components/ui.jsx'
import { QUOTES } from '../data.js'

export default function Testimonials() {
  return (
    <>
      <PageHead name="Testimonials" lead="Words from people who wear our jackets every day.">
        Worn, <span className="serif">loved, repeated.</span>
      </PageHead>
      <section>
        <div className="wrap g3">
          {QUOTES.map(([q, n, c]) => <Reveal className="quote" key={n}><p>“{q}”</p><cite>{n} — {c}</cite></Reveal>)}
        </div>
      </section>
      <section className="dark">
        <div className="wrap g2">
          <div className="big-quote">“It feels like a jacket my grandfather would have owned — and I will pass it on.”</div>
          <Cutout jk="outlaw" alt="The Outlaw biker jacket" ratio="r45" />
        </div>
      </section>
    </>
  )
}
