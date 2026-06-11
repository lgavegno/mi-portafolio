# FEATURE-03: AEO Schema Implementation — Task Breakdown

## Fase A: Infraestructura de Acceso y Contexto Externo
**Duración Total:** 2h  
**Dependencias:** Ninguna  

### T-01: Configuración de `public/robots.txt`
**Effort:** 0.5h  
**Dependencies:** Ninguna  
**Acceptance Criteria:**
- [ ] Archivo `public/robots.txt` creado o actualizado.
- [ ] Reglas explícitas: `Allow: /` para `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Googlebot`, `Bingbot`.
- [ ] Referencia al sitemap: `Sitemap: https://www.ongevag.com/sitemap.xml`.
- [ ] Build limpio (`npm run build`).

**Subtasks:**
1. Crear archivo `public/robots.txt`.
2. Agregar user-agents específicos con `Allow: /`.
3. Agregar línea de Sitemap apuntando a dominio canónico.
4. Verificar sintaxis básica (sin espacios extraños).

**Notas:**
- Seguir estrictamente los nombres de bots oficiales de cada proveedor.
- No bloquear nada que no sea explícitamente necesario para seguridad (ej. `/node_modules` ya está ignorado por Vercel/Vite usualmente, pero asegurarse).

---

### T-02: Creación de `public/llms.txt`
**Effort:** 0.5h  
**Dependencies:** T-01  
**Acceptance Criteria:**
- [ ] Archivo `public/llms.txt` creado.
- [ ] Contenido en inglés, estructurado en secciones claras (Identity, Services, Portfolio, Contact, Scope).
- [ ] Incluye información de contacto válida (email/form link).
- [ ] Define claramente qué NO se hace (backend enterprise, etc.).

**Subtasks:**
1. Redactar sección "About" (Leandro Gavegno, Rafaela, Worldwide).
2. Redactar sección "Services" (React, Tauri, SEO, i18n, Performance).
3. Redactar sección "Portfolio" (mencionar OmniStock y casos de éxito genéricos).
4. Redactar sección "Contact" (email, formulario).
5. Redactar sección "Scope Negative" (No enterprise backend, no custom DB design).
6. Guardar como `public/llms.txt`.

**Notas:**
- Este archivo es leído por LLMs (ChatGPT, Claude) para contexto. Debe ser conciso y directo.
- No usar markdown complejo, texto plano estructurado es mejor.

---

### T-03: Automatización del Sitemap (`scripts/generate-sitemap.js`)
**Effort:** 1h  
**Dependencies:** T-01  
**Acceptance Criteria:**
- [ ] Script `scripts/generate-sitemap.js` actualizado o creado.
- [ ] Genera `public/sitemap.xml` correctamente.
- [ ] Dominio canónico: `https://www.ongevag.com`.
- [ ] Cobertura: 27 URLs (Home ES/EN, Blog ES/EN, 6 posts EN, 5 proyectos EN/ES).
- [ ] Se ejecuta sin errores en CI/CD (Vercel build hook).

**Subtasks:**
1. Definir array base de URLs estáticas (/es, /en, /blog, /es/blog, /contacto, /about, /skills, /services).
2. Mapear URLs dinámicas de blog (slugs de `blogData.en.js`).
3. Mapear URLs dinámicas de proyectos (slugs de `projects.en.js`).
4. Generar XML con `<urlset>`, `<loc>`, `<lastmod>` (fecha actual), `<changefreq>`, `<priority>`.
5. Integrar script en `package.json` scripts (ej. `postbuild` o manual).
6. Probar generación local.

**Notas:**
- Asegurar que las URLs de blog sean solo EN si el blog ES está vacío/redirige, o ambas si hay contenido. Según spec, blog ES muestra banner/link a /en/blog, así que indexar solo /en/blog.
- Prioridad Home: 1.0, Páginas internas: 0.8, Posts/Proyectos: 0.7.

---

## Fase B: Integración de Datos Estructurados (JSON-LD)
**Duración Total:** 4h  
**Dependencias:** Fase A  

### T-04: Implementación de Esquemas Estáticos en `index.html`
**Effort:** 1.5h  
**Dependencies:** T-03  
**Acceptance Criteria:**
- [ ] JSON-LD `Organization` insertado en `<head>` de `index.html`.
- [ ] JSON-LD `Person` insertado en `<head>` de `index.html`.
- [ ] JSON-LD `ProfessionalService` insertado en `<head>` de `index.html`.
- [ ] Cumple ADR-009: `areaServed: "Worldwide"`, NO `LocalBusiness`.
- [ ] Sintaxis RFC 8259 válida.

**Subtasks:**
1. Crear objeto JSON para `Organization` (Ungévag Studio, logo URL, sameAs links sociales).
2. Crear objeto JSON para `Person` (Leandro Gavegno, jobTitle, url, worksFor -> Organization).
3. Crear objeto JSON para `ProfessionalService` (freelancer scope, areaServed).
4. Insertar bloques `<script type="application/ld+json">` en `index.html` antes de `</head>`.
5. Validar sintaxis con JSONLint.

**Notas:**
- Usar URLs absolutas para `sameAs` y `url`.
- Mantener consistencia con datos de `llms.txt`.

---

### T-05: Implementación Dinámica en `src/pages/ProjectDetail.jsx`
**Effort:** 1.5h  
**Dependencies:** T-04  
**Acceptance Criteria:**
- [ ] Componente `ProjectDetail.jsx` inyecta JSON-LD `SoftwareApplication` vía `Helmet`.
- [ ] Propiedades mapeadas: `name`, `description`, `applicationCategory`, `offers`.
- [ ] Funciona para todos los proyectos existentes (slugs válidos).
- [ ] No causa CLS/LCP issues (renderizado asincrónico correcto).

**Subtasks:**
1. Importar `Helmet` desde `react-helmet-async`.
2. Extraer datos del proyecto actual (desde props/contexto/data).
3. Determinar `applicationCategory` basado en tipo de proyecto (Web, Desktop, Library).
4. Construir objeto JSON-LD `SoftwareApplication`.
5. Insertar `<Helmet><script type="application/ld+json">{json}</script></Helmet>` en el componente.
6. Probar en 2-3 proyectos diferentes.

**Notas:**
- Si el proyecto es un caso de estudio sin precio, usar `"price": "0"` o omitir `offers` si no aplica, pero preferible incluir `offers` con `priceCurrency: "USD"` y `price: "0"` o similar si es gratis/demo. Spec dice "Consultar", pero Schema.org prefiere valores numéricos. Usar `price: "0"` y `priceSpecification` si es necesario, o simplemente omitir `offers` si es puramente informativo. Revisar spec: dice "offers (precio o 'Consultar')". Para validación automática, mejor usar `price: "0"` o un rango. Usaré `price: "0"` para simplificar y evitar errores de validación, asumiendo que es un showcase.

---

### T-06: Implementación de FAQPage en `src/features/services/Services.jsx`
**Effort:** 1h  
**Dependencies:** T-05  
**Acceptance Criteria:**
- [ ] Componente `Services.jsx` inyecta JSON-LD `FAQPage` vía `Helmet`.
- [ ] Mínimo 4 pares pregunta-respuesta orientados a conversión internacional.
- [ ] Preguntas relevantes (tiempos, stack, metodología, soporte).
- [ ] Validación Schema.org pasa.

**Subtasks:**
1. Definir array de FAQs en inglés (conversion-focused).
   - Ej: "What is your typical delivery time?"
   - Ej: "Do you work with international clients?"
   - Ej: "What technologies do you specialize in?"
   - Ej: "Do you provide post-launch support?"
2. Construir estructura JSON-LD `FAQPage` con `mainEntity` array.
3. Insertar `<Helmet><script type="application/ld+json">{faqJson}</script></Helmet>` en `Services.jsx`.
4. Validar con Schema.org Validator.

**Notas:**
- Las preguntas deben ser reales y respondidas en la página o en el contenido visible. El schema debe reflejar contenido real.

---

## Fase C: Validación y Pruebas
**Duración Total:** 1.5h  
**Dependencias:** Fase B  

### T-07: Validación de Sintaxis y Vocabulario
**Effort:** 0.5h  
**Dependencies:** T-06  
**Acceptance Criteria:**
- [ ] Todos los JSON-LD pasan validación en [Schema.org Validator](https://validator.schema.org/).
- [ ] No hay errores críticos (required properties faltantes).
- [ ] Sintaxis RFC 8259 verificada.

**Subtasks:**
1. Copiar JSON-LD de `index.html` y validar.
2. Copiar JSON-LD generado por Helmet (ver en DevTools Sources/Network) y validar.
3. Corregir cualquier error de sintaxis o propiedad requerida faltante.

**Notas:**
- Prestar atención a `@type` exactos (camelCase vs PascalCase según Schema.org).

---

### T-08: Prueba de Rich Results (Simulación)
**Effort:** 1h  
**Dependencies:** T-07  
**Acceptance Criteria:**
- [ ] Google Rich Results Test pasa para `index.html` (si detecta algo) y `ProjectDetail.jsx`.
- [ ] Google Rich Results Test pasa para `Services.jsx` (FAQPage).
- [ ] Al menos 1 rich result habilitado (FAQPage o SoftwareApplication).

**Subtasks:**
1. Desplegar feature a staging (o usar preview de Vercel).
2. Ejecutar Google Rich Results Test en Home, Project Detail, Services.
3. Capturar screenshots de resultados exitosos.
4. Documentar resultados en PR.

**Notas:**
- Si no hay rich results aún (por falta de indexación), verificar que la estructura sea correcta y esperar a que Google rastree. La validación técnica es suficiente para este sprint.

---

## Fase D: Documentación y Despliegue
**Duración Total:** 0.5h  
**Dependencias:** Fase C  

### T-09: Actualización de Documentación Técnica
**Effort:** 0.5h  
**Dependencies:** T-08  
**Acceptance Criteria:**
- [ ] `BITACORA_TECNICA.md` actualizada con decisiones de robots.txt, llms.txt, y esquemas.
- [ ] `SDD_MASTER.md` actualizado con estado FEATURE-03.
- [ ] `CHANGELOG.md` actualizado (si aplica).

**Subtasks:**
1. Registrar implementación de AEO en Bitácora.
2. Actualizar estado de FEATURE-03 en SDD Master a "In Progress" o "Completed" según corresponda.
3. Actualizar CHANGELOG con feat(aeo-schema).

**Notas:**
- Mantener registro de decisiones clave (por qué Worldwide, por qué llms.txt).

---

### T-10: Code Review y Merge
**Effort:** 0.5h  
**Dependencies:** T-09  
**Acceptance Criteria:**
- [ ] PR creado con descripción clara.
- [ ] Review aprobado (0 bloqueantes).
- [ ] Merge a `develop` completado.
- [ ] CI/CD pasa (build exitoso).

**Subtasks:**
1. Commit changes con mensajes convencionales.
2. Crear PR a `develop`.
3. Solicitar review a Leo/Equipo.
4. Resolver comentarios.
5. Merge y verificar deploy.

**Notas:**
- PR Checklist:
  - [ ] Título: `feat(aeo): implement schema.org and bot access`
  - [ ] Descripción: Resumen de cambios + enlaces a validaciones.
  - [ ] Referencia a spec.md y plan.md.

---

## Estado Tracking

| Task | Status | Effort Actual | Blocker | Notes |
| --- | --- | --- | --- | --- |
| T-01 | ✅ Done | 0.3h | — | robots.txt updated, AI bots explicit, sitemap → www.ongevag.com |
| T-02 | ✅ Done | 0.4h | — | llms.txt created (EN, 7 sections, conversion-focused) |
| T-03 | ✅ Done | 0.3h | — | lastmod dinámico, 27 URLs, integrado en build |
| T-04 | ✅ Done | 0.5h | — | Organization + Person + ProfessionalService en index.html |
| T-05 | ✅ Done | 0.5h | — | SoftwareApplication vía Helmet en ProjectDetail.jsx |
| T-06 | ✅ Done | 0.5h | — | FAQPage (5 preguntas) + Helmet en Services.jsx |
| T-07 | ✅ Done | 0.2h | — | JSON-LD validado (3 estáticos + 2 dinámicos) |
| T-08 | ⏳ Pending | — | Deploy | Rich Results Test post-deploy |
| T-09 | ✅ Done | 0.3h | — | BITACORA + CHANGELOG + CLAUDE.md actualizados |
| T-10 | ⏳ Pending | — | T-09 | PR review + merge |

Próximo paso: Ejecutar T-01.