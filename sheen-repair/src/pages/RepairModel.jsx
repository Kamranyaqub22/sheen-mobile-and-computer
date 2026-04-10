import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { useCart } from '../context/CartContext'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export default function RepairModel() {
  const { categorySlug, brandSlug, modelSlug } = useParams()
  const { catalog } = useRepairCatalog()
  const { items: cartItems, addItem, total: cartTotal } = useCart()
  const [addedIds, setAddedIds] = useState(new Set())

  const category = catalog.find((item) => item.slug === categorySlug)
  const brand = category?.brands.find((item) => item.slug === brandSlug)
  const model = brand?.models.find((item) => item.slug === modelSlug)

  if (!category || !brand || !model) {
    return <Navigate to="/repairs" replace />
  }

  function handleAddToBasket(repair) {
    addItem({
      categoryId: category.id,
      categorySlug: category.slug,
      categoryName: category.name,
      brandId: brand.id,
      brandSlug: brand.slug,
      brandName: brand.name,
      modelId: model.id,
      modelSlug: model.slug,
      modelName: model.name,
      repairId: repair.id,
      repairName: repair.name,
      price: repair.price,
      turnaround: repair.turnaround,
      warranty: repair.warranty,
      notes: repair.notes,
    })
    setAddedIds((prev) => new Set([...prev, repair.id]))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(repair.id)
        return next
      })
    }, 2000)
  }

  return (
    <>
      <Helmet>
        <title>{model.name} Repair Services | {brand.name} {category.name}</title>
        <meta
          name="description"
          content={`${model.name} repair services — screen, battery, charging port and more. Book or add to basket for our East Sheen shop.`}
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
              <Link to={`/repairs/${category.slug}/${brand.slug}`} className="hover:text-white transition-colors">{brand.name}</Link>
              <span>/</span>
              <span className="text-white/80">{model.name}</span>
            </div>
            <span className="section-label text-[var(--color-orange-soft)]">Step 3 of 3 — select your repair</span>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white md:text-6xl uppercase">
              {model.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
              {model.summary || `Choose a repair service below and add it to your basket.`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="stat-pill border-white/12 bg-white/6 text-white/80">{model.repairs.length} repair{model.repairs.length !== 1 ? 's' : ''} available</span>
              {model.turnaround && (
                <span className="stat-pill border-white/12 bg-white/6 text-white/80">Turnaround: {model.turnaround}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Repair cards */}
      <section className="section-pad">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {model.repairs.length === 0 ? (
            <div className="panel-card p-8 text-center text-[var(--color-muted)]">
              No repairs listed yet. Call us on 020 8878 7266 for a quote.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {model.repairs.map((repair) => {
                const isAdded = addedIds.has(repair.id)
                return (
                  <div key={repair.id} className="flex flex-col rounded-xl border border-[var(--color-border)] bg-white p-6">
                    {/* Repair name + price */}
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-extrabold text-[var(--color-text)] leading-snug">{repair.name}</h2>
                      <span className="shrink-0 rounded bg-[rgba(230,51,18,0.1)] px-3 py-1 text-sm font-bold text-[var(--color-red)]">
                        {repair.price ? money.format(repair.price) : 'POA'}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="mt-4 space-y-2 text-sm border-t border-[var(--color-border)] pt-4">
                      {repair.turnaround && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[var(--color-muted)]">Turnaround</span>
                          <span className="font-semibold text-[var(--color-text)]">{repair.turnaround}</span>
                        </div>
                      )}
                      {repair.warranty && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[var(--color-muted)]">Warranty</span>
                          <span className="font-semibold text-[var(--color-text)]">{repair.warranty}</span>
                        </div>
                      )}
                    </div>

                    {repair.notes && (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{repair.notes}</p>
                    )}

                    {/* Add to basket button */}
                    <button
                      type="button"
                      onClick={() => handleAddToBasket(repair)}
                      className={`mt-auto pt-5 w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-all duration-200 ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-[var(--color-red)] text-white hover:bg-[var(--color-red-dark)]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                          Added to basket
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                          </svg>
                          Add to Basket
                        </>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Help row */}
          <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Not sure which repair you need?</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Walk in for a free diagnostic or call us — we'll identify the fault for you.</p>
            </div>
            <a href="tel:02088787266" className="btn-secondary text-sm py-2 px-4 shrink-0">Call for advice</a>
          </div>
        </div>
      </section>

      {/* Sticky basket bar (shows when cart has items) */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-50 sm:bottom-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-auto">
          <div className="flex items-center justify-between gap-6 bg-[#111111] sm:rounded-xl px-5 py-4 shadow-xl border-t border-white/10 sm:border sm:border-white/12">
            <div className="text-white">
              <span className="text-sm font-semibold">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in basket</span>
              <span className="mx-2 text-white/40">·</span>
              <span className="text-sm font-bold text-[var(--color-red)]">{money.format(cartTotal)}</span>
            </div>
            <Link to="/checkout" className="btn-primary text-sm py-2 px-5">
              View Basket →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}