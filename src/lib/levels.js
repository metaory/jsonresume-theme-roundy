export const LEVEL_MAPPINGS = {
  beginner: {
    keywords: ['beginner', 'basic'],
    width: '25%',
    class: 'level-beginner'
  },
  intermediate: {
    keywords: ['intermediate', 'conversational'],
    width: '50%',
    class: 'level-intermediate'
  },
  advanced: {
    keywords: ['advanced', 'fluent'],
    width: '75%',
    class: 'level-advanced'
  },
  master: {
    keywords: ['master', 'native'],
    width: '100%',
    class: 'level-master'
  },
  expert: {
    keywords: ['expert'],
    width: '100%',
    class: 'level-expert'
  }
}

export const getLevelMapping = (level) => {
  const normalized = level?.toLowerCase()
  
  for (const [key, mapping] of Object.entries(LEVEL_MAPPINGS)) {
    if (mapping.keywords.some(k => normalized?.includes(k))) {
      return mapping
    }
  }
  
  return LEVEL_MAPPINGS.intermediate
}

export const getLevelWidth = (level) => getLevelMapping(level).width
export const getLevelClass = (level) => getLevelMapping(level).class