import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Sheen Repair — East Sheen, London SW14</title>
        <meta name="description" content="Local independent repair shop on Sheen Lane, East Sheen, London SW14. We repair phones, laptops, MacBooks, TVs and gadgets. Honest pricing, no fix no fee." />
        <link rel="canonical" href="https://sheenrepair.co.uk/about" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span>About</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-tight">
              About<br /><span className="text-[var(--color-red)]">Sheen Repair</span>
            </h1>
            <p className="mt-5 max-w-xl text-white/60 text-lg leading-relaxed">
              Independent repair shop on Sheen Lane, East Sheen. We fix phones, laptops,
              MacBooks, consoles and more — all in our own workshop.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/repairs" className="btn-primary">Browse Repairs</Link>
              <Link to="/contact" className="btn-outline-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-pad bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="section-label">Who we are</span>
              <h2 className="text-4xl font-black text-[var(--color-text)] uppercase mb-5">
                Your Local Repair Shop in East Sheen
              </h2>
              <p className="text-[var(--color-muted)] mb-4 leading-relaxed">
                We're an independent mobile phone and computer repair shop on Sheen Lane in
                East Sheen, London SW14. We repair phones, laptops, MacBooks, tablets, TVs,
                games consoles and most electronic gadgets.
              </p>
              <p className="text-[var(--color-muted)] mb-4 leading-relaxed">
                We serve customers from East Sheen, Richmond, Mortlake, Barnes and the
                surrounding SW14 area. Everything is handled in our own workshop — we don't
                outsource or send devices away.
              </p>
              <p className="text-[var(--color-muted)] leading-relaxed">
                We'll tell you honestly whether a repair is worth doing, what it will cost,
                and how long it will take. If we can't fix it, you don't pay.
              </p>
            </div>
            <div className="space-y-3">
              {[
                ['In-house workshop', 'All repairs handled on site — nothing sent away.'],
                ['Same-day common faults', 'Most phone screens and batteries done the same day.'],
                 ['Honest quoting', "We tell you the cost upfront. If it's not worth fixing, we say so."],
                ['Independent & local', 'Not a franchise. You deal with the people doing the work.'],
              ].map(([title, body]) => (
                <div key={title} className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-5">
                  <div className="font-bold text-[var(--color-text)] text-sm mb-1">{title}</div>
                  <p className="text-sm text-[var(--color-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we repair */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <span className="section-label">What we fix</span>
          <h2 className="text-4xl font-black text-[var(--color-text)] uppercase mb-8">What We Repair</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { cat: 'Phones', items: ['iPhone (all models)', 'Samsung Galaxy', 'Google Pixel', 'Most Android brands'] },
              { cat: 'Laptops & MacBooks', items: ['MacBook Pro & Air', 'Dell, HP, Lenovo, Asus', 'Acer & Toshiba', 'Microsoft Surface'] },
              { cat: 'Tablets', items: ['iPad (all models)', 'Samsung & Android tablets', 'Amazon Fire tablets'] },
              { cat: 'Other Devices', items: ['Smart TVs', 'PlayStation & Xbox', 'Nintendo Switch', 'Desktop PCs'] },
            ].map(({ cat, items }) => (
              <div key={cat} className="bg-white border border-[var(--color-border)] rounded-xl p-5">
                <div className="font-bold text-[var(--color-text)] text-sm mb-3">{cat}</div>
                <ul className="text-sm text-[var(--color-muted)] space-y-1.5">
                  {items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/repairs/phones" className="btn-primary text-sm">Phone Repairs</Link>
            <Link to="/repairs/laptops-macbooks" className="btn-secondary text-sm">Laptop & MacBook</Link>
            <Link to="/repairs/game-consoles" className="btn-secondary text-sm">Console Repairs</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-red)] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black uppercase mb-3">Come and See Us</h2>
          <p className="mb-6 text-white/80 text-lg">
            65 Sheen Lane, East Sheen, London SW14 8AD.<br />
            Mon–Fri 9am–6:30pm · Sat 9:30am–5:30pm
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:02088787266" className="btn-outline-white">Call 020 8878 7266</a>
            <Link to="/book-repair" className="bg-white text-[var(--color-red)] font-bold px-6 py-3 rounded-md hover:bg-white/90 transition-colors text-sm">Book a Repair</Link>
          </div>
        </div>
      </section>
    </>
  )
}

