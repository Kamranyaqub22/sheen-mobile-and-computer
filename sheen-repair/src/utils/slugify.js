export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function uniqueSlug(value, existingSlugs = []) {
  const baseSlug = slugify(value) || 'item'

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }

  let suffix = 2
  while (existingSlugs.includes(`${baseSlug}-${suffix}`)) {
    suffix += 1
  }

  return `${baseSlug}-${suffix}`
}