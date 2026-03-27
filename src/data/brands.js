// Google Sheets 串接 — 更新 Sheet 後網站自動抓最新資料
// 發佈為 CSV: 檔案 → 共用 → 發佈到網路 → CSV
export const GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9J5Y3Z0K0X0K0X0K0X0K0X0K0X0K0/pub?output=csv';

// Google Sheet ID (用於建構 CSV URL)
export const GOOGLE_SHEET_ID = '14h88YR1w2RhWvy09zUv5akVvB-xG_xrO9J5Yt0NaHBY';

// 自動產生 CSV 下載連結
export const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;

// 類別對應的 Unsplash 圖片（AI 生成/素材圖片）
export const categoryImages = {
  '家具燈飾': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
  '清潔保健': 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=600&h=400&fit=crop',
  '食品農產': 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop',
  '服飾': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=400&fit=crop',
  '運動保健': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
  '藝術文創': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
  '寢具床墊': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
  '保養美妝': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=400&fit=crop',
  '工業五金': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6525?w=600&h=400&fit=crop',
  '包袋皮革': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=400&fit=crop',
  '寵物用品': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
  '香氛蠟燭': 'https://images.unsplash.com/photo-1602607742553-cc8dfd9a tried?w=600&h=400&fit=crop',
  '飾品珠寶': 'https://images.unsplash.com/photo-1515562141589-67f0d706b6eb?w=600&h=400&fit=crop',
  '文具玩具': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=400&fit=crop',
  '家居用品': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=400&fit=crop',
  '3C電子': 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop',
  '戶外用品': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
  '家具桌椅': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
  '其他': 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&h=400&fit=crop',
};

export const reviews = [
  {
    id: 1,
    name: "陳小姐",
    rating: 5,
    comment: "在 MITSELECT 發現好多用心的台灣品牌，每一個都有自己的故事！",
    date: "2026-03-10"
  },
  {
    id: 2,
    name: "林先生",
    rating: 4,
    comment: "支持台灣製造！品質真的很好，而且知道背後的故事更有感覺。",
    date: "2026-03-05"
  },
  {
    id: 3,
    name: "王小姐",
    rating: 5,
    comment: "終於有一個平台整理了這麼多 MIT 品牌，太方便了！",
    date: "2026-02-28"
  }
];
