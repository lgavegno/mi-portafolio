# Portafolio de Ingeniería Frontend - Feature-Based Architecture

> **Software & Data Studio**  
> Una implementación profesional de React 19 diseñada con una arquitectura escalable basada en Features (DDD Light).

![Ongevag Banner](/public/logo-ongevag.png)

## ⚡ Stack Tecnológico

Este proyecto utiliza tecnologías de vanguardia para asegurar rendimiento, escalabilidad y mantenibilidad.

| Tecnología | Propósito | Características |
|------------|-----------|-----------------|
| **React 19** | Core | Uso de últimas features como Actions y optimizaciones de renderizado. |
| **Vite** | Build System | Entorno de desarrollo ultrarrápido con HMR instantáneo. |
| **Tailwind CSS** | Styling | Sistema de diseño atómico con soporte nativo para Dark Mode. |
| **Framer Motion** | UX/UI | Orquestación compleja de animaciones y transiciones de layout. |
| **Vercel** | Edge Deployment | CI/CD automatizado y optimización de assets en el borde. |

## 🏗️ Arquitectura del Proyecto

El proyecto se aleja de la estructura tradicional por "tipos" (components/hooks/utils) para adoptar una **Arquitectura Basada en Features**. Este enfoque, inspirado en Domain-Driven Design (DDD), agrupa el código por dominio de negocio, facilitando la escalabilidad y el mantenimiento.

### ¿Por qué DDD Light?
- **Escalabilidad:** Cada feature es un módulo autocontenido. Agregar nuevas funcionalidades no aumenta la complejidad cognitiva del resto del sistema.
- **Mantenibilidad:** La colocación de lógica, estado y vista reduce el "context switching" al desarrollar.
- **Desacoplamiento:** Los componentes compartidos (`components/`) son puramente visuales y agnósticos al negocio.

```bash
src/
├── components/     # UI Kit Global (Botones, Inputs, Layouts)
├── features/       # Módulos de Negocio Autocontenidos
│   ├── blog/       # Lógica del Blog (Markdown, Filtros)
│   ├── contact/    # Formulario y validaciones
│   ├── hero/       # Lógica de presentación de alto impacto
│   └── services/   # Carrusel 3D y lógica de servicios
├── layouts/        # Composición de páginas (Main, Blog)
├── hooks/          # Hooks transversales (useMediaQuery, useScroll)
└── config/         # Configuraciones globales (Constantes, Variantes de Animación)
```

Para una inmersión técnica profunda, consultar [ARCHITECTURE.md](./ARCHITECTURE.md).

## ✨ Key Features

Implementaciones destacadas que demuestran capacidades técnicas avanzadas:

### 🎮 3D Hero Section & Performance
- **Integración 3D Ligera:** Geometrías abstractas renderizadas de forma eficiente.
- **Mobile First Strategy:** Carga condicional de recursos pesados. En móviles se prioriza video optimizado, reservando el 3D interactivo para desktop.
- **Lazy Loading:** Code-splitting a nivel de ruta y componente para mantener el TBT bajo.

### 📝 Sistema de Blog Markdown-Driven
- **Arquitectura sin Backend:** Blog completo generado estáticamente a partir de archivos locales.
- **Navegación Fluida:** Transiciones de página suaves y persistencia de estado de scroll.
- **Categorización Dinámica:** Filtrado en tiempo real con feedback visual inmediato.

### ⚡ Core Web Vitals & UX
- **Zero CLS (Cumulative Layout Shift):** Dimensionamiento estricto de contenedores multimedia para evitar saltos de contenido.
- **Accesibilidad:** Uso de HTML semántico y atributos ARIA donde es necesario.
- **Micro-interacciones:** Feedback táctil y visual en cada interacción del usuario (Hover, Focus, Active).

### 📊 Data-Driven Decision Support
- **Pipeline de Saneamiento:** Auditoría integral de datos con Python (Pandas/Numpy) para eliminar inconsistencias en bases de datos relacionales.
- **Machine Learning en Producción:** Implementación de modelos de clustering para segmentación de usuarios y predicción de retención.
- **Integración de Insights:** Visualizaciones avanzadas integradas en la arquitectura React para soporte de decisiones estratégicas.

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js v18+

### Quick Start
```bash
# 1. Clonar repositorio
git clone https://github.com/lgavegno/mi-portafolio.git

# 2. Instalar dependencias
npm install

# 3. Configurar entorno (.env)
# VITE_EMAILJS_PUBLIC_KEY=...

# 4. Iniciar servidor de desarrollo
npm run dev
```

## 🚀 Despliegue

La infraestructura está definida para un despliegue continuo en **Vercel**. Cada push a `main` o `develop` dispara validaciones automáticas y construye una nueva versión inmutable.

---
© 2026 Ongevag Studio - Built for Scalability.
