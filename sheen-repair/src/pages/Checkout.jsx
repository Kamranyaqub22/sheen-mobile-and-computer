import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCart } from '../context/CartContext'
import { useRepairCatalog } from '../context/RepairCatalogContext'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export default function Checkout() {
  const { items, removeItem, clearCart, total } = useCart()
  const { createBooking } = useRepairCatalog()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    preferredContact: 'Phone',
    preferredWindow: 'As soon as possible',
    visitType: 'Walk in',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = items.length > 0 && form.customerName.trim() && form.phone.trim() && !isSubmitting

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Submit one booking per basket item
      for (const item of items) {
        await createBooking({
          categoryId: item.categoryId,
          brandId: item.brandId,
          modelId: item.modelId,
          repairId: item.repairId,
          category: item.categoryName,
          brand: item.brandName,
          model: item.modelName,
          repair: item.repairName,
          estimatedPrice: item.price,
          turnaround: item.turnaround,
          customerName: form.customerName,
          phone: form.phone,
          email: form.email,
          preferredContact: form.preferredContact,
          preferredWindow: form.visitType === 'Book appointment' ? form.preferredWindow : form.visitType,
          message: form.message,
        })
      }
      clearCart()
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="section-pad pt-16 md:pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <svg className="text-green-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-[var(--color-text)]">Booking received!</h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            We've received your repair request and will contact you shortly to confirm pricing and timing. You can also call us on 020 8878 7266 for an immediate update.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/repairs" className="btn-primary">Browse more repairs</Link>
            <Link to="/" className="btn-secondary">Back to home</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>Basket & Checkout | Sheen Repair</title>
        <meta name="description" content="Review your selected repairs and submit your booking request to our East Sheen repair shop." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl uppercase">Your Basket</h1>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Review your selected repairs, then fill in your details to send the booking to our shop.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">

          {items.length === 0 ? (
            <div className="panel-card p-10 text-center max-w-xl mx-auto">
              <p className="text-[var(--color-muted)] mb-6">Your basket is empty. Browse repairs to add services.</p>
              <Link to="/repairs" className="btn-primary">Browse Repairs</Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">

              {/* Left — Basket items */}
              <div>
                <h2 className="text-xl font-extrabold text-[var(--color-text)] mb-4">
                  {items.length} repair{items.length !== 1 ? 's' : ''} selected
                </h2>

                <div className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] overflow-hidden bg-white">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-[var(--color-text)] truncate">{item.repairName}</div>
                        <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                          {item.brandName} {item.modelName} · {item.categoryName}
                        </div>
                        {item.turnaround && (
                          <div className="mt-1 text-xs text-[var(--color-muted)]">Turnaround: {item.turnaround}</div>
                        )}
                        {item.warranty && (
                          <div className="mt-0.5 text-xs text-[var(--color-muted)]">Warranty: {item.warranty}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-bold text-[var(--color-text)]">
                          {item.price ? money.format(item.price) : 'POA'}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.cartId)}
                          className="text-[var(--color-muted)] hover:text-red-600 transition-colors"
                          aria-label={`Remove ${item.repairName} from basket`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-5 py-4">
                  <span className="text-sm font-semibold text-[var(--color-muted)]">Estimated total</span>
                  <span className="text-xl font-black text-[var(--color-text)]">{money.format(total)}</span>
                </div>

                <p className="mt-3 text-xs text-[var(--color-muted)] leading-relaxed">
                  Final price confirmed after a free diagnostic. We'll contact you before starting any work.
                </p>

                <div className="mt-6">
                  <Link to="/repairs" className="btn-secondary text-sm">+ Add more repairs</Link>
                </div>
              </div>

              {/* Right — Contact form */}
              <div className="panel-card p-6 md:p-7">
                <h2 className="text-xl font-extrabold text-[var(--color-text)] mb-1">Your details</h2>
                <p className="text-sm text-[var(--color-muted)] mb-6">We'll use these to confirm your booking.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="customerName">
                      Full name <span className="text-[var(--color-red)]">*</span>
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      autoComplete="name"
                      className="form-input"
                      placeholder="Your name"
                      value={form.customerName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="phone">
                      Phone number <span className="text-[var(--color-red)]">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="form-input"
                      placeholder="07700 000000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="email">
                      Email address <span className="text-xs font-normal text-[var(--color-muted)]">(optional)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="visitType">
                      How would you like to visit?
                    </label>
                    <select id="visitType" name="visitType" className="form-input" value={form.visitType} onChange={handleChange}>
                      <option value="Walk in">Walk in — no appointment needed</option>
                      <option value="Book appointment">Book an appointment</option>
                    </select>
                  </div>

                  {form.visitType === 'Book appointment' && (
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="preferredWindow">
                        Preferred time
                      </label>
                      <select id="preferredWindow" name="preferredWindow" className="form-input" value={form.preferredWindow} onChange={handleChange}>
                        <option>As soon as possible</option>
                        <option>This week</option>
                        <option>Morning (9am – 12pm)</option>
                        <option>Afternoon (12pm – 5pm)</option>
                        <option>Weekend</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="preferredContact">
                      Preferred contact method
                    </label>
                    <select id="preferredContact" name="preferredContact" className="form-input" value={form.preferredContact} onChange={handleChange}>
                      <option value="Phone">Phone call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5" htmlFor="message">
                      Additional notes <span className="text-xs font-normal text-[var(--color-muted)]">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="form-input resize-none"
                      placeholder="Any extra info about the fault, urgency, etc."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {submitError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending booking…' : `Send booking request${items.length > 1 ? ` (${items.length} repairs)` : ''}`}
                  </button>

                  <p className="text-xs text-center text-[var(--color-muted)]">
                    We'll confirm your booking by {form.preferredContact.toLowerCase()} within the hour during shop hours.
                  </p>
                </form>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  )
}
