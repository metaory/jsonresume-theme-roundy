import { getSectionTitleWithTheme } from './theme.js';
import Skills from '../components/Skills.astro';
import Languages from '../components/Languages.astro';
import Interests from '../components/Interests.astro';
import Generic from '../components/Generic.astro';

// Component mapping for special sections
const componentMap = {
  skills: Skills,
  languages: Languages,
  interests: Interests
};

// Load sections - only load sections with data
export const loadSections = async (resumeData) => {
  const { meta, basics, ...sections } = resumeData;
  
  return Object.entries(sections)
    .filter(([_, data]) => data?.length > 0)
    .map(([sectionName, data]) => ({
      sectionName,
      Component: componentMap[sectionName] || Generic,
      props: { 
        items: data, 
        meta, 
        sectionName: componentMap[sectionName] ? undefined : sectionName 
      },
      title: getSectionTitleWithTheme(sectionName, meta)
    }));
}; 