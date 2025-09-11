const LEVELS = [
  { keywords: ['beginner', 'basic'], width: '25%', class: 'level-beginner', dots: 2 },
  { keywords: ['intermediate', 'conversational'], width: '50%', class: 'level-intermediate', dots: 3 },
  { keywords: ['advanced', 'fluent'], width: '75%', class: 'level-advanced', dots: 4 },
  { keywords: ['master', 'native'], width: '100%', class: 'level-master', dots: 5 },
  { keywords: ['expert'], width: '100%', class: 'level-expert', dots: 5 }
]

const findLevelMapping = (level) => {
  const normalized = level?.toLowerCase()
  return LEVELS.find(levelMapping => 
    levelMapping.keywords.some(keyword => normalized?.includes(keyword))
  ) || LEVELS[1] // fallback to intermediate
}

export const getLevelMapping = findLevelMapping
export const getLevelWidth = (level) => findLevelMapping(level).width
export const getLevelClass = (level) => findLevelMapping(level).class
export const getLevelDots = (level) => findLevelMapping(level).dots