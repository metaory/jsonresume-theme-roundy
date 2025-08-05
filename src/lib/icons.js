// Fallback icon for missing keywords
const FALLBACK_ICON = "mdi:help-circle"

/**
 * Get merged icon map from resume data and user overrides
 */
export const getIconMap = (meta, resumeData) => {
	const defaultIcons = resumeData?.meta?.icons || {}
	const userIcons = meta?.icons || meta?.themeOptions?.iconMap || {}
	return { ...defaultIcons, ...userIcons }
}

/**
 * Get icon for a keyword, with fallback
 */
export const getIconForKeyword = (keyword, meta, resumeData) => {
	if (!keyword) return FALLBACK_ICON
	
	const iconMap = getIconMap(meta, resumeData)
	const normalizedKeyword = keyword.toLowerCase().trim()
	
	return iconMap[normalizedKeyword] || FALLBACK_ICON
}

/**
 * Get icon for a section name
 */
export const getIconForSection = (sectionName, meta, resumeData) => {
	const iconMap = getIconMap(meta, resumeData)
	const normalizedSection = sectionName.toLowerCase().trim()
	
	return iconMap[normalizedSection] || FALLBACK_ICON
} 