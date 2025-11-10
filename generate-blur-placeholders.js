const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateBlurDataURL(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(10, 10, { fit: 'inside' })
      .blur()
      .toBuffer();
    
    const base64 = buffer.toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    return null;
  }
}

async function main() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  const keyImages = [
    'faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg',
    'cropped_sleeveless_top_with_zipper_&_flat_silver_studs1_opt.jpg',
    'faux_leather_cropped_pants1_opt.jpeg',
    'cutsew_distressed_knit_top1_opt.jpeg',
    'oversized_green_faux_leather_pants1_opt.jpg',
    'turtleneck_sweater_with_intarsia_pattern1_opt.jpg'
  ];
  
  const placeholders = {};
  
  for (const image of keyImages) {
    const imagePath = path.join(imagesDir, image);
    
    if (!fs.existsSync(imagePath)) {
      continue;
    }
    
    const blurDataURL = await generateBlurDataURL(imagePath);
    
    if (blurDataURL) {
      placeholders[image] = blurDataURL;
    }
  }

  const tsContent = `export const blurDataURLs: Record<string, string> = ${JSON.stringify(placeholders, null, 2)};

export function getBlurDataURL(imageName: string): string | undefined {
  return blurDataURLs[imageName];
}
`;

  const outputPath = path.join(__dirname, 'lib', 'blur-placeholders.ts');
  fs.writeFileSync(outputPath, tsContent);
}

main();
