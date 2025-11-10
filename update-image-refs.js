const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// Get all optimized images
const optimizedImages = fs.readdirSync(imagesDir)
  .filter(f => f.includes('_opt.'))
  .map(f => {
    const original = f.replace('_opt.', '.');
    return { original, optimized: f };
  });

console.log(`\n📝 Found ${optimizedImages.length} optimized images\n`);

// Files to update
const filesToUpdate = [
  'lib/sample-data.ts',
  'app/page.tsx',
  'app/(site)/collections/page.tsx',
  'components/craft-process.tsx',
  'components/category-mega-menu.tsx'
];

let totalReplacements = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let replacements = 0;
  
  optimizedImages.forEach(({ original, optimized }) => {
    const originalWithoutExt = original.replace(/\.(jpg|jpeg|png)$/, '');
    const optimizedWithoutExt = optimized.replace(/\.(jpg|jpeg|png)$/, '');
    
    // Replace image references
    const regex1 = new RegExp(`/images/${original.replace('.', '\\.')}`, 'g');
    const regex2 = new RegExp(`'images/${original.replace('.', '\\.')}'`, 'g');
    const regex3 = new RegExp(`"images/${original.replace('.', '\\.')}"`, 'g');
    
    if (content.match(regex1)) {
      content = content.replace(regex1, `/images/${optimized}`);
      replacements++;
    }
    if (content.match(regex2)) {
      content = content.replace(regex2, `'images/${optimized}'`);
      replacements++;
    }
    if (content.match(regex3)) {
      content = content.replace(regex3, `"images/${optimized}"`);
      replacements++;
    }
  });
  
  if (replacements > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ ${file.padEnd(40)} (${replacements} replacements)`);
    totalReplacements += replacements;
  }
});

console.log(`\n✅ Updated ${totalReplacements} image references\n`);
console.log('🗑️  You can now safely delete the original (non-_opt) images to save space\n');
