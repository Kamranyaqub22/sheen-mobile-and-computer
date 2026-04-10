import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

const repairs = [
  {
    title: 'iPhone Screen Replacement',
    body: 'We replace cracked, shattered or unresponsive iPhone screens using quality parts. Most models done the same day — iPhone 7 through to iPhone 15 Pro Max.',
  },
  {
    title: 'Samsung Screen Replacement',
    body: 'Galaxy S and A series screen repairs. We stock displays for the most common Samsung models and can usually fit the screen while you wait.',
  },
  {
    title: 'Battery Replacement',
    body: "If your phone won't make it through the day, the battery is likely the cause. We fit new batteries for iPhones, Samsung, Google Pixel, OnePlus and most other brands.",
  },
  {
    title: 'Charging Port Repair',
    body: 'Phone not charging properly or only charging at a certain angle? We clean or replace charging ports for all major models.',
  },
  {
    title: 'Back Glass Repair',
    body: 'Cracked rear glass on an iPhone or Samsung? We can replace the back panel without replacing the entire device.',
  },
  {
    title: 'Water Damage Repair',
    body: "Phone dropped in water? Get it to us as quickly as possible. We clean, dry and assess water-damaged phones — many are recoverable if treated promptly.",
  },
  {
    title: 'Motherboard & Chip Repair',
    body: 'Advanced board-level repairs for phones that won\'t power on or have failed logic boards. We handle this in-house where possible.',
  },
  {
    title: 'Camera Repair & Replacement',
    body: 'Blurry photos, black camera screen or a physically damaged lens? We replace front and rear cameras on most phone models.',
  },
  {
    title: 'Speaker & Microphone Repair',
    body: 'If people can\'t hear you on calls, or your speaker sounds distorted, we can diagnose and replace the affected component.',
  },
  {
    title: 'Software & Restore',
    body: "Phone stuck in a boot loop, won't update, or locked out? We handle software recoveries, factory resets and iOS/Android troubleshooting.",
  },
]

const brands = [
  'iPhone (all models)', 'Samsung Galaxy', 'Google Pixel', 'OnePlus',
  'Huawei', 'Xiaomi / Redmi', 'Motorola', 'Nokia', 'Sony Xperia',
  'Honor', 'Oppo', 'Nothing Phone',
]

export default function PhoneRepairs() {
  return (
    <>
      <Helmet>
        <title>Phone Repairs East Sheen &amp; Richmond | iPhone, Samsung &amp; More — SW14</title>
        <meta name="description" content="iPhone repair, Samsung repair, screen replacement, battery and charging port repair in East Sheen, London SW14. Walk-in phone repairs near Richmond and Mortlake." />
        <meta name="keywords" content="phone repair East Sheen, iPhone repair Richmond, Samsung repair SW14, screen replacement East Sheen, battery replacement SW14" />
        <link rel="canonical" href="https://sheenrepair.co.uk/phone-repairs" />
      </Helmet>

      {/* Page header */}
      <section className="py-12 bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4 text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Phone Repairs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Mobile Phone Repairs in East Sheen
          </h1>
          <p className="max-w-2xl text-lg text-white/65">
            iPhone, Samsung, Google Pixel and more — most repairs done same day at
            65 Sheen Lane, London SW14. Walk-ins welcome.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:02088787266" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call 020 8878 7266
            </a>
            <a href="https://wa.me/442088787266" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Repairs list */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">What we fix</span>
          <h2 className="text-2xl font-bold mb-8" >Phone repair services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repairs.map(({ title, body }) => (
              <div key={title} className="service-card">
                <h3 className="font-semibold mb-2 text-[var(--color-text)] text-[0.9375rem]">{title}</h3>
                <p className="text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3" >Phone brands we repair</h2>
          <p className="text-gray-500 mb-6">
            We work with all major brands. If your phone isn&apos;t listed, give us a call — we may still
            be able to help.
          </p>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <span
                key={b}
                className="bg-white border border-[var(--color-border)] rounded-md px-3 py-1.5 text-sm font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Info boxes */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl">
            <div className="font-semibold mb-2">Same-day repairs</div>
            <p className="text-sm text-gray-500 leading-relaxed">
              We stock screens and batteries for the most common iPhone and Samsung models.
              Most screen and battery jobs are done within a couple of hours.
            </p>
          </div>
          <div className="p-5 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl">
            <div className="font-semibold mb-2">90-day warranty</div>
            <p className="text-sm text-gray-500 leading-relaxed">
              All phone repairs come with a 90-day warranty on parts and labour.
              If the same issue comes back, we&apos;ll fix it at no charge.
            </p>
          </div>
          <div className="p-5 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl">
            <div className="font-semibold mb-2">No fix, no fee</div>
            <p className="text-sm text-gray-500 leading-relaxed">
              We don&apos;t charge for diagnostics we can&apos;t act on. Get a quote with no
              obligation — if you decide not to proceed, you don&apos;t pay.
            </p>
          </div>
        </div>
      </section>

      {/* Also see */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-4" >Also looking for…</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/laptop-macbook-repairs" className="btn-secondary text-sm">Laptop &amp; MacBook Repairs</Link>
            <Link to="/other-repairs" className="btn-secondary text-sm">TV &amp; Console Repairs</Link>
            <Link to="/accessories-buy-sell" className="btn-secondary text-sm">Accessories / Buy &amp; Sell</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-pad bg-[#111111] text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Get a repair quote</h2>
          <p className="mb-6" >
            Describe the fault and your phone model — we&apos;ll get back to you quickly. Or call us
            directly on{' '}
            <a href="tel:02088787266" className="text-white underline font-medium">020 8878 7266</a>.
          </p>
          <ContactForm light />
        </div>
      </section>
    </>
  )
}
