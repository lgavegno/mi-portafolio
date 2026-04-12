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
- [ ] Implementar optimización dinámica para imágenes de ProjectDetail

### Fuentes (Medio Impacto)
- [x] Preload de fuente Inter
- [x] `font-display: swap` para evitar FOIT
- [x] Subset de caracteres (solo latin)

### Preloading (Medio Impacto)
- [x] Preload de rutas críticas
- [ ] Prefetch de secciones below-the-fold
- [x] DNS prefetch para recursos externos

### Compresión (Alto Impacto)
- [-] Instalar `vite-plugin-compression` para gzip/brotli (Delegado nativamente a Vercel Edge)
- [x] Configurar headers de cache en deploy

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

> [!NOTE]
> Tras el refactor de escala tipográfica (v2.1), el CLS debe ser monitoreado con especial atención en Desktop.

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

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

---

## 📝 Notas

- Los warnings de `@tailwind` y `@apply` en el IDE son falsos positivos
- Framer Motion hace tree-shaking automático de features no usadas
- react-icons solo incluye los iconos importados específicamente
- El HMR de Vite no afecta el bundle de producción

---

## 🔧 Fixes aplicados — Sprint 12 (Abril 2026)

| Fix | Descripción | Estado |
|-----|-------------|--------|
| Brotli compression | vite-plugin-compression activado (threshold: 10KB, deleteOriginFile: false) | ✅ |
| Video preload | preload="metadata" en HeroBanner (ya implementado) | ✅ |
| Canvas defer | WireframeGeometry con lazy + Suspense (500ms fallback) | ✅ |
| React Icons | Tree-shaking: 19 archivos con imports correctos (sin wildcard) | ✅ |

---

**Última revisión:** Abril 2026
**Próxima auditoría:** Después de cambios en bundle o assets principales
