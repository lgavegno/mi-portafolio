# FEATURE-12: Soluciones de gestión (Odoo / Dux) — Plan de Implementación
**Plan Version:** 1.0
**Status:** Draft — pendiente de aprobación
**Input:** `spec.md` v1.0 (Approved 2026-11-07)
**Rama:** `feature/odoo-dux-solutions` (desde `develop`, al día con `origin/develop`)
**Total Estimated Effort:** ~30 h
**Start Date:** 2026-11-07

---

## 1. Resumen Ejecutivo

Se agrega a ongevag.com el servicio "Sistemas de gestión": una franja de dos puertas en el hero,
una sección con carrusel por capítulos (7 slides Odoo + 5 Dux) que se carga bajo demanda, y páginas
compartibles `/odoo` y `/dux` en ES/EN/PT. Cada botón de WhatsApp lleva un `ref` por camino y slide,
y GA4 registra puertas, slides vistos y clics de WhatsApp.

El orden prioriza lo que se puede testear sin UI (utils, refs, exclusiones de contenido) y deja la
integración en el hero para el final, para no tocar `HeroBanner.jsx` hasta tener la sección lista.
La limpieza de marca va en un commit aparte.

---

## 2. Principios de ejecución

- **Privacidad primero:** la presentación original vive en `docs/reference/` (ignorado por git).
  Ningún archivo versionado nombra al partner ni contiene sus datos; el test de exclusiones lo
  impide en CI local. Los términos prohibidos del test se guardan ofuscados (por partes) para que
  el propio test no los contenga.
- **Validación por paso:** cada task cierra con `npm run build && npm run lint && npm run test`
  (Node 22) y, si toca UI, revisión en `npm run preview`.
- **Conventional Commits**, un commit por task o grupo chico de tasks. Nunca `main`; PR a `develop`
  solo con autorización de Leo.
- `npm install --legacy-peer-deps` si hiciera falta instalar algo (no se prevén dependencias nuevas).
- Archivos críticos: `SectionDivider.jsx`, `vercel.json`,
  `ParticleBackground.jsx` sin cambios; `LocaleProvider` solo suma el módulo `solutions`.

---

## 3. Fases

### Fase A — Fundación (≈ 4 h)
**Dependencias:** ninguna · **Entrega:** baseline medido, ADR, config y utils con tests.

- T-00 Baseline: tamaño de `index-*.js.br` y Lighthouse de `/` antes de tocar nada.
- T-01 ADR-015 (contenido de presentaciones fuera de `LocaleProvider`).
- T-02 `src/config/contact.js` + `WhatsAppFloat` lee de ahí.
- T-03 Tokens `odoo`, `dux`, `dux-ink` en Tailwind + validación de contraste.
- T-04 Utils puras con tests primero: `formatTemplate`, `whatsapp` (`buildRef`, `buildWhatsAppUrl`), `swipe` (`resolveSwipe`).

### Fase B — Contenido (≈ 7 h)
**Dependencias:** T-04 · **Entrega:** textos completos ES/EN/PT, cifras verificadas, test de exclusiones.

- T-05 `locales/{es,en,pt}/solutions.js` + registro en `LocaleProvider`.
- T-06 `data/slides.es.js` (12 slides, fuente de verdad).
- T-07 `data/slides.en.js` y `data/slides.pt.js` (PT con marcador ADR-014).
- T-08 Verificación de cifras en odoo.com y duxsoftware.com.ar → `verifiedAt`. Lo que no se pueda verificar queda sin `verifiedAt` (no se muestra) y se lista para Leo.
- T-09 `contentExclusions.test.js` + test de integridad de datos (refs, regex, cifras con fuente, paridad de slides entre locales).

### Fase C — Componentes (≈ 10 h)
**Dependencias:** Fase B · **Entrega:** sección y páginas funcionando en preview.

- T-10 `WhatsAppCTA` + `useSolutionTracking` (dedupe de `slide_view`).
- T-11 `SolutionCarousel` + `ChapterNav` + `CarouselProgress` (teclado, swipe, reduced motion, ARIA).
- T-12 Slides (8 tipos) + `SlideRenderer` + mockups Dux.
- T-13 `PathSwitch` + `SolutionsSection` (variantes `home` / `page`, carga dinámica del locale).
- T-14 `SolutionsPage` + 6 rutas en `App.jsx` + Helmet.
- T-15 Ocultar `WhatsAppFloat` en `/odoo` y `/dux`.
- T-16 `SolutionDoors` + integración en `HeroBanner` y estado en `HomeSections`.
- T-17 5.ª tarjeta en `Services`.

### Fase D — SEO, build y marca (≈ 4 h)
**Dependencias:** T-14 · **Entrega:** sitemap, vista previa OG por ruta, repo sin la palabra prohibida.

- T-18 Sitemap: 6 URLs nuevas.
- T-19 Script post-build `scripts/generate-route-meta.js` → `dist/{,en/,pt/}{odoo,dux}/index.html` con `<head>` propio. Imágenes OG provisorias hasta tener las definitivas.
- T-20 Limpieza de marca (`index.html` JSON-LD, README, Makefile, ADR-009 con nota de enmienda). Commit aparte `chore(brand)`.

### Fase E — QA (≈ 4 h)
**Dependencias:** Fases C y D · **Entrega:** AC-01…AC-26 verificados.

- T-21 Tests de integración: puertas, carrusel, tracking, páginas, LangSwitcher.
- T-22 Build + lint + test completos; comparación de bundle contra T-00 (NFR-03/04).
- T-23 Lighthouse (desktop + mobile Slow 4G), QA manual en 320/375/768/1280, teclado, lector de pantalla (VoiceOver), reduced motion.

### Fase F — Cierre (≈ 1 h)
**Dependencias:** Fase E · **Entrega:** docs al día y PR listo.

- T-24 `CLAUDE.md`, `docs/SDD_MASTER.md`, `BITACORA_TECNICA.md`, `tasks.md` con resultados reales.
- T-25 Push de la rama y PR a `develop` — **solo con OK de Leo**.

---

## 4. Decisiones técnicas del plan

| Tema | Decisión |
|------|----------|
| Estado de la home | `useState` en `HomeSections`; `HeroBanner` recibe `onOpenSolution`. Sin contexto nuevo. |
| Carga diferida | `lazy(() => import('./features/solutions/components/SolutionsSection'))` solo cuando `solutionPath !== null`; el contenido llega con `import(\`../data/slides.${locale}.js\`)`. |
| Montaje de slides | Solo el slide activo dentro de `AnimatePresence mode="wait"`. |
| Swipe | `motion.div` con `drag="x"`, `dragConstraints={{ left: 0, right: 0 }}`, `dragElastic` bajo; `onDragEnd` delega en `resolveSwipe()`. `touch-action: pan-y`. La tira de capítulos queda fuera del área arrastrable (evita conflicto con su scroll horizontal). |
| Teclado | `onKeyDown` en el contenedor del carrusel. Ignora eventos que vienen de `[role=tablist]` internos de Odoo S4 y de inputs. |
| Reduced motion | Hook existente `useReducedMotion()`; con `true`, variantes de opacidad ≤ 150 ms y `scrollIntoView({ behavior: 'auto' })`. |
| Tracking | `useSolutionTracking({ path, entry, locale })` con un `Set` de refs vistos por montaje; delega en `utils/trackEvent.js`. |
| Página | Un solo `SolutionsPage` con prop `path`; switch → `navigate(prefix + '/dux')`. |
| Vista previa OG | Post-build: copia `dist/index.html` y reemplaza `title`, `description`, `og:*`, `twitter:*` y `canonical`. Hay que verificar en un preview deploy de Vercel que `/odoo` sirva `dist/odoo/index.html` antes del rewrite catch-all. Si no lo sirve, se descarta T-19 sin tocar `vercel.json` y se avisa. |
| Íconos | `react-icons/fi` (ya instalado). Sin assets de terceros. |

---

## 5. Definición de Done por fase

| Fase | DoD |
|------|-----|
| A | ADR-015 creado; utils con tests en verde; tokens validados (≥ 4,5:1 texto, ≥ 3:1 UI). |
| B | 12 slides × 3 locales con paridad; exclusiones y refs en verde; lista de cifras no verificadas para Leo. |
| C | FR-01…FR-19 y FR-21 implementados; sin warnings de lint; preview revisado. |
| D | 6 URLs en sitemap; `git grep -nw` de la palabra prohibida vacío; T-19 verificado o descartado con motivo. |
| E | AC-01…AC-26 marcados con evidencia en `tasks.md`. |
| F | Docs actualizados; PR abierto a `develop` (si Leo lo autoriza). |

---

## 6. Riesgos y mitigaciones

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|-----------|
| Se cuela un dato del partner en un archivo versionado | Media | Alto | `docs/reference/` ignorado; test de exclusiones; revisión de `git diff --cached` antes de cada commit. |
| `solutions.js` engorda el chunk de entrada | Media | Medio | Solo strings cortos en el locale; contenido en `slides.*.js` dinámico; medición contra T-00. |
| Cifras de Odoo/Dux no verificables o cambiadas | Alta | Bajo | No se renderizan sin `verifiedAt`; el slide funciona sin ellas. |
| Vercel no sirve `dist/odoo/index.html` antes del rewrite | Media | Bajo | Probar en preview deploy; si falla, vista previa genérica (aceptado en spec §5.3). |
| Swipe interfiere con scroll vertical o con la tira de capítulos | Media | Medio | `pan-y`, umbral, tira fuera del área de drag; QA en dispositivo real. |
| Cambio del JSON-LD (`Organization.name`) afecta SEO/AEO | Baja | Medio | Commit aparte; validar con Rich Results Test; fácil de revertir. |
| Traducción PT/EN con errores | Media | Bajo | Marcador ADR-014; revisión de Leo antes de publicar. |
| Las puertas empujan las Stats y alargan el hero en mobile | Media | Bajo | Puertas compactas (≤ 96 px); revisar en 320/375 px. |

---

## 7. Timeline (orientativo)

```
2026-11-07  Fase A + inicio Fase B
2026-11-08  Fase B + Fase C (carrusel y slides)
2026-11-09  Fase C (integración) + Fase D
2026-11-10  Fase E + Fase F → PR a develop (con OK de Leo)
```

Publicar en producción queda bloqueado por los pendientes fuera del código (spec §18).

---

## 8. Roles

| Rol | Responsable |
|-----|-------------|
| Desarrollo, tests, docs | Claude (sesión) |
| Revisión de copy EN/PT, cifras, assets, merge | Leandro Gavegno |

---

**Próximo paso:** aprobación de este plan → ejecutar Fase A según `tasks.md`.
