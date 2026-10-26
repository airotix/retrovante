import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { JK, JK_SRCSET, JK_DIMENSIONS } from '../jackets.js'

/** Keep static content visible without per-element observers or hydration updates. */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={`rv in ${className}`} {...rest}>{children}</Tag>
}

export function PageHead({ name, children, lead }) {
  return (
    <div className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <span aria-current="page">{name}</span></nav>
        <h1>{children}</h1>
        <p className="lead">{lead}</p>
      </div>
    </div>
  )
}

export function Counter({ end, suffix = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(end)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1600, 1)
        setV(Math.round(end * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [end])
  return <strong ref={ref}>{v.toLocaleString('en-US')}{suffix}</strong>
}

export function Marquee({ items }) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div>{row.map((t, i) => <React.Fragment key={i}><b>{t}</b><span>/</span></React.Fragment>)}</div>
    </div>
  )
}

/** Transparent jacket cut-out on a soft tone tile. ratio: r34 | r45 | r11 | r32 */
export function Cutout({ jk, alt, ratio = 'r34', className = '', sizes = '(max-width: 900px) 88vw, 560px' }) {
  return (
    <div className={`ph cut ${ratio} ${className}`}>
      <img src={JK[jk]} srcSet={JK_SRCSET[jk]} sizes={sizes} width={JK_DIMENSIONS[jk].width} height={JK_DIMENSIONS[jk].height} alt={alt} loading="lazy" decoding="async" />
    </div>
  )
}

/** Initials tile (use until real portraits are available). */
export function Monogram({ name }) {
  const initials = name.split(' ').map((w) => w[0]).join('')
  return <div className="ph cut r45 mono-tile" role="img" aria-label={name}><span aria-hidden="true">{initials}</span></div>
}
