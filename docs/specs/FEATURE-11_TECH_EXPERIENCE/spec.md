# FEATURE-11: Tech Experience

**Spec Version:** 1.0
**Status:** Done
**Date:** 2026-08-24
**Related ADRs:** ADR-004 (Feature-Based Architecture), ADR-007 (ES Default Content), ADR-010 (No i18n lib)
**Owner:** Ongevag

---

## 1. Propósito (1 oración exacta)

Agregar una sección de portfolio con casos de estudio técnicos anonimizados (implementaciones Odoo/ERP, ETL, migraciones de datos) que muestren criterio de ingeniería sin exponer nombres de cliente ni datos de negocio.

---

## 2. Alcance

### ✅ Incluye

* Componente `TechExperience.jsx` con acordeón de 4 casos (label, título, resumen, bullets de puntos técnicos, stack).
* Grid de grupos de herramientas (Análisis y ETL / ERP y backend / Control de versiones).
* Contenido i18n completo en `src/locales/{es,en,pt}/experience.js`, consumido vía `useLocale()` (ADR-010 — sin librería externa).
* Animaciones con Framer Motion (stagger + spring), respeta el patrón del resto del sitio.

### ❌ Excluye

* Nombres de clientes, sistemas legados, CUITs, SKUs o cualquier dato operativo real.
* Capturas de pantalla o código fuente perteneciente a clientes.

---

## 3. Requisitos Funcionales

| ID     | Requisito           | Descripción                                                                 | Prioridad |
| ------ | ------------------- | ---------------------------------------------------------------------------- | --------- |
| FR-001 | Casos anonimizados   | 4 casos de estudio sin datos identificables de cliente.                     | MUST      |
| FR-002 | i18n completo        | Contenido disponible en ES (canónico), EN y PT con la misma estructura.     | MUST      |
| FR-003 | Acordeón accesible   | Expand/collapse por caso, `aria-expanded` en el trigger.                    | MUST      |
| FR-004 | Stack por caso       | Cada caso lista las tecnologías usadas.                                     | SHOULD    |

---

## 4. Especificación Técnica

### Componentes Afectados

```
src/
├── features/
│   └── experience/
│       └── TechExperience.jsx   ← componente principal (header, toolGroups, acordeón de cases)
└── locales/
    ├── es/experience.js         ← contenido canónico
    ├── en/experience.js
    └── pt/experience.js
```

`LocaleProvider.jsx` registra `experience` en los tres `localeFiles` (mismo patrón que `hero`, `services`, etc.).

### Forma de los datos

```javascript
{
  header: { eyebrow, title, intro },
  toolGroups: [{ group, tools: [string] }],
  cases: [{ label, title, summary, points: [string], skills: [string] }],
}
```

---

## 5. Criterios de Aceptación

* [x] 4 casos con estructura de datos idéntica en los 3 locales.
* [x] Sin nombres de cliente ni datos operativos reales.
* [x] Acordeón funcional, accesible (`aria-expanded`).
* [x] `npm run build` y `npm run test` pasan sin regresiones (72/72).
* [x] Integrado y funcionando en `develop`.

---

## 6. Referencias

* ADR-004 — Arquitectura Feature-Based.
* ADR-007 — Español como idioma principal.
* ADR-010 — No i18n lib externa (locale files planos).
* FEATURE-10_PT_LOCALE — patrón de locale trilingüe reutilizado.
