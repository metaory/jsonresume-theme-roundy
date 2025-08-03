// Simple field configuration for Magic Render
export const getFieldConfig = (key, value) => {
  if (!value) return null;
  
  const fieldMap = {
    'name|title': ['h3', { class: 'title' }],
    'position|role': ['p', { class: 'position' }],
    'description|summary': ['p', { class: 'description' }],
    'url|link': ['a', { class: 'link', href: true }],
    'email': ['a', { class: 'contact', href: 'mailto:' }],
    'phone': ['a', { class: 'contact', href: 'tel:' }],
    'date|startDate|endDate': ['time', { class: 'date' }],
    'location|address': ['span', { class: 'location' }],
    'highlights|achievements': ['ul', { class: 'list', isList: true }],
    'keywords|skills|tags': ['div', { class: 'tags', isTags: true }]
  };
  
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
    isTags: attrs.isTags 
  };
};

// Get all field configs for an object
export const getFieldConfigs = (data) => 
  Object.entries(data)
    .map(([key, value]) => getFieldConfig(key, value))
    .filter(Boolean); 