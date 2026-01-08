# 🏗️ Arquitectura Técnica del Proyecto

> **Versión:** 1.0.0  
> **Última actualización:** Enero 2026

## 🛠️ Tech Stack Principal

El proyecto está construido sobre un stack moderno basado en React y Vite, optimizado para rendimiento y experiencia de usuario.

| Tecnología | Propósito | Características Clave |
|------------|-----------|-----------------------|
| **Vite** | Build Tool | HMR instantáneo, builds optimizados con Rollup. |
| **React 19** | UI Library | Hooks, Suspense, Lazy Loading, StrictMode. |
| **Tailwind CSS** | Estilizado | Utility-first, Diseño Responsivo, Dark Mode nativo. |
| **Framer Motion** | Animaciones | Transiciones de página, micro-interacciones, scroll animations. |
| **EmailJS** | Backendless | Envío de formularios de contacto sin servidor. |
| **React Router** | Routing | Navegación SPA (Single Page Application). |

## 📐 Decisiones de Arquitectura

### 1. Estructura basada en Features
Se utiliza una arquitectura híbrida donde los componentes reutilizables viven en `components/` y la lógica de negocio específica en `features/`.

```
src/
├── components/ui/   # Átomos y moléculas (Botones, Cards, Inputs)
├── features/        # Organismos y páginas (Hero, Contact, Blog)
├── hooks/           # Lógica reutilizable (useVibrate, useReducedMotion)
└── layouts/         # Estructuras de página (MainLayout)
```

### 2. Rendimiento y Lazy Loading
- **Code Splitting:** Las secciones principales (`Hero`, `Services`, `Works`, `Contact`) se cargan perezosamente (`React.lazy`) en `App.jsx`.
- **Suspense:** Se muestra un `SkeletonPage` mientras cargan los módulos.
- **Assets:** Las imágenes y recursos pesados se optimizan en el build.

### 3. Sistema de Animaciones
Centralizado en `config/motionConfig.js`. Se definen variantes reutilizables (`fadeInUp`, `staggerContainer`) para mantener consistencia visual sin repetir código en cada componente.

### 4. Estilizado (Tailwind + Glassmorphism)
Se extiende la configuración de Tailwind (`tailwind.config.js`) para incluir paletas de colores personalizadas (`cobalt`, `mint`) y utilidades para efectos de "cristal" (backdrop-blur, bordes semitransparentes).

## 🔄 Flujo de Datos

1. **Estado Local:** La mayoría de los componentes gestionan su propio estado (`useState` para formularios o UI).
2. **Prop Drilling:** Mínimo, usado solo para componentes de UI puros.
3. **Configuración Global:** Constantes y datos estáticos residen en `data/` o variables de entorno (`.env`).
