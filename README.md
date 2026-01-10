# Ongevag Portfolio

> **Software & Data Studio**  
> Portafolio profesional moderno construido con React 19, Vite y Tailwind CSS.

![Ongevag Banner](/public/logo-ongevag.png)

## ⚡ Stack Tecnológico

| Tecnología | Propósito | Características |
|------------|-----------|-----------------|
| **React 19** | Core | Hooks, Suspense, Lazy Loading |
| **Vite** | Tooling | Hot Module Replacement (HMR) instantáneo |
| **Tailwind CSS** | Styling | Diseño atómico, Dark Mode nativo |
| **Framer Motion** | UX | Animaciones de entrada, scroll y micro-interacciones |
| **React Icons** | UI | Iconografía SVG optimizada (Feather, Material) |

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js v18+
- npm v9+

### Desarrollo Local
```bash
# 1. Clonar repositorio
git clone https://github.com/lgavegno/mi-portafolio.git

# 2. Instalar dependencias
npm install

# 3. Configurar entorno (.env)
# VITE_EMAILJS_SERVICE_ID=...
# VITE_EMAILJS_TEMPLATE_ID=...
# VITE_EMAILJS_PUBLIC_KEY=...

# 4. Iniciar servidor
npm run dev
```

### Comandos de Build
```bash
npm run build   # Genera producción en dist/
npm run preview # Previsualiza la build localmente
npm run lint    # Chequeo de calidad de código
```

## 📁 Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en **Features** para escalabilidad:

```
src/
├── components/     # UI Kit compartido (Header, Footer, Buttons)
├── features/       # Módulos de negocio (Hero, Blog, Contact, Services)
├── layouts/        # Estructuras de página (Main, Blog)
├── hooks/          # Lógica reutilizable
└── config/         # Configuraciones globales (Animaciones)
```

Para más detalles, consultar [ARCHITECTURE.md](./ARCHITECTURE.md) y [COMPONENT-TREE.md](./COMPONENT-TREE.md).

## ✨ Características Clave

- **Hero Híbrido:** Video de fondo optimizado para móviles y geometría 3D interactiva para desktop.
- **Sistema de Blog:** Layout dedicado con modo oscuro independiente, filtrado por categorías y estimación de lectura.
- **Navegación Fluida:** Scroll suave a secciones y transiciones entre páginas.
- **Glassmorphism UI:** Diseño moderno con efectos de desenfoque y transparencias.
- **Performance:** Carga diferida (Lazy loading) de secciones pesadas.

## 🚀 Despliegue (Vercel)

El proyecto está optimizado para Vercel (Preset: Vite).
1. Importar repositorio en Vercel.
2. Configurar Variables de Entorno (`.env`).
3. Deploy.

---
© 2026 Ongevag Studio - MIT License
