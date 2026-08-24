# CLAUDE.md — Portfolio ONGEVAG
**Current Phase:** fix/visual-contrast-polish — ✅ Done → pendiente merge a main como v3.2.1
**Last Updated:** 2026-07-07

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
├── components/     # UI Kit global (Header, Footer, About, SkillsGrid, SectionDivider, etc.)
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
- **components/** — UI Kit (Button, Header, Footer, SectionDivider, etc.) — reusable, agnostic
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
| FEATURE-04_HERO_ANIMATION | ✅ Done | `docs/specs/FEATURE-04_HERO_ANIMATION/` | spec · plan · tasks |
| FEATURE-05_PROJECT_MANAGEMENT | ✅ Done | `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/` | spec.md · plan.md · tasks.md |
| FEATURE-06_PARTNERS_AGENCIAS | ✅ Done | `docs/specs/FEATURE-06-PARTNERS_AGENCIAS/` | spec.md · plan.md · tasks.md |
| EPIC-07_REBRAND_2026 | ✅ Done | `docs/specs/FEATURE-07-REBRAND_2026/` | spec.md · ADR-012 |
| FEATURE-08_SECTION_DIVIDERS | 🔄 In Progress | `docs/specs/FEATURE-08-SECTION-DIVIDERS/` | spec.md · plan.md · tasks.md |
| FEATURE-10_PT_LOCALE | ✅ Done | `docs/specs/FEATURE-10_PT_LOCALE/` | spec.md · plan.md · tasks.md |

## ADRs Documented
ADR-001 (Vite) | ADR-002 (JS no TS) | ADR-003 (EmailJS) | ADR-004 (Feature-based) | ADR-005 (Vitest) | ADR-006 (URL i18n) | ADR-007 (ES default) | ADR-008 (og:image PNG) | ADR-009 (JSON-LD global) | ADR-010 (No i18n lib) | ADR-011 (URL source of truth) | ADR-012 (Rebrand Visual 2026)

## i18n Architecture (FEATURE-01 — DONE)
- `/` → ES por defecto (canónico) | `/en` → EN completo
- `LocaleProvider` + `useLocale()` — nunca importar locale files directamente en componentes
- `t` es objeto plano: acceso `t.modulo.clave` (NO función)
- Blog ES: `blogData.es.js` tiene 6 posts traducidos — `/blog` muestra contenido en español
- Switcher ES|EN path-aware en Header — cambia TODO sin excepciones
- Deuda: LocaleProvider como objeto plano — si se requiere `t('clave')` → refactorizar

## Performance (Lighthouse 2026-06-18)
| Contexto | Performance | SEO | Best Practices | Accessibility |
|----------|-------------|-----|----------------|---------------|
| Desktop incógnito | 98 | 100 | 100 | 94 |
| Mobile Slow 4G incógnito | 61 | 100 | 100 | 94 |

**Métricas desktop:** FCP 0.6s · LCP 1.1s · TBT 0ms · CLS 0 · SI 1.0s

## Critical Files — Don't Break
| File | Reason |
|------|--------|
| `src/components/ParticleBackground.jsx` | Canvas animation; NO React.lazy — NOTA: eliminado de HeroBanner.jsx en rebrand (DT: reactivar si se vuelve a fondo oscuro) |
| `scrollToContact` (fn en `HeroBanner.jsx`) | CTA "Contactar" — su eliminación rompe scroll sin error visible |
| `src/context/LocaleProvider.jsx` | i18n core — cambios rompen toda la app |
| `vercel.json` | SPA routing catch-all `/(.*) → index.html` |
| `public/og-image.svg` | Social sharing (1200x630) |
| `tailwind.config.js` | Paleta rebrand 2026: cream/sand/mist-blue/steel-blue/navy (ver ADR-012) |
| `src/components/Button.jsx` | Renderiza `<Spinner>` SVG (no texto) cuando `loading=true` — assertions de tests deben usar `querySelector('svg')`, no `textContent` |
| `src/components/ui/SectionDivider.jsx` | SVG inline dividers — `preserveAspectRatio="none"` es mandatorio; cambiar paths SVG o `fromColor`/`toColor` rompe transiciones visuales entre secciones |

## Deuda Técnica Activa
| ID | Descripción | Prioridad |
|----|-------------|-----------|
| DT-08-01 | Works.jsx — ProjectCard sin migrar a light mode (bg-obsidian) | MEDIO |
| DT-08-02 | ProjectDetail.jsx — página completa sin migrar | MEDIO |
| DT-08-03 | Issues contraste audit WCAG AA pendientes (#96B6C5 como texto) | BAJO |
| DT-09-01 | ✅ RESUELTO — npm audit: 26 vulnerabilidades → 0. path-to-regexp era dev-only (eslint/MCP SDK), no runtime. react-router-dom y dompurify actualizados sin breaking changes | — |

## Key Doc Map
- `docs/SDD_MASTER.md` — Central index + module registry
- `docs/MOD-00_overview.md` — System vision
- `docs/use-cases/` — UC-01 Contact, UC-02 Blog, UC-03 Projects, UC-04 Performance
- `docs/adr/` — All architecture decisions (ADR-001 a ADR-012)
- `docs/specs/FEATURE-07-REBRAND_2026/spec.md` — Spec + mejoras post-cierre (tipografía + separadores)
- `docs/specs/FEATURE-08-SECTION-DIVIDERS/` — plan.md · tasks.md

## Deployment
**Platform:** Vercel | **Trigger:** Push to `main` / `develop` | **Build:** ~30s
