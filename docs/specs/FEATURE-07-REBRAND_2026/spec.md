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

---

## Mejoras post-cierre (aplicadas sobre rama main — v3.1.x)

### Tipografía — aplicada en v3.1.1
- `index.html`: fuentes migradas de DM Sans + Syne → Inter (400/500/600) + Space Grotesk (400/500/600/700)
- `tailwind.config.js`: `fontFamily.sans` → Inter, `fontFamily.display` → Space Grotesk
- `index.html`: eliminado atributo `class="dark"` residual del elemento `<html>` (incompatible con light mode)
- Racional: Inter aporta legibilidad neutral en cuerpo largo; Space Grotesk aporta
  carácter geométrico en display sin caer en Syne (excesivamente decorativa para B2B)

### Separadores de sección — pendiente implementación (FEATURE-08)

**Motivación:** Las transiciones abruptas entre secciones de color diferente rompen
el flujo visual. En desktop con pantallas altas, secciones como About (#F1F0E8) se
tornan monótonas al no tener quiebre visual. Para audiencia de agencias de marketing
el diseño debe transmitir emoción, movimiento y glam — no solo estructura.

**Técnica elegida:** SVG inline con `preserveAspectRatio="none"` interpolando entre
el color de la sección superior y el de la sección inferior. Componente reutilizable
`<SectionDivider>` con variantes declarativas.

**Variantes seleccionadas:**

| Variante | Forma | Uso en página |
|----------|-------|---------------|
| `wave` | Onda suave (curva Bézier cúbica) | Transiciones fluidas, bienvenida |
| `bowl` | Arco invertido (curva Q) | Respiro visual en sección media |
| `overlap` | Onda + card flotante | Cierre dramático antes de CTA |

**Mapa de colores real del sitio (auditado 2026-06-17):**

Home (`/` y `/en`):
| # | Sección | bg real |
|---|---------|---------|
| 1 | HeroBanner | `#EEE0C9` (sand) |
| 2 | About | `#F1F0E8` (cream) — sección larga, candidata prioritaria |
| 3 | SkillsGrid | prop `className` dinámica |
| 4 | Services | `#2C3340 → #1a1f28` (navy gradient) |
| 5 | Works | `bg-obsidian` (DT-08-01 pendiente) |
| 6 | BlogPreview | wrapper neutro `container mx-auto` |
| 7 | Contact | `#2C3340 → #1a1f28` (navy gradient) |

Página `/agencias` y `/en/agencies`:
| # | Sección | bg real |
|---|---------|---------|
| 1 | AgenciasHero | `#2C3340` (navy) |
| 2 | AgenciasParaQuien | `#EEE0C9` (sand) |
| 3 | AgenciasColaboracion | `#F1F0E8` (cream) |
| 4 | AgenciasProceso | `#96B6C5` (steel-blue) |
| 5 | AgenciasFAQ | `#EEE0C9` (sand) |
| 6 | AgenciasCTAFinal | `#2C3340` (navy) |

**Ritmo de separadores en /agencias (patrón elegido):**
- AgenciasHero → AgenciasParaQuien: `wave` (navy → sand) — entrada fluida
- AgenciasProceso → AgenciasFAQ: `bowl` (steel-blue → sand) — respiro central
- AgenciasFAQ → AgenciasCTAFinal: `overlap` (sand → navy) — cierre impacto

**Ritmo de separadores en home (patrón elegido):**
- HeroBanner → About: `wave` (sand → cream) — transición suave de apertura
- About → SkillsGrid: `bowl` (cream → según className) — quiebre en sección larga
- SkillsGrid → Services: `wave` (cream/variable → navy) — entrada a zona dark

**Scope FEATURE-08:**
- Nuevo componente: `src/components/ui/SectionDivider.jsx`
- Archivos modificados: `src/pages/AgenciasPage.jsx`, `src/pages/AgenciesPageEN.jsx`, `src/App.jsx`
- No modifica lógica de negocio, i18n, tests ni SEO
- Estado: **pendiente — ver plan.md de FEATURE-08**
