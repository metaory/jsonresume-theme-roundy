import { getSectionTitleWithTheme } from './theme.js';
import MagicSection from '../components/MagicSection.astro';

// Load sections using the unified MagicSection component
export const loadSections = async (resumeData) => {
  const { meta, basics, ...sections } = resumeData;
  const loadedSections = [];
  
  for (const [sectionName, data] of Object.entries(sections)) {
    if (data?.length > 0) {
      const title = getSectionTitleWithTheme(sectionName, meta);
      loadedSections.push({ 
        sectionName, 
        Component: MagicSection, 
        props: { items: data, meta, sectionName }, 
        title 
      });
    }
  }
  
  return loadedSections;
}; 