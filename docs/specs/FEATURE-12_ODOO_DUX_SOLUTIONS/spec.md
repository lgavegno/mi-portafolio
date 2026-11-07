# FEATURE-12: Soluciones de gestión (Odoo / Dux)
**Spec Version:** 1.0
**Status:** Approved — 2026-11-07 (Leo aprobó los defaults de Q1–Q8)
**Date:** 2026-11-07
**Rama Git:** `feature/odoo-dux-solutions` (desde `develop`)
**Related ADRs:** ADR-004 (feature-based), ADR-006/011 (URL i18n), ADR-008 (og:image PNG), ADR-010 (sin lib i18n), ADR-012 (rebrand), ADR-013/014 (PT + marcador de revisión) · **Nuevo propuesto:** ADR-015 (ver §15)
**Owner:** Leandro Gavegno

> **Nota de confidencialidad.** El repo es **público** en GitHub. Esta spec no nombra al partner
> implementador ni detalla el acuerdo comercial; esos datos viven en el brief privado. Ver §14 (Q5).

---

## 0. Contexto

ONGEVAG suma un servicio nuevo, **"Sistemas de gestión"**, basado en dos productos de terceros:
**Odoo** (ERP modular para distribuidoras, industria y empresas en crecimiento) y **Dux Software**
(gestión en la nube para comercios). ONGEVAG **no implementa**: Leo es el primer contacto, escucha,
orienta y **deriva** a un equipo especializado (el partner implementador), que releva, cotiza e
implementa.

El partner autorizó publicar una versión reducida de su presentación comercial, **sin ningún dato
propio**. Requisito de negocio crítico: cada contacto que llega por WhatsApp debe poder atribuirse
a un camino (Odoo/Dux) y a un slide, para respaldar cada derivación ante el partner.

**Fuente de contenido:** presentación original del partner (27 slides), usada como referencia de
textos. No se copia su HTML/CSS. Ruta local prevista: `docs/reference/` (archivo HTML de la presentación)
(fuera de git, ver Q5).

---

## 1. Propósito

Presentar Odoo y Dux dentro de ongevag.com como un servicio de orientación y derivación, con URLs
compartibles y atribución de cada lead por camino y slide.

---

## 2. Alcance

### ✅ Incluye
- **Franja de dos puertas** dentro de `HeroBanner` (debajo de los CTA), que abre la presentación sin salir de la home.
- **Sección `#soluciones`** en la home, cargada bajo demanda, con switch Odoo/Dux y carrusel.
- **Carrusel por capítulos**: 7 slides Odoo + 5 slides Dux, capítulos con nombre, barra de progreso, flechas, swipe y teclado, sin autoplay.
- **Páginas dedicadas** `/odoo` y `/dux` (+ `/en/*` y `/pt/*`), compartibles por WhatsApp, con SEO propio.
- **Botón de WhatsApp en todos los slides** con mensaje precargado y `ref` por camino/slide; link de WhatsApp en cada puerta con `ref` `HERO-*`.
- **Eventos GA4**: `solution_door_click`, `solution_slide_view`, `solution_whatsapp_click`.
- **Tokens Tailwind** de acento por camino (`odoo`, `dux`).
- **Textos por locale** ES / EN / PT (PT con marcador de revisión ADR-014, ver Q1).
- 5.ª tarjeta en `Services` ("Sistemas de gestión") con links a `/odoo` y `/dux`.
- Sitemap: 6 URLs nuevas.
- Centralizar el número de WhatsApp en `src/config/contact.js` (hoy hardcodeado en `WhatsAppFloat.jsx`).
- **Limpieza de marca**: eliminar del repo la palabra prohibida `S-t-u-d-i-o` (ver §11, Q4).
- Tests del carrusel, de los links de WhatsApp, del tracking y de exclusiones de contenido.

### ❌ Excluye
- Cualquier dato del partner: nombre, logo, cifras (+50 empresas, +10 años, retención), WhatsApp, web, Instagram.
- Logos o nombres de clientes (del partner u otros). Slide "Quiénes usan Odoo" completo.
- Niveles de partner de Odoo, sello Silver, y cualquier afirmación de que ONGEVAG es partner oficial.
- Slides del original no listados en §6 (quiénes somos, ventajas operativas, por qué el partner, cómo implementa el partner, por qué Dux, cómo trabaja el partner con Dux, etc.).
- Imágenes alojadas en el dominio del partner u `odoocdn.com` (ni hotlink ni descarga sin permiso).
- Precio de referencia de Odoo en v1 (ver Q6).
- Deep-link a un slide puntual (`/odoo#s4`) — candidato a v1.1.
- Ítem nuevo en el menú del Header.
- JSON-LD específico (`Service`) para las páginas nuevas.
- Registro de leads, CRM o backend: la atribución queda en el texto del WhatsApp + GA4.
- Cambios en `SectionDivider.jsx`, `vercel.json`, `LocaleProvider` (más allá de registrar el módulo `solutions`) y `ParticleBackground.jsx`.

---

## 3. Navegación y UX

### 3.1 Flujos

**A. Desde la home (entrada `home`)**
1. El visitante ve la franja "¿Tu empresa necesita un sistema de gestión?" con dos puertas.
2. Clic en una puerta → se emite `solution_door_click`, se carga el chunk de la sección, se monta `#soluciones` debajo del hero con ese camino preseleccionado en el slide 1, se hace scroll y el foco pasa al heading de la sección.
3. El visitante recorre capítulos; cada slide visto emite `solution_slide_view`.
4. Clic en WhatsApp → `solution_whatsapp_click` + `wa.me` con mensaje y `ref` del slide actual.
5. El switch cambia de camino y vuelve al slide 1 del otro camino, sin cambiar la URL.

**B. Link compartido (entrada `direct`)**
1. Leo comparte `ongevag.com/odoo` o `/dux` por WhatsApp.
2. Se abre una página dedicada: encabezado corto + misma sección/carrusel con el camino fijado.
3. El switch navega a la ruta hermana (`/odoo` ↔ `/dux`), así la URL siempre refleja lo que se ve.

**C. Atajo desde la puerta**: cada puerta tiene un link secundario "Consultar por WhatsApp" con `ref` `HERO-ODOO` / `HERO-DUX` para quien no quiere ver la presentación (ver Q2).

### 3.2 Ubicación exacta de la franja en `HeroBanner.jsx`

Dentro del **Block 2** (`<div className="pb-12 px-6 lg:p-0 space-y-8">`), **entre** el
`<motion.div>` de `{/* CTA Buttons */}` (botones "Ver proyectos" y "Contactar") y el `<motion.div>`
de `{/* Stats */}`:

```
Block 2
├── Description            (sin cambios)
├── CTA Buttons            (eliminado en rev. 1.1 — ver §3.2 nota)
├── <SolutionDoors />      ← NUEVO, envuelto en motion.div variants={fadeInUp}
└── Stats                  (sin cambios)
```

- `HeroBanner` recibe una prop opcional `onOpenSolution(path)`. Si no se pasa (tests, otros usos), las puertas navegan a `/odoo` o `/dux` del locale actual.
- `SolutionDoors` es **eager** (texto + 2 íconos de `react-icons`, sin imágenes) para no agregar un salto de carga en el hero.
- Mobile: puertas apiladas y compactas (cada una ≤ 96 px de alto). `≥ sm`: dos columnas dentro de `max-w-xl`.
- `scrollToContact` y su uso no se tocan.
- **Rev. 1.1 (2026-11-07, decisión de Leo):** se eliminan del hero los CTA "Ver proyectos" y "Contactar" (con `scrollToProjects`/`scrollToContact`) y el bloque Stats. El hero queda: badge → ONGEVAG → rol → descripción → `SolutionDoors`, igual en desktop y mobile (sin el split `min-h-[75vh]`). Las puertas son la única acción; el WhatsApp de cada puerta pasa a ícono con `aria-label`. Se actualiza la regla de archivos críticos en CLAUDE.md.
- **Rev. 1.2 (2026-11-07, decisión de Leo):** interruptor `FEATURES.solutions` en `src/config/features.js`. Con `true`, el hero muestra el badge y las puertas en la columna izquierda (misma posición del hero original), centradas en vertical y sin superponer las figuras geométricas de la derecha; ONGEVAG, rol y descripción quedan con `sr-only` (el `<h1>` ONGEVAG se mantiene para SEO y lectores de pantalla). En mobile el hero se ajusta al contenido (`min-h-screen` solo en `lg`). Con `false`, el hero vuelve a mostrar la marca sin puertas y Services oculta la tarjeta de sistemas de gestión; las rutas `/odoo` y `/dux` siguen activas.
- **Rev. 1.3 (2026-11-07, decisión de Leo):** en `lg+` la sección de soluciones ocupa la pantalla menos el menú (`h-[calc(100dvh-5rem)]`, mínimo 560 px). Encabezado compacto (título y bajada en una fila, switch a la derecha, sin badge), capítulos más finos, tarjeta que llena el alto con scroll interno si hace falta, flechas a los costados de la tarjeta centradas en vertical y WhatsApp fijo abajo a la derecha dentro de la tarjeta (oculto en los slides de contacto, que ya tienen su botón). Mobile sin cambios. Menú global sin cambios (opción A). Reemplaza NFR-09.
- **Rev. 1.4 (2026-11-07, recomendaciones de la auditoría adoptadas por Leo):** NFR-03 pasa a ≤ 5 KB (condicionado a Lighthouse); regla de marca redefinida como identidad histórica (§11); frase de Odoo 19 descartada (Q8); con `FEATURES.solutions = false` la alianza se considera terminada: `/odoo` y `/dux` (todos los locales) redirigen a la home del idioma, y el build las quita del sitemap y no genera su HTML estático.

### 3.3 Ubicación de la sección en la home

En `HomeSections` (`src/App.jsx`), **entre** `<AnimatedSection id="hero">` y el
`<SectionDivider variant="wave" fromColor="#EEE0C9" toColor="#F1F0E8" />`. La sección usa fondo
`#EEE0C9` (mismo del hero), así el divisor existente sigue funcionando sin cambios.

- Estado `solutionPath: null | 'odoo' | 'dux'` en `HomeSections` (estado local, sin estado global).
- Con `null` no se renderiza nada (ni placeholder): el layout inicial de la home queda idéntico.
- Con valor: `Suspense` + `lazy(SolutionsSection)`. El salto de layout ocurre tras un input del usuario (excluido de CLS).

### 3.4 Mensaje de derivación desde el principio

El texto "Te oriento y te conecto con un equipo especializado que lo implementa" (o equivalente)
aparece **en la franja de puertas y en el encabezado de la sección/página**, antes del slide 1, y se
desarrolla en el slide Odoo S6 / Dux S5. El visitante nunca debe enterarse de la derivación recién
en el contacto.

---

## 4. Componentes y archivos

### 4.1 Nuevos

```
src/
├── config/
│   └── contact.js                     # WHATSAPP_NUMBER = '5493492665453' (fuente única)
├── features/solutions/
│   ├── components/
│   │   ├── SolutionDoors.jsx          # Franja del hero (eager)
│   │   ├── SolutionsSection.jsx       # Encabezado + PathSwitch + carrusel (lazy). Props: initialPath, entry, variant ('home'|'page'), headingLevel
│   │   ├── PathSwitch.jsx             # Control segmentado Odoo/Dux
│   │   ├── SolutionCarousel.jsx       # Estado del slide, teclado, swipe, tracking
│   │   ├── ChapterNav.jsx             # Capítulos con nombre (tablist)
│   │   ├── CarouselProgress.jsx       # Barra + "Capítulo n de N"
│   │   ├── WhatsAppCTA.jsx            # Botón con ref; usado en slides y puertas
│   │   ├── SlideRenderer.jsx          # type → componente de slide
│   │   ├── slides/
│   │   │   ├── SlideCards.jsx         # Odoo S1, Dux S2
│   │   │   ├── SlideFacts.jsx         # Odoo S2, Dux S1 (tarjetas + cifras con fuente)
│   │   │   ├── SlideAppGrid.jsx       # Odoo S3
│   │   │   ├── SlideTabs.jsx          # Odoo S4 (pestañas internas)
│   │   │   ├── SlideComparison.jsx    # Odoo S5 (tabla → tarjetas en mobile)
│   │   │   ├── SlideProcess.jsx       # Odoo S6 (pasos + chips)
│   │   │   ├── SlideChannels.jsx      # Dux S3 (canales + mockups)
│   │   │   ├── SlideVersus.jsx        # Dux S4
│   │   │   └── SlideContact.jsx       # Odoo S7, Dux S5
│   │   └── mockups/
│   │       ├── DuxSalesPanelMock.jsx  # HTML/Tailwind, sin imágenes, leyenda "datos de ejemplo"
│   │       └── DuxPosTicketMock.jsx
│   ├── data/
│   │   ├── slides.es.js               # Contenido de slides por locale (import dinámico)
│   │   ├── slides.en.js
│   │   └── slides.pt.js
│   ├── utils/
│   │   ├── whatsapp.js                # buildRef(), buildWhatsAppUrl()
│   │   ├── formatTemplate.js          # '{ref}' → valor (sin lib i18n, ADR-010)
│   │   └── swipe.js                   # resolveSwipe(offsetX, velocityX) → -1 | 0 | 1
│   ├── hooks/
│   │   └── useSolutionTracking.js     # Wrappers de trackEvent + dedupe de slide_view
│   └── __tests__/
│       ├── SolutionCarousel.test.jsx
│       ├── SolutionDoors.test.jsx
│       ├── whatsapp.test.js
│       ├── swipe.test.js
│       ├── tracking.test.jsx
│       ├── SolutionsPage.test.jsx
│       └── contentExclusions.test.js
├── locales/{es,en,pt}/solutions.js    # Strings de UI (puertas, controles, mensajes, meta)
└── pages/
    └── SolutionsPage.jsx              # Una sola página para /odoo y /dux, prop `path`
```

### 4.2 Modificados

| Archivo | Cambio |
|---------|--------|
| `src/features/hero/HeroBanner.jsx` | Render de `<SolutionDoors />` (§3.2) + prop `onOpenSolution`. Nada más. |
| `src/App.jsx` | Estado `solutionPath` en `HomeSections`; sección lazy (§3.3); 6 rutas nuevas (§5). |
| `src/context/LocaleProvider.jsx` | Registrar `solutions` en los 3 locales. |
| `src/components/WhatsAppFloat.jsx` | Leer número de `config/contact.js`. |
| `src/layouts/MainLayout.jsx` | Ocultar `WhatsAppFloat` en `/odoo` y `/dux` (todos los locales) para que no entren contactos sin `ref` (Q3). |
| `src/locales/{es,en,pt}/services.js` + `Services.jsx` | 5.ª tarjeta "Sistemas de gestión" con links a `/odoo` y `/dux` (Q7). |
| `tailwind.config.js` | Tokens `odoo` y `dux` (§10). |
| `scripts/generate-sitemap.js` | 6 URLs nuevas y conteo actualizado. |
| `index.html`, `README.md`, `Makefile`, `docs/adr/ADR-009.md` | Limpieza de marca (§11). |
| `.gitignore` | `docs/reference/` (Q5). |
| `CLAUDE.md`, `docs/SDD_MASTER.md` | Module Index + Current Phase (al cierre). |

### 4.3 Modelo de datos de slides

```javascript
// src/features/solutions/data/slides.es.js
export const slides = {
  odoo: [
    {
      id: 'problema',          // estable, no depende del orden
      ref: 'ODOO-S1',          // estable, ligado al contenido (no al índice)
      type: 'cards',           // clave de SlideRenderer
      chapter: 'El problema',  // etiqueta corta de capítulo (≤ 18 caracteres)
      kicker: 'El punto de partida',
      title: 'Cuando la empresa crece, los sistemas sueltos la frenan.',
      lead: '…',
      items: [{ title: 'Doble carga', body: '…' } /* … */],
      sources: [],             // [{ label, url, verifiedAt: 'YYYY-MM-DD' }]
    },
    // …
  ],
  dux: [ /* … */ ],
};
```

- Las cifras (`facts`) llevan `{ value, label, source: { label, url, verifiedAt } }`. Una cifra sin `verifiedAt` **no se renderiza** (y un test lo controla).
- El chunk de la sección importa solo el locale activo: `import(\`../data/slides.${locale}.js\`)`.

---

## 5. Rutas y SEO

### 5.1 Rutas

| Locale | Odoo | Dux |
|--------|------|-----|
| ES | `/odoo` | `/dux` |
| EN | `/en/odoo` | `/en/dux` |
| PT | `/pt/odoo` | `/pt/dux` |

- Mismo segmento en los 3 locales → **no** requiere cambios en `LOCALIZED_SEGMENTS` de `LangSwitcher`; el switcher ya preserva el path (`/odoo` → `/en/odoo`).
- Se declaran dentro de cada grupo de locale en `App.jsx`: `<Route path="odoo" element={<SolutionsPage path="odoo" />} />`.
- `SolutionsPage` es lazy. `vercel.json` no cambia (el catch-all ya cubre las rutas).

### 5.2 Meta tags por página (vía `react-helmet-async`, patrón `AgenciasPage`)

| Tag | Valor |
|-----|-------|
| `<title>` | ES: `Odoo para empresas en crecimiento — ONGEVAG` · `Dux para comercios — ONGEVAG` |
| `description` | 140–160 caracteres, por locale, desde `t.solutions.pages.{path}.meta` |
| `canonical` | URL propia del locale (`https://www.ongevag.com/en/odoo`, etc.) |
| `hreflang` | `es`, `en`, `pt` + `x-default` → ES |
| `og:title` / `og:description` / `og:url` / `og:locale` | Por locale (`OG_LOCALE` de `utils/seoLocale.js`) |
| `og:image` | `/og-odoo.png` y `/og-dux.png`, 1200×630 PNG (ADR-008) — asset faltante, fallback `/og-image.png` |

### 5.3 Vista previa en WhatsApp (riesgo)

Los crawlers de WhatsApp **no ejecutan JS**: hoy cualquier link del sitio muestra el OG estático de
`index.html` (el de la home). Requisito **SHOULD**: que `/odoo` y `/dux` muestren título, descripción
e imagen propios. Mecanismo a definir en PLAN (opción preferida: script post-build que genere
`dist/odoo/index.html` y `dist/dux/index.html` con el `<head>` específico, sin tocar `vercel.json`).
Si se descarta, la vista previa muestra el OG genérico de ONGEVAG (aceptable, no bloquea).

### 5.4 Sitemap

`/odoo`, `/dux`, `/en/odoo`, `/en/dux`, `/pt/odoo`, `/pt/dux` → `changefreq: monthly`, `priority: 0.8`.

### 5.5 Aviso de marcas

Pie fijo de la sección/página: *"Odoo y Dux son marcas de sus respectivos titulares. ONGEVAG no es
partner oficial: te oriento y te conecto con un equipo especializado que realiza la implementación."*
Evita que se interprete a ONGEVAG como partner o revendedor oficial.

---

## 6. Contenido — 12 slides

Reglas transversales al adaptar el original:
- Voz de Leo (primera persona singular) o neutra. Se elimina el "nosotros" del partner ("somos partners de los dos", "podemos acompañar", "no tercerizamos").
- Fuentes solo de `odoo.com` o `duxsoftware.com.ar`; se descartan las que apuntan al sitio del partner.
- Íconos: `react-icons` genéricos (no los íconos oficiales de apps de Odoo).
- Marcas de canales (Mercado Libre, Tiendanube…) solo como texto, sin logos.

### 6.1 Odoo (7)

| Ref | Capítulo | Tipo | Contenido | Notas |
|-----|----------|------|-----------|-------|
| ODOO-S1 | El problema | `cards` | "Cuando la empresa crece, los sistemas sueltos la frenan." 4 dolores: doble carga, datos atrasados, sin integración, dependencia de personas. | Texto del original adaptado. |
| ODOO-S2 | Qué es Odoo | `facts` | Modular, código abierto, una sola base de datos. Cifras: usuarios, partners, apps de la comunidad, desarrolladores. 3 tarjetas: de 1 a 300.000 usuarios · una versión por año · tus datos son tuyos (PostgreSQL). | **Cada cifra se verifica en odoo.com antes de publicar** (el original dice 28 M / 21.000+ / 40.000+ / 100.000+). |
| ODOO-S3 | Apps | `appGrid` | 12 apps: CRM, Ventas, Inventario, Compras, Contabilidad, Fabricación, Calidad, Mantenimiento, Proyectos, Suscripciones, Sitio web, IA. Cierre: "+ POS, RR.HH., WhatsApp…". | Se quita del cierre la app cuyo nombre es la palabra prohibida. Nota "más de 50 apps oficiales" solo si se verifica. |
| ODOO-S4 | Áreas clave | `tabs` | 5 pestañas: **CRM y ventas** (embudo, presupuestos con firma, listas de precios) · **Inventario** (multi-depósito, lotes, vencimientos, reposición automática) · **Contabilidad** (conciliación automática; localización argentina: facturación electrónica ARCA, retenciones y percepciones, FCE MiPyME) · **Producción** (órdenes, listas de materiales, trazabilidad, tablero de planta) · **IA nativa** (agentes que consultan datos y ejecutan tareas). | Sin capturas en v1; slot `image` opcional por pestaña para assets futuros. Cifras del original (98 %, 95 %, 30 %) fuera salvo verificación. |
| ODOO-S5 | Comparativa | `comparison` | Columnas: Odoo / ERP corporativo tradicional / Sistema enlatado. Filas: licencia · adaptación a procesos · propiedad de datos · tiempo de implementación. Nota: "Comparación por categorías de producto, no por marca." | Sin precio (Q6). En `< sm` se muestra como tarjetas por fila. |
| ODOO-S6 | Cómo trabajamos | `process` | Título: **"Vos me contás qué necesitás. Un equipo especializado lo implementa."** Bajada del brief. 5 pasos: Primera charla · Orientación (Odoo, Dux o ninguno) · Te presento al equipo (relevamiento y propuesta formal) · Implementación (configuración, desarrollo a medida, migración, capacitación) · Acompañamiento. Chips: Distribución y mayoristas · Manufactura · Salud e insumos · Servicios · ISP · Construcción · Comercios. | Opcional (Q8): "Conozco Odoo desde adentro: participo en implementaciones reales de Odoo 19." COULD: chip "Comercios" cambia al camino Dux. |
| ODOO-S7 | Contacto | `contact` | "¿Querés ver Odoo funcionando con tus procesos?" + "Primera charla sin compromiso por WhatsApp." CTA grande + aviso de marcas. | Sin teléfono ni redes del partner. |

### 6.2 Dux (5)

| Ref | Capítulo | Tipo | Contenido | Notas |
|-----|----------|------|-----------|-------|
| DUX-S1 | Para quién es | `facts` | Comercios, minoristas y pymes que venden en mostrador y online. Tarjetas: librerías y papelerías · indumentaria · bazares y hogar · comercios en general. Cifras: creado en 2017 en Córdoba · 100 % en la nube · presente en 4 países. | Verificar en `duxsoftware.com.ar` (el original cita al partner, InfoNegocios y Capterra). |
| DUX-S2 | Qué resuelve | `cards` | Facturación electrónica ARCA · stock en tiempo real · precios masivos por Excel · cuentas corrientes · caja · reportes. | — |
| DUX-S3 | Ventas online | `channels` | Sincronización con Mercado Libre, Tiendanube y otros canales; mostrador con lector de código de barras y factura al instante. Mockups `DuxSalesPanelMock` + `DuxPosTicketMock` con leyenda **"Datos de ejemplo para ilustrar."** | Lista de canales verificada en `duxsoftware.com.ar`. Mockups en HTML, montos ficticios. |
| DUX-S4 | ¿Dux u Odoo? | `versus` | Dos columnas "cuándo conviene": Dux (comercio o pyme chica, facturar y vender ya, procesos estándar, bajo costo e implementación en días) / Odoo (distribuidora, industria o empresa en crecimiento, producción/logística/CRM, procesos propios, varias áreas integradas). Nota: "Si tu comercio crece, se puede migrar de Dux a Odoo." | Columna Odoo con CTA "Ver presentación de Odoo" (cambia de camino). |
| DUX-S5 | Contacto | `contact` | "¿Tu comercio necesita ordenarse ya?" + "Te asesoro y te conecto con el equipo que lo implementa." CTA grande + aviso de marcas. | — |

---

## 7. Claves i18n

`src/locales/{es,en,pt}/solutions.js`, registrado como `t.solutions` en los 3 locales (mismo nombre
de módulo en todos; no se repite la excepción `agencias`/`agencies`). Contenido de slides en
`features/solutions/data/slides.{locale}.js` (precedente: `blogData.{locale}.js`; ver ADR-015).

```javascript
// src/locales/es/solutions.js
export default {
  doors: {
    heading: '¿Tu empresa necesita un sistema de gestión?',
    lead: 'Te oriento y te conecto con un equipo especializado que lo implementa.',
    dux:  { question: '¿Tenés un comercio?', product: 'Dux', pitch: 'Facturación, stock y ventas online en días.', cta: 'Ver presentación' },
    odoo: { question: '¿Distribuidora, industria o empresa en crecimiento?', product: 'Odoo', pitch: 'Toda la operación en una plataforma.', cta: 'Ver presentación' },
    whatsapp: 'o consultame por WhatsApp',
  },
  section: {
    badge: 'Sistemas de gestión',
    title: 'Sistemas de gestión para tu empresa',
    lead: 'Vos me contás qué necesitás. Un equipo especializado lo implementa.',
    switchLabel: 'Elegí una presentación',
    switch: { odoo: 'Odoo', dux: 'Dux' },
  },
  carousel: {
    roleDescription: 'presentación',
    slideRoleDescription: 'capítulo',
    chaptersLabel: 'Capítulos',
    prev: 'Capítulo anterior',
    next: 'Capítulo siguiente',
    progress: 'Capítulo {current} de {total}',
    exampleData: 'Datos de ejemplo para ilustrar.',
    sourceLabel: 'Fuente',
  },
  whatsapp: {
    cta: 'Consultar por WhatsApp',
    ariaLabel: 'Consultar por WhatsApp (se abre en una pestaña nueva)',
    messageSlide: 'Hola Leo, vi la presentación de {product} en ongevag.com y quiero consultar. (ref: {ref})',
    messageDoor:  'Hola Leo, vi en ongevag.com la opción de {product} y quiero consultar. (ref: {ref})',
  },
  pages: {
    backHome: 'Ver todos los servicios de ONGEVAG',
    odoo: { h1: 'Odoo: toda la operación en una plataforma', meta: { title, description, ogTitle, ogDescription } },
    dux:  { h1: 'Dux: tu comercio ordenado en días',          meta: { /* … */ } },
  },
  disclaimer: 'Odoo y Dux son marcas de sus respectivos titulares. ONGEVAG no es partner oficial: te oriento y te conecto con un equipo especializado que realiza la implementación.',
};
```

EN (referencia de tono): `doors.heading: 'Does your business need a management system?'` ·
`whatsapp.messageSlide: "Hi Leo, I saw the {product} presentation on ongevag.com and I'd like to ask about it. (ref: {ref})"`.
PT: generado con `// TODO(leo): revisar traducción PT` (ADR-014).

Reglas: ningún string visible hardcodeado en componentes; `t` como objeto plano (`t.solutions.doors.heading`);
interpolación con `formatTemplate()` (sin lib i18n).

---

## 8. Esquema de refs de WhatsApp

| Origen | Refs |
|--------|------|
| Slides Odoo | `ODOO-S1` … `ODOO-S7` |
| Slides Dux | `DUX-S1` … `DUX-S5` |
| Link en la puerta del hero | `HERO-ODOO`, `HERO-DUX` |

- Formato: `^(ODOO-S[1-7]|DUX-S[1-5]|HERO-(ODOO|DUX))$`. El `ref` es **igual en todos los locales** (el idioma queda en GA4).
- El `ref` está en el dato del slide (`slide.ref`), no se calcula del índice: reordenar slides no cambia refs.
- URL: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, `target="_blank"`, `rel="noopener noreferrer"`.
- Mensaje final de ejemplo: `Hola Leo, vi la presentación de Odoo en ongevag.com y quiero consultar. (ref: ODOO-S4)`.
- Limitación conocida: el visitante puede borrar el texto antes de enviar. El `ref` es una evidencia de buena fe; el respaldo completo es el registro propio de leads (fuera del código).

---

## 9. Eventos GA4

Vía `src/utils/trackEvent.js` (ya existente; no-op si `gtag` no está).

| Evento | Cuándo | Parámetros |
|--------|--------|-----------|
| `solution_door_click` | Clic en "Ver presentación" de una puerta | `path` (`odoo`\|`dux`), `locale` |
| `solution_slide_view` | Un slide pasa a activo (incluido el slide 1 al montar). **Una vez por `ref` por montaje** del carrusel | `path`, `slide` (= ref, p. ej. `ODOO-S4`), `locale`, `entry` (`home`\|`direct`) |
| `solution_whatsapp_click` | Clic en cualquier botón/link de WhatsApp de la feature | `path`, `slide` (ref del slide o `HERO-ODOO`/`HERO-DUX`), `locale`, `entry` |

- `path` y `slide` son los del brief; `locale` y `entry` se agregan (SHOULD) para separar visitas orgánicas de links enviados por Leo.
- Sin datos personales en ningún parámetro.
- Las pestañas internas de Odoo S4 no emiten eventos en v1.

---

## 10. Diseño

- Paleta rebrand (ADR-012): crema `#EEE0C9`, arena `#F1F0E8`, mist-blue `#ADC4CE`, steel-blue `#96B6C5`, navy `#2C3340`. Títulos `font-display` (Space Grotesk), cuerpo `font-sans` (Inter). Sin Poppins.
- Tokens nuevos en `tailwind.config.js`:

| Token | Valor | Uso permitido |
|-------|-------|---------------|
| `odoo` | `#714B67` | Puertas, pestaña/switch activo, viñetas. Texto sobre crema: 5,6:1 ✅. Texto blanco encima: 7,2:1 ✅ |
| `dux` | `#0B8A80` | **Solo no-texto**: bordes, viñetas, barra de progreso (3,2:1 sobre crema ✅ para UI). Blanco encima: 4,2:1 ❌ para texto normal |
| `dux-ink` | `#08695F` (propuesto) | Texto de acento Dux y fondo de pestaña/switch activo con texto blanco (≈ 6,5:1) |

  *Contrastes calculados a mano; se re-validan con herramienta en PLAN.*
- Los acentos se usan **solo** en puertas, pestaña/switch activo y viñetas; el resto en paleta ONGEVAG.
- Animaciones con variantes de `config/motionConfig.js` (`fadeInUp`, `springConfig`, `durationConfig`).

---

## 11. Limpieza de marca

Prohibida la palabra `S-t-u-d-i-o` (deletreada así en esta spec a propósito) en todo el repo.

> **Rev. 1.4:** la prohibición se redefine como **identidad histórica de marca**: no se usa el nombre anterior de ONGEVAG ("Ongevag" + esa palabra) ni la palabra como parte de la marca o del contenido de esta feature. Usos genéricos legítimos ("Android Studio" en el blog, "Creative Studio" como tipo de cliente en agencias EN) se mantienen.
Ocurrencias actuales detectadas:

| Archivo | Ocurrencia | Acción propuesta |
|---------|-----------|------------------|
| `index.html` (JSON-LD, 2) | Nombre de `Organization` y título | → `ONGEVAG` (impacta FEATURE-03 AEO; revisar con Rich Results Test) |
| `README.md` | Subtítulo | → reformular sin la palabra |
| `Makefile` (2) | Banner y nombre | → `ONGEVAG Portfolio` |
| `docs/adr/ADR-009.md` (2) | Texto de la decisión | → reemplazar + nota de enmienda con fecha |

El contenido nuevo tampoco la usa (incluido el nombre de la app de Odoo). Verificación: `git grep -nw "<palabra>"` sin resultados (el test de exclusiones la arma por partes para no contenerla literal).

---

## 12. Requisitos funcionales

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| FR-01 | Franja de dos puertas en `HeroBanner` en la ubicación de §3.2, con heading, lead de derivación, pregunta, producto, pitch y CTA por puerta. | MUST |
| FR-02 | Clic en puerta abre `#soluciones` con ese camino en el slide 1, hace scroll (instantáneo con reduced motion) y mueve el foco al heading de la sección. | MUST |
| FR-03 | Switch Odoo/Dux: en home cambia camino y vuelve al slide 1; en página navega a la ruta hermana. | MUST |
| FR-04 | Navegación por capítulos con nombre (no puntos); el capítulo activo queda visible (scroll horizontal en mobile). | MUST |
| FR-05 | Barra de progreso + texto "Capítulo n de N". | MUST |
| FR-06 | Flechas anterior/siguiente; deshabilitadas en los extremos (sin loop). | MUST |
| FR-07 | Teclado con foco dentro del carrusel: `←`/`→` anterior/siguiente, `Home`/`End` primero/último. Sin listeners globales en `window`. Dentro de las pestañas de Odoo S4 las flechas mueven pestañas, no slides. | MUST |
| FR-08 | Swipe horizontal (umbral: 50 px o velocidad > 500 px/s) sin bloquear el scroll vertical (`touch-action: pan-y`). | MUST |
| FR-09 | Sin autoplay en ninguna circunstancia. | MUST |
| FR-10 | `prefers-reduced-motion`: cambio de slide sin desplazamiento ni spring (corte o fundido ≤ 150 ms); scroll instantáneo. | MUST |
| FR-11 | Botón de WhatsApp visible en los 12 slides, con mensaje y `ref` de §8. | MUST |
| FR-12 | Link de WhatsApp en cada puerta con `HERO-ODOO` / `HERO-DUX`. | MUST (sujeto a Q2) |
| FR-13 | Eventos GA4 de §9 con sus parámetros y dedupe. | MUST |
| FR-14 | Rutas de §5.1 renderizan `SolutionsPage` con el camino correcto y meta tags de §5.2. | MUST |
| FR-15 | Contenido de los 12 slides según §6, sin ningún elemento de §2 Excluye. | MUST |
| FR-16 | Cifras sin `verifiedAt` no se renderizan. | MUST |
| FR-17 | Aviso de marcas (§5.5) en sección y páginas. | MUST |
| FR-18 | Textos completos en ES, EN y PT. | MUST (PT sujeto a Q1) |
| FR-19 | `WhatsAppFloat` oculto en las páginas `/odoo` y `/dux`. | SHOULD (Q3) |
| FR-20 | Vista previa OG propia al compartir `/odoo` y `/dux` (§5.3). | SHOULD |
| FR-21 | 5.ª tarjeta en `Services` con links a `/odoo` y `/dux`. | SHOULD (Q7) |
| FR-22 | Prefetch del chunk de la sección en `hover`/`focus` de una puerta. | COULD |
| FR-23 | Chip "Comercios" de Odoo S6 cambia al camino Dux. | COULD |

---

## 13. Requisitos no funcionales

| ID | Requisito | Target |
|----|-----------|--------|
| NFR-01 | LCP del hero no empeora | Desktop LCP ≤ 1,2 s; Lighthouse desktop Performance ≥ 95 y mobile ≥ baseline − 3 (mismas condiciones, incógnito) |
| NFR-02 | CLS en carga | 0 en `/`, `/odoo`, `/dux` |
| NFR-03 | Tamaño del chunk de entrada | Incremento ≤ 5 KB brotli (rev. 1.4; antes 3 KB), condicionado a Lighthouse satisfactorio en T-23 |
| NFR-04 | Carga diferida | Sección, páginas y `slides.{locale}.js` fuera del chunk de entrada; solo se monta el slide activo |
| NFR-05 | Accesibilidad | WCAG 2.1 AA; Lighthouse Accessibility ≥ 95 en `/odoo` y `/dux`; foco visible en todos los controles |
| NFR-06 | Headings | Home: `h1` ONGEVAG → `h2` sección → `h3` slide. Página: `h1` página → `h2` slide. Sin saltos |
| NFR-07 | Mobile-first | Sin scroll horizontal de página a 320 px; objetivos táctiles ≥ 44×44 px |
| NFR-08 | Seguridad | Links externos con `rel="noopener noreferrer"`; sin `dangerouslySetInnerHTML`; sin hotlinks a dominios de terceros |
| NFR-09 | Estabilidad de controles | En `≥ md`, flechas y botón de WhatsApp no cambian de posición vertical al pasar de slide (alto mínimo del área de slide) |

### Accesibilidad del carrusel (patrón WAI-ARIA APG, carrusel con pestañas)
- Contenedor: `<section aria-roledescription="presentación" aria-labelledby=…>`.
- Capítulos: `role="tablist"` / `role="tab"` con `aria-selected` y `aria-controls`; slide activo `role="tabpanel"` con `aria-roledescription="capítulo"` y `aria-label="3 de 7: Apps"`.
- Región `aria-live="polite"` que anuncia el capítulo al cambiar (no hay autoplay, así que no satura).
- Switch: dos botones con `aria-pressed`. Mockups: `<figure>` con `aria-label` y `<figcaption>` "Datos de ejemplo".
- Tabla comparativa: `<table>` con `<th scope>`; en mobile, tarjetas con `<dl>`.

---

## 14. Decisiones (resueltas 2026-11-07: se adoptan todos los defaults)

| # | Pregunta | Decisión |
|---|----------|-------------------|
| Q1 | El sitio tiene PT (`/pt`). El brief dice "ES y EN". Sin rutas PT, el switcher lleva a `/pt/odoo` y hoy no hay ruta 404 → pantalla vacía. | Incluir PT con marcador ADR-014. |
| Q2 | ¿Cuándo se usa `HERO-ODOO`/`HERO-DUX` si la puerta abre el carrusel? | Link secundario "o consultame por WhatsApp" en cada puerta. |
| Q3 | El botón flotante de WhatsApp manda un mensaje genérico, sin `ref`. | Ocultarlo en `/odoo` y `/dux`; en la home se mantiene. |
| Q4 | Limpieza de la palabra prohibida en `index.html` (JSON-LD), README, Makefile y ADR-009. | Incluirla en esta feature, en un commit aparte. |
| Q5 | El repo es **público**: commitear la presentación original publicaría datos, contactos y logos de clientes del partner. | `docs/reference/` en `.gitignore`; copia solo local. Specs sin nombre del partner ni datos del acuerdo. |
| Q6 | ¿Precio de referencia de Odoo en S5? | No en v1 (cambia por región y plan). |
| Q7 | Ya existe la tarjeta "Software de Gestión a Medida" en `Services`. ¿Convive con "Sistemas de gestión (Odoo / Dux)"? | Sí: una es desarrollo propio y la otra implementación de plataformas; se ajusta el copy para que no se pisen. |
| Q8 | Frase opcional "Conozco Odoo desde adentro: participo en implementaciones reales de Odoo 19." | **No se incluye** (rev. 1.4): falta respaldo documental y menciona una versión que caduca. |

---

## 15. ADR propuesto

**ADR-015 — Contenido de presentaciones fuera de `LocaleProvider`.** `LocaleProvider` importa
estáticamente todos los locales en el chunk de entrada. Sumar ~12 slides × 3 idiomas ahí sumaría peso
al hero (NFR-01/03). Decisión propuesta: strings de UI en `locales/*/solutions.js` (vía `useLocale()`)
y contenido extenso en `features/solutions/data/slides.{locale}.js` con import dinámico del locale
activo, siguiendo el precedente de `blogData.{locale}.js`. No modifica ADR-010.

---

## 16. Assets faltantes

| Asset | Uso | Estado |
|-------|-----|--------|
| `public/og-odoo.png` (1200×630) | OG de `/odoo` | Faltante — diseñar con paleta ONGEVAG, sin logo de Odoo salvo permiso |
| `public/og-dux.png` (1200×630) | OG de `/dux` | Faltante — ídem |
| Capturas de Odoo (CRM, inventario, contabilidad, producción, IA) | Slot opcional en S4 | Faltante — requiere permiso de uso; v1 sin capturas |
| Logos Odoo / Dux | — | No se usan en v1 (nombre como texto con color de acento) |
| Íconos de apps (S3) | Grilla | Cubierto con `react-icons` |
| Mockups Dux (S3) | Panel y ticket | Cubierto con HTML/Tailwind |

---

## 17. Criterios de aceptación

**Hero y home**
- [ ] AC-01 (rev. 1.1) `SolutionDoors` va debajo de la descripción del hero y sus dos puertas son los únicos botones de `#inicio`; no quedan "Ver proyectos", "Contactar" ni Stats.
- [ ] AC-02 Con `solutionPath = null`, el DOM de la home no contiene `#soluciones` y el build no incluye `slides.*.js` en el chunk de entrada.
- [ ] AC-03 Clic en la puerta Dux → `#soluciones` visible con el switch en Dux, capítulo "Para quién es" activo y foco en el heading de la sección.

**Carrusel (tests RTL)**
- [ ] AC-04 Siguiente/anterior cambian de capítulo; anterior está deshabilitado en S1 y siguiente en el último.
- [ ] AC-05 Clic en un capítulo activa ese slide; `aria-selected="true"` solo en ese tab.
- [ ] AC-06 Con foco en el carrusel: `ArrowRight`, `ArrowLeft`, `Home`, `End` funcionan; con foco en las pestañas de Odoo S4 las flechas no cambian de slide.
- [ ] AC-07 El texto de progreso muestra "Capítulo n de N" correcto en cada paso; solo el slide activo está montado.
- [ ] AC-08 `resolveSwipe()` devuelve `1`, `-1` o `0` según umbrales de FR-08 (test unitario).
- [ ] AC-09 No existe ningún `setInterval`/`setTimeout` de avance automático (revisión de código + test de que tras 10 s simulados el slide no cambió).
- [ ] AC-10 Con `matchMedia('(prefers-reduced-motion: reduce)')` = true, las transiciones de slide no usan desplazamiento (QA manual + prop verificada en test).

**WhatsApp y atribución**
- [ ] AC-11 Para cada uno de los 12 slides, el link de WhatsApp contiene `wa.me/5493492665453` y el `ref` correcto codificado (`ref%3A%20ODOO-S1` … `DUX-S5`).
- [ ] AC-12 Los links de las puertas llevan `HERO-ODOO` y `HERO-DUX`.
- [ ] AC-13 Los refs son idénticos en ES, EN y PT; todos cumplen la regex de §8 y no hay duplicados.
- [ ] AC-14 El número sale solo de `src/config/contact.js` (`git grep 5493492665453 src` → un único resultado).

**GA4**
- [ ] AC-15 Con `window.gtag` mockeado: clic en puerta → `solution_door_click {path}`; montar carrusel → `solution_slide_view` de S1; volver a un slide ya visto no reemite; clic en WhatsApp → `solution_whatsapp_click {path, slide}`.

**Rutas y SEO**
- [ ] AC-16 `/odoo`, `/dux`, `/en/odoo`, `/en/dux`, `/pt/odoo`, `/pt/dux` renderizan la página con el camino correcto, `<title>`, `canonical` propio y 4 `hreflang`.
- [ ] AC-17 Desde `/odoo`, el `LangSwitcher` navega a `/en/odoo` y `/pt/odoo`.
- [ ] AC-18 `npm run generate-sitemap` incluye las 6 URLs nuevas.

**Contenido y exclusiones**
- [ ] AC-19 `contentExclusions.test.js` recorre `slides.*.js` y `locales/*/solutions.js` y no encuentra: nombre del partner, `Silver`, el WhatsApp del partner, su dominio, `odoocdn.com`, `+50`, `+10 años`, ni la lista de nombres de clientes/marcas del slide excluido.
- [ ] AC-20 (rev. 1.4) Ninguna referencia al nombre anterior de la marca (`git grep -niE "ongevag[[:space:]]+<palabra>"` y variantes → sin resultados); la feature no usa la palabra.
- [ ] AC-21 Toda cifra renderizada tiene `source.url` en `odoo.com` o `duxsoftware.com.ar` y `verifiedAt` (test).
- [ ] AC-22 Ningún `src`/`href` de la feature apunta a dominios de terceros salvo `wa.me` y las URLs de fuente.

**Calidad**
- [ ] AC-23 `npm run build`, `npm run lint` y `npm run test` en verde; la suite existente sin regresiones.
- [ ] AC-24 Lighthouse según NFR-01/02/05 en `/` y `/odoo` (desktop + mobile Slow 4G, incógnito), registrado en `tasks.md`.
- [ ] AC-25 QA manual en 320 px, 375 px, 768 px y 1280 px: sin scroll horizontal, foco visible, swipe y teclado funcionando.
- [ ] AC-26 Contraste de acentos validado con herramienta (§10); ningún texto `dux` sobre crema por debajo de 4,5:1.
- [ ] AC-27 PR a `develop` (nunca a `main`) con Conventional Commits; merge solo con autorización de Leo.

---

## 18. Pendientes fuera del código (bloquean publicación, no desarrollo)

- [ ] Acuerdo escrito con el partner sobre registro de derivaciones (detalle en el brief privado).
- [ ] Confirmar si se puede mencionar el nivel de partner del equipo (default: no se menciona).
- [ ] Assets de §16 con permiso de uso.
- [ ] Verificar cifras de Odoo y Dux en sus sitios oficiales y completar `verifiedAt`.
- [ ] Registrar en GA4 las dimensiones personalizadas `path`, `slide`, `entry` para poder reportarlas.
- [ ] Revisión de Leo de los textos EN y PT.

---

## 19. Referencias

- Brief privado de la feature (fuera del repo).
- Presentación original del partner (`docs/reference/`, fuera de git).
- `docs/specs/FEATURE-06-PARTNERS_AGENCIAS/spec.md` — patrón de landing + GA4.
- `docs/specs/FEATURE-10_PT_LOCALE/spec.md` — tercer locale.
- WAI-ARIA APG — Carousel Pattern (tabbed).

---

**Próximo paso:** aprobación explícita de esta spec + respuestas a Q1–Q8 → recién ahí `plan.md`.
