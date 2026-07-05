# Feature Specification: Portuguese Locale (PT)

**Feature Branch**: `feature/pt-locale`

**Feature ID**: `010`

**Created**: 2026-07-05

**Status**: Draft — Awaiting Approval

**Scope**: Tercer locale completo del sitio (ES canónico en `/`, EN en `/en`, **PT en `/pt`**), extendiendo la arquitectura existente de FEATURE-01 (`LocaleProvider`, `useLocale()`, locale files planos). Incluye home, proyectos, agencias, blog y contact form.

---

## Context & Problem Statement

El portfolio actualmente sirve ES (canónico, `/`) y EN (`/en`). Brasil y el mercado lusófono (Portugal, comunidades PT en EU) representan un segmento de clientes PyME potencial no cubierto. La arquitectura de i18n ya soporta múltiples locales vía `LocaleProvider` + archivos planos por sección — agregar PT es una extensión del patrón existente, no un rediseño.

A diferencia de FEATURE-01 (donde el contenido EN quedó como tarea de autoría paralela a cargo de Leo), en esta feature **la traducción PT inicial es generada por Claude** como parte del entregable de ingeniería, sujeta a revisión humana antes de merge.

---

## User Scenarios & Testing

### User Story 1 — Visitante lusófono navega el sitio en portugués (Priority: P1)

Un cliente potencial de Brasil o Portugal llega a `/pt` (vía link compartido o LangSwitcher) y navega home, servicios, proyectos y contacto completamente en portugués, sin mezcla de idiomas.

**Independent Test**: Navegar a `/pt`. Confirmar `document.documentElement.lang === "pt"`, todos los strings de UI en portugués, sin residuos de ES/EN visibles.

**Acceptance Scenarios**:
1. **Given** un usuario navega a `/pt`, **When** la página carga, **Then** `lang="pt"` y el contenido de Hero, About, Services, Works, Contact, Footer está en portugués.
2. **Given** un usuario navega a `/pt/proyecto/:id`, **When** la página carga, **Then** el detalle del proyecto (título, descripción, stack) se muestra en portugués, con el mismo slug que en ES/EN.
3. **Given** un usuario navega a `/pt/agencias` (o equivalente traducido de segmento), **When** la página carga, **Then** el contenido de la página de agencias está en portugués.

---

### User Story 2 — LangSwitcher soporta 3 idiomas preservando el path (Priority: P1)

El selector de idioma en el header pasa de un toggle `ES|EN` a un selector de 3 opciones `ES|EN|PT`, manteniendo la ruta actual al cambiar de idioma (igual que la lógica ya implementada para ES↔EN).

**Independent Test**: Desde `/en/proyecto/omnistock`, click en PT → navega a `/pt/proyecto/omnistock`. Desde `/pt/agencias` (segmento traducido), click en ES → navega a `/agencias`.

**Acceptance Scenarios**:
1. **Given** el usuario está en `/`, **When** hace click en PT, **Then** navega a `/pt`.
2. **Given** el usuario está en `/pt/blog/:slug`, **When** hace click en EN, **Then** navega a `/en/blog/:slug` (o a `/en/blog` con banner si el post no tiene equivalente).
3. **Given** el usuario cambia entre cualquiera de los 3 idiomas, **When** el cambio ocurre, **Then** el scroll resetea a top y no hay 404.
4. **Given** segmentos de ruta traducibles (`agencias`/`agencies`), **When** el usuario cambia a PT, **Then** el segmento se traduce a su equivalente PT (ej. `agencias` → `agencias-pt` o el término definido — ver Open Question).

---

### User Story 3 — Blog disponible en portugués (Priority: P2)

Los posts del blog (actualmente ES + EN) también están disponibles en `/pt/blog`, con traducción generada por Claude y revisión pendiente de Leo antes de publicar.

**Independent Test**: Navegar a `/pt/blog`. Confirmar que los posts existentes aparecen traducidos, con el mismo slug, y sin banner de "no disponible" (a diferencia del patrón EN-only original).

**Acceptance Scenarios**:
1. **Given** un usuario navega a `/pt/blog`, **When** la página carga, **Then** ve la lista completa de posts en portugués.
2. **Given** un usuario navega a `/pt/blog/:slug` de un post existente, **When** la página carga, **Then** el contenido completo (título, cuerpo, metadata) está en portugués.
3. **Given** un post nuevo se agrega solo en ES/EN sin traducción PT aún, **When** un usuario navega a `/pt/blog/:slug-nuevo`, **Then** se aplica el mismo fallback ya existente (redirect a `/pt/blog` con banner de idioma no disponible), no un 404.

---

### User Story 4 — SEO/hreflang reconoce el tercer locale (Priority: P2)

Los crawlers detectan `/pt` como una tercera variante indexable, con `hreflang="pt"` y referencias cruzadas a ES/EN.

**Independent Test**: `curl` de `/pt` muestra `<html lang="pt">`, title en portugués, y tags `hreflang` para `es`, `en`, `pt` y `x-default`.

**Acceptance Scenarios**:
1. **Given** un crawler solicita `/pt`, **When** inspecciona `<head>`, **Then** encuentra `hreflang="pt"` self-referencing y `hreflang="es"`/`hreflang="en"` hacia sus rutas.
2. **Given** Vercel sirve `/pt/blog/cualquier-slug`, **When** se procesa la request, **Then** no retorna 404 (rewrite catch-all ya cubre esto, sin cambios en `vercel.json`).

---

### Edge Cases

- **Segmentos de ruta traducibles**: hoy `SEGMENT_ES_TO_EN`/`SEGMENT_EN_TO_ES` en `LangSwitcher.jsx` traduce `agencias` ↔ `agencies`. Para PT se necesita un tercer mapa (`SEGMENT_*_TO_PT` y viceversa) — **Open Question**: ¿el segmento PT es `agencias` (igual que ES) o un término distinto? Definir antes de T-05.
- **Traducción generada por IA sin revisión humana**: los archivos `*.pt.js` y locale files PT se marcan con un comentario `// TODO(leo): revisar traducción PT` hasta que Leo confirme. No se debe considerar contenido final hasta esa revisión.
- **Blog posts futuros sin traducción PT**: mismo fallback que hoy existe para ES/EN faltante — redirect + banner, nunca 404.
- **`x-default` hreflang**: sigue apuntando a `/` (ES, canónico), sin cambios — PT no altera la jerarquía de canonicalidad.
- **Caracteres especiales PT** (ã, õ, ç, á, é): verificar encoding UTF-8 correcto en todos los archivos nuevos y renderizado sin mojibake.

---

## Requirements

### Functional Requirements

- **FR-001**: La aplicación DEBE servir contenido en portugués en `/pt` y todas las sub-rutas (`/pt/blog`, `/pt/proyecto/:id`, `/pt/agencias`, `/pt/blog/:slug`).
- **FR-002**: `App.jsx` DEBE extender `LocaleLayout` para reconocer el prefijo `/pt` y pasar `locale="pt"` a `LocaleProvider`, sin duplicar componentes de página.
- **FR-003**: `LocaleProvider.jsx` DEBE importar y exponer un tercer set de locale files (`common`, `hero`, `services`, `works`, `contact`, `about`, `blog`, `agencies`) para `locale="pt"`.
- **FR-004**: Se DEBEN crear `src/locales/pt/*.js` con estructura de keys idéntica a `en/` y `es/` (mismo nivel de anidamiento, mismas keys).
- **FR-005**: Se DEBEN crear `src/data/projects.pt.js` con los mismos slugs que `projects.es.js`/`projects.en.js`, solo campos descriptivos traducidos.
- **FR-006**: Se DEBE crear `src/features/blog/data/blogData.pt.js` con traducción de los posts existentes, mismos slugs.
- **FR-007**: `LangSwitcher.jsx` DEBE soportar navegación entre 3 idiomas (ES/EN/PT) preservando el path actual y traduciendo segmentos de ruta variables.
- **FR-008**: Todo contenido PT generado por Claude DEBE incluir marcador de revisión pendiente (comentario o campo `_reviewed: false`) hasta validación de Leo.
- **FR-009**: `vercel.json` NO requiere cambios — el rewrite catch-all (`/(.*)` → `/index.html`) ya cubre `/pt/*`.
- **FR-010**: El locale derivado de la URL sigue siendo la única fuente de verdad (sin `localStorage`), consistente con ADR-011.

### Key Entities

- **Locale** (`"es"` | `"en"` | `"pt"`): tercer valor agregado al union type ya existente.
- **Locale File PT** (`src/locales/pt/{section}.js`): mismo contrato de `en/`/`es/`, contenido en portugués.
- **Locale-keyed Data File PT** (`src/data/projects.pt.js`, `src/features/blog/data/blogData.pt.js`): mismos slugs, campos traducidos.
- **LangSwitcher (v2)**: pasa de toggle binario a selector de 3 estados, misma lógica de traducción de segmentos generalizada a N locales.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: `curl https://ongevag.com/pt` retorna `<html lang="pt">` y `<title>` en portugués.
- **SC-002**: Estructura de keys en `src/locales/pt/*.js` es 100% idéntica (diff estructural) a `src/locales/es/*.js` y `src/locales/en/*.js`.
- **SC-003**: `projects.pt.js` y `blogData.pt.js` tienen los mismos slugs que sus contrapartes ES/EN (verificado por script, igual patrón que T-03 de FEATURE-01).
- **SC-004**: LangSwitcher permite ida y vuelta entre los 3 idiomas desde cualquier tipo de ruta (home, blog index, blog detail, project detail, agencias) sin 404.
- **SC-005**: `grep -r` de strings ES/EN conocidos (`"Servicios"`, `"Contacto"`, `"Services"`, `"Contact"`) en rutas renderizadas bajo `/pt` retorna vacío.
- **SC-006**: Todos los archivos PT nuevos contienen el marcador de revisión pendiente hasta que Leo lo remueva explícitamente.

---

## Assumptions

- Se reutiliza el 100% de la arquitectura de FEATURE-01 (`LocaleContext`, `useLocale()`, patrón de archivos planos). No se introduce ninguna librería de i18n.
- Claude genera el borrador de traducción PT (locale files + `projects.pt.js` + `blogData.pt.js`) como parte de esta feature, pero **no se considera contenido final** hasta revisión de Leo — análogo a un PR que requiere aprobación antes de merge a `main`.
- El blog en PT **sí** se traduce completo (a diferencia de la decisión original de EN-only en FEATURE-01) — decisión confirmada por Leo para esta feature.
- `VITE_SITE_URL` y la config de hreflang existente se extienden para incluir `pt` sin cambios estructurales en el mecanismo, solo en la lista de locales soportados.
- No se requiere cambio en `vercel.json` (catch-all ya cubre cualquier prefijo).

---

## Out of Scope (this feature)

- Traducción de contenido legal/footer de terceros (ninguno existe actualmente).
- SSR/pre-rendering — sigue fuera de stack (Vite CSR), sin cambios respecto a FEATURE-01.
- Nuevos posts de blog escritos originalmente en PT — solo traducción de los existentes.
- Definición final del término de segmento traducible para "agencias" en PT (queda como Open Question a resolver en Phase A del plan, antes de tocar `LangSwitcher.jsx`).

---

## ADRs Triggered by This Feature

| ADR | Decisión | Estado |
|-----|----------|--------|
| ADR-013 | PT como tercer locale vía extensión de LocaleProvider (no rediseño) | Por documentar |
| ADR-014 | Traducción PT generada por IA con marcador de revisión pendiente | Por documentar |
