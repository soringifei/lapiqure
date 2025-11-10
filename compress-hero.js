const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, 'public', 'images', 'faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg');
const outputPath = path.join(__dirname, 'public', 'images', 'faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg');

console.log('🖼️  Compressing hero image...\n');

const originalSize = fs.statSync(heroPath).size;

sharp(heroPath)
  .resize(1920, 1920, {
    fit: 'inside',
    withoutEnlargement: true
  })
  .jpeg({
    quality: 75,
    progressive: true,
    mozjpeg: true
  })
  .toFile(outputPath)
  .then(() => {
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log('✅ Optimization Complete!\n');
    console.log(`Original:  ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Savings:   ${savings}%\n`);
    console.log('📝 Next step: Update app/page.tsx to use the optimized image:');
    console.log('   /images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg');
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });
