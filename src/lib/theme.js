// Open Props colors are imported for reference but we use hardcoded names

export const OPEN_PROPS_COLORS = [
	'gray', 'stone', 'red', 'pink', 'purple', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange', 'choco', 'brown', 'sand', 'camo', 'jungle'
]

// Color harmony mappings - complementary and triadic relationships
const COLOR_HARMONIES = {
	gray: { secondary: 'blue', accent: 'cyan' },
	stone: { secondary: 'teal', accent: 'green' },
	red: { secondary: 'cyan', accent: 'blue' },
	pink: { secondary: 'green', accent: 'teal' },
	purple: { secondary: 'lime', accent: 'yellow' },
	violet: { secondary: 'orange', accent: 'yellow' },
	indigo: { secondary: 'orange', accent: 'yellow' },
	blue: { secondary: 'orange', accent: 'red' },
	cyan: { secondary: 'red', accent: 'pink' },
	teal: { secondary: 'pink', accent: 'red' },
	green: { secondary: 'pink', accent: 'purple' },
	lime: { secondary: 'purple', accent: 'violet' },
	yellow: { secondary: 'violet', accent: 'purple' },
	orange: { secondary: 'blue', accent: 'cyan' },
	choco: { secondary: 'cyan', accent: 'blue' },
	brown: { secondary: 'cyan', accent: 'teal' },
	sand: { secondary: 'blue', accent: 'violet' },
	camo: { secondary: 'pink', accent: 'purple' },
	jungle: { secondary: 'pink', accent: 'violet' },
}

// Default theme configuration
const DEFAULT_THEME = { color: 'indigo' }

// Get harmonic colors for a given base color
export const getHarmonicColors = color => {
	const normalizedColor = color?.toLowerCase()
	const harmonies = COLOR_HARMONIES[normalizedColor] || COLOR_HARMONIES.indigo

	// Ensure harmonic colors exist in Open Props
	const secondary = OPEN_PROPS_COLORS.includes(harmonies.secondary) ? harmonies.secondary : 'orange'
	const accent = OPEN_PROPS_COLORS.includes(harmonies.accent) ? harmonies.accent : 'yellow'

	return { primary: normalizedColor, secondary, accent }
}

// Default theme values (single source of truth)
const DEFAULT_THEME_VALUES = {
	'--theme-color-primary': 'hsl(var(--indigo-7-hsl) / 0.9)',
	'--theme-color-secondary': 'hsl(var(--orange-6-hsl) / 0.7)',
	'--theme-color-accent': 'hsl(var(--yellow-9-hsl) / 0.9)',
	'--theme-color-muted': 'hsl(var(--indigo-4-hsl) / 0.5)',
	'--theme-color-border': 'hsl(var(--indigo-5-hsl) / 0.4)',
	'--theme-surface-primary': 'hsl(var(--indigo-0-hsl) / 0.9)',
	'--theme-surface-secondary': 'hsl(var(--indigo-1-hsl) / 0.6)',
	'--theme-surface-tertiary': 'hsl(var(--indigo-2-hsl) / 0.3)',
	'--theme-surface-border': 'hsl(var(--indigo-3-hsl) / 0.1)',
	'--theme-text-primary': 'hsl(var(--indigo-12-hsl) / 0.9)',
	'--theme-text-secondary': 'hsl(var(--indigo-11-hsl) / 0.7)',
	'--theme-text-tertiary': 'hsl(var(--indigo-10-hsl) / 0.5)',
	'--theme-text-muted': 'hsl(var(--indigo-9-hsl) / 0.4)',
	'--theme-link': 'hsl(var(--indigo-9-hsl) / 0.8)',
	'--theme-link-hover': 'hsl(var(--indigo-10-hsl) / 0.9)',
}

// Get theme configuration from resume meta
export const getThemeConfig = meta => {
	const color = meta?.themeOptions?.color
	return {
		color: OPEN_PROPS_COLORS.includes(color) ? color : DEFAULT_THEME.color,
	}
}

// Get section title with theme customization
export const getSectionTitleWithTheme = (sectionName, meta) => {
	const customTitles = meta?.themeOptions?.sectionTitles
	return (
		customTitles?.[sectionName] ||
		sectionName.charAt(0).toUpperCase() + sectionName.slice(1)
	)
}

// Generate theme variables for a color with harmonic relationships
const generateThemeVars = color => {
	const normalizedColor = color?.toLowerCase()

	if (!OPEN_PROPS_COLORS.includes(normalizedColor)) {
		return DEFAULT_THEME_VALUES
	}

	const { primary, secondary, accent } = getHarmonicColors(normalizedColor)

	return {
		'--theme-color-primary': `hsl(var(--${primary}-7-hsl) / 0.9)`,
		'--theme-color-secondary': `hsl(var(--${secondary}-6-hsl) / 0.7)`,
		'--theme-color-accent': `hsl(var(--${accent}-9-hsl) / 0.9)`,
		'--theme-color-muted': `hsl(var(--${primary}-4-hsl) / 0.5)`,
		'--theme-color-border': `hsl(var(--${primary}-5-hsl) / 0.4)`,
		'--theme-surface-primary': `hsl(var(--${primary}-0-hsl) / 0.9)`,
		'--theme-surface-secondary': `hsl(var(--${primary}-1-hsl) / 0.6)`,
		'--theme-surface-tertiary': `hsl(var(--${primary}-2-hsl) / 0.3)`,
		'--theme-surface-border': `hsl(var(--${primary}-3-hsl) / 0.1)`,
		'--theme-text-primary': `hsl(var(--${primary}-12-hsl) / 0.9)`,
		'--theme-text-secondary': `hsl(var(--${primary}-11-hsl) / 0.7)`,
		'--theme-text-tertiary': `hsl(var(--${primary}-10-hsl) / 0.5)`,
		'--theme-text-muted': `hsl(var(--${primary}-9-hsl) / 0.4)`,
		'--theme-link': `hsl(var(--${primary}-9-hsl) / 0.8)`,
		'--theme-link-hover': `hsl(var(--${primary}-10-hsl) / 0.9)`,
	}
}

// Apply color theme to CSS variables
export const applyColorTheme = color => generateThemeVars(color)

// Apply dark mode theme variants with harmonic relationships
export const applyDarkModeTheme = color => {
	const normalizedColor = OPEN_PROPS_COLORS.includes(color)
		? color
		: 'indigo'

	const { primary, secondary, accent } = getHarmonicColors(normalizedColor)

	return {
		'--theme-color-primary': `hsl(var(--${primary}-4-hsl) / 0.9)`,
		'--theme-color-secondary': `hsl(var(--${secondary}-5-hsl) / 0.7)`,
		'--theme-color-accent': `hsl(var(--${accent}-3-hsl) / 0.9)`,
		'--theme-color-muted': `hsl(var(--${primary}-6-hsl) / 0.5)`,
		'--theme-color-border': `hsl(var(--${primary}-5-hsl) / 0.4)`,
		'--theme-surface-primary': `hsl(var(--${primary}-12-hsl) / 0.2)`,
		'--theme-surface-secondary': `hsl(var(--${primary}-11-hsl) / 0.15)`,
		'--theme-surface-tertiary': `hsl(var(--${primary}-10-hsl) / 0.1)`,
		'--theme-surface-border': `hsl(var(--${primary}-9-hsl) / 0.05)`,
		'--theme-text-primary': `hsl(var(--${primary}-0-hsl) / 0.9)`,
		'--theme-text-secondary': `hsl(var(--${primary}-1-hsl) / 0.7)`,
		'--theme-text-tertiary': `hsl(var(--${primary}-2-hsl) / 0.5)`,
		'--theme-text-muted': `hsl(var(--${primary}-3-hsl) / 0.4)`,
		'--theme-link': `hsl(var(--${primary}-3-hsl) / 0.8)`,
		'--theme-link-hover': `hsl(var(--${primary}-2-hsl) / 0.9)`,
	}
}

// Theme manager for clean DOM updates
export const themeManager = {
  init() {
    // Check for URL theme parameter first (for PDF generation)
    const urlParams = new URLSearchParams(window.location.search)
    const urlTheme = urlParams.get('theme')

    if (urlTheme) {
      // Use URL theme for PDF generation
      const savedColor = localStorage.getItem('selectedThemeColor') || 'indigo'
      this.setTheme(urlTheme, savedColor)
    } else {
      // Use saved theme
      this.applySavedTheme()
    }
  },

  applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    const savedColor = localStorage.getItem('selectedThemeColor') || 'indigo'

    this.setTheme(savedTheme, savedColor)
  },

  setTheme(theme, color) {
    const html = document.documentElement
    const isDark = theme === 'dark'
    const themeVars = isDark ? applyDarkModeTheme(color) : applyColorTheme(color)

    // Apply theme variables
    html.setAttribute('data-theme', theme)
    html.style.backgroundColor = isDark ? '#302836' : '#FFEEFF'

    Object.entries(themeVars).forEach(([key, value]) => {
      html.style.setProperty(key, value)
    })
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    const currentColor = localStorage.getItem('selectedThemeColor') || 'indigo'

    localStorage.setItem('theme', newTheme)
    this.setTheme(newTheme, currentColor)

    return newTheme
  },

  setColor(color) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
    localStorage.setItem('selectedThemeColor', color)
    this.setTheme(currentTheme, color)
  }
}

// Initialize theme when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => themeManager.init())
  } else {
    themeManager.init()
  }
}
