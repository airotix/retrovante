import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SLIDES } from '../data.js'
import { JK } from '../jackets.js'

const N = SLIDES.length
const STEP = (Math.PI * 2) / N
const mod = (a, n) => ((a % n) + n) % n
const SECONDS_PER_JACKET = 5.2 / 1.25   // previous pace was 5.2s per jacket; now 1.25x faster (~4.2s)

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const reducedRef = useRef(false)
  const ready = useRef(false)
  const stage = useRef(null)
  const ring = useRef(null)
  const items = useRef([])
  const angle = useRef(0)           // continuous orbit position, in jackets (1.0 = one jacket ahead)
  const tilt = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const dims = useRef({ w: 1000, h: 600 })

  // one render loop: orbit turns on its own at a constant speed, jackets sit on a circle in 3D space
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setMotion = () => { reducedRef.current = motion.matches; setPaused(motion.matches); pausedRef.current = motion.matches }
    setMotion()
    motion.addEventListener('change', setMotion)
    const el = stage.current
    const measure = () => {
      const w = el.clientWidth, h = el.clientHeight
      dims.current = { w, h }
      el.style.setProperty('--iw', `${Math.min(w * (w < 600 ? 0.68 : 0.46), h * 0.85)}px`)
    }
    measure()
    const ro = new ResizeObserver(measure); ro.observe(el)
    let raf, last = performance.now(), shown = 0
    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1); last = now
      if (!pausedRef.current && !document.hidden) angle.current += dt / SECONDS_PER_JACKET
      const front = mod(Math.round(angle.current), N)
      if (front !== shown) { shown = front; setIdx(front) }
      const { w, h } = dims.current
      const t = tilt.current
      t.x += (t.tx - t.x) * 0.08; t.y += (t.ty - t.y) * 0.08
      ring.current.style.transform = reducedRef.current ? 'none' : `rotateX(${t.x.toFixed(2)}deg) rotateY(${t.y.toFixed(2)}deg)`
      const RX = w * (w < 600 ? 0.25 : 0.36), RZ = Math.min(w * 0.55, 420)
      for (let i = 0; i < N; i++) {
        const th = (i - angle.current) * STEP
        const sn = Math.sin(th), c = Math.cos(th)            // c: 1 = front, -1 = back
        const depth = (c + 1) / 2
        const node = items.current[i]
        if (!node) continue
        node.style.transform = `translate3d(${(sn * RX).toFixed(1)}px, ${(-(1 - depth) * h * 0.07).toFixed(1)}px, ${((c - 1) * RZ).toFixed(1)}px) rotateY(${(-sn * 34).toFixed(1)}deg)`
        node.style.opacity = (0.62 + 0.38 * Math.pow(depth, 1.1)).toFixed(3)
        node.style.zIndex = Math.round(depth * 100)
        node.style.filter = `blur(${((1 - depth) * 1.6).toFixed(2)}px)`
      }
      if (!ready.current) { el.classList.add('stage-ready'); ready.current = true }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); motion.removeEventListener('change', setMotion) }
  }, [])

  // subtle hover parallax
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reducedRef.current) return
    const r = stage.current.getBoundingClientRect()
    tilt.current.ty = ((e.clientX - r.left) / r.width - 0.5) * 12
    tilt.current.tx = -((e.clientY - r.top) / r.height - 0.5) * 8
  }
  const onLeave = () => { tilt.current.tx = 0; tilt.current.ty = 0 }

  const s = SLIDES[idx]
  const move = (direction) => {
    angle.current = Math.round(angle.current) + direction
    setIdx(mod(Math.round(angle.current), N))
    pausedRef.current = true
    setPaused(true)
  }
  return (
    <section className="hero" aria-label="Featured jackets">

      <div className="ghost" aria-hidden="true"><span key={s.id}>{s.ghost}</span></div>

      <div className="stage" ref={stage} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="floor" aria-hidden="true" />
        <div className="ring" ref={ring}>
          {SLIDES.map((sl, i) => (
            <div className="orb" key={sl.id} ref={(n) => (items.current[i] = n)}>
              <img src={JK[sl.jk]} alt={i === idx ? `${sl.title} leather jacket` : ''} draggable="false" decoding="async" fetchPriority={i === 0 ? 'high' : 'auto'} />
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h1 className="hero-heading">Leather that <span className="serif">remembers.</span></h1>
        <p className="hero-intro">Full-grain leather jackets. Cut in small batches.</p>
        <div className="mono dim">{s.no} / {s.label}</div>
        <h2 className="hero-title">{s.title}</h2>
        <p className="hero-desc">{s.desc}</p>
        <div className="mono dim">Full-grain leather · {s.price}</div>
        <Link to="/products" className="link panel-link">View jacket</Link>
      </div>

      <div className="hero-foot">
        <div className="counter"><span className="big">{s.no}</span><span className="mono dim">{s.label}<br />of {String(N).padStart(2, '0')}</span></div>
        <div className="hero-controls" role="group" aria-label="Featured jacket controls">
          <button type="button" aria-label="Previous jacket" onClick={() => move(-1)}>←</button>
          <button type="button" aria-label={paused ? 'Play jacket rotation' : 'Pause jacket rotation'} onClick={() => { pausedRef.current = !paused; setPaused(!paused) }}>{paused ? 'Play' : 'Pause'}</button>
          <button type="button" aria-label="Next jacket" onClick={() => move(1)}>→</button>
        </div>
        <Link to="/products" className="pill">Explore ↗</Link>
      </div>
    </section>
  )
}
