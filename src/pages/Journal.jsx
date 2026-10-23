import React from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Cutout, Reveal } from '../components/ui.jsx'
import { POSTS } from '../data.js'

export default function Journal() {
  return (
    <>
      <PageHead name="Journal" lead="Guides, craft stories and care advice.">
        Notes from the <span className="serif">bench.</span>
      </PageHead>
      <section>
        <div className="wrap g3">
          {POSTS.map(([c, t, d, k]) => (
            <Reveal as={Link} to="/contact" className="post" key={t}>
              <Cutout jk={k} alt={t} ratio="r32" />
              <div className="eyebrow mt2">{c}</div><h3>{t}</h3><p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
