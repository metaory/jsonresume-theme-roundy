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
  const link = isDark ? `hsl(${h} ${s}% 70%)` : `hsl(${h} ${s}% 50%)`
  const linkHover = isDark
    ? `hsl(${h} ${Math.min(100, s + 10)}% 75%)`
    : `hsl(${h} ${Math.min(100, s + 10)}% 45%)`

  return {
    primary, secondary, accent,
    bg, surface, text, textMuted,
    link, linkHover, secondaryHue, accentHue
  }
}

export const applyTheme = (h, s, isDark, root = document.documentElement) => {
  const c = computeColors(h, s, isDark)
  root.style.setProperty('--hue', String(h))
  root.style.setProperty('--sat', String(s))
  root.style.setProperty('--hue-secondary', String(c.secondaryHue))
  root.style.setProperty('--hue-accent', String(c.accentHue))
  root.style.setProperty('--primary', c.primary)
  root.style.setProperty('--secondary', c.secondary)
  root.style.setProperty('--accent', c.accent)
  root.style.setProperty('--bg', c.bg)
  root.style.setProperty('--surface', c.surface)
  root.style.setProperty('--text', c.text)
  root.style.setProperty('--text-muted', c.textMuted)
  root.style.setProperty('--link', c.link)
  root.style.setProperty('--link-hover', c.linkHover)
}

export const applyThemeAuto = (h, s, root = document.documentElement) => {
  const isDark = root.getAttribute('data-theme') === 'dark'
  applyTheme(h, s, isDark, root)
}

export const setThemeAttr = (isDark, root = document.documentElement) => {
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export const detectMode = (darkOpt) => {
  const params = new URLSearchParams(location.search)
  const q = params.get('theme')
  if (q === 'dark' || q === 'light') return q === 'dark'
  if (typeof darkOpt === 'boolean') return darkOpt
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr) return attr === 'dark'
  return false
}

export const initTheme = (h, s, darkOpt) => {
  const isDark = detectMode(darkOpt)
  setThemeAttr(isDark)
  applyTheme(h, s, isDark)
}

export const toggleThemeMode = () => {
  const root = document.documentElement
  const nextIsDark = root.getAttribute('data-theme') !== 'dark'
  setThemeAttr(nextIsDark, root)
  applyThemeAuto(readHue(root), readSat(root), root)
  return nextIsDark ? 'dark' : 'light'
}

export const reapplyForCurrentMode = () => {
  const root = document.documentElement
  applyThemeAuto(readHue(root), readSat(root), root)
}

export const updateSatGradient = (inputEl, h) => {
  if (inputEl) {
    inputEl.style.background = `linear-gradient(to right, hsl(${h}, 0%, 50%), hsl(${h}, 100%, 50%))`
  }
}

