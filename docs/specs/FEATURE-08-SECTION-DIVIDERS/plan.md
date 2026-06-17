# FEATURE-08: Section Dividers — Plan de Implementación
**Plan Version:** 1.0
**Status:** Draft
**Total Estimated Effort:** 3h
**Start Date:** 2026-06-17
**Target Completion:** 2026-06-17

---

## 1. Resumen Ejecutivo

Implementación de un componente reutilizable `SectionDivider` que renderiza
separadores SVG inline entre secciones de color diferente. El objetivo es
eliminar las transiciones abruptas entre bloques de color y aportar movimiento
visual acorde a la audiencia objetivo (agencias de marketing, estudios creativos).

El componente es puramente presentacional: no altera lógica de negocio, i18n,
tests ni SEO. Se integra en `AgenciasPage.jsx`, `AgenciesPageEN.jsx` y `App.jsx`
(HomeSections) mediante inserción quirúrgica entre secciones existentes.

---

## 2. Fases de Implementación

### Fase A: Componente base
**Duración:** 1h
**Dependencias:** Ninguna
**Entrega:** `SectionDivider.jsx` funcional con las 3 variantes

**Tasks:**
- T-01: Crear `src/components/ui/SectionDivider.jsx`
  - Props: `variant` (`wave` | `bowl` | `overlap`), `fromColor` (hex), `toColor` (hex), `height` (px, default 64), `overlapLabel` (string, solo variant overlap)
  - Variante `wave`: curva Bézier cúbica `C` — onda suave
  - Variante `bowl`: curva cuadrática `Q` invertida — arco que "contiene"
  - Variante `overlap`: onda + `div` absoluto centrado con card flotante
  - `preserveAspectRatio="none"` en todos los SVG
  - `lineHeight: 0` en el contenedor para eliminar gap de pixel
  - Respetar `prefers-reduced-motion`: si está activo, renderizar `<hr>` simple con `border-color: fromColor`

- T-02: Verificar render visual en `npm run dev` — los 3 variantes con colores reales de la paleta

### Fase B: Integración en /agencias
**Duración:** 45min
**Dependencias:** Fase A
**Entrega:** `AgenciasPage.jsx` y `AgenciesPageEN.jsx` con separadores aplicados

**Tasks:**
- T-03: Modificar `src/pages/AgenciasPage.jsx`
  - Entre AgenciasHero y AgenciasParaQuien: `<SectionDivider variant="wave" fromColor="#2C3340" toColor="#EEE0C9" />`
  - Entre AgenciasProceso y AgenciasFAQ: `<SectionDivider variant="bowl" fromColor="#96B6C5" toColor="#EEE0C9" />`
  - Entre AgenciasFAQ y AgenciasCTAFinal: `<SectionDivider variant="overlap" fromColor="#EEE0C9" toColor="#2C3340" overlapLabel="¿Hablamos?" />`

- T-04: Replicar en `src/pages/AgenciesPageEN.jsx` con mismos colores
  - `overlapLabel` en EN: `"Let's talk"`

### Fase C: Integración en Home
**Duración:** 30min
**Dependencias:** Fase A
**Entrega:** `App.jsx` — HomeSections con separadores aplicados

**Tasks:**
- T-05: Modificar `HomeSections` en `src/App.jsx`
  - Entre AnimatedSection#hero y AnimatedSection#sobre-mi: `<SectionDivider variant="wave" fromColor="#EEE0C9" toColor="#F1F0E8" />`
  - Entre AnimatedSection#sobre-mi y AnimatedSection#skills: `<SectionDivider variant="bowl" fromColor="#F1F0E8" toColor="#F1F0E8" height={80} />` — quiebre interno de monotonía
  - Entre AnimatedSection#skills y AnimatedSection#servicios: `<SectionDivider variant="wave" fromColor="#F1F0E8" toColor="#2C3340" />`

  > Nota: Works usa `bg-obsidian` (DT-08-01 pendiente). No agregar separador
  > hasta que ese componente esté migrado a navy rebrand.

### Fase D: QA y documentación
**Duración:** 45min
**Dependencias:** Fases B y C
**Entrega:** Build verde, verificación visual, docs actualizados

**Tasks:**
- T-06: QA visual en `npm run dev`
  - Verificar en desktop (1440px): sin gaps de pixel entre sección y SVG
  - Verificar en mobile (375px): `preserveAspectRatio="none"` estira correctamente
  - Verificar `prefers-reduced-motion`: separadores reemplazados por `<hr>` simple

- T-07: `npm run build` — build sin errores ni warnings nuevos

- T-08: `npm run test -- --run` — 71/71 sin regresiones
  (SectionDivider es presentacional puro, no requiere tests unitarios propios)

- T-09: Actualizar `CLAUDE.md`
  - Agregar `SectionDivider` a la tabla Critical Files con su razón
  - Actualizar Current Phase

- T-10: Entrada en `BITACORA_TECNICA.md`
  - Registrar decisión de `preserveAspectRatio="none"` vs alternativas CSS
  - Registrar patrón wave/bowl/overlap y su asignación por posición

- T-11: Entrada en `CHANGELOG.md` bajo `[Unreleased]`

- T-12: Commit y push a `develop`
  ```
  feat(ui): add SectionDivider component with wave/bowl/overlap variants

  - New SectionDivider component with SVG inline preserveAspectRatio none
  - Applied to /agencias: wave (hero→paraQuien), bowl (proceso→faq), overlap (faq→cta)
  - Applied to home: wave (hero→about), bowl (about→skills), wave (skills→services)
  - Respects prefers-reduced-motion
  - No logic, i18n, test or SEO changes
  ```

---

## 3. Desglose de Tareas (Tasks)

| ID | Tarea | Fase | Esfuerzo | Archivo |
|----|-------|------|----------|---------|
| T-01 | Crear SectionDivider.jsx (3 variantes) | A | 45min | `src/components/ui/SectionDivider.jsx` |
| T-02 | Verificación visual dev server | A | 15min | — |
| T-03 | Integrar en AgenciasPage.jsx | B | 20min | `src/pages/AgenciasPage.jsx` |
| T-04 | Replicar en AgenciesPageEN.jsx | B | 10min | `src/pages/AgenciesPageEN.jsx` |
| T-05 | Integrar en HomeSections (App.jsx) | C | 30min | `src/App.jsx` |
| T-06 | QA visual (desktop + mobile + a11y) | D | 20min | — |
| T-07 | npm run build | D | 5min | — |
| T-08 | npm run test | D | 5min | — |
| T-09 | Actualizar CLAUDE.md | D | 10min | `CLAUDE.md` |
| T-10 | Entrada BITACORA | D | 10min | `BITACORA_TECNICA.md` |
| T-11 | Entrada CHANGELOG | D | 5min | `CHANGELOG.md` |
| T-12 | Commit + push develop | D | 5min | — |

---

## 4. Criterios de Definición de Done (DoD)

| Fase | Criterios DoD |
|------|---------------|
| A | SectionDivider.jsx creado, las 3 variantes renderizan sin errores, sin gap de pixel |
| B | /agencias muestra wave + bowl + overlap en las posiciones correctas |
| C | Home muestra 3 separadores; Works no tiene separador hasta DT-08-01 resuelto |
| D | Build verde, 71/71 tests, CLAUDE.md + BITACORA + CHANGELOG actualizados, commit en develop |

---

## 5. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| Gap de 1px entre sección y SVG por line-height | Alta | Bajo | `lineHeight: 0` en el wrapper del SVG — ya documentado en spec |
| SVG no escala en mobile | Media | Medio | `preserveAspectRatio="none"` + `width: 100%` resuelve en todos los viewports |
| AnimatedSection en App.jsx introduce overflow que corta el SVG | Media | Medio | Verificar en T-06; si ocurre, mover SectionDivider fuera del motion.div |
| Works (bg-obsidian) genera transición de color incorrecta | Baja | Bajo | Documentado: no agregar separador Works hasta resolver DT-08-01 |
| overlapLabel necesita i18n | Baja | Bajo | En esta feature se pasa como prop desde la página; la página ya tiene acceso a `t` vía `useLocale()` |

---

## 6. Timeline

```
2026-06-17  Fase A — SectionDivider.jsx (T-01, T-02)
2026-06-17  Fase B — Integración /agencias (T-03, T-04)
2026-06-17  Fase C — Integración Home (T-05)
2026-06-17  Fase D — QA + docs + commit (T-06 a T-12)
```

---

## 7. Roles & Responsabilidades

| Rol | Responsable | Horas |
|-----|-------------|-------|
| Development | Leo Gavegno | 2.25h |
| Testing / QA visual | Leo Gavegno | 0.5h |
| Documentación | Leo Gavegno | 0.25h |

---

## 8. Comunicación & Escalaciones

**Check-ins:** Al finalizar cada fase antes de avanzar a la siguiente
**Bloqueantes:** Si AnimatedSection interfiere con el SVG → abrir issue en BITACORA antes de workaround
**Cambios de scope:** Cualquier variante adicional (zigzag, diagonal) → nueva tarea T-13+, no modifica fases existentes

---

**Próximo paso:** Ejecutar Fase A — crear `src/components/ui/SectionDivider.jsx`
