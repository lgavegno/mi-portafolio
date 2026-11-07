# Tasks: FEATURE-12 — Soluciones de gestión (Odoo / Dux)

**Branch:** `feature/odoo-dux-solutions`
**Input:** `spec.md` (Approved) + `plan.md`
**Validación por task:** `npm run build && npm run lint && npm run test` (+ `npm run preview` si toca UI)
**Regla de privacidad:** antes de cada commit, `git diff --cached` sin datos del partner; `docs/reference/` nunca se versiona.

---

## Estado

| Task | Descripción | Estado |
|------|-------------|--------|
| T-00 | Baseline bundle + Lighthouse | ⏳ Pending |
| T-01 | ADR-015 | ⏳ Pending |
| T-02 | `config/contact.js` + `WhatsAppFloat` | ⏳ Pending |
| T-03 | Tokens Tailwind + contraste | ⏳ Pending |
| T-04 | Utils puras + tests | ⏳ Pending |
| T-05 | Locales `solutions.js` + LocaleProvider | ⏳ Pending |
| T-06 | `slides.es.js` | ⏳ Pending |
| T-07 | `slides.en.js` / `slides.pt.js` | ⏳ Pending |
| T-08 | Verificación de cifras | ⏳ Pending |
| T-09 | Tests de exclusiones e integridad | ⏳ Pending |
| T-10 | `WhatsAppCTA` + `useSolutionTracking` | ⏳ Pending |
| T-11 | Carrusel, capítulos, progreso | ⏳ Pending |
| T-12 | Slides + mockups | ⏳ Pending |
| T-13 | `PathSwitch` + `SolutionsSection` | ⏳ Pending |
| T-14 | `SolutionsPage` + rutas + SEO | ⏳ Pending |
| T-15 | Ocultar `WhatsAppFloat` en páginas | ⏳ Pending |
| T-16 | `SolutionDoors` + HeroBanner + HomeSections | ⏳ Pending |
| T-17 | 5.ª tarjeta en Services | ⏳ Pending |
| T-18 | Sitemap | ⏳ Pending |
| T-19 | Meta por ruta post-build | ⏳ Pending |
| T-20 | Limpieza de marca | ⏳ Pending |
| T-21 | Tests de integración | ⏳ Pending |
| T-22 | Build/lint/test + bundle | ⏳ Pending |
| T-23 | Lighthouse + QA manual | ⏳ Pending |
| T-24 | Docs de cierre | ⏳ Pending |
| T-25 | PR a `develop` (con OK de Leo) | ⏳ Pending |

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
- [ ] `grep -n scrollToContact src/features/hero/HeroBanner.jsx` → definición + uso (AC-01).
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

## Cifras no verificadas (para Leo)

_(se completa en T-08)_
