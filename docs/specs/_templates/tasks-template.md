# FEATURE-XX: [Feature Name] — Task Breakdown

**Formato:** Cada T-XX es una tarea atómica (1-2h de trabajo idealmente)

---

## Fase A: Setup / Foundation

### T-01: [Setup Initial Files & Folder Structure]
**Effort:** 0.5h  
**Acceptance Criteria:**
- [ ] Folder `src/features/[feature-name]/` creada
- [ ] Archivos iniciales creados: index.jsx, hook.js
- [ ] Build sin errores: `npm run build`

**Subtasks:**
1. Create folder structure
2. Create export index
3. Verify imports work

**Notas:**
- Verificar que no hay conflictos con imports existentes

---

### T-02: [Create Core Component]
**Effort:** 1.5h  
**Dependencies:** T-01  
**Acceptance Criteria:**
- [ ] Componente renderiza sin errores
- [ ] Props documentadas via JSDoc
- [ ] Accesible (ARIA labels si aplica)

**Subtasks:**
1. Scaffold component structure
2. Add JSDoc comments
3. Test render en dev server

---

### T-03: [Integrate with Existing Routes]
**Effort:** 0.5h  
**Dependencies:** T-02  
**Acceptance Criteria:**
- [ ] Feature visible en app
- [ ] Routing funciona
- [ ] No console errors

**Subtasks:**
1. Add route in App.jsx / Router
2. Verify navigation
3. Check responsive breakpoints

---

## Fase B: Core Implementation

### T-04: [Implement Feature Logic]
**Effort:** 2h  
**Dependencies:** T-03  
**Acceptance Criteria:**
- [ ] FR-001 implementado
- [ ] FR-002 implementado
- [ ] State management (hooks/context) funciona
- [ ] Linting passes: `npm run lint`

**Subtasks:**
1. Implement FR-001
2. Implement FR-002
3. Add error handling
4. Test in browser

---

### T-05: [Add Animations / Styling]
**Effort:** 1h  
**Dependencies:** T-04  
**Acceptance Criteria:**
- [ ] Tailwind classes aplicadas
- [ ] Framer Motion animations implementadas (si aplica)
- [ ] Responsive en mobile/tablet/desktop
- [ ] Dark mode compatible

---

### T-06: [Integrate External Services (si aplica)]
**Effort:** 1h  
**Dependencies:** T-05  
**Acceptance Criteria:**
- [ ] API calls / EmailJS / etc. integrado
- [ ] Error handling implementado
- [ ] env vars están en .env.example
- [ ] No secrets en código

---

## Fase C: Testing & QA

### T-07: [Unit Tests]
**Effort:** 1.5h  
**Dependencies:** T-06  
**Acceptance Criteria:**
- [ ] Unit tests creados para funciones puras
- [ ] Coverage > 70% para el componente
- [ ] `npm run test:coverage` muestra el coverage

**Test files:**
- `src/__tests__/[feature-name].test.js`

---

### T-08: [Integration Tests]
**Effort:** 1h  
**Dependencies:** T-07  
**Acceptance Criteria:**
- [ ] Component integration tests creados
- [ ] User interactions testeadas (clicks, form submissions, etc.)
- [ ] Accessibility tests (ARIA, keyboard nav)

---

### T-09: [Performance & Manual QA]
**Effort:** 1h  
**Dependencies:** T-08  
**Acceptance Criteria:**
- [ ] Lighthouse audit cumple targets (LCP, CLS, etc.)
- [ ] Manual testing: forma de navegación funciona
- [ ] No performance regressions en otros features
- [ ] Mobile UX verificada en real device / emulator

---

## Fase D: Documentation & Deploy

### T-10: [Update Documentation]
**Effort:** 0.5h  
**Dependencies:** T-09  
**Acceptance Criteria:**
- [ ] spec.md actualizado (si hubo cambios)
- [ ] plan.md actualizado con resultados reales
- [ ] BITACORA_TECNICA.md entrada agregada
- [ ] CONTRIBUTING.md actualizado (si hay nuevos patterns)

---

### T-11: [Code Review & Merge]
**Effort:** 0.5h  
**Dependencies:** T-10  
**Acceptance Criteria:**
- [ ] PR creado con descripción clara
- [ ] Review aprobado (0 bloqueantes)
- [ ] Merge a `develop` completado
- [ ] CI/CD pasa (si está configurado)

**PR Checklist:**
- [ ] Título claro y convencional (feat:, fix:, etc.)
- [ ] Description con resumen + testing notes
- [ ] Referencia a spec.md y plan.md
- [ ] No merge commits, rebase limpio

---

### T-12: [Verify in Staging]
**Effort:** 0.5h  
**Dependencies:** T-11  
**Acceptance Criteria:**
- [ ] Feature visible en staging (si existe)
- [ ] Redeploy a producción planificado
- [ ] Post-launch checklist completado

---

## Plantilla para Nueva Tarea

```markdown
### T-XX: [Task Name]
**Effort:** [Xh]  
**Dependencies:** T-YY, T-ZZ (o "Ninguna")  
**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Subtasks:**
1. Subtask A
2. Subtask B

**Notas:**
- [Contexto, blockers, referencias]
```

---

**Estado Tracking:**

| Task | Status | Effort Actual | Blocker | Notes |
|------|--------|---------------|---------|-------|
| T-01 | ✅ Done | 0.5h | — | — |
| T-02 | 🔄 In Progress | 1h / 1.5h | — | — |
| T-03 | ⏳ Pending | — | T-02 | — |
| T-04 | ⏳ Pending | — | T-03 | — |

---

**Próximo paso:** Ejecutar tareas en orden, actualizar status
