import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRepairCatalog } from '../context/RepairCatalogContext'
import { processImageFile } from '../utils/mediaLibrary'

const emptyCategoryForm = {
  name: '',
  slug: '',
  summary: '',
  heroTitle: '',
  heroBody: '',
  accent: '',
}

const emptyBrandForm = {
  name: '',
  slug: '',
  summary: '',
}

const emptyModelForm = {
  name: '',
  slug: '',
  summary: '',
  turnaround: '',
}

const emptyRepairForm = {
  name: '',
  price: '',
  turnaround: '',
  warranty: '',
  notes: '',
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New request', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'contacted', label: 'Contacted customer', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { value: 'booked', label: 'Booked in', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { value: 'completed', label: 'Repair complete ✓', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-500 border-gray-200' },
]

function statusStyle(status) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.color || 'bg-gray-100 text-gray-500 border-gray-200'
}

function statusLabel(status) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.label || status
}

function RepairRowEditor({ repair, onSave, onDelete }) {
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    onSave({
      name: String(formData.get('name') || ''),
      price: String(formData.get('price') || ''),
      turnaround: String(formData.get('turnaround') || ''),
      warranty: String(formData.get('warranty') || ''),
      notes: String(formData.get('notes') || ''),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Service name</label>
          <input name="name" className="form-input" defaultValue={repair.name} placeholder="e.g. Screen replacement" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Price (£)</label>
          <input name="price" className="form-input" type="number" min="0" step="1" defaultValue={repair.price} placeholder="e.g. 89" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">How long it takes</label>
          <input name="turnaround" className="form-input" defaultValue={repair.turnaround} placeholder="e.g. Same day, 1–2 hours" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Warranty offered</label>
          <input name="warranty" className="form-input" defaultValue={repair.warranty} placeholder="e.g. 90 days" />
        </div>
      </div>
      <div className="mt-3">
        <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Notes <span className="font-normal text-[var(--color-muted)]">(optional)</span></label>
        <textarea name="notes" className="form-input resize-y" rows={2} defaultValue={repair.notes} placeholder="Any extra info customers should know" />
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary text-sm">Save changes</button>
        <button type="button" className="text-xs font-semibold text-red-500 hover:text-red-700" onClick={onDelete}>
          Remove this service
        </button>
      </div>
    </form>
  )
}

function MediaEditorCard({
  title,
  description,
  mediaKey,
  altKey,
  imageUrl,
  imageAlt,
  onSave,
  onClear,
  emptyLabel,
  uploadLabel,
  hint,
  uploadOptions,
  previewClassName,
}) {
  const [urlValue, setUrlValue] = useState(imageUrl || '')
  const [altValue, setAltValue] = useState(imageAlt || '')
  const [isBusy, setIsBusy] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setUrlValue(imageUrl || '')
    setAltValue(imageAlt || '')
    setFeedback('')
  }, [imageAlt, imageUrl, title])

  const handleSaveUrl = async () => {
    setIsBusy(true)
    setFeedback('')

    try {
      await onSave({
        [mediaKey]: urlValue.trim(),
        [altKey]: altValue.trim(),
      })
      setFeedback('Saved.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Could not save media.')
    } finally {
      setIsBusy(false)
    }
  }

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setIsBusy(true)
    setFeedback('')

    try {
      const processedUrl = await processImageFile(file, uploadOptions)

      await onSave({
        [mediaKey]: processedUrl,
        [altKey]: altValue.trim() || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
      })
      setFeedback('Uploaded.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Could not process the selected image.')
    } finally {
      setIsBusy(false)
      event.target.value = ''
    }
  }

  const handleClear = async () => {
    setIsBusy(true)
    setFeedback('')

    try {
      await onClear()
      setUrlValue('')
      setAltValue('')
      setFeedback('Removed.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Could not remove media.')
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="rounded-[26px] border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_36px_rgba(37,23,8,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-[var(--color-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
        </div>
        <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-clay)]">
          {uploadLabel}
        </span>
      </div>

      <div className={`mt-4 overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)] ${previewClassName}`}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt || title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full min-h-[12rem] items-center justify-center px-6 text-center text-sm font-medium text-[var(--color-muted)]">
            {emptyLabel}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink)]">Paste image URL</label>
          <input
            className="form-input mt-2"
            value={urlValue}
            onChange={(event) => setUrlValue(event.target.value)}
            placeholder="https://example.com/image.webp"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink)]">Alt text</label>
          <input
            className="form-input mt-2"
            value={altValue}
            onChange={(event) => setAltValue(event.target.value)}
            placeholder="Describe the uploaded image"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="btn-secondary text-sm" onClick={handleSaveUrl} disabled={isBusy || !urlValue.trim()}>
          Save URL
        </button>
        <label className={`btn-primary cursor-pointer text-sm ${isBusy ? 'opacity-70' : ''}`}>
          Upload file
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isBusy} />
        </label>
        <button type="button" className="btn-secondary text-sm" onClick={handleClear} disabled={isBusy || (!imageUrl && !urlValue.trim())}>
          Remove
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">{hint}</p>
      {feedback ? <div className="mt-3 text-sm font-medium text-[var(--color-ink)]">{feedback}</div> : null}
    </div>
  )
}

export default function Admin() {
  const {
    authReady,
    catalog,
    bookings,
    addCategory,
    updateCategory,
    deleteCategory,
    addBrand,
    updateBrand,
    deleteBrand,
    addModel,
    updateModel,
    deleteModel,
    addRepair,
    updateRepair,
    deleteRepair,
    updateBookingStatus,
    deleteBooking,
    importSeedCatalog,
    isAdmin,
    isLoadingBookings,
    isLoadingCatalog,
    isRemote,
    isSeedFallback,
    requestAdminMagicLink,
    resetCatalog,
    clearBookings,
    clearBrandMedia,
    clearCategoryMedia,
    clearModelMedia,
    session,
    saveBrandMedia,
    saveCategoryMedia,
    saveModelMedia,
    signOutAdmin,
    syncError,
  } = useRepairCatalog()

  const [adminEmail, setAdminEmail] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false)
  const [isImportingSeed, setIsImportingSeed] = useState(false)

  const [selectedCategoryId, setSelectedCategoryId] = useState(catalog[0]?.id || '')
  const selectedCategory = catalog.find((category) => category.id === selectedCategoryId) || catalog[0] || null

  const [selectedBrandId, setSelectedBrandId] = useState(selectedCategory?.brands[0]?.id || '')
  const selectedBrand = selectedCategory?.brands.find((brand) => brand.id === selectedBrandId) || selectedCategory?.brands[0] || null

  const [selectedModelId, setSelectedModelId] = useState(selectedBrand?.models[0]?.id || '')
  const selectedModel = selectedBrand?.models.find((model) => model.id === selectedModelId) || selectedBrand?.models[0] || null

  const [newCategoryForm, setNewCategoryForm] = useState(emptyCategoryForm)
  const [newBrandForm, setNewBrandForm] = useState(emptyBrandForm)
  const [newModelForm, setNewModelForm] = useState(emptyModelForm)
  const [newRepairForm, setNewRepairForm] = useState(emptyRepairForm)
  const [activeTab, setActiveTab] = useState('bookings')

  const totalBrands = catalog.reduce((count, category) => count + category.brands.length, 0)
  const totalModels = catalog.reduce(
    (count, category) => count + category.brands.reduce((brandCount, brand) => brandCount + brand.models.length, 0),
    0,
  )
  const totalRepairs = catalog.reduce(
    (count, category) => count + category.brands.reduce(
      (bc, brand) => bc + brand.models.reduce((mc, model) => mc + model.repairs.length, 0), 0
    ), 0
  )
  const newBookingsCount = bookings.filter((b) => b.status === 'new').length

  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      return
    }

    if (window.confirm(`Are you sure you want to delete "${selectedCategory.name}"? This will permanently remove all brands, models and repair services inside it.`)) {
      await deleteCategory(selectedCategory.id)
    }
  }

  const handleDeleteBrand = async () => {
    if (!selectedCategory || !selectedBrand) {
      return
    }

    if (window.confirm(`Are you sure you want to delete "${selectedBrand.name}"? All models and repair services inside it will also be removed.`)) {
      await deleteBrand(selectedCategory.id, selectedBrand.id)
    }
  }

  const handleDeleteModel = async () => {
    if (!selectedCategory || !selectedBrand || !selectedModel) {
      return
    }

    if (window.confirm(`Are you sure you want to delete "${selectedModel.name}"? All repair services listed for this model will also be removed.`)) {
      await deleteModel(selectedCategory.id, selectedBrand.id, selectedModel.id)
    }
  }

  const handleCategorySave = async (event) => {
    event.preventDefault()

    if (!selectedCategory) {
      return
    }

    const formData = new FormData(event.currentTarget)

    await updateCategory(selectedCategory.id, {
      name: String(formData.get('name') || ''),
      slug: String(formData.get('slug') || ''),
      summary: String(formData.get('summary') || ''),
      heroTitle: String(formData.get('heroTitle') || ''),
      heroBody: String(formData.get('heroBody') || ''),
      accent: String(formData.get('accent') || ''),
    })
  }

  const handleBrandSave = async (event) => {
    event.preventDefault()

    if (!selectedCategory || !selectedBrand) {
      return
    }

    const formData = new FormData(event.currentTarget)

    await updateBrand(selectedCategory.id, selectedBrand.id, {
      name: String(formData.get('name') || ''),
      slug: String(formData.get('slug') || ''),
      summary: String(formData.get('summary') || ''),
    })
  }

  const handleModelSave = async (event) => {
    event.preventDefault()

    if (!selectedCategory || !selectedBrand || !selectedModel) {
      return
    }

    const formData = new FormData(event.currentTarget)

    await updateModel(selectedCategory.id, selectedBrand.id, selectedModel.id, {
      name: String(formData.get('name') || ''),
      slug: String(formData.get('slug') || ''),
      summary: String(formData.get('summary') || ''),
      turnaround: String(formData.get('turnaround') || ''),
    })
  }

  const handleMagicLink = async (event) => {
    event.preventDefault()

    setAuthMessage('')
    setIsSendingMagicLink(true)

    try {
      const sent = await requestAdminMagicLink(adminEmail)

      if (sent) {
        setAuthMessage('Sign-in link sent! Check your inbox and click the link to access the dashboard.')
      }
    } finally {
      setIsSendingMagicLink(false)
    }
  }

  const handleImportSeed = async () => {
    setAuthMessage('')
    setIsImportingSeed(true)

    try {
      const imported = await importSeedCatalog()

      if (imported) {
        setAuthMessage('Starter catalogue loaded. Your repair pages are now live with data — you can edit everything from here.')
      }
    } finally {
      setIsImportingSeed(false)
    }
  }

  const isLocked = isRemote && (!session || !isAdmin)
  const shouldImportSeed = isRemote && isAdmin && isSeedFallback

  const TABS = [
    { id: 'bookings', label: 'Bookings', badge: newBookingsCount > 0 ? newBookingsCount : null },
    { id: 'catalogue', label: 'Repair Catalogue' },
    { id: 'photos', label: 'Photos & Logos' },
    { id: 'settings', label: 'Settings' },
  ]

  if (isRemote && (!authReady || (isLoadingCatalog && !catalog.length && !syncError))) {
    return (
      <>
        <Helmet><title>Admin | Loading…</title></Helmet>
        <section className="section-pad pt-16 md:pt-20">
          <div className="max-w-md mx-auto px-4">
            <div className="panel-card p-8 text-center">
              <div className="text-4xl mb-4">⏳</div>
              <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Loading your dashboard…</h1>
              <p className="mt-3 text-sm text-[var(--color-muted)]">Connecting and checking your sign-in status.</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin | Sheen Repair Dashboard</title>
        <meta name="description" content="Admin dashboard for managing repair services, bookings, and photos." />
      </Helmet>

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="bg-[linear-gradient(135deg,_rgba(255,124,0,0.12),_rgba(255,246,236,1))] border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">
              {isRemote ? 'Live site admin' : 'Local preview mode'}
            </div>
            <h1 className="mt-1 text-xl font-black text-[var(--color-ink)]">Sheen Repair — Admin Dashboard</h1>
            {isRemote && isAdmin && session && (
              <p className="text-xs text-[var(--color-muted)]">Signed in as {session.user.email}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {[
                ['Repair types', totalRepairs],
                ['Models', totalModels],
                ['Brands', totalBrands],
                ['Categories', catalog.length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white border border-[var(--color-border)] px-3 py-2 text-center">
                  <div className="text-lg font-extrabold text-[var(--color-ink)]">{value}</div>
                  <div className="text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--color-muted)]">{label}</div>
                </div>
              ))}
            </div>
            {isRemote && isAdmin && (
              <button type="button" className="btn-secondary text-sm" onClick={signOutAdmin}>Sign out</button>
            )}
          </div>
        </div>
      </div>

      {/* ── Sync error banner ────────────────────────────────────── */}
      {syncError ? (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3 text-sm text-red-700">
          <strong>Connection issue:</strong> {syncError}
        </div>
      ) : null}

      {/* ── Sign-in gate ─────────────────────────────────────────── */}
      {isLocked ? (
        <section className="section-pad">
          <div className="max-w-md mx-auto px-4">
            <div className="panel-card p-8">
              <div className="text-center mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-surface)] text-2xl mb-4">🔐</div>
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Admin sign-in</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Enter your admin email. We'll send a one-click sign-in link — no password needed.
                </p>
              </div>
              {session ? (
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center">
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{session.user.email}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">This email is not on the admin allow-list.</p>
                  <button type="button" className="btn-secondary mt-4 text-sm" onClick={signOutAdmin}>Sign out and try another</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleMagicLink}>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="admin-email">Your admin email address</label>
                    <input
                      id="admin-email"
                      type="email"
                      className="form-input mt-2"
                      placeholder="you@example.com"
                      value={adminEmail}
                      onChange={(event) => setAdminEmail(event.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full" disabled={isSendingMagicLink}>
                    {isSendingMagicLink ? 'Sending sign-in link…' : 'Send me a sign-in link'}
                  </button>
                </form>
              )}
              {authMessage ? (
                <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)]">{authMessage}</div>
              ) : null}
            </div>
          </div>
        </section>

      ) : shouldImportSeed ? (
        <section className="section-pad">
          <div className="max-w-lg mx-auto px-4">
            <div className="panel-card p-8">
              <div className="text-center mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-surface)] text-2xl mb-4">📦</div>
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Database connected — no data yet</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  Click below to load the starter repair catalogue. Everything can be edited from the dashboard straight afterwards.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-primary text-sm" disabled={isImportingSeed} onClick={handleImportSeed}>
                  {isImportingSeed ? 'Loading starter catalogue…' : 'Load starter catalogue'}
                </button>
                <button type="button" className="btn-secondary text-sm" onClick={signOutAdmin}>Sign out</button>
              </div>
              {authMessage ? (
                <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)]">{authMessage}</div>
              ) : null}
            </div>
          </div>
        </section>

      ) : (
        <>
          {/* ── Tab bar ──────────────────────────────────────────── */}
          <div className="sticky top-0 z-20 bg-white border-b border-[var(--color-border)] shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex gap-1 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-[var(--color-brand)] text-[var(--color-brand)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {tab.label}
                    {tab.badge ? (
                      <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--color-brand)] px-1.5 text-[0.65rem] font-bold text-white">
                        {tab.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              BOOKINGS TAB
          ══════════════════════════════════════════════════════════ */}
          {activeTab === 'bookings' && (
            <section className="section-pad">
              <div className="max-w-4xl mx-auto px-4 space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Customer Bookings</h2>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    Repair requests submitted through your website appear here. Use the status dropdown on each booking to track its progress.
                  </p>
                </div>

                {/* Status guide */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">Booking status guide</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <span key={s.value} className={`rounded-full border px-3 py-1 text-xs font-semibold ${s.color}`}>{s.label}</span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-muted)]">Change the status on any booking using the dropdown to keep track of where things are.</p>
                </div>

                {isLoadingBookings ? (
                  <div className="panel-card p-6 text-center text-sm text-[var(--color-muted)]">Loading bookings…</div>
                ) : bookings.length ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="panel-card p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-xs text-[var(--color-muted)]">
                              {new Date(booking.submittedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                            </div>
                            <div className="mt-1 text-xl font-extrabold text-[var(--color-ink)]">{booking.customerName}</div>
                            <div className="text-sm text-[var(--color-muted)]">
                              {booking.category} → {booking.brand} {booking.model}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(booking.status)}`}>
                              {statusLabel(booking.status)}
                            </span>
                            <select
                              className="form-input text-xs py-1"
                              value={booking.status}
                              onChange={(event) => updateBookingStatus(booking.id, event.target.value)}
                              aria-label="Change booking status"
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-1 rounded-2xl bg-[var(--color-surface)] p-4 sm:grid-cols-2 text-sm">
                          <div className="flex justify-between gap-2 py-1.5 border-b border-[var(--color-border)] sm:col-span-2">
                            <span className="text-[var(--color-muted)]">Repair needed</span>
                            <span className="font-semibold text-[var(--color-ink)]">{booking.repair}</span>
                          </div>
                          {booking.estimatedPrice > 0 && (
                            <div className="flex justify-between gap-2 py-1.5 border-b border-[var(--color-border)]">
                              <span className="text-[var(--color-muted)]">Quoted price</span>
                              <span className="font-semibold text-[var(--color-ink)]">£{booking.estimatedPrice}</span>
                            </div>
                          )}
                          <div className="flex justify-between gap-2 py-1.5 border-b border-[var(--color-border)]">
                            <span className="text-[var(--color-muted)]">Phone</span>
                            <a href={`tel:${booking.phone}`} className="font-semibold text-[var(--color-brand)]">{booking.phone}</a>
                          </div>
                          {booking.email && (
                            <div className="flex justify-between gap-2 py-1.5 border-b border-[var(--color-border)]">
                              <span className="text-[var(--color-muted)]">Email</span>
                              <a href={`mailto:${booking.email}`} className="font-semibold text-[var(--color-brand)] truncate max-w-[14rem]">{booking.email}</a>
                            </div>
                          )}
                          <div className="flex justify-between gap-2 py-1.5 border-b border-[var(--color-border)]">
                            <span className="text-[var(--color-muted)]">Best time</span>
                            <span className="font-semibold text-[var(--color-ink)]">{booking.preferredWindow}</span>
                          </div>
                          <div className="flex justify-between gap-2 py-1.5">
                            <span className="text-[var(--color-muted)]">Contact via</span>
                            <span className="font-semibold text-[var(--color-ink)]">{booking.preferredContact}</span>
                          </div>
                        </div>

                        {booking.message ? (
                          <div className="mt-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-1">Customer message</p>
                            <p className="text-sm text-[var(--color-ink)]">{booking.message}</p>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          className="mt-4 text-xs font-semibold text-red-400 hover:text-red-600"
                          onClick={() => {
                            if (window.confirm(`Delete the booking from ${booking.customerName}? This cannot be undone.`)) {
                              deleteBooking(booking.id)
                            }
                          }}
                        >
                          Delete this booking
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="panel-card p-10 text-center">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-lg font-extrabold text-[var(--color-ink)]">No bookings yet</p>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      When customers fill in the booking form on your site, their requests will appear here.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════════
              REPAIR CATALOGUE TAB
          ══════════════════════════════════════════════════════════ */}
          {activeTab === 'catalogue' && (
            <section className="section-pad">
              <div className="max-w-6xl mx-auto px-4 space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Repair Catalogue</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    Manage everything customers can browse and book on your website. Choose a category → brand → model, then add or edit the repair services and prices for that model.
                  </p>
                </div>

                {/* How it works */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">How the catalogue is organised</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {[
                      ['📱', 'Category', 'e.g. Phones'],
                      ['🏷️', 'Brand', 'e.g. Apple'],
                      ['📦', 'Model', 'e.g. iPhone 15'],
                      ['🔧', 'Repair service', 'e.g. Screen — £89'],
                    ].map(([icon, title, sub], i, arr) => (
                      <span key={title} className="flex items-center gap-2">
                        <span className="rounded-xl bg-white border border-[var(--color-border)] px-3 py-2 text-sm font-semibold text-[var(--color-ink)]">
                          {icon} {title}<br />
                          <span className="font-normal text-[0.7rem] text-[var(--color-muted)]">{sub}</span>
                        </span>
                        {i < arr.length - 1 && <span className="text-[var(--color-muted)]">→</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step 1 — Category */}
                <div className="panel-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white">1</span>
                    <div>
                      <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Choose a category</h3>
                      <p className="text-xs text-[var(--color-muted)]">Top-level sections — e.g. Phones, Laptops, Game Consoles</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {catalog.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategoryId(category.id)
                          setSelectedBrandId(category.brands[0]?.id || '')
                          setSelectedModelId(category.brands[0]?.models[0]?.id || '')
                        }}
                        className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                          selectedCategory?.id === category.id
                            ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white'
                            : 'border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-brand)]'
                        }`}
                      >
                        {category.name}
                        <span className="ml-1.5 text-xs opacity-70">{category.brands.length} brand{category.brands.length !== 1 ? 's' : ''}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Steps 2 + 3 — Brand & Model */}
                {selectedCategory && (
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="panel-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white">2</span>
                        <div>
                          <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Choose a brand</h3>
                          <p className="text-xs text-[var(--color-muted)]">Brands within {selectedCategory.name}</p>
                        </div>
                      </div>
                      {selectedCategory.brands.length ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedCategory.brands.map((brand) => (
                            <button
                              key={brand.id}
                              type="button"
                              onClick={() => {
                                setSelectedBrandId(brand.id)
                                setSelectedModelId(brand.models[0]?.id || '')
                              }}
                              className={`rounded-xl border px-3 py-1.5 text-sm font-semibold transition-colors ${
                                selectedBrand?.id === brand.id
                                  ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white'
                                  : 'border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-brand)]'
                              }`}
                            >
                              {brand.name}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--color-muted)]">No brands yet. Add one below.</p>
                      )}
                    </div>

                    <div className="panel-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white">3</span>
                        <div>
                          <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Choose a model</h3>
                          <p className="text-xs text-[var(--color-muted)]">
                            {selectedBrand ? `Models for ${selectedBrand.name}` : 'Select a brand first'}
                          </p>
                        </div>
                      </div>
                      {selectedBrand?.models.length ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedBrand.models.map((model) => (
                            <button
                              key={model.id}
                              type="button"
                              onClick={() => setSelectedModelId(model.id)}
                              className={`rounded-xl border px-3 py-1.5 text-sm font-semibold transition-colors ${
                                selectedModel?.id === model.id
                                  ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white'
                                  : 'border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-brand)]'
                              }`}
                            >
                              {model.name}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--color-muted)]">
                          {selectedBrand ? 'No models yet. Add one below.' : 'Select a brand first.'}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4 — Repair services for selected model */}
                {selectedModel && (
                  <>
                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted)]">
                      <span>Viewing repairs for:</span>
                      <span className="font-semibold text-[var(--color-ink)]">{selectedCategory?.name}</span>
                      <span>→</span>
                      <span className="font-semibold text-[var(--color-ink)]">{selectedBrand?.name}</span>
                      <span>→</span>
                      <span className="font-semibold text-[var(--color-brand)]">{selectedModel.name}</span>
                      <Link
                        to={`/repairs/${selectedCategory.slug}/${selectedBrand.slug}/${selectedModel.slug}`}
                        className="ml-auto text-xs font-semibold text-[var(--color-brand)] underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View public page →
                      </Link>
                    </div>

                    <div className="panel-card p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white">4</span>
                        <div>
                          <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Repair services for {selectedModel.name}</h3>
                          <p className="text-xs text-[var(--color-muted)]">These are the services customers see and can book for this model</p>
                        </div>
                      </div>

                      {/* Add new repair form */}
                      <div className="mt-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 mb-5">
                        <p className="text-sm font-semibold text-[var(--color-ink)] mb-3">➕ Add a new repair service</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Service name <span className="text-red-500">*</span></label>
                            <input
                              className="form-input"
                              placeholder="e.g. Screen replacement"
                              value={newRepairForm.name}
                              onChange={(event) => setNewRepairForm((form) => ({ ...form, name: event.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Price (£) <span className="text-red-500">*</span></label>
                            <input
                              className="form-input"
                              type="number"
                              min="0"
                              step="1"
                              placeholder="e.g. 89"
                              value={newRepairForm.price}
                              onChange={(event) => setNewRepairForm((form) => ({ ...form, price: event.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">How long it takes</label>
                            <input
                              className="form-input"
                              placeholder="e.g. Same day, 1–2 hours"
                              value={newRepairForm.turnaround}
                              onChange={(event) => setNewRepairForm((form) => ({ ...form, turnaround: event.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Warranty</label>
                            <input
                              className="form-input"
                              placeholder="e.g. 90 days"
                              value={newRepairForm.warranty}
                              onChange={(event) => setNewRepairForm((form) => ({ ...form, warranty: event.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Notes <span className="font-normal text-[var(--color-muted)]">(optional)</span></label>
                          <textarea
                            className="form-input resize-y"
                            rows={2}
                            placeholder="Any extra information for customers"
                            value={newRepairForm.notes}
                            onChange={(event) => setNewRepairForm((form) => ({ ...form, notes: event.target.value }))}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn-primary mt-3 text-sm"
                          onClick={async () => {
                            if (!selectedCategory || !selectedBrand || !selectedModel || !newRepairForm.name.trim()) return
                            const added = await addRepair(selectedCategory.id, selectedBrand.id, selectedModel.id, newRepairForm)
                            if (added) setNewRepairForm(emptyRepairForm)
                          }}
                        >
                          Add repair service
                        </button>
                      </div>

                      {/* Existing repairs */}
                      {selectedModel.repairs.length ? (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                            {selectedModel.repairs.length} existing service{selectedModel.repairs.length !== 1 ? 's' : ''}
                          </p>
                          {selectedModel.repairs.map((repair) => (
                            <RepairRowEditor
                              key={`${repair.id}-${repair.name}-${repair.price}-${repair.turnaround}-${repair.warranty}-${repair.notes}`}
                              repair={repair}
                              onSave={(form) => updateRepair(selectedCategory.id, selectedBrand.id, selectedModel.id, repair.id, form)}
                              onDelete={() => {
                                if (window.confirm(`Remove "${repair.name}" from ${selectedModel.name}? This cannot be undone.`)) {
                                  deleteRepair(selectedCategory.id, selectedBrand.id, selectedModel.id, repair.id)
                                }
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-muted)]">
                          No repair services added yet for this model. Use the form above to add the first one.
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── Add / Edit forms row ─────────────────────────── */}
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Category form */}
                  <div className="panel-card p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Add a category</h3>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">Top-level repair type, e.g. "Phones", "Laptops"</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Category name</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Phones"
                        value={newCategoryForm.name}
                        onChange={(event) => setNewCategoryForm((form) => ({ ...form, name: event.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Short description</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Screen, battery and charging port repairs"
                        value={newCategoryForm.summary}
                        onChange={(event) => setNewCategoryForm((form) => ({ ...form, summary: event.target.value }))}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-primary text-sm w-full"
                      onClick={async () => {
                        if (!newCategoryForm.name.trim()) return
                        const added = await addCategory(newCategoryForm)
                        if (added) setNewCategoryForm(emptyCategoryForm)
                      }}
                    >
                      Add category
                    </button>

                    {selectedCategory && (
                      <div className="border-t border-[var(--color-border)] pt-4">
                        <p className="text-xs font-semibold text-[var(--color-muted)] mb-3">
                          Editing: <strong className="text-[var(--color-ink)]">{selectedCategory.name}</strong>
                        </p>
                        <form key={selectedCategory.id} onSubmit={handleCategorySave} className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Name</label>
                            <input name="name" className="form-input" defaultValue={selectedCategory.name} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Short description</label>
                            <input name="summary" className="form-input" defaultValue={selectedCategory.summary} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Page heading</label>
                            <input name="heroTitle" className="form-input" defaultValue={selectedCategory.heroTitle} placeholder="Shown at top of the category page" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Page intro text</label>
                            <textarea name="heroBody" className="form-input resize-y" rows={3} defaultValue={selectedCategory.heroBody} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">
                              Category tag <span className="font-normal text-[var(--color-muted)]">(short label on cards)</span>
                            </label>
                            <input name="accent" className="form-input" defaultValue={selectedCategory.accent} placeholder="e.g. Walk-in · Same day" />
                          </div>
                          <input name="slug" type="hidden" defaultValue={selectedCategory.slug} />
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button type="submit" className="btn-primary text-sm">Save changes</button>
                            <button type="button" className="text-xs font-semibold text-red-500 hover:text-red-700" onClick={handleDeleteCategory}>
                              Delete category
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Brand form */}
                  <div className="panel-card p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Add a brand</h3>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">
                        {selectedCategory ? `Adding under: ${selectedCategory.name}` : 'Select a category first'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Brand name</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Apple, Samsung"
                        value={newBrandForm.name}
                        onChange={(event) => setNewBrandForm((form) => ({ ...form, name: event.target.value }))}
                        disabled={!selectedCategory}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Short description</label>
                      <input
                        className="form-input"
                        placeholder="e.g. iPhones, iPads and MacBooks"
                        value={newBrandForm.summary}
                        onChange={(event) => setNewBrandForm((form) => ({ ...form, summary: event.target.value }))}
                        disabled={!selectedCategory}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-primary text-sm w-full"
                      disabled={!selectedCategory}
                      onClick={async () => {
                        if (!selectedCategory || !newBrandForm.name.trim()) return
                        const added = await addBrand(selectedCategory.id, newBrandForm)
                        if (added) setNewBrandForm(emptyBrandForm)
                      }}
                    >
                      Add brand
                    </button>

                    {selectedCategory && selectedBrand && (
                      <div className="border-t border-[var(--color-border)] pt-4">
                        <p className="text-xs font-semibold text-[var(--color-muted)] mb-3">
                          Editing: <strong className="text-[var(--color-ink)]">{selectedBrand.name}</strong>
                        </p>
                        <form key={selectedBrand.id} onSubmit={handleBrandSave} className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Brand name</label>
                            <input name="name" className="form-input" defaultValue={selectedBrand.name} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Short description</label>
                            <input name="summary" className="form-input" defaultValue={selectedBrand.summary} />
                          </div>
                          <input name="slug" type="hidden" defaultValue={selectedBrand.slug} />
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button type="submit" className="btn-primary text-sm">Save changes</button>
                            <button type="button" className="text-xs font-semibold text-red-500 hover:text-red-700" onClick={handleDeleteBrand}>
                              Delete brand
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Model form */}
                  <div className="panel-card p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Add a model</h3>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">
                        {selectedBrand ? `Adding under: ${selectedBrand.name}` : 'Select a brand first'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Model name</label>
                      <input
                        className="form-input"
                        placeholder="e.g. iPhone 15 Pro"
                        value={newModelForm.name}
                        onChange={(event) => setNewModelForm((form) => ({ ...form, name: event.target.value }))}
                        disabled={!selectedBrand}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Short description</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Pro titanium frame with A17 chip"
                        value={newModelForm.summary}
                        onChange={(event) => setNewModelForm((form) => ({ ...form, summary: event.target.value }))}
                        disabled={!selectedBrand}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Typical repair time</label>
                      <input
                        className="form-input"
                        placeholder="e.g. 30–60 minutes"
                        value={newModelForm.turnaround}
                        onChange={(event) => setNewModelForm((form) => ({ ...form, turnaround: event.target.value }))}
                        disabled={!selectedBrand}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-primary text-sm w-full"
                      disabled={!selectedBrand}
                      onClick={async () => {
                        if (!selectedCategory || !selectedBrand || !newModelForm.name.trim()) return
                        const added = await addModel(selectedCategory.id, selectedBrand.id, newModelForm)
                        if (added) setNewModelForm(emptyModelForm)
                      }}
                    >
                      Add model
                    </button>

                    {selectedCategory && selectedBrand && selectedModel && (
                      <div className="border-t border-[var(--color-border)] pt-4">
                        <p className="text-xs font-semibold text-[var(--color-muted)] mb-3">
                          Editing: <strong className="text-[var(--color-ink)]">{selectedModel.name}</strong>
                        </p>
                        <form key={selectedModel.id} onSubmit={handleModelSave} className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Model name</label>
                            <input name="name" className="form-input" defaultValue={selectedModel.name} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Short description</label>
                            <input name="summary" className="form-input" defaultValue={selectedModel.summary} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink)] mb-1">Typical repair time</label>
                            <input name="turnaround" className="form-input" defaultValue={selectedModel.turnaround} />
                          </div>
                          <input name="slug" type="hidden" defaultValue={selectedModel.slug} />
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button type="submit" className="btn-primary text-sm">Save changes</button>
                            <button type="button" className="text-xs font-semibold text-red-500 hover:text-red-700" onClick={handleDeleteModel}>
                              Delete model
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════════
              PHOTOS & LOGOS TAB
          ══════════════════════════════════════════════════════════ */}
          {activeTab === 'photos' && (
            <section className="section-pad">
              <div className="max-w-3xl mx-auto px-4 space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Photos & Logos</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    Upload real photos and brand logos so your repair pages look professional. First go to the <strong>Repair Catalogue</strong> tab and select a category, brand, and model — then come back here to upload their images.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
                  <p className="font-semibold text-[var(--color-ink)] mb-1">Currently selected</p>
                  <p className="text-[var(--color-muted)]">
                    {selectedCategory ? (
                      <>
                        <span className="font-semibold text-[var(--color-ink)]">{selectedCategory.name}</span>
                        {selectedBrand && <> → <span className="font-semibold text-[var(--color-ink)]">{selectedBrand.name}</span></>}
                        {selectedModel && <> → <span className="font-semibold text-[var(--color-ink)]">{selectedModel.name}</span></>}
                      </>
                    ) : (
                      <>Nothing selected yet — go to the <button type="button" className="text-[var(--color-brand)] underline font-semibold" onClick={() => setActiveTab('catalogue')}>Repair Catalogue</button> tab first.</>
                    )}
                  </p>
                </div>

                <div className="space-y-5">
                  {selectedCategory ? (
                    <MediaEditorCard
                      title={`${selectedCategory.name} — category photo`}
                      description="Appears on the category page and is used as the fallback image for all models in this category that don't have their own photo yet."
                      mediaKey="imageUrl"
                      altKey="imageAlt"
                      imageUrl={selectedCategory.imageUrl}
                      imageAlt={selectedCategory.imageAlt}
                      onSave={(values) => saveCategoryMedia(selectedCategory.id, values)}
                      onClear={() => clearCategoryMedia(selectedCategory.id)}
                      emptyLabel="No photo uploaded yet. Upload a workshop or device photo."
                      uploadLabel="Category photo"
                      hint="Tip: a wide landscape photo works best here — around 1600 × 1000 pixels."
                      uploadOptions={{ maxWidth: 1600, maxHeight: 1200, quality: 0.84 }}
                      previewClassName="aspect-[16/10]"
                    />
                  ) : null}

                  {selectedBrand ? (
                    <MediaEditorCard
                      title={`${selectedBrand.name} — brand logo`}
                      description="Upload the brand logo. This appears on brand cards, device pages, and throughout the booking flow."
                      mediaKey="logoUrl"
                      altKey="logoAlt"
                      imageUrl={selectedBrand.logoUrl}
                      imageAlt={selectedBrand.logoAlt}
                      onSave={(values) => saveBrandMedia(selectedBrand.id, values)}
                      onClear={() => clearBrandMedia(selectedBrand.id)}
                      emptyLabel="No logo uploaded yet."
                      uploadLabel="Brand logo"
                      hint="Tip: a square PNG with a transparent background works best for logos."
                      uploadOptions={{ maxWidth: 900, maxHeight: 900, quality: 0.9 }}
                      previewClassName="aspect-[1/1] max-w-[13rem]"
                    />
                  ) : null}

                  {selectedModel ? (
                    <MediaEditorCard
                      title={`${selectedModel.name} — device photo`}
                      description="Upload a photo of this specific device model. It appears on the model's repair page and in the booking flow."
                      mediaKey="imageUrl"
                      altKey="imageAlt"
                      imageUrl={selectedModel.imageUrl}
                      imageAlt={selectedModel.imageAlt}
                      onSave={(values) => saveModelMedia(selectedModel.id, values)}
                      onClear={() => clearModelMedia(selectedModel.id)}
                      emptyLabel="No photo yet — the category photo is being used as a fallback."
                      uploadLabel="Device photo"
                      hint="Tip: a clear product or repair photo around 1200–1600px tall works best."
                      uploadOptions={{ maxWidth: 1600, maxHeight: 1600, quality: 0.84 }}
                      previewClassName="aspect-[4/5]"
                    />
                  ) : null}

                  {!selectedCategory && (
                    <div className="panel-card p-10 text-center">
                      <div className="text-4xl mb-3">🖼️</div>
                      <p className="text-lg font-extrabold text-[var(--color-ink)]">Nothing selected yet</p>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        Go to the{' '}
                        <button type="button" className="text-[var(--color-brand)] underline font-semibold" onClick={() => setActiveTab('catalogue')}>
                          Repair Catalogue
                        </button>{' '}
                        tab, select a category, brand, and model, then come back here to upload photos.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════════
              SETTINGS TAB
          ══════════════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <section className="section-pad">
              <div className="max-w-2xl mx-auto px-4 space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Settings</h2>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">Account and data management.</p>
                </div>

                {/* Account */}
                {isRemote && session && (
                  <div className="panel-card p-6">
                    <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Your account</h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      Signed in as <strong className="text-[var(--color-ink)]">{session.user.email}</strong>
                    </p>
                    <button type="button" className="btn-secondary mt-4 text-sm" onClick={signOutAdmin}>Sign out</button>
                  </div>
                )}

                {/* Data source */}
                <div className="panel-card p-6">
                  <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Data source</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {isRemote
                      ? 'Your repair catalogue and bookings are stored in Supabase. Changes you make here are live on the public website immediately.'
                      : 'Running in local preview mode. Changes are saved in your browser only and will not affect the live website.'}
                  </p>
                  <div className="mt-3 inline-flex rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-clay)]">
                    {isRemote ? '🟢 Live Supabase' : '🟡 Local preview'}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="panel-card border-red-100 p-6">
                  <h3 className="text-lg font-extrabold text-red-700">⚠️ Danger zone</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">These actions cannot be undone. Only use them if you are absolutely sure.</p>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-semibold text-red-800">Reset repair catalogue to starter data</p>
                      <p className="mt-1 text-xs text-red-600">
                        This will wipe all your current categories, brands, models and repair services, then replace them with the default starter set.
                      </p>
                      <button
                        type="button"
                        className="mt-3 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (window.confirm('Are you absolutely sure? This will delete ALL your current repair data and cannot be undone.')) {
                            resetCatalog()
                          }
                        }}
                      >
                        Reset catalogue
                      </button>
                    </div>
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-semibold text-red-800">Clear all bookings</p>
                      <p className="mt-1 text-xs text-red-600">This will permanently delete every customer booking record.</p>
                      <button
                        type="button"
                        className="mt-3 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (window.confirm('Are you absolutely sure? All booking records will be permanently deleted.')) {
                            clearBookings()
                          }
                        }}
                      >
                        Clear all bookings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}