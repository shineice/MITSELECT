/**
 * 批次抓取 Threads 品牌頭貼 (輕量版，不需 Puppeteer)
 * 使用 Node fetch + HTML meta tag 解析
 *
 * 使用方式: node scripts/fetch-logos.mjs
 * 產出: public/brand-images.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '..', 'public', 'brands.csv');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'brand-images.json');

// 簡易 CSV 解析
function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // Simple CSV parse (handle quoted fields)
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

async function fetchThreadsImage(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const resp = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
        },
      });
      clearTimeout(timeout);

      const html = await resp.text();

      // Try og:image meta tag
      const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
      if (ogMatch) return ogMatch[1];

      // Try reversed order
      const ogMatch2 = html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/);
      if (ogMatch2) return ogMatch2[1];

      // Try any Instagram CDN profile image URL
      const cdnMatch = html.match(/(https:\/\/[^"]*instagram[^"]*\/t51\.2885-19\/[^"]+)/);
      if (cdnMatch) return cdnMatch[1];

      // Try scontent CDN
      const scontentMatch = html.match(/(https:\/\/scontent[^"]*\/t51\.2885-19\/[^"]+)/);
      if (scontentMatch) return scontentMatch[1];

      return null;
    } catch (e) {
      if (attempt === retries) return null;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return null;
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

  const BATCH_SIZE = 5;
  for (let i = 0; i < brands.length; i += BATCH_SIZE) {
    const batch = brands.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (brand) => {
      const name = brand['品牌名稱'].trim();
      const url = brand['Threads連結'].trim();

      if (results[name]) {
        console.log(`[skip] ${name} (already fetched)`);
        return;
      }

      const img = await fetchThreadsImage(url);
      if (img) {
        results[name] = img;
        console.log(`[✓] ${name}`);
      } else {
        console.log(`[✗] ${name} - no image found`);
      }
    });

    await Promise.all(promises);

    // Save progress after each batch
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));

    // Rate limit between batches
    if (i + BATCH_SIZE < brands.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\nDone! Saved ${Object.keys(results).length}/${brands.length} images to brand-images.json`);
}

main().catch(console.error);
