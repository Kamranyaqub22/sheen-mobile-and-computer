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

      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-6xl mx-auto px-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
                <Link to="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white/82">About</span>
              </div>
              <span className="section-label text-[var(--color-orange-soft)]">Independent local repair shop</span>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white md:text-5xl">About the shop and how we work</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/74 md:text-lg">
                We&apos;re an East Sheen repair shop focused on clear advice, practical turnaround times, and work carried out in our own workshop rather than outsourced elsewhere.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/repairs" className="btn-primary">Browse Repairs</Link>
                <Link to="/contact" className="btn-outline-white">Contact the Shop</Link>
              </div>
            </div>

            <div className="panel-dark p-6 md:p-7">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['In-house workshop', 'Repairs are handled on site rather than sent away.'],
                  ['Same-day common faults', 'Many popular phone jobs are completed the same day.'],
                  ['Honest quoting', 'If a repair is not worth doing, we say so clearly.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/66">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              <div className="info-tile p-5">
                <div className="font-semibold mb-1" style={{ color: '#1c2d4a' }}>Located on Sheen Lane</div>
                <p className="text-sm text-gray-500">65 Sheen Lane, London SW14 8AD — easy to reach from Richmond, Mortlake, Barnes and Kew.</p>
              </div>
              <div className="info-tile p-5">
                <div className="font-semibold mb-1" style={{ color: '#1c2d4a' }}>Same-day repairs</div>
                <p className="text-sm text-gray-500">Most phone screen and battery jobs are done same day. We keep common parts in stock so you don&apos;t have to wait.</p>
              </div>
              <div className="info-tile p-5">
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
              <div key={cat} className="info-tile h-full p-4">
                <div className="font-semibold mb-2 text-sm" style={{ color: '#1c2d4a' }}>{cat}</div>
                <ul className="text-sm text-gray-500 space-y-1">
                  {items.map((i) => <li key={i}>— {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/repairs/phones" className="btn-primary text-sm">Phone Repairs</Link>
            <Link to="/repairs/laptops-macbooks" className="btn-secondary text-sm">Laptop &amp; MacBook</Link>
            <Link to="/repairs/game-consoles" className="btn-secondary text-sm">Console Repairs</Link>
          </div>
        </div>
      </section>

      <section className="accent-banner section-pad-tight">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Come and see us</h2>
          <p className="mb-6 text-white/82">
            65 Sheen Lane, East Sheen, London SW14 8AD.<br />
            Monday–Friday 9am–6:30pm · Saturday 9:30am–5:30pm
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book-repair" className="btn-outline-white">Book Repair</Link>
            <Link to="/contact" className="btn-outline-white">Send a message</Link>
          </div>
        </div>
      </section>
    </>
  )
}
