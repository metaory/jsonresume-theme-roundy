export const levelColors = {
  'Beginner': '#ef4444',
  'Intermediate': '#f59e0b', 
  'Advanced': '#10b981',
  'Master': '#3b82f6',
  'Expert': '#8b5cf6'
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