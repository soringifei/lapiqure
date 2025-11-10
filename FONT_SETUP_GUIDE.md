# Copperplate Font Setup Guide

## Quick Setup

The project is ready for Copperplate webfonts. Follow these steps to add them:

## Option 1: If You Have Copperplate Font Files

### Step 1: Convert to Web Formats
If you have TTF/OTF files, convert them to WOFF/WOFF2:

**Online Converter (Easiest):**
1. Go to [Transfonter](https://transfonter.org/)
2. Upload your Copperplate font files
3. Select formats: WOFF2, WOFF
4. Click "Convert"
5. Download the converted files

### Step 2: Place Files in Project
Copy the converted files to:
```
public/fonts/
├── copperplate.woff2
├── copperplate.woff
├── copperplate-bold.woff2
└── copperplate-bold.woff
```

### Step 3: Verify
The `@font-face` declarations are already in `app/globals.css`:
```css
@font-face {
  font-family: 'Copperplate';
  src: url('/fonts/copperplate.woff2') format('woff2'),
       url('/fonts/copperplate.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Copperplate';
  src: url('/fonts/copperplate-bold.woff2') format('woff2'),
       url('/fonts/copperplate-bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
```

### Step 4: Test
1. Refresh your browser at http://localhost:3000
2. Open DevTools → Network tab
3. Filter by "Fonts"
4. Verify the .woff2/.woff files are loading

## Option 2: Get Licensed Copperplate Fonts

### Adobe Fonts (Recommended)
If you have Adobe Creative Cloud:
1. Go to [Adobe Fonts](https://fonts.adobe.com/)
2. Search for "Copperplate"
3. Activate for web use
4. Download webfont files
5. Place in `public/fonts/`

### Alternative Sources
- [MyFonts](https://www.myfonts.com/) - Commercial license
- [Fonts.com](https://www.fonts.com/) - Commercial license
- [Google Fonts](https://fonts.google.com/) - Free alternatives (not exact Copperplate)

### Free Alternatives (If Needed)
If you can't get Copperplate immediately, these work well:

**Playfair Display** (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
```
Update `tailwind.config.ts`:
```js
fontFamily: {
  display: ['Playfair Display', 'serif'],
}
```

**Cinzel** (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
```

**Cormorant Garamond** (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap');
```

## Option 3: Use System Copperplate (Quick Test)

For now, the site will use system Copperplate if available. The fallback stack is:
```
Copperplate → Copperplate Gothic Light → Copperplate Gothic → serif
```

On macOS, Copperplate is usually installed. On Windows, it may not be.

## Current Status

✅ @font-face declarations added to `globals.css`
✅ Font directory created at `public/fonts/`
✅ Tailwind configured with font-display class
⚠️ Webfont files need to be added

## Testing Without Webfonts

The site will work fine with system fonts while you source Copperplate:
- Headings will use serif fallback
- All styling and colors work perfectly
- Replace fonts later without breaking anything

## File Checklist

Place these files in `public/fonts/`:
- [ ] copperplate.woff2 (required - best format)
- [ ] copperplate.woff (fallback)
- [ ] copperplate-bold.woff2 (optional)
- [ ] copperplate-bold.woff (optional)

## Troubleshooting

### Fonts not loading?
1. Check file names match exactly (case-sensitive)
2. Clear browser cache
3. Check DevTools Console for errors
4. Verify files are in `public/fonts/` not `fonts/`

### Wrong font displaying?
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check font-weight in CSS matches your files
3. Inspect element in DevTools to see computed font-family

### Font looks different than expected?
- Copperplate has many variants (Gothic, Light, etc.)
- Make sure you have the right variant
- Test different variants to match your vision

## Next Steps After Adding Fonts

1. ✅ Fonts load in DevTools Network tab
2. Test on all pages (Home, Collections, About, etc.)
3. Verify headings use Copperplate
4. Check letter-spacing looks good with actual font
5. Adjust font sizes if needed in components

---

**Current Server:** http://localhost:3000
**Font Directory:** `C:\Users\Casanova\atelier-fashion\public\fonts\`
