# UC-02 — Blog Navigation & Post Viewing

**ID:** UC-02
**Título:** Navigate blog, view post index, and read individual posts
**Actores:** End User (reader)
**Prioridad:** ALTA (content marketing)
**Precondiciones:** Home page loaded
**Postcondiciones:** Post content displayed OR blog index shown

---

## 1. Happy Path

```
Paso 1: User clicks "Blog" link or navigates to /blog
  → React Router intercepts
  → BlogLayout rendered
  → BlogIndex component lazy-loaded
  → Suspense shows Skeleton while loading

Paso 2: BlogIndex renders list of posts
  → blogData.js loaded from src/features/blog/data/
  → Posts displayed as BlogCard components
  → Each card shows: title, excerpt, date, category, featured image
  → Cards are clickable

Paso 3: User clicks specific BlogCard
  → Route changes: /blog/:slug
  → BlogPostDetail component lazy-loaded
  → Framer Motion animates entry

Paso 4: BlogPostDetail renders
  → Post title, author, date, featured image
  → HTML content rendered (sanitized with DOMPurify)
  → ShareButton available (LinkedIn, WhatsApp, email, copy link)
  → Navigation to previous/next post

Paso 5: User reads post
  → Scroll behavior: smooth, no layout shift
  → Images lazy-loaded
  → Related posts suggested at bottom

Paso 6: User shares post
  → Click ShareButton
  → Select platform (LinkedIn, WhatsApp, email, copy)
  → URL copied to clipboard OR external share dialog opened
```

---

## 2. Flujos Alternativos

### Alt 1: Invalid slug
```
User navigates to /blog/invalid-slug
  → BlogPostDetail tries to find post
  → Post not found in blogData
  → Render 404 page OR redirect to /blog
```

### Alt 2: Slow network
```
User clicks blog link on slow connection
  → Suspense shows Skeleton/loading state for 2-5s
  → Data loads progressively
```

---

## 3. Excepciones

| Caso | Manejo |
|------|--------|
| blogData.js corrupted | Error boundary, graceful fallback |
| XSS in post HTML | DOMPurify sanitizes all content |
| Image not loading | Placeholder shown |

---

## 4. Definition of Done

- [ ] BlogIndex displays all posts from blogData.js
- [ ] BlogPostDetail renders HTML without XSS
- [ ] ShareButton shares correctly to all platforms
- [ ] Navigation between posts works
- [ ] Performance: LCP <2.5s
- [ ] Accessibility: alt text on images, semantic HTML
- [ ] Testing: UC integration test + E2E

---

## 5. Test Plan (Phase 3)

```javascript
test('BlogIndex renders all posts')
test('BlogPostDetail finds post by slug')
test('ShareButton copies URL to clipboard')
test('Invalid slug shows 404')
```

---

**SEQ Diagram:** [SEQ-02_blog_navigation.puml](./SEQ-02_blog_navigation.puml)

**Status:** 📅 Phase 3
