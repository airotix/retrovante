import React from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Reveal } from '../components/ui.jsx'
import { FAQ } from '../data.js'

export default function Faq() {
  return (
    <>
      <PageHead name="FAQ" lead="Quick answers. Not here? Ask us.">
        Good <span className="serif">questions.</span>
      </PageHead>
      <section>
        <div className="wrap narrow">
          {FAQ.map(([q, a]) => <Reveal as="details" key={q}><summary>{q}</summary><p>{a}</p></Reveal>)}
          <p className="mt2"><Link className="btn" to="/contact">Ask a question</Link></p>
        </div>
      </section>
    </>
  )
}
