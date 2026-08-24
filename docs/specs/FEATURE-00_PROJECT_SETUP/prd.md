# PRD — Portfolio Leandro Gavegno / Ongevag

**Versión:** 2.1
**Fecha:** 10 de Abril de 2026
**Estado:** Producción
**URL:** https://ongevag.vercel.app/

---

## 1. Propósito del producto

Portfolio profesional que valida la capacidad técnica de Leandro Gavegno como desarrollador freelance, atrayendo clientes PyMEs que buscan servicios de desarrollo web, automatización con IA y tiendas online.

---

## 2. Audiencia objetivo

| Segmento | Perfil | Qué busca en el portfolio |
|----------|--------|--------------------------|
| **Primaria** | PyMEs locales (Rafaela / Litoral) | Validar capacidad técnica antes de contratar; ver proyectos reales |
| **Secundaria** | Reclutadores tech / empresas | Evaluar stack (React 19, Python, Data Science) y proyectos para posición freelance/contrato |
| **Terciaria** | Desarrolladores / comunidad tech | Referencia técnica, contacto profesional, aprendizaje de arquitectura DDD Light |

---

## 3. Objetivos del producto

| Objetivo | Métrica | Estado actual |
|----------|---------|---------------|
| Generar consultas de clientes | ≥ 2 contactos/mes via formulario | Sin datos (sin analytics integrado) |
| Demostrar capacidad técnica | Proyectos reales con links/demos funcionales | ✅ Parcial (4 proyectos, 1 con GitHub link activo) |
| Posicionamiento SEO | Aparecer en búsquedas "desarrollador web Rafaela" | ❌ Sin SEO técnico (sin meta tags, robots.txt, sitemap) |
| Coherencia de marca | Visual alineado a identidad Ongevag | ✅ Implementado (logo, colores, tipografía consistentes) |

---

## 4. Features actuales

| Feature | Ruta | Descripción | Estado |
|---------|------|-------------|--------|
| **Hero Banner** | `/` | Particle system + geometría 3D flotante + badge "Disponible" + stats | ✅ v2.4.0 |
| **About** | `/` (sección) | Descripción de Leandro y Ongevag | ✅ Producción |
| **Skills Grid** | `/` (sección) | Grid de tecnologías: React, Python, Data Science, etc. | ✅ Producción |
| **Servicios** | `/` (sección) | Carrusel 3D de servicios ofrecidos | ✅ Producción |
| **Works (Proyectos)** | `/` (sección) | Grid de proyectos destacados con filtrado por categoría | ✅ Producción |
| **Detalle Proyecto** | `/proyecto/:id` | Vista completa de proyecto con descripción extendida, stack, results | ✅ Producción |
| **Blog Preview** | `/` (sección) | Preview de últimos 3 posts en home | ✅ Producción |
| **Blog Index** | `/blog` | Listado completo de posts con filtrado por categoría, mobile optimizado | ✅ v2.4.0 |
| **Detalle Post** | `/blog/:slug` | Vista completa con ShareButton mobile, código responsive, tablas con scroll | ✅ v2.4.0 |
| **Contacto** | `/` (sección) | Formulario sin backend (EmailJS → [contacto vía formulario]) | ✅ Producción |
| **Favicon** | `public/favicon.svg` | Ícono personalizado Ongevag en navegador | ✅ v2.4.0 |
| **Social Sharing** | og:image | Meta tags para previews en redes sociales | ✅ v2.4.0 |

---

## 5. Inventario de contenido actual

### Proyectos (src/data/projects.js)

| ID | Título | Featured | Categoría | Link Externo | Status |
|----|--------|----------|-----------|--------------|--------|
| `fitness-retention-analysis` | Análisis de Retención & ML - FitNess App | ✅ Sí | Data Science/ML | GitHub | ✅ Completed |
| `omnistock` | OmniStock — Sistema de Inventario Desktop | ✅ Sí | Full Stack | N/A | 🟡 In Progress (70%) |
| `faro-art-shop` | Faro Art Shop — Tienda Online | ✅ Sí | Frontend | Live | ✅ Completed |
| `generador-presupuestos` | Generador de Presupuestos Web | ✅ Sí | Full Stack | Live | ✅ Completed |
| `form-invent` | form-invent — Sistema de Inventario Excel | ✅ Sí | Tools | N/A | ✅ Completed |

**Total:** 5 proyectos (4 completados, 1 en desarrollo)
**Nota:** El proyecto `fitness-retention-analysis` tiene descripción extendida (longDescription, methodology, results) y link a Notion.

### Blog Posts (src/features/blog/data/blogData.js)

| Slug | Título | Categoría | Fecha | Featured | Read Time |
|------|--------|-----------|-------|----------|-----------|
| `fitness-data-integrity-refactor` | Data Integrity & ML: Saneando 11,600 registros con Python | Data Science | 2026-02-06 | ✅ Sí | 10 min |
| `python-para-data-analytics-guia` | Python para Data Analytics: Guía de supervivencia | Data Engineering | 2025-01-05 | ✅ Sí | 12 min |
| `interpretacion-graficos-principio-pareto` | Interpretación de Gráficos Estadísticos y Principio de Pareto | Performance | 2025-01-02 | ✅ Sí | 8 min |
| `react-vs-react-native-comparativa` | React vs React Native: La Comparativa Definitiva | Frontend | 2024-12-28 | ❌ No | 12 min |

**Total:** 4 posts (3 featured, 1 normal)
**Categorías:** Data Science, Data Engineering, Performance, Frontend

---

## 6. Restricciones técnicas

| Restricción | Razón | Impacto |
|-------------|-------|--------|
| **Sin backend propio** | Decisión de producto (reducir complejidad operacional) | Formulario vía EmailJS (envíos directos desde navegador, sin persistencia) |
| **Sin CMS** | Contenido hardcodeado en JS (projects.js, blogData.js) | Requiere commit Git para cambios de contenido (blogs, proyectos) |
| **Sin TypeScript** | Scope acotado; overhead no justificado vs benefit (ver ADR-002) | Desarrollo más rápido, menos boilerplate; menor type safety |
| **Deploy Vercel free tier** | SPA pura, sin SSR | No hay renderizado server-side; todo en cliente |
| **Sin tests automatizados** | Deuda técnica conocida | Riesgo de regresiones en cambios visuales; no hay CI testing |
| **Sin auth/autenticación** | No hay secciones protegidas | Portfolio es 100% público |

---

## 7. Configuración crítica (Environment Variables)

Requeridas para funcionamiento en producción:

```bash
VITE_EMAILJS_SERVICE_ID=...        # ID del servicio EmailJS
VITE_EMAILJS_TEMPLATE_ID=...       # ID del template de email
VITE_EMAILJS_PUBLIC_KEY=...        # API key pública EmailJS
```

**Referencia:** `src/features/contact/Contact.jsx` líneas 88-98

---

## 8. Backlog priorizado

### ✅ Completados (v2.4.0)
- [x] **Favicon personalizado** — aparece en tabs del navegador
- [x] **og:image para social sharing** — LinkedIn y Twitter usan este archivo para previews
- [x] **Fix SPA routing Vercel** — 404 en rutas directas resuelto via vercel.json
- [x] **Eliminar referencias a Gemini AI** — bloque autor removido de BlogPostDetail
- [x] **Blog mobile responsive** — código con overflow-x-auto, tablas con scroll, ShareButton en mobile

### Pendientes

| Prioridad | Feature | Impacto | Esfuerzo | Notas |
|-----------|---------|---------|---------|-------|
| 🔴 **Alta** | Meta tags dinámicos por ruta | SEO | Bajo | React Helmet Async ya integrado; falta llenar meta descriptions |
| 🔴 **Alta** | robots.txt + sitemap.xml | SEO | Bajo | Necesario para indexación en buscadores |
| 🔴 **Alta** | Schema.org JSON-LD (Person) | SEO | Bajo | Markup estructurado para Rich Snippets |
| 🟡 **Media** | Rate limiting formulario de contacto | Seguridad | Medio | Evitar spam; posible bloqueo por IP en backend |
| 🟡 **Media** | Tests automatizados (Vitest) | Calidad | Alto | Cobertura de componentes principales |
| 🟡 **Media** | Blur placeholders en imágenes | Performance | Bajo | Mejora UX percibida (LQIP via Vite ImageTools) |
| 🟢 **Baja** | PWA manifest (offline support) | UX | Medio | Instalable en home screen |
| 🟢 **Baja** | Blog dinámico (MDX o CMS headless) | Escalabilidad | Alto | Eliminar hardcoding; permitir posts sin Git |

---

## 9. Cambios en curso (Sprint docs/sdd-foundation)

**Estado:** En documentación y restructuración de contenido

### Completados (v2.3.0)
- [x] **Rediseño visual hero** — Particle system + geometría 3D + badge + stats
  - Eliminado video de fondo
  - Integrado ParticleBackground canvas animado
  - Actualización: gradientes, tipografía responsive, botones pill style

### En progreso
- [ ] **Remover** proyecto Fitness App (Java legacy) del portfolio
  - **Nota:** Será REEMPLAZADO por nuevo análisis más reciente
  - **Ubicación:** `src/data/projects.js` línea 5-23

- [ ] **Agregar** proyecto OmniStock (Tauri + React + Rust)
  - Gestión de inventario multiplataforma

- [ ] **Agregar** proyecto Faro Art Shop (Tienda Nube)
  - E-commerce para galería de arte

- [ ] **Actualizar CV** (bloqueado — pendiente nuevo PDF desde Leandro)

- [ ] **Aplicar documentación SDD completa**
  - CLAUDE.md, PRD.md, ARCHITECTURE.md actualizado

---

## 10. Decisiones de producto documentadas

| Decisión | ADR | Resumen | Status |
|----------|-----|---------|--------|
| Vite sobre Next.js | ADR-001 | SPA sin necesidad de SSR; build más rápido | ✅ Activo |
| Sin TypeScript | ADR-002 | Scope acotado; overhead no justificado | ✅ Activo |
| EmailJS sin backend | ADR-003 | Sin infraestructura de servidor; máxima simplicidad | ✅ Activo |
| Feature-based architecture | ADR-004 | Escalabilidad y desacoplamiento; inspirado en DDD Light | ✅ Activo |

---

## 11. Métricas de producto

### Performance (Vite + Lighthouse)

- **LCP (Largest Contentful Paint):** ~1.2s (HeroBanner cargado estáticamente)
- **CLS (Cumulative Layout Shift):** 0 (contenedores dimensionados explícitamente)
- **FID (First Input Delay):** ~50ms
- **Code Splitting:** Blog & Analytics lazy loaded

### Engagement

- **Bounce Rate:** Desconocido (sin analytics)
- **Form Completions:** Desconocido (EmailJS no registra eventos)
- **Pages per Session:** Desconocido

---

## 12. Roadmap futuro (Next Sprints)

**Sprint 3 (SEO Foundation):**
- [ ] Implementar meta tags dinámicos con React Helmet
- [ ] Crear robots.txt y sitemap.xml
- [ ] Agregar Schema.org JSON-LD

**Sprint 4 (Content & Projects):** ✅ COMPLETADO
- [x] Agregar OmniStock, Faro Art Shop, Generador de Presupuestos, form-invent
- [x] Refactor: Eliminar sistema-reservas, sistema-gestion, procesamiento-documentos
- [ ] Nuevo blog post sobre Tauri + OmniStock

**Sprint 5 (Testing):**
- [ ] Configurar Vitest
- [ ] Tests e2e (Playwright)
- [ ] CI/CD en Vercel

---

## 13. Contacto & Escalación

**Owner:** Leandro Gavegno
**Brand:** Ongevag (Rafaela, Santa Fe, Argentina)
**Repo:** https://github.com/lgavegno/mi-portafolio
**Deployment:** Vercel (auto CI/CD desde main/develop)

---

**© 2026 Ongevag — Built for Scalability**
