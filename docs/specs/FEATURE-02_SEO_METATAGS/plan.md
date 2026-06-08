# FEATURE-02: SEO Meta Tags & Open Graph — Plan de Implementación
**Plan Version:** 1.0  
**Status:** Approved  
**Total Estimated Effort:** 3.5h  
**Start Date:** 2026-06-08  
**Target Completion:** 2026-06-09  

---

## 1. Resumen Ejecutivo

FEATURE-02 implementa SEO técnico completo para indexación internacional (US/EU) en el portfolio ONGEVAG. El objetivo es garantizar que Googlebot indexe correctamente todas las páginas, que los crawlers de redes sociales muestren previews con branding mínimo, y que el sitemap facilite un uso eficiente del crawl budget.

El trabajo se distribuye en 4 fases: setup de assets, actualización de index.html con meta tags estáticos completos, inyección dinámica de meta via React Helmet Async en componentes de detalle, y generación manual del sitemap.xml. No requiere nuevas dependencias — react-helmet-async y HelmetProvider ya están presentes en el entorno.

---

## 2. Fases de Implementación

### Fase A: Asset Setup
**Duración:** 0.5h  
**Dependencias:** Ninguna  
**Entrega:** public/og-image.png disponible (1200×630px), referenciable desde index.html

**Tasks:**
- T-01: Generar un asset temporal/placeholder en `public/og-image.png` de exactamente 1200×630px con fondo oscuro (<50KB) para desbloquear las referencias absolutas en los meta tags.

### Fase B: Static Meta Tags — index.html
**Duración:** 0.5h  
**Dependencias:** Ninguna  
**Entrega:** index.html con todos los meta tags estáticos completos (C1, C2, C3, C5 de MOD-02)

**Tasks:**
- T-02: Actualizar `<html lang="en">` en la raíz del documento para fijar el idioma base (Target US/EU).
- T-03: Reemplazar el `<title>` actual por "Ongevag — Desarrollo Web & IA para PyMEs" (max 60 chars, keyword-first).
- T-04: Reemplazar `<meta name="description">` incorporando un extracto optimizado de entre 150 y 160 caracteres.
- T-05: Agregar la etiqueta `<meta name="keywords">` con los 5-8 términos definidos en inglés.
- T-06: Configurar el bloque Open Graph estático completo apuntando a la URL absoluta de producción y al locale `en_US`.
- T-07: Configurar las meta etiquetas de Twitter Cards con la directiva `summary_large_image`.
- T-08: Fijar el enlace `<link rel="canonical" href="https://www.ongevag.com" />`.
- T-09: Agregar las directivas de herencia idiomática `hreflang` cruzadas (en → `/`, es → `/es`, x-default → `/`).

### Fase C: Dynamic Meta Tags — React Helmet Async
**Duración:** 1.5h  
**Dependencias:** Fase B completada  
**Entrega:** BlogPostDetail.jsx y ProjectDetail.jsx con Helmet dinámico totalmente funcional (C6 de MOD-02)

**Tasks:**
- T-10: Auditar e implementar `<Helmet>` en `src/pages/BlogPostDetail.jsx` extrayendo de forma segura los campos `post.title`, `post.excerpt` (con truncado estricto a 155 caracteres) y `post.image` (URLs nativas de Unsplash). Configurar los tags bidireccionales `hreflang`.
- T-11: Implementar `<Helmet>` en `src/pages/ProjectDetail.jsx` mapeando de forma segura las llaves del proyecto con fallbacks condicionales por si no existen descripciones cortas personalizadas. Configurar la reciprocidad idiomática entre `/proyecto/:id` y `/en/works/:id`.
- T-12: Generar dos commits atómicos y separados en Git para aislar la lógica de cada componente de detalle.

### Fase D: Sitemap + Validación
**Duración:** 1.0h  
**Dependencias:** Fase C completada  
**Entrega:** public/sitemap.xml válido, todos los SC-001 a SC-008 verificados

**Tasks:**
- T-13: Recopilar las 6 URLs del blog (mapeadas desde `blogData.js`) y las de proyectos para unificar los destinos.
- T-14: Escribir el archivo estático `public/sitemap.xml` estructurado bajo el protocolo sitemaps.org con sus pesos de prioridad correspondientes (Home=0.9, List=0.8, Detail=0.7).
- T-15: Realizar la auditoría local simulando la navegación con DevTools y corriendo `npm run build` para certificar la compilación sin warnings.
- T-16: Registrar en `BITACORA_TECNICA.md` la deuda técnica del sitemap manual para automatizarlo en el build time futuro.
- T-17: Actualizar el estado del archivo de especificación `mod-02_seo-metatags.md` a completado.

---

## 3. Desglose de Tareas (Tasks)

| ID | Tarea | Fase | Archivo | Tipo | Estimado |
|----|-------|------|---------|------|----------|
| T-01 | Generar og-image.png temporal | A | public/og-image.png | Asset | 0.5h |
| T-02 | Configurar lang="en" | B | index.html | Diff | 5min |
| T-03 | Optimizar <title> | B | index.html | Diff | 5min |
| T-04 | Optimizar <meta description> | B | index.html | Diff | 5min |
| T-05 | Agregar meta keywords EN | B | index.html | Diff | 5min |
| T-06 | Bloque Open Graph estático | B | index.html | Diff | 10min |
| T-07 | Bloque Twitter Card | B | index.html | Diff | 5min |
| T-08 | Configurar canonical verificado | B | index.html | Diff | 5min |
| T-09 | Inyectar hreflang (3 tags) | B | index.html | Diff | 5min |
| T-10 | Helmet en BlogPostDetail.jsx | C | src/pages/BlogPostDetail.jsx | Snippet | 30min |
| T-11 | Helmet en ProjectDetail.jsx | C | src/pages/ProjectDetail.jsx | Snippet | 30min |
| T-12 | Commits separados en Git | C | — | Git | 5min |
| T-13 | Mapear URLs reales del blog | D | — | Audit | 10min |
| T-14 | Generar archivo sitemap.xml | D | public/sitemap.xml | Template | 20min |
| T-15 | Compilación local y QA (DevTools) | D | — | QA | 20min |
| T-16 | Registro de deuda en BITACORA | D | BITACORA_TECNICA.md | Docs | 10min |
| T-17 | Marcar MOD-02 como completado | D | mod-02_seo-metatags.md | Docs | 5min |

---

## 4. Criterios de Definición de Done (DoD)

| Fase | Criterios DoD |
|------|---------------|
| **A** | `public/og-image.png` existe con resolución 1200×630px y es accesible localmente sin arrojar errores 404. |
| **B** | `index.html` cuenta con la estructura estática base completa, las etiquetas `hreflang` recíprocas instaladas y la compilación de Vite finaliza limpia. |
| **C** | Ambos componentes inyectan dinámicamente la metadata específica del artículo/proyecto en el DOM al ser montados, eliminando strings excesivos mediante funciones de truncado. |
| **D** | `sitemap.xml` cuenta con una estructura sintáctica válida que incluye ≥10 URLs. Se registra la bitácora técnica de la feature y se marca el módulo como completado. |

---

## 5. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| **Falta de ejecución de JS en Crawlers de Redes Sociales** | Alta | Bajo | Resuelto por diseño: `index.html` estático actúa como fallback corporativo de alta calidad si se salta el ciclo de vida de React. |
| **Inconsistencias de propiedades en datos dinámicos** | Media | Medio | Mitigado mapeando directamente las llaves reales confirmadas (`post.title`, `post.excerpt`, `post.image`) y agregando cortocircuitos lógicos en los componentes. |
| **Desincronización futura del sitemap** | Baja | Bajo | Mitigado a corto plazo con control estricto de los arrays de datos. Se registra explícitamente en la bitácora para automatizarlo mediante scripts en fases posteriores. |

---

## 6. Secuencia de Commits

1. `feat(seo): update index.html static meta tags — lang, title, description, OG, hreflang`
2. `feat(seo): add Helmet dynamic meta in BlogPostDetail.jsx`
3. `feat(seo): add Helmet dynamic meta in ProjectDetail.jsx`
4. `feat(seo): add public/og-image.png placeholder`
5. `feat(seo): add public/sitemap.xml with initial URLs`
6. `docs(seo): update BITACORA_TECNICA — sitemap tech debt`
7. `docs(seo): mark MOD-02 as completed`

---

## 7. Roles & Responsabilidades

| Rol | Responsable | Horas |
|-----|-------------|-------|
| Development & QA | AI Collaborator | 3.0h |
| Review & Verification | Leo (Senior Developer) | 0.5h |

---

## 8. Comunicación & Escalaciones

**Check-ins:** Al finalizar cada commit de la secuencia establecida.  
**Bloqueantes:** Si durante la inyección se detecta desestructuración nula en los parámetros dinámicos de las rutas de React Router v6.  
**Cambios de scope:** Requieren rerun de estimaciones y autorización explícita de Leo.

---

**Próximo paso:** Ejecutar Fase A y B según tasks.md
