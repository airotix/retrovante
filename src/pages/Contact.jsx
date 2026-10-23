import React, { useRef, useState } from 'react'
import { PageHead, Cutout } from '../components/ui.jsx'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@retrovante.com'
const TOPICS = ['General enquiry', 'Made-to-measure', 'Bespoke', 'Repair', 'Team order']
const LIM = { name: 80, email: 120, message: 2000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [errs, setErrs] = useState({})
  const last = useRef(0)

  async function onSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return                       // honeypot: bots fill it, humans never see it
    if (Date.now() - last.current < 15000) return        // client-side throttle (enforce server-side too)
    const v = {
      name: String(fd.get('name') || '').trim().slice(0, LIM.name),
      email: String(fd.get('email') || '').trim().slice(0, LIM.email),
      topic: TOPICS.includes(fd.get('topic')) ? fd.get('topic') : TOPICS[0],
      message: String(fd.get('message') || '').trim().slice(0, LIM.message),
    }
    const er = {}
    if (v.name.length < 2) er.name = 'Please enter your name.'
    if (!EMAIL_RE.test(v.email)) er.email = 'Please enter a valid email.'
    if (v.message.length < 10) er.message = 'Tell us a little more (10+ characters).'
    setErrs(er)
    if (Object.keys(er).length) return
    last.current = Date.now()

    if (!ENDPOINT) {                                      // no backend configured -> open the visitor's mail app
      const body = encodeURIComponent(`${v.message}\n\n— ${v.name} (${v.email})`)
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`[${v.topic}] RetroVante enquiry`)}&body=${body}`
      setStatus('ok'); e.currentTarget.reset(); return
    }
    setStatus('sending')
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v), referrerPolicy: 'no-referrer' })
      if (!r.ok) throw new Error('bad status')
      setStatus('ok'); e.currentTarget.reset()
    } catch { setStatus('error') }
  }

  return (
    <>
      <PageHead name="Contact" lead="Order help, bespoke requests, repairs or press. We reply within one working day.">
        Let’s <span className="serif">talk.</span>
      </PageHead>
      <section>
        <div className="wrap g2 top">
          <form onSubmit={onSubmit} noValidate>
            <div className="f"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" maxLength={LIM.name} aria-invalid={!!errs.name} />{errs.name && <small className="err">{errs.name}</small>}</div>
            <div className="f"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={LIM.email} aria-invalid={!!errs.email} />{errs.email && <small className="err">{errs.email}</small>}</div>
            <div className="f"><label htmlFor="topic">Topic</label><select id="topic" name="topic">{TOPICS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div className="f"><label htmlFor="message">Message</label><textarea id="message" name="message" maxLength={LIM.message} aria-invalid={!!errs.message} />{errs.message && <small className="err">{errs.message}</small>}</div>
            <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
            <div role="status" aria-live="polite">
              {status === 'ok' && <div className="ok">Thank you — we will reply within one working day.</div>}
              {status === 'error' && <div className="ok bad">Something went wrong. Please email {EMAIL} directly.</div>}
            </div>
          </form>
          <div>
            <Cutout jk="drifter" alt="The Drifter jacket" ratio="r45" />
            <div className="info">
              <div><div className="eyebrow">Email</div><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
              <div><div className="eyebrow">Phone</div>+00 000 000 0000</div>
              <div><div className="eyebrow">Studio</div>Your address here<br />Mon–Fri, 10:00–18:00</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
