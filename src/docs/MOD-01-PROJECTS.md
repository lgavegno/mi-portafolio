# MOD-01 — Módulo de Proyectos

## Propósito
Gestión centralizada de datos de proyectos destacados del portfolio. Define la fuente de verdad para todos los proyectos mostrados en las vistas: `/projects`, project detail pages, y componentes relacionados.

---

## Archivos del Módulo

| Archivo | Rol |
|---------|-----|
| `src/data/projects.js` | Fuente de datos — arrays `featuredProjects` y `allProjects` |
| `src/pages/ProjectDetail.jsx` | Página de detalle individual por ID |
| `src/features/works/Works.jsx` | Galería filtrable de proyectos |
| `src/assets/*.webp` | Imágenes de proyectos (formatos optimizados) |

---

## Esquema de Datos

Cada proyecto en `featuredProjects` respeta este esquema completo:

```javascript
{
  id: string,                           // ID único — usado en rutas y referencias
  title: string,                        // Título mostrado en la galería
  description: string,                  // Descripción breve (1-2 líneas, 120 caracteres máx)
  stack: string[],                      // Array de tecnologías usadas
  progress: number,                     // 0-100 — porcentaje de completitud
  progressLabel: string,                // Etiqueta descriptiva del progreso (ej: "Finalizado: ...")
  status: 'completed' | 'in-progress',  // Estado del proyecto
  image: import | null,                 // Referencia importada a imagen webp, o null
  link: string | null,                  // URL externa (GitHub, demo, etc) o null
  featured: boolean,                    // true = visible en galerías principales
  category: string,                     // Categoría para filtrado ('ai-ml', 'fullstack', etc)
  highlights: string[],                 // Array 2-4 destacados clave del proyecto
  longDescription: string,              // Descripción expandida (párrafo o dos)
  methodology: string[],                // Array de metodologías/técnicas aplicadas
  results: string[],                    // Array de resultados/deliverables concretos
  notionLink: string | null             // Link a Notion doc, o null
}
```

### Campos Obligatorios vs Opcionales

**Obligatorios (siempre presentes):**
- `id`, `title`, `description`, `stack`, `progress`, `progressLabel`, `status`, `featured`, `category`
- `highlights`, `longDescription`, `methodology`, `results`

**Opcionales (pueden ser `null`):**
- `image` — null si no hay asset
- `link` — null si proyecto no tiene URL pública
- `notionLink` — null si no hay documentación en Notion

---

## Proyectos Actuales (Sprint 7+8)

| ID | Título | Status | Categoría | Link |
|----|--------|--------|-----------|------|
| `fitness-retention-analysis` | Análisis de Retención & ML - FitNess App | ✅ Completed | ai-ml | GitHub |
| `omnistock` | OmniStock — Sistema de Inventario Desktop | 🔨 In-Progress | fullstack | null |
| `faro-art-shop` | Faro Art Shop — Tienda Online | ✅ Completed | frontend | Live |
| `generador-presupuestos` | Generador de Presupuestos Web | ✅ Completed | fullstack | Live |
| `form-invent` | form-invent — Sistema de Inventario Excel | ✅ Completed | tools | null |

### Totales por Categoría

```
Categoría      | Proyectos
---------------|----------
AI/ML          | 1
Full Stack     | 2
Frontend       | 1
Tools          | 1
TOTAL          | 5
```

---

## Cómo Agregar un Proyecto Nuevo

### Paso 1: Preparar Assets
1. Colocar imagen en `src/assets/` (formato `.webp` preferido)
2. Nombre: descriptivo y lowercase (ej: `proyecto-name.webp`)

### Paso 2: Agregar Import
En `src/data/projects.js`, línea superior con otros imports:
```javascript
import proyectoImg from '../assets/proyecto-name.webp';
```

### Paso 3: Crear Objeto
Copiar plantilla del esquema arriba y completar TODOS los campos obligatorios.

**Ejemplo mínimo:**
```javascript
{
  id: 'proyecto-nuevo',
  title: 'Nombre del Proyecto',
  description: 'Breve descripción en 1-2 líneas.',
  stack: ['Tech1', 'Tech2', 'Tech3'],
  progress: 50,
  progressLabel: 'En desarrollo: Fase de testing',
  status: 'in-progress',
  image: proyectoImg,
  link: 'https://github.com/...',
  featured: true,
  category: 'fullstack',
  highlights: ['Destaque 1', 'Destaque 2', 'Destaque 3'],
  longDescription: 'Párrafo explicativo más detallado...',
  methodology: ['Metodología 1', 'Metodología 2'],
  results: ['Resultado 1', 'Resultado 2'],
  notionLink: null
}
```

### Paso 4: Agregar a Array
Insertar en `featuredProjects` respetando orden (normalmente al inicio o por importancia).

### Paso 5: Commit
```bash
git add src/data/projects.js src/assets/proyecto-name.webp
git commit -m "content: agregar proyecto 'Nombre del Proyecto'"
```

---

## Categorías Disponibles

```javascript
export const projectCategories = [
  { id: 'all', label: 'Todos', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'ai-ml', label: 'Data Science / ML', icon: '🤖' },
  { id: 'tools', label: 'Herramientas', icon: '🔧' }
];
```

**Agregar nueva categoría:**
1. Editar array `projectCategories` en `projects.js`
2. Usar ese nuevo `id` en proyectos nuevos
3. Actualizar esta tabla en MOD-01-PROJECTS.md

---

## Importaciones de Assets

Todas las imágenes deben estar importadas al inicio de `src/data/projects.js`:

```javascript
// Fitness
import fitnessImg from '../assets/fig_clusters_ai.png';

// OmniStock
import omnistock1Img from '../assets/omnistock1.webp';
import omnistock2Img from '../assets/omnistock2.webp';

// Faro Art Shop
import faroart1Img from '../assets/faroart1.webp';
import faroart2Img from '../assets/faroart2.webp';

// Generador de Presupuestos
import generador1Img from '../assets/generador1.webp';
import generador2Img from '../assets/generador2.webp';
```

---

## Notas Importantes

1. **IDs únicos:** Cada `id` debe ser único y kebab-case.
2. **Links opcionales:** No forzar URL si no hay public demo/repo.
3. **Progress & Status:** Mantener alineados (100% + in-progress es contradictorio).
4. **Imágenes:** Preferir `.webp` para performance. `.png` solo si es necesario.
5. **Notion Links:** Documentar productos complejos en Notion, linkear aquí.
6. **Order matters:** El orden en `featuredProjects` es el orden de renderizado.

---

## Checklist para Agregar Proyecto

- [ ] Asset preparado (`.webp` preferido, 1920x1080 mínimo)
- [ ] Import agregado a `projects.js`
- [ ] Todos los campos obligatorios completados
- [ ] `id` es único y kebab-case
- [ ] `stack` tiene 3-5 tecnologías
- [ ] `highlights` tiene 2-4 items
- [ ] `methodology` tiene 2-4 items
- [ ] `results` tiene 2-4 items
- [ ] Status y progress coherentes
- [ ] Link verificado (si aplica)
- [ ] Notión link agregado o null
- [ ] Categoría existe en `projectCategories`
- [ ] Build pasa sin errores (`npm run build`)
- [ ] Commit atómico con mensaje claro

---

## Changelog (Sprint 7+8)

- **2026-04-11:** Sprint 7+8 refactor
  - Eliminados: sistema-reservas, sistema-gestion, procesamiento-documentos
  - Agregados: omnistock, faro-art-shop, generador-presupuestos, form-invent
  - Nuevas categorías: frontend, tools
  - Actualizado: referencias .png → .webp
