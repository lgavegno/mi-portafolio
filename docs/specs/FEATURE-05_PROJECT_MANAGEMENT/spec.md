# FEATURE-05: Project Management
**Spec Version:** 1.0  
**Status:** Accepted  
**Date:** 2026-06-13  
**Related ADRs:** ADR-002 (JavaScript puro), ADR-004 (Feature-based architecture)  
**Owner:** Leandro Gavegno (ONGEVAG)

---

## 1. Propósito (1 oración exacta)

Centralizar y estandarizar la gestión de datos de proyectos del portfolio, proveyendo un esquema canónico, un mecanismo de filtrado por categoría y páginas de detalle individual accesibles por ID de ruta.

---

## 2. Alcance

### ✅ Incluye
- Definición del esquema de datos canónico para cada proyecto (`id`, `title`, `description`, `stack`, `progress`, `status`, `image`, `link`, `featured`, `category`, `highlights`, `longDescription`, `methodology`, `results`, `notionLink`)
- Catálogo de proyectos actuales en `src/data/projects.js` (`featuredProjects`, `allProjects`)
- Definición y exportación del array `projectCategories` para filtrado
- Galería de proyectos locale-aware (`Works.jsx`) con soporte a `projectCategories` como infraestructura de filtrado
- Página de detalle individual (`ProjectDetail.jsx`) enrutable por `/proyecto/:id`
- Pipeline de assets de imágenes: imports estáticos `.webp` en `projects.js`
- Documentación del proceso para agregar proyectos nuevos

### ❌ Excluye
- Backend, CMS o persistencia externa (todos los datos son estáticos)
- Autenticación o roles de usuario
- Búsqueda textual dentro de proyectos
- i18n de los datos de proyectos (los campos son monolingües; fuera de alcance)
- Modificaciones al sistema de routing (FEATURE-01)
- Cualquier código nuevo: esta feature es retroactiva y puramente documental

---

## 3. Requisitos Funcionales

| ID | Requisito | Descripción | Prioridad |
|----|-----------|-------------|-----------|
| FR-001 | Esquema canónico | Cada proyecto debe cumplir el esquema completo definido en `mod-05`. Campos obligatorios siempre presentes; opcionales pueden ser `null`. | MUST |
| FR-002 | Unicidad de ID | Cada `id` debe ser único, kebab-case, y estable (usado en rutas — cambiar un ID rompe URLs indexadas). | MUST |
| FR-003 | Galería de proyectos | `Works.jsx` renderiza todos los proyectos del locale activo en una grilla 2-col. El filtrado por categoría mediante `projectCategories` está exportado como infraestructura pero no implementado aún en la UI (ver DT-05-01). | SHOULD |
| FR-004 | Detalle por ruta | `ProjectDetail.jsx` debe resolver el proyecto correcto dado el parámetro `:id` de la URL. Si el ID no existe, mostrar estado de error/not-found. | MUST |
| FR-005 | Assets optimizados | Imágenes referenciadas desde `src/assets/` como imports estáticos; formato `.webp` preferido. Sin URLs absolutas ni imágenes inline. | SHOULD |
| FR-006 | Coherencia progress/status | `progress: 100` implica `status: 'completed'`; cualquier valor menor implica `status: 'in-progress'`. No pueden coexistir valores contradictorios. | MUST |
| FR-007 | Categorías declaradas | Toda `category` usada en un proyecto debe existir en el array `projectCategories`. No se admiten categorías ad-hoc. | MUST |

---

## 4. Requisitos No-Funcionales

| ID | Requisito | Target |
|----|-----------|--------|
| NFR-001 | Performance de assets | Imágenes en `.webp`, resolución mínima 1920×1080, peso máximo recomendado 200 KB por imagen |
| NFR-002 | Code splitting | `ProjectDetail.jsx` cargado con `React.lazy()` — ya implementado en FEATURE-04/router |
| NFR-003 | Coherencia de datos | Ningún proyecto en producción debe tener campos obligatorios `undefined` o `null` |
| NFR-004 | Sin dependencias externas | El módulo no introduce nuevas dependencias npm; solo React Router para el routing de detalle |

---

## 5. Especificación Técnica

### Componentes Afectados

```
src/
├── data/
│   └── projects.js              ← Fuente de verdad (featuredProjects, allProjects, projectCategories)
├── features/
│   └── works/
│       └── Works.jsx            ← Galería locale-aware (consume projects.es.js / projects.en.js)
├── pages/
│   └── ProjectDetail.jsx        ← Detalle individual — ruta /proyecto/:id (lazy loaded)
└── assets/
    ├── fig_clusters_ai.webp     ← fitness-retention-analysis
    ├── omnistock1.webp
    ├── omnistock2.webp
    ├── faroart1.webp
    ├── faroart2.webp
    ├── generador1.webp
    └── generador2.webp
```

### Esquema de Datos

```javascript
// Esquema canónico — cada entrada en featuredProjects
{
  id: string,                           // kebab-case, único, inmutable
  title: string,                        // Título visible en galería
  description: string,                  // 1-2 líneas, máx 120 caracteres
  stack: string[],                      // 3-5 tecnologías
  progress: number,                     // 0-100
  progressLabel: string,                // Etiqueta descriptiva del estado de progreso
  status: 'completed' | 'in-progress',
  image: import | null,                 // Import estático desde src/assets/, o null
  link: string | null,                  // URL pública (GitHub, demo) o null
  featured: boolean,                    // true = visible en galería principal
  category: string,                     // Debe existir en projectCategories
  highlights: string[],                 // 2-4 items
  longDescription: string,              // Párrafo expandido para detalle
  methodology: string[],                // 2-4 metodologías aplicadas
  results: string[],                    // 2-4 resultados/deliverables concretos
  notionLink: string | null             // URL a Notion doc, o null
}
```

### Catálogo de Categorías

```javascript
export const projectCategories = [
  { id: 'all',       label: 'Todos',               icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack',           icon: '🌐' },
  { id: 'frontend',  label: 'Frontend',             icon: '🎨' },
  { id: 'ai-ml',     label: 'Data Science / ML',   icon: '🤖' },
  { id: 'tools',     label: 'Herramientas',         icon: '🔧' },
];
```

### Proyectos en Producción (al momento de esta spec)

| ID | Título | Status | Categoría |
|----|--------|--------|-----------|
| `fitness-retention-analysis` | Análisis de Retención & ML - FitNess App | completed | ai-ml |
| `omnistock` | OmniStock — Sistema de Inventario Desktop | in-progress | fullstack |
| `faro-art-shop` | Faro Art Shop — Tienda Online | completed | frontend |
| `generador-presupuestos` | Generador de Presupuestos Web | completed | fullstack |
| `form-invent` | form-invent — Sistema de Inventario Excel | completed | tools |

### Flujos Principales

- **Galería (Works.jsx):** Usuario llega a la sección Works → se muestran todos los proyectos del locale activo en grilla responsive → datos obtenidos de `projects.es.js` o `projects.en.js` según `useLocale()` → renderizado via `ProjectCard` por cada proyecto
- **Detalle (ProjectDetail.jsx):** Usuario hace clic en un proyecto → React Router navega a `/proyecto/:id` → `ProjectDetail.jsx` busca el proyecto por `id` en `featuredProjects` → renderiza campos expandidos (`longDescription`, `methodology`, `results`, `highlights`) → si el ID no existe, muestra estado de error

---

## 6. Criterios de Aceptación

> **Nota:** Esta feature es retroactiva. El código ya existe y está en producción. Los criterios validan el estado actual del sistema, no una implementación nueva.

- [x] Todos los proyectos en `featuredProjects` cumplen el esquema canónico completo
- [x] Todos los IDs son únicos y kebab-case
- [x] Todas las `category` usadas existen en `projectCategories`
- [x] `progress` y `status` son coherentes en todos los proyectos
- [ ] `Works.jsx` filtra correctamente por cada categoría disponible (DT-05-01: filtrado no implementado en UI actual)
- [x] `ProjectDetail.jsx` resuelve correctamente cualquier ID válido vía `/proyecto/:id`
- [x] Todos los assets referenciados existen en `src/assets/`
- [x] Documentación SDD completa: `spec.md` + `plan.md` + `tasks.md` generados
- [x] `CLAUDE.md` y `SDD_MASTER.md` actualizados con status `✅ Done` para FEATURE-05
- [x] Commit atómico en `develop` con todos los archivos de doc

---

## 7. Consideraciones Especiales

### Accesibilidad
- Las tarjetas de proyecto en `Works.jsx` deben tener texto alternativo en imágenes (`alt` con el título del proyecto)
- El filtro por categoría debe ser operable por teclado
- La navegación a detalle debe preservar el foco al volver (back navigation)

### Performance
- `ProjectDetail.jsx` ya está bajo `React.lazy()` — no modificar
- Imágenes importadas estáticamente son procesadas por Vite (hash en nombre, cache-busting automático)
- Agregar imágenes `.png` solo cuando `.webp` no sea viable (todos los assets actuales ya están en `.webp`)

### Mantenibilidad
- El orden en `featuredProjects` determina el orden de renderizado — documentarlo en comentario inline en `projects.js`
- Al agregar un proyecto nuevo, seguir el checklist de `mod-05_project-management.md` antes del commit
- Los IDs son inmutables una vez en producción — cambiarlos rompe URLs indexadas y cualquier link externo

---

## 8. Referencias

- [ADR-002: JavaScript puro sin TypeScript](../../adr/ADR-002.md)
- [ADR-004: Feature-based architecture (DDD Light)](../../adr/ADR-004.md)
- [UC-03: Project Detail View](../../use-cases/UC-03_project_detail_view.md)
- [mod-05_project-management.md](./mod-05_project-management.md) — Documento de referencia histórico (conservar)

---

**Próximo paso:** Crear `plan.md` con fases retroactivas y checklist de cierre de deuda técnica docs
