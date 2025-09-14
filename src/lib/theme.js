const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export const THEME_DEFAULTS = { hue: 240, sat: 60, dark: false }

const hsl = (h, s, l, a) => `hsl(${h} ${s}% ${l}%${a ? ` / ${a}` : ''})`

const colorConfigs = {
  dark: (h, s, secondaryHue, accentHue) => ({
    primary: hsl(h, s, 50),
    secondary: hsl(secondaryHue, s, 50),
    accent: hsl(accentHue, s, 60),
    bg: hsl(h, clamp(10 + s * 0.25, 18, 60), 8),
    surface: hsl(h, clamp(10 + s * 0.2, 15, 50), 12, 0.2),
    wash: hsl(h, s, 20, 0.4),
    text: hsl(h, 5, 95),
    textMuted: hsl(h, 8, 95),
    link: hsl(h, s, 70),
    linkHover: hsl(h, Math.min(100, s + 10), 75)
  }),
  light: (h, s, secondaryHue, accentHue, textSat) => ({
    primary: hsl(h, s, 50),
    secondary: hsl(secondaryHue, s, 50),
    accent: hsl(accentHue, s, 60),
    bg: hsl(h, clamp(15 + s * 4, 20, 50), 94),
    surface: hsl(h, clamp(20 + s * 3.5, 25, 45), 96, 0.2),
    wash: hsl(h, s, 80, 0.4),
    text: hsl(h, textSat, 15),
    textMuted: hsl(h, textSat, 15),
    link: hsl(h, s, 50),
    linkHover: hsl(h, Math.min(100, s + 10), 45)
  })
}

const computeColors = (h, s, isDark) => {
  const secondaryHue = (h + 180) % 360
  const accentHue = (h + 60) % 360
  const textSat = clamp(s * 0.1, 5, 20)
  const mode = isDark ? 'dark' : 'light'

  return colorConfigs[mode](h, s, secondaryHue, accentHue, textSat)
}

const setProp = ([name, value]) => document.documentElement.style.setProperty(`--${name}`, value)

const applyTheme = (h, s, isDark) => {
  const colors = computeColors(h, s, isDark)

  const props = [
    ['hue', String(h)],
    ['sat', String(s)],
    ['hue-secondary', String((h + 180) % 360)],
    ['hue-accent', String((h + 60) % 360)],
    ['primary', colors.primary],
    ['secondary', colors.secondary],
    ['accent', colors.accent],
    ['bg', colors.bg],
    ['surface', colors.surface],
    ['wash', colors.wash],
    ['text', colors.text],
    ['text-muted', colors.textMuted],
    ['link', colors.link],
    ['link-hover', colors.linkHover]
  ]

  props.forEach(setProp)
}

const setThemeAttr = (isDark) => {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}


export const toggleThemeMode = () => {
  const nextIsDark = !theme.dark

  theme.dark = nextIsDark
  setThemeAttr(nextIsDark)
  applyTheme(theme.hue, theme.sat, nextIsDark)

  return nextIsDark ? 'dark' : 'light'
}

const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const updateTheme = debounce((hue, sat) => {
  applyTheme(hue, sat, theme.dark)
  Object.assign(theme, { hue, sat })
}, 16)

export const createThemePicker = () => {
  const elements = ['hue', 'sat', 'hue-value', 'sat-value'].map(id => document.getElementById(id))
  const [hueEl, satEl, hueVal, satVal] = elements

  if (!elements.every(Boolean)) return

  const updateSliders = (hue, sat) => {
    hueEl.value = hue
    satEl.value = sat
    hueVal.textContent = `${hue}°`
    satVal.textContent = `${sat}%`
  }

  updateSliders(theme.hue, theme.sat)

  const createSliderHandler = (prop, suffix, getThemeArgs) => () => {
    const value = Number(document.getElementById(prop).value)
    document.getElementById(`${prop}-value`).textContent = `${value}${suffix}`
    updateTheme(...getThemeArgs(value))
  }

  const sliderHandlers = {
    hue: createSliderHandler('hue', '°', (hue) => [hue, theme.sat]),
    sat: createSliderHandler('sat', '%', (sat) => [theme.hue, sat])
  }

  Object.entries(sliderHandlers).forEach(([id, handler]) => {
    document.getElementById(id)?.addEventListener('input', handler)
  })

  document.querySelectorAll('.preset-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const hue = parseInt(circle.dataset.hue || '0')
      const sat = parseInt(circle.dataset.sat || '0')
      updateSliders(hue, sat)
      updateTheme(hue, sat)
    })
  })
}

const propHandlers = {
  hue: (target, value) => {
    target.hue = clamp(Math.round(value), 0, 360)
    applyTheme(target.hue, target.sat, target.dark)
  },
  sat: (target, value) => {
    target.sat = clamp(Math.round(value), 0, 100)
    applyTheme(target.hue, target.sat, target.dark)
  },
  dark: (target, value) => {
    target.dark = Boolean(value)
    setThemeAttr(target.dark)
    applyTheme(target.hue, target.sat, target.dark)
  }
}

const getInitialTheme = () => {
  if (typeof document === 'undefined') return THEME_DEFAULTS
  const style = getComputedStyle(document.documentElement)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  return {
    ...THEME_DEFAULTS,
    hue: parseInt(style.getPropertyValue('--hue')) || THEME_DEFAULTS.hue,
    sat: parseInt(style.getPropertyValue('--sat')) || THEME_DEFAULTS.sat,
    dark: isDark
  }
}

const initializeTheme = () => {
  const initialTheme = getInitialTheme()
  if (typeof document !== 'undefined') {
    applyTheme(initialTheme.hue, initialTheme.sat, initialTheme.dark)
    setThemeAttr(initialTheme.dark)
  }
  return initialTheme
}

export const theme = new Proxy(initializeTheme(), {
  set(target, prop, value) {
    const handler = propHandlers[prop]
    if (handler) handler(target, value)
    return true
  }
})

