const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folders = [
    { dir: 'src/assets/vision_mision', width: 512 },
    { dir: 'src/assets/departments_grid', width: 512 },
];

const specificFiles = [
    { filePath: 'src/assets/our_services/document.png', width: 1024 },
    { filePath: 'src/assets/our_services/university.png', width: 1024 },
    { filePath: 'src/assets/our_services/visa.png', width: 1024 },
];

async function optimize() {
    console.log('Starting image optimization...');

    // Process folders
    for (const folder of folders) {
        const absoluteDir = path.resolve(process.cwd(), folder.dir);
        if (!fs.existsSync(absoluteDir)) {
            console.warn(`Directory not found: ${absoluteDir}`);
            continue;
        }

        const files = fs.readdirSync(absoluteDir).filter(f => f.toLowerCase().endsWith('.png'));

        for (const file of files) {
            const filePath = path.join(absoluteDir, file);
            console.log(`Optimizing ${filePath}...`);
            try {
                const buffer = await sharp(filePath)
                    .resize(folder.width, null, { withoutEnlargement: true })
                    .png({ quality: 80, compressionLevel: 9 })
                    .toBuffer();

                fs.writeFileSync(filePath, buffer);
                console.log(`Saved optimized: ${filePath}`);
            } catch (err) {
                console.error(`Error optimizing ${filePath}:`, err);
            }
        }
    }

    // Process specific large files
    for (const file of specificFiles) {
        const absolutePath = path.resolve(process.cwd(), file.filePath);
        if (fs.existsSync(absolutePath)) {
            console.log(`Optimizing large file: ${absolutePath}...`);
            try {
                const buffer = await sharp(absolutePath)
                    .resize(file.width, null, { withoutEnlargement: true })
                    .png({ quality: 80, compressionLevel: 9 })
                    .toBuffer();

                fs.writeFileSync(absolutePath, buffer);
                console.log(`Saved optimized: ${absolutePath}`);
            } catch (err) {
                console.error(`Error optimizing ${absolutePath}:`, err);
            }
        } else {
            console.warn(`File not found: ${absolutePath}`);
        }
    }

    console.log('Optimization complete!');
}

optimize().catch(err => console.error('Script error:', err));
