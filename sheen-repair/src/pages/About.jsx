import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | PC &amp; Mobile Phone Repair Shop, East Sheen London SW14</title>
        <meta name="description" content="Local independent repair shop on Sheen Lane, East Sheen, London SW14. We repair phones, laptops, MacBooks, TVs and gadgets. Honest pricing, no fix no fee." />
        <link rel="canonical" href="https://sheenrepair.co.uk/about" />
      </Helmet>

      {/* Header */}
      <section style={{ backgroundColor: '#1c2d4a' }} className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">About</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">About the Shop</h1>
          <p className="max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            A local, independent repair shop at 65 Sheen Lane, East Sheen, London SW14.
          </p>
        </div>
      </section>

      {/* Main about content */}
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <span className="section-label">Who we are</span>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1c2d4a' }}>
                Your local repair shop in East Sheen
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We&apos;re an independent mobile phone and computer repair shop based on Sheen Lane
                in East Sheen, London SW14. We repair phones, laptops, MacBooks, tablets, TVs,
                games consoles and most electronic gadgets.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We started out as a small local repair shop serving families and individuals in the
                East Sheen, Richmond and Mortlake area — and that&apos;s still exactly what we do. We
                don&apos;t outsource repairs or send devices away — everything is handled in our own
                workshop.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our customers come to us because we&apos;re straightforward. We&apos;ll tell you honestly
                whether a repair is worth doing, what it will cost, and how long it will take.
                If we can&apos;t fix it, we won&apos;t charge you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg p-5" style={{ backgroundColor: '#f8f6f2', border: '1px solid #e5e1d8' }}>
                <div className="font-semibold mb-1" style={{ color: '#1c2d4a' }}>Located on Sheen Lane</div>
                <p className="text-sm text-gray-500">65 Sheen Lane, London SW14 8AD — easy to reach from Richmond, Mortlake, Barnes and Kew.</p>
              </div>
              <div className="rounded-lg p-5" style={{ backgroundColor: '#f8f6f2', border: '1px solid #e5e1d8' }}>
                <div className="font-semibold mb-1" style={{ color: '#1c2d4a' }}>Same-day repairs</div>
                <p className="text-sm text-gray-500">Most phone screen and battery jobs are done same day. We keep common parts in stock so you don&apos;t have to wait.</p>
              </div>
              <div className="rounded-lg p-5" style={{ backgroundColor: '#f8f6f2', border: '1px solid #e5e1d8' }}>
                <div className="font-semibold mb-1" style={{ color: '#1c2d4a' }}>Independent &amp; local</div>
                <p className="text-sm text-gray-500">We&apos;re not part of a chain. When you bring your device in, you&apos;re dealing with the person actually doing the repair.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section-pad" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1c2d4a' }}>What we repair</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { cat: 'Phones', items: ['iPhone (all models)', 'Samsung Galaxy', 'Google Pixel', 'Most Android brands'] },
              { cat: 'Laptops & MacBooks', items: ['MacBook Pro & Air', 'Dell, HP, Lenovo, Asus', 'Acer & Toshiba', 'Microsoft Surface'] },
              { cat: 'Tablets', items: ['iPad (all models)', 'Samsung & Android tablets', 'Amazon Fire tablets'] },
              { cat: 'Other Devices', items: ['Smart TVs', 'PlayStation & Xbox', 'Nintendo Switch', 'Desktop PCs'] },
            ].map(({ cat, items }) => (
              <div key={cat} className="rounded p-4" style={{ backgroundColor: '#fff', border: '1px solid #e5e1d8' }}>
                <div className="font-semibold mb-2 text-sm" style={{ color: '#1c2d4a' }}>{cat}</div>
                <ul className="text-sm text-gray-500 space-y-1">
                  {items.map((i) => <li key={i}>— {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/phone-repairs" className="btn-primary text-sm">Phone Repairs</Link>
            <Link to="/laptop-macbook-repairs" className="btn-secondary text-sm">Laptop &amp; MacBook</Link>
            <Link to="/other-repairs" className="btn-secondary text-sm">TV &amp; Other</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ backgroundColor: '#1c2d4a' }} className="py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Come and see us</h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            65 Sheen Lane, East Sheen, London SW14 8AD.<br />
            Monday–Friday 9am–6:30pm · Saturday 9:30am–5:30pm
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:02088787266" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              020 8878 7266
            </a>
            <Link to="/contact" className="btn-outline-white">Send a message</Link>
          </div>
        </div>
      </section>
    </>
  )
}
