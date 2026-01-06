# Mi Portafolio

Portafolio profesional con arquitectura moderna, animaciones fluidas y UX optimizada para móviles.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.0 | UI Library |
| **Vite** | 6.3.5 | Build tool + Dev server |
| **Tailwind CSS** | 3.3.0 | Utility-first CSS |
| **Framer Motion** | 12.23.12 | Animaciones declarativas |
| **React Icons** | 5.5.0 | Iconografía (Fi, Fa) |
| **React Helmet Async** | 2.0.5 | SEO/Meta tags |

### Dev Dependencies
- ESLint 9.25 + React Hooks plugin
- PostCSS + Autoprefixer
- TypeScript types (solo para intellisense)

---

## 📦 Scripts

```bash
# Desarrollo (HMR en http://localhost:5173)
npm run dev

# Build de producción (output: dist/)
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 📁 Arquitectura

```
src/
├── components/          # Componentes compartidos
│   ├── ui/             # Atoms: Button, ProjectCard, Skeleton
│   ├── Header.jsx      # Navegación
│   └── Footer.jsx      # Pie de página
│
├── features/           # Módulos por dominio
│   ├── hero/          # HeroBanner
│   ├── services/      # Carousel 3D
│   ├── works/         # Proyectos
│   ├── contact/       # Formulario mailto
│   └── blog/          # BlogCard, BlogPreview
│
├── hooks/              # Custom Hooks
│   ├── useVibrate.js          # Haptic feedback
│   ├── useReducedMotion.js    # Accesibilidad
│   └── useIntersectionObserver.js
│
├── config/             # Configuración centralizada
│   └── motionConfig.js # Variantes Framer Motion
│
├── layouts/            # MainLayout (Header + Main + Footer)
├── data/               # Datos estáticos (projects.js)
└── styles/             # CSS adicional
```

---

## ✨ Características

- **Animaciones fluidas**: Framer Motion con variantes centralizadas
- **UX Mobile-first**: `touch-manipulation`, haptic feedback, `whileTap`
- **Accesibilidad**: `prefers-reduced-motion` respetado
- **Lazy Loading**: Code splitting con `React.lazy` + `Suspense`
- **Glassmorphism**: Cards con `backdrop-blur` y bordes sutiles
- **Paleta 2025**: Deep Cobalt (#0047AB) + Spring Mint (#2BFF88)

---

## ⚠️ Deuda Técnica

| Prioridad | Issue | Solución propuesta |
|-----------|-------|-------------------|
| 🔴 Alta | Sin TypeScript | Migrar a `.tsx` con tipos estrictos |
| 🔴 Alta | Sin tests | Añadir Vitest + React Testing Library |
| 🟡 Media | `react-helmet-async` incompatible con React 19 | Migrar a `@tanstack/react-helmet` o esperar actualización |
| 🟡 Media | Datos hardcodeados | Extraer a CMS headless (Sanity, Strapi) |
| 🟢 Baja | CSS en componentes | Considerar CSS Modules o styled-components |
| 🟢 Baja | Sin i18n | Añadir `react-i18next` si se requiere multiidioma |

---

## 🚀 Deploy

**Vercel** (recomendado):
1. Conectar repo a Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

No se requiere `vercel.json` - Vercel detecta Vite automáticamente.

---

## 📖 Documentación

- **[TECHNICAL_GUIDE.md](./TECHNICAL_GUIDE.md)** - Guía técnica para desarrolladores

---

## 📝 Licencia

MIT © Lucas Gavegno


