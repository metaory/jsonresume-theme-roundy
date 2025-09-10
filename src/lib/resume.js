import { readdirSync } from 'fs'
import { join } from 'path'

export const getAvailableResumes = () => {
  const dataDir = join(process.cwd(), 'src/data')
  return readdirSync(dataDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''))
}

export const getResumeData = async (resumeName) => {
  const availableResumes = getAvailableResumes()
  const validResume = resumeName && availableResumes.includes(resumeName) 
    ? resumeName 
    : availableResumes[0]

  try {
    const mod = await import(`../data/${validResume}.json`)
    return mod.default || mod
  } catch {
    const fallback = await import(`../data/${availableResumes[0]}.json`)
    return fallback.default || fallback
  }
}
