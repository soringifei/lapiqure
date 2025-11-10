# Performance Action Plan - Critical Path to 90+

## Current Status
- **Performance Score**: 59/100
- **LCP (Largest Contentful Paint)**: 10.0s ❌ (Target: <2.5s)
- **FCP (First Contentful Paint)**: 4.4s ⚠️ (Target: <1.8s)
- **Speed Index**: 7.7s ⚠️ (Target: <3.4s)
- **TBT (Total Blocking Time)**: 20ms ✅ (Excellent!)
- **CLS (Cumulative Layout Shift)**: 0 ✅ (Perfect!)

## Root Cause: Hero Image

The main bottleneck is the hero image (`faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg`):
- **File Size**: 1MB (0.96MB)
- **Format**: JPG
- **Loading**: Priority enabled, but source file is too large

## CRITICAL ACTIONS (Do These First!)

### 1. Compress Hero Image (HIGHEST PRIORITY)
**Impact**: Will reduce LCP by 60-70%

The hero image needs to be compressed at the source. Next.js optimization helps but can't overcome a 1MB source file.

**Options**:
```bash
# Option A: Using ImageMagick (if installed)
magick convert public/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg -quality 75 -sampling-factor 4:2:0 -strip -resize 1920x1920\> public/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg

# Option B: Using Sharp (Node.js)
npm install -g sharp-cli
sharp-cli -i public/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg -o public/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg resize 1920 --quality 75 --progressive

# Option C: Online tools
- TinyJPG.com (drag and drop)
- Squoosh.app (Google's image optimizer)
- ImageOptim (Mac app)
```

**Target**: Reduce hero image to ~200-300KB

### 2. Use Next.js Sharp for Production
Install sharp for better image optimization:
```bash
npm install sharp
```

This will automatically be used by Next.js Image component in production builds.

### 3. Implement Static Image Imports
Instead of string paths, use static imports for better optimization:

```tsx
// Before
<Hero imageSrc="/images/hero.jpg" ... />

// After  
import heroImage from '@/public/images/hero_optimized.jpg'
<Hero imageSrc={heroImage} ... />
```

This allows Next.js to:
- Generate blur placeholders automatically
- Optimize at build time
- Serve optimal formats (WebP/AVIF)

## MEDIUM PRIORITY ACTIONS

### 4. Optimize All Product Images
Run batch compression on all images in `public/images/`:

```bash
# If you have ImageMagick
for file in public/images/*.jpg; do
  magick convert "$file" -quality 75 -strip "$file"
done

for file in public/images/*.jpeg; do
  magick convert "$file" -quality 75 -strip "$file"
done
```

### 5. Implement Image CDN
Consider using a CDN for images:
- **Cloudinary** (free tier available)
- **Imgix**
- **Cloudflare Images**
- **Vercel Image Optimization** (if deploying to Vercel)

Benefits:
- Automatic format selection
- Device-specific sizing
- Global edge caching
- Much faster delivery

### 6. Add Service Worker
Implement offline caching and faster subsequent page loads:

```typescript
// Add to next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
```

## LOW PRIORITY (But Still Helpful)

### 7. Reduce Initial JavaScript Bundle
- Analyze bundle: `npm run build -- --analyze`
- Tree-shake unused icon imports from lucide-react
- Code-split large libraries

### 8. Implement Critical CSS
Extract and inline above-the-fold CSS (requires custom setup)

### 9. HTTP/2 Push
If self-hosting, configure HTTP/2 push for critical assets

## Expected Results After Critical Actions

| Metric | Current | After Compression | Target |
|--------|---------|------------------|--------|
| **LCP** | 10.0s ❌ | ~2.0s ✅ | <2.5s |
| **FCP** | 4.4s ⚠️ | ~1.5s ✅ | <1.8s |
| **SI** | 7.7s ⚠️ | ~2.8s ✅ | <3.4s |
| **Performance Score** | 59 | **85-92** ✅ | 90+ |

## Implementation Order

1. **[MUST DO]** Compress hero image → Expected +25 points
2. **[MUST DO]** Install `sharp` → Expected +5 points
3. **[SHOULD DO]** Static image imports → Expected +3 points
4. **[SHOULD DO]** Batch compress all images → Expected +5 points
5. **[NICE TO HAVE]** Image CDN → Expected +5 points
6. **[NICE TO HAVE]** Service Worker → Expected +2 points

## Quick Win Script

Save this as `optimize-images.ps1`:

```powershell
# Install sharp-cli if not installed
if (!(Get-Command sharp -ErrorAction SilentlyContinue)) {
    npm install -g sharp-cli
}

# Optimize hero image
$heroPath = "public/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg"
$outputPath = "public/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"

Write-Host "Optimizing hero image..." -ForegroundColor Cyan
sharp-cli -i $heroPath -o $outputPath resize 1920 --quality 75 --progressive

# Check file size
$originalSize = (Get-Item $heroPath).Length / 1MB
$optimizedSize = (Get-Item $outputPath).Length / 1MB
$savings = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)

Write-Host "`nOptimization Complete!" -ForegroundColor Green
Write-Host "Original: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Yellow
Write-Host "Optimized: $([math]::Round($optimizedSize, 2)) MB" -ForegroundColor Yellow
Write-Host "Savings: $savings%" -ForegroundColor Green
Write-Host "`nUpdate your code to use: /images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
```

## Resources

- [Next.js Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp)
- [Squoosh App](https://squoosh.app/) - Visual image optimization
- [TinyJPG](https://tinyjpg.com/) - Simple compression

---

**Bottom Line**: The 1MB hero image is the primary culprit. Compress it to 200-300KB and you'll see the performance score jump to 85-90+.
