# FEATURE-04: Hero Animation — Plan de Implementación
**Plan Version:** 1.0  
**Status:** In Progress  
**Total Estimated Effort:** 6h  
**Start Date:** 2026-06-05  
**Target Completion:** 2026-06-20  
**Branch:** `feature/hero-animation-audit`  
**Related Spec:** `docs/specs/FEATURE-04/spec.md`

---

## 1. Resumen Ejecutivo

FEATURE-04 cubre el Hero visual de la SPA ONGEVAG: `HeroBanner`, el motor de partículas Canvas 2D (`ParticleBackground`) y la geometría flotante (`WireframeGeometry`). El módulo está en producción y funcional, pero la documentación estaba dispersa en cinco archivos no canónicos. Este plan contempla tres ejes:

1. **Consolidación documental** — `spec.md` ya consolidado (done). Crear `plan.md` (este archivo) y `tasks.md`.
2. **Auditoría de código** — Verificar que la implementación real es consistente con la spec consolidada, detectar regresiones o drift.
3. **Hardening de puntos frágiles** — Dos vulnerabilidades documentadas (`scrollToContact` y ESLint/motion imports) requieren guardrails explícitos.

No hay nuevas funcionalidades en scope. El objetivo es cerrar la deuda documental y dejar el módulo con DoD completo para poder avanzar a FEATURE-05.

---

## 2. Estado Actual del Módulo

| Componente | Estado | Notas |
|-----------|--------|-------|
| `HeroBanner.jsx` | ✅ Producción | Funcional; frágil en `scrollToContact` |
| `ParticleBackground.jsx` | ✅ Producción | Eager import correcto; no usar `React.lazy` |
| `WireframeGeometry.jsx` | ✅ Producción | Lazy + Suspense correctos |
| `motionConfig.js` | ✅ Producción | Variantes `fadeInUp`, `staggerContainer` usadas |
| `design-tokens.md` | ✅ Consolidado | Fuente canónica de colores/animaciones |
| `spec.md` | ✅ Consolidado | Fuente única de verdad; generado 2026-06-05 |
| `plan.md` | 🔄 Este archivo | — |
| `tasks.md` | ⏳ Pendiente | Crear en Fase A |
| Puntos frágiles documentados | ⚠️ Sin guardrail | Ver sección de Riesgos |

---

## 3. Fases de Implementación

### Fase A: Cierre Documental
**Duración:** 1.5h  
**Dependencias:** `spec.md` consolidado (✅ done)  
**Entrega:** Ecosistema documental FEATURE-04 completo (`plan.md` + `tasks.md`)

**Tasks:**
- T-01: Generar `plan.md` (este archivo) — estructura, estado actual, riesgos
- T-02: Generar `tasks.md` — desglose granular de T-01 a T-N con criterios por tarea
- T-03: Actualizar referencias cruzadas en `SDD_MASTER.md` (FEATURE-04 → links a spec + plan)

---

### Fase B: Auditoría de Código vs. Spec
**Duración:** 2h  
**Dependencias:** Fase A  
**Entrega:** Informe de drift (o confirmación de consistencia)

**Tasks:**
- T-04: Verificar `ParticleBackground.jsx` contra spec §5 — densidad, color, radio de conexión, `prefers-reduced-motion`
- T-05: Verificar `HeroBanner.jsx` contra spec §4 — estructura visual, responsive, glows, stagger delays
- T-06: Verificar `motionConfig.js` — variantes `fadeInUp`, `staggerContainer` alineadas con spec §7
- T-07: Verificar `WireframeGeometry.jsx` — lazy load correcto, animación float infinita
- T-08: Documentar cualquier drift encontrado → generar entrada en `BITACORA_TECNICA.md`

---

### Fase C: Hardening de Puntos Frágiles
**Duración:** 1.5h  
**Dependencias:** Fase B  
**Entrega:** Guardrails implementados para los dos puntos de riesgo crítico

**Tasks:**
- T-09: Guardrail `scrollToContact` — Verificar que la función existe y el CTA "Ver proyectos" la llama correctamente; documentar en CLAUDE.md el patrón de eliminación accidental
- T-10: Guardrail ESLint/motion — Confirmar que la regla `jsx-uses-vars` está activa en `.eslintrc`; agregar comentario en `HeroBanner.jsx` advirtiendo del comportamiento de stripping
- T-11: Agregar checklist "No romper" en `spec.md` §7 como sección permanente

---

### Fase D: QA & Cierre
**Duración:** 1h  
**Dependencias:** Fase C  
**Entrega:** DoD completo, rama lista para merge a `develop`

**Tasks:**
- T-12: Ejecutar checklist §11.1 del `mod-04_hero-animation.md` — todos los ítems en verde
- T-13: Lighthouse audit (Performance > 90, LCP < 1.5s)
- T-14: Smoke test mobile — partículas, responsive, badge visible
- T-15: PR hacia `develop` — descripción con evidencia de DoD cumplido
- T-16: Entrada en `BITACORA_TECNICA.md` — resumen de auditoría y cambios aplicados

---

## 4. Criterios de Definición de Done (DoD)

| Fase | Criterios |
|------|-----------|
| A | `plan.md` y `tasks.md` en `docs/specs/FEATURE-04/`; `SDD_MASTER.md` con links actualizados |
| B | Informe de drift documentado (o confirmación explícita de consistencia); sin diferencias sin registrar |
| C | `jsx-uses-vars` confirmada activa; `scrollToContact` verificado funcional; advertencias en código y CLAUDE.md |
| D | Checklist §11.1 100% verde; Lighthouse Performance > 90; PR abierto hacia `develop`; BITACORA actualizada |

**Criterios de componente crítico:**

| Archivo | Condición de Done |
|---------|------------------|
| `ParticleBackground.jsx` | NO tiene `React.lazy`; respeta `prefers-reduced-motion`; `ResizeObserver` sin leaks |
| `HeroBanner.jsx` | `scrollToContact` presente y funcional; imports `motion` no eliminados por ESLint |
| `motionConfig.js` | `fadeInUp` y `staggerContainer` sin modificaciones de estructura |

---

## 5. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| `scrollToContact` eliminado accidentalmente en refactor futuro | Alta | Alto — CTA roto sin error visible | Documentar en CLAUDE.md como archivo crítico + test de humo en DoD |
| ESLint elimina imports `motion` (tree-shaking agresivo) | Alta | Alto — animaciones desaparecen silenciosamente | Confirmar `jsx-uses-vars` activo; comentario en `HeroBanner.jsx` |
| Drift entre spec consolidada y código real | Media | Medio — documentación mentirosa | Auditoría explícita en Fase B antes de cualquier cambio |
| `ParticleBackground` migrado a `React.lazy` por optimización errónea | Baja | Alto — flash blanco visible en LCP | Nota en spec §2 (Excluye) y CLAUDE.md Critical Files |
| Canvas leak en resize (ResizeObserver sin cleanup) | Baja | Medio — degradación progresiva de performance | Verificar en T-04 con DevTools Memory |

---

## 6. Timeline

```
2026-06-05  spec.md consolidado (✅ hecho)
2026-06-13  plan.md generado — Fase A iniciada (hoy)
2026-06-14  tasks.md + SDD_MASTER.md actualizados — Fase A cerrada
2026-06-16  Auditoría de código completa — Fase B cerrada
2026-06-18  Hardening puntos frágiles — Fase C cerrada
2026-06-20  QA + PR hacia develop — Fase D cerrada / FEATURE-04 DoD ✅
```

---

## 7. Notas de Proyecto

Proyecto unipersonal (Leo / ONGEVAG). No hay roles diferenciados ni cadencia de check-ins.

**Escalaciones:** Cualquier decisión que implique cambiar la estructura de `ParticleBackground.jsx` o `motionConfig.js` requiere una entrada en `BITACORA_TECNICA.md` y, si afecta el bundle o performance, un ADR nuevo.

**Cambios de scope:** Cualquier nueva funcionalidad (interactividad de partículas, cambio de color global, integración WebGL) → abrir FEATURE-04b o FEATURE-06 separado. Este plan cubre únicamente auditoría y hardening del estado actual.

---

**Próximo paso:** Ejecutar T-02 — generar `tasks.md` con desglose granular de cada tarea.
