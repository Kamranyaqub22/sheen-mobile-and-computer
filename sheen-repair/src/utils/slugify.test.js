import { describe, expect, it } from 'vitest'
import { slugify, uniqueSlug } from './slugify'

describe('slugify', () => {
  it('normalizes names into clean URL slugs', () => {
    expect(slugify("MacBook Pro 14'' M3")).toBe('macbook-pro-14-m3')
    expect(slugify('  iPhone 15 Pro Max  ')).toBe('iphone-15-pro-max')
  })

  it('creates a unique slug when the base slug already exists', () => {
    expect(uniqueSlug('Apple', ['apple', 'apple-2'])).toBe('apple-3')
  })
})