# CLAUDE.md — Portfolio ONGEVAG
**Current Phase:** FEATURE-02_SEO_METATAGS — Planned  
**Last Updated:** 2026-06-08

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
├── components/     # UI Kit global (Header, Footer, About, SkillsGrid, etc.)
├── context/        # LocaleProvider, LocaleContext
├── features/       # Módulos (hero, blog, contact, services, works)
├── hooks/          # useLocale, useVibrate
├── layouts/        # MainLayout, BlogLayout (wrapper mínimo)
├── locales/        # en/ y es/ — locale files por módulo
│   ├── en/         # common, hero, services, works, contact, about, blog
│   └── es/         # espejo exacto de en/
├── pages/          # Rutas: / | /en | /blog | /en/blog | /proyecto/:id
├── data/           # projects.en.js, projects.es.js (slugs inmutables)
└── config/         # motionConfig.js
```

## Env Vars
```bash
VITE_EMAILJS_SERVICE_ID=...    # Email service ID
VITE_EMAILJS_TEMPLATE_ID=...   # Email template
VITE_EMAILJS_PUBLIC_KEY=...    # Public key (required)
```

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
| FEATURE-00_PROJECT_SETUP | ✅ Done | `docs/specs/FEATURE-00/` | — |
| FEATURE-01_I18N_ROUTING | ✅ Done | `docs/specs/FEATURE-01/` | ADR-006..011 |
| FEATURE-02_SEO_METATAGS | ⏳ Planned | `docs/specs/FEATURE-02/` | — |
| FEATURE-03_AEO_SCHEMA | ⏳ Planned | `docs/specs/FEATURE-03/` | — |
| FEATURE-04_HERO_ANIMATION | ✅ Active | `docs/specs/FEATURE-04/` | HeroBanner.jsx |
| FEATURE-05_PROJECT_MANAGEMENT | ✅ Active | `docs/specs/FEATURE-05/` | Works.jsx |

## ADRs Documented
ADR-001 (Vite) | ADR-002 (JS no TS) | ADR-003 (EmailJS) | ADR-004 (Feature-based) | ADR-005 (Vitest) | ADR-006..011 (i18n)

## i18n Architecture (FEATURE-01 — DONE)
- `/` → ES por defecto (canónico) | `/en` → EN completo
- `LocaleProvider` + `useLocale()` — nunca importar locale files directamente en componentes
- `t` es objeto plano: acceso `t.modulo.clave` (NO función)
- Blog EN-only: `blogData.es.js = []` — `/blog` muestra banner con link a `/en/blog`
- Switcher ES|EN path-aware en Header — cambia TODO sin excepciones
- Deuda: LocaleProvider como objeto plano — si se requiere `t('clave')` → refactorizar

## Critical Files — Don't Break
| File | Reason |
|------|--------|
| `src/components/ParticleBackground.jsx` | Canvas animation; NO React.lazy |
| `src/context/LocaleProvider.jsx` | i18n core — cambios rompen toda la app |
| `vercel.json` | SPA routing catch-all `/(.*) → index.html` |
| `public/og-image.svg` | Social sharing (1200x630) |
| `tailwind.config.js` | Custom colors (cyan, cobalt, mint) |

## Key Doc Map
- `docs/SDD_MASTER.md` — Central index + module registry
- `docs/MOD-00_overview.md` — System vision
- `docs/use-cases/` — UC-01 Contact, UC-02 Blog, UC-03 Projects, UC-04 Performance
- `docs/adr/` — All architecture decisions (9 ADRs)
- `src/docs/adr/` — Legacy copies (will be retired)

## Deployment
**Platform:** Vercel | **Trigger:** Push to `main` / `develop` | **Build:** ~30s
