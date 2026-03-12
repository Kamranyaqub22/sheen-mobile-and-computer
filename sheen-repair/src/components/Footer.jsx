import { Link } from 'react-router-dom'

const services = [
  { to: '/phone-repairs', label: 'iPhone Repair' },
  { to: '/phone-repairs', label: 'Samsung Repair' },
  { to: '/phone-repairs', label: 'Screen Replacement' },
  { to: '/phone-repairs', label: 'Battery Replacement' },
  { to: '/phone-repairs', label: 'Water Damage Repair' },
  { to: '/laptop-macbook-repairs', label: 'Laptop Repair' },
  { to: '/laptop-macbook-repairs', label: 'MacBook Repair' },
  { to: '/laptop-macbook-repairs', label: 'Data Recovery' },
  { to: '/other-repairs', label: 'TV Repair' },
  { to: '/other-repairs', label: 'Games Console Repair' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#12203a', color: '#ccd4e0' }}>
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand / About */}
        <div className="lg:col-span-1">
          <div className="mb-3">
            <span className="text-white font-bold text-lg block leading-tight">PC &amp; Mobile</span>
            <span className="text-white font-bold text-lg block leading-tight">Phone Repair Shop</span>
            <span className="text-xs font-medium mt-1 block" style={{ color: '#f5a623' }}>Serving East Sheen &amp; SW14</span>
          </div>
          <p className="text-sm leading-relaxed text-white/65 mb-4">
            Your local repair shop on Sheen Lane. We fix iPhones, Samsungs,
            laptops, MacBooks, tablets, TVs and more. Walk-ins always welcome.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/442088787266"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm py-2 px-4"
              aria-label="WhatsApp us"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
          <ul className="space-y-2">
            {services.map(({ to, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#a8b8cc' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Pages</h3>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/phone-repairs', label: 'Phone Repairs' },
              { to: '/laptop-macbook-repairs', label: 'Laptop & MacBook Repairs' },
              { to: '/other-repairs', label: 'Other Repairs' },
              { to: '/accessories-buy-sell', label: 'Accessories / Buy & Sell' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to + label}>
                <Link
                  to={to}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#a8b8cc' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Hours */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Find Us</h3>
          <ul className="space-y-3 text-sm" style={{ color: '#a8b8cc' }}>
            <li className="flex gap-2">
              <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>65 Sheen Lane<br/>London SW14 8AD</span>
            </li>
            <li className="flex gap-2">
              <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <a href="tel:02088787266" className="hover:text-white transition-colors">020 8878 7266</a>
            </li>
            <li className="pt-1">
              <span className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Opening Hours</span>
              <span className="block">Mon – Fri: 9:00am – 6:30pm</span>
              <span className="block">Saturday: 9:30am – 5:30pm</span>
              <span className="block">Sunday: Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: '#708090' }}>
          <span>© {year} PC &amp; Mobile Phone Repair Shop, East Sheen, London SW14. All rights reserved.</span>
          <span>Phone repair East Sheen · iPhone repair Richmond · Laptop repair SW14</span>
        </div>
      </div>
    </footer>
  )
}
