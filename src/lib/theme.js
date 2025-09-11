/** @param {number} n @param {number} min @param {number} max @returns {number} */
export const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export const THEME_DEFAULTS = { hue: 240, sat: 60, dark: false }

const CONFIG = {
  hues: { secondary: 180, accent: 60 },
  lightness: { primary: 50, secondary: 50, accent: 60 },
  saturation: { 
    light: { bg: 4.0, surface: 3.5, text: 0.1 },
    dark: { bg: 0.25, surface: 0.2, text: 0.1 }
  },
  ranges: { hue: [0, 360], sat: [0, 100] }
}

const createColor = (h, s, l, a = 1) => `hsl(${h} ${s}% ${l}%${a < 1 ? ` / ${a}` : ''})`
const computeHues = (h) => Object.fromEntries(
  Object.entries(CONFIG.hues).map(([key, offset]) => [`${key}Hue`, (h + offset) % 360])
)

const computeSaturation = (base, multiplier, min, max, s) => 
  Math.round(clamp(base + s * multiplier, min, max))

const createColorDef = (hueKey, lightness) => 
  (h, s, _isDark, _mults, hues) => createColor(hues[hueKey] || h, s, lightness)

const createSaturationDef = (light, dark, multKey) => 
  (h, s, isDark, mults) => {
    const [base, , min, max, lightness, alpha] = isDark ? dark : light
    const multiplier = mults[multKey] || 0.1
    const sat = computeSaturation(base, multiplier, min, max, s)
    return createColor(h, sat, lightness, alpha)
  }

const createTextDef = (lightSat, darkSat) => 
  (h, s, isDark) => {
    const satText = Math.round(clamp(s * 0.1, 5, 20))
    return createColor(h, isDark ? darkSat : satText, isDark ? 95 : 15)
  }

const COLOR_DEFINITIONS = {
  primary: createColorDef('primaryHue', CONFIG.lightness.primary),
  secondary: createColorDef('secondaryHue', CONFIG.lightness.secondary),
  accent: createColorDef('accentHue', CONFIG.lightness.accent),
  bg: createSaturationDef([15, 'bg', 20, 50, 94], [10, 'bg', 18, 60, 8]),
  surface: createSaturationDef([20, 'surface', 25, 45, 96, 0.68], [10, 'surface', 15, 50, 12, 0.88]),
  text: createTextDef(5, 5),
  textMuted: createTextDef(8, 8),
  link: (h, s, isDark) => createColor(h, s, isDark ? 70 : 50),
  linkHover: (h, s, isDark) => createColor(h, Math.min(100, s + 10), isDark ? 75 : 45)
}

/** @param {number} h @param {number} s @param {boolean} isDark @returns {object} */
export const computeColors = (h, s, isDark) => {
  const hues = computeHues(h)
  const mults = CONFIG.saturation[isDark ? 'dark' : 'light']
  
  return Object.fromEntries(
    Object.entries(COLOR_DEFINITIONS).map(([key, fn]) => [
      key, 
      fn(h, s, isDark, mults, hues)
    ])
  )
}

// Theme application
const CSS_VARS = [
  ['--hue', (h) => String(h)],
  ['--sat', (s) => String(s)],
  ['--hue-secondary', (_, __, ___, c) => String(c.secondaryHue || 60)],
  ['--hue-accent', (_, __, ___, c) => String(c.accentHue || 300)],
  ['--primary', (_, __, ___, c) => c.primary],
  ['--secondary', (_, __, ___, c) => c.secondary],
  ['--accent', (_, __, ___, c) => c.accent],
  ['--bg', (_, __, ___, c) => c.bg],
  ['--surface', (_, __, ___, c) => c.surface],
  ['--text', (_, __, ___, c) => c.text],
  ['--text-muted', (_, __, ___, c) => c.textMuted],
  ['--link', (_, __, ___, c) => c.link],
  ['--link-hover', (_, __, ___, c) => c.linkHover]
]

export const applyTheme = (h, s, isDark, root = document.documentElement) => {
  const colors = computeColors(h, s, isDark)
  for (const [key, fn] of CSS_VARS) root.style.setProperty(key, fn(h, s, isDark, colors))
}

/** @param {boolean} isDark @param {Element} [root] @returns {void} */
export const setThemeAttr = (isDark, root = document.documentElement) => {
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

/** @param {boolean|undefined} darkOpt @param {Element} [root] @returns {boolean} */
export const detectMode = (darkOpt, root = document.documentElement) => {
  if (darkOpt !== undefined) return darkOpt
  return root.getAttribute('data-theme') === 'dark'
}

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
  
  // Update theme state and apply changes
  theme.dark = nextIsDark
  setThemeAttr(nextIsDark, root)
  applyTheme(theme.hue, theme.sat, nextIsDark, root)
  
  return nextIsDark ? 'dark' : 'light'
}

const getElements = () => ({
  hueEl: document.getElementById('hue'),
  satEl: document.getElementById('sat'),
  hueVal: document.getElementById('hue-value'),
  satVal: document.getElementById('sat-value')
})

const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const updateSliderValues = (hue, sat) => {
  const { hueEl, satEl, hueVal, satVal } = getElements()
  if (!hueEl || !satEl || !hueVal || !satVal) return
  
  hueEl.value = String(hue)
  satEl.value = String(sat)
  hueVal.textContent = `${hue}°`
  satVal.textContent = `${sat}%`
}

const updateTheme = debounce((hue, sat) => {
  theme.hue = hue
  theme.sat = sat
}, 16)

const SLIDER_CONFIG = [
  { 
    el: 'hueEl', 
    val: 'hueVal', 
    unit: '°', 
    getOther: (els) => Number(els.satEl.value),
    updateOther: (els, val) => {
      els.hueEl.value = String(val)
      els.hueVal.textContent = `${val}°`
    }
  },
  { 
    el: 'satEl', 
    val: 'satVal', 
    unit: '%', 
    getOther: (els) => Number(els.hueEl.value),
    updateOther: (els, val) => {
      els.satEl.value = String(val)
      els.satVal.textContent = `${val}%`
    }
  }
]

const setupSlider = (config, els) => {
  const element = els[config.el]
  if (!element) return
  
  element.addEventListener('input', () => {
    const value = Number(element.value)
    config.updateOther(els, value)
    
    // Fix parameter order: hue slider updates hue, sat slider updates sat
    if (config.el === 'hueEl') {
      updateTheme(value, config.getOther(els))
    } else {
      updateTheme(config.getOther(els), value)
    }
  })
}

export const createThemePicker = () => {
  const els = getElements()
  if (!Object.values(els).every(Boolean)) return
  
  updateSliderValues(theme.hue, theme.sat)
  SLIDER_CONFIG.forEach(config => setupSlider(config, els))
  
  document.querySelectorAll('.preset-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const [hue, sat] = ['hue', 'sat'].map(prop => parseInt(circle.dataset[prop] || '0'))
      updateSliderValues(hue, sat)
      updateTheme(hue, sat)
    })
  })
}

const initialState = { hue: THEME_DEFAULTS.hue, sat: THEME_DEFAULTS.sat, dark: false }

const createPropertyUpdater = ([min, max]) => (target, prop, value) => {
  target[prop] = clamp(Math.round(value), min, max)
  applyTheme(target.hue, target.sat, target.dark)
  return true
}

const createDarkUpdater = () => (target, _prop, value) => {
  target.dark = Boolean(value)
  setThemeAttr(target.dark)
  applyTheme(target.hue, target.sat, target.dark)
  return true
}

const UPDATERS = {
  hue: createPropertyUpdater(CONFIG.ranges.hue),
  sat: createPropertyUpdater(CONFIG.ranges.sat),
  dark: createDarkUpdater()
}

export const theme = new Proxy(initialState, {
  set(target, prop, value) {
    return UPDATERS[prop]?.(target, prop, value) ?? false
  }
})