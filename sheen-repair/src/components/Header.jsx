import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/repairs', label: 'Repairs' },
  { to: '/accessories-buy-sell', label: 'Accessories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="bg-[#0f0f0f] border-b border-white/8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 py-2 text-xs text-white/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              65 Sheen Lane, East Sheen, London SW14
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
              Mon–Fri 9am–6:30pm · Sat 9:30am–5:30pm
            </span>
          </div>
          <a href="tel:02088787266" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors font-medium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            020 8878 7266
          </a>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-[#111111] shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="max-w-[1440px] mx-auto flex h-[60px] items-center justify-between gap-4 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Sheen Repair — Home">
            <span className="h-9 w-9 flex items-center justify-center bg-white rounded-lg overflow-hidden">
              <img src="/media/logo.svg" alt="Sheen Repair logo" className="h-7 w-7 object-contain" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-white font-bold text-sm tracking-tight">Sheen Repair</span>
              <span className="text-white/70 text-[10px] font-medium uppercase tracking-widest">East Sheen · SW14</span>
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
                  `px-4 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/65 hover:text-white hover:bg-white/6'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:02088787266" className="flex items-center gap-2 text-white font-bold text-sm hover:text-[var(--color-red)] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              020 8878 7266
            </a>
            <Link to="/book-repair" className="btn-primary text-sm py-2 px-5">
              Book Repair
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <a href="tel:02088787266" className="p-2 text-white" aria-label="Call us">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 text-white"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-white/8 px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 pt-3 border-t border-white/8 flex flex-col gap-2">
              <Link to="/book-repair" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center py-3">
                Book a Repair
              </Link>
              <a href="tel:02088787266" className="btn-outline-white w-full justify-center py-3">
                Call 020 8878 7266
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
