import { describe, expect, it } from 'vitest'
import { applyMediaOverrides, setEntityMedia } from './mediaLibrary'

const baseCatalog = [
  {
    id: 'category-1',
    slug: 'phones',
    name: 'Phones',
    imageUrl: '/media/phone-repair.png',
    imageAlt: 'Phone repairs',
    brands: [
      {
        id: 'brand-1',
        slug: 'apple',
        name: 'Apple',
        logoUrl: '',
        logoAlt: 'Apple logo',
        models: [
          {
            id: 'model-1',
            slug: 'iphone-15',
            name: 'iPhone 15',
            imageUrl: '',
            imageAlt: 'iPhone 15 repair image',
            repairs: [],
          },
        ],
      },
    ],
  },
]

describe('mediaLibrary helpers', () => {
  it('overlays uploaded brand and model media on top of the catalog', () => {
    const library = setEntityMedia(
      setEntityMedia(undefined, 'brands', 'brand-1', { logoUrl: 'data:image/webp;base64,brand-logo', logoAlt: 'Apple wordmark' }),
      'models',
      'model-1',
      { imageUrl: 'data:image/webp;base64,model-photo', imageAlt: 'Front view of an iPhone 15' },
    )

    const [category] = applyMediaOverrides(baseCatalog, library)

    expect(category.brands[0].logoUrl).toBe('data:image/webp;base64,brand-logo')
    expect(category.brands[0].models[0].imageUrl).toBe('data:image/webp;base64,model-photo')
    expect(category.brands[0].models[0].imageAlt).toBe('Front view of an iPhone 15')
  })

  it('falls back to the category photo for models without their own image', () => {
    const [category] = applyMediaOverrides(baseCatalog, {})

    expect(category.brands[0].models[0].imageUrl).toBe('/media/phone-repair.png')
  })
})
