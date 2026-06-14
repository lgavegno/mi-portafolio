FEATURE-05: Project Management — Task Breakdown
Formato: Cada T-XX es una tarea atómica (1-2h de trabajo idealmente)
Nota: Esta feature es **retroactiva y puramente documental**. No implica desarrollo de código, testing automatizado ni deploy convencional. Los criterios de aceptación validan consistencia, documentación y actualización de registros.

Fase A: Auditoría y Relevamiento
T-01: [Revisar mod-05_project-management.md y extraer información canónica]
Effort: 0.15h
Dependencies: Ninguna
Acceptance Criteria:
- [ ] Esquema de datos, categorías y estructura de proyectos extraídos sin ambigüedades
- [ ] Identificados todos los campos obligatorios y opcionales
- [ ] Referencias cruzadas con spec.md preliminar validadas
Subtasks:
1. Leer `mod-05_project-management.md` completo
2. Extraer schema de proyecto y catálogo de categorías
3. Documentar hallazgos en borrador local para `spec.md`
Notas:
Este es el punto de partida canónico. Si hay campos obsoletos, marcarlos como deuda técnica.

T-02: [Verificar coherencia de IDs, categorías y assets en src/data/projects.js]
Effort: 0.2h
Dependencies: T-01
Acceptance Criteria:
- [ ] Todos los IDs en `projects.js` son kebab-case, únicos y estables
- [ ] Cada `category` usada existe en `projectCategories`
- [ ] Todos los imports de imágenes existen en `src/assets/`
- [ ] `progress` y `status` son coherentes (100 = completed, <100 = in-progress)
Subtasks:
1. Cruzar IDs y categorías de `projects.js` con `projectCategories`
2. Validar existencia de assets referenciados (`omnistock1.webp`, `faroart1.webp`, etc.)
3. Verificar consistencia progress/status en cada objeto
Notas:
Si algún asset falta, documentar en `BITACORA_TECNICA.md`. No corregir código en este sprint.

T-03: [Confirmar que Works.jsx y ProjectDetail.jsx cumplen los FRs del spec]
Effort: 0.15h
Dependencies: T-02
Acceptance Criteria:
- [ ] `Works.jsx` filtra correctamente por categoría sin recarga
- [ ] `ProjectDetail.jsx` resuelve `/proyecto/:id` y muestra estado de error si no existe
- [ ] Navegación y renderizado visual coincidentes con FR-003 y FR-004
Subtasks:
1. Revisar código de `Works.jsx` (lógica de filtrado y renderizado)
2. Revisar código de `ProjectDetail.jsx` (búsqueda por ID y fallback)
3. Validar manualmente en `npm run dev` que los flujos funcionan
Notas:
Esta tarea es de validación, no de implementación. Registrar discrepancias como deuda técnica.

Fase B: Generación de Documentación SDD
T-04: [Redactar spec.md a partir del template y la información relevada]
Effort: 0.3h
Dependencies: T-03
Acceptance Criteria:
- [ ] `spec.md` generado siguiendo estructura SDD estándar
- [ ] FR-001 a FR-007 y NFR-001 a NFR-004 documentados
- [ ] Esquema de datos, catálogo y flujos principales detallados
- [ ] Criterios de aceptación marcados como pendientes de cierre
Subtasks:
1. Copiar template de spec y completar secciones 1-7
2. Insertar schema JSON y tabla de proyectos en producción
3. Validar contra `mod-05` y código real
Notas:
Mantener lenguaje técnico preciso. Referenciar ADR-002 y ADR-004.

T-05: [Redactar plan.md]
Effort: 0.25h
Dependencies: T-04
Acceptance Criteria:
- [ ] `plan.md` generado con resumen, fases, DoD, riesgos y timeline
- [ ] Fases A, B, C alineadas con naturaleza retroactiva
- [ ] Criterios de Done por fase definidos y verificables
Subtasks:
1. Structurar plan según SDD standard
2. Definir mitigaciones de riesgos y roles
3. Validar coherencia con `tasks.md`
Notas:
Este archivo es el entregable de la tarea actual. Mantener versión 1.0.

T-06: [Redactar tasks.md con desglose retroactivo de tareas atómicas]
Effort: 0.2h
Dependencies: T-05
Acceptance Criteria:
- [ ] `tasks.md` generado siguiendo `tasks-template.md`
- [ ] Todas las tareas T-01 a T-11 detalladas con criterios y subtasks
- [ ] Tabla de estado tracking incluida al final
Subtasks:
1. Adaptar template a tareas documentales
2. Asignar efforts, dependencies y notes
3. Formatear tabla de tracking inicial
Notas:
Este archivo es el entregable de la tarea actual. Usar formato markdown limpio.

Fase C: Integración y Cierre
T-07: [Copiar spec.md, plan.md y tasks.md a docs/specs/FEATURE-05_PROJECT_MANAGEMENT/]
Effort: 0.05h
Dependencies: T-06
Acceptance Criteria:
- [ ] Tres archivos SDD presentes en ruta correcta
- [ ] Permisos y encoding correctos (UTF-8, LF)
- [ ] Sin archivos huérfanos en directorios temporales
Subtasks:
1. Mover archivos a `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/`
2. Verificar integridad y nombres de archivo
3. Confirmar estructura de directorio
Notas:
Mantener `mod-05_project-management.md` como referencia histórica.

T-08: [Actualizar CLAUDE.md — cambiar status FEATURE-05 a ✅ Done]
Effort: 0.05h
Dependencies: T-07
Acceptance Criteria:
- [ ] `CLAUDE.md` actualizado en Module Index
- [ ] Status cambiado de `✅ Active` a `✅ Done`
- [ ] Sin rotura de formato markdown
Subtasks:
1. Localizar tabla Module Index en `CLAUDE.md`
2. Actualizar fila FEATURE-05
3. Validar renderizado en preview
Notas:
Cambiar solo el status. No modificar arquitectura ni stack.

T-09: [Actualizar SDD_MASTER.md — Module Registry + Appendix con links a los tres archivos]
Effort: 0.05h
Dependencies: T-08
Acceptance Criteria:
- [ ] Module Registry actualizado con status `✅ Done`
- [ ] Links a `spec.md`, `plan.md`, `tasks.md` agregados
- [ ] Appendix reflecta estructura actualizada
Subtasks:
1. Actualizar tabla Module Registry en `SDD_MASTER.md`
2. Agregar enlaces en sección Appendix
3. Validar rutas relativas
Notas:
Mantener coherencia con FEATURE-01 a FEATURE-04.

T-10: [Agregar entrada en BITACORA_TECNICA.md]
Effort: 0.05h
Dependencies: T-09
Acceptance Criteria:
- [ ] Entrada fechada (2026-06-13) en bitácora
- [ ] Resumen: liquidación deuda técnica documental FEATURE-05
- [ ] Links a spec/plan/tasks incluidos
Subtasks:
1. Abrir `BITACORA_TECNICA.md`
2. Agregar registro cronológico
3. Guardar y validar formato
Notas:
Usar formato estándar: `[Fecha] | [Feature] | [Acción] | [Enlaces]`

T-11: [Commit atómico en develop con mensaje docs(feature-05): spec + plan + tasks retroactivos]
Effort: 0.05h
Dependencies: T-10
Acceptance Criteria:
- [ ] Solo archivos de documentación agregados/modificados
- [ ] Mensaje de commit convencional y descriptivo
- [ ] Merge a `develop` exitoso
Subtasks:
1. `git add docs/specs/FEATURE-05_PROJECT_MANAGEMENT/ CLAUDE.md SDD_MASTER.md BITACORA_TECNICA.md`
2. `git commit -m "docs(feature-05): spec + plan + tasks retroactivos"`
3. Push y verificar en `develop`
Notas:
No incluir cambios en `src/`. Commit puramente documental.

Estado Tracking:
| Task | Status | Effort Actual | Blocker | Notes |
| --- | --- | --- | --- | --- |
| T-01 | ⏳ Pending | — | — | — |
| T-02 | ⏳ Pending | — | T-01 | — |
| T-03 | ⏳ Pending | — | T-02 | — |
| T-04 | ⏳ Pending | — | T-03 | — |
| T-05 | ⏳ Pending | — | T-04 | — |
| T-06 | ⏳ Pending | — | T-05 | — |
| T-07 | ⏳ Pending | — | T-06 | — |
| T-08 | ⏳ Pending | — | T-07 | — |
| T-09 | ⏳ Pending | — | T-08 | — |
| T-10 | ⏳ Pending | — | T-09 | — |
| T-11 | ⏳ Pending | — | T-10 | — |

Próximo paso: Ejecutar tareas en orden (Fase A → B → C), marcar `[x]` en criterios de aceptación y actualizar tabla de tracking conforme se completen.