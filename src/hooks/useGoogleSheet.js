import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SHEET_CSV_URL, categoryImages } from '../data/brands';

// 要排除的品牌名稱
const EXCLUDED_BRANDS = ['親子天下Shopping'];

/**
 * 載入品牌資料
 * 優先從 Google Sheet CSV 載入，失敗則從本地 public/brands.csv 載入
 * 同時載入 brand-images.json 取得 Threads 頭貼
 */
export function useGoogleSheet() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 載入本地品牌頭貼 (已下載到 public/logos/)
    const imagePromise = fetch('/brand-logos.json')
      .then(r => r.ok ? r.json() : {})
      .catch(() => ({}));

    function parseAndSet(results, brandImages) {
      const parsed = results.data
        .filter(row => {
          const name = (row['品牌名稱'] || '').trim();
          return name && !EXCLUDED_BRANDS.includes(name);
        })
        .map((row, index) => {
          const name = (row['品牌名稱'] || '').trim();
          const category = (row['類別'] || '其他').trim();
          return {
            id: index + 1,
            name,
            category,
            description: (row['品牌介紹'] || '').replace(/\n/g, ' ').trim(),
            url: (row['品牌官網/購買連結'] || '').trim(),
            threadsHandle: (row['Threads帳號'] || '').trim(),
            threadsUrl: (row['Threads連結'] || '').trim(),
            // 優先用 Threads 頭貼，否則用分類圖
            image: brandImages[name] || categoryImages[category] || categoryImages['其他'],
            hasLogo: !!brandImages[name],
          };
        });

      const cats = [...new Set(parsed.map(b => b.category))].sort();
      setBrands(parsed);
      setCategories(cats);
      setLoading(false);
    }

    // 先嘗試 Google Sheet，失敗則用本地 CSV
    Promise.all([imagePromise]).then(([brandImages]) => {
      Papa.parse(SHEET_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0 && results.data[0]['品牌名稱']) {
            parseAndSet(results, brandImages);
          } else {
            loadLocalCSV(brandImages);
          }
        },
        error: () => loadLocalCSV(brandImages),
      });

      function loadLocalCSV(imgs) {
        Papa.parse('/brands.csv', {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => parseAndSet(results, imgs),
          error: (err) => {
            setError(err.message);
            setLoading(false);
          },
        });
      }
    });
  }, []);

  return { brands, categories, loading, error };
}
