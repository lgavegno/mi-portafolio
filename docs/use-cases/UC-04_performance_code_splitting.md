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
    → LCP achieved ~1.1s (hero visible) — estimación inicial ~1.8s, confirmado por auditoría real en 1.1s (Lighthouse Desktop, 2026-06-18)

Step 6: Lazy-loaded components (async, non-blocking)
  ⊘ About: lazy(() => import(...))
  ⊘ Services: lazy(() => import(...))
  ⊘ Works: lazy(() => import(...))
  ⊘ BlogPreview: lazy(() => import(...))
  ⊘ Contact: lazy(() => import(...))
  └─ These load in background, Suspense shows Skeleton

═══════════════════════════════════════════════════════════
NAVIGATION (Route change, e.g., / → /blog)
═══════════════════════════════════════════════════════════

Step 1: User clicks "Blog" link
  → React Router intercepts (no full page reload)
  → BlogIndex chunk loads on demand (React.lazy)
  → Component renders once resolved, Suspense shows Skeleton in the meantime
  → Framer Motion animates transition
```

---

## 3. Key Metrics & Targets

**Medido — Lighthouse 2026-06-18** (ver `CLAUDE.md`, `docs/AUDIT_2026-06-15.md`):

| Metric | Desktop (incógnito) | Mobile Slow 4G (incógnito) | Target |
|--------|---------------------|------------------------------|--------|
| **Lighthouse Performance** | 98 | 61 | >90 |
| **Lighthouse SEO** | 100 | 100 | — |
| **Lighthouse Best Practices** | 100 | 100 | — |
| **Lighthouse Accessibility** | 94 | 94 | — |
| **FCP** (First Contentful Paint) | 0.6s | — | — |
| **LCP** (Largest Contentful Paint) | 1.1s | — | <2.5s ✅ |
| **TBT** (Total Blocking Time) | 0ms | — | — |
| **CLS** (Cumulative Layout Shift) | 0 | — | 0 ✅ |
| **SI** (Speed Index) | 1.0s | — | — |

**No medido / no documentado** (no hay reporte de `npm run build` archivado en el repo — no inventar cifras):

| Metric | Status | How to measure |
|--------|--------|-----------------|
| **Total Bundle Size (Brotli)** | No auditado | `npm run build` output |
| **Vendor chunk size (Brotli)** | No auditado | `.br` files in `dist/` |
| **FID / INP** | No reportado por Lighthouse en este audit (usa TBT como proxy) | Web Vitals, Dev Tools |
| **Mobile LCP/FCP/CLS individuales** | No desglosados en el audit — solo el score compuesto | Lighthouse mobile run |

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

### Vite manual chunks config
```javascript
// vite.config.js
manualChunks: {
  vendor: ['react', 'react-dom', 'framer-motion', 'react-router-dom', 'react-helmet-async'],
  ui: ['react-icons']
}
```

---

## 5. Validación

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
| Slow TTI | Reduce React render time | Low | High |

**Nota:** Un mecanismo de "prefetch estratégico" (precarga del chunk de Blog tras 3s de idle, vía `setTimeout` + `import()` dinámico) estuvo documentado aquí como parte del diseño pero **nunca se implementó** (`grep -rn "prefetch" src/` no devuelve resultados) — no está en el roadmap activo; queda como idea de backlog si el perfil de navegación lo justifica.

---

## 7. Definition of Done

- [x] Lighthouse score >90 desktop (98) — mobile Slow 4G queda en 61, por debajo del target (ver métricas §3)
- [x] LCP <2.5s desktop (1.1s medido)
- [x] CLS = 0 (no layout shift)
- [ ] Bundle size <300kb (Brotli) — no auditado, sin reporte archivado
- [x] All chunks loaded and rendering correctly
- [x] Audit report generated and documented — ver `docs/AUDIT_2026-06-15.md`, `docs/AUDIT_2026-08-24.md`
- [ ] Performance monitoring integrado (optional) — no implementado

---

## 8. Test Plan

No hay tests de performance automatizados en el repo (`src/__tests__/performance.test.js` no existe). La suite Vitest actual cubre `Contact`, `useLocale` y `experience` — no bundle size ni code splitting. Sección de backlog, no implementada:

```javascript
// Propuesto, no implementado
test('Bundle sizes meet targets')
test('Code splitting creates expected chunks')
test('Lazy components load within SLA')
test('Brotli compression is applied')
```

---

**SEQ Diagram:** [SEQ-04_code_splitting.puml](./SEQ-04_code_splitting.puml)

**Related ADRs:**
- [ADR-001: Vite build tool](../adr/ADR-001.md)

**Status:** ✅ Auditado — Lighthouse 2026-06-18 (ver §3). Bundle size (Brotli) queda sin auditar/documentar.

---

## 9. References

- Vite Performance Guide: https://vite.dev/guide/features.html
- Core Web Vitals: https://web.dev/vitals/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Code splitting patterns: https://react.dev/learn/code-splitting
