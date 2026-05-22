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

## 3. Module Registry

| ID | Módulo | Responsabilidad | Estado | Última Rev. | Links |
|----|--------|-----------------|--------|-------------|-------|
| **MOD-00** | Overview | Visión general del sistema | ✅ Documentado | 2026-05-13 | [MOD-00_overview.md](./MOD-00_overview.md) |
| **MOD-01** | Hero Feature | Sección principal: hero, about, skills, services, works, blog preview, contact | ⚠️ Todo: MOD-01 | — | [HeroBanner.jsx](../src/features/hero/) |
| **MOD-02** | Blog Feature | Índice de posts, navegación, detalle con HTML inline | ⚠️ Todo: MOD-02 | — | [Blog/](../src/features/blog/) |
| **MOD-03** | Contact Feature | Formulario con EmailJS, validación, estados | ⚠️ Testing: UC-01 | — | [Contact.jsx](../src/features/contact/) |
| **MOD-04** | Services Feature | Catálogo de servicios ofrecidos | ⚠️ Todo: MOD-04 | — | [Services.jsx](../src/features/services/) |
| **MOD-05** | Works Feature | Portfolio de proyectos con detalles | ⚠️ Todo: MOD-05 | — | [Works.jsx](../src/features/works/) |
| **MOD-06** | Analytics Feature | Componentes de visualización de datos | ⚠️ Todo: MOD-06 | — | [Analytics/](../src/features/analytics/) |
| **MOD-UI** | UI Kit Global | Button, Header, Footer, Skeleton, etc. | ✅ Done | 2026-04-16 | [Components/](../src/components/) |
| **MOD-CONFIG** | Configuración Global | Variantes Framer Motion, constantes | ✅ Done | 2026-04-16 | [config/](../src/config/) |

---

## 4. Implementation Phases

### Phase 1: Foundation (COMPLETED ✅)
- ✅ Auditoría SDD
- ✅ Documentación de decisiones (ADR-001 a ADR-004)
- ✅ Generación de SDD ecosystem

**Milestone:** Architecture and decisions documented

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

### Pending Decisions (ADR-005 onwards)

| ADR | Título | Estado | Impacto |
|-----|--------|--------|--------|
| **[ADR-005]** (por crear) | Testing Framework: Vitest + React Testing Library | 🔄 In progress Phase 2 | Tests confiables, coverage tracking |

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

**Última actualización:** 2026-05-13 (Post-Auditoría SDD)
**Próxima revisión:** Después de Phase 2 (Testing completado)
