import { Link } from 'react-router-dom'

const services = [
  { to: '/repairs/phones/apple', label: 'iPhone Repairs' },
  { to: '/repairs/phones/samsung', label: 'Samsung Repairs' },
  { to: '/book-repair?category=phones', label: 'Screen & Battery Repairs' },
  { to: '/repairs/laptops-macbooks', label: 'Laptop & MacBook Repairs' },
  { to: '/repairs/tablets', label: 'Tablet Repairs' },
  { to: '/repairs/game-consoles', label: 'Games Console Repairs' },
  { to: '/book-repair', label: 'Book a Repair' },
  { to: '/other-repairs', label: 'TV & Other Repairs' },
]

const pages = [
  { to: '/', label: 'Home' },
  { to: '/repairs', label: 'Repairs' },
  { to: '/book-repair', label: 'Book Repair' },
  { to: '/other-repairs', label: 'Other Repairs' },
  { to: '/accessories-buy-sell', label: 'Accessories & Buy/Sell' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-white/55 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div>
            <span className="text-white font-bold text-lg block leading-snug">Sheen Repair</span>
            <span className="text-white/40 text-xs uppercase tracking-widest font-medium mt-1 block">East Sheen · SW14</span>
          </div>
          <p className="text-sm leading-relaxed text-white/45">
            Your local repair shop on Sheen Lane. We fix iPhones, Samsungs,
            laptops, MacBooks, tablets, and more. Walk-ins always welcome.
          </p>
          <a
            href="https://wa.me/442088787266"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm py-2.5 px-4 self-start"
            aria-label="WhatsApp us"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
          <ul className="space-y-2.5">
            {services.map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-white/50 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2.5">
            {pages.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-white/50 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Hours */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Find Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5 text-white/50">
              <svg className="mt-0.5 shrink-0 text-[var(--color-red)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>65 Sheen Lane<br />East Sheen, London SW14 8AD</span>
            </li>
            <li className="flex gap-2.5">
              <svg className="mt-0.5 shrink-0 text-[var(--color-red)]" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <a href="tel:02088787266" className="text-white/50 hover:text-white transition-colors">020 8878 7266</a>
            </li>
            <li className="pt-1 text-white/50">
              <span className="block text-white/30 text-xs uppercase tracking-wider mb-2">Opening Hours</span>
              <span className="block">Mon – Fri: 9:00 am – 6:30 pm</span>
              <span className="block">Saturday: 9:30 am – 5:30 pm</span>
              <span className="block">Sunday: Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {year} Sheen Repair, 65 Sheen Lane, East Sheen, London SW14. All rights reserved.</span>
          <span className="hidden sm:block">Phone repair East Sheen · iPhone repair Richmond · Laptop repair SW14</span>
        </div>
      </div>
    </footer>
  )
}
