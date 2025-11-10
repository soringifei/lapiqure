# Contributing to LA PIQÛRE

## Development Standards

### Code Quality

**Clean Code Principles**
- No commented-out code in production
- No console.log/console.error in production code
- Remove all debug statements before committing
- No placeholder comments (TODO, FIXME, etc.) without associated tickets
- Code should be self-documenting; use clear variable and function names

**Code Style**
- Use TypeScript for all new files
- Follow existing patterns and conventions in the codebase
- Maintain consistent indentation (2 spaces)
- Use meaningful component and variable names
- Keep components focused and single-responsibility

### Component Guidelines

**React/Next.js Best Practices**
- Use 'use client' directive only when necessary
- Prefer server components when possible
- Implement proper error boundaries
- Use proper TypeScript types, avoid 'any'
- Extract reusable logic into custom hooks

**Performance**
- Optimize images using Next Image component
- Lazy load non-critical components
- Use proper image sizes and formats
- Implement blur placeholders for images
- Minimize bundle size

### Styling Standards

**Tailwind CSS**
- Use design system tokens (colors, spacing, typography)
- Avoid arbitrary values unless absolutely necessary
- Follow mobile-first responsive design
- Maintain consistent spacing and typography scales
- Use semantic color names from the palette

**Color Palette**
- Primary: `#0479c8` (accent-orange in config)
- Paper: `#faf9f7`
- Ink: `#1a1a1a`
- Follow the defined color system in tailwind.config.ts

### Git Workflow

**Commit Messages**
- Use clear, descriptive commit messages
- Format: `type: brief description`
- Types: feat, fix, refactor, style, docs, test, chore
- Example: `feat: add waitlist modal for out-of-stock products`

**Pull Requests**
- Clean code before submitting PR
- Remove all debug statements
- Remove HTML-style comments used for organization
- Test locally before pushing
- Ensure no console statements in production code
- Update documentation if needed

**Branch Strategy**
- Work on feature branches
- Keep master/main stable
- Merge only tested, production-ready code

### File Organization

**Component Structure**
```
components/
├── ui/              # Base UI components (buttons, dialogs, etc.)
├── [feature].tsx    # Feature-specific components
└── [shared].tsx     # Shared components
```

**Naming Conventions**
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case or Tailwind utilities

### Testing Standards

- Test critical user flows
- Verify responsive design on multiple devices
- Check performance with Lighthouse
- Validate forms and error states
- Test authentication flows

### Pre-Commit Checklist

Before committing code, verify:
- [ ] No console.log or debug statements
- [ ] No commented-out code blocks
- [ ] No TODO/FIXME comments without tickets
- [ ] No HTML-style organizational comments
- [ ] TypeScript types properly defined
- [ ] Code follows existing patterns
- [ ] Responsive design tested
- [ ] Images optimized
- [ ] No unnecessary dependencies added

### Documentation

- Keep README.md updated
- Document complex logic
- Update WARP.md with project-specific rules
- Maintain clear prop interfaces
- Add JSDoc for utility functions

### Author

Project maintained by soringifei

---

**Remember**: Code quality reflects on the brand. Keep it clean, professional, and production-ready.
