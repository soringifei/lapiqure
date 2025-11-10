const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

async function optimizeImage(filePath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const baseName = path.basename(filename, ext);
  
  // Skip non-image files and already optimized files
  if (!['.jpg', '.jpeg', '.png'].includes(ext) || filename.includes('_optimized')) {
    return null;
  }

  // Create optimized filename
  const optimizedFilename = `${baseName}_opt${ext}`;
  const optimizedPath = path.join(imagesDir, optimizedFilename);
  
  // Skip if optimized version already exists
  if (fs.existsSync(optimizedPath)) {
    return null;
  }

  try {
    const originalSize = fs.statSync(filePath).size;
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize large images
    const maxDimension = 2048;
    let pipeline = image;
    
    if (metadata.width > maxDimension || metadata.height > maxDimension) {
      pipeline = pipeline.resize(maxDimension, maxDimension, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Optimize based on format
    if (ext === '.png') {
      await pipeline
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(optimizedPath);
    } else {
      await pipeline
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toFile(optimizedPath);
    }

    const optimizedSize = fs.statSync(optimizedPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    return {
      filename,
      optimizedFilename,
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    return null;
  }
}

async function main() {
  console.log('\n🖼️  Creating Optimized Versions\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext) && !f.includes('_optimized') && !f.includes('_opt');
  });

  console.log(`📦 Found ${imageFiles.length} images to optimize\n`);

  const results = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const filePath = path.join(imagesDir, filename);
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${filename.substring(0, 50).padEnd(50)}...`);
    
    const result = await optimizeImage(filePath, filename);
    
    if (result) {
      results.push(result);
      const savedMB = ((result.originalSize - result.optimizedSize) / 1024 / 1024).toFixed(2);
      console.log(` ✓ ${result.savings}% (-${savedMB}MB)`);
    } else {
      console.log(` ○ skipped`);
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Optimization Complete!\n');

  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    const totalSavedMB = ((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2);

    console.log('📊 Statistics:');
    console.log(`   Images optimized:  ${results.length}`);
    console.log(`   Original size:     ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized size:    ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total savings:     ${totalSavings}% (-${totalSavedMB} MB)\n`);

    console.log('📝 Next Steps:');
    console.log('   1. Review the optimized images (_opt files)');
    console.log('   2. Update your code to use the _opt versions');
    console.log('   3. Delete original files when satisfied\n');

    const topSavings = results
      .sort((a, b) => (b.originalSize - b.optimizedSize) - (a.originalSize - a.optimizedSize))
      .slice(0, 5);

    console.log('🏆 Top 5 Compressions:\n');
    topSavings.forEach((r, i) => {
      const savedMB = ((r.originalSize - r.optimizedSize) / 1024 / 1024).toFixed(2);
      console.log(`   ${i + 1}. ${r.filename}`);
      console.log(`      → ${r.optimizedFilename}`);
      console.log(`      ${r.savings}% savings (-${savedMB} MB)\n`);
    });
  } else {
    console.log('⚠️  No images were optimized (all already processed or errors)\n');
  }
}

main().catch(console.error);
