// src/App.jsx
import React, { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import BlogLayout from './layouts/BlogLayout'
import { LocaleProvider } from './context/LocaleProvider'
import { SkeletonPage } from './components/ui/Skeleton'
import { pageTransition } from './config/motionConfig'
import BlogPostDetail from './pages/BlogPostDetail'
import BlogIndex from './pages/BlogIndex'
import ProjectDetail from './pages/ProjectDetail'

import HeroBanner from './features/hero/HeroBanner'
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./features/services/Services'))
const Works = lazy(() => import('./features/works/Works'))
const BlogPreview = lazy(() => import('./features/blog/components/BlogPreview'))
const Contact = lazy(() => import('./features/contact/Contact'))
const SkillsGrid = lazy(() => import('./components/SkillsGrid'))

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

const LocaleLayout = () => {
  const location = useLocation();
  const locale = location.pathname.startsWith('/en') ? 'en' : 'es';

  return (
    <LocaleProvider locale={locale}>
      <Outlet />
    </LocaleProvider>
  );
};

function App() {
  const location = useLocation();

  React.useEffect(() => {
    const prefetchBlog = async () => {
      try {
        await import('./pages/BlogIndex');
        await import('./layouts/BlogLayout');
      } catch (error) {
        // Silent fail
      }
    };

    const timer = setTimeout(prefetchBlog, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<SkeletonPage />}>
          <Routes location={location} key={location.pathname}>
            <Route element={<LocaleLayout />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomeSections />} />
                <Route path="proyecto/:id" element={<ProjectDetail />} />
                <Route path="blog" element={<BlogLayout />}>
                  <Route index element={<BlogIndex />} />
                  <Route path=":slug" element={<BlogPostDetail />} />
                </Route>
              </Route>

              <Route path="/en" element={<MainLayout />}>
                <Route index element={<HomeSections />} />
                <Route path="proyecto/:id" element={<ProjectDetail />} />
                <Route path="blog" element={<BlogLayout />}>
                  <Route index element={<BlogIndex />} />
                  <Route path=":slug" element={<BlogPostDetail />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Analytics />
    </>
  )
}

export default App
