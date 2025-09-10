import { initTheme } from './theme.js'

const script = document.currentScript
if (script) {
  const cfgStr = script.dataset.themeConfig
  if (cfgStr && cfgStr.length > 0) {
    const cfg = JSON.parse(cfgStr)
    initTheme(cfg.h, cfg.s, cfg.dark)
  } else {
    initTheme()
  }
} else {
  initTheme()
}
