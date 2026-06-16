FEATURE-04: Hero Animation — Especificación Técnica
Spec Version: 1.0
Status: Reference / Active
Date: 2026-06-05
Related ADRs: ADR-004 (Feature-based Architecture), ADR-001 (Vite Build Tool)
Owner: Leandro Gavegno (ONGEVAG)

## 1. Propósito (1 oración exacta)
Proveer una experiencia visual de alto impacto (Senior level) sin degradar la performance de la SPA mediante Canvas 2D animado y partículas dinámicas.

## 2. Alcance
### ✅ Incluye
1.  **HeroBanner Component**: Sección landing principal con estructura flexible (contenido + geometría).
2.  **ParticleBackground Engine**: Sistema de renderizado Canvas 2D sincronizado con `requestAnimationFrame` (60fps).
3.  **WireframeGeometry**: Objeto 3D flotante integrado via React.lazy.
4.  **Animations System**: Coordenadas via Framer Motion (staggered entrances) y CSS Keyframes (float/glow).
5.  **Responsive Logic**: Adaptación total (Mobile 1 columna vs Desktop 2 columnas).
6.  **Accessibility**: Respeto estricto a `prefers-reduced-motion`.

### ❌ Excluye
1.  **Three.js**: Rechazado por overhead de bundle (+300KB).
2.  **React.lazy en Canvas**: El background debe ser eager para evitar flash blanco inicial.
3.  **Interactividad Compleja**: No hay hover/click state sobre las partículas individuales (performance cost).

## 3. Requisitos Funcionales
| ID | Requisito | Descripción | Prioridad |
| --- | --- | --- | --- |
| FR-001 | Motor de Partículas | El componente debe generar un sistema de partículas basado en densidad relativa al viewport (fórmula: área / 15000px²). | MUST |
| FR-002 | Geometría 3D Lazy | El objeto 3D debe cargarse bajo demanda (code split) tras el render inicial del Hero. | SHOULD |
| FR-003 | Layout Flexible | El contenedor debe colapsar a 1 columna en `mobile` (<640px) y expandirse a 2 columnas en `desktop` (lg+: 1024px). | MUST |
| FR-004 | Animación de Entrada | El contenido (título, botones, stats) debe entrar secuencialmente usando `variants` de Framer Motion. | MUST |

## 4. Requisitos No-Funcionales
| ID | Requisito | Target |
| --- | --- | --- |
| NFR-001 | Performance (Canvas) | Mantenimiento estable de 60fps. Consumo CPU mínimo (bucle simple de dibujado). |
| NFR-002 | Core Web Vitals | Impacto negativo en LCP: Mínimo (el canvas no bloquea el renderizado del texto crítico). |
| NFR-003 | Accesibilidad | Si el usuario prefiere movimiento reducido, el canvas y la geometría deben estar ocultos o estáticos. |

## 5. Especificación Técnica

### Componentes Afectados
src/
├── features/hero/
│   ├── HeroBanner.jsx          ← Contenedor principal y lógica de estado/layout
│   └── index.jsx               ← Exportación
├── components/
│   ├── ParticleBackground.jsx  ← Motor Canvas (CRÍTICO: Eager import)
│   └── WireframeGeometry.jsx   ← Componente 3D (Lazy import)
├── config/
│   └── motionConfig.js         ← Definición de variantes (fadeInUp, floatInfinite)
└── pages/
    └── index.jsx               ← Donde se monta HeroBanner

### API/Datos (Configuración Interna)
La configuración se maneja internamente para minimizar prop drilling.

// Ejemplo de configuración en ParticleBackground.jsx
const PARTICLE_CONFIG = {
  connectionRadius: 120, // Pixeles para conectar líneas
  baseColor: 'rgba(34, 211, 238, 0.8)', // Cyan-400 Tailwind
  opacity: 0.6, // Opacidad global del canvas
  countFactor: 15000 // Divisor para calcular cantidad de particulas
};

### Flujos Principales

**Flujo A: Inicialización Crítica (Critical Rendering Path)**
1.  Browser carga HTML/CSS.
2.  React inicia render sync.
3.  `HeroBanner` se monta.
4.  `ParticleBackground` se instancia inmediatamente (NO es lazy).
5.  Canvas se pinta (requestAnimationFrame loop arranca).
6.  User ve Hero Banner + Partículas casi instantáneamente.

**Flujo B: Carga Perezosa (Deferment)**
1.  Al detectar fin de hidratación (useEffect), React inicia import de `WireframeGeometry`.
2.  Mientras tanto, el Suspense boundary devuelve `null` o skeleton invisible.
3.  Una vez descargado el chunk JS, el componente aparece con animación `float`.

**Flujo C: Redimensionamiento Dinámico**
1.  Usuario ajusta tamaño ventana.
2.  `ResizeObserver` detecta cambio en dimensions.
3.  Se recalcula `canvas.width/height`.
4.  Se recalcular cantidad de partículas (`count = area / 15000`).
5.  No se destruyen partículas existentes, solo se ajustan límites.

## 6. Criterios de Aceptación
[ ] El hero muestra correctamente el título ONGEVAG con gradiente y badge "Disponible".
[ ] Las partículas se mueven suavemente (conexiones visibles a <120px).
[ ] El WireframeGeometry flota verticalmente (animación infinita).
[ ] En vista Mobile, la columna derecha (geometría) desaparece completamente.
[ ] El botón "Ver proyectos" scrolltea hacia abajo correctamente.
[ ] [DoD] Lighthouse Audit: Performance > 90, LCP < 1.5s.
[ ] [DoD] DevTools Memory: Sin leaks evidentes en el ciclo de vida de resize.

## 7. Consideraciones Especiales

### Rendimiento & Optimizaciones
*   **Canvas Sync**: El bucle de dibujo está vinculado a `requestAnimationFrame` para alinearse a los refresh rates nativos (60hz, 120hz).
*   **Code Splitting**: Se utiliza `React.lazy()` exclusivamente para el componente pesado `WireframeGeometry` (aprox -40KB en bundle inicial). `ParticleBackground` es síncrono para evitar flashes visuales.
*   **Algoritmo**: El algoritmo de conexión entre nodos es O(n^2) limitado por distancia, optimizado manteniendo la densidad de partículas controlada por pantalla (ratio 1 : 15,000 px²).

### Accesibilidad
Se implementa `useMediaQuery` (o MediaController) para escuchar `prefers-reduced-motion`. Si es true, el componente retorna `null` y la geometría detiene su animación CSS keyframe.

### Puntos Frágiles — No Romper

| Punto | Riesgo | Guardrail |
|-------|--------|-----------|
| `scrollToContact` en `HeroBanner.jsx` | Eliminación accidental en refactor → botón "Contactar" roto sin error en consola | Comentario defensivo en código + entrada en CLAUDE.md §Critical Files |
| Imports `motion` en `HeroBanner.jsx` | ESLint stripping silencioso → animaciones desaparecen en producción | Regla `react/jsx-uses-vars: 'error'` en `eslint.config.js` L29 + comentario en imports |
| `ParticleBackground` como eager import | Migración a `React.lazy` → flash blanco en LCP crítico | Documentado en §2 Excluye; NO usar `React.lazy` aquí nunca |

### Valores reales en producción (post-auditoría 2026-06-13)

| Variable | Valor en spec | Valor real en código | Estado |
|----------|--------------|----------------------|--------|
| `fadeInUp.transition` | `springConfig.snappy` | `springConfig.smooth` | Cambio intencional (entrada más lenta) |
| `staggerContainer.staggerChildren` | `0.07` | `0.25` | Cambio intencional (más espaciado) |
| `staggerContainer.delayChildren` | `0.05` | `0.1` | Cambio intencional |
| Suspense `fallback` | `null` | `<div className="w-64 h-64" />` | Mejora layout stability (aceptable) |

## 8. Referencias
[design-tokens.md](./design-tokens.md): Paleta de colores (Cyan institutional) y tipografías.
[motionConfig.js](../../../src/config/motionConfig.js): Presets de animación usados.
[CLAUDE.md](../../CLAUDE.md): Stack técnico actualizado.
[SDD_MASTER.md](../SDD_MASTER.md): Ubicación del módulo en la arquitectura.

Próximo paso: Actualizar BITACORA_TECNICA.md tras refactorización o revisión.