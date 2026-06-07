# Tasks: FEATURE-01 — i18n URL-Based Routing

**Branch**: `feature/seo-aeo-i18n-button`
**Input**: `docs/specs/FEATURE-01_I18N_ROUTING/spec.md` + `plan.md`
**Prerequisites**: spec.md ✅ | plan.md ✅ | ADR-006/007/010/011 ✅

---

## Estado actual

| Task | Descripción | Estado |
|------|-------------|--------|
| T-01 | ADR Documentation | ✅ Completo — commiteado |
| T-02 | Locale Files UI Strings | ✅ Completo — commiteado (c9aa944) |
| T-03 | Locale-Keyed Data Files | ✅ Completo — commiteado |
| T-04 | LocaleContext + useLocale Hook | ⏳ Pendiente |
| T-05 | App.jsx Route Refactor | ⏳ Pendiente |
| T-06 | vercel.json Rewrite Rules | ⏳ Pendiente |
| T-07 | LangSwitcher Component | ⏳ Pendiente |
| T-08 | Feature Component Migration | ⏳ Pendiente |

---

## Phase 1: Foundation (COMPLETADA ✅)

**Propósito**: Documentación y locale files antes de tocar código.

- [x] T-01 Crear ADR-006, ADR-007, ADR-010, ADR-011 en `docs/adr/`
- [x] T-02 [P] Crear `src/locales/en/*.js` (common, hero, services, works, contact)
- [x] T-02 [P] Crear `src/locales/es/*.js` (espejo exacto de en/)

**Checkpoint**: Locale files commiteados. Verificar estructura idéntica de keys entre `en/` y `es/` antes de continuar.

---

## Phase 2: Data Layer (Bloqueante para Phase 3+)

**Propósito**: Separar datos de negocio por locale antes de tocar componentes.

**⚠️ CRÍTICO**: No modificar componentes hasta que esta phase esté completa.

- [ ] T-03 Leer `src/data/projects.js` y documentar estructura de campos
- [ ] T-03 Crear `src/data/projects.en.js` — mismos slugs, descripciones en inglés
- [ ] T-03 Crear `src/data/projects.es.js` — mismos slugs, contenido español actual
- [ ] T-03 [P] Leer `src/features/blog/data/blogData.js` y documentar estructura
- [ ] T-03 [P] Crear `src/features/blog/data/blogData.en.js` — contenido EN
- [ ] T-03 [P] Crear `src/features/blog/data/blogData.es.js` — array vacío `export default []`

**Verificación T-03**:
```bash
# Slugs deben ser idénticos en ambos archivos
node -e "const en = require('./src/data/projects.en.js'); const es = require('./src/data/projects.es.js'); console.log(en.map(p=>p.slug).join() === es.map(p=>p.slug).join())"
```

**Checkpoint T-03**: Commit antes de continuar. Slugs idénticos confirmados.

---

## Phase 3: User Story 1 — International Visitor (Priority: P1) 🎯 MVP

**Goal**: `/` sirve inglés por defecto. Sin redirect. Sin localStorage.

**Independent Test**: Navegar a `/` → todo en inglés. `document.documentElement.lang === "en"`.

### Infraestructura compartida (prerequisito de US1, US2, US3)

- [ ] T-04 Crear `src/context/LocaleContext.jsx`
  - Context shape: `{ locale: "en"|"es", t: object }`
  - Exporta `LocaleProvider` — acepta prop `locale` del router
  - Importa locale files correctos según `locale` activo
- [ ] T-04 Crear `src/hooks/useLocale.js`
  - Consume `LocaleContext`
  - Lanza error si se usa fuera del provider
  - Retorna `{ locale, t }`

**Verificación T-04**:
```bash
npm run lint
# Sin errores en context/ ni hooks/
```

- [ ] T-05 Refactorizar `src/App.jsx`
  - Envolver rutas en `LocaleLayout` que inyecta `LocaleProvider`
  - `/` → `LocaleProvider(locale="en")` → componentes existentes
  - `/es` → `LocaleProvider(locale="es")` → mismos componentes
  - `/es/*` → nested routes bajo prefijo `/es`
  - Sin duplicar componentes de página

**Verificación T-05**:
```bash
npm run dev
# Navegar a / → inglés
# Navegar a /es → español
# Navegar a /es/blog → sin crash
# Zero errores en consola
```

- [ ] T-06 Actualizar `vercel.json`
  - Agregar rewrites para `/es`, `/es/blog`, `/es/works/:slug`, `/es/blog/:slug`
  - Todas apuntan a `index.html`
  - No romper rewrites existentes

**Verificación T-06**:
```bash
# Push a Vercel preview
# Navegar a [preview-url]/es/works/omnistock
# F5 → no 404
```

**⚠️ CHECKPOINT OBLIGATORIO**: Verificar `/` y `/es/*` en Vercel preview antes de Phase 4.
Reportar resultado del smoke test. No avanzar si hay 404.

---

## Phase 4: User Story 2 — Spanish Visitor Switches Locale (Priority: P2)

**Goal**: Botón `EN | ES` visible en header. Navega entre locales preservando path.

**Independent Test**: Desde `/works/omnistock` → click ES → URL es `/es/works/omnistock`.

- [ ] T-07 Crear `src/components/ui/LangSwitcher.jsx`
  - Lee `pathname` desde `useLocation()`
  - Si path empieza con `/es` → strip prefix → navegar a EN
  - Si no → prepend `/es` → navegar a ES
  - Usa `useNavigate()` para navegación
  - Renderiza `<button>EN</button> | <button>ES</button>`
  - Marca activo el locale actual
  - Reset scroll top al cambiar

- [ ] T-07 Integrar `LangSwitcher` en `src/components/Header.jsx`
  - Posición: después de nav links, antes de CTA
  - Import y render de `<LangSwitcher />`

**Verificación T-07**:
```bash
# Test manual en todos los tipos de ruta:
# / → click ES → /es ✓
# /works/omnistock → click ES → /es/works/omnistock ✓
# /es/blog/post-slug → click EN → /blog/post-slug ✓
# /blog → click ES → /es/blog ✓
```

**Checkpoint**: LangSwitcher funciona en todos los tipos de ruta. Commit antes de T-08.

---

## Phase 5: User Story 3 — Search Engine Indexability (Priority: P2)

**Goal**: Componentes consumen `useLocale()`. Cero strings hardcodeados.

**Independent Test**: `grep -r "Servicios\|Contacto\|Proyectos\|Sobre mí" src/features/` retorna vacío.

- [ ] T-08 Migrar `src/features/hero/HeroBanner.jsx`
  - Reemplazar strings hardcodeados por `t.hero.*`
  - `const { t, locale } = useLocale()`
  - Verificar: `npm run lint` + visual check en `/` y `/es`

- [ ] T-08 Migrar `src/features/services/Services.jsx`
  - Reemplazar strings hardcodeados por `t.services.*`
  - Verificar: visual check en `/` (EN) y `/es` (ES)

- [ ] T-08 Migrar `src/features/works/Works.jsx`
  - Reemplazar strings por `t.works.*`
  - Reemplazar import directo de `projects.js` por import condicional según `locale`
  - Verificar: proyectos EN en `/works`, proyectos ES en `/es/works`

- [ ] T-08 Migrar `src/features/contact/Contact.jsx`
  - Reemplazar strings por `t.contact.*`
  - Verificar: form labels EN en `/`, form labels ES en `/es`

- [ ] T-08 Migrar `src/components/Header.jsx`
  - Nav links desde `t.common.nav.*`

- [ ] T-08 Migrar `src/components/Footer.jsx`
  - Strings desde `t.common.footer.*`

- [ ] T-08 Agregar banner en `/es/blog` cuando `blogData.es.js` está vacío
  - Texto: "Technical content is available in English only."
  - Link directo a `/blog`

**Verificación final T-08**:
```bash
grep -r "Servicios\|Contacto\|Proyectos\|Sobre mí\|Hablemos\|Portafolio" src/features/ src/components/
# Resultado esperado: vacío
npm run lint
# Zero errores
```

---

## Phase 6: User Story 4 — Path-Aware Switching (Priority: P3)

**Goal**: Logo navega al locale root correcto. Scroll reset en cada switch.

**Independent Test**: En `/es/works/omnistock` click logo → navega a `/es`, no a `/`.

- [ ] T-07b Actualizar logo href en `Header.jsx`
  - Si locale es `es` → href `/es`
  - Si locale es `en` → href `/`
  - Computed desde `useLocale()`, no hardcodeado

**Verificación**:
```bash
# En /es/works/omnistock → click logo → /es ✓
# En /works/omnistock → click logo → / ✓
```

---

## Phase 7: Definition of Done — Validación completa

- [ ] CA-001 `curl https://ongevag.com/` → `<html lang="en">` + English title
- [ ] CA-002 `/es` renderiza en español — grep confirma strings ES solo en rutas `/es`
- [ ] CA-003 Slugs inmutables — `/works/omnistock` ↔ `/es/works/omnistock`
- [ ] CA-004 DevTools → Application → Local Storage → vacío post-switch
- [ ] CA-005 F5 en `/es/works/cualquier-slug` → no 404 en Vercel
- [ ] CA-006 `grep -r "Servicios\|Contacto\|Proyectos" src/features/` → vacío
- [ ] CA-007 LangSwitcher path-awareness en home, works detail, blog index, blog detail
- [ ] CA-008 `npm run test` — useLocale() resuelve locale y t correctamente
- [ ] CA-009 `npm run lint` → zero errores
- [ ] CA-010 Git log confirma ADR commits antes que cualquier src/ commit

---

## Reglas de ejecución

- Una task a la vez
- Commit después de cada phase completada
- No avanzar de phase sin OK explícito
- Reportar output de verificación antes de pedir OK
- ❌ No tocar src/ fuera de los archivos listados
- ❌ No agregar dependencias externas
- ❌ No localStorage

---

## Task Execution Log

### T-07 — LangSwitcher component ✅ DONE
- Commits: e78994b, e697e46, 8678106
- Entregables: LangSwitcher.jsx en src/components/ui/

### T-08 — Migrate components to useLocale ✅ DONE
- Commits: a1e16e1, cc8f6eb, b17f743, feat(i18n): migrate HeroBanner/Services/Works/Contact
- Componentes migrados: HeroBanner, Services, Works, Contact, Header, Footer, About
- Locale files creados: en/about.js, es/about.js
- Bug corregido: Header usaba t() como función → corregido a t.common.nav.*
- Deuda técnica: LocaleProvider expone t como objeto plano (no función).
  Si se requiere sintaxis t('clave') en el futuro → refactorizar LocaleProvider.
- Pendiente promovido: Blog empty state → T-09

### T-09 — Blog i18n completo ⏳ PLANNED
- Scope:
  - [ ] Empty state UI cuando blogPosts = []
  - [ ] BlogComponents.jsx — migrar strings hardcodeados
  - [ ] BlogLayout.jsx — migrar a useLocale()
  - [ ] locale-aware data routing (BlogIndex consume blogData por locale)
  - [ ] blogData.es.js — definir estrategia (traducir o redirigir a EN)
- Prerequisito: decisión sobre blogData.es.js antes de implementar
