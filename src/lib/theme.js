// Available Open Props color themes
const OPEN_PROPS_COLORS = [
  'gray', 'stone', 'red', 'pink', 'purple', 'violet',
  'indigo', 'blue', 'cyan', 'teal', 'green', 'lime',
  'yellow', 'orange', 'choco', 'brown', 'sand', 'camo', 'jungle'
];

// Default theme configuration
const DEFAULT_THEME = {
  color: 'indigo'
};

// Default color theme variables
const DEFAULT_COLOR_THEME = {
  '--theme-color-primary': 'var(--indigo-7)',
  '--theme-color-secondary': 'var(--indigo-6)',
  '--theme-color-accent': 'var(--indigo-8)',
  '--theme-color-muted': 'var(--indigo-4)',
  '--theme-color-border': 'var(--indigo-5)',
  '--theme-surface-primary': 'var(--indigo-0)',
  '--theme-surface-secondary': 'var(--indigo-0)',
  '--theme-surface-tertiary': 'var(--indigo-1)',
  '--theme-surface-border': 'var(--indigo-2)',
  '--theme-text-primary': 'var(--indigo-12)',
  '--theme-text-secondary': 'var(--indigo-11)',
  '--theme-text-muted': 'var(--indigo-10)',
  '--theme-link': 'var(--indigo-9)',
  '--theme-link-hover': 'var(--indigo-10)',
};

// Get theme configuration from resume meta
export const getThemeConfig = (meta) => {
  if (!meta?.themeOptions) return DEFAULT_THEME;

  const color = meta.themeOptions.color?.toLowerCase();
  return {
    color: OPEN_PROPS_COLORS.includes(color) ? color : DEFAULT_THEME.color
  };
};

// Get section title with theme customization
export const getSectionTitleWithTheme = (sectionName, meta) => {
  const themeConfig = getThemeConfig(meta);
  const customTitles = meta?.themeOptions?.sectionTitles;
  return customTitles?.[sectionName] || sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
};

// Apply color theme to CSS variables (for static generation)
export const applyColorTheme = (color) => {
  const normalizedColor = color?.toLowerCase();
  if (!OPEN_PROPS_COLORS.includes(normalizedColor)) {
    return DEFAULT_COLOR_THEME;
  }

  // Enhanced theme with HSL colors for better manipulation
  return {
    // Primary theme colors - vibrant for accents
    '--theme-color-primary': `var(--${normalizedColor}-7)`,
    '--theme-color-secondary': `var(--${normalizedColor}-6)`,
    '--theme-color-accent': `var(--${normalizedColor}-8)`,
    '--theme-color-muted': `var(--${normalizedColor}-4)`,
    '--theme-color-border': `var(--${normalizedColor}-5)`,

    // Surfaces - using HSL with very light theme color tints (60-80% alpha)
    '--theme-surface-primary': `hsl(var(--${normalizedColor}-1-hsl) / 0.82)`,
    '--theme-surface-secondary': `hsl(var(--${normalizedColor}-2-hsl) / 0.84)`,
    '--theme-surface-tertiary': `hsl(var(--${normalizedColor}-3-hsl) / 0.86)`,
    '--theme-surface-border': `hsl(var(--${normalizedColor}-4-hsl) / 0.88)`,

    // Text colors - using theme color scale for better contrast
    '--theme-text-primary': `var(--${normalizedColor}-12)`,
    '--theme-text-secondary': `var(--${normalizedColor}-11)`,
    '--theme-text-muted': `var(--${normalizedColor}-10)`,

    // Links - vibrant
    '--theme-link': `var(--${normalizedColor}-9)`,
    '--theme-link-hover': `var(--${normalizedColor}-10)`,

    // Dark theme variants - using HSL for better control
    '--theme-color-primary-dark': `var(--${normalizedColor}-5)`,
    '--theme-color-secondary-dark': `var(--${normalizedColor}-6)`,
    '--theme-color-accent-dark': `var(--${normalizedColor}-4)`,
    '--theme-color-muted-dark': `var(--${normalizedColor}-7)`,
    '--theme-color-border-dark': `var(--${normalizedColor}-6)`,
    '--theme-surface-primary-dark': `hsl(var(--${normalizedColor}-9-hsl) / 0.12)`,
    '--theme-surface-secondary-dark': `hsl(var(--${normalizedColor}-8-hsl) / 0.02)`,
    '--theme-surface-tertiary-dark': `hsl(var(--${normalizedColor}-7-hsl) / 0.03)`,
    '--theme-surface-border-dark': `hsl(var(--${normalizedColor}-6-hsl) / 0.05)`,
    '--theme-text-primary-dark': `var(--${normalizedColor}-1)`,
    '--theme-text-secondary-dark': `var(--${normalizedColor}-2)`,
    '--theme-text-muted-dark': `var(--${normalizedColor}-3)`,
    '--theme-link-dark': `var(--${normalizedColor}-4)`,
    '--theme-link-hover-dark': `var(--${normalizedColor}-3)`,
  };
};
