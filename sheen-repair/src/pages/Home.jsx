import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

/* ── Schema ── */
const localBusinessSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sheen Repair',
  image: 'https://sheenrepair.co.uk/media/hero-repair-shop.png',
  url: 'https://sheenrepair.co.uk',
  telephone: '+442088787266',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '65 Sheen Lane',
    addressLocality: 'East Sheen',
    addressRegion: 'London',
    postalCode: 'SW14 8AD',
    addressCountry: 'GB',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.4621, longitude: -0.2706 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:30', closes: '17:30' },
  ],
  priceRange: '££',
  description: 'Mobile phone, laptop, MacBook, TV and gadget repair shop in East Sheen, London SW14. Same-day repairs. Walk-ins welcome.',
})

const mainServices = [
  {
    to: '/repairs/phones',
    label: 'Walk-in favourite',
    image: '/media/phone-repair.png',
    title: 'Phone Repairs',
    desc: 'iPhone, Samsung, Google Pixel, OnePlus and more. Screens, batteries, charging ports, camera, water damage.',
  },
  {
    to: '/repairs/laptops-macbooks',
    label: 'Workshop diagnostics',
    image: '/media/laptop-repair.png',
    title: 'Laptop & MacBook',
    desc: 'Windows laptops, MacBook Pro and MacBook Air. Screens, keyboards, batteries, software, motherboards.',
  },
  {
    to: '/book-repair?category=phones',
    label: 'Same day available',
    image: '/media/phone-repair.png',
    title: 'Screen Replacement',
    desc: 'Cracked or unresponsive display? We carry parts for most current models. Most jobs done the same day.',
  },
  {
    to: '/book-repair?category=phones',
    label: 'Power issues',
    image: '/media/phone-repair.png',
    title: 'Battery Replacement',
    desc: 'Battery draining fast or not holding charge? We replace batteries for all major phone and laptop models.',
  },
  {
    to: '/repairs/laptops-macbooks',
    label: 'Board-level work',
    image: '/media/laptop-repair.png',
    title: 'Data Recovery',
    desc: "Lost photos, contacts or files from a broken device? We can often recover data that others can't.",
  },
  {
    to: '/repairs/game-consoles',
    label: 'Consoles & HDMI',
    image: '/media/gaming-repair.png',
    title: 'Console Repairs',
    desc: 'PlayStation, Xbox and Nintendo Switch. HDMI, fan, storage and power issues diagnosed and resolved.',
  },
]

const whyUs = [
  {
    heading: 'Most repairs the same day',
    body: 'We keep parts for the most common repairs in stock. Screen, battery, charging port — most are done while you wait or within a few hours.',
  },
  {
    heading: 'No fix, no fee',
    body: "We don't charge for diagnostics we can't act on. If we can't fix your device, you don't pay.",
  },
  {
    heading: 'Honest, upfront pricing',
    body: "We give you a price before we start. No hidden charges, no surprises. If costs change, we'll call you first.",
  },
  {
    heading: 'Local, independent shop',
    body: "Based right on Sheen Lane — not a franchise, not a chain. You deal directly with the people doing the repairs.",
  },
]

const steps = [
  { num: '1', heading: 'Walk in or call ahead', body: 'Bring your device to 65 Sheen Lane, or call 020 8878 7266 to describe the problem first. No appointment needed.' },
  { num: '2', heading: 'We assess and quote', body: "We'll check it over, tell you what's wrong, and give you a price. No obligation to go ahead." },
  { num: '3', heading: 'Collect when ready', body: "Most repairs are done the same day. We'll text you when it's ready. Pay on collection." },
]

const reviews = [
  {
    text: '"Perfect service, my PC was broken — not charging — and they fixed it very quickly. Wouldn\'t hesitate to go back."',
    name: 'David M.',
    area: 'East Sheen',
  },
  {
    text: '"Very friendly, fair price and extremely quick turnaround! Had my screen replaced in under two hours."',
    name: 'Laura K.',
    area: 'Richmond',
  },
  {
    text: '"Extremely helpful, comprehensive supply of parts and very reasonable prices. Better than any of the big repair chains."',
    name: 'James T.',
    area: 'Mortlake',
  },
]

const devices = [
  'iPhone (all models)', 'Samsung Galaxy', 'Google Pixel', 'OnePlus',
  'iPad & iPads', 'MacBook Pro', 'MacBook Air', 'Windows Laptops',
  'iMac', 'PlayStation 4 & 5', 'Xbox Series', 'Nintendo Switch',
  'Smart TVs', 'AirPods & Headphones', 'Chromebooks', 'Huawei & Xiaomi',
]

const areas = [
  'East Sheen', 'Mortlake', 'Barnes', 'Richmond', 'Kew', 'Roehampton',
  'Putney', 'Sheen', 'Ham', 'Twickenham', 'Wandsworth', 'Wimbledon',
]

const faqs = [
  {
    q: 'How long does an iPhone screen repair take?',
    a: 'Most iPhone screen repairs take between 30 minutes and 2 hours. We stock screens for all recent iPhone models so we rarely need to order parts in.',
  },
  {
    q: 'Do I need to make an appointment?',
    a: "No — walk-ins are always welcome. If you'd like to call ahead and describe the fault first, we're on 020 8878 7266 during opening hours.",
  },
  {
    q: 'Do you offer a warranty on repairs?',
    a: 'Yes. We offer a 90-day warranty on parts and labour for most repairs. If the same fault comes back, bring it in and we\'ll look at it again at no charge.',
  },
  {
    q: 'What if you can\'t fix my device?',
    a: 'We operate a no fix, no fee policy for diagnostic work. If we assess your device and can\'t repair it, we won\'t charge you.',
  },
  {
    q: 'Can you recover data from a badly damaged phone?',
    a: 'In many cases, yes. Data recovery depends on the extent of the damage — particularly with water damage or a failed motherboard. Bring it in and we\'ll give you an honest assessment.',
  },
  {
    q: 'Do you buy and sell second-hand phones and laptops?',
    a: 'Yes. We buy used phones and laptops in working or faulty condition and sell refurbished devices in-store. Prices are agreed on the day based on condition.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        className="w-full text-left flex items-center justify-between gap-4 py-4 font-semibold text-[var(--color-text)] hover:text-[var(--color-red)] transition-colors text-sm"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg
          className="shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <p className="pb-4 text-sm leading-relaxed text-[var(--color-muted)]">{a}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Phone & Laptop Repair in East Sheen | Sheen Repair — SW14</title>
        <meta name="description" content="Phone, laptop, MacBook and TV repair in East Sheen, London SW14. Same-day iPhone repair, Samsung screen, battery replacements and more. Walk-ins welcome at 65 Sheen Lane. Call 020 8878 7266." />
        <meta name="keywords" content="phone repair East Sheen, iPhone repair Richmond, laptop repair East Sheen, MacBook repair SW14, mobile phone repair SW14, Samsung repair Richmond" />
        <link rel="canonical" href="https://sheenrepair.co.uk/" />
        <script type="application/ld+json">{localBusinessSchema}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--color-red)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-6">
              <span className="w-1.5 h-1.5 bg-white rounded-full inline-block"></span>
              East Sheen · 65 Sheen Lane · SW14
            </div>
            <h1 className="text-5xl md:text-[4rem] lg:text-[4.5rem] font-black text-white leading-[1.05] uppercase">
              Phone &amp; Laptop<br />
              <span className="text-[var(--color-red)]">Repair</span> in<br />
              East Sheen
            </h1>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/65 max-w-xl">
              We fix cracked screens, dead batteries, charging faults, water damage and more.
              Most common repairs done the same day. Walk-ins welcome — no appointment needed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="tel:02088787266" className="btn-primary text-base px-6 py-3">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                020 8878 7266
              </a>
              <Link to="/book-repair" className="btn-outline-white text-base px-6 py-3">
                Book a Repair
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ['Same day', 'Common repairs'],
                ['No fix', 'No fee'],
                ['Walk-ins', 'Always welcome'],
              ].map(([top, bottom]) => (
                <div key={top} className="bg-white/6 border border-white/10 rounded-lg px-4 py-4 text-center">
                  <div className="text-white font-bold text-lg leading-tight">{top}</div>
                  <div className="text-white/45 text-xs mt-1">{bottom}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              <img
                src="/media/hero-repair-shop.png"
                alt="Sheen Repair workshop in East Sheen"
                className="w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/6 border border-white/10 rounded-xl p-4">
                <div className="text-white/40 text-[11px] uppercase tracking-widest font-semibold mb-2">Opening Hours</div>
                <div className="text-white text-sm font-medium">Mon–Fri 9am–6:30pm</div>
                <div className="text-white text-sm font-medium">Sat 9:30am–5:30pm</div>
                <div className="text-white/35 text-sm">Sun Closed</div>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <img src="/media/phone-repair.png" alt="Phone repair" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-[var(--color-red)] text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold">
            {['✓ Same-day repairs available', '✓ 90-day warranty on all repairs', '✓ No fix, no fee policy', '✓ Genuine & quality parts used', '✓ Walk-ins welcome Mon–Sat'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="section-label">What we fix</span>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase">
                Our Repair Services
              </h2>
            </div>
            <Link to="/repairs" className="btn-secondary text-sm self-start">
              Browse all repairs →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {mainServices.map(({ to, title, desc, image, label }) => (
              <Link
                key={title}
                to={to}
                className="group bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-red)] hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={image} alt={title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {label}
                  </span>
                  <span className="absolute bottom-3 left-4 text-white font-black text-xl uppercase">{title}</span>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[var(--color-red)] text-sm font-bold group-hover:gap-2.5 transition-all">
                    View service
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Why choose us</span>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase leading-tight mb-6">
                A Repair Shop<br />You Can Trust
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                We've been repairing phones, laptops and gadgets in East Sheen for years.
                No nonsense, no hidden charges — just honest repairs done properly.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:02088787266" className="btn-primary">Call 020 8878 7266</a>
                <Link to="/about" className="btn-secondary">About us</Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyUs.map(({ heading, body }) => (
                <div key={heading} className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-5">
                  <div className="w-8 h-8 rounded bg-[var(--color-red)] flex items-center justify-center mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2 text-sm">{heading}</h3>
                  <p className="text-xs leading-relaxed text-[var(--color-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-pad bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">Simple process</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-10">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map(({ num, heading, body }) => (
              <div key={num} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-red)] flex items-center justify-center font-black text-xl text-white">
                  {num}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{heading}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="tel:02088787266" className="btn-primary">Call Now</a>
            <Link to="/book-repair" className="btn-outline-white">Book Online</Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">Customer reviews</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase">
              What Our Customers Say
            </h2>
            <a
              href="https://www.google.com/maps/search/PC+Mobile+Phone+Repair+Shop+East+Sheen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--color-red)] hover:underline shrink-0 pb-1"
            >
              View on Google →
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {reviews.map(({ text, name, area }) => (
              <div key={name} className="bg-white border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-3">
                <Stars />
                <p className="text-sm leading-relaxed text-[var(--color-muted)] flex-1">{text}</p>
                <div>
                  <span className="font-bold text-[var(--color-text)] text-sm">{name}</span>
                  <span className="text-xs text-[var(--color-muted)] ml-2">{area}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-[var(--color-muted)]">Reviews collected from Google Maps. Shown as left by customers.</p>
        </div>
      </section>

      {/* ── DEVICES ── */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label">Devices we repair</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase leading-tight mb-4">
              All Major<br />Brands Covered
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-6">
              Whether it's the latest iPhone or an older Windows laptop, we repair most consumer devices.
              Not sure if we can fix yours? Give us a call and we'll tell you straight.
            </p>
            <a href="tel:02088787266" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Ask about your device
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {devices.map((d) => (
              <span
                key={d}
                className="text-sm px-3 py-1.5 rounded-md bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text)] font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL AREAS ── */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="section-label">Serving SW London</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase leading-tight mb-4">
              Based in East Sheen
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-3">
              We're on <strong className="text-[var(--color-text)]">Sheen Lane, SW14</strong> — easy to reach from Richmond, Mortlake, Barnes, Kew and surrounding areas.
            </p>
            <p className="text-[var(--color-muted)] leading-relaxed mb-6">
              Searching for <em>phone repair East Sheen</em>, <em>iPhone repair Richmond</em> or <em>laptop repair SW14</em>?
              We're usually available the same day.
            </p>
            <Link to="/contact" className="btn-primary">Get Directions</Link>
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-text)] mb-4 text-sm uppercase tracking-wider">Areas we serve</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {areas.map((a) => (
                <span key={a} className="text-sm px-3 py-1.5 rounded-md bg-white border border-[var(--color-border)] text-[var(--color-text)] font-medium">
                  {a}
                </span>
              ))}
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 text-sm">
              <div className="font-bold text-[var(--color-text)] mb-3">65 Sheen Lane, London SW14 8AD</div>
              <div className="space-y-1 text-[var(--color-muted)]">
                <div className="flex justify-between"><span>Mon – Fri</span><span className="font-semibold text-[var(--color-text)]">9:00 am – 6:30 pm</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="font-semibold text-[var(--color-text)]">9:30 am – 5:30 pm</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <span className="section-label">FAQs</span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase mb-8">
            Common Questions
          </h2>
          <div>
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            Got a question we haven't covered?{' '}
            <a href="tel:02088787266" className="font-semibold text-[var(--color-red)] hover:underline">Call 020 8878 7266</a>
            {' '}or{' '}
            <Link to="/contact" className="font-semibold text-[var(--color-red)] hover:underline">send us a message</Link>.
          </p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section-pad bg-[var(--color-bg-alt)]" id="contact">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">Get in touch</span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text)] uppercase mb-8">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-[var(--color-text)] mb-4">Send an enquiry</h3>
              <ContactForm />
            </div>
            <div className="space-y-5">
              <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-4">Find us</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2.5 items-start text-[var(--color-muted)]">
                    <svg className="mt-0.5 shrink-0 text-[var(--color-red)]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>65 Sheen Lane, East Sheen, London SW14 8AD</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <svg className="shrink-0 text-[var(--color-red)]" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <a href="tel:02088787266" className="font-semibold text-[var(--color-text)] hover:text-[var(--color-red)] transition-colors">020 8878 7266</a>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <div className="font-semibold text-[var(--color-text)] text-sm mb-2">Opening hours</div>
                  <div className="text-sm text-[var(--color-muted)] space-y-1">
                    <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 am – 6:30 pm</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>9:30 am – 5:30 pm</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href="tel:02088787266" className="btn-primary text-sm py-2 px-4">Call us</a>
                  <a href="https://wa.me/442088787266" target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm py-2 px-4">WhatsApp</a>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                <iframe
                  title="Sheen Repair location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1244.9!2d-0.2706!3d51.4621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760b3e5c5c5c5d%3A0x0!2s65+Sheen+Lane%2C+East+Sheen%2C+London+SW14+8AD!5e0!3m2!1sen!2suk!4v1000000000000"
                  className="w-full h-52 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
