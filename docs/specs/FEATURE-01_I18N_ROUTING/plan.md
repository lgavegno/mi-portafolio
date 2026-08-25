# Implementation Plan: 001 — i18n URL-Based Routing

**Branch**: `feature/seo-aeo-i18n-button` | **Date**: 2026-06-05 | **Spec**: `specs/features/001-i18n-url-routing/spec.md`

**Input**: Feature specification from `/specs/features/001-i18n-url-routing/spec.md`

---

## Summary

Establish URL-based bilingual routing for the Ongevag portfolio SPA. English is the canonical locale served at `/` with no redirect. Spanish is the secondary locale served at `/es` and all sub-paths. The implementation introduces a `LocaleContext` + `useLocale()` hook, externalizes all UI strings into plain JS locale files, splits data files by locale, and adds a stateless `LangSwitcher` component to `Header.jsx`. No external i18n library is introduced. This feature is the foundation gate for Features 002 (SEO tags) and 003 (AEO schema) — neither can proceed without the route structure this plan establishes.

---

## Nota de actualización (2026-08-25)

Este plan describe la decisión original (EN canónico en `/`, ES en `/es`), revertida antes del merge a main: **ES es el locale canónico en `/`, EN vive en `/en`** (ADR-007, revisado 2026-06-08). Un tercer locale, PT en `/pt`, se agregó después vía FEATURE-10_PT_LOCALE / ADR-013 (2026-07-05) y no está cubierto por este plan. El resto del documento conserva la redacción original "EN en `/` / ES en `/es`" como registro de la arquitectura tal como fue planeada; ver `spec.md` (nota equivalente) y el "Task Execution Log" en `tasks.md` para lo que se implementó realmente.

---

## Technical Context

**Language/Version**: JavaScript (ES2022) — no TypeScript per ADR-002

**Primary Dependencies**:
- React 19.1.0
- React Router DOM 7.11.0 (nested routes + `useLocation` + `useNavigate`)
- React Helmet Async 2.0.5 (lang attribute injection per route — consumed in Feature 002, wired here)
- Vite 6.3.5

**Storage**: N/A — locale derived exclusively from URL path. No localStorage, no cookies, no session state.

**Testing**: Vitest + React Testing Library (setup exists from Sesión 3). New tests target `useLocale()` hook and `LangSwitcher` path computation logic.

**Target Platform**: Vercel (CSR SPA). No SSR. `vercel.json` rewrite rules are part of this plan's scope.

**Project Type**: SPA / portfolio web application

**Performance Goals**: Zero measurable impact on LCP or CLS. Locale resolution is synchronous (URL read at render time) — no async locale loading, no suspense boundary added.

**Constraints**:
- Zero external i18n dependencies (ADR-010)
- URL is the single source of truth — no localStorage (ADR-011)
- Project slugs are immutable — LangSwitcher only swaps the `/es` prefix, never the slug
- No route component duplication — EN and ES routes share the same page components

**Scale/Scope**: ~8 route paths × 2 locales = 16 addressable URLs. ~6 feature components to migrate. ~10 locale files to create (5 sections × 2 languages).

---

## Constitution Check

*GATE: Evaluated against project standards before implementation.*

| Check | Status | Notes |
|-------|--------|-------|
| No new external runtime dependency | ✅ Pass | Plain JS objects, no library |
| No duplication of route components | ✅ Pass | Single component tree, locale injected via context |
| URL as single source of truth | ✅ Pass | `LocaleContext` reads from React Router, not storage |
| Slugs remain immutable | ✅ Pass | `LangSwitcher` prepends/removes `/es` prefix only |
| ADR documented before code | ✅ Required | T-01 must be completed before any src/ change |
| `vercel.json` rewrite coverage | ✅ Required | T-06 is a hard dependency for SC-004 |
| No `localStorage` access | ✅ Pass | Explicitly forbidden in FR-010 |

*No Constitution violations. Complexity Tracking table not required.*

---

## Project Structure

### Documentation (this feature)

```text
specs/features/001-i18n-url-routing/
├── spec.md          ← Approved feature specification
└── plan.md          ← This file
```

### Source Code (affected paths)

```text
src/
├── context/
│   └── LocaleContext.jsx        ← NEW: React context + LocaleProvider
├── hooks/
│   └── useLocale.js             ← NEW: consumes LocaleContext, returns { locale, t }
├── locales/
│   ├── en/
│   │   ├── common.js            ← NEW: nav, footer, shared UI strings
│   │   ├── hero.js              ← NEW: HeroBanner strings
│   │   ├── services.js          ← NEW: Services section strings
│   │   ├── works.js             ← NEW: Works section strings
│   │   └── contact.js           ← NEW: Contact form labels and messages
│   └── es/
│       ├── common.js            ← NEW: mirror of en/common.js in Spanish
│       ├── hero.js
│       ├── services.js
│       ├── works.js
│       └── contact.js
├── data/
│   ├── projects.en.js           ← NEW: derived from projects.js, same slugs, EN descriptions
│   └── projects.es.js           ← NEW: derived from projects.js, same slugs, ES descriptions
├── features/
│   ├── blog/
│   │   └── data/
│   │       ├── blogData.en.js   ← NEW: derived from blogData.js, EN content
│   │       └── blogData.es.js   ← NEW: empty array export (blog EN-only per scope decision)
│   ├── hero/
│   │   └── HeroBanner.jsx       ← MODIFIED: hardcoded strings → t.hero.*
│   ├── services/
│   │   └── Services.jsx         ← MODIFIED: hardcoded strings → t.services.*
│   ├── works/
│   │   └── Works.jsx            ← MODIFIED: hardcoded strings → t.works.*, locale-keyed data import
│   └── contact/
│       └── Contact.jsx          ← MODIFIED: hardcoded strings → t.contact.*
├── components/
│   ├── ui/
│   │   └── LangSwitcher.jsx     ← NEW: EN | ES toggle, path-aware navigation
│   └── Header.jsx               ← MODIFIED: LangSwitcher integrated
└── App.jsx                      ← MODIFIED: route structure refactored for locale prefix

docs/
└── adr/
    ├── ADR-006.md               ← NEW: URL-based i18n over client-side toggle
    ├── ADR-007.md               ← NEW: English as canonical locale at /
    ├── ADR-010.md               ← NEW: No external i18n library
    └── ADR-011.md               ← NEW: URL as single source of truth for locale

vercel.json                      ← MODIFIED: SPA rewrites extended to cover /es/*

public/
└── (no changes in this feature — og:image PNG is Feature 002 scope)
```

**Structure Decision**: Single SPA project (Option 1 variant). Feature-Based architecture is preserved intact. New `context/` and `hooks/` directories follow the existing DDD Light pattern. New `locales/` directory sits at `src/` root — parallel to `features/` and `components/` — as a shared infrastructure layer with no business logic.

---

## Implementation Phases

### Phase A — Architectural Foundation *(no src/ changes)*

**Objective**: Document decisions and build all locale data before touching any component or route.

#### T-01 — ADR Documentation
- **Files**: `docs/adr/ADR-006.md`, `ADR-007.md`, `ADR-010.md`, `ADR-011.md`
- **Action**: Create four ADR files documenting the decisions listed in the spec. Each ADR follows the existing format in `docs/adr/` (Context → Decision → Consequences).
- **Gate**: Must be committed before any `src/` file is modified. This is the audit trail.
- **Verify**: Files exist in `docs/adr/`, readable, cross-referenced from `SDD_MASTER.md`.

#### T-02 — Locale Files: UI Strings
- **Files**: `src/locales/en/*.js` and `src/locales/es/*.js` (10 files total)
- **Action**: Create plain JS object exports per section. Inventory strings by doing a grep pass on each target component first. Structure: `export default { key: "value" }`. No nested namespacing beyond one level.
- **Source**: Extract current Spanish strings from `HeroBanner.jsx`, `Services.jsx`, `Works.jsx`, `Contact.jsx`, `Header.jsx`, `Footer.jsx`.
- **Verify**: `npm run lint` passes. Both `en/` and `es/` mirrors have identical key structures (diff check).

#### T-03 — Locale-Keyed Data Files
- **Files**: `src/data/projects.en.js`, `src/data/projects.es.js`, `src/features/blog/data/blogData.en.js`, `src/features/blog/data/blogData.es.js`
- **Action**: Derive from existing `projects.js` and `blogData.js`. **Slugs are immutable** — copy as-is to both locale variants. Translate descriptive fields (title, description, tags) for `.en.js`. `.es.js` keeps current Spanish content. `blogData.es.js` exports an empty array — blog is EN-only per scope decision.
- **Verify**: Both `projects.en.js` and `projects.es.js` export arrays with identical slug values. Structural diff shows only translatable fields differ.

#### T-04 — LocaleContext + useLocale Hook
- **Files**: `src/context/LocaleContext.jsx`, `src/hooks/useLocale.js`
- **Action**:
  - `LocaleContext.jsx`: Creates context with `{ locale, t }` shape. Exports `LocaleProvider` component that accepts `locale` prop from the router and assembles the `t` object by importing the correct locale files.
  - `useLocale.js`: Single-line consumer — `return useContext(LocaleContext)`. Throws if used outside provider.
- **Verify**: Unit test in Vitest — render `LocaleProvider` with `locale="en"`, call `useLocale()`, assert `locale === "en"` and `t.common` is defined.

---

### Phase B — Routing Refactor *(critical path — point of no return)*

**Objective**: Restructure `App.jsx` and `vercel.json`. No UI changes yet.

> ⚠️ Manual smoke test required at end of Phase B before proceeding to Phase C.

#### T-05 — App.jsx Route Refactor
- **File**: `src/App.jsx`
- **Action**: Wrap the existing route tree inside a locale-aware layout route. Implementation pattern:
  ```
  /          → LocaleProvider(locale="en") → existing page components
  /es        → LocaleProvider(locale="es") → same page components (no duplication)
  /es/*      → same nested structure under /es prefix
  ```
  Use React Router v7 nested routes with a `LocaleLayout` wrapper component that reads the `:lang` segment (or path prefix) and passes it to `LocaleProvider`. Existing route paths remain unchanged inside both trees.
- **Verify**: `npm run dev` → navigate to `/` (English renders), navigate to `/es` (Spanish renders), navigate to `/es/blog` (no crash). Zero console errors.

#### T-06 — vercel.json Rewrite Rules
- **File**: `vercel.json`
- **Action**: Add rewrite rules so that any direct request to `/es`, `/es/blog`, `/es/works/:slug`, `/es/blog/:slug` is served `index.html` by Vercel — allowing React Router to handle routing on the client side after hydration.
- **Verify**: Push to Vercel preview branch. Navigate directly to `[preview-url]/es/works/omnistock`. Press F5. Confirm no 404 from Vercel edge.

---

*CHECKPOINT: Both `/` and `/es/*` resolve without 404 in Vercel preview. Manual test across all route types before Phase C.*

---

### Phase C — Component Migration

**Objective**: Replace all hardcoded strings in feature components with `useLocale()` calls.

#### T-07 — LangSwitcher Component
- **Files**: `src/components/ui/LangSwitcher.jsx`, `src/components/Header.jsx`
- **Action**:
  - `LangSwitcher.jsx`: Reads `pathname` from `useLocation()`. Computes target path: if current path starts with `/es`, strip `/es` prefix → navigate to EN equivalent. If not, prepend `/es` → navigate to ES equivalent. Uses `useNavigate()`. Renders as `<button>EN</button> | <button>ES</button>` with active state on current locale. Resets scroll to top on switch.
  - `Header.jsx`: Import and render `<LangSwitcher />` in the nav — position after existing nav links, before any CTA.
- **Verify**: Path-awareness test across all route types per SC-006. `/works/omnistock` → ES → `/es/works/omnistock`. `/es/blog/post-slug` → EN → `/blog/post-slug`.

#### T-08 — Feature Component Migration
- **Files**: `HeroBanner.jsx`, `Services.jsx`, `Works.jsx`, `Contact.jsx`
- **Action**: In each component, replace hardcoded strings with `const { t, locale } = useLocale()` calls. Replace direct imports of `projects.js` / `blogData.js` with conditional imports based on `locale`. Order of migration: `HeroBanner` → `Services` → `Works` → `Contact` (highest to lowest user-facing visibility).
- **Verify**: After each component: `npm run lint` passes, visual check in both `/` (EN) and `/es` (ES) with no visible Spanish on the EN route and no visible English on the ES route.
- **Final verification**: `grep -r "Servicios\|Contacto\|Proyectos\|Sobre mí" src/features/` returns zero results.

---

## Execution Graph

```
T-01 (ADRs)
    │
    ▼
T-02 (Locale files) ──┐
                       ├──► T-04 (LocaleContext + hook)
T-03 (Data files)  ──┘              │
                                     ▼
                               T-05 (App.jsx)
                                     │
                                     ▼
                               T-06 (vercel.json)
                                     │
                               [CHECKPOINT]
                                     │
                               T-07 (LangSwitcher)
                                     │
                                     ▼
                               T-08 (Component migration)
```

T-02 and T-03 can be executed in parallel. T-04 depends on both. Everything from T-05 onward is strictly sequential.

---

## Definition of Done

| ID | Criterion | Validation Method |
|----|-----------|-------------------|
| CA-001 | `/` renders fully in English with no redirect | `curl https://[domain]/` → `<html lang="en">` + English `<title>` in raw HTML |
| CA-002 | `/es` renders fully in Spanish | Visual check + `grep` confirms Spanish strings present only on `/es` routes |
| CA-003 | Slug immutability | `/works/omnistock` ↔ `/es/works/omnistock` — only prefix changes, slug is identical |
| CA-004 | No localStorage writes | DevTools → Application → Local Storage → empty after locale switch |
| CA-005 | Zero 404 on Vercel for `/es/*` direct navigation + F5 | Manual test on Vercel preview URL |
| CA-006 | Zero hardcoded UI strings in `.jsx` components | `grep -r "Servicios\|Contacto\|Proyectos" src/features/` returns empty |
| CA-007 | LangSwitcher path-awareness on all route types | Manual test: home, works detail, blog index, blog detail |
| CA-008 | `useLocale()` unit test passes | `npm run test` — hook resolves correct locale and `t` object |
| CA-009 | `npm run lint` clean | Zero ESLint errors after each task |
| CA-010 | ADRs committed before first `src/` change | Git log order — ADR commits precede any component commit |

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| React Router v7 nested route API differs from v6 — wrapping pattern may need adjustment | Medium | High | Verify with minimal `App.jsx` spike before full T-05 implementation |
| `vercel.json` rewrite order conflict with existing rules | Low | High | Test on Vercel preview before Phase C — T-06 is a hard gate |
| Locale file key mismatch between `en/` and `es/` causes runtime undefined | Medium | Medium | Structural diff check at end of T-02; TypeScript-style JSDoc shape comment on each locale file |
| Blog `blogData.es.js` empty array causes empty state in `/es/blog` with no user feedback | Low | Medium | `/es/blog` renders "Content available in English" banner when ES array is empty — handled in T-08 |
| Component grep misses a hardcoded string in a nested ternary | Low | Low | Two-pass grep: one for Spanish terms, one for known EN strings that should be in locale files |
