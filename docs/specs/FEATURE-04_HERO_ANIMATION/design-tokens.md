# DESIGN_TOKENS.md — Sistema de Diseño Ongevag

**Última actualización:** 10 de Abril de 2026


> ⚠️ **NOTA (2026-06-16):** Esta paleta fue reemplazada por el Rebrand Visual 2026
> (EPIC-07, ADR-012). Los tokens cobalt/mint/cyan-institutional documentados aquí
> son históricos. La paleta activa está en `tailwind.config.js` y `ADR-012.md`.
> Este documento se mantiene como referencia del diseño original del hero animation.

---

## 1. Paleta de Colores

Extraída de `tailwind.config.js` y utilizada en toda la aplicación.

### Colores Base & Brand

| Token | Valor | Uso |
|-------|-------|-----|
| **obsidian** | `#000000` | Fondo puro, base oscura principal |
| **primary** | `#3b82f6` | Azul vibrante para acentos puntuales |
| **background-light** | `#f8fafc` | Fondo claro (no usado actualmente en dark mode) |
| **background-dark** | `#0f172a` | Fondo oscuro alternativo |
| **card-dark** | `#1e293b` | Fondo de cards en modo oscuro |

### Paleta 2025: Cobalt + Slate Grey + Spring Mint + Cyan

#### Cobalt (Deep Blue — Primario ONGEVAG)
| Variante | Hex | Uso |
|----------|-----|-----|
| cobalt-50 | `#e6f0ff` | Fondos muy claros |
| cobalt-100 | `#b3d1ff` | Hover estados light |
| cobalt-200 | `#80b3ff` | Borders, dividers light |
| cobalt-300 | `#4d94ff` | Secondary accents |
| cobalt-400 | `#1a75ff` | Accent vibrante |
| **cobalt-500** | `#0047AB` | **Primary Deep Cobalt (main brand)** |
| cobalt-600 | `#003d91` | Hover oscuro |
| cobalt-700 | `#003377` | Active states |
| cobalt-800 | `#00295d` | Dark accents |
| cobalt-900 | `#001f43` | Darkest brand blue |

#### Mint (Spring Green — Accent vibrante)
| Variante | Hex | Uso |
|----------|-----|-----|
| mint-50 | `#edfff5` | Fondos muy claros |
| mint-100 | `#d5ffe6` | Hover light |
| mint-200 | `#aeffce` | Secondary highlights |
| mint-300 | `#70ffab` | Accents moderados |
| **mint-400** | `#2BFF88` | **Spring Mint accent (vibrante)** |
| mint-500 | `#00e676` | Material Green vibrante |
| mint-600 | `#00c853` | Accents fuertes |
| mint-700 | `#00a844` | Hover |
| mint-800 | `#008837` | Active |
| mint-900 | `#00682a` | Dark green |

#### Slate (Neutral Grey)
| Variante | Hex | Uso |
|----------|-----|-----|
| **slate-850** | `#1a2332` | Custom intermedio (cards, surfaces) |
| **slate-950** | `#0d1117` | Darker than default (backgrounds profundos) |
| *+ defaults Tailwind* | — | slate-50 → slate-900 |

#### Cyan (ONGEVAG Institutional Primary)
| Variante | Hex | Uso |
|----------|-----|-----|
| cyan-institutional | `#00FFFF` | **ONGEVAG primary cyan (glow, borders)** |
| cyan-glow | `#00FFFF` | Alias para glow effects |
| cyan-50 | `#ecfeff` | Very light backgrounds |
| cyan-100 | `#cffafe` | Light accents |
| cyan-200 | `#a5f3fc` | Secondary accents |
| cyan-300 | `#67e8f9` | Moderate cyan |
| cyan-400 | `#22d3ee` | Strong cyan accent |
| **cyan-500** | `#00FFFF` | **Pure cyan (matching institutional)** |
| cyan-600 | `#00d9d9` | Darker cyan |
| cyan-700 | `#00b3b3` | Strong dark cyan |
| cyan-800 | `#008c8c` | Very dark cyan |
| cyan-900 | `#006666` | Darkest cyan |

#### Accent Colors (Compatibility)
| Token | Hex | Uso |
|-------|-----|-----|
| accent-lime | `#d3fd01` | Legacy accent (se mantiene para compatibilidad) |
| accent-purple | `#8b5cf6` | Purple accent (no usado actualmente) |
| accent-cyan | `#06b6d4` | Cyan accent (alternativa de cyan estándar) |

---

## 2. Tipografía

### Familias de Fuente

Definidas en `tailwind.config.js`:

| Variable | Familia | Stack | Uso |
|----------|---------|-------|-----|
| **sans** | Inter | `Inter, system-ui, -apple-system, sans-serif` | Cuerpo de texto, UI principal |
| **display** | Inter | `Inter, system-ui, sans-serif` | Titulares, headings |
| **mono** | JetBrains Mono | `JetBrains Mono, Fira Code, Consolas, monospace` | Código, datos técnicos, metadata |

### Escala Tipográfica

Definida en `src/index.css`:

| Elemento | Tamaños | Peso | Uso |
|----------|---------|------|-----|
| **h1** | `text-4xl` (móvil) → `text-6xl` (desktop) | `font-bold` | Hero titles, main headings |
| **h2** | `text-2xl` (móvil) → `text-3xl` (desktop) | `font-bold` | Section headings |
| **h3** | `text-xl` (móvil) → `text-2xl` (desktop) | `font-semibold` | Card titles, subheadings |
| **p, li** | `text-base` (móvil) → `text-[1.05rem]` (desktop) | default | Body text, list items |
| **small, .text-sm** | `0.8rem` (~12-13px) | `font-medium` | Metadata, captions, labels |
| **Body** | `text-[1.05rem]` | default | Default text size (elegante) |

### Letter Spacing (Custom)

| Token | Valor | Uso |
|-------|-------|-----|
| letter-spacing-tight | `-0.025em` | Headings compactos |
| letter-spacing-wide | `0.025em` | Body text normal |
| letter-spacing-wider | `0.05em` | Accents, labels |
| letter-spacing-widest | `0.1em` | UI pequeñas, metadata |

---

## 3. Sombras y Efectos

### Box Shadow (Glow Effects)

Definidas en `tailwind.config.js`:

| Token | Valor CSS | Uso |
|-------|-----------|-----|
| **shadow-glow-sm** | `0 0 15px -3px` | Small glow effects |
| **shadow-glow** | `0 0 25px -5px` | Standard glow (default) |
| **shadow-glow-lg** | `0 0 50px -12px` | Large glow, emphasis |
| **shadow-inner-glow** | `inset 0 0 20px 0` | Inner glow, depth |
| **shadow-cyan-glow** | `0 0 20px rgba(0, 255, 255, 0.5)` | Cyan-specific glow |
| **shadow-cyan-glow-lg** | `0 0 40px rgba(0, 255, 255, 0.7)` | Large cyan glow |

### Glassmorphism Effects

Definidas en `src/index.css` (componentes reutilizables):

| Clase | Propiedades | Uso |
|-------|-------------|-----|
| **.glass** | `backdrop-blur-xl bg-white/5 border border-white/10` | Tarjetas translúcidas ligeras |
| **.glass-strong** | `backdrop-blur-2xl bg-white/10 border border-white/20` | Cards más opacas, más contraste |
| **.glass-card** | `backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl` | Tarjetas con border-radius |

### Gradient Effects

| Clase | Gradient | Uso |
|-------|----------|-----|
| **.gradient-text** | `from-cobalt-400 to-mint-400` | Texto con gradiente brand |
| **.gradient-text-accent** | `from-mint-400 to-mint-300` | Texto con gradiente mint |
| **.glow-cobalt** | Cobalt glow box-shadow | Glow effect en color brand primario |
| **.glow-mint** | Mint glow box-shadow | Glow accent en mint |
| **.glow-cyan** | Cyan glow box-shadow | **ONGEVAG cyan glow principal** |
| **.gradient-border** | Animated border gradient | Borders animados cobalt→mint |

### Gradientes del Hero (v2.3.0)

| Token | Gradient | Uso |
|-------|----------|-----|
| **Fondo Hero** | `bg-gradient-to-br from-[#080c14] via-[#0d1520] to-[#061018]` | Contenedor principal HeroBanner.jsx |
| **Título ONGEVAG (GE)** | `linear-gradient(135deg, #22d3ee, #818cf8)` | Letras "GE" de título principal |
| **Botón Primario** | `linear-gradient(135deg, #06b6d4, #818cf8)` | Botón "Ver proyectos" |
| **Glow Cyan Top-Left** | `radial-gradient(circle, rgba(0,188,212,0.12) 0%, transparent 70%)` | Elemento decorativo top-left |
| **Glow Indigo Bottom-Right** | `radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)` | Elemento decorativo bottom-right |

### Backdrop Blur

| Token | Valor | Uso |
|-------|-------|-----|
| backdrop-blur-xs | `2px` | Sutileza |
| backdrop-blur-xl | (Tailwind default) | Glassmorphism |
| backdrop-blur-2xl | (Tailwind default) | Glassmorphism fuerte |

---

## 4. Animaciones — Framer Motion

Definidas en `src/config/motionConfig.js`. Cada variante es un objeto reutilizable.

### Spring Presets

| Config | Parámetros | Efecto | Dónde se usa |
|--------|-----------|--------|-------------|
| **gentle** | `stiffness: 120, damping: 18` | Suave, fluido | Hover states, transiciones sutiles |
| **snappy** | `stiffness: 280, damping: 25` | Rápido, responsivo | Click actions, card reveals |
| **bouncy** | `stiffness: 400, damping: 12` | Rebotante, playful | Highlights, emphasis |
| **smooth** | `stiffness: 80, damping: 20, mass: 0.5` | Muy suave, inercial | Page transitions, large movements |

### Duration Presets

| Config | Duración | Easing | Uso |
|--------|----------|--------|-----|
| **fast** | `0.15s` | easeOut | Quick interactions (tap, click) |
| **normal** | `0.3s` | `[0.25, 0.1, 0.25, 1]` | Standard transitions |
| **slow** | `0.5s` | `[0.43, 0.13, 0.23, 0.96]` | Page exits, complex animations |

### Variantes de Entrada/Salida

| Variante | Animación | Transición | Dónde se usa |
|----------|-----------|-----------|-------------|
| **fadeInUp** | Fade + translateY(-20px) + blur | `springConfig.snappy` | Componentes principales, hero elements |
| **fadeInDown** | Fade + translateY(20px) | `springConfig.gentle` | Secondary content reveals |
| **pageTransition** | Fade + translateY(20px) + blur | `durationConfig.normal` | Page-level transitions, PageTransition.jsx |

### Contenedores Stagger

| Variante | Propiedades | Dónde se usa |
|----------|------------|-------------|
| **staggerContainer** | `staggerChildren: 0.07, delayChildren: 0.05` | Listas, grillas de componentes animados en secuencia |

### Componentes UI

| Variante | Estados | Transición | Dónde se usa |
|----------|---------|-----------|-------------|
| **glassCard** | `hidden → visible → hover → tap` | `springConfig.snappy (visible)`, `springConfig.gentle (hover)`, `durationConfig.fast (tap)` | Cards, proyecto cards, service cards |
| **buttonVariants** | `idle → hover → tap` | `springConfig.gentle`, `durationConfig.fast` | Botones interactivos |
| **skeletonPulse** | Opacity pulse 0.4 → 0.7 → 0.4 | `duration: 1.5s, repeat: Infinity` | Skeleton loaders (loading states) |
| **progressBar** | Width animation dinámico | `duration: 1s (width), 0.3s (opacity), delay: 0.3s` | ProgressBar.jsx |

### Accesibilidad & Viewport

| Variante | Propósito | Config |
|----------|-----------|--------|
| **reducedMotionConfig** | Respeta `prefers-reduced-motion` | Fade only, `duration: 0.01s` |
| **viewportConfig** | Trigger en scroll | `once: true, margin: "-100px", amount: 0.3` |

---

## 5. Animaciones — CSS Keyframes

### Keyframes de Tailwind (tailwind.config.js)

| Keyframe | Efecto | Duración | Dónde se usa |
|----------|--------|----------|-------------|
| **gradient** | `backgroundPosition: 0% → 100%` | 8s infinite | Animated gradients (backgrounds) |
| **float** | `translateY(0 → -20px)` | 6s infinite | Elementos flotantes, levitación |
| **shimmer** | `backgroundPosition: -200% → 200%` | 2s infinite | Skeleton loaders, shimmer effects |
| **blob** | `translate + scale` morphing | 7s infinite | Blobs decorativos, organic shapes |
| **ticker** | `translateX(0 → -50%)` | 30s infinite | TechnicalTicker.jsx, scroll infinito |

### Keyframes de CSS (src/index.css)

| Keyframe | Efecto | Archivo |
|----------|--------|---------|
| **gradient-shift** | Animated gradient border (0% → 100% background-position) | src/index.css |

### Keyframes de CSS (Services3DCarousel.css)

| Keyframe | Efecto | Duración | Dónde se usa |
|----------|--------|----------|-------------|
| **float** | `translateZ(-250px) translateY(0 → -20px)` | 6s infinite | Carousel floating suspension effect |
| **rotateCarousel** | `rotateY(0deg → 360deg)` | — | Auto-rotation (paused on hover) |

---

## 6. Breakpoints

### Breakpoints Estándar (Tailwind defaults)

| Nombre | Valor | Uso típico |
|--------|-------|-----------|
| **sm** | 640px | Tablets pequeños |
| **md** | 768px | Tablets |
| **lg** | 1024px | Laptops, desktops |
| **xl** | 1280px | Widescreen |
| **2xl** | 1536px | Ultra-widescreen |

### Breakpoints Custom (Services3DCarousel.css)

| Valor | Uso |
|-------|-----|
| **1024px** | Tablet adjustments |
| **768px** | Mobile tablets |
| **480px** | Extra small devices, phones |

---

## 7. Cómo usar estos tokens

### Colores

```jsx
// Fondo dark con texto light
<div className="bg-obsidian text-slate-200">Content</div>

// Brand primary
<div className="bg-cobalt-500 text-white">Primary brand</div>

// Mint accent
<button className="bg-mint-400 text-obsidian">Mint CTA</button>

// ONGEVAG cyan (primary institutional)
<div className="border-cyan-institutional shadow-cyan-glow">
  Institutional feature
</div>

// Glassmorphism
<div className="glass">Glass card</div>
```

### Tipografía

```jsx
import { className } from '@/config'

// Headings
<h1 className="text-4xl lg:text-6xl font-bold">Main title</h1>
<h2 className="text-2xl lg:text-3xl font-bold">Section</h2>

// Body
<p className="text-base lg:text-[1.05rem] text-slate-400">Paragraph</p>

// Mono (código)
<code className="font-mono text-sm">const x = 5;</code>

// Letter spacing
<h1 className="tracking-tight">Compact heading</h1>
<p className="tracking-wide">Spaced paragraph</p>
```

### Animaciones Framer Motion

```jsx
import { fadeInUp, glassCard, staggerContainer } from '@/config/motionConfig'

// Entrada simple
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
>
  Content
</motion.div>

// Card con hover
<motion.div
  variants={glassCard}
  initial="hidden"
  animate="visible"
  whileHover="hover"
  whileTap="tap"
>
  Card
</motion.div>

// Lista staggered
<motion.ul
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
>
  {items.map(item => (
    <motion.li key={item.id} variants={fadeInUp}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### CSS Keyframes

```css
/* Float animation */
.floating-element {
  animation: float 6s ease-in-out infinite;
}

/* Shimmer loading */
.skeleton {
  animation: shimmer 2s linear infinite;
}

/* Glass card con glow */
.glass-card {
  @apply glass;
  box-shadow: 0 0 40px -10px theme('colors.cyan.institutional');
}
```

### Glassmorphism & Glow

```jsx
// Glass card (translucent)
<div className="glass rounded-2xl p-6">Card</div>

// Glass strong (más opaco)
<div className="glass-strong rounded-xl p-4">Dense card</div>

// Gradient text
<h2 className="gradient-text">Branded heading</h2>

// Cyan glow (ONGEVAG)
<div className="glow-cyan">Highlighted element</div>
```

---

## Resumen de Tokens

- **40+ colores/variantes**: Cobalt, Mint, Cyan, Slate, Accents
- **12 variantes de animación Framer Motion**: Springs, durations, entrada/salida, stagger, UI states
- **7 CSS keyframes**: Gradient, float, shimmer, blob, ticker, gradient-shift, rotateCarousel
- **5 glassmorphism classes**: glass, glass-strong, glass-card + gradients y glows
- **6 custom box shadows**: Glow effects en múltiples intensidades y colores
- **3 font families**: Sans (Inter), Display (Inter), Mono (JetBrains)
- **Breakpoints Tailwind**: sm, md, lg, xl, 2xl (+ custom en Services3DCarousel)

---

**Mantenedor:** Leandro Gavegno | **Proyecto:** Ongevag Portfolio | **Stack:** React 19 + Vite + Tailwind 3.3
