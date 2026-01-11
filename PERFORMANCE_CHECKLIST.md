# 🚀 Performance Checklist - Portafolio 2025

## Objetivo: Lighthouse 95+ Mobile, 100 Desktop | Carga < 2s en 3G

---

## ✅ Implementado

### Code Splitting & Lazy Loading
- [x] `React.lazy()` para todas las secciones principales
- [x] `Suspense` con `SkeletonPage` como fallback
- [x] Vendor chunks separados (react, framer-motion, react-icons)
- [x] CSS code splitting habilitado

### Optimización de Bundle
- [x] Minificación con esbuild (más rápido que terser)
- [x] Target `esnext` para mejor tree-shaking
- [x] Chunks con hash para cache busting
- [x] Eliminación de console.log en producción

### Animaciones Optimizadas
- [x] Configuración global de Framer Motion (`motionConfig.js`)
- [x] Hook `useReducedMotion` para accesibilidad
- [x] Animaciones con `will-change` implícito de Framer Motion
- [x] Spring animations en lugar de duration-based

### Accesibilidad
- [x] `prefers-reduced-motion` respetado
- [x] Focus states visibles
- [x] ARIA labels en botones e iconos
- [x] Contraste de colores adecuado

### Optimización Reciente (Mobile & LCP)
- [x] Optimización de LCP mediante carga estática del Hero
- [x] Implementación de inercia táctil para móviles
- [x] Lazy loading de componentes pesados (WireframeGeometry)
- [x] Reorganización de assets estáticos (logos a src/assets)

---

## 📋 Pendiente de Implementar

### Imágenes (Alto Impacto)
- [x] Convertir imágenes a WebP/AVIF
- [ ] Implementar `srcset` para responsive images
- [x] Añadir `loading="lazy"` a todas las imágenes
- [ ] Placeholder blur durante carga
- [x] Optimizar con `vite-imagetools` o similar

### Fuentes (Medio Impacto)
- [ ] Preload de fuente Inter
- [ ] `font-display: swap` para evitar FOIT
- [ ] Subset de caracteres (solo latin)

### Preloading (Medio Impacto)
- [ ] Preload de rutas críticas
- [ ] Prefetch de secciones below-the-fold
- [ ] DNS prefetch para recursos externos

### Compresión (Alto Impacto)
- [ ] Instalar `vite-plugin-compression` para gzip/brotli
- [ ] Configurar headers de cache en deploy

---

## 🧪 Scripts de Prueba

### Lighthouse CLI
```bash
# Instalar Lighthouse
npm install -g lighthouse

# Ejecutar auditoría en modo mobile
lighthouse http://localhost:5173 --view --preset=perf --emulated-form-factor=mobile

# Ejecutar auditoría en modo desktop
lighthouse http://localhost:5173 --view --preset=perf --emulated-form-factor=desktop

# Generar reporte JSON
lighthouse http://localhost:5173 --output=json --output-path=./lighthouse-report.json
```

### Bundle Analyzer
```bash
# Instalar visualizer
npm install -D rollup-plugin-visualizer

# Añadir a vite.config.js:
# import { visualizer } from 'rollup-plugin-visualizer';
# plugins: [react(), visualizer({ open: true })]

# Ejecutar build y ver reporte
npm run build
```

### Web Vitals en Consola
```javascript
// Añadir a main.jsx para debugging
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
onFCP(console.log);
onTTFB(console.log);
```

---

## 📊 Métricas Objetivo

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **FCP** | < 1.8s | First Contentful Paint |
| **TTI** | < 3.8s | Time to Interactive |
| **TBT** | < 200ms | Total Blocking Time |

---

## 🖼️ Guía de Optimización de Imágenes

### Formatos Recomendados
```
AVIF > WebP > JPEG (para fotos)
SVG > PNG (para iconos/logos)
```

### Tamaños Recomendados
```
Hero images: max 1920px width, quality 80%
Project cards: max 800px width, quality 75%
Thumbnails: max 400px width, quality 70%
```

### Herramientas
- **Squoosh** (web): https://squoosh.app
- **Sharp** (Node.js): `npm install sharp`
- **ImageMagick** (CLI): `convert input.jpg -resize 800x -quality 75 output.webp`

### Implementación con srcset
```jsx
<img
  src="/images/project-800.webp"
  srcSet="
    /images/project-400.webp 400w,
    /images/project-800.webp 800w,
    /images/project-1200.webp 1200w
  "
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  loading="lazy"
  alt="Descripción del proyecto"
/>
```

---

## 📦 Estimación de Bundle Size

### Actual (sin optimizar)
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

### Objetivo
```
Total: < 200KB gzipped (cumplido ✅)
```

---

## 🔄 Plan de Implementación por Fases

### Fase 1: Crítico (Semana 1)
1. Optimizar imágenes existentes
2. Añadir preload de fuentes
3. Configurar compresión gzip/brotli

### Fase 2: Mejoras (Semana 2)
1. Implementar srcset responsive
2. Añadir placeholder blur
3. Prefetch de rutas

### Fase 3: Pulido (Semana 3)
1. Auditoría Lighthouse completa
2. Ajustes finos de animaciones
3. Testing en dispositivos reales

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Análisis de bundle (después de configurar visualizer)
npm run build -- --mode analyze

# Lint
npm run lint
```

---

## 📝 Notas

- Los warnings de `@tailwind` y `@apply` en el IDE son falsos positivos
- Framer Motion hace tree-shaking automático de features no usadas
- react-icons solo incluye los iconos importados específicamente
- El HMR de Vite no afecta el bundle de producción
