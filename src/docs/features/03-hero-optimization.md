# MOD-02 — Módulo Hero

**Versión:** 2.3.0 | **Fecha:** Abril 2026 | **Status:** Producción

---

## Archivos del módulo

| Archivo | Responsabilidad |
|---------|-----------------|
| src/features/hero/HeroBanner.jsx | Componente principal del hero |
| src/components/ParticleBackground.jsx | Canvas animado de fondo |
| src/components/WireframeGeometry.jsx | Geometría 3D flotante |
| src/config/motionConfig.js | Variantes de animación usadas |

---

## Estructura visual

```
HeroBanner (section)
├── ParticleBackground (canvas absoluto, z-0)
├── Glows decorativos (divs absolutos, z-0)
│   ├── Glow cyan top-left
│   └── Glow indigo bottom-right
├── Columna izquierda (z-10)
│   ├── Badge "Disponible para proyectos"
│   ├── Título ONGEVAG (gradiente en GE)
│   ├── Subtítulo y descripción
│   ├── Botones CTA (pill style)
│   └── Stats (4+ Proyectos / PyME Foco)
├── Columna derecha (hidden en mobile, z-10)
│   └── WireframeGeometry (flotante, sin marco)
└── TechnicalTicker (base)
```

---

## Comportamiento responsive

| Breakpoint | Comportamiento |
|-----------|-----------------|
| **mobile (<lg)** | Solo columna izquierda; geometría oculta; ParticleBackground visible |
| **lg+** | Layout dos columnas; WireframeGeometry visible; ParticleBackground de fondo |

---

## ParticleBackground — detalles técnicos

### Características
- **Renderer:** Canvas 2D con requestAnimationFrame
- **Redimensionado:** ResizeObserver automático
- **Densidad:** 1 partícula por cada 15.000px²
- **Movimiento:** ±0.3px por frame (velocidad variable)
- **Conexiones:** Líneas entre partículas a menos de 120px de distancia
- **Color:** rgba(34, 211, 238, variable) — cyan institucional ONGEVAG
- **Opacidad:** 60% (aplicada al canvas)
- **Accesibilidad:** Retorna null si `prefers-reduced-motion` está activo

### Importancia
- **NO usar React.lazy** — debe cargar con HeroBanner para evitar flash blanco al iniciar
- Renderiza en CPU; optimizado para movimientos suaves sin lag en mobile

### Parámetros modificables

```javascript
// En ParticleBackground.jsx

// Línea 19: Densidad de partículas
const count = Math.floor((canvas.width * canvas.height) / 15000)
// Menor divisor = más partículas (aumenta CPU)

// Línea 27-29: Velocidad y tamaño
vx: (Math.random() - 0.5) * 0.3,  // ±0.3px/frame
vy: (Math.random() - 0.5) * 0.3,
r: Math.random() * 1.5 + 0.5,     // Radio 0.5-2px

// Línea 60: Radio de conexión
if (dist < 120) {  // Conectar si está a menos de 120px
  // Dibujar línea
}

// Línea 65: Color de partículas
ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`
// Cambiar a cualquier color RGBA
```

---

## Integración en HeroBanner

### Import
```jsx
import ParticleBackground from '../../components/ParticleBackground';
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
    ...
  </div>
</section>
```

---

## Animaciones y Transiciones

### Variantes usadas (desde motionConfig.js)

| Componente | Variante | Efecto |
|-----------|----------|--------|
| Badge | `fadeInUp` | Entrada suave desde arriba |
| Título | `fadeInUp` | Aparición progresiva |
| Descripción | `fadeInUp` | Fade + slide |
| Botones | `fadeInUp` | Entrada coordenada |
| Stats | `fadeInUp` | Aparición con delay |
| WireframeGeometry | `animate.y: [0, -12, 0]` | Flotación infinita |

### Stagger Container
- **Delay entre elementos:** 0.1s
- **Aplicado a:** grid principal de HeroBanner

---

## Optimizaciones de Performance

| Técnica | Implementación |
|---------|----------------|
| **Lazy load 3D** | `React.lazy(() => import('...' WireframeGeometry))` |
| **ParticleBackground eager** | Importado normalmente (no lazy) para evitar flash |
| **ResizeObserver** | Redimensiona canvas solo cuando viewport cambia |
| **requestAnimationFrame** | Sincroniza con refresh rate del navegador (60fps) |
| **Opacidad reducida** | `opacity: 0.6` en canvas para no saturar visualmente |

---

## Estilos Críticos

### HeroBanner.jsx - Clases Tailwind

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

### ParticleBackground.jsx - Clases

```jsx
className="absolute inset-0 w-full h-full pointer-events-none"
style={{ opacity: 0.6 }}
```

---

## Cómo modificar el Hero

### 1. Cambiar densidad de partículas
```javascript
// En ParticleBackground.jsx línea 19
const count = Math.floor((canvas.width * canvas.height) / 10000)  // Más denso
```

### 2. Cambiar velocidad de animación
```javascript
// En ParticleBackground.jsx línea 27-29
vx: (Math.random() - 0.5) * 0.5,  // Más rápido
vy: (Math.random() - 0.5) * 0.5,
```

### 3. Cambiar color de partículas
```javascript
// En ParticleBackground.jsx línea 65
ctx.fillStyle = `rgba(255, 107, 53, ${p.alpha})`  // Color naranja
```

### 4. Cambiar texto del badge
```jsx
// En HeroBanner.jsx línea 84
<span>Tu nuevo badge text</span>
```

### 5. Cambiar stats
```jsx
// En HeroBanner.jsx línea 174-180
<div className="font-display text-xl font-bold text-slate-100">5+</div>
<div className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">Nuevos Proyectos</div>
```

---

## Testing & QA

### Checklist antes de deploy

- [ ] ParticleBackground carga sin flash blanco
- [ ] Canvas redimensiona correctamente en resize de ventana
- [ ] Partículas animan suavemente (60fps) en desktop y mobile
- [ ] Badge y stats son visibles en mobile
- [ ] Título responde bien: text-[36px] (sm) → text-7xl (lg)
- [ ] WireframeGeometry flota sin lag en desktop
- [ ] Botones tienen hover state correcto
- [ ] Formulario de contacto scrolls correctamente

### Performance Metrics

```
LCP: ~1.2s (HeroBanner cargado)
CLS: 0 (sin layout shift)
FID: ~50ms
Canvas FPS: 60fps
```

---

## Decisiones de Diseño

| Decisión | Razón | Alternativa |
|----------|-------|-------------|
| Canvas 2D vs Three.js | Peso (KB) y performance en mobile | Three.js: +300KB, más pesado |
| ParticleBackground eager (no lazy) | Evitar flash blanco al cargar | React.lazy causa UX degradado |
| Opacidad 60% | Balance visual (no saturar, visible) | 100% sería dominante; <40% sería imperceptible |
| Cyan color | Brand ONGEVAG institucional | Otros colores rompen identidad |
| 120px conexión radio | Balance: suficientes líneas sin desorden | <80px muy denso; >150px muy disperso |

---

## Referencias

- **DESIGN_TOKENS.md** — Gradientes y colores hero (v2.3.0)
- **CLAUDE.md** — Sección "Archivos Críticos" y "Notas Importantes"
- **CHANGELOG.md** — Release notes v2.3.0
- **motionConfig.js** — Variantes de animación reutilizables

---

**Mantenedor:** Leandro Gavegno | **Proyecto:** Ongevag Portfolio | **Branch:** feat/hero-redesign
