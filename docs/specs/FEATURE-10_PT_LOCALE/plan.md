# Implementation Plan: 010 — Portuguese Locale (PT)

**Branch**: `feature/pt-locale` | **Date**: 2026-07-05 | **Spec**: `docs/specs/FEATURE-10_PT_LOCALE/spec.md`

---

## Summary

Extender la arquitectura de i18n existente (FEATURE-01) para soportar un tercer locale, portugués, servido en `/pt`. Se reutiliza `LocaleProvider`, `useLocale()` y el patrón de locale files planos sin introducir dependencias nuevas. El contenido PT (locale files, `projects.pt.js`, `blogData.pt.js`) es generado por Claude como borrador de traducción, marcado explícitamente como pendiente de revisión hasta que Leo lo apruebe. `LangSwitcher.jsx` pasa de un toggle binario ES/EN a un selector de 3 estados generalizando la lógica de traducción de segmentos de ruta.

---

## Technical Context

**Language/Version**: JavaScript (ES2022), sin TypeScript (ADR-002)

**Primary Dependencies**: React 19.1.0 · React Router DOM 7.17.0 · React Helmet Async · Vite 6.3.5 — sin nuevas dependencias.

**Storage**: N/A — locale derivado de URL, sin `localStorage` (ADR-011, sin cambios).

**Testing**: Vitest + RTL. Nuevos tests: `LocaleProvider` con `locale="pt"`, `LangSwitcher` traducción de segmentos a 3 vías.

**Target Platform**: Vercel CSR SPA, sin cambios en `vercel.json` (catch-all ya cubre `/pt/*`).

**Constraints**:
- Cero dependencias nuevas.
- Mismo contrato de `LocaleProvider`/`useLocale()` — no se rediseña la interfaz, solo se agrega una tercera entrada al mapa de locales.
- Slugs de proyectos y blog posts inmutables entre los 3 idiomas.
- Contenido PT generado por IA debe llevar marcador de revisión pendiente (`_reviewed: false` o comentario) hasta aprobación humana.

**Scale/Scope**: +1 locale × ~8 rutas = +8 URLs indexables. 8 locale files nuevos (mismo set que `en/`/`es/`). 2 data files nuevos (`projects.pt.js`, `blogData.pt.js`). Modificación de `App.jsx`, `LocaleProvider.jsx`, `LangSwitcher.jsx`.

---

## Constitution Check

| Check | Status | Notes |
|-------|--------|-------|
| No nueva dependencia externa | ✅ Pass | Reutiliza patrón plano existente |
| No duplicación de componentes de ruta | ✅ Pass | Misma técnica de `LocaleLayout` + `Outlet` |
| URL como single source of truth | ✅ Pass | Sin cambios en el mecanismo de FEATURE-01 |
| Slugs inmutables entre locales | ✅ Pass | `projects.pt.js`/`blogData.pt.js` copian slugs de ES |
| ADR documentado antes de código | ✅ Requerido | ADR-013, ADR-014 antes de tocar `src/` |
| Contenido IA marcado como no-final | ✅ Requerido | Bloquea merge a `main` sin revisión de Leo |
| `vercel.json` | ✅ Pass | Sin cambios — catch-all ya cubre `/pt/*` |

---

## Project Structure

### Documentación (this feature)
```text
docs/specs/FEATURE-10_PT_LOCALE/
├── spec.md
├── plan.md
└── tasks.md
```

### Código afectado
```text
src/
├── locales/
│   └── pt/
│       ├── common.js       ← NEW (espejo de es/common.js y en/common.js)
│       ├── hero.js         ← NEW
│       ├── services.js     ← NEW
│       ├── works.js        ← NEW
│       ├── contact.js      ← NEW
│       ├── about.js        ← NEW
│       ├── blog.js         ← NEW
│       └── agencies.js     ← NEW (o agencias.js, según Open Question de segmentos)
├── data/
│   └── projects.pt.js      ← NEW (mismos slugs que projects.es.js)
├── features/blog/data/
│   └── blogData.pt.js      ← NEW (traducción completa, mismos slugs)
├── context/
│   └── LocaleProvider.jsx  ← MODIFIED: agrega imports pt + entrada "pt" en localeFiles
├── components/ui/
│   └── LangSwitcher.jsx    ← MODIFIED: selector 3 estados, mapas de segmentos generalizados a N locales
├── App.jsx                 ← MODIFIED: LocaleLayout reconoce prefijo /pt, nueva rama de rutas /pt/*
└── pages/
    └── AgenciasPagePT.jsx  ← NEW (si el patrón sigue el de AgenciesPageEN.jsx — página dedicada por locale)

docs/adr/
├── ADR-013.md              ← NEW: PT como tercer locale — extensión, no rediseño
└── ADR-014.md              ← NEW: traducción IA con marcador de revisión pendiente
```

**Structure Decision**: Extensión pura del patrón Feature-Based existente. No se crean directorios nuevos de arquitectura — `locales/pt/` es simétrico a `locales/en/` y `locales/es/`.

---

## Implementation Phases

### Phase A — Fundación y Open Question de segmentos *(sin cambios en src/)*

#### T-01 — Resolver Open Question: segmento PT para "agencias"
- **Acción**: Confirmar con Leo si el segmento de ruta traducible es `agencias` (igual a ES) o un término PT distinto (ej. `agencias` es válido en portugués también — probable que se mantenga igual).
- **Gate**: Bloquea T-05 (LangSwitcher) y T-07 (rutas en App.jsx).

#### T-02 — ADR Documentation
- **Files**: `docs/adr/ADR-013.md`, `ADR-014.md`
- **Acción**: Documentar decisión de extensión de arquitectura y política de contenido IA no-final.
- **Gate**: Debe commitearse antes de cualquier cambio en `src/`.

#### T-03 — Locale Files PT: borrador de traducción
- **Files**: `src/locales/pt/*.js` (8 archivos)
- **Acción**: Claude traduce cada archivo `es/*.js` a portugués manteniendo estructura de keys idéntica. Cada archivo incluye comentario superior `// TODO(leo): revisar traducción PT — generado por IA, no validado`.
- **Verify**: Diff estructural de keys entre `pt/`, `en/`, `es/` — deben ser idénticas. `npm run lint` pasa.

#### T-04 — Data Files PT
- **Files**: `src/data/projects.pt.js`, `src/features/blog/data/blogData.pt.js`
- **Acción**: Copiar slugs exactos de `projects.es.js`/`blogData.es.js`, traducir campos descriptivos (title, description, tags, body). Marcador de revisión pendiente en cabecera del archivo.
- **Verify**: Script de comparación de slugs (mismo patrón que T-03 de FEATURE-01):
  ```bash
  node -e "const es=require('./src/data/projects.es.js'); const pt=require('./src/data/projects.pt.js'); console.log(es.map(p=>p.slug).join()===pt.map(p=>p.slug).join())"
  ```

---

### Phase B — Integración de arquitectura

#### T-05 — LocaleProvider.jsx: agregar locale "pt"
- **File**: `src/context/LocaleProvider.jsx`
- **Acción**: Importar los 8 archivos `pt/*.js`, agregar entrada `pt: { common: commonPt, ... }` al mapa `localeFiles`.
- **Verify**: Unit test — `LocaleProvider locale="pt"` → `useLocale()` retorna `locale === "pt"` y `t.common` definido.

#### T-06 — App.jsx: rama de rutas /pt
- **File**: `src/App.jsx`
- **Acción**: `LocaleLayout` detecta prefijo `/pt` (`location.pathname.startsWith('/pt')`) y pasa `locale="pt"`. Nueva rama `<Route path="/pt">` espejo de la rama `/en`, usando el segmento de agencias resuelto en T-01.
- **Verify**: `npm run dev` → `/pt`, `/pt/blog`, `/pt/proyecto/:id`, `/pt/agencias` renderizan sin crash ni consola con errores.

#### T-07 — LangSwitcher.jsx: selector de 3 idiomas
- **File**: `src/components/ui/LangSwitcher.jsx`
- **Acción**: Generalizar `SEGMENT_*_TO_*` a una tabla de traducción de segmentos indexada por locale de origen/destino. Reemplazar los 2 botones actuales (🇪🇸/🇺🇸) por 3 (🇪🇸/🇺🇸/🇧🇷 o 🇵🇹 — confirmar bandera con Leo). Lógica: detectar locale actual desde `pathname`, computar path destino agregando/quitando prefijo y traduciendo segmentos.
- **Verify**: Matriz de test manual: los 6 pares de transición (ES→EN, ES→PT, EN→ES, EN→PT, PT→ES, PT→EN) desde cada tipo de ruta (home, blog index, blog detail, project detail, agencias).

---

### Phase C — Validación

#### T-08 — Grep de contaminación de idioma
- **Acción**: `grep -r "Servicios\|Contacto\|Services\|Contact"` limitado a componentes renderizados bajo `/pt` (verificación visual, no solo grep estático, porque el componente es compartido).
- **Verify**: Visual check en `/pt`, `/pt/blog`, `/pt/proyecto/:slug`, `/pt/agencias` — cero strings ES/EN visibles.

#### T-09 — Definition of Done
- Ver tabla en `tasks.md`.

---

## Execution Graph

```
T-01 (Open Question segmentos)
    │
    ▼
T-02 (ADRs)
    │
    ├──► T-03 (Locale files PT) ──┐
    │                              ├──► T-05 (LocaleProvider)
    └──► T-04 (Data files PT)  ───┘              │
                                                  ▼
                                            T-06 (App.jsx rutas /pt)
                                                  │
                                                  ▼
                                            T-07 (LangSwitcher 3 vías)
                                                  │
                                                  ▼
                                            T-08 (Grep/visual validation)
                                                  │
                                                  ▼
                                            T-09 (DoD)
```

---

## Definition of Done

| ID | Criterio | Validación |
|----|----------|-----------|
| CA-001 | `/pt` renderiza completo en portugués | Visual + `curl` → `lang="pt"` |
| CA-002 | Keys idénticas entre `pt/`, `en/`, `es/` | Diff estructural |
| CA-003 | Slugs inmutables en `projects.pt.js`/`blogData.pt.js` | Script de comparación |
| CA-004 | LangSwitcher soporta las 6 transiciones sin 404 | Test manual matriz completa |
| CA-005 | Cero strings ES/EN visibles en rutas `/pt/*` | Visual check |
| CA-006 | Todo archivo PT nuevo tiene marcador de revisión pendiente | Grep de `TODO(leo)` |
| CA-007 | `npm run lint` y `npm run test` sin errores | CI local |
| CA-008 | ADR-013/014 commiteados antes de cambios en `src/` | Git log order |
| CA-009 | Leo remueve marcador de revisión tras validar contenido | Manual — gate de merge a `main` |

---

## Risk Register

| Risk | Prob. | Impacto | Mitigación |
|------|-------|---------|------------|
| Traducción IA con errores idiomáticos (falsos amigos ES↔PT) | Alta | Medio | Marcador de revisión obligatorio; Leo revisa antes de publicar |
| Segmento de ruta "agencias" ambiguo en PT | Media | Bajo | Resuelto en T-01 antes de tocar código |
| `LangSwitcher` con lógica de 2 vías hardcodeada, refactor a N vías introduce regresión en ES↔EN | Media | Alto | Test de regresión de las transiciones ES↔EN existentes antes de agregar PT |
| Encoding UTF-8 de caracteres PT (ã, ç, õ) corrupto en build | Baja | Medio | Verificar `.editorconfig`/`charset` y render visual post-build |
