# 🌳 Árbol de Componentes - Portafolio 2025

> Mapa visual de todos los componentes y sus dependencias.

---

## 📊 Árbol de Renderizado

```
App
│
└── MainLayout
    │
    ├── Header
    │   ├── Logo (interno)
    │   ├── NavLinks (interno)
    │   │   └── motion.a (x4)
    │   ├── CTA Button (interno)
    │   └── MobileMenu (AnimatePresence)
    │       └── motion.div
    │           └── NavLinks móvil
    │
    ├── main (motion.main)
    │   │
    │   └── AnimatePresence
    │       │
    │       └── Suspense (fallback: SkeletonPage)
    │           │
    │           ├── AnimatedSection #hero
    │           │   └── HeroBanner (lazy)
    │           │       ├── Badge (interno)
    │           │       ├── AnimatedText (interno)
    │           │       ├── motion.h1 (headline)
    │           │       ├── motion.p (subtítulo)
    │           │       ├── Button (x2 - CTAs)
    │           │       ├── SocialLink (interno, x2)
    │           │       ├── ProjectCard (x3)
    │           │       │   └── ProgressBar
    │           │       ├── BlogPreview
    │           │       │   └── BlogCard (x3, compact)
    │           │       └── ScrollIndicator (interno)
    │           │
    │           ├── AnimatedSection #servicios
    │           │   └── Services (lazy)
    │           │       ├── motion.div (header)
    │           │       ├── Carousel3D (interno)
    │           │       │   └── ServiceCard (x5)
    │           │       ├── NavButtons (x2)
    │           │       └── Indicators (x5)
    │           │
    │           ├── AnimatedSection #proyectos
    │           │   └── Works (lazy)
    │           │       ├── motion.div (header)
    │           │       ├── ProjectCard (x5)
    │           │       │   └── ProgressBar
    │           │       └── CTA GitHub
    │           │
    │           └── AnimatedSection #contacto
    │               └── Contact (lazy)
    │                   ├── motion.div (header)
    │                   └── Form (glass-card)
    │                       ├── Input: nombre
    │                       ├── Input: email
    │                       ├── Textarea: mensaje
    │                       └── Button (submit)
    │
    └── Footer
        ├── Logo
        ├── SocialLinks (x3)
        └── Copyright
```

---

## 📦 Dependencias por Componente

### App.jsx
```
Imports:
├── react (lazy, Suspense)
├── framer-motion (AnimatePresence, motion)
├── ./layouts/MainLayout
├── ./components/ui/Skeleton (SkeletonPage)
├── ./config/motionConfig (pageTransition)
│
Lazy Imports:
├── ./features/hero/HeroBanner
├── ./features/services/Services
├── ./features/works/Works
└── ./features/contact/Contact
```

### MainLayout.jsx
```
Imports:
├── react
├── framer-motion (motion)
└── ../components (Header, Footer)
```

### Header.jsx
```
Imports:
├── react (useState, useEffect)
├── framer-motion (motion, AnimatePresence)
├── react-icons/fa (FaBars, FaTimes)
└── ../hooks/useVibrate
```

### Footer.jsx
```
Imports:
├── react
├── framer-motion (motion)
└── react-icons/fa (FaGithub, FaLinkedin, FaEnvelope, FaHeart)
```

### HeroBanner.jsx
```
Imports:
├── react
├── framer-motion (motion)
├── react-icons/fi (FiArrowRight, FiMail)
├── react-icons/fa (FaGithub, FaLinkedin)
├── ../../config/motionConfig (fadeInUp, staggerContainer, springConfig, viewportConfig)
├── ../../hooks/useReducedMotion
├── ../../components/ui/Button
├── ../../components/ui/ProjectCard
├── ../blog (BlogPreview)
└── ../../data/projects (featuredProjects)
```

### Services.jsx
```
Imports:
├── react (useState, useEffect, useRef)
├── framer-motion (motion)
├── react-icons/fi (FiCode, FiLayout, FiTool, FiCpu, FiTarget, FiChevronLeft, FiChevronRight)
├── ../../config/motionConfig (fadeInUp, staggerContainer, glassCard)
└── ./Services3DCarousel.css
```

### Works.jsx
```
Imports:
├── react
├── framer-motion (motion)
├── react-icons/fi (FiExternalLink, FiGithub, FiFolder)
├── ../../config/motionConfig (fadeInUp, staggerContainer, glassCard)
├── ../../data/projects (allProjects)
└── ../../components/ui/ProjectCard
```

### Contact.jsx
```
Imports:
├── react (useState)
├── framer-motion (motion)
├── react-icons/fi (FiSend, FiMail, FiUser, FiMessageSquare)
├── ../../config/motionConfig (fadeInUp, staggerContainer)
└── ../../components/ui/Button
```

### Button.jsx
```
Imports:
├── react
├── framer-motion (motion)
├── ../../hooks/useVibrate
├── ../../hooks/useReducedMotion
└── ../../config/motionConfig (buttonVariants, springConfig)

Exports:
├── Button (default)
└── IconButton (named)
```

### ProjectCard.jsx
```
Imports:
├── react
├── framer-motion (motion)
├── ../../config/motionConfig (glassCard, springConfig)
├── ../../hooks/useVibrate
├── ../../hooks/useReducedMotion
└── ./ProgressBar
```

### ProgressBar.jsx
```
Imports:
├── react
├── framer-motion (motion)
└── ../../config/motionConfig (progressBar)
```

### Skeleton.jsx
```
Imports:
├── react
├── framer-motion (motion)
└── ../../config/motionConfig (skeletonPulse)

Exports:
├── Skeleton (default)
├── SkeletonText
├── SkeletonTitle
├── SkeletonAvatar
├── SkeletonProjectCard
├── SkeletonHero
└── SkeletonPage
```

### BlogCard.jsx
```
Imports:
├── react
├── framer-motion (motion)
├── react-icons/fi (FiClock, FiArrowRight, FiCalendar)
├── ../../../config/motionConfig (glassCard, springConfig)
└── ../../../hooks/useVibrate
```

### BlogPreview.jsx
```
Imports:
├── react
├── framer-motion (motion)
├── react-icons/fi (FiBookOpen, FiArrowRight)
├── ../../../config/motionConfig (fadeInUp, staggerContainer)
├── ./BlogCard
└── ../data/blogData (featuredPosts)
```

---

## 🔗 Grafo de Dependencias

```
                                    ┌─────────────┐
                                    │   App.jsx   │
                                    └──────┬──────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
            ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
            │ MainLayout  │        │MotionConfig │        │  Skeleton   │
            └──────┬──────┘        └─────────────┘        └─────────────┘
                   │                      ▲
        ┌──────────┼──────────┐           │
        │          │          │           │
        ▼          ▼          ▼           │
   ┌────────┐ ┌────────┐ ┌────────┐       │
   │ Header │ │ Footer │ │Features│       │
   └───┬────┘ └────────┘ └───┬────┘       │
       │                     │            │
       ▼                     │            │
  ┌─────────┐               │            │
  │useVibrate│◄─────────────┼────────────┤
  └─────────┘               │            │
                            │            │
         ┌──────────────────┼────────────┤
         │                  │            │
         ▼                  ▼            │
   ┌───────────┐     ┌───────────┐       │
   │HeroBanner │     │  Services │       │
   └─────┬─────┘     └───────────┘       │
         │                               │
    ┌────┼────┬────────────┐             │
    │    │    │            │             │
    ▼    ▼    ▼            ▼             │
┌──────┐┌─────────┐┌───────────┐         │
│Button││ProjectCard││BlogPreview│        │
└──────┘└────┬────┘└─────┬─────┘         │
             │           │               │
             ▼           ▼               │
       ┌───────────┐┌─────────┐          │
       │ProgressBar││ BlogCard│          │
       └───────────┘└─────────┘          │
                                         │
         ┌───────────────────────────────┘
         │
         ▼
   ┌───────────┐     ┌───────────┐
   │   Works   │     │  Contact  │
   └─────┬─────┘     └─────┬─────┘
         │                 │
         ▼                 ▼
   ┌───────────┐     ┌───────────┐
   │ProjectCard│     │  Button   │
   └───────────┘     └───────────┘
```

---

## 📊 Matriz de Uso de Hooks

| Componente | useVibrate | useReducedMotion | useIntersectionObserver | useState | useEffect | useRef |
|------------|:----------:|:----------------:|:-----------------------:|:--------:|:---------:|:------:|
| Header | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| HeroBanner | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Services | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Works | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Contact | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Button | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| ProjectCard | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| BlogCard | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 📊 Matriz de Uso de Variantes de Motion

| Componente | fadeInUp | staggerContainer | glassCard | buttonVariants | pageTransition |
|------------|:--------:|:----------------:|:---------:|:--------------:|:--------------:|
| App | ❌ | ❌ | ❌ | ❌ | ✅ |
| HeroBanner | ✅ | ✅ | ❌ | ❌ | ❌ |
| Services | ✅ | ✅ | ✅ | ❌ | ❌ |
| Works | ✅ | ✅ | ✅ | ❌ | ❌ |
| Contact | ✅ | ✅ | ❌ | ❌ | ❌ |
| Button | ❌ | ❌ | ❌ | ✅ | ❌ |
| ProjectCard | ❌ | ❌ | ✅ | ❌ | ❌ |
| BlogCard | ❌ | ❌ | ✅ | ❌ | ❌ |
| BlogPreview | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 🎨 Uso de Iconos por Componente

### react-icons/fi (Feather Icons)
| Icono | Componentes |
|-------|-------------|
| FiArrowRight | HeroBanner, BlogCard, BlogPreview |
| FiMail | HeroBanner, Contact |
| FiSend | Contact |
| FiUser | Contact |
| FiMessageSquare | Contact |
| FiCode | Services |
| FiLayout | Services |
| FiTool | Services |
| FiCpu | Services |
| FiTarget | Services |
| FiChevronLeft | Services |
| FiChevronRight | Services |
| FiExternalLink | Works |
| FiGithub | Works |
| FiFolder | Works |
| FiClock | BlogCard |
| FiCalendar | BlogCard |
| FiBookOpen | BlogPreview |

### react-icons/fa (Font Awesome)
| Icono | Componentes |
|-------|-------------|
| FaBars | Header |
| FaTimes | Header |
| FaGithub | HeroBanner, Footer |
| FaLinkedin | HeroBanner, Footer |
| FaEnvelope | Footer |
| FaHeart | Footer |

---

## 📁 Barrel Exports

### src/components/index.js
```javascript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
```

### src/components/ui/index.js
```javascript
export { default as Button, IconButton } from './Button';
export { default as ProjectCard } from './ProjectCard';
export { default as ProgressBar } from './ProgressBar';
export * from './Skeleton';
```

### src/hooks/index.js
```javascript
export { useVibrate, useVibratePattern, vibrationPatterns } from './useVibrate';
export { useReducedMotion } from './useReducedMotion';
export { useIntersectionObserver, useLazyImage, useLazyComponent } from './useIntersectionObserver';
```

### src/features/blog/index.js
```javascript
export { default as BlogCard } from './components/BlogCard';
export { default as BlogPreview } from './components/BlogPreview';
export { blogPosts, featuredPosts, categories } from './data/blogData';
```

---

## 🔄 Ciclo de Vida de Renderizado

```
1. main.jsx
   └── ReactDOM.createRoot().render()
       └── StrictMode
           └── HelmetProvider
               └── App

2. App.jsx (primer render)
   └── MainLayout
       ├── Header (render inmediato)
       ├── Suspense (muestra SkeletonPage)
       └── Footer (render inmediato)

3. Lazy Loading (async)
   ├── HeroBanner chunk cargado
   ├── Services chunk cargado
   ├── Works chunk cargado
   └── Contact chunk cargado

4. App.jsx (segundo render)
   └── MainLayout
       ├── Header
       ├── AnimatePresence
       │   └── Suspense (contenido real)
       │       ├── HeroBanner (visible)
       │       ├── Services (below fold)
       │       ├── Works (below fold)
       │       └── Contact (below fold)
       └── Footer

5. Scroll → IntersectionObserver
   └── whileInView triggers animations
       ├── Services animates in
       ├── Works animates in
       └── Contact animates in
```

---

*Generado el 24 de Diciembre de 2024*
