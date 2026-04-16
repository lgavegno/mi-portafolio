# CODEBASE_CONTEXT.md — Comprehensive Codebase Reference

**Generated:** April 2026  
**Project:** Ongevag Studio Portfolio (Leandro Gavegno)  
**Version:** v2.2  
**Stack:** React 19 + Vite 6.3.5 + Tailwind CSS 3.3.0

---

## Overview

This document provides a comprehensive reference for the entire codebase structure, architecture, components, and configuration. It serves as the single source of truth for understanding how the portfolio application is built and organized.

### Project Purpose

Professional portfolio for Leandro Gavegno (Ongevag Studio), a freelance developer based in Rafaela, Santa Fe, Argentina. The portfolio showcases technical capabilities to attract SMB clients for web development, AI automation, and online store services.

### Key Architectural Decisions

- **Feature-Based Architecture (DDD Light):** Code organized by business domain rather than file type
- **No Backend:** Static SPA with EmailJS for contact forms
- **No TypeScript:** Pure JavaScript for rapid development (ADR-002)
- **Vite Build Tool:** Fast HMR and optimized production builds (ADR-001)
- **React 19:** Latest React features including Actions and render optimizations

---

## Project Structure

```
mi-portafolio/
├── public/                          # Static assets
│   ├── favicon.webp
│   ├── og-image.jpg
│   ├── sitemap.xml                  # Auto-generated
│   └── robots.txt
├── src/
│   ├── assets/                      # Images and static assets
│   │   ├── ongevag-logo.webp
│   │   ├── profile-about.webp
│   │   ├── gemini-avatar.webp
│   │   ├── fig_clusters_ai.png
│   │   ├── omnistock1.webp
│   │   ├── faroart1.webp
│   │   ├── generador1.webp
│   │   └── ...
│   ├── components/                   # Global UI Kit (agnostic to business logic)
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.jsx           # Versatile button with variants
│   │   │   ├── GlowButton.jsx       # CTA button with cyan glow
│   │   │   ├── PageTransition.jsx   # Page transition wrapper
│   │   │   ├── ProjectCard.jsx      # Project display card
│   │   │   ├── ShareButton.jsx     # Social sharing dropdown
│   │   │   ├── Skeleton.jsx        # Loading state components
│   │   │   ├── ProgressBar.jsx     # Animated progress bar
│   │   │   └── BackToTop.jsx       # Scroll-to-top button
│   │   ├── About.jsx               # About Me section
│   │   ├── SkillsGrid.jsx         # Technology skills grid
│   │   ├── Header.jsx             # Navigation header
│   │   ├── Footer.jsx             # Site footer
│   │   ├── DataVisualization.jsx  # Canvas data network
│   │   ├── NeuralNetworkBackground.jsx # Canvas particle animation
│   │   ├── TechnicalTicker.jsx    # Infinite scroll ticker
│   │   ├── WireframeGeometry.jsx  # 3D rotating geometry
│   │   └── BlogMetaTags.jsx       # SEO meta tags
│   ├── features/                   # Business domain modules
│   │   ├── hero/
│   │   │   └── HeroBanner.jsx      # Landing hero section
│   │   ├── services/
│   │   │   └── Services.jsx       # 3D carousel of services
│   │   ├── blog/
│   │   │   ├── components/
│   │   │   │   ├── BlogCard.jsx   # Blog post card
│   │   │   │   ├── BlogComponents.jsx # CategoryFilter, FeaturedPost, Sidebar, PostGrid
│   │   │   │   └── BlogPreview.jsx # Home blog preview
│   │   │   └── data/
│   │   │       └── blogData.js    # Blog posts data
│   │   ├── contact/
│   │   │   └── Contact.jsx        # Contact form with EmailJS
│   │   ├── works/
│   │   │   └── Works.jsx          # Projects gallery
│   │   └── analytics/
│   │       └── components/
│   │           ├── AnalyticsCard.jsx # Analytics container
│   │           └── DataChart.jsx  # Simulated bar chart
│   ├── layouts/                    # Page composition
│   │   ├── MainLayout.jsx         # Main site layout
│   │   └── BlogLayout.jsx         # Blog-specific layout
│   ├── pages/                      # Route pages
│   │   ├── BlogIndex.jsx          # Blog listing page
│   │   ├── BlogPostDetail.jsx    # Individual blog post
│   │   └── ProjectDetail.jsx     # Individual project detail
│   ├── hooks/                      # Custom React hooks
│   │   ├── useVibrate.js          # Haptic feedback hook
│   │   └── useReducedMotion.js    # Accessibility hook
│   ├── config/                     # Global configuration
│   │   └── motionConfig.js        # Framer Motion variants
│   ├── data/                       # Static data
│   │   ├── projects.js            # Projects data
│   │   └── blogData.js            # Blog posts data
│   ├── App.jsx                     # Root component with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── scripts/                        # Build scripts
│   └── generate-sitemap.js        # Sitemap generation
├── src/docs/                       # Documentation
│   ├── PRD.md                     # Product Requirements Document
│   ├── DESIGN_TOKENS.md           # Design system reference
│   ├── MOD-01-PROJECTS.md        # Projects module documentation
│   ├── COMPONENT-TREE.md          # Component hierarchy
│   ├── PERFORMANCE.md             # Performance checklist
│   └── adr/                       # Architecture Decision Records
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build configuration
├── package.json                    # Dependencies and scripts
├── .env.example                    # Environment variables template
├── CLAUDE.md                      # AI/Developer context
└── README.md                      # Project overview

```

---

## Technology Stack

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19.1.0 | UI framework |
| React DOM | 19.1.0 | DOM rendering |
| Vite | 6.3.5 | Build tool & dev server |
| Tailwind CSS | 3.3.0 | Utility-first CSS |
| Framer Motion | 12.23.12 | Animations |
| React Router DOM | 7.11.0 | Client-side routing |
| React Helmet Async | 2.0.5 | SEO meta tags |
| EmailJS Browser | 4.4.1 | Contact form backend |
| React Icons | 5.5.0 | Icon library |
| DOMPurify | 3.2.3 | HTML sanitization |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-react | 4.3.4 | Vite React plugin |
| vite-plugin-imagetools | 9.0.2 | Image optimization |
| vite-plugin-compression | 0.5.1 | Gzip/Brotli compression |
| ESLint | 9.18.0 | Linting |
| AutoPrefixer | 10.4.14 | CSS prefixes |
| PostCSS | 8.4.31 | CSS processing |

---

## Routing Structure

### Routes (from App.jsx)

| Path | Component | Layout | Lazy Loaded |
|------|-----------|--------|-------------|
| `/` | Home (MainLayout) | MainLayout | No |
| `/blog` | BlogIndex | BlogLayout | Yes |
| `/blog/:slug` | BlogPostDetail | BlogLayout | Yes |
| `/proyecto/:id` | ProjectDetail | MainLayout | Yes |

### Route Components

**MainLayout** wraps:
- Header (navigation)
- Footer (social links, copyright)
- Outlet for page content

**BlogLayout** wraps:
- Header (navigation)
- Footer (social links, copyright)
- Outlet for blog content

---

## Component Inventory

### Global Components (src/components/)

#### UI Components (src/components/ui/)

| Component | Purpose | Key Props | Dependencies |
|-----------|---------|-----------|--------------|
| **Button** | Versatile button | variant, size, loading, icon | framer-motion, useVibrate |
| **GlowButton** | CTA with cyan glow | variant, icon, as | framer-motion |
| **PageTransition** | Page transition wrapper | children | framer-motion, react-router |
| **ProjectCard** | Project display card | project, onClick | framer-motion, react-router |
| **ShareButton** | Social sharing | url, title, description | framer-motion, react-icons |
| **Skeleton** | Loading states | className | framer-motion |
| **ProgressBar** | Animated progress | progress, variant, size | framer-motion |
| **BackToTop** | Scroll-to-top | - | framer-motion |

#### Layout Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Header** | Navigation | Scroll effects, mobile menu, CV download |
| **Footer** | Site footer | Social links, copyright, scroll to contact |
| **About** | About Me section | Tabbed interface, academic/certifications |
| **SkillsGrid** | Technology grid | Skill cards with icons, hover effects |

#### Visual Components

| Component | Purpose | Technology |
|-----------|---------|------------|
| **DataVisualization** | Canvas data network | HTML5 Canvas, mouse interaction |
| **NeuralNetworkBackground** | Particle animation | HTML5 Canvas, prefers-reduced-motion |
| **TechnicalTicker** | Infinite scroll ticker | CSS animation |
| **WireframeGeometry** | 3D rotating geometry | SVG, CSS transforms |
| **BlogMetaTags** | SEO meta tags | React Helmet Async |

### Feature Components (src/features/)

#### Hero Feature
- **HeroBanner.jsx**: Landing hero with 3D geometry (desktop) / video (mobile)

#### Services Feature
- **Services.jsx**: 3D carousel of offered services

#### Blog Feature
- **BlogCard.jsx**: Blog post card with variants (default, compact, featured)
- **BlogComponents.jsx**: Exports CategoryFilter, FeaturedPost, Sidebar, PostGrid
- **BlogPreview.jsx**: Home page blog preview

#### Contact Feature
- **Contact.jsx**: Contact form with EmailJS integration

#### Works Feature
- **Works.jsx**: Projects gallery with category filtering

#### Analytics Feature
- **AnalyticsCard.jsx**: Container card for analytics data
- **DataChart.jsx**: Simulated bar chart visualization

---

## Data Models

### Projects (src/data/projects.js)

```javascript
{
  id: string,                           // Unique identifier
  title: string,                        // Display title
  description: string,                  // Brief description (1-2 lines)
  stack: string[],                      // Technologies used
  progress: number,                     // 0-100 completion percentage
  progressLabel: string,                // Progress description
  status: 'completed' | 'in-progress',  // Project status
  image: import \| null,                // Image reference
  link: string \| null,                 // External URL
  featured: boolean,                    // Show in main galleries
  category: string,                     // Filter category
  highlights: string[],                 // Key highlights (2-4 items)
  longDescription: string,              // Extended description
  methodology: string[],                // Methodologies applied
  results: string[],                    // Results/deliverables
  notionLink: string \| null            // Notion documentation link
}
```

**Current Projects (5 total):**
1. fitness-retention-analysis (AI/ML, Completed)
2. omnistock (Full Stack, In Progress)
3. faro-art-shop (Frontend, Completed)
4. generador-presupuestos (Full Stack, Completed)
5. form-invent (Tools, Completed)

**Categories:**
- all, fullstack, frontend, ai-ml, tools

### Blog Posts (src/features/blog/data/blogData.js)

```javascript
{
  id: string,                    // Unique identifier
  slug: string,                  // URL slug
  title: string,                 // Post title
  category: string,               // Post category
  date: string,                  // Publication date
  readTime: string,              // Reading time
  featured: boolean,             // Featured post
  excerpt: string,               // Brief excerpt
  content: string,               // Full content (HTML)
  author: string,                // Author name
  authorAvatar: string,          // Author image
  image: string,                 // Cover image
  tags: string[]                // Post tags
}
```

**Current Blog Posts (4 total):**
1. fitness-data-integrity-refactor (Data Science)
2. python-para-data-analytics-guia (Data Engineering)
3. interpretacion-graficos-principio-pareto (Performance)
4. react-vs-react-native-comparativa (Frontend)

---

## Design System

### Color Palette (from tailwind.config.js)

#### Brand Colors
- **obsidian**: `#000000` - Pure dark background
- **cobalt-500**: `#0047AB` - Primary brand blue
- **mint-400**: `#2BFF88` - Vibrant spring green accent
- **cyan-institutional**: `#00FFFF` - ONGEVAG primary cyan

#### Neutral Colors
- **slate-850**: `#1a2332` - Card backgrounds
- **slate-950**: `#0d1117` - Deep backgrounds

### Typography

#### Font Families
- **sans**: Inter (body text, UI)
- **display**: Inter (headings)
- **mono**: JetBrains Mono (code, technical data)

#### Type Scale
- h1: 4xl (mobile) → 6xl (desktop)
- h2: 2xl (mobile) → 3xl (desktop)
- h3: xl (mobile) → 2xl (desktop)
- body: base (mobile) → [1.05rem] (desktop)

### Animation System (from motionConfig.js)

#### Spring Presets
- **gentle**: stiffness: 120, damping: 18 (smooth, fluid)
- **snappy**: stiffness: 280, damping: 25 (quick, responsive)
- **bouncy**: stiffness: 400, damping: 12 (playful)
- **smooth**: stiffness: 80, damping: 20 (inertial)

#### Duration Presets
- **fast**: 0.15s (quick interactions)
- **normal**: 0.3s (standard transitions)
- **slow**: 0.5s (complex animations)

#### Animation Variants
- **fadeInUp**: Fade + translateY(-20px) + blur
- **fadeInDown**: Fade + translateY(20px)
- **pageTransition**: Fade + translateY(20px) + blur
- **staggerContainer**: Staggered children animation
- **glassCard**: Card with hidden/visible/hover/tap states
- **buttonVariants**: Button idle/hover/tap states
- **skeletonPulse**: Loading state pulse
- **progressBar**: Width animation
- **reducedMotionConfig**: Accessibility fallback

### CSS Keyframes (from tailwind.config.js)

- **gradient**: Background position animation
- **float**: Vertical translation
- **shimmer**: Background position for loading
- **blob**: Morphing shapes
- **ticker**: Horizontal scroll for ticker

### Glassmorphism Classes

- **.glass**: backdrop-blur-xl bg-white/5 border border-white/10
- **.glass-strong**: backdrop-blur-2xl bg-white/10 border border-white/20
- **.glass-card**: glass with rounded-2xl

### Box Shadows

- **shadow-glow**: 0 0 25px -5px
- **shadow-cyan-glow**: 0 0 20px rgba(0, 255, 255, 0.5)
- **shadow-inner-glow**: inset 0 0 20px 0

---

## Build Configuration

### Vite Config (vite.config.js)

#### Plugins
- **@vitejs/plugin-react**: React support with Fast Refresh
- **vite-plugin-imagetools**: Image optimization
- **vite-plugin-compression**: Gzip/Brotli compression

#### Aliases
- `@components`: src/components
- `@features`: src/features
- `@config`: src/config
- `@hooks`: src/hooks
- `@data`: src/data
- `@assets`: src/assets

#### Build Optimizations
- **Manual Chunks**: Separated vendor chunks (react, framer-motion, react-icons)
- **Code Splitting**: CSS code splitting enabled
- **Minification**: esbuild (faster than terser)
- **Target**: esnext for better tree-shaking
- **Console Removal**: Dropped in production

#### Dev Server
- Port: 5173
- Host: true (network access)
- Open: false

---

## Custom Hooks

### useVibrate (src/hooks/useVibrate.js)

**Purpose:** Haptic feedback for mobile devices

**Usage:**
```javascript
const vibrate = useVibrate(10); // 10ms vibration
vibrate(); // Trigger vibration
```

**Predefined Patterns:**
- tap: 10
- success: [50, 30, 50]
- error: [100, 50, 100, 50, 100]
- notification: [50, 100, 50]
- heavy: 50
- light: 5

### useReducedMotion (src/hooks/useReducedMotion.js)

**Purpose:** Detect user's reduced motion preference for accessibility

**Usage:**
```javascript
const prefersReducedMotion = useReducedMotion();
// Returns true if user prefers reduced motion
```

---

## Environment Variables

### Required Variables (.env.example)

```bash
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

**Usage:** Contact form functionality in `src/features/contact/Contact.jsx`

---

## Code Quality Status

### Lint Issues (as of April 2026)

**Total:** 31 problems (30 errors, 1 warning)

**Common Issues:**
- Unused `motion` imports from framer-motion (24 occurrences)
- Unused variables in catch blocks (`error`, `err`, `e`)
- Unused loop variables (`index`, `prev`)
- React Hooks dependency warning in DataVisualization.jsx

**Build Status:** ✅ Succeeds despite lint errors

**Bundle Size:**
- Total gzipped: ~180KB
- Vendor chunk: 59.20KB gzipped
- Main chunk: 97.66KB gzipped
- CSS: 10.83KB gzipped

---

## Git Status

### Current Branch
- **main**: Latest production release (v2.2)
- **develop**: Development branch
- **feature/ui-fixes**: UI fixes branch

### Recent Commits
```
47ba1c6 release: portfolio v2.2 — UI, contenido y fixes de sanidad
eca4116 feat: UI fixes + auditoría post-sanidad
bf585d9 fix: corregir sitemap — remover rutas inexistentes
```

### Remote Branches
- origin/main
- origin/develop
- origin/feat/blog-refactor
- origin/feat/hero-video-mobile
- origin/feature/ui-fixes
- And 6 other feature branches

---

## Performance Checklist

### ✅ Implemented
- Code splitting with React.lazy()
- Suspense with SkeletonPage fallback
- Vendor chunks separated
- CSS code splitting
- esbuild minification
- Framer Motion configuration
- prefers-reduced-motion support
- Image optimization (WebP)
- Lazy loading for images
- Brotli compression

### 📋 Pending
- Responsive srcset for images
- Placeholder blur during load
- Prefetch for below-the-fold sections

### Target Metrics
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- FCP: < 1.8s

---

## Documentation Index

| File | Purpose | Audience |
|------|---------|----------|
| CLAUDE.md | Technical context for AI/devs | Developers |
| PRD.md | Product requirements | Product/Devs |
| DESIGN_TOKENS.md | Design system reference | Designers/Devs |
| MOD-01-PROJECTS.md | Projects module documentation | Developers |
| COMPONENT-TREE.md | Component hierarchy | Developers |
| PERFORMANCE.md | Performance checklist | Developers |
| CODEBASE_CONTEXT.md | Comprehensive codebase reference | All |

### ADRs (Architecture Decision Records)
- ADR-001: Vite as build tool
- ADR-002: JavaScript without TypeScript
- ADR-003: EmailJS for contact forms
- ADR-004: Feature-based architecture

---

## Development Commands

```bash
# Development
npm run dev          # Start dev server on :5173

# Build
npm run build        # Production build with sitemap generation
npm run preview      # Preview production build

# Linting
npm run lint         # ESLint check

# Deployment
# Auto-deploys to Vercel on push to main/develop
```

---

## Key Patterns & Conventions

### Import Organization
- React imports first
- Third-party libraries second
- Local imports third (using aliases)
- Styles last

### Component Structure
- Imports
- Component definition
- Helper functions (if any)
- Export

### Animation Usage
- Import variants from motionConfig.js
- Apply variants to motion components
- Respect reduced motion preference

### Data Access
- Projects: Import from src/data/projects.js
- Blog: Import from src/features/blog/data/blogData.js
- Images: Import from src/assets/

### Styling
- Use Tailwind utility classes
- Custom styles in src/index.css
- Glassmorphism via utility classes
- Animations via framer-motion

---

## Known Issues & Technical Debt

### Lint Issues
- 30 unused `motion` imports (refactor needed)
- Unused variables in error handlers
- React Hooks dependency warning

### Technical Debt
- No automated tests
- No TypeScript (ADR-002 decision)
- Content hardcoded in JS (no CMS)
- No analytics integration
- No rate limiting on contact form

---

## Deployment

### Platform
- **Vercel** (free tier)
- **Auto CI/CD** on push to main/develop
- **URL**: https://ongevag.vercel.app/

### Build Output
- **Directory**: dist/
- **Format**: ESM modules
- **Compression**: Gzip + Brotli

---

## Contact & Support

**Owner:** Leandro Gavegno (lgavegno@gmail.com)  
**Brand:** Ongevag Studio (Rafaela, Santa Fe, Argentina)  
**Repository:** https://github.com/lgavegno/mi-portafolio

---

**Last Updated:** April 2026  
**Document Version:** 1.0  
**Maintained By:** Development Team
