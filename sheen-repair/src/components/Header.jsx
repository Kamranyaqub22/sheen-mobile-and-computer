import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/repairs', label: 'Repairs' },
  { to: '/accessories-buy-sell', label: 'Accessories / Buy & Sell' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_10px_30px_rgba(15,23,42,0.14)]">
      <div className="border-b border-white/8 bg-[var(--color-navy-dark)]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 py-2.5 text-xs sm:text-sm">
          <div className="flex min-w-0 items-center gap-3 text-white/72">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/88">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              East Sheen · SW14
            </span>
            <span className="hidden md:inline-flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
              Mon-Sat walk-ins welcome
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/book-repair"
              className="hidden sm:inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-orange-soft)] transition-colors hover:text-white"
            >
              Book online
            </Link>
            <a
              href="tel:02088787266"
              className="flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[var(--color-orange-soft)] sm:text-base"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              020 8878 7266
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-navy)]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 leading-tight"
            aria-label="PC & Mobile Phone Repair Shop — Home"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-orange)_0%,var(--color-orange-deep)_100%)] text-xs font-black tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(200,90,0,0.24)]">
              PC
            </span>
            <span className="min-w-0 flex flex-col">
              <span className="truncate text-sm font-bold text-white sm:text-base">
                PC &amp; Mobile Repair
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-orange-soft)] sm:text-xs">
                65 Sheen Lane
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'text-white/78 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/book-repair"
            className="hidden lg:inline-flex items-center gap-2 btn-primary text-sm ml-4"
            aria-label="Book a repair"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 6h13"/>
              <path d="M8 12h13"/>
              <path d="M8 18h13"/>
              <path d="M3 6h.01"/>
              <path d="M3 12h.01"/>
              <path d="M3 18h.01"/>
            </svg>
            Book Repair
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:02088787266"
              className="rounded-full border border-white/12 bg-white/6 p-2 text-white"
              aria-label="Call 020 8878 7266"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full border border-white/12 bg-white/6 p-2 text-white"
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
                      ? 'bg-white/10 text-white'
                      : 'text-white/85 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 grid gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <Link to="/book-repair" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 6h13"/>
                  <path d="M8 12h13"/>
                  <path d="M8 18h13"/>
                  <path d="M3 6h.01"/>
                  <path d="M3 12h.01"/>
                  <path d="M3 18h.01"/>
                </svg>
                Book Repair
              </Link>
              <a href="tel:02088787266" className="btn-outline-white w-full justify-center">
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
