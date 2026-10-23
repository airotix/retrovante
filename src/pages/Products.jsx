import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, Cutout } from '../components/ui.jsx'
import { PRODUCTS } from '../data.js'

export default function Products() {
  const cats = useMemo(() => ['All', ...new Set(PRODUCTS.map((p) => p.cat))], [])
  const [f, setF] = useState('All')
  const list = PRODUCTS.filter((p) => f === 'All' || p.cat === f)
  return (
    <>
      <PageHead name="Products" lead="Nine silhouettes. Full-grain hide. Free shipping and 30-day returns.">
        The <span className="serif">collection.</span>
      </PageHead>
      <section>
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter by style">
            {cats.map((c) => <button key={c} className={c === f ? 'on' : ''} aria-pressed={c === f} onClick={() => setF(c)}>{c}</button>)}
          </div>
          <div className="g3">
            {list.map((p) => (
              <Link to="/contact" className="card" key={p.id}>
                <Cutout jk={p.jk} alt={`${p.name} leather jacket`} ratio="r45" />
                <div className="meta"><div><h3>{p.name}</h3><div className="tag">{p.cat}</div></div><div className="price">{p.price}</div></div>
                <p className="small">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="dark">
        <div className="wrap g2">
          <Cutout jk="collar" alt="Shearling collar and zip detail" ratio="r32" />
          <div><div className="eyebrow">Materials</div><h2 className="mt mb">Hide first.</h2><p className="lead">Every jacket uses full-grain leather from 1.1–1.4 mm — the strongest part of the hide, with natural grain left intact so it patinas rather than peels.</p></div>
        </div>
      </section>
    </>
  )
}
