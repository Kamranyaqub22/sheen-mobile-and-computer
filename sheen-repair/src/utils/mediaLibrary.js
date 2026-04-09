const EMPTY_MEDIA_LIBRARY = {
  categories: {},
  brands: {},
  models: {},
}

const DEFAULT_CATEGORY_MEDIA = {
  phones: {
    imageUrl: '/media/phone-repair.png',
    imageAlt: 'Technician repairing a smartphone on a workbench',
  },
  'laptops-macbooks': {
    imageUrl: '/media/laptop-repair.png',
    imageAlt: 'Technician repairing a laptop motherboard in the workshop',
  },
  tablets: {
    imageUrl: '/media/tv-repair.png',
    imageAlt: 'Bench setup used for tablet and screen diagnostics',
  },
  'game-consoles': {
    imageUrl: '/media/gaming-repair.png',
    imageAlt: 'Repair bench set up for gaming console diagnostics',
  },
}

function sanitizeEntry(entry, allowedKeys) {
  if (!entry || typeof entry !== 'object') {
    return null
  }

  const nextEntry = {}

  allowedKeys.forEach((key) => {
    if (typeof entry[key] === 'string' && entry[key].trim()) {
      nextEntry[key] = entry[key].trim()
    }
  })

  return Object.keys(nextEntry).length ? nextEntry : null
}

export function createEmptyMediaLibrary() {
  return {
    categories: {},
    brands: {},
    models: {},
  }
}

export function normalizeMediaLibrary(value) {
  if (!value || typeof value !== 'object') {
    return createEmptyMediaLibrary()
  }

  const categories = Object.fromEntries(
    Object.entries(value.categories || {})
      .map(([id, entry]) => [id, sanitizeEntry(entry, ['imageUrl', 'imageAlt'])])
      .filter(([, entry]) => Boolean(entry)),
  )

  const brands = Object.fromEntries(
    Object.entries(value.brands || {})
      .map(([id, entry]) => [id, sanitizeEntry(entry, ['logoUrl', 'logoAlt'])])
      .filter(([, entry]) => Boolean(entry)),
  )

  const models = Object.fromEntries(
    Object.entries(value.models || {})
      .map(([id, entry]) => [id, sanitizeEntry(entry, ['imageUrl', 'imageAlt'])])
      .filter(([, entry]) => Boolean(entry)),
  )

  return {
    categories,
    brands,
    models,
  }
}

export function setEntityMedia(currentLibrary, entityType, entityId, nextEntry) {
  const safeLibrary = normalizeMediaLibrary(currentLibrary)

  if (!entityId || !safeLibrary[entityType]) {
    return safeLibrary
  }

  const allowedKeys = entityType === 'brands'
    ? ['logoUrl', 'logoAlt']
    : ['imageUrl', 'imageAlt']

  const sanitizedEntry = sanitizeEntry(nextEntry, allowedKeys)

  if (!sanitizedEntry) {
    const nextEntries = { ...safeLibrary[entityType] }
    delete nextEntries[entityId]

    return {
      ...safeLibrary,
      [entityType]: nextEntries,
    }
  }

  return {
    ...safeLibrary,
    [entityType]: {
      ...safeLibrary[entityType],
      [entityId]: sanitizedEntry,
    },
  }
}

export function clearEntityMedia(currentLibrary, entityType, entityId) {
  const safeLibrary = normalizeMediaLibrary(currentLibrary)

  if (!entityId || !safeLibrary[entityType]) {
    return safeLibrary
  }

  const nextEntries = { ...safeLibrary[entityType] }
  delete nextEntries[entityId]

  return {
    ...safeLibrary,
    [entityType]: nextEntries,
  }
}

export function applyMediaOverrides(catalog, mediaLibrary) {
  const safeLibrary = normalizeMediaLibrary(mediaLibrary)

  return (catalog || []).map((category) => {
    const categoryMedia = safeLibrary.categories[category.id] || null
    const defaultCategoryMedia = DEFAULT_CATEGORY_MEDIA[category.slug] || {}
    const mergedCategory = {
      ...category,
      imageUrl: categoryMedia?.imageUrl || category.imageUrl || defaultCategoryMedia.imageUrl || '',
      imageAlt: categoryMedia?.imageAlt || category.imageAlt || defaultCategoryMedia.imageAlt || `${category.name} repair service`,
    }

    return {
      ...mergedCategory,
      brands: (category.brands || []).map((brand) => {
        const brandMedia = safeLibrary.brands[brand.id] || null
        const mergedBrand = {
          ...brand,
          logoUrl: brandMedia?.logoUrl || brand.logoUrl || '',
          logoAlt: brandMedia?.logoAlt || brand.logoAlt || `${brand.name} logo`,
        }

        return {
          ...mergedBrand,
          models: (brand.models || []).map((model) => {
            const modelMedia = safeLibrary.models[model.id] || null

            return {
              ...model,
              imageUrl: modelMedia?.imageUrl || model.imageUrl || mergedCategory.imageUrl || '',
              imageAlt: modelMedia?.imageAlt || model.imageAlt || `${model.name} repair image`,
            }
          }),
        }
      }),
    }
  })
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Failed to read the selected file.'))
    reader.readAsDataURL(file)
  })
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('The selected file could not be processed as an image.'))
    image.src = dataUrl
  })
}

export async function processImageFile(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
  } = options

  if (!(file instanceof File)) {
    throw new Error('Select an image file first.')
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are supported.')
  }

  const dataUrl = await readFileAsDataUrl(file)
  const image = await loadImage(dataUrl)

  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1)
  const width = Math.max(1, Math.round(image.width * ratio))
  const height = Math.max(1, Math.round(image.height * ratio))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('This browser could not prepare the selected image.')
  }

  context.drawImage(image, 0, 0, width, height)

  return canvas.toDataURL('image/webp', quality)
}

export { EMPTY_MEDIA_LIBRARY }
