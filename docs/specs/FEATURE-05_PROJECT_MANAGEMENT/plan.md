# FEATURE-05: Project Management — Plan de Implementación
**Plan Version:** 1.0  
**Status:** Completed  
**Total Estimated Effort:** 1.5h (solo documentación retroactiva)  
**Start Date:** 2026-06-13  
**Target Completion:** 2026-06-13

---

## 1. Resumen Ejecutivo

FEATURE-05 es una feature retroactiva de documentación. El módulo de gestión de proyectos (datos, galería filtrable y detalle individual) ya fue implementado y está en producción desde Sprint 7+8. No se escribe código nuevo.

El objetivo es liquidar la deuda técnica documental: el directorio `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/` solo contaba con `mod-05_project-management.md` como referencia histórica, sin los artefactos SDD estándar (`spec.md`, `plan.md`, `tasks.md`). Este plan cubre la generación de esos tres archivos para que FEATURE-05 quede homogénea con el resto del repositorio y pueda marcarse como `✅ Done` en `CLAUDE.md` y `SDD_MASTER.md`.

---

## 2. Fases de Implementación

### Fase A: Auditoría y Relevamiento
**Duración:** 0.5h  
**Dependencias:** Ninguna  
**Entrega:** Contenido de `mod-05_project-management.md` procesado; esquema de datos, catálogo de categorías y proyectos en producción verificados contra el código fuente real.

**Tasks:**
- T-01: Revisar `mod-05_project-management.md` y extraer información canónica
- T-02: Verificar coherencia de IDs, categorías y assets en `src/data/projects.js`
- T-03: Confirmar que `Works.jsx` y `ProjectDetail.jsx` cumplen los FRs del spec

### Fase B: Generación de Documentación SDD
**Duración:** 0.75h  
**Dependencias:** Fase A  
**Entrega:** `spec.md`, `plan.md` y `tasks.md` redactados y coherentes entre sí

**Tasks:**
- T-04: Redactar `spec.md` a partir del template y la información relevada
- T-05: Redactar `plan.md` (este archivo)
- T-06: Redactar `tasks.md` con desglose retroactivo de tareas atómicas

### Fase C: Integración y Cierre
**Duración:** 0.25h  
**Dependencias:** Fase B  
**Entrega:** Repositorio actualizado, FEATURE-05 marcada como Done, commit atómico en `develop`

**Tasks:**
- T-07: Copiar `spec.md`, `plan.md` y `tasks.md` a `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/`
- T-08: Actualizar `CLAUDE.md` — cambiar status FEATURE-05 a `✅ Done`
- T-09: Actualizar `SDD_MASTER.md` — Module Registry + Appendix con links a los tres archivos
- T-10: Agregar entrada en `BITACORA_TECNICA.md`
- T-11: Commit atómico en `develop` con mensaje `docs(feature-05): spec + plan + tasks retroactivos`

---

## 3. Desglose de Tareas (Tasks)

Ver `tasks.md` para detalles granulares de cada T-XX.

---

## 4. Criterios de Definición de Done (DoD)

> Esta feature no tiene Fase de Testing ni Deploy en sentido convencional. Las fases se adaptan a la naturaleza retroactiva y puramente documental del trabajo.

| Fase | Criterios DoD |
|------|---------------|
| A | `mod-05_project-management.md` procesado; datos verificados contra código fuente; sin inconsistencias detectadas |
| B | `spec.md`, `plan.md` y `tasks.md` generados siguiendo los templates estándar del proyecto; coherentes entre sí |
| C | Tres archivos SDD en `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/`; `CLAUDE.md` y `SDD_MASTER.md` actualizados; `BITACORA_TECNICA.md` con entrada; commit atómico merged en `develop` |

---

## 5. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Discrepancias entre `mod-05` y el código fuente real (`projects.js`) | Media | Medio | Verificar el código real antes de redactar el spec; documentar solo lo que existe |
| Assets referenciados en `mod-05` que no existen en `src/assets/` | Baja | Bajo | Listar solo los imports presentes en `projects.js`; no asumir assets no verificados |
| `CLAUDE.md` o `SDD_MASTER.md` con paths incorrectos post-actualización | Baja | Medio | Revisar paths relativos contra la estructura real de `docs/` antes del commit |

---

## 6. Timeline

```
2026-06-13  Fase A — Auditoría y relevamiento de mod-05
2026-06-13  Fase B — Generación de spec.md, plan.md, tasks.md
2026-06-13  Fase C — Integración: actualizar CLAUDE.md, SDD_MASTER.md, BITACORA; commit
```

---

## 7. Roles & Responsabilidades

| Rol | Responsable | Horas |
|-----|-------------|-------|
| Documentación & Review | Leandro Gavegno (ONGEVAG) | 1.5h |

---

## 8. Comunicación & Escalaciones

**Check-ins:** Sesión única — todo se resuelve en el mismo bloque de trabajo  
**Bloqueantes:** Cualquier inconsistencia entre `mod-05` y el código fuente real requiere verificar `projects.js` antes de continuar  
**Cambios de scope:** Si se detecta código que no cumple los FRs del spec, documentarlo como deuda técnica en `BITACORA_TECNICA.md` — no corregir código en este sprint

---

**Próximo paso:** Ejecutar T-07 a T-11 (Fase C) según `tasks.md`
