// src/App.jsx
import React, { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { LocaleProvider } from './context/LocaleProvider'
import { SkeletonPage } from './components/ui/Skeleton'
import { pageTransition } from './config/motionConfig'
import HeroBanner from './features/hero/HeroBanner'
import SectionDivider from './components/ui/SectionDivider'
const About = lazy(() => import('./components/About'))
const BlogLayout = lazy(() => import('./layouts/BlogLayout'))
const BlogIndex = lazy(() => import('./pages/BlogIndex'))
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Services = lazy(() => import('./features/services/Services'))
const Works = lazy(() => import('./features/works/Works'))
const BlogPreview = lazy(() => import('./features/blog/components/BlogPreview'))
const Contact = lazy(() => import('./features/contact/Contact'))
const SkillsGrid = lazy(() => import('./components/SkillsGrid'))
const AgenciasPage = lazy(() => import('./pages/AgenciasPage'))
const AgenciesPageEN = lazy(() => import('./pages/AgenciesPageEN'))
const AgenciasPagePT = lazy(() => import('./pages/AgenciasPagePT'))

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
    <SectionDivider variant="wave" fromColor="#EEE0C9" toColor="#F1F0E8" />
    <AnimatedSection id="sobre-mi">
      <About />
    </AnimatedSection>
    <SectionDivider variant="bowl" fromColor="#F1F0E8" toColor="#ADC4CE" height={80} />
    <AnimatedSection id="skills">
      <SkillsGrid className="bg-[#ADC4CE]" />
    </AnimatedSection>
    <SectionDivider variant="wave" fromColor="#ADC4CE" toColor="#2C3340" />
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
  const locale = location.pathname.startsWith('/pt')
    ? 'pt'
    : location.pathname.startsWith('/en')
      ? 'en'
      : 'es';

  return (
    <LocaleProvider locale={locale}>
      <Outlet />
    </LocaleProvider>
  );
};

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<SkeletonPage />}>
          <Routes location={location}>
            <Route element={<LocaleLayout />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomeSections />} />
                <Route path="proyecto/:id" element={<ProjectDetail />} />
                <Route path="agencias" element={<AgenciasPage />} />
                <Route path="blog" element={<BlogLayout />}>
                  <Route index element={<BlogIndex />} />
                  <Route path=":slug" element={<BlogPostDetail />} />
                </Route>
              </Route>

              <Route path="/en" element={<MainLayout />}>
                <Route index element={<HomeSections />} />
                <Route path="proyecto/:id" element={<ProjectDetail />} />
                <Route path="agencies" element={<AgenciesPageEN />} />
                <Route path="blog" element={<BlogLayout />}>
                  <Route index element={<BlogIndex />} />
                  <Route path=":slug" element={<BlogPostDetail />} />
                </Route>
              </Route>

              <Route path="/pt" element={<MainLayout />}>
                <Route index element={<HomeSections />} />
                <Route path="proyecto/:id" element={<ProjectDetail />} />
                <Route path="agencias" element={<AgenciasPagePT />} />
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
