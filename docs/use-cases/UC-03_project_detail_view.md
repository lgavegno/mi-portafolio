# UC-03 — Project Detail Viewing

**ID:** UC-03
**Título:** View detailed information about a specific project/work
**Actores:** End User (recruiter/client)
**Prioridad:** MEDIA (lead generation, skill showcase)
**Precondiciones:** Home page or works section loaded
**Postcondiciones:** Project detail page displayed with full information

---

## 1. Happy Path

```
Paso 1: User views Works section (home) or clicks project card
  → Projects list rendered from projects.js
  → Each project shown as ProjectCard
  → Card displays: title, tech stack, featured image, brief description

Paso 2: User clicks project card or "Ver Detalles" button
  → Route changes: /proyecto/:id
  → ProjectDetail component lazy-loaded
  → Suspense shows Skeleton loading

Paso 3: ProjectDetail renders
  → Full project information: title, description, images gallery
  → Tech stack displayed with icons
  → Project links: GitHub repo, live demo, case study
  → Timeline of project (dates)
  → Lessons learned / insights

Paso 4: User explores project
  → Scroll through images
  → Read description and tech details
  → Click links to GitHub/demo (opens in new tab)

Paso 5: User shares project
  → ShareButton available
  → Shares project URL to LinkedIn, WhatsApp, email
```

---

## 2. Flujos Alternativos

### Alt 1: Project not found
```
User navigates to /proyecto/invalid-id
  → Project not found in projects.js
  → Render 404 OR redirect to /proyectos
```

### Alt 2: Images gallery slow to load
```
User scrolls gallery on slow connection
  → Images lazy-loaded
  → Skeleton placeholders shown until loaded
```

---

## 3. Excepciones

| Caso | Manejo |
|------|--------|
| Invalid project ID | 404 page, redirect to Works section |
| Image CDN down | Placeholder image, fallback |
| GitHub/demo link broken | User notified in UI |

---

## 4. Definition of Done

- [ ] ProjectDetail renders full project information
- [ ] Tech stack displayed with proper icons/labels
- [ ] All links open correctly (GitHub, demo, external)
- [ ] Images display without layout shift
- [ ] ShareButton works for all platforms
- [ ] Performance: LCP <2.5s, CLS 0
- [ ] Accessibility: proper alt text, semantic HTML
- [ ] Testing: UC test + E2E

---

## 5. Test Plan (Phase 3)

```javascript
test('ProjectDetail fetches project by ID')
test('External links open in new tab')
test('Gallery images load progressively')
test('Invalid ID shows 404')
test('ShareButton shares project URL')
```

---

**SEQ Diagram:** [SEQ-03_project_detail.puml](./SEQ-03_project_detail.puml) [TBD]

**Status:** 📅 Phase 3
