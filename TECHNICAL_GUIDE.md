# 📘 TECHNICAL GUIDE - Mi Portafolio

> Guía técnica de referencia rápida para desarrolladores.

---

## 📁 Estructura de Carpetas

```
src/
├── components/           # Componentes compartidos
│   ├── ui/              # Atoms: Button, ProjectCard, Skeleton, ProgressBar
│   ├── Header.jsx       # Navegación principal
│   ├── Footer.jsx       # Pie de página
│   ├── NeuralNetworkBackground.jsx  # Animación canvas
│   └── index.js         # Barrel export
│
├── features/            # Módulos de negocio (Feature-based)
│   ├── hero/           # HeroBanner principal
│   ├── services/       # Carousel de servicios
│   ├── works/          # Proyectos
│   ├── contact/        # Formulario de contacto
│   └── blog/           # Sistema de blog
│       ├── components/ # BlogCard, BlogPreview
│       ├── data/       # blogData.js
│       └── index.js    # Barrel export
│
├── hooks/               # Custom Hooks
│   ├── useVibrate.js           # Feedback táctil (Vibration API)
│   ├── useReducedMotion.js     # Accesibilidad (prefers-reduced-motion)
│   ├── useIntersectionObserver.js  # Lazy loading
│   └── index.js
│
├── config/              # Configuración centralizada
│   └── motionConfig.js  # Variantes Framer Motion
│
├── data/                # Datos estáticos
│   └── projects.js      # Lista de proyectos
│
├── layouts/             # Layouts de página
│   └── MainLayout.jsx   # Header + Main + Footer
│
├── styles/              # CSS adicional
│   ├── animations.css   # Keyframes personalizados
│   └── utilities.css    # Utilidades CSS
│
├── App.jsx              # Componente raíz
├── main.jsx             # Entry point
└── index.css            # Estilos globales + Tailwind
```

---

## 🔧 Guía de Modificación

### Cambiar Estilos Globales

| Qué modificar | Archivo |
|---------------|---------|
| Colores (cobalt, mint, slate) | `tailwind.config.js` → `theme.extend.colors` |
| Tipografía | `tailwind.config.js` → `theme.extend.fontFamily` |
| Animaciones CSS | `tailwind.config.js` → `theme.extend.animation` |
| Estilos base | `src/index.css` |
| Animaciones custom | `src/styles/animations.css` |

### Modificar Feedback Táctil/Vibración

```javascript
// Archivo: src/hooks/useVibrate.js

// Patrones disponibles:
vibrationPatterns = {
  tap: 10,           // Toque suave
  success: [50, 30, 50],
  error: [100, 50, 100, 50, 100],
  light: 5,          // Impacto ligero (recomendado para UX)
  heavy: 50,
}

// Uso en componentes:
import { useVibrate } from '@hooks';
const vibrate = useVibrate(5); // 5ms = light
onClick={() => vibrate()}
```

### Añadir Nueva Sección/Feature

1. Crear carpeta en `src/features/nueva-seccion/`
2. Crear componente principal `NuevaSeccion.jsx`
3. Crear `index.js` con barrel export
4. Importar en `App.jsx` con lazy loading:

```javascript
const NuevaSeccion = lazy(() => import('./features/nueva-seccion/NuevaSeccion'));

// En el JSX:
<AnimatedSection id="nueva-seccion">
  <NuevaSeccion />
</AnimatedSection>
```

5. Añadir link en `Header.jsx` → `navLinks[]`

### Añadir Nuevo Componente UI

1. Crear en `src/components/ui/NuevoComponente.jsx`
2. Exportar en `src/components/ui/index.js`
3. Usar hooks existentes (`useVibrate`, `useReducedMotion`)
4. Aplicar variantes de `motionConfig.js`

---

## 🎨 Patrones de Diseño Aplicados

### 1. Custom Hooks (Separation of Concerns)
```javascript
// Lógica reutilizable extraída a hooks
useVibrate()        // Feedback táctil
useReducedMotion()  // Accesibilidad
useIntersectionObserver()  // Lazy loading
```

### 2. Composición de Componentes
```
MainLayout
  └── Header
  └── Main (children)
       └── HeroBanner
            └── Badge
            └── Button
            └── SocialLink
            └── ProjectCard
  └── Footer
```

### 3. Barrel Exports (DRY)
```javascript
// Importar múltiples componentes desde un punto
import { Button, ProjectCard, Skeleton } from '@components/ui';
import { useVibrate, useReducedMotion } from '@hooks';
```

### 4. Configuración Centralizada
```javascript
// motionConfig.js - Variantes reutilizables
import { fadeInUp, glassCard, buttonVariants } from '@config/motionConfig';
```

### 5. Feature-based Structure
```
features/
  ├── hero/      # Todo lo relacionado con Hero
  ├── services/  # Todo lo relacionado con Servicios
  └── blog/      # Componentes + Data + Index
```

---

## ⚡ Integración de Dependencias

### Framer Motion
- **Configuración**: `src/config/motionConfig.js`
- **Variantes**: `fadeInUp`, `glassCard`, `buttonVariants`, `staggerContainer`
- **Uso**: `<motion.div variants={fadeInUp} initial="hidden" animate="visible">`

### Tailwind CSS
- **Configuración**: `tailwind.config.js`
- **Paleta custom**: `cobalt-*`, `mint-*`, `slate-*`
- **Clases UX móvil**: `touch-manipulation`, `select-none`, `active:*`

### Vite
- **Alias configurados**: `@`, `@components`, `@features`, `@hooks`, `@config`, `@data`
- **Build output**: `dist/`
- **Optimizaciones**: esbuild minify, CSS code splitting

---

## 🔍 Convenciones de Código

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Componentes | PascalCase | `ProjectCard.jsx` |
| Hooks | camelCase con `use` | `useVibrate.js` |
| Archivos CSS | kebab-case | `Services3DCarousel.css` |
| Variantes Motion | camelCase | `fadeInUp`, `glassCard` |
| Clases Tailwind | Orden: layout → spacing → colors → effects | `flex items-center gap-4 bg-white/5 rounded-xl` |

---

## 📝 Checklist para Nuevos Desarrolladores

- [ ] Revisar `motionConfig.js` antes de crear animaciones
- [ ] Usar `useVibrate(5)` en elementos interactivos
- [ ] Aplicar `touch-manipulation select-none` a botones
- [ ] Usar `useReducedMotion()` para accesibilidad
- [ ] Exportar componentes nuevos en `index.js`
- [ ] Usar alias de Vite (`@components`, `@hooks`, etc.)
