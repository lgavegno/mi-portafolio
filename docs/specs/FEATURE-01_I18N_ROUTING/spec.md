# Feature Specification: i18n URL-Based Routing

**Feature Branch**: `feature/seo-aeo-i18n-button`

**Feature ID**: `001`

**Created**: 2026-06-05

**Status**: Done — Implemented and merged to main (see tasks.md Task Execution Log)

**Scope**: Bilingual architecture (EN default at `/`, ES at `/es`). Foundation layer for all SEO/AEO work. No UI feature can proceed without this.

---

## Nota de actualización (2026-08-25)

El esquema de rutas descrito en este documento (EN canónico en `/`, ES en `/es`) fue la decisión **original**, revertida antes del primer merge a main. El esquema real, vigente desde entonces:

| Locale | Prefijo URL | Rol | ADR |
|--------|-------------|-----|-----|
| `es` | `/` | Canónico (default) | ADR-007 (revisado 2026-06-08) |
| `en` | `/en` | Variante internacional | ADR-007 |
| `pt` | `/pt` | Tercer locale (lusófono) | ADR-013 (2026-07-05), FEATURE-10_PT_LOCALE |

El resto de este documento (User Stories, FRs, SCs) conserva la redacción original "EN en `/`, ES en `/es`" como registro histórico de la decisión de diseño inicial — invertir cada mención sería reescribir el spec. Para el comportamiento real de rutas y el motivo del cambio, ver `ADR-007.md`, `ADR-013.md` y el log "fix/blog-locale-strings — Post-merge fixes" en `tasks.md`. PT no está cubierto por este spec — ver `FEATURE-10_PT_LOCALE/spec.md`.

---

## Context & Problem Statement

The portfolio currently serves a single language (Spanish) with no URL-based locale structure. This blocks international indexing (US/EU markets), prevents hreflang implementation, and makes AEO schema configuration ambiguous.

This feature establishes the routing and data architecture that every subsequent feature (SEO tags, AEO schema, LangSwitcher UI) depends on.

**Business constraint:** Spanish is the canonical language and default route (`/`). English is the secondary locale (`/en`). This is not a toggle — it is a structural routing decision with SEO consequences.

---

## User Scenarios & Testing

### User Story 1 — International Visitor Lands on English Site (Priority: P1)

A recruiter or potential client from the US or Europe searches for a freelance full-stack developer. They click a result or shared link and arrive at the portfolio root (`/`). The entire experience — navigation, hero, services, works, contact — is in English with no additional action required.

**Why this priority**: This is the primary conversion path. If the default experience is not in English, the entire AEO/SEO investment is wasted.

**Independent Test**: Navigate to `/` in a fresh browser session. Confirm that `<html lang="en">` is set, all visible UI strings are in English, the page title is in English, and no Spanish text is visible.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/`, **When** the page loads, **Then** `document.documentElement.lang` equals `"en"` and all UI strings render in English.
2. **Given** a user navigates to `/blog` or `/works/project-slug`, **When** the page loads, **Then** the locale remains `en` and content is served in English.
3. **Given** Google Search Console crawls `/`, **When** it inspects the HTML, **Then** it finds `hreflang="en"` self-referencing and `hreflang="es"` pointing to `/es`.

---

### User Story 2 — Spanish-Speaking Visitor Switches to ES Version (Priority: P2)

A potential client from Argentina or Spain arrives on the English site (default) and uses the `EN | ES` language switcher in the header to navigate to the Spanish version. All content switches to Spanish and the URL updates to `/es` (or `/es/blog`, `/es/works/slug`) without a full page reload breaking the experience.

**Why this priority**: Secondary market. Español is a secondary locale, not an afterthought — it must work correctly — but it does not block the primary EN conversion path.

**Independent Test**: Click the `ES` button in the header from any EN route. Confirm URL changes to `/es` equivalent, all visible strings are in Spanish, and `<html lang="es">` is reflected via React Helmet on that route.

**Acceptance Scenarios**:

1. **Given** a user is on `/`, **When** they click the `ES` switcher, **Then** they are navigated to `/es` and UI renders in Spanish.
2. **Given** a user is on `/blog/post-slug`, **When** they click `ES`, **Then** they are navigated to `/es/blog/post-slug` (or `/es/blog` if the post has no ES equivalent — see Edge Cases).
3. **Given** a user is on `/es/works/proyecto-slug`, **When** they click `EN`, **Then** they are navigated to `/works/proyecto-slug`.
4. **Given** a user shares the URL `/es`, **When** another user opens it, **Then** the page renders in Spanish without requiring any interaction.

---

### User Story 3 — Search Engine Crawls Both Locale Variants (Priority: P2)

Googlebot and Bingbot crawl both `/` and `/es/` as separate, indexable URLs. Each URL has the correct `hreflang` tags, unique `<title>` and `meta description` in the appropriate language, and the correct `lang` attribute on `<html>`.

**Why this priority**: This is the entire SEO justification for URL-based routing over client-side toggle. Without this, Features 002 (SEO tags) and 003 (AEO schema) have no indexable surface to attach to.

**Independent Test**: Run both `/` and `/es` through Google's Rich Results Test and a `curl` of the raw HTML. Confirm distinct title tags, lang attributes, and hreflang cross-references in the raw response.

**Acceptance Scenarios**:

1. **Given** a crawler requests `/`, **When** it reads the HTML `<head>`, **Then** it finds `<html lang="en">`, an English `<title>`, and `<link rel="alternate" hreflang="es" href="[canonical]/es">`.
2. **Given** a crawler requests `/es`, **When** it reads the HTML `<head>`, **Then** it finds `lang="es"` (via Helmet), a Spanish `<title>`, and `<link rel="alternate" hreflang="en" href="[canonical]/">`.
3. **Given** Vercel serves `/es/blog/cualquier-ruta`, **When** the request is processed, **Then** it does not return 404 — the SPA rewrite in `vercel.json` handles it.

---

### User Story 4 — LangSwitcher Preserves Current Path (Priority: P3)

The `EN | ES` button in the header is context-aware. Switching language from any nested route takes the user to the equivalent route in the other locale, not back to the homepage.

**Why this priority**: Quality-of-life feature. The routing architecture (P1/P2) must be solid before implementing path-aware switching logic.

**Independent Test**: Navigate to `/works/omnistock`. Click `ES`. Confirm navigation goes to `/es/works/omnistock`, not `/es`.

**Acceptance Scenarios**:

1. **Given** a user is on `/works/omnistock`, **When** they click `ES`, **Then** the URL becomes `/es/works/omnistock`.
2. **Given** a user is on `/es/blog/post-slug`, **When** they click `EN`, **Then** the URL becomes `/blog/post-slug`.
3. **Given** the user is on any route, **When** they switch locale, **Then** scroll position resets to top and no 404 occurs.

---

### Edge Cases

- **Blog posts without ES equivalent**: If a blog post exists only in English, `/es/blog/post-slug` should redirect to `/es/blog` with a visible banner: *"This content is only available in English."* — not a 404.
- **Direct navigation to unknown `/es/*` route**: Must be caught by React Router and render the ES 404 page (or ES home), not a blank screen.
- **User preference persistence**: After switching to ES, if the user navigates to `/` directly (e.g., by clicking the logo), do they return to EN or stay in ES? **Decision: Logo always navigates to the locale root** (`/` if EN was current, `/es` if ES was current). No localStorage persistence — URL is the single source of truth.
- **`x-default` hreflang**: The `x-default` tag must point to `/` (English canonical), not to `/es`.
- **Vercel preview URLs**: hreflang canonical URLs must use `VITE_SITE_URL` env var, not hardcoded domain, to avoid poisoning preview deployments.

---

## Requirements

### Functional Requirements

- **FR-001**: The application MUST serve English content by default at the root path `/` with no redirect.
- **FR-002**: The application MUST serve Spanish content at `/es` and all sub-paths (`/es/blog`, `/es/works/:slug`, etc.).
- **FR-003**: `App.jsx` MUST implement a route structure that nests all existing routes under an optional `/es` prefix without duplicating route components.
- **FR-004**: A `LocaleContext` MUST provide the current locale (`"en"` | `"es"`) to all components via `useLocale()` hook without prop drilling.
- **FR-005**: All UI strings MUST be externalized into locale files under `src/locales/en/` and `src/locales/es/`. No hardcoded Spanish or English strings inside components after this feature is complete.
- **FR-006**: Data files (`projects.js`, `blogData.js`) MUST be refactored into locale-keyed variants (`projects.en.js` / `projects.es.js`, `blogData.en.js` / `blogData.es.js`).
- **FR-007**: The `LangSwitcher` component MUST render as an `EN | ES` toggle in `Header.jsx` and navigate to the locale-equivalent of the current path.
- **FR-008**: `vercel.json` MUST include SPA rewrites for all `/es/*` paths to prevent 404 on direct navigation or page refresh.
- **FR-009**: Blog posts without a Spanish translation MUST redirect from `/es/blog/:slug` to `/es/blog` with a localized unavailability message — never a 404.
- **FR-010**: The locale derived from URL MUST be the single source of truth. No `localStorage` locale persistence is allowed.

### Key Entities

- **Locale** (`"en"` | `"es"`): Derived exclusively from the URL path prefix. Read-only from child components via `useLocale()`.
- **LocaleContext**: React context that holds the current locale string. Populated by `App.jsx` based on the active route.
- **Locale File** (`src/locales/{locale}/{section}.js`): Plain JS object exports containing all UI strings for a given section and language. No external i18n library.
- **Locale-keyed Data File** (`src/data/{resource}.{locale}.js`): Domain data (projects, blog posts) split by language. Components import the correct file via `useLocale()`.
- **LangSwitcher**: Stateless UI component. Computes the target URL by replacing/prepending the locale prefix and navigates via React Router `useNavigate`.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: `curl https://ongevag.com/` returns HTML with `<html lang="en">` and an English `<title>` tag — confirmed via raw response, not browser rendering.
- **SC-002**: `curl https://ongevag.com/es` returns HTML with `lang="es"` injected by React Helmet and a Spanish `<title>`.
- **SC-003**: Both `/` and `/es` appear as separate, indexable URLs in Google Search Console within 30 days of deploy, each with their respective hreflang tags detected.
- **SC-004**: Navigating directly to `/es/works/cualquier-slug` and pressing F5 returns the correct page — not a 404 — on the Vercel production deployment.
- **SC-005**: Zero hardcoded UI strings remain in any `.jsx` component file after the migration (verified by grep for known Spanish strings like `"Servicios"`, `"Contacto"`, `"Proyectos"`).
- **SC-006**: LangSwitcher path-awareness works correctly across all route types: home, blog index, blog detail, works detail.

---

## Assumptions

- React Router DOM v7 (already in `package.json`) supports the nested route structure required. No router upgrade needed.
- `React Helmet Async` (already installed) will handle `lang` attribute injection and per-route `<title>` / `hreflang` tags. Server-side rendering is out of scope — this is a CSR SPA deployed on Vercel.
- English content for `projects.en.js` and `blogData.en.js` will be provided by Leo (translation is a content task, not an engineering task). The architecture must support it; the content authoring is out of scope for this feature.
- `VITE_SITE_URL` environment variable will be configured in Vercel dashboard for canonical URL generation. Not hardcoded.
- The blog post unavailability fallback (FR-009) uses a client-side redirect via React Router `<Navigate>`, not a server-side 301.
- No external i18n library (react-i18next, next-intl, etc.) will be introduced. This decision is captured in ADR-006.
- Framer Motion animations are locale-agnostic and require no changes in this feature.
- `ParticleBackground.jsx` and `WireframeGeometry.jsx` contain no translatable strings and are excluded from the locale migration.

---

## Out of Scope (this feature)

- SEO meta tags, Open Graph, hreflang injection in `<head>` → **Feature 002**
- AEO schema (JSON-LD), robots.txt, llms.txt → **Feature 003**
- og:image PNG replacement → **Feature 002**
- Actual English/Spanish content authoring → Content task, parallel track
- SSR / pre-rendering for true static HTML → Not in stack (Vite CSR)
- CI/CD pipeline for automated hreflang validation → Post-MVP

---

## ADRs Triggered by This Feature

| ADR | Decisión | Estado |
|-----|----------|--------|
| ADR-006 | URL-based i18n over client-side toggle | Por documentar |
| ADR-007 | English as canonical locale at `/` | Por documentar |
| ADR-010 | No external i18n library — plain JS locale files | Por documentar |
| ADR-011 | URL as single source of truth for locale (no localStorage) | Por documentar |
