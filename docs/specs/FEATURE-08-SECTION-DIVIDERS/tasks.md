# FEATURE-08: Section Dividers — Task Breakdown

**Feature:** Separadores de sección SVG inline entre bloques de color
**Branch:** `feature/08-section-dividers`
**Basado en:** spec.md (EPIC-07 mejoras post-cierre) + plan.md v1.0
**Formato:** Cada T-XX es una tarea atómica (≤1h de trabajo)

---

## Estado General

**Nota (2026-08-25):** Feature lanzada en v3.2.0 (release `d8ee30a`, merge `9841307` a develop) — tabla actualizada de "⏳ Pending" a Done/✅. `SectionDivider.jsx` confirmado integrado en Home (`src/App.jsx`) y en las 3 páginas de Agencias (ES, EN, PT — PT no estaba contemplada en T-04 al escribirse este plan, se sumó después con FEATURE-10_PT_LOCALE).

| Task | Status | Effort Estimado | Effort Real | Blocker | Notes |
|------|--------|-----------------|-------------|---------|-------|
| T-01 | ✅ Done | 45min | — | — | SectionDivider.jsx creado en src/components/ui/ |
| T-02 | ✅ Done | 15min | — | T-01 | — |
| T-03 | ✅ Done | 20min | — | T-01 | — |
| T-04 | ✅ Done | 10min | — | T-03 | Replicado también en AgenciasPagePT.jsx (fuera de scope original) |
| T-05 | ✅ Done | 30min | — | T-01 | SkillsGrid bg dinámico — verificado |
| T-06 | ✅ Done | 20min | — | T-03, T-04, T-05 | — |
| T-07 | ✅ Done | 5min | — | T-06 | — |
| T-08 | ✅ Done | 5min | — | T-07 | — |
| T-09 | ✅ Done | 10min | — | T-08 | CLAUDE.md tiene entrada en Critical Files |
| T-10 | ✅ Done | 10min | — | T-08 | — |
| T-11 | ✅ Done | 5min | — | T-08 | CHANGELOG.md tiene entrada bajo FEATURE-08 |
| T-12 | ✅ Done | 5min | — | T-09, T-10, T-11 | Mergeado a develop y releasado como v3.2.0 |

---

## Fase A: Componente Base

### T-01: Crear SectionDivider.jsx
**Effort:** 45min
**Dependencies:** Ninguna
**Archivo:** `src/components/ui/SectionDivider.jsx`

**Acceptance Criteria:**
- [ ] Archivo creado en `src/components/ui/SectionDivider.jsx`
- [ ] Exportado como default export
- [ ] Prop `variant`: `'wave' | 'bowl' | 'overlap'` — requerida
- [ ] Prop `fromColor`: hex string — requerida (bg de la sección de arriba)
- [ ] Prop `toColor`: hex string — requerida (bg de la sección de abajo)
- [ ] Prop `height`: number en px, default `64`
- [ ] Prop `overlapLabel`: string, solo usada en variant `overlap`
- [ ] Variante `wave`: curva Bézier cúbica (`C`) — onda suave de un lado al otro
- [ ] Variante `bowl`: curva cuadrática (`Q`) invertida — arco que "contiene"
- [ ] Variante `overlap`: onda + `div` absoluto centrado con card flotante sobre la transición
- [ ] Todos los SVG usan `preserveAspectRatio="none"`
- [ ] Contenedor SVG usa `style={{ lineHeight: 0, display: 'block' }}` — elimina gap de pixel
- [ ] `prefers-reduced-motion`: si está activo, renderiza `<hr style={{ borderColor: fromColor, margin: 0 }} />` en lugar del SVG
- [ ] `npm run build` sin errores nuevos

**Subtasks:**
1. Crear el archivo con la estructura base del componente
2. Implementar variante `wave`
3. Implementar variante `bowl`
4. Implementar variante `overlap` (requiere `position: relative` en el wrapper)
5. Implementar detección de `prefers-reduced-motion` con `window.matchMedia`
6. Verificar que el fill del SVG usa `toColor` (la forma que "cubre" tiene el color inferior)

**Notas:**
- El path SVG siempre empieza en la esquina superior izquierda del `fromColor` y termina cubriendo toda la base con `toColor`
- Para `overlap`: el wrapper necesita `position: relative` y `overflow: visible`; la card flotante usa `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`
- No agregar a `src/components/ui/index.js` hasta verificar que renderiza sin errores (T-02)

---

### T-02: Verificación visual en dev server
**Effort:** 15min
**Dependencies:** T-01

**Acceptance Criteria:**
- [ ] `npm run dev` inicia sin errores de compilación
- [ ] Las 3 variantes renderizan sin gap de pixel entre el SVG y las secciones adyacentes
- [ ] En viewport 1440px: el SVG ocupa 100% del ancho sin deformación
- [ ] En viewport 375px: el SVG escala correctamente (`preserveAspectRatio="none"`)
- [ ] Variante `overlap`: la card flotante aparece centrada sobre la transición
- [ ] Con `prefers-reduced-motion` activo (simular en DevTools): aparece `<hr>` simple

**Subtasks:**
1. Importar temporalmente SectionDivider en cualquier página para probar los 3 variants
2. Probar en Chrome DevTools con viewport 1440px y 375px
3. Activar `prefers-reduced-motion` en DevTools → Rendering → Emulate CSS media
4. Confirmar sin errores en consola del navegador
5. Remover import temporal antes de avanzar a T-03

---

## Fase B: Integración en /agencias

### T-03: Integrar separadores en AgenciasPage.jsx
**Effort:** 20min
**Dependencies:** T-01, T-02
**Archivo:** `src/pages/AgenciasPage.jsx`

**Acceptance Criteria:**
- [ ] `SectionDivider` importado en `AgenciasPage.jsx`
- [ ] 3 separadores insertados en las posiciones correctas
- [ ] Sin modificar lógica, i18n, Helmet ni animaciones existentes
- [ ] `npm run dev` muestra los 3 separadores en `/agencias`

**Posiciones exactas:**
```
AgenciasHero
<SectionDivider variant="wave" fromColor="#2C3340" toColor="#EEE0C9" />
AgenciasParaQuien
AgenciasColaboracion
AgenciasProceso
<SectionDivider variant="bowl" fromColor="#96B6C5" toColor="#EEE0C9" />
AgenciasFAQ
<SectionDivider variant="overlap" fromColor="#EEE0C9" toColor="#2C3340" overlapLabel="¿Hablamos?" />
AgenciasCTAFinal
```

**Subtasks:**
1. Agregar import de SectionDivider al bloque de imports existente
2. Insertar los 3 `<SectionDivider>` entre los componentes correspondientes
3. Verificar visualmente en `/agencias` con `npm run dev`

**Notas:**
- `overlapLabel` recibe string directo — en esta tarea hardcodeado en ES. La i18n se resuelve en T-04 si aplica o se pasa desde `t.agencias` si el locale lo tiene.
- No alterar el `<motion.div>` wrapper de `AgenciasHero` ni ningún otro componente

---

### T-04: Replicar en AgenciesPageEN.jsx
**Effort:** 10min
**Dependencies:** T-03
**Archivo:** `src/pages/AgenciesPageEN.jsx`

**Acceptance Criteria:**
- [ ] Mismos 3 separadores con idénticos colores que en AgenciasPage.jsx
- [ ] `overlapLabel` en inglés: `"Let's talk"`
- [ ] `npm run dev` muestra los separadores en `/en/agencies`
- [ ] Sin diferencias visuales entre la versión ES y EN

**Subtasks:**
1. Copiar los 3 `<SectionDivider>` de AgenciasPage.jsx
2. Cambiar `overlapLabel` a `"Let's talk"`
3. Verificar en `/en/agencies`

**Notas:**
- Confirmar que AgenciesPageEN.jsx tiene la misma estructura de secciones que AgenciasPage.jsx antes de copiar

---

## Fase C: Integración en Home

### T-05: Integrar separadores en HomeSections (App.jsx)
**Effort:** 30min
**Dependencies:** T-01, T-02
**Archivo:** `src/App.jsx`

**Acceptance Criteria:**
- [ ] `SectionDivider` importado en `App.jsx` (import estático — es UI crítica above the fold)
- [ ] 3 separadores insertados en HomeSections en las posiciones correctas
- [ ] Sin modificar `AnimatedSection`, `LocaleLayout`, routing ni ningún otro bloque
- [ ] `npm run dev` muestra los 3 separadores en `/` y `/en`

**Posiciones exactas:**
```
AnimatedSection#hero       (bg: #EEE0C9)
<SectionDivider variant="wave" fromColor="#EEE0C9" toColor="#F1F0E8" />
AnimatedSection#sobre-mi   (bg: #F1F0E8)
<SectionDivider variant="bowl" fromColor="#F1F0E8" toColor="#F1F0E8" height={80} />
AnimatedSection#skills     (bg: className dinámica — verificar valor real antes de implementar)
<SectionDivider variant="wave" fromColor="#F1F0E8" toColor="#2C3340" />
AnimatedSection#servicios  (bg: #2C3340)
AnimatedSection#proyectos  (bg: bg-obsidian — SIN separador hasta resolver DT-08-01)
AnimatedSection#blog
AnimatedSection#contacto
```

**Subtasks:**
1. Antes de codear: ejecutar `grep -n "className" src/App.jsx | grep "skills\|SkillsGrid"` para confirmar que SkillsGrid no recibe un bg distinto al esperado
2. Agregar import de SectionDivider junto a los imports existentes de componentes UI
3. Insertar los 3 `<SectionDivider>` entre los `<AnimatedSection>` correspondientes
4. Verificar que los separadores quedan fuera de los `<AnimatedSection>` (no dentro del motion.div)
5. Verificar visualmente en `/` con `npm run dev`

**Notas:**
- El separador `bowl` entre About y SkillsGrid usa `fromColor="#F1F0E8"` y `toColor="#F1F0E8"` (mismo color) — el efecto es un quiebre de forma sin cambio de color, válido para romper la monotonía visual de la sección larga
- Si `AnimatedSection` tiene `overflow: hidden` que corta el SVG: mover el `<SectionDivider>` fuera del wrapper. Verificar en T-06.
- **No agregar separador** entre Works y BlogPreview ni entre BlogPreview y Contact hasta resolver DT-08-01

---

## Fase D: QA y Documentación

### T-06: QA visual completo
**Effort:** 20min
**Dependencies:** T-03, T-04, T-05

**Acceptance Criteria:**
- [ ] Desktop 1440px: sin gap de pixel entre SVG y secciones en todas las posiciones
- [ ] Mobile 375px: SVG se estira al ancho sin deformación visible
- [ ] `/agencias`: wave (hero→paraQuien) + bowl (proceso→faq) + overlap (faq→cta) — los 3 presentes
- [ ] `/en/agencies`: idem con overlapLabel en inglés
- [ ] `/` home: wave (hero→about) + bowl (about→skills) + wave (skills→services) — los 3 presentes
- [ ] `prefers-reduced-motion` activo: todos los separadores muestran `<hr>` simple
- [ ] Sin errores en consola del navegador
- [ ] Animaciones Framer Motion existentes no afectadas

**Subtasks:**
1. Recorrer `/agencias` en desktop y mobile — capturar si hay gap de pixel
2. Recorrer `/` en desktop y mobile
3. Simular `prefers-reduced-motion` en DevTools → Rendering
4. Revisar consola del navegador: 0 errores nuevos
5. Si hay gap de pixel: agregar `display: block` al SVG y `fontSize: 0` al wrapper

---

### T-07: Build de producción
**Effort:** 5min
**Dependencies:** T-06

**Acceptance Criteria:**
- [ ] `npm run build` termina sin errores
- [ ] Sin warnings nuevos respecto al build anterior
- [ ] Tamaño de bundle no incrementa más de 2KB (SectionDivider es componente mínimo)

**Comando:**
```bash
npm run build
```

---

### T-08: Tests de regresión
**Effort:** 5min
**Dependencies:** T-07

**Acceptance Criteria:**
- [ ] `npm run test -- --run` retorna 71/71 passing
- [ ] Sin tests nuevos requeridos (SectionDivider es presentacional puro — no tiene lógica testeable)

**Comando:**
```bash
npm run test -- --run
```

**Notas:**
- Si algún test falla: es regresión por cambio en App.jsx o páginas — investigar antes de continuar

---

### T-09: Actualizar CLAUDE.md
**Effort:** 10min
**Dependencies:** T-08
**Archivo:** `CLAUDE.md`

**Acceptance Criteria:**
- [ ] `SectionDivider` agregado a la tabla "Critical Files — Don't Break" con su razón
- [ ] "Current Phase" actualizado a reflejar FEATURE-08 completada

**Entrada a agregar en Critical Files:**
```
| `src/components/ui/SectionDivider.jsx` | SVG inline dividers — preserveAspectRatio="none" es mandatorio; cambiar paths SVG rompe transiciones visuales |
```

---

### T-10: Entrada en BITACORA_TECNICA.md
**Effort:** 10min
**Dependencies:** T-08
**Archivo:** `BITACORA_TECNICA.md`

**Acceptance Criteria:**
- [ ] Entrada con fecha 2026-06-17
- [ ] Documenta decisión: SVG inline vs alternativas CSS (clip-path, border-radius)
- [ ] Documenta por qué `preserveAspectRatio="none"` y no `xMidYMid meet`
- [ ] Documenta patrón wave/bowl/overlap y su asignación por posición en la página
- [ ] Documenta la restricción: sin separador en Works hasta DT-08-01

---

### T-11: Entrada en CHANGELOG.md
**Effort:** 5min
**Dependencies:** T-08
**Archivo:** `CHANGELOG.md`

**Acceptance Criteria:**
- [ ] Entrada bajo `[Unreleased]` con sección `### Added`

**Texto a agregar:**
```markdown
### Added
- SectionDivider component: separadores SVG inline con variantes wave, bowl y overlap
- Separadores aplicados en /agencias: wave (hero→paraQuien), bowl (proceso→faq), overlap (faq→cta)
- Separadores aplicados en home: wave (hero→about), bowl (about→skills), wave (skills→services)
- Soporte prefers-reduced-motion: fallback a hr simple cuando está activo
```

---

### T-12: Commit y push a develop
**Effort:** 5min
**Dependencies:** T-09, T-10, T-11

**Acceptance Criteria:**
- [ ] Rama activa es `feature/08-section-dividers` (verificar antes de commitear)
- [ ] Commit atómico con mensaje convencional
- [ ] Push a origin sin conflictos

**Comando:**
```bash
git add src/components/ui/SectionDivider.jsx \
        src/pages/AgenciasPage.jsx \
        src/pages/AgenciesPageEN.jsx \
        src/App.jsx \
        CLAUDE.md \
        BITACORA_TECNICA.md \
        CHANGELOG.md

git commit -m "feat(ui): add SectionDivider component with wave/bowl/overlap variants

- New SectionDivider component — SVG inline, preserveAspectRatio none
- Applied to /agencias: wave (hero→paraQuien), bowl (proceso→faq), overlap (faq→cta)
- Applied to home: wave (hero→about), bowl (about→skills), wave (skills→services)
- Respects prefers-reduced-motion: renders hr fallback when active
- No logic, i18n, test or SEO changes — purely presentational"

git push origin feature/08-section-dividers
```

**Notas:**
- Si la rama no existe: `git checkout -b feature/08-section-dividers` antes del commit
- No hacer merge a develop directamente — crear PR o merge manual tras revisión
