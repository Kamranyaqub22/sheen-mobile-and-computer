import {
  getBrandMark,
  getBrandTheme,
  getCategoryTheme,
  getDeviceVariant,
  getRepairPalette,
  getRepairVisualKey,
} from '../utils/catalogVisuals'

function renderRepairPath(key, className) {
  switch (key) {
    case 'screen':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2.5" />
          <path d="M9 8l2.2 2.6-2.2 2.8H13l-2 2.6" />
        </svg>
      )
    case 'battery':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="7" width="16" height="10" rx="2" />
          <path d="M21 10v4" />
          <path d="M10 9l-2 4h3l-1 4 4-6h-3l1-2" />
        </svg>
      )
    case 'charging':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 4v5" />
          <path d="M11 4v5" />
          <path d="M9 9v4" />
          <path d="M6 13h6" />
          <path d="M12 13c0 3.3 2.7 6 6 6" />
          <path d="M18 19v-2.5" />
        </svg>
      )
    case 'camera':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 8h4l1.4-2h5.2L16 8h4v10H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      )
    case 'glass':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M12 4v16" />
          <path d="M12 12l4-4" />
          <path d="M12 12l-5 5" />
          <path d="M12 12l3 6" />
        </svg>
      )
    case 'liquid':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c2.8 3.5 4.5 5.8 4.5 8.2A4.5 4.5 0 0 1 12 15.7a4.5 4.5 0 0 1-4.5-4.5C7.5 8.8 9.2 6.5 12 3z" />
          <path d="M14 13l-4 5h3l-1 3 4-6h-3l1-2" />
        </svg>
      )
    case 'speaker':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 14h4l5 4V6L9 10H5z" />
          <path d="M18 9c1.5 1 2.5 2.6 2.5 4s-1 3-2.5 4" />
        </svg>
      )
    case 'microphone':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="4" width="6" height="10" rx="3" />
          <path d="M7 11a5 5 0 0 0 10 0" />
          <path d="M12 16v4" />
          <path d="M9 20h6" />
        </svg>
      )
    case 'keyboard':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M7 10h.01" />
          <path d="M11 10h.01" />
          <path d="M15 10h.01" />
          <path d="M7 14h10" />
        </svg>
      )
    case 'storage':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h6" />
          <path d="M9 12h6" />
          <path d="M9 15h3" />
        </svg>
      )
    case 'software':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="5" width="16" height="11" rx="2" />
          <path d="M8 19h8" />
          <path d="M12 16v3" />
          <path d="M13.7 9.8l.7-.8-.8-1.3-1 .2-.5-.6-1 .2-.2 1-.7.6.1 1 .8.4.2 1 1 .3.8-.6 1 .2.7-1.2-.6-.8.1-.6z" />
        </svg>
      )
    case 'cooling':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 4c2.2 0 3.4 2.5 2.2 4.4L12 12" />
          <path d="M5.3 8c1.1-1.9 3.8-1.8 4.9.1L12 12" />
          <path d="M6 16c-1.1-1.9.4-4.2 2.6-4L12 12" />
          <path d="M18.7 16c-1.1 1.9-3.8 1.8-4.9-.1L12 12" />
          <path d="M18 8c1.1 1.9-.4 4.2-2.6 4L12 12" />
        </svg>
      )
    case 'hdmi':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 7h12l2 4-2 6H6l-2-6z" />
          <path d="M9 10h6" />
          <path d="M10 13h1" />
          <path d="M13 13h1" />
        </svg>
      )
    case 'power':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v7" />
          <path d="M7.5 5.5a8 8 0 1 0 9 0" />
        </svg>
      )
    case 'diagnostic':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="10" cy="10" r="4" />
          <path d="M14 14l6 6" />
          <path d="M10 8v4" />
          <path d="M8 10h4" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.5 5.5l4 4" />
          <path d="M3 21l6-2 9-9-4-4-9 9z" />
          <path d="M12 8l4 4" />
        </svg>
      )
  }
}

function renderDevice(variant, theme) {
  const frame = '#f8fafc'
  const screen = '#0f172a'

  switch (variant) {
    case 'phone-triple':
    case 'phone-dual':
    case 'phone-stack':
    case 'phone-rugged':
    case 'phone-bar':
    case 'phone-fold':
      return (
        <>
          {variant === 'phone-fold' ? (
            <>
              <rect x="86" y="34" width="64" height="150" rx="18" fill={theme.glow} opacity="0.92" />
              <rect x="153" y="34" width="64" height="150" rx="18" fill={theme.ink} opacity="0.96" />
              <rect x="92" y="40" width="52" height="138" rx="14" fill={screen} />
              <rect x="159" y="40" width="52" height="138" rx="14" fill={screen} />
            </>
          ) : (
            <>
              <rect x={variant === 'phone-rugged' ? '98' : '104'} y="22" width={variant === 'phone-rugged' ? '124' : '112'} height="176" rx={variant === 'phone-rugged' ? '22' : '28'} fill={frame} opacity="0.96" />
              <rect x={variant === 'phone-rugged' ? '108' : '112'} y="30" width={variant === 'phone-rugged' ? '104' : '96'} height="160" rx="20" fill={screen} />
            </>
          )}
          {variant === 'phone-bar' ? (
            <>
              <rect x="116" y="48" width="88" height="20" rx="10" fill="rgba(255,255,255,0.84)" />
              <circle cx="134" cy="58" r="5.5" fill={theme.start} />
              <circle cx="150" cy="58" r="5.5" fill={theme.start} />
              <circle cx="185" cy="58" r="4.5" fill={theme.start} opacity="0.7" />
            </>
          ) : null}
          {variant === 'phone-stack' ? (
            <>
              <circle cx="128" cy="56" r="7" fill="rgba(255,255,255,0.88)" />
              <circle cx="128" cy="78" r="7" fill="rgba(255,255,255,0.88)" />
              <circle cx="128" cy="100" r="7" fill="rgba(255,255,255,0.88)" />
            </>
          ) : null}
          {variant === 'phone-triple' ? (
            <>
              <circle cx="132" cy="58" r="7" fill="rgba(255,255,255,0.88)" />
              <circle cx="156" cy="58" r="7" fill="rgba(255,255,255,0.88)" />
              <circle cx="144" cy="80" r="7" fill="rgba(255,255,255,0.88)" />
            </>
          ) : null}
          {variant === 'phone-dual' || variant === 'phone-rugged' ? (
            <>
              <circle cx="134" cy="58" r="7" fill="rgba(255,255,255,0.88)" />
              <circle cx="158" cy="58" r="7" fill="rgba(255,255,255,0.88)" />
            </>
          ) : null}
        </>
      )
    case 'laptop-gaming':
    case 'laptop':
      return (
        <>
          <rect x="64" y="44" width="192" height="102" rx="14" fill="#e5e7eb" opacity="0.94" />
          <rect x="76" y="56" width="168" height="78" rx="9" fill={variant === 'laptop-gaming' ? '#020617' : '#0f172a'} />
          <path d="M48 156h224l-16 26H64z" fill="rgba(255,255,255,0.9)" />
          <rect x="122" y="168" width="76" height="8" rx="4" fill="rgba(15,23,42,0.12)" />
          {variant === 'laptop-gaming' ? <path d="M94 116l28-28 24 20 26-24 34 30" stroke={theme.glow} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /> : null}
        </>
      )
    case 'tablet-compact':
    case 'tablet':
      return (
        <>
          <rect x={variant === 'tablet-compact' ? '84' : '72'} y="28" width={variant === 'tablet-compact' ? '152' : '176'} height={variant === 'tablet-compact' ? '166' : '154'} rx="24" fill="rgba(255,255,255,0.94)" />
          <rect x={variant === 'tablet-compact' ? '94' : '84'} y="40" width={variant === 'tablet-compact' ? '132' : '152'} height={variant === 'tablet-compact' ? '142' : '130'} rx="18" fill="#0f172a" />
          {variant === 'tablet' ? <path d="M252 54l16 70" stroke="rgba(255,255,255,0.86)" strokeWidth="8" strokeLinecap="round" /> : null}
        </>
      )
    case 'console-handheld':
      return (
        <>
          <rect x="58" y="78" width="204" height="72" rx="24" fill="rgba(255,255,255,0.9)" />
          <rect x="104" y="88" width="112" height="52" rx="12" fill="#0f172a" />
          <circle cx="82" cy="114" r="12" fill={theme.start} />
          <circle cx="238" cy="114" r="12" fill={theme.end} />
          <path d="M80 108v12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M74 114h12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )
    case 'console-tower':
      return (
        <>
          <rect x="116" y="36" width="82" height="152" rx="18" fill="rgba(255,255,255,0.92)" />
          <rect x="130" y="48" width="54" height="128" rx="10" fill="#0f172a" />
          <path d="M204 64l26 102" stroke="rgba(255,255,255,0.75)" strokeWidth="12" strokeLinecap="round" />
          <circle cx="157" cy="160" r="6" fill={theme.glow} />
        </>
      )
    case 'console-box':
      return (
        <>
          <rect x="72" y="76" width="176" height="92" rx="24" fill="rgba(255,255,255,0.92)" />
          <rect x="88" y="92" width="144" height="60" rx="16" fill="#0f172a" />
          <circle cx="206" cy="122" r="9" fill={theme.glow} />
        </>
      )
    case 'console-slim':
      return (
        <>
          <rect x="72" y="92" width="176" height="58" rx="20" fill="rgba(255,255,255,0.9)" />
          <rect x="88" y="104" width="144" height="34" rx="12" fill="#0f172a" />
          <circle cx="212" cy="121" r="4" fill={theme.glow} />
        </>
      )
    default:
      return <circle cx="160" cy="110" r="48" fill="rgba(255,255,255,0.6)" />
  }
}

export function BrandBadge({ brand, category, compact = false, iconOnly = false, className = '' }) {
  if (!brand) {
    return null
  }

  const categorySlug = category?.slug || ''
  const theme = getBrandTheme(brand.slug, categorySlug)
  const sizeClasses = compact ? 'gap-2 px-3 py-2 text-xs' : 'gap-3 px-4 py-2.5 text-sm'
  const hasLogo = Boolean(brand.logoUrl)

  if (hasLogo) {
    return (
      <div
        className={`catalog-badge inline-flex items-center rounded-full border bg-white/94 ${sizeClasses} ${className}`}
        style={{
          borderColor: 'rgba(28,27,26,0.08)',
          color: 'var(--color-ink)',
        }}
      >
        <span
          className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-white ${compact ? 'h-7 w-7 p-1.5' : 'h-8 w-8 p-1.5'}`}
          style={{ boxShadow: '0 8px 18px rgba(17, 24, 39, 0.1)' }}
        >
          <img
            src={brand.logoUrl}
            alt={brand.logoAlt || `${brand.name} logo`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </span>
        {!iconOnly ? <span className="font-semibold">{brand.name}</span> : null}
      </div>
    )
  }

  return (
    <div
      className={`catalog-badge inline-flex items-center rounded-full border ${sizeClasses} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`,
        borderColor: 'rgba(255,255,255,0.28)',
        color: theme.ink,
      }}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full font-black tracking-[0.12em] ${compact ? 'h-7 w-7 text-[0.65rem]' : 'h-8 w-8 text-[0.7rem]'}`}
        style={{ backgroundColor: 'rgba(255,255,255,0.16)', color: theme.glow }}
      >
        {getBrandMark(brand.slug, brand.name)}
      </span>
      {!iconOnly ? <span className="font-semibold">{brand.name}</span> : null}
    </div>
  )
}

export function ProductArtwork({ category, brand, model, className = '', showLabel = true, showBadge = true }) {
  const categorySlug = category?.slug || ''
  const brandSlug = brand?.slug || ''
  const modelSlug = model?.slug || ''
  const categoryTheme = getCategoryTheme(categorySlug)
  const brandTheme = getBrandTheme(brandSlug, categorySlug)
  const variant = getDeviceVariant(categorySlug, brandSlug, modelSlug)
  const imageUrl = model?.imageUrl || category?.imageUrl || ''
  const imageAlt = model?.imageAlt || category?.imageAlt || `${model?.name || category?.name || 'Device'} repair image`

  if (imageUrl) {
    return (
      <div className={`visual-frame relative isolate min-h-[13rem] overflow-hidden bg-[var(--color-navy-dark)] ${className}`}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,25,0.06)_0%,rgba(10,16,25,0.32)_38%,rgba(10,16,25,0.76)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] opacity-70" />
        {showBadge && brand ? <BrandBadge brand={brand} category={category} iconOnly compact className="absolute right-4 top-4 z-[1]" /> : null}
        <div className="absolute left-4 top-4 z-[1] rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
          {brand?.name || category?.name}
        </div>
        {showLabel ? (
          <div className="absolute inset-x-4 bottom-4 z-[1] rounded-[22px] border border-white/14 bg-black/28 px-4 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/65">{category?.name || 'Repair service'}</div>
            <div className="mt-2 text-base font-bold leading-tight">{model?.name || category?.heroTitle || category?.name}</div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={`visual-frame relative min-h-[13rem] ${className}`}
      style={{
        background: `linear-gradient(135deg, ${brandTheme.start} 0%, ${categoryTheme.end} 100%)`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-24 opacity-40" style={{ background: `radial-gradient(circle at top, ${brandTheme.glow} 0%, transparent 70%)` }} />
      {showBadge && brand ? <BrandBadge brand={brand} category={category} iconOnly compact className="absolute right-4 top-4 z-[1]" /> : null}
      <svg viewBox="0 0 320 220" className="relative h-full w-full" role="img" aria-label={model ? `${model.name} illustration` : `${category?.name || 'Device'} illustration`}>
        <defs>
          <linearGradient id={`catalog-art-${categorySlug || 'default'}-${brandSlug || 'default'}-${modelSlug || 'default'}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={brandTheme.glow} stopOpacity="0.54" />
            <stop offset="100%" stopColor={brandTheme.end} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect x="16" y="16" width="288" height="188" rx="30" fill={`url(#catalog-art-${categorySlug || 'default'}-${brandSlug || 'default'}-${modelSlug || 'default'})`} />
        {renderDevice(variant, brandTheme)}
      </svg>
      {showLabel ? (
        <div className="absolute inset-x-4 bottom-4 z-[1] rounded-2xl border border-white/18 bg-black/18 px-4 py-3 text-white backdrop-blur-sm">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/70">{brand?.name || category?.name}</div>
          <div className="mt-1 text-sm font-semibold leading-tight">{model?.name || category?.heroTitle || category?.name}</div>
        </div>
      ) : null}
    </div>
  )
}

export function CategoryArtwork({ category, className = '' }) {
  const firstBrand = category?.brands?.[0] || null
  const firstModel = firstBrand?.models?.[0] || null

  return (
    <ProductArtwork
      category={category}
      brand={firstBrand}
      model={firstModel}
      showBadge={false}
      showLabel={false}
      className={className}
    />
  )
}

export function RepairGlyph({ repairName, className = 'h-4 w-4' }) {
  return renderRepairPath(getRepairVisualKey(repairName), className)
}

export function RepairTypeBadge({ repair, compact = false, showLabel = true, className = '' }) {
  const repairName = typeof repair === 'string' ? repair : repair?.name || ''
  const palette = getRepairPalette(repairName)
  const sizeClasses = compact ? 'gap-2 px-3 py-1.5 text-xs' : 'gap-3 px-4 py-2 text-sm'

  return (
    <div className={`repair-pill inline-flex items-center rounded-full border border-[var(--color-border)] bg-white/90 ${sizeClasses} ${className}`}>
      <span
        className={`inline-flex items-center justify-center rounded-full text-white ${compact ? 'h-7 w-7' : 'h-8 w-8'}`}
        style={{ background: `linear-gradient(135deg, ${palette.start} 0%, ${palette.end} 100%)` }}
      >
        <RepairGlyph repairName={repairName} className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </span>
      {showLabel ? <span className="font-semibold text-[var(--color-ink)]">{repairName}</span> : null}
    </div>
  )
}