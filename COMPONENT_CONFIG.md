# Theme Configuration

This theme allows you to configure component appearance, field mapping, layouts, and behavior through the `meta.themeOptions` section in your resume JSON.

## Field Mapping Configuration

Configure how different fields are rendered:

```json
{
  "meta": {
    "themeOptions": {
      "fieldMapping": {
        "name|title": { "tag": "h3", "class": "title" },
        "position|role": { "tag": "p", "class": "position" },
        "description|summary": { "tag": "p", "class": "description" },
        "url|link": { "tag": "a", "class": "link", "href": true },
        "email": { "tag": "a", "class": "contact", "href": "mailto:" },
        "phone": { "tag": "a", "class": "contact", "href": "tel:" },
        "date|startDate|endDate": { "tag": "time", "class": "date" },
        "location|address": { "tag": "span", "class": "location" },
        "highlights|achievements": { "tag": "ul", "class": "list", "isList": true },
        "keywords|skills|tags": { "tag": "div", "class": "tags", "isTags": true },
        "profiles": { "tag": "div", "class": "profiles", "isProfiles": true },
        "label": { "tag": "p", "class": "label" },
        "image": { "tag": "img", "class": "avatar", "isImage": true },
        "logo": { "tag": "img", "class": "logo", "isImage": true },
        "organization|institution|company": { "tag": "p", "class": "organization" },
        "area|studyType": { "tag": "p", "class": "area" },
        "score": { "tag": "span", "class": "score" },
        "awarder|issuer|publisher": { "tag": "p", "class": "issuer" },
        "network": { "tag": "span", "class": "network" },
        "username": { "tag": "span", "class": "username" },
        "level|fluency": { "tag": "span", "class": "level" },
        "courses": { "tag": "ul", "class": "courses", "isList": true },
        "roles": { "tag": "ul", "class": "roles", "isList": true }
      }
    }
  }
}
```

## Layout Configuration

Configure how sections are structured:

```json
{
  "meta": {
    "themeOptions": {
      "layouts": {
        "work": {
          "container": "item",
          "sections": [
            { "class": "item-header", "fields": ["name", "position", "company"] },
            { "class": "item-meta", "special": "dateRange" },
            { "class": "item-content", "fields": ["summary", "highlights", "keywords"] }
          ]
        },
        "volunteer": {
          "container": "item",
          "sections": [
            { "class": "item-header", "fields": ["organization", "position"] },
            { "class": "item-meta", "special": "dateRange" },
            { "class": "item-content", "fields": ["summary", "highlights"] }
          ]
        },
        "education": {
          "container": "item",
          "sections": [
            { "class": "item-header", "fields": ["institution", "area", "studyType"] },
            { "class": "item-meta", "special": "dateRange" },
            { "class": "item-content", "fields": ["score", "courses"] }
          ]
        },
        "projects": {
          "container": "project-item",
          "sections": [
            { "class": "project-header", "fields": ["name", "url"] },
            { "class": "project-meta", "special": "dateRange" },
            { "class": "project-content", "fields": ["description", "highlights", "keywords", "roles"] }
          ]
        }
      }
    }
  }
}
```

## Contact Labels Configuration

Customize contact section labels:

```json
{
  "meta": {
    "themeOptions": {
      "contactLabels": {
        "email": "Email",
        "phone": "Phone", 
        "website": "Website",
        "location": "Location"
      }
    }
  }
}
```

## Component Configuration

Configure component appearance and behavior through the `meta.themeOptions.componentConfig` section in your resume JSON.

## Skills Configuration

Configure skill levels, colors, and progress bar widths:

```json
{
  "meta": {
    "themeOptions": {
      "componentConfig": {
        "skills": {
          "levels": {
            "Master": { "width": "100%", "color": "#10b981" },
            "Advanced": { "width": "85%", "color": "#3b82f6" },
            "Intermediate": { "width": "65%", "color": "#f59e0b" },
            "Beginner": { "width": "40%", "color": "#ef4444" }
          }
        }
      }
    }
  }
}
```

## Languages Configuration

Configure fluency levels, dot counts, colors, and labels:

```json
{
  "meta": {
    "themeOptions": {
      "componentConfig": {
        "languages": {
          "levels": {
            "Master": { "dots": 5, "color": "#10b981", "label": "Native" },
            "Advanced": { "dots": 4, "color": "#3b82f6", "label": "Fluent" },
            "Intermediate": { "dots": 3, "color": "#f59e0b", "label": "Conversational" },
            "Beginner": { "dots": 2, "color": "#ef4444", "label": "Basic" }
          }
        }
      }
    }
  }
}
```

## Interests Configuration

Configure interest categories with icons and colors:

```json
{
  "meta": {
    "themeOptions": {
      "componentConfig": {
        "interests": {
          "categories": {
            "Terminals": { "icon": "ph:terminal", "color": "#10b981" },
            "Window Managers": { "icon": "ph:monitor", "color": "#3b82f6" },
            "Text Editors": { "icon": "ph:file-text", "color": "#f59e0b" },
            "default": { "icon": "ph:heart", "color": "#ef4444" }
          }
        }
      }
    }
  }
}
```

## Available Icons

Use any icon from [Iconify](https://iconify.design/icons/):

- **Phosphor Icons**: `ph:icon-name`
- **Material Design**: `mdi:icon-name`
- **Feather Icons**: `feather:icon-name`
- **Lucide**: `lucide:icon-name`
- **Heroicons**: `heroicons:icon-name`

## Color Options

You can use:
- Hex colors: `#10b981`
- CSS color names: `red`, `blue`, `green`
- RGB values: `rgb(16, 185, 129)`
- HSL values: `hsl(160, 84%, 39%)`

## Default Values

If no configuration is provided, components will use sensible defaults that match the theme's design system. 