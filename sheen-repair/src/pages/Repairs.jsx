import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { BrandBadge, CategoryArtwork } from '../components/CatalogArtwork'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

function getCounts(category) {
  const brandCount = category.brands.length
  const modelCount = category.brands.reduce((total, brand) => total + brand.models.length, 0)
  const repairCount = category.brands.reduce(
    (total, brand) => total + brand.models.reduce((modelTotal, model) => modelTotal + model.repairs.length, 0),
    0,
  )

  return { brandCount, modelCount, repairCount }
}

function getLowestPrice(category) {
  const prices = category.brands.flatMap((brand) =>
    brand.models.flatMap((model) => model.repairs.map((repair) => repair.price).filter(Boolean)),
  )

  if (!prices.length) {
    return 'Quote on request'
  }

  return `From ${money.format(Math.min(...prices))}`
}

function getLowestModelPrice(model) {
  const prices = model.repairs.map((repair) => repair.price).filter(Boolean)

  if (!prices.length) {
    return 'Quote on request'
  }

  return `From ${money.format(Math.min(...prices))}`
}

function buildSearchResults(catalog, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  const results = []

  for (const category of catalog) {
    if (
      category.name.toLowerCase().includes(normalizedQuery)
      || category.summary.toLowerCase().includes(normalizedQuery)
      || category.heroTitle.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: `category-${category.id}`,
        kind: 'Category',
        title: category.name,
        meta: `${category.brands.length} brands · ${getLowestPrice(category)}`,
        path: `/repairs/${category.slug}`,
        action: 'Browse',
      })
    }

    for (const brand of category.brands) {
      if (
        brand.name.toLowerCase().includes(normalizedQuery)
        || brand.summary.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `brand-${brand.id}`,
          kind: 'Brand',
          title: brand.name,
          meta: `${category.name} · ${brand.models.length} models`,
          path: `/repairs/${category.slug}/${brand.slug}`,
          action: 'Open brand',
        })
      }

      for (const model of brand.models) {
        if (
          model.name.toLowerCase().includes(normalizedQuery)
          || model.summary.toLowerCase().includes(normalizedQuery)
        ) {
          results.push({
            id: `model-${model.id}`,
            kind: 'Model',
            title: model.name,
            meta: `${brand.name} · ${category.name} · ${getLowestModelPrice(model)}`,
            path: `/repairs/${category.slug}/${brand.slug}/${model.slug}`,
            action: 'View repairs',
          })
        }

        for (const repair of model.repairs) {
          if (
            repair.name.toLowerCase().includes(normalizedQuery)
            || repair.notes.toLowerCase().includes(normalizedQuery)
          ) {
            results.push({
              id: `repair-${repair.id}`,
              kind: 'Repair',
              title: repair.name,
              meta: `${brand.name} ${model.name} · ${money.format(repair.price)} · ${repair.turnaround}`,
              path: `/book-repair?category=${category.slug}&brand=${brand.slug}&model=${model.slug}&repair=${encodeURIComponent(repair.name)}`,
              action: 'Book now',
            })
          }
        }
      }
    }
  }

  return results.slice(0, 8)
}

export default function Repairs() {
  const { catalog, isLoadingCatalog } = useRepairCatalog()
  const [searchQuery, setSearchQuery] = useState('')
  const searchResults = buildSearchResults(catalog, searchQuery)
  const totalBrands = catalog.reduce((total, category) => total + category.brands.length, 0)
  const totalModels = catalog.reduce(
    (total, category) => total + category.brands.reduce((brandTotal, brand) => brandTotal + brand.models.length, 0),
    0,
  )
  const totalRepairs = catalog.reduce(
    (total, category) => total + category.brands.reduce(
      (brandTotal, brand) => brandTotal + brand.models.reduce((modelTotal, model) => modelTotal + model.repairs.length, 0),
      0,
    ),
    0,
  )

  return (
    <>
      <Helmet>
        <title>Repairs | Browse Brands, Models and Repair Services</title>
        <meta
          name="description"
          content="Browse repair services by category, brand, model and repair type. Book phone, tablet, laptop and console repairs online for our East Sheen shop."
        />
        <link rel="canonical" href="https://sheenrepair.co.uk/repairs" />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] items-start">
            <div>
              <span className="section-label text-[var(--color-orange-soft)]">Structured repair journey</span>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Pick the device category, then the brand, model, and exact repair.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/74 md:text-lg">
                This flow gives you cleaner pricing, faster quoting, and a professional booking journey.
                It also creates the right foundation for an admin area where new brands, models, and repair
                services can be added without touching code.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book-repair" className="btn-primary px-6 py-3 text-base">
                  Book Repair Service
                </Link>
                <a href="tel:02088787266" className="btn-outline-white px-6 py-3 text-base">
                  Call 020 8878 7266
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/78">
                <span className="stat-pill border-white/12 bg-white/6 text-white/88">{catalog.length} categories</span>
                <span className="stat-pill border-white/12 bg-white/6 text-white/88">{totalBrands} brands</span>
                <span className="stat-pill border-white/12 bg-white/6 text-white/88">{totalModels} models</span>
                <span className="stat-pill border-white/12 bg-white/6 text-white/88">{totalRepairs} repairs</span>
              </div>

              <div className="panel-dark mt-8 max-w-2xl p-5 md:p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange-soft)]">
                  Global repair search
                </div>
                <label className="mt-3 block text-sm font-semibold text-white" htmlFor="repair-global-search">
                  Search any brand, model, or repair
                </label>
                <input
                  id="repair-global-search"
                  type="search"
                  className="form-input form-input-light mt-3"
                  placeholder="e.g. iPhone 14 battery, MacBook Air screen, PS5 HDMI"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />

                {searchQuery.trim() ? (
                  <div className="mt-4 space-y-3">
                    {searchResults.length ? (
                      searchResults.map((result) => (
                        <Link
                          key={result.id}
                          to={result.path}
                          className="block rounded-2xl border border-white/10 bg-white/6 px-4 py-3 transition-colors hover:bg-white/10"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-orange-soft)]">
                                {result.kind}
                              </div>
                              <div className="mt-1 truncate text-sm font-semibold text-white">{result.title}</div>
                              <div className="mt-1 text-xs leading-relaxed text-white/62">{result.meta}</div>
                            </div>
                            <span className="pt-1 text-xs font-semibold text-white/74">{result.action}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/68">
                        No matching brands, models, or repairs found yet. Try a wider search term.
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-white/62">
                    Search straight into the catalog instead of browsing manually when you already know the device or repair.
                  </p>
                )}
              </div>
            </div>

            <div className="panel-dark p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange-soft)]">
                    Start by category
                  </div>
                  <h2 className="mt-2 text-2xl font-extrabold text-white">Browse the repair catalog</h2>
                </div>
                <span className="stat-pill border-white/12 bg-white/6 text-white/88">Live pricing paths</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {isLoadingCatalog && !catalog.length ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/72 sm:col-span-2">
                    Loading live repair categories...
                  </div>
                ) : catalog.map((category) => {
                  const counts = getCounts(category)
                  const featuredBrands = category.brands.slice(0, 4)

                  return (
                    <Link
                      key={category.id}
                      to={`/repairs/${category.slug}`}
                      className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 transition-transform duration-200 hover:-translate-y-1 hover:bg-white/8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-orange-soft)]">
                            {category.name}
                          </div>
                          <div className="mt-3 text-2xl font-extrabold text-white">
                            {counts.modelCount} models
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-white/65">{category.summary}</p>
                        </div>
                        <CategoryArtwork category={category} className="h-28 w-28 shrink-0" />
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/72">
                        <span className="stat-pill">{counts.brandCount} brands</span>
                        <span className="stat-pill">{counts.repairCount} repairs</span>
                        <span className="stat-pill stat-pill-accent">{getLowestPrice(category)}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {featuredBrands.map((brand) => (
                          <BrandBadge key={brand.id} brand={brand} category={category} compact />
                        ))}
                        {category.brands.length > featuredBrands.length ? (
                          <span className="stat-pill text-xs text-white/72">+{category.brands.length - featuredBrands.length} more</span>
                        ) : null}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-label">Repair categories</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--color-ink)]">
                Category pages ready for admin-managed content
              </h2>
            </div>
            <Link to="/book-repair" className="btn-secondary self-start text-sm">
              Start Booking
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {catalog.map((category) => {
              const firstBrands = category.brands.slice(0, 5)

              return (
                <div key={category.id} className="panel-card h-full p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">
                        {category.accent}
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold text-[var(--color-ink)]">{category.name}</h3>
                    </div>
                    <span className="stat-pill stat-pill-accent">{getLowestPrice(category)}</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
                    {category.heroBody}
                  </p>
                  <div className="mt-6 space-y-4">
                    {firstBrands.map((brand) => (
                      <div key={brand.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <BrandBadge brand={brand} category={category} compact className="max-w-full" />
                            <p className="mt-3 text-sm text-[var(--color-muted)]">{brand.summary}</p>
                          </div>
                          <Link to={`/repairs/${category.slug}/${brand.slug}`} className="text-sm font-semibold text-[var(--color-orange-deep)]">
                            View models
                          </Link>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {brand.models.slice(0, 4).map((model) => (
                            <Link
                              key={model.id}
                              to={`/repairs/${category.slug}/${brand.slug}/${model.slug}`}
                              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-orange)] hover:text-[var(--color-orange-deep)]"
                            >
                              {model.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    {category.brands.length > firstBrands.length ? (
                      <div className="text-sm font-semibold text-[var(--color-orange-deep)]">
                        +{category.brands.length - firstBrands.length} more brands live on the category page
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4 grid gap-5 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Choose the exact device',
              body: 'Start with the device category, then open the correct brand and model so pricing stays accurate.',
            },
            {
              step: '02',
              title: 'Pick the repair type',
              body: 'Every model can have its own screen, battery, charging, diagnostic, or board-level service list.',
            },
            {
              step: '03',
              title: 'Book the repair service',
              body: 'The booking form carries the selected device and repair details straight into the admin queue.',
            },
          ].map((item) => (
            <div key={item.step} className="panel-card p-6">
              <div className="text-sm font-extrabold tracking-[0.24em] text-[var(--color-orange-deep)]">{item.step}</div>
              <h3 className="mt-4 text-xl font-extrabold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}