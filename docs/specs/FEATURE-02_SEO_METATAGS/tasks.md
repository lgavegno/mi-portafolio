# FEATURE-02: SEO Meta Tags & Open Graph — Task Breakdown

**Versión del Plan:** 1.0  
**Estado:** Pronto a ejecutar  
**Esfuerzo Total Estimado:** 3.5h  
**Inicio:** 2026-06-08  
**Target Completación:** 2026-06-09  

---

## Overview Rápido

FEATURE-02 implementa SEO técnico completo:
1. **Fase A:** Asset setup (og-image.png placeholder)
2. **Fase B:** Static HTML meta tags en index.html
3. **Fase C:** Dynamic meta tags vía React Helmet Async en BlogPostDetail.jsx y ProjectDetail.jsx
4. **Fase D:** Generación de sitemap.xml + validación final

---

## Fase A: Asset Setup (0.5h)

### T-01: Generar og-image.png placeholder (1200×630px)
**Esfuerzo:** 0.5h  
**Dependencias:** Ninguna  
**Criterios de Aceptación:**
- [ ] Archivo `public/og-image.png` existe (no es SVG)
- [ ] Resolución exacta: 1200×630px
- [ ] Tamaño de archivo: <50KB
- [ ] Fondo oscuro (matching brand: #1a1a1a o similar)
- [ ] Accesible localmente sin errores 404 en dev server
- [ ] Compilación sin warnings: `npm run build`

**Subtasks:**
1. Crear imagen base en herramienta gráfica (Figma, GIMP, o Sharp CLI)
2. Exportar como PNG optimizado
3. Colocar en `public/og-image.png`
4. Verificar que `public/` es servido correctamente en Vite

**Notas:**
- Puede ser placeholder sencillo: fondo oscuro + "ONGEVAG" en blanco
- Si no se dispone de herramienta gráfica: usar `sharp` CLI de Node.js
  ```bash
  npm install --save-dev sharp
  # Sub-tarea previa: garantizar que public/ existe antes de ejecutar
  mkdir -p public && node -e "const sharp = require('sharp'); sharp({create: {width: 1200, height: 630, channels: 3, background: {r: 26, g: 26, b: 26}}}).png().toFile('public/og-image.png');"
  ```
- El `mkdir -p public` es obligatorio para entornos de CI limpia o contenedores donde el directorio puede no existir
- Considerar reemplazar con asset real (png de branding) después

---

## Fase B: Static Meta Tags en index.html (0.5h)

### T-02: Configurar lang="en" en raíz HTML
**Esfuerzo:** 5min  
**Dependencias:** Ninguna  
**Criterios de Aceptación:**
- [ ] Tag `<html lang="en">` está presente en index.html (línea 1-10)
- [ ] No hay conflicto con atributos previos
- [ ] Build sin errores: `npm run build`

**Subtasks:**
1. Abrir `index.html` en editor
2. Localizar tag `<html>`
3. Cambiar/agregar atributo `lang="en"`
4. Guardar

**Notas:**
- Idioma base es EN (US/EU target market)
- Locale alternativo ES manejado vía hreflang + ruta `/es`

---

### T-03: Actualizar <title> con contenido SEO optimizado
**Esfuerzo:** 5min  
**Dependencias:** Ninguna  
**Criterios de Aceptación:**
- [ ] Tag `<title>` contiene: "Ongevag — Desarrollo Web & IA para PyMEs"
- [ ] Longitud máxima: 60 caracteres (actual: 59 chars ✅)
- [ ] Keywords prioritarios incluidos: "Dezvolamento Web", "IA"
- [ ] Build sin errores

**Subtasks:**
1. Localizar `<title>` actual en `index.html`
2. Reemplazar con nuevo título
3. Guardar
4. Verificar longitud en navegador (DevTools > Elements)

**Notas:**
- Google mostrará primeros ~60 chars en SERP
- "Ongevag" como brand + service descriptor

---

### T-04: Optimizar <meta name="description">
**Esfuerzo:** 5min  
**Dependencias:** Ninguna  
**Criterios de Aceptación:**
- [ ] Meta description está presente
- [ ] Texto: "Soluciones web y IA para PyMEs argentinas. Desarrollamos landing pages, tiendas online, sistemas internos y automatización con tecnología moderna."
- [ ] Longitud: 150–160 caracteres (actual: 158 chars ✅)
- [ ] Incluye keywords: "web", "IA", "PyMEs", "argentina"

**Current candidate:**
```html
<meta name="description" content="Soluciones web y IA para PyMEs argentinas. Desarrollamos landing pages, tiendas online, sistemas internos y automatización con tecnología moderna." />
```

**Subtasks:**
1. Localizar `<meta name="description">`
2. Reemplazar content
3. Guardar
4. Verificar longitud (DevTools)

---

### T-05: Agregar <meta name="keywords"> EN
**Esfuerzo:** 5min  
**Dependencias:** Ninguna  
**Criterios de Aceptación:**
- [ ] Meta keywords present
- [ ] Keywords (5-8 en inglés): "web development, AI solutions, PyME tools, full-stack, React, Tauri"
- [ ] Separados por comas
- [ ] No excede 160 caracteres

**Current candidate:**
```html
<meta name="keywords" content="web development, AI solutions, PyME tools, full-stack developer, React, Tauri, next.js" />
```

**Subtasks:**
1. Agregar new `<meta name="keywords">` tag en `<head>`
2. Colocar después de description meta
3. Guardar

**Notas:**
- Menos crítico que title/description, pero mejora SEO signal
- Evitar keyword stuffing

---

### T-06: Configurar bloque Open Graph completo (estatico)
**Esfuerzo:** 10min  
**Dependencias:** T-01 (og-image.png debe existir)  
**Criterios de Aceptación:**
- [ ] 6 tags OG presentes: og:title, og:description, og:image, og:locale, og:url, og:type
- [ ] URLs absolutas (no relativas): `https://www.ongevag.com`
- [ ] og:image apunta a `https://www.ongevag.com/og-image.png`
- [ ] og:locale="en_US"
- [ ] og:type="website"
- [ ] Social crawler test pasa (meta tags visibles en preview)

**HTML Block:**
```html
<!-- Open Graph -->
<meta property="og:title" content="Ongevag — Desarrollo Web & IA para PyMEs" />
<meta property="og:description" content="Soluciones web y IA para PyMEs argentinas. Desarrollamos landing pages, tiendas online, sistemas internos y automatización con tecnología moderna." />
<meta property="og:image" content="https://www.ongevag.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="https://www.ongevag.com" />
<meta property="og:type" content="website" />
```

**Subtasks:**
1. Localizar sección `<head>` en index.html
2. Agregar bloque OG completo después de meta description
3. Asegurar URLs absolutas
4. Guardar
5. Verificar en DevTools > Elements

**Notas:**
- WhatsApp, LinkedIn, Twitter usan estos tags para preview cards
- og:image:width y og:image:height mejoran rendering en some platforms

---

### T-07: Configurar Twitter Card tags
**Esfuerzo:** 5min  
**Dependencias:** T-01  
**Criterios de Aceptación:**
- [ ] Meta twitter:card presente con valor "summary_large_image"
- [ ] twitter:title presente
- [ ] twitter:description presente
- [ ] twitter:image presente (URL absoluta)

**HTML Block:**
```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Ongevag — Desarrollo Web & IA para PyMEs" />
<meta name="twitter:description" content="Soluciones web y IA para PyMEs argentinas. Desarrollamos landing pages, tiendas online, sistemas internos y automatización." />
<meta name="twitter:image" content="https://www.ongevag.com/og-image.png" />
```

**Subtasks:**
1. Agregar bloque Twitter Card en `<head>`
2. Colocar después de Open Graph
3. Guardar

---

### T-08: Fijar rel="canonical" verificado
**Esfuerzo:** 5min  
**Dependencias:** Ninguna  
**Criterios de Aceptación:**
- [ ] Tag `<link rel="canonical">` presente
- [ ] href="https://www.ongevag.com" (URL absoluta, trailing slash opcional)
- [ ] No conflicto con hreflang

**HTML tag:**
```html
<link rel="canonical" href="https://www.ongevag.com" />
```

**Subtasks:**
1. Localizar o crear canonical tag en `<head>`
2. Apuntar a home URL
3. Guardar
4. Verificar en DevTools

**Notas:**
- Canonical previene duplicate content issues
- Home tiene canonical a sí misma (autoreferencial, correcto)

---

### T-09: Inyectar hreflang cruzados (EN ↔ ES)
**Esfuerzo:** 5min  
**Dependencias:** FEATURE-01 (rutas `/es` deben existir)  
**Criterios de Aceptación:**
- [ ] 3 tags hreflang presentes:
  - `rel="alternate" hreflang="en" href="https://www.ongevag.com"`
  - `rel="alternate" hreflang="es" href="https://www.ongevag.com/es"`
  - `rel="alternate" hreflang="x-default" href="https://www.ongevag.com"`
- [ ] URLs absolutas
- [ ] Bidireccionalmente correctos (home EN ↔ home ES)
- [ ] No conflictos con canonical

**HTML Block:**
```html
<!-- hreflang Alternates -->
<link rel="alternate" hreflang="en" href="https://www.ongevag.com" />
<link rel="alternate" hreflang="es" href="https://www.ongevag.com/es" />
<link rel="alternate" hreflang="x-default" href="https://www.ongevag.com" />
```

**Subtasks:**
1. Agregar 3 tags hreflang en `<head>`
2. Asegurar URLs absolutas
3. Verificar que `/es` route existe (FEATURE-01)
4. Guardar

**Notas:**
- Google usa esto para entender locale variants
- x-default = fallback si locale no coincide
- Crítico para SEO internacional

---

## Fase C: Dynamic Meta Tags vía React Helmet Async (1.5h)

### T-10: Implementar <Helmet> en BlogPostDetail.jsx
**Esfuerzo:** 30min  
**Dependencias:** T-06 (OG image assets listos)  
**Criterios de Aceptación:**
- [ ] Helmet component importado de `react-helmet-async`
- [ ] Meta dinámicos extraídos de `post` object:
  - `og:title` = `post.title` (max 60 chars)
  - `og:description` = `post.excerpt` (truncado a 155 chars)
  - `og:image` = `post.image` (Unsplash URL nativa)
  - `og:url` = `https://www.ongevag.com/blog/${post.slug}` (URL absoluta)
- [ ] hreflang bidireccional instalado:
  - EN: `/blog/:slug`
  - ES: `/es/blog/:slug`
- [ ] Truncado de strings con función helper (no hardcodear max lengths)
- [ ] Fallback a og-image.png si post.image vacío
- [ ] Componente renderiza sin errores en dev server

**Location:** `src/pages/BlogPostDetail.jsx`

**Code Pattern:**
```javascript
import { Helmet } from 'react-helmet-async';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  const truncateText = (text, maxLen) => 
    text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;

  const pageUrl = `https://www.ongevag.com/blog/${post.slug}`;
  const pageUrlEs = `https://www.ongevag.com/es/blog/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{post.title} — Ongevag Blog</title>
        <meta name="description" content={truncateText(post.excerpt, 155)} />
        
        {/* Open Graph Dynamic */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={truncateText(post.excerpt, 155)} />
        <meta property="og:image" content={post.image || 'https://www.ongevag.com/og-image.png'} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />

        {/* hreflang Bidireccional */}
        <link rel="alternate" hreflang="en" href={pageUrl} />
        <link rel="alternate" hreflang="es" href={pageUrlEs} />
        <link rel="alternate" hreflang="x-default" href={pageUrl} />

        {/* Canonical */}
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* Content */}
      <article>
        {/* ... rest of blog post layout ... */}
      </article>
    </>
  );
};
```

**Subtasks:**
1. Abrir `src/pages/BlogPostDetail.jsx`
2. Importar `Helmet` from `react-helmet-async`
3. Crear función helper `truncateText(text, maxLen)`
4. Envolver componente root con `<Helmet>` tags
5. Mapear `post.title`, `post.excerpt`, `post.image` a meta props
6. Testear en dev server con DevTools > Elements
7. Verificar preview en social (opcional: shared link via ngrok)

**Notas:**
- `react-helmet-async` ya debe estar instalado (check package.json)
- HelmetProvider debe estar en App root (check App.jsx)
- post.image es URL de Unsplash (validar formato)

---

### T-11: Implementar <Helmet> en ProjectDetail.jsx
**Esfuerzo:** 30min  
**Dependencias:** T-06, T-10  
**Criterios de Aceptación:**
- [ ] Helmet component importado de `react-helmet-async`
- [ ] Meta dinámicos extraídos de `project` object:
  - `og:title` = `project.name` (max 60 chars)
  - `og:description` = `project.shortDescription` (truncado a 155 chars)
  - `og:image` = `project.image` (con fallback a og-image.png)
  - `og:url` = `https://www.ongevag.com/works/${project.id}`
- [ ] hreflang bidireccional:
  - EN: `/works/:id` (conforme ruta declarada en App.jsx / FEATURE-05)
  - ES: `/es/works/:id`
- [ ] Truncado de strings con función helper
- [ ] Componente renderiza sin errores
- [ ] Validación: si project.shortDescription no existe, usar project.description truncado

**⚠️ Nota de Routing:** La ruta canónica para proyectos es `/works/:id` (Works.jsx, FEATURE-05). Verificar en `App.jsx` antes de codificar las URLs absolutas — si el router usa un path diferente, ajustar `pageUrl` y `pageUrlEs` acordemente y actualizar el sitemap en T-14.

**Location:** `src/pages/ProjectDetail.jsx`

**Code Pattern:**
```javascript
import { Helmet } from 'react-helmet-async';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) return <div>Project not found</div>;

  const truncateText = (text, maxLen) => 
    text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;

  // Fallback: si no existe shortDescription, usar description
  const description = project.shortDescription || project.description;

  // ⚠️ Ajustar ruta si App.jsx declara path distinto a /works/:id
  const pageUrl = `https://www.ongevag.com/works/${project.id}`;
  const pageUrlEs = `https://www.ongevag.com/es/works/${project.id}`;

  return (
    <>
      <Helmet>
        <title>{project.name} — Ongevag Works</title>
        <meta name="description" content={truncateText(description, 155)} />
        
        {/* Open Graph Dynamic */}
        <meta property="og:title" content={project.name} />
        <meta property="og:description" content={truncateText(description, 155)} />
        <meta property="og:image" content={project.image || 'https://www.ongevag.com/og-image.png'} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />

        {/* hreflang Bidireccional */}
        <link rel="alternate" hreflang="en" href={pageUrl} />
        <link rel="alternate" hreflang="es" href={pageUrlEs} />
        <link rel="alternate" hreflang="x-default" href={pageUrl} />

        {/* Canonical */}
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* Content */}
      <div className="project-detail">
        {/* ... rest of project layout ... */}
      </div>
    </>
  );
};
```

**Subtasks:**
1. Abrir `src/pages/ProjectDetail.jsx`
2. Importar `Helmet` from `react-helmet-async`
3. Crear función helper `truncateText(text, maxLen)`
4. Envolver componente root con `<Helmet>` tags
5. Mapear `project.name`, `project.shortDescription` (con fallback), `project.image` a meta props
6. Testear en dev server
7. Verificar preview en social

**Notas:**
- Ruta puede ser `/proyecto/:id` o `/works/:id` — ajustar según App.jsx routing
- Validar que `projectsData` exporta `shortDescription` (si no, usar description truncado)

---

### T-12: Crear dos commits separados en Git (BlogPostDetail + ProjectDetail)
**Esfuerzo:** 5min  
**Dependencias:** T-10, T-11  
**Criterios de Aceptación:**
- [ ] Commit 1: `feat(seo): add Helmet dynamic meta in BlogPostDetail.jsx`
  - Incluye solo cambios en BlogPostDetail.jsx
  - Message claro y referencias spec
- [ ] Commit 2: `feat(seo): add Helmet dynamic meta in ProjectDetail.jsx`
  - Incluye solo cambios en ProjectDetail.jsx
  - Message claro y referencias spec
- [ ] Ambos commits aplicados en git log
- [ ] No hay merge commits, historia limpia

**Subtasks:**
1. Stage cambios de BlogPostDetail.jsx: `git add src/pages/BlogPostDetail.jsx`
2. Commit: `git commit -m "feat(seo): add Helmet dynamic meta in BlogPostDetail.jsx"`
3. Stage cambios de ProjectDetail.jsx: `git add src/pages/ProjectDetail.jsx`
4. Commit: `git commit -m "feat(seo): add Helmet dynamic meta in ProjectDetail.jsx"`
5. Verificar history: `git log --oneline -5`

**Notas:**
- Commits separados facilitan code review y revert selectivo
- Conventional Commits format: `feat(scope): message`

---

## Fase D: Sitemap + Validación Final (1.0h)

### T-13: Mapear URLs reales del blog + proyectos
**Esfuerzo:** 10min  
**Dependencias:** Ninguna (validación cruzada con código)  
**Criterios de Aceptación:**
- [ ] Lista de URLs home (EN + ES)
- [ ] Lista de URLs blog (home EN, posts EN con slugs reales)
- [ ] Lista de URLs blog ES (home ES, posts ES con slugs reales)
- [ ] Lista de URLs proyectos (IDs reales de projectsData)
- [ ] Todas las URLs son absolutas (https://...)
- [ ] Total ≥10 URLs

**Audit Checklist:**
```
Home:
  - https://www.ongevag.com           (priority: 0.9)
  - https://www.ongevag.com/es        (priority: 0.9)

Blog (EN):
  - https://www.ongevag.com/blog      (priority: 0.8)
  - https://www.ongevag.com/blog/slug-1
  - https://www.ongevag.com/blog/slug-2
  - ... (cada post real en blogData.js)

Blog (ES):
  - https://www.ongevag.com/es/blog   (priority: 0.8)
  - https://www.ongevag.com/es/blog/slug-1
  - ... (cada post en ES)

Works (EN):
  - https://www.ongevag.com/works     (priority: 0.8, verificar ruta en App.jsx)
  - https://www.ongevag.com/works/id-1
  - https://www.ongevag.com/works/id-2
  - ... (cada proyecto real en projectsData.js)

Works (ES):
  - https://www.ongevag.com/es/works  (priority: 0.8)
  - https://www.ongevag.com/es/works/id-1
  - ... (cada proyecto en ES)
```

**Subtasks:**
1. Abrir `src/data/blogData.js` → extraer slugs de todos los posts
2. Abrir `src/data/projectsData.js` (o equivalente) → extraer IDs de todos los proyectos
3. Abrir `src/App.jsx` → confirmar rutas para blog/projects (EN + ES)
4. Compilar lista de URLs maestras en markdown temporal
5. Contar total de URLs (target: ≥10)

**Notas:**
- Asegurarse que blogData.js y projectsData.js están sincronizados
- Si hay rutas dinámicas no cubiertas, agregarlas al sitemap después

---

### T-14: Generar archivo `public/sitemap.xml` estático
**Esfuerzo:** 20min  
**Dependencias:** T-13  
**Criterios de Aceptación:**
- [ ] Archivo `public/sitemap.xml` creado
- [ ] XML válido según protocolo sitemaps.org
- [ ] Contiene ≥10 URLs
- [ ] Cada URL tiene:
  - `<loc>` (URL absoluta)
  - `<lastmod>` (fecha ISO 8601, ej: 2026-06-08)
  - `<changefreq>` (weekly, monthly según tipo)
  - `<priority>` (0.9 = home, 0.8 = lista, 0.7 = detail)
- [ ] XML bien formado (sin errores de sintaxis)

**XML Template:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home EN -->
  <url>
    <loc>https://www.ongevag.com</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Home ES -->
  <url>
    <loc>https://www.ongevag.com/es</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog List EN -->
  <url>
    <loc>https://www.ongevag.com/blog</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog List ES -->
  <url>
    <loc>https://www.ongevag.com/es/blog</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Posts EN (sample, repeat for each post slug real de blogData.js) -->
  <url>
    <loc>https://www.ongevag.com/blog/slug-1</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog Posts ES (sample, repeat for each post slug real de blogData.js) -->
  <url>
    <loc>https://www.ongevag.com/es/blog/slug-1</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Works EN (sample, repeat for each project id real de projectsData.js) -->
  <url>
    <loc>https://www.ongevag.com/works/id-1</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Works ES (sample, repeat for each project id real de projectsData.js) -->
  <url>
    <loc>https://www.ongevag.com/es/works/id-1</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Subtasks:**
1. Crear archivo `public/sitemap.xml`
2. Copiar template XML arriba
3. Reemplazar slugs y IDs de ejemplo por los reales extraídos en T-13
4. Agregar todas las URLs reales de T-13 (home, blog, works, EN + ES)
5. Validar XML en [xmllint](http://www.xmlvalidation.com/) o VS Code extension
6. Guardar

**Notas:**
- sitemaps.org spec: max 50,000 URLs por sitemap (no aplicable acá)
- Fecha en lastmod = fecha de creación o último cambio real
- Priority es relativa (0.1 = lowest, 1.0 = highest) — 0.9 para home es estándar

---

### T-15: Compilación local + QA con DevTools + npm run build
**Esfuerzo:** 20min  
**Dependencias:** T-01 a T-14  
**Criterios de Aceptación:**
- [ ] `npm run build` completa sin errores
- [ ] `npm run build` completa sin warnings (ESLint, Vite)
- [ ] Dev server `npm run dev` corre sin errores
- [ ] DevTools > Elements muestra todos los meta tags estáticos en `<head>`
  - `lang="en"` en `<html>`
  - `<title>` actualizado
  - `<meta name="description">`
  - `<meta name="keywords">`
  - 6 tags Open Graph
  - 4 tags Twitter Card
  - `<link rel="canonical">`
  - 3 tags hreflang
- [ ] Al navegar a `/blog/slug-1` (ej), `<Helmet>` inyecta dinámicos correctamente
- [ ] Al navegar a `/works/id-1` (ruta real de App.jsx), `<Helmet>` inyecta dinámicos correctamente
- [ ] `public/sitemap.xml` es accesible en `http://localhost:5173/sitemap.xml`
- [ ] `public/og-image.png` es accesible en `http://localhost:5173/og-image.png`

**Subtasks:**
1. Terminal: `npm run dev` (dev server debe correr limpio)
2. Browser: abrir `http://localhost:5173`
3. DevTools > Elements > `<head>`: verificar todos los meta tags estáticos
4. DevTools > Console: no debe haber errores
5. Navegar a `/blog/[slug]`: DevTools > Elements verificar `<Helmet>` dinámicos
6. Navegar a `/works/[id]` (ruta real de App.jsx): DevTools > Elements verificar `<Helmet>` dinámicos
7. Browser: validar `http://localhost:5173/sitemap.xml` (debe descargar o mostrar XML)
8. Browser: validar `http://localhost:5173/og-image.png` (debe mostrar imagen)
9. Terminal: `npm run build` (debe completar sin errores/warnings)
10. Revisar build output (dist/ folder debe existir)

**Notas:**
- Si Helmet no inyecta dinámicos, verificar que `<HelmetProvider>` está en App.jsx root
- Si build falla por linting, corregir antes de pasar a T-16

---

### T-16: Registrar deuda técnica en BITACORA_TECNICA.md
**Esfuerzo:** 10min  
**Dependencias:** T-15  
**Criterios de Aceptación:**
- [ ] Entrada agregada a BITACORA_TECNICA.md
- [ ] Sección: "Deuda Técnica — FEATURE-02"
- [ ] Texto documente:
  - Sitemap.xml es generado manualmente
  - Necesita automatización en build time (Vite plugin futuro)
  - Alternativa: script Node.js que genera desde blogData.js + projectsData.js
  - Prioridad: Media (impacto bajo, refactoring técnico)
  - Estimado para automatización: 1-2h

**Entry Template:**
```markdown
## FEATURE-02: SEO Meta Tags (2026-06-08)

### Deuda Técnica Identificada

**Issue:** Sitemap.xml es generado manualmente
- Ubicación: `public/sitemap.xml` (archivo estático)
- Problema: Requiere regeneración manual cuando cambian posts/proyectos
- Riesgo: Sitemap desincronizado con datos reales (crawlers indexan URLs rotas)

**Solución Propuesta:**
1. Crear script Node.js: `scripts/generate-sitemap.js`
2. Lee blogData.js y projectsData.js
3. Genera `public/sitemap.xml` automáticamente
4. Integrar en `package.json` precommit hook o build script

**Alternativa:**
- Usar Vite plugin (ej: `vite-plugin-sitemap`) — requiere eval de compatibilidad

**Prioridad:** Media (impacto bajo, pero mejora DX/confiabilidad)  
**Estimado:** 1-2h de trabajo  
**Estado:** ⏳ Pendiente (FEATURE-XX futura)
```

**Subtasks:**
1. Abrir `BITACORA_TECNICA.md` (o crear si no existe)
2. Agregar sección "FEATURE-02" con fecha actual
3. Documentar el problema y solución propuesta
4. Guardar

**Notas:**
- BITACORA_TECNICA es registro inmutable de decisiones técnicas
- Facilita onboarding futuro y auditoría de decisiones

---

### T-17: Marcar MOD-02 como completado en mod-02_seo-metatags.md
**Esfuerzo:** 5min  
**Dependencias:** T-16  
**Criterios de Aceptación:**
- [ ] Estado en MOD-02 cambia de "⏳ Pendiente" a "✅ Completado"
- [ ] Fecha de completación agregada (2026-06-09 o actual)
- [ ] Sección "Definition of Done" marca ✅ en items completados:
  - ✅ Propósito documentado
  - ✅ Alcance claro (C1-C7)
  - ✅ Design de sistema especificado
  - ✅ Meta tags en index.html
  - ✅ og-image.png creado
  - ✅ sitemap.xml generado
  - ✅ React Helmet Async en BlogPostDetail.jsx
  - ✅ React Helmet Async en ProjectDetail.jsx

**Changes in mod-02_seo-metatags.md:**
- Line 1: `**Estado:** ⏳ Pendiente` → `**Estado:** ✅ Completado`
- After "Definition of Done" section: agregar "**Completado:** 2026-06-09"

**Subtasks:**
1. Abrir `mod-02_seo-metatags.md`
2. Cambiar estado a ✅ Completado
3. Agregar fecha de completación
4. Marcar items en "Definition of Done" como ✅
5. Guardar

---

## Resumen de Commits (Secuencia)

Después de completar todas las tareas, la historia de Git debe verse así:

```
* 7f8a9b (HEAD -> feature/seo-metatags)  docs(seo): mark MOD-02 as completed
* 6e9d8c  docs(seo): update BITACORA_TECNICA — sitemap tech debt
* 5c8b7a  feat(seo): add public/sitemap.xml with initial URLs
* 4b7a6c  feat(seo): add public/og-image.png placeholder
* 3a6f5b  feat(seo): add Helmet dynamic meta in ProjectDetail.jsx
* 2b5e4a  feat(seo): add Helmet dynamic meta in BlogPostDetail.jsx
* 1a4d3c  feat(seo): update index.html static meta tags — lang, title, description, OG, hreflang
* 0z3c2b (develop) Previous commit before FEATURE-02
```

---

## Estado Tracking

| Task | Estado | Esfuerzo Real | Bloqueador | Notas |
|------|--------|---------------|-----------|-------|
| T-01 | ⏳ Pending | — | Ninguno | Crear og-image.png (placeholder OK) |
| T-02 | ⏳ Pending | — | T-01 | Cambiar lang="en" en index.html |
| T-03 | ⏳ Pending | — | Ninguno | Actualizar <title> |
| T-04 | ⏳ Pending | — | Ninguno | Actualizar meta description |
| T-05 | ⏳ Pending | — | Ninguno | Agregar meta keywords |
| T-06 | ⏳ Pending | — | T-01 | Bloque Open Graph |
| T-07 | ⏳ Pending | — | T-01 | Twitter Card |
| T-08 | ⏳ Pending | — | Ninguno | Canonical link |
| T-09 | ⏳ Pending | — | FEATURE-01 | hreflang cruzados |
| T-10 | ⏳ Pending | — | T-06 | Helmet en BlogPostDetail |
| T-11 | ⏳ Pending | — | T-06, T-10 | Helmet en ProjectDetail |
| T-12 | ⏳ Pending | — | T-10, T-11 | Git commits |
| T-13 | ⏳ Pending | — | Ninguno | Mapeo de URLs |
| T-14 | ⏳ Pending | — | T-13 | Generar sitemap.xml |
| T-15 | ⏳ Pending | — | T-01..T-14 | QA completa |
| T-16 | ⏳ Pending | — | T-15 | BITACORA entry |
| T-17 | ⏳ Pending | — | T-16 | Marcar MOD-02 completado |

---

## Próximos Pasos

1. **Ejecutar Fase A:** Generar `public/og-image.png` (T-01)
2. **Ejecutar Fase B:** Actualizar `index.html` con meta tags estáticos (T-02 a T-09)
3. **Ejecutar Fase C:** Implementar Helmet dinámico en componentes (T-10 a T-12)
4. **Ejecutar Fase D:** Validar, documentar, marcar como completado (T-13 a T-17)
5. **Merge a develop:** Crear PR, review, merge a rama develop
6. **FEATURE-03:** Comenzar AEO (Schema.org JSON-LD)

---

**Versión de este documento:** 1.1  
**Creado:** 2026-06-08  
**Última revisión:** 2026-06-08 (correcciones: dominio, routing /works, Sharp mkdir)  
**Status:** ✅ Aprobado — Listo para ejecución  
**Target Market:** Internacional (EN default, ES vía hreflang recíprocos, x-default → `/`)  
**Responsable:** Claude (AI Collaborator) + Leo (Senior Developer review)
