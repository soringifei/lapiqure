# Premium Design System & References

## Image Source
**Primary Portfolio**: https://alinpinto.myportfolio.com
- Use images from this portfolio for all product photography
- Maintain the editorial, artistic style
- High-quality fashion photography aesthetic

## Luxury Brand UX Patterns

### 1. Hermès-Style Micro-interactions
**Characteristics:**
- Subtle hover states with smooth transitions (400-700ms)
- Elements that "breathe" (slight scale on hover: 1.02-1.05)
- Delayed reveals (stagger animations)
- Refined cursor interactions

**Implementation:**
```css
transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
hover:scale-105
hover:shadow-2xl
```

### 2. Le Labo/Gucci Editorial Scrolling
**Characteristics:**
- Parallax effects on hero images
- Scroll-triggered fade-ins
- Horizontal scroll galleries (editorial strips)
- Section reveals with opacity + transform

**Key Features:**
- Images load with fade-in animation
- Text appears after images (300ms delay)
- Smooth scroll behavior
- Sticky navigation that fades in/out

### 3. Louis Vuitton Grid Mastery
**Characteristics:**
- Asymmetric grids that feel balanced
- Variable image sizes (some full-width, some grid)
- Generous white space (2-3x normal padding)
- Images break the grid intentionally

**Implementation:**
- Use `aspect-ratio` for consistent sizing
- Mix aspect ratios: [4/5], [16/9], [1/1]
- Offset elements with negative margins

### 4. Golden Goose "Story-First" Approach
**Characteristics:**
- Large typography (3xl-5xl for headings)
- Long-form copy that reads like editorial
- Images paired with narrative text blocks
- "This piece has a life" storytelling

**Copy Style:**
- Personal, intimate voice
- Craftsmanship details
- Origin stories
- Material provenance

## Premium UI Components to Add

### 1. Smooth Page Transitions
```tsx
// Add to layout.tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
>
```

### 2. Image Lazy Load with Blur-Up
- Low-quality placeholder loads first
- High-quality fades in over it
- Shimmer effect during load

### 3. Cursor Interactions
- Custom cursor on hover over links/images
- Magnetic buttons (follow cursor slightly)
- Drag-to-scroll indicators

### 4. Micro-animations
- Add to cart: item flies to cart icon
- Wishlist heart: scale + color change
- Filter chips: smooth slide in/out
- Dropdown menus: fade + slide from top

### 5. Loading States
- Skeleton screens (not spinners)
- Progressive image loading
- Smooth content swaps

## Typography Enhancements

### Current
- Display: Copperplate
- Body: System UI

### Premium Additions
**Hierarchy:**
- Hero titles: 5xl-7xl (72px-96px)
- Section headings: 3xl-4xl (30px-36px)
- Body: 16px-18px (larger than standard)
- Captions: 12px-14px (uppercase, tracked)

**Letter Spacing:**
- Headings: 0.15em (luxury tracking)
- Nav: 0.05em (editorial tracking)
- Body: 0 (normal readability)

**Line Height:**
- Headings: 1.1 (tight, impactful)
- Body: 1.8 (airy, readable)

## Color Usage Patterns

### Backgrounds
- Primary: `#F6F2EB` (warm off-white)
- Elevated: `#FFFFFF` (cards)
- Alternate sections: `bg-sand/10` (subtle tint)

### Text Hierarchy
- Primary: `text-ink` (#1F1A17)
- Secondary: `text-ink-800` (#3A3330)
- Tertiary: `text-ink-700` (#4F4843)

### Accents (Use Sparingly)
- Primary CTA: `bg-ink` + `text-paper`
- Secondary CTA: `bg-accent-olive`
- Limited/Exclusive: `bg-accent-burgundy`
- Badges: `bg-sand`

## Spacing System

### Luxury Spacing (More Generous)
- Section padding: `py-24` (96px) minimum
- Container max-width: `max-w-7xl` (1280px)
- Grid gaps: `gap-12` (48px) or `gap-16` (64px)
- Card padding: `p-8` (32px) or `p-12` (48px)

### Rhythm
- Maintain consistent vertical rhythm
- Use multipliers of 4 or 8
- Add breathing room between sections (80-120px)

## Interactive Elements

### Buttons
**Primary (Dark):**
```tsx
<button className="
  bg-ink text-paper 
  px-8 py-3 
  text-xs uppercase tracking-editorial
  hover:bg-ink-800
  transition-all duration-500
  hover:shadow-2xl
">
```

**Secondary (Outline):**
```tsx
<button className="
  bg-transparent border-2 border-ink text-ink
  px-8 py-3
  hover:bg-ink hover:text-paper
  transition-all duration-500
">
```

### Links
- Underline on hover (with animation)
- Color shift: `text-ink-800` → `text-ink`
- Smooth transition (300ms)

### Cards
- Subtle shadow on hover
- Scale up slightly (1.02)
- Image zoom within container
- All transitions: 600-700ms

## Image Treatment

### Hero Images
- Full viewport height
- Gradient overlay (top: black/20, bottom: black/40)
- Text overlay: white with backdrop-blur
- Ken Burns effect on load (optional)

### Product Images
- Aspect ratio: 3:4 (portrait)
- Hover: scale 1.05 within container
- Multiple images: horizontal scroll
- Zoom on click (modal/lightbox)

### Editorial Images
- Aspect ratio: varies (16:9, 4:5, 1:1)
- Horizontal scroll strip
- No overlay, pure imagery
- Border radius: 0 (keep sharp edges)

## Animation Principles

### Timing
- Fast: 200-300ms (feedback)
- Medium: 400-500ms (state changes)
- Slow: 600-800ms (page transitions, hero elements)

### Easing
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (overshoots)
- Sharp: `cubic-bezier(0.4, 0, 0.6, 1)` (ease-in-out)

### Stagger
- Children animate with 50-100ms delay
- Create wave effect
- Top-to-bottom, left-to-right

## Premium Features to Implement

### Phase 1: Polish Current Pages
1. ✅ Add smooth scroll behavior
2. ✅ Implement hover states on all interactive elements
3. ✅ Add loading skeletons
4. ✅ Improve image loading (blur-up technique)
5. ✅ Add micro-animations to buttons/links

### Phase 2: Advanced Interactions
1. Parallax hero images
2. Scroll-triggered animations (reveal on scroll)
3. Horizontal scroll galleries with drag
4. Image zoom/lightbox
5. Custom cursor

### Phase 3: Motion Design
1. Page transitions (Framer Motion)
2. Animated route changes
3. Loading states between pages
4. Filter/sort animations
5. Add to cart animations

## Mobile-First Premium UX

### Touch Interactions
- Larger touch targets (min 44x44px)
- Swipe gestures for galleries
- Pull-to-refresh feel
- Smooth momentum scrolling

### Responsive Images
- Serve appropriate sizes
- Art direction (different crops for mobile)
- Progressive loading

### Navigation
- Drawer menu with smooth slide
- Fixed nav that hides on scroll down
- Appears on scroll up

## Accessibility (Without Compromising Design)

- Maintain color contrast ratios
- Focus states that match design language
- Screen reader text for icon buttons
- Semantic HTML throughout
- Keyboard navigation support

---

## Quick Implementation Checklist

For immediate premium feel:
- [ ] Increase all transitions to 500-700ms
- [ ] Add `hover:scale-105` to images
- [ ] Increase section padding to `py-24`
- [ ] Add smooth scroll: `scroll-smooth` on html
- [ ] Implement skeleton loading states
- [ ] Add backdrop-blur to navigation
- [ ] Larger typography throughout
- [ ] More generous white space
- [ ] Subtle shadows on hover
- [ ] Stagger animations on lists

**Remember:** Premium feels slow and intentional, not fast and jarring.
