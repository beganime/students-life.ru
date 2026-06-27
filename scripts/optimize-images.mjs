import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUALITY = 80;
const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Maximum dimensions for different image types
const MAX_DIMENSIONS = {
    hero: 1920,
    default: 1200,
    icon: 400,
    thumbnail: 600
};

// Determine image type based on path
function getMaxWidth(filePath) {
    const lowerPath = filePath.toLowerCase();
    if (lowerPath.includes('hero') || lowerPath.includes('bg')) {
        return MAX_DIMENSIONS.hero;
    }
    if (lowerPath.includes('icon') || lowerPath.includes('logo')) {
        return MAX_DIMENSIONS.icon;
    }
    if (lowerPath.includes('thumbnail') || lowerPath.includes('small')) {
        return MAX_DIMENSIONS.thumbnail;
    }
    return MAX_DIMENSIONS.default;
}

async function getFilesRecursively(dir, extensions) {
    const files = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subFiles = await getFilesRecursively(fullPath, extensions);
                files.push(...subFiles);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (extensions.includes(ext)) {
                    files.push(fullPath);
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err.message);
    }

    return files;
}

async function optimizeImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    const baseName = path.basename(inputPath, ext);
    const dirName = path.dirname(inputPath);
    const outputPath = path.join(dirName, `${baseName}.webp`);

    // Skip if already webp and small
    if (ext === '.webp') {
        const stats = await fs.stat(inputPath);
        if (stats.size < 500 * 1024) { // Skip if less than 500KB
            console.log(`⏭️  Skipping (already optimized): ${path.relative(ASSETS_DIR, inputPath)}`);
            return { skipped: true, inputPath };
        }
    }

    try {
        const inputStats = await fs.stat(inputPath);
        const inputSizeMB = (inputStats.size / 1024 / 1024).toFixed(2);

        const maxWidth = getMaxWidth(inputPath);

        // Get image metadata
        const metadata = await sharp(inputPath).metadata();

        // Determine if resize is needed
        const needsResize = metadata.width && metadata.width > maxWidth;

        let pipeline = sharp(inputPath);

        if (needsResize) {
            pipeline = pipeline.resize(maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Convert to WebP
        await pipeline
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const outputStats = await fs.stat(outputPath);
        const outputSizeMB = (outputStats.size / 1024 / 1024).toFixed(2);
        const savings = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

        // Delete original file (user confirmed they have backup)
        if (inputPath !== outputPath) {
            await fs.unlink(inputPath);
        }

        console.log(`✅ ${path.relative(ASSETS_DIR, inputPath)}`);
        console.log(`   ${inputSizeMB} MB → ${outputSizeMB} MB (${savings}% savings)`);

        return {
            success: true,
            inputPath,
            outputPath,
            inputSize: inputStats.size,
            outputSize: outputStats.size,
            savings: parseFloat(savings)
        };
    } catch (err) {
        console.error(`❌ Error processing ${inputPath}:`, err.message);
        return { error: true, inputPath, message: err.message };
    }
}

async function main() {
    console.log('🖼️  Starting Image Optimization...\n');
    console.log(`Quality: ${QUALITY}`);
    console.log(`Assets Directory: ${ASSETS_DIR}`);
    console.log(`Public Directory: ${PUBLIC_DIR}\n`);

    const extensions = ['.png', '.jpg', '.jpeg'];

    // Get all image files
    const assetFiles = await getFilesRecursively(ASSETS_DIR, extensions);
    const publicFiles = await getFilesRecursively(PUBLIC_DIR, extensions);
    const allFiles = [...assetFiles, ...publicFiles];

    console.log(`Found ${allFiles.length} images to optimize\n`);
    console.log('─'.repeat(60));

    let totalInputSize = 0;
    let totalOutputSize = 0;
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (const file of allFiles) {
        const result = await optimizeImage(file);

        if (result.success) {
            totalInputSize += result.inputSize;
            totalOutputSize += result.outputSize;
            successCount++;
        } else if (result.error) {
            errorCount++;
        } else if (result.skipped) {
            skippedCount++;
        }
    }

    console.log('\n' + '─'.repeat(60));
    console.log('📊 Summary:');
    console.log(`   ✅ Optimized: ${successCount} files`);
    console.log(`   ⏭️  Skipped: ${skippedCount} files`);
    console.log(`   ❌ Errors: ${errorCount} files`);
    console.log(`   📦 Total Input: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📦 Total Output: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   💾 Total Savings: ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📉 Reduction: ${(((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(1)}%`);
}

main().catch(console.error);
