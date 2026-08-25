# SDD_MASTER — Indice Central del Projeto

> **Propósito:** Catálogo de módulos, fases, decisiones técnicas y estado del proyecto.
> Actualizar después de cada cambio arquitectónico significativo.

---

## 1. Project Summary

**Nombre:** Ongevag Portfolio
**Descripción:** Landing page + blog SPA para captar clientes PyMEs (desarrollo web, IA, e-commerce)
**Stakeholders:**
- Leandro Gavegno (propietario, freelance)
- Clientes PyMEs potenciales (audiencia)
- Agencias de marketing / estudios creativos (audiencia B2B — FEATURE-06)
- Recruiters / auditores técnicos (evaluación de skills)

**Alcance:**
- ✅ Secciones estáticas: hero, about, skills, services, works, contact
- ✅ Blog: posts estáticos con navegación
- ✅ Formulario de contacto con EmailJS
- ✅ Landing page B2B para agencias (/agencias, /en/agencies)
- ❌ No incluye: backend, CMS, sistema de usuarios, ecommerce integrado

**Objetivos de negocio:**
1. Showcase de skills técnicos (React, Vite, arquitectura, performance)
2. Lead generation: captar clientes vía formulario de contacto
3. Credibilidad técnica: excelente performance (LCP, CLS, FID)
4. Captación B2B: agencias de marketing como partner técnico

---

## 2. Architecture Overview

```
┌────────────────────────────────────────────────────────┐
│                    User Browser (SPA)                   │
│  Vite Dev Server (HMR) │ Build Output (dist/)           │
└────────────────────────────────────────────────────────┘
                           │
                  ┌────────▼────────┐
                  │  React Router   │
                  │  (SPA Navigation)
                  └────────┬────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼────┐       ┌────▼───┐        ┌───▼────┐
    │ Layout │       │ Feature │       │  Page  │
    │ (2)    │       │ (6)     │       │ (5)    │
    └────────┘       └────┬────┘       └────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼─────────────────────────────────────▼───┐
    │      Components (UI Kit Global)              │
    │  Button, Header, Footer, SectionDivider,    │
    │  Skeleton, LangSwitcher, TechnicalTicker    │
    └───────────────────────────────────────────────┘
                           │
                ┌──────────▼──────────┐
                │  Framer Motion      │
                │  Tailwind CSS       │
                │  React Icons        │
                └─────────────────────┘
                           │
                ┌──────────▼──────────┐
                │  External Services  │
                │  • EmailJS (Contact)│
                │  • Vercel (Deploy)  │
                │  • Vercel Analytics │
                └─────────────────────┘
```

**Patrón:** Feature-Based Architecture (DDD Light)
- **Capas:** Presentación (components/) + Dominio (features/) + Infraestructura (Vite/Vercel)
- **Aislamiento:** Cada feature puede agregarse/removerse sin afectar otras
- **Shared:** UI Kit global en `components/`, config global en `config/`, datos en `data/`

---

## 3. Module Registry (SDD Standard)

| ID | Feature | Responsabilidad | Estado | Location | Links |
|----|---------|-----------------|--------|----------|-------|
| **FEATURE-00** | Project Setup | Sistema overview, architecture, PRD, audit, codebase map | ✅ Done | `docs/specs/FEATURE-00_PROJECT_SETUP/` | [spec](./specs/FEATURE-00_PROJECT_SETUP/mod-00_overview.md) |
| **FEATURE-01** | i18n Routing | URL-based locale (ADR-006..011), ES default at `/`, EN at `/en` | ✅ Done | `docs/specs/FEATURE-01_I18N_ROUTING/` | [tasks](./specs/FEATURE-01_I18N_ROUTING/tasks.md) |
| **FEATURE-02** | SEO Meta Tags | Dynamic meta tags, og:image, hreflang, canonical | ✅ Done | `docs/specs/FEATURE-02_SEO_METATAGS/` | [spec](./specs/FEATURE-02_SEO_METATAGS/spec.md) · [plan](./specs/FEATURE-02_SEO_METATAGS/plan.md) |
| **FEATURE-03** | AEO Schema | Schema.org JSON-LD, structured data for AI engines | ✅ Done | `docs/specs/FEATURE-03_AEO_SCHEMA/` | [spec](./specs/FEATURE-03_AEO_SCHEMA/spec.md) · [plan](./specs/FEATURE-03_AEO_SCHEMA/plan.md) · [tasks](./specs/FEATURE-03_AEO_SCHEMA/tasks.md) |
| **FEATURE-04** | Hero Animation | Hero banner, WireframeGeometry, design system | ✅ Done | `docs/specs/FEATURE-04_HERO_ANIMATION/` | [spec](./specs/FEATURE-04_HERO_ANIMATION/spec.md) · [plan](./specs/FEATURE-04_HERO_ANIMATION/plan.md) · [tasks](./specs/FEATURE-04_HERO_ANIMATION/tasks.md) |
| **FEATURE-05** | Project Mgmt | Projects data schema, categories, assets, Works component | ✅ Done | `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/` | [spec](./specs/FEATURE-05_PROJECT_MANAGEMENT/spec.md) · [plan](./specs/FEATURE-05_PROJECT_MANAGEMENT/plan.md) · [tasks](./specs/FEATURE-05_PROJECT_MANAGEMENT/tasks.md) |
| **FEATURE-06** | Partners Agencias | Landing page para agencias — propuesta de valor, CTA | ✅ Done | `docs/specs/FEATURE-06-PARTNERS_AGENCIAS/` | [spec](./specs/FEATURE-06-PARTNERS_AGENCIAS/spec.md) · [plan](./specs/FEATURE-06-PARTNERS_AGENCIAS/plan.md) · [tasks](./specs/FEATURE-06-PARTNERS_AGENCIAS/tasks.md) |
| **EPIC-07** | Rebrand Visual 2026 | Migración dark→light mode, paleta pastel B2B | ✅ Done | `docs/specs/FEATURE-07-REBRAND_2026/` | [spec](./specs/FEATURE-07-REBRAND_2026/spec.md) · [ADR-012](./adr/ADR-012.md) |
| **FEATURE-08** | Section Dividers & Visual Polish | SVG dividers entre secciones, polish hero, tipografía, UI | 🔄 In Progress | `docs/specs/FEATURE-08-SECTION-DIVIDERS/` | [spec](./specs/FEATURE-08-SECTION-DIVIDERS/spec.md) · [plan](./specs/FEATURE-08-SECTION-DIVIDERS/plan.md) · [tasks](./specs/FEATURE-08-SECTION-DIVIDERS/tasks.md) |
| **FEATURE-09** | Blog Post — Integración Excel + ERP | Caso de estudio técnico sobre sincronización Excel↔ERP; pendiente traducción EN/PT (TODO(leo)) | 📝 Draft | `docs/specs/FEATURE-09_BLOG_POST_EXCEL_ERP/` | [spec](./specs/FEATURE-09_BLOG_POST_EXCEL_ERP/spec.md) |
| **FEATURE-10** | Localización Portugués | Tercer locale del sitio (PT), patrón reutilizado por FEATURE-11 | ✅ Done | `docs/specs/FEATURE-10_PT_LOCALE/` | [spec](./specs/FEATURE-10_PT_LOCALE/spec.md) |
| **FEATURE-11** | Tech Experience | Sección de case studies técnicos anonimizados (Odoo/ERP/ETL), i18n ES/EN/PT | ✅ Done | `docs/specs/FEATURE-11_TECH_EXPERIENCE/` | [spec](./specs/FEATURE-11_TECH_EXPERIENCE/spec.md) |
| **UI Kit** | Components | Button, Header, Footer, SectionDivider, Skeleton (shared globals) | ✅ Active | `src/components/` | [src](../src/components/) |
| **Config** | Config | Framer Motion variants, animation presets, tokens | ✅ Active | `src/config/` | [motionConfig](../src/config/motionConfig.js) |

---

## 4. Implementation Phases

### Phase 1: Foundation & SDD Consolidation (COMPLETED ✅)
- ✅ Auditoría SDD completa (9 ADRs, 43 archivos analizados)
- ✅ Documentación de decisiones (ADR-001 a ADR-012)
- ✅ Generación de SDD ecosystem (14+ archivos)
- ✅ Migración de archivos: src/docs/ → docs/specs/FEATURE-XX/
- ✅ Actualización de CLAUDE.md + SDD_MASTER.md
- ✅ Consolidación de ADRs en docs/adr/ (fuente única de verdad)

**Milestone:** SDD foundation complete, FEATURE-XX structure established, all decisions documented

---

### Phase 2: Rebrand & Visual System (COMPLETED ✅)
- ✅ EPIC-07: Migración dark mode → light mode (paleta pastel B2B)
- ✅ FEATURE-08: SectionDivider component (wave/bowl/overlap)
- ✅ FEATURE-08: Polish visual hero, tipografía, LangSwitcher, TechnicalTicker
- ✅ Tests: 72/72 passing mantenidos
- ✅ Bundle: 244KB (optimizado con lazy loading)

**Milestone:** Sitio visualmente diferenciado para audiencia B2B de agencias

---

### Phase 3: Testing & Quality (IN PROGRESS 🔄)
- ⏳ Vitest + React Testing Library — expandir cobertura
- ⏳ Coverage target: 70% (Contact, Blog, Utils)
- ⏳ UC-02, UC-03, UC-04 implementation
- ⏳ Performance audit (Core Web Vitals analysis)

**Milestone:** >70% test coverage, todos los UC pasando

---

### Phase 4: Advanced Performance (PLANNED 📅)
- ⏳ Core Web Vitals optimization
- ⏳ Code splitting analysis (UC-04)
- ⏳ Lighthouse audit report
- ⏳ Mobile performance testing
- ⏳ Resolución DT-08-01/02 (Works, ProjectDetail — bg-obsidian)

**Milestone:** Lighthouse score >90

---

## 5. Tech Decisions Log

### All Decisions (Centralized in docs/adr/)

| ADR | Título | Estado | Ubicación |
|-----|--------|--------|----------|
| **[ADR-001](./adr/ADR-001.md)** | Vite como build tool | ✅ Accepted | docs/adr/ |
| **[ADR-002](./adr/ADR-002.md)** | JavaScript puro (sin TypeScript) | ✅ Accepted | docs/adr/ |
| **[ADR-003](./adr/ADR-003.md)** | EmailJS para contacto | ✅ Accepted | docs/adr/ |
| **[ADR-004](./adr/ADR-004.md)** | Feature-based architecture (DDD Light) | ✅ Accepted | docs/adr/ |
| **[ADR-005](./adr/ADR-005.md)** | Testing Framework: Vitest + React Testing Library | ✅ Accepted | docs/adr/ |
| **[ADR-006](./adr/ADR-006.md)** | URL-Based i18n Over Client-Side Toggle | ✅ Accepted | docs/adr/ |
| **[ADR-007](./adr/ADR-007.md)** | Spanish as Default Canonical Locale | ✅ Accepted | docs/adr/ |
| **[ADR-008](./adr/ADR-008.md)** | PNG Estático como og:image | ✅ Accepted | docs/adr/ |
| **[ADR-009](./adr/ADR-009.md)** | Schema JSON-LD Global Sin Geolocalización Restrictiva | ✅ Accepted | docs/adr/ |
| **[ADR-010](./adr/ADR-010.md)** | No External i18n Library (plain JS) | ✅ Accepted | docs/adr/ |
| **[ADR-011](./adr/ADR-011.md)** | URL as Single Source of Truth (Locale) | ✅ Accepted | docs/adr/ |
| **[ADR-012](./adr/ADR-012.md)** | Rebrand Visual 2026 — Migración a Light Mode | ✅ Accepted | docs/adr/ |

---

## 6. Deuda Técnica Activa

| ID | Descripción | Prioridad | Feature origen |
|----|-------------|-----------|----------------|
| DT-08-01 | Works.jsx — ProjectCard con bg-obsidian, pendiente migración rebrand | MEDIO | EPIC-07 |
| DT-08-02 | ProjectDetail.jsx — página completa bg-obsidian, pendiente migración | MEDIO | EPIC-07 |
| DT-08-03 | Issues contraste WCAG AA — #96B6C5 como texto falla AA | BAJO | EPIC-07 |
| DT-09-01 | ✅ RESUELTO — npm audit: 26 vulnerabilidades → 0 (ver AUDIT_2026-08-24) | — | — |
| DT-09-02 | mint-400, cyan-institutional, cobalt-500 en ~14 archivos residuales | BAJO | EPIC-07 |

---

## 7. Key Files & Paths

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/App.jsx` | Root routing + HomeSections composition |
| `src/main.jsx` | Entry point (React 19 setup) |
| `src/features/contact/Contact.jsx` | **CRÍTICO:** Contact form (sin backend) |
| `src/features/hero/HeroBanner.jsx` | **CRÍTICO:** Hero principal — ver scrollToContact guardrail |
| `src/components/ui/SectionDivider.jsx` | **CRÍTICO:** SVG dividers — preserveAspectRatio="none" mandatorio |
| `src/context/LocaleProvider.jsx` | **CRÍTICO:** i18n core — cambios rompen toda la app |
| `src/config/motionConfig.js` | **CRÍTICO:** Variantes Framer Motion |
| `tailwind.config.js` | **CRÍTICO:** Paleta rebrand 2026 (ADR-012) |
| `vercel.json` | SPA routing rewrites |
| `CLAUDE.md` | Contexto para AI — leer antes de cualquier cambio |

---

## 8. Paleta de Colores (Rebrand 2026 — ADR-012)

| Token | HEX | Uso principal |
|-------|-----|---------------|
| cream | #F1F0E8 | Fondo general, textos sobre dark |
| sand | #EEE0C9 | Hero, fondos cálidos |
| mist-blue | #ADC4CE | Acentos claros, badges, SkillsGrid bg |
| steel-blue | #96B6C5 | Acentos secundarios, bordes |
| navy | #2C3340 | Dark intencional, botones CTA, ticker |
| navy-deep | #1a1f28 | Gradientes oscuros (Services, Contact) |
| slate | #4B5563 | Texto secundario sobre fondos claros |

**Eliminados:** cobalt-500, mint-400, cyan-institutional, obsidian, slate-950

---

## 9. i18n Architecture

- `/` → ES por defecto (canónico) | `/en` → EN completo
- `LocaleProvider` + `useLocale()` — **nunca** importar locale files directamente
- `t` es objeto plano: acceso `t.modulo.clave` (NO función)
- Claves nuevas en FEATURE-08: `t.works.techStackBadge` (ES: 'Tecnologías' / EN: 'Technologies')
- Switcher: banderas emoji 🇪🇸🇺🇸 vía `LangSwitcher.jsx` — path-aware

---

## 10. Metrics & Checkpoints

| Métrica | Baseline | Actual | Target | Status |
|---------|----------|--------|--------|--------|
| Test Coverage | 0% | 71 tests | 70% | 🔄 Phase 3 |
| Lighthouse Score | — | — | >90 | ⏳ Phase 4 |
| Bundle Size (main) | 363KB | 244KB | <250KB | ✅ Met |
| Build Time | ~1s | ~5s | <10s | ✅ Met |
| Core Web Vitals | — | — | Good | ⏳ Phase 4 |

---

## 11. Useful Commands

```bash
npm run dev                # Start Vite dev server (HMR enabled) — puerto 5173
npm run build              # Production build (genera dist/ + sitemap + brotli)
npm run lint               # ESLint — 0 errores esperados, 2 warnings en DataVisualization
npm run test -- --run      # Tests sin modo watch — 72/72 esperados
npm install <pkg> --legacy-peer-deps  # SIEMPRE usar este flag — conflicto react-helmet-async
```

---

## Appendix: Documentation Structure (SDD Standard)

```
docs/
├── SDD_MASTER.md              ← Este archivo: índice central
├── adr/                       ← Architecture Decision Records
│   └── ADR-001.md .. ADR-012.md
├── specs/
│   ├── _templates/            ← Plantillas: spec/plan/tasks
│   ├── FEATURE-00_PROJECT_SETUP/
│   ├── FEATURE-01_I18N_ROUTING/
│   ├── FEATURE-02_SEO_METATAGS/
│   ├── FEATURE-03_AEO_SCHEMA/
│   ├── FEATURE-04_HERO_ANIMATION/
│   ├── FEATURE-05_PROJECT_MANAGEMENT/
│   ├── FEATURE-06-PARTNERS_AGENCIAS/
│   ├── FEATURE-07-REBRAND_2026/   ← spec.md con mejoras post-cierre
│   └── FEATURE-08-SECTION-DIVIDERS/  ← spec.md · plan.md · tasks.md
└── use-cases/
    ├── UC-01_contact_form_submission.md
    ├── UC-02_blog_navigation.md
    ├── UC-03_project_detail_view.md
    └── UC-04_performance_code_splitting.md
```

**Last updated:** 2026-06-17 — FEATURE-08 Section Dividers & Visual Polish
**Next review:** Phase 3 kickoff — testing coverage expansion
