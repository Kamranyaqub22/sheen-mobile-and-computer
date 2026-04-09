/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from 'react'
import { seedCatalog } from '../data/repairCatalog'
import { uniqueSlug } from '../utils/slugify'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import {
  applyMediaOverrides,
  clearEntityMedia,
  createEmptyMediaLibrary,
  normalizeMediaLibrary,
  setEntityMedia,
} from '../utils/mediaLibrary'

const RepairCatalogContext = createContext(null)

const CATALOG_STORAGE_KEY = 'sheen-repair.catalog.v1'
const BOOKINGS_STORAGE_KEY = 'sheen-repair.bookings.v1'
const MEDIA_STORAGE_KEY = 'sheen-repair.media.v1'
const isTestMode = import.meta.env.MODE === 'test'
const useRemoteCatalog = Boolean(supabase) && !isTestMode

function readStorage(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const rawValue = window.localStorage.getItem(key)

    if (!rawValue) {
      return fallbackValue
    }

    return JSON.parse(rawValue)
  } catch {
    return fallbackValue
  }
}

function createId(prefix) {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Keep the local fallback usable even if storage is unavailable or full.
  }
}

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error && 'message' in error) {
    return String(error.message)
  }

  return 'Unexpected error'
}

function mapCategoryRow(categoryRow, brands) {
  return {
    id: categoryRow.id,
    slug: categoryRow.slug,
    name: categoryRow.name,
    summary: categoryRow.summary,
    heroTitle: categoryRow.hero_title,
    heroBody: categoryRow.hero_body,
    accent: categoryRow.accent,
    brands,
  }
}

function mapBrandRow(brandRow, models) {
  return {
    id: brandRow.id,
    slug: brandRow.slug,
    name: brandRow.name,
    summary: brandRow.summary,
    models,
  }
}

function mapModelRow(modelRow, repairs) {
  return {
    id: modelRow.id,
    slug: modelRow.slug,
    name: modelRow.name,
    summary: modelRow.summary,
    turnaround: modelRow.turnaround,
    repairs,
  }
}

function mapRepairRow(repairRow) {
  return {
    id: repairRow.id,
    slug: repairRow.slug,
    name: repairRow.name,
    price: Number(repairRow.price) || 0,
    turnaround: repairRow.turnaround,
    warranty: repairRow.warranty,
    notes: repairRow.notes,
  }
}

function mapBookingRow(bookingRow) {
  return {
    id: bookingRow.id,
    status: bookingRow.status,
    submittedAt: bookingRow.submitted_at,
    category: bookingRow.category_name,
    brand: bookingRow.brand_name,
    model: bookingRow.model_name,
    repair: bookingRow.repair_name,
    estimatedPrice: Number(bookingRow.estimated_price) || 0,
    turnaround: bookingRow.turnaround || '',
    customerName: bookingRow.customer_name,
    phone: bookingRow.phone,
    email: bookingRow.email || '',
    preferredContact: bookingRow.preferred_contact,
    preferredWindow: bookingRow.preferred_window,
    message: bookingRow.message || '',
  }
}

function buildCatalogTree(categoryRows, brandRows, modelRows, repairRows) {
  const repairsByModelId = new Map()

  repairRows.forEach((repairRow) => {
    const repairs = repairsByModelId.get(repairRow.model_id) || []

    repairs.push(mapRepairRow(repairRow))
    repairsByModelId.set(repairRow.model_id, repairs)
  })

  const modelsByBrandId = new Map()

  modelRows.forEach((modelRow) => {
    const models = modelsByBrandId.get(modelRow.brand_id) || []

    models.push(mapModelRow(modelRow, repairsByModelId.get(modelRow.id) || []))
    modelsByBrandId.set(modelRow.brand_id, models)
  })

  const brandsByCategoryId = new Map()

  brandRows.forEach((brandRow) => {
    const brands = brandsByCategoryId.get(brandRow.category_id) || []

    brands.push(mapBrandRow(brandRow, modelsByBrandId.get(brandRow.id) || []))
    brandsByCategoryId.set(brandRow.category_id, brands)
  })

  return categoryRows.map((categoryRow) => mapCategoryRow(categoryRow, brandsByCategoryId.get(categoryRow.id) || []))
}

async function loadRemoteCatalog() {
  const [categoriesResult, brandsResult, modelsResult, repairsResult] = await Promise.all([
    supabase.from('repair_categories').select('*').order('position', { ascending: true }).order('name', { ascending: true }),
    supabase.from('repair_brands').select('*').order('position', { ascending: true }).order('name', { ascending: true }),
    supabase.from('repair_models').select('*').order('position', { ascending: true }).order('name', { ascending: true }),
    supabase.from('repair_services').select('*').order('position', { ascending: true }).order('name', { ascending: true }),
  ])

  if (categoriesResult.error) {
    throw categoriesResult.error
  }

  if (brandsResult.error) {
    throw brandsResult.error
  }

  if (modelsResult.error) {
    throw modelsResult.error
  }

  if (repairsResult.error) {
    throw repairsResult.error
  }

  return buildCatalogTree(
    categoriesResult.data || [],
    brandsResult.data || [],
    modelsResult.data || [],
    repairsResult.data || [],
  )
}

async function loadRemoteBookings() {
  const result = await supabase
    .from('repair_bookings')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (result.error) {
    throw result.error
  }

  return (result.data || []).map(mapBookingRow)
}

async function checkRemoteAdmin() {
  const result = await supabase.rpc('is_admin')

  if (result.error) {
    throw result.error
  }

  return Boolean(result.data)
}

function createCategoryPayload(existingCategories, values) {
  const existingSlugs = existingCategories.map((category) => category.slug)

  return {
    id: createId('category'),
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    summary: values.summary.trim(),
    heroTitle: values.heroTitle.trim() || values.name.trim(),
    heroBody: values.heroBody.trim() || values.summary.trim(),
    accent: values.accent.trim() || 'Bookable repair category',
    brands: [],
  }
}

function createBrandPayload(existingBrands, values) {
  const existingSlugs = existingBrands.map((brand) => brand.slug)

  return {
    id: createId('brand'),
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    summary: values.summary.trim(),
    models: [],
  }
}

function createModelPayload(existingModels, values) {
  const existingSlugs = existingModels.map((model) => model.slug)

  return {
    id: createId('model'),
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    summary: values.summary.trim(),
    turnaround: values.turnaround.trim(),
    repairs: [],
  }
}

function createRepairPayload(existingRepairs, values) {
  const existingSlugs = existingRepairs.map((repair) => repair.slug).filter(Boolean)

  return {
    id: createId('repair'),
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    price: Number(values.price) || 0,
    turnaround: values.turnaround.trim(),
    warranty: values.warranty.trim(),
    notes: values.notes.trim(),
    icon: values.icon?.trim() || '',
  }
}

function buildRemoteCategoryInsert(values, position, existingCategories) {
  const existingSlugs = existingCategories.map((category) => category.slug)

  return {
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    summary: values.summary.trim(),
    hero_title: values.heroTitle.trim() || values.name.trim(),
    hero_body: values.heroBody.trim() || values.summary.trim(),
    accent: values.accent.trim() || 'Bookable repair category',
    position,
  }
}

function buildRemoteBrandInsert(categoryId, values, position, existingBrands) {
  const existingSlugs = existingBrands.map((brand) => brand.slug)

  return {
    category_id: categoryId,
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    summary: values.summary.trim(),
    position,
  }
}

function buildRemoteModelInsert(brandId, values, position, existingModels) {
  const existingSlugs = existingModels.map((model) => model.slug)

  return {
    brand_id: brandId,
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    summary: values.summary.trim(),
    turnaround: values.turnaround.trim(),
    position,
  }
}

function buildRemoteRepairInsert(modelId, values, position, existingRepairs) {
  const existingSlugs = existingRepairs.map((repair) => repair.slug).filter(Boolean)

  return {
    model_id: modelId,
    slug: uniqueSlug(values.slug || values.name, existingSlugs),
    name: values.name.trim(),
    price: Number(values.price) || 0,
    turnaround: values.turnaround.trim(),
    warranty: values.warranty.trim(),
    notes: values.notes.trim(),
    icon: values.icon?.trim() || '',
    position,
  }
}

export function RepairCatalogProvider({ children }) {
  const [catalogData, setCatalogData] = useState(() => (useRemoteCatalog ? [] : readStorage(CATALOG_STORAGE_KEY, seedCatalog)))
  const [bookings, setBookings] = useState(() => (useRemoteCatalog ? [] : readStorage(BOOKINGS_STORAGE_KEY, [])))
  const [mediaLibrary, setMediaLibrary] = useState(() => normalizeMediaLibrary(readStorage(MEDIA_STORAGE_KEY, createEmptyMediaLibrary())))
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [authReady, setAuthReady] = useState(!useRemoteCatalog)
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(useRemoteCatalog)
  const [isLoadingBookings, setIsLoadingBookings] = useState(false)
  const [isSeedFallback, setIsSeedFallback] = useState(false)
  const [syncError, setSyncError] = useState('')
  const catalog = applyMediaOverrides(catalogData, mediaLibrary)

  useEffect(() => {
    if (useRemoteCatalog) {
      return
    }

    writeStorage(CATALOG_STORAGE_KEY, catalogData)
  }, [catalogData])

  useEffect(() => {
    if (useRemoteCatalog) {
      return
    }

    writeStorage(BOOKINGS_STORAGE_KEY, bookings)
  }, [bookings])

  useEffect(() => {
    writeStorage(MEDIA_STORAGE_KEY, mediaLibrary)
  }, [mediaLibrary])

  useEffect(() => {
    if (!useRemoteCatalog) {
      return undefined
    }

    let cancelled = false

    async function bootstrap() {
      setIsLoadingCatalog(true)

      try {
        const sessionResult = await supabase.auth.getSession()

        if (sessionResult.error) {
          throw sessionResult.error
        }

        if (cancelled) {
          return
        }

        setSession(sessionResult.data.session)

        const remoteCatalog = await loadRemoteCatalog()

        if (cancelled) {
          return
        }

        setCatalogData(remoteCatalog.length ? remoteCatalog : seedCatalog)
        setIsSeedFallback(remoteCatalog.length === 0)
        setSyncError('')

        if (sessionResult.data.session) {
          const adminAccess = await checkRemoteAdmin()

          if (cancelled) {
            return
          }

          setIsAdmin(adminAccess)

          if (adminAccess) {
            setIsLoadingBookings(true)

            try {
              const remoteBookings = await loadRemoteBookings()

              if (!cancelled) {
                setBookings(remoteBookings)
              }
            } finally {
              if (!cancelled) {
                setIsLoadingBookings(false)
              }
            }
          }
        }
      } catch (error) {
        if (!cancelled) {
          setCatalogData(seedCatalog)
          setIsSeedFallback(true)
          setSyncError(getErrorMessage(error))
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCatalog(false)
          setAuthReady(true)
        }
      }
    }

    bootstrap()

    const authListener = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession)

      if (!nextSession) {
        setIsAdmin(false)
        setBookings([])
        setAuthReady(true)
        return
      }

      try {
        const adminAccess = await checkRemoteAdmin()

        if (cancelled) {
          return
        }

        setIsAdmin(adminAccess)

        if (!adminAccess) {
          setBookings([])
          return
        }

        setIsLoadingBookings(true)

        try {
          const remoteBookings = await loadRemoteBookings()

          if (!cancelled) {
            setBookings(remoteBookings)
          }
        } finally {
          if (!cancelled) {
            setIsLoadingBookings(false)
          }
        }
      } catch (error) {
        if (!cancelled) {
          setSyncError(getErrorMessage(error))
          setIsAdmin(false)
          setBookings([])
        }
      }
    })

    return () => {
      cancelled = true
      authListener.data.subscription.unsubscribe()
    }
  }, [])

  const refreshCatalog = async () => {
    if (!useRemoteCatalog) {
      return catalog
    }

    setIsLoadingCatalog(true)

    try {
      const remoteCatalog = await loadRemoteCatalog()

      setCatalogData(remoteCatalog.length ? remoteCatalog : seedCatalog)
      setIsSeedFallback(remoteCatalog.length === 0)
      setSyncError('')

      return remoteCatalog.length ? remoteCatalog : seedCatalog
    } catch (error) {
      setCatalogData(seedCatalog)
      setIsSeedFallback(true)
      setSyncError(getErrorMessage(error))
      return seedCatalog
    } finally {
      setIsLoadingCatalog(false)
    }
  }

  const refreshBookings = async () => {
    if (!useRemoteCatalog || !isAdmin) {
      return bookings
    }

    setIsLoadingBookings(true)

    try {
      const remoteBookings = await loadRemoteBookings()

      setBookings(remoteBookings)
      setSyncError('')

      return remoteBookings
    } catch (error) {
      setSyncError(getErrorMessage(error))
      return bookings
    } finally {
      setIsLoadingBookings(false)
    }
  }

  const runRemoteMutation = async (mutation, nextStep) => {
    try {
      setSyncError('')
      await mutation()

      if (nextStep) {
        await nextStep()
      }

      return true
    } catch (error) {
      setSyncError(getErrorMessage(error))
      return false
    }
  }

  const addCategory = async (values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) => [
        ...currentCatalog,
        createCategoryPayload(currentCatalog, values),
      ])
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_categories')
          .insert(buildRemoteCategoryInsert(values, catalog.length, catalog))

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const updateCategory = async (categoryId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          const existingSlugs = currentCatalog
            .filter((item) => item.id !== categoryId)
            .map((item) => item.slug)

          return {
            ...category,
            slug: uniqueSlug(values.slug || values.name, existingSlugs),
            name: values.name.trim(),
            summary: values.summary.trim(),
            heroTitle: values.heroTitle.trim() || values.name.trim(),
            heroBody: values.heroBody.trim() || values.summary.trim(),
            accent: values.accent.trim() || category.accent,
          }
        }),
      )
      return true
    }

    return runRemoteMutation(
      async () => {
        const existingSlugs = catalog.filter((item) => item.id !== categoryId).map((item) => item.slug)

        const result = await supabase
          .from('repair_categories')
          .update({
            slug: uniqueSlug(values.slug || values.name, existingSlugs),
            name: values.name.trim(),
            summary: values.summary.trim(),
            hero_title: values.heroTitle.trim() || values.name.trim(),
            hero_body: values.heroBody.trim() || values.summary.trim(),
            accent: values.accent.trim() || 'Bookable repair category',
          })
          .eq('id', categoryId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const deleteCategory = async (categoryId) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) => currentCatalog.filter((category) => category.id !== categoryId))
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_categories').delete().eq('id', categoryId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const addBrand = async (categoryId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: [...category.brands, createBrandPayload(category.brands, values)],
          }
        }),
      )
      return true
    }

    const category = catalog.find((item) => item.id === categoryId)
    const existingBrands = category?.brands || []

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_brands')
          .insert(buildRemoteBrandInsert(categoryId, values, existingBrands.length, existingBrands))

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const updateBrand = async (categoryId, brandId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              const existingSlugs = category.brands
                .filter((item) => item.id !== brandId)
                .map((item) => item.slug)

              return {
                ...brand,
                slug: uniqueSlug(values.slug || values.name, existingSlugs),
                name: values.name.trim(),
                summary: values.summary.trim(),
              }
            }),
          }
        }),
      )
      return true
    }

    const category = catalog.find((item) => item.id === categoryId)
    const existingSlugs = (category?.brands || []).filter((item) => item.id !== brandId).map((item) => item.slug)

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_brands')
          .update({
            slug: uniqueSlug(values.slug || values.name, existingSlugs),
            name: values.name.trim(),
            summary: values.summary.trim(),
          })
          .eq('id', brandId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const deleteBrand = async (categoryId, brandId) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.filter((brand) => brand.id !== brandId),
          }
        }),
      )
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_brands').delete().eq('id', brandId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const addModel = async (categoryId, brandId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              return {
                ...brand,
                models: [...brand.models, createModelPayload(brand.models, values)],
              }
            }),
          }
        }),
      )
      return true
    }

    const brand = catalog.flatMap((category) => category.brands).find((item) => item.id === brandId)
    const existingModels = brand?.models || []

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_models')
          .insert(buildRemoteModelInsert(brandId, values, existingModels.length, existingModels))

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const updateModel = async (categoryId, brandId, modelId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              return {
                ...brand,
                models: brand.models.map((model) => {
                  if (model.id !== modelId) {
                    return model
                  }

                  const existingSlugs = brand.models
                    .filter((item) => item.id !== modelId)
                    .map((item) => item.slug)

                  return {
                    ...model,
                    slug: uniqueSlug(values.slug || values.name, existingSlugs),
                    name: values.name.trim(),
                    summary: values.summary.trim(),
                    turnaround: values.turnaround.trim(),
                  }
                }),
              }
            }),
          }
        }),
      )
      return true
    }

    const brand = catalog.flatMap((category) => category.brands).find((item) => item.id === brandId)
    const existingSlugs = (brand?.models || []).filter((item) => item.id !== modelId).map((item) => item.slug)

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_models')
          .update({
            slug: uniqueSlug(values.slug || values.name, existingSlugs),
            name: values.name.trim(),
            summary: values.summary.trim(),
            turnaround: values.turnaround.trim(),
          })
          .eq('id', modelId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const deleteModel = async (categoryId, brandId, modelId) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              return {
                ...brand,
                models: brand.models.filter((model) => model.id !== modelId),
              }
            }),
          }
        }),
      )
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_models').delete().eq('id', modelId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const addRepair = async (categoryId, brandId, modelId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              return {
                ...brand,
                models: brand.models.map((model) => {
                  if (model.id !== modelId) {
                    return model
                  }

                  return {
                    ...model,
                    repairs: [...model.repairs, createRepairPayload(model.repairs, values)],
                  }
                }),
              }
            }),
          }
        }),
      )
      return true
    }

    const model = catalog
      .flatMap((category) => category.brands)
      .flatMap((brand) => brand.models)
      .find((item) => item.id === modelId)
    const existingRepairs = model?.repairs || []

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_services')
          .insert(buildRemoteRepairInsert(modelId, values, existingRepairs.length, existingRepairs))

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const updateRepair = async (categoryId, brandId, modelId, repairId, values) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              return {
                ...brand,
                models: brand.models.map((model) => {
                  if (model.id !== modelId) {
                    return model
                  }

                  return {
                    ...model,
                    repairs: model.repairs.map((repair) => {
                      if (repair.id !== repairId) {
                        return repair
                      }

                      return {
                        ...repair,
                        name: values.name.trim(),
                        price: Number(values.price) || 0,
                        turnaround: values.turnaround.trim(),
                        warranty: values.warranty.trim(),
                        notes: values.notes.trim(),
                        icon: values.icon?.trim() || '',
                      }
                    }),
                  }
                }),
              }
            }),
          }
        }),
      )
      return true
    }

    const model = catalog
      .flatMap((category) => category.brands)
      .flatMap((brand) => brand.models)
      .find((item) => item.id === modelId)
    const existingSlugs = (model?.repairs || []).filter((item) => item.id !== repairId).map((item) => item.slug).filter(Boolean)

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_services')
          .update({
            slug: uniqueSlug(values.slug || values.name, existingSlugs),
            name: values.name.trim(),
            price: Number(values.price) || 0,
            turnaround: values.turnaround.trim(),
            warranty: values.warranty.trim(),
            notes: values.notes.trim(),
            icon: values.icon?.trim() || '',
          })
          .eq('id', repairId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const deleteRepair = async (categoryId, brandId, modelId, repairId) => {
    if (!useRemoteCatalog) {
      setCatalogData((currentCatalog) =>
        currentCatalog.map((category) => {
          if (category.id !== categoryId) {
            return category
          }

          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id !== brandId) {
                return brand
              }

              return {
                ...brand,
                models: brand.models.map((model) => {
                  if (model.id !== modelId) {
                    return model
                  }

                  return {
                    ...model,
                    repairs: model.repairs.filter((repair) => repair.id !== repairId),
                  }
                }),
              }
            }),
          }
        }),
      )
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_services').delete().eq('id', repairId)

        if (result.error) {
          throw result.error
        }
      },
      refreshCatalog,
    )
  }

  const saveCategoryMedia = async (categoryId, values) => {
    setMediaLibrary((currentLibrary) => setEntityMedia(currentLibrary, 'categories', categoryId, values))
    return true
  }

  const saveBrandMedia = async (brandId, values) => {
    setMediaLibrary((currentLibrary) => setEntityMedia(currentLibrary, 'brands', brandId, values))
    return true
  }

  const saveModelMedia = async (modelId, values) => {
    setMediaLibrary((currentLibrary) => setEntityMedia(currentLibrary, 'models', modelId, values))
    return true
  }

  const clearCategoryMedia = async (categoryId) => {
    setMediaLibrary((currentLibrary) => clearEntityMedia(currentLibrary, 'categories', categoryId))
    return true
  }

  const clearBrandMedia = async (brandId) => {
    setMediaLibrary((currentLibrary) => clearEntityMedia(currentLibrary, 'brands', brandId))
    return true
  }

  const clearModelMedia = async (modelId) => {
    setMediaLibrary((currentLibrary) => clearEntityMedia(currentLibrary, 'models', modelId))
    return true
  }

  const createBooking = async (values) => {
    if (!useRemoteCatalog) {
      const booking = {
        id: createId('booking'),
        status: 'new',
        submittedAt: new Date().toISOString(),
        ...values,
      }

      setBookings((currentBookings) => [booking, ...currentBookings])
      return booking
    }

    const result = await supabase
      .from('repair_bookings')
      .insert({
        category_id: isSeedFallback ? null : values.categoryId || null,
        brand_id: isSeedFallback ? null : values.brandId || null,
        model_id: isSeedFallback ? null : values.modelId || null,
        repair_service_id: isSeedFallback ? null : values.repairId || null,
        category_name: values.category,
        brand_name: values.brand,
        model_name: values.model,
        repair_name: values.repair,
        estimated_price: Number(values.estimatedPrice) || 0,
        turnaround: values.turnaround || null,
        customer_name: values.customerName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        preferred_contact: values.preferredContact,
        preferred_window: values.preferredWindow,
        message: values.message.trim() || null,
      })
      .select('*')
      .single()

    if (result.error) {
      setSyncError(getErrorMessage(result.error))
      throw result.error
    }

    const booking = mapBookingRow(result.data)

    if (isAdmin) {
      setBookings((currentBookings) => [booking, ...currentBookings])
    }

    setSyncError('')
    return booking
  }

  const updateBookingStatus = async (bookingId, status) => {
    if (!useRemoteCatalog) {
      setBookings((currentBookings) =>
        currentBookings.map((booking) => (
          booking.id === bookingId ? { ...booking, status } : booking
        )),
      )
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase
          .from('repair_bookings')
          .update({ status })
          .eq('id', bookingId)

        if (result.error) {
          throw result.error
        }
      },
      refreshBookings,
    )
  }

  const deleteBooking = async (bookingId) => {
    if (!useRemoteCatalog) {
      setBookings((currentBookings) => currentBookings.filter((booking) => booking.id !== bookingId))
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_bookings').delete().eq('id', bookingId)

        if (result.error) {
          throw result.error
        }
      },
      refreshBookings,
    )
  }

  const importSeedCatalog = async () => {
    if (!useRemoteCatalog) {
      setCatalogData(seedCatalog)
      return true
    }

    return runRemoteMutation(
      async () => {
        for (const [categoryIndex, category] of seedCatalog.entries()) {
          const categoryResult = await supabase
            .from('repair_categories')
            .insert(buildRemoteCategoryInsert(category, categoryIndex, seedCatalog.slice(0, categoryIndex)))
            .select('id')
            .single()

          if (categoryResult.error) {
            throw categoryResult.error
          }

          for (const [brandIndex, brand] of category.brands.entries()) {
            const brandResult = await supabase
              .from('repair_brands')
              .insert(buildRemoteBrandInsert(categoryResult.data.id, brand, brandIndex, category.brands.slice(0, brandIndex)))
              .select('id')
              .single()

            if (brandResult.error) {
              throw brandResult.error
            }

            for (const [modelIndex, model] of brand.models.entries()) {
              const modelResult = await supabase
                .from('repair_models')
                .insert(buildRemoteModelInsert(brandResult.data.id, model, modelIndex, brand.models.slice(0, modelIndex)))
                .select('id')
                .single()

              if (modelResult.error) {
                throw modelResult.error
              }

              for (const [repairIndex, repair] of model.repairs.entries()) {
                const repairResult = await supabase
                  .from('repair_services')
                  .insert(buildRemoteRepairInsert(modelResult.data.id, repair, repairIndex, model.repairs.slice(0, repairIndex)))

                if (repairResult.error) {
                  throw repairResult.error
                }
              }
            }
          }
        }
      },
      refreshCatalog,
    )
  }

  const resetCatalog = async () => {
    if (!useRemoteCatalog) {
      setCatalogData(seedCatalog)
      return true
    }

    const deleted = await runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_categories').delete().not('id', 'is', null)

        if (result.error) {
          throw result.error
        }
      },
    )

    if (!deleted) {
      return false
    }

    return importSeedCatalog()
  }

  const clearBookings = async () => {
    if (!useRemoteCatalog) {
      setBookings([])
      return true
    }

    return runRemoteMutation(
      async () => {
        const result = await supabase.from('repair_bookings').delete().not('id', 'is', null)

        if (result.error) {
          throw result.error
        }
      },
      refreshBookings,
    )
  }

  const requestAdminMagicLink = async (email) => {
    if (!useRemoteCatalog) {
      return true
    }

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail) {
      setSyncError('Enter the admin email address first.')
      return false
    }

    const result = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: typeof window === 'undefined' ? undefined : `${window.location.origin}/admin`,
      },
    })

    if (result.error) {
      setSyncError(getErrorMessage(result.error))
      return false
    }

    setSyncError('')
    return true
  }

  const signOutAdmin = async () => {
    if (!useRemoteCatalog) {
      return true
    }

    const result = await supabase.auth.signOut()

    if (result.error) {
      setSyncError(getErrorMessage(result.error))
      return false
    }

    setSession(null)
    setIsAdmin(false)
    setBookings([])
    return true
  }

  const value = {
    authReady,
    bookings,
    catalog,
    clearBrandMedia,
    clearBookings,
    clearCategoryMedia,
    clearModelMedia,
    createBooking,
    dataSource: useRemoteCatalog ? 'supabase' : 'local',
    deleteBooking,
    deleteBrand,
    deleteCategory,
    deleteModel,
    deleteRepair,
    importSeedCatalog,
    isAdmin,
    isConfigured: isSupabaseConfigured,
    isLoadingBookings,
    isLoadingCatalog,
    mediaLibrary,
    isRemote: useRemoteCatalog,
    isSeedFallback,
    refreshCatalog,
    refreshBookings,
    requestAdminMagicLink,
    resetCatalog,
    saveBrandMedia,
    saveCategoryMedia,
    saveModelMedia,
    session,
    signOutAdmin,
    syncError,
    updateBookingStatus,
    updateBrand,
    updateCategory,
    updateModel,
    updateRepair,
    addBrand,
    addCategory,
    addModel,
    addRepair,
  }

  return (
    <RepairCatalogContext.Provider value={value}>
      {children}
    </RepairCatalogContext.Provider>
  )
}

export function useRepairCatalog() {
  const context = useContext(RepairCatalogContext)

  if (!context) {
    throw new Error('useRepairCatalog must be used within RepairCatalogProvider')
  }

  return context
}