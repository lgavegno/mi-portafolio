# UC-04 — Performance Optimization via Code Splitting

**ID:** UC-04
**Título:** Load portfolio with optimal performance through code splitting and lazy loading
**Actores:** End User (any), Performance monitoring system
**Prioridad:** CRÍTICA (Core Web Vitals, portfolio demonstration)
**Precondiciones:** Vite build configured, routes defined
**Postcondiciones:** Bundle split optimally, metrics meet targets

---

## 1. Objectives

**Primary:** Minimize LCP (Largest Contentful Paint) and total bundle size
**Secondary:** Improve FID (First Input Delay) via code splitting
**Target:** Lighthouse >90, LCP <2.5s, CLS 0

---

## 2. Happy Path — Build & Load Sequence

```
═══════════════════════════════════════════════════════════
COMPILE TIME (Build)
═══════════════════════════════════════════════════════════

Step 1: npm run build
  → Vite análiza dependencias
  → Ejecuta rollupOptions: manualChunks

Step 2: Genera chunks automáticos
  → vendor.js: React, ReactDOM, Framer Motion, React Router, React Helmet
    └─ Size: ~150kb (gzip: ~45kb)
  → ui.js: React Icons
    └─ Size: ~100kb (gzip: ~30kb)
  → main.js: App code, layouts, pages
    └─ Size: ~80kb (gzip: ~20kb)
  → BlogIndex.js: Blog feature (lazy-loaded)
    └─ Size: ~30kb (gzip: ~8kb)
  → HeroBanner.js: Hero feature (static import)
    └─ Size: ~20kb (gzip: ~6kb)
  → Other features: About.js, Services.js, Works.js, Contact.js
    └─ Total: ~60kb (gzip: ~15kb)

Step 3: Brotli compression
  → vite-plugin-compression ejecuta
  → Todos .js → .js.br (Brotli)
  → Compression ratio: .br files 25-30% más pequeños que gzip

Step 4: Output structure
  dist/
  ├── index.html
  ├── assets/
  │   ├── vendor-[hash].js + .js.br
  │   ├── ui-[hash].js + .js.br
  │   ├── main-[hash].js + .js.br
  │   ├── [feature]-[hash].js + .js.br (lazy-loaded)
  │   └── style-[hash].css + .css.br
  └── sitemap.xml

═══════════════════════════════════════════════════════════
RUNTIME (Initial Page Load)
═══════════════════════════════════════════════════════════

Step 1: User requests https://portfolio.com/
  → Vercel CDN serves index.html (cache: 1 year)
  → Browser parses HTML, constructs DOM

Step 2: Load critical assets (blocking)
  ✓ vendor.js (React, Router, Framer)
  ✓ main.js (App, routing logic)
  └─ Total critical: ~65kb (Brotli) → Time: 200-400ms on 4G

Step 3: Load UI assets (non-blocking, parallel)
  ✓ style.css (Tailwind critical path)
  ✓ ui.js (React Icons)
  └─ Time: 100-300ms parallel to above

Step 4: Render initial view
  → React mounts at #root
  → App.jsx renders
  → React Router initializes
  → MainLayout renders Header
  → HomeSections begins render

Step 5: Static imports render immediately
  ✓ HeroBanner: STATIC IMPORT (no lazy)
    → Renders hero, about, skills sections
    → Framer Motion triggers animations
    → LCP achieved ~1.8s (hero visible)

Step 6: Lazy-loaded components (async, non-blocking)
  ⊘ About: lazy(() => import(...))
  ⊘ Services: lazy(() => import(...))
  ⊘ Works: lazy(() => import(...))
  ⊘ BlogPreview: lazy(() => import(...))
  ⊘ Contact: lazy(() => import(...))
  └─ These load in background, Suspense shows Skeleton

Step 7: Strategic prefetch (after 3s idle)
  → App.useEffect() ejecuta setTimeout(prefetchBlog, 3000)
  → Imports BlogIndex.js chunk dynamically
  → No bloquea FID, mejora /blog navigation speed

═══════════════════════════════════════════════════════════
NAVIGATION (Route change, e.g., / → /blog)
═══════════════════════════════════════════════════════════

Step 1: User clicks "Blog" link
  → React Router intercepts (no full page reload)
  → BlogIndex chunk already prefetched (Step 7 anterior)
  → Component renders immediately
  → Framer Motion animates transition

Step 2: Blog page fully interactive
  → Time: <100ms additional (chunk already loaded)
  → FID: <50ms
```

---

## 3. Key Metrics & Targets

| Metric | Current (Est.) | Target | How to measure |
|--------|---|--------|---------|
| **LCP** (Largest Contentful Paint) | TBD | <2.5s | Lighthouse, Web Vitals |
| **FID** (First Input Delay) | TBD | <100ms | Web Vitals, Dev Tools |
| **CLS** (Cumulative Layout Shift) | 0 | 0 | Lighthouse |
| **Total Bundle Size** | ~440kb | <300kb | `npm run build` output |
| **Gzip Size** | ~110kb | <100kb | Check vendor.js gzip |
| **Brotli Size (vendor)** | ~45kb | <40kb | .br files in dist/ |
| **LCP Time (mobile 4G)** | TBD | <3.5s | DevTools throttling |
| **Lighthouse Score** | TBD | >90 | lighthouse-ci |

---

## 4. Implementation Details

### Static imports (render immediately)
```javascript
// src/App.jsx
import HeroBanner from './features/hero/HeroBanner'  // ← CRITICAL
// Rendered directly in HomeSections
```

### Lazy imports (load in background)
```javascript
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./features/services/Services'))
const Works = lazy(() => import('./features/works/Works'))
const Contact = lazy(() => import('./features/contact/Contact'))
// Wrapped in AnimatedSection + Suspense
```

### Suspense fallback
```javascript
<Suspense fallback={<SkeletonPage />}>
  {/* Renders while chunk loading */}
</Suspense>
```

### Strategic prefetch
```javascript
useEffect(() => {
  const timer = setTimeout(async () => {
    await import('./pages/BlogIndex')  // Preload but don't render
  }, 3000)
  return () => clearTimeout(timer)
}, [])
```

### Vite manual chunks config
```javascript
// vite.config.js
manualChunks: {
  vendor: ['react', 'react-dom', 'framer-motion', 'react-router-dom', 'react-helmet-async'],
  ui: ['react-icons']
}
```

---

## 5. Validación (Phase 4 tasks)

### 5.1 Build size audit
```bash
npm run build
# Check dist/ sizes:
# - vendor.js.br should be <45kb
# - main.js.br should be <25kb
# - Total: <300kb (Brotli)
```

### 5.2 Lighthouse audit
```bash
npx lighthouse https://portfolio.vercel.app --preset=desktop --output-path=./audit.html
# Score: >90
# LCP: <2.5s
# CLS: 0
```

### 5.3 Web Vitals monitoring
- Integrar Google Analytics / Vercel Analytics
- Monitorear LCP, FID, CLS en producción
- Alert si metrics degrade

### 5.4 Performance profiling
- DevTools: throttle to "Slow 4G"
- Measure LCP, FID, TTI
- Identify bottlenecks (parse time, JS evaluation, etc.)

---

## 6. Optimization Roadmap (if needed)

| Issue | Solution | Impact | Effort |
|-------|----------|--------|--------|
| LCP >2.5s on mobile | Image optimization, reduce main.js | High | Low |
| CLS > 0 | Fix layout shifts in components | High | Medium |
| Vendor.js >45kb | Tree-shake unused React Icons | Medium | Medium |
| No prefetch strategy | Implement route-based prefetch | Low | Low |
| Slow TTI | Reduce React render time | Low | High |

---

## 7. Definition of Done (Phase 4)

- [ ] Lighthouse score >90 (desktop + mobile)
- [ ] LCP <2.5s on 4G throttled
- [ ] CLS = 0 (no layout shift)
- [ ] Bundle size <300kb (Brotli)
- [ ] Prefetch strategy working (no extra time on /blog nav)
- [ ] All chunks loaded and rendering correctly
- [ ] Audit report generated and documented
- [ ] Performance monitoring integrated (optional)

---

## 8. Test Plan (Phase 4)

```javascript
// src/__tests__/performance.test.js
test('Bundle sizes meet targets')
test('Code splitting creates expected chunks')
test('Lazy components load within SLA')
test('Prefetch doesn\'t block FID')
test('Brotli compression is applied')
```

---

**SEQ Diagram:** [SEQ-04_code_splitting.puml](./SEQ-04_code_splitting.puml)

**Related ADRs:**
- [ADR-001: Vite build tool](../adr/ADR-001.md)

**Status:** 🔄 Ready for Phase 4 (Performance audit)

---

## 9. References

- Vite Performance Guide: https://vite.dev/guide/features.html
- Core Web Vitals: https://web.dev/vitals/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Code splitting patterns: https://react.dev/learn/code-splitting
