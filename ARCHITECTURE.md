# 🏗️ Arquitectura del Proyecto - Portafolio 2025

> Diagrama visual de la arquitectura y flujo de datos del proyecto.

---

## 📊 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ENTRY POINTS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   index.html ──► main.jsx ──► App.jsx                                       │
│                     │                                                       │
│                     ▼                                                       │
│              ┌─────────────┐                                                │
│              │ Providers   │                                                │
│              │ - StrictMode│                                                │
│              │ - Helmet    │                                                │
│              └─────────────┘                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              APP.JSX                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        Code Splitting Layer                         │   │
│   │                                                                     │   │
│   │   React.lazy() ──► HeroBanner                                       │   │
│   │   React.lazy() ──► Services                                         │   │
│   │   React.lazy() ──► Works                                            │   │
│   │   React.lazy() ──► Contact                                          │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     Suspense + AnimatePresence                      │   │
│   │                                                                     │   │
│   │   Fallback: SkeletonPage                                            │   │
│   │   Mode: "wait"                                                      │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MAIN LAYOUT                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  HEADER (Fixed)                                                     │   │
│   │  ├── Logo + Nombre                                                  │   │
│   │  ├── Nav Links (Desktop)                                            │   │
│   │  ├── CTA Button                                                     │   │
│   │  └── Mobile Menu (AnimatePresence)                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  MAIN CONTENT                                                        │   │
│   │                                                                      │   │
│   │  ┌─────────────────────────────────────────────────────────────┐    │   │
│   │  │  #hero - HeroBanner                                          │    │   │
│   │  │  ├── Badge                                                   │    │   │
│   │  │  ├── Headline + Subtítulo                                   │    │   │
│   │  │  ├── CTAs (Button components)                               │    │   │
│   │  │  ├── Social Links                                           │    │   │
│   │  │  ├── ProjectCards Grid (3)                                  │    │   │
│   │  │  ├── BlogPreview (compact)                                  │    │   │
│   │  │  └── Scroll Indicator                                       │    │   │
│   │  └─────────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   │  ┌─────────────────────────────────────────────────────────────┐    │   │
│   │  │  #servicios - Services                                       │    │   │
│   │  │  ├── Header (Badge + Título)                                │    │   │
│   │  │  ├── 3D Carousel                                            │    │   │
│   │  │  │   └── ServiceCards (5)                                   │    │   │
│   │  │  ├── Nav Buttons (prev/next)                                │    │   │
│   │  │  └── Indicators                                             │    │   │
│   │  └─────────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   │  ┌─────────────────────────────────────────────────────────────┐    │   │
│   │  │  #proyectos - Works                                          │    │   │
│   │  │  ├── Header (Badge + Título + Descripción)                  │    │   │
│   │  │  ├── ProjectCards Grid (5)                                  │    │   │
│   │  │  └── CTA GitHub                                             │    │   │
│   │  └─────────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   │  ┌─────────────────────────────────────────────────────────────┐    │   │
│   │  │  #contacto - Contact                                         │    │   │
│   │  │  ├── Header (Badge + Título + Descripción)                  │    │   │
│   │  │  └── Form (glass-card)                                      │    │   │
│   │  │      ├── Input: Nombre                                      │    │   │
│   │  │      ├── Input: Email                                       │    │   │
│   │  │      ├── Textarea: Mensaje                                  │    │   │
│   │  │      └── Button: Submit                                     │    │   │
│   │  └─────────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  FOOTER                                                              │   │
│   │  ├── Logo + Nombre                                                   │   │
│   │  ├── Social Links                                                    │   │
│   │  └── Copyright                                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
mi-portafolio/
│
├── public/                      # Archivos estáticos (acceso directo)
│   └── images/                  # Imágenes públicas
│
├── src/
│   │
│   ├── assets/                  # Assets procesados por Vite
│   │   └── images/
│   │       └── IMG-lg-blanca.png
│   │
│   ├── components/              # 🧩 COMPONENTES COMPARTIDOS
│   │   │
│   │   ├── ui/                  # Componentes UI reutilizables
│   │   │   ├── Button.jsx       # Botón con variantes y micro-interacciones
│   │   │   ├── ProjectCard.jsx  # Card de proyecto con glassmorphism
│   │   │   ├── ProgressBar.jsx  # Barra de progreso animada
│   │   │   ├── Skeleton.jsx     # Loading states
│   │   │   └── index.js         # Barrel export
│   │   │
│   │   ├── Header.jsx           # Navegación principal
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── Home.jsx             # [LEGACY - no usado]
│   │   ├── Blog.jsx             # [LEGACY - no usado]
│   │   └── index.js             # Barrel export
│   │
│   ├── features/                # 🎯 MÓDULOS POR FUNCIONALIDAD
│   │   │
│   │   ├── hero/
│   │   │   └── HeroBanner.jsx   # Sección principal del landing
│   │   │
│   │   ├── services/
│   │   │   ├── Services.jsx     # Carrusel 3D de servicios
│   │   │   └── Services3DCarousel.css
│   │   │
│   │   ├── works/
│   │   │   └── Works.jsx        # Grid de proyectos
│   │   │
│   │   ├── contact/
│   │   │   └── Contact.jsx      # Formulario de contacto
│   │   │
│   │   └── blog/
│   │       ├── components/
│   │       │   ├── BlogCard.jsx
│   │       │   └── BlogPreview.jsx
│   │       ├── data/
│   │       │   └── blogData.js
│   │       └── index.js
│   │
│   ├── hooks/                   # 🪝 CUSTOM HOOKS
│   │   ├── useVibrate.js        # Feedback táctil
│   │   ├── useReducedMotion.js  # Accesibilidad
│   │   ├── useIntersectionObserver.js  # Lazy loading
│   │   └── index.js
│   │
│   ├── config/                  # ⚙️ CONFIGURACIONES
│   │   └── motionConfig.js      # Variantes de Framer Motion
│   │
│   ├── data/                    # 📊 DATOS ESTÁTICOS
│   │   └── projects.js          # Datos de proyectos
│   │
│   ├── layouts/                 # 📐 LAYOUTS
│   │   └── MainLayout.jsx       # Layout con Header/Footer
│   │
│   ├── styles/                  # 🎨 ESTILOS ADICIONALES
│   │   ├── utilities.css        # Clases CSS personalizadas
│   │   └── animations.css       # [Si existe]
│   │
│   ├── App.jsx                  # Componente raíz
│   ├── App.css                  # [LEGACY - no usado]
│   ├── main.jsx                 # Entry point
│   └── index.css                # Estilos globales + Tailwind
│
├── tailwind.config.js           # Configuración de Tailwind
├── vite.config.js               # Configuración de Vite
├── postcss.config.js            # Configuración de PostCSS
├── package.json                 # Dependencias y scripts
├── DOCUMENTATION.md             # Documentación técnica
├── ARCHITECTURE.md              # Este archivo
├── PERFORMANCE_CHECKLIST.md     # Checklist de performance
└── README.md                    # Readme del proyecto
```

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FUENTES DE DATOS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   src/data/projects.js                                                       │
│   ├── featuredProjects[]     ──────────────────┐                            │
│   ├── allProjects[]          ──────────────────┤                            │
│   └── projectCategories[]                      │                            │
│                                                │                            │
│   src/features/blog/data/blogData.js           │                            │
│   ├── blogPosts[]            ──────────────────┤                            │
│   ├── featuredPosts[]        ──────────────────┤                            │
│   └── categories[]                             │                            │
│                                                │                            │
│   [Hardcoded in Services.jsx]                  │                            │
│   └── services[]             ──────────────────┤                            │
│                                                │                            │
└────────────────────────────────────────────────┼────────────────────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           COMPONENTES CONSUMIDORES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   HeroBanner.jsx                                                             │
│   ├── import { featuredProjects } from '../../data/projects'                │
│   └── import { BlogPreview } from '../blog'                                 │
│       └── (internamente usa featuredPosts)                                  │
│                                                                              │
│   Works.jsx                                                                  │
│   └── import { allProjects } from '../../data/projects'                     │
│                                                                              │
│   Services.jsx                                                               │
│   └── const services = [...] (hardcoded)                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Sistema de Componentes UI

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        COMPONENTES UI REUTILIZABLES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Button.jsx                                                                 │
│   ├── Variantes: primary | secondary | ghost | accent | danger              │
│   ├── Tamaños: sm | md | lg | xl                                            │
│   ├── Estados: loading | disabled                                           │
│   ├── Features: icon, vibración, ripple effect                              │
│   └── Export adicional: IconButton                                          │
│                                                                              │
│   ProjectCard.jsx                                                            │
│   ├── Glassmorphism background                                              │
│   ├── Status badge (in-progress | completed | planning)                     │
│   ├── Stack tags                                                            │
│   ├── ProgressBar integrado                                                 │
│   └── Hover effects con Framer Motion                                       │
│                                                                              │
│   ProgressBar.jsx                                                            │
│   ├── Variantes: default | success | warning                                │
│   ├── Tamaños: sm | md | lg                                                 │
│   ├── Animación de entrada                                                  │
│   └── Label opcional                                                        │
│                                                                              │
│   Skeleton.jsx                                                               │
│   ├── Skeleton (base)                                                       │
│   ├── SkeletonText                                                          │
│   ├── SkeletonTitle                                                         │
│   ├── SkeletonAvatar                                                        │
│   ├── SkeletonProjectCard                                                   │
│   ├── SkeletonHero                                                          │
│   └── SkeletonPage                                                          │
│                                                                              │
│   BlogCard.jsx (en features/blog)                                           │
│   ├── Variantes: default | compact                                          │
│   ├── Category colors                                                       │
│   └── Date formatting                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Sistema de Animaciones

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CONFIGURACIÓN DE FRAMER MOTION                           │
│                        src/config/motionConfig.js                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Spring Configs                                                             │
│   ├── gentle   { stiffness: 120, damping: 14 }                              │
│   ├── snappy   { stiffness: 260, damping: 20 }                              │
│   ├── bouncy   { stiffness: 400, damping: 10 }                              │
│   └── smooth   { stiffness: 100, damping: 20, mass: 0.5 }                   │
│                                                                              │
│   Variantes de Entrada                                                       │
│   ├── fadeInUp      (opacity + y + blur)                                    │
│   ├── fadeInDown    (opacity + y)                                           │
│   ├── fadeInLeft    (opacity + x)                                           │
│   ├── fadeInRight   (opacity + x)                                           │
│   └── scaleIn       (opacity + scale)                                       │
│                                                                              │
│   Variantes de Contenedor                                                    │
│   ├── staggerContainer     (staggerChildren: 0.1)                           │
│   └── staggerContainerFast (staggerChildren: 0.05)                          │
│                                                                              │
│   Variantes de Componentes                                                   │
│   ├── glassCard      (hidden → visible → hover → tap)                       │
│   ├── buttonVariants (idle → hover → tap → disabled)                        │
│   ├── pageTransition (initial → animate → exit)                             │
│   ├── skeletonPulse  (animación de loading)                                 │
│   └── progressBar    (animación de width)                                   │
│                                                                              │
│   Utilidades                                                                 │
│   ├── reducedMotionConfig  (para accesibilidad)                             │
│   ├── getMotionVariants()  (helper para reduced motion)                     │
│   ├── viewportConfig       (once: true, margin: "-100px")                   │
│   └── letterAnimation      (texto letra por letra)                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🪝 Custom Hooks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CUSTOM HOOKS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   useVibrate(pattern)                                                        │
│   ├── Input: number | number[] (duración o patrón)                          │
│   ├── Output: () => void (función vibrate)                                  │
│   └── Uso: Feedback táctil en móviles                                       │
│                                                                              │
│   useVibratePattern(type)                                                    │
│   ├── Input: 'tap' | 'success' | 'error' | 'notification' | 'heavy' | 'light'│
│   ├── Output: () => void                                                    │
│   └── Uso: Patrones predefinidos de vibración                               │
│                                                                              │
│   useReducedMotion()                                                         │
│   ├── Input: ninguno                                                        │
│   ├── Output: boolean                                                       │
│   └── Uso: Detectar preferencia de movimiento reducido                      │
│                                                                              │
│   useIntersectionObserver(options)                                           │
│   ├── Input: { threshold, rootMargin, triggerOnce, freezeOnceVisible }      │
│   ├── Output: [ref, isIntersecting, entry]                                  │
│   └── Uso: Lazy loading, animaciones al scroll                              │
│                                                                              │
│   useLazyImage(src, placeholder)                                             │
│   ├── Input: string, string?                                                │
│   ├── Output: { ref, isLoaded, currentSrc, isIntersecting }                 │
│   └── Uso: Lazy loading de imágenes                                         │
│                                                                              │
│   useLazyComponent(delay)                                                    │
│   ├── Input: number (ms)                                                    │
│   ├── Output: [ref, shouldRender]                                           │
│   └── Uso: Lazy loading de componentes pesados                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Sistema de Estilos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SISTEMA DE ESTILOS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   tailwind.config.js                                                         │
│   ├── Colors                                                                 │
│   │   ├── cobalt (50-900)    Primary blue                                   │
│   │   ├── mint (50-900)      Accent green                                   │
│   │   ├── slate (850, 950)   Dark backgrounds                               │
│   │   └── accent (lime, purple, cyan)                                       │
│   │                                                                          │
│   ├── Typography                                                             │
│   │   ├── fontFamily: Inter                                                 │
│   │   └── letterSpacing: tight, wide, wider, widest                         │
│   │                                                                          │
│   ├── Animations                                                             │
│   │   ├── gradient (8s)                                                     │
│   │   ├── float (6s)                                                        │
│   │   ├── pulse-slow (4s)                                                   │
│   │   ├── shimmer (2s)                                                      │
│   │   └── blob (7s)                                                         │
│   │                                                                          │
│   └── Effects                                                                │
│       ├── backdropBlur: xs (2px)                                            │
│       ├── boxShadow: glow-sm, glow, glow-lg, inner-glow                     │
│       └── backgroundImage: gradient-radial, gradient-conic, glass           │
│                                                                              │
│   src/index.css                                                              │
│   ├── @layer base                                                            │
│   │   ├── html (scroll-behavior, font-smoothing)                            │
│   │   ├── body (bg-slate-950, text-gray-100)                                │
│   │   ├── ::selection (cobalt highlight)                                    │
│   │   ├── scrollbar (custom styling)                                        │
│   │   └── :focus-visible (ring-cobalt-400)                                  │
│   │                                                                          │
│   ├── @layer components                                                      │
│   │   ├── .glass, .glass-strong, .glass-card                                │
│   │   ├── .gradient-text, .gradient-text-accent                             │
│   │   ├── .glow-cobalt, .glow-mint                                          │
│   │   ├── .gradient-border                                                  │
│   │   └── .line-clamp-2, .line-clamp-3                                      │
│   │                                                                          │
│   └── @layer utilities                                                       │
│       ├── .animation-delay-2000, .animation-delay-4000                      │
│       ├── @media (prefers-reduced-motion)                                   │
│       ├── .scrollbar-hide                                                   │
│       └── .text-balance                                                     │
│                                                                              │
│   src/styles/utilities.css                                                   │
│   ├── Glassmorphism (.glass-card, .glass-card-strong)                       │
│   ├── Gradient borders (.gradient-border)                                   │
│   ├── Text utilities (.text-balance, .text-pretty, .gradient-text-*)        │
│   ├── Glow effects (.glow-cobalt-*, .glow-mint-*)                           │
│   ├── Hover effects (.hover-lift, .hover-glow)                              │
│   ├── Focus states (.focus-ring, .focus-ring-mint)                          │
│   ├── Skeleton loading (.skeleton)                                          │
│   ├── Scroll snap (.snap-x, .snap-center, .snap-start)                      │
│   └── Aspect ratios (.aspect-card, .aspect-project, .aspect-blog)           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Build y Optimización

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VITE BUILD CONFIG                                    │
│                          vite.config.js                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Aliases                                                                    │
│   ├── @ ──────────► ./src                                                   │
│   ├── @components ► ./src/components                                        │
│   ├── @features ──► ./src/features                                          │
│   ├── @hooks ─────► ./src/hooks                                             │
│   ├── @config ────► ./src/config                                            │
│   └── @data ──────► ./src/data                                              │
│                                                                              │
│   Build Optimization                                                         │
│   ├── minify: 'esbuild'                                                     │
│   ├── target: 'esnext'                                                      │
│   ├── cssCodeSplit: true                                                    │
│   └── chunkSizeWarningLimit: 500KB                                          │
│                                                                              │
│   Manual Chunks (Code Splitting)                                             │
│   ├── vendor-react ──► react, react-dom                                     │
│   ├── vendor-motion ─► framer-motion                                        │
│   ├── vendor-router ─► react-router-dom                                     │
│   └── vendor-icons ──► react-icons                                          │
│                                                                              │
│   Output Naming                                                              │
│   ├── chunks: assets/js/[name]-[hash].js                                    │
│   ├── entry: assets/js/[name]-[hash].js                                     │
│   └── assets: assets/[ext]/[name]-[hash].[ext]                              │
│                                                                              │
│   Dev Server                                                                 │
│   ├── port: 5173                                                            │
│   ├── hmr: true                                                             │
│   └── open: true                                                            │
│                                                                              │
│   Dependency Pre-bundling                                                    │
│   └── include: react, react-dom, framer-motion, react-icons/fi, react-icons/fa│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*Generado el 24 de Diciembre de 2024*
