import { DEFAULT_ICONS } from './default-icons.js'

const FALLBACK_ICON = "mdi:help-circle"

const getIcon = (key, meta) => {
	if (!key) return FALLBACK_ICON
	
	const userIcons = meta?.themeOptions?.icons || {}
	const normalizedKey = key.toLowerCase().trim()
	
	return userIcons[normalizedKey] || DEFAULT_ICONS[normalizedKey] || FALLBACK_ICON
}

export const getIconForKeyword = getIcon
export const getIconForSection = getIcon 