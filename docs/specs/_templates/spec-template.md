# FEATURE-XX: [Feature Name]
**Spec Version:** 1.0  
**Status:** Draft | In Progress | Accepted  
**Date:** [YYYY-MM-DD]  
**Related ADRs:** [ADR-XXX, ADR-YYY]  
**Owner:** [Name/Team]

---

## 1. Propósito (1 oración exacta)

[Declaración clara de qué resuelve esta feature]

---

## 2. Alcance

### ✅ Incluye
- [Feature aspect 1]
- [Feature aspect 2]
- [Feature aspect 3]

### ❌ Excluye
- [Out of scope 1]
- [Out of scope 2]

---

## 3. Requisitos Funcionales

| ID | Requisito | Descripción | Prioridad |
|----|-----------|-------------|-----------|
| FR-001 | [Nombre] | [Descripción clara] | MUST / SHOULD / COULD |
| FR-002 | [Nombre] | [Descripción clara] | MUST / SHOULD / COULD |

---

## 4. Requisitos No-Funcionales

| ID | Requisito | Target |
|----|-----------|--------|
| NFR-001 | Performance | [e.g., LCP < 2.5s] |
| NFR-002 | Accessibility | [e.g., WCAG 2.1 AA] |
| NFR-003 | Security | [e.g., no hardcoded secrets] |

---

## 5. Especificación Técnica

### Componentes Afectados
```
src/
├── features/[feature-name]/
│   ├── [Component1].jsx
│   ├── [Component2].jsx
│   └── hooks/
│       └── use[Hook].js
├── components/
│   └── [Shared Component].jsx
└── config/
    └── [Config if needed].js
```

### API/Datos (si aplica)
```javascript
// Ejemplo de estructura de datos
const featureData = {
  id: string,
  name: string,
  // ... campos
}
```

### Flujos Principales
- [Flujo A: qué → cómo → resultado]
- [Flujo B: ...]

---

## 6. Criterios de Aceptación

- [ ] Feature implementada sin breaking changes
- [ ] Tests coverage ≥ 70%
- [ ] Performance metrics cumplidas (NFR)
- [ ] Documentación actualizada
- [ ] Code review aprobado
- [ ] Merge a `develop` completado

---

## 7. Consideraciones Especiales

### Accesibilidad
- [ARIA roles, keyboard navigation, etc.]

### Performance
- [Code splitting, lazy loading, optimizaciones]

### Seguridad
- [Input validation, XSS prevention, etc.]

---

## 8. Referencias

- [ADR-XXX: Decisión relacionada]
- [UC-YY: Use case asociado]
- [Link a diseño / mockup]

---

**Próximo paso:** Crear plan.md con desglose de tasks
