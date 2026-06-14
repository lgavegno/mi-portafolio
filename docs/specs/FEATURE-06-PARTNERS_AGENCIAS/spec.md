# FEATURE-06 — Partners para Agencias
## PRD + UX Spec + Technical Spec

**Proyecto:** Portfolio ONGEVAG (`www.ongevag.com`)  
**Rama Git:** `feature/FEATURE-06-partners-agencias`  
**Fecha:** 2026-06-14 (rev. 2026-06-14)  
**Estado:** Aprobado — listo para plan.md  
**Owner:** Leandro Gavegno

---

## 0. Contexto y Decisión Estratégica

### Problema
El portfolio actual (`/` y `/en`) está orientado a clientes PyME directos. No existe ninguna ruta, sección ni mensaje dirigido a agencias de marketing, branding o diseño que necesiten un desarrollador técnico de confianza para tercerizar la producción web de sus clientes.

La sección `sobre-mi` actual contiene una descripción que no refleja el trabajo real ni el posicionamiento deseado:
> *"Me dedico a construir herramientas digitales para pequeños comercios: sitios web en WordPress y Tienda Nube. Así como también aplicaciones de escritorio para gestión interna."*

Esta frase debe ser reemplazada como parte de esta feature (ver Sección 8).

### Decisión Estratégica
Se crea una **ruta dedicada `/agencias`** (y su espejo `/en/agencies`) como herramienta comercial independiente, diseñada específicamente para agencias como audiencia primaria. No es una sección dentro de la home — es una landing con navegación propia, copy específico y CTAs orientados a la conversión B2B.

**Posicionamiento central:**
> *Partner técnico white-label para agencias que venden sitios pero no tienen desarrollador propio.*

**Lo que NO es:**
- No compite con agencias
- No capta clientes finales de las agencias
- No menciona tecnologías específicas como restricciones

---

## 1. Investigación Estratégica

### 1.1 Dudas que tiene una agencia antes de contratar un desarrollador externo

| Duda | Peso |
|------|------|
| ¿Puede mantener confidencialidad con mis clientes? | Crítico |
| ¿Respeta mis plazos o va a retrasar mis entregas? | Crítico |
| ¿Cómo lo presento a mi cliente — como empleado, socio, proveedor? | Alto |
| ¿Puede interpretar un diseño en Figma sin que yo le explique todo? | Alto |
| ¿Qué pasa si el proyecto crece más de lo esperado? | Alto |
| ¿Puedo darle acceso a las cuentas de mi cliente con confianza? | Alto |
| ¿Tiene experiencia con el tipo de sitio que mi cliente pide? | Medio |
| ¿Entrega documentación que yo pueda usar después? | Medio |

### 1.2 Objeciones frecuentes y respuestas

| Objeción | Respuesta en el copy |
|----------|---------------------|
| "No sé si puedo confiar en alguien nuevo con mis clientes" | Trabajo white-label — tus clientes nunca me conocen si no querés |
| "Ya tuve malas experiencias con freelancers que desaparecen" | Comunicación estructurada, hitos claros, no desaparezco |
| "¿Y si el proyecto cambia a mitad de camino?" | Proceso de relevamiento antes de presupuestar — los cambios se acuerdan, no se improvisan |
| "Mis clientes tienen exigencias de diseño muy específicas" | Implementación fiel a Figma — si existe el diseño, lo construyo como está |
| "¿Tenés portfolio de sitios de este tipo?" | Los proyectos en el portfolio muestran el nivel de trabajo — podemos hablar por llamada |

### 1.3 Riesgos que percibe la agencia

- **Riesgo de reputación:** el desarrollador entrega algo que la agencia no puede mostrar a su cliente
- **Riesgo de plazo:** el freelancer no cumple y la agencia queda mal parada
- **Riesgo de confidencialidad:** el desarrollador contacta al cliente directamente
- **Riesgo de dependencia:** el único que entiende el código es el freelancer externo
- **Riesgo de alcance:** el presupuesto explota sin aviso

### 1.4 Mensajes que generan confianza

- Proceso documentado (no trabajo "a ojo")
- Entrega con documentación técnica incluida
- Confidencialidad explícita — white-label por default
- Muestra de trabajo real con nivel técnico visible
- Forma de contacto directa y profesional (no formulario genérico)

---

## 2. Arquitectura UX

### 2.1 Ubicación en el portfolio

```
/                    → Home ES (audiencia: clientes directos + agencias que buscan)
/en                  → Home EN
/agencias            → Landing para agencias ES  ← NUEVA
/en/agencies         → Landing para agencias EN  ← NUEVA (espejo)
/blog                → Blog (sin cambios)
/proyecto/:id        → Detalle de proyecto
```

La ruta `/agencias` es accesible desde:
- Header: ítem nuevo `Para agencias` entre `Servicios` y `Blog`
- Home `/`: bloque teaser al final de la sección de servicios con CTA → `/agencias`
- Prospección directa: la URL se usa en mensajes de LinkedIn y email en frío

### 2.2 Flujo de navegación en `/agencias`

```
Usuario llega a /agencias
         │
         ▼
[Hero] Propuesta de valor + CTA primario (Email)
         │
         ▼
[Para quién es] Descripción del perfil de agencia ideal
         │
         ▼
[Cómo colaboro] 3 modelos de colaboración (Branding / Marketing / Creativo)
         │        Objetivo: que la agencia se visualice trabajando con este perfil
         ▼
[Cómo funciona] Proceso operativo en 4 pasos
         │
         ▼
[Preguntas frecuentes] Objeciones resueltas
         │
         ▼
[CTA final] Contacto directo
```

### 2.3 CTAs principales y secundarios

| Tipo | Texto | Destino |
|------|-------|---------|
| Primario | "Hablemos de tu proyecto" | `mailto:` con asunto pre-cargado |
| Secundario | "Ver proyectos" | Scroll a sección de colaboración |

**Email subject pre-cargado:**
```
Asunto: Partner técnico — [nombre de agencia]
```

**Nota:** No se usa WhatsApp en ningún CTA. El número de teléfono personal no se expone públicamente. El email profesional es el único canal de contacto en esta página.

### 2.4 Desktop vs Mobile

**Desktop:** Layout asimétrico. Texto a la izquierda (60%), espacio visual a la derecha (40%). El proceso en 4 pasos usa línea horizontal. Los casos de estudio en grid 2 columnas.

**Mobile:** Stack vertical. El hero reduce el headline a 2 líneas. El proceso en 4 pasos pasa a lista vertical con línea lateral. Los casos de estudio en columna única.

---

## 3. Copywriting Completo (Producción-Ready)

### 3.1 Hero

**Headline (ES):**
```
El desarrollador técnico
que tu agencia necesita.
```

**Subheadline:**
```
Construyo los sitios que vos vendés. Diseño custom, performance real,
entrega profesional. Tus clientes no saben que existo — a menos que quieras.
```

**CTA primario:** `Hablemos de tu proyecto →`
**CTA secundario:** `Ver proyectos`

---

### 3.2 Para quién es

**Título:** `¿Tu agencia vende sitios web pero no los produce?`

**Cuerpo:**
```
Si tenés clientes que piden presencia digital pero tu equipo está enfocado
en estrategia, branding o marketing — podemos trabajar juntos.

No compito con vos. No contacto a tus clientes. No tengo agenda propia.
Soy el brazo técnico que ejecuta lo que vos diseñaste o vendiste.
```

**Perfil de agencia ideal (lista):**
- Agencias de marketing digital que venden diseño y desarrollo como paquete
- Estudios de branding que necesitan implementación técnica de sus diseños
- Consultoras de comunicación con proyectos web esporádicos
- Agencias que tienen desarrolladores pero necesitan capacidad extra

---

### 3.3 Cómo colaboro con agencias

**Introducción de sección:**
```
Me integro como socio técnico detrás de escena.

Trabajo junto a agencias, estudios y profesionales independientes que necesitan
convertir diseños y estrategias en sitios web funcionales, manteniendo ellos
la relación con sus clientes.
```

**Título:** `Cómo colaboro con agencias`

**Objetivo de diseño:** No demostrar autoridad — reducir la incertidumbre.
La agencia debe poder visualizarse trabajando con este perfil desde el primer momento.
Cada bloque responde: *"¿Cómo encaja esta persona dentro de mi proceso actual?"*

---

#### Modelo A — Agencia de Branding

**Flujo:**
1. La agencia lidera la estrategia y el diseño
2. Recibo los diseños aprobados en Figma
3. Desarrollo el sitio respetando la propuesta visual al detalle
4. Realizo ajustes y optimizaciones técnicas
5. La agencia mantiene la relación con el cliente final

**Resultado:** La agencia amplía su capacidad de ejecución sin incorporar un desarrollador interno.

---

#### Modelo B — Agencia de Marketing Digital

**Flujo:**
1. La agencia vende una web corporativa o landing page
2. Definimos alcance y requerimientos técnicos juntos
3. Desarrollo el proyecto y realizo las pruebas
4. Entrego el sitio listo para publicar

**Resultado:** La agencia puede ofrecer desarrollo web sin depender de recursos propios.

---

#### Modelo C — Estudio Creativo o Diseñador Freelance

**Flujo:**
1. El diseñador se enfoca en la experiencia visual
2. Yo transformo el diseño en un sitio funcional y optimizado
3. Coordinamos revisiones hasta la aprobación final

**Resultado:** El diseñador puede ofrecer proyectos completos sin involucrarse en la implementación técnica.

---

**Nota de implementación visual:**
Cada modelo se presenta como un bloque con encabezado (tipo de colaborador), lista de pasos numerados con línea lateral izquierda (`border-l-2 border-[#0EA5E9]`), y resultado en texto destacado al pie. Los tres bloques en grid `grid-cols-1 md:grid-cols-3` sin cards con shadow — separación por `border-t` o `gap-8`. En mobile, stack vertical con el mismo orden.

---

### 3.4 Cómo funciona — Proceso en 4 pasos

**Título:** `Así trabajamos juntos`

```
01 — Briefing
Me contás el proyecto: cliente, objetivos, plazos, si hay diseño hecho.
Sin formularios largos — una llamada o un mensaje alcanza.

02 — Relevamiento y propuesta
Analizo el alcance y te mando una propuesta clara: qué incluye,
qué no incluye, plazo estimado y precio.

03 — Producción
Trabajo con revisiones acordadas. Te muestro avances en los hitos pactados.
Vos sos el punto de contacto — yo no hablo con el cliente final salvo que lo indiques.

04 — Entrega
Sitio funcional, documentación técnica básica incluida.
El cliente cree que lo hizo tu equipo. Así debería ser.
```

---

### 3.5 Preguntas frecuentes

**¿Podés trabajar bajo la marca de mi agencia?**
Sí. Todo lo que construyo puede presentarse como trabajo de tu equipo. No incluyo créditos ni menciones salvo acuerdo explícito.

**¿Necesitás que el diseño esté 100% terminado para empezar?**
No. Puedo empezar con wireframes o referencias visuales claras y construir mientras el diseño se afina. Lo importante es definir el alcance antes.

**¿Trabajás con diseños de otras herramientas además de Figma?**
Sí. Figma es lo más eficiente, pero también trabajo con Adobe XD, referencias visuales o briefs detallados.

**¿Qué pasa si el alcance cambia?**
Los cambios de alcance se acuerdan antes de ejecutarse, con impacto en plazo y precio documentado. No hay sorpresas.

**¿Trabajás con proyectos chicos o solo grandes?**
Trabajo con ambos. Una landing de una semana o un sitio de tres meses — el proceso es el mismo.

**¿Puedo mandarte un proyecto urgente?**
Depende de mi disponibilidad actual. Hablame y vemos. Si no puedo, te lo digo sin rodeos.

---

### 3.6 CTA Final

**Título:** `¿Tenés un proyecto para hablar?`

**Cuerpo:**
```
Sin compromiso. Contame qué necesitás y te respondo
con lo que puedo hacer y en qué plazo.
```

**CTA primario:** `Escribime por email`

---

### 3.7 Reemplazo de texto en `sobre-mi`

**Texto actual (eliminar):**
```
Me dedico a construir herramientas digitales para pequeños comercios:
sitios web en WordPress y Tienda Nube. Así como también aplicaciones
de escritorio para gestión interna.
```

**Texto de reemplazo:**
```
Construyo sitios web con foco en diseño, performance y posicionamiento.
Trabajo con clientes directos y como partner técnico de agencias que
necesitan producción web de calidad para sus propios clientes.

Me interesa el detalle visual, la velocidad de carga y que los sitios
aparezcan donde tienen que aparecer.
```

---

## 4. Métricas y Eventos GA4

### 4.1 Eventos a trackear en `/agencias`

| Evento | Trigger | Parámetro |
|--------|---------|-----------|
| `agency_page_view` | Carga de `/agencias` | `locale` |
| `agency_cta_email` | Click en CTA email | `position` (hero / final) |
| `agency_project_click` | Click en caso de estudio | `project_id` |
| `agency_faq_expand` | Expand de pregunta FAQ | `question_index` |
| `agency_scroll_depth` | 25 / 50 / 75 / 100% | `depth` |

### 4.2 KPIs de conversión

| KPI | Definición | Target inicial |
|-----|-----------|----------------|
| CTR a WhatsApp | clicks WA / sessions en `/agencias` | > 5% |
| Scroll depth 75% | % de usuarios que leen hasta FAQ | > 40% |
| Bounce rate | usuarios que salen sin interacción | < 60% |
| Tiempo en página | promedio de sesión | > 90s |

---

## 5. Arquitectura Técnica

### 5.1 Rama Git

```bash
git checkout -b feature/FEATURE-06-partners-agencias
```

### 5.2 Estructura de archivos nuevos

```
src/
├── pages/
│   ├── AgenciasPage.jsx          ← Ruta /agencias (ES)
│   └── AgenciesPageEN.jsx        ← Ruta /en/agencies (EN)
├── features/
│   └── agencias/
│       ├── AgenciasHero.jsx
│       ├── AgenciasParaQuien.jsx
│       ├── AgenciasCasosDeUso.jsx
│       ├── AgenciasProceso.jsx
│       ├── AgenciasProyectos.jsx
│       ├── AgenciasFAQ.jsx
│       └── AgenciasCTAFinal.jsx
├── locales/
│   ├── es/
│   │   └── agencias.js           ← Textos ES (fuente de verdad)
│   └── en/
│       └── agencies.js           ← Textos EN
```

### 5.3 Routing (App.jsx)

```jsx
// Agregar a las rutas existentes en src/App.jsx
import { lazy } from 'react'

const AgenciasPage = lazy(() => import('./pages/AgenciasPage'))
const AgenciesPageEN = lazy(() => import('./pages/AgenciesPageEN'))

// Dentro del router:
<Route path="/agencias" element={<AgenciasPage />} />
<Route path="/en/agencies" element={<AgenciesPageEN />} />
```

### 5.4 Locale file (src/locales/es/agencias.js)

```javascript
export const agencias = {
  hero: {
    headline: "El desarrollador técnico\nque tu agencia necesita.",
    subheadline: "Construyo los sitios que vos vendés. Diseño custom, performance real, entrega profesional. Tus clientes no saben que existo — a menos que quieras.",
    ctaPrimario: "Hablemos de tu proyecto",
    ctaSecundario: "Ver proyectos",
  },
  paraQuien: {
    titulo: "¿Tu agencia vende sitios web pero no los produce?",
    cuerpo: "Si tenés clientes que piden presencia digital pero tu equipo está enfocado en estrategia, branding o marketing — podemos trabajar juntos. No compito con vos. No contacto a tus clientes. No tengo agenda propia.",
    perfiles: [
      "Agencias de marketing digital que venden diseño y desarrollo como paquete",
      "Estudios de branding que necesitan implementación técnica de sus diseños",
      "Consultoras de comunicación con proyectos web esporádicos",
      "Agencias que tienen desarrolladores pero necesitan capacidad extra",
    ],
  },
  colaboracion: {
    titulo: "Cómo colaboro con agencias",
    intro: "Me integro como socio técnico detrás de escena. Trabajo junto a agencias, estudios y profesionales independientes que necesitan convertir diseños y estrategias en sitios web funcionales, manteniendo ellos la relación con sus clientes.",
    modelos: [
      {
        tipo: "Agencia de Branding",
        pasos: [
          "La agencia lidera la estrategia y el diseño",
          "Recibo los diseños aprobados en Figma",
          "Desarrollo el sitio respetando la propuesta visual al detalle",
          "Realizo ajustes y optimizaciones técnicas",
          "La agencia mantiene la relación con el cliente final",
        ],
        resultado: "La agencia amplía su capacidad de ejecución sin incorporar un desarrollador interno.",
      },
      {
        tipo: "Agencia de Marketing Digital",
        pasos: [
          "La agencia vende una web corporativa o landing page",
          "Definimos alcance y requerimientos técnicos juntos",
          "Desarrollo el proyecto y realizo las pruebas",
          "Entrego el sitio listo para publicar",
        ],
        resultado: "La agencia puede ofrecer desarrollo web sin depender de recursos propios.",
      },
      {
        tipo: "Estudio Creativo o Diseñador Freelance",
        pasos: [
          "El diseñador se enfoca en la experiencia visual",
          "Yo transformo el diseño en un sitio funcional y optimizado",
          "Coordinamos revisiones hasta la aprobación final",
        ],
        resultado: "El diseñador puede ofrecer proyectos completos sin involucrarse en la implementación técnica.",
      },
    ],
  },
  proceso: {
    titulo: "Así trabajamos juntos",
    pasos: [
      { numero: "01", titulo: "Briefing", descripcion: "Me contás el proyecto: cliente, objetivos, plazos, si hay diseño hecho. Sin formularios largos — una llamada o un mensaje alcanza." },
      { numero: "02", titulo: "Relevamiento y propuesta", descripcion: "Analizo el alcance y te mando una propuesta clara: qué incluye, qué no incluye, plazo estimado y precio." },
      { numero: "03", titulo: "Producción", descripcion: "Trabajo con revisiones acordadas. Te muestro avances en los hitos pactados. Vos sos el punto de contacto." },
      { numero: "04", titulo: "Entrega", descripcion: "Sitio funcional, documentación técnica básica incluida. El cliente cree que lo hizo tu equipo. Así debería ser." },
    ],
  },
  faq: {
    titulo: "Preguntas frecuentes",
    items: [
      { pregunta: "¿Podés trabajar bajo la marca de mi agencia?", respuesta: "Sí. Todo lo que construyo puede presentarse como trabajo de tu equipo. No incluyo créditos ni menciones salvo acuerdo explícito." },
      { pregunta: "¿Necesitás que el diseño esté 100% terminado para empezar?", respuesta: "No. Puedo empezar con wireframes o referencias visuales claras. Lo importante es definir el alcance antes." },
      { pregunta: "¿Qué pasa si el alcance cambia?", respuesta: "Los cambios de alcance se acuerdan antes de ejecutarse, con impacto en plazo y precio documentado. No hay sorpresas." },
      { pregunta: "¿Trabajás con proyectos chicos o solo grandes?", respuesta: "Trabajo con ambos. Una landing de una semana o un sitio de tres meses — el proceso es el mismo." },
      { pregunta: "¿Podés mandarme un proyecto urgente?", respuesta: "Depende de mi disponibilidad actual. Hablame y vemos. Si no puedo, te lo digo sin rodeos." },
    ],
  },
  ctaFinal: {
    titulo: "¿Tenés un proyecto para hablar?",
    cuerpo: "Sin compromiso. Contame qué necesitás y te respondo con lo que puedo hacer y en qué plazo.",
    ctaPrimario: "Escribime por email",
  },
}
```

### 5.5 Componente AgenciasHero.jsx (estructura base)

```jsx
// src/features/agencias/AgenciasHero.jsx
// NOTA: No entregar archivo completo — integrar con snippets
// Este componente usa useLocale() — nunca importar agencias.js directamente

import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useLocale } from '../../hooks/useLocale'

// Framer Motion — spring config ONGEVAG
const springConfig = { type: "spring", stiffness: 100, damping: 20 }

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: springConfig }
}

// Email de contacto profesional — viene de config o env, nunca hardcodeado
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=Partner%20técnico%20—%20[nombre%20de%20agencia]`

export default function AgenciasHero() {
  const { t } = useLocale()
  const copy = t.agencias.hero

  return (
    <section className="min-h-[100dvh] flex items-center bg-[#0F172A]">
      <motion.div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Texto — 3/5 del ancho en desktop */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <motion.h1
            variants={itemVariants}
            className="font-syne font-bold text-5xl lg:text-7xl text-white leading-tight tracking-tight"
          >
            {/* Headline con salto de línea del locale */}
            {copy.headline.split('\n').map((line, i) => (
              <span key={i} className={i === 1 ? 'text-[#0EA5E9]' : ''}>{line}<br /></span>
            ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-dm-sans text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            {copy.subheadline}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a
              href={MAILTO_URL}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0EA5E9] text-white font-dm-sans font-medium rounded-lg active:scale-95 transition-transform duration-100"
              onClick={() => trackEvent('agency_cta_email', { position: 'hero' })}
            >
              <Mail size={18} />
              {copy.ctaPrimario}
            </a>
            <a
              href="#colaboracion"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-300 font-dm-sans font-medium rounded-lg hover:border-slate-500 transition-colors"
            >
              {copy.ctaSecundario}
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        {/* Espacio visual derecha — 2/5 — placeholder para elemento decorativo */}
        <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
          {/* Ver sección 5.6: elemento visual */}
        </div>
      </motion.div>
    </section>
  )
}
```

### 5.6 Elemento visual del Hero (lado derecho)

No usar imagen stock ni ilustración genérica. Opciones ordenadas por impacto:

**Opción A (recomendada):** Mini mockup animado de un sitio siendo construido — bloques que aparecen con stagger, líneas de código que se escriben. Puramente CSS/Framer Motion, sin imágenes externas.

**Opción B:** Proceso simplificado en 3 líneas con íconos — "Figma → Código → Sitio" — con animación de línea entre ellos.

**Opción C:** Dejar el espacio vacío con un grid sutil (`bg-slate-800/20 border border-slate-700/30`) — funciona bien con `VISUAL_DENSITY: 4`.

### 5.7 Proceso en 4 pasos — Variante desktop (línea horizontal)

```jsx
// Desktop: flex-row con línea entre pasos
// Mobile: flex-col con línea lateral izquierda
// Usar border-t (desktop) y border-l (mobile) — NO cards con shadow

<div className="
  grid grid-cols-1 md:grid-cols-4 gap-0
  border-t border-slate-700 pt-8
">
  {pasos.map((paso, i) => (
    <div key={i} className="
      flex flex-col gap-3 px-0 md:pr-8
      border-b md:border-b-0 md:border-r border-slate-700
      last:border-0 pb-8 md:pb-0
    ">
      <span className="font-mono text-xs text-slate-500 tracking-widest">{paso.numero}</span>
      <h3 className="font-syne font-bold text-white text-lg">{paso.titulo}</h3>
      <p className="font-dm-sans text-slate-400 text-sm leading-relaxed">{paso.descripcion}</p>
    </div>
  ))}
</div>
```

### 5.8 FAQ — Accordion sin librería externa

```jsx
// useState local — sin dependencias adicionales
// border-t para separación — sin cards

const [abierto, setAbierto] = useState(null)

{items.map((item, i) => (
  <div key={i} className="border-t border-slate-700 py-5">
    <button
      className="w-full flex justify-between items-center text-left gap-4"
      onClick={() => setAbierto(abierto === i ? null : i)}
    >
      <span className="font-dm-sans font-medium text-white">{item.pregunta}</span>
      <ChevronDown
        size={18}
        className={`text-slate-400 transition-transform duration-200 ${abierto === i ? 'rotate-180' : ''}`}
      />
    </button>
    {abierto === i && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="mt-3 font-dm-sans text-slate-400 text-sm leading-relaxed"
      >
        {item.respuesta}
      </motion.p>
    )}
  </div>
))}
```

### 5.9 SEO meta tags para `/agencias`

```jsx
// En AgenciasPage.jsx — usando React Helmet (ya instalado)
<Helmet>
  <title>Partner técnico para agencias — ONGEVAG</title>
  <meta name="description" content="Desarrollo web white-label para agencias de marketing y branding. Construyo los sitios que vos vendés, con diseño custom, performance y SEO desde el código." />
  <link rel="canonical" href="https://www.ongevag.com/agencias" />
  <link rel="alternate" hrefLang="en" href="https://www.ongevag.com/en/agencies" />
  <meta property="og:title" content="Partner técnico para agencias — ONGEVAG" />
  <meta property="og:description" content="Desarrollo web white-label para agencias que necesitan un desarrollador de confianza para tercerizar sus proyectos web." />
  <meta property="og:url" content="https://www.ongevag.com/agencias" />
</Helmet>
```

---

## 6. Integración con Sitemap y FEATURE-02

Agregar en el sitemap existente (FEATURE-02):
```
https://www.ongevag.com/agencias       → priority 0.9, changefreq: monthly
https://www.ongevag.com/en/agencies    → priority 0.9, changefreq: monthly
```

---

## 7. Teaser en Home (/) — Bloque mínimo

Agregar al final de la sección de servicios en la home, antes del formulario de contacto:

```
¿Sos de una agencia? →  [Ver propuesta para agencias]
```

Link interno a `/agencias`. Un `border-t` con una línea de texto + link. Sin section completa en la home.

---

## 8. Cambios en Archivos Existentes

| Archivo | Cambio |
|---------|--------|
| `src/App.jsx` | Agregar rutas `/agencias` y `/en/agencies` con lazy import |
| `src/components/Header.jsx` | Agregar ítem `Para agencias` en nav, path-aware para ES/EN |
| `src/locales/es/common.js` | Agregar `agenciasNav: "Para agencias"` |
| `src/locales/en/common.js` | Agregar `agenciasNav: "For agencies"` |
| `src/components/About.jsx` | Reemplazar texto de `sobre-mi` (ver Sección 3.7) |
| `.env` / `.env.example` | Agregar `VITE_CONTACT_EMAIL=tu@email.com` |
| `docs/sitemap.xml` (o generador) | Agregar las 2 nuevas URLs |
| `CLAUDE.md` | Actualizar Current Phase + Module Index |
| `docs/SDD_MASTER.md` | Agregar FEATURE-06 al Module Registry |

---

## 9. Tasks (desglose para ejecución)

| ID | Tarea | Archivo | Estimado |
|----|-------|---------|----------|
| T-00 | Agregar `VITE_CONTACT_EMAIL` en `.env` y `.env.example` | `.env` | 5 min |
| T-01 | Crear rama Git | — | 5 min |
| T-02 | Crear locale `es/agencias.js` con todos los textos | `src/locales/es/agencias.js` | 20 min |
| T-03 | Crear locale `en/agencies.js` (traducción) | `src/locales/en/agencies.js` | 20 min |
| T-04 | Registrar locales en LocaleProvider | `src/context/LocaleProvider.jsx` | 10 min |
| T-05 | Crear componente `AgenciasHero.jsx` | `src/features/agencias/` | 45 min |
| T-06 | Crear componente `AgenciasParaQuien.jsx` | `src/features/agencias/` | 30 min |
| T-07 | Crear componente `AgenciasColaboracion.jsx` | `src/features/agencias/` | 35 min |
| T-08 | Crear componente `AgenciasProceso.jsx` | `src/features/agencias/` | 30 min |
| T-09 | Crear componente `AgenciasFAQ.jsx` | `src/features/agencias/` | 30 min |
| T-10 | Crear componente `AgenciasCTAFinal.jsx` | `src/features/agencias/` | 20 min |
| T-11 | Crear `AgenciasPage.jsx` (composición) | `src/pages/` | 20 min |
| T-12 | Crear `AgenciesPageEN.jsx` (espejo EN) | `src/pages/` | 15 min |
| T-13 | Agregar rutas en `App.jsx` | `src/App.jsx` | 10 min |
| T-14 | Agregar ítem nav en `Header.jsx` | `src/components/Header.jsx` | 15 min |
| T-15 | Reemplazar texto en `About.jsx` | `src/components/About.jsx` | 10 min |
| T-16 | Agregar teaser en home (`/`) | sección servicios home | 15 min |
| T-17 | Actualizar sitemap | sitemap.xml o generador | 10 min |
| T-18 | SEO meta tags en ambas páginas | Helmet en Pages | 15 min |
| T-19 | QA manual — desktop y mobile (ambas rutas) | — | 30 min |
| T-20 | Actualizar `CLAUDE.md` y `SDD_MASTER.md` | docs/ | 10 min |

**Total estimado:** ~6 horas (implementación + QA manual)

---

## 10. Decisiones No Triviales (ADR pendiente)

### ADR-012 — Ruta dedicada `/agencias` vs sección en home

**Contexto:** Se evaluó agregar una sección en la home vs una ruta dedicada.

**Decisión:** Ruta dedicada `/agencias`.

**Razones:**
1. URL directa para prospección en frío (LinkedIn, email)
2. SEO independiente con meta tags propios
3. Copy específico sin interferir con el mensaje de la home
4. Analítica separada (eventos y funnel propio)
5. Escalable: se puede enriquecer sin afectar la home

**Consecuencias:** Requiere ítem adicional en Header y mantenimiento de 2 locales extra.

---

**Archivo listo para implementación.**  
Próximo paso: T-01 (rama Git) → T-02 (locale ES).

**Last updated:** 2026-06-14  
**Revisión requerida:** Leo Gavegno — aprobación antes de T-05
