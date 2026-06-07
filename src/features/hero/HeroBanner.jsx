// src/features/hero/HeroBanner.jsx
// ONGEVAG Hero Banner - Institutional Fintech Design

import React from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiMail } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import { useLocale } from '../../hooks/useLocale';

import TechnicalTicker from '../../components/TechnicalTicker';
import ParticleBackground from '../../components/ParticleBackground';

// Lazy loading del componente pesado 3D
const WireframeGeometry = React.lazy(() => import('../../components/WireframeGeometry'));

const HeroBanner = () => {
  const { t } = useLocale();

  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#080c14] via-[#0d1520] to-[#061018] overflow-hidden"
    >
      {/* Particle Background Animation */}
      <ParticleBackground />

      {/* Glow cyan top-left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,188,212,0.12) 0%, transparent 70%)'
        }}
      />

      {/* Glow indigo bottom-right */}
      <div
        className="absolute -bottom-32 right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Main content container */}
      <div className="flex-1 flex items-start lg:items-center">
        <div className="container mx-auto px-6 pt-20 pb-6 lg:pt-0 lg:py-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column - Brand & CTAs */}
            <motion.div variants={fadeInUp} className="w-full lg:space-y-8 text-left">
              {/* Main Container - Split Layout for Mobile */}
              <div className="relative flex flex-col justify-between min-h-[75vh] lg:min-h-auto lg:block lg:space-y-8">
                {/* Block 1: Top (Badge & Title & Subtitle) */}
                <div className="pt-8 px-6 lg:p-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  <div className="space-y-6">
                    {/* Badge Disponible */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/8 border border-cyan-500/20 text-cyan-400 text-xs font-medium tracking-widest uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {t.hero.badge}
                    </motion.div>

                    {/* Title ONGEVAG with gradient on GE */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="whitespace-nowrap leading-none mb-4"
                    >
                      <span className="font-display font-extrabold text-[36px] sm:text-5xl md:text-6xl lg:text-7xl text-slate-100">ON</span>
                      <span
                        className="font-display font-extrabold text-[36px] sm:text-5xl md:text-6xl lg:text-7xl"
                        style={{
                          background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        GE
                      </span>
                      <span className="font-display font-extrabold text-[36px] sm:text-5xl md:text-6xl lg:text-7xl text-slate-100">VAG</span>
                    </motion.h1>

                    {/* Role Subtitle */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-slate-300"
                    >
                      {t.hero.role}
                    </motion.p>

                  </div>
                </div>

                {/* Block 2: Bottom (Description & Buttons & Stats) */}
                <div className="pb-12 px-6 lg:p-0 space-y-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {/* Description */}
                  <motion.p
                    variants={fadeInUp}
                    className="text-slate-300 font-normal text-base md:text-lg lg:text-xl leading-relaxed max-w-xl lg:mt-6 max-lg:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  >
                    {t.hero.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    {/* Primary Button - Ver Proyectos */}
                    <button
                      onClick={scrollToProjects}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4, #818cf8)'
                      }}
                    >
                      <FiLayers />
                      {t.hero.cta.projects}
                    </button>

                    {/* Secondary Button - Contactar */}
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-slate-300 text-sm font-medium border border-white/10 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 bg-transparent"
                    >
                      <FiMail />
                      {t.hero.cta.contact}
                    </button>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex gap-8 pt-7 border-t border-white/[0.06]"
                  >
                    <div>
                      <div className="font-display text-xl font-bold text-slate-100">4+</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{t.hero.stats.projectsLabel}</div>
                    </div>
                    <div>
                      <div className="font-display text-xl font-bold text-slate-100">PyME</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{t.hero.stats.focus}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - 3D Wireframe with Frame */}
            <motion.div
              variants={fadeInUp}
              className="hidden lg:flex items-center justify-center h-full min-h-[400px] max-h-[500px] p-8"
            >
              {/* Wireframe float animation */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <React.Suspense fallback={<div className="w-64 h-64" />}>
                  <WireframeGeometry />
                </React.Suspense>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Technical Ticker at base */}
      <TechnicalTicker />
    </section>
  );
};

export default HeroBanner;