import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { BrandBadge, ProductArtwork, RepairTypeBadge } from '../components/CatalogArtwork'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

function getStartingPrice(model) {
  const prices = model.repairs.map((repair) => repair.price).filter(Boolean)

  if (!prices.length) {
    return 'Quote on request'
  }

  return `From ${money.format(Math.min(...prices))}`
}

export default function RepairBrand() {
  const { categorySlug, brandSlug } = useParams()
  const { catalog, isLoadingCatalog } = useRepairCatalog()
  const [searchTerm, setSearchTerm] = useState('')

  const category = catalog.find((item) => item.slug === categorySlug)
  const brand = category?.brands.find((item) => item.slug === brandSlug)

  if (isLoadingCatalog && !catalog.length) {
    return (
      <section className="section-pad pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="panel-card p-8 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">Loading brand page</div>
            <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">Fetching repair models</h1>
          </div>
        </div>
      </section>
    )
  }

  if (!category || !brand) {
    return <Navigate to="/repairs" replace />
  }

  const filteredModels = brand.models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  return (
    <>
      <Helmet>
        <title>{brand.name} {category.name} Repairs | Choose a Model</title>
        <meta
          name="description"
          content={`Browse ${brand.name} ${category.name.toLowerCase()} repair models and choose the right repair service for booking.`}
        />
      </Helmet>

      <section className="section-pad pt-16 md:pt-20 bg-[linear-gradient(135deg,_rgba(255,139,0,0.16),_rgba(255,250,245,0.96))]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-sm text-[var(--color-clay)]">
            <Link to="/repairs" className="hover:text-[var(--color-orange-deep)]">Repairs</Link>
            <span className="mx-2">/</span>
            <Link to={`/repairs/${category.slug}`} className="hover:text-[var(--color-orange-deep)]">{category.name}</Link>
            <span className="mx-2">/</span>
            <span>{brand.name}</span>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <span className="section-label">Brand page</span>
              <BrandBadge brand={brand} category={category} className="mb-4" />
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-ink)]">
                {brand.name} {category.name.toLowerCase()} models and repair options
              </h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]">
                {brand.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/book-repair" className="btn-primary text-sm">Book a Repair</Link>
                <a href="tel:02088787266" className="btn-secondary text-sm">Call for same-day availability</a>
              </div>
            </div>

            <div className="panel-card p-6">
              <ProductArtwork category={category} brand={brand} model={brand.models[0]} className="h-56" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Models</div>
                  <div className="mt-2 text-3xl font-extrabold text-[var(--color-ink)]">{brand.models.length}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Repair types</div>
                  <div className="mt-2 text-3xl font-extrabold text-[var(--color-ink)]">
                    {brand.models.reduce((total, model) => total + model.repairs.length, 0)}
                  </div>
                </div>
              </div>
              <label className="mt-6 block text-sm font-semibold text-[var(--color-ink)]" htmlFor="model-search">
                Filter models
              </label>
              <input
                id="model-search"
                type="text"
                className="form-input mt-3"
                placeholder={`Search ${brand.name} models`}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredModels.map((model) => (
            <Link
              key={model.id}
              to={`/repairs/${category.slug}/${brand.slug}/${model.slug}`}
              className="panel-card p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <ProductArtwork category={category} brand={brand} model={model} className="h-56" />
              <div className="flex items-start justify-between gap-3">
                <h2 className="mt-5 text-xl font-extrabold text-[var(--color-ink)]">{model.name}</h2>
                <span className="stat-pill stat-pill-accent">{getStartingPrice(model)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{model.summary}</p>
              <div className="mt-5 rounded-2xl bg-[var(--color-surface)] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">
                  Popular services
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {model.repairs.slice(0, 4).map((repair) => (
                    <RepairTypeBadge key={repair.id} repair={repair} compact />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted)]">{model.turnaround}</span>
                <span className="font-semibold text-[var(--color-orange-deep)]">Choose repair</span>
              </div>
            </Link>
          ))}

          {!filteredModels.length && (
            <div className="panel-card p-6 text-sm text-[var(--color-muted)]">
              No models match that search yet. Add new models in the admin section and they will appear here.
            </div>
          )}
        </div>
      </section>
    </>
  )
}