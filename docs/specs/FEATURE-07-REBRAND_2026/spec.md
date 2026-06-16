---
status: done
epic: EPIC-rebrand-2026
feature_id: EPIC-07
created: 2026-06-16
completed: 2026-06-16
branch: epic/rebrand-2026
adr: ADR-012
---

# SPEC: Epic Rebrand Visual 2026

## Objetivo
Migración completa del portfolio de dark mode (paleta cobalt/mint/cyan neón)
a light mode con paleta pastel B2B orientada a audiencia de agencias de diseño
y estudios creativos.

## Motivación
El portfolio oscuro con colores eléctricos no transmitía sensibilidad estética
a la audiencia objetivo (agencias, estudios de branding, diseñadores). La nueva
paleta pastel + secciones navy de alto contraste comunica autoridad y gusto
visual simultáneamente.

## Paleta adoptada

| Token | HEX | Uso |
|-------|-----|-----|
| cream | #F1F0E8 | Fondo general, textos sobre dark |
| sand | #EEE0C9 | Fondos cálidos de sección |
| mist-blue | #ADC4CE | Acentos claros, badges, bordes suaves |
| steel-blue | #96B6C5 | Acentos oscuros, viñetas decorativas |
| navy | #2C3340 | Fondos dark intencionales, botones CTA |
| navy-deep | #1a1f28 | Gradientes oscuros |
| slate | #4B5563 | Texto secundario sobre fondos claros |

## Paleta eliminada
cobalt-500 (#0047AB), mint-400 (#2BFF88), cyan-institutional (#00FFFF),
obsidian (#000000), slate-950 (#0d1117)

## Scope

### IN — archivos modificados
- tailwind.config.js — reemplazo completo de paleta
- src/layouts/MainLayout.jsx
- src/components/Header.jsx
- src/components/About.jsx
- src/components/Footer.jsx
- src/components/SkillsGrid.jsx
- src/components/WireframeGeometry.jsx
- src/components/ui/Button.jsx
- src/features/hero/HeroBanner.jsx (eliminado ParticleBackground)
- src/features/services/Services.jsx
- src/features/services/Services3DCarousel.css
- src/features/contact/Contact.jsx
- src/features/works/Works.jsx (dark intencional → navy rebrand)
- src/features/agencias/* (6 componentes — rediseño completo)
- src/features/blog/components/BlogPreview.jsx
- src/features/blog/components/BlogComponents.jsx
- src/pages/BlogPostDetail.jsx

### OUT — no modificado en esta epic
- Lógica de negocio, hooks, i18n, animaciones Framer Motion
- Tests (71/71 mantenidos)
- Routing, SEO, Schema.org

## Secciones dark intencionales (navy #2C3340)
Hero de /agencias, CTA final de /agencias, Contact, Footer, Services carousel

## Deuda técnica generada

| ID | Descripción | Prioridad |
|----|-------------|-----------|
| DT-08-01 | Works.jsx — ProjectCard con bg-obsidian, pendiente migración completa | MEDIO |
| DT-08-02 | ProjectDetail.jsx — página completa bg-obsidian, pendiente migración | MEDIO |
| DT-08-03 | Issues MEDIO del audit de contraste — #96B6C5 como texto falla AA | BAJO |

## Criterios de aceptación
- [x] Build verde (npm run build)
- [x] 71/71 tests passing
- [x] Ningún text-white visible sobre fondo claro
- [x] Ningún bg-slate-950/bg-obsidian sin migrar en secciones principales
- [x] ADR-012 documentado
- [x] BITACORA actualizada
