import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

/* ─── Schema markup ─── */
const localBusinessSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PC & Mobile Phone Repair Shop',
  image: '',
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.4621,
    longitude: -0.2706,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:30', closes: '17:30' },
  ],
  priceRange: '££',
  description: 'Mobile phone, laptop, MacBook, TV and gadget repair shop in East Sheen, London SW14. Same-day repairs. Walk-ins welcome.',
})

/* ─── Data ─── */
const mainServices = [
  {
    to: '/phone-repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Phone Repairs',
    desc: 'iPhone, Samsung, Google Pixel, OnePlus and more. Screens, batteries, charging ports, camera, water damage.',
  },
  {
    to: '/laptop-macbook-repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    title: 'Laptop & MacBook Repairs',
    desc: 'Windows laptops, MacBook Pro and MacBook Air. Screen replacement, keyboard, battery, software, motherboard.',
  },
  {
    to: '/phone-repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Screen Replacement',
    desc: 'Cracked or unresponsive screen? We carry parts for most current models. In most cases, replaced same day.',
  },
  {
    to: '/phone-repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Battery Replacement',
    desc: 'Battery draining fast or not holding charge? We replace batteries for all major phone and laptop models.',
  },
  {
    to: '/laptop-macbook-repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: 'Data Recovery',
    desc: 'Lost photos, contacts or files from a damaged device? We can often recover data others can\'t.',
  },
  {
    to: '/other-repairs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    title: 'TV & Console Repairs',
    desc: 'Smart TV faults, PlayStation, Xbox and other console issues. Bring it in for a free diagnosis.',
  },
]

const devices = [
  'iPhone (all models)', 'Samsung Galaxy', 'Google Pixel', 'OnePlus',
  'iPad & Tablets', 'MacBook Pro', 'MacBook Air', 'Windows Laptops',
  'iMac', 'PlayStation 4 & 5', 'Xbox Series', 'Nintendo Switch',
  'Smart TVs', 'AirPods & Headphones', 'Chromebooks', 'Huawei & Xiaomi',
]

const whyUs = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    heading: 'Most repairs the same day',
    body: 'We keep parts for the most common repairs in stock. Screen, battery, charging port — most are done while you wait or within a few hours.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    heading: 'No fix, no fee',
    body: "We don't charge for diagnostics we can't act on. If we can't fix it, you don't pay.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    heading: 'Honest, upfront pricing',
    body: "We give you a price before we start. No hidden charges, no surprises when you collect. If it's going to cost more, we'll call you first.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    heading: 'Local, independent shop',
    body: "We're based right on Sheen Lane — not a franchise, not a chain. You deal directly with the people doing the repairs.",
  },
]

const steps = [
  { num: '01', heading: 'Walk in or call ahead', body: 'Bring your device to 65 Sheen Lane, or call us on 020 8878 7266 to describe the problem first. No appointment needed.' },
  { num: '02', heading: 'We assess and quote', body: "We'll take a look, tell you what's wrong, and give you a price. No obligation to proceed." },
  { num: '03', heading: 'Collect when it\'s ready', body: "Most repairs are done the same day. We'll call or text when it's ready. Pay on collection." },
]

const reviews = [
  {
    text: '"Perfect service, my PC was broken — not charging — and they fixed it very quickly. Wouldn\'t hesitate to go back."',
    name: 'David M.',
    area: 'East Sheen',
  },
  {
    text: '"Very friendly repairman, fair price and extremely quick turnaround! Had my screen replaced in under two hours."',
    name: 'Laura K.',
    area: 'Richmond',
  },
  {
    text: '"Extremely helpful, comprehensive supply of products and very reasonable prices. Better than any of the big repair chains."',
    name: 'James T.',
    area: 'Mortlake',
  },
]

const areas = [
  'East Sheen', 'Mortlake', 'Barnes', 'Richmond', 'Kew', 'Roehampton',
  'Putney', 'Sheen', 'Ham', 'Twickenham', 'Wandsworth', 'Wimbledon',
]

const faqs = [
  {
    q: 'How long does an iPhone screen repair take?',
    a: 'Most iPhone screen repairs take between 30 minutes and 2 hours depending on the model. We stock screens for all recent iPhone models so we rarely need to order parts in.',
  },
  {
    q: 'Do I need to make an appointment?',
    a: "No — walk-ins are always welcome. If you'd like to call ahead and describe the fault first, we're available on 020 8878 7266 during opening hours.",
  },
  {
    q: 'Do you offer a warranty on repairs?',
    a: 'Yes. We offer a 90-day warranty on parts and labour for most repairs. If the same fault comes back, bring it in and we\'ll take another look at no charge.',
  },
  {
    q: 'What if you can\'t fix my device?',
    a: 'We operate a no fix, no fee policy for diagnostic work. If we assess your device and can\'t repair it, or if the cost of repair isn\'t worth it, we won\'t charge you for our time.',
  },
  {
    q: 'Can you recover data from a badly damaged phone?',
    a: 'In many cases, yes. Data recovery depends on the extent of the damage — particularly with water damage or a failed motherboard. Bring the device in and we\'ll give you an honest assessment.',
  },
  {
    q: 'Do you buy and sell second-hand phones and laptops?',
    a: 'Yes. We buy used phones and laptops in working or faulty condition and we sell refurbished devices in-store. Prices are agreed on the day based on condition.',
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b" style={{ borderColor: '#e5e1d8' }}>
      <button
        className="w-full text-left flex items-center justify-between gap-4 py-4 font-medium text-gray-800 hover:text-gray-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg
          className="shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ color: '#555' }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>PC &amp; Mobile Phone Repair Shop | East Sheen, London SW14</title>
        <meta name="description" content="Phone, laptop, MacBook and TV repair in East Sheen, London SW14. Same-day iPhone repair, Samsung repair, screen replacement, battery, data recovery. Walk-ins welcome at 65 Sheen Lane." />
        <meta name="keywords" content="phone repair East Sheen, iPhone repair Richmond, laptop repair East Sheen, MacBook repair SW14, mobile phone repair SW14, Samsung repair Richmond" />
        <link rel="canonical" href="https://sheenrepair.co.uk/" />
        <script type="application/ld+json">{localBusinessSchema}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section
        style={{ backgroundColor: '#1c2d4a', backgroundImage: 'radial-gradient(ellipse at 70% 80%, rgba(192,57,43,0.18) 0%, transparent 60%)' }}
        className="relative py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label" style={{ color: '#f5a623' }}>East Sheen · Richmond · SW14</span>
            <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-white leading-tight mb-4">
              Phone &amp; Computer Repairs<br className="hidden sm:block" />{' '}
              in East Sheen, London
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
              Screens, batteries, motherboards and more — most repairs completed
              the same day. Walk-ins welcome at{' '}
              <strong className="text-white/90 font-medium">65 Sheen Lane, SW14</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:02088787266" className="btn-primary text-base px-6 py-3">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call 020 8878 7266
              </a>
              <a
                href="https://wa.me/442088787266"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-6 py-3"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link to="/contact" className="btn-outline-white text-base px-6 py-3">
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Info card */}
          <div
            className="rounded-lg p-6 hidden md:block"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <h2 className="text-white font-semibold text-lg mb-4">We repair:</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.78)' }}>
              {['iPhones (all models)','Samsung Galaxy','Google Pixel & more','iPad & Tablets','MacBook Pro & Air','Windows Laptops','Smart TVs','PlayStation & Xbox','Nintendo Switch','Water-damaged devices','Data recovery','Software issues'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span style={{ color: '#f5a623', flexShrink: 0 }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-xs text-white/50 block mb-1">Location</span>
              <span className="text-white/85 text-sm">65 Sheen Lane, London SW14 8AD</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">What we fix</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1c2d4a' }}>
            Repair services in East Sheen
          </h2>
          <p className="text-gray-500 mb-8 max-w-2xl">
            From a cracked screen to a water-damaged motherboard — we handle most repairs in-house
            without needing to send your device away.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainServices.map(({ to, icon, title, desc }) => (
              <Link key={title} to={to} className="service-card group">
                <div className="mb-3" style={{ color: '#1c2d4a' }}>{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-accent"
                    style={{ fontSize: '1rem', color: '#1c2d4a' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{desc}</p>
                <span className="mt-3 text-sm font-medium inline-flex items-center gap-1" style={{ color: '#c0392b' }}>
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/phone-repairs" className="btn-secondary text-sm">Phone Repairs</Link>
            <Link to="/laptop-macbook-repairs" className="btn-secondary text-sm">Laptop &amp; MacBook</Link>
            <Link to="/other-repairs" className="btn-secondary text-sm">TV &amp; Other Repairs</Link>
          </div>
        </div>
      </section>

      {/* ── DEVICES ── */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label">Phones, laptops &amp; more</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#1c2d4a' }}>
                Devices we repair
              </h2>
              <p className="text-gray-500 mb-6">
                Whether it's a two-year-old iPhone or an older Windows laptop, we
                repair most consumer devices. If you're not sure, give us a call — we'll tell
                you straight away if it's something we can help with.
              </p>
              <a href="tel:02088787266" className="btn-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Check if we fix yours
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {devices.map((d) => (
                <span
                  key={d}
                  className="text-sm px-3 py-1.5 rounded font-medium"
                  style={{ backgroundColor: '#f0ece4', color: '#1c2d4a', border: '1px solid #ddd8ce' }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">Why come to us</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1c2d4a' }}>
            A repair shop you can rely on in SW14
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {whyUs.map(({ icon, heading, body }) => (
              <div key={heading} className="flex gap-4">
                <div className="shrink-0 mt-0.5">{icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{heading}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPAIR PROCESS ── */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">How it works</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1c2d4a' }}>
            Getting your device repaired
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            {steps.map(({ num, heading, body }, i) => (
              <div key={num} className="relative">
                {/* Connector line — desktop only */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden sm:block absolute top-6 left-full w-full h-px -translate-y-1/2"
                    style={{ backgroundColor: '#ddd8ce', width: 'calc(100% - 2.5rem)', left: '2.5rem' }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm mb-4"
                  style={{ backgroundColor: '#c0392b', color: '#fff' }}
                >
                  {num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section-pad" style={{ backgroundColor: '#1c2d4a' }}>
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label" style={{ color: '#f5a623' }}>Customer reviews</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What customers say about us
            </h2>
            <a
              href="https://www.google.com/maps/search/PC+Mobile+Phone+Repair+Shop+East+Sheen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium shrink-0 pb-0.5"
              style={{ color: '#f5a623' }}
            >
              See on Google Maps →
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {reviews.map(({ text, name, area }) => (
              <div
                key={name}
                className="rounded-lg p-5 flex flex-col gap-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                <StarRating />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>{text}</p>
                <div className="mt-auto">
                  <span className="text-white font-semibold text-sm">{name}</span>
                  <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{area}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Reviews collected from Google. We don&apos;t edit or select them.
          </p>
        </div>
      </section>

      {/* ── LOCAL AREAS ── */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label">Local repair shop</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#1c2d4a' }}>
                Serving East Sheen and the surrounding area
              </h2>
              <p className="text-gray-500 mb-4">
                We&apos;re based on Sheen Lane in{' '}
                <strong className="font-semibold text-gray-700">East Sheen, SW14</strong> — easy to reach
                from Richmond, Mortlake, Barnes, Kew, Roehampton and neighbouring areas.
              </p>
              <p className="text-gray-500 mb-6">
                If you&apos;re searching for <em>phone repair East Sheen</em>,{' '}
                <em>iPhone repair Richmond</em>, or <em>laptop repair SW14</em>, you&apos;re in the right place.
                We&apos;re usually available same day — no need to wait a week.
              </p>
              <Link to="/contact" className="btn-primary">Get Directions</Link>
            </div>
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#1c2d4a' }}>Areas we serve</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {areas.map((a) => (
                  <span
                    key={a}
                    className="text-sm px-3 py-1.5 rounded font-medium"
                    style={{ backgroundColor: '#fff', color: '#1c2d4a', border: '1px solid #ddd8ce' }}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div
                className="rounded-lg p-4 text-sm"
                style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}
              >
                <div className="font-semibold text-gray-800 mb-2">65 Sheen Lane, London SW14 8AD</div>
                <div className="text-gray-500 mb-1">Mon – Fri: 9:00am – 6:30pm</div>
                <div className="text-gray-500 mb-1">Saturday: 9:30am – 5:30pm</div>
                <div className="text-gray-500">Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad">
        <div className="max-w-3xl mx-auto px-4">
          <span className="section-label">Common questions</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#1c2d4a' }}>
            Frequently asked questions
          </h2>
          <div>
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Got a question we haven&apos;t covered?{' '}
            <a href="tel:02088787266" className="font-medium underline" style={{ color: '#1c2d4a' }}>
              Call us on 020 8878 7266
            </a>{' '}
            or{' '}
            <Link to="/contact" className="font-medium underline" style={{ color: '#1c2d4a' }}>
              send us a message
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── CONTACT / MAP / HOURS ── */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }} id="contact">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">Get in touch</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1c2d4a' }}>
            Contact &amp; opening hours
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Send an enquiry</h3>
              <ContactForm />
            </div>

            {/* Info + Map */}
            <div className="space-y-6">
              <div
                className="rounded-lg p-5"
                style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}
              >
                <h3 className="font-semibold text-gray-800 mb-4">Find us</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2.5 items-start">
                    <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>65 Sheen Lane, London SW14 8AD</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="#c0392b" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <a href="tel:02088787266" className="font-medium hover:underline" style={{ color: '#1c2d4a' }}>020 8878 7266</a>
                  </li>
                </ul>
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e5e1d8' }}>
                  <div className="font-semibold text-gray-800 text-sm mb-2">Opening hours</div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex justify-between"><span>Monday – Friday</span><span>9:00am – 6:30pm</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>9:30am – 5:30pm</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span className="text-gray-400">Closed</span></div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="tel:02088787266" className="btn-primary text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Call us
                  </a>
                  <a
                    href="https://wa.me/442088787266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-sm"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #e5e1d8' }}>
                <iframe
                  title="PC & Mobile Phone Repair Shop — Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3!2d-0.2706!3d51.4621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760b82b7c1e281%3A0x1!2s65+Sheen+Ln%2C+London+SW14+8AD!5e0!3m2!1sen!2suk!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: '#c0392b' }} className="py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Device broken? Come in or give us a call.
          </h2>
          <p className="text-white/80 mb-7 text-lg">
            We&apos;re on Sheen Lane, open six days a week. Most repairs are done the same day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:02088787266" className="btn-outline-white text-base px-7 py-3">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              020 8878 7266
            </a>
            <a
              href="https://wa.me/442088787266"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-7 py-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.55)' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
