import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const NEW_BRANDS = [
  { handle: '30leather', name: '三十革' },
  { handle: 'annsgirls', name: "Ann's" },
  { handle: 'amaitw', name: 'Amai' },
  { handle: 'boderek_shoes', name: 'Boderek' },
  { handle: 'bruniishoes', name: 'Brunii' },
  { handle: 'buffalo_1952', name: '牛頭牌' },
  { handle: 'chuan_shoes', name: '川鞋' },
  { handle: 'dannishoes_tw', name: '丹妮鞋屋' },
  { handle: 'fmshoes_love', name: 'FM Shoes' },
  { handle: 'hoqintainan', name: 'HoQin' },
  { handle: 'icalledlove.tw', name: 'I called Love' },
  { handle: 'inooknitshoes', name: 'Inooknit' },
  { handle: 'keizu_shoes', name: 'Keizu' },
  { handle: 'labrisa.shoes', name: 'Labrisa' },
  { handle: 'lafilleshoes', name: 'La Fille' },
  { handle: 'oringoshoes', name: '林果良品' },
  { handle: 'sanlyjoy_shoes', name: 'Sanly Joy' },
  { handle: 'sdntaiwan', name: 'SDN Taiwan' },
  { handle: 'snnshoes', name: 'SnN' },
  { handle: 'soundsgoodsocks', name: 'Sounds Good' },
  { handle: 'ststudio_shoes', name: 'ST Studio' },
  { handle: 'wypexshoes', name: 'Wypex' },
  { handle: 'xanadu_tw', name: 'Xanadu' },
  { handle: 'yehsido', name: "Yeh's I Do" },
];

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');
const LOGOS_JSON = path.join(process.cwd(), 'public', 'brand-logos.json');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => { fileStream.close(); resolve(); });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function scrapeLogos() {
  // Load existing logos json
  let logosMap = {};
  if (fs.existsSync(LOGOS_JSON)) {
    logosMap = JSON.parse(fs.readFileSync(LOGOS_JSON, 'utf-8'));
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = { success: [], failed: [] };

  for (const brand of NEW_BRANDS) {
    const url = `https://www.threads.com/@${brand.handle}`;
    const safeName = brand.name.replace(/[\s\/\\:*?"<>|]/g, '_');
    const filepath = path.join(LOGOS_DIR, `${safeName}.jpg`);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`[SKIP] ${brand.name} - logo already exists`);
      logosMap[brand.name] = `/logos/${safeName}.jpg`;
      results.success.push(brand.name);
      continue;
    }

    console.log(`[SCRAPING] ${brand.name} (${url})...`);
    const page = await browser.newPage();

    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait a bit for images to load
      await new Promise(r => setTimeout(r, 2000));

      // Try multiple selectors for profile image
      let imgUrl = null;

      // Method 1: Look for profile image in meta og:image
      imgUrl = await page.evaluate(() => {
        const meta = document.querySelector('meta[property="og:image"]');
        return meta ? meta.getAttribute('content') : null;
      });

      // Method 2: Look for avatar img tags
      if (!imgUrl) {
        imgUrl = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          for (const img of imgs) {
            const src = img.src || '';
            const alt = img.alt || '';
            // Threads profile pics are typically circular and small
            if ((src.includes('scontent') || src.includes('instagram')) &&
                img.width <= 200 && img.width > 20) {
              return src;
            }
          }
          // Fallback: first meaningful image
          for (const img of imgs) {
            if (img.src && img.src.includes('scontent') && !img.src.includes('emoji')) {
              return img.src;
            }
          }
          return null;
        });
      }

      if (imgUrl) {
        await downloadImage(imgUrl, filepath);
        logosMap[brand.name] = `/logos/${safeName}.jpg`;
        console.log(`[OK] ${brand.name}`);
        results.success.push(brand.name);
      } else {
        console.log(`[FAIL] ${brand.name} - no image found`);
        results.failed.push(brand.name);
      }
    } catch (err) {
      console.log(`[ERROR] ${brand.name}: ${err.message}`);
      results.failed.push(brand.name);
    } finally {
      await page.close();
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 1500));
  }

  await browser.close();

  // Save updated logos json
  fs.writeFileSync(LOGOS_JSON, JSON.stringify(logosMap, null, 2), 'utf-8');

  console.log('\n========== RESULTS ==========');
  console.log(`Success: ${results.success.length}/${NEW_BRANDS.length}`);
  console.log(`Failed: ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log('Failed brands:', results.failed.join(', '));
  }
  console.log(`brand-logos.json updated with ${Object.keys(logosMap).length} entries`);
}

scrapeLogos().catch(console.error);
