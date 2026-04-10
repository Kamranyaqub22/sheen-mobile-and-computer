import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { BrandBadge, ProductArtwork, RepairTypeBadge } from '../components/CatalogArtwork'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

const bookingSteps = [
  'Choose category',
  'Choose brand and model',
  'Pick the repair',
  'Send your booking',
]

function getFirstBrand(category) {
  return category?.brands[0] ?? null
}

function getFirstModel(brand) {
  return brand?.models[0] ?? null
}

function getFirstRepair(model) {
  return model?.repairs[0] ?? null
}

export default function BookRepair() {
  const { catalog, createBooking, isLoadingCatalog } = useRepairCatalog()
  const [searchParams] = useSearchParams()
  const [submittedBooking, setSubmittedBooking] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [categorySlug, setCategorySlug] = useState(searchParams.get('category') || catalog[0]?.slug || '')
  const selectedCategory = catalog.find((category) => category.slug === categorySlug) || catalog[0] || null

  const [brandSlug, setBrandSlug] = useState(searchParams.get('brand') || getFirstBrand(selectedCategory)?.slug || '')
  const selectedBrand = selectedCategory?.brands.find((brand) => brand.slug === brandSlug) || getFirstBrand(selectedCategory)

  const [modelSlug, setModelSlug] = useState(searchParams.get('model') || getFirstModel(selectedBrand)?.slug || '')
  const selectedModel = selectedBrand?.models.find((model) => model.slug === modelSlug) || getFirstModel(selectedBrand)

  const [repairName, setRepairName] = useState(searchParams.get('repair') || getFirstRepair(selectedModel)?.name || '')
  const selectedRepair = selectedModel?.repairs.find((repair) => repair.name === repairName) || getFirstRepair(selectedModel)

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    preferredContact: 'Phone',
    preferredWindow: 'As soon as possible',
    message: '',
  })

  const canSubmit = Boolean(
    selectedCategory
      && selectedBrand
      && selectedModel
      && selectedRepair
      && form.customerName.trim()
      && form.phone.trim(),
  )

  if (isLoadingCatalog && !catalog.length) {
    return (
      <section className="section-pad pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="panel-card p-8 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">
              Loading repair catalogue
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">
              Preparing the booking form
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              The live repair catalogue is loading from the current data source.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (!catalog.length) {
    return (
      <section className="section-pad pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="panel-card p-8 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">
              Booking unavailable
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">
              No repair catalogue is available yet
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              Call the shop directly while the online catalogue is being finished.
            </p>
            <div className="mt-5 flex justify-center">
              <a href="tel:02088787266" className="btn-primary">
                Call 020 8878 7266
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const handleCategoryChange = (event) => {
    const nextCategory = catalog.find((category) => category.slug === event.target.value)
    const nextBrand = getFirstBrand(nextCategory)
    const nextModel = getFirstModel(nextBrand)
    const nextRepair = getFirstRepair(nextModel)

    setCategorySlug(event.target.value)
    setBrandSlug(nextBrand?.slug || '')
    setModelSlug(nextModel?.slug || '')
    setRepairName(nextRepair?.name || '')
  }

  const handleBrandChange = (event) => {
    const nextBrand = selectedCategory?.brands.find((brand) => brand.slug === event.target.value)
    const nextModel = getFirstModel(nextBrand)
    const nextRepair = getFirstRepair(nextModel)

    setBrandSlug(event.target.value)
    setModelSlug(nextModel?.slug || '')
    setRepairName(nextRepair?.name || '')
  }

  const handleModelChange = (event) => {
    const nextModel = selectedBrand?.models.find((model) => model.slug === event.target.value)
    const nextRepair = getFirstRepair(nextModel)

    setModelSlug(event.target.value)
    setRepairName(nextRepair?.name || '')
  }

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    setSubmitError('')
    setIsSubmitting(true)

    try {
      const booking = await createBooking({
        ...form,
        categoryId: selectedCategory.id,
        brandId: selectedBrand.id,
        modelId: selectedModel.id,
        repairId: selectedRepair.id,
        category: selectedCategory.name,
        brand: selectedBrand.name,
        model: selectedModel.name,
        repair: selectedRepair.name,
        estimatedPrice: selectedRepair.price,
        turnaround: selectedRepair.turnaround,
      })

      setSubmittedBooking(booking)
      setForm({
        customerName: '',
        phone: '',
        email: '',
        preferredContact: 'Phone',
        preferredWindow: 'As soon as possible',
        message: '',
      })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit the repair booking.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Book Repair Service | East Sheen Repair Shop</title>
        <meta
          name="description"
          content="Book a repair service online by choosing your device category, brand, model and repair type. Submit the repair request directly to the admin queue."
        />
      </Helmet>

      <section className="section-pad pt-16 md:pt-20 bg-[linear-gradient(135deg,_rgba(255,146,25,0.14),_rgba(255,248,240,1))]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 grid gap-8 lg:grid-cols-[1fr_0.92fr] items-start">
          <div>
            <span className="section-label">Book repair service</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-ink)]">
              Send the exact repair request before you visit the shop.
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]">
              Choose the device, brand, model, and repair type, then send the repair booking. The
              request appears in the admin queue so the shop can confirm price, timing, and part availability.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Exact device path', 'Category, brand, model, and repair are saved together.'],
                ['Faster quoting', 'The shop sees the fault type before the customer arrives.'],
                ['Built for admin', 'New brands and models can be added from the admin screen.'],
              ].map(([title, body]) => (
                <div key={title} className="panel-card p-5">
                  <h2 className="text-lg font-extrabold text-[var(--color-ink)]">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card p-6 md:p-7">
            {submittedBooking ? (
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-orange-deep)]">
                  Booking received
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-[var(--color-ink)]">Repair request saved</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  The booking for {submittedBooking.model} - {submittedBooking.repair} is now in the admin queue.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/admin" className="btn-secondary text-sm">View in Admin</Link>
                  <button type="button" className="btn-primary text-sm" onClick={() => setSubmittedBooking(null)}>
                    Book another repair
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">
                    Four-step booking flow
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {bookingSteps.map((step, index) => (
                      <div key={step} className="rounded-2xl border border-[var(--color-border)] bg-white px-3 py-3 text-sm font-semibold text-[var(--color-ink)]">
                        <span className="mr-2 text-[var(--color-orange-deep)]">0{index + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
                  <ProductArtwork category={selectedCategory} brand={selectedBrand} model={selectedModel} className="h-64" />
                  <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">Live device preview</div>
                    {selectedBrand ? <BrandBadge brand={selectedBrand} category={selectedCategory} className="mt-3" /> : null}
                    <h3 className="mt-4 text-2xl font-extrabold text-[var(--color-ink)]">{selectedModel?.name || 'Choose a model'}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                      {selectedModel?.summary || 'Pick the exact device path to preview the repair details before you submit.'}
                    </p>
                    {selectedRepair ? <RepairTypeBadge repair={selectedRepair} className="mt-4" /> : null}
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Estimated</div>
                        <div className="mt-2 text-lg font-bold text-[var(--color-ink)]">{selectedRepair ? money.format(selectedRepair.price) : 'Quote'}</div>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Turnaround</div>
                        <div className="mt-2 text-lg font-bold text-[var(--color-ink)]">{selectedRepair?.turnaround || 'Confirm'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="category">
                      Category
                    </label>
                    <select id="category" className="form-input mt-2" value={selectedCategory?.slug || ''} onChange={handleCategoryChange}>
                      {catalog.map((category) => (
                        <option key={category.id} value={category.slug}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="brand">
                      Brand
                    </label>
                    <select id="brand" className="form-input mt-2" value={selectedBrand?.slug || ''} onChange={handleBrandChange}>
                      {selectedCategory?.brands.map((brand) => (
                        <option key={brand.id} value={brand.slug}>{brand.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="model">
                      Model
                    </label>
                    <select id="model" className="form-input mt-2" value={selectedModel?.slug || ''} onChange={handleModelChange}>
                      {selectedBrand?.models.map((model) => (
                        <option key={model.id} value={model.slug}>{model.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="repair">
                      Repair type
                    </label>
                    <select
                      id="repair"
                      className="form-input mt-2"
                      value={selectedRepair?.name || ''}
                      onChange={(event) => setRepairName(event.target.value)}
                    >
                      {selectedModel?.repairs.map((repair) => (
                        <option key={repair.id} value={repair.name}>{repair.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="customerName">
                      Your name
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      className="form-input mt-2"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="phone">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input mt-2"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input mt-2"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="preferredContact">
                      Preferred contact method
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      className="form-input mt-2"
                      value={form.preferredContact}
                      onChange={handleChange}
                    >
                      {['Phone', 'WhatsApp', 'Email'].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="preferredWindow">
                    Preferred timing
                  </label>
                  <select
                    id="preferredWindow"
                    name="preferredWindow"
                    className="form-input mt-2"
                    value={form.preferredWindow}
                    onChange={handleChange}
                  >
                    {['As soon as possible', 'Today', 'Tomorrow', 'This week', 'Call me first'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="message">
                    Notes about the fault
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="form-input mt-2 resize-y"
                    placeholder="Tell us about cracks, charging issues, power faults, or anything already tried."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-primary w-full justify-center ${canSubmit && !isSubmitting ? '' : 'cursor-not-allowed opacity-60'}`}
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'Submitting booking...' : 'Submit repair booking'}
                </button>

                {submitError ? (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)]">
                    {submitError}
                  </div>
                ) : null}

                <p className="text-sm text-[var(--color-muted)]">
                  {canSubmit
                    ? 'Your request will be saved to the admin queue with the selected device and repair details.'
                    : 'Choose a device path and add your name and phone number to unlock booking.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel-card p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Selected service</div>
            <ProductArtwork category={selectedCategory} brand={selectedBrand} model={selectedModel} className="mt-4 h-64" />
            {selectedBrand ? <BrandBadge brand={selectedBrand} category={selectedCategory} className="mt-4" /> : null}
            <h2 className="mt-4 text-2xl font-extrabold text-[var(--color-ink)]">{selectedModel?.name || 'Choose a model'}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{selectedBrand?.name} - {selectedCategory?.name}</p>
            <div className="mt-6 rounded-2xl bg-[var(--color-surface)] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3">
                <span className="text-sm text-[var(--color-muted)]">Repair</span>
                {selectedRepair ? <RepairTypeBadge repair={selectedRepair} compact /> : <span className="text-sm font-semibold text-[var(--color-ink)]">Select service</span>}
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3">
                <span className="text-sm text-[var(--color-muted)]">Estimated price</span>
                <span className="text-sm font-semibold text-[var(--color-ink)]">
                  {selectedRepair ? money.format(selectedRepair.price) : 'Quote on request'}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 pb-1">
                <span className="text-sm text-[var(--color-muted)]">Turnaround</span>
                <span className="text-sm font-semibold text-[var(--color-ink)]">{selectedRepair?.turnaround || 'To be confirmed'}</span>
              </div>
            </div>
          </div>

          <div className="panel-card p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">What happens next</div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ['1', 'We review the request', 'The selected model and repair type land in the admin queue.'],
                ['2', 'We confirm timing', 'The shop can call or message to confirm part availability and final timing.'],
                ['3', 'You visit or drop off', 'Walk in with the device or arrange the next available booking slot.'],
              ].map(([step, title, body]) => (
                <div key={step} className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
                  <div className="text-sm font-extrabold tracking-[0.2em] text-[var(--color-orange-deep)]">{step}</div>
                  <h3 className="mt-2 text-lg font-extrabold text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}