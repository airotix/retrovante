// All site content lives here — edit text, prices and images in one place.
export const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/products', name: 'Products' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/how-it-works', name: 'How It Works' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/testimonials', name: 'Testimonials' },
  { path: '/journal', name: 'Journal' },
  { path: '/faq', name: 'FAQ' },
  { path: '/contact', name: 'Contact' },
]

// One entry per jacket. `jk` is the file name in src/assets/jackets (without .webp).
export const PRODUCTS = [
  { id: 'outlaw',  name: 'The Outlaw',  cat: 'Biker',     jk: 'outlaw',  price: '$520', ghost: 'OUTLAW',  desc: 'Quilted side panels, an asymmetric zip and an olive lining, with a flag patch on the sleeve.' },
  { id: 'rancher', name: 'The Rancher', cat: 'Shearling', jk: 'rancher', price: '$640', ghost: 'RANCHER', desc: 'Russet leather with a shearling collar, button front and flap pockets.' },
  { id: 'marshal', name: 'The Marshal', cat: 'Varsity',   jk: 'marshal', price: '$480', ghost: 'MARSHAL', desc: 'Olive wool body, leather sleeves and striped rib trim.' },
  { id: 'atlas',   name: 'The Atlas',   cat: 'Bomber',    jk: 'atlas',   price: '$455', ghost: 'ATLAS',   desc: 'A slim bomber with a stand collar, rib-knit cuffs and a centre zip.' },
  { id: 'rover',   name: 'The Rover',   cat: 'Biker',     jk: 'rover',   price: '$560', ghost: 'ROVER',   desc: 'Hand-aged, distressed hide in a vintage biker cut with a belted hem.' },
  { id: 'aviator', name: 'The Aviator', cat: 'Shearling', jk: 'aviator', price: '$690', ghost: 'AVIATOR', desc: 'Shearling collar and cuffs on heavyweight black hide.' },
  { id: 'drifter', name: 'The Drifter', cat: 'Classic',   jk: 'drifter', price: '$445', ghost: 'DRIFTER', desc: 'A clean stand-collar racer with a centre zip. Minimal and light.' },
  { id: 'meridian',name: 'The Meridian',cat: 'Bomber',    jk: 'meridian',price: '$510', ghost: 'MERIDIAN',desc: 'Colour-blocked in cobalt, bronze and black leather.' },
  { id: 'foundry', name: 'The Foundry', cat: 'Classic',   jk: 'foundry', price: '$475', ghost: 'FOUNDRY', desc: 'A classic trucker with a button front and chest pockets.' },
]

// Hero orbit: five of the jackets above.
export const SLIDES = ['outlaw', 'rancher', 'marshal', 'atlas', 'rover'].map((id, i) => {
  const p = PRODUCTS.find((x) => x.id === id)
  return { ...p, no: String(i + 1).padStart(2, '0'), label: p.cat, title: p.name }
})

export const SERVICES = [
  ['Made-to-Measure', 'Your measurements, your hide, your hardware. Cut and finished in 4–6 weeks.', 'From $690'],
  ['Restoration & Repair', 'New zips, relined sleeves, re-dyed hides. We repair any leather jacket, ours or not.', 'From $60'],
  ['Leather Care Plan', 'Annual cleaning, conditioning and inspection to keep leather supple.', '$45 / yr'],
  ['Private Styling', 'One-to-one fit and styling sessions in studio or by video.', 'Complimentary'],
  ['Corporate & Team Orders', 'Custom branded jackets for crews, bands and brands. Minimum 10 units.', 'Quote'],
  ['Alterations', 'Sleeve shortening, taking in, and shoulder adjustments by a leather specialist.', 'From $85'],
]

export const CASES = [
  { t: 'The Berlin Crew', d: 'Custom team jackets for a 24-person design studio.', jk: 'marshal', a: ['24', 'Jackets'], b: ['5 wks', 'Delivery'] },
  { t: 'Heritage Reissue', d: 'A faithful remake of a 1970s biker for a vintage retailer.', jk: 'rover', a: ['180', 'Units'], b: ['4.9★', 'Rating'] },
  { t: 'One-of-One', d: 'Bespoke commission for a touring musician, hand-distressed.', jk: 'meridian', a: ['1', 'Of one'], b: ['3', 'Fittings'] },
]

export const STEPS = [
  ['Choose', 'Pick a silhouette from the collection or send us a reference. Select hide, colour, lining and hardware.'],
  ['Measure', 'Use our 5-minute measuring guide, or book a studio or video fitting. Perfect fit is guaranteed.'],
  ['Craft', 'Our cutters pattern, cut and stitch your jacket by hand. You get progress photos along the way.'],
  ['Finish', 'Edges burnished, hardware set, final quality check. Packed in a canvas garment bag.'],
  ['Wear & Care', 'Free shipping, 30-day returns and lifetime repair. We are with you for the long run.'],
]

export const TIERS = [
  { n: 'Essential', s: 'Ready-to-wear', p: '$445', f: false, l: ['Full-grain cowhide', 'Standard sizing XS–3XL', 'Free shipping', '30-day returns'] },
  { n: 'Signature', s: 'Made-to-measure', p: '$690', f: true, l: ['Choice of hide & lining', 'Cut to your measurements', 'Video fitting session', '1 free alteration', 'Lifetime repair'] },
  { n: 'Atelier', s: 'Fully bespoke', p: '$1,200', f: false, l: ['Custom pattern & details', 'Hand-distressed finish options', 'Three fittings', 'Monogram lining', 'Lifetime repair + care plan'] },
]

// SAMPLE COPY — replace with real customer reviews before launch.
export const QUOTES = [
  ['The first jacket I own that looks better each winter.', 'Daniel R.', 'London'],
  ['Perfect fit straight out of the box. No break-in pain.', 'Amara K.', 'Toronto'],
  ['They repaired my ten-year-old zip for free.', 'Marcus L.', 'Berlin'],
  ['Bespoke process was effortless and the result is stunning.', 'Sofia M.', 'Madrid'],
  ['Quality you can feel the moment you pick it up.', 'Hamza A.', 'Dubai'],
  ['Worth every penny. Already ordered a second.', 'Elena V.', 'Milan'],
]

export const POSTS = [
  ['Care', 'How to care for a leather jacket', 'Five habits that double its lifespan.', 'rancher'],
  ['Guide', 'Biker vs bomber: choosing your cut', 'Fit, weight and how each wears.', 'atlas'],
  ['Craft', 'Inside a day at the cutting table', 'Why pattern work takes longer than sewing.', 'interior'],
  ['Style', 'Wearing black leather without trying too hard', 'Keep it simple, keep it fitted.', 'aviator'],
  ['Materials', 'Full-grain vs top-grain, explained', 'What the labels actually mean.', 'collar'],
  ['Care', 'Dealing with rain and salt stains', 'What to do the moment it gets wet.', 'foundry'],
]

export const FAQ = [
  ['How should a leather jacket fit?', 'Snug through the shoulders and chest with room for a thin layer. Sleeves should end at the wrist bone. Leather relaxes about half a size.'],
  ['How long does an order take?', 'Ready-to-wear ships in 2–3 days. Made-to-measure takes 4–6 weeks and bespoke 8–10 weeks.'],
  ['What is your return policy?', '30 days for ready-to-wear. Made-to-measure and bespoke can be altered free of charge if fit is off.'],
  ['Is the leather real?', 'Always. 100% full-grain cowhide or lambskin. Never bonded, split or faux.'],
  ['Do you ship internationally?', 'Yes, to 38+ countries. Duties are shown at checkout.'],
  ['How do I care for my jacket?', 'Hang on a wide hanger, avoid direct heat, condition twice a year. We offer an annual care plan.'],
  ['Can you repair jackets from other brands?', 'Yes. Send photos through the contact form for a repair quote.'],
]
