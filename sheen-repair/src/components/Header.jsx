import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { useCart } from '../context/CartContext'

// Category icons keyed by slug
function CategoryIcon({ slug }) {
  switch (slug) {
    case 'phones':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      )
    case 'laptops-macbooks':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="13" rx="2"/>
          <path d="M0 21h24"/>
        </svg>
      )
    case 'tablets':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      )
    case 'game-consoles':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4a2 2 0 00-2 2v2a2 2 0 002 2h2m12-6h2a2 2 0 012 2v2a2 2 0 01-2 2h-2"/>
          <rect x="6" y="7" width="12" height="10" rx="2"/>
          <path d="M9 12h6M12 9v6"/>
        </svg>
      )
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      )
  }
}

const otherNavLinks = [
  { to: '/accessories-buy-sell', label: 'Accessories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [repairMenuOpen, setRepairMenuOpen] = useState(false)
  const [mobileRepairsOpen, setMobileRepairsOpen] = useState(false)
  const { catalog } = useRepairCatalog()
  const { items: cartItems } = useCart()
  const location = useLocation()

  const isRepairsActive = location.pathname.startsWith('/repairs')
  const cartCount = cartItems.length

  return (
    <header className="sticky top-0 z-50 w-full text-white">
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/6'}`
              }
            >
              Home
            </NavLink>

            {/* Repairs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setRepairMenuOpen(true)}
              onMouseLeave={() => setRepairMenuOpen(false)}
            >
              <Link
                to="/repairs"
                className={`flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition-colors ${isRepairsActive ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/6'}`}
              >
                Repairs
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${repairMenuOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>

              {/* Dropdown */}
              {repairMenuOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 rounded-xl border border-white/10 bg-[#1c1c1c] shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40 border-b border-white/8">
                    Repair by device type
                  </div>
                  {catalog.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/repairs/${cat.slug}`}
                      onClick={() => setRepairMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/6 transition-colors border-b border-white/5 last:border-0"
                    >
                      <span className="text-[var(--color-red)]"><CategoryIcon slug={cat.slug} /></span>
                      <span className="font-medium">{cat.name}</span>
                      <span className="ml-auto text-white/35 text-xs">{cat.brands.length} brands</span>
                    </Link>
                  ))}
                  <Link
                    to="/repairs"
                    onClick={() => setRepairMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--color-red)] hover:bg-white/6 transition-colors font-semibold border-t border-white/8"
                  >
                    All repairs & search
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {otherNavLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/6'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA + Basket */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:02088787266" className="flex items-center gap-2 text-white font-bold text-sm hover:text-[var(--color-red)] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              020 8878 7266
            </a>

            {/* Basket icon */}
            <Link to="/checkout" className="relative p-2 text-white/70 hover:text-white transition-colors" aria-label={`Basket${cartCount > 0 ? ` (${cartCount} items)` : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/checkout" className="btn-primary text-sm py-2 px-5">
              Book Repair
            </Link>
          </div>

          {/* Mobile right side: basket + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <Link to="/checkout" className="relative p-2 text-white" aria-label={`Basket${cartCount > 0 ? ` (${cartCount} items)` : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
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
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'}`
              }
            >
              Home
            </NavLink>

            {/* Mobile Repairs accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileRepairsOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded text-sm font-medium transition-colors ${isRepairsActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'}`}
              >
                Repairs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${mobileRepairsOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {mobileRepairsOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  <Link
                    to="/repairs"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    All Repairs
                  </Link>
                  {catalog.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/repairs/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <span className="text-[var(--color-red)]"><CategoryIcon slug={cat.slug} /></span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {otherNavLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'}`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="mt-3 pt-3 border-t border-white/8 flex flex-col gap-2">
              <Link to="/checkout" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center py-3">
                {cartCount > 0 ? `View Basket (${cartCount})` : 'Book a Repair'}
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

      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="13" rx="2"/>
          <path d="M0 21h24"/>
        </svg>
      )
    case 'tablets':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      )
    case 'game-consoles':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4a2 2 0 00-2 2v2a2 2 0 002 2h2m12-6h2a2 2 0 012 2v2a2 2 0 01-2 2h-2"/>
          <rect x="6" y="7" width="12" height="10" rx="2"/>
          <path d="M9 12h6M12 9v6"/>
        </svg>
      )
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      )
  }
}

const otherNavLinks = [
  { to: '/accessories-buy-sell', label: 'Accessories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [repairMenuOpen, setRepairMenuOpen] = useState(false)
  const [mobileRepairsOpen, setMobileRepairsOpen] = useState(false)
  const { catalog } = useRepairCatalog()
  const { items: cartItems } = useCart()
  const location = useLocation()

  const isRepairsActive = location.pathname.startsWith('/repairs')
  const cartCount = cartItems.length

  return (
    <header className="sticky top-0 z-50 w-full text-white">
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/6'}`
              }
            >
              Home
            </NavLink>

            {/* Repairs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setRepairMenuOpen(true)}
              onMouseLeave={() => setRepairMenuOpen(false)}
            >
              <Link
                to="/repairs"
                className={`flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition-colors ${isRepairsActive ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/6'}`}
              >
                Repairs
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${repairMenuOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>

              {/* Dropdown */}
              {repairMenuOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 rounded-xl border border-white/10 bg-[#1c1c1c] shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40 border-b border-white/8">
                    Repair by device type
                  </div>
                  {catalog.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/repairs/${cat.slug}`}
                      onClick={() => setRepairMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/6 transition-colors border-b border-white/5 last:border-0"
                    >
                      <span className="text-[var(--color-red)]"><CategoryIcon slug={cat.slug} /></span>
                      <span className="font-medium">{cat.name}</span>
                      <span className="ml-auto text-white/35 text-xs">{cat.brands.length} brands</span>
                    </Link>
                  ))}
                  <Link
                    to="/repairs"
                    onClick={() => setRepairMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--color-red)] hover:bg-white/6 transition-colors font-semibold border-t border-white/8"
                  >
                    All repairs & search
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {otherNavLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/6'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA + Basket */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:02088787266" className="flex items-center gap-2 text-white font-bold text-sm hover:text-[var(--color-red)] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              020 8878 7266
            </a>

            {/* Basket icon */}
            <Link to="/checkout" className="relative p-2 text-white/70 hover:text-white transition-colors" aria-label={`Basket${cartCount > 0 ? ` (${cartCount} items)` : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/checkout" className="btn-primary text-sm py-2 px-5">
              Book Repair
            </Link>
          </div>

          {/* Mobile right side: basket + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <Link to="/checkout" className="relative p-2 text-white" aria-label={`Basket${cartCount > 0 ? ` (${cartCount} items)` : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
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
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'}`
              }
            >
              Home
            </NavLink>

            {/* Mobile Repairs accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileRepairsOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded text-sm font-medium transition-colors ${isRepairsActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'}`}
              >
                Repairs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${mobileRepairsOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {mobileRepairsOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  <Link
                    to="/repairs"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    All Repairs
                  </Link>
                  {catalog.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/repairs/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <span className="text-[var(--color-red)]"><CategoryIcon slug={cat.slug} /></span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {otherNavLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/6'}`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="mt-3 pt-3 border-t border-white/8 flex flex-col gap-2">
              <Link to="/checkout" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center py-3">
                {cartCount > 0 ? `View Basket (${cartCount})` : 'Book a Repair'}
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

