// Available Open Props color themes
export const OPEN_PROPS_COLORS = [
  'gray', 'stone', 'red', 'pink', 'purple', 'violet',
  'indigo', 'blue', 'cyan', 'teal', 'green', 'lime',
  'yellow', 'orange', 'choco', 'brown', 'sand', 'camo', 'jungle'
];

// Default theme configuration
const DEFAULT_THEME = { color: 'indigo' };

// Get theme configuration from resume meta
export const getThemeConfig = (meta) => {
  const color = meta?.themeOptions?.color?.toLowerCase();
  return { color: OPEN_PROPS_COLORS.includes(color) ? color : DEFAULT_THEME.color };
};

// Get section title with theme customization
export const getSectionTitleWithTheme = (sectionName, meta) => {
  const customTitles = meta?.themeOptions?.sectionTitles;
  return customTitles?.[sectionName] || sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
};

// Apply color theme to CSS variables
export const applyColorTheme = (color) => {
  const normalizedColor = color?.toLowerCase();
  if (!OPEN_PROPS_COLORS.includes(normalizedColor)) {
    return {
      '--theme-color-primary': 'hsl(var(--indigo-7-hsl) / 0.7)',
      '--theme-color-secondary': 'hsl(var(--indigo-6-hsl) / 0.6)',
      '--theme-color-accent': 'hsl(var(--indigo-8-hsl) / 0.8)',
      '--theme-color-muted': 'hsl(var(--indigo-4-hsl) / 0.4)',
      '--theme-color-border': 'hsl(var(--indigo-5-hsl) / 0.3)',
      '--theme-surface-primary': 'hsl(var(--indigo-1-hsl) / 0.6)',
      '--theme-surface-secondary': 'hsl(var(--indigo-2-hsl) / 0.4)',
      '--theme-surface-tertiary': 'hsl(var(--indigo-3-hsl) / 0.3)',
      '--theme-surface-border': 'hsl(var(--indigo-4-hsl) / 0.2)',
      '--theme-text-primary': 'hsl(var(--indigo-12-hsl) / 0.9)',
      '--theme-text-secondary': 'hsl(var(--indigo-11-hsl) / 0.7)',
      '--theme-text-muted': 'hsl(var(--indigo-10-hsl) / 0.5)',
      '--theme-link': 'hsl(var(--indigo-9-hsl) / 0.8)',
      '--theme-link-hover': 'hsl(var(--indigo-10-hsl) / 0.9)'
    };
  }

  return {
    // Primary theme colors with lower alpha
    '--theme-color-primary': `hsl(var(--${normalizedColor}-7-hsl) / 0.7)`,
    '--theme-color-secondary': `hsl(var(--${normalizedColor}-6-hsl) / 0.6)`,
    '--theme-color-accent': `hsl(var(--${normalizedColor}-8-hsl) / 0.8)`,
    '--theme-color-muted': `hsl(var(--${normalizedColor}-4-hsl) / 0.4)`,
    '--theme-color-border': `hsl(var(--${normalizedColor}-5-hsl) / 0.3)`,

    // Surfaces with lower alpha for subtle backgrounds
    '--theme-surface-primary': `hsl(var(--${normalizedColor}-1-hsl) / 0.6)`,
    '--theme-surface-secondary': `hsl(var(--${normalizedColor}-2-hsl) / 0.4)`,
    '--theme-surface-tertiary': `hsl(var(--${normalizedColor}-3-hsl) / 0.3)`,
    '--theme-surface-border': `hsl(var(--${normalizedColor}-4-hsl) / 0.2)`,

    // Text colors with lower alpha
    '--theme-text-primary': `hsl(var(--${normalizedColor}-12-hsl) / 0.9)`,
    '--theme-text-secondary': `hsl(var(--${normalizedColor}-11-hsl) / 0.7)`,
    '--theme-text-muted': `hsl(var(--${normalizedColor}-10-hsl) / 0.5)`,

    // Links with lower alpha
    '--theme-link': `hsl(var(--${normalizedColor}-9-hsl) / 0.8)`,
    '--theme-link-hover': `hsl(var(--${normalizedColor}-10-hsl) / 0.9)`
  };
};

// Apply dark mode theme variants
export const applyDarkModeTheme = (color) => {
  let normalizedColor = color?.toLowerCase();
  if (!OPEN_PROPS_COLORS.includes(normalizedColor)) {
    normalizedColor = 'indigo';
  }

  return {
    // Dark mode variants with adjusted colors
    '--theme-color-primary': `hsl(var(--${normalizedColor}-5-hsl) / 0.6)`,
    '--theme-color-secondary': `hsl(var(--${normalizedColor}-6-hsl) / 0.5)`,
    '--theme-color-accent': `hsl(var(--${normalizedColor}-4-hsl) / 0.7)`,
    '--theme-color-muted': `hsl(var(--${normalizedColor}-7-hsl) / 0.4)`,
    '--theme-color-border': `hsl(var(--${normalizedColor}-6-hsl) / 0.3)`,
    '--theme-surface-primary': `hsl(var(--${normalizedColor}-9-hsl) / 0.1)`,
    '--theme-surface-secondary': `hsl(var(--${normalizedColor}-8-hsl) / 0.05)`,
    '--theme-surface-tertiary': `hsl(var(--${normalizedColor}-7-hsl) / 0.08)`,
    '--theme-surface-border': `hsl(var(--${normalizedColor}-6-hsl) / 0.12)`,
    '--theme-text-primary': `hsl(var(--${normalizedColor}-1-hsl) / 0.9)`,
    '--theme-text-secondary': `hsl(var(--${normalizedColor}-2-hsl) / 0.7)`,
    '--theme-text-muted': `hsl(var(--${normalizedColor}-3-hsl) / 0.5)`,
    '--theme-link': `hsl(var(--${normalizedColor}-4-hsl) / 0.8)`,
    '--theme-link-hover': `hsl(var(--${normalizedColor}-3-hsl) / 0.9)`
  };
};
