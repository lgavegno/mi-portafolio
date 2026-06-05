# CLAUDE.md — Ongevag Studio Portfolio
**Current Phase:** Post-Auditoría SDD — Consolidación de documentación (PASO 6)  
**Last Updated:** 2026-06-05

## Propósito
Portfolio SPA React 19 + Vite (feature-based DDD Light) para captar clientes PyMEs.

## Stack
React 19.1.0 | Vite 6.3.5 | Tailwind 3.3.0 | Framer Motion 12.23.12 | React Router 7.11.0 | EmailJS 4.4.1

## Comandos
```bash
npm run dev       # Desarrollo: Vite + HMR en 5173
npm run build     # Build optimizado con chunks/compression
npm run lint      # ESLint React + React Hooks
npm run test      # Tests (Vitest + React Testing Library)
```

## Estructura
```
src/
├── components/     # UI Kit global (Button, Header, Skeleton, etc.)
├── features/       # Módulos (hero, blog, contact, services, works, analytics)
├── layouts/        # MainLayout, BlogLayout
├── pages/          # Rutas: / | /blog | /blog/:slug | /proyecto/:id
├── hooks/          # Custom hooks
├── data/           # projects.js, blogData.js
└── config/         # motionConfig.js
```

## Env Vars
```bash
VITE_EMAILJS_SERVICE_ID=...    # Email service ID
VITE_EMAILJS_TEMPLATE_ID=...   # Email template
VITE_EMAILJS_PUBLIC_KEY=...    # Public key (required)
```

## Critical Files — Don't Break
| File | Reason |
|------|--------|
| `src/components/ParticleBackground.jsx` | Canvas animation; NO React.lazy |
| `vercel.json` | SPA routing rewrites (404 without it) |
| `public/og-image.svg` | Social sharing (1200x630) |
| `tailwind.config.js` | Custom colors (cyan, cobalt, mint) |

## Architecture: Feature-Based (DDD Light)
- **components/** — UI Kit (Button, Header, Footer, etc.) — reusable, agnostic
- **features/** — Business modules (hero, blog, contact, services, works, analytics) — self-contained
- **layouts/, pages/, config/** — Page composition, routing, global animation config
- **Zero global state** — React hooks + local state only

## Performance & Accessibility
- Code splitting: Hero eager, others lazy (React Router)
- Animation: Framer Motion springs, respects `prefers-reduced-motion`
- SEO: React Helmet async + meta tags
- CLS: 0 | LCP: ~1.2s | FID: ~50ms

## Module Index (SDD)
| FEATURE | Status | Location | Owner |
|---------|--------|----------|-------|
| FEATURE-00_PROJECT_SETUP | ✅ Active | `docs/specs/FEATURE-00/` | — |
| FEATURE-01_I18N_ROUTING | ⏳ Planned | `docs/specs/FEATURE-01/` | (ADR-006..011) |
| FEATURE-02_SEO_METATAGS | ⏳ Planned | `docs/specs/FEATURE-02/` | — |
| FEATURE-03_AEO_SCHEMA | ⏳ Planned | `docs/specs/FEATURE-03/` | — |
| FEATURE-04_HERO_ANIMATION | ✅ Active | `docs/specs/FEATURE-04/` | HeroBanner.jsx |
| FEATURE-05_PROJECT_MANAGEMENT | ✅ Active | `docs/specs/FEATURE-05/` | Works.jsx |

## ADRs Documented
ADR-001 (Vite) | ADR-002 (JS no TS) | ADR-003 (EmailJS) | ADR-004 (Feature-based) | ADR-005 (Vitest) | ADR-006..011 (i18n)

## Key Doc Map
- `docs/SDD_MASTER.md` — Central index + module registry
- `docs/MOD-00_overview.md` — System vision
- `docs/use-cases/` — UC-01 Contact, UC-02 Blog, UC-03 Projects, UC-04 Performance
- `docs/adr/` — All architecture decisions (9 ADRs)
- `src/docs/adr/` — Legacy copies (will be retired)

## Deployment
**Platform:** Vercel | **Trigger:** Push to `main` / `develop` | **Build:** ~30s
