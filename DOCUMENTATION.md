# 📚 Manual de Documentación Técnica - Portafolio Personal 2025

> **Última actualización:** 24 de Diciembre de 2024  
> **Versión del proyecto:** 0.0.0  
> **Autor:** Leandro Gavegno

---

## 📋 Tabla de Contenidos

1. [Arquitectura del Proyecto](#-1-arquitectura-del-proyecto)
   - [Stack Tecnológico](#11-stack-tecnológico)
   - [Estructura de Carpetas](#12-estructura-de-carpetas)
   - [Flujo de Datos](#13-flujo-de-datos)
   - [Convenciones de Código](#14-convenciones-de-código)
2. [Componentes Principales](#-2-componentes-principales)
   - [Sistema de Navegación (Header)](#21-sistema-de-navegación-header)
   - [Hero Banner](#22-hero-banner)
   - [Project Cards](#23-project-cards)
   - [Botones y CTAs](#24-botones-y-ctas)
   - [Formulario de Contacto](#25-formulario-de-contacto)
   - [Carrusel de Servicios](#26-carrusel-de-servicios-3d)
   - [Blog Cards](#27-blog-cards)
   - [Footer](#28-footer)
   - [Skeletons (Loading States)](#29-skeletons-loading-states)
3. [Sistema de Diseño](#-3-sistema-de-diseño)
   - [Paleta de Colores](#31-paleta-de-colores)
   - [Tipografía](#32-tipografía)
   - [Espaciado y Grid](#33-espaciado-y-grid)
   - [Breakpoints Responsive](#34-breakpoints-responsive)
4. [Animaciones y Micro-interacciones](#-4-animaciones-y-micro-interacciones)
   - [Configuración de Framer Motion](#41-configuración-de-framer-motion)
   - [Haptic Feedback](#42-haptic-feedback)
   - [Transiciones de Página](#43-transiciones-de-página)
5. [Gestión de Contenido](#-5-gestión-de-contenido)
   - [Proyectos](#51-proyectos)
   - [Blog Posts](#52-blog-posts)
   - [Servicios](#53-servicios)
6. [Hooks Personalizados](#-6-hooks-personalizados)
7. [Optimización y Performance](#-7-optimización-y-performance)
8. [Guías de Modificación Comunes](#-8-guías-de-modificación-comunes)
9. [Troubleshooting](#-9-troubleshooting)
10. [Scripts Disponibles](#-10-scripts-disponibles)
11. [Mapa de Archivos Críticos](#-11-mapa-de-archivos-críticos)
12. [Checklist de Mantenimiento](#-12-checklist-de-mantenimiento)

---

## 🏗️ 1. ARQUITECTURA DEL PROYECTO

### 1.1 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.0 | Framework UI principal |
| **Vite** | 6.3.5 | Build tool y dev server |
| **Tailwind CSS** | 3.3.0 | Framework de estilos utility-first |
| **Framer Motion** | 12.23.12 | Animaciones y micro-interacciones |
| **React Router DOM** | 7.9.6 | Enrutamiento (preparado, no activo) |
| **React Icons** | 5.5.0 | Iconografía (Feather + FontAwesome) |
| **React Helmet Async** | 2.0.5 | Gestión de meta tags SEO |
| **React Scroll Parallax** | 3.5.0 | Efectos parallax (disponible) |

### 1.2 Estructura de Carpetas

```
src/
├── components/           # Componentes compartidos globalmente
│   ├── ui/              # Componentes UI reutilizables (Button, Card, etc.)
│   │   ├── Button.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Skeleton.jsx
│   │   └── index.js     # Barrel export
│   ├── Header.jsx       # Navegación principal
│   ├── Footer.jsx       # Pie de página
│   ├── Home.jsx         # Componente legacy (no usado)
│   ├── Blog.jsx         # Componente legacy (no usado)
│   └── index.js         # Barrel export
│
├── features/            # Módulos por funcionalidad (Feature-based)
│   ├── hero/
│   │   └── HeroBanner.jsx
│   ├── services/
│   │   ├── Services.jsx
│   │   └── Services3DCarousel.css
│   ├── works/
│   │   └── Works.jsx
│   ├── contact/
│   │   └── Contact.jsx
│   └── blog/
│       ├── components/
│       │   ├── BlogCard.jsx
│       │   └── BlogPreview.jsx
│       ├── data/
│       │   └── blogData.js
│       └── index.js     # Barrel export
│
├── hooks/               # Custom hooks reutilizables
│   ├── useVibrate.js
│   ├── useReducedMotion.js
│   ├── useIntersectionObserver.js
│   └── index.js         # Barrel export
│
├── config/              # Configuraciones globales
│   └── motionConfig.js  # Variantes de Framer Motion
│
├── data/                # Datos estáticos
│   └── projects.js      # Datos de proyectos
│
├── layouts/             # Layouts de página
│   └── MainLayout.jsx   # Layout principal con Header/Footer
│
├── styles/              # Estilos adicionales
│   ├── utilities.css    # Clases CSS personalizadas
│   └── animations.css   # Animaciones CSS (si existe)
│
├── assets/              # Recursos estáticos
│   └── images/
│
├── App.jsx              # Componente raíz con lazy loading
├── main.jsx             # Entry point de React
└── index.css            # Estilos globales + Tailwind
```

### 1.3 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                        main.jsx                              │
│  (Entry point: StrictMode + HelmetProvider)                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                               │
│  - React.lazy() para code splitting                         │
│  - Suspense con SkeletonPage fallback                       │
│  - AnimatePresence para transiciones                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MainLayout.jsx                           │
│  - Header (navegación)                                       │
│  - {children} (contenido principal)                         │
│  - Footer                                                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬─────────────┐
        ▼             ▼             ▼             ▼
   HeroBanner    Services       Works        Contact
        │             │             │             │
        ▼             ▼             ▼             ▼
   ProjectCard   ServiceCard   ProjectCard    Button
   BlogPreview                               (form)
```

**Flujo de datos de contenido:**
- Los datos de proyectos vienen de `src/data/projects.js`
- Los datos de blog vienen de `src/features/blog/data/blogData.js`
- Los datos de servicios están hardcodeados en `Services.jsx`
- No hay estado global (Context/Redux) - cada componente maneja su estado local

### 1.4 Convenciones de Código

**Nomenclatura de archivos:**
- Componentes: `PascalCase.jsx` (ej: `HeroBanner.jsx`)
- Hooks: `camelCase.js` con prefijo `use` (ej: `useVibrate.js`)
- Datos: `camelCase.js` (ej: `projects.js`)
- Estilos: `kebab-case.css` o `PascalCase.css` para módulos

**Nomenclatura de componentes:**
- Componentes: `PascalCase` (ej: `ProjectCard`)
- Props: `camelCase` (ej: `progressLabel`)
- Handlers: `handle` + acción (ej: `handleClick`, `handleSubmit`)

**Organización de imports:**
```jsx
// 1. React y hooks
import React, { useState, useEffect } from 'react';

// 2. Librerías externas
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

// 3. Configuraciones y constantes
import { fadeInUp, staggerContainer } from '../../config/motionConfig';

// 4. Hooks personalizados
import { useVibrate } from '../../hooks/useVibrate';

// 5. Componentes
import Button from '../../components/ui/Button';

// 6. Datos
import { featuredProjects } from '../../data/projects';

// 7. Estilos (si aplica)
import './styles.css';
```

---

## 🧩 2. COMPONENTES PRINCIPALES

### 2.1 Sistema de Navegación (Header)

**Ubicación:** `src/components/Header.jsx`

**Responsabilidad:** Navegación principal fija con scroll detection, menú móvil responsive y smooth scroll a secciones.

**Props:** Ninguna (componente autónomo)

**Estado interno:**
- `isOpen` (boolean): Estado del menú móvil
- `scrolled` (boolean): Detecta si se ha hecho scroll para cambiar estilos

**Hooks utilizados:**
- `useState` - Estado del menú y scroll
- `useEffect` - Listener de scroll
- `useVibrate` - Feedback táctil en clicks

**Características:**
- Glassmorphism cuando hay scroll (`bg-slate-950/80 backdrop-blur-xl`)
- Animación de entrada con spring
- Indicador de hover con gradiente en links
- Menú móvil con AnimatePresence

**Cómo modificar los links de navegación:**
```jsx
// Editar líneas 7-12 en Header.jsx
const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
];
```

**Cómo cambiar el logo:**
```jsx
// Editar líneas 56-67 en Header.jsx
<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cobalt-500 to-mint-400...">
  LG  {/* Cambiar iniciales aquí */}
</span>
<span className="hidden sm:inline">Leandro</span>  {/* Cambiar nombre aquí */}
```

---

### 2.2 Hero Banner

**Ubicación:** `src/features/hero/HeroBanner.jsx`

**Responsabilidad:** Sección principal de landing con headline, CTAs, proyectos destacados y preview de blog.

**Props:** Ninguna

**Componentes internos:**
- `AnimatedText` - Animación letra por letra
- `Badge` - Badge con animación de entrada
- `SocialLink` - Links sociales con hover effects

**Hooks utilizados:**
- `useReducedMotion` - Accesibilidad para usuarios con preferencia de movimiento reducido

**Dependencias:**
- `Button` (componente UI)
- `ProjectCard` (componente UI)
- `BlogPreview` (feature blog)
- `featuredProjects` (datos)

**Cómo modificar el headline:**
```jsx
// Editar líneas 142-155 en HeroBanner.jsx
<motion.h1 variants={fadeInUp} className="...">
  <span className="text-white">Transformo </span>
  <span className="bg-gradient-to-r from-cobalt-400...">
    datos en decisiones  {/* Texto con gradiente */}
  </span>
  <br />
  <span className="text-white">automáticas para </span>
  <span className="bg-gradient-to-r from-mint-400...">
    negocios escalables  {/* Texto con gradiente mint */}
  </span>
</motion.h1>
```

**Cómo modificar el subtítulo:**
```jsx
// Editar líneas 158-164 en HeroBanner.jsx
<motion.p variants={fadeInUp} className="...">
  Creo experiencias digitales excepcionales...
</motion.p>
```

**Cómo cambiar los links sociales:**
```jsx
// Editar líneas 196-207 en HeroBanner.jsx
<SocialLink 
  href="https://github.com/TU-USUARIO"  // Cambiar URL
  icon={FaGithub} 
  label="GitHub"
/>
```

---

### 2.3 Project Cards

**Ubicación:** `src/components/ui/ProjectCard.jsx`

**Responsabilidad:** Card de proyecto con glassmorphism, barra de progreso animada y estados visuales.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | - | Título del proyecto |
| `description` | string | - | Descripción breve |
| `stack` | string[] | `[]` | Tecnologías usadas |
| `progress` | number | `0` | Porcentaje de progreso (0-100) |
| `progressLabel` | string | `''` | Texto debajo de la barra |
| `status` | string | `'in-progress'` | `'in-progress'` \| `'completed'` \| `'planning'` |
| `image` | string | - | URL de imagen (opcional) |
| `link` | string | - | URL del proyecto |
| `className` | string | `''` | Clases adicionales |
| `index` | number | `0` | Índice para delay de animación |

**Hooks utilizados:**
- `useVibrate` - Feedback táctil al hacer click
- `useReducedMotion` - Accesibilidad

**Ejemplo de uso:**
```jsx
<ProjectCard
  title="Mi Proyecto"
  description="Descripción del proyecto"
  stack={["React", "Node.js", "PostgreSQL"]}
  progress={75}
  progressLabel="Fase de integración"
  status="in-progress"
  link="https://github.com/..."
  index={0}
/>
```

**Configuración de estados:**
```jsx
// Líneas 27-40 en ProjectCard.jsx
const statusConfig = {
  'in-progress': {
    label: 'En desarrollo',
    color: 'bg-amber-400/20 text-amber-400 border-amber-400/30'
  },
  'completed': {
    label: 'Completado',
    color: 'bg-mint-400/20 text-mint-400 border-mint-400/30'
  },
  'planning': {
    label: 'Planificación',
    color: 'bg-cobalt-400/20 text-cobalt-400 border-cobalt-400/30'
  }
};
```

---

### 2.4 Botones y CTAs

**Ubicación:** `src/components/ui/Button.jsx`

**Responsabilidad:** Botón reutilizable con múltiples variantes, estados de loading, y micro-interacciones.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | ReactNode | - | Contenido del botón |
| `variant` | string | `'primary'` | `'primary'` \| `'secondary'` \| `'ghost'` \| `'accent'` \| `'danger'` |
| `size` | string | `'md'` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` |
| `loading` | boolean | `false` | Muestra spinner |
| `disabled` | boolean | `false` | Deshabilita el botón |
| `icon` | ReactNode | - | Icono a mostrar |
| `iconPosition` | string | `'left'` | `'left'` \| `'right'` |
| `vibrate` | boolean | `true` | Activa feedback táctil |
| `onClick` | function | - | Handler de click |
| `className` | string | `''` | Clases adicionales |

**Variantes disponibles:**

```jsx
// Primary - Gradiente cobalt, para CTAs principales
<Button variant="primary">Acción principal</Button>

// Secondary - Borde mint, para acciones secundarias
<Button variant="secondary">Acción secundaria</Button>

// Ghost - Transparente, para acciones terciarias
<Button variant="ghost">Acción terciaria</Button>

// Accent - Gradiente mint, para destacar
<Button variant="accent">Destacado</Button>

// Danger - Gradiente rojo, para acciones destructivas
<Button variant="danger">Eliminar</Button>
```

**Ejemplo con icono y loading:**
```jsx
import { FiSend } from 'react-icons/fi';

<Button
  variant="accent"
  size="lg"
  icon={<FiSend />}
  iconPosition="right"
  loading={isSubmitting}
  onClick={handleSubmit}
>
  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
</Button>
```

**Componente IconButton:**
```jsx
import { IconButton } from '../../components/ui/Button';
import { FiMenu } from 'react-icons/fi';

<IconButton icon={<FiMenu />} size="md" variant="ghost" />
```

---

### 2.5 Formulario de Contacto

**Ubicación:** `src/features/contact/Contact.jsx`

**Responsabilidad:** Formulario de contacto con validación básica, estados de loading y glassmorphism.

**Estado interno:**
- `formData` - Objeto con `name`, `email`, `message`
- `isSubmitting` - Estado de envío

**Campos del formulario:**
1. **Nombre** - Input text, requerido
2. **Email** - Input email, requerido
3. **Mensaje** - Textarea, requerido

**Cómo conectar con un servicio de email:**
```jsx
// Editar handleSubmit en líneas 24-34
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Reemplazar con tu servicio (EmailJS, Formspree, etc.)
  try {
    await fetch('https://formspree.io/f/TU-FORM-ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // Mostrar mensaje de éxito
  } catch (error) {
    // Manejar error
  }
  
  setIsSubmitting(false);
  setFormData({ name: '', email: '', message: '' });
};
```

---

### 2.6 Carrusel de Servicios 3D

**Ubicación:** `src/features/services/Services.jsx`

**Responsabilidad:** Carrusel 3D con rotación automática y manual de tarjetas de servicios.

**Estado interno:**
- `currentIndex` - Índice del servicio actual
- `isHovered` - Pausa auto-rotación en hover

**Características:**
- Auto-rotación cada 3 segundos
- Pausa en hover
- Navegación con botones prev/next
- Indicadores de posición clickeables
- Efecto 3D con `rotateY` y `translateZ`

**Cómo agregar un nuevo servicio:**
```jsx
// Editar array services en líneas 13-44
const services = [
  // ... servicios existentes
  {
    title: "Nuevo Servicio",
    description: "Descripción del servicio...",
    icon: FiNewIcon,  // Importar de react-icons/fi
    gradient: "from-blue-400 to-blue-600"  // Colores Tailwind
  }
];
```

**Estilos del carrusel:** `src/features/services/Services3DCarousel.css`

---

### 2.7 Blog Cards

**Ubicación:** `src/features/blog/components/BlogCard.jsx`

**Responsabilidad:** Card de artículo de blog con dos variantes (default y compact).

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | - | Título del artículo |
| `excerpt` | string | - | Extracto/resumen |
| `category` | string | - | Categoría del artículo |
| `readTime` | number | - | Tiempo de lectura en minutos |
| `date` | string | - | Fecha en formato ISO |
| `tags` | string[] | `[]` | Tags del artículo |
| `slug` | string | - | URL slug |
| `image` | string | - | URL de imagen (opcional) |
| `index` | number | `0` | Índice para animación |
| `variant` | string | `'default'` | `'default'` \| `'compact'` |

**Colores por categoría:**
```jsx
const categoryColors = {
  'Data Engineering': 'bg-purple-500/20 text-purple-300...',
  'Backend': 'bg-cobalt-500/20 text-cobalt-300...',
  'Performance': 'bg-amber-500/20 text-amber-300...',
  'Frontend': 'bg-mint-400/20 text-mint-300...',
};
```

---

### 2.8 Footer

**Ubicación:** `src/components/Footer.jsx`

**Responsabilidad:** Pie de página con logo, links sociales y copyright.

**Cómo modificar links sociales:**
```jsx
// Editar líneas 6-10 en Footer.jsx
const socialLinks = [
  { href: 'https://github.com/TU-USUARIO', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com/in/TU-PERFIL', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'mailto:TU-EMAIL@ejemplo.com', icon: FaEnvelope, label: 'Email' },
];
```

---

### 2.9 Skeletons (Loading States)

**Ubicación:** `src/components/ui/Skeleton.jsx`

**Responsabilidad:** Componentes placeholder para estados de carga.

**Componentes exportados:**
- `Skeleton` - Base con animación de pulso
- `SkeletonText` - Líneas de texto
- `SkeletonTitle` - Título
- `SkeletonAvatar` - Avatar circular
- `SkeletonProjectCard` - Card de proyecto completa
- `SkeletonHero` - Sección hero completa
- `SkeletonPage` - Página completa (usado en Suspense)

**Ejemplo de uso:**
```jsx
import { SkeletonProjectCard } from './components/ui/Skeleton';

// En un loading state
{isLoading ? (
  <SkeletonProjectCard />
) : (
  <ProjectCard {...project} />
)}
```

---

## 🎨 3. SISTEMA DE DISEÑO

### 3.1 Paleta de Colores

**Archivo de configuración:** `tailwind.config.js` → `theme.extend.colors`

```javascript
// Colores principales (Paleta 2025)
cobalt: {
  50: '#e6f0ff',
  100: '#b3d1ff',
  200: '#80b3ff',
  300: '#4d94ff',
  400: '#1a75ff',
  500: '#0047AB',  // ← Primary Deep Cobalt
  600: '#003d91',
  700: '#003377',
  800: '#00295d',
  900: '#001f43',
}

mint: {
  50: '#edfff5',
  100: '#d5ffe6',
  200: '#aeffce',
  300: '#70ffab',
  400: '#2BFF88',  // ← Spring Mint accent
  500: '#00e676',
  600: '#00c853',
  700: '#00a844',
  800: '#008837',
  900: '#00682a',
}

slate: {
  850: '#1a2332',  // Custom intermediate
  950: '#0d1117', // ← Fondo principal (más oscuro que default)
}

accent: {
  lime: '#d3fd01',    // Original accent (compatibilidad)
  purple: '#8b5cf6',
  cyan: '#06b6d4',
}
```

**Uso en componentes:**
```jsx
// Tailwind classes
<div className="bg-cobalt-500 text-mint-400 border-slate-950">

// Gradientes
<span className="bg-gradient-to-r from-cobalt-400 to-mint-400">
```

**Cómo cambiar colores:**
1. Editar `tailwind.config.js` → sección `extend.colors`
2. Los cambios se aplican automáticamente en toda la app
3. Reiniciar el servidor de desarrollo si es necesario

### 3.2 Tipografía

**Fuente principal:** Inter (system fallback)

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  display: ['Inter', 'system-ui', 'sans-serif'],
}
```

**Escalas de tamaño (Tailwind defaults):**
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px
- `text-4xl`: 36px
- `text-5xl`: 48px
- `text-6xl`: 60px
- `text-7xl`: 72px

**Letter spacing personalizado:**
```javascript
letterSpacing: {
  'tight': '-0.025em',
  'wide': '0.025em',
  'wider': '0.05em',
  'widest': '0.1em',
}
```

### 3.3 Espaciado y Grid

**Sistema de espaciado:** Tailwind defaults (4px base)
- `p-1` = 4px
- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px
- `p-12` = 48px
- `p-16` = 64px
- `p-20` = 80px
- `p-24` = 96px

**Container:**
```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

**Grid de proyectos:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 3.4 Breakpoints Responsive

```javascript
// Tailwind defaults
sm: '640px',   // Móvil landscape
md: '768px',   // Tablet
lg: '1024px',  // Desktop pequeño
xl: '1280px',  // Desktop
2xl: '1536px', // Desktop grande
```

**Uso:**
```jsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
```

---

## ⚡ 4. ANIMACIONES Y MICRO-INTERACCIONES

### 4.1 Configuración de Framer Motion

**Ubicación:** `src/config/motionConfig.js`

**Configuraciones de spring:**
```javascript
export const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  snappy: { type: "spring", stiffness: 260, damping: 20 },
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  smooth: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
};
```

**Variantes principales:**

```javascript
// Fade in desde abajo (más usada)
export const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springConfig.snappy },
  exit: { opacity: 0, y: -20, filter: "blur(5px)" }
};

// Para contenedores con hijos animados
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Para cards con hover
export const glassCard = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -8, scale: 1.02 },
  tap: { scale: 0.98 }
};

// Para botones
export const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.03, y: -2 },
  tap: { scale: 0.97 }
};
```

**Cómo usar las variantes:**
```jsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <motion.h1 variants={fadeInUp}>Título</motion.h1>
  <motion.p variants={fadeInUp}>Párrafo</motion.p>
</motion.div>
```

### 4.2 Haptic Feedback

**Hook:** `useVibrate()`  
**Ubicación:** `src/hooks/useVibrate.js`

**Uso básico:**
```jsx
import { useVibrate } from '../../hooks/useVibrate';

const MyComponent = () => {
  const vibrate = useVibrate(10); // 10ms de vibración
  
  return (
    <button onClick={() => {
      vibrate();
      // ... resto de la lógica
    }}>
      Click me
    </button>
  );
};
```

**Patrones predefinidos:**
```javascript
import { useVibratePattern, vibrationPatterns } from '../../hooks/useVibrate';

// Usar patrón predefinido
const vibrateSuccess = useVibratePattern('success');

// Patrones disponibles:
vibrationPatterns = {
  tap: 10,                      // Toque suave
  success: [50, 30, 50],        // Confirmación exitosa
  error: [100, 50, 100, 50, 100], // Error/alerta
  notification: [50, 100, 50],  // Notificación
  heavy: 50,                    // Impacto fuerte
  light: 5,                     // Impacto ligero
};
```

### 4.3 Transiciones de Página

**Configuración:** `pageTransition` en `motionConfig.js`

```javascript
export const pageTransition = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { opacity: 0, y: -10, filter: "blur(5px)" }
};
```

**Implementación en App.jsx:**
```jsx
<AnimatePresence mode="wait">
  <Suspense fallback={<SkeletonPage />}>
    <AnimatedSection id="hero">
      <HeroBanner />
    </AnimatedSection>
    {/* ... más secciones */}
  </Suspense>
</AnimatePresence>
```

---

## 🗂️ 5. GESTIÓN DE CONTENIDO

### 5.1 Proyectos

**Archivo de datos:** `src/data/projects.js`

**Estructura de un proyecto:**
```javascript
{
  id: 'unique-id',           // ID único (usado como key)
  title: 'Título del Proyecto',
  description: 'Descripción breve del proyecto...',
  stack: ['React', 'Node.js', 'PostgreSQL'],  // Tecnologías
  progress: 75,              // Porcentaje (0-100)
  progressLabel: 'Fase actual del proyecto',
  status: 'in-progress',     // 'in-progress' | 'completed' | 'planning'
  image: null,               // URL de imagen o null
  link: 'https://...',       // URL del proyecto
  featured: true,            // Si aparece en el hero
  category: 'fullstack'      // Categoría para filtros
}
```

**CÓMO AGREGAR UN NUEVO PROYECTO:**
1. Abrir `src/data/projects.js`
2. Agregar nuevo objeto al array `featuredProjects` o `allProjects`:
```javascript
export const featuredProjects = [
  // ... proyectos existentes
  {
    id: 'mi-nuevo-proyecto',
    title: 'Mi Nuevo Proyecto',
    description: 'Descripción...',
    stack: ['Tech1', 'Tech2'],
    progress: 50,
    progressLabel: 'En desarrollo',
    status: 'in-progress',
    image: null,
    link: '#',
    featured: true,
    category: 'fullstack'
  }
];
```
3. Guardar - el componente `Works.jsx` lo renderizará automáticamente

**CÓMO MODIFICAR UN PROYECTO:**
1. Localizar el proyecto por su `id` en `src/data/projects.js`
2. Editar los campos necesarios
3. Guardar - los cambios se reflejan automáticamente

**Categorías disponibles:**
```javascript
export const projectCategories = [
  { id: 'all', label: 'Todos', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'backend', label: 'Backend', icon: '⚙️' },
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'ai-ml', label: 'AI/ML', icon: '🤖' },
  { id: 'automation', label: 'Automatización', icon: '🔄' }
];
```

### 5.2 Blog Posts

**Archivo de datos:** `src/features/blog/data/blogData.js`

**Estructura de un artículo:**
```javascript
{
  id: 'unique-slug',
  title: 'Título del Artículo',
  excerpt: 'Resumen breve del artículo...',
  category: 'Frontend',      // 'Data Engineering' | 'Backend' | 'Performance' | 'Frontend'
  readTime: 10,              // Minutos de lectura
  date: '2024-12-20',        // Formato ISO
  image: null,               // URL de imagen o null
  tags: ['React', 'Performance'],
  featured: true,            // Si aparece en el preview
  slug: 'titulo-del-articulo'
}
```

**CÓMO AGREGAR UN NUEVO ARTÍCULO:**
1. Abrir `src/features/blog/data/blogData.js`
2. Agregar al array `blogPosts`:
```javascript
export const blogPosts = [
  // ... artículos existentes
  {
    id: 'nuevo-articulo',
    title: 'Nuevo Artículo',
    excerpt: 'Resumen...',
    category: 'Frontend',
    readTime: 8,
    date: '2024-12-24',
    image: null,
    tags: ['Tag1', 'Tag2'],
    featured: true,
    slug: 'nuevo-articulo'
  }
];
```

### 5.3 Servicios

**Ubicación:** Hardcodeado en `src/features/services/Services.jsx` (líneas 13-44)

**Estructura de un servicio:**
```javascript
{
  title: "Nombre del Servicio",
  description: "Descripción del servicio...",
  icon: FiCode,              // Componente de react-icons/fi
  gradient: "from-cobalt-500 to-cobalt-600"  // Clases Tailwind
}
```

---

## 🔧 6. HOOKS PERSONALIZADOS

### 6.1 useVibrate

**Ubicación:** `src/hooks/useVibrate.js`

**Propósito:** Proporcionar feedback táctil en dispositivos móviles.

**Parámetros:**
- `pattern` (number | number[]): Duración en ms o patrón [vibrar, pausa, vibrar...]

**Retorna:** Función `vibrate()` para activar la vibración

**Uso:**
```jsx
const vibrate = useVibrate(10);
// o con patrón
const vibrate = useVibrate([50, 30, 50]);

<button onClick={vibrate}>Click</button>
```

### 6.2 useReducedMotion

**Ubicación:** `src/hooks/useReducedMotion.js`

**Propósito:** Detectar si el usuario prefiere movimiento reducido (accesibilidad).

**Parámetros:** Ninguno

**Retorna:** `boolean` - `true` si prefiere movimiento reducido

**Uso:**
```jsx
const prefersReducedMotion = useReducedMotion();

// Condicionar animaciones
<motion.div
  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
>
```

### 6.3 useIntersectionObserver

**Ubicación:** `src/hooks/useIntersectionObserver.js`

**Propósito:** Detectar cuando un elemento entra en el viewport (lazy loading, animaciones).

**Parámetros:**
```javascript
{
  threshold: 0,        // Porcentaje de visibilidad (0-1)
  rootMargin: '0px',   // Margen alrededor del viewport
  triggerOnce: true,   // Solo activar una vez
  freezeOnceVisible: true  // Mantener estado visible
}
```

**Retorna:** `[ref, isIntersecting, entry]`

**Uso:**
```jsx
const [ref, isVisible] = useIntersectionObserver({
  threshold: 0.1,
  triggerOnce: true
});

<div ref={ref}>
  {isVisible && <HeavyComponent />}
</div>
```

**Hooks relacionados:**
- `useLazyImage(src, placeholder)` - Para lazy loading de imágenes
- `useLazyComponent(delay)` - Para lazy loading de componentes

---

## 🚀 7. OPTIMIZACIÓN Y PERFORMANCE

### 7.1 Code Splitting

**Implementación:** `src/App.jsx`

```jsx
// Lazy loading de secciones
const HeroBanner = lazy(() => import('./features/hero/HeroBanner'));
const Services = lazy(() => import('./features/services/Services'));
const Works = lazy(() => import('./features/works/Works'));
const Contact = lazy(() => import('./features/contact/Contact'));
```

**Secciones con lazy loading:**
- HeroBanner
- Services
- Works
- Contact

### 7.2 Vendor Chunks

**Configuración:** `vite.config.js` → `build.rollupOptions.output.manualChunks`

```javascript
manualChunks: {
  'vendor-react': ['react', 'react-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-router': ['react-router-dom'],
  'vendor-icons': ['react-icons'],
}
```

### 7.3 Optimización de Imágenes

**Formato recomendado:** WebP con fallback a JPEG/PNG

**Implementación de lazy loading:**
```jsx
<img
  src="/images/project.webp"
  loading="lazy"
  alt="Descripción"
/>
```

**Ubicación de imágenes:** `src/assets/images/` o `public/images/`

**Cómo agregar nuevas imágenes:**
1. Convertir a WebP usando [Squoosh](https://squoosh.app)
2. Colocar en `public/images/` para acceso directo
3. Referenciar como `/images/nombre.webp`

### 7.4 Bundle Size Estimado

```
react + react-dom: ~45KB gzipped
framer-motion: ~40KB gzipped (tree-shaken)
react-icons (subset): ~5KB gzipped
react-router-dom: ~12KB gzipped
tailwind (purged): ~10KB gzipped
app code: ~20KB gzipped
---
Total estimado: ~132KB gzipped
```

---

## 📝 8. GUÍAS DE MODIFICACIÓN COMUNES

### 8.1 Cambiar colores del tema

1. Editar `tailwind.config.js` → sección `extend.colors`
2. Modificar los valores hex de `cobalt`, `mint`, o `slate`
3. Los cambios se aplican automáticamente en toda la app

### 8.2 Agregar una nueva sección a la página principal

1. Crear componente en `src/features/[nombre-seccion]/NombreSeccion.jsx`
2. Importar con lazy loading en `src/App.jsx`:
```jsx
const NuevaSeccion = lazy(() => import('./features/nueva-seccion/NuevaSeccion'));
```
3. Agregar dentro del layout:
```jsx
<AnimatedSection id="nueva-seccion">
  <NuevaSeccion />
</AnimatedSection>
```
4. Agregar link en `Header.jsx`:
```jsx
const navLinks = [
  // ... links existentes
  { href: '#nueva-seccion', label: 'Nueva Sección' },
];
```

### 8.3 Modificar el Hero Banner

| Elemento | Archivo | Líneas |
|----------|---------|--------|
| Headline | `HeroBanner.jsx` | 142-155 |
| Subtítulo | `HeroBanner.jsx` | 158-164 |
| CTAs | `HeroBanner.jsx` | 167-189 |
| Social links | `HeroBanner.jsx` | 196-207 |
| Badge | `HeroBanner.jsx` | 134-139 |

### 8.4 Agregar una nueva página (con routing)

1. Crear archivo en `src/pages/NombrePagina.jsx`
2. Configurar React Router en `App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// En el return:
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/nueva-pagina" element={<NuevaPagina />} />
  </Routes>
</BrowserRouter>
```

### 8.5 Modificar animaciones

**Config global:** `src/config/motionConfig.js`

**Animación específica:** Buscar en el componente correspondiente las props de Framer Motion:
- `initial`, `animate`, `exit` - Estados de animación
- `variants` - Variantes predefinidas
- `whileHover`, `whileTap` - Interacciones
- `transition` - Configuración de timing

---

## 🐛 9. TROUBLESHOOTING

### 9.1 Problemas Comunes

**Las animaciones no funcionan:**
- Verificar que Framer Motion esté importado: `import { motion } from 'framer-motion'`
- Revisar consola del navegador por errores
- Verificar que `AnimatePresence` envuelva componentes dinámicos
- Comprobar que el usuario no tenga `prefers-reduced-motion` activado

**Las imágenes no cargan:**
- Verificar ruta relativa (debe empezar con `/` si está en `public/`)
- Asegurar que estén en la carpeta correcta
- Verificar formato WebP compatible con el navegador

**El bundle size es muy grande:**
- Ejecutar análisis: `npm run build` y revisar output
- Verificar imports de react-icons (deben ser específicos):
  ```jsx
  // ✅ Correcto
  import { FiArrowRight } from 'react-icons/fi';
  
  // ❌ Incorrecto (importa toda la librería)
  import * as FiIcons from 'react-icons/fi';
  ```
- Revisar que code splitting esté funcionando

**Warnings de CSS en el IDE:**
- Los warnings de `@tailwind`, `@apply`, `@layer` son falsos positivos
- Tailwind los procesa correctamente en tiempo de compilación
- Puedes ignorarlos o configurar tu IDE para reconocer Tailwind

**El formulario no envía:**
- El envío actual es simulado (console.log)
- Implementar servicio real (EmailJS, Formspree, backend propio)

---

## 📦 10. SCRIPTS DISPONIBLES

```bash
# Servidor de desarrollo con HMR
npm run dev

# Build de producción
npm run build

# Preview del build de producción
npm run preview

# Linting del código
npm run lint
```

---

## 🔗 11. MAPA DE ARCHIVOS CRÍTICOS

| Archivo | Propósito |
|---------|-----------|
| `src/App.jsx` | Punto de entrada, lazy loading, AnimatePresence |
| `src/main.jsx` | Entry point de React, providers |
| `src/config/motionConfig.js` | Configuración global de animaciones |
| `src/data/projects.js` | Datos de proyectos |
| `src/features/blog/data/blogData.js` | Datos de artículos |
| `src/components/ui/Button.jsx` | Componente de botón reutilizable |
| `src/components/ui/ProjectCard.jsx` | Card de proyecto |
| `src/components/Header.jsx` | Navegación principal |
| `src/components/Footer.jsx` | Pie de página |
| `src/features/hero/HeroBanner.jsx` | Sección hero principal |
| `src/hooks/useVibrate.js` | Hook de vibración táctil |
| `src/hooks/useReducedMotion.js` | Hook de accesibilidad |
| `src/hooks/useIntersectionObserver.js` | Hook de lazy loading |
| `src/layouts/MainLayout.jsx` | Layout con Header/Footer |
| `tailwind.config.js` | Configuración del tema |
| `vite.config.js` | Configuración de build |
| `src/index.css` | Estilos globales |
| `src/styles/utilities.css` | Clases CSS personalizadas |

---

## ✅ 12. CHECKLIST DE MANTENIMIENTO

### Mensual
- [ ] Actualizar dependencias: `npm update`
- [ ] Verificar vulnerabilidades: `npm audit`
- [ ] Revisar Lighthouse score
- [ ] Verificar que las imágenes estén optimizadas

### Antes de cada deploy
- [ ] Build de producción sin errores: `npm run build`
- [ ] Preview funciona correctamente: `npm run preview`
- [ ] Verificar que las imágenes carguen
- [ ] Probar en móvil (responsive)
- [ ] Probar navegación y formulario
- [ ] Verificar animaciones en diferentes navegadores

### Trimestral
- [ ] Revisar dependencias deprecadas
- [ ] Actualizar versiones mayores con precaución
- [ ] Revisar y actualizar esta documentación
- [ ] Backup del proyecto

---

## 📚 13. RECURSOS ADICIONALES

- [Documentación de Vite](https://vitejs.dev)
- [Documentación de Framer Motion](https://framer.com/motion)
- [Documentación de Tailwind CSS](https://tailwindcss.com)
- [React Icons](https://react-icons.github.io/react-icons)
- [React 19 Documentation](https://react.dev)

---

*Generado automáticamente el 24 de Diciembre de 2024*  
*Versión del proyecto: 0.0.0*
