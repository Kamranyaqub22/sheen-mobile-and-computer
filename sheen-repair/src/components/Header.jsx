import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phone-repairs', label: 'Phone Repairs' },
  { to: '/laptop-macbook-repairs', label: 'Laptop & MacBook' },
  { to: '/other-repairs', label: 'Other Repairs' },
  { to: '/accessories-buy-sell', label: 'Accessories / Buy & Sell' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar — phone number + CTA strip */}
      <div style={{ backgroundColor: '#12203a' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-2 gap-4">
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span className="hidden sm:flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              65 Sheen Ln, London SW14 8AD
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="hidden md:inline">Mon–Fri 9am–6:30pm &nbsp;|&nbsp; Sat 9:30am–5:30pm</span>
            </span>
          </div>
          <a
            href="tel:02088787266"
            className="flex items-center gap-2 text-white font-bold text-sm sm:text-base hover:text-yellow-300 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            020 8878 7266
          </a>
        </div>
      </div>

      {/* Main nav bar */}
      <div style={{ backgroundColor: '#1c2d4a' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex flex-col leading-tight"
            aria-label="PC & Mobile Phone Repair Shop — Home"
          >
            <span className="text-white font-bold text-base sm:text-lg leading-tight">
              PC &amp; Mobile Repair
            </span>
            <span style={{ color: '#f5a623' }} className="text-xs font-medium tracking-wide hidden sm:block">
              East Sheen · SW14
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-yellow-300'
                      : 'text-white/85 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="tel:02088787266"
            className="hidden lg:inline-flex items-center gap-2 btn-primary text-sm ml-4"
            aria-label="Call us now"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call Now
          </a>

          {/* Mobile — phone icon + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:02088787266"
              className="text-white p-1.5"
              aria-label="Call 020 8878 7266"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-white p-1.5"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <nav
            className="lg:hidden border-t px-4 pb-4 pt-2 flex flex-col gap-1"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-yellow-300 bg-white/5'
                      : 'text-white/85 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <a href="tel:02088787266" className="btn-primary w-full justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call 020 8878 7266
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
