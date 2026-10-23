import React from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Cutout, Reveal } from '../components/ui.jsx'
import { CASES } from '../data.js'

export default function Portfolio() {
  return (
    <>
      <PageHead name="Portfolio" lead="Commissions, collaborations and custom runs we are proud of.">
        Selected <span className="serif">work.</span>
      </PageHead>
      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          {CASES.map((c, i) => (
            <Reveal className="case" key={c.t}>
              <Cutout jk={c.jk} alt={c.t} ratio="r32" />
              <div>
                <div className="eyebrow">Case 0{i + 1}</div>
                <h2 className="case-t">{c.t}</h2>
                <p className="body">{c.d}</p>
                <dl><div><dt>{c.a[1]}</dt><dd>{c.a[0]}</dd></div><div><dt>{c.b[1]}</dt><dd>{c.b[0]}</dd></div></dl>
                <Link className="link" to="/contact">Start a project</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
