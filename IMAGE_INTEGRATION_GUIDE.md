# How to Integrate Images from Alin Pinto Portfolio

## Source
https://alinpinto.myportfolio.com/

## Steps to Get Images

### Option 1: Download Manually (Recommended)
1. Visit https://alinpinto.myportfolio.com/
2. Right-click on each image you want
3. Select "Save Image As..."
4. Save to `C:\Users\Casanova\atelier-fashion\public\images\`

### Option 2: Use Browser DevTools
1. Open the portfolio site
2. Press F12 (DevTools)
3. Go to Network tab
4. Reload page
5. Filter by "Img"
6. Right-click on image URLs → Open in new tab
7. Save each image

### Option 3: Contact the Photographer
Since this is a professional portfolio, you should:
- Contact Alin Pinto for permission
- Ask for high-resolution versions
- Negotiate licensing for commercial use

## Where to Save Images

### Hero Images (Wide shots)
Save to: `public/images/`
- `hero-home.jpg` (main landing page)
- `about-hero.jpg` (about page header)

### Collection Images
Save to: `public/images/collections/`
- `atelier-noir-hero.jpg`
- `atelier-noir-1.jpg`
- `atelier-noir-2.jpg`
- `terre-calme-hero.jpg`
- `terre-calme-1.jpg`
- `archive-hero.jpg`

### Product/Piece Images
Save to: `public/images/pieces/`
- `wool-coat-1.jpg`
- `linen-shirt-1.jpg`
- `wool-trousers-1.jpg`
- `silk-dress-1.jpg`
- `leather-tote-1.jpg`
- `wool-cape-1.jpg`

### Editorial/Lookbook
Save to: `public/images/editorial/`
- `lookbook-1.jpg`
- `lookbook-2.jpg`
- `lookbook-3.jpg`
- `lookbook-4.jpg`

## Matching Portfolio to Product Types

From Alin Pinto portfolio:

| Portfolio Item | Use As |
|----------------|--------|
| Faux leather cropped pants | `wool-trousers-1.jpg` |
| Leather jacket with zebra | `wool-coat-1.jpg` or hero image |
| Cropped sleeveless top | `linen-shirt-1.jpg` |
| Turtleneck sweater | Alternative piece image |
| Oversized pants | `wool-trousers-1.jpg` |
| Distressed knitwear | `silk-dress-1.jpg` or collection image |

## After Downloading Images

### Update sample-data.ts
Replace the placehold.co URLs with local paths:

```typescript
// Before
heroImage: 'https://placehold.co/1200x1600/D9C6A3/1F1A17?text=Atelier+Noir',

// After
heroImage: '/images/collections/atelier-noir-hero.jpg',
```

### Update page.tsx files
Replace placeholder URLs in:
- `app/page.tsx` (hero and editorial)
- `app/(site)/about/page.tsx` (story blocks)

## Quick Replace Script

After saving images, run this to update all paths:

```powershell
# In your terminal
cd C:\Users\Casanova\atelier-fashion
```

Then I can help you replace all the URLs at once.

## Image Requirements

### Dimensions
- Hero images: 1920x1080 or larger (landscape)
- Product images: 800x1200 or larger (portrait)
- Editorial: 1200x800 or larger (landscape)

### Format
- JPG or PNG
- High quality (not overly compressed)
- File size: 200KB - 2MB each

### Style
- Editorial fashion photography
- Clean backgrounds or contextual
- High contrast, professional lighting
- Matches luxury aesthetic

## Legal Note

⚠️ **Important**: These are professional portfolio images. You should:
1. Contact Alin Pinto for permission
2. Credit the photographer appropriately
3. Only use for demonstration/development
4. Replace with licensed images for production

## Quick Start (For Testing)

If you just want to test quickly:
1. Download 3-4 images from the portfolio
2. Save them as:
   - `hero-home.jpg`
   - `wool-coat-1.jpg`
   - `lookbook-1.jpg`
3. Place in `public/images/`
4. I'll help you update the code to use them

---

**Next Step**: Download some images and let me know - I'll update all the code to use them!
