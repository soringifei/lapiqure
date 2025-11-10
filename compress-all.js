const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const backupDir = path.join(__dirname, 'public', 'images-backup');

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function optimizeImage(filePath, filename) {
  const ext = path.extname(filename).toLowerCase();
  
  // Skip non-image files and already optimized files
  if (!['.jpg', '.jpeg', '.png'].includes(ext) || filename.includes('_optimized')) {
    return null;
  }

  const backupPath = path.join(backupDir, filename);
  const tempPath = filePath + '.tmp';
  
  try {
    const originalSize = fs.statSync(filePath).size;
    
    // Backup original if not exists
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

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
        .toFile(tempPath);
    } else {
      await pipeline
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toFile(tempPath);
    }

    const optimizedSize = fs.statSync(tempPath).size;
    
    // Only replace if actually smaller
    if (optimizedSize < originalSize) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      return {
        filename,
        originalSize,
        optimizedSize,
        savings: parseFloat(savings)
      };
    } else {
      // Keep original if optimized is larger
      fs.unlinkSync(tempPath);
      return {
        filename,
        originalSize,
        optimizedSize: originalSize,
        savings: 0
      };
    }
  } catch (error) {
    // Clean up temp file on error
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch {}
    }
    return null;
  }
}

async function main() {
  console.log('\n🖼️  LA PIQÛRE Batch Image Optimization\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext) && !f.includes('_optimized');
  });

  console.log(`📦 Found ${imageFiles.length} images`);
  console.log(`💾 Backups will be saved to: public/images-backup\n`);

  const results = [];
  const errors = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const filePath = path.join(imagesDir, filename);
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${filename.padEnd(60)}...`);
    
    const result = await optimizeImage(filePath, filename);
    
    if (result) {
      results.push(result);
      const savedMB = ((result.originalSize - result.optimizedSize) / 1024 / 1024).toFixed(2);
      if (result.savings > 0) {
        console.log(` ✓ ${result.savings}% (-${savedMB}MB)`);
      } else {
        console.log(` ○ kept original (already optimized)`);
      }
    } else {
      errors.push(filename);
      console.log(` ✗ error`);
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Optimization Complete!\n');

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalSavings = totalOriginal > 0 ? ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1) : 0;
  const totalSavedMB = ((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2);

  console.log('📊 Statistics:');
  console.log(`   Images processed:  ${results.length}`);
  console.log(`   Errors:            ${errors.length}`);
  console.log(`   Original size:     ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized size:    ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings:     ${totalSavings}% (-${totalSavedMB} MB)\n`);

  if (results.length > 0) {
    const topSavings = results
      .filter(r => r.savings > 0)
      .sort((a, b) => (b.originalSize - b.optimizedSize) - (a.originalSize - a.optimizedSize))
      .slice(0, 5);

    if (topSavings.length > 0) {
      console.log('🏆 Top 5 Compressions:\n');
      topSavings.forEach((r, i) => {
        const savedMB = ((r.originalSize - r.optimizedSize) / 1024 / 1024).toFixed(2);
        console.log(`   ${i + 1}. ${r.filename}`);
        console.log(`      ${r.savings}% savings (-${savedMB} MB)\n`);
      });
    }
  }

  if (errors.length > 0) {
    console.log('⚠️  Errors occurred with these files:');
    errors.forEach(f => console.log(`   - ${f}`));
    console.log('');
  }

  console.log('💡 All originals are safely backed up in: public/images-backup\n');
}

main().catch(console.error);
