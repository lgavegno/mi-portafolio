# CHANGELOG

Historial de cambios del proyecto Ongevag Studio Portfolio. Formato: [Keep a Changelog](https://keepachangelog.com).

---

## [Unreleased] — Sprint SDD Foundation

### Added
- **CLAUDE.md** — contexto del proyecto para colaboración técnica
- **src/docs/PRD.md** — requisitos del producto y roadmap
- **src/docs/adr/ADR-001 a ADR-004** — decisiones arquitectónicas documentadas (Vite, JavaScript puro, EmailJS, Feature-Based)
- **src/docs/DESIGN_TOKENS.md** — sistema de diseño con paleta de colores y motion config
- **CONTRIBUTING.md** — guía de flujo de trabajo, convenciones de commits y checklist
- **AUDIT_REPORT.md** — health report inicial del proyecto (Score: 6.8/10)

---

## [2.1.0] — Febrero 2026

### Added
- **PERFORMANCE_CHECKLIST.md** — métricas de performance y checklist prerelease
- **.cursorrules** — protocolo de ingeniería senior para IA y colaboradores

### Changed
- **Sistema tipográfico universal** — refactor de escala tipográfica (base: 1.05rem, títulos: 4xl-6xl) con paleta Slate para reducir fatiga visual
- **Navegación dinámica de proyectos** — rutas paramétrizadas `/proyecto/:id` con component `ProjectDetail.jsx`
- **Motion Config** — ajuste de constantes de stagger (0.07s) y blur (4px) para mayor fluidez
- **README.md** — rewrite completo con enfoque arquitectónico (feature-based, DDD Light)

### Fixed
- Compilación de dependencias circulares en PostCSS
- Eliminación de `console.log` de debug en `Contact.jsx` que exponía credenciales de EmailJS en producción

---

## [2.0.0] — Enero 2026

### Added
- **ARCHITECTURE.md** — documentación de arquitectura feature-based y decisiones técnicas
- **TECHNICAL_GUIDE.md** — guía técnica interna para desarrollo

### Changed
- **Alineación visual del Hero** — texto "ONGEVAG" alineado con logo del navbar (`text-left lg:pl-0`)
- **Reducción de espaciado** — gap entre columnas de hero reducido de `gap-12 lg:gap-20` a `gap-8 lg:gap-12`
- **Marco cyan para figura 3D** — envolvimiento de `WireframeGeometry` con border cyan y glow, animación flotante (`y: [0, -10, 0]`)

### Fixed
- Validación de atributos `loading` en imágenes (lazy en thumbnails, eager en hero)
- Aislamiento de estilos 3D en `Services3DCarousel.css` con reglas `!important`

---

## [1.0.0] — Diciembre 2025

### Added
- Portfolio SPA inicial con React 19 + Vite
- Feature-based architecture (hero, blog, contact, services, works, analytics)
- Framer Motion para animaciones complejas
- Tailwind CSS para styling
- React Router para navegación
- EmailJS para formulario de contacto sin backend
- React Icons para iconografía SVG
- Compresión automática de assets (gzip/brotli)

### Notes
- Baseline del proyecto pre-SDD
