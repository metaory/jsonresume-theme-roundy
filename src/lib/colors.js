const levelColors = {
  'Beginner': 'var(--theme-color-primary)',
  'Intermediate': 'var(--theme-color-secondary)', 
  'Advanced': 'var(--theme-color-accent)',
  'Master': 'var(--theme-color-primary)',
  'Expert': 'var(--theme-color-secondary)'
}

export const getLevelColor = (level) => {
  const normalized = level?.toLowerCase()
  
  if (normalized?.includes('beginner') || normalized?.includes('basic')) {
    return levelColors.Beginner
  }
  if (normalized?.includes('intermediate') || normalized?.includes('conversational')) {
    return levelColors.Intermediate
  }
  if (normalized?.includes('advanced') || normalized?.includes('fluent')) {
    return levelColors.Advanced
  }
  if (normalized?.includes('master') || normalized?.includes('native')) {
    return levelColors.Master
  }
  if (normalized?.includes('expert')) {
    return levelColors.Expert
  }
  
  return levelColors.Intermediate
} 