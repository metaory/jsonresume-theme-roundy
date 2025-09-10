# HSL Theming System

This JSON Resume theme uses a pure HSL-based theming system for maximum flexibility and minimal configuration.

## Quick Start

Add theme configuration to your `resume.json`:

```json
{
  "meta": {
    "themeOptions": {
      "hue": 240,
      "sat": 60
    }
  }
}
```

## Configuration Options

### `hue` (number 0-360)
The primary hue value in degrees. Default: `240` (blue)

### `sat` (number 0-100)
The saturation percentage. Default: `60`

Example configurations:
```json
{
  "meta": {
    "themeOptions": {
      "hue": 0,    // Red
      "sat": 80    // High saturation
    }
  }
}
```

```json
{
  "meta": {
    "themeOptions": {
      "hue": 120,  // Green
      "sat": 40    // Low saturation
    }
  }
}
```

## Color Harmony

The system automatically generates harmonious colors:
- **Primary**: Your chosen hue
- **Secondary**: Primary hue + 30°
- **Accent**: Primary hue + 60°

## Auto-Adaptive Dark Mode

The theme automatically adapts to system dark mode preferences using CSS `light-dark()` function - no manual theme switching needed.

## Benefits

- **Infinite Colors** - Any hue/saturation combination
- **Minimal Config** - Just two numbers
- **Auto-Adaptive** - Works in light and dark mode
- **Smooth Updates** - Real-time theme changes
- **No Dependencies** - Pure CSS and minimal JS
- **Performance** - Lightweight and fast

## Browser Support

The theme uses modern CSS features and supports:
- Chrome 90+ (for light-dark() function)
- Firefox 88+
- Safari 14+

For older browsers, the theme gracefully falls back to light mode.
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