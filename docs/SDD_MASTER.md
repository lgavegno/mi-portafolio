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
- Recruiters / auditores técnicos (evaluación de skills)

**Alcance:**
- ✅ Secciones estáticas: hero, about, skills, services, works, contact
- ✅ Blog: posts estáticos con navegación
- ✅ Formulario de contacto con EmailJS
- ❌ No incluye: backend, CMS, sistema de usuarios, ecommerce integrado

**Objetivos de negocio:**
1. Showcase de skills técnicos (React, Vite, arquitectura, performance)
2. Lead generation: captar clientes vía formulario de contacto
3. Credibilidad técnica: excelente performance (LCP, CLS, FID)

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
    │ (2)    │       │ (6)     │       │ (3)    │
    └────────┘       └────┬────┘       └────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼─────────────────────────────────────▼───┐
    │      Components (UI Kit Global)              │
    │  Button, Header, Footer, Skeleton, etc.     │
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
| **FEATURE-00** | Project Setup | Sistema overview, architecture, PRD, audit, codebase map | ✅ Active | `docs/specs/FEATURE-00/` | [spec](./specs/FEATURE-00/mod-00_overview.md) |
| **FEATURE-01** | i18n Routing | URL-based locale (ADR-006..011), ES default at `/`, EN at `/en` | ✅ Done | `docs/specs/FEATURE-01/` | [tasks](./specs/FEATURE-01_I18N_ROUTING/tasks.md) |
| **FEATURE-02** | SEO Meta Tags | Dynamic meta tags, og:image, hreflang, canonical | ⏳ Planned | `docs/specs/FEATURE-02/` | — |
| **FEATURE-03** | AEO Schema | Schema.org JSON-LD, structured data for AI engines | ⏳ Planned | `docs/specs/FEATURE-03/` | — |
| **FEATURE-04** | Hero Animation | Hero banner, ParticleBackground, WireframeGeometry, design system | ✅ Active | `docs/specs/FEATURE-04/` | [design-tokens](./specs/FEATURE-04/design-tokens.md) |
| **FEATURE-05** | Project Mgmt | Projects data schema, categories, assets, Works component | ✅ Active | `docs/specs/FEATURE-05/` | [projects-logic](./specs/FEATURE-05/projects-logic.md) |
| **UI Kit** | Components | Button, Header, Footer, Skeleton (shared globals) | ✅ Done | `src/components/` | [src](../src/components/) |
| **Config** | Config | Framer Motion variants, animation presets, tokens | ✅ Done | `src/config/` | [motionConfig](../src/config/motionConfig.js) |

---

## 4. Implementation Phases

### Phase 1: Foundation & SDD Consolidation (COMPLETED ✅)
- ✅ Auditoría SDD completa (9 ADRs, 43 archivos analizados)
- ✅ Documentación de decisiones (ADR-001 a ADR-011)
- ✅ Generación de SDD ecosystem (14 archivos)
- ✅ Migración de archivos: src/docs/ → docs/specs/FEATURE-XX/
- ✅ Actualización de CLAUDE.md + SDD_MASTER.md
- ✅ Consolidación de ADRs en docs/adr/ (fuente única de verdad)

**Milestone:** SDD foundation complete, FEATURE-XX structure established, all decisions documented

---

### Phase 2: Testing & Quality (IN PROGRESS 🔄)
- ⏳ Vitest + React Testing Library setup
- ⏳ UC-01 (Contact Form): tests end-to-end
- ⏳ Coverage target: 70% (Contact, Blog, Utils)
- ⏳ ADR-005: Testing strategy

**Milestone:** >70% test coverage, UC-01 passing

**Tentative duration:** 2 weeks

---

### Phase 3: Documentation Completeness (PLANNED 📅)
- ⏳ MOD-01 (Hero Feature) individual documentation
- ⏳ UC-02, UC-03, UC-04 implementation
- ⏳ Performance audit (Core Web Vitals analysis)
- ⏳ SEQ diagrams for each UC

**Milestone:** All modules documented, all UC/SEQ complete

**Tentative duration:** 2-3 weeks

---

### Phase 4: Advanced Performance (PLANNED 📅)
- ⏳ Core Web Vitals optimization
- ⏳ Code splitting analysis (UC-04)
- ⏳ Lighthouse audit report
- ⏳ Mobile performance testing

**Milestone:** Lighthouse score >90

---

## 5. Tech Decisions Log

### Accepted Decisions (ADRs)

| ADR | Título | Contexto | Consecuencias | Revisión |
|-----|--------|----------|---------------|----------|
| **[ADR-001](./adr/ADR-001.md)** | Vite como build tool | SPA rápido, sin SSR | HMR <100ms, builds ~1s, ESM only | Si se requiere SSR → Next.js |
| **[ADR-002](./adr/ADR-002.md)** | JavaScript puro (sin TypeScript) | Decisión arquitectónica deliberada | Menor overhead, setup simple, menos boilerplate | Si team crece >3 devs → considerar TS |
| **[ADR-003](./adr/ADR-003.md)** | EmailJS para contacto | Sin backend necesario | Funciona desde browser, credenciales en .env | Si volumen >1000 emails/mes → backend |
| **[ADR-004](./adr/ADR-004.md)** | Feature-based architecture (DDD Light) | Escalabilidad y mantenibilidad | Desacoplamiento, onboarding fácil, cierta duplicación | Si >40 features → considerar monorepo |

### All Decisions (Centralized in docs/adr/)

| ADR | Título | Estado | Ubicación |
|-----|--------|--------|----------|
| **[ADR-001](./adr/ADR-001.md)** | Vite como build tool | ✅ Accepted | docs/adr/ |
| **[ADR-002](./adr/ADR-002.md)** | JavaScript puro (sin TypeScript) | ✅ Accepted | docs/adr/ |
| **[ADR-003](./adr/ADR-003.md)** | EmailJS para contacto | ✅ Accepted | docs/adr/ |
| **[ADR-004](./adr/ADR-004.md)** | Feature-based architecture (DDD Light) | ✅ Accepted | docs/adr/ |
| **[ADR-005](./adr/ADR-005.md)** | Testing Framework: Vitest + React Testing Library | ✅ Proposed (Phase 2) | docs/adr/ |
| **[ADR-006](./adr/ADR-006.md)** | URL-Based i18n Over Client-Side Toggle | ✅ Accepted | docs/adr/ |
| **[ADR-007](./adr/ADR-007.md)** | Spanish as Default Canonical Locale (revised 2026-06-08) | ✅ Accepted | docs/adr/ |
| **[ADR-010](./adr/ADR-010.md)** | No External i18n Library (plain JS) | ✅ Accepted | docs/adr/ |
| **[ADR-011](./adr/ADR-011.md)** | URL as Single Source of Truth (Locale) | ✅ Accepted | docs/adr/ |

**Note:** ADR-008, ADR-009 = reserved for future decisions (Feature-002 & Feature-003)

---

## 6. Open Questions

1. **Coverage Target:** ¿70% es suficiente para portfolio, o aspirar a 85%?
   - *Recomendación:* 70% (cobertura crítica: Contact, Blog, utils)
   - *Impacto:* Tiempo de implementación +1 semana por cada 10%

2. **Performance Baseline:** ¿Cuál es el target de Lighthouse?
   - *Actual:* No medido (TODO: audit en Phase 4)
   - *Recomendación:* >90 (indicador de expertise senior)

3. **Roadmap de Features:** ¿Agregar más features (testimonios, podcasts) o profundizar documentación?
   - *Recomendación:* Profundizar documentación + testing primero
   - *Razón:* Portfolio es showcase de **proceso**, no de feature count

4. **CI/CD:** ¿Agregar GitHub Actions para tests + coverage reporting?
   - *Actual:* Vercel solo hace build
   - *Recomendación:* Agregar en Phase 3
   - *Impacto:* +30 minutos setup

---

## 7. Key Files & Paths

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/App.jsx` | Root routing (React Router setup) |
| `src/main.jsx` | Entry point (React 19 setup) |
| `src/features/contact/Contact.jsx` | **CRÍTICO:** Contact form (sin backend) |
| `src/features/hero/HeroBanner.jsx` | **CRÍTICO:** Hero principal |
| `src/config/motionConfig.js` | **CRÍTICO:** Variantes Framer Motion |
| `vite.config.js` | **CRÍTICO:** Build optimization |
| `package.json` | Dependencias (React 19, Framer, Vite) |
| `CLAUDE.md` | Contexto para AI |
| `CONTRIBUTING.md` | Flujo de trabajo |
| `vercel.json` | SPA routing rewrites |

---

## 8. Metrics & Checkpoints

| Métrica | Baseline | Target | Status |
|---------|----------|--------|--------|
| Test Coverage | 0% | 70% | ⏳ Phase 2 |
| Lighthouse Score | — | >90 | ⏳ Phase 4 |
| Build Time (dev) | ~1s | <1s | ✅ Already met |
| HMR Time | <100ms | <100ms | ✅ Already met |
| Bundle Size (main) | — | <100kb | ⏳ Measure Phase 2 |
| Core Web Vitals | — | Good | ⏳ Phase 4 |

---

## 9. Useful Commands

```bash
# Development
npm run dev                # Start Vite dev server (HMR enabled)
npm run build              # Production build (generates dist/)
npm run preview            # Preview built version locally
npm run lint               # ESLint analysis

# Testing (por agregar en Phase 2)
npm run test               # Run test suite
npm run test:coverage      # Coverage report

# Makefile aliases (por agregar)
make dev                   # npm run dev
make build                 # npm run build
make test                  # npm run test
make lint                  # npm run lint
```

---

---

## Appendix: Documentation Structure (SDD Standard)

```
docs/
├── SDD_MASTER.md              ← This file: central index
├── MOD-00_overview.md         ← System vision (FEATURE-00)
├── adr/                       ← Architecture Decision Records (9 ADRs)
│   ├── ADR-001.md through ADR-011.md
│   └── (ADR-008, ADR-009 reserved)
├── specs/
│   ├── _templates/            ← Blueprints: spec/plan/tasks templates
│   ├── FEATURE-00_PROJECT_SETUP/
│   │   ├── mod-00_overview.md
│   │   ├── prd.md
│   │   ├── audit.md
│   │   ├── component-tree.md
│   │   └── codebase-context.md
│   ├── FEATURE-01_I18N_ROUTING/    ← (created, awaiting spec.md + plan.md)
│   ├── FEATURE-02_SEO_METATAGS/    ← (created, TBD)
│   ├── FEATURE-03_AEO_SCHEMA/      ← (created, TBD)
│   ├── FEATURE-04_HERO_ANIMATION/
│   │   ├── 01-hero-engine.md
│   │   ├── hero-optimization.md
│   │   ├── design-tokens.md
│   │   └── performance.md
│   └── FEATURE-05_PROJECT_MANAGEMENT/
│       └── projects-logic.md
└── use-cases/                 ← Behavior contracts
    ├── UC-01_contact_form_submission.md
    ├── UC-02_blog_navigation.md
    ├── UC-03_project_detail_view.md
    ├── UC-04_performance_code_splitting.md
    ├── SEQ-01_contact_form.puml
    ├── SEQ-02_blog_navigation.puml
    └── SEQ-04_code_splitting.puml
```

**Last updated:** 2026-06-08 (FEATURE-01 i18n complete)
**Next review:** After FEATURE-02 (SEO Meta Tags)
