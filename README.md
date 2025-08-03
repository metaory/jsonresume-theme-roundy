# JSON Resume Theme - Roundy

## RC 4

<div align="center">
  <img src="src/assets/icons/logo.svg" alt="Roundy Theme Logo" width="120" height="120">
  <h1>Roundy Theme</h1>
  <p>A modern, functional, and composable JSON Resume theme built with Astro</p>
  
  [![Astro](https://img.shields.io/badge/Astro-4.0+-000000?logo=astro)](https://astro.build/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Open Props](https://img.shields.io/badge/Open%20Props-1.7.16-blue.svg)](https://open-props.style/)
</div>

## ✨ Features

- **🎨 Runtime Theming** - Customize colors and section titles via `meta.themeOptions`
- **🌙 Dark/Light Mode** - Toggle between themes with persistent preference
- **📱 Responsive Design** - Mobile-first with CSS Grid layouts
- **⚡ Vanilla JS** - No frameworks, just pure Astro components
- **🧩 Composable** - One file per resume section for maximum reusability
- **🎯 Functional** - Pure utilities, no state management
- **📦 Minimal** - < 50 lines per component, DRY principles
- **🚀 Fast** - Static generation with optimized CSS

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your resume data:**
   ```bash
   cp .dev/sample.json src/data/resume.json
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Theme Configuration

This theme uses [Open Props](https://open-props.style/) for modern, consistent theming. Customize your resume appearance through the `meta.themeOptions` in your JSON:

```json
{
  "meta": {
    "themeOptions": {
      "color": "indigo",
      "sectionTitles": {
        "works": "Work Experience",
        "skills": "Technical Skills",
        "projects": "Portfolio"
      }
    }
  }
}
```

### Available Color Themes

Choose from 19 expertly crafted color themes: `gray`, `stone`, `red`, `pink`, `purple`, `violet`, `indigo`, `blue`, `cyan`, `teal`, `green`, `lime`, `yellow`, `orange`, `choco`, `brown`, `sand`, `camo`, `jungle`.

**Performance Optimized**: Only loads the specific color theme (~1.3kB), not the entire Open Props library.

<details>
<summary><strong>📖 Complete Theming Documentation</strong></summary>

### Color Themes
- **Case Insensitive**: Colors work with any case (`"red"`, `"Red"`, `"RED"`)
- **Fallback**: Invalid colors default to `indigo`
- **Dynamic**: Colors are applied at build time for optimal performance

### Section Titles
Customize any section title by adding it to `sectionTitles`:
```json
{
  "meta": {
    "themeOptions": {
      "sectionTitles": {
        "works": "Professional Experience",
        "skills": "Technical Expertise",
        "projects": "Portfolio Projects",
        "education": "Academic Background"
      }
    }
  }
}
```

### Dark/Light Mode
- **Automatic**: Respects system preference
- **Manual Toggle**: Click the sun/moon button
- **Persistent**: Saves preference in localStorage
- **Smooth Transitions**: CSS transitions for theme switching

</details>

## 📋 Schema Coverage

<details>
<summary><strong>✅ Complete JSON Resume Schema Support</strong></summary>

| Section | Status | Description |
|---------|--------|-------------|
| **basics** | ✅ | Personal information, contact, profiles |
| **work** | ✅ | Work experience with highlights |
| **volunteer** | ✅ | Volunteer experience |
| **education** | ✅ | Education history with courses |
| **awards** | ✅ | Awards and recognition |
| **certificates** | ✅ | Professional certificates |
| **publications** | ✅ | Publications and papers |
| **skills** | ✅ | Professional skills with levels |
| **languages** | ✅ | Language proficiency |
| **interests** | ✅ | Personal interests with keywords |
| **references** | ✅ | Professional references |
| **projects** | ✅ | Project portfolio with roles |
| **meta** | ✅ | Theme configuration |

### Section Ordering
The order of sections in your resume is determined by the order of keys in your JSON file. Simply reorder the section keys in `src/data/resume.json` to change the display order:

```json
{
  "basics": { ... },
  "skills": [ ... ],      // First section
  "work": [ ... ],        // Second section  
  "projects": [ ... ],    // Third section
  "education": [ ... ],   // Fourth section
  // ... other sections
}
```

This approach is clean, intuitive, and requires no additional configuration.

</details>

## 📁 Project Structure

<details>
<summary><strong>🏗️ Detailed Project Architecture</strong></summary>

```
src/
├── components/          # One file per resume section
│   ├── Basics.astro    # Header, contact, profiles
│   ├── Work.astro      # Work experience
│   ├── Volunteer.astro # Volunteer experience
│   ├── Education.astro # Education history
│   ├── Skills.astro    # Skills and languages
│   ├── Projects.astro  # Project portfolio
│   ├── Awards.astro    # Awards and recognition
│   ├── Certificates.astro # Professional certificates
│   ├── Publications.astro # Publications
│   ├── Interests.astro # Personal interests
│   ├── Languages.astro # Language proficiency
│   ├── References.astro # Professional references
│   ├── ThemeToggle.astro # Dark/light mode toggle
│   └── shared/         # Reusable components
│       ├── Section.astro # Section wrapper
│       ├── Icon.astro  # Icon component
│       ├── Tag.astro   # Tag/keyword component
│       └── ...         # Other shared components
├── lib/                # Utilities and theme logic
│   ├── theme.js        # Theme configuration
│   ├── loader.js       # Dynamic component loading
│   └── utils.js        # Utility functions
├── styles/             # Global styles and fonts
│   ├── global.css      # Global styles with Open Props
│   └── fonts.css       # Font imports
├── assets/             # Images and icons
│   └── icons/          # SVG icons
└── data/               # Resume JSON data
    └── resume.json     # Your resume data
```

### Key Design Decisions
- **One Component Per Section**: Each resume section is a separate Astro component
- **Shared Components**: Common UI elements are in `shared/` directory
- **Theme-Driven**: All styling uses CSS custom properties
- **Dynamic Loading**: Components are loaded based on JSON data
- **Static Generation**: Built at compile time for optimal performance

</details>

## 🎯 Design Principles

<details>
<summary><strong>🎨 Design Philosophy & Architecture</strong></summary>

### Core Principles
- **Functional Composition** - Pure utilities, immutable data flow
- **Maximum DRY** - Shared components and utilities
- **Minimal & Clean** - < 50 lines per component
- **Responsive First** - Mobile-optimized layouts
- **Theme-Driven** - Runtime configuration via JSON

### Technical Decisions
- **Vanilla JavaScript**: No framework dependencies
- **CSS Custom Properties**: Dynamic theming without JavaScript
- **Open Props**: Modern, consistent design tokens
- **Astro**: Static generation with component islands
- **Iconify**: Dynamic icon loading for flexibility

### Performance Optimizations
- **Static Generation**: Pre-built HTML for fast loading
- **CSS Optimization**: Only load required color themes
- **Minimal JavaScript**: Theme toggle only
- **Responsive Images**: Optimized image loading
- **Font Optimization**: System font fallbacks

</details>

## 🛠️ Built With

<details>
<summary><strong>🔧 Technology Stack & Dependencies</strong></summary>

### Core Technologies
- **[Astro](https://astro.build/)** - Static site generator
- **[Open Props](https://open-props.style/)** - Modern CSS design tokens
- **[Inter Font](https://rsms.me/inter/)** - Modern typeface
- **[Iconify](https://iconify.design/)** - Icon framework

### Development Tools
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server

### CSS & Styling
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Custom Properties** - Dynamic theming
- **CSS Transitions** - Smooth animations
- **Mobile-First** - Responsive design approach

### Performance Features
- **Static Generation** - Pre-built HTML
- **CSS Optimization** - Minimal CSS output
- **Image Optimization** - Responsive images
- **Font Optimization** - System font fallbacks

</details>

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ using Astro</p>
  <p>Part of the <a href="https://jsonresume.org/">JSON Resume</a> ecosystem</p>
</div>
