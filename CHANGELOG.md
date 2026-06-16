# CHANGELOG

Historial de cambios del proyecto Ongevag Portfolio. Formato: [Keep a Changelog](https://keepachangelog.com).

---
## [Unreleased]

---

## [3.1.0] — 2026-06-16

### Added
- EPIC-07: Rebrand Visual 2026 — migración completa a light mode
- Paleta pastel B2B: cream (#F1F0E8), sand (#EEE0C9), mist-blue (#ADC4CE), steel-blue (#96B6C5), navy (#2C3340)
- Página /agencias rediseñada con arquitectura de secciones alternadas claro/oscuro
- ADR-012: documentación del rebrand visual

### Changed
- tailwind.config.js: paleta cobalt/mint/cyan → paleta rebrand 2026
- Header, Footer, About, SkillsGrid, HeroBanner, Contact, Services migrados a light mode
- AgenciasHero/ParaQuien/Colaboracion/Proceso/FAQ/CTAFinal: colores y secciones actualizadas
- BlogPreview, BlogComponents, BlogPostDetail: textos invisibles corregidos

### Removed
- ParticleBackground eliminado de HeroBanner (performance + incompatibilidad visual light mode)
- NeuralNetworkBackground.jsx, GlowButton.jsx, Card3DEffect.css, AnalyticsCard.jsx — archivos obsoletos
- SECURITY_AUDIT_REPORT_2026_05_13.md — documento obsoleto

### Security
- Todos los textos CRÍTICOS con ratio < 2:1 corregidos (WCAG AA compliance)

### Tech Debt
- DT-08-01: Works.jsx — ProjectCard dark mode pendiente migración completa
- DT-08-02: ProjectDetail.jsx — página completa pendiente migración
- DT-08-03: Issues MEDIO del audit de contraste pendientes

## [3.0.0] — 2026-06-16

### Added
- FEATURE-06: página /agencias y /en/agencies (partners y agencias)
- FEATURE-06: stagger animation en ProjectCard al hacer scroll

### Fixed
- Rutas /es/* fantasma en sitemap (SEO crítico — Googlebot recibía 404s)
- 14 tests fallando en Contact.test.jsx (causa raíz: projectType ausente en validateForm)
- CVE HIGH dompurify@3.4.8 — actualizado
- Eliminados 3 assets .webp sin referencias (faroart2, generador2, omnistock2)

### Security
- vitest actualizado de 1.6.1 a 4.1.9 — resuelve CVE CVSS 9.8

### Chores
- Eliminado MEMORY.md no autorizado generado por Claude Code
- Actualizado .claudeignore para prevenir regeneración
- Documentación actualizada: CLAUDE.md, SDD_MASTER, BITACORA, AUDIT_2026-06-15

## [2.5.1] — 2026-06-15

### Fixed
- generate-sitemap.js: eliminadas rutas fantasma /es/* (no existen en el router)
  — sitemap regenerado con 26 URLs correctas: ES sin prefijo + EN con /en/
- Contact.test.jsx: 14 tests fallando → 71/71 passing
  — fillValidForm() helper con selectOptions() para projectType requerido
  — emailjs.send: params corregidos (faltaba project_type)
  — Button loading: tests actualizados para detectar `<Spinner>` SVG en lugar
    de texto (Button renderiza SVG cuando loading=true, no children)
- dompurify 3.4.8 → 3.4.9 (CVE HIGH: GHSA-vxr8-fq34-vvx9)

### Changed
- CLAUDE.md: Current Phase → FEATURE-04_HERO_ANIMATION, Module Index y ADRs
  actualizados para reflejar estado real
- docs/SDD_MASTER.md: FEATURE-03 Done, FEATURE-06 registrado, ADR-008/009
  desreservados, paths corregidos

### Removed
- omnistock2.webp, faroart2.webp, generador2.webp (sin referencias en codebase)

### Security
- dompurify: 3.4.8 → 3.4.9

### Deferred
- vitest@1.6.1 CVE CVSS 9.8: upgrade bloqueado por compatibilidad React 19 —
  sprint separado
- DT-05-02: ProjectDetail locale-aware — feature separada
- og:locale hardcoded — PR menor pendiente

---

## [2.5.0] — 2026-06-11

### Added
- `public/robots.txt`: reglas explícitas para GPTBot, ClaudeBot, PerplexityBot, Google-Extended; sitemap URL → `www.ongevag.com`
- `public/llms.txt`: contexto estructurado para LLMs (7 secciones, inglés, conversión internacional)
- `index.html`: JSON-LD `Organization`, `Person`, `ProfessionalService` (`areaServed: "Worldwide"`)
- `ProjectDetail.jsx`: JSON-LD `SoftwareApplication` dinámico vía Helmet por cada proyecto
- `Services.jsx`: JSON-LD `FAQPage` con 5 preguntas orientadas a conversión vía Helmet
- Blog ES: 6 posts traducidos al español en `blogData.es.js` (slugs inmutables)
- SkillsGrid: animación stagger izquierda→derecha con Framer Motion
- ESLint: regla `jsx-uses-vars` para reconocer `motion.` como uso válido
- ESLint: globals de vitest configurados para archivos de test
- vitest.config.js: fix `__dirname` en contexto ESM con `fileURLToPath`

### Changed
- `scripts/generate-sitemap.js`: `lastmod` ahora dinámico (`new Date()` en lugar de fecha hardcodeada)
- ProjectCard: animación entrada izquierda/derecha alternada por index
- Works: grid wrapper de `motion.div` a `div` estático para stagger correcto
- App.jsx: 4 imports estáticos → lazy() — bundle 363KB→233KB (-35%)
- motionConfig.js: staggerChildren 0.07 → 0.05 (más fluido)
- Hero CTA secundario: restaurado a scroll interno `#contacto` con i18n EN/ES
- react-router-dom: 7.11.0 → 7.17.0 (patch 9 CVEs)
- dompurify: 3.3.3 → 3.4.8 (patch 4 CVEs XSS/Prototype Pollution)

### Fixed
- motion import faltante en 22 archivos JSX (ReferenceError en producción)
- scrollToContact no definida en HeroBanner (ReferenceError en producción)
- Imports duplicados de framer-motion consolidados en 5 archivos

## [2.4.2] — Abril 2026

### Removed
- Botón "Descargar CV" del header desktop
- Botón "Descargar CV" del hero mobile (lg:hidden)
- Archivo PDF `CV_LeandroGavegno-04-26.pdf` del repositorio
- FiDownload icon import de HeroBanner

### Changed
- Hero CTA buttons: ahora solo "Ver Proyectos" y "Contactar" (mobile + desktop)
- Header: perfil de LinkedIn como punto de contacto principal en lugar del CV

---

## [2.4.0] — Abril 2026

### Added
- favicon.svg — ícono del nodo Ongevag en tabs del navegador
- og-image.svg 1200x630 para previews en redes sociales (LinkedIn, Twitter, etc.)
- ShareButton visible en mobile al pie de cada post del blog
- vercel.json con rewrites para SPA routing (fix 404 en rutas directas)
- src/docs/MOD-02-HERO.md — spec completo del módulo hero

### Changed
- BlogPostDetail: bloques de código con `overflow-x-auto` y estilos responsive en mobile
- BlogPostDetail: tablas con scroll horizontal en mobile
- Botón "Contactarme" en blog: agregado `text-white` para mejor contraste
- Fuente tipográfica: DM Sans integrada al sistema

### Removed
- Bloque autor "Gemini AI / IA Collaborator" de BlogPostDetail
- Import `gemini-avatar.webp` eliminado del proyecto
- Archivo `src/assets/gemini-avatar.webp`
- Botones sociales sin funcionalidad (<> >_) del blog

---

## [2.3.0] — Abril 2026

### Added
- ParticleBackground.jsx — sistema de partículas canvas con conexiones dinámicas, respeta prefers-reduced-motion
- Badge animado "Disponible para proyectos" en hero
- Stats hero: 4+ Proyectos / PyME Foco
- Fuente DM Sans cargada via Google Fonts

### Changed
- Hero fondo: negro puro → gradiente slate profundo con glows cyan e índigo
- Título ONGEVAG: gradiente cyan→indigo en letras "GE", responsive text-[36px]→7xl
- Botones hero: rectangulares → pill style con gradiente
- Logo header: imagen .webp → SVG inline adaptativo al fondo oscuro
- WireframeGeometry: liberada del marco cuadrado con borde

### Removed
- Video de fondo (public/videos/ongevagDesign.mp4) — reemplazado por ParticleBackground
- og-image.jpg de public/ — meta tag actualizada

---

## [Unreleased] — Sprint SDD Foundation — Abril 2026

### Added
- CLAUDE.md — contexto técnico del proyecto para colaboración IA/devs
- CONTRIBUTING.md — guía de flujo de trabajo, commits y convenciones
- CHANGELOG.md — historial de versiones (migrado desde PROJECT_LOG.md)
- src/docs/PRD.md — requisitos y objetivos del producto
- src/docs/adr/ADR-001.md — decisión: Vite como build tool
- src/docs/adr/ADR-002.md — decisión: JavaScript sin TypeScript
- src/docs/adr/ADR-003.md — decisión: EmailJS sin backend
- src/docs/adr/ADR-004.md — decisión: arquitectura feature-based
- src/docs/DESIGN_TOKENS.md — sistema de diseño documentado (40+ tokens)
- src/docs/MOD-01-PROJECTS.md — spec del módulo de proyectos
- src/docs/COMPONENT-TREE.md — árbol de componentes actualizado a v2.1
- src/docs/PERFORMANCE.md — estrategia de performance
- src/docs/AUDIT_REPORT.md — health report inicial (Score: 6.8/10)
- .prettierrc — configuración de formateo de código
- jsconfig.json — path aliases para el editor
- Proyecto: OmniStock — inventario desktop (Tauri, React, Rust, SQLite)
- Proyecto: Faro Art Shop — tienda online en producción (faroartshop.com)
- Proyecto: Generador de Presupuestos — serverless con Google Sheets
- Proyecto: form-invent — sistema de inventario Excel con VBA
- Assets: screenshots de omnistock, faro-art-shop, generador-presupuestos

### Changed
- README.md — reescrito con información precisa y actualizada
- vite.config.js — path aliases configurados (@components, @features, etc.)
- src/data/projects.js — 5 proyectos reales (era 4 con placeholders)
- src/components/About.jsx — profile-about.png → profile-about.webp
- src/pages/BlogPostDetail.jsx — gemini-avatar.png → gemini-avatar.webp
- src/features/hero/HeroBanner.jsx — CV actualizado a versión 04-26
- src/components/Header.jsx — CV actualizado a versión 04-26
- public/CV_LeandroGavegno.pdf → CV_LeandroGavegno-04-26.pdf
- Fitness App — imágenes reales + link a informe técnico en Notion
- Documentación consolidada en src/docs/ — fuente de verdad única

### Removed
- Proyecto: sistema-reservas (placeholder sin link real)
- Proyecto: sistema-gestion — ERP Java abandonado
- Proyecto: procesamiento-documentos (placeholder sin link real)
- ARCHITECTURE.md — migrado a CLAUDE.md + src/docs/adr/
- TECHNICAL_GUIDE.md — migrado a CLAUDE.md + CONTRIBUTING.md
- PROJECT_LOG.md — migrado a CHANGELOG.md
- COMPONENT-TREE.md (raíz) — movido a src/docs/
- public/CV_LeandroGavegno.pdf — reemplazado por versión 04-26
- src/assets/profile-about.png — reemplazado por .webp

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
