# Shared Components

Reusable UI components used across different resume sections.

## Components

### Section
Wrapper component for resume sections with consistent title styling.

```astro
---
import Section from './shared/Section.astro';
---

<Section title="Work Experience">
  <!-- Section content -->
</Section>
```

### Tag
Styled keyword/tag component for skills, technologies, etc.

```astro
---
import Tag from './shared/Tag.astro';
---

<Tag text="JavaScript" />
```

### DateRange
Formatted date range display with "Present" fallback.

```astro
---
import DateRange from './shared/DateRange.astro';
---

<DateRange start="2020-01" end="2023-12" />
```

### Item Components
Shared components for rendering different types of items:

- `ExperienceItem.astro` - For work, volunteer, education items
- `SkillItem.astro` - For skills and languages
- `AwardItem.astro` - For awards, certificates, publications
- `ProjectItem.astro` - For project listings
- `InterestItem.astro` - For interest listings
- `ReferenceItem.astro` - For reference listings

## Usage

Import directly from the component files:

```astro
import Section from './shared/Section.astro';
import Tag from './shared/Tag.astro';
import DateRange from './shared/DateRange.astro';
import ExperienceItem from './shared/ExperienceItem.astro';
``` 