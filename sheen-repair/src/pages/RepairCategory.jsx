import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

function getBrandStartingPrice(brand) {
  const prices = brand.models.flatMap((m) => m.repairs.map((r) => r.price)).filter(Boolean)
  if (!prices.length) return 'Quote on request'
  return `From ${money.format(Math.min(...prices))}`
}

function BrandInitial({ name }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-black text-[var(--color-dark)] shadow-sm border border-[var(--color-border)]">
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

export default function RepairCategory() {
  const { categorySlug } = useParams()
  const { catalog } = useRepairCatalog()

  const category = catalog.find((item) => item.slug === categorySlug)

  if (!category) {
    return <Navigate to="/repairs" replace />
  }

  return (
    <>
      <Helmet>
        <title>{category.name} Repairs | Choose Your Brand</title>
        <meta
          name="description"
          content={`Choose your ${category.name.toLowerCase()} brand for repair. We stock parts for all major brands at our East Sheen shop.`}
        />
      </Helmet>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/55 mb-6">
              <Link to="/repairs" className="hover:text-white transition-colors">Repairs</Link>
              <span>/</span>
              <span className="text-white/80">{category.name}</span>
            </div>
            <span className="section-label text-[var(--color-orange-soft)]">Step 1 of 3</span>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white md:text-6xl uppercase">
              {category.heroTitle || `${category.name} Repairs`}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
              {category.heroBody || category.summary || `Select your brand to see available models and repair prices.`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="stat-pill border-white/12 bg-white/6 text-white/80">{category.brands.length} brands available</span>
              <span className="stat-pill border-white/12 bg-white/6 text-white/80">
                {category.brands.reduce((n, b) => n + b.models.length, 0)} models
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand grid */}
      <section className="section-pad">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-8">
            Select your brand
          </p>

          {category.brands.length === 0 ? (
            <div className="panel-card p-8 text-center text-[var(--color-muted)]">
              No brands listed yet — check back soon or call us on 020 8878 7266.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.brands.map((brand) => {
                const modelCount = brand.models.length
                const startingPrice = getBrandStartingPrice(brand)
                return (
                  <Link
                    key={brand.id}
                    to={`/repairs/${category.slug}/${brand.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5 transition-all duration-200 hover:border-[var(--color-red)] hover:shadow-md hover:-translate-y-0.5"
                  >
                    <BrandInitial name={brand.name} />
                    <div className="min-w-0 flex-1">
                      <div className="text-base font-extrabold text-[var(--color-text)] group-hover:text-[var(--color-red)] transition-colors truncate">
                        {brand.name}
                      </div>
                      <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                        {modelCount} model{modelCount !== 1 ? 's' : ''} · {startingPrice}
                      </div>
                    </div>
                    <svg className="shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-red)] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Link>
                )
              })}
            </div>
          )}

          <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Can't find your brand?</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Call us or use the contact form — we repair many unlisted devices too.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href="tel:02088787266" className="btn-primary text-sm py-2 px-4">Call us</a>
              <Link to="/contact" className="btn-secondary text-sm py-2 px-4">Contact form</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}