# MOD-00 — Visión General del Sistema

**Módulo ID:** MOD-00 (Visión general)
**Estado:** ✅ Documentado
**Última revisión:** 2026-05-13
**Audiencia:** Developers, recruiters, auditors técnicos

---

## 0. Nota de actualización (2026-08-25)

Este documento describe el estado del sistema en su revisión de 2026-05-13 y no fue reescrito en iteraciones posteriores. Puntos ya no vigentes, corregidos aquí puntualmente:

- El diagrama de rutas (§3) omite `/en`, `/pt` y `agencias` — el routing real vive en `src/App.jsx` (ver FEATURE-01_I18N_ROUTING).
- El "Flujo 4" y la sección de Performance (§6) mencionan un prefetch de chunks del Blog tras 3s de idle — ese mecanismo **no existe** en el código (`grep -rn "prefetch" src/` no devuelve resultados); ver corrección más abajo.
- Tests: hay suite Vitest activa (ya no "0% coverage", ver §6 Mantenibilidad).
- Lighthouse: la auditoría de Phase 4 mencionada en §7 ya se realizó — ver `CLAUDE.md` (Desktop 98/100/100/94) y `docs/AUDIT_2026-06-15.md` / `docs/AUDIT_2026-08-24.md`.
- Para el estado y stack actuales, `CLAUDE.md` (raíz del repo) es la fuente de verdad.

---

## 1. Propósito (1 oración exacta)

**Crear un portfolio SPA que showcase de skills en React, arquitectura, performance y UX — para captar clientes PyMEs.**

---

## 2. Alcance

### ✅ Incluye
- Landing page SPA con 7 secciones principales (hero, about, skills, services, works, blog, contact)
- Blog estático con posts y navegación
- Formulario de contacto funcional (EmailJS backend)
- Optimización de performance (code splitting, lazy loading, compresión)
- Animaciones complejas (Framer Motion)
- SEO básico (React Helmet)
- Responsive design (Tailwind CSS)
- Deployment automático (Vercel)

### ❌ Excluye
- Backend/API (excepto EmailJS)
- Sistema de usuarios o autenticación
- CMS o panel administrativo
- E-commerce integrado
- PWA/offline support
- SSR o SSG

---

## 3. Diseño del Sistema

### Arquitectura de alto nivel

```
User Request (Browser)
        │
        ▼
┌──────────────────────────────────────────────────────┐
│              React Router (SPA)                       │
│  Routes (x3 locale prefixes: /, /en, /pt):            │
│  index | proyecto/:id | agencias | blog | blog/:slug  │
└──────────────────┬───────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────────┐      ┌────▼──────────┐
    │ MainLayout │      │ BlogLayout    │
    │  (Home)    │      │ (Blog)        │
    └───┬────────┘      └───┬───────────┘
        │                   │
        │ Renders:          │ Renders:
        │ HomeSections      │ BlogIndex / BlogPostDetail
        │ (AnimatedSection) │
        │                   │
    ┌───▼─────────────────┐─▼──────────────┐
    │  6 Features:        │ BlogPreview    │
    │  1. Hero            │ (lazy-loaded)  │
    │  2. About           │                │
    │  3. Skills          │ Data:          │
    │  4. Services        │ blogData.js    │
    │  5. Works           │ projects.js    │
    │  6. Contact         │                │
    └─────────────────────┴────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│   UI Kit Global (components/)                   │
│   • Button, GlowButton, Header, Footer, etc.   │
│   • Shared logic: Skeleton, ShareButton, etc.  │
└─────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│   External Services & Libraries                 │
│   • EmailJS (Contact form → email)             │
│   • Framer Motion (Animations)                 │
│   • Tailwind CSS (Styling)                     │
│   • React Icons (Icons)                        │
│   • React Helmet (SEO meta tags)              │
└─────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│   Vite Build Tool                               │
│   • Dev: HMR (<100ms), port 5173               │
│   • Prod: Optimized chunks, Brotli compression │
└─────────────────────────────────────────────────┘
        │
        ▼
    Vercel CDN
```

### Decisiones de diseño clave

| Decisión | Razón | Trade-off |
|----------|-------|-----------|
| **SPA (sin SSR)** | Portfolio no necesita SSR para SEO inicial | Menor performance en mobile lento |
| **Blog estático (no CMS)** | Simplifica deploy, no requiere backend | Requiere git commit para nuevo post |
| **EmailJS sin backend** | Funciona desde browser, sin infraestructura | Límite de emails/mes, sin control de datos |
| **Lazy loading de features** | Reduce LCP, mejora performance | Pequeño delay en navegación |
| **Feature-based architecture** | Escalabilidad, mantenibilidad | Cierta duplicación de patrones |

---

## 4. Flujos Principales

### Flujo 1: Navigation (SPA)
```
User clicks link → React Router intercepts
    → Renders new component (lazy-loaded si aplica)
    → Framer Motion animates transition
    → Page content loads (Suspense → Skeleton while loading)
    → Route-specific data loaded (sync from blogData.js o projects.js)
```

### Flujo 2: Contact Form Submission
```
User fills form → Validation (name, email, message)
    → Click "Enviar" button
    → EmailJS.send() called
    → Status: SENDING (loading state)
    → Response received
    → Status: SUCCESS or ERROR
    → Toast notification
    → Form cleared (si success)
```

### Flujo 3: Blog Post Rendering
```
User visits /blog/:slug → BlogPostDetail.jsx rendered
    → Finds post in blogData.js
    → Renders HTML (sanitized with DOMPurify)
    → Framer Motion animates entry
    → ShareButton available (LinkedIn, WhatsApp, email, copy)
```

### Flujo 4: Performance / Code Splitting
```
On app load:
    → Load main bundle (App.jsx, Router, Layouts)
    → Render Hero immediately (HeroBanner static import)
    → Lazy-load other features (About, Services, Works, etc.)
    → On /blog route: load BlogIndex chunk
    → Vite generates: vendor.js, ui.js, main.js
    → Brotli compresses all outputs
```

---

## 5. Componentes Involucrados

| Archivo | Rol | Status |
|---------|-----|--------|
| `src/App.jsx` | Root routing y lazy-load strategy | ✅ Done |
| `src/main.jsx` | React 19 entry point | ✅ Done |
| `src/layouts/MainLayout.jsx` | Layout principal (Header + Footer) | ✅ Done |
| `src/layouts/BlogLayout.jsx` | Layout blog (diferente header) | ✅ Done |
| `src/features/hero/HeroBanner.jsx` | **Sección principal (hero + todas secciones)** | ✅ Done |
| `src/features/contact/Contact.jsx` | Formulario EmailJS | ⚠️ Testing needed |
| `src/features/blog/components/BlogPreview.jsx` | Preview en home | ✅ Done |
| `src/pages/BlogIndex.jsx` | Índice de posts | ✅ Done |
| `src/pages/BlogPostDetail.jsx` | Detalle de post | ✅ Done |
| `src/pages/ProjectDetail.jsx` | Detalle de proyecto | ✅ Done |
| `src/components/ui/Button.jsx` | Button base | ✅ Done |
| `src/components/ui/GlowButton.jsx` | CTA button con glow | ✅ Done |
| `src/components/ui/ShareButton.jsx` | Compartir post | ✅ Done |
| `src/config/motionConfig.js` | **Variantes Framer Motion** | ✅ Done |

---

## 6. Consideraciones Técnicas

### Performance

**Optimizaciones implementadas:**
- ✅ Code splitting automático (Vite)
- ✅ Lazy loading de componentes (React.lazy + Suspense)
- ✅ Image optimization (vite-imagetools)
- ✅ CSS code splitting (Tailwind)
- ✅ Brotli compression (vite-plugin-compression)

**Targets Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): 0 (no layout shift)

Baseline de Lighthouse: ya auditado — ver `CLAUDE.md` (Desktop 98/100/100/94, Mobile Slow 4G 61/100/100/94, 2026-06-18).

---

### Seguridad

**Implementado:**
- ✅ XSS prevention: DOMPurify en blog posts HTML
- ✅ CSRF prevention: EmailJS maneja token
- ✅ No secrets en repo: .env excluded from git
- ✅ CSP ready: Vite generates CSP headers

**[INFERIDO]** No hay rate limiting en ContactForm (TODO: si volumen alto, implementar)

---

### Escalabilidad

**Diseño escalable:**
- ✅ Feature-based architecture: agregar feature = agregar carpeta en /features
- ✅ Modular UI Kit: componentes reutilizables en /components/ui
- ⚠️ Blog estático: agregar post = agregar entrada en blogData.js
  - **Límite:** ~100 posts antes de considerar CMS

**Recomendaciones de escala:**
- **>6 features activas:** considerar monorepo
- **>100 blog posts:** migrar a CMS (Contentful, Strapi)
- **>1000 contactos/mes:** implementar backend para logs/analytics

---

### Mantenibilidad

**Buenas prácticas implementadas:**
- ✅ Naming consistente (features/, components/, layouts/)
- ✅ Aliased imports (@components, @features, etc.)
- ✅ ESLint configurado (React Hooks, React Refresh)
- ✅ Motions centralizadas (config/motionConfig.js)
- ✅ ADRs documentadas (decisiones justificadas)

**Mejoras pendientes:**
- ✅ Tests: suite Vitest activa (Contact, useLocale, experience) — ya no 0% coverage
- ⚠️ MOD-01 a MOD-06 documentación de features individuales
- ⚠️ Contact.jsx requiere refactor de hooks

---

## 7. Definition of Done

Para considerar MOD-00 (visión general) como **HECHO**, validar:

- ✅ Arquitectura documentada (este archivo)
- ✅ Flujos principales especificados (arriba)
- ✅ Decisiones técnicas justificadas
- ✅ Componentes listados y responsabilidades claras
- ✅ Consideraciones de performance/security/escalabilidad descritas
- ⏳ **Phase 2:** Todos flujos con UC/SEQ completos
- ⏳ **Phase 2:** >70% test coverage
- ⏳ **Phase 4:** Lighthouse audit completado

---

## Links útiles

- [SDD_MASTER.md](./SDD_MASTER.md) — Índice central de módulos
- [ADR-001](./adr/ADR-001.md) — Vite como build tool
- [ADR-004](./adr/ADR-004.md) — Feature-based architecture
- [CLAUDE.md](../CLAUDE.md) — Contexto para AI (stack, comandos, archivos críticos)
- [BITACORA_TECNICA.md](../BITACORA_TECNICA.md) — Historial de sesiones

---

**Próximo paso:** Crear MOD-01 (documentación feature Hero) y UC-01 (Contact Form submission)
