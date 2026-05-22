# Contexto Proyecto Completo — Ongevag Portfolio

> **Propósito:** Snapshot del estado actual. Copiar este bloque al iniciar cada sesión nueva.
> Regenerar después de cada hito importante.

---

## Estado Actual

| Aspecto | Valor |
|--------|-------|
| **Rama activa** | `develop` |
| **Fase del proyecto** | Fase 3 — Tests implementados, ready para validación |
| **Último hito** | Implementación de 93 tests para UC-01 (Contact Form) |
| **Próximo hito** | Ejecutar tests localmente + Expansión a UC-02, UC-03 |
| **Bloqueantes** | Ninguno — listo para `npm run test:coverage` |

---

## Resumen Técnico

**Nombre:** Ongevag Portfolio
**Propósito:** Landing page + blog para captar clientes PyMEs
**Stack:** React 19.1.0 + Vite 6.3.5 + Tailwind CSS 3.3.0
**Arquitectura:** Feature-Based (DDD Light) — 6 features independientes
**Deployment:** Vercel (automático en main/develop)
**Estado código:** Production-ready, 0% test coverage (DEUDA TÉCNICA ALTA)

**Módulos clave:**
- `features/hero/` — Sección principal (hero, about, skills, services, works, blog preview, contact)
- `features/blog/` — Blog estático con datos en JSON
- `features/contact/` — Formulario con EmailJS
- `features/services/` — Catálogo de servicios
- `features/works/` — Portfolio de proyectos
- `features/analytics/` — Componentes de visualización

**Decisiones arquitectónicas:**
1. **ADR-001:** Vite para HMR rápido (<100ms) + builds optimizados (~1s)
2. **ADR-002:** JavaScript puro (sin TypeScript)
3. **ADR-003:** EmailJS para contacto sin backend
4. **ADR-004:** Feature-based architecture para escalabilidad

---

## Trabajo Reciente

### Sesión 1 (2026-05-13) — Auditoría SDD

**Qué se hizo:**
1. Auditoría completa de 43 archivos .jsx/.js
2. Confirmación de stack y arquitectura
3. Identificación de 4 flujos observables (Contact, Blog, Projects, Performance)
4. Detección de deuda técnica: **tests faltantes (CRÍTICO)**
5. Generación de 14 archivos de documentación SDD

**Deuda técnica identificada:**
- **ALTA:** Sin tests unitarios/integración (0% coverage)
- **ALTA:** Falta documentación de módulos individuales (MOD-*.md)
- **MEDIA:** Contact.jsx muy largo, requiere refactor de hooks

**Decisión:** Implementar Vitest + React Testing Library (ADR-005 por definir)

---

## Archivos Críticos Activos

| Archivo | Estado | Notas |
|---------|--------|-------|
| `src/features/contact/Contact.jsx` | ⚠️ WIP — Testing | Formulario de contacto, sin tests aún |
| `src/features/blog/data/blogData.js` | ✅ Done | Blog posts estáticos |
| `src/features/hero/HeroBanner.jsx` | ✅ Done | Hero principal, animaciones complejas |
| `vite.config.js` | ✅ Done | Build optimizado, chunks, aliases |
| `package.json` | ⚠️ WIP — Testing | Falta script "test", devDeps para Vitest |
| `CLAUDE.md` | ✅ Done | Contexto para AI, excelente |
| `.claudeignore` | 🆕 Nuevo | Bloquear ruido: node_modules, dist, .env |
| `docs/SDD_MASTER.md` | 🆕 Nuevo | Índice central de módulos |
| `docs/MOD-00_overview.md` | 🆕 Nuevo | Visión general del sistema |
| `docs/use-cases/UC-01*.md` | 🆕 Nuevo | Contrato: Contact Form submission |

---

## ── CONTEXTO PARA CONTINUAR ──

### Copiar esto literalmente en próxima sesión:

```
Estoy trabajando en Ongevag Portfolio, un landing page + blog
en React 19 + Vite para captar clientes PyMEs.

Stack: JavaScript/React/Vite, arquitectura feature-based (DDD Light),
43 archivos .jsx/.js, 0% test coverage.

Fase actual: Post-auditoría SDD, preparación para testing + implementación
de UC-01 (Contact Form submission).

Último trabajo (Sesión 1):
  - Auditoría completa del codebase
  - Generación de documentación SDD (14 archivos)
  - Identificación de deuda técnica (tests) e impacto de portfolio
  - Decisión: usar Vitest + React Testing Library

Próximo paso:
  1. Crear vitest.config.js y actualizar package.json con devDeps
  2. Implementar tests para UC-01 (Contact Form)
  3. Establecer coverage target 70%
  4. Documentar UC-04 (Code Splitting) con análisis de performance

Archivos relevantes:
  - src/features/contact/Contact.jsx (QA target)
  - package.json (config Vitest)
  - docs/use-cases/UC-01*.md (specification)
  - vitest.config.js (nuevo, por crear)
```

---

## Configuración para Próxima Sesión

**Branchs:**
- Crear: `feature/vitest-setup` desde `develop`
- PR a: `develop` (no directamente a `main`)

**Comandos útiles:**
```bash
npm run dev              # Desarrollo local
npm run build           # Build optimizado
npm run lint            # Linter
npm run test            # Tests (por agregar)
npm run test:coverage   # Coverage report (por agregar)
make dev                # Alias (por agregar)
make test               # Alias (por agregar)
```

**Variables de entorno necesarias:**
```
VITE_EMAILJS_SERVICE_ID=...     # Para testing de Contact Form
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

---

**Última actualización:** 2026-05-13
**Sesiones completadas:** 1
**Próxima revisión:** Después de UC-01 testing + coverage metrics
