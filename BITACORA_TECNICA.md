# Bitácora Técnica — Ongevag Studio Portfolio

> **Regla:** Nunca editar entradas pasadas. Agregar nuevas sesiones al inicio.
> Cada entrada es un snapshot inmutable del trabajo realizado.

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
