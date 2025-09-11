const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export const THEME_DEFAULTS = { hue: 240, sat: 60, dark: false }

const hsl = (h, s, l, a) => `hsl(${h} ${s}% ${l}%${a ? ` / ${a}` : ''})`

const computeColors = (h, s, isDark) => {
  const secondaryHue = (h + 180) % 360
  const accentHue = (h + 60) % 360
  const textSat = clamp(s * 0.1, 5, 20)
  
  if (isDark) {
    return {
      primary: hsl(h, s, 50),
      secondary: hsl(secondaryHue, s, 50),
      accent: hsl(accentHue, s, 60),
      bg: hsl(h, clamp(10 + s * 0.25, 18, 60), 8),
      surface: hsl(h, clamp(10 + s * 0.2, 15, 50), 12, 0.88),
      text: hsl(h, 5, 95),
      textMuted: hsl(h, 8, 95),
      link: hsl(h, s, 70),
      linkHover: hsl(h, Math.min(100, s + 10), 75)
    }
  }
  
  return {
    primary: hsl(h, s, 50),
    secondary: hsl(secondaryHue, s, 50),
    accent: hsl(accentHue, s, 60),
    bg: hsl(h, clamp(15 + s * 4, 20, 50), 94),
    surface: hsl(h, clamp(20 + s * 3.5, 25, 45), 96, 0.68),
    text: hsl(h, textSat, 15),
    textMuted: hsl(h, textSat, 15),
    link: hsl(h, s, 50),
    linkHover: hsl(h, Math.min(100, s + 10), 45)
  }
}

const applyTheme = (h, s, isDark, root = document.documentElement) => {
  const colors = computeColors(h, s, isDark)
  
  root.style.setProperty('--hue', String(h))
  root.style.setProperty('--sat', String(s))
  root.style.setProperty('--hue-secondary', String((h + 180) % 360))
  root.style.setProperty('--hue-accent', String((h + 60) % 360))
  root.style.setProperty('--primary', colors.primary)
  root.style.setProperty('--secondary', colors.secondary)
  root.style.setProperty('--accent', colors.accent)
  root.style.setProperty('--bg', colors.bg)
  root.style.setProperty('--surface', colors.surface)
  root.style.setProperty('--text', colors.text)
  root.style.setProperty('--text-muted', colors.textMuted)
  root.style.setProperty('--link', colors.link)
  root.style.setProperty('--link-hover', colors.linkHover)
}

const setThemeAttr = (isDark, root = document.documentElement) => {
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export const initTheme = (themeOptions = {}) => {
  const hue = clamp(Math.round(themeOptions.hue ?? THEME_DEFAULTS.hue), 0, 360)
  const sat = clamp(Math.round(themeOptions.sat ?? THEME_DEFAULTS.sat), 0, 100)
  const isDark = themeOptions.dark ?? THEME_DEFAULTS.dark
  
  setThemeAttr(isDark)
  applyTheme(hue, sat, isDark)
  
  // Update theme state directly without triggering proxy
  Object.assign(theme, { hue, sat, dark: isDark })
  
  return { hue, sat, isDark }
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
  const hueEl = document.getElementById('hue')
  const satEl = document.getElementById('sat')
  const hueVal = document.getElementById('hue-value')
  const satVal = document.getElementById('sat-value')
  
  if (!hueEl || !satEl || !hueVal || !satVal) return
  
  const updateSliders = (hue, sat) => {
    hueEl.value = hue
    satEl.value = sat
    hueVal.textContent = `${hue}°`
    satVal.textContent = `${sat}%`
  }
  
  updateSliders(theme.hue, theme.sat)
  
  hueEl.addEventListener('input', () => {
    const hue = Number(hueEl.value)
    hueVal.textContent = `${hue}°`
    updateTheme(hue, theme.sat)
  })
  
  satEl.addEventListener('input', () => {
    const sat = Number(satEl.value)
    satVal.textContent = `${sat}%`
    updateTheme(theme.hue, sat)
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

export const theme = new Proxy(THEME_DEFAULTS, {
  set(target, prop, value) {
    if (prop === 'hue' || prop === 'sat') {
      const range = prop === 'hue' ? [0, 360] : [0, 100]
      target[prop] = clamp(Math.round(value), ...range)
      applyTheme(target.hue, target.sat, target.dark)
    } else if (prop === 'dark') {
      target.dark = Boolean(value)
      setThemeAttr(target.dark)
      applyTheme(target.hue, target.sat, target.dark)
    }
    return true
  }
})