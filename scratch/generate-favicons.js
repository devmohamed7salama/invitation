import sharp from 'sharp';

async function generate() {
  const svgPath = 'public/favicon.svg';
  
  // Generate 32x32 PNG
  await sharp(svgPath)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');
  console.log('Generated public/favicon-32x32.png');

  // Generate 48x48 PNG and save as favicon.ico (Vercel/Google search compatible)
  await sharp(svgPath)
    .resize(48, 48)
    .png()
    .toFile('public/favicon.ico');
  console.log('Generated public/favicon.ico');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
