---
status: in-progress
feature_id: FEATURE-08
created: 2026-06-17
branch: feature/08-section-dividers
depends_on: EPIC-07
---

# SPEC: FEATURE-08 — Section Dividers & Visual Polish

## Objetivo
Eliminar transiciones abruptas entre secciones de color diferente e implementar
un sistema de separadores SVG reutilizable. Simultáneamente aplicar polish
visual al hero, tipografía, componentes de UI y página /agencias para transmitir
emoción y calidad de diseño a audiencia de agencias de marketing.

## Motivación
Post-rebrand (EPIC-07), el sitio tenía colores correctos pero transiciones
lineales entre secciones. En desktop con pantallas altas, zonas como About
(#F1F0E8) se tornaban monótonas. Para audiencia B2B de agencias, el diseño
debe transmitir movimiento, glam y criterio visual — no solo estructura limpia.

---

## Componente Central: SectionDivider

**Archivo:** `src/components/ui/SectionDivider.jsx`

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'wave'\|'bowl'\|'overlap'` | `'wave'` | Forma del separador |
| `fromColor` | hex string | requerida | Color bg sección superior |
| `toColor` | hex string | requerida | Color bg sección inferior |
| `height` | number (px) | `64` | Altura del separador |
| `overlapLabel` | string | — | Texto card flotante (solo overlap) |

### Reglas críticas de implementación

```jsx
// CORRECTO — wrapper con lineHeight:0 y backgroundColor
<div style={{ lineHeight: 0, display: 'block', position: 'relative', backgroundColor: fromColor }}>
  <svg
    preserveAspectRatio="none"   // MANDATORIO — sin esto no escala al ancho
    viewBox={`0 0 1440 ${height}`}
    width="100%"
    style={{ display: 'block' }} // MANDATORIO — elimina gap de pixel inline SVG
  >
    <path d="..." fill={toColor} />
  </svg>
</div>
```

**Por qué `lineHeight: 0`:** SVG inline hereda `line-height` del padre, generando
un gap de 4-5px entre el separador y la sección adyacente. Forzarlo a 0 elimina el gap.

**Por qué `preserveAspectRatio="none"`:** Permite que el SVG se estire al 100% del
ancho sin mantener la relación de aspecto, funcionando en cualquier viewport.

**Por qué `backgroundColor: fromColor`:** Si el SVG tarda en renderizar, el fondo
del wrapper coincide con la sección superior — sin flash de color incorrecto.

### Paths SVG por variante

```jsx
// wave — Bézier cúbica, onda suave de un lado al otro
`M0,0 C360,${height} 1080,0 1440,${height} L1440,${height} L0,${height} Z`

// bowl — cuadrática invertida, arco que "contiene"
`M0,0 Q720,${height * 2} 1440,0 L1440,${height} L0,${height} Z`

// overlap — misma onda que wave + card absoluta centrada
// El fill del path es toColor — la forma cubre la base con el color inferior
```

### Accesibilidad

```jsx
// prefers-reduced-motion — fallback a hr simple
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  return <hr style={{ border: 'none', borderTop: '1px solid', borderColor: fromColor, margin: 0 }} />
}
```

---

## Mapa de separadores implementados

### Home (`/` y `/en`) — en `src/App.jsx` HomeSections

| Posición | Variante | fromColor | toColor | height |
|----------|----------|-----------|---------|--------|
| HeroBanner → About | `wave` | `#EEE0C9` | `#F1F0E8` | 64 |
| About → SkillsGrid | `bowl` | `#F1F0E8` | `#ADC4CE` | 80 |
| SkillsGrid → Services | `wave` | `#ADC4CE` | `#2C3340` | 64 |

> **Nota:** Sin separador entre Works y adyacentes — DT-08-01 pendiente
> (`Works.jsx` usa `bg-obsidian`, fuera de paleta rebrand).

### /agencias y /en/agencies — en `AgenciasPage.jsx` y `AgenciesPageEN.jsx`

| Posición | Variante | fromColor | toColor | overlapLabel |
|----------|----------|-----------|---------|--------------|
| AgenciasHero → AgenciasParaQuien | `wave` | `#2C3340` | `#EEE0C9` | — |
| AgenciasProceso → AgenciasFAQ | `bowl` | `#96B6C5` | `#EEE0C9` | — |
| AgenciasFAQ → AgenciasCTAFinal | `overlap` | `#EEE0C9` | `#2C3340` | ES: "¿Hablamos?" / EN: "Let's talk" |

### Ritmo intencional de variantes
- **wave** → Apertura, entrada fluida, no agresiva
- **bowl** → Respiro visual en zona media, sensación de contenedor
- **overlap** → Cierre dramático, máximo impacto visual antes del CTA

---

## Polish Visual Aplicado

### Hero (HeroBanner.jsx)
- `WireframeGeometry` eliminado del hero principal → movido a `AgenciasHero.jsx`
- Composición SVG de círculos Swiss editorial (estilo B2B SaaS premium) en `position: absolute; bottom: 16; right: 0`
- Los círculos están posicionados en `bottom-16` (no `bottom-0`) para no solapar el `TechnicalTicker`
- Stats "4+" / "PyME": `text-xl` → `text-3xl` + pill container `bg-[#2C3340]/8 border border-[#2C3340]/15 rounded-xl`
- Badge "Desarrollador Independiente": `bg-[#ADC4CE]/30 text-[#2C3340]` → `bg-[#2C3340] text-[#F1F0E8]`

### Círculos decorativos hero (Swiss editorial)

```jsx
// Composición: 1 círculo dominante + 3-4 secundarios + 1 cortado por el borde
// Filosofía: marca gráfica sistémica, no decoración random
// Referencia: Stripe, consultoría premium, diseño suizo editorial
<svg width="520" height="520" viewBox="0 0 520 520">
  <circle cx="380" cy="380" r="220" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
  <circle cx="210" cy="290" r="110" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/>
  <circle cx="310" cy="155" r="65"  fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5"/>
  <circle cx="175" cy="175" r="35"  fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
  <circle cx="490" cy="490" r="150" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.30)" strokeWidth="2"/>
</svg>
```

### TechnicalTicker
- `bg-obsidian` → `bg-[#2C3340]`
- Texto: `text-cyan-institutional/60` → `style={{ color: '#ffffff' }}` (inline — Tailwind no procesaba la clase eliminada)
- Bullets: `text-cyan-institutional/30` → `text-[#F1F0E8]/40`
- Border: `border-cyan-institutional/20` → `border-[#ADC4CE]/20`

> **Lección:** Clases de colores eliminados de la paleta Tailwind (`cyan-institutional`,
> `mint-400`, `cobalt-500`) generan clases CSS vacías — el color no se aplica aunque
> el className sea correcto. Usar hex inline o agregar el color a `tailwind.config.js`.

### LangSwitcher
- Texto `ES`/`EN` → emojis de banderas `🇪🇸` `🇺🇸`
- Estado activo: `bg-cyan-500/20 text-cyan-300` → `bg-[#2C3340] scale-105`
- Estado inactivo: `text-gray-300` → `opacity-50 hover:opacity-80`

### About.jsx — Cards IA + Trayectoria
- Borde navy con shadow neon: `shadow-[0_0_0_1px_#2C3340,0_4px_24px_rgba(44,51,64,0.18)]`
- Hover: `shadow-[0_0_0_2px_#2C3340,0_8px_32px_rgba(44,51,64,0.28)]`
- Framer Motion: Card 1 entra desde `x: -50`, Card 2 desde `x: 50` con `delay: 0.1`
- Párrafos bio: `text-[#4B5563] font-normal` → `text-[#2C3340] font-medium`

### SkillsGrid
- Badge "Tecnologías" hardcodeado → `{t.works.techStackBadge}` (i18n)
- Nueva clave: `techStackBadge: 'Tecnologías'` (ES) / `'Technologies'` (EN)
- Punto pulsante: `bg-mint-400` → `bg-[#2C3340]`

### AgenciasColaboracion.jsx
- Párrafos beneficio: `text-[#96B6C5] text-sm font-medium` → `text-[#2C3340] text-sm lg:text-base font-semibold`

### Tipografía desktop /agencias (responsive — mobile sin cambios)
Patrón aplicado con prefijo `lg:`:
- `text-sm` → `lg:text-base` (cuerpo)
- `text-base` → `lg:text-lg` (párrafos principales)
- `text-lg` → `lg:text-xl` (títulos de sección)

Archivos modificados: `AgenciasParaQuien`, `AgenciasColaboracion`, `AgenciasFAQ`,
`AgenciasProceso`, `AgenciasHero`, `AgenciasCTAFinal`

---

## Archivos eliminados

| Archivo | Motivo |
|---------|--------|
| `src/components/ParticleBackground.jsx` | Sin importadores activos, reemplazado por círculos SVG estáticos en rebrand |

---

## Archivos nuevos

| Archivo | Descripción |
|---------|-------------|
| `src/components/ui/SectionDivider.jsx` | Componente SVG inline de separadores |
| `docs/specs/FEATURE-08-SECTION-DIVIDERS/spec.md` | Este archivo |
| `docs/specs/FEATURE-08-SECTION-DIVIDERS/plan.md` | Plan de implementación |
| `docs/specs/FEATURE-08-SECTION-DIVIDERS/tasks.md` | Desglose de tareas T-01..T-12 |

---

## Archivos modificados

`src/App.jsx` · `src/pages/AgenciasPage.jsx` · `src/pages/AgenciesPageEN.jsx` ·
`src/features/hero/HeroBanner.jsx` · `src/features/agencias/AgenciasHero.jsx` ·
`src/features/agencias/AgenciasParaQuien.jsx` · `src/features/agencias/AgenciasColaboracion.jsx` ·
`src/features/agencias/AgenciasFAQ.jsx` · `src/features/agencias/AgenciasProceso.jsx` ·
`src/features/agencias/AgenciasCTAFinal.jsx` · `src/components/About.jsx` ·
`src/components/SkillsGrid.jsx` · `src/components/TechnicalTicker.jsx` ·
`src/components/WireframeGeometry.jsx` · `src/components/ui/LangSwitcher.jsx` ·
`src/locales/es/works.js` · `src/locales/en/works.js` ·
`index.html` · `tailwind.config.js` · `CLAUDE.md` · `BITACORA_TECNICA.md` · `CHANGELOG.md`

---

## Restricciones activas

- Sin separador entre Works y secciones adyacentes → DT-08-01
- `mint-400`, `cyan-institutional`, `cobalt-500` residuales en ~14 archivos → DT-09-02
- No usar `npm audit fix` sin `--legacy-peer-deps` → rompe árbol de dependencias

---

## Criterios de aceptación

- [x] Build verde (npm run build)
- [x] 71/71 tests passing
- [x] Sin gap de pixel entre secciones y separadores SVG
- [x] Mobile sin cambios visuales (todos los cambios tipográficos usan prefijo `lg:`)
- [x] `prefers-reduced-motion`: hr fallback activo
- [x] Todas las claves i18n nuevas presentes en ES y EN
- [x] `ParticleBackground.jsx` eliminado
- [x] `SDD_MASTER.md` actualizado con FEATURE-08
- [ ] Merge a develop → release → main (pendiente cierre de rama)
