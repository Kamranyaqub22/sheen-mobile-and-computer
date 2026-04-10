import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { BrandBadge, CategoryArtwork, ProductArtwork, RepairTypeBadge } from '../components/CatalogArtwork'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

function getLowestModelPrice(model) {
  const prices = model.repairs.map((repair) => repair.price).filter(Boolean)

  if (!prices.length) {
    return 'Quote on request'
  }

  return `From ${money.format(Math.min(...prices))}`
}

export default function RepairCategory() {
  const { categorySlug } = useParams()
  const { catalog, isLoadingCatalog } = useRepairCatalog()
  const [searchTerm, setSearchTerm] = useState('')

  const category = catalog.find((item) => item.slug === categorySlug)
  const totalModels = category?.brands.reduce((count, brand) => count + brand.models.length, 0) || 0

  if (isLoadingCatalog && !catalog.length) {
    return (
      <section className="section-pad pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="panel-card p-8 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">Loading category</div>
            <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">Fetching repair brands and models</h1>
          </div>
        </div>
      </section>
    )
  }

  if (!category) {
    return <Navigate to="/repairs" replace />
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredBrands = category.brands
    .map((brand) => {
      const matchingModels = normalizedSearch
        ? brand.models.filter((model) => model.name.toLowerCase().includes(normalizedSearch))
        : brand.models

      const brandMatches = brand.name.toLowerCase().includes(normalizedSearch)

      if (normalizedSearch && !brandMatches && !matchingModels.length) {
        return null
      }

      return {
        ...brand,
        models: brandMatches && normalizedSearch ? brand.models : matchingModels,
      }
    })
    .filter(Boolean)

  return (
    <>
      <Helmet>
        <title>{category.name} Repairs | Browse Brands and Models</title>
        <meta
          name="description"
          content={`Browse ${category.name.toLowerCase()} repairs by brand and model. Compare repair types, pricing, and turnaround information before booking.`}
        />
      </Helmet>

      <section className="section-pad pt-16 md:pt-20 bg-[linear-gradient(135deg,_rgba(239,122,26,0.12),_rgba(255,247,238,0.92))]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-sm text-[var(--color-clay)]">
            <Link to="/repairs" className="hover:text-[var(--color-orange-deep)]">Repairs</Link>
            <span className="mx-2">/</span>
            <span>{category.name}</span>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-end">
            <div>
              <span className="section-label">{category.accent}</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-ink)]">
                {category.heroTitle}
              </h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]">
                {category.heroBody}
              </p>
            </div>

            <div className="panel-card p-5 md:p-6">
              <CategoryArtwork category={category} className="h-52" />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Brands</div>
                  <div className="mt-2 text-3xl font-extrabold text-[var(--color-ink)]">{category.brands.length}</div>
                </div>
                <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Models</div>
                  <div className="mt-2 text-3xl font-extrabold text-[var(--color-ink)]">{totalModels}</div>
                </div>
              </div>
              <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="repair-search">
                Search model names
              </label>
              <input
                id="repair-search"
                type="text"
                className="form-input mt-3"
                placeholder={`Search ${category.name.toLowerCase()} models`}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                Admin can keep adding new brands and models, and this page updates automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 space-y-6">
          {filteredBrands.map((brand) => (
            <div key={brand.id} className="panel-card p-6 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">
                    Brand section
                  </div>
                  <BrandBadge brand={brand} category={category} className="mt-3" />
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">{brand.summary}</p>
                </div>
                <Link to={`/repairs/${category.slug}/${brand.slug}`} className="btn-secondary text-sm self-start">
                  View all {brand.name} models
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {brand.models.map((model) => (
                  <Link
                    key={model.id}
                    to={`/repairs/${category.slug}/${brand.slug}/${model.slug}`}
                    className="rounded-3xl border border-[var(--color-border)] bg-white p-5 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <ProductArtwork category={category} brand={brand} model={model} className="h-52" />
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="mt-5 text-lg font-extrabold text-[var(--color-ink)]">{model.name}</h3>
                      <span className="stat-pill stat-pill-accent">{getLowestModelPrice(model)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{model.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {model.repairs.slice(0, 3).map((repair) => (
                        <RepairTypeBadge key={repair.id} repair={repair} compact />
                      ))}
                    </div>
                    <div className="mt-5 text-sm font-semibold text-[var(--color-orange-deep)]">Browse repair options</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {!filteredBrands.length && (
            <div className="panel-card p-6 text-sm text-[var(--color-muted)]">
              No brands or models match that search yet. You can add them from the admin section.
            </div>
          )}
        </div>
      </section>
    </>
  )
}