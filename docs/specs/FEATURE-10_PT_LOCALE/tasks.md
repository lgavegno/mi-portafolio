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
| T-06 | App.jsx — rutas /pt | ⬜ Pendiente |
| T-07 | LangSwitcher.jsx — selector 3 idiomas | ⬜ Pendiente |
| T-08 | Grep/visual validation | ⬜ Pendiente |
| T-09 | Definition of Done | ⬜ Pendiente |

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

- [ ] T-06 Modificar `src/App.jsx`
  - `LocaleLayout`: agregar detección `location.pathname.startsWith('/pt')` → `locale = 'pt'`
  - Agregar rama `<Route path="/pt">` espejo de `/en`, con página de agencias PT si corresponde

**Verificación T-06**:
```bash
npm run dev
# Navegar a /pt, /pt/blog, /pt/blog/:slug, /pt/proyecto/:id, /pt/agencias
# Zero errores de consola
```

- [ ] T-07 Modificar `src/components/ui/LangSwitcher.jsx`
  - Generalizar mapas de segmentos (`SEGMENT_*_TO_*`) a estructura indexada por par de locales
  - Agregar tercer botón/bandera para PT
  - Lógica de detección de locale actual desde pathname: `es | en | pt`

**Verificación T-07** — matriz completa de transiciones:
```text
ES → EN, ES → PT, EN → ES, EN → PT, PT → ES, PT → EN
× (home, blog index, blog detail, project detail, agencias)
```

**Checkpoint**: Las transiciones ES↔EN existentes NO deben regresar — validar antes de agregar PT como parte del mismo PR.

---

## Phase D: Validación final

- [ ] T-08 Grep + visual check de contaminación de idioma en rutas `/pt/*`
  ```bash
  # Grep estático (limitado — componentes son compartidos, requiere check visual también)
  grep -rn "Servicios\|Contacto\|Services\|Contact" src/locales/pt/
  # Esperado: vacío (esas palabras no deberían aparecer como valores en archivos pt/)
  ```
- [ ] T-09 Checklist Definition of Done (ver tabla abajo)

### Definition of Done

- [ ] CA-001 `/pt` renderiza completo en portugués — `curl` confirma `lang="pt"`
- [ ] CA-002 Keys idénticas entre `pt/`, `en/`, `es/` (diff estructural)
- [ ] CA-003 Slugs inmutables — `projects.pt.js`/`blogData.pt.js` vs ES
- [ ] CA-004 LangSwitcher: las 6 transiciones × 5 tipos de ruta sin 404
- [ ] CA-005 Cero strings ES/EN visibles en `/pt/*`
- [ ] CA-006 Todo archivo PT nuevo tiene marcador `TODO(leo)` de revisión pendiente
- [ ] CA-007 `npm run lint` y `npm run test` sin errores
- [ ] CA-008 ADR-013/014 commiteados antes de cambios en `src/`
- [ ] CA-009 Leo remueve marcador de revisión tras validar contenido — gate obligatorio antes de merge a `main`

---

## Reglas de ejecución

- Una task a la vez
- Commit después de cada fase completada
- No avanzar de fase sin OK explícito
- ❌ No remover el marcador `TODO(leo)` sin aprobación explícita de Leo
- ❌ No mergear a `main` con contenido PT sin revisar (bloqueante — ver ADR-014)
- ❌ No agregar dependencias externas de i18n
- ❌ No `localStorage`
