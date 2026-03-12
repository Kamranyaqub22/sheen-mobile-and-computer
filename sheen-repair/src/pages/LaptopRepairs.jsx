import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

const repairs = [
  {
    title: 'MacBook Screen Replacement',
    body: 'Cracked or flickering MacBook display? We replace screens on MacBook Air and MacBook Pro, including Retina and Liquid Retina models.',
  },
  {
    title: 'Laptop Screen Replacement',
    body: 'We replace cracked, dim or dead screens on Windows laptops from Dell, HP, Lenovo, Asus, Acer and more.',
  },
  {
    title: 'MacBook Battery Replacement',
    body: "If your MacBook won't last past 45 minutes, the battery needs replacing. We fit third-party and OEM batteries for all current MacBook models.",
  },
  {
    title: 'Laptop Battery Replacement',
    body: 'Poor battery life on a Windows laptop? We source and fit replacement batteries for most laptop brands and models.',
  },
  {
    title: 'Keyboard Replacement',
    body: "Sticky, dead or physically broken keys? We replace full keyboards on both MacBooks and Windows laptops — including Apple's butterfly and scissor-switch models.",
  },
  {
    title: 'Motherboard Repair',
    body: 'Laptop not powering on, no display, or randomly shutting off? We do board-level diagnostics and repair on most laptop motherboards.',
  },
  {
    title: 'Data Recovery',
    body: "Hard drive failed, SSD corrupted, accidental deletion? We recover data from laptops and MacBooks where possible — including from physically damaged drives.",
  },
  {
    title: 'Software & OS Issues',
    body: 'Slow Mac, Windows constantly updating, boot failure, virus removal, OS reinstallation. We sort software problems without unnecessary upselling.',
  },
  {
    title: 'RAM & Storage Upgrade',
    body: "If your laptop is running slowly, a RAM upgrade or switching to an SSD can make a significant difference. We fit and configure upgrades on the same day.",
  },
  {
    title: 'Charging Port / DC Jack',
    body: "Laptop only charges at a certain angle or the port feels loose? We repair and replace charging ports and DC jacks on Windows laptops.",
  },
]

const brands = [
  'MacBook Pro', 'MacBook Air', 'iMac', 'Dell', 'HP', 'Lenovo ThinkPad',
  'Lenovo IdeaPad', 'Asus', 'Acer', 'Microsoft Surface', 'Samsung Galaxy Book',
  'Toshiba', 'Sony VAIO', 'Chromebook',
]

export default function LaptopRepairs() {
  return (
    <>
      <Helmet>
        <title>Laptop &amp; MacBook Repairs East Sheen, Richmond | SW14 — Same Day</title>
        <meta name="description" content="Laptop and MacBook repair in East Sheen, London SW14. Screen replacement, battery, keyboard, data recovery, motherboard repair. MacBook repair near Richmond and Mortlake." />
        <meta name="keywords" content="laptop repair East Sheen, MacBook repair Richmond, MacBook repair SW14, laptop screen replacement East Sheen, data recovery SW14" />
        <link rel="canonical" href="https://sheenrepair.co.uk/laptop-macbook-repairs" />
      </Helmet>

      {/* Page header */}
      <section style={{ backgroundColor: '#1c2d4a' }} className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Laptop &amp; MacBook Repairs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Laptop &amp; MacBook Repairs in East Sheen
          </h1>
          <p className="max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            MacBook and Windows laptop repairs at 65 Sheen Lane, London SW14.
            Screen, battery, keyboard, data recovery — we do it all in-house.
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

      {/* MacBook vs Windows split */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#1c2d4a' }}>MacBook Repairs</h2>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Apple devices are expensive — we understand you want them repaired properly.
              We work on all MacBook Pro and MacBook Air models, including M1, M2 and M3 chip
              variants. Screen, battery, keyboard, software — most jobs don&apos;t need to go to Apple.
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5">
              {['MacBook screen replacement','MacBook battery replacement','MacBook keyboard replacement','Logic board diagnostics','macOS reinstall & recovery','SSD upgrade or replacement'].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span style={{ color: '#c0392b' }}>✓</span>{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#1c2d4a' }}>Windows Laptop Repairs</h2>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              We repair Dell, HP, Lenovo, Asus, Acer and most other brands. Whether it&apos;s a
              cracked screen, a laptop that won&apos;t start, or a slow machine that needs upgrading —
              bring it in for a free assessment.
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5">
              {['Screen replacement','Battery replacement','Keyboard & trackpad','Motherboard repair','Windows reinstall & virus removal','RAM & SSD upgrade'].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span style={{ color: '#c0392b' }}>✓</span>{i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Repairs grid */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">All services</span>
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1c2d4a' }}>Laptop &amp; MacBook repair services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repairs.map(({ title, body }) => (
              <div key={title} className="service-card">
                <h3 className="font-semibold mb-2" style={{ color: '#1c2d4a', fontSize: '0.9375rem' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#1c2d4a' }}>Brands &amp; models we work on</h2>
          <p className="text-gray-500 mb-5">
            Not sure if we cover your laptop? Call us — we handle most consumer brands.
          </p>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <span key={b} className="text-sm px-3 py-1.5 rounded font-medium" style={{ backgroundColor: '#fff', color: '#1c2d4a', border: '1px solid #ddd8ce' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Also see */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1c2d4a' }}>Also looking for…</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/phone-repairs" className="btn-secondary text-sm">Phone Repairs</Link>
            <Link to="/other-repairs" className="btn-secondary text-sm">TV &amp; Console Repairs</Link>
            <Link to="/accessories-buy-sell" className="btn-secondary text-sm">Buy &amp; Sell Laptops</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-pad" style={{ backgroundColor: '#1c2d4a' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Need a laptop or MacBook repair?</h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Describe what&apos;s happening and we&apos;ll advise. Or walk in — free diagnostics, no appointment needed.
          </p>
          <ContactForm light />
        </div>
      </section>
    </>
  )
}
