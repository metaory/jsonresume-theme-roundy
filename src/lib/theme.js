const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const THEME_DEFAULTS = { hue: 240, sat: 60, dark: false };

const hsl = (h, s, l, a) => `hsl(${h} ${s}% ${l}%${a ? ` / ${a}` : ""})`;

const headingSat = (s) => Math.min(100, s + 14);

const sharedColors = (h, s, secondaryHue, accentHue) => ({
  primary: hsl(h, headingSat(s), 50),
  secondary: hsl(secondaryHue, headingSat(s), 50),
  accent: hsl(accentHue, headingSat(s), 60),
});

const enhancedSat = (s, boost) => Math.min(100, s + boost);

const bgSat = (s, base, multiplier) => base + clamp(s * multiplier, 8, 40);

const tagSat = (s) => Math.min(35, s * 0.5);

const colorConfigs = {
  dark: (h, s, secondaryHue, accentHue, textSat) => ({
    ...sharedColors(h, s, secondaryHue, accentHue),
    bg: hsl(h, bgSat(s, 10, 0.25), 8),
    surface: hsl(h, bgSat(s, 10, 0.2), 12, 0.2),
    wash: hsl(h, s, 20, 0.4),
    "tag-default-bg": hsl(h, tagSat(s), 18),
    "tag-default-color": hsl(h, textSat, 92),
    "tag-subtle-bg": hsl(h, tagSat(s), 22),
    "tag-subtle-color": hsl(h, textSat, 90),
    "tag-primary-bg": hsl(h, tagSat(s), 28),
    "tag-primary-color": hsl(h, textSat, 90),
    "tag-secondary-bg": hsl(secondaryHue, tagSat(s), 28),
    "tag-secondary-color": hsl(h, textSat, 90),
    text: hsl(h, textSat, 95),
    "text-muted": hsl(h, textSat, 72),
    "heading-card": hsl(h, headingSat(s) * 0.7, 82),
    "heading-sub": hsl(h, clamp(s * 0.3, 10, 35), 70),
    link: hsl(h, s, 70),
    "link-hover": hsl(h, enhancedSat(s, 10), 75),
    edge: 'black',
  }),
  light: (h, s, secondaryHue, accentHue, textSat) => ({
    ...sharedColors(h, s, secondaryHue, accentHue),
    bg: hsl(h, bgSat(s, 15, 4), 94),
    surface: hsl(h, bgSat(s, 20, 3.5), 96, 0.2),
    wash: hsl(h, s, 80, 0.4),
    "tag-default-bg": hsl(h, tagSat(s), 92),
    "tag-default-color": hsl(h, textSat, 18),
    "tag-subtle-bg": hsl(h, tagSat(s), 88),
    "tag-subtle-color": hsl(h, textSat, 22),
    "tag-primary-bg": hsl(h, tagSat(s), 88),
    "tag-primary-color": hsl(h, textSat, 22),
    "tag-secondary-bg": hsl(secondaryHue, tagSat(s), 88),
    "tag-secondary-color": hsl(h, textSat, 22),
    text: hsl(h, textSat, 15),
    "text-muted": hsl(h, textSat, 42),
    "heading-card": hsl(h, headingSat(s) * 0.65, 32),
    "heading-sub": hsl(h, clamp(s * 0.35, 12, 40), 42),
    link: hsl(h, s, 50),
    "link-hover": hsl(h, enhancedSat(s, 10), 45),
    edge: 'white',
  }),
};

const HUE_OFFSETS = { secondary: 180, accent: 60 };

const getHueOffsets = (h) =>
  Object.fromEntries(
    Object.entries(HUE_OFFSETS).map(([name, offset]) => [name, (h + offset) % 360])
  );

const computeColors = (h, s, isDark) => {
  const { secondary: secondaryHue, accent: accentHue } = getHueOffsets(h);
  const textSat = clamp(s * 0.1, 5, 20);
  const mode = isDark ? "dark" : "light";

  return colorConfigs[mode](h, s, secondaryHue, accentHue, textSat);
};

const applyTheme = (h, s, isDark) => {
  const colors = computeColors(h, s, isDark);
  const { secondary, accent } = getHueOffsets(h);

  const allProps = {
    hue: String(h),
    sat: String(s),
    "hue-secondary": String(secondary),
    "hue-accent": String(accent),
    ...colors,
  };

  Object.entries(allProps).forEach(([name, value]) =>
    document.documentElement.style.setProperty(`--${name}`, value)
  );
};

const setThemeAttr = (isDark) => {
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light",
  );
};

export const toggleThemeMode = () => {
  theme.dark = !theme.dark;
  return theme.dark ? "dark" : "light";
};

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const updateTheme = debounce((hue, sat) => {
  applyTheme(hue, sat, theme.dark);
  Object.assign(theme, { hue, sat });
}, 16);

export const createThemePicker = () => {
  const sliderConfigs = [
    { prop: "hue", suffix: "°", getArgs: (hue) => [hue, theme.sat] },
    { prop: "sat", suffix: "%", getArgs: (sat) => [theme.hue, sat] },
  ];

  const elementIds = sliderConfigs.flatMap(({ prop }) => [prop, `${prop}-value`]);
  const elements = Object.fromEntries(
    elementIds.map(id => [id.replace("-", ""), document.getElementById(id)])
  );

  if (!Object.values(elements).every(Boolean)) return;

  const updateSliders = (hue, sat) => {
    const values = { hue, sat };
    sliderConfigs.forEach(({ prop, suffix }) => {
      elements[prop].value = values[prop];
      elements[`${prop}value`].textContent = `${values[prop]}${suffix}`;
    });
  };

  updateSliders(theme.hue, theme.sat);

  sliderConfigs.forEach(({ prop, suffix, getArgs }) => {
    elements[prop]?.addEventListener("input", () => {
      const value = Number(elements[prop].value);
      elements[`${prop}value`].textContent = `${value}${suffix}`;
      updateTheme(...getArgs(value));
    });
  });

  document.querySelectorAll(".preset-circle").forEach((circle) => {
    circle.addEventListener("click", () => {
      const hue = parseInt(circle.dataset.hue || "0");
      const sat = parseInt(circle.dataset.sat || "0");
      updateSliders(hue, sat);
      updateTheme(hue, sat);
    });
  });
};

const propTransforms = {
  hue: (value) => clamp(Math.round(value), 0, 360),
  sat: (value) => clamp(Math.round(value), 0, 100),
  dark: (value) => Boolean(value),
};

const handlePropChange = (target, prop, value) => {
  const transform = propTransforms[prop];
  if (!transform) return false;

  target[prop] = transform(value);

  if (prop === "dark") setThemeAttr(target.dark);
  applyTheme(target.hue, target.sat, target.dark);

  return true;
};

const getInitialTheme = () => {
  if (typeof document === "undefined") return THEME_DEFAULTS;
  const style = getComputedStyle(document.documentElement);
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    ...THEME_DEFAULTS,
    hue: parseInt(style.getPropertyValue("--hue")) || THEME_DEFAULTS.hue,
    sat: parseInt(style.getPropertyValue("--sat")) || THEME_DEFAULTS.sat,
    dark: isDark,
  };
};

const initializeTheme = () => {
  const initialTheme = getInitialTheme();
  if (typeof document !== "undefined") {
    applyTheme(initialTheme.hue, initialTheme.sat, initialTheme.dark);
    setThemeAttr(initialTheme.dark);
  }
  return initialTheme;
};

export const theme = new Proxy(initializeTheme(), {
  set(target, prop, value) {
    return handlePropChange(target, prop, value);
  },
});
