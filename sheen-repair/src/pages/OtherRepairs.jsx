import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

const faults = [
  {
    category: 'Smart TV Repairs',
    items: [
      { title: 'No picture / black screen', body: "TV turns on but screen stays black or backlight isn't working correctly. We diagnose and repair the cause rather than quoting for a full replacement." },
      { title: 'No power', body: "TV completely dead? This is often a faulty power board or blown capacitors — components we can replace." },
      { title: 'Screen damage', body: 'Physical screen cracks on a flat-screen TV are more complex to repair, but we can advise on whether it\'s cost-effective before you commit.' },
      { title: 'HDMI & input faults', body: 'HDMI ports worn out or damaged. We replace individual ports on most smart TV models.' },
      { title: 'Software & smart TV issues', body: 'Frozen apps, slow performance, update failures — we handle software resets and smart TV configuration.' },
    ],
  },
  {
    category: 'Games Console Repairs',
    items: [
      { title: 'PlayStation 4 & 5', body: "PS4 not reading discs, blue light of death, overheating, HDMI port issues, controller drift. PS5 faults including fan noise, start-up issues and USB/disc drive problems." },
      { title: 'Xbox One / Xbox Series', body: 'Xbox not powering on, overheating, HDMI faults, disc drive faults and software errors.' },
      { title: 'Nintendo Switch', body: 'Cracked screen, Joy-Con drift, charging issues, dock not connecting, software fixes.' },
      { title: 'Other consoles', body: 'Older consoles and handheld devices — ask us what we can do.' },
    ],
  },
  {
    category: 'Tablets',
    items: [
      { title: 'iPad screen replacement', body: 'Cracked iPad screen or unresponsive touch? We replace screens for most iPad models including iPad Pro, iPad Air and standard iPad.' },
      { title: 'Android tablet repair', body: 'Samsung, Huawei, Amazon Fire and other Android tablets — screen, battery and charging port repairs.' },
      { title: 'iPad battery replacement', body: 'iPad not holding charge? We fit replacement batteries for all mainstream iPad models.' },
    ],
  },
]

export default function OtherRepairs() {
  return (
    <>
      <Helmet>
        <title>TV, Console &amp; Gadget Repairs East Sheen, London SW14</title>
        <meta name="description" content="Smart TV repair, PlayStation repair, Xbox repair, Nintendo Switch and tablet repair in East Sheen, London SW14. Bring in your gadgetfor a free assessment." />
        <link rel="canonical" href="https://sheenrepair.co.uk/other-repairs" />
      </Helmet>

      {/* Page header */}
      <section style={{ backgroundColor: '#1c2d4a' }} className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Other Repairs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            TV, Console &amp; Gadget Repairs
          </h1>
          <p className="max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            We repair smart TVs, PlayStation, Xbox, Nintendo Switch, iPads and other devices at
            65 Sheen Lane, East Sheen SW14. Walk-ins welcome.
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

      {/* Repair sections */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          {faults.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-xl font-bold mb-5" style={{ color: '#1c2d4a', borderBottom: '2px solid #e5e1d8', paddingBottom: '0.5rem' }}>{category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(({ title, body }) => (
                  <div key={title} className="service-card">
                    <h3 className="font-semibold mb-2" style={{ color: '#1c2d4a', fontSize: '0.9375rem' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call out services */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#1c2d4a' }}>Call-out service available</h2>
            <p className="text-gray-500 mb-4 max-w-2xl leading-relaxed">
              For large items like TVs or desktop computers that are difficult to bring in, we can
              arrange a call-out to your home or office in the East Sheen, Richmond and Barnes area.
              Call us to discuss availability and pricing.
            </p>
            <a href="tel:02088787266" className="btn-primary">Call to arrange a call-out</a>
          </div>
        </div>
      </section>

      {/* Also see */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1c2d4a' }}>Also looking for…</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/phone-repairs" className="btn-secondary text-sm">Phone Repairs</Link>
            <Link to="/laptop-macbook-repairs" className="btn-secondary text-sm">Laptop &amp; MacBook Repairs</Link>
            <Link to="/accessories-buy-sell" className="btn-secondary text-sm">Accessories / Buy &amp; Sell</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-pad" style={{ backgroundColor: '#1c2d4a' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Got a broken TV or console?</h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Bring it in or drop us a message with the make, model and fault. Free diagnosis on all devices.
          </p>
          <ContactForm light />
        </div>
      </section>
    </>
  )
}
