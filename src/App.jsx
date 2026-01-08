// src/App.jsx
import React, { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { SkeletonPage } from './components/ui/Skeleton'
import { pageTransition } from './config/motionConfig'
import BlogPostDetail from './pages/BlogPostDetail'

// Lazy loading de secciones para code splitting
const HeroBanner = lazy(() => import('./features/hero/HeroBanner'))
const SkillsGrid = lazy(() => import('./components/SkillsGrid'))
const Services = lazy(() => import('./features/services/Services'))
const Works = lazy(() => import('./features/works/Works'))
const Contact = lazy(() => import('./features/contact/Contact'))

// Wrapper con animación para cada sección
const AnimatedSection = ({ children, id }) => (
  <motion.div
    id={id}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-100px" }}
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

    <AnimatedSection id="skills">
      <SkillsGrid className="py-20" />
    </AnimatedSection>

    <AnimatedSection id="servicios">
      <Services />
    </AnimatedSection>

    <AnimatedSection id="proyectos">
      <Works />
    </AnimatedSection>

    <AnimatedSection id="contacto">
      <Contact />
    </AnimatedSection>
  </>
)

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<SkeletonPage />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeSections />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </MainLayout>
  )
}

export default App