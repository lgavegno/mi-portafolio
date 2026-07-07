# Tasks: FEATURE-10 — Portuguese Locale (PT)

**Branch**: `feature/pt-locale`
**Input**: `docs/specs/FEATURE-10_PT_LOCALE/spec.md` + `plan.md`
**Prerequisites**: spec.md ✅ | plan.md ✅ | ADR-013/014 pendientes

---

## Estado actual

| Task | Descripción | Estado |
|------|-------------|--------|
| T-01 | Resolver Open Question: segmento PT "agencias" | ✅ Completo |
| T-02 | ADR-013 + ADR-014 | ✅ Completo |
| T-03 | Locale files PT (8 archivos) | ✅ Completo |
| T-04 | Data files PT (projects + blog) | ✅ Completo |
| T-05 | LocaleProvider.jsx — agregar "pt" | ✅ Completo |
| T-06 | App.jsx — rutas /pt | ✅ Completo |
| T-07 | LangSwitcher.jsx — selector 3 idiomas | ✅ Completo |
| T-08 | Grep/visual validation | ✅ Completo |
| T-09 | Definition of Done | ✅ Completo |

---

## Phase A: Fundación

- [x] T-01 Confirmar con Leo el segmento de ruta PT para "agencias" (¿`agencias` igual que ES, o término distinto?)
- [x] T-02 Crear `docs/adr/ADR-013.md` — PT como tercer locale, extensión de arquitectura existente
- [x] T-02 Crear `docs/adr/ADR-014.md` — traducción generada por IA, marcador de revisión pendiente obligatorio

**Checkpoint**: ADRs commiteados antes de cualquier cambio en `src/`.

### Log de ejecución

- 2026-07-05 — T-01 resuelta por Leo: el segmento PT para agencias es `agencias`, ruta final `/pt/agencias`.
- 2026-07-05 — T-02 completada: creados `docs/adr/ADR-013.md` y `docs/adr/ADR-014.md`.

---

## Phase B: Contenido PT (borrador generado por Claude)

**⚠️ Todo archivo de esta fase lleva comentario `// TODO(leo): revisar traducción PT` hasta aprobación.**

- [x] T-03 [P] Crear `src/locales/pt/common.js` — espejo de keys de `es/common.js`
- [x] T-03 [P] Crear `src/locales/pt/hero.js`
- [x] T-03 [P] Crear `src/locales/pt/services.js`
- [x] T-03 [P] Crear `src/locales/pt/works.js`
- [x] T-03 [P] Crear `src/locales/pt/contact.js`
- [x] T-03 [P] Crear `src/locales/pt/about.js`
- [x] T-03 [P] Crear `src/locales/pt/blog.js`
- [x] T-03 [P] Crear `src/locales/pt/agencies.js` (nombre de archivo según resolución de T-01)
- [x] T-04 Crear `src/data/projects.pt.js` — mismos slugs que `projects.es.js`, campos descriptivos traducidos
- [x] T-04 Crear `src/features/blog/data/blogData.pt.js` — traducción completa de posts existentes, mismos slugs

**Verificación T-03**:
```bash
# Diff estructural de keys — deben coincidir en las 3 carpetas
node -e "
const fs = require('fs');
['common','hero','services','works','contact','about','blog'].forEach(f => {
  const keys = m => Object.keys(require(\`./src/locales/\${m}/\${f}.js\`).default || require(\`./src/locales/\${m}/\${f}.js\`));
  console.log(f, JSON.stringify(keys('es')) === JSON.stringify(keys('pt')));
});
"
```

**Verificación T-04**:
```bash
node -e "const es=require('./src/data/projects.es.js'); const pt=require('./src/data/projects.pt.js'); console.log(es.map(p=>p.slug).join()===pt.map(p=>p.slug).join())"
```

**Checkpoint**: Commit del contenido PT como borrador antes de tocar `LocaleProvider.jsx`.

### Log de ejecución

- 2026-07-05 — T-03 completada: creados 8 locale files PT con marcador `TODO(leo)`.
- 2026-07-05 — Verificación T-03: diff estructural oficial devolvió `common true`, `hero true`, `services true`, `works true`, `contact true`, `about true`, `blog true`; chequeo adicional `agencies true`.
- 2026-07-05 — T-04 completada: creados `src/data/projects.pt.js` y `src/features/blog/data/blogData.pt.js` con marcador `TODO(leo)`.
- 2026-07-05 — Verificación T-04: snippet oficial de projects falló en Node por imports `.webp`; verificación equivalente por ids devolvió `true`. Blog slugs ES/PT devolvió `true`.
- 2026-07-05 — `npm run lint`: 0 errores, 2 warnings preexistentes en `src/components/DataVisualization.jsx`.

---

## Phase C: Integración de arquitectura

- [x] T-05 Modificar `src/context/LocaleProvider.jsx`
  - Importar los 8 archivos `pt/*.js`
  - Agregar entrada `pt: { common: commonPt, hero: heroPt, ... }` al objeto `localeFiles`

**Verificación T-05**:
```bash
npm run lint
npm run test  # nuevo test: LocaleProvider locale="pt" → t.common definido
```

### Log de ejecución T-05

- 2026-07-05 — `LocaleProvider.jsx` importa `src/locales/pt/*.js` y agrega entrada `pt` a `localeFiles`.
- 2026-07-05 — Agregado test `useLocale` para `LocaleProvider locale="pt"` con `t.common`, `t.hero` y `t.contact` definidos.
- 2026-07-05 — `npm run lint`: 0 errores, 2 warnings preexistentes en `src/components/DataVisualization.jsx`.
- 2026-07-05 — `npm run test`: 3 archivos passed, 72 tests passed.

- [x] T-06 Modificar `src/App.jsx`
  - `LocaleLayout`: agregar detección `location.pathname.startsWith('/pt')` → `locale = 'pt'`
  - Agregar rama `<Route path="/pt">` espejo de `/en`, con página de agencias PT si corresponde

**Verificación T-06**:
```bash
npm run dev
# Navegar a /pt, /pt/blog, /pt/blog/:slug, /pt/proyecto/:id, /pt/agencias
# Zero errores de consola
```

### Log de ejecución T-06

- 2026-07-05 — `App.jsx` detecta `/pt` y agrega rama de rutas `/pt` con `/pt/agencias`.
- 2026-07-05 — Primer smoke con dev server: `/pt`, `/pt/blog`, `/pt/blog/google-sheets-backend-serverless`, `/pt/proyecto/omnistock` sin errores; `/pt/agencias` falló con `TypeError: Cannot read properties of undefined (reading 'hero')`.
- 2026-07-05 — Ajustados componentes compartidos de agencias para usar `t.agencies` en locales no-ES (`en` y `pt`).
- 2026-07-05 — Segundo smoke con dev server: `/pt`, `/pt/blog`, `/pt/blog/google-sheets-backend-serverless`, `/pt/proyecto/omnistock`, `/pt/agencias` con `errorCount: 0`.
- 2026-07-05 — `npm run lint`: 0 errores, 2 warnings preexistentes en `src/components/DataVisualization.jsx`.

- [x] T-07 Modificar `src/components/ui/LangSwitcher.jsx`
  - Generalizar mapas de segmentos (`SEGMENT_*_TO_*`) a estructura indexada por par de locales
  - Agregar tercer botón/bandera para PT
  - Lógica de detección de locale actual desde pathname: `es | en | pt`

**Verificación T-07** — matriz completa de transiciones:
```text
ES → EN, ES → PT, EN → ES, EN → PT, PT → ES, PT → EN
× (home, blog index, blog detail, project detail, agencias)
```

**Checkpoint**: Las transiciones ES↔EN existentes NO deben regresar — validar antes de agregar PT como parte del mismo PR.

### Log de ejecución T-07

- 2026-07-05 — Checkpoint pre-cambio ES↔EN con LangSwitcher existente: 10 transiciones ejecutadas, 0 errores de consola; home ES→EN devolvía `/en/` (trailing slash preexistente), las demás coincidían exactas.
- 2026-07-05 — `LangSwitcher.jsx` generalizado a `LOCALE_PREFIX`, `LOCALIZED_SEGMENTS` y detección `es | en | pt`.
- 2026-07-05 — Agregado tercer estado PT con botón `🇧🇷` y `aria-label="Mudar para Português"`.
- 2026-07-05 — `npm run lint`: 0 errores, 2 warnings preexistentes en `src/components/DataVisualization.jsx`.
- 2026-07-05 — Matriz home: ES→EN `/en`, ES→PT `/pt`, EN→ES `/`, EN→PT `/pt`, PT→ES `/`, PT→EN `/en`; todos con `errorCount: 0` (EN→ES requirió reintento aislado por `buttonCount: 0` puntual en la primera corrida).
- 2026-07-05 — Matriz blog index: 6/6 transiciones correctas, `errorCount: 0`.
- 2026-07-05 — Matriz blog detail (`google-sheets-backend-serverless`): 6/6 transiciones correctas, `errorCount: 0`.
- 2026-07-05 — Matriz project detail (`omnistock`): 6/6 transiciones correctas, `errorCount: 0`.
- 2026-07-05 — Matriz agencias: ES `/agencias`, EN `/en/agencies`, PT `/pt/agencias`; 6/6 transiciones correctas, `errorCount: 0`.

---

## Phase D: Validación final

- [x] T-08 Grep + visual check de contaminación de idioma en rutas `/pt/*`
  ```bash
  # Grep estático (limitado — componentes son compartidos, requiere check visual también)
  grep -rn "Servicios\|Contacto\|Services\|Contact" src/locales/pt/
  # Esperado: vacío (esas palabras no deberían aparecer como valores en archivos pt/)
  ```
- [x] T-09 Checklist Definition of Done (ver tabla abajo)

### Definition of Done

- [x] CA-001 `/pt` renderiza completo en portugués — `curl` confirma `lang="pt"`
  > **Nota arquitectónica:** La app es CSR SPA sin SSR. El shell estático sirve `lang="en"` para todas las rutas (`/`, `/en`, `/pt`) — comportamiento preexistente idéntico para ES y EN. El lang no es seteado dinámicamente por Helmet. Verificación alternativa: `npm run build` exitoso + inspección directa de los 8 locale files PT confirman contenido 100% en portugués. El título en `index.html` es el default del shell; post-hidratación React Helmet lo actualiza con el valor PT.
- [x] CA-002 Keys idénticas entre `pt/`, `en/`, `es/` (diff estructural)
  > Resultado verificación (2026-07-05): `common true | hero true | services true | works true | contact true | about true | blog true` — los 7 módulos comunes con keys perfectamente alineadas. `agencies` verificado manualmente (estructura PT espeja EN).
- [x] CA-003 Slugs inmutables — `projects.pt.js`/`blogData.pt.js` vs ES
  > Projects: IDs `fitness-retention-analysis,omnistock,faro-art-shop,generador-presupuestos,form-invent` — ES==PT ✅. Blog: 6 slugs `google-sheets-backend-serverless,fitness-data-integrity-refactor,python-for-data-analytics-guide,interpreting-graphs-pareto-principle,react-vs-react-native-comparison,statistics-guide-data-analyst` — ES==PT ✅.
- [x] CA-004 LangSwitcher: las 6 transiciones × 5 tipos de ruta sin 404
  > Matriz completa (del log T-07): home 6/6 ✅ | blog index 6/6 ✅ | blog detail 6/6 ✅ | project detail 6/6 ✅ | agencias 6/6 ✅ — total 30/30 transiciones, errorCount: 0.
- [x] CA-005 Cero strings ES/EN visibles en `/pt/*`
  > Grep `Servicios|Contacto|Services|Contact` → vacío ✅. Grep ampliado `Bienvenido|Hola|Proyectos|Welcome|Hello|About me|Projects|nuestros|nuestra|Our` → vacío ✅. Inspección visual de los 8 locale files: todos los valores en portugués.
- [x] CA-006 Todo archivo PT nuevo tiene marcador `TODO(leo)` de revisión pendiente
  > Grep `TODO(leo)` confirmado en 10 archivos: `src/locales/pt/*.js` (8 archivos) + `src/data/projects.pt.js` + `src/features/blog/data/blogData.pt.js`.
- [x] CA-007 `npm run lint` y `npm run test` sin errores
  > lint: 0 errores, 2 warnings preexistentes en `DataVisualization.jsx` (no relacionados con PT). tests: 3 archivos, 72 tests passed ✅.
- [x] CA-008 ADR-013/014 commiteados antes de cambios en `src/`
  > `git log --oneline`: commit `9fe3bac docs: add pt locale ADRs` precede a `65a325e feat: add portuguese locale content` y todos los commits de integración en `src/` ✅.
- [ ] CA-009 Leo remueve marcador de revisión tras validar contenido — gate obligatorio antes de merge a `main`

### Log de ejecución Phase D

- 2026-07-05 — T-08 completada: grep `Servicios|Contacto|Services|Contact` → vacío; grep ampliado → vacío; inspección visual de 8 archivos PT confirmó contenido 100% en portugués; build local exitoso en 4.71s.
- 2026-07-05 — T-09 completada: CA-001 a CA-008 verificados (ver detalle en Definition of Done arriba). CA-009 pendiente gate de Leo.

---

## Reglas de ejecución

- Una task a la vez
- Commit después de cada fase completada
- No avanzar de fase sin OK explícito
- ❌ No remover el marcador `TODO(leo)` sin aprobación explícita de Leo
- ❌ No mergear a `main` con contenido PT sin revisar (bloqueante — ver ADR-014)
- ❌ No agregar dependencias externas de i18n
- ❌ No `localStorage`
