import { getSectionTitleWithTheme } from './theme.js';

// Capitalize first letter for component naming convention
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Dynamic component loader
const loadComponent = async (componentName) => {
  try {
    const module = await import(`../components/${componentName}.astro`);
    return module.default;
  } catch (error) {
    console.warn(`Component not found: ${componentName}.astro`);
    return null;
  }
};

// Load sections using dynamic imports
export const loadSections = async (resumeData) => {
  const { meta, basics, ...sections } = resumeData;
  const loadedSections = [];
  
  for (const [sectionName, data] of Object.entries(sections)) {
    if (data?.length > 0) {
      const componentName = capitalize(sectionName);
      const Component = await loadComponent(componentName);
      
      if (Component) {
        const title = getSectionTitleWithTheme(sectionName, meta);
        loadedSections.push({ 
          sectionName, 
          Component, 
          props: { items: data, meta }, 
          title 
        });
      }
    }
  }
  
  return loadedSections;
}; 