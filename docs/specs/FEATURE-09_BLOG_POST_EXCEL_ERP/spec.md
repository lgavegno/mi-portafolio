# FEATURE-09: Blog Post — Integración Excel + ERP

**Spec Version:** 1.1
**Status:** Draft
**Date:** 2026-07-06
**Related ADRs:** ADR-004 (Feature-Based Architecture), ADR-007 (ES Default Content)
**Owner:** Ongevag

> **Actualización v1.1:** El sitio ahora sirve 3 locales (ES canónico, EN, PT — ver FEATURE-10_PT_LOCALE). Este artículo debe publicarse en `blogData.es.js`, `blogData.en.js` y `blogData.pt.js` con el mismo slug en los tres, siguiendo el patrón de traducción ya establecido en esa feature (marcador `TODO(leo)` en las traducciones EN/PT hasta revisión).

---

## 1. Propósito (1 oración exacta)

Crear un caso de estudio técnico que muestre cómo se automatizó la sincronización entre una planilla de Excel y un ERP sin modificar el flujo de trabajo del usuario final.

---

## 2. Alcance

### ✅ Incluye

* Redacción de un artículo técnico orientado a potenciales clientes.
* Explicación del problema de negocio y la solución implementada.
* Descripción de la arquitectura general sin revelar información confidencial.
* Integración del artículo al módulo Blog del portfolio.
* **Publicación trilingüe: ES (canónico), EN y PT — mismo slug en los tres `blogData.{locale}.js`.**
* Optimización SEO siguiendo la arquitectura existente del proyecto.

### ❌ Excluye

* Publicación de código fuente utilizado para el cliente.
* Publicación de endpoints, credenciales o tokens.
* Mención de empresas, clientes o nombres comerciales.
* Información que permita identificar la infraestructura del cliente.

---

## 3. Requisitos Funcionales

| ID     | Requisito             | Descripción                                                                                  | Prioridad |
| ------ | --------------------- | -------------------------------------------------------------------------------------------- | --------- |
| FR-001 | Caso de estudio       | El artículo debe narrar un problema real resuelto durante un proyecto profesional.           | MUST      |
| FR-002 | Anonimización         | Toda referencia al cliente deberá eliminarse completamente.                                  | MUST      |
| FR-003 | Explicación técnica   | Explicar la solución desde un punto de vista arquitectónico y funcional.                     | MUST      |
| FR-004 | Orientación comercial | El contenido debe generar confianza en potenciales clientes sin transformarse en publicidad. | MUST      |
| FR-005 | Lectura sencilla      | Debe poder ser comprendido tanto por perfiles técnicos como por responsables de negocio.     | SHOULD    |
| FR-006 | CTA final             | Finalizar invitando al lector a conversar sobre automatizaciones similares.                  | SHOULD    |

---

## 4. Requisitos No-Funcionales

| ID      | Requisito        | Target                                                     |
| ------- | ---------------- | ---------------------------------------------------------- |
| NFR-001 | Performance      | No afectar métricas Lighthouse existentes del Blog         |
| NFR-002 | SEO              | Mantener estructura H1/H2/H3 y buenas prácticas existentes |
| NFR-003 | Seguridad        | No divulgar información sensible del cliente               |
| NFR-004 | Confidencialidad | Anonimización completa del proyecto                        |
| NFR-005 | Legibilidad      | Tiempo estimado de lectura entre 5 y 8 minutos             |

---

## 5. Especificación Técnica

### Componentes Afectados

```
src/
├── features/
│   └── blog/
│       └── data/
│           ├── blogData.es.js   ← nueva entrada (canónica)
│           ├── blogData.en.js   ← nueva entrada (traducción)
│           └── blogData.pt.js   ← nueva entrada (traducción)
│
└── pages/
    ├── BlogIndex.jsx
    └── BlogPostDetail.jsx
```

Nota: la integración real usa `src/features/blog/data/blogData.{locale}.js` (no `BlogPage.jsx`, que no existe en la arquitectura actual) — ver `src/pages/BlogIndex.jsx` y `src/pages/BlogPostDetail.jsx`.

### Datos del artículo

```javascript
const post = {
  slug: "como-conectamos-excel-con-un-erp",
  title: "Cómo transformamos una planilla de Excel en una herramienta conectada a un ERP",
  category: "Automatización",
  tags: [
    "Excel",
    "ERP",
    "VBA",
    "Automatización",
    "API",
    "Integraciones"
  ]
}
```

### Flujos Principales

* Presentación del problema de negocio.
* Contexto inicial del proceso manual.
* Restricciones del proyecto.
* Arquitectura de la solución.
* Sincronización de datos.
* Manejo de límites de la API.
* Actualización automática del stock.
* Resultados obtenidos.
* Conclusiones y aprendizajes.
* Call To Action.

---

## 6. Criterios de Aceptación

* [x] El artículo mantiene completamente el anonimato del cliente.
* [x] No existen nombres comerciales, URLs, APIs ni credenciales.
* [x] La solución puede comprenderse sin conocer el código fuente.
* [x] El contenido aporta valor técnico real.
* [x] El artículo sigue el estilo editorial del blog.
* [x] SEO compatible con el resto del portfolio.
* [ ] Code Review aprobado.
* [ ] Merge a `develop` completado.
* [x] Artículo presente con el mismo slug en `blogData.es.js`, `blogData.en.js` y `blogData.pt.js`.
* [x] Traducciones EN/PT marcadas `// TODO(leo): revisar traducción` hasta aprobación (mismo patrón que FEATURE-10).

---

## 7. Consideraciones Especiales

### Accesibilidad

* Lenguaje claro.
* Párrafos cortos.
* Títulos descriptivos.
* Código reducido al mínimo indispensable.
* Imágenes únicamente si están completamente anonimizadas.

### Performance

* Reutilizar la infraestructura actual del Blog.
* No agregar librerías.
* Mantener lazy loading existente.

### Seguridad

Queda estrictamente prohibido publicar:

* nombres del cliente;
* nombre del ERP;
* endpoints;
* URLs;
* tokens;
* credenciales;
* capturas con información sensible;
* identificadores internos;
* estructuras JSON reales;
* nombres de tablas;
* nombres de variables del proyecto;
* código fuente perteneciente al cliente.

Todo ejemplo utilizado deberá ser ilustrativo.

---

## 8. Referencias

* ADR-004 — Arquitectura Feature-Based.
* ADR-007 — Español como idioma principal.
* FEATURE-03_AEO_SCHEMA.
* FEATURE-05_PROJECT_MANAGEMENT.

---

**Próximo paso:** Crear `plan.md` definiendo la estrategia editorial, la estructura del artículo, las tareas de implementación y la integración dentro del módulo Blog.
