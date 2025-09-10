export const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export const readHue = (root = document.documentElement) => {
  const v = getComputedStyle(root).getPropertyValue('--hue') || '240'
  return parseInt(v, 10) || 240
}

export const readSat = (root = document.documentElement) => {
  const v = getComputedStyle(root).getPropertyValue('--sat') || '60'
  return parseInt(v, 10) || 60
}

export const computeHues = (h) => ({
  secondaryHue: (h + 180) % 360,
  accentHue: (h + 60) % 360
})

export const computeColors = (h, s, isDark) => {
  const { secondaryHue, accentHue } = computeHues(h)
  const primary = `hsl(${h} ${s}% 50%)`
  const secondary = `hsl(${secondaryHue} ${s}% 50%)`
  const accent = `hsl(${accentHue} ${s}% 60%)`

  const satBg = Math.round(
    isDark
      ? clamp(6 + s * 0.25, 12, 35)
      : clamp(10 + s * 0.6, 18, 60)
  )
  const satSurface = Math.round(
    isDark
      ? clamp(8 + s * 0.2, 10, 30)
      : clamp(10 + s * 0.5, 15, 50)
  )
  const lightBg = isDark ? 8 : 90
  const lightSurface = isDark ? 12 : 94
  const alphaSurface = isDark ? 0.68 : 0.88
  const bg = `hsl(${h} ${satBg}% ${lightBg}%)`
  const surface = `hsl(${h} ${satSurface}% ${lightSurface}% / ${alphaSurface})`

  const satText = Math.round(clamp(s * 0.1, 5, 20))
  const text = isDark ? `hsl(${h} 5% 95%)` : `hsl(${h} ${satText}% 15%)`
  const textMuted = isDark ? `hsl(${h} 8% 80%)` : `hsl(${h} ${Math.round(clamp(s * 0.1, 6, 20))}% 35%)`
  const sInc = Math.min(100, s + 10)
  const link = isDark ? `hsl(${h} ${s}% 70%)` : `hsl(${h} ${s}% 50%)`
  const linkHover = isDark ? `hsl(${h} ${sInc}% 75%)` : `hsl(${h} ${sInc}% 45%)`

  return {
    primary, secondary, accent,
    bg, surface, text, textMuted,
    link, linkHover, secondaryHue, accentHue
  }
}

let lastApplied = { h: undefined, s: undefined, dark: undefined }
export const applyTheme = (h, s, isDark, root = document.documentElement) => {
  if (lastApplied.h === h && lastApplied.s === s && lastApplied.dark === isDark) return
  lastApplied = { h, s, dark: isDark }
  const c = computeColors(h, s, isDark)
  const vars = {
    '--hue': String(h),
    '--sat': String(s),
    '--hue-secondary': String(c.secondaryHue),
    '--hue-accent': String(c.accentHue),
    '--primary': c.primary,
    '--secondary': c.secondary,
    '--accent': c.accent,
    '--bg': c.bg,
    '--surface': c.surface,
    '--text': c.text,
    '--text-muted': c.textMuted,
    '--link': c.link,
    '--link-hover': c.linkHover
  }
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v)
}

export const setThemeAttr = (isDark, root = document.documentElement) => {
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export const detectMode = (darkOpt, root = document.documentElement) => {
  if (typeof darkOpt === 'boolean') return darkOpt
  return (root.getAttribute('data-theme') || '').toLowerCase() === 'dark'
}

export const initTheme = (h, s, darkOpt, root = document.documentElement) => {
  const hue = typeof h === 'number' ? clamp(Math.round(h), 0, 360) : readHue(root)
  const sat = typeof s === 'number' ? clamp(Math.round(s), 0, 100) : readSat(root)
  const isDark = detectMode(darkOpt, root)
  setThemeAttr(isDark, root)
  applyTheme(hue, sat, isDark, root)
}

export const toggleThemeMode = () => {
  const root = document.documentElement
  const nextIsDark = root.getAttribute('data-theme') !== 'dark'
  theme.dark = nextIsDark
  return nextIsDark ? 'dark' : 'light'
}

const rootElement = document.documentElement
const isDarkAttr = (root = rootElement) => root.getAttribute('data-theme') === 'dark'
const initialState = { hue: readHue(rootElement), sat: readSat(rootElement), dark: isDarkAttr(rootElement) }
export const theme = new Proxy(initialState, {
  set(target, prop, value) {
    switch (prop) {
      case 'hue': {
        const h = clamp(Math.round(value), 0, 360)
        target.hue = h
        applyTheme(h, target.sat, target.dark, rootElement)
        return true
      }
      case 'sat': {
        const s = clamp(Math.round(value), 0, 100)
        target.sat = s
        applyTheme(target.hue, s, target.dark, rootElement)
        return true
      }
      case 'dark': {
        const isDark = Boolean(value)
        setThemeAttr(isDark, rootElement)
        target.dark = isDark
        applyTheme(target.hue, target.sat, isDark, rootElement)
        return true
      }
      default:
        return false
    }
  }
})

 


