import { describe, expect, it } from 'vitest'
import { getBrandMark, getRepairVisualKey } from '../utils/catalogVisuals'
import { seedCatalog } from './repairCatalog'

describe('seedCatalog', () => {
  it('ships a broad phone brand lineup instead of only a few brands', () => {
    const phoneCategory = seedCatalog.find((category) => category.slug === 'phones')

    expect(phoneCategory).toBeDefined()
    expect(phoneCategory.brands).toHaveLength(9)
    expect(phoneCategory.brands.map((brand) => brand.slug)).toEqual(
      expect.arrayContaining(['apple', 'samsung', 'google', 'oneplus', 'xiaomi', 'oppo', 'huawei', 'motorola', 'nokia']),
    )
  })
})

describe('catalog visuals', () => {
  it('maps brand badges and repair icon families predictably', () => {
    expect(getBrandMark('oneplus')).toBe('1+')
    expect(getRepairVisualKey('HDMI Port Repair')).toBe('hdmi')
    expect(getRepairVisualKey('Cooling Service & Deep Clean')).toBe('cooling')
    expect(getRepairVisualKey('Full Diagnostic Service')).toBe('diagnostic')
  })
})