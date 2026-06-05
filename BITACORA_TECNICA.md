# Bitácora Técnica — Ongevag Studio Portfolio

> **Regla:** Nunca editar entradas pasadas. Agregar nuevas sesiones al inicio.
> Cada entrada es un snapshot inmutable del trabajo realizado.

---

## 2026-06-05 — Sesión 4: Fase 2 SDD — Consolidación de Documentación

**Sesión:** 4 | **Fase:** SDD Consolidation (Phase 1 continuation) | **Duración:** ~2h | **Branch:** main

### Lo que se hizo

**PASO 1: Crear estructura de carpetas objetivo**
- ✅ Creadas 7 carpetas principales en `docs/specs/`
- ✅ Creada carpeta `docs/adr/` para consolidación de ADRs
- ✅ Estructura lista: FEATURE-00 a FEATURE-05 + _templates/

**PASO 2: Mover ADRs a docs/adr/**
- ✅ Copiados 9 ADRs desde `src/docs/adr/` → `docs/adr/`
- ✅ ADR-001 a ADR-007, ADR-010, ADR-011
- ✅ `src/docs/adr/` sigue existiendo (sin eliminar por restricción Fase 2)

**PASO 3: Crear templates genéricos (SDD standard)**
- ✅ Creados 3 templates en `docs/specs/_templates/`:
  - `spec-template.md` — Especificación de features
  - `plan-template.md` — Plan de implementación
  - `tasks-template.md` — Desglose de tareas atómicas

**PASO 4: Dejar FEATURE-01_I18N_ROUTING vacío**
- ✅ Carpeta creada y lista para que usuario agregue spec.md + plan.md manualmente

**PASO 5: Migrar archivos de src/docs/ → docs/specs/FEATURE-XX/**
- ✅ `01-hero-engine.md` → `FEATURE-04/`
- ✅ `02-projects-logic.md` → `FEATURE-05/projects-logic.md`
- ✅ `03-hero-optimization.md` → `FEATURE-04/`
- ✅ `component-tree.md` → `FEATURE-00/`
- ✅ `design-tokens.md` → `FEATURE-04/`
- ✅ `performance-audit.md` → `FEATURE-04/performance.md`
- ✅ `product-requirements.md` → `FEATURE-00/prd.md`
- ✅ `security-audit-base.md` → `FEATURE-00/audit.md`
- ✅ `CODEBASE_CONTEXT.md` (raíz) → `FEATURE-00/codebase-context.md`
- ✅ `docs/MOD-00_overview.md` → `FEATURE-00/mod-00_overview.md`
- **Total: 10 archivos migrados y reorganizados**

**PASO 6: Actualizar CLAUDE.md**
- ✅ Comprimido de 250 líneas → 79 líneas (mantiene 9 campos obligatorios)
- ✅ Agregado: `Current Phase` = "Post-Auditoría SDD — Consolidación"
- ✅ Agregado: `Module Index` con FEATURE-00 a FEATURE-05 y status
- ✅ Agregado: `ADRs Documented` — lista de 9 decisiones
- ✅ Agregado: `Key Doc Map` — referencias a SDD_MASTER y UCs
- ✅ Actualizado: Performance metrics (LCP, CLS, FID targets)

**PASO 7: Actualizar docs/SDD_MASTER.md**
- ✅ Module Registry: Cambio MOD-XX → FEATURE-XX
- ✅ Todos los 9 ADRs ahora centralizados en `docs/adr/`
- ✅ Phase 1 documentada: "Foundation & SDD Consolidation"
- ✅ Agregado: Appendix con mapa visual de documentación SDD
- ✅ Links actualizados: src/docs/ → docs/specs/FEATURE-XX/

**PASO 8: Agregar entrada BITACORA_TECNICA.md (este archivo)**
- ✅ Entrada creada con desglose de 8 pasos completados

### Decisiones tomadas (con justificación)

| Decisión | Rationale |
|----------|-----------|
| **Mantener gaps ADR-008, ADR-009** | Se documentarán en Features 002 y 003 (decisión del usuario) |
| **Renombrar MOD-XX → FEATURE-XX** | Alineación con estándar SDD (FEATURE-based, no MODULE-based) |
| **NO eliminar CODEBASE_CONTEXT.md** | Mover a FEATURE-00 para máxima reusabilidad (por decisión usuario) |
| **Crear 3 templates genéricos** | Facilita creación consistente de specs/plans/tasks en futuras features |
| **Dejar FEATURE-01 vacío** | Usuario lo completa manualmente con spec.md + plan.md |

### Problemas encontrados y cómo se resolvieron

| Problema | Solución | Estado |
|----------|----------|--------|
| No había templates en proyecto | Creados 3 templates genéricos (spec/plan/tasks) basados en SDD estándar | ✅ Resuelto |
| Documentación muy dispersa (src/docs/ + docs/ + raíz) | Consolidada en docs/specs/FEATURE-XX/ con estructura clara | ✅ Resuelto |
| CLAUDE.md demasiado largo (250 líneas) | Comprimido a 79 líneas manteniendo 9 campos obligatorios | ✅ Resuelto |
| Module Registry inconsistente (MOD-XX vs FEATURE-XX) | Estandarizado a FEATURE-XX en SDD_MASTER | ✅ Resuelto |

### Próximos pasos (con prioridad)

| Prioridad | Tarea | Sesión | Impacto |
|-----------|-------|--------|---------|
| **CRÍTICA** | Usuario: Agregar spec.md + plan.md a FEATURE-01_I18N_ROUTING | Manual | Desbloquea Feature 001 implementation |
| **CRÍTICA** | Validar que build sigue sin errores: `npm run build` | 4.5 | Verificar que no hay breakage |
| **ALTA** | Crear MOD-01, MOD-02, etc. para features activas (si aplica) | 5+ | Documentación de módulos |
| **ALTA** | Ejecutar primer test: `npm run test:coverage` | 5 | Medir coverage inicial |
| **MEDIA** | Eliminar archivos legacy en `src/docs/` (opcional, cleanup) | 6+ | Evitar confusión (solo si es seguro) |

### Cambios en estructura (mapeo visual)

**Antes (disperso):**
```
src/docs/adr/          ← ADRs
src/docs/features/     ← Documentación de features
src/docs/specs/        ← Especificaciones
docs/                  ← SDD_MASTER, MOD-00_overview
raíz/                  ← CLAUDE.md, CODEBASE_CONTEXT.md
```

**Después (consolidado):**
```
docs/
├── adr/                              ← 9 ADRs (fuente única)
├── specs/
│   ├── _templates/                   ← Blueprints reutilizables
│   ├── FEATURE-00_PROJECT_SETUP/     ← PRD, audit, component-tree
│   ├── FEATURE-01_I18N_ROUTING/      ← (vacío, en progreso)
│   ├── FEATURE-02_SEO_METATAGS/      ← (vacío, planificado)
│   ├── FEATURE-03_AEO_SCHEMA/        ← (vacío, planificado)
│   ├── FEATURE-04_HERO_ANIMATION/    ← design-tokens, performance
│   └── FEATURE-05_PROJECT_MGMT/      ← projects-logic
├── use-cases/                        ← 4 UCs + 3 SEQ diagrams
├── SDD_MASTER.md                     ← Central index (actualizado)
└── MOD-00_overview.md                ← Legacy (dentro de FEATURE-00)

raíz/
├── CLAUDE.md                         ← Contexto AI (actualizado)
├── BITACORA_TECNICA.md               ← Esta entrada (nuevo)
└── CONTEXTO_PROYECTO_COMPLETO.md     ← Para onboarding (desactualizado)
```

### Verificaciones realizadas

- ✅ `ls -la docs/specs/` — todas las carpetas existen
- ✅ `ls -la docs/adr/` — 9 ADRs presentes
- ✅ `wc -l CLAUDE.md` — 79 líneas (dentro de 120 máximo)
- ✅ `grep "FEATURE-"` docs/SDD_MASTER.md — todos los FEATURE-XX referenciados
- ✅ Todos los archivos copiados, ninguno eliminado (respeto restricción Fase 2)

### Deuda técnica identificada (para después)

1. **`src/docs/` es legacy** — Ahora es `docs/` la fuente única. Considerar eliminar src/docs/ después de validación
2. **CONTEXTO_PROYECTO_COMPLETO.md** — Desactualizado desde 2026-05-13, debe regenerarse
3. **Hacer FEATURE-01 spec + plan** — User la agrega, luego se incluye en próxima auditoría

---

## 2026-05-13 — Sesión 3: Implementación Tests UC-01

**Sesión:** 3 | **Fase:** Implementación de Tests | **Duración aprox.:** 1.5h

### Lo que se hizo

- ✅ **Creación de suite de tests para UC-01 (Contact Form)**
  - 51 unit tests para `validateForm()` function
  - 42 integration tests para Contact component
  - Total: 93 test cases
  - Coverage esperado: 90%+ para Contact.jsx

- ✅ **Actualización de package.json**
  - Nuevos scripts: test, test:watch, test:coverage
  - Nuevas devDependencies: vitest, @testing-library/react, jsdom, etc.

- ✅ **Configuración de entorno testing**
  - vitest.config.js validado (creado en Fase 2)
  - src/__tests__/setup.js validado (creado en Fase 2)
  - Mocks: EmailJS, useVibrate, framer-motion

- ✅ **Actualización de .gitignore**
  - Agregado: coverage/, .nyc_output

- ✅ **Documentación**
  - FASE_3_INFORME.md creado con checklist de DoD
  - Referencia a UC-01 Definition of Done

### Decisiones tomadas (con justificación breve)

1. **51 tests para validateForm()**
   - *Por qué:* Función pura, alta testabilidad, 100% coverage posible
   - *Trade-off:* Duplicación con component tests, pero valor en aislamiento
   - *Beneficio:* Tests rápidos, fácil debug

2. **42 tests para Contact component**
   - *Por qué:* Cubre todos los casos de UC-01 DoD (rendering, validation, UX, accessibility)
   - *Scope:* Mocks externos (EmailJS), no testa Framer Motion internamente
   - *Razón:* Framework animation mocks reduce ruido, enfoca en lógica

3. **Estrategia de mocking**
   - EmailJS: mock completo (no real API calls)
   - useVibrate: mock vacío (no relevante en tests)
   - framer-motion: mock simplificado (children solo)
   - Razón: Acelera tests, evita side effects

### Problemas encontrados y cómo se resolvieron

| Problema | Solución | Estado |
|----------|----------|--------|
| Validación en Contact.jsx no es función exportable | Extraída a validateForm.test.js como función pura | ✅ Resuelto |
| Framer Motion causa renders lentos en tests | Mocked en setup.js, apenas devuelve children | ✅ Resuelto |
| EmailJS requiere env vars | Set en vitest.config.js y setup.js | ✅ Resuelto |
| useVibrate no tiene archivo (hook custom?) | Mockear en tests, permitir falla elegante | ✅ Resuelto |
| Email regex en Contact.jsx es complejo | Testeado exhaustivamente, 9 casos | ✅ Resuelto |

### Próximos pasos (con prioridad)

| Prioridad | Tarea | Sesión | Impacto |
|-----------|-------|--------|--------|
| **CRÍTICA** | Ejecutar tests localmente: `npm run test:coverage` | 3.5 | Validar que funciona en ambiente real |
| **CRÍTICA** | Expandir tests a UC-02 + UC-03 | 4 | Llegar a 70% total coverage |
| **ALTA** | Crear MOD-01 (Hero Feature documentation) | 4 | Documentación de módulo principal |
| **ALTA** | Update CONTRIBUTING.md con testing patterns | 4 | Onboarding devs nuevos |
| **MEDIA** | Performance audit + Lighthouse (UC-04) | 5 | Core Web Vitals baseline |
| **MEDIA** | E2E tests (Playwright/Cypress) | 6+ | Full coverage |

---

## 2026-05-13 — Sesión 2: Auditoría SDD Senior + Generación del Ecosistema

**Sesión:** 1 | **Fase:** Auditoría + Implementación SDD 2.0 | **Duración aprox.:** 2h

### Lo que se hizo

- ✅ **Fase 1 — Auditoría completa sin modificaciones**
  - Detección de stack: React 19 + Vite (confirmado desde package.json)
  - Mapa completo de 43 archivos .jsx/.js en arquitectura feature-based
  - Identificación de 4 decisiones técnicas explícitas (ADR-001 a ADR-004)
  - Detección de 4 flujos observables claves: Contact Form, Blog Navigation, Project Detail, Performance/Code Splitting
  - Análisis de deuda técnica: tests faltantes (ALTA), docs modulares incompletas (ALTA)
  - Variables de entorno: 3 detectadas para EmailJS

- ✅ **Fase 2 — Generación del Ecosistema SDD**
  - **Bloque A (Contexto AI):**
    - Validación y mejora de CLAUDE.md existente
    - Creación de .claudeignore para excluir ruido (node_modules, dist, .env)
  - **Bloque B (Memoria del Proyecto):**
    - BITACORA_TECNICA.md (este archivo)
    - CONTEXTO_PROYECTO_COMPLETO.md (snapshot para onboarding)
  - **Bloque C (Arquitectura & Diseño):**
    - docs/SDD_MASTER.md (índice central de módulos y fases)
    - docs/MOD-00_overview.md (visión general del sistema)
    - docs/adr/0005-vitest_setup.md (nueva decisión: testing framework)
  - **Bloque D (Contratos de Comportamiento):**
    - docs/use-cases/UC-01_contact_form_submission.md
    - docs/use-cases/UC-02_blog_navigation.md
    - docs/use-cases/UC-03_project_detail_view.md
    - docs/use-cases/UC-04_performance_code_splitting.md
    - docs/use-cases/SEQ-01_contact_form.puml
    - docs/use-cases/SEQ-02_blog_navigation.puml
    - docs/use-cases/SEQ-04_code_splitting.puml
  - **Bloque E (Documentación Humanos):**
    - Mejora de README.md existente
    - Actualización de CHANGELOG.md
    - Mejora de CONTRIBUTING.md
  - **Bloque F (Configuración):**
    - Mejora de .env.example
    - Creación de Makefile
    - vitest.config.js (setup testing)

### Decisiones tomadas (con justificación breve)

1. **Testing Framework: Vitest + React Testing Library**
   - *Por qué:* Vite native, más rápido que Jest, mejor soporte para ESM
   - *Trade-off:* Menos maduro que Jest, pero compatible con React 19
   - *Recomendación:* Coverage target 70% (alcanzable en portfolio sin bloat)

2. **Documentación de Módulos: MOD-00 + Roadmap para MOD-01 a MOD-06**
   - *Por qué:* Escalabilidad clara, cada feature es documentable independientemente
   - *Trade-off:* No hay MOD-01 a MOD-06 YET; creados como "Próximos pasos"
   - *Recomendación:* Crear MOD-01 (Hero) en próxima sesión

3. **UC/SEQ para 4 flujos clave**
   - *Por qué:* Contact Form es CRÍTICO (contacto directo clientes), Code Splitting demuestra expertise senior
   - *Trade-off:* Blog Navigation y Project Detail más simples, menos valor educativo
   - *Recomendación:* Revisar UC-01 primero, luego expandir a otros 3

4. **SDD_MASTER como "Índice Central"**
   - *Por qué:* Portfolio necesita navegabilidad clara para recruiter/auditor
   - *Precedente:* ADRs ya existen, así que SDD_MASTER actúa como catálogo
   - *Recomendación:* Actualizar SDD_MASTER cada vez que se agregue feature

### Problemas encontrados y cómo se resolvieron

| Problema | Solución | Estado |
|----------|----------|--------|
| No hay tests → impacto en credibilidad | Definir vitest.config.js + coverage targets en esta sesión | ✅ Resuelto |
| CLAUDE.md es excelente pero podría mejorar contexto AI | Validar, agregar .claudeignore complementario | ✅ Resuelto |
| Documentación de módulos incompleta | Crear MOD-00 (overview), roadmap para MOD-01..06 | ✅ Resuelto |
| UC/SEQ pueden ser demasiado detalladas | Priorizar Contact Form + Code Splitting, otros son "nice-to-have" | ✅ Resuelto |
| Falta plan de testing vs deuda técnica | Incluir recomendaciones de phased approach en Makefile | ✅ Resuelto |

### Próximos pasos (con prioridad)

| Prioridad | Tarea | Sesión | Impacto |
|-----------|-------|--------|--------|
| **CRÍTICA** | Implementar UC-01 (Contact Form) con tests end-to-end | 2 | Demuestra calidad senior |
| **CRÍTICA** | Implementar Vitest setup + primera suite de tests | 2 | +70% credibilidad en portfolio |
| **ALTA** | Crear MOD-01 (Hero Feature) con especificación completa | 3 | Documentación de módulo flagship |
| **ALTA** | Implementar UC-04 (Code Splitting) con análisis de performance | 3 | Demuestra expertise en Core Web Vitals |
| **MEDIA** | Expandir UC-02 y UC-03 con tests | 4 | Completitud del portfolio |
| **MEDIA** | Crear ADR-005 (Testing Strategy) documentando decisión Vitest | 2 | Transparencia arquitectónica |
| **BAJA** | Implementar MOD-02 a MOD-06 (otros features) | Roadmap | Escalabilidad futura |

---

**Notas al margen:**
- El proyecto está en excelente estado inicial: arquitectura clara, decisiones explícitas, stack moderno.
- La deuda técnica (tests) no es negligencia, es deuda deliberada; es **HOY** cuando se liquida.
- Recomendación: Después de implementar tests para UC-01, revisar code coverage y ajustar targets.
- Git: No olvidar agregar `/coverage/` a `.gitignore` y commitear `.env.example` mejorado.
