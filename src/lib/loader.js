import { getSectionTitleWithTheme } from './theme.js';
import MagicSection from '../components/MagicSection.astro';
import Skills from '../components/Skills.astro';
import Languages from '../components/Languages.astro';
import Interests from '../components/Interests.astro';

// Component mapping for special sections
const componentMap = {
  skills: Skills,
  languages: Languages,
  interests: Interests
};

// Load sections using the unified MagicSection component
export const loadSections = async (resumeData) => {
  const { meta, basics, ...sections } = resumeData;
  const loadedSections = [];
  
  for (const [sectionName, data] of Object.entries(sections)) {
    if (data?.length > 0) {
      const title = getSectionTitleWithTheme(sectionName, meta);
      const Component = componentMap[sectionName] || MagicSection;
      
      loadedSections.push({ 
        sectionName, 
        Component, 
        props: { items: data, meta, sectionName }, 
        title 
      });
    }
  }
  
  return loadedSections;
}; 