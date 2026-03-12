import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const accessories = [
  { title: 'Phone Cases & Screen Protectors', body: 'We stock protective cases and tempered glass screen protectors for popular iPhone and Samsung models. Drop in to see what\'s available.' },
  { title: 'Charging Cables & Adapters', body: 'USB-C, Lightning, Micro-USB charging cables and wall adapters. We keep a good range of reliable cables in stock.' },
  { title: 'Headphones & Earphones', body: 'Wired and wireless options available. Ask in-store for current stock.' },
  { title: 'Power Banks', body: 'Portable chargers for phones and tablets. Useful backup if your battery is due for replacement.' },
  { title: 'Bluetooth Speakers', body: 'We carry a selection of portable Bluetooth speakers suitable for everyday use.' },
  { title: 'Memory Cards & USB Drives', body: 'SD cards, microSD cards and USB flash drives for phones, cameras and laptops.' },
]

export default function Accessories() {
  return (
    <>
      <Helmet>
        <title>Phone Accessories, Buy &amp; Sell Phones — East Sheen, London SW14</title>
        <meta name="description" content="Phone accessories, cases, cables, chargers. Buy and sell used phones and laptops at our East Sheen shop, 65 Sheen Lane SW14. We also buy faulty devices." />
        <link rel="canonical" href="https://sheenrepair.co.uk/accessories-buy-sell" />
      </Helmet>

      {/* Header */}
      <section style={{ backgroundColor: '#1c2d4a' }} className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Accessories / Buy &amp; Sell</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Accessories, Buy &amp; Sell
          </h1>
          <p className="max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Accessories in stock at 65 Sheen Lane. We also buy and sell used phones and
            laptops — working and faulty.
          </p>
        </div>
      </section>

      {/* Accessories */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4">
          <span className="section-label">In-store stock</span>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#1c2d4a' }}>Phone &amp; gadget accessories</h2>
          <p className="text-gray-500 mb-7 max-w-xl">
            We keep a practical range of accessories in the shop. Stock changes — call ahead if you
            need something specific and we&apos;ll let you know if we have it.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessories.map(({ title, body }) => (
              <div key={title} className="service-card">
                <h3 className="font-semibold mb-2" style={{ color: '#1c2d4a', fontSize: '0.9375rem' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy & Sell */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Buy */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#1c2d4a' }}>Buy a second-hand device</h2>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              We sell refurbished phones and laptops in-store. Stock changes regularly —
              all devices are tested and cleaned before sale. Come in or call to find
              out what we have available at the moment.
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5 mb-5">
              {['Refurbished iPhones','Samsung Galaxy devices','Windows laptops','MacBooks (when available)','All tested before sale','Sold with a short warranty'].map((i) => (
                <li key={i} className="flex gap-2"><span style={{ color: '#c0392b' }}>✓</span>{i}</li>
              ))}
            </ul>
            <a href="tel:02088787266" className="btn-primary text-sm">
              Check what&apos;s in stock
            </a>
          </div>

          {/* Sell */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#1c2d4a' }}>Sell or trade in your device</h2>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Got an old phone or laptop sitting in a drawer? We buy used devices for cash — working
              or faulty. Prices are agreed on the day based on the condition and model.
              No appointment needed.
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5 mb-5">
              {['iPhones — working or faulty','Samsung and Android phones','Windows laptops','MacBooks (working or damaged)','Tablets and iPads','We assess on the spot'].map((i) => (
                <li key={i} className="flex gap-2"><span style={{ color: '#c0392b' }}>✓</span>{i}</li>
              ))}
            </ul>
            <a href="tel:02088787266" className="btn-primary text-sm">
              Get a price for yours
            </a>
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
            <Link to="/contact" className="btn-secondary text-sm">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#c0392b' }} className="py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Come in and see what we have</h2>
          <p className="text-white/80 mb-6">
            65 Sheen Lane, East Sheen SW14. Open Monday–Friday 9am–6:30pm, Saturday 9:30am–5:30pm.
          </p>
          <a href="tel:02088787266" className="btn-outline-white">
            Call 020 8878 7266
          </a>
        </div>
      </section>
    </>
  )
}
