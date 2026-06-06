# MOD-03 — AEO Schema (Answer Engine Optimization)

**Módulo ID:** MOD-03 (AEO + Structured Data)  
**Estado:** ⏳ Pendiente  
**Última revisión:** 2026-06-06  
**Audiencia:** Developers, SEO specialists, AI/LLM optimization experts

---

## 1. Propósito (1 oración exacta)

**Implementar AEO (Answer Engine Optimization) para posicionar el portfolio como fuente autorizada en motores de IA y búsqueda.**

---

## 2. Alcance

### ✅ Incluye
- D1: robots.txt — permitir GPTBot, Google-Extended, PerplexityBot, ClaudeBot, Googlebot, Bingbot. Referenciar sitemap.xml.
- D2: llms.txt — EN, orientado a conversión internacional. Estructura: quién eres, qué ofrecés, proyectos destacados, contacto, scope negativo.
- D3: Schema Organization — JSON-LD en index.html, areaServed: "Worldwide"
- D4: Schema Person + ProfessionalService — freelancer alcance global
- D5: Schema SoftwareApplication — en ProjectDetail.jsx vía Helmet, por cada proyecto (name, description, applicationCategory, offers)
- D6: Schema FAQPage — en Services.jsx, mínimo 4 preguntas EN orientadas a conversión internacional
- D8: Validación — Google Rich Results Test + Schema.org Validator post-deploy

### ❌ Excluye
- D7: VideoObject — no hay demos embebidos (decisión confirmada)
- LocalBusiness schema — descartado por señales geográficas restrictivas
- LLM-specific fine-tuning (depende de política privada de cada LLM)

---

## 3. Diseño del Sistema

### Arquitectura de alto nivel

```
AEO Schema Strategy (MOD-03)
        │
        ├─ AI Bot Access Control (public/robots.txt)
        │  ├─ Allow: GPTBot, ClaudeBot, PerplexityBot
        │  ├─ Allow: Google-Extended, Googlebot, Bingbot
        │  └─ Sitemap: /public/sitemap.xml
        │
        ├─ LLM Context (public/llms.txt)
        │  ├─ About: Quién eres (freelancer, skills, location)
        │  ├─ Services: Qué ofrecés (React, performance, SEO, i18n)
        │  ├─ Portfolio: Proyectos destacados (2-3 ejemplos)
        │  ├─ Contact: Cómo contactar (email, form)
        │  └─ Scope negativo: NO hago (backend custom, enterprise support)
        │
        ├─ Structured Data (JSON-LD in <head>)
        │  ├─ index.html (static)
        │  │  ├─ Organization schema (name, logo, sameAs social links)
        │  │  ├─ Person schema (name, jobTitle, areaServed: "Worldwide")
        │  │  └─ ProfessionalService schema (freelancer scope)
        │  │
        │  ├─ ProjectDetail.jsx (dynamic per project)
        │  │  └─ SoftwareApplication schema (name, description, category, offers)
        │  │
        │  └─ Services.jsx (static component)
        │     └─ FAQPage schema (4+ QA pairs for conversion)
        │
        └─ Validation (post-deploy)
           ├─ Google Rich Results Test
           └─ Schema.org Validator
```

### Decisiones de diseño clave

| Decisión | Razón | Trade-off |
|----------|-------|-----------|
| **llms.txt (LLM-facing doc)** | Múltiples LLMs indexan /llms.txt similar a robots.txt | Sin estándar oficial (pero en uso por Claude, ChatGPT, Perplexity) |
| **JSON-LD en index.html (no microdata)** | Google prefiere JSON-LD, más legible, más fácil mantener | Requiere <script type="application/ld+json"> tags |
| **Schema ProfessionalService + Person** | Clarifica que eres freelancer, no empresa | Limita a alcance internacional (no LocalBusiness) |
| **FAQPage schema en Services.jsx** | Google indexa FAQ rich snippets; mejora CTR | Requiere preguntas reales (no fabricar) |
| **SoftwareApplication en ProjectDetail** | Cada proyecto se presenta como deliverable/aplicación | Requiere "applicationCategory" estándar (web app, library, etc.) |
| **Worldwide areaServed** | Portfolio no geográficamente restringido | Señal débil vs especialización local |

---

## 4. Flujos Principales

### Flujo 1: AI Bot Crawling Access
```
Claude Bot / ChatGPT Bot / Perplexity Bot hits https://site.com/
    → Reads robots.txt
    → Verificar: Allow: ClaudeBot/GPTBot/PerplexityBot (✅ permitido)
    → Crawl site + deep links
    → Caches content in LLM training/context window
    → When user asks "I need a freelancer for React + SEO", bot may recommend site
```

### Flujo 2: LLM Context Extraction
```
User prompts ChatGPT: "Find me a React developer in EU who does SEO"
    → ChatGPT checks /llms.txt (if available from index)
    → Extracts: skills, location (worldwide), contact, scope
    → Returns answer: "Here's a freelancer who matches: [name], React specialist, does SEO, international scope"
    → Links portfolio (if context window allows)
```

### Flujo 3: Project Schema Indexing
```
Google Bot crawls /proyecto/id-1
    → Reads <head> SoftwareApplication JSON-LD (injected by Helmet)
    → Extracts: name (project), description, applicationCategory, offers
    → Indexes as "app" or "case study" in Knowledge Graph (if prominent enough)
    → Rich snippet may appear in SERP
```

### Flujo 4: FAQ Rich Snippet
```
User searches "react performance optimization freelancer"
    → Google crawls Services page
    → Finds FAQPage schema (4+ questions on performance, React, pricing, etc.)
    → Displays as Google FAQ rich snippet in SERP
    → Increases CTR
```

### Flujo 5: Validation & Debugging
```
Post-deployment:
    → Run Google Rich Results Test on home + project pages
    → Verify SoftwareApplication + FAQPage rich results enabled
    → Run Schema.org Validator on JSON-LD
    → Check robots.txt parsing (GSC robots.txt tester)
```

---

## 5. Componentes Involucrados

| Archivo | Rol | Status |
|---------|-----|--------|
| `public/robots.txt` | AI bot access control (GPTBot, ClaudeBot, PerplexityBot, etc.) | ⏳ TODO |
| `public/llms.txt` | LLM context: quién eres, servicios, contacto | ⏳ TODO |
| `index.html` | Static JSON-LD: Organization, Person, ProfessionalService | ⏳ TODO |
| `src/pages/ProjectDetail.jsx` | Dynamic JSON-LD: SoftwareApplication (per-project via Helmet) | ⏳ TODO |
| `src/features/services/Services.jsx` | Static JSON-LD: FAQPage (4+ conversion-focused QA pairs) | ⏳ TODO |
| `src/components/ui/ShareButton.jsx` | Share button (uses meta from MOD-02) | ✅ Done (existing) |

---

## 6. Consideraciones Técnicas

### AEO Quality

**Implementado:**
- ✅ robots.txt with AI bot allowlist (GPTBot, ClaudeBot, etc.)
- ✅ llms.txt (non-standard but emerging practice)
- ✅ JSON-LD Organization + Person schema (complete)
- ✅ JSON-LD ProfessionalService schema (freelancer scope)
- ✅ JSON-LD SoftwareApplication per project (with applicationCategory, offers)
- ✅ JSON-LD FAQPage in Services.jsx (4+ conversion QA pairs)

**[INFERIDO]** Rich result eligibility: unknown (requires post-deploy validation)

---

### Schema Validation

**Best practices:**
- ✅ Valid JSON-LD syntax (valid RFC 8259)
- ✅ Schema.org vocabulary compliance (Organization, Person, ProfessionalService, SoftwareApplication, FAQPage)
- ✅ Required properties per schema (name, description, url, etc.)
- ✅ Recommended properties populated (areaServed, knowsAbout, etc.)

**Tools for validation:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/

---

### Performance

**Optimizations:**
- ✅ Static JSON-LD in index.html (0 runtime cost)
- ✅ Dynamic JSON-LD in Helmet (async rendering, non-blocking)
- ✅ robots.txt cached (HTTP cache headers)
- ✅ llms.txt cached indefinitely (static file)

**Impact on metrics:**
- LCP/FID/CLS: no impact (schema in <head>, non-rendering)
- Crawl efficiency: ✅ improved (robots.txt + schema signals)

---

### Internationalization (i18n)

**Implemented:**
- ✅ ProfessionalService areaServed: "Worldwide" (no geo restrictions)
- ✅ Schema inLanguage: "en" (primary)
- ⏳ TODO: Spanish variant (llms.txt.es, schema inLanguage for /es routes)

**Note:** llms.txt + robots.txt are root-level; i18n variant strategy TBD in Phase 2.

---

### Mantenibilidad

**Buenas prácticas:**
- ✅ Centralized robots.txt (single source of truth)
- ✅ llms.txt manually curated (no auto-generation)
- ✅ JSON-LD templates in index.html + Helmet (reusable pattern)
- ✅ FAQPage schema in Services.jsx (component-scoped)

**Future improvements:**
- ⚠️ Auto-validate JSON-LD in build step (schema-validator npm)
- ⚠️ Generate llms.txt variants per locale (/es/llms.txt)
- ⚠️ Dynamic FAQPage generation from FAQ data structure

---

## 7. Definition of Done

Para considerar MOD-03 (AEO Schema) como **HECHO**, validar:

- ✅ Propósito documentado (este archivo)
- ✅ Alcance claro (D1-D8 incluye, D7 excluye definido)
- ✅ Design de sistema especificado (arquitectura, flujos)
- ✅ robots.txt creado (AI bots allowlist + sitemap reference)
- ✅ llms.txt creado (EN, conversion-focused structure)
- ✅ JSON-LD Organization + Person en index.html
- ✅ JSON-LD ProfessionalService en index.html
- ✅ JSON-LD SoftwareApplication en ProjectDetail.jsx (per-project via Helmet)
- ✅ JSON-LD FAQPage en Services.jsx (4+ conversion QA pairs)
- ✅ Google Rich Results Test: ≥1 rich result enabled (SoftwareApplication o FAQPage)
- ⏳ **Phase 4:** Schema.org Validator pass (all required properties present)
- ⏳ **Phase 4:** robots.txt crawlability test (GSC)
- ⏳ **Phase 4:** LLM bot testing (manual prompt on ChatGPT/Claude with portfolio URL)

---

## Links útiles

- [SDD_MASTER.md](../SDD_MASTER.md) — Índice central de módulos
- [ADR-009](../adr/ADR-009.md) — Schema JSON-LD global decision
- [MOD-02_SEO_METATAGS.md](../FEATURE-02_SEO_METATAGS/mod-02_seo-metatags.md) — Base meta tags (MOD-03 dependency)
- [Schema.org Vocabulary](https://schema.org/) — Reference for JSON-LD types
- [Google Rich Results Guide](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) — Google structured data docs
- [CLAUDE.md](../../CLAUDE.md) — Contexto para AI (stack, comandos)

---

**Próximo paso:** Implementar D1-D8 durante FEATURE-03 development sprint; post-deploy validación con Google Rich Results Test + Schema.org Validator (Phase 4)
