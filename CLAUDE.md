# CLAUDE.md — Portfolio ONGEVAG
**Current Phase:** FEATURE-04_HERO_ANIMATION — In Progress (QA/PR pendientes)
**Last Updated:** 2026-06-15

## Propósito
Portfolio SPA React 19 + Vite (feature-based DDD Light) para captar clientes PyMEs.

## Stack
React 19.1.0 | Vite 6.3.5 | Tailwind 3.3.0 | Framer Motion 12.23.12 | React Router 7.17.0 | EmailJS 4.4.1 | DOMPurify 3.4.9

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
| FEATURE-00_PROJECT_SETUP | ✅ Done | `docs/specs/FEATURE-00_PROJECT_SETUP/` | mod-00_overview.md |
| FEATURE-01_I18N_ROUTING | ✅ Done | `docs/specs/FEATURE-01_I18N_ROUTING/` | ADR-006..011 |
| FEATURE-02_SEO_METATAGS | ✅ Done | `docs/specs/FEATURE-02_SEO_METATAGS/` | spec.md, plan.md, task.md |
| FEATURE-03_AEO_SCHEMA | ✅ Done | `docs/specs/FEATURE-03_AEO_SCHEMA/` | spec.md, plan.md, tasks.md |
| FEATURE-04_HERO_ANIMATION | 🔄 In Progress | `docs/specs/FEATURE-04_HERO_ANIMATION/` | spec · plan · tasks |
| FEATURE-05_PROJECT_MANAGEMENT | ✅ Done | `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/` | spec.md · plan.md · tasks.md |
| FEATURE-06_PARTNERS_AGENCIAS | 🔄 In Progress | `docs/specs/FEATURE-06-PARTNERS_AGENCIAS/` | spec.md · plan.md · tasks.md |

## ADRs Documented
ADR-001 (Vite) | ADR-002 (JS no TS) | ADR-003 (EmailJS) | ADR-004 (Feature-based) | ADR-005 (Vitest) | ADR-006 (URL i18n) | ADR-007 (ES default) | ADR-008 (og:image PNG) | ADR-009 (JSON-LD global) | ADR-010 (No i18n lib) | ADR-011 (URL source of truth)

## i18n Architecture (FEATURE-01 — DONE)
- `/` → ES por defecto (canónico) | `/en` → EN completo
- `LocaleProvider` + `useLocale()` — nunca importar locale files directamente en componentes
- `t` es objeto plano: acceso `t.modulo.clave` (NO función)
- Blog ES: `blogData.es.js` tiene 6 posts traducidos — `/blog` muestra contenido en español
- Switcher ES|EN path-aware en Header — cambia TODO sin excepciones
- Deuda: LocaleProvider como objeto plano — si se requiere `t('clave')` → refactorizar

## Performance (actualizado 2026-06-15)
- Bundle principal: 233KB (era 363KB) — reducción 35% con lazy() en 4 páginas
- Code splitting: BlogIndex, BlogLayout, BlogPostDetail, ProjectDetail → lazy
- Seguridad: dompurify@3.4.9, react-router-dom@7.17.0 — CVEs parcheados
- ESLint: 0 errores (jsx-uses-vars rule agregada, vitest globals configurados)
- Tests: 71/71 passing (UC-01 Contact Form — suite completa)

## Critical Files — Don't Break
| File | Reason |
|------|--------|
| `src/components/ParticleBackground.jsx` | Canvas animation; NO React.lazy |
| `scrollToContact` (fn en `HeroBanner.jsx`) | CTA "Contactar" — su eliminación rompe scroll sin error visible |
| `src/context/LocaleProvider.jsx` | i18n core — cambios rompen toda la app |
| `vercel.json` | SPA routing catch-all `/(.*) → index.html` |
| `public/og-image.svg` | Social sharing (1200x630) |
| `tailwind.config.js` | Custom colors (cyan, cobalt, mint) |
| `src/components/Button.jsx` | Renderiza `<Spinner>` SVG (no texto) cuando `loading=true` — assertions de tests deben usar `querySelector('svg')`, no `textContent` |

## Key Doc Map
- `docs/SDD_MASTER.md` — Central index + module registry
- `docs/MOD-00_overview.md` — System vision
- `docs/use-cases/` — UC-01 Contact, UC-02 Blog, UC-03 Projects, UC-04 Performance
- `docs/adr/` — All architecture decisions (ADR-001 a ADR-011)

## Deployment
**Platform:** Vercel | **Trigger:** Push to `main` / `develop` | **Build:** ~30s
