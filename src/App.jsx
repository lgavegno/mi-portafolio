// src/App.jsx
import React, { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import BlogLayout from './layouts/BlogLayout' // New Layout
import { SkeletonPage } from './components/ui/Skeleton'
import { pageTransition } from './config/motionConfig'
import BlogPostDetail from './pages/BlogPostDetail'
import BlogIndex from './pages/BlogIndex' // New Page
import ProjectDetail from './pages/ProjectDetail'

// Lazy loading de secciones para code splitting
import HeroBanner from './features/hero/HeroBanner'
// Lazy loading de secciones para code splitting
// HeroBanner importado estáticamente para mejorar LCP
// const HeroBanner = lazy(() => import('./features/hero/HeroBanner'))
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./features/services/Services'))
const Works = lazy(() => import('./features/works/Works'))
// BlogPreview might still be used in Home, keeping it.
const BlogPreview = lazy(() => import('./features/blog/components/BlogPreview'))
const Contact = lazy(() => import('./features/contact/Contact'))
const SkillsGrid = lazy(() => import('./components/SkillsGrid'))

// Wrapper con animación para cada sección
const AnimatedSection = ({ children, id }) => (
  <motion.div
    id={id}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.05, fallback: true }}
    variants={pageTransition}
  >
    {children}
  </motion.div>
)

const HomeSections = () => (
  <>
    <AnimatedSection id="hero">
      <HeroBanner />
    </AnimatedSection>

    <AnimatedSection id="sobre-mi">
      <About />
    </AnimatedSection>

    <AnimatedSection id="skills">
      <SkillsGrid />
    </AnimatedSection>

    <AnimatedSection id="servicios">
      <Services />
    </AnimatedSection>

    <AnimatedSection id="proyectos">
      <Works />
    </AnimatedSection>

    <AnimatedSection id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <BlogPreview />
      </div>
    </AnimatedSection>

    <AnimatedSection id="contacto">
      <Contact />
    </AnimatedSection>
  </>
)

// Wrapper component for MainLayout to use in Route element
const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

function App() {
  const location = useLocation();

  React.useEffect(() => {
    // Strategic Prefetching: Load Blog chunk when user is idle/viewing Hero
    const prefetchBlog = async () => {
      try {
        await import('./pages/BlogIndex');
        await import('./layouts/BlogLayout');
      } catch (error) {
        // Silent fail
      }
    };

    // Delay to prioritize LCP
    const timer = setTimeout(prefetchBlog, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<SkeletonPage />}>
          <Routes location={location} key={location.pathname}>
            {/* Main Site Routes */}
            <Route element={<MainLayoutWrapper />}>
              <Route path="/" element={<HomeSections />} />
              <Route path="/proyecto/:id" element={<ProjectDetail />} />
            </Route>

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogLayout />}>
              <Route index element={<BlogIndex />} />
              <Route path=":slug" element={<BlogPostDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Analytics />
    </>
  )
}

export default App