import { toggleThemeMode } from '@lib/theme.js'

const toggle = document.querySelector('.theme-toggle')
if (toggle) {
  toggle.addEventListener('click', () => {
    toggleThemeMode()
    document.documentElement.setAttribute('data-theme-manual', 'true')
  })
}
