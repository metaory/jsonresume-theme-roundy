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
  '--theme-color-primary': 'var(--indigo-6)',
  '--theme-color-secondary': 'var(--indigo-5)',
  '--theme-color-accent': 'var(--indigo-7)',
  '--theme-color-muted': 'var(--indigo-3)',
  '--theme-color-border': 'var(--indigo-4)',
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
  
  // This will be used at build time to generate the appropriate CSS
  return {
    '--theme-color-primary': `var(--${normalizedColor}-6)`,
    '--theme-color-secondary': `var(--${normalizedColor}-5)`,
    '--theme-color-accent': `var(--${normalizedColor}-7)`,
    '--theme-color-muted': `var(--${normalizedColor}-3)`,
    '--theme-color-border': `var(--${normalizedColor}-4)`,
    // Dark theme variants - use lighter shades for better contrast
    '--theme-color-primary-dark': `var(--${normalizedColor}-4)`,
    '--theme-color-secondary-dark': `var(--${normalizedColor}-5)`,
    '--theme-color-accent-dark': `var(--${normalizedColor}-3)`,
    '--theme-color-muted-dark': `var(--${normalizedColor}-6)`,
    '--theme-color-border-dark': `var(--${normalizedColor}-5)`,
  };
}; 