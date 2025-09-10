import { readHue, readSat, theme } from '@lib/theme.js'

const hueEl = /** @type {HTMLInputElement|null} */ (document.getElementById('hue'))
const satEl = /** @type {HTMLInputElement|null} */ (document.getElementById('sat'))
const hueVal = document.getElementById('hue-value')
const satVal = document.getElementById('sat-value')

if (hueEl && satEl && hueVal && satVal) {
  const initHue = readHue()
  const initSat = readSat()
  hueEl.value = String(initHue)
  satEl.value = String(initSat)
  hueVal.textContent = `${initHue}°`
  satVal.textContent = `${initSat}%`

  const onChange = () => {
    const h = Number(hueEl.value)
    const s = Number(satEl.value)
    hueVal.textContent = `${h}°`
    satVal.textContent = `${s}%`
    document.documentElement.setAttribute('data-theme-manual', 'true')
    theme.hue = h
    theme.sat = s
  }

  hueEl.addEventListener('input', onChange)
  satEl.addEventListener('input', onChange)
}
