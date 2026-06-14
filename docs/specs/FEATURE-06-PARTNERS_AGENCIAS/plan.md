# FEATURE-06: Partners para Agencias — Plan de Implementación

**Plan Version:** 1.1
**Status:** In Progress
**Total Estimated Effort:** ~6h 05min
**Start Date:** 2026-06-14
**Target Completion:** 2026-06-14
**Changelog v1.1 (2026-06-14):**
- T-07: nombre definitivo `AgenciasColaboracion.jsx` (corrige error en spec §5.2)
- T-04.5 agregado: crear `src/utils/trackEvent.js` (wrapper defensivo GA4)
- §5 Riesgos: agregado DT-06-01 (Hero visual Opción C como MVP)
- §8 KPI corregido: `CTR a WhatsApp` → `CTR a email`

---

## 1. Resumen Ejecutivo

Se implementa una ruta dedicada `/agencias` (y su espejo `/en/agencies`) como landing page independiente orientada a agencias de marketing, branding y diseño que necesitan un partner técnico white-label. Esta feature responde a un gap comercial identificado: el portfolio actual solo capta clientes PyME directos, sin mensaje ni canal para el segmento B2B de agencias que tercerizan producción web.

La implementación incluye 7 componentes modulares bajo `src/features/agencias/`, 2 locales (ES/EN), integración con routing existente, SEO independiente, y reemplazo del texto obsoleto en `About.jsx`. El CTA primario es email profesional (no WhatsApp), preservando la privacidad del número personal. Total estimado: ~6h 05min en una sola sesión, con QA manual incluido.

---

## 2. Fases de Implementación

### Fase A: Setup & Foundation
**Duración:** ~35 min
**Dependencias:** Ninguna
**Entrega:** Rama Git creada, locales ES/EN registrados en `LocaleProvider`, variable de entorno `VITE_CONTACT_EMAIL` configurada, `trackEvent.js` disponible.

**Tasks:**
- **T-00:** Agregar `VITE_CONTACT_EMAIL` en `.env` y `.env.example`
- **T-01:** Crear rama Git `feature/FEATURE-06-partners-agencias`
- **T-02:** Crear locale `src/locales/es/agencias.js` con todos los textos (fuente de verdad)
- **T-03:** Crear locale `src/locales/en/agencies.js` (traducción completa)
- **T-04:** Registrar ambos locales en `LocaleProvider.jsx`
- **T-04.5:** Crear `src/utils/trackEvent.js` (wrapper defensivo GA4)

---

### Fase B: Core Implementation
**Duración:** ~3h 30min
**Dependencias:** Fase A
**Entrega:** Todos los componentes de la landing creados, composición de páginas, routing activo, navegación integrada, texto de `About.jsx` actualizado, teaser en home.

**Tasks:**
- **T-05:** Crear componente `AgenciasHero.jsx` (headline animado, CTAs email/scroll, layout asimétrico 3/5 + 2/5, Opción C visual derecho)
- **T-06:** Crear componente `AgenciasParaQuien.jsx` (perfil de agencia ideal)
- **T-07:** Crear componente `AgenciasColaboracion.jsx` (3 modelos en grid, border-l-2 sky blue, sin cards con shadow)
- **T-08:** Crear componente `AgenciasProceso.jsx` (4 pasos, línea horizontal desktop / vertical mobile)
- **T-09:** Crear componente `AgenciasFAQ.jsx` (accordion con useState local, sin librería externa)
- **T-10:** Crear componente `AgenciasCTAFinal.jsx` (CTA email final)
- **T-11:** Crear `src/pages/AgenciasPage.jsx` (composición ES con Helmet)
- **T-12:** Crear `src/pages/AgenciesPageEN.jsx` (espejo EN con Helmet)
- **T-13:** Agregar rutas `/agencias` y `/en/agencies` con `lazy()` en `App.jsx`
- **T-14:** Agregar ítem `Para agencias` / `For agencies` en `Header.jsx` (path-aware) + claves en `common.js` ES/EN
- **T-15:** Reemplazar texto obsoleto en `src/components/About.jsx` (Sección 3.7 del spec)
- **T-16:** Agregar teaser minimalista en `src/features/services/Services.jsx` (final de sección, antes del formulario): `¿Sos de una agencia? → Ver propuesta para agencias`

---

### Fase C: SEO & Integration
**Duración:** ~35 min
**Dependencias:** Fase B
**Entrega:** Meta tags completos en ambas rutas, sitemap actualizado con las 2 nuevas URLs.

**Tasks:**
- **T-17:** Actualizar sitemap (agregar `/agencias` y `/en/agencies` con priority 0.9, changefreq monthly)
- **T-18:** Verificar SEO meta tags en ambas páginas (Helmet: title, description, canonical, hreflang, og:tags)

---

### Fase D: QA & Documentation
**Duración:** ~50 min
**Dependencias:** Fase C
**Entrega:** QA manual completado en desktop y mobile, documentación SDD actualizada, PR listo para merge.

**Tasks:**
- **T-19:** QA manual — verificar desktop y mobile en ambas rutas (`/agencias` y `/en/agencies`):
  - Layout asimétrico del Hero
  - Animaciones Framer Motion (stagger, spring config)
  - FAQ accordion funcional
  - CTAs de email con asunto pre-cargado
  - Navegación Header path-aware (ES ↔ EN)
  - Teaser en home visible y linkeable
  - Texto de About.jsx actualizado
  - Responsive mobile (stack vertical, línea lateral en proceso)
- **T-20:** Actualizar `CLAUDE.md` (Current Phase + Module Index) y `docs/SDD_MASTER.md` (FEATURE-06 en Module Registry) + entrada en `BITACORA_TECNICA.md`

---

## 3. Desglose de Tareas

Ver `docs/specs/FEATURE-06-PARTNERS_AGENCIAS/tasks.md` para criterios de aceptación completos por tarea.

---

## 4. Criterios de Definición de Done (DoD)

| Fase | Criterios DoD |
|------|---------------|
| **A** | Rama Git creada, `.env` con `VITE_CONTACT_EMAIL`, locales ES/EN completos y registrados en `LocaleProvider`, `trackEvent.js` disponible, `npm run dev` sin errores |
| **B** | Todos los FR implementados, routing activo en `/agencias` y `/en/agencies`, Header con ítem nuevo, About.jsx actualizado, teaser en `Services.jsx`, 0 warnings de linting |
| **C** | Meta tags válidos en ambas rutas (verificar con DevTools), sitemap con las 2 URLs nuevas, `hreflang` bidireccional correcto |
| **D** | QA manual pasado en desktop (1280px+) y mobile (375px), animaciones fluidas, CTAs funcionales, `CLAUDE.md` y `SDD_MASTER.md` actualizados, BITACORA entrada agregada |

---

## 5. Riesgos, Mitigaciones & Deuda Técnica

| ID | Tipo | Descripción | Probabilidad | Impacto | Mitigación |
|----|------|-------------|--------------|---------|------------|
| — | Riesgo | `VITE_CONTACT_EMAIL` no configurado en producción | Media | Alto | Verificar `.env.example` documentado; agregar fallback `href="#"` si la variable no existe |
| — | Riesgo | Conflicto de merge en `Header.jsx` o `App.jsx` | Media | Medio | Commits atómicos por tarea; testear routing después de cada cambio en archivos compartidos |
| — | Riesgo | Traducción EN inconsistente con tono del spec | Baja | Medio | Revisar que el copy EN mantenga posicionamiento B2B white-label, no traducción literal |
| — | Riesgo | `LocaleProvider` requiere restart al agregar locales | Baja | Bajo | Si no hot-reload, restart manual con `npm run dev` |
| — | Riesgo | Animaciones Framer Motion rompen layout en mobile | Baja | Medio | QA mobile explícito en T-19; si hay drift, desactivar stagger en breakpoint `md:` |
| **DT-06-01** | Deuda Técnica | Hero visual derecho — Opción C (placeholder `bg-slate-800/20`) implementada como MVP. Opción A (mockup animado CSS/Framer Motion) pendiente de spec visual detallada. | — | Estético, no funcional | Abrir issue/task en iteración siguiente con spec de animación detallada |

---

## 6. Timeline

- **[00:00]** Feature kickoff — Fase A (Setup)
- **[00:35]** Inicio Fase B (Core Implementation)
- **[04:05]** Inicio Fase C (SEO & Integration)
- **[04:40]** Inicio Fase D (QA & Documentation)
- **[05:30]** Merge a `develop` + entrada en `BITACORA_TECNICA.md`
- **[06:05]** Feature completa — deploy a producción vía Vercel

---

## 7. Roles & Responsabilidades

| Rol | Responsable | Horas |
|-----|-------------|-------|
| Development | Leandro Gavegno | ~5h 15min |
| QA Manual | Leandro Gavegno | 30 min |
| Review & Docs | Leandro Gavegno | 20 min |

---

## 8. Criterio de Éxito Comercial (post-lanzamiento, GA4)

| KPI | Definición | Target inicial |
|-----|-----------|----------------|
| CTR a email | clicks email / sessions en `/agencias` | > 5% |
| Scroll depth 75% | % de usuarios que leen hasta FAQ | > 40% |
| Bounce rate | usuarios que salen sin interacción | < 60% |
| Tiempo en página | promedio de sesión | > 90s |

---

**Próximo paso:** Ejecutar Fase A — T-00 (env var) → T-01 (rama Git) → T-02 (locale ES).
