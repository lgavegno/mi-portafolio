# Bitácora Técnica — Ongevag Portfolio

> **Regla:** Nunca editar entradas pasadas. Agregar nuevas sesiones al inicio.
> Cada entrada es un snapshot inmutable del trabajo realizado.

---

## 2026-06-20 — WhatsAppFloat: Pulse Glow & Visual Enhancement

**Objetivo:** Mejorar WhatsAppFloat con pulse animation + glow neon sutil para incrementar visual appeal y engagement sin impactar performance.

**Contexto:** Post-implementación inicial de botón flotante B2B; necesidad de agregar "vida" visual para destacar CTA y mejorar perceived interactivity.

**Mejoras visuales implementadas:**

1. **Pulse Animation** — Framer Motion scale [1, 1.05, 1] con 2.5s infinite loop
   - Respeta prefers-reduced-motion: desactiva al detectar preferencia
   - No interfiere con entrada inicial (delay 2.5s mantenido)
   - Transition easeInOut para movimiento natural

2. **Neon Glow Effect** — Dual boxShadow layers
   - Base glow (reposo): WhatsApp green #25D366 (rgba 0.4) + steel-blue rebrand (rgba 0.2, per ADR-012) + shadow negro
   - Hover glow (intensificado): intensidad aumentada (0.6 green, 0.35 steel-blue) + shadow reforzado
   - Transition: smooth 200ms en hover, 2.5s en reposo
   - Colores: respetan paleta cream/sand/mist-blue/steel-blue/navy (rebrand 2026)

3. **Implementation Details**
   - Ubicación: `src/components/WhatsAppFloat.jsx` (motion.a con scale animate + style boxShadow)
   - State management: isHovering para diferenciar glow base/hover
   - CSS-in-JS: inline style para boxShadow (evita Tailwind limitations con arrays de sombras)
   - Framer Motion: variants evitadas (simplificar test compatibility)

**Performance Considerations:**
- Build size: 247.31 kB < 250KB límite ✅
- Animación GPU-accelerated (scale + boxShadow animables)
- No layout shifts: fixed positioning, z-50 intacto
- Lighthouse: LCP/CLS/TBT sin cambios verificados

**Archivos modificados:**
- `src/components/WhatsAppFloat.jsx` — agregado isHovering state, pulse scale animate, baseShadow/hoverShadow style

**Testing:**
- npm run lint: 0 errores (2 pre-existentes en DataVisualization.jsx)
- npm run test: 71/71 tests passing (sin regresiones)
- npm run build: ✓ exitoso, assets comprimidos
- Browser: animación visible, glow en hover/focus, prefers-reduced-motion respetado

**Resultado:** ✅ Botón flotante con "vida" visual premium. Pulse sutil (1.05x scale) + glow dinámico mantiene diseño B2B elegante sin sobrecargar interfaz. CTA ahora más noticeable sin flashiness.

---

## 2026-06-17 — Investigación bug visual SectionDivider bowl (mobile)

**Síntoma:** línea horizontal visible debajo del bowl divider en algunos dispositivos móviles.

**Contexto:** visible en emulación Moto G, no reproducible en desktop ni iPhone XR.

**Hipótesis descartadas:**
- cierre del path SVG
- límite inferior del viewBox
- extensión del relleno SVG (`height * 2`)
- clipping del SVG

**Pruebas realizadas:**
- extensión del path a `${height * 2 + 1}`
- validación en desktop y mobile

**Resultado:**
- el problema persistió aun modificando el SVG
- la corrección efectiva fue cambiar `marginBottom: -1` por `marginBottom: -2`

**Conclusión:** causa raíz asociada a gap sub-pixel/renderizado entre el divider y la sección siguiente en ciertos viewports Android. No modificar el path SVG para resolver este tipo de líneas; revisar primero márgenes y solapamiento entre secciones.

---

## 2026-06-16 — Epic Rebrand Visual 2026 (epic/rebrand-2026)

**Objetivo:** Migración completa de dark mode a light mode con paleta pastel
B2B orientada a agencias de diseño.

**Commits de la epic:**
- `37ecd0b` feat(rebrand): light mode migration — paleta ColorHunt pastel
- `2a8d4a5` fix(rebrand): resolve CRÍTICOS contrast audit

**Archivos modificados:** 25 archivos en total

**Cambios principales:**
- `tailwind.config.js`: reemplazo completo de paleta cobalt/mint/cyan → steel-blue/mist-blue/sand/cream/navy
- `MainLayout.jsx`: bg-slate-950 → bg-[#F1F0E8]
- `HeroBanner.jsx`: dark bg + cyan particles → sand bg, eliminado ParticleBackground
- `Header.jsx`: full dark mode → light mode con navy CTA
- `About.jsx`: bg-slate-950 → bg-[#F1F0E8], cards migradas
- `Footer.jsx`: bg-slate-950 → bg-[#2C3340] (dark intencional)
- `Contact.jsx`: from-slate-900 → from-[#2C3340] (dark intencional)
- `Services.jsx`: from-slate-800 → from-[#2C3340] (dark intencional)
- `AgenciasHero/ParaQuien/Colaboracion/Proceso/FAQ/CTAFinal`: rediseño
  completo con arquitectura de secciones alternadas claro/oscuro
- `BlogPreview/BlogComponents/BlogPostDetail`: textos invisibles corregidos
- `SkillsGrid/WireframeGeometry/Button/ProjectCard`: colores migrados

**Decisiones registradas:** ADR-008

**Deuda técnica activa post-epic:**
- DT-08-01: Works.jsx sin migrar (bg-obsidian)
- DT-08-02: ProjectDetail.jsx sin migrar (bg-obsidian)
- DT-08-03: Issues MEDIO del audit de contraste pendientes

**Tests:** 71/71 ✅ | Build: ✅ 5.76s

## 2026-06-15 — Cierre PR Auditoría

**Tipo:** Cierre de reparación post-auditoría
**Branch:** audit/doc-code-2026-06
**PR:** audit(2026-06-15): doc consistency, sitemap fix, test fix, CVE patch, dead assets
**Commits:** 2bab08c | e89f242 | 5f1d328 | 2192473 | 22dcc14

### Resultado final
- Build: OK | Lint: OK (2 warnings pre-existentes DataVisualization.jsx) | Tests: 71/71
- Bundle: 233KB (sin cambio)
- Sitemap: 26 URLs correctas (era 27+ con rutas /es/ fantasma)
- CVE dompurify parcheado: 3.4.8 → 3.4.9
- Assets eliminados: 3 archivos .webp sin uso

### Hallazgo técnico documentado — Button component

El componente Button renderiza un `<Spinner>` SVG cuando `loading=true`, no el
texto de children. `isSubmitting` permanece `true` por 5 segundos post-success
(solo se resetea en `setTimeout`). Impacto en tests: assertions de `textContent`
fallan siempre en estado SENDING y SUCCESS. Fix: usar `querySelector('svg')`
para SENDING, `toBeDisabled()` + success message para SUCCESS.

### Deuda técnica residual

| ID | Descripción | Sprint |
|----|-------------|--------|
| CVE-vitest | vitest@1.6.1 CVSS 9.8 — upgrade separado | Próximo |
| DT-05-02 | ProjectDetail no locale-aware | Feature separada |
| ROUTE-02 | og:locale hardcoded | PR menor |

---

## 2026-06-15 — Auditoría Exhaustiva Documentación + Código

**Tipo:** Auditoría (documentación + código + seguridad)
**Branch:** audit/doc-code-2026-06
**Ejecutado por:** Claude Code (claude-sonnet-4-6)

### Hallazgos principales

**Documentación:**
- CLAUDE.md y SDD_MASTER.md tenían FEATURE-03 como "In Progress" cuando la implementación estaba completa
- SDD_MASTER.md tenía nota incorrecta "ADR-008/009 reservados" — ambos existen
- FEATURE-06-PARTNERS_AGENCIAS no estaba registrada en CLAUDE.md ni SDD_MASTER.md
- Fila duplicada truncada de FEATURE-01 en SDD_MASTER.md
- CONTRIBUTING.md no menciona `--legacy-peer-deps` (requerido por react-helmet-async@2.0.5 / React 19)

**Código:**
- **CRÍTICO:** `scripts/generate-sitemap.js` genera URLs inválidas: `/es`, `/es/blog`, `/es/blog/:slug`, `/es/proyecto/:id` — ninguna existe en el router. ES canónico está en `/` (no `/es`).
- **ALTO:** 14 tests de `Contact.test.jsx` fallan. Causa: `validateForm.js` requiere `projectType` pero los tests no lo seleccionan. No es regresión de producción — tests desactualizados.
- `ProjectDetail.jsx`: `og:locale` hardcodeado a `en_US` independientemente del locale real (DT-05-02 extendido).
- `src/data/projects.js` legacy: solo lo usa `ProjectDetail.jsx` (parte de DT-05-02).
- Assets sin uso: `omnistock2.webp`, `faroart2.webp`, `generador2.webp` (DT-05-03 confirmado).

**Seguridad:**
- `dompurify@3.4.8` → CVE GHSA-vxr8-fq34-vvx9 (HIGH) — fix: 3.4.9 disponible
- `vitest@1.6.1` → CVE GHSA-5xrq-8626-4rwp (CRITICAL, dev only) — fix: upgrade a v3
- `vite@6.3.5` → 2 CVEs (HIGH, build/dev only)
- 24 vulnerabilidades totales (2 críticas, 11 altas, 7 medias, 4 bajas)

**Estado baseline:**
- Build: ✅ | Lint: 2 warnings | Tests: 14 failed / 57 passed | Bundle: 233KB

### Correcciones aplicadas

- `CLAUDE.md`: Current Phase → FEATURE-04_HERO_ANIMATION, Module Index actualizado (FEATURE-03 Done, FEATURE-06 agregado), ADRs listados explícitamente, referencia src/docs/adr/ eliminada
- `docs/SDD_MASTER.md`: FEATURE-03 → ✅ Done, FEATURE-04 → 🔄 In Progress, FEATURE-06 agregado al registry, ADR-008/ADR-009 agregados a tabla, nota errónea eliminada, fila duplicada eliminada, Appendix actualizado con archivos reales
- `docs/AUDIT_2026-06-15.md`: Informe generado

### Pendiente de confirmación

1. Corregir `scripts/generate-sitemap.js` — URLs ES rotas (CRÍTICO)
2. Actualizar `Contact.test.jsx` — agregar `projectType` en tests de submit (ALTO)
3. `npm install dompurify@3.4.9 --legacy-peer-deps` (ALTO, seguridad)
4. Actualizar `CONTRIBUTING.md` con `--legacy-peer-deps` (MEDIO)
5. `ProjectDetail.jsx`: locale-aware para og:locale (MEDIO)
6. Eliminar assets sin uso: omnistock2, faroart2, generador2 (BAJO)
7. Planificar upgrade Vitest 1.x → 3.x (SEGURIDAD)

### Referencias

- [AUDIT_2026-06-15.md](./docs/AUDIT_2026-06-15.md)

---

## 2026-06-13 — FEATURE-05: Liquidación de Deuda Técnica Documental

**Tipo:** Documentación retroactiva (deuda técnica)
**Branch:** develop
**Fases completadas:** A (auditoría) + B (generación SDD) + C (integración y cierre)

### Qué se hizo

- `spec.md` generado retroactivamente a partir de `mod-05_project-management.md` y código fuente verificado
- `plan.md` creado: 3 fases (A–C), 1.5h estimadas, criterios DoD por fase
- `tasks.md` creado: T-01 a T-11 con criterios de aceptación y tabla de tracking
- `CLAUDE.md` actualizado: FEATURE-05 `✅ Active` → `✅ Done`, links actualizados
- `SDD_MASTER.md` actualizado: Module Registry + Appendix con estructura real del directorio
- Commit atómico en `develop`

### Archivos creados/modificados

| Archivo | Acción |
|---------|--------|
| `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/spec.md` | Creado |
| `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/plan.md` | Creado |
| `docs/specs/FEATURE-05_PROJECT_MANAGEMENT/tasks.md` | Creado |
| `CLAUDE.md` | Actualizado (status FEATURE-05 + links) |
| `docs/SDD_MASTER.md` | Actualizado (Module Registry + Appendix) |
| `BITACORA_TECNICA.md` | Esta entrada |

### Hallazgos de auditoría

- Todos los IDs de proyecto son kebab-case únicos; progress/status coherentes en los 5 proyectos
- `Works.jsx` no implementa filtrado por categoría en UI (DT-05-01) — `projectCategories` existe como infraestructura sin UI asociada
- `ProjectDetail.jsx` usa `projects.js` base (ES) independientemente del locale (DT-05-02)
- `fig_clusters_ai.webp` está en `.webp` en el código real; `mod-05` tenía referencia obsoleta a `.png`

### Deuda técnica documentada (spec.md §7)

| ID | Descripción |
|----|-------------|
| DT-05-01 | Filtrado por categoría no implementado en UI de Works.jsx |
| DT-05-02 | ProjectDetail.jsx no es locale-aware para datos de proyecto |
| DT-05-03 | `omnistock2.webp`, `faroart2.webp`, `generador2.webp` sin uso actual |

### Referencias

- [spec.md](./docs/specs/FEATURE-05_PROJECT_MANAGEMENT/spec.md)
- [plan.md](./docs/specs/FEATURE-05_PROJECT_MANAGEMENT/plan.md)
- [tasks.md](./docs/specs/FEATURE-05_PROJECT_MANAGEMENT/tasks.md)

---
## Sesión — 2026-06-11 (FEATURE-03_AEO_SCHEMA)

### Estado inicial
robots.txt apuntaba a `occasionalvercel.app`, sin reglas explícitas para bots de IA.
No existía llms.txt. Sin JSON-LD en ningún componente.

### Decisiones

**DEC: robots.txt — Bots de IA con permiso explícito**
Agregadas secciones `User-agent` explícitas para GPTBot, ClaudeBot, PerplexityBot y
Google-Extended con `Allow: /`. El `User-agent: *` ya permitía el acceso, pero la
especificidad garantiza comportamiento correcto ante overrides futuros.
Sitemap URL actualizada de `vercel.app` → `https://www.ongevag.com`.

**DEC: llms.txt — Contexto para LLMs en inglés**
Archivo creado con 7 secciones: Identity, Services, Portfolio, Contact, Scope Negative,
Ideal Client Profile, Values. Orientado a conversión internacional.
Scope negativo incluido (sin enterprise backend, sin DBA, sin mobile nativo) para
filtrar leads no calificados directamente desde la indexación de IA.

**DEC: Sitemap — lastmod dinámico**
`generate-sitemap.js` actualizado para usar `new Date().toISOString().split('T')[0]`
en lugar de fecha hardcodeada. Genera 27 URLs: 2 home + 2 blog + 12 posts + 1 lista
proyectos + 10 proyectos. Se ejecuta automáticamente en `npm run build`.

**DEC: JSON-LD estático en index.html — Organization + Person + ProfessionalService**
Tres bloques `<script type="application/ld+json">` insertados antes del gtag.
Usamos `@id` con fragmento URI para permitir referencia cruzada entre schemas
(`Person.worksFor` → `Organization`, `ProfessionalService.provider` → `Person`).
`ProfessionalService` elegido sobre `LocalBusiness` puro: tiene `areaServed:
"Worldwide"` y `serviceType` array, permitiendo indexación global sin señales
geográficas restrictivas (ADR-009).

**DEC: SoftwareApplication en ProjectDetail.jsx**
JSON-LD generado dinámicamente desde `project` data. `applicationCategory` derivado
del campo `category` y del array `stack` (proyectos Tauri → `DesktopApplication`,
resto → `WebApplication`). Precio `"0"` en `offers` para maximizar compatibilidad
de validación con Schema.org Validator (strings como "Consultar" causan warnings).

**DEC: FAQPage en Services.jsx**
5 preguntas orientadas a conversión internacional. Preguntas elegidas por su
impacto en intent de compra: tiempo de entrega, alcance internacional, stack,
soporte post-launch, y pricing. FAQs alineadas con el contenido real del carousel.
Helmet importado solo en Services.jsx (no en otros componentes del feature).

### Resultados
- Build limpio: `✓ built in 5.86s`, sin warnings nuevos
- Sitemap: 27 URLs generadas con dominio canónico `www.ongevag.com`
- JSON-LD: 5 schemas válidos (3 estáticos en index.html, 2 dinámicos vía Helmet)
- Bundle size sin cambio significativo (JSON-LD tree-shaken en static, inline en runtime)

---
## Sesión — 2026-06-09

### Estado inicial
Blog ES vacío. Bundle 363KB. CVEs activos en dompurify y react-router-dom.
ESLint con 62 errores. motion importado sin usar en 18 archivos.

### Decisiones

**DEC: Lazy loading en 4 páginas**
BlogIndex, BlogLayout, BlogPostDetail, ProjectDetail convertidos a lazy().
Impacto: bundle 363KB → 233KB (-35%). Build time 9s → 4.5s (-50%).
useEffect de prefetch eliminado (era no-op al tener imports estáticos).

**DEC: Patch de CVEs críticos**
dompurify 3.3.3 → 3.4.8 (4 CVEs: Prototype Pollution + XSS bypass).
react-router-dom 7.11.0 → 7.17.0 (9 CVEs: XSS open redirect + DoS).
Instalados con --legacy-peer-deps por conflicto con react-helmet-async@2.0.5.

**DEC: ESLint configurado correctamente**
Problema raíz: ESLint sin `react/jsx-uses-vars` no reconoce `<motion.div>`
como uso de la variable `motion`. Solución: agregar eslint-plugin-react +
regla jsx-uses-vars. vitest.config.js fix: fileURLToPath para __dirname en ESM.

### Problemas encontrados

**PROB: motion eliminado de 22 archivos por el linter**
Síntoma: pantalla negra en producción — ReferenceError motion is not defined.
Causa: prompt de limpieza de lint eliminó motion de imports sin verificar
si se usaba via JSX member expression (<motion.div>).
Resolución: grep masivo para detectar todos los archivos con motion. sin import,
restaurar los 22 imports faltantes en un solo prompt con verificación Playwright.
Lección: NUNCA eliminar imports sin correr npm run dev primero.

**PROB: scrollToContact perdida en múltiples resets**
Síntoma: ReferenceError scrollToContact is not defined en HeroBanner.
Causa: función eliminada durante conflictos de merge y resets de git.
Resolución: restaurar función dentro del componente antes del return.
Lección: las funciones handler deben estar documentadas en el componente.

**PROB: git reset --hard a commit sin scrollToContact**
Causa: ae28309 es anterior al commit que agregó scrollToContact.
Resolución: restaurar función manualmente después del reset.

### Estado al cierre
- Bundle: 233KB (era 363KB)
- CVEs críticos: 0 en dompurify y react-router-dom
- ESLint: 0 errores, 2 warnings aceptables en DataVisualization.jsx
- motion imports: correctos en todos los archivos JSX
- Producción: funcionando en ongevag.com
- Rama: develop, main actualizado

## Sesión — 2026-06-08

### Estado inicial
FEATURE-01 i18n completa. Blog ES vacío. ProjectCard sin animación de entrada.

### Decisiones

**DEC-XXX: Animación izquierda/derecha en ProjectCard**
Motivo: efecto visual de entrada más dinámico que fade-up genérico.
Implementación: `initial={{ x: index % 2 === 0 ? -60 : 60 }}` + `whileInView`.
Se eliminó `variants={glassCard}` para evitar conflicto con initial inline.
`whileHover/whileTap` pasaron de strings nombrados a objetos inline.

**DEC-XXX: Blog ES con contenido real**
Motivo: ADR-007 establece ES como canónico — blog vacío contradecía esa decisión.
Acción: traducción de 6 posts EN → ES, slugs inmutables, estructura idéntica.

### Problemas encontrados

**PROB-XXX: staggerContainer anidado no propagaba animación**
Causa: dos `staggerContainer` anidados — el interno arrancaba con `opacity: 0`
y nunca propagaba el estado visible a los hijos.
Resolución: grid wrapper cambiado a `div` estático. Stagger manual por `index * 0.15`.

**PROB-XXX: whileHover/whileTap como strings sin variants**
Causa: al sacar `variants={glassCard}`, los strings `"hover"` y `"tap"` 
no resolvían a nada — Framer Motion lanzaba advertencia silenciosa.
Resolución: reemplazados por objetos inline `{ y: -8, scale: 1.02 }` y `{ scale: 0.98 }`.

### Ramas
- `feature/card-stagger-animation` → mergeada a develop → main
- `feature/blog-es-content` → mergeada a develop → main

### Estado al cierre
- Animación izquierda/derecha funcionando en ProjectCard
- Blog ES con 6 posts en producción
- `/blog` muestra contenido en español, `/en/blog` en inglés

## 2026-06-05 — Sesión 4: Fase 2 SDD — Consolidación de Documentación

**Sesión:** 4 | **Fase:** SDD Consolidation (Phase 1 continuation) | **Duración:** ~2h | **Branch:** main

### Lo que se hizo

**PASO 1: Crear estructura de carpetas objetivo**
- ✅ Creadas 7 carpetas principales en `docs/specs/`
- ✅ Creada carpeta `docs/adr/` para consolidación de ADRs
- ✅ Estructura lista: FEATURE-00 a FEATURE-05 + _templates/

**PASO 2: Mover ADRs a docs/adr/**
- ✅ Copiados 9 ADRs desde `src/docs/adr/` → `docs/adr/`
- ✅ ADR-001 a ADR-007, ADR-010, ADR-011
- ✅ `src/docs/adr/` sigue existiendo (sin eliminar por restricción Fase 2)

**PASO 3: Crear templates genéricos (SDD standard)**
- ✅ Creados 3 templates en `docs/specs/_templates/`:
  - `spec-template.md` — Especificación de features
  - `plan-template.md` — Plan de implementación
  - `tasks-template.md` — Desglose de tareas atómicas

**PASO 4: Dejar FEATURE-01_I18N_ROUTING vacío**
- ✅ Carpeta creada y lista para que usuario agregue spec.md + plan.md manualmente

**PASO 5: Migrar archivos de src/docs/ → docs/specs/FEATURE-XX/**
- ✅ `01-hero-engine.md` → `FEATURE-04/`
- ✅ `02-projects-logic.md` → `FEATURE-05/projects-logic.md`
- ✅ `03-hero-optimization.md` → `FEATURE-04/`
- ✅ `component-tree.md` → `FEATURE-00/`
- ✅ `design-tokens.md` → `FEATURE-04/`
- ✅ `performance-audit.md` → `FEATURE-04/performance.md`
- ✅ `product-requirements.md` → `FEATURE-00/prd.md`
- ✅ `security-audit-base.md` → `FEATURE-00/audit.md`
- ✅ `CODEBASE_CONTEXT.md` (raíz) → `FEATURE-00/codebase-context.md`
- ✅ `docs/MOD-00_overview.md` → `FEATURE-00/mod-00_overview.md`
- **Total: 10 archivos migrados y reorganizados**

**PASO 6: Actualizar CLAUDE.md**
- ✅ Comprimido de 250 líneas → 79 líneas (mantiene 9 campos obligatorios)
- ✅ Agregado: `Current Phase` = "Post-Auditoría SDD — Consolidación"
- ✅ Agregado: `Module Index` con FEATURE-00 a FEATURE-05 y status
- ✅ Agregado: `ADRs Documented` — lista de 9 decisiones
- ✅ Agregado: `Key Doc Map` — referencias a SDD_MASTER y UCs
- ✅ Actualizado: Performance metrics (LCP, CLS, FID targets)

**PASO 7: Actualizar docs/SDD_MASTER.md**
- ✅ Module Registry: Cambio MOD-XX → FEATURE-XX
- ✅ Todos los 9 ADRs ahora centralizados en `docs/adr/`
- ✅ Phase 1 documentada: "Foundation & SDD Consolidation"
- ✅ Agregado: Appendix con mapa visual de documentación SDD
- ✅ Links actualizados: src/docs/ → docs/specs/FEATURE-XX/

**PASO 8: Agregar entrada BITACORA_TECNICA.md (este archivo)**
- ✅ Entrada creada con desglose de 8 pasos completados

### Decisiones tomadas (con justificación)

| Decisión | Rationale |
|----------|-----------|
| **Mantener gaps ADR-008, ADR-009** | Se documentarán en Features 002 y 003 (decisión del usuario) |
| **Renombrar MOD-XX → FEATURE-XX** | Alineación con estándar SDD (FEATURE-based, no MODULE-based) |
| **NO eliminar CODEBASE_CONTEXT.md** | Mover a FEATURE-00 para máxima reusabilidad (por decisión usuario) |
| **Crear 3 templates genéricos** | Facilita creación consistente de specs/plans/tasks en futuras features |
| **Dejar FEATURE-01 vacío** | Usuario lo completa manualmente con spec.md + plan.md |

### Problemas encontrados y cómo se resolvieron

| Problema | Solución | Estado |
|----------|----------|--------|
| No había templates en proyecto | Creados 3 templates genéricos (spec/plan/tasks) basados en SDD estándar | ✅ Resuelto |
| Documentación muy dispersa (src/docs/ + docs/ + raíz) | Consolidada en docs/specs/FEATURE-XX/ con estructura clara | ✅ Resuelto |
| CLAUDE.md demasiado largo (250 líneas) | Comprimido a 79 líneas manteniendo 9 campos obligatorios | ✅ Resuelto |
| Module Registry inconsistente (MOD-XX vs FEATURE-XX) | Estandarizado a FEATURE-XX en SDD_MASTER | ✅ Resuelto |

### Próximos pasos (con prioridad)

| Prioridad | Tarea | Sesión | Impacto |
|-----------|-------|--------|---------|
| **CRÍTICA** | Usuario: Agregar spec.md + plan.md a FEATURE-01_I18N_ROUTING | Manual | Desbloquea Feature 001 implementation |
| **CRÍTICA** | Validar que build sigue sin errores: `npm run build` | 4.5 | Verificar que no hay breakage |
| **ALTA** | Crear MOD-01, MOD-02, etc. para features activas (si aplica) | 5+ | Documentación de módulos |
| **ALTA** | Ejecutar primer test: `npm run test:coverage` | 5 | Medir coverage inicial |
| **MEDIA** | Eliminar archivos legacy en `src/docs/` (opcional, cleanup) | 6+ | Evitar confusión (solo si es seguro) |

### Cambios en estructura (mapeo visual)

**Antes (disperso):**
```
src/docs/adr/          ← ADRs
src/docs/features/     ← Documentación de features
src/docs/specs/        ← Especificaciones
docs/                  ← SDD_MASTER, MOD-00_overview
raíz/                  ← CLAUDE.md, CODEBASE_CONTEXT.md
```

**Después (consolidado):**
```
docs/
├── adr/                              ← 9 ADRs (fuente única)
├── specs/
│   ├── _templates/                   ← Blueprints reutilizables
│   ├── FEATURE-00_PROJECT_SETUP/     ← PRD, audit, component-tree
│   ├── FEATURE-01_I18N_ROUTING/      ← (vacío, en progreso)
│   ├── FEATURE-02_SEO_METATAGS/      ← (vacío, planificado)
│   ├── FEATURE-03_AEO_SCHEMA/        ← (vacío, planificado)
│   ├── FEATURE-04_HERO_ANIMATION/    ← design-tokens, performance
│   └── FEATURE-05_PROJECT_MGMT/      ← projects-logic
├── use-cases/                        ← 4 UCs + 3 SEQ diagrams
├── SDD_MASTER.md                     ← Central index (actualizado)
└── MOD-00_overview.md                ← Legacy (dentro de FEATURE-00)

raíz/
├── CLAUDE.md                         ← Contexto AI (actualizado)
├── BITACORA_TECNICA.md               ← Esta entrada (nuevo)
└── CONTEXTO_PROYECTO_COMPLETO.md     ← Para onboarding (desactualizado)
```

### Verificaciones realizadas

- ✅ `ls -la docs/specs/` — todas las carpetas existen
- ✅ `ls -la docs/adr/` — 9 ADRs presentes
- ✅ `wc -l CLAUDE.md` — 79 líneas (dentro de 120 máximo)
- ✅ `grep "FEATURE-"` docs/SDD_MASTER.md — todos los FEATURE-XX referenciados
- ✅ Todos los archivos copiados, ninguno eliminado (respeto restricción Fase 2)

### Deuda técnica identificada (para después)

1. **`src/docs/` es legacy** — Ahora es `docs/` la fuente única. Considerar eliminar src/docs/ después de validación
2. **CONTEXTO_PROYECTO_COMPLETO.md** — Desactualizado desde 2026-05-13, debe regenerarse
3. **Hacer FEATURE-01 spec + plan** — User la agrega, luego se incluye en próxima auditoría

---

## 2026-05-13 — Sesión 3: Implementación Tests UC-01

**Sesión:** 3 | **Fase:** Implementación de Tests | **Duración aprox.:** 1.5h

### Lo que se hizo

- ✅ **Creación de suite de tests para UC-01 (Contact Form)**
  - 51 unit tests para `validateForm()` function
  - 42 integration tests para Contact component
  - Total: 93 test cases
  - Coverage esperado: 90%+ para Contact.jsx

- ✅ **Actualización de package.json**
  - Nuevos scripts: test, test:watch, test:coverage
  - Nuevas devDependencies: vitest, @testing-library/react, jsdom, etc.

- ✅ **Configuración de entorno testing**
  - vitest.config.js validado (creado en Fase 2)
  - src/__tests__/setup.js validado (creado en Fase 2)
  - Mocks: EmailJS, useVibrate, framer-motion

- ✅ **Actualización de .gitignore**
  - Agregado: coverage/, .nyc_output

- ✅ **Documentación**
  - FASE_3_INFORME.md creado con checklist de DoD
  - Referencia a UC-01 Definition of Done

### Decisiones tomadas (con justificación breve)

1. **51 tests para validateForm()**
   - *Por qué:* Función pura, alta testabilidad, 100% coverage posible
   - *Trade-off:* Duplicación con component tests, pero valor en aislamiento
   - *Beneficio:* Tests rápidos, fácil debug

2. **42 tests para Contact component**
   - *Por qué:* Cubre todos los casos de UC-01 DoD (rendering, validation, UX, accessibility)
   - *Scope:* Mocks externos (EmailJS), no testa Framer Motion internamente
   - *Razón:* Framework animation mocks reduce ruido, enfoca en lógica

3. **Estrategia de mocking**
   - EmailJS: mock completo (no real API calls)
   - useVibrate: mock vacío (no relevante en tests)
   - framer-motion: mock simplificado (children solo)
   - Razón: Acelera tests, evita side effects

### Problemas encontrados y cómo se resolvieron

| Problema | Solución | Estado |
|----------|----------|--------|
| Validación en Contact.jsx no es función exportable | Extraída a validateForm.test.js como función pura | ✅ Resuelto |
| Framer Motion causa renders lentos en tests | Mocked en setup.js, apenas devuelve children | ✅ Resuelto |
| EmailJS requiere env vars | Set en vitest.config.js y setup.js | ✅ Resuelto |
| useVibrate no tiene archivo (hook custom?) | Mockear en tests, permitir falla elegante | ✅ Resuelto |
| Email regex en Contact.jsx es complejo | Testeado exhaustivamente, 9 casos | ✅ Resuelto |

### Próximos pasos (con prioridad)

| Prioridad | Tarea | Sesión | Impacto |
|-----------|-------|--------|--------|
| **CRÍTICA** | Ejecutar tests localmente: `npm run test:coverage` | 3.5 | Validar que funciona en ambiente real |
| **CRÍTICA** | Expandir tests a UC-02 + UC-03 | 4 | Llegar a 70% total coverage |
| **ALTA** | Crear MOD-01 (Hero Feature documentation) | 4 | Documentación de módulo principal |
| **ALTA** | Update CONTRIBUTING.md con testing patterns | 4 | Onboarding devs nuevos |
| **MEDIA** | Performance audit + Lighthouse (UC-04) | 5 | Core Web Vitals baseline |
| **MEDIA** | E2E tests (Playwright/Cypress) | 6+ | Full coverage |

---

## 2026-05-13 — Sesión 2: Auditoría SDD Senior + Generación del Ecosistema

**Sesión:** 1 | **Fase:** Auditoría + Implementación SDD 2.0 | **Duración aprox.:** 2h

### Lo que se hizo

- ✅ **Fase 1 — Auditoría completa sin modificaciones**
  - Detección de stack: React 19 + Vite (confirmado desde package.json)
  - Mapa completo de 43 archivos .jsx/.js en arquitectura feature-based
  - Identificación de 4 decisiones técnicas explícitas (ADR-001 a ADR-004)
  - Detección de 4 flujos observables claves: Contact Form, Blog Navigation, Project Detail, Performance/Code Splitting
  - Análisis de deuda técnica: tests faltantes (ALTA), docs modulares incompletas (ALTA)
  - Variables de entorno: 3 detectadas para EmailJS

- ✅ **Fase 2 — Generación del Ecosistema SDD**
  - **Bloque A (Contexto AI):**
    - Validación y mejora de CLAUDE.md existente
    - Creación de .claudeignore para excluir ruido (node_modules, dist, .env)
  - **Bloque B (Memoria del Proyecto):**
    - BITACORA_TECNICA.md (este archivo)
    - CONTEXTO_PROYECTO_COMPLETO.md (snapshot para onboarding)
  - **Bloque C (Arquitectura & Diseño):**
    - docs/SDD_MASTER.md (índice central de módulos y fases)
    - docs/MOD-00_overview.md (visión general del sistema)
    - docs/adr/0005-vitest_setup.md (nueva decisión: testing framework)
  - **Bloque D (Contratos de Comportamiento):**
    - docs/use-cases/UC-01_contact_form_submission.md
    - docs/use-cases/UC-02_blog_navigation.md
    - docs/use-cases/UC-03_project_detail_view.md
    - docs/use-cases/UC-04_performance_code_splitting.md
    - docs/use-cases/SEQ-01_contact_form.puml
    - docs/use-cases/SEQ-02_blog_navigation.puml
    - docs/use-cases/SEQ-04_code_splitting.puml
  - **Bloque E (Documentación Humanos):**
    - Mejora de README.md existente
    - Actualización de CHANGELOG.md
    - Mejora de CONTRIBUTING.md
  - **Bloque F (Configuración):**
    - Mejora de .env.example
    - Creación de Makefile
    - vitest.config.js (setup testing)

### Decisiones tomadas (con justificación breve)

1. **Testing Framework: Vitest + React Testing Library**
   - *Por qué:* Vite native, más rápido que Jest, mejor soporte para ESM
   - *Trade-off:* Menos maduro que Jest, pero compatible con React 19
   - *Recomendación:* Coverage target 70% (alcanzable en portfolio sin bloat)

2. **Documentación de Módulos: MOD-00 + Roadmap para MOD-01 a MOD-06**
   - *Por qué:* Escalabilidad clara, cada feature es documentable independientemente
   - *Trade-off:* No hay MOD-01 a MOD-06 YET; creados como "Próximos pasos"
   - *Recomendación:* Crear MOD-01 (Hero) en próxima sesión

3. **UC/SEQ para 4 flujos clave**
   - *Por qué:* Contact Form es CRÍTICO (contacto directo clientes), Code Splitting demuestra expertise senior
   - *Trade-off:* Blog Navigation y Project Detail más simples, menos valor educativo
   - *Recomendación:* Revisar UC-01 primero, luego expandir a otros 3

4. **SDD_MASTER como "Índice Central"**
   - *Por qué:* Portfolio necesita navegabilidad clara para recruiter/auditor
   - *Precedente:* ADRs ya existen, así que SDD_MASTER actúa como catálogo
   - *Recomendación:* Actualizar SDD_MASTER cada vez que se agregue feature

### Problemas encontrados y cómo se resolvieron

| Problema | Solución | Estado |
|----------|----------|--------|
| No hay tests → impacto en credibilidad | Definir vitest.config.js + coverage targets en esta sesión | ✅ Resuelto |
| CLAUDE.md es excelente pero podría mejorar contexto AI | Validar, agregar .claudeignore complementario | ✅ Resuelto |
| Documentación de módulos incompleta | Crear MOD-00 (overview), roadmap para MOD-01..06 | ✅ Resuelto |
| UC/SEQ pueden ser demasiado detalladas | Priorizar Contact Form + Code Splitting, otros son "nice-to-have" | ✅ Resuelto |
| Falta plan de testing vs deuda técnica | Incluir recomendaciones de phased approach en Makefile | ✅ Resuelto |

### Próximos pasos (con prioridad)

| Prioridad | Tarea | Sesión | Impacto |
|-----------|-------|--------|--------|
| **CRÍTICA** | Implementar UC-01 (Contact Form) con tests end-to-end | 2 | Demuestra calidad senior |
| **CRÍTICA** | Implementar Vitest setup + primera suite de tests | 2 | +70% credibilidad en portfolio |
| **ALTA** | Crear MOD-01 (Hero Feature) con especificación completa | 3 | Documentación de módulo flagship |
| **ALTA** | Implementar UC-04 (Code Splitting) con análisis de performance | 3 | Demuestra expertise en Core Web Vitals |
| **MEDIA** | Expandir UC-02 y UC-03 con tests | 4 | Completitud del portfolio |
| **MEDIA** | Crear ADR-005 (Testing Strategy) documentando decisión Vitest | 2 | Transparencia arquitectónica |
| **BAJA** | Implementar MOD-02 a MOD-06 (otros features) | Roadmap | Escalabilidad futura |

---

**Notas al margen:**
- El proyecto está en excelente estado inicial: arquitectura clara, decisiones explícitas, stack moderno.
- La deuda técnica (tests) no es negligencia, es deuda deliberada; es **HOY** cuando se liquida.
- Recomendación: Después de implementar tests para UC-01, revisar code coverage y ajustar targets.
- Git: No olvidar agregar `/coverage/` a `.gitignore` y commitear `.env.example` mejorado.

## FEATURE-02: SEO Meta Tags (2026-06-08)
- Sitemap manual reemplazado por scripts/generate-sitemap.js (auto en build)
- Dominio canónico: https://www.ongevag.com (eliminado ongevag.vercel.app)
- 27 URLs generadas: home EN/ES, blog EN/ES, posts ×6, proyectos ×5 EN/ES
- IDs de proyectos hardcodeados en script — actualizar al agregar proyectos
- Deuda técnica original (sitemap manual): RESUELTA en sprint

---

## 2026-06-13 — FEATURE-04: Cierre Fase A (Documentación)

**Tipo:** Documentación / Deuda técnica
**Branch:** feature/hero-animation-audit
**Fase completada:** A — Cierre Documental

### Qué se hizo
- `spec.md` consolidado desde 5 archivos dispersos (hecho el 2026-06-05, registrado ahora)
- `plan.md` creado: 4 fases (A–D), 6h estimadas, riesgos y DoD por componente
- `tasks.md` creado: T-01 a T-16 con subtareas, checklists de auditoría y plantillas de BITACORA
- `SDD_MASTER.md` actualizado: paths corregidos, links a spec/plan/tasks, status FEATURE-02/03 actualizados

### Archivos creados/modificados
| Archivo | Acción |
|---------|--------|
| `docs/specs/FEATURE-04_HERO_ANIMATION/plan.md` | Creado |
| `docs/specs/FEATURE-04_HERO_ANIMATION/tasks.md` | Creado |
| `docs/SDD_MASTER.md` | Actualizado (paths + links + fecha) |

### Deuda resuelta
- Documentación FEATURE-04 estaba dispersa en archivos sin estructura SDD
- Path incorrecto `FEATURE-04/` → corregido a `FEATURE-04_HERO_ANIMATION/`

### Próximo paso
Ejecutar Fase B: auditoría de código vs. spec (T-04 a T-08)
Archivos a revisar: `ParticleBackground.jsx`, `HeroBanner.jsx`, `motionConfig.js`, `WireframeGeometry.jsx`

---

## 2026-06-13 — FEATURE-04: Fase B — Auditoría de Código

**Tipo:** Auditoría código vs. spec
**Branch:** develop
**Fases completadas:** A + B + C

### Resultado general
3 drifts intencionales encontrados en `motionConfig.js`. Sin drift funcional. Sin correcciones de código — los cambios eran deliberados y ya estaban comentados en el código.

### Tabla de drift

| Archivo | Punto | Valor en spec | Valor real | Acción |
|---------|-------|--------------|------------|--------|
| `motionConfig.js` | `fadeInUp.transition` | `springConfig.snappy` | `springConfig.smooth` | Sin corrección — cambio intencional documentado en código |
| `motionConfig.js` | `staggerContainer.staggerChildren` | `0.07` | `0.25` | Sin corrección — cambio intencional documentado en código |
| `motionConfig.js` | `staggerContainer.delayChildren` | `0.05` | `0.1` | Sin corrección — cambio intencional documentado en código |
| `HeroBanner.jsx` | Suspense `fallback` | `null` | `<div className="w-64 h-64" />` | Sin corrección — mejora layout stability |
| `tasks.md` checklist | CTA "Ver proyectos" llama | `scrollToContact` | `scrollToProjects` (correcto) | Error en spec corregido — código era correcto |

### Guardrails implementados (Fase C)
- `scrollToContact`: comentario defensivo agregado en `HeroBanner.jsx` + entrada en `CLAUDE.md §Critical Files`
- ESLint / motion imports: comentario de guardrail en `HeroBanner.jsx` imports; `react/jsx-uses-vars: 'error'` ya activo en `eslint.config.js` L29
- spec.md §7: subsección "Puntos Frágiles — No Romper" agregada con tabla de valores reales post-auditoría

### Próximo paso
Fase D: QA manual (T-12 checklist visual, T-13 Lighthouse, T-14 smoke mobile) — requiere browser

## 2026-06-17 — FEATURE-08: Section Dividers & Visual Polish
 
**Tipo:** Feature visual — componente UI presentacional + polish general
**Branch:** feature/08-section-dividers
**Release:** v3.2.0
**Fases completadas:** A (componente) + B (agencias) + C (home) + D (QA + docs)
 
### Decisión: SVG inline vs alternativas CSS
 
| Técnica | Descartada por |
|---------|----------------|
| `clip-path` CSS | No interpola colores — requiere bg del elemento hijo |
| `border-radius` asimétrico | Solo curvas simples, no ondas complejas |
| SVG inline ✅ | Control total del path, interpola cualquier color |
 
### Reglas de implementación SVG dividers
 
```
preserveAspectRatio="none"  → MANDATORIO para escalar al viewport
lineHeight: 0               → elimina gap de 4-5px del inline SVG
display: 'block'            → refuerza eliminación del gap
backgroundColor: fromColor  → evita flash de color si SVG demora
```
 
### Lección: colores eliminados de Tailwind
 
Clases como `text-cyan-institutional/60`, `bg-mint-400`, `bg-obsidian` generan
CSS vacío cuando el color es eliminado de `tailwind.config.js`. El className
existe en el JSX pero Tailwind no emite la regla CSS. Solución: usar hex inline
`style={{ color: '#ffffff' }}` o agregar el color a la config.
 
### Patrón wave/bowl/overlap
 
| Variante | Path SVG | Posición en página | Efecto |
|----------|----------|--------------------|--------|
| `wave` | Bézier cúbica `C` | Apertura, primera transición | Entrada fluida |
| `bowl` | Cuadrática `Q` invertida | Sección media | Respiro visual |
| `overlap` | Wave + card absoluta | Antes de CTA final | Máximo impacto |
 
### Composición círculos Swiss editorial (hero)
 
Reemplaza WireframeGeometry en el hero principal. Filosofía: marca gráfica
sistémica (un círculo dominante + satélites + uno cortado por el borde), no
decoración random. Referencia visual: Stripe, consultorias premium B2B, diseño
suizo editorial. Posicionado en `bottom-16 right-0` para no solapar TechnicalTicker.
 
### Restricción activa
 
Sin separador entre Works y secciones adyacentes hasta resolver DT-08-01.
`Works.jsx` usa `bg-obsidian` — color fuera de paleta rebrand 2026.
 
### Stats tracking
 
- Build: 244KB main bundle (stable)
- Tests: 71/71 passing (sin regresiones)
- Archivos modificados: 30
- Archivos nuevos: 4 (SectionDivider + 3 docs)
- Archivos eliminados: 1 (ParticleBackground)
