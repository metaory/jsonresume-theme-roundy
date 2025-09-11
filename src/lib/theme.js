// Core theme utilities
/** @param {number} n @param {number} min @param {number} max @returns {number} */
export const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

// Theme defaults
/** @type {{ hue: number, sat: number, dark: boolean }} */
export const THEME_DEFAULTS = { hue: 240, sat: 60, dark: false }

// Color computation
/** @param {number} h @returns {{ secondaryHue: number, accentHue: number }} */
export const computeHues = (h) => ({
  secondaryHue: (h + 180) % 360,
  accentHue: (h + 60) % 360
})

const createColor = (h, s, l, a = 1) => `hsl(${h} ${s}% ${l}%${a < 1 ? ` / ${a}` : ''})`

const computeSaturation = (base, multiplier, min, max, s) => 
  Math.round(clamp(base + s * multiplier, min, max))

const createColorPair = (h, s, isDark, lightValues, darkValues) => 
  isDark ? createColor(h, s, darkValues.l, darkValues.a) : createColor(h, s, lightValues.l, lightValues.a)

/** @param {number} h @param {number} s @param {boolean} isDark @returns {object} */
export const computeColors = (h, s, isDark) => {
  const { secondaryHue, accentHue } = computeHues(h)
  
  const primary = createColor(h, s, 50)
  const secondary = createColor(secondaryHue, s, 50)
  const accent = createColor(accentHue, s, 60)
  
  const satBg = computeSaturation(isDark ? 6 : 10, isDark ? 0.25 : 0.6, isDark ? 12 : 18, isDark ? 35 : 60, s)
  const satSurface = computeSaturation(isDark ? 8 : 10, isDark ? 0.2 : 0.5, isDark ? 10 : 15, isDark ? 30 : 50, s)
  const bg = createColor(h, satBg, isDark ? 8 : 90)
  const surface = createColor(h, satSurface, isDark ? 12 : 94, isDark ? 0.68 : 0.88)
  
  const satText = Math.round(clamp(s * 0.1, 5, 20))
  const text = createColorPair(h, isDark ? 5 : satText, isDark, { l: 15 }, { l: 95 })
  const textMuted = createColorPair(h, isDark ? 8 : satText, isDark, { l: 35 }, { l: 80 })
  
  const sInc = Math.min(100, s + 10)
  const link = createColorPair(h, s, isDark, { l: 50 }, { l: 70 })
  const linkHover = createColorPair(h, sInc, isDark, { l: 45 }, { l: 75 })

  return {
    primary, secondary, accent,
    bg, surface, text, textMuted,
    link, linkHover, secondaryHue, accentHue
  }
}

// Theme application
let lastApplied = { h: undefined, s: undefined, dark: undefined }
/** @param {number} h @param {number} s @param {boolean} isDark @param {Element} [root] @returns {void} */
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

/** @param {boolean} isDark @param {Element} [root] @returns {void} */
export const setThemeAttr = (isDark, root = document.documentElement) => {
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

/** @param {boolean|undefined} darkOpt @param {Element} [root] @returns {boolean} */
export const detectMode = (darkOpt, root = document.documentElement) => {
  if (typeof darkOpt === 'boolean') return darkOpt
  return (root.getAttribute('data-theme') || '').toLowerCase() === 'dark'
}

// Theme initialization and management
/** @param {object} [themeOptions] @returns {{ hue: number, sat: number, isDark: boolean }} */
export const initTheme = (themeOptions = {}) => {
  const hue = clamp(Math.round(themeOptions.hue ?? THEME_DEFAULTS.hue), 0, 360)
  const sat = clamp(Math.round(themeOptions.sat ?? THEME_DEFAULTS.sat), 0, 100)
  const isDark = detectMode(themeOptions.dark, document.documentElement)
  
  setThemeAttr(isDark, document.documentElement)
  applyTheme(hue, sat, isDark, document.documentElement)
  
  theme.hue = hue
  theme.sat = sat
  theme.dark = isDark
  
  return { hue, sat, isDark }
}

/** @returns {string} */
export const toggleThemeMode = () => {
  const root = document.documentElement
  const nextIsDark = root.getAttribute('data-theme') !== 'dark'
  theme.dark = nextIsDark
  return nextIsDark ? 'dark' : 'light'
}

// Theme picker utilities
/** @returns {void} */
export const createThemePicker = () => {
  const [hueEl, satEl, hueVal, satVal] = [
    document.getElementById('hue'),
    document.getElementById('sat'),
    document.getElementById('hue-value'),
    document.getElementById('sat-value')
  ]

  if (!hueEl || !satEl || !hueVal || !satVal) return

  const updateValues = () => {
    const h = Number(hueEl.value)
    const s = Number(satEl.value)
    hueVal.textContent = `${h}°`
    satVal.textContent = `${s}%`
    document.documentElement.setAttribute('data-theme-manual', 'true')
    theme.hue = h
    theme.sat = s
  }

  // Initialize and bind events
  hueEl.value = String(theme.hue)
  satEl.value = String(theme.sat)
  hueVal.textContent = `${theme.hue}°`
  satVal.textContent = `${theme.sat}%`
  
  hueEl.addEventListener('input', updateValues)
  satEl.addEventListener('input', updateValues)
}

// Theme state management
const initialState = { 
  hue: THEME_DEFAULTS.hue, 
  sat: THEME_DEFAULTS.sat, 
  dark: false
}

const updateThemeProperty = (target, prop, value, min, max) => {
  const clampedValue = clamp(Math.round(value), min, max)
  target[prop] = clampedValue
  applyTheme(target.hue, target.sat, target.dark, document.documentElement)
  return true
}

const updateDarkMode = (target, value) => {
  const isDark = Boolean(value)
  target.dark = isDark
  setThemeAttr(isDark, document.documentElement)
  applyTheme(target.hue, target.sat, isDark, document.documentElement)
  return true
}

/** @type {{ hue: number, sat: number, dark: boolean }} */
export const theme = new Proxy(initialState, {
  set(target, prop, value) {
    switch (prop) {
      case 'hue': return updateThemeProperty(target, prop, value, 0, 360)
      case 'sat': return updateThemeProperty(target, prop, value, 0, 100)
      case 'dark': return updateDarkMode(target, value)
      default: return false
    }
  }
})