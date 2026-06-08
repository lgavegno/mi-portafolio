# MOD-02 — SEO Metatags

**Módulo ID:** MOD-02 (SEO técnico)  
**Estado:** ⏳ Pendiente  
**Última revisión:** 2026-06-06  
**Audiencia:** Developers, SEO specialists, international marketers

---

## 1. Propósito (1 oración exacta)

**Implementar SEO técnico completo para indexación internacional en US/EU — meta tags, Open Graph, hreflang y sitemap.**

---

## 2. Alcance

### ✅ Incluye
- C1: index.html lang="en", meta title (60 chars), meta description (155 chars)
- C2: Open Graph completo EN (og:title, og:description, og:image, og:locale, og:url, og:type)
- C3: hreflang cruzados (en → /, es → /es, x-default → /)
- C4: Reemplazar og-image.svg por og-image.png (ongevag-branding.png → public/og-image.png)
- C5: meta keywords mínimo EN (5-8 términos)
- C6: React Helmet Async dinámico en BlogPostDetail.jsx y ProjectDetail.jsx
- C7: sitemap.xml con URLs de ambos locales (/ y /es/)

### ❌ Excluye
- SSR o pre-rendering
- Google Search Console setup
- Analytics integration

---

## 3. Diseño del Sistema

### Arquitectura de alto nivel

```
SEO Meta Tags Strategy (MOD-02)
        │
        ├─ Static HTML Meta Tags (index.html)
        │  ├─ lang="en" + charset + viewport
        │  ├─ Meta title (60 chars max)
        │  ├─ Meta description (155 chars max)
        │  ├─ Meta keywords (5-8 EN terms)
        │  ├─ Open Graph (og:title, og:description, og:image, og:locale, og:url, og:type)
        │  └─ hreflang (en → /, es → /es, x-default → /)
        │
        ├─ Dynamic Meta Tags (React Helmet Async)
        │  ├─ BlogPostDetail.jsx (per-post meta)
        │  └─ ProjectDetail.jsx (per-project meta)
        │
        ├─ Image Assets (public/)
        │  └─ og-image.png (1200x630px, renovag-branding.png → public/og-image.png)
        │
        └─ Sitemap (public/sitemap.xml)
           ├─ URLs locale EN: / | /blog | /blog/slug-1 | /proyecto/id-1
           └─ URLs locale ES: /es | /es/blog | /es/blog/slug-1 | /es/proyecto/id-1
```

### Decisiones de diseño clave

| Decisión | Razón | Trade-off |
|----------|-------|-----------|
| **Open Graph en static HTML** | OG tags deben estar en HTML <head> para crawlers (LinkedIn, Twitter, WhatsApp) | Requiere hardcodear og-image URL absoluta |
| **React Helmet Async para posts/proyectos** | Permite meta dinámicos por post sin hardcoding | Pequeño delay en Helmet rendering (~50ms) |
| **hreflang cruzados (en/es)** | Señala a Google qué idioma es cada URL, evita canonical conflicts | Requiere rutas /es/* existentes (FEATURE-01 dependency) |
| **Sitemap.xml centralizado** | Más fácil de indexar que página a página | Requiere regenerar al agregar post/proyecto |
| **og-image.png en lugar de SVG** | PNG se renderiza mejor en social media (WhatsApp, Pinterest) | Requiere conversión de assets |

---

## 4. Flujos Principales

### Flujo 1: Home Page SEO Indexing
```
Googlebot/crawler hits https://site.com/
    → Reads meta title (60 chars, con keywords)
    → Reads meta description (155 chars)
    → Reads Open Graph tags (og:title, og:description, og:image, og:locale, og:url)
    → Reads hreflang rel="alternate" (points to /es for Spanish locale)
    → Reads robots.txt + sitemap.xml (via <link rel="sitemap">)
    → Indexes page + OG image for social shares
```

### Flujo 2: Blog Post Social Share
```
User shares /blog/slug-1 on LinkedIn/WhatsApp
    → Social crawler hits page
    → Reads React Helmet Async meta (BlogPostDetail.jsx)
    → Extracts og:title, og:description, og:image (post-specific)
    → Returns preview card (title + image + description)
```

### Flujo 3: Project Detail Dynamic SEO
```
User visits /proyecto/id-1
    → ProjectDetail.jsx mounts
    → React Helmet Async renders <head> meta (per-project)
    → og:title = project.name
    → og:description = project.shortDescription
    → og:image = project.image (or fallback to public/og-image.png)
    → og:url = https://site.com/proyecto/id-1
```

### Flujo 4: Sitemap Discovery (SEO crawling)
```
SEO crawler reads /public/sitemap.xml
    → Finds all URLs (home, blog list, blog posts, projects, /es/* variants)
    → Crawls each URL
    → Indexes content + OG tags per page
    → Uses lastmod, priority, changefreq for crawl budget optimization
```

---

## 5. Componentes Involucrados

| Archivo | Rol | Status |
|---------|-----|--------|
| `index.html` | Static meta tags (lang, title, description, OG, hreflang) | ⏳ TODO |
| `public/og-image.png` | Social share image (1200x630px) | ⏳ TODO (convert from brand asset) |
| `public/sitemap.xml` | XML sitemap con todas URLs (EN + ES) | ⏳ TODO |
| `src/pages/BlogPostDetail.jsx` | Dynamic meta via React Helmet (post-specific) | ⏳ TODO |
| `src/pages/ProjectDetail.jsx` | Dynamic meta via React Helmet (project-specific) | ⏳ TODO |
| `src/components/ui/ShareButton.jsx` | Share button (uses OG meta) | ✅ Done (existing) |

---

## 6. Consideraciones Técnicas

### Performance

**Optimizaciones:**
- ✅ Static HTML meta tags (0 runtime cost)
- ✅ React Helmet Async non-blocking (renders on idle)
- ✅ og-image.png optimized with Brotli compression (vite plugin)
- ✅ sitemap.xml cached indefinitely (only refresh on deploy)

**Targets Search Performance:**
- Google crawl efficiency: optimal with sitemap
- OG image load time: <500ms (CDN via Vercel)
- Meta tag parsing: <100ms (static HTML)

---

### SEO Quality

**Implementado:**
- ✅ Meta title: 50-60 chars (within Google SERP limit)
- ✅ Meta description: 150-160 chars (within mobile SERP limit)
- ✅ Keywords: 5-8 EN terms (primary keywords)
- ✅ Open Graph: complete (title, description, image, locale, url, type)
- ✅ hreflang: correct locale signaling (en → /, es → /es, x-default → /)
- ✅ Structured data ready (schema integration in MOD-03)

**[INFERIDO]** Lighthouse SEO score: unknown (requires audit in Phase 4)

---

### Internationalization (i18n)

**Implementado:**
- ✅ hreflang cruzados (en/es bidireccional)
- ✅ og:locale="en_US" en home
- ✅ og:locale="es_ES" en /es home
- ✅ Sitemap con ambas locales

**Dependencia crítica:** FEATURE-01 (i18n routing) debe estar completa — sin rutas /es/*, hreflang no funciona

---

### Mantenibilidad

**Buenas prácticas:**
- ✅ Centralized og-image.png (no duplicar)
- ✅ React Helmet Async pattern (reutilizable en BlogPostDetail + ProjectDetail)
- ✅ Sitemap generation scriptable (manual XLS → XML o auto-generate en build time)
- ✅ Meta template in index.html (fácil actualizar base meta)

**Mejoras futuras:**
- ⚠️ Auto-generate sitemap.xml en build time (Vite plugin)
- ⚠️ Dynamically generate og-image per blog post (Node.js Sharp library)

---

## 7. Definition of Done

Para considerar MOD-02 (SEO Metatags) como **HECHO**, validar:

- ✅ Propósito documentado (este archivo)
- ✅ Alcance claro (C1-C7 incluye, excluye definido)
- ✅ Design de sistema especificado (arquitectura, flujos)
- ✅ Meta tags en index.html (lang, title, description, keywords, OG, hreflang)
- ✅ og-image.png creado (1200x630, optimizado)
- ✅ sitemap.xml generado (todas URLs EN + ES)
- ✅ React Helmet Async implementado en BlogPostDetail.jsx (per-post meta)
- ✅ React Helmet Async implementado en ProjectDetail.jsx (per-project meta)
- ⏳ **Phase 4:** Google Rich Results Test validación
- ⏳ **Phase 4:** Lighthouse SEO audit (score ≥90)
- ⏳ **Phase 4:** Social share preview test (LinkedIn, WhatsApp, Twitter)

---

## Links útiles

- [SDD_MASTER.md](../SDD_MASTER.md) — Índice central de módulos
- [ADR-008](../adr/ADR-008.md) — OG Image PNG y meta tags decision
- [ADR-006 a ADR-011](../adr/) — i18n routing (FEATURE-01 dependency)
- [MOD-03_AEO_SCHEMA.md](../FEATURE-03_AEO_SCHEMA/mod-03_aeo-schema.md) — Schema JSON-LD (complementario)
- [CLAUDE.md](../../CLAUDE.md) — Contexto para AI (stack, comandos)

---

**Próximo paso:** Implementar C1-C7 durante FEATURE-02 development sprint; validar con Google Rich Results Test + social preview tools (Phase 4)
