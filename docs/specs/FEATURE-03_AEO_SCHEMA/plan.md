# FEATURE-03: AEO Schema Implementation — Plan de Implementación

Plan Version: 1.0
Status: Draft
Total Estimated Effort: 8h
Start Date: 2026-06-11
Target Completion: 2026-06-12

## 1. Resumen Ejecutivo
Implementar Answer Engine Optimization (AEO) mediante la integración de datos estructurados JSON-LD, archivos de contexto para LLMs (`llms.txt`) y configuración de acceso para bots de IA (`robots.txt`). El objetivo es posicionar el portfolio de Leandro Gavegno (ONGEVAG) como una fuente autorizada en motores de búsqueda convencionales (Google/Bing) y motores de respuesta por IA (ChatGPT, Claude, Perplexity), eliminando restricciones geográficas mediante el uso de esquemas `Person` + `Organization` con alcance mundial, en lugar de `LocalBusiness`.

## 2. Fases de Implementación

### Fase A: Infraestructura de Acceso y Contexto Externo
**Duración:** 2h
**Dependencias:** Ninguna
**Entrega:** Archivos estáticos en `public/` configurados para permitir indexación por IA y generar sitemap dinámico.

Tasks:
*   **T-01: Configuración de `public/robots.txt`**
    *   Crear reglas explícitas para permitir a `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Googlebot` y `Bingbot`.
    *   Incluir referencia al sitemap en `/sitemap.xml`.
*   **T-02: Creación de `public/llms.txt`**
    *   Redactar contenido en inglés (orientado a conversión internacional).
    *   Estructurar secciones: Identity (Leandro Gavegno / ONGEVAG), Services (React, Tauri, SEO), Portfolio highlights, Contact info, y Scope negativo (qué NO se hace).
*   **T-03: Automatización del Sitemap (`scripts/generate-sitemap.js`)**
    *   Actualizar script para generar `public/sitemap.xml`.
    *   Configurar dominio canónico a `https://www.ongevag.com`.
    *   Asegurar cobertura de 27 URLs (Home EN/ES, Blog EN/ES, 6 posts, 5 proyectos EN/ES).

### Fase B: Integración de Datos Estructurados (JSON-LD)
**Duración:** 4h
**Dependencias:** Fase A
**Entrega:** Esquemas válidos implementados en `index.html`, `ProjectDetail.jsx` y `Services.jsx`.

Tasks:
*   **T-04: Implementación de Esquemas Estáticos en `index.html`**
    *   Insertar JSON-LD para `Organization` (Ungévag Studio).
    *   Insertar JSON-LD para `Person` (Leandro Gavegno) con `areaServed: "Worldwide"`.
    *   Insertar JSON-LD para `ProfessionalService` definiendo la naturaleza freelancer global.
    *   *Nota:* Seguir estrictamente ADR-009 (sin LocalBusiness).
*   **T-05: Implementación Dinámica en `src/pages/ProjectDetail.jsx`**
    *   Utilizar `Helmet` para inyectar esquema `SoftwareApplication`.
    *   Mapear propiedades: `name`, `description`, `applicationCategory` (Web/Desktop/Library), y `offers` (precio o "Consultar").
*   **T-06: Implementación de FAQPage en `src/features/services/Services.jsx`**
    *   Inyectar esquema `FAQPage` con mínimo 4 preguntas clave orientadas a conversión internacional (ej. tiempos de entrega, stack tecnológico, metodología, soporte post-lanzamiento).

### Fase C: Validación y Pruebas
**Duración:** 1.5h
**Dependencias:** Fase B
**Entrega:** Validación técnica de sintaxis y riqueza de resultados.

Tasks:
*   **T-07: Validación de Sintaxis y Vocabulario**
    *   Ejecutar validación local contra RFC 8259 y vocabulario Schema.org.
    *   Verificar que no haya errores de anidación o propiedades requeridas faltantes.
*   **T-08: Prueba de Rich Results (Simulación)**
    *   Usar Google Rich Results Test (URL testing) para verificar `FAQPage` y `SoftwareApplication`.
    *   Usar Schema.org Validator para validar los snippets crudos.

### Fase D: Documentación y Despliegue
**Duración:** 0.5h
**Dependencias:** Fase C
**Entrega:** PR listo para revisión, documentación actualizada.

Tasks:
*   **T-09: Actualización de Documentación Técnica**
    *   Actualizar `BITACORA_TECNICA.md` con decisiones sobre robots.txt y llms.txt.
    *   Verificar que `SDD_MASTER.md` refleje el estado de FEATURE-03.
*   **T-10: Code Review y Merge**
    *   Revisión de consistencia i18n (esquemas globales vs locales).
    *   Merge a `develop` tras aprobación.

## 3. Desglose de Tareas (Tasks)

Ver detalles específicos en la sección de "Especificación Técnica" de `spec.md`.

## 4. Criterios de Definición de Done (DoD)

| Fase | Criterios DoD |
| --- | --- |
| A | `robots.txt` permite bots de IA. `llms.txt` existe y tiene contenido estructurado. `sitemap.xml` se genera correctamente con 27 URLs y dominio canónico correcto. Build limpio. |
| B | JSON-LD en `index.html` válido y sin `LocalBusiness`. `ProjectDetail.jsx` inyecta `SoftwareApplication` dinámicamente. `Services.jsx` contiene `FAQPage` con 4+ preguntas. Helmet renderiza asincrónicamente sin bloquear LCP. |
| C | Validación en Schema.org Validator pasa sin errores críticos. Google Rich Results Test reconoce al menos un tipo de rich result (FAQ o SoftwareApp). |
| D | PR merged. Bitácora actualizada. Sin regressions en builds existentes. |

## 5. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
| --- | --- | --- | --- |
| Robots.txt bloquea accidentalmente crawlers principales | Media | Alto | Revisar manual cada user-agent antes de commit. Usar herramienta de test de GSC post-deploy. |
| Helmet causa CLS/LCP issues por inyección tardía | Baja | Medio | Asegurar que Helmet use `defer` o inyección síncrona en `<head>` si es posible, aunque Helmet suele manejarlo bien. Monitorear Core Web Vitals. |
| Contenido de `llms.txt` muy genérico y poco útil para LLMs | Alta | Bajo | Iterar rápido en Phase 2. Enfocarse en datos estructurados primero (más crítico para SEO tradicional). |
| Conflicto con i18n (esquemas duplicados o incorrectos por idioma) | Media | Medio | Los esquemas Person/Organization son globales (mismos ID). Asegurar que solo cambien campos traducibles (descripción) si fuera necesario, pero mantener IDs constantes. |

## 6. Timeline

*   **2026-06-11:** Kickoff Fase A (Archivos públicos y Sitemap).
*   **2026-06-11:** Inicio Fase B (JSON-LD en componentes React).
*   **2026-06-12:** Fase C (Validación) y Fase D (Merge).

## 7. Roles & Responsabilidades

| Rol | Responsable | Horas |
| --- | --- | --- |
| Development | Leandro Gavegno (ONGEVAG) | 7h |
| Testing/Validation | Leandro Gavegno (ONGEVAG) | 1h |

## 8. Comunicación & Escalaciones

*   **Check-ins:** Diario (standup asíncrono en bitácora).
*   **Bloqueantes:** Si hay conflictos con la ruta URL del sitemap o permisos de build en Vercel.
*   **Cambios de scope:** Si se requiere `llms.txt` en español, mover a Phase 2 (excluido de este sprint).

Próximo paso: Ejecutar Fase A según tasks.md.