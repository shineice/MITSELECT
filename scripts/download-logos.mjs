/**
 * 下載 Threads 頭貼到本地 public/logos/
 * 讀取 brand-images.json 的 CDN URL，下載為本地圖片
 *
 * 使用方式: node scripts/download-logos.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_PATH = path.join(__dirname, '..', 'public', 'brand-images.json');
const LOGOS_DIR = path.join(__dirname, '..', 'public', 'logos');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'brand-logos.json');

async function downloadImage(url, filepath) {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const buffer = Buffer.from(await resp.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
  return buffer.length;
}

async function main() {
  const images = JSON.parse(fs.readFileSync(IMAGES_PATH, 'utf-8'));
  const brands = Object.entries(images);
  console.log(`Downloading ${brands.length} logos...\n`);

  if (!fs.existsSync(LOGOS_DIR)) fs.mkdirSync(LOGOS_DIR, { recursive: true });

  const logoMap = {};
  let success = 0;

  for (let i = 0; i < brands.length; i++) {
    const [name, url] = brands[i];
    // Create safe filename
    const safeName = name.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '_').substring(0, 40);
    const filename = `${safeName}.jpg`;
    const filepath = path.join(LOGOS_DIR, filename);

    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
      console.log(`[${i+1}/${brands.length}] skip ${name}`);
      logoMap[name] = `/logos/${filename}`;
      success++;
      continue;
    }

    try {
      const size = await downloadImage(url, filepath);
      logoMap[name] = `/logos/${filename}`;
      success++;
      console.log(`[${i+1}/${brands.length}] ✓ ${name} (${Math.round(size/1024)}KB)`);
    } catch (err) {
      console.log(`[${i+1}/${brands.length}] ✗ ${name}: ${err.message}`);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(logoMap, null, 2));
  console.log(`\nDone! ${success}/${brands.length} logos downloaded`);
}

main().catch(console.error);
