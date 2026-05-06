const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];
const inputSvg = path.join(__dirname, '../public/assets/icons/icon-master.svg');
const outputDir = path.join(__dirname, '../public/assets/icons');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(inputSvg);
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }
  
  console.log('All icons generated!');
}

generateIcons().catch(console.error);