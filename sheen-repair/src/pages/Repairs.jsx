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

export default function Repairs() {
  const { catalog, isLoadingCatalog } = useRepairCatalog()

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

      <section className="relative overflow-hidden section-pad pt-16 md:pt-24 bg-[radial-gradient(circle_at_top_left,_rgba(255,171,67,0.18),_transparent_35%),linear-gradient(135deg,_#1c1612_0%,_#2b2018_50%,_#100d0b_100%)]">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <span className="section-label text-[var(--color-orange-soft)]">Structured repair journey</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl">
              Pick the device category, then the brand, model, and exact repair.
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-white/74">
              This flow gives you cleaner pricing, faster quoting, and a professional booking journey.
              It also creates the right foundation for an admin area where new brands, models, and repair
              services can be added without touching code.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book-repair" className="btn-primary text-base px-6 py-3">
                Book Repair Service
              </Link>
              <a href="tel:02088787266" className="btn-outline-white text-base px-6 py-3">
                Call 020 8878 7266
              </a>
            </div>
          </div>

          <div className="panel-dark p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
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
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-transform duration-200 hover:-translate-y-1 hover:bg-white/8"
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
                <div key={category.id} className="panel-card p-6 md:p-7">
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