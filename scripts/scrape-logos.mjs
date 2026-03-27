/**
 * 批次抓取 Threads 品牌頭貼 (Puppeteer 版)
 * 使用方式: node scripts/scrape-logos.mjs
 * 產出: public/brand-images.json
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '..', 'public', 'brands.csv');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'brand-images.json');

function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === ',' && !inQuotes) { values.push(current); current = ''; continue; }
      current += char;
    }
    values.push(current);
    const row = {};
    headers.forEach((h, idx) => { row[h.trim()] = (values[idx] || '').trim(); });
    results.push(row);
  }
  return results;
}

async function main() {
  const csv = fs.readFileSync(CSV_PATH, 'utf-8');
  const data = parseCSV(csv);
  const brands = data.filter(row =>
    row['Threads連結'] && row['Threads連結'].startsWith('http') &&
    row['品牌名稱'] && row['品牌名稱'].trim()
  );

  console.log(`Found ${brands.length} brands with Threads URLs\n`);

  // Load existing results
  let results = {};
  if (fs.existsSync(OUTPUT_PATH)) {
    try { results = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8')); } catch {}
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    const name = brand['品牌名稱'].trim();
    const url = brand['Threads連結'].trim();

    if (results[name]) {
      console.log(`[${i+1}/${brands.length}] skip ${name}`);
      continue;
    }

    console.log(`[${i+1}/${brands.length}] ${name}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await page.waitForSelector('img', { timeout: 5000 });

      const profileImg = await page.evaluate(() => {
        const imgs = document.querySelectorAll('img');
        // First try: profile pic by alt text
        for (const img of imgs) {
          if (img.alt && img.alt.includes('大頭貼照') && img.naturalWidth >= 50) {
            return img.src;
          }
        }
        // Second try: profile pic by size (around 84x84)
        for (const img of imgs) {
          if (img.alt && img.alt.includes('大頭貼照')) {
            return img.src;
          }
        }
        // Third try: first Instagram CDN profile image
        for (const img of imgs) {
          if (img.src && img.src.includes('t51.2885-19') && img.naturalWidth >= 50) {
            return img.src;
          }
        }
        return null;
      });

      if (profileImg) {
        results[name] = profileImg;
        console.log(`  ✓ found`);
      } else {
        console.log(`  ✗ no image`);
      }
    } catch (err) {
      console.log(`  ✗ error: ${err.message.substring(0, 60)}`);
    }

    // Save progress after each
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));

    // Small delay
    await new Promise(r => setTimeout(r, 800));
  }

  await browser.close();
  console.log(`\nDone! ${Object.keys(results).length}/${brands.length} images saved`);
}

main().catch(console.error);
