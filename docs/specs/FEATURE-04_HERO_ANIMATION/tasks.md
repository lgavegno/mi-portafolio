# FEATURE-04: Hero Animation — Tareas de Implementación
**Tasks Version:** 1.0  
**Status:** In Progress  
**Related Plan:** `docs/specs/FEATURE-04/plan.md`  
**Related Spec:** `docs/specs/FEATURE-04/spec.md`  
**Last Updated:** 2026-06-13

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| ⏳ | Pendiente |
| 🔄 | En progreso |
| ✅ | Completado |
| ⚠️ | Bloqueado / Requiere atención |

---

## FASE A — Cierre Documental
**Objetivo:** Ecosistema documental FEATURE-04 completo  
**Estimación total:** 1.5h  
**Dependencia:** `spec.md` consolidado (✅ done)

---

### T-01 — Generar `plan.md`
**Estado:** ✅ Completado  
**Estimación:** 0.5h  
**Archivo de salida:** `docs/specs/FEATURE-04/plan.md`

**Subtareas:**
- [x] Completar encabezado (versión, fechas, branch, spec relacionada)
- [x] Redactar Resumen Ejecutivo con los 3 ejes de trabajo
- [x] Construir tabla de Estado Actual por componente
- [x] Definir fases A–D con duración y entrega
- [x] Documentar riesgos reales (scrollToContact, ESLint/motion)
- [x] Redactar DoD por fase + DoD por componente crítico
- [x] Definir timeline con fechas concretas

**DoD:** Archivo creado en `docs/specs/FEATURE-04/`; secciones 1–7 completas; sin placeholders.

---

### T-02 — Generar `tasks.md`
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivo de salida:** `docs/specs/FEATURE-04_HERO_ANIMATION/tasks.md`

**Subtareas:**
- [x] Crear estructura base con leyenda y fases A–D
- [x] Desglosar cada T-XX con subtareas, estimación y DoD individual
- [x] Verificar que todos los T-XX del plan están cubiertos (T-01 a T-16)
- [x] Confirmar que los archivos de salida de cada tarea son correctos

**DoD:** Archivo creado en `docs/specs/FEATURE-04_HERO_ANIMATION/`; T-01 a T-16 con subtareas y DoD individual; sin T-XX huérfanos.

---

### T-03 — Actualizar `SDD_MASTER.md`
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivo afectado:** `docs/SDD_MASTER.md`

**Subtareas:**
- [x] Localizar entrada de FEATURE-04 en §3 (Module Registry)
- [x] Agregar link a `spec.md` en columna Links
- [x] Agregar link a `plan.md` en columna Links
- [x] Verificar que el Status sigue como `✅ Active`
- [x] Actualizar fecha "Last updated" al pie del documento

**Comando de verificación:**
```bash
grep -n "FEATURE-04" docs/SDD_MASTER.md
```

**DoD:** FEATURE-04 en `SDD_MASTER.md` tiene links a `spec.md` y `plan.md`; build sin errores (`npm run lint`).

---

## FASE B — Auditoría de Código vs. Spec
**Objetivo:** Confirmar consistencia entre spec consolidada y código en producción  
**Estimación total:** 2h  
**Dependencia:** Fase A completa

---

### T-04 — Auditar `ParticleBackground.jsx` vs. spec §5
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivo auditado:** `src/components/ParticleBackground.jsx`

**Checklist de verificación:**

| Punto | Spec §5 | Código (línea real) | Resultado |
|-------|---------|---------------------|-----------|
| Densidad | `área / 15000` | L26: `Math.floor((canvas.width * canvas.height) / 15000)` | ✅ |
| Velocidad | `±0.3px/frame` | L31-32: `(Math.random() - 0.5) * 0.3` | ✅ |
| Radio partícula | `0.5–2px` | L33: `Math.random() * 1.5 + 0.5` (rango 0.5–2.0) | ✅ |
| Radio conexión | `120px` | L62: `if (dist < 120)` | ✅ |
| Color | `rgba(34, 211, 238, ...)` | L52: `ctx.fillStyle = \`rgba(34, 211, 238, ${p.alpha})\`` | ✅ |
| Opacidad canvas | `0.6` | L94: `style={{ opacity: 0.6 }}` | ✅ |
| `prefers-reduced-motion` | Retorna `null` | L88: `if (prefersReducedMotion) return null` vía `useReducedMotion` hook | ✅ |
| NO `React.lazy` | Eager import | HeroBanner L11: `import ParticleBackground from '...'` (directo) | ✅ |
| `ResizeObserver` cleanup | Sin leaks | L84: `ro.disconnect()` en return del useEffect | ✅ |

**Subtareas:**
- [x] Abrir archivo y verificar cada punto del checklist
- [x] Registrar número de línea real para cada punto
- [x] Marcar como ✅ / ❌ cada ítem
- [x] Si hay drift → documentar en T-08

**Resultado:** Sin drift. 9/9 puntos conformes con spec.

**DoD:** Todos los puntos del checklist auditados con resultado explícito (✅ o ❌); ningún ítem en ⏳.

---

### T-05 — Auditar `HeroBanner.jsx` vs. spec §4
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivo auditado:** `src/features/hero/HeroBanner.jsx`

**Checklist de verificación:**

| Punto | Spec | Código (línea real) | Resultado |
|-------|------|---------------------|-----------|
| `<ParticleBackground />` como primer hijo | Antes de glows y contenido | L39: primer child de `<section>` | ✅ |
| Glows decorativos presentes | Cyan top-left + Indigo bottom-right | L42-55: 2 `<div>` absolutos con radial-gradient | ✅ |
| Layout responsive | 1 col mobile / 2 col lg+ | L65: `grid grid-cols-1 lg:grid-cols-2` | ✅ |
| Badge "Disponible" | Presente, estilo cyan/border | L75-83: `bg-cyan-500/8 border-cyan-500/20 text-cyan-400` | ✅ |
| Título con gradiente | `linear-gradient(135deg, #22d3ee, #818cf8)` | L95-101: inline style en `<span>GE</span>` | ✅ |
| Stagger delays | Badge 0s, Título 0.1s, Desc 0.2s, Botones 0.3s | Mix inline (badge/title) + staggerContainer (resto) | ⚠️ |
| CTA "Ver proyectos" | Llama scroll a proyectos | L137: `onClick={scrollToProjects}` ← CORRECTO; spec tenía error | ✅ |
| WireframeGeometry en Suspense | `React.lazy` + Suspense | L14 lazy; L195: `fallback={<div className="w-64 h-64" />}` (no null) | ⚠️ |
| TechnicalTicker al pie | Último hijo de la section | L205: `<TechnicalTicker />` antes de `</section>` | ✅ |

**Notas de drift:**
- ⚠️ **Stagger delays**: spec especifica delays explícitos (0s/0.1s/0.2s...). Código usa mix de inline transitions y `staggerContainer` (0.25s/0.1s). Comportamiento visual correcto, implementación difiere. Sin corrección — es mejora deliberada.
- ⚠️ **Suspense fallback**: `<div className="w-64 h-64" />` en lugar de `null`. Previene layout shift (mejor). Sin corrección.
- ❌ **Error en spec/tasks**: "CTA 'Ver proyectos' llama `scrollToContact`" era incorrecto. `scrollToProjects` → `#proyectos`; `scrollToContact` → `#contacto` (botón "Contactar"). Spec corregida.
- ✅ `scrollToContact` presente y funcional (L29-31), usada por botón "Contactar" (L149).

**DoD:** Todos los puntos auditados con resultado; función `scrollToContact` confirmada presente y funcional.

---

### T-06 — Auditar `motionConfig.js` vs. spec §7
**Estado:** ✅ Completado
**Estimación:** 0.25h
**Archivo auditado:** `src/config/motionConfig.js`

**Checklist de verificación:**

| Variante | Spec | Código (línea real) | Resultado |
|----------|------|---------------------|-----------|
| `fadeInUp` | fade + y + blur, `springConfig.snappy` | L17-31: fade+y:20+blur. Usa `springConfig.smooth` (comentario: "cambiado de snappy a smooth") | ⚠️ drift intencional |
| `staggerContainer` | `staggerChildren: 0.07, delayChildren: 0.05` | L44-46: `staggerChildren: 0.25, delayChildren: 0.1` (comentario: "Aumentado de 0.12 a 0.25") | ⚠️ drift intencional |
| `springConfig.snappy` | `stiffness: 280, damping: 25` | L5: `{ type: "spring", stiffness: 280, damping: 25 }` | ✅ |
| `reducedMotionConfig` | Fade only, `duration: 0.01s` | L125-129: `visible: { opacity: 1, transition: { duration: 0.01 } }` | ✅ |

**Notas de drift:**
- ⚠️ `fadeInUp.visible.transition`: usa `springConfig.smooth` (stiffness:60, damping:22) en lugar de `snappy` (stiffness:280, damping:25). Cambio intencional documentado con comentario en el código. Spec desactualizada.
- ⚠️ `staggerContainer.staggerChildren`: `0.25` (spec: `0.07`). `delayChildren`: `0.1` (spec: `0.05`). Cambio intencional para entrada más espaciada. Spec desactualizada.
- **Acción**: spec.md §5 debe actualizarse con los valores reales (ver T-11).

**DoD:** Las 4 variantes verificadas con valores exactos; ninguna modificación de estructura no documentada.

---

### T-07 — Auditar `WireframeGeometry.jsx`
**Estado:** ✅ Completado
**Estimación:** 0.25h
**Archivo auditado:** `src/components/WireframeGeometry.jsx`

**Checklist de verificación:**
- [x] El componente es importado con `React.lazy()` en `HeroBanner.jsx` — L14: `React.lazy(() => import('../../components/WireframeGeometry'))` ✅
- [x] `<Suspense>` envolviendo el componente — L195 HeroBanner: `<React.Suspense fallback={<div className="w-64 h-64" />}>` ⚠️ fallback no es null (mejora layout, aceptable)
- [x] Animación de flotación `y: [0, -12, 0]` — L187-193 HeroBanner (wrapper `motion.div`): `animate={{ y: [0, -12, 0] }}` ✅
- [x] `repeat: Infinity` — L191 HeroBanner: `repeat: Infinity` ✅
- [x] Sin dependencias de Three.js — WireframeGeometry.jsx imports: React, framer-motion. Sin Three.js. ✅

**Resultado:** 4/5 ✅, 1⚠️ (fallback menor). Sin drift funcional.

**DoD:** Los 5 puntos verificados con resultado explícito.

---

### T-08 — Documentar drift en `BITACORA_TECNICA.md`
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivo afectado:** `BITACORA_TECNICA.md`

**Subtareas:**
- [x] Revisar resultados de T-04 a T-07
- [x] Hay drift en motionConfig.js (2 valores) → registrar con acción tomada
- [x] Crear entrada en BITACORA con tabla de drift

**Plantilla de entrada:**
```markdown
## [2026-06-XX] FEATURE-04 — Auditoría Fase B

**Resultado:** [Sin drift / X puntos de drift encontrados]

| Archivo | Punto | Esperado | Real | Acción |
|---------|-------|----------|------|--------|
| ... | ... | ... | ... | ... |
```

**DoD:** Entrada en BITACORA creada; todo drift registrado con acción tomada o pendiente.

---

## FASE C — Hardening de Puntos Frágiles
**Objetivo:** Guardrails permanentes para los dos riesgos de probabilidad Alta  
**Estimación total:** 1.5h  
**Dependencia:** Fase B completa

---

### T-09 — Guardrail `scrollToContact`
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivos afectados:** `src/features/hero/HeroBanner.jsx`, `CLAUDE.md`

**Subtareas:**
- [ ] Localizar definición de `scrollToContact` en `HeroBanner.jsx`
- [ ] Confirmar que el botón "Ver proyectos" tiene `onClick={scrollToContact}`
- [ ] Agregar comentario defensivo en el código:
  ```jsx
  // ⚠️ CRÍTICO: No eliminar esta función.
  // El CTA "Ver proyectos" depende de ella. Su ausencia rompe el scroll
  // sin generar error en consola. Ver CLAUDE.md §Critical Files.
  const scrollToContact = () => { ... };
  ```
- [ ] Agregar entrada en `CLAUDE.md` §Critical Files:
  ```markdown
  | `scrollToContact` (fn en HeroBanner.jsx) | CTA "Ver proyectos" — su eliminación rompe scroll sin error visible |
  ```

**DoD:** Comentario presente en el código; entrada en CLAUDE.md §Critical Files; función verificada funcional en browser.

---

### T-10 — Guardrail ESLint / imports `motion`
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivos afectados:** `eslint.config.js`, `src/features/hero/HeroBanner.jsx`

**Subtareas:**
- [ ] Localizar configuración ESLint activa (`eslint.config.js` o `.eslintrc.*`)
- [ ] Confirmar que la regla `jsx-uses-vars` está habilitada:
  ```js
  // En eslint.config.js (flat config)
  plugins: ['react'],
  rules: {
    'react/jsx-uses-vars': 'error', // ← debe existir
  }
  ```
- [ ] Si no está → agregarla y verificar que `npm run lint` pasa sin errores
- [ ] Agregar comentario en `HeroBanner.jsx` en el bloque de imports:
  ```jsx
  // ⚠️ Los imports de `motion` pueden ser eliminados por ESLint si
  // `jsx-uses-vars` no está activo. No remover sin verificar la regla.
  import { motion } from 'framer-motion';
  ```
- [ ] Ejecutar `npm run lint` y confirmar 0 errores

**Comando de verificación:**
```bash
npm run lint 2>&1 | grep -E "error|warn|motion"
```

**DoD:** Regla `jsx-uses-vars` confirmada activa; comentario presente en HeroBanner.jsx; `npm run lint` → 0 errores.

---

### T-11 — Sección "No Romper" en `spec.md`
**Estado:** ✅ Completado
**Estimación:** 0.5h
**Archivo afectado:** `docs/specs/FEATURE-04_HERO_ANIMATION/spec.md`

**Subtareas:**
- [ ] Agregar al final de §7 (Consideraciones Especiales) la subsección:

```markdown
### Puntos Frágiles — No Romper

| Punto | Riesgo | Guardrail |
|-------|--------|-----------|
| `scrollToContact` en `HeroBanner.jsx` | Eliminación accidental en refactor → CTA roto sin error | Comentario defensivo en código + entrada en CLAUDE.md |
| Imports `motion` en `HeroBanner.jsx` | ESLint stripping silencioso → animaciones desaparecen | Regla `jsx-uses-vars` activa + comentario en imports |
| `ParticleBackground` como eager import | Migración a `React.lazy` → flash blanco en LCP | Documentado en §2 Excluye; NO usar `React.lazy` aquí |
```

**DoD:** Subsección agregada a spec.md §7; los 3 puntos frágiles documentados con riesgo y guardrail.

---

## FASE D — QA & Cierre
**Objetivo:** DoD completo verificado, rama lista para merge  
**Estimación total:** 1h  
**Dependencia:** Fase C completa

---

### T-12 — Ejecutar checklist de QA
**Estado:** ⏳ Pendiente  
**Estimación:** 0.25h

**Checklist (de `mod-04_hero-animation.md` §11.1):**
- [ ] ParticleBackground carga sin flash blanco
- [ ] Canvas redimensiona correctamente en resize de ventana
- [ ] Partículas animan suavemente (60fps) en desktop
- [ ] Partículas animan suavemente (60fps) en mobile
- [ ] Badge "Disponible para proyectos" visible en mobile
- [ ] Título responde: `text-4xl` (sm) → `text-7xl` (lg)
- [ ] WireframeGeometry flota sin lag en desktop
- [ ] Botones tienen hover state correcto
- [ ] Animaciones respetan `prefers-reduced-motion`
- [ ] Scroll desde CTA "Ver proyectos" funciona correctamente

**DoD:** Los 10 ítems en ✅; ningún ítem sin verificar.

---

### T-13 — Lighthouse Audit
**Estado:** ⏳ Pendiente  
**Estimación:** 0.25h

**Subtareas:**
- [ ] Ejecutar `npm run build && npm run preview`
- [ ] Abrir Lighthouse en DevTools (modo Desktop)
- [ ] Capturar métricas:

| Métrica | Target | Resultado |
|---------|--------|-----------|
| Performance | > 90 | ⏳ |
| LCP | < 1.5s | ⏳ |
| CLS | 0 | ⏳ |
| FID / INP | < 100ms | ⏳ |

- [ ] Ejecutar también en modo Mobile
- [ ] Si Performance < 90 → registrar en BITACORA como bloqueante antes de merge

**DoD:** Performance > 90 en Desktop; LCP < 1.5s; CLS = 0; resultados registrados.

---

### T-14 — Smoke test mobile
**Estado:** ⏳ Pendiente  
**Estimación:** 0.25h

**Subtareas:**
- [ ] Abrir en DevTools → Device Toolbar → iPhone SE (375px)
- [ ] Verificar: columna derecha (WireframeGeometry) oculta
- [ ] Verificar: ParticleBackground visible y animando
- [ ] Verificar: badge, título, descripción, botones y stats visibles
- [ ] Verificar: botón "Ver proyectos" scrollea correctamente
- [ ] Abrir en dispositivo físico (si disponible) y repetir verificación

**DoD:** Los 5 puntos verificados en simulador; sin elementos rotos en mobile.

---

### T-15 — Abrir PR hacia `develop`
**Estado:** ⏳ Pendiente  
**Estimación:** 0.25h

**Subtareas:**
- [ ] Confirmar que la rama es `feature/hero-animation-audit`
- [ ] Ejecutar `git status` — sin archivos sin commitear
- [ ] Push de la rama al remoto
- [ ] Abrir PR con la siguiente estructura de descripción:

```markdown
## FEATURE-04 — Hero Animation: Cierre Documental + Hardening

### Qué hace este PR
- Consolida ecosistema documental: spec.md, plan.md, tasks.md
- Auditoría de código vs. spec (Fase B): [sin drift / X drifts corregidos]
- Guardrails para scrollToContact y ESLint/motion imports
- QA completo: Lighthouse Performance [X], LCP [X]s

### Checklist DoD
- [x] spec.md, plan.md, tasks.md en docs/specs/FEATURE-04/
- [x] SDD_MASTER.md actualizado
- [x] Auditoría Fase B documentada en BITACORA
- [x] Guardrails T-09 y T-10 implementados
- [x] Lighthouse Performance > 90
- [x] Smoke test mobile ✅

### Archivos modificados
- docs/specs/FEATURE-04/ (nuevos: plan.md, tasks.md; actualizado: spec.md)
- docs/SDD_MASTER.md
- CLAUDE.md (Critical Files actualizado)
- src/features/hero/HeroBanner.jsx (comentarios defensivos)
- BITACORA_TECNICA.md (entrada auditoría)
```

**DoD:** PR abierto hacia `develop`; descripción completa con evidencia de DoD.

---

### T-16 — Entrada en `BITACORA_TECNICA.md`
**Estado:** ⏳ Pendiente  
**Estimación:** 0.25h  
**Archivo afectado:** `BITACORA_TECNICA.md`

**Plantilla:**
```markdown
## [2026-06-XX] FEATURE-04 — Hero Animation: Cierre de Fase

**Tipo:** Auditoría + Hardening documental  
**Branch:** feature/hero-animation-audit  
**Estado:** DoD completo ✅

**Resumen:**
- spec.md consolidado desde 5 archivos dispersos
- plan.md y tasks.md creados (ecosistema SDD completo)
- Auditoría Fase B: [sin drift / drifts corregidos: ...]
- Guardrails implementados: scrollToContact + ESLint/motion
- Lighthouse: Performance [X], LCP [X]s, CLS [X]

**Decisiones tomadas:**
- [Si hubo drift] Corrección de X en archivo Y: valor era Z, ahora es W
- [Si no hubo] Sin cambios funcionales; solo documentación y guardrails

**Próximo paso:** FEATURE-05 o tarea definida en SDD_MASTER.md
```

**DoD:** Entrada creada con fecha real, resultados de auditoría y Lighthouse completados.

---

## Resumen de Tareas

| ID | Tarea | Fase | Estado | Est. |
|----|-------|------|--------|------|
| T-01 | Generar `plan.md` | A | ✅ | 0.5h |
| T-02 | Generar `tasks.md` | A | ✅ | 0.5h |
| T-03 | Actualizar `SDD_MASTER.md` | A | ✅ | 0.5h |
| T-04 | Auditar `ParticleBackground.jsx` | B | ✅ | 0.5h |
| T-05 | Auditar `HeroBanner.jsx` | B | ✅ | 0.5h |
| T-06 | Auditar `motionConfig.js` | B | ✅ | 0.25h |
| T-07 | Auditar `WireframeGeometry.jsx` | B | ✅ | 0.25h |
| T-08 | Documentar drift en BITACORA | B | ✅ | 0.5h |
| T-09 | Guardrail `scrollToContact` | C | ✅ | 0.5h |
| T-10 | Guardrail ESLint / motion imports | C | ✅ | 0.5h |
| T-11 | Sección "No Romper" en spec.md | C | ✅ | 0.5h |
| T-12 | Checklist QA | D | ⏳ | 0.25h |
| T-13 | Lighthouse Audit | D | ⏳ | 0.25h |
| T-14 | Smoke test mobile | D | ⏳ | 0.25h |
| T-15 | PR hacia `develop` | D | ⏳ | 0.25h |
| T-16 | Entrada BITACORA final | D | ⏳ | 0.25h |
| | **Total** | | | **~6h** |

---

**Próximo paso:** Ejecutar Fase D — QA manual (T-12: checklist visual, T-13: Lighthouse, T-14: smoke mobile). Requiere browser.
