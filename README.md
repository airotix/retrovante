# RetroVante — React website

Vite + React 18 + React Router. 11 routes: Home, Products, About, Services, Portfolio, How It Works, Pricing, Testimonials, Journal, FAQ, Contact.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview
npm run audit      # check dependencies for known vulnerabilities
```

## Edit content
Everything (copy, prices, images, hero slides, colourways) lives in `src/data.js`.
The hero is `src/components/Hero.jsx`; colours are CSS variables at the top of `src/styles.css`.

## Hero jackets
The hero is a 3D orbit carousel (`src/components/Hero.jsx`): the jackets circle in 3D space, turns continuously on its own (speed: `SECONDS_PER_JACKET` in `Hero.jsx`). Each jacket is a transparent WebP cut-out in `src/assets/jackets/` named `jk-<letter>-noir.webp`; add a file and reference its letter in `src/data.js` (`SLIDES`). Use high-resolution originals (2000px+) for the sharpest result. For true rotating 3D models, export GLB files and swap the orbit for a three.js viewer.

## Deploy (Vercel, Netlify or Cloudflare Pages)
1. Push to GitHub, import the repo. Build command `npm run build`, output `dist`.
2. Security headers are already configured: `vercel.json` (Vercel) and `public/_headers` (Netlify / Cloudflare Pages).
3. Set env vars (see `.env.example`): `VITE_FORM_ENDPOINT` (e.g. a Formspree URL) and `VITE_CONTACT_EMAIL`.
   If you use a different form provider, add its origin to `connect-src` / `form-action` in both header files.
4. Attach your domain; HTTPS is automatic. Submit the domain to hstspreload.org once stable.

## Security built in
- Strict Content-Security-Policy (no inline scripts, no third-party scripts; fonts self-hosted), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy, COOP.
- No `dangerouslySetInnerHTML`, no secrets in the client bundle, source maps disabled, external images use `referrerPolicy="no-referrer"`.
- Contact form: validation, length limits, honeypot, client throttle. Enforce rate limiting and spam filtering server-side (Formspree/Netlify do this).
- Keep dependencies patched: run `npm audit` and update regularly.

## Before launch
Placeholder content to replace: testimonials, stats, team, prices, address/phone, and the Journal posts (cards currently link to Contact).
