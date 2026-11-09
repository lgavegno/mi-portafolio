# Tasks: FEATURE-12 — Soluciones de gestión (Odoo / Dux)

**Branch:** `feature/odoo-dux-solutions`
**Input:** `spec.md` (Approved) + `plan.md`
**Validación por task:** `npm run build && npm run lint && npm run test` (+ `npm run preview` si toca UI)
**Regla de privacidad:** antes de cada commit, `git diff --cached` sin datos del partner; `docs/reference/` nunca se versiona.

---

## Estado

| Task | Descripción | Estado |
|------|-------------|--------|
| T-00 | Baseline bundle + Lighthouse | ✅ Done |
| T-01 | ADR-015 | ✅ Done |
| T-02 | `config/contact.js` + `WhatsAppFloat` | ✅ Done |
| T-03 | Tokens Tailwind + contraste | ✅ Done |
| T-04 | Utils puras + tests | ✅ Done |
| T-05 | Locales `solutions.js` + LocaleProvider | ✅ Done |
| T-06 | `slides.es.js` | ✅ Done |
| T-07 | `slides.en.js` / `slides.pt.js` | ✅ Done |
| T-08 | Verificación de cifras | ✅ Done |
| T-09 | Tests de exclusiones e integridad | ✅ Done |
| T-10 | `WhatsAppCTA` + `useSolutionTracking` | ✅ Done |
| T-11 | Carrusel, capítulos, progreso | ✅ Done |
| T-12 | Slides + mockups | ✅ Done |
| T-13 | `PathSwitch` + `SolutionsSection` | ✅ Done |
| T-14 | `SolutionsPage` + rutas + SEO | ✅ Done |
| T-15 | Ocultar `WhatsAppFloat` en páginas | ✅ Done |
| T-16 | `SolutionDoors` + HeroBanner + HomeSections | ✅ Done |
| T-17 | 5.ª tarjeta en Services | ✅ Done |
| T-18 | Sitemap | ✅ Done |
| T-19 | Meta por ruta post-build | ✅ Done |
| T-20 | Limpieza de marca | ✅ Done |
| T-21 | Tests de integración | ✅ Done |
| T-22 | Build/lint/test + bundle | ✅ Done |
| T-23 | Lighthouse + QA manual | ✅ Done |
| T-24 | Docs de cierre | ✅ Done |
| T-25 | PR a `develop` (con OK de Leo) | ✅ Done (#4; release v3.6.0 a main en #5) |

---

## Fase A — Fundación

### T-00: Baseline
**Effort:** 0.5h · **Dependencies:** ninguna
- [ ] `npm run build` → anotar tamaño de `dist/assets/index-*.js.br` y `index-*.css.br`.
- [ ] Lighthouse de `/` (desktop + mobile Slow 4G, incógnito) → anotar Performance, LCP, CLS, Accessibility.
- [ ] Anotar cantidad de tests en verde.

### T-01: ADR-015
**Effort:** 0.5h · **Dependencies:** ninguna
- [ ] `docs/adr/ADR-015.md` según spec §15 (contexto, opciones, decisión, consecuencias).
- **Commit:** `docs(adr): ADR-015 contenido de presentaciones fuera de LocaleProvider`

### T-02: Número de WhatsApp centralizado
**Effort:** 0.5h · **Dependencies:** ninguna
- [ ] `src/config/contact.js` exporta `WHATSAPP_NUMBER`.
- [ ] `WhatsAppFloat.jsx` lo importa; comportamiento sin cambios.
- [ ] `git grep 5493492665453 src` → un único resultado (AC-14).
- **Commit:** `refactor(contact): centralizar número de WhatsApp en config`

### T-03: Tokens de acento
**Effort:** 0.5h · **Dependencies:** ninguna
- [ ] `odoo: '#714B67'`, `dux: { DEFAULT: '#0B8A80', ink: '#08695F' }` en `tailwind.config.js`.
- [ ] Contraste calculado con script (fórmula WCAG) para: `odoo`/`dux-ink` sobre `#EEE0C9` y `#F1F0E8`; blanco sobre `odoo` y `dux-ink`; `dux` sobre crema (≥ 3:1). Resultados en este archivo (AC-26).
- **Commit:** `feat(theme): tokens de acento odoo y dux`

### T-04: Utils puras (tests primero)
**Effort:** 2h · **Dependencies:** T-02
- [ ] `formatTemplate('Hola {a}', { a: 'x' })` → `'Hola x'`; claves faltantes quedan intactas.
- [ ] `buildRef('odoo', 4)` → `'ODOO-S4'`; `buildRef('hero', 'dux')` → `'HERO-DUX'`; entradas inválidas lanzan error.
- [ ] `buildWhatsAppUrl({ message })` → `https://wa.me/<num>?text=<encodeURIComponent>`.
- [ ] `resolveSwipe(offsetX, velocityX)` → `1` (siguiente), `-1` (anterior), `0` según umbrales 50 px / 500 px/s (AC-08).
- **Commit:** `feat(solutions): utils de refs, WhatsApp y swipe con tests`

---

## Fase B — Contenido

### T-05: Locales de UI
**Effort:** 1.5h · **Dependencies:** T-04
- [ ] `src/locales/{es,en,pt}/solutions.js` con las claves de spec §7 (PT con `// TODO(leo): revisar traducción PT`).
- [ ] `LocaleProvider` registra `solutions` en los 3 locales.
- [ ] Paridad de claves entre los 3 archivos (script de diff de keys, como en FEATURE-10).
- **Commit:** `feat(i18n): módulo solutions en es/en/pt`

### T-06: Slides ES
**Effort:** 2.5h · **Dependencies:** T-05
- [ ] 7 slides Odoo + 5 Dux según spec §6, con `id`, `ref`, `type`, `chapter` (≤ 18 caracteres).
- [ ] Voz de Leo o neutra; sin "nosotros" del partner; sin la app de nombre prohibido.
- [ ] Cifras con `source` (odoo.com / duxsoftware.com.ar) y `verifiedAt: null` hasta T-08.

### T-07: Slides EN / PT
**Effort:** 1.5h · **Dependencies:** T-06
- [ ] Misma estructura, mismos `id` y `ref`. PT con marcador ADR-014.

### T-08: Verificación de cifras
**Effort:** 1h · **Dependencies:** T-06
- [ ] Revisar en las páginas oficiales: usuarios, partners, apps de la comunidad, desarrolladores (Odoo); año y ciudad de creación, nube, países (Dux); canales integrados (Dux).
- [ ] Completar `verifiedAt` y corregir valores; lo no verificable queda en `null` y se lista abajo para Leo.
- **Commit (T-06…T-08):** `feat(solutions): contenido de slides Odoo y Dux en es/en/pt`

### T-09: Tests de contenido
**Effort:** 0.5h · **Dependencies:** T-07
- [ ] `contentExclusions.test.js`: términos prohibidos armados por partes; recorre `slides.*.js` y `locales/*/solutions.js` (AC-19, AC-22).
- [ ] Integridad: refs cumplen regex, sin duplicados, iguales entre locales; misma cantidad de slides por camino; toda cifra con `verifiedAt` tiene `source.url` del dominio permitido (AC-13, AC-21).
- **Commit:** `test(solutions): exclusiones de contenido e integridad de datos`

---

## Fase C — Componentes

### T-10: CTA de WhatsApp y tracking
**Effort:** 1h · **Dependencies:** T-04, T-05
- [ ] `WhatsAppCTA` (props: `path`, `refCode`, `variant`, `messageKey`); `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` de locale, objetivo táctil ≥ 44 px.
- [ ] `useSolutionTracking` con `trackDoor`, `trackSlideView` (dedupe por montaje), `trackWhatsApp`.

### T-11: Carrusel
**Effort:** 3h · **Dependencies:** T-10
- [ ] Estado del índice, flechas deshabilitadas en extremos, sin loop ni autoplay (FR-06, FR-09).
- [ ] `ChapterNav` como `tablist`; capítulo activo con `scrollIntoView({ inline: 'nearest' })`.
- [ ] `CarouselProgress` (barra `aria-hidden` + texto "Capítulo n de N") y región `aria-live="polite"`.
- [ ] Teclado `←`/`→`/`Home`/`End` en el contenedor, ignorando tablists internos (FR-07).
- [ ] Drag horizontal con `resolveSwipe`, `touch-action: pan-y` (FR-08).
- [ ] Reduced motion (FR-10). Solo el slide activo montado (NFR-04). Alto mínimo del área en `≥ md` (NFR-09).

### T-12: Slides y mockups
**Effort:** 3h · **Dependencies:** T-11
- [ ] `SlideCards`, `SlideFacts`, `SlideAppGrid`, `SlideTabs` (APG tabs, flechas internas), `SlideComparison` (tabla → tarjetas `< sm`), `SlideProcess`, `SlideChannels`, `SlideVersus`, `SlideContact`.
- [ ] `DuxSalesPanelMock` y `DuxPosTicketMock` como `<figure>` con leyenda "Datos de ejemplo".
- [ ] `SlideRenderer` con `headingLevel` (h3 en home, h2 en página).
- [ ] Botón de WhatsApp en los 12 slides (FR-11). Aviso de marcas en los slides de contacto.
- **Commit (T-10…T-12):** `feat(solutions): carrusel por capítulos con WhatsApp y tracking`

### T-13: Sección
**Effort:** 1h · **Dependencies:** T-12
- [ ] `PathSwitch` (2 botones `aria-pressed`, acentos según spec §10).
- [ ] `SolutionsSection` con `id="soluciones"`, fondo `#EEE0C9`, lead de derivación antes del slide 1 (spec §3.4), carga dinámica de `slides.${locale}.js`, aviso de marcas al pie.

### T-14: Página y rutas
**Effort:** 1h · **Dependencies:** T-13
- [ ] `SolutionsPage` (prop `path`, `h1`, intro, switch que navega a la ruta hermana, link a la home).
- [ ] 6 rutas en `App.jsx` (lazy). Helmet con title, description, canonical, 4 hreflang, og:* (spec §5.2).
- **Commit (T-13…T-14):** `feat(solutions): sección y páginas /odoo y /dux`

### T-15: Botón flotante
**Effort:** 0.5h · **Dependencies:** T-14
- [ ] `MainLayout` no renderiza `WhatsAppFloat` cuando el path (sin prefijo de locale) es `/odoo` o `/dux`.

### T-16: Puertas en el hero
**Effort:** 1h · **Dependencies:** T-13
- [ ] `SolutionDoors` (eager) entre CTA y Stats de `HeroBanner.jsx` (spec §3.2); link secundario con `HERO-*`.
- [ ] `HeroBanner` acepta `onOpenSolution`; sin la prop, navega a `/odoo` o `/dux` del locale.
- [ ] `HomeSections`: estado `solutionPath`, `Suspense` + sección lazy entre el hero y el divisor wave; scroll y foco al abrir.
- [x] (rev. 1.1) Hero sin CTAs ni Stats; puertas como única acción (AC-01).
- **Commit (T-15…T-16):** `feat(hero): franja de sistemas de gestión con puertas Odoo y Dux`

### T-17: Tarjeta en Services
**Effort:** 0.5h · **Dependencies:** T-14
- [ ] 5.ª tarjeta en los 3 locales con links a `/odoo` y `/dux`; copy de "Software de Gestión a Medida" ajustado para no pisarse.
- [ ] El carrusel 3D funciona con 5 ítems.
- **Commit:** `feat(services): tarjeta Sistemas de gestión`

---

## Fase D — SEO, build y marca

### T-18: Sitemap
**Effort:** 0.5h · **Dependencies:** T-14
- [ ] 6 URLs en `scripts/generate-sitemap.js` (`monthly`, `0.8`) y conteo actualizado (AC-18).
- **Commit:** `feat(seo): sitemap con páginas de soluciones`

### T-19: Meta por ruta (post-build)
**Effort:** 2h · **Dependencies:** T-14
- [ ] `scripts/generate-route-meta.js` genera `dist/{,en/,pt/}{odoo,dux}/index.html` a partir de `dist/index.html`, con title/description/og/twitter/canonical por locale.
- [ ] `build` lo ejecuta después de `vite build`.
- [ ] Verificar en preview deploy que `/odoo` sirve ese HTML (`curl -s <preview>/odoo | grep og:title`). Si no, revertir T-19 y documentar.
- [ ] Imágenes OG: fallback `/og-image.png` hasta tener `og-odoo.png` / `og-dux.png`.
- **Commit:** `feat(seo): meta estática por ruta para vista previa en WhatsApp`

### T-20: Limpieza de marca
**Effort:** 1h · **Dependencies:** ninguna
- [ ] `index.html` (JSON-LD), `README.md`, `Makefile`, `docs/adr/ADR-009.md` (con nota de enmienda).
- [ ] `git grep -nw` de la palabra prohibida → vacío (AC-20).
- [ ] JSON-LD válido (Rich Results Test tras deploy de preview).
- **Commit aparte:** `chore(brand): eliminar sufijo de marca anterior del repo`

---

## Fase E — QA

### T-21: Tests de integración
**Effort:** 2h · **Dependencies:** Fase C
- [ ] `SolutionDoors.test.jsx`: refs `HERO-*`, `solution_door_click`, fallback a ruta sin `onOpenSolution` (AC-03, AC-12).
- [ ] `SolutionCarousel.test.jsx`: AC-04, AC-05, AC-06, AC-07, AC-09, AC-10 y AC-11 (los 12 slides).
- [ ] `tracking.test.jsx`: AC-15 con `window.gtag` mockeado.
- [ ] `SolutionsPage.test.jsx`: AC-16 y AC-17 (6 rutas + LangSwitcher).

### T-22: Validación completa
**Effort:** 0.5h · **Dependencies:** T-21
- [ ] Build, lint y test en verde; suite previa sin regresiones (AC-23).
- [ ] Bundle de entrada vs. T-00 ≤ +3 KB brotli; `slides.*` y la sección en chunks propios (AC-02, NFR-03/04).

### T-23: Lighthouse y QA manual
**Effort:** 1.5h · **Dependencies:** T-22
- [ ] Lighthouse `/` y `/odoo`, desktop + mobile Slow 4G (AC-24).
- [ ] 320/375/768/1280 px: sin scroll horizontal, foco visible, swipe y teclado (AC-25).
- [ ] VoiceOver: anuncio de capítulos, headings, tabs internos.
- [ ] Reduced motion activado en el sistema.

---

## Fase F — Cierre

### T-24: Documentación
**Effort:** 0.5h · **Dependencies:** Fase E
- [ ] `CLAUDE.md` (Current Phase, Module Index, ADRs, Critical Files si aplica), `docs/SDD_MASTER.md`, `BITACORA_TECNICA.md`, este archivo con resultados.

### T-25: PR a `develop`
**Effort:** 0.5h · **Dependencies:** T-24
- [ ] **Pedir OK a Leo** antes de `git push` y de abrir el PR.
- [ ] PR con resumen, notas de testing, links a spec/plan, y lista de pendientes fuera del código (spec §18).

---

## Log de ejecución

- 2026-11-07 — Spec aprobada (defaults Q1–Q8). `docs/reference/` agregado a `.gitignore`; presentación original copiada ahí (no versionada).
- 2026-11-07 — T-00 baseline: `index-*.js.br` 83.943 B · `index-*.css.br` 9.041 B · 72 tests en verde (3 archivos). Lighthouse: se toma el registrado en CLAUDE.md (2026-06-18: desktop 98 / mobile 61, A11y 94); la medición comparativa se hace en T-23 con el mismo método antes/después.
- 2026-11-07 — T-01 ADR-015 creado. T-02 `src/config/contact.js`; `WhatsAppFloat` lo usa.
- 2026-11-07 — T-03 tokens `odoo`, `dux`, `dux-ink`. Contraste (fórmula WCAG 2.1, script local):

  | Par | Ratio | Resultado |
  |-----|-------|-----------|
  | `odoo` #714B67 sobre #EEE0C9 / #F1F0E8 | 5,56 / 6,32 | ✅ texto AA |
  | Blanco sobre `odoo` | 7,23 | ✅ texto AA |
  | `dux-ink` #08695F sobre #EEE0C9 / #F1F0E8 | 5,05 / 5,75 | ✅ texto AA |
  | Blanco sobre `dux-ink` | 6,57 | ✅ texto AA |
  | `dux` #0B8A80 sobre #EEE0C9 / #F1F0E8 | 3,25 / 3,70 | ✅ solo UI/no-texto (≥ 3:1) |
  | Blanco sobre `dux` | 4,23 | ❌ texto normal → no se usa |

- 2026-11-07 — T-04 utils `formatTemplate`, `whatsapp`, `swipe` + 11 tests. Fase A validada: lint 0 errores (2 warnings previos en `DataVisualization.jsx`), 83/83 tests, build OK; entrada 83.967 B (+24 B).
- 2026-11-07 — T-05 `locales/{es,en,pt}/solutions.js` registrados en `LocaleProvider` (entrada +1,7 KB brotli: 85.730 B).
- 2026-11-07 — T-06/T-07 12 slides en ES/EN/PT (PT con marcador ADR-014). Frase opcional Q8 ("Conozco Odoo desde adentro…") **no incluida** hasta confirmación de Leo.
- 2026-11-07 — T-08 Odoo verificado en `odoo.com/page/about-us`: 28 M usuarios ✅, 21.000+ partners ✅. Correcciones: apps de la comunidad 40.000+ → **50.000+**; "100.000+ desarrolladores" no figura (la página dice 2.000) → reemplazado por **50 aplicaciones principales** ✅. `duxsoftware.com.ar` responde 403 a lectura automática → cifras de Dux sin verificar (no se muestran).
- 2026-11-07 — T-09 `contentExclusions.test.js` + `dataIntegrity.test.js`. Los términos sensibles del partner (nombre, contacto, clientes) viven en `docs/reference/forbidden-terms.json`, **ignorado por git**; el test los usa si el archivo existe. 118/118 tests.
- 2026-11-07 — Fase C: componentes de `features/solutions` (carrusel, 9 tipos de slide, mockups Dux, switch, sección), `SolutionsPage` + 6 rutas, `WhatsAppFloat` oculto en `/odoo` y `/dux`, puertas en `HeroBanner` (entre CTA y Stats; `scrollToContact` intacto), estado en `HomeSections`, 5.ª tarjeta en Services (copy de "a medida" ajustado). El mock global de Framer Motion pasó a Proxy con caché por tag (sin caché remontaba inputs y rompía Contact).
- 2026-11-07 — T-21 adelantada: 30 tests de integración (carrusel, puertas, tracking, páginas, LangSwitcher, flujo de la home). Suite total **148/148**.
- 2026-11-07 — Build: `slides.{es,en,pt}` (~3,7 KB br c/u) y `SolutionsSection` (5,2 KB br) en chunks propios. **Entrada 88.311 B br (+4.368 B vs. baseline) → supera NFR-03 (≤ 3 KB)**: lo que entra son los strings de `solutions.js` y de la 5.ª tarjeta de Services en los 3 locales (LocaleProvider importa todo de entrada) + `SolutionDoors`. Ningún código del carrusel ni contenido de slides. Pendiente decisión de Leo.
- 2026-11-07 — Preview: el servidor de desarrollo no levanta dentro de la herramienta de navegador de esta sesión (sin respuesta en :5173). Revisión visual queda para T-23.
- 2026-11-07 — T-18 sitemap: 51 URLs (+6 de soluciones, `priority 0.8`).
- 2026-11-07 — T-19 `scripts/generate-route-meta.js` corre después de `vite build` y genera `dist/{,en/,pt/}{odoo,dux}/index.html` con `lang`, title, description, og:title/description y twitter:* por locale (assets con rutas absolutas). **Falta** verificar en un preview deploy de Vercel que `/odoo` sirva ese HTML (requiere push). Imagen OG: fallback `/og-image.png`.
- 2026-11-07 — T-20 sufijo de marca eliminado en `index.html` (JSON-LD válido), README, Makefile, `public/llms.txt`, `public/robots.txt`, ADR-009 (+ nota de enmienda), docs de FEATURE-03 y la clave `common.logo.tagline` (no se usaba). **Pendiente decisión de Leo**: 3 menciones de "Android Studio" (producto de Google) en posts del blog y "Creative Studio" (tipo de cliente) en `locales/en/agencies.js`; no son marca ONGEVAG.
- 2026-11-07 — Rev. 1.1 del hero (pedido de Leo tras ver el preview): fuera "Ver proyectos", "Contactar", Stats y el split mobile `min-h-[75vh]`; `scrollToContact`/`scrollToProjects` eliminados y regla de CLAUDE.md actualizada. Puertas rediseñadas (producto en su propia línea, WhatsApp como ícono con `aria-label` y ref `HERO-*`). Claves `hero.cta`/`hero.stats` eliminadas de los 3 locales. 149/149 tests.
- 2026-11-07 — Rev. 1.2: interruptor `FEATURES.solutions` (`src/config/features.js`). Modo soluciones: marca `sr-only` (h1 intacto), badge + puertas en la columna izquierda centradas en vertical (sin tapar las figuras; puertas en 1 columna en `lg`, 2 en `xl`), hero ajustado al contenido en mobile. Modo normal: marca visible, sin puertas ni tarjeta en Services. Tests de ambos modos. 152/152.
- 2026-11-07 — Rev. 1.3: sección a pantalla completa en desktop (pedido de Leo: en MacBook 13" se cortaba y no se veían las flechas). Encabezado compacto, flechas a los costados de la tarjeta, WhatsApp dentro de la tarjeta. Un solo juego de botones (fila en mobile, `lg:contents` + posicionamiento absoluto en desktop). Mobile y menú global sin cambios. 152/152.
- 2026-11-07 — Correcciones de la auditoría externa:
  - **Alta** Services: tarjetas no frontales con `aria-hidden` + `inert` (los links Odoo/Dux de tarjetas ocultas ya no reciben foco); la rotación automática se pausa con foco de teclado y con `prefers-reduced-motion`.
  - FR-02: el carrusel remonta con `key={path-focusToken}` → reabrir la misma puerta vuelve al capítulo 1.
  - Dedupe de `solution_slide_view` por montaje del carrusel (el hook pasó de `SolutionsSection` a `SolutionCarousel`).
  - Carrusel con `role="region"`; orden DOM/foco anterior → siguiente → WhatsApp (en mobile `order-*` mantiene la vista anterior · WhatsApp · siguiente). Capítulos y switch vuelven a 44 px en desktop.
  - Puertas más bajas en mobile: sin fila "Ver presentación" (flecha junto al nombre) y menos padding. Estimado ~84 px a 375 px con frase en una línea; ~104 px a 320 px con frase en dos líneas (pendiente medir en QA).
  - Route-meta: el HTML estático suma canonical, 4 hreflang, og:url y og:locale (`data-route-meta`); `SolutionsPage` los retira al montar para no duplicar los de Helmet.
  - Test intermitente resuelto: las aserciones de GA4 esperaban antes de que corriera el efecto; ahora usan `waitFor`. 157/157 en 4 corridas seguidas.
- 2026-11-07 — Rev. 1.4 (recomendaciones de la auditoría adoptadas): NFR-03 ≤ 5 KB; regla de marca como identidad histórica (se mantienen "Android Studio" y "Creative Studio"); sin frase de Odoo 19; `FEATURES.solutions = false` ⇒ `/odoo` y `/dux` redirigen a la home, sin entradas en sitemap ni HTML estático.
- 2026-11-07 — **QA (T-22/T-23)** con `vite preview` local:
  - Visual 1440×800: hero con bloque a la izquierda sin tapar figuras; sección a pantalla completa. Los 12 slides entran sin scroll interno (antes de los ajustes: 5 desbordaban hasta 159 px). 1280×720: 7 slides usan el scroll interno de la tarjeta (≤ 73 px), fallback aceptado.
  - Mobile 375×812: sin scroll horizontal; puertas de 105 px (Dux) y 121 px (Odoo) — por encima del objetivo de 96 px; se mantiene por decisión de Leo de no tocar mobile.
  - Bug encontrado y corregido: `ChapterNav` usaba `scrollIntoView` y cortaba el scroll suave al abrir una puerta. Ahora mueve solo la tira horizontal; el scroll de la sección espera a que el contenido cargue. Verificado con el panel visible (sección alineada bajo el menú).
  - Lighthouse local (`vite preview` sin brotli, misma máquina, 2 corridas, `develop` vs rama): desktop perf 75/79 vs 67/86, LCP 1,5–1,6 s vs 1,5–1,7 s, CLS 0 en ambos; mobile perf 43/43 vs 37/45. **Sin regresión fuera del ruido.** A11y desktop 91 = 91; mobile 91 → 87 por secciones existentes que ahora entran antes en el análisis (contraste `#96B6C5`/link Faro Art = DT-08-03; indicadores de Services de 8 px, ahora 5 en vez de 4). `/odoo`: a11y 96, SEO 100.
  - Corregido por Lighthouse: `aria-controls` de las puertas apuntaba a una sección aún no montada.
  - Entrada final 88.092 B br (+4.149 B, dentro del NFR-03 rev. 1.4 ≤ 5 KB). 160/160 tests en 2 corridas.
- 2026-11-07 — Pendiente fuera del QA: VoiceOver real y swipe en dispositivo físico (no disponibles en la sesión). Verificación de `dist/odoo/index.html` en Vercel tras el deploy de develop.
- 2026-11-07 — Merge a develop (#4) y release **v3.6.0** a main (#5, tag `v3.6.0`); develop sincronizado. Producción verificada: `/odoo`, `/en/dux`, `/pt/odoo` sirven su HTML estático (title, OG, canonical, hreflang); sitemap con las 6 URLs; JSON-LD con `ONGEVAG`.

## Cifras no verificadas (para Leo)

Ocultas en el sitio (`verifiedAt: null`) hasta que se confirmen en el sitio oficial de Dux:

| Slide | Cifra | Qué encontré |
|-------|-------|--------------|
| DUX-S1 | 2017 · creado en Córdoba | Nota de prensa (InfoNegocios): octubre de 2017, Córdoba. Otra base de datos dice 2015. |
| DUX-S1 | 100 % en la nube | Sin fuente oficial accesible. |
| DUX-S1 | 4 países (AR, CL, MX, UY) | Prensa menciona Uruguay, Panamá y México; **no encontré Chile**. |

Para publicarlas: abrir duxsoftware.com.ar, confirmar el dato y cambiar `verifiedAt` a la fecha en los 3 `slides.*.js` (el test exige que coincidan).
