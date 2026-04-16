# CLAUDE.md — Portfolio Leandro Gavegno (Ongevag Studio)

## Propósito
Portfolio profesional de Leandro Gavegno, desarrollador freelance bajo la marca **Ongevag Studio** (Rafaela, Santa Fe, Argentina). Objetivo: captar clientes PyMEs para servicios de desarrollo web, automatización con IA y tiendas online.

Stack: React 19 + Vite con arquitectura Feature-Based (DDD Light).

---

## Stack Tecnológico

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 19.1.0 | UI framework principal |
| React DOM | 19.1.0 | Renderizado en el DOM |
| Vite | 6.3.5 | Build tool y dev server |
| Tailwind CSS | 3.3.0 | Utility-first CSS styling |
| Framer Motion | 12.23.12 | Animaciones complejas y transiciones |
| React Router DOM | 7.11.0 | Enrutamiento y navegación |
| React Helmet Async | 2.0.5 | SEO / meta tags dinámicos |
| EmailJS Browser | 4.4.1 | Formulario de contacto (sin backend) |
| React Icons | 5.5.0 | Iconografía SVG |
| AutoPrefixer | 10.4.14 | Prefijos CSS automáticos |
| PostCSS | 8.4.31 | Procesamiento de CSS |
| Vite ImageTools | 9.0.2 | Optimización de imágenes |
| Vite Plugin Compression | 0.5.1 | Compresión de assets (gzip/brotli) |

---

## Comandos

```bash
# Desarrollo
npm run dev       # Inicia servidor Vite en http://localhost:5173

# Build & Preview
npm run build     # Compilación optimizada (dist/)
npm run preview   # Previsualiza build localmente

# Linting
npm run lint      # ESLint con configuración React + React Hooks
```

---

## Estructura del Proyecto

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root component
├── components/                 # UI Kit Global (agnóstico al negocio)
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── GlowButton.jsx
│   │   ├── PageTransition.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ShareButton.jsx
│   │   ├── Skeleton.jsx
│   │   ├── ProgressBar.jsx
│   │   └── BackToTop.jsx
│   ├── About.jsx
│   ├── SkillsGrid.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── DataVisualization.jsx
│   ├── NeuralNetworkBackground.jsx
│   ├── TechnicalTicker.jsx
│   └── WireframeGeometry.jsx
│
├── features/                   # Módulos de negocio autocontenidos
│   ├── hero/
│   │   └── HeroBanner.jsx
│   ├── services/
│   │   └── Services.jsx
│   ├── blog/
│   │   └── components/
│   │       ├── BlogCard.jsx
│   │       ├── BlogComponents.jsx
│   │       └── BlogPreview.jsx
│   ├── contact/
│   │   └── Contact.jsx
│   ├── works/
│   │   └── Works.jsx
│   └── analytics/
│       └── components/
│           ├── AnalyticsCard.jsx
│           └── DataChart.jsx
│
├── layouts/                    # Composición de páginas
│   ├── MainLayout.jsx
│   └── BlogLayout.jsx
│
├── pages/                      # Rutas / páginas
│   ├── BlogIndex.jsx
│   ├── BlogPostDetail.jsx
│   └── ProjectDetail.jsx
│
└── config/                     # Configuración global
    └── (constantes, variantes de animación)
```

---

## Configuración Crítica

### Variables de Entorno (.env)
```bash
VITE_EMAILJS_PUBLIC_KEY=...    # Para formulario de contacto en Contact.jsx
```

Requerida para que funcione el formulario de contacto con EmailJS.

### Build Output
- Salida: `dist/`
- Formato: Módulos ESM optimizados
- Compresión: Gzip + Brotli automática (vite-plugin-compression)

---

## Archivos Críticos

No romper sin entender:

| Archivo | Responsabilidad | Notas |
|---------|-----------------|-------|
| src/features/hero/HeroBanner.jsx | Componente principal del hero con layout responsive | Contiene badge, título gradient, botones CTA |
| src/components/ParticleBackground.jsx | Canvas animado de fondo con partículas y conexiones | Usa ResizeObserver y requestAnimationFrame; NO usar React.lazy |
| src/components/WireframeGeometry.jsx | Geometría 3D flotante (desktop only) | Lazy loaded; tiene animación de flotación |
| src/config/motionConfig.js | Variantes de animación Framer Motion reutilizables | Usado en fadeInUp, staggerContainer, glassCard |
| public/favicon.svg | Ícono del nodo Ongevag | Aparece en tabs del navegador |
| public/og-image.svg | Imagen 1200x630 para social sharing | Usado por LinkedIn, Twitter, etc. en previews |
| vercel.json | Rewrites SPA routing | **CRÍTICO:** Sin esto todas las rutas directas dan 404 |

---

## Arquitectura

### Patrón: Feature-Based Architecture (DDD Light)

El proyecto rechaza la estructura tradicional por "tipos" (components/hooks/utils) y agrupa el código por **dominio de negocio**:

- **`components/`** → UI Kit global, puramente visual, agnóstico al negocio (Buttons, Layouts, etc.)
- **`features/`** → Módulos autocontenidos con lógica, estado y vista (hero, blog, contact, services, etc.)
- **`layouts/`** → Composición de páginas (estructura común)
- **`pages/`** → Rutas y puntos de entrada de React Router

**Beneficios:**
- Escalabilidad: Agregar features no aumenta complejidad cognitiva
- Mantenibilidad: Código relacionado colocado junto (reduce context switching)
- Desacoplamiento: Features no dependen unas de otras

### Rendering Estrategia
- **3D Hero:** Carga condicional. Desktop: interactivo 3D. Mobile: video optimizado.
- **Blog:** Estático (Markdown-driven), sin backend.
- **Lazy Loading:** Code-splitting por ruta con React Router.

### Performance
- **Core Web Vitals:** Zero CLS (Cumulative Layout Shift), LCP optimizado.
- **Optimización de Assets:** Vite ImageTools + Compression.
- **SSR-ready:** Soporte para React Helmet Async (meta tags dinámicos).

---

## Notas Importantes

### ParticleBackground
- Archivo: `src/components/ParticleBackground.jsx`
- **NO importar con React.lazy** — debe cargar con el hero para evitar flash blanco
- Respeta `prefers-reduced-motion` retornando null (accesibilidad)
- Canvas resizable con ResizeObserver; manualmente optimizado

### EmailJS Integration
- Archivo: `src/features/contact/Contact.jsx`
- Sin backend: Envíos directos desde el navegador
- Requiere `VITE_EMAILJS_PUBLIC_KEY` en .env

### React Router Setup
- Routes dinámicas: `BlogPostDetail.jsx` con parámetros
- Persiste scroll en navegación

### Vite + React 19
- React 19 usa "Actions" y optimizaciones de renderizado
- Vite + HMR instantáneo en desarrollo
- Builds muy rápidos (~1s)

### ESLint Config
- Incluye plugins para React Hooks y React Refresh
- Ejecutar `npm run lint` antes de commits

### Qué NO hacer

- **No eliminar `vercel.json`** — sin él todas las rutas directas dan 404 en producción
- **No eliminar `public/og-image.svg`** — LinkedIn y Twitter usan este archivo para previews en redes sociales
- **No importar `ParticleBackground` con `React.lazy`** — debe cargar con el hero para evitar flash blanco
- **No agregar TypeScript** — decisión de arquitectura documentada en ADR-002
- **No commitear `.env`** — credenciales de EmailJS nunca en Git

---

## Deployment

**Plataforma:** Vercel
**Trigger:** Cada push a `main` o `develop`
**CI/CD:** Automático — build + preview URLs

---

## Dónde está cada cosa

| Elemento | Ubicación | Descripción |
|----------|-----------|-------------|
| Favicon del sitio | `public/favicon.svg` | Ícono del nodo, aparece en tabs del navegador |
| og:image para redes | `public/og-image.svg` | Imagen 1200x630 para previews en LinkedIn, Twitter |
| Config de rutas Vercel | `vercel.json` | Rewrites SPA; crítico para evitar 404 en rutas directas |
| Partículas del hero | `src/components/ParticleBackground.jsx` | Canvas animado con conexiones dinámicas |
| Geometría 3D hero | `src/components/WireframeGeometry.jsx` | Figuras 3D flotantes (desktop only) |
| Botón compartir | `src/components/ui/ShareButton.jsx` | LinkedIn, WhatsApp, Email, copiar link |
| Posts del blog | `src/features/blog/data/blogData.js` | Array de posts con contenido HTML inline |
| Información de proyectos | `src/data/projects.js` | Array de proyectos con descripción, stack, links |

---

## Mapa de Documentación

| Archivo | Audiencia | Propósito |
|---------|-----------|-----------|
| `README.md` | Recruiter / visitante | Entry point — qué es, stack, proyectos |
| `CHANGELOG.md` | Todos | Historial de cambios con fechas y versiones |
| `CONTRIBUTING.md` | Dev colaborador | Flujo de trabajo, convenciones de commits, checklist |
| `CLAUDE.md` | IA / dev | Contexto técnico completo |
| `src/docs/PRD.md` | Product | Requisitos y objetivos del producto |
| `src/docs/adr/ADR-001.md` | Dev senior | Decisión: Vite como build tool |
| `src/docs/adr/ADR-002.md` | Dev senior | Decisión: JavaScript puro sin TypeScript |
| `src/docs/adr/ADR-003.md` | Dev senior | Decisión: EmailJS para contacto |
| `src/docs/adr/ADR-004.md` | Dev senior | Decisión: Arquitectura feature-based (DDD Light) |
| `src/docs/DESIGN_TOKENS.md` | Dev / diseñador | Sistema de diseño y paleta de colores |
| `src/docs/PERFORMANCE.md` | Dev | Checklist de performance y métricas de Core Web Vitals |
| `src/docs/AUDIT_REPORT.md` | Referencia | Health report inicial del proyecto (Score: 6.8/10) |

**Archivos deprecados (históricos):**
- `ARCHITECTURE.md` — Consolidado en ADRs
- `TECHNICAL_GUIDE.md` — Consolidado en CLAUDE.md
- `PROJECT_LOG.md` — Consolidado en CHANGELOG.md

---

## Contacto & Legal

© 2026 Ongevag Studio — Built for Scalability
