# FEATURE-XX: [Feature Name] — Plan de Implementación
**Plan Version:** 1.0  
**Status:** Draft | In Progress | Completed  
**Total Estimated Effort:** [Xh]  
**Start Date:** [YYYY-MM-DD]  
**Target Completion:** [YYYY-MM-DD]

---

## 1. Resumen Ejecutivo

[1-2 párrafos: qué se hace, por qué, cuándo]

---

## 2. Fases de Implementación

### Fase A: [Setup / Foundation]
**Duración:** [Xh]  
**Dependencias:** Ninguna / [otras features]  
**Entrega:** [qué se completa]

**Tasks:**
- T-01: [Task name] — [subtasks si aplica]
- T-02: [Task name]
- T-03: [Task name]

### Fase B: [Core Implementation]
**Duración:** [Xh]  
**Dependencias:** Fase A  
**Entrega:** [qué se completa]

**Tasks:**
- T-04: [Task name]
- T-05: [Task name]
- T-06: [Task name]

### Fase C: [Testing & QA]
**Duración:** [Xh]  
**Dependencias:** Fase B  
**Entrega:** Tests, coverage report

**Tasks:**
- T-07: Unit tests
- T-08: Integration tests
- T-09: Performance audit

### Fase D: [Documentation & Deploy]
**Duración:** [Xh]  
**Dependencias:** Fase C  
**Entrega:** PR merged, docs updated

**Tasks:**
- T-10: Update documentation
- T-11: Code review & merge
- T-12: Verify in staging

---

## 3. Desglose de Tareas (Tasks)

Ver `tasks.md` para detalles granulares de cada T-XX.

---

## 4. Criterios de Definición de Done (DoD)

**Por Fase:**

| Fase | Criterios DoD |
|------|---------------|
| A | Setup completado, todos los archivos creados, build sin errores |
| B | Todos los FR implementados, tests pasando, no hay warnings de linting |
| C | Coverage ≥ 70%, performance targets cumplidas, accessibility checked |
| D | PR aprobado, merge a develop, docs actualizados, BITACORA entrada |

---

## 5. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| [Riesgo 1] | Alta / Media / Baja | Alto / Medio / Bajo | [Plan B] |
| [Riesgo 2] | — | — | — |

---

## 6. Timeline

```
[YYYY-MM-DD] Feature kickoff (Fase A)
[YYYY-MM-DD] Core implementation (Fase B)
[YYYY-MM-DD] Testing (Fase C)
[YYYY-MM-DD] Merge a develop (Fase D)
```

---

## 7. Roles & Responsabilidades

| Rol | Responsable | Horas |
|-----|-------------|-------|
| Development | [Name] | [Xh] |
| Testing | [Name] | [Xh] |
| Review | [Name] | [Xh] |

---

## 8. Comunicación & Escalaciones

**Check-ins:** [Diario / 2x semana / Weekly]  
**Bloqueantes:** Escalate a [Owner]  
**Cambios de scope:** Rerun estimation, update plan

---

**Próximo paso:** Ejecutar Fase A según tasks.md
