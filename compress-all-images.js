const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const backupDir = path.join(__dirname, 'public', 'images-backup');

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('📁 Created backup directory\n');
}

async function optimizeImage(filePath, filename) {
  const ext = path.extname(filename).toLowerCase();
  
  // Skip non-image files and already optimized files
  if (!['.jpg', '.jpeg', '.png'].includes(ext) || filename.includes('_optimized')) {
    return null;
  }

  const backupPath = path.join(backupDir, filename);
  const originalSize = fs.statSync(filePath).size;
  
  // Backup original
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize large images (keep aspect ratio)
    const maxDimension = 2048;
    let resizeOptions = {};
    
    if (metadata.width > maxDimension || metadata.height > maxDimension) {
      resizeOptions = {
        width: maxDimension,
        height: maxDimension,
        fit: 'inside',
        withoutEnlargement: true
      };
    }

    // Optimize based on file type
    if (ext === '.png') {
      await image
        .resize(resizeOptions.width, resizeOptions.height, resizeOptions)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(filePath + '.tmp');
    } else {
      await image
        .resize(resizeOptions.width, resizeOptions.height, resizeOptions)
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toFile(filePath + '.tmp');
    }

    // Replace original with optimized
    fs.unlinkSync(filePath);
    fs.renameSync(filePath + '.tmp', filePath);

    const optimizedSize = fs.statSync(filePath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    return {
      filename,
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting batch image optimization...\n');
  console.log('📦 Original images backed up to: public/images-backup\n');

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext) && !f.includes('_optimized');
  });

  console.log(`Found ${imageFiles.length} images to optimize\n`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];
  let processedCount = 0;

  for (const filename of imageFiles) {
    const filePath = path.join(imagesDir, filename);
    process.stdout.write(`[${++processedCount}/${imageFiles.length}] Processing: ${filename}...`);
    
    const result = await optimizeImage(filePath, filename);
    
    if (result) {
      results.push(result);
      const savedMB = ((result.originalSize - result.optimizedSize) / 1024 / 1024).toFixed(2);
      console.log(` ✓ (${result.savings}% / -${savedMB}MB)`);
    } else {
      console.log(` ⊘ skipped`);
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Optimization Complete!\n');

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
  const totalSavedMB = ((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2);

  console.log(`📊 Total Statistics:`);
  console.log(`   Images processed: ${results.length}`);
  console.log(`   Original size:    ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized size:   ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings:    ${totalSavings}% (-${totalSavedMB} MB)\n`);

  // Show top 5 largest savings
  const topSavings = results
    .sort((a, b) => (b.originalSize - b.optimizedSize) - (a.originalSize - a.optimizedSize))
    .slice(0, 5);

  console.log('🏆 Top 5 Compressions:');
  topSavings.forEach((r, i) => {
    const savedMB = ((r.originalSize - r.optimizedSize) / 1024 / 1024).toFixed(2);
    console.log(`   ${i + 1}. ${r.filename}`);
    console.log(`      ${r.savings}% savings (-${savedMB} MB)\n`);
  });

  console.log('💡 Tip: Original images are safely backed up in public/images-backup');
}

optimizeAllImages().catch(console.error);
