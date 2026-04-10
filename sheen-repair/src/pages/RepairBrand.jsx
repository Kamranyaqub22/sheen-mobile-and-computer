import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

function getStartingPrice(model) {
  const prices = model.repairs.map((repair) => repair.price).filter(Boolean)
  if (!prices.length) return 'Quote on request'
  return `From ${money.format(Math.min(...prices))}`
}

export default function RepairBrand() {
  const { categorySlug, brandSlug } = useParams()
  const { catalog } = useRepairCatalog()

  const category = catalog.find((item) => item.slug === categorySlug)
  const brand = category?.brands.find((item) => item.slug === brandSlug)

  if (!category || !brand) {
    return <Navigate to="/repairs" replace />
  }

  return (
    <>
      <Helmet>
        <title>{brand.name} {category.name} Repairs | Choose Your Model</title>
        <meta
          name="description"
          content={`Choose your ${brand.name} model to see exact repair prices and book your ${category.name.toLowerCase()} repair in East Sheen.`}
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
              <Link to={`/repairs/${category.slug}`} className="hover:text-white transition-colors">{category.name}</Link>
              <span>/</span>
              <span className="text-white/80">{brand.name}</span>
            </div>
            <span className="section-label text-[var(--color-orange-soft)]">Step 2 of 3</span>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white md:text-6xl uppercase">
              {brand.name} Models
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
              Select your exact model to see available repairs and prices.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="stat-pill border-white/12 bg-white/6 text-white/80">{brand.models.length} models available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Model list */}
      <section className="section-pad">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-8">
            Select your model
          </p>

          {brand.models.length === 0 ? (
            <div className="panel-card p-8 text-center text-[var(--color-muted)]">
              No models listed yet — call us on 020 8878 7266 and we'll check availability.
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] overflow-hidden bg-white">
              {brand.models.map((model) => (
                <Link
                  key={model.id}
                  to={`/repairs/${category.slug}/${brand.slug}/${model.slug}`}
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-[var(--color-bg-alt)]"
                >
                  <div className="min-w-0">
                    <div className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-red)] transition-colors">
                      {model.name}
                    </div>
                    {model.turnaround ? (
                      <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                        Turnaround: {model.turnaround} · {model.repairs.length} repair type{model.repairs.length !== 1 ? 's' : ''}
                      </div>
                    ) : (
                      <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                        {model.repairs.length} repair type{model.repairs.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-semibold text-[var(--color-text)]">{getStartingPrice(model)}</span>
                    <svg className="text-[var(--color-muted)] group-hover:text-[var(--color-red)] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Don't see your model?</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">We repair many models not listed — call us for a quick quote.</p>
            </div>
            <a href="tel:02088787266" className="btn-primary text-sm py-2 px-4 shrink-0">Call 020 8878 7266</a>
          </div>
        </div>
      </section>
    </>
  )
}

