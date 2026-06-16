# FEATURE-06: Partners para Agencias — Task Breakdown

**Feature:** FEATURE-06_PARTNERS_AGENCIAS
**Plan Version:** 1.1
**Tasks Version:** 1.1
**Total Estimated Effort:** ~6h 05min
**Start Date:** 2026-06-14
**Branch:** `feature/FEATURE-06-partners-agencias`
**Changelog v1.1 (2026-06-14):**
- T-04.5 agregado: `src/utils/trackEvent.js`
- T-07: nombre definitivo `AgenciasColaboracion.jsx`
- T-16: archivo objetivo confirmado `src/features/services/Services.jsx`

---

## Fase A: Setup & Foundation
**Duración estimada:** ~35 min
**Dependencias:** Ninguna
**Entrega:** Rama Git creada, locales ES/EN registrados en `LocaleProvider`, env var configurada, `trackEvent.js` disponible.

---

### T-00: Configurar variable de entorno `VITE_CONTACT_EMAIL`
**Effort:** 5 min
**Dependencies:** Ninguna
**Acceptance Criteria:**
- [ ] `VITE_CONTACT_EMAIL=<email_real>` agregado en `.env`
- [ ] `VITE_CONTACT_EMAIL=tu@email.com` agregado en `.env.example`
- [ ] Variable consumible como `import.meta.env.VITE_CONTACT_EMAIL` en componentes

**Subtasks:**
1. Editar `.env` — agregar al final
2. Editar `.env.example` — agregar con placeholder documentado

**Notas:**
- Requerida por `AgenciasHero.jsx` y `AgenciasCTAFinal.jsx` para construir el `mailto:`
- WhatsApp no se expone en esta página (spec §2.3)

---

### T-01: Crear rama Git
**Effort:** 5 min
**Dependencies:** Ninguna
**Acceptance Criteria:**
- [ ] Rama `feature/FEATURE-06-partners-agencias` creada desde `develop`
- [ ] `git status` limpio antes del primer commit

**Subtasks:**
1. `git checkout develop && git pull`
2. `git checkout -b feature/FEATURE-06-partners-agencias`

---

### T-02: Crear locale ES — `src/locales/es/agencias.js`
**Effort:** 20 min
**Dependencies:** T-01
**Acceptance Criteria:**
- [ ] Exporta objeto `agencias` con secciones: `hero`, `paraQuien`, `colaboracion`, `proceso`, `faq`, `ctaFinal`, `meta`
- [ ] Todos los textos de spec §3.1 → §3.6 y §5.9 (ES) incluidos
- [ ] `faq` contiene los 6 pares pregunta/respuesta de spec §3.5
- [ ] Ningún texto hardcodeado en componentes — todo desde este archivo

**Subtasks:**
1. Crear archivo con estructura base exportada
2. Poblar `hero` (headline, subheadline, ctaPrimario, ctaSecundario)
3. Poblar `paraQuien` (titulo, cuerpo, array `perfiles` con 4 items)
4. Poblar `colaboracion` (titulo, intro, array `modelos` con 3 items A/B/C)
5. Poblar `proceso` (titulo, array `pasos` con 4 items)
6. Poblar `faq` (array `items` con 6 pares Q/A de spec §3.5)
7. Poblar `ctaFinal` (titulo, cuerpo, cta)
8. Agregar `meta` (title, description, canonical, hrefLangEN)

**Notas:**
- Fuente de verdad de todos los textos de la feature
- Fuente: spec §3.1–§3.6 y §5.4

---

### T-03: Crear locale EN — `src/locales/en/agencies.js`
**Effort:** 20 min
**Dependencies:** T-02
**Acceptance Criteria:**
- [ ] Estructura idéntica a `es/agencias.js` (mismas claves)
- [ ] Todos los textos traducidos al inglés (tono directo, mismo posicionamiento B2B)
- [ ] `meta` con canonical `/en/agencies` y hreflang ES

**Subtasks:**
1. Copiar estructura de `es/agencias.js`
2. Traducir todos los textos sección por sección
3. Actualizar `meta` con URLs EN

**Notas:**
- No traducción literal — mismo tono directo y posicionamiento white-label
- Canonical EN: `https://www.ongevag.com/en/agencies`

---

### T-04: Registrar locales en `LocaleProvider.jsx`
**Effort:** 10 min
**Dependencies:** T-02, T-03
**Acceptance Criteria:**
- [ ] `agencias` importado desde `es/agencias.js` y registrado en objeto locale ES
- [ ] `agencies` importado desde `en/agencies.js` y registrado en objeto locale EN
- [ ] `npm run build` sin errores después del cambio
- [ ] `useLocale()` resuelve `t.agencias.*` (ES) y `t.agencies.*` (EN)

**Subtasks:**
1. Agregar import en bloque ES de `LocaleProvider.jsx`
2. Agregar import en bloque EN de `LocaleProvider.jsx`
3. Verificar en dev que las claves están disponibles

**Notas:**
- **Crítico:** `LocaleProvider.jsx` es archivo sensible (CLAUDE.md § Critical Files). Cambios mínimos y quirúrgicos.
- Nunca importar locale files directamente en componentes — solo via `useLocale()`

---

### T-04.5: Crear `src/utils/trackEvent.js`
**Effort:** 5 min
**Dependencies:** T-01
**Acceptance Criteria:**
- [ ] Archivo creado en `src/utils/trackEvent.js`
- [ ] Función exportada como named export: `export function trackEvent(eventName, params = {})`
- [ ] Guard `typeof window === 'undefined'` (SSR-safe)
- [ ] Guard `typeof window.gtag !== 'function'` (falla silenciosa si GA4 no cargó)
- [ ] `try/catch` con `console.warn` solo en `import.meta.env.DEV`
- [ ] Importable desde componentes como `import { trackEvent } from '../../utils/trackEvent'`

**Subtasks:**
1. Crear `src/utils/trackEvent.js` con el wrapper defensivo
2. Verificar que el import resuelve correctamente desde `src/features/agencias/`

**Notas:**
- Implementación de referencia definida en resolución de inconsistencia #4
- El CTA de email debe funcionar aunque GA4 no haya cargado (adblocker, red lenta)
- Si en el futuro se cambia GA4 → Plausible, solo se toca este archivo

---

## Fase B: Core Implementation
**Duración estimada:** ~3h 30min
**Dependencias:** Fase A completa
**Entrega:** 6 componentes + 2 páginas + routing + nav + About actualizado + teaser en Services.

---

### T-05: Crear componente `AgenciasHero.jsx`
**Effort:** 45 min
**Dependencies:** T-04, T-04.5
**Acceptance Criteria:**
- [ ] Ubicación: `src/features/agencias/AgenciasHero.jsx`
- [ ] Layout: `grid-cols-5` en `lg:` — col-span-3 (texto) + col-span-2 (visual)
- [ ] Headline animado con Framer Motion stagger (variantes de `motionConfig.js`)
- [ ] `MAILTO_URL` construido desde `import.meta.env.VITE_CONTACT_EMAIL` con subject `Partner técnico — [nombre de agencia]`
- [ ] CTA primario: `<a href={MAILTO_URL}>` con ícono `<Mail>` de lucide-react
- [ ] CTA secundario: `<a href="#colaboracion">` (scroll anchor)
- [ ] Visual derecho (Opción C): `bg-slate-800/20 border border-slate-700/30`, oculto en mobile (`hidden lg:flex`)
- [ ] `trackEvent('agency_cta_email', { position: 'hero' })` en onClick del CTA primario
- [ ] Sin errores de ESLint (`npm run lint`)

**Subtasks:**
1. Scaffold del componente con `useLocale()`
2. Implementar grid asimétrico Tailwind
3. Agregar Framer Motion con variantes de `motionConfig.js`
4. Construir `MAILTO_URL` con subject pre-cargado (URL-encoded)
5. Implementar Opción C en columna derecha
6. Importar y llamar `trackEvent` desde `src/utils/trackEvent.js`
7. Verificar render en dev (desktop y mobile)

**Notas:**
- Spec de referencia: §5.5 (código de referencia del Hero)
- Opción A (mockup animado) queda como DT-06-01 — no implementar ahora

---

### T-06: Crear componente `AgenciasParaQuien.jsx`
**Effort:** 30 min
**Dependencies:** T-04
**Acceptance Criteria:**
- [ ] Ubicación: `src/features/agencias/AgenciasParaQuien.jsx`
- [ ] Título desde `t.agencias.paraQuien.titulo`
- [ ] Párrafo desde `t.agencias.paraQuien.cuerpo`
- [ ] Lista de 4 perfiles desde `t.agencias.paraQuien.perfiles` con `.map()`
- [ ] Sin cards con shadow — separación por layout o `border-t`
- [ ] Animación de entrada Framer Motion (fade + slide)
- [ ] Responsive correcto en 375px y 1280px

**Subtasks:**
1. Scaffold + consumo de `useLocale()`
2. Implementar layout texto + lista
3. Agregar animaciones

---

### T-07: Crear componente `AgenciasColaboracion.jsx`
**Effort:** 35 min
**Dependencies:** T-04
**Acceptance Criteria:**
- [ ] Ubicación: `src/features/agencias/AgenciasColaboracion.jsx`
- [ ] `id="colaboracion"` en el elemento raíz (requerido por CTA secundario del Hero)
- [ ] Título e intro desde `t.agencias.colaboracion.*`
- [ ] 3 modelos (A/B/C) en `grid-cols-1 md:grid-cols-3`
- [ ] Cada modelo: encabezado tipo, pasos numerados con `border-l-2 border-[#0EA5E9]`, resultado en pie
- [ ] Sin cards con shadow — separación por `gap-8`
- [ ] Modelos renderizados dinámicamente desde `colaboracion.modelos` (no hardcodeados)
- [ ] Mobile: stack vertical, orden A/B/C preservado

**Subtasks:**
1. Scaffold con `id="colaboracion"`
2. Implementar grid de 3 columnas
3. Implementar bloque de modelo (encabezado + pasos + resultado)
4. Verificar scroll desde CTA secundario del Hero en dev

**Notas:**
- Nombre definitivo: `AgenciasColaboracion.jsx` — spec §5.2 tenía `AgenciasCasosDeUso.jsx` (error corregido)
- `AgenciasProyectos.jsx` eliminado del scope — no tiene copy ni flujo UX definido

---

### T-08: Crear componente `AgenciasProceso.jsx`
**Effort:** 30 min
**Dependencies:** T-04
**Acceptance Criteria:**
- [ ] Ubicación: `src/features/agencias/AgenciasProceso.jsx`
- [ ] Título desde `t.agencias.proceso.titulo`
- [ ] 4 pasos desde `t.agencias.proceso.pasos` con `.map()`
- [ ] Desktop: `grid-cols-4`, `border-t border-slate-700` superior, `border-r` entre columnas
- [ ] Mobile: `grid-cols-1`, `border-b border-slate-700` entre pasos
- [ ] Número de paso: `font-mono text-xs text-slate-500 tracking-widest` (formato `01`, `02`...)
- [ ] Título de paso: `font-syne font-bold text-white text-lg`
- [ ] Descripción: `font-dm-sans text-slate-400 text-sm leading-relaxed`
- [ ] Sin cards con shadow

**Subtasks:**
1. Scaffold con grid responsive
2. Layout desktop (border-t + border-r, último sin border-r)
3. Layout mobile (border-b, último sin border-b)
4. Verificar en ambos breakpoints

**Notas:**
- Spec de referencia: §5.7

---

### T-09: Crear componente `AgenciasFAQ.jsx`
**Effort:** 30 min
**Dependencies:** T-04, T-04.5
**Acceptance Criteria:**
- [ ] Ubicación: `src/features/agencias/AgenciasFAQ.jsx`
- [ ] `useState(null)` local — sin librería externa
- [ ] 6 pares Q/A desde `t.agencias.faq.items` con `.map()`
- [ ] Cada ítem: `border-t border-slate-700`, button full-width, `ChevronDown` rotado 180° cuando abierto
- [ ] Respuesta animada: `initial={{ opacity: 0, y: -4 }}` con variante de `motionConfig.js`
- [ ] Solo un ítem abierto a la vez (toggle cierra el abierto)
- [ ] `trackEvent('agency_faq_expand', { question_index: i })` en expand
- [ ] Button con `text-left` para accesibilidad

**Subtasks:**
1. Scaffold con `useState(null)`
2. Render de items con toggle
3. Animación Framer Motion en respuesta
4. `ChevronDown` con `transition-transform`
5. `trackEvent` en handler

**Notas:**
- Spec de referencia: §5.8
- Usar variante equivalente de `motionConfig.js` — no definir `springConfig` local

---

### T-10: Crear componente `AgenciasCTAFinal.jsx`
**Effort:** 20 min
**Dependencies:** T-04, T-04.5
**Acceptance Criteria:**
- [ ] Ubicación: `src/features/agencias/AgenciasCTAFinal.jsx`
- [ ] Título desde `t.agencias.ctaFinal.titulo`
- [ ] Cuerpo desde `t.agencias.ctaFinal.cuerpo`
- [ ] CTA: `<a href={MAILTO_URL}>` mismo subject que en Hero
- [ ] `trackEvent('agency_cta_email', { position: 'final' })` en onClick
- [ ] Fondo diferenciado: `bg-slate-800/30`
- [ ] Responsive correcto

**Subtasks:**
1. Scaffold + construcción de `MAILTO_URL`
2. Layout centrado
3. `trackEvent` en onClick

---

### T-11: Crear `src/pages/AgenciasPage.jsx`
**Effort:** 20 min
**Dependencies:** T-05 → T-10
**Acceptance Criteria:**
- [ ] Importa y compone los 6 componentes en orden: Hero → ParaQuien → Colaboracion → Proceso → FAQ → CTAFinal
- [ ] `<Helmet>` con meta tags ES de spec §5.9: title, description, canonical, hreflang EN, og:title, og:description, og:url
- [ ] Usa `MainLayout` como wrapper
- [ ] Consume `t.agencias` via `useLocale()` (contexto ES)

**Subtasks:**
1. Scaffold con imports de los 6 componentes
2. Agregar `<Helmet>` con meta tags de spec §5.9
3. Ensamblar componentes en orden
4. Verificar que locale ES resuelve en `/agencias`

---

### T-12: Crear `src/pages/AgenciesPageEN.jsx`
**Effort:** 15 min
**Dependencies:** T-11
**Acceptance Criteria:**
- [ ] Composición idéntica a `AgenciasPage.jsx` (mismos 6 componentes, mismo orden)
- [ ] `<Helmet>` EN: title, description, canonical `/en/agencies`, hreflang ES
- [ ] Consume `t.agencies` via `useLocale()` (contexto EN)
- [ ] Sin contenido hardcodeado

**Subtasks:**
1. Copiar estructura de `AgenciasPage.jsx`
2. Actualizar `<Helmet>` para EN
3. Verificar que componentes renderizan en inglés en `/en/agencies`

---

### T-13: Agregar rutas en `App.jsx`
**Effort:** 10 min
**Dependencies:** T-11, T-12
**Acceptance Criteria:**
- [ ] `AgenciasPage` importada con `lazy()`
- [ ] `AgenciesPageEN` importada con `lazy()`
- [ ] `path="/agencias"` resuelve `AgenciasPage`
- [ ] `path="/en/agencies"` resuelve `AgenciesPageEN`
- [ ] Ambas rutas dentro del `<Suspense>` existente
- [ ] `npm run build` sin errores (chunks generados)

**Subtasks:**
1. Agregar 2 imports lazy al bloque existente
2. Agregar 2 `<Route>` dentro del router
3. Verificar navegación manual a ambas rutas en dev

---

### T-14: Agregar ítem de navegación en `Header.jsx`
**Effort:** 15 min
**Dependencies:** T-13
**Acceptance Criteria:**
- [ ] Clave `agenciasNav: "Para agencias"` agregada en `src/locales/es/common.js`
- [ ] Clave `agenciasNav: "For agencies"` agregada en `src/locales/en/common.js`
- [ ] Ítem visible en nav desktop ES y EN (entre Servicios y Blog)
- [ ] Ítem visible en mobile menu ES y EN
- [ ] Path-aware: apunta a `/agencias` (ES) y `/en/agencies` (EN)

**Subtasks:**
1. Agregar `agenciasNav` en `es/common.js`
2. Agregar `agenciasNav` en `en/common.js`
3. Agregar ítem en nav desktop de `Header.jsx`
4. Agregar ítem en mobile menu de `Header.jsx`
5. Verificar path-aware al cambiar locale

**Notas:**
- Clave definida en spec §8: `agenciasNav` — usar exactamente esa clave en ambos idiomas

---

### T-15: Reemplazar texto obsoleto en `About.jsx`
**Effort:** 10 min
**Dependencies:** T-01
**Acceptance Criteria:**
- [ ] Texto antiguo eliminado: *"Me dedico a construir herramientas digitales para pequeños comercios..."*
- [ ] Texto nuevo insertado según spec §3.7 (dos párrafos)
- [ ] Reemplazo en locale file si el texto viene de locale; en JSX si está hardcodeado
- [ ] Sin layout break en dev server

**Subtasks:**
1. Verificar si el texto está en locale file o hardcodeado en `About.jsx`
2. Reemplazar con los dos párrafos de spec §3.7
3. Verificar render en dev (ES y EN si aplica)

---

### T-16: Agregar teaser minimalista en `src/features/services/Services.jsx`
**Effort:** 15 min
**Dependencies:** T-13
**Acceptance Criteria:**
- [ ] Bloque al pie de la sección de servicios, antes del formulario de contacto
- [ ] ES: `¿Sos de una agencia?` + link `→ Ver propuesta para agencias` → `/agencias`
- [ ] EN: equivalente en inglés → `/en/agencies`
- [ ] Estilo: `border-t`, texto `text-slate-400`, link `text-sky-400 hover:text-sky-300`
- [ ] Path-aware (usa `useLocale()` para determinar ruta)
- [ ] Es una línea de texto + link — no una sección completa (spec §7)

**Subtasks:**
1. Localizar el punto de inserción en `Services.jsx`
2. Agregar bloque con `border-t` y texto + link
3. Verificar path-aware ES/EN

---

## Fase C: SEO & Integration
**Duración estimada:** ~25 min
**Dependencias:** Fase B completa

---

### T-17: Actualizar sitemap
**Effort:** 10 min
**Dependencies:** T-13
**Acceptance Criteria:**
- [ ] `https://www.ongevag.com/agencias` con `priority: 0.9`, `changefreq: monthly`
- [ ] `https://www.ongevag.com/en/agencies` con `priority: 0.9`, `changefreq: monthly`
- [ ] Sitemap válido (sin errores de estructura)

**Subtasks:**
1. Localizar sitemap o generador (FEATURE-02)
2. Agregar las 2 entradas
3. Verificar validez del sitemap

---

### T-18: Verificar meta tags SEO en ambas páginas
**Effort:** 15 min
**Dependencies:** T-11, T-12
**Acceptance Criteria:**
- [ ] `/agencias`: title, description, canonical, hreflang EN, og:title, og:description, og:url correctos (spec §5.9)
- [ ] `/en/agencies`: equivalentes EN con canonical correcto y hreflang ES
- [ ] Sin duplicados o conflictos con Helmet de MainLayout
- [ ] Verificado con DevTools → Elements → `<head>`

**Subtasks:**
1. Navegar a `/agencias` en dev → inspeccionar `<head>`
2. Navegar a `/en/agencies` → inspeccionar `<head>`
3. Confirmar canonical y hreflang mutuamente correctos

---

## Fase D: QA Manual
**Duración estimada:** ~30 min
**Dependencias:** Fases A + B + C completas

---

### T-19: QA manual — Desktop y Mobile, ambas rutas
**Effort:** 30 min
**Dependencies:** T-05 → T-18
**Acceptance Criteria:**
- [ ] `/agencias` renderiza completo en desktop (1280px+) sin layout breaks
- [ ] `/agencias` renderiza completo en mobile (375px) sin overflow horizontal
- [ ] `/en/agencies` renderiza en ambos breakpoints con textos EN
- [ ] CTA primario abre cliente de mail con asunto pre-cargado correcto
- [ ] CTA secundario hace scroll hasta `#colaboracion`
- [ ] FAQ accordion: abre, cierra, solo uno abierto a la vez
- [ ] Proceso 4 pasos: línea horizontal desktop, lista vertical mobile
- [ ] Header: ítem `Para agencias` / `For agencies` visible y funcional (desktop + mobile menu)
- [ ] Teaser en home ES → `/agencias`, EN → `/en/agencies`
- [ ] Texto de `About.jsx` actualizado visible en home
- [ ] Sin regresiones en rutas existentes (`/`, `/en`, `/blog`, `/proyecto/:id`)
- [ ] `npm run build` sin errores ni warnings

**Subtasks:**
1. Smoke test `/agencias` desktop
2. Smoke test `/agencias` mobile (DevTools device toolbar, 375px)
3. Smoke test `/en/agencies` desktop y mobile
4. Verificar todos los CTAs interactivos
5. Verificar rutas existentes sin regresiones
6. `npm run build`

---

## Fase E: Documentación & Cierre
**Duración estimada:** ~10 min
**Dependencias:** T-19 aprobado

---

### T-20: Actualizar documentación del proyecto
**Effort:** 10 min
**Dependencies:** T-19
**Acceptance Criteria:**
- [ ] `CLAUDE.md`: `Current Phase` → `FEATURE-06_PARTNERS_AGENCIAS — Done`
- [ ] `CLAUDE.md`: entrada `FEATURE-06` en Module Index con status `✅ Done` y location
- [ ] `docs/SDD_MASTER.md`: `FEATURE-06` en Module Registry (§3)
- [ ] `docs/SDD_MASTER.md`: Appendix actualizado con `FEATURE-06_PARTNERS_AGENCIAS/`
- [ ] `BITACORA_TECNICA.md`: nueva entrada al inicio con fecha, branch, qué se hizo, archivos creados/modificados, DT-06-01 documentada

**Subtasks:**
1. Editar `CLAUDE.md`
2. Editar `docs/SDD_MASTER.md`
3. Agregar entrada al inicio de `BITACORA_TECNICA.md`

---

## Estado de Tracking

| Task | Fase | Archivo(s) principal(es) | Effort Est. | Status | Blocker |
|------|------|--------------------------|-------------|--------|---------|
| T-00 | A | `.env`, `.env.example` | 5 min | ⏳ Pending | — |
| T-01 | A | — (Git) | 5 min | ⏳ Pending | — |
| T-02 | A | `src/locales/es/agencias.js` | 20 min | ⏳ Pending | T-01 |
| T-03 | A | `src/locales/en/agencies.js` | 20 min | ⏳ Pending | T-02 |
| T-04 | A | `src/context/LocaleProvider.jsx` | 10 min | ⏳ Pending | T-02, T-03 |
| T-04.5 | A | `src/utils/trackEvent.js` | 5 min | ⏳ Pending | T-01 |
| T-05 | B | `src/features/agencias/AgenciasHero.jsx` | 45 min | ⏳ Pending | T-04, T-04.5 |
| T-06 | B | `src/features/agencias/AgenciasParaQuien.jsx` | 30 min | ⏳ Pending | T-04 |
| T-07 | B | `src/features/agencias/AgenciasColaboracion.jsx` | 35 min | ⏳ Pending | T-04 |
| T-08 | B | `src/features/agencias/AgenciasProceso.jsx` | 30 min | ⏳ Pending | T-04 |
| T-09 | B | `src/features/agencias/AgenciasFAQ.jsx` | 30 min | ⏳ Pending | T-04, T-04.5 |
| T-10 | B | `src/features/agencias/AgenciasCTAFinal.jsx` | 20 min | ⏳ Pending | T-04, T-04.5 |
| T-11 | B | `src/pages/AgenciasPage.jsx` | 20 min | ⏳ Pending | T-05–T-10 |
| T-12 | B | `src/pages/AgenciesPageEN.jsx` | 15 min | ⏳ Pending | T-11 |
| T-13 | B | `src/App.jsx` | 10 min | ⏳ Pending | T-11, T-12 |
| T-14 | B | `Header.jsx`, `es/common.js`, `en/common.js` | 15 min | ⏳ Pending | T-13 |
| T-15 | B | `src/components/About.jsx` | 10 min | ⏳ Pending | T-01 |
| T-16 | B | `src/features/services/Services.jsx` | 15 min | ⏳ Pending | T-13 |
| T-17 | C | sitemap (FEATURE-02) | 10 min | ⏳ Pending | T-13 |
| T-18 | C | `AgenciasPage.jsx`, `AgenciesPageEN.jsx` | 15 min | ⏳ Pending | T-11, T-12 |
| T-19 | D | — (QA) | 30 min | ⏳ Pending | T-05–T-18 |
| T-20 | E | `CLAUDE.md`, `SDD_MASTER.md`, `BITACORA_TECNICA.md` | 10 min | ⏳ Pending | T-19 |

**Total estimado: ~6h 05min**

---

**Próximo paso:** T-00 y T-01 en paralelo → T-02.
