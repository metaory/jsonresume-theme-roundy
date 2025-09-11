# JSON Resume Theme - Roundy

A modern, customizable JSON Resume theme with dynamic theming and dark mode support.

## Quick Start

```bash
npm install
npm run dev
```

Add your resume data to `src/data/resume.json` and visit `http://localhost:4321`

## Features

- **Dynamic Theming**: HSL-based color system with live customization
- **Dark/Light Mode**: Automatic system detection with manual toggle
- **Multiple Resumes**: Support for multiple resume files
- **Responsive Design**: Mobile-optimized layouts
- **PDF Export**: Built-in PDF generation

## Tech Stack

Built with Astro, vanilla JavaScript, and CSS custom properties.

## Usage

### Resume Data

Place your JSON Resume data in `src/data/`:

```
src/data/
├── resume.json     # Default resume
├── private.json    # Additional resume
└── portfolio.json  # Another resume
```

Access resumes at `/resume`, `/private`, `/portfolio` respectively.

### Theme Customization

Add theme options to your resume JSON:

```json
{
  "meta": {
    "themeOptions": {
      "hue": 240,
      "sat": 60,
      "dark": false
    }
  }
}
```

#### Theme Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hue` | number | 240 | Primary hue (0-360) |
| `sat` | number | 60 | Saturation (0-100) |
| `dark` | boolean | false | Dark mode |

#### Live Theme Editor

In development mode, use the theme picker on the right side to:
- Adjust hue and saturation with sliders
- Select from preset color combinations
- Preview changes in real-time

### Section Customization

Override default section titles:

```json
{
  "meta": {
    "themeOptions": {
      "sectionTitles": {
        "work": "Professional Experience",
        "skills": "Technical Skills",
        "projects": "Portfolio"
      }
    }
  }
}
```

### Section Ordering

Sections display in the order they appear in your JSON file. Reorder sections by changing the key order:

```json
{
  "basics": { ... },
  "skills": [ ... ],     // First section
  "work": [ ... ],       // Second section
  "projects": [ ... ],   // Third section
  "education": [ ... ]   // Fourth section
}
```

### PDF Generation

Generate PDFs with headless Chrome:

```bash
# Single PDFs
npm run pdf:resume
npm run pdf:private

# With specific themes
npm run pdf:resume-light
npm run pdf:resume-dark

# All combinations
npm run pdf:all
```

PDFs are saved in the project root with automatic print optimization.

### Schema Support

Full JSON Resume schema compatibility:

- `basics` - Personal info, contact, profiles
- `work` - Work experience with highlights
- `volunteer` - Volunteer experience
- `education` - Education with courses
- `awards` - Awards and recognition
- `certificates` - Professional certificates
- `publications` - Publications and papers
- `skills` - Skills with proficiency levels
- `languages` - Language proficiency
- `interests` - Personal interests with keywords
- `references` - Professional references
- `projects` - Project portfolio with roles

## Build

```bash
npm run build    # Production build
npm run preview  # Preview build
```

## License

MIT