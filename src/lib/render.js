// Simple field rendering
export const renderField = (tag, value, attrs = {}) => {
  if (!value) return null;

  const attrsStr = Object.entries(attrs)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  return `<${tag}${attrsStr ? ' ' + attrsStr : ''}>${value}</${tag}>`;
};

// Clean data by removing falsy values
export const cleanData = (data) =>
  Object.fromEntries(Object.entries(data).filter(([_, val]) => !!val));

// Get appropriate tag for field
export const getFieldTag = (key) => {
  const fieldMap = {
    'name|title': 'h3',
    'position|role': 'p',
    'description|summary': 'p',
    'url|link': 'a',
    'email': 'a',
    'phone': 'a',
    'date|startDate|endDate': 'time',
    'location|address': 'span',
    'organization|institution|company': 'p',
    'area|studyType': 'p',
    'score': 'span',
    'level|fluency': 'span',
    'language': 'h4'
  };

  const entry = Object.entries(fieldMap).find(([pattern]) =>
    new RegExp(pattern).test(key)
  );
  return entry ? entry[1] : 'p';
};

// Render field with automatic tag selection
export const renderAutoField = (key, value, attrs = {}) =>
  renderField(getFieldTag(key), value, { class: key, ...attrs });

// Render entire object using field mapping
export const renderObject = (obj, customTags = {}) =>
  Object.entries(cleanData(obj)).map(([key, value]) =>
    renderField(customTags[key] || getFieldTag(key), value, { class: key })
  );

// Simple conditional rendering
export const renderConditional = (condition, content) =>
  condition ? content : null;

// Array rendering with filtering
export const renderArray = (array, renderFn) =>
  Array.isArray(array) ? array.map(renderFn) : [];

// Component configs
const componentConfigs = {
  skills: {
    levels: {
      'Master': { width: '100%', color: '#10b981' },
      'Advanced': { width: '85%', color: '#3b82f6' },
      'Intermediate': { width: '65%', color: '#f59e0b' },
      'Beginner': { width: '40%', color: '#ef4444' }
    }
  },
  languages: {
    levels: {
      'Master': { dots: 5, color: '#10b981', label: 'Native' },
      'Advanced': { dots: 4, color: '#3b82f6', label: 'Fluent' },
      'Intermediate': { dots: 3, color: '#f59e0b', label: 'Conversational' },
      'Beginner': { dots: 2, color: '#ef4444', label: 'Basic' }
    }
  },
  interests: {
    categories: {
      'Terminals': { icon: 'ph:terminal', color: '#10b981' },
      'Window Managers': { icon: 'ph:monitor', color: '#3b82f6' },
      'Text Editors': { icon: 'ph:file-text', color: '#f59e0b' },
      'default': { icon: 'ph:heart', color: '#ef4444' }
    }
  }
};

// Component renderer
export const renderComponent = (type, data, meta = null) => {
  const config = componentConfigs[type];
  if (!config) return { data: renderArray(data, cleanData) };

  const userConfig = meta?.themeOptions?.componentConfig?.[type];
  const finalConfig = userConfig ? { ...config, ...userConfig } : config;

  return {
    config: finalConfig,
    data: renderArray(data, item => ({
      ...item,
      config: finalConfig[type === 'skills' ? 'levels' : type === 'languages' ? 'levels' : 'categories'][
        item[type === 'skills' ? 'level' : type === 'languages' ? 'fluency' : 'name']
      ] || finalConfig[type === 'skills' ? 'levels' : type === 'languages' ? 'levels' : 'categories']['default'] ||
         finalConfig[type === 'skills' ? 'levels' : type === 'languages' ? 'levels' : 'categories']['Beginner']
    }))
  };
};

// Contact items processor
export const processContactItems = (contactData, meta = null) => {
  const labels = meta?.themeOptions?.contactLabels || {
    email: 'Email', phone: 'Phone', website: 'Website', location: 'Location'
  };

  return [
    { label: labels.email, value: contactData.email, href: contactData.email ? `mailto:${contactData.email}` : null },
    { label: labels.phone, value: contactData.phone, href: contactData.phone ? `tel:${contactData.phone}` : null },
    { label: labels.website, value: contactData.url, href: contactData.url },
    {
      label: labels.location,
      value: contactData.location ? [
        contactData.location.address,
        contactData.location.city,
        contactData.location.region,
        contactData.location.postalCode
      ].filter(Boolean).join(', ') : null
    }
  ].filter(item => item.value);
};


