# Icon Usage

This theme uses [Iconify](https://iconify.design/) for on-demand icon loading via web components.

## Usage

### Basic Icon
```astro
---
import Icon from './src/components/shared/Icon.astro';
---

<Icon name="ph:envelope" />
```

### With Size
```astro
<Icon name="ph:envelope" size="2em" />
```

### With Color
```astro
<Icon name="ph:envelope" color="#ff0000" />
```

### With Custom Class
```astro
<Icon name="ph:envelope" class="my-icon" />
```

## Available Icon Sets

Browse icons at [Iconify](https://iconify.design/icons/):

- **Phosphor Icons**: `ph:icon-name`
- **Material Design**: `mdi:icon-name`
- **Feather Icons**: `feather:icon-name`
- **Lucide**: `lucide:icon-name`
- **Heroicons**: `heroicons:icon-name`

## Direct Web Component Usage

You can also use the web component directly:

```astro
<iconify-icon icon="ph:envelope" style="font-size: 2em; color: red;"></iconify-icon>
```

## Features

- **On-demand loading**: Icons are downloaded only when needed
- **No layout shift**: CSS prevents layout shifts during loading
- **Shadow DOM**: Icons are isolated from page styles
- **SSR compatible**: Works with Astro's server-side rendering 