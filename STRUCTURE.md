# ClipAI Frontend — Struktur & Mapping Fungsi

## 📁 Overview Tree
```
clipai-frontend/
├── index.html                    # Entry HTML, Google Fonts preconnect
├── package.json                  # React 18 • Vite 5 • Tailwind 3 • gh-pages
├── vite.config.js                # base: '/clipai-frontend/' • port 3000
├── tailwind.config.js            # Design tokens: clip.* colors, fonts, shadows
├── postcss.config.js             # Tailwind + Autoprefixer
├── .gitignore
└── src/
    ├── main.jsx                  # ReactDOM.createRoot → <App/>
    ├── App.jsx                   # 🧠 Root: state + composition
    ├── index.css                 # Tailwind directives + custom CSS
    ├── data/
    │   └── sampleClips.js        # 📦 Data layer
    └── components/
        ├── BlobBackground.jsx     # 🎨 Decorative
        ├── Sidebar.jsx            # 🧭 Navigation
        ├── TopBar.jsx             # 🔝 Header
        ├── SearchBox.jsx          # 🔍 Input
        ├── CreditsPill.jsx        # 💎 Credit indicator
        ├── HeroInput.jsx          # 📤 File upload
        ├── StatsBanner.jsx        # 📊 Metrics
        ├── ClipCard.jsx           # 🎬 Single clip
        ├── ClipGrid.jsx           # 🎬 Grid
        ├── ScoreRing.jsx          # ⭕ SVG progress
        ├── StatusBadge.jsx        # 🏷️ Status pill
        ├── ScoreBar.jsx           # 📈 Breakdown
        ├── FilterChips.jsx        # 🔘 Filter row
        └── ProgressIndicator.jsx  # 📶 Step stepper
```

---

## 🧠 App.jsx — Root State & Orchestration

### State (semua `useState`)
| State | Tipe | Default | Dipakai Oleh |
|-------|------|---------|-------------|
| `activeNav` | `string` | `'home'` | Sidebar |
| `activeFilter` | `string` | `'all'` | FilterChips, logic filter |
| `searchQuery` | `string` | `''` | SearchBox, logic filter |
| `isUploading` | `boolean` | `false` | HeroInput, ProgressIndicator |
| `uploadProgress` | `number` | `-1` | ProgressIndicator (-1 = hidden) |
| `clips` | `Clip[]` | `sampleClips` | ClipGrid, logic filter |

### Derived
| Value | Logic | Dipakai Oleh |
|-------|-------|-------------|
| `filteredClips` | `clips.filter(...)` — inc activeFilter + searchQuery | ClipGrid |

### Handler Functions
| Function | Trigger | Behavior |
|----------|---------|----------|
| `handleUpload(files)` | HeroInput onUpload | Simulasi upload 6-step → bikin Clip baru → update state |
| `handleClipClick(clip)` | ClipCard onClick | `console.log` *(placeholder)* |
| `handleClipPreview(clip)` | ClipCard onPreview | `console.log` *(placeholder)* |
| `handleClipDownload(clip)` | ClipCard onDownload | `console.log` *(placeholder)* |

### Layout Composition
```
BlobBackground              ← fixed, z-0
└─ div.grid(72px+1fr)       ← z-[2]
   ├─ Sidebar               ← 72px fixed
   └─ div.flex-col           ← main area
      ├─ TopBar              ← h-16 glassmorphism, contain SearchBox+CreditsPill
      ├─ div.scroll          ← custom-scrollbar
      │  ├─ ProgressIndicator    ← conditional: isUploading || uploadProgress>=0
      │  ├─ HeroInput            ← file upload drop zone
      │  ├─ StatsBanner          ← 4-col metrics
      │  ├─ header + FilterChips ← "Klip Terbaru" section
      │  └─ ClipGrid             ← responsive grid cards
      └─
```

---

## 📦 Data Layer — `sampleClips.js`

### `sampleClips: Clip[]`
```ts
type Clip = {
  id: string            // unik
  title: string         // judul klip
  duration: string      // "0:48"
  score: number         // 0-100 AI virality
  status: 'ready' | 'processing' | 'draft' | 'error'
  source: 'youtube' | 'tiktok' | 'instagram' | 'local'
  sourceLabel: string   // nama sumber
  caption: string       // HTML string (pakai <span> highlight)
  thumbnail: string     // URL gambar
  hook: number          // 0-100
  trend: number         // 0-100
  visual: number        // 0-100
  audio: number         // 0-100
  aspectRatio: string   // "9:16"
}
```

### `defaultStats: Stat[]`
```ts
type Stat = {
  id: 'clips' | 'views' | 'engagement' | 'time'
  value: string         // "147", "2.4M"
  label: string
  trend?: { direction: 'up' | 'down', value: string }
  icon: string          // key ke iconConfig di StatsBanner
}
```

### `defaultNavItems: NavItem[]`
```ts
type NavItem = {
  id: string
  label: string
  icon: 'home' | 'clips' | 'comments' | 'templates' | 'analytics'
  active?: boolean
  badge?: boolean
}
```

### `defaultBottomNavItems: NavItem[]`
```ts
// id: 'help' | 'settings'
```

### `processingSteps: Step[]`
```ts
type Step = { id: string, label: string }
// Upload → Extract Audio → Transcribe → Analyze → Processing → Done
```

### `clipFilters: Filter[]`
```ts
type Filter = { id: 'all' | 'viral' | 'processing' | 'draft', label: string }
```

---

## 🧩 Components — Props & Internal Logic

### 1. `BlobBackground`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| *(none)* | — | — | Pure decorative, no props |

**Internal:** 2 div absolute dengan `filter: blur(140px)`, pink blob (top-right), purple blob (bottom-center)

---

### 2. `Sidebar`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `logo` | `ReactNode` | ClipAI SVG | Replaceable logo |
| `navItems` | `NavItem[]` | `[]` | Top navigation items |
| `bottomItems` | `NavItem[]` | `[]` | Bottom items (help, settings) |
| `userInitials` | `string` | `'CA'` | Avatar text |
| `onNavClick` | `(id: string) => void` | — | Click handler |
| `activeNav` | `string` | `'home'` | Active item highlight |
| `className` | `string` | `''` | Extra classes |

**Internal logic:**
- `iconSvgs` — object map: `{ home: <svg/>, clips: <svg/>, ... }` (7 icons)
- Active state: `bg-accent-gradient-soft` + `text-clip-accent` + pseudo `::before` line indicator
- Tooltip: `group-hover:opacity-100` on absolute positioned `<span>`
- Badge: red dot via `item.badge` boolean
- Spacer: `flex-1` div between top and bottom nav groups
- Avatar button: gradient bg with initials text

---

### 3. `TopBar`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `children` | `ReactNode` | — | Left-side slot (page title etc) |
| `credits` | `number` | `0` | Credit balance |
| `notificationCount` | `number` | `0` | Red dot trigger |
| `onSearch` | `(query: string) => void` | — | Search callback |
| `onUpgrade` | `() => void` | — | Upgrade button click |
| `onNotifications` | `() => void` | — | Bell icon click |
| `className` | `string` | `''` | Extra classes |

**Internal:** Composes `SearchBox` + `CreditsPill` + notification bell button. Glassmorphism via `bg-clip-base/70 backdrop-blur-[20px]`

---

### 4. `SearchBox`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `placeholder` | `string` | `'Cari klip...'` | Input placeholder |
| `onSearch` | `(q: string) => void` | — | Live-search callback |
| `className` | `string` | `''` | Extra classes |

**Internal state:** `value` (string); onChange → setValue + onSearch(value)
**UI:** Search icon svg (left), input, ⌘K badge (right), focus ring styles.

---

### 5. `CreditsPill`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `credits` | `number` | `0` | Displayed number |
| `label` | `string` | `'credits'` | Label text |
| `onUpgrade` | `() => void` | — | Upgrade button handler |
| `className` | `string` | `''` | Extra classes |

**Internal:** Star icon (gradient circle), mono font number, Upgrade button with hover scale

---

### 6. `HeroInput`  ← **CORE UPLOAD COMPONENT**
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `headline` | `ReactNode` | "Ubah video..." | Custom hero text |
| `subtitle` | `string` | `''` | Description paragraph |
| `features` | `string[]` | `[]` | Feature chip labels |
| `onUpload` | `(files: File[]) => void` | — | Upload callback |
| `isUploading` | `boolean` | `false` | Disable state |
| `className` | `string` | `''` | Extra classes |

**Internal state:** `isDragOver` (bool), `selectedFile` (File|null)
**Internal methods:**
- `handleDrag(e)` — preventDefault, no-op
- `handleDragIn(e)` — set isDragOver=true
- `handleDragOut(e)` — set isDragOver=false
- `handleDrop(e)` — extract video files → setSelectedFile → onUpload(files)
- `handleFileSelect(e)` — from hidden `<input type="file">`
- `handleProcess()` — trigger onUpload with selectedFile

**UI states:**
- Default: placeholder text + Browse button + Process button (disabled)
- File selected: filename shown + Process button active
- Drag over: pink border + glow shadow + "Lepaskan file" hint
- Uploading: spinner + "Memproses..." + Process disabled
- Bottom: feature chips row (checkmark icons)

---

### 7. `StatsBanner`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `stats` | `Stat[]` | `[]` | 4 stat items |
| `className` | `string` | `''` | Extra classes |

**Internal:** `iconConfig` object map — 4 icon types (`clips`, `views`, `engagement`, `time`) each with SVG + color classes. Responsive: `max-sm:grid-cols-2`. Trend arrow (↑) rendered conditionally.

---

### 8. `ClipCard`  ← **CORE DISPLAY COMPONENT**
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `clip` | `Clip` | (required) | Clip data object |
| `onClick` | `() => void` | — | Card click |
| `onPreview` | `() => void` | — | Preview button |
| `onDownload` | `() => void` | — | Download button |
| `index` | `number` | `0` | Animation stagger |
| `className` | `string` | `''` | Extra classes |

**Internal logic:**
- `sourceIcons` — SVG map: youtube (red), tiktok (white), instagram (pink), local (upload)
- `sourceColorMap` — text color per platform
- ~~`getScoreClass(score)`~~ → delegated to `ScoreRing` component

**UI layers (thumbnail overlays, z-indexed):**
| Layer | z-index | Content |
|-------|---------|---------|
| Image | 0 | `<img>` with hover scale(1.06) |
| Gradient overlay | 1 | `bg-card-overlay` (black→transparent) |
| Top row | 2 | ScoreRing + StatusBadge |
| Caption preview | 2 | HTML caption (dangerouslySetInnerHTML) |
| Duration | 2 | Mono font badge, bottom-right |
| Play overlay | 3 | White circle play, opacity 0→1 on hover |
| Hover actions | 4 | Preview + Download buttons, slide in |

**Meta section:** Title (2-line clamp), Info row (source icon + label + duration + aspect ratio), ScoreBar component

---

### 9. `ClipGrid`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `clips` | `Clip[]` | `[]` | Array of clip data |
| `onClipClick` | `(clip: Clip) => void` | — | Delegated to ClipCard |
| `onClipPreview` | `(clip: Clip) => void` | — | Delegated to ClipCard |
| `onClipDownload` | `(clip: Clip) => void` | — | Delegated to ClipCard |
| `emptyMessage` | `string` | `'Belum ada...'` | Empty state text |
| `className` | `string` | `''` | Extra classes |

**States:** Empty (icon + message, py-20), Populated (CSS grid auto-fill minmax(220px, 1fr), gap 18px)

---

### 10. `ScoreRing`  ← **SVG CIRCULAR PROGRESS**
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `score` | `number` | (required) | 0-100 value |
| `size` | `number` | `40` | SVG px size |
| `strokeWidth` | `number` | `3` | Ring thickness |
| `showLabel` | `boolean` | `true` | Show number |
| `className` | `string` | `''` | Extra classes |

**Internal:** SVG circle with `strokeDasharray` + `strokeDashoffset`. Color threshold: ≥85 green, ≥70 yellow, <70 red. Rotation -90°.

---

### 11. `StatusBadge`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `status` | `'ready'\|'processing'\|'draft'\|'error'` | — | Status key |
| `className` | `string` | `''` | Extra classes |

**Internal:** Config object map: ready (green), processing (amber + pulse anim), draft (gray), error (red). Renders `<span>` pill with uppercase text.

---

### 12. `ScoreBar`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `hook` | `number` | `0` | Hook sub-score |
| `trend` | `number` | `0` | Trend sub-score |
| `visual` | `number` | `0` | Visual sub-score |
| `audio` | `number` | `0` | Audio sub-score |
| `showLegend` | `boolean` | `true` | Show labels |
| `className` | `string` | `''` | Extra classes |

**Internal:** Calculates percentages from total, renders 4 colored segments: hook(pink), trend(purple), visual(green), audio(amber). Legend shows first 2 (Hook + Tren).

---

### 13. `FilterChips`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `filters` | `Filter[]` | `[]` | Filter options |
| `activeFilter` | `string` | `'all'` | Active filter id |
| `onChange` | `(id: string) => void` | — | Change handler |
| `showGridToggle` | `boolean` | `true` | Grid icon button |
| `className` | `string` | `''` | Extra classes |

**Internal:** Maps filters to buttons. Active = `bg-clip-fg text-black`, inactive = transparent border. Grid toggle is a separate non-filter button.

---

### 14. `ProgressIndicator`
| Props | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `steps` | `Step[]` | `[]` | Step definitions |
| `currentStep` | `number` | `-1` | Active step index (-1=hidden) |
| `showLabels` | `boolean` | `true` | Labels below circles |
| `className` | `string` | `''` | Extra classes |

**Internal logic:**
- `isDone` = currentStep > i → green checkmark + gradient connector
- `isActive` = currentStep === i → pink pulse circle + white dot
- `isPending` = currentStep < i → gray circle with number + muted connector
- Connector lines: `h-[2px]` with gradient bg when done, gray when pending

---

## 🎨 Design Tokens (Tailwind Config)

### Colors — `clip.*` namespace
| Token | Value | Usage |
|-------|-------|-------|
| `base` | `#0a0a0c` | app background |
| `bg` | `#111114` | sidebar bg |
| `panel` | `#16161b` | card/input bg |
| `panel-2` | `#1c1c22` | secondary panel |
| `panel-3` | `#24242c` | tooltip/elevated |
| `border` | `rgba(255,255,255,0.06)` | subtle border |
| `border-2` | `rgba(255,255,255,0.10)` | standard border |
| `border-3` | `rgba(255,255,255,0.16)` | hover/focus border |
| `fg` | `#fafafa` | primary text |
| `fg-2` | `#e4e4e7` | secondary text |
| `muted` | `#71717a` | tertiary text |
| `muted-2` | `#a1a1aa` | muted alt |
| `accent` | `#ff2d6f` | pink primary |
| `accent-2` | `#ff6b9d` | pink light |
| `accent-3` | `#8b5cf6` | purple |
| `success` | `#10b981` | green |
| `warning` | `#f59e0b` | amber |
| `danger` | `#ef4444` | red |

### Background Images
| Key | Value |
|-----|-------|
| `accent-gradient` | `linear-gradient(135deg, #ff2d6f, #8b5cf6)` |
| `accent-gradient-soft` | same at 15% opacity |
| `hero-text` | gradient for text clipping |
| `card-overlay` | `180deg, transparent 40%, black/0.85 100%` |
| `stats-bg` | accent gradient at 4% opacity |

### Fonts
| Key | Stack |
|-----|-------|
| `sans` | Inter → system-ui → sans-serif |
| `display` | Plus Jakarta Sans → sans-serif |
| `mono` | JetBrains Mono → monospace |

### Shadows
| Key | Value |
|-----|-------|
| `accent-sm` | `0 4px 16px -4px rgba(255,45,111,0.5)` |
| `accent-md` | `0 8px 24px -4px rgba(255,45,111,0.6)` |
| `accent-glow` | `0 0 0 4px rgba(255,45,111,0.08)` |
| `card` | `0 20px 60px -20px rgba(0,0,0,0.6)` |
| `card-hover` | `0 24px 48px -12px rgba(0,0,0,0.6)` |
| `logo` | `0 8px 24px -6px rgba(255,45,111,0.5)` |

### Animations
| Key | Duration | Behavior |
|-----|----------|----------|
| `fade-in` | 0.4s | opacity 0→1 + translateY 8→0 |
| `pulse-soft` | 1.5s infinite | opacity 1↔0.6 |
| `slide-up` | 0.3s | translateY 12→0 + opacity |
| `scale-in` | 0.2s | scale 0.95→1 + opacity |

---

## 🔄 Data Flow

```
User Action           →  Component        →  State Update       →  Re-render
─────────────────────────────────────────────────────────────────────────────
Click nav icon        →  Sidebar          →  setActiveNav(id)   →  Sidebar highlight
Type search           →  SearchBox        →  onSearch(query)    →  setSearchQuery  →  ClipGrid filtered
Click filter chip     →  FilterChips      →  setActiveFilter(id)→  ClipGrid filtered
Drop video file       →  HeroInput        →  handleUpload()     →  isUploading, uploadProgress, clips
Click clip card       →  ClipCard         →  handleClipClick()  →  console.log (→ future: modal)
Click preview btn     →  ClipCard         →  handleClipPreview()→  console.log (→ future: video player)
Click download btn    →  ClipCard         →  handleClipDownload()→ console.log (→ future: download)
Click upgrade         →  CreditsPill      →  onUpgrade()        →  console.log (→ future: billing)
Click notifications   →  TopBar           →  onNotifications()  →  console.log (→ future: dropdown)
```

---

## 🚧 Placeholder Handlers (perlu diimplementasi)
| Handler | Lokasi | Yang Perlu Ditambah |
|---------|--------|---------------------|
| `handleClipClick` | App.jsx | Modal detail / video player |
| `handleClipPreview` | App.jsx | Video preview overlay |
| `handleClipDownload` | App.jsx | Actual file download |
| `onUpgrade` | TopBar → App | Billing/pricing modal |
| `onNotifications` | TopBar → App | Notification dropdown |
| `handleUpload` | App.jsx | **API call ganti simulasi** — upload file → backend process → polling status |

---

## ⚙️ Build & Deploy
```bash
npm run dev       # Dev server :3000
npm run build     # Production build → dist/
npm run deploy    # Build + push ke gh-pages branch
```
Live: `https://ngktaudeh.github.io/clipai-frontend/`
Repo: `github.com/ngktaudeh/clipai-frontend`
