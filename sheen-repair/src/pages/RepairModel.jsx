import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { BrandBadge, ProductArtwork, RepairTypeBadge } from '../components/CatalogArtwork'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export default function RepairModel() {
  const { categorySlug, brandSlug, modelSlug } = useParams()
  const { catalog, isLoadingCatalog } = useRepairCatalog()

  const category = catalog.find((item) => item.slug === categorySlug)
  const brand = category?.brands.find((item) => item.slug === brandSlug)
  const model = brand?.models.find((item) => item.slug === modelSlug)

  if (isLoadingCatalog && !catalog.length) {
    return (
      <section className="section-pad pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="panel-card p-8 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">Loading repair services</div>
            <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">Fetching model details</h1>
          </div>
        </div>
      </section>
    )
  }

  if (!category || !brand || !model) {
    return <Navigate to="/repairs" replace />
  }

  return (
    <>
      <Helmet>
        <title>{model.name} Repair Services | {brand.name} {category.name}</title>
        <meta
          name="description"
          content={`Browse ${model.name} repair services including pricing, turnaround times, and booking options.`}
        />
      </Helmet>

      <section className="section-pad pt-16 md:pt-20 bg-[radial-gradient(circle_at_top_left,_rgba(255,154,33,0.14),_transparent_35%),linear-gradient(180deg,_#fff8f1_0%,_#fffdfb_100%)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-sm text-[var(--color-clay)]">
            <Link to="/repairs" className="hover:text-[var(--color-orange-deep)]">Repairs</Link>
            <span className="mx-2">/</span>
            <Link to={`/repairs/${category.slug}`} className="hover:text-[var(--color-orange-deep)]">{category.name}</Link>
            <span className="mx-2">/</span>
            <Link to={`/repairs/${category.slug}/${brand.slug}`} className="hover:text-[var(--color-orange-deep)]">{brand.name}</Link>
            <span className="mx-2">/</span>
            <span>{model.name}</span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <span className="section-label">Model page</span>
              <BrandBadge brand={brand} category={category} className="mb-4" />
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-ink)]">
                {model.name} repair services
              </h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]">
                {model.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/book-repair?category=${category.slug}&brand=${brand.slug}&model=${model.slug}`}
                  className="btn-primary text-sm"
                >
                  Book Repair Service
                </Link>
                <a href="tel:02088787266" className="btn-secondary text-sm">Call for same-day repair</a>
              </div>
            </div>

            <div className="space-y-4">
              <ProductArtwork category={category} brand={brand} model={model} className="h-72" />
              <div className="panel-card p-6">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Brand</div>
                    <div className="mt-2 text-lg font-bold text-[var(--color-ink)]">{brand.name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Category</div>
                    <div className="mt-2 text-lg font-bold text-[var(--color-ink)]">{category.name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Repairs listed</div>
                    <div className="mt-2 text-lg font-bold text-[var(--color-ink)]">{model.repairs.length}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Turnaround</div>
                    <div className="mt-2 text-lg font-bold text-[var(--color-ink)]">{model.turnaround}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {model.repairs.map((repair) => (
            <div key={repair.id} className="panel-card p-6 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <RepairTypeBadge repair={repair} showLabel={false} className="shrink-0" />
                  <h2 className="text-xl font-extrabold text-[var(--color-ink)]">{repair.name}</h2>
                </div>
                <span className="price-pill">{money.format(repair.price)}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{repair.notes}</p>
              <div className="mt-5 space-y-3 text-sm text-[var(--color-ink)]">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3">
                  <span className="text-[var(--color-muted)]">Turnaround</span>
                  <span className="font-semibold">{repair.turnaround}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3">
                  <span className="text-[var(--color-muted)]">Warranty</span>
                  <span className="font-semibold text-right">{repair.warranty}</span>
                </div>
              </div>
              <Link
                to={`/book-repair?category=${category.slug}&brand=${brand.slug}&model=${model.slug}&repair=${encodeURIComponent(repair.name)}`}
                className="btn-primary mt-6 justify-center"
              >
                Book {repair.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}