# Color Palette

The Atelier Fashion color scheme evokes luxury atelier aesthetics with warm, sophisticated tones.

## Primary Colors

### Background
- **background**: `#F6F2EB` - Warm off-white background
  - Usage: Body background, page sections
  - Tailwind: `bg-background`

### Paper/Cards
- **paper**: `#FFFFFF` - Pure white for elevated surfaces
  - Usage: Cards, modals, elevated sections
  - Tailwind: `bg-paper`

### Ink (Text)
- **ink-900** (DEFAULT): `#1F1A17` - Deep brown/ink (primary text)
  - Usage: Headings, body text, primary content
  - Tailwind: `text-ink` or `text-ink-900`
  
- **ink-800**: `#3A3330` - Medium brown (secondary text)
  - Usage: Labels, secondary text
  - Tailwind: `text-ink-800`
  
- **ink-700**: `#4F4843` - Light brown (tertiary text)
  - Usage: Subtle text, captions
  - Tailwind: `text-ink-700`

## Accent Colors

### Olive (Gucci/Golden Goose nod)
- **accent-olive**: `#6B7445` - Muted olive green
  - Usage: CTAs, highlights, links
  - Tailwind: `bg-accent-olive`, `text-accent-olive`

### Burgundy (Editorial accent)
- **accent-burgundy**: `#7A231D` - Deep burgundy red
  - Usage: Important CTAs, special badges, highlights
  - Tailwind: `bg-accent-burgundy`, `text-accent-burgundy`

### Sand (Highlight badge)
- **sand**: `#D9C6A3` - Soft sand/beige
  - Usage: Badges, tags, subtle highlights
  - Tailwind: `bg-sand`, `text-sand`

## Utility Colors

### Border
- **border**: `rgba(0, 0, 0, 0.06)` - Very subtle divider lines
  - Usage: Card borders, section dividers, subtle separators
  - Tailwind: `border-border`

## Usage Examples

### Typography
```tsx
<h1 className="font-display text-ink-900">ATELIER</h1>
<p className="font-sans text-ink-800">Secondary text</p>
<span className="text-ink-700">Subtle caption</span>
```

### Sections
```tsx
<section className="bg-background py-24">
  <div className="bg-paper p-8 border border-border">
    {/* Content */}
  </div>
</section>
```

### CTAs & Badges
```tsx
<button className="bg-accent-olive text-paper">
  Shop Collection
</button>

<button className="bg-accent-burgundy text-paper">
  Limited Edition
</button>

<span className="bg-sand text-ink px-3 py-1">
  Archive
</span>
```

## Design Philosophy

This palette creates:
- **Warmth**: The off-white background (#F6F2EB) feels inviting, not clinical
- **Sophistication**: Deep ink tones (#1F1A17) are richer than pure black
- **Subtlety**: Very light borders (rgba 0.06 opacity) create breathing room
- **Accent variety**: Olive and burgundy provide options for different moods
  - Olive: Natural, earthy, calm (think Hermès)
  - Burgundy: Bold, editorial, luxury (think Gucci)

## Not Dead, But Refined

Unlike stark minimalism:
- We use warm tones, not cold grays
- Subtle borders, not harsh lines
- Multiple accent options, not monochrome
- Rich depth in the ink tones
- Sand provides a soft middle ground

## Accessibility Notes

- Ink-900 (#1F1A17) on background (#F6F2EB): **WCAG AAA compliant**
- Accent-olive (#6B7445) on paper (#FFFFFF): **WCAG AA compliant**
- Always test accent colors on their intended backgrounds
- Use ink-900 for body text to ensure readability
