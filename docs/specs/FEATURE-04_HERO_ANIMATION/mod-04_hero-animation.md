# MOD-04 — Hero Feature (ParticleBackground)

**Módulo ID:** MOD-04  
**Versión:** 2.3.0  
**Fecha:** Abril 2026  
**Status:** Producción  
**Estado Documentación:** ✅ Consolidado  
**Última revisión:** 2026-06-05

---

## 1. Propósito (1 oración exacta)

**Proveer una experiencia visual de alto impacto (Senior level) sin degradar la performance de la SPA mediante Canvas 2D animado y partículas dinámicas.**

---

## 2. Alcance

### ✅ Incluye
- HeroBanner: sección landing principal con 2 columnas (contenido + geometría 3D)
- ParticleBackground: canvas animado con partículas flotantes y conexiones
- WireframeGeometry: objeto 3D flotante (lazy-loaded)
- Animaciones coordenadas (Framer Motion) con stagger
- Responsive design (mobile: 1 columna; lg+: 2 columnas)
- Accesibilidad: respeta `prefers-reduced-motion`

### ❌ Excluye
- Uso de Three.js u otras librerías 3D pesadas
- Canvas renderizado con React.lazy (debe ser eager para evitar flash blanco)
- Interactividad compleja (hover/click sobre partículas)

---

## 3. Arquivos del Módulo

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/features/hero/HeroBanner.jsx` | Componente principal del hero |
| `src/components/ParticleBackground.jsx` | Canvas animado de fondo |
| `src/components/WireframeGeometry.jsx` | Geometría 3D flotante |
| `src/config/motionConfig.js` | Variantes de animación usadas |
| `docs/specs/FEATURE-04/design-tokens.md` | Gradientes, colores, tokens |

---

## 4. Diseño del Módulo

### 4.1 Estructura Visual

```
HeroBanner (section id="inicio", min-h-screen, relative)
├── ParticleBackground (canvas absoluto, z-0, inset-0)
├── Glows decorativos (divs absolutos, z-0)
│   ├── Glow cyan top-left (500x500px)
│   └── Glow indigo bottom-right (500x500px)
├── Columna izquierda (z-10, flex-1)
│   ├── Badge "Disponible para proyectos" (cyan/border)
│   ├── Título ONGEVAG (gradiente, text-7xl en lg)
│   ├── Subtítulo (text-xl, text-slate-400)
│   ├── Descripción (max-w-md, text-slate-300)
│   ├── Botones CTA (pill style, gap-4)
│   │   ├── "Ver proyectos" (primary)
│   │   └── "Descargar CV" (secondary)
│   └── Stats (4 columnas: Proyectos, PyMEs, etc.)
├── Columna derecha (hidden sm, lg:block, z-10)
│   └── WireframeGeometry (lazy-loaded, Suspense)
└── TechnicalTicker (base, scroll de logos)
```

### 4.2 Comportamiento Responsive

| Breakpoint | Comportamiento |
|-----------|-----------------|
| **mobile (<640px)** | Solo columna izquierda; geometría oculta; ParticleBackground visible; título text-4xl |
| **tablet (640-1024px)** | Similar a mobile; ParticleBackground reduced density |
| **desktop (lg+, 1024px)** | Layout dos columnas; WireframeGeometry visible; título text-7xl |

---

## 5. ParticleBackground — Especificaciones Técnicas

### 5.1 Características

| Aspecto | Valor | Notas |
|--------|-------|-------|
| **Renderer** | Canvas 2D + requestAnimationFrame | Sincroniza con 60fps del navegador |
| **Densidad** | 1 partícula / 15.000px² | Dinámico según viewport |
| **Movimiento** | ±0.3px/frame (velocidad variable) | Suave, no saltado |
| **Conexiones** | Líneas entre partículas <120px | Radio configurable |
| **Color** | rgba(34, 211, 238, variable) | Cyan ONGEVAG institucional |
| **Opacidad** | 60% aplicada al canvas | Balance: visible sin saturar |
| **Accesibilidad** | Retorna `null` si `prefers-reduced-motion` | Respeta preferencias usuario |
| **Redimensionado** | ResizeObserver automático | Sin memory leaks |

### 5.2 Parámetros Modificables

```javascript
// En ParticleBackground.jsx

// Línea 19: Densidad de partículas
const count = Math.floor((canvas.width * canvas.height) / 15000)
// ↓ dividir por número menor = más partículas (↑ CPU)

// Línea 27-29: Velocidad y tamaño
vx: (Math.random() - 0.5) * 0.3,  // ±0.3px/frame
vy: (Math.random() - 0.5) * 0.3,
r: Math.random() * 1.5 + 0.5,     // Radio 0.5-2px

// Línea 60: Radio de conexión
if (dist < 120) {  // Conectar si <120px
  // Dibujar línea
}

// Línea 65: Color de partículas
ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`
```

### 5.3 Importancia Crítica

⚠️ **NO usar React.lazy** — debe cargar con HeroBanner para evitar flash blanco al iniciar  
✅ Renderiza en CPU; optimizado para movimientos suaves sin lag en mobile

---

## 6. Integración en HeroBanner

### Import
```jsx
import ParticleBackground from '../../components/ParticleBackground';
import WireframeGeometry from '../../components/WireframeGeometry';
```

### Posición en el árbol
```jsx
<section id="inicio" className="relative min-h-screen ...">
  <ParticleBackground />  {/* Primer hijo — z-0 */}

  {/* Glows decorativos */}
  <div className="absolute ...glow-cyan..." />
  <div className="absolute ...glow-indigo..." />

  {/* Contenido principal (z-10) */}
  <div className="flex-1 flex items-start lg:items-center">
    {/* Badge, Título, Descripción, Botones, Stats */}
  </div>

  {/* WireframeGeometry (lazy) */}
  <Suspense fallback={null}>
    <WireframeGeometry />
  </Suspense>
</section>
```

---

## 7. Animaciones y Transiciones

### 7.1 Variantes Framer Motion

| Componente | Variante | Efecto | Delay |
|-----------|----------|--------|-------|
| Badge | `fadeInUp` | Entrada suave desde arriba | 0s |
| Título | `fadeInUp` | Aparición progresiva | 0.1s |
| Descripción | `fadeInUp` | Fade + slide | 0.2s |
| Botones | `fadeInUp` | Entrada coordenada | 0.3s |
| Stats | `fadeInUp` | Aparición con stagger | 0.4s |
| WireframeGeometry | `animate.y: [0, -12, 0]` | Flotación infinita | — |

### 7.2 Stagger Container
```jsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }}
  initial="hidden"
  animate="show"
  transition={{ staggerChildren: 0.1 }}
>
  {/* Todos los children heredan stagger */}
</motion.div>
```

---

## 8. Optimizaciones de Performance

### 8.1 Implementadas

| Técnica | Implementación | Beneficio |
|---------|----------------|-----------|
| **Lazy load 3D** | `React.lazy(() => import('...WireframeGeometry'))` | ↓ ~40KB en bundle inicial |
| **ParticleBackground eager** | Importado normalmente (no lazy) | Evita flash blanco al iniciar |
| **ResizeObserver** | Redimensiona canvas solo cuando viewport cambia | ↓ CPU spikes innecesarios |
| **requestAnimationFrame** | Sincroniza con refresh rate (60fps) | ✅ 60fps smooth sin stuttering |
| **Opacidad 60%** | `opacity: 0.6` en canvas | Balance visual (no saturar) |

### 8.2 Métricas de Performance Objetivo

| Métrica | Valor | Descripción |
|---------|-------|-------------|
| **LCP** | ~1.2s | Largest Contentful Paint (hero cargado) |
| **FID** | ~50ms | First Input Delay (respuesta botones) |
| **CLS** | 0 | Cumulative Layout Shift (sin shifts) |
| **Canvas FPS** | 60fps | Partículas suaves |

---

## 9. Estilos Críticos

### 9.1 HeroBanner.jsx

```jsx
// Contenedor principal
className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#080c14] via-[#0d1520] to-[#061018] overflow-hidden"

// Glows (absolutos, decorativos)
className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"

// Columna izquierda
className="w-full lg:space-y-8 text-left"

// Título
className="whitespace-nowrap leading-none mb-4"

// Badge
className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/8 border border-cyan-500/20 text-cyan-400 text-xs font-medium tracking-widest uppercase"

// Botones (pill style)
className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"

// Stats
className="flex gap-8 pt-7 border-t border-white/[0.06]"
```

### 9.2 ParticleBackground.jsx

```jsx
className="absolute inset-0 w-full h-full pointer-events-none"
style={{ opacity: 0.6 }}
```

---

## 10. Guía de Modificación

### 10.1 Cambiar densidad de partículas
```javascript
// En ParticleBackground.jsx línea 19
const count = Math.floor((canvas.width * canvas.height) / 10000)  // Más denso
const count = Math.floor((canvas.width * canvas.height) / 20000)  // Menos denso
```

### 10.2 Cambiar velocidad de animación
```javascript
// En ParticleBackground.jsx línea 27-29
vx: (Math.random() - 0.5) * 0.5,  // Más rápido
vy: (Math.random() - 0.5) * 0.5,
```

### 10.3 Cambiar color de partículas
```javascript
// En ParticleBackground.jsx línea 65
ctx.fillStyle = `rgba(255, 107, 53, ${p.alpha})`  // Color naranja
```

### 10.4 Cambiar texto del badge
```jsx
// En HeroBanner.jsx
<span>Disponible para nuevos proyectos</span>
```

### 10.5 Cambiar stats
```jsx
// En HeroBanner.jsx
<div className="font-display text-xl font-bold text-slate-100">5+</div>
<div className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">
  Nuevos Proyectos
</div>
```

---

## 11. Testing & QA

### 11.1 Checklist antes de Deploy

- [ ] ParticleBackground carga sin flash blanco
- [ ] Canvas redimensiona correctamente en resize de ventana
- [ ] Partículas animan suavemente (60fps) en desktop y mobile
- [ ] Badge y stats son visibles en mobile
- [ ] Título responde correctamente: text-4xl (sm) → text-7xl (lg)
- [ ] WireframeGeometry flota sin lag en desktop
- [ ] Botones tienen hover state correcto
- [ ] Animaciones respetan `prefers-reduced-motion`
- [ ] Form de contacto scrolls correctamente desde CTA

### 11.2 Performance Metrics Verificables

```
Lighthouse:
  LCP: ✅ <2.5s
  FID: ✅ <100ms
  CLS: ✅ 0
Canvas FPS: ✅ 60fps (DevTools > Performance)
```

---

## 12. Decisiones de Diseño

| Decisión | Razón | Alternativa Rechazada |
|----------|-------|----------------------|
| Canvas 2D vs Three.js | Peso (KB) y performance en mobile | Three.js: +300KB, excesivo para portfolio |
| ParticleBackground eager (no lazy) | Evitar flash blanco al cargar | React.lazy causa UX degradado |
| Opacidad 60% | Balance visual (visible sin saturar) | 100% sería dominante; <40% imperceptible |
| Cyan color | Brand ONGEVAG institucional | Otros colores rompen identidad visual |
| 120px conexión radio | Balance: suficientes líneas sin desorden | <80px muy denso; >150px muy disperso |
| Stagger 0.1s | Ritmo óptimo de entrada coordenada | <0.05s muy rápido; >0.15s lento |

---

## 13. Referencias y Links

- **[design-tokens.md](./design-tokens.md)** — Gradientes y colores hero (v2.3.0)
- **[CLAUDE.md](../../CLAUDE.md)** — Sección "Archivos Críticos" y stack
- **[SDD_MASTER.md](../SDD_MASTER.md)** — Índice central de módulos
- **[src/config/motionConfig.js](../../../src/config/motionConfig.js)** — Variantes de animación
- **[ADR-004](../adr/ADR-004.md)** — Feature-based architecture

---

**Mantenedor:** Leandro Gavegno | **Proyecto:** Ongevag Studio Portfolio | **Branch:** feature/seo-aeo-i18n-button