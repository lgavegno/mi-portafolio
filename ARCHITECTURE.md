# 🏗️ Arquitectura Técnica del Proyecto

> **Versión:** 2.0.0
> **Última actualización:** Enero 2026

## 🛠️ Tech Stack Principal

El proyecto está construido sobre un stack moderno basado en React y Vite, optimizado para rendimiento y experiencia de usuario.

| Tecnología | Propósito | Características Clave |
|------------|-----------|-----------------------|
| **Vite** | Build Tool | HMR instantáneo, builds optimizados. |
| **React 19** | UI Library | Hooks, Suspense, Lazy Loading, StrictMode. |
| **Tailwind CSS** | Estilizado | Utility-first, Diseño Responsivo, Dark Mode nativo. |
| **Framer Motion** | Animaciones | Transiciones de página, orquestación compleja. |
| **React Icons** | Iconografía | Librería exclusiva para iconos (Fi, Md). |
| **EmailJS** | Backendless | Envío de formularios de contacto sin servidor. |
| **React Router** | Routing | Navegación SPA y sistema de rutas híbrido. |

## 📐 Decisiones de Arquitectura

### 1. Estructura basada en Features (Domain-Driven Design Light)
Se utiliza una arquitectura donde la lógica de negocio se agrupa por dominio en `features/`.

```
src/
├── components/          # Componentes visuales compartidos
│   ├── ui/             # Atoms: GlowButton, Skeleton, ShareButton
│   ├── Header.jsx      # Navegación Global
│   └── Footer.jsx      # Pie de página
│
├── features/           # Módulos por dominio
│   ├── hero/           # HeroBanner (Video Mobile, 3D Desktop)
│   ├── services/       # Carousel 3D de Servicios
│   ├── works/          # Grid de Proyectos
│   ├── contact/        # Formulario de Contacto
│   └── blog/           # Sistema de Blog (Index, Detail, Components)
│
├── hooks/              # Lógica reutilizable (useVibrate, useReducedMotion)
├── layouts/            # Layouts (MainLayout, BlogLayout)
└── config/             # Configuración centralizada (motionConfig.js)
```

### 2. Rendimiento y UX
- **Mobile First Hero:** Se implementa un video de fondo optimizado exclusivamente para móviles para reducir el TBT en desktop.
- **Code Splitting:** Rutas y secciones pesadas cargadas con `React.lazy`.
- **Zero CLS:** Uso de skeletons y dimensiones explícitas en imágenes/videos.

### 3. Sistema de Estilos y Animación
- **Tailwind Only:** No se permiten archivos CSS externos (excepto `index.css` global). Todo el estilo es utilitario.
- **Framer Motion Config:** Variantes de animación centralizadas en `config/motionConfig.js` para mantener consistencia (`fadeInUp`, `staggerContainer`).

### 4. Navegación Interna de Proyectos
- **Estandarización:** Implementación de rutas dinámicas `/proyecto/:id` para despliegue de casos de estudio detallados, mejorando la retención del usuario en el sitio.

### 5. Sistema Tipográfico Centralizado
- **Estandarización:** Estandarización de escalas visuales en `index.css` para asegurar jerarquía armónica y legibilidad 'pixel-perfect' en resoluciones Desktop.

### 6. Iconografía
- **Estandarización:** Uso exclusivo de `react-icons` (principalmente Feather `fi` y Material Design `md`).
- **Prohibido:** Uso de fuentes de iconos externas (Google Fonts Material Icons) para mejorar la carga.

## 🔄 Flujo de Datos Global

1. **Routing:** `App.jsx` maneja las rutas principales (`/`) y las rutas de blog (`/blog/*`).
2. **Theme:** `BlogLayout` gestiona el estado del tema (Dark/Light) usando `localStorage` y clases de Tailwind.
3. **Data:** Los datos de blog y proyectos residen en archivos estáticos JS en `features/*/data/` para fácil mantenimiento sin CMS.
