# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MITSELECT** is a Taiwan brand discovery platform ("Crafted in Taiwan") built with React 19 + Vite 8 + TailwindCSS 4. It showcases Taiwanese brands sourced from a Google Sheets CSV with local fallback.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build → /dist
npm run preview   # Serve /dist locally
npm run lint      # ESLint

# Logo management (run as needed when brand data changes)
node scripts/download-logos.mjs   # Download logos from CDN URLs in brand-images.json
node scrape-new-logos.js          # Scrape logos from Threads profiles (requires Puppeteer)
```

## Architecture

### Data Flow
1. `useGoogleSheet` hook (`src/hooks/useGoogleSheet.js`) fetches brand data:
   - Primary: Google Sheets CSV export (URL in `src/data/brands.js`)
   - Fallback: `/public/brands.csv`
   - Logo mapping: `/public/brand-logos.json` (brand name → local `/public/logos/{safeName}.jpg`)
2. `App.jsx` holds category filter state and passes it to `BrandShowcase`
3. All other state is local to each component

### Brand Data Schema (`brands.csv`)
| Column | Field |
|--------|-------|
| Threads帳號 | Threads handle |
| Threads連結 | Full Threads URL |
| 品牌名稱 | Brand name (key) |
| 類別 | Category |
| 品牌介紹 | Description |
| 品牌官網/購買連結 | Website link |

### Image Strategy
- Brand logos: local JPG at `/public/logos/{safeName}.jpg`, mapped via `brand-logos.json`
- Category fallbacks: Unsplash URLs defined in `src/data/brands.js`

### Styling
TailwindCSS v4 with custom theme colors defined via `@theme` in `src/index.css`:
- `graphite` (#1A1A1A), `earth` (#B8A487), `earth-light` (#D4C4AB), `parchment` (#F9F9F9), `warm-gray` (#6B6B6B)

Fonts: Playfair Display + Noto Serif TC (headings), Inter + Noto Sans TC (body)

### Deployment
Zeabur — config in `zbpack.json` (build: `npm run build`, output: `dist/`)

## Key Notes
- Review submissions are currently console-logged only (no backend)
- Brand "親子天下Shopping" is filtered out in `useGoogleSheet.js`
- No Redux or global state library — all state via `useState` hooks
