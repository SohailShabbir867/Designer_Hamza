/**
 * Image optimization script
 * Converts all PNG/JPG images to WebP with aggressive compression
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const ASSETS_DIR = "./src/assets";
const EXTENSIONS = [".png", ".jpg", ".jpeg"];

// Quality settings per image type
const QUALITY = {
    hero: 75,       // profile image — balanced quality
    portfolio: 70,  // project screenshots
    icons: 80,      // skill icons (small, need sharpness)
};

const files = readdirSync(ASSETS_DIR).filter((f) =>
    EXTENSIONS.includes(extname(f).toLowerCase())
);

console.log(`\n🖼️  Optimizing ${files.length} images to WebP...\n`);

for (const file of files) {
    const inputPath = join(ASSETS_DIR, file);
    const name = basename(file, extname(file));
    const outputPath = join(ASSETS_DIR, `${name}.webp`);
    const sizeKB = (statSync(inputPath).size / 1024).toFixed(1);

    // Choose quality based on file size
    let quality = QUALITY.icons;
    if (sizeKB > 200) quality = QUALITY.portfolio;
    if (name === "profile") quality = QUALITY.hero;

    try {
        const info = await sharp(inputPath)
            .webp({ quality, effort: 6 })
            .resize({ width: 800, withoutEnlargement: true }) // cap at 800px wide
            .toFile(outputPath);

        const newSizeKB = (info.size / 1024).toFixed(1);
        const savings = ((1 - info.size / statSync(inputPath).size) * 100).toFixed(0);
        console.log(`  ✅ ${file} (${sizeKB} KB) → ${name}.webp (${newSizeKB} KB) — ${savings}% smaller`);
    } catch (err) {
        console.error(`  ❌ ${file}: ${err.message}`);
    }
}

console.log("\n✨ Done! Now update imports in your components from .png/.jpg to .webp\n");
