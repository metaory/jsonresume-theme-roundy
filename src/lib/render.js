// Unified field configuration and rendering
export const fieldMap = {
  'name|title': ['h3', { class: 'title' }],
  'position|role': ['p', { class: 'position' }],
  'description|summary': ['p', { class: 'description' }],
  'url|link': ['a', { class: 'link', href: true }],
  'email': ['a', { class: 'contact', href: 'mailto:' }],
  'phone': ['a', { class: 'contact', href: 'tel:' }],
  'date|startDate|endDate': ['time', { class: 'date' }],
  'location|address': ['span', { class: 'location' }],
  'highlights|achievements': ['ul', { class: 'list', isList: true }],
  'keywords|skills|tags': ['div', { class: 'tags', isTags: true }],
  'profiles': ['div', { class: 'profiles', isProfiles: true }],
  'label': ['p', { class: 'label' }],
  'image': ['img', { class: 'avatar', isImage: true }],
  'logo': ['img', { class: 'logo', isImage: true }],
  'organization|institution|company': ['p', { class: 'organization' }],
  'area|studyType': ['p', { class: 'area' }],
  'score': ['span', { class: 'score' }],
  'awarder|issuer|publisher': ['p', { class: 'issuer' }],
  'network': ['span', { class: 'network' }],
  'username': ['span', { class: 'username' }],
  'level|fluency': ['span', { class: 'level' }],
  'courses': ['ul', { class: 'courses', isList: true }],
  'roles': ['ul', { class: 'roles', isList: true }]
};

// Single-pass field processor
export const processField = (key, value) => {
  if (!value) return null;
  
  const field = Object.entries(fieldMap).find(([pattern]) => 
    new RegExp(pattern).test(key)
  )?.[1] || ['p', {}];
  
  const [tag, attrs] = field;
  
  return { 
    key, 
    value, 
    tag, 
    class: attrs.class, 
    href: attrs.href, 
    isList: attrs.isList, 
    isTags: attrs.isTags,
    isProfiles: attrs.isProfiles,
    isImage: attrs.isImage,
    setHtml: attrs.setHtml
  };
};

// Unified renderer for any data structure
export const renderData = (data, layout = null) => {
  if (!data) return [];
  
  // Handle arrays (sections like work, education, etc.)
  if (Array.isArray(data)) {
    return data.map(item => renderData(item, layout));
  }
  
  // Handle objects (single items or basics)
  const fields = Object.entries(data)
    .map(([key, value]) => processField(key, value))
    .filter(Boolean);
  
  // If no layout specified, return all fields
  if (!layout) return fields;
  
  // Apply layout filtering
  return layout.sections.map(section => ({
    class: section.class,
    fields: section.fields ? fields.filter(f => section.fields.includes(f.key)) : fields,
    dateRange: section.special === 'dateRange' ? { start: data.startDate, end: data.endDate } : null
  }));
};

// Layout configurations
export const layouts = {
  work: {
    container: 'item',
    sections: [
      { class: 'item-header', fields: ['name', 'position', 'company'] },
      { class: 'item-meta', special: 'dateRange' },
      { class: 'item-content', fields: ['summary', 'highlights', 'keywords'] }
    ]
  },
  volunteer: {
    container: 'item',
    sections: [
      { class: 'item-header', fields: ['organization', 'position'] },
      { class: 'item-meta', special: 'dateRange' },
      { class: 'item-content', fields: ['summary', 'highlights'] }
    ]
  },
  education: {
    container: 'item',
    sections: [
      { class: 'item-header', fields: ['institution', 'area', 'studyType'] },
      { class: 'item-meta', special: 'dateRange' },
      { class: 'item-content', fields: ['score', 'courses'] }
    ]
  },
  projects: {
    container: 'project-item',
    sections: [
      { class: 'project-header', fields: ['name', 'url'] },
      { class: 'project-meta', special: 'dateRange' },
      { class: 'project-content', fields: ['description', 'highlights', 'keywords', 'roles'] }
    ]
  },
  skills: {
    container: 'skill-item',
    sections: [
      { class: 'skill-content', fields: ['name', 'level', 'keywords'] }
    ]
  }
};

// Special contact items processor
export const processContactItems = (contactData) => {
  const items = [
    { label: 'Email', value: contactData.email, href: contactData.email ? `mailto:${contactData.email}` : null },
    { label: 'Phone', value: contactData.phone, href: contactData.phone ? `tel:${contactData.phone}` : null },
    { label: 'Website', value: contactData.url, href: contactData.url },
    { 
      label: 'Location', 
      value: contactData.location ? [
        contactData.location.address,
        contactData.location.city,
        contactData.location.region,
        contactData.location.postalCode
      ].filter(Boolean).join(', ') : null
    }
  ].filter(item => item.value);
  
  return items;
};

// Legacy exports for backward compatibility
export const getFieldConfig = processField;
export const getFieldConfigs = (data) => renderData(data);
export const renderBasics = (basics) => renderData(basics);
export const renderContactItems = processContactItems; 