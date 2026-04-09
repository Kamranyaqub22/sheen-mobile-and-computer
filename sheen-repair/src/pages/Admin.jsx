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
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="name"
          className="form-input"
          defaultValue={repair.name}
          placeholder="Repair name"
        />
        <input
          name="price"
          className="form-input"
          type="number"
          min="0"
          step="1"
          defaultValue={repair.price}
          placeholder="Price"
        />
        <input
          name="turnaround"
          className="form-input"
          defaultValue={repair.turnaround}
          placeholder="Turnaround"
        />
        <input
          name="warranty"
          className="form-input"
          defaultValue={repair.warranty}
          placeholder="Warranty"
        />
      </div>
      <textarea
        name="notes"
        className="form-input mt-3 resize-y"
        rows={3}
        defaultValue={repair.notes}
        placeholder="Repair notes"
      />
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary text-sm">
          Save repair
        </button>
        <button type="button" className="btn-secondary text-sm" onClick={onDelete}>
          Delete repair
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
    dataSource,
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

  const totalBrands = catalog.reduce((count, category) => count + category.brands.length, 0)
  const totalModels = catalog.reduce(
    (count, category) => count + category.brands.reduce((brandCount, brand) => brandCount + brand.models.length, 0),
    0,
  )

  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      return
    }

    if (window.confirm(`Delete ${selectedCategory.name} and all of its brands, models, and repairs?`)) {
      await deleteCategory(selectedCategory.id)
    }
  }

  const handleDeleteBrand = async () => {
    if (!selectedCategory || !selectedBrand) {
      return
    }

    if (window.confirm(`Delete ${selectedBrand.name} and all of its models?`)) {
      await deleteBrand(selectedCategory.id, selectedBrand.id)
    }
  }

  const handleDeleteModel = async () => {
    if (!selectedCategory || !selectedBrand || !selectedModel) {
      return
    }

    if (window.confirm(`Delete ${selectedModel.name} and all listed repairs?`)) {
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
        setAuthMessage('Magic link sent. Open the email on this device and return to /admin after sign-in.')
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
        setAuthMessage('Starter catalogue imported into Supabase.')
      }
    } finally {
      setIsImportingSeed(false)
    }
  }

  const isLocked = isRemote && (!session || !isAdmin)
  const shouldImportSeed = isRemote && isAdmin && isSeedFallback

  if (isRemote && (!authReady || (isLoadingCatalog && !catalog.length && !syncError))) {
    return (
      <>
        <Helmet>
          <title>Admin | Preparing Dashboard</title>
        </Helmet>

        <section className="section-pad pt-16 md:pt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="panel-card p-8 text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-clay)]">Loading admin dashboard</div>
              <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">Connecting to Supabase</h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                Fetching the live catalogue and checking admin access.
              </p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin | Manage Repairs and Bookings</title>
        <meta
          name="description"
          content="Admin prototype for managing repair categories, brands, models, repair services, and booking requests."
        />
      </Helmet>

      <section className="section-pad pt-16 md:pt-20 bg-[linear-gradient(135deg,_rgba(255,124,0,0.16),_rgba(255,246,236,1))]">
        <div className="max-w-6xl mx-auto px-4 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-end">
          <div>
            <span className="section-label">{isRemote ? 'Supabase admin' : 'Local admin prototype'}</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-ink)]">
              Manage repair brands, models, pricing, and booking requests.
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]">
              {isRemote
                ? 'This version reads and writes against Supabase. Public category pages, repair bookings, and admin changes all share the same data source.'
                : 'This local preview keeps the admin workflow usable even without backend credentials. The same UI is ready to switch to Supabase when configured.'}
            </p>
          </div>

          <div className="panel-card p-6">
            <div className="mb-4 inline-flex rounded-full bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">
              {dataSource === 'supabase' ? 'Live Supabase mode' : 'Local fallback mode'}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ['Categories', catalog.length],
                ['Brands', totalBrands],
                ['Models', totalModels],
                ['Bookings', isLoadingBookings ? '...' : bookings.length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[var(--color-surface)] p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">{label}</div>
                  <div className="mt-2 text-3xl font-extrabold text-[var(--color-ink)]">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-[var(--color-muted)]">
              {isRemote
                ? 'Admin access is protected by Supabase magic-link sign-in and an email allow-list.'
                : 'Use this mode to test the admin flow before the backend is available.'}
            </div>
          </div>
        </div>
      </section>

      {syncError ? (
        <section className="section-pad pt-0">
          <div className="max-w-6xl mx-auto px-4">
            <div className="panel-card border border-[var(--color-border)] p-5 text-sm text-[var(--color-ink)]">
              {syncError}
            </div>
          </div>
        </section>
      ) : null}

      {isLocked ? (
        <section className="section-pad pt-0">
          <div className="max-w-4xl mx-auto px-4">
            <div className="panel-card p-6 md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Admin sign-in required</div>
              <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">Use the approved admin email to unlock this dashboard</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                The dashboard uses Supabase magic links. Only email addresses added to the admin allow-list can view bookings or change repair data.
              </p>

              {session ? (
                <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="text-sm font-semibold text-[var(--color-ink)]">Signed in as {session.user.email}</div>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    This account is not currently on the admin allow-list.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button type="button" className="btn-secondary text-sm" onClick={signOutAdmin}>
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleMagicLink}>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="admin-email">
                      Admin email address
                    </label>
                    <input
                      id="admin-email"
                      type="email"
                      className="form-input mt-2"
                      placeholder="owner@example.com"
                      value={adminEmail}
                      onChange={(event) => setAdminEmail(event.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" disabled={isSendingMagicLink}>
                    {isSendingMagicLink ? 'Sending magic link...' : 'Send magic link'}
                  </button>
                </form>
              )}

              {authMessage ? (
                <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)]">
                  {authMessage}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : shouldImportSeed ? (
        <section className="section-pad pt-0">
          <div className="max-w-4xl mx-auto px-4">
            <div className="panel-card p-6 md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">Starter import</div>
              <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">The database is connected, but the repair catalogue is still empty</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                Import the existing starter catalogue into Supabase so the public repair pages, booking form, and admin editor all run on the live backend.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn-primary text-sm" disabled={isImportingSeed} onClick={handleImportSeed}>
                  {isImportingSeed ? 'Importing starter catalogue...' : 'Import starter catalogue'}
                </button>
                <button type="button" className="btn-secondary text-sm" onClick={signOutAdmin}>
                  Sign out
                </button>
              </div>
              {authMessage ? (
                <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)]">
                  {authMessage}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : (

      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4 grid gap-6 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <div className="panel-card p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="admin-category-select">
                    Selected category
                  </label>
                  <select
                    id="admin-category-select"
                    className="form-input mt-2"
                    value={selectedCategory?.id || ''}
                    onChange={(event) => setSelectedCategoryId(event.target.value)}
                  >
                    {catalog.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="admin-brand-select">
                    Selected brand
                  </label>
                  <select
                    id="admin-brand-select"
                    className="form-input mt-2"
                    value={selectedBrand?.id || ''}
                    onChange={(event) => setSelectedBrandId(event.target.value)}
                    disabled={!selectedCategory?.brands.length}
                  >
                    {selectedCategory?.brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor="admin-model-select">
                    Selected model
                  </label>
                  <select
                    id="admin-model-select"
                    className="form-input mt-2"
                    value={selectedModel?.id || ''}
                    onChange={(event) => setSelectedModelId(event.target.value)}
                    disabled={!selectedBrand?.models.length}
                  >
                    {selectedBrand?.models.map((model) => (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="panel-card p-6">
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Add category</h2>
                <div className="mt-4 space-y-3">
                  {[
                    ['name', 'Category name'],
                    ['summary', 'Short summary'],
                    ['heroTitle', 'Hero title'],
                    ['heroBody', 'Hero body'],
                    ['accent', 'Accent label'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor={`new-category-${key}`}>
                        {label}
                      </label>
                      {key === 'heroBody' ? (
                        <textarea
                          id={`new-category-${key}`}
                          rows={3}
                          className="form-input mt-2 resize-y"
                          value={newCategoryForm[key]}
                          onChange={(event) => setNewCategoryForm((form) => ({ ...form, [key]: event.target.value }))}
                        />
                      ) : (
                        <input
                          id={`new-category-${key}`}
                          className="form-input mt-2"
                          value={newCategoryForm[key]}
                          onChange={(event) => setNewCategoryForm((form) => ({ ...form, [key]: event.target.value }))}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-primary mt-4 text-sm"
                  onClick={async () => {
                    if (!newCategoryForm.name.trim()) {
                      return
                    }

                    const added = await addCategory(newCategoryForm)

                    if (added) {
                      setNewCategoryForm(emptyCategoryForm)
                    }
                  }}
                >
                  Add category
                </button>
              </div>

              <div className="panel-card p-6">
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Edit selected category</h2>
                {selectedCategory ? (
                  <form key={selectedCategory.id} onSubmit={handleCategorySave}>
                    <div className="mt-4 space-y-3">
                      {[
                        ['name', 'Category name'],
                        ['slug', 'Slug'],
                        ['summary', 'Summary'],
                        ['heroTitle', 'Hero title'],
                        ['heroBody', 'Hero body'],
                        ['accent', 'Accent label'],
                      ].map(([key, label]) => (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor={`category-${key}`}>
                            {label}
                          </label>
                          {key === 'heroBody' ? (
                            <textarea
                              id={`category-${key}`}
                              name={key}
                              rows={3}
                              className="form-input mt-2 resize-y"
                              defaultValue={selectedCategory[key]}
                            />
                          ) : (
                            <input
                              id={`category-${key}`}
                              name={key}
                              className="form-input mt-2"
                              defaultValue={selectedCategory[key]}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button type="submit" className="btn-primary text-sm">
                        Save category
                      </button>
                      <button type="button" className="btn-secondary text-sm" onClick={handleDeleteCategory}>
                        Delete category
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-4 text-sm text-[var(--color-muted)]">Create a category first.</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="panel-card p-6">
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Add brand</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Add brands under the currently selected category.
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    ['name', 'Brand name'],
                    ['summary', 'Brand summary'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor={`new-brand-${key}`}>
                        {label}
                      </label>
                      <input
                        id={`new-brand-${key}`}
                        className="form-input mt-2"
                        value={newBrandForm[key]}
                        onChange={(event) => setNewBrandForm((form) => ({ ...form, [key]: event.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-primary mt-4 text-sm"
                  onClick={async () => {
                    if (!selectedCategory || !newBrandForm.name.trim()) {
                      return
                    }

                    const added = await addBrand(selectedCategory.id, newBrandForm)

                    if (added) {
                      setNewBrandForm(emptyBrandForm)
                    }
                  }}
                >
                  Add brand
                </button>
              </div>

              <div className="panel-card p-6">
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Edit selected brand</h2>
                {selectedCategory && selectedBrand ? (
                  <form key={selectedBrand.id} onSubmit={handleBrandSave}>
                    <div className="mt-4 space-y-3">
                      {[
                        ['name', 'Brand name'],
                        ['slug', 'Slug'],
                        ['summary', 'Summary'],
                      ].map(([key, label]) => (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor={`brand-${key}`}>
                            {label}
                          </label>
                          <input
                            id={`brand-${key}`}
                            name={key}
                            className="form-input mt-2"
                            defaultValue={selectedBrand[key]}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button type="submit" className="btn-primary text-sm">
                        Save brand
                      </button>
                      <button type="button" className="btn-secondary text-sm" onClick={handleDeleteBrand}>
                        Delete brand
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-4 text-sm text-[var(--color-muted)]">Choose or add a brand first.</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="panel-card p-6">
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Add model</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Add models under the selected brand.
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    ['name', 'Model name'],
                    ['summary', 'Summary'],
                    ['turnaround', 'Turnaround'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor={`new-model-${key}`}>
                        {label}
                      </label>
                      <input
                        id={`new-model-${key}`}
                        className="form-input mt-2"
                        value={newModelForm[key]}
                        onChange={(event) => setNewModelForm((form) => ({ ...form, [key]: event.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-primary mt-4 text-sm"
                  onClick={async () => {
                    if (!selectedCategory || !selectedBrand || !newModelForm.name.trim()) {
                      return
                    }

                    const added = await addModel(selectedCategory.id, selectedBrand.id, newModelForm)

                    if (added) {
                      setNewModelForm(emptyModelForm)
                    }
                  }}
                >
                  Add model
                </button>
              </div>

              <div className="panel-card p-6">
                <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Edit selected model</h2>
                {selectedCategory && selectedBrand && selectedModel ? (
                  <form key={selectedModel.id} onSubmit={handleModelSave}>
                    <div className="mt-4 space-y-3">
                      {[
                        ['name', 'Model name'],
                        ['slug', 'Slug'],
                        ['summary', 'Summary'],
                        ['turnaround', 'Turnaround'],
                      ].map(([key, label]) => (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-[var(--color-ink)]" htmlFor={`model-${key}`}>
                            {label}
                          </label>
                          <input
                            id={`model-${key}`}
                            name={key}
                            className="form-input mt-2"
                            defaultValue={selectedModel[key]}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button type="submit" className="btn-primary text-sm">
                        Save model
                      </button>
                      <button type="button" className="btn-secondary text-sm" onClick={handleDeleteModel}>
                        Delete model
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-4 text-sm text-[var(--color-muted)]">Choose or add a model first.</p>
                )}
              </div>
            </div>

            <div className="panel-card p-6">
              <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Add repair service</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Add repair types with price, turnaround, warranty, and notes to the selected model.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input
                  className="form-input"
                  placeholder="Repair name"
                  value={newRepairForm.name}
                  onChange={(event) => setNewRepairForm((form) => ({ ...form, name: event.target.value }))}
                />
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Price"
                  value={newRepairForm.price}
                  onChange={(event) => setNewRepairForm((form) => ({ ...form, price: event.target.value }))}
                />
                <input
                  className="form-input"
                  placeholder="Turnaround"
                  value={newRepairForm.turnaround}
                  onChange={(event) => setNewRepairForm((form) => ({ ...form, turnaround: event.target.value }))}
                />
                <input
                  className="form-input"
                  placeholder="Warranty"
                  value={newRepairForm.warranty}
                  onChange={(event) => setNewRepairForm((form) => ({ ...form, warranty: event.target.value }))}
                />
              </div>
              <textarea
                className="form-input mt-3 resize-y"
                rows={3}
                placeholder="Notes"
                value={newRepairForm.notes}
                onChange={(event) => setNewRepairForm((form) => ({ ...form, notes: event.target.value }))}
              />
              <button
                type="button"
                className="btn-primary mt-4 text-sm"
                onClick={async () => {
                  if (!selectedCategory || !selectedBrand || !selectedModel || !newRepairForm.name.trim()) {
                    return
                  }

                  const added = await addRepair(selectedCategory.id, selectedBrand.id, selectedModel.id, newRepairForm)

                  if (added) {
                    setNewRepairForm(emptyRepairForm)
                  }
                }}
              >
                Add repair
              </button>
            </div>

            <div className="panel-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Existing repair services</h2>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    Edit prices and service details on the selected model.
                  </p>
                </div>
                {selectedCategory && selectedBrand && selectedModel && (
                  <Link
                    to={`/repairs/${selectedCategory.slug}/${selectedBrand.slug}/${selectedModel.slug}`}
                    className="btn-secondary text-sm"
                  >
                    Preview public page
                  </Link>
                )}
              </div>
              <div className="mt-5 space-y-4">
                {selectedCategory && selectedBrand && selectedModel ? (
                  selectedModel.repairs.length ? (
                    selectedModel.repairs.map((repair) => (
                      <RepairRowEditor
                        key={`${repair.id}-${repair.name}-${repair.price}-${repair.turnaround}-${repair.warranty}-${repair.notes}`}
                        repair={repair}
                        onSave={(form) => updateRepair(selectedCategory.id, selectedBrand.id, selectedModel.id, repair.id, form)}
                        onDelete={() => deleteRepair(selectedCategory.id, selectedBrand.id, selectedModel.id, repair.id)}
                      />
                    ))
                  ) : (
                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
                      No repairs added for this model yet.
                    </div>
                  )
                ) : (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
                    Choose a model first.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="panel-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Media library</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    Upload real category photos, brand logos, and model images so the public catalogue stops relying on placeholder artwork.
                  </p>
                </div>
                <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-clay)]">
                  Instant preview
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
                These uploads are stored in this browser for now, so you can curate the visuals locally and see the public pages update immediately.
              </p>
              <div className="mt-5 space-y-4">
                {selectedCategory ? (
                  <MediaEditorCard
                    title={`${selectedCategory.name} category photo`}
                    description="Large editorial image used as the visual anchor for this repair category and as the fallback photo for models without their own image yet."
                    mediaKey="imageUrl"
                    altKey="imageAlt"
                    imageUrl={selectedCategory.imageUrl}
                    imageAlt={selectedCategory.imageAlt}
                    onSave={(values) => saveCategoryMedia(selectedCategory.id, values)}
                    onClear={() => clearCategoryMedia(selectedCategory.id)}
                    emptyLabel="No category image yet. Upload a real workshop or device photo."
                    uploadLabel="Category"
                    hint="Best results: landscape photo around 1600px wide."
                    uploadOptions={{ maxWidth: 1600, maxHeight: 1200, quality: 0.84 }}
                    previewClassName="aspect-[16/10]"
                  />
                ) : null}

                {selectedBrand ? (
                  <MediaEditorCard
                    title={`${selectedBrand.name} logo`}
                    description="Upload the real brand mark you want to show in the catalog chips, headers, and repair flows."
                    mediaKey="logoUrl"
                    altKey="logoAlt"
                    imageUrl={selectedBrand.logoUrl}
                    imageAlt={selectedBrand.logoAlt}
                    onSave={(values) => saveBrandMedia(selectedBrand.id, values)}
                    onClear={() => clearBrandMedia(selectedBrand.id)}
                    emptyLabel="No brand logo uploaded yet."
                    uploadLabel="Logo"
                    hint="Best results: square PNG or WebP with transparent background."
                    uploadOptions={{ maxWidth: 900, maxHeight: 900, quality: 0.9 }}
                    previewClassName="aspect-[1/1] max-w-[13rem]"
                  />
                ) : null}

                {selectedModel ? (
                  <MediaEditorCard
                    title={`${selectedModel.name} model image`}
                    description="Use an actual photo for the exact device model so the model page, booking flow, and brand pages feel grounded and specific."
                    mediaKey="imageUrl"
                    altKey="imageAlt"
                    imageUrl={selectedModel.imageUrl}
                    imageAlt={selectedModel.imageAlt}
                    onSave={(values) => saveModelMedia(selectedModel.id, values)}
                    onClear={() => clearModelMedia(selectedModel.id)}
                    emptyLabel="No model image yet. The category photo is being used as the fallback."
                    uploadLabel="Model"
                    hint="Best results: portrait or product shot around 1200-1600px."
                    uploadOptions={{ maxWidth: 1600, maxHeight: 1600, quality: 0.84 }}
                    previewClassName="aspect-[4/5]"
                  />
                ) : null}
              </div>
            </div>

            <div className="panel-card p-6">
              <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Repair bookings</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Requests submitted from the Book Repair Service page appear here.
              </p>
              <div className="mt-5 space-y-4">
                {bookings.length ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-clay)]">
                            {new Date(booking.submittedAt).toLocaleString()}
                          </div>
                          <div className="mt-2 text-lg font-extrabold text-[var(--color-ink)]">{booking.customerName}</div>
                          <p className="mt-1 text-sm text-[var(--color-muted)]">
                            {booking.category} - {booking.brand} - {booking.model}
                          </p>
                        </div>
                        <select
                          className="form-input max-w-[10rem]"
                          value={booking.status}
                          onChange={(event) => updateBookingStatus(booking.id, event.target.value)}
                        >
                          {['new', 'contacted', 'booked', 'completed', 'archived'].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-4 rounded-2xl bg-[var(--color-surface)] p-4 text-sm">
                        <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                          <span className="text-[var(--color-muted)]">Repair</span>
                          <span className="font-semibold text-[var(--color-ink)]">{booking.repair}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                          <span className="text-[var(--color-muted)]">Phone</span>
                          <span className="font-semibold text-[var(--color-ink)]">{booking.phone}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                          <span className="text-[var(--color-muted)]">Preferred timing</span>
                          <span className="font-semibold text-[var(--color-ink)]">{booking.preferredWindow}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-4 pb-1">
                          <span className="text-[var(--color-muted)]">Preferred contact</span>
                          <span className="font-semibold text-[var(--color-ink)]">{booking.preferredContact}</span>
                        </div>
                      </div>
                      {booking.message ? (
                        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{booking.message}</p>
                      ) : null}
                      <button type="button" className="btn-secondary mt-4 text-sm" onClick={() => deleteBooking(booking.id)}>
                        Delete booking
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
                    No repair bookings yet. Use the public booking page to add one.
                  </div>
                )}
              </div>
            </div>

            <div className="panel-card p-6">
              <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Maintenance</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Prototype controls for testing the catalog structure and booking flow quickly.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" className="btn-secondary text-sm" onClick={resetCatalog}>
                  {isRemote ? 'Reset Supabase catalogue to starter data' : 'Reset catalog to seed data'}
                </button>
                <button type="button" className="btn-secondary text-sm" onClick={clearBookings}>
                  {isRemote ? 'Clear live bookings' : 'Clear bookings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  )
}