const CATEGORY_THEMES = {
  phones: {
    start: '#111827',
    end: '#f97316',
    accent: '#fb923c',
    surface: '#fff7ed',
  },
  'laptops-macbooks': {
    start: '#1e293b',
    end: '#0ea5e9',
    accent: '#38bdf8',
    surface: '#eff6ff',
  },
  tablets: {
    start: '#164e63',
    end: '#14b8a6',
    accent: '#2dd4bf',
    surface: '#ecfeff',
  },
  'game-consoles': {
    start: '#111827',
    end: '#8b5cf6',
    accent: '#a78bfa',
    surface: '#f5f3ff',
  },
  default: {
    start: '#1f2937',
    end: '#f97316',
    accent: '#fb923c',
    surface: '#fff7ed',
  },
}

const BRAND_THEMES = {
  apple: { mark: 'A', start: '#111827', end: '#475569', glow: '#e2e8f0', ink: '#f8fafc' },
  samsung: { mark: 'S', start: '#0f3a7f', end: '#3b82f6', glow: '#dbeafe', ink: '#eff6ff' },
  google: { mark: 'G', start: '#2563eb', end: '#34a853', glow: '#fef3c7', ink: '#eff6ff' },
  oneplus: { mark: '1+', start: '#b91c1c', end: '#ef4444', glow: '#fee2e2', ink: '#fff1f2' },
  xiaomi: { mark: 'MI', start: '#f97316', end: '#fb923c', glow: '#ffedd5', ink: '#fff7ed' },
  oppo: { mark: 'OP', start: '#047857', end: '#34d399', glow: '#d1fae5', ink: '#ecfdf5' },
  huawei: { mark: 'HW', start: '#7f1d1d', end: '#dc2626', glow: '#fee2e2', ink: '#fff1f2' },
  motorola: { mark: 'M', start: '#1d4ed8', end: '#06b6d4', glow: '#dbeafe', ink: '#eff6ff' },
  nokia: { mark: 'N', start: '#1e3a8a', end: '#38bdf8', glow: '#e0f2fe', ink: '#eff6ff' },
  dell: { mark: 'D', start: '#0f172a', end: '#0ea5e9', glow: '#e0f2fe', ink: '#f8fafc' },
  lenovo: { mark: 'L', start: '#7c2d12', end: '#f97316', glow: '#ffedd5', ink: '#fff7ed' },
  hp: { mark: 'HP', start: '#0f172a', end: '#0f766e', glow: '#ccfbf1', ink: '#ecfeff' },
  asus: { mark: 'AS', start: '#1e293b', end: '#4f46e5', glow: '#e0e7ff', ink: '#eef2ff' },
  acer: { mark: 'AC', start: '#14532d', end: '#84cc16', glow: '#ecfccb', ink: '#f7fee7' },
  microsoft: { mark: 'MS', start: '#0f172a', end: '#16a34a', glow: '#dcfce7', ink: '#f0fdf4' },
  amazon: { mark: 'AM', start: '#0f172a', end: '#f59e0b', glow: '#fef3c7', ink: '#fffbeb' },
  sony: { mark: 'SY', start: '#111827', end: '#4f46e5', glow: '#e0e7ff', ink: '#eef2ff' },
  nintendo: { mark: 'NS', start: '#b91c1c', end: '#f87171', glow: '#fee2e2', ink: '#fff1f2' },
}

const REPAIR_PALETTES = {
  screen: { start: '#0f172a', end: '#475569' },
  battery: { start: '#14532d', end: '#22c55e' },
  charging: { start: '#0f766e', end: '#14b8a6' },
  camera: { start: '#1d4ed8', end: '#60a5fa' },
  glass: { start: '#7c2d12', end: '#f97316' },
  liquid: { start: '#1d4ed8', end: '#06b6d4' },
  speaker: { start: '#581c87', end: '#a855f7' },
  microphone: { start: '#701a75', end: '#d946ef' },
  keyboard: { start: '#1f2937', end: '#6b7280' },
  storage: { start: '#7c3aed', end: '#a78bfa' },
  software: { start: '#4338ca', end: '#818cf8' },
  cooling: { start: '#0f766e', end: '#2dd4bf' },
  hdmi: { start: '#0f172a', end: '#38bdf8' },
  power: { start: '#991b1b', end: '#fb7185' },
  diagnostic: { start: '#7c2d12', end: '#f59e0b' },
  generic: { start: '#334155', end: '#94a3b8' },
}

function getInitials(value) {
  const parts = String(value || '').trim().split(/\s+/).filter(Boolean)

  if (!parts.length) {
    return 'BR'
  }

  return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export function getCategoryTheme(categorySlug = '') {
  return CATEGORY_THEMES[categorySlug] || CATEGORY_THEMES.default
}

export function getBrandTheme(brandSlug = '', categorySlug = '') {
  const categoryTheme = getCategoryTheme(categorySlug)
  const theme = BRAND_THEMES[brandSlug]

  if (!theme) {
    return {
      mark: getInitials(brandSlug),
      start: categoryTheme.start,
      end: categoryTheme.end,
      glow: categoryTheme.accent,
      ink: '#fff7ed',
    }
  }

  return theme
}

export function getBrandMark(brandSlug = '', brandName = '') {
  return BRAND_THEMES[brandSlug]?.mark || getInitials(brandName || brandSlug)
}

export function getDeviceVariant(categorySlug = '', brandSlug = '', modelSlug = '') {
  const normalizedSlug = String(modelSlug || '').toLowerCase()

  if (categorySlug === 'phones') {
    if (normalizedSlug.includes('fold')) {
      return 'phone-fold'
    }

    if (brandSlug === 'google') {
      return 'phone-bar'
    }

    if (brandSlug === 'samsung') {
      return 'phone-stack'
    }

    if (normalizedSlug.includes('pro') || normalizedSlug.includes('p60')) {
      return 'phone-triple'
    }

    if (normalizedSlug.includes('xr') || normalizedSlug.includes('rugged')) {
      return 'phone-rugged'
    }

    return 'phone-dual'
  }

  if (categorySlug === 'laptops-macbooks') {
    if (normalizedSlug.includes('rog') || normalizedSlug.includes('nitro')) {
      return 'laptop-gaming'
    }

    return 'laptop'
  }

  if (categorySlug === 'tablets') {
    if (normalizedSlug.includes('fire')) {
      return 'tablet-compact'
    }

    return 'tablet'
  }

  if (categorySlug === 'game-consoles') {
    if (normalizedSlug.includes('switch') || normalizedSlug.includes('deck')) {
      return 'console-handheld'
    }

    if (normalizedSlug.includes('playstation-5') || normalizedSlug.includes('series-x')) {
      return 'console-tower'
    }

    if (normalizedSlug.includes('xbox')) {
      return 'console-box'
    }

    return 'console-slim'
  }

  return 'generic'
}

export function getRepairVisualKey(repairName = '') {
  const normalizedName = String(repairName || '').toLowerCase()

  if (normalizedName.includes('hdmi')) {
    return 'hdmi'
  }

  if (normalizedName.includes('screen')) {
    return 'screen'
  }

  if (normalizedName.includes('glass')) {
    return 'glass'
  }

  if (normalizedName.includes('battery')) {
    return 'battery'
  }

  if (normalizedName.includes('charging') || normalizedName.includes('charge') || normalizedName.includes('dock')) {
    return 'charging'
  }

  if (normalizedName.includes('camera') || normalizedName.includes('lens')) {
    return 'camera'
  }

  if (normalizedName.includes('liquid') || normalizedName.includes('water')) {
    return 'liquid'
  }

  if (normalizedName.includes('speaker') || normalizedName.includes('audio')) {
    return 'speaker'
  }

  if (normalizedName.includes('microphone') || normalizedName.includes('mic')) {
    return 'microphone'
  }

  if (normalizedName.includes('keyboard')) {
    return 'keyboard'
  }

  if (normalizedName.includes('ssd') || normalizedName.includes('storage')) {
    return 'storage'
  }

  if (normalizedName.includes('windows') || normalizedName.includes('software') || normalizedName.includes('recovery') || normalizedName.includes('tune-up')) {
    return 'software'
  }

  if (normalizedName.includes('cooling') || normalizedName.includes('fan') || normalizedName.includes('clean')) {
    return 'cooling'
  }

  if (normalizedName.includes('power')) {
    return 'power'
  }

  if (normalizedName.includes('diagnostic')) {
    return 'diagnostic'
  }

  return 'generic'
}

export function getRepairPalette(repairName = '') {
  return REPAIR_PALETTES[getRepairVisualKey(repairName)] || REPAIR_PALETTES.generic
}