# Open Props Theming System

This JSON Resume theme uses [Open Props](https://open-props.style/) for consistent, modern theming with minimal configuration.

## Quick Start

Add theme configuration to your `resume.json`:

```json
{
  "meta": {
    "themeOptions": {
      "color": "Indigo"
    }
  }
}
```

## Available Color Themes

Open Props provides 19 expertly crafted color themes:

- **Blue** - Professional, reliable
- **Brown** - Earthy, grounded
- **Camo** - Military, rugged
- **Choco** - Rich, warm
- **Cyan** - Fresh, modern
- **Gray** - Neutral, professional
- **Green** - Growth, success
- **Indigo** - Trustworthy, stable
- **Jungle** - Wild, adventurous
- **Lime** - Energetic, fresh
- **Orange** - Friendly, approachable
- **Pink** - Modern, vibrant
- **Purple** - Creative, innovative
- **Red** - Bold, attention-grabbing
- **Sand** - Natural, organic
- **Stone** - Warm neutral
- **Teal** - Balanced, calm
- **Violet** - Elegant, sophisticated
- **Yellow** - Optimistic, bright

## Configuration Options

### `color` (string)
The color theme to use. Default: `"indigo"`

### `saturation` (number 0..1)
Global saturation scale applied via CSS relative color. Default: `1`.
Example:
```json
{
  "meta": {
    "themeOptions": {
      "color": "indigo",
      "saturation": 0.75
    }
  }
}
```
This scales the S channel for all theme tokens while preserving Open Props hue/lightness/alpha.

## Performance Optimized

This theme only loads the specific color theme you choose, not the entire Open Props library. This results in:

- **Minimal CSS** - Only ~1.3kB per color theme
- **Fast Loading** - No unnecessary styles
- **Clean Dependencies** - Only what you need

## Benefits

- **Consistent Design** - Open Props provides expertly crafted design tokens
- **Minimal Configuration** - Just set a color name
- **Performance** - Only loads what you need
- **Modern** - Uses latest CSS features
- **Accessible** - Built with accessibility in mind
- **Responsive** - Works across all devices

## Browser Support

Open Props uses modern CSS features and supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration from Custom Colors

If you were using the old custom color system:

```json
// Old way
{
  "meta": {
    "themeOptions": {
      "colors": {
        "background": ["#ffffff", "#f8f9fa"],
        "primary": ["#007bff", "#0056b3"]
      }
    }
  }
}

// New way
{
  "meta": {
    "themeOptions": {
      "color": "blue"
    }
  }
}
```

## Examples

### Professional Resume
```json
{
  "meta": {
    "themeOptions": {
      "color": "indigo"
    }
  }
}
```

### Creative Portfolio
```json
{
  "meta": {
    "themeOptions": {
      "color": "purple"
    }
  }
}
```

### Minimal Design
```json
{
  "meta": {
    "themeOptions": {
      "color": "gray"
    }
  }
}
```

## Resources

- [Open Props Documentation](https://open-props.style/)
- [Color Palette Generator](https://open-props.style/color-helper)
- [Open Props GitHub](https://github.com/argyleink/open-props) 