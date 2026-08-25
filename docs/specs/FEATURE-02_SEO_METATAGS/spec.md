# Feature Specification: FEATURE-02 SEO Meta Tags & Open Graph

**Feature Branch**: `feature/02-seo-metatags`

**Created**: 2026-06-08

**Status**: ✅ Approved — Implemented (see mod-02_seo-metatags.md)

**Spec Source**: `docs/specs/FEATURE-02_SEO_METATAGS/mod-02_seo-metatags.md`

**Dependencies**:
- ✅ FEATURE-01 (i18n routing) — `/` + `/en/*` routes active
- React Helmet Async (already in `package.json`)
- Public asset: `og-image.png` (1200×630px)

---

## User Scenarios & Testing

### User Story 1 – Search Engine Discovers Home Page (P1)

**Narrative:**  
A Google crawler visits `https://www.ongevag.com` and indexes the page for SEO. The page title, description, and Open Graph metadata are correctly served in the HTML `<head>` so the search engine understands the site's purpose and can rank it for relevant keywords.

**Why P1:**  
- Foundational SEO — without correct static meta tags, organic traffic is impossible
- Affects both English and Spanish indexing
- Zero technical risk (static HTML changes only)

**Independent Test:**  
✅ Crawler tools (Google Rich Results, Screaming Frog) can extract: title (60 chars), description (155 chars), `og:title`, `og:description`, `og:image`, `hreflang` tags. Site appears in Google with correct preview.

**Acceptance Scenarios:**

1. **Given** browser visits `https://www.ongevag.com` (English), **When** opens DevTools → Inspect `<head>`, **Then** `<title>` reads "Ongevag — Desarrollo Web & IA para PyMEs" (max 60 chars) and `<meta name="description">` is present (150–160 chars).

2. **Given** Google crawler reads index.html, **When** parses Open Graph tags, **Then** `og:title`, `og:description`, `og:image`, `og:locale="en_US"`, `og:url="https://www.ongevag.com"`, `og:type="website"` are all present.

3. **Given** home page root `/` is English (US/EU target), **When** crawler reads `<link rel="alternate">` hreflang tags, **Then** `hreflang="en"` points to `https://www.ongevag.com`, `hreflang="es"` points to `https://www.ongevag.com/es`, and `hreflang="x-default"` also points to `https://www.ongevag.com` (EN canonical).

4. **Given** `og-image.png` is referenced in Open Graph, **When** social media crawler (LinkedIn, WhatsApp, Twitter) fetches preview, **Then** image loads in <500ms and renders correctly (1200×630px).

---

### User Story 2 – Blog Post Social Share Preview (P1)

**Narrative:**  
A user reads a blog post (e.g., `/blog/react-seo-best-practices`) and shares it on LinkedIn. The social platform's crawler fetches the page and displays a rich preview card with the post title, excerpt, and a featured image — all from React Helmet Async meta tags injected dynamically.

**Why P1:**  
- Drives traffic from social media (indirect SEO benefit)
- Requires dynamic meta tags per post — more complex than static HTML
- Validates React Helmet Async integration

**Independent Test:**  
✅ Open [LinkedIn URL Debugger](https://www.linkedin.com/post-inspector/) or WhatsApp Web, paste blog post URL, verify preview displays correct post title + description + image (no fallback, no "unknown source").

**Acceptance Scenarios:**

1. **Given** user visits `/blog/slug-1` (post detail page), **When** React mounts `BlogPostDetail.jsx`, **Then** `<Helmet>` component injects `<title>`, `og:title`, `og:description`, `og:image` from `post.title`, `post.excerpt`, `post.image`.

2. **Given** blog post object contains `{ slug: "react-seo", title: "React SEO Best Practices", excerpt: "Optimize your React app...", image: "/blog-images/react-seo.png" }`, **When** page renders, **Then** injected meta shows title max 60 chars, description max 155 chars, image is absolute URL (`https://www.ongevag.com/blog-images/react-seo.png`).

3. **Given** social crawler fetches `/blog/slug-1`, **When** inspects response headers, **Then** `og:url` equals `https://www.ongevag.com/blog/slug-1` and `og:type="article"`.

4. **Given** blog post has no custom image, **When** page renders, **Then** falls back to global `og-image.png` (no broken image link).

---

### User Story 3 – Project Detail Page SEO & Sharing (P2)

**Narrative:**  
A developer visits a project showcase page (e.g., `/proyecto/omnistock` or `/en/works/omnistock`) and wants to share it with a colleague. The page dynamically injects project-specific meta tags (title = project name, description = project summary) so the shared preview is relevant to the project, not generic.

**Why P2:**  
- Important for portfolio credibility, but lower traffic impact than blog
- Very similar implementation to blog posts (React Helmet Async reusable pattern)
- Projects exist in both `/proyecto/*` (ES) and `/en/works/*` (EN)

**Independent Test:**  
✅ Visit `/proyecto/id-1` and `/en/works/id-1`, inspect `<head>` in DevTools, verify `og:title` and `og:description` reflect project data (not homepage defaults).

**Acceptance Scenarios:**

1. **Given** user navigates to `/proyecto/omnistock`, **When** `ProjectDetail.jsx` mounts, **Then** `<Helmet>` injects project.name as `og:title` and project.shortDescription as `og:description`.

2. **Given** project object is `{ id: "omnistock", name: "OmniStock POS", shortDescription: "Desktop POS for SMEs", image: "omnistock.png" }`, **When** page renders, **Then** `og:image` resolves to absolute URL and `og:url` is `https://www.ongevag.com/proyecto/omnistock`.

3. **Given** both locale variants exist (`/proyecto/omnistock` + `/en/works/omnistock`), **When** hreflang tags are checked, **Then** each page points to its locale alternate.

---

### User Story 4 – Sitemap Discovery & Crawl Efficiency (P2)

**Narrative:**  
Google's crawler discovers `sitemap.xml` and efficiently crawls all pages (home, blog list, blog posts, projects, Spanish variants). The sitemap lists all URLs with `lastmod`, `priority`, and `changefreq` so Google allocates crawl budget wisely.

**Why P2:**  
- Ensures all pages are discovered (backup to internal linking)
- No direct user-facing value, but important for SEO infrastructure
- Static file, low implementation complexity

**Independent Test:**  
✅ Visit `https://www.ongevag.com/sitemap.xml`, verify XML structure is valid, all routes (EN + ES) are present, and `changefreq`/`priority` are reasonable.

**Acceptance Scenarios:**

1. **Given** `/sitemap.xml` is deployed, **When** crawled with [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html), **Then** passes validation and lists ≥10 URLs (home EN, home ES, blog EN, blog posts, projects EN, projects ES).

2. **Given** blog post published, **When** sitemap is updated, **Then** new URL appears with `<lastmod>` = today's date and `<priority>0.8</priority>` (posts higher than home).

3. **Given** project is published, **When** sitemap checked, **Then** appears in both `/proyecto/*` (ES) and `/en/works/*` (EN) entries.

---

### Edge Cases

- **What if a blog post has no custom image?** → Falls back to global `og-image.png`
- **What if blog post excerpt is >155 chars?** → Truncate to 155 + "…" (React component responsibility)
- **What if project is unpublished/draft?** → Not included in sitemap; no meta tags rendered
- **What if social crawler hits `/en/blog`?** → Displays EN locale meta tags (note: blog content is EN-only per FEATURE-01)
- **What if og-image.png doesn't load (404)?** → Social preview still renders with title/description, but no image; considered acceptable (Phase 4 improvement)

---

## Requirements

### Functional Requirements

**FR-001: Static HTML Meta Tags**  
System MUST update `index.html` `<head>` with:
- `<title>` max 60 chars, containing primary keyword
- `<meta name="description">` 150–160 chars
- `<meta name="keywords">` 5–8 terms (EN: "web development, React, Python, SME solutions, AI automation")
- `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`
- `<link rel="canonical" href="https://www.ongevag.com">`
- `<meta property="og:type" content="website">`
- `<meta property="og:locale" content="en_US">`

**FR-002: Open Graph Tags (Static)**  
System MUST include in `index.html`:
- `og:title` (homepage title, max 60 chars)
- `og:description` (homepage tagline, max 155 chars)
- `og:image` (absolute URL: `https://www.ongevag.com/og-image.png`)
- `og:url` (absolute: `https://www.ongevag.com`)
- `og:site_name` ("Ongevag")

**FR-003: Twitter Card Tags (Static)**  
System MUST include in `index.html`:
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="twitter:title">` (max 70 chars)
- `<meta name="twitter:description">` (max 200 chars)
- `<meta name="twitter:image">` (absolute URL)

**FR-004: hreflang Alternate Tags**  
System MUST include (aligned with MOD-02 C3 — root `/` is EN, US/EU targeting):
- `<link rel="alternate" hreflang="en" href="https://www.ongevag.com">` (English home — canonical root)
- `<link rel="alternate" hreflang="es" href="https://www.ongevag.com/es">` (Spanish home — subpath)
- `<link rel="alternate" hreflang="x-default" href="https://www.ongevag.com">` (default = EN, same as root)
- **Per-page hreflang:** Blog posts and projects MUST have bidirectional hreflang to EN/ES variants (if both exist)

> ⚠️ **Rationale:** Root `/` serves English content (US/EU audience targeting). `x-default` MUST match the canonical root locale — it cannot point to `/` and label it Spanish simultaneously. Spanish content lives under `/es/*` per FEATURE-01 routing architecture.

**FR-005: React Helmet Async – Blog Posts**  
`BlogPostDetail.jsx` MUST use `<Helmet>` to inject per-post:
- `<title>{post.title}</title>` (max 60 chars, truncate if needed)
- `<meta name="description" content="{post.excerpt}">` (max 155 chars)
- `<meta property="og:title" content="{post.title}">`
- `<meta property="og:description" content="{post.excerpt}">`
- `<meta property="og:image" content="{absolute URL to post.image or fallback og-image.png}">`
- `<meta property="og:url" content="https://www.ongevag.com/blog/{slug}">`
- `<meta property="og:type" content="article">`
- Hreflang (if ES variant exists): `<link rel="alternate" hreflang="es" href="https://www.ongevag.com/es/blog/{slug}">`

**FR-006: React Helmet Async – Projects**  
`ProjectDetail.jsx` MUST use `<Helmet>` to inject per-project:
- `<title>{project.name}</title>`
- `<meta name="description" content="{project.shortDescription}">`
- `<meta property="og:title" content="{project.name}">`
- `<meta property="og:description" content="{project.shortDescription}">`
- `<meta property="og:image" content="{absolute URL to project.image}">`
- `<meta property="og:url" content="https://www.ongevag.com/proyecto/{id}">`
- `<meta property="og:type" content="website">`
- Hreflang (bidirectional EN/ES): `<link rel="alternate" hreflang="en" href="https://www.ongevag.com/en/works/{id}">`

**FR-007: Sitemap.xml**  
System MUST provide `/public/sitemap.xml` with:
- All home pages: `/`, `/en`
- All blog routes: `/blog`, `/en/blog`, `/blog/{slug}`, `/en/blog/{slug}` (for each post)
- All project routes: `/proyecto/{id}`, `/en/works/{id}` (for each project)
- XML structure: `<url><loc>...</loc><lastmod>...</lastmod><priority>...</priority><changefreq>...</changefreq></url>`
- Priority weighting: home=0.9, blog list=0.8, blog post=0.7, project=0.7
- `changefreq`: home="weekly", blog="monthly", projects="monthly"

**FR-008: og-image.png Asset**  
System MUST provide:
- Image file: `public/og-image.png` (1200×630px, optimized <50KB with Brotli)
- Should be brand-consistent with portfolio (dark theme, ONGEVAG logo, clean design)
- Fallback for all dynamic pages (blog, projects) if no custom image

**FR-009: Helmet Provider Setup (Already Done)**  
`src/main.jsx` MUST wrap app with `<HelmetProvider>` (✅ already implemented per document)

### Key Entities

**Blog Post Object:**
```
{
  slug: string,           // URL slug (e.g., "react-seo-best-practices")
  title: string,          // Max 60 chars for SEO
  excerpt: string,        // Max 155 chars for meta description
  image: string,          // Relative path (e.g., "/blog-images/post-1.png")
  date: string,           // ISO date for lastmod in sitemap
  content: string         // Full HTML
}
```

**Project Object:**
```
{
  id: string,             // URL slug (e.g., "omnistock")
  name: string,           // Project display name
  shortDescription: string, // Max 155 chars for og:description
  image: string,          // Relative path to featured image
  link?: string,          // External link (optional)
  date?: string           // For lastmod in sitemap
}
```

---

## Success Criteria

### Measurable Outcomes

**SC-001: Static Meta Tags Compliance**  
All static meta tags in `index.html` MUST pass [Google Rich Results Test](https://search.google.com/test/rich-results):
- ✅ `<title>` detected (60 chars or less)
- ✅ `<meta description>` detected (150–160 chars)
- ✅ All Open Graph tags present and valid URLs
- ✅ No warnings or errors in Rich Results report

**SC-002: Dynamic Meta Tag Injection (Blog)**  
When visiting any blog post URL (e.g., `/blog/react-seo`), inspect `<head>` with DevTools **after page load** and verify:
- ✅ `og:title` = blog post title (not homepage title)
- ✅ `og:description` = post excerpt (not homepage description)
- ✅ `og:image` = post image (absolute URL, not 404)
- ✅ `og:url` = correct post URL with domain

**SC-003: Dynamic Meta Tag Injection (Projects)**  
When visiting any project URL (e.g., `/proyecto/omnistock` or `/en/works/omnistock`), inspect `<head>` and verify:
- ✅ `og:title` = project name (not homepage title)
- ✅ `og:description` = project description
- ✅ `og:image` = project image (absolute URL)
- ✅ `og:url` = correct project URL with domain

**SC-004: Social Media Preview Rendering**  
Test with real social platforms and tools:
- ✅ **LinkedIn Post Inspector:** Paste homepage URL → preview displays correct title + description + image
- ✅ **WhatsApp Web:** Send link in chat → preview card shows correct metadata
- ✅ **Twitter Card Validator:** Paste URL → card renders with `summary_large_image` layout + image
- ✅ **Facebook Sharing Debugger:** Clear cache, scrape URL → OG data is fresh and correct

**SC-005: Sitemap Validation**  
Sitemap.xml MUST:
- ✅ Pass [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html) with no errors
- ✅ Contain ≥10 URLs (home EN/ES, blog, 3+ posts, 2+ projects)
- ✅ All URLs are publicly accessible (no 404s when crawled)
- ✅ `lastmod` dates are reasonable (today's date for new entries)

**SC-006: hreflang Correctness**  
Audit with [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/):
- ✅ Home page has bidirectional hreflang (en ↔ es, x-default → en / root `/`)
- ✅ Blog posts have hreflang (if ES variant exists)
- ✅ Projects have hreflang (EN ↔ ES bidirectional)
- ✅ No hreflang orphans or loops (all links are reciprocal)

**SC-007: Lighthouse SEO Score (Phase 4)**  
Run `npm run build && npm run preview` + Lighthouse audit:
- ✅ SEO score ≥90/100
- ✅ No missing meta description warnings
- ✅ No crawlable link issues
- ✅ No indexability warnings (robots.txt correct, no noindex tag)

**SC-008: Image Performance (og-image.png)**  
Verify `public/og-image.png`:
- ✅ File size <50KB (optimized with Brotli)
- ✅ Dimensions exactly 1200×630px (standard OG size)
- ✅ Loads in <500ms on 4G throttle (Chrome DevTools)
- ✅ No visual distortion or color profile issues

---

## Assumptions

- **i18n routing is stable:** FEATURE-01 is complete. Root `/` serves English content (US/EU target). Spanish content lives under `/es/*`. Both are live and handled by `LocaleProvider`.
- **Blog posts have slug + excerpt:** `blogData.en.js` and `blogData.es.js` include all fields needed for React Helmet
- **Projects have id + name + description:** Project data structure includes required fields for meta injection
- **og-image.png will be provided:** Current design asset (`Ongevag-branding.png`) will be converted to 1200×630px PNG before implementation
- **React Router v6 is in use:** URL params accessible via `useParams()` in detail components
- **Deployment is Vercel:** Build process supports static file serving (`public/` → `/`)
- **SPA limitation with social crawlers (known risk):** Social media crawlers (LinkedIn, WhatsApp, Twitter/X, Facebook) do NOT reliably execute JavaScript. They either skip JS entirely or have an extremely short timeout that fails on pure SPA architectures. Since SSR/pre-rendering is explicitly out of scope for MOD-02, the mitigation strategy is: **static `index.html` meta tags (FR-001/FR-002/FR-003) MUST be impeccable as a generic fallback**. If a social crawler shares a blog post URL and doesn't execute React Helmet, it will at minimum display the ONGEVAG brand title, description, and `og-image.png` instead of a broken or empty preview. Dynamic Helmet meta (FR-005/FR-006) is best-effort for social sharing; authoritative for Googlebot (which does execute JS).
- **Sitemap is manually maintained (initial delivery):** `public/sitemap.xml` is hardcoded for current content volume (≤10 URLs). This is acceptable for MVP. **Technical debt registered:** Auto-generation via Node.js script or Vite plugin at build time must be implemented when blog/project entries grow, to prevent URL desync between `blogData.en.js` / `projects.en.js` and sitemap. This debt should be captured in `BITACORA_TECNICA.md` after Chat 3 (CODE) closes.
- **Blog is EN-only:** `/es/blog` shows Spanish UI but links to `/en/blog` content (per FEATURE-01 decision)

---

## Implementation Checkpoints (SDD Chat 2: PLAN)

1. ✅ **C1:** Update `index.html` static meta tags (title, description, keywords, OG, hreflang, robots)
2. ✅ **C2:** Create `public/og-image.png` from brand asset (1200×630px)
3. ✅ **C3:** Implement React Helmet in `BlogPostDetail.jsx` (per-post meta injection)
4. ✅ **C4:** Implement React Helmet in `ProjectDetail.jsx` (per-project meta injection)
5. ✅ **C5:** Generate `public/sitemap.xml` with all routes (EN + ES)
6. ✅ **C6:** Verify hreflang correctness (home + blog + projects bidirectional)
7. ✅ **C7:** Test with Google Rich Results + social platforms (SC-004 through SC-008)

---

## Related Documentation

- **MOD-02 Reference:** `docs/specs/FEATURE-02_SEO_METATAGS/mod-02_seo-metatags.md`
- **SDD Master Index:** `SDD_MASTER.md`
- **CLAUDE.md:** AI rules, stack context
- **FEATURE-01 (i18n):** Dependency — ensures `/en/*` routes active
- **MOD-03 (AEO/Schema):** Complementary — adds JSON-LD structured data (future)

---

## Sign-Off Checklist (Ready for PLAN Chat)

- ✅ User stories are prioritized (P1 = foundational, P2 = important)
- ✅ User stories are independently testable
- ✅ Functional requirements are clear and measurable
- ✅ Success criteria are objective (not subjective)
- ✅ Assumptions are stated (no hidden dependencies)
- ✅ Edge cases are covered
- ✅ No technical jargon in user-facing language
- ✅ Aligned with MOD-02 spec (C1-C7 requirements)

---

**Status:** ✅ Approved — Proceeding to Chat 2 (PLAN)

**Corrections applied (2026-06-08):**
- ✅ FR-006: Domain typo fixed (`www.kvinnag.com` → `www.ongevag.com`)
- ✅ FR-004 + SC-006 + User Story 1: hreflang strategy unified — root `/` is EN (US/EU), Spanish under `/es/*`, `x-default → /` (EN)
- ✅ Assumption: SPA crawler limitation documented honestly + static fallback strategy defined
- ✅ Assumption: Sitemap manual maintenance registered as technical debt in BITACORA

**Next Step:** Chat 2 (PLAN) — detailed implementation plan with:
- Exact file paths and diff locations
- React Helmet snippets (copy-paste ready)
- Sitemap.xml template (hardcoded for current URLs)
- Testing checklist per SC-001 through SC-008
