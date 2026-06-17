// src/features/hero/HeroBanner.jsx
// ONGEVAG Hero Banner - Institutional Fintech Design

import React from 'react';
// ⚠️ GUARDRAIL: No eliminar este import. `motion` se usa via JSX member expression
// (<motion.div>, <motion.h1>, etc.). ESLint solo reconoce su uso si la regla
// `react/jsx-uses-vars` está activa en eslint.config.js. Ver BITACORA 2026-06-09.
import { motion } from 'framer-motion';
import { FiLayers } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import { useLocale } from '../../hooks/useLocale';

import TechnicalTicker from '../../components/TechnicalTicker';


const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.97 },
};

const HeroBanner = () => {
  const { t } = useLocale();

  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ⚠️ CRÍTICO: No eliminar esta función.
  // El botón "Contactar" (CTA secundario) depende de ella para el scroll.
  // Su ausencia rompe la navegación sin generar error visible en consola.
  // Ver CLAUDE.md §Critical Files y BITACORA 2026-06-09.
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col bg-[#EEE0C9] overflow-hidden"
    >
      {/* Glow cyan top-left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(150,182,197,0.25) 0%, transparent 70%)'
        }}
      />

      {/* Glow indigo bottom-right */}
      <div
        className="absolute -bottom-32 right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(173,196,206,0.20) 0%, transparent 70%)'
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
                <div className="pt-8 px-6 lg:p-0">
                  <div className="space-y-6">
                    {/* Badge Disponible */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C3340] border border-[#2C3340] text-[#F1F0E8] text-xs font-medium tracking-widest uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#96B6C5] animate-pulse" />
                      {t.hero.badge}
                    </motion.div>

                    {/* Title ONGEVAG with gradient on GE */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="whitespace-nowrap leading-none mb-4"
                    >
                      <span className="font-display font-extrabold text-[36px] sm:text-5xl md:text-6xl lg:text-7xl text-[#2C3340]">ON</span>
                      <span
                        className="font-display font-extrabold text-[36px] sm:text-5xl md:text-6xl lg:text-7xl"
                        style={{
                          background: 'linear-gradient(135deg, #96B6C5, #ADC4CE)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        GE
                      </span>
                      <span className="font-display font-extrabold text-[36px] sm:text-5xl md:text-6xl lg:text-7xl text-[#2C3340]">VAG</span>
                    </motion.h1>

                    {/* Role Subtitle */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-[#4B5563]"
                    >
                      {t.hero.role}
                    </motion.p>

                  </div>
                </div>

                {/* Block 2: Bottom (Description & Buttons & Stats) */}
                <div className="pb-12 px-6 lg:p-0 space-y-8">
                  {/* Description */}
                  <motion.p
                    variants={fadeInUp}
                    className="text-[#4B5563] font-normal text-base md:text-lg lg:text-xl leading-relaxed max-w-xl lg:mt-6"
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
                        background: '#2C3340'
                      }}
                    >
                      <FiLayers />
                      {t.hero.cta.projects}
                    </button>

                    {/* Secondary Button - Contactar */}
                    <motion.button
                      onClick={scrollToContact}
                      variants={buttonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      className="px-8 py-4 rounded-full font-semibold text-[#2C3340] border border-[#96B6C5] hover:border-[#ADC4CE] hover:bg-[#ADC4CE]/20 transition-colors duration-300"
                    >
                      {t.hero.cta.contact}
                    </motion.button>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex gap-8 pt-7 border-t border-[#2C3340]/20"
                  >
                    <div className="flex flex-col items-center bg-[#2C3340]/8 border border-[#2C3340]/15 rounded-xl px-5 py-3">
                      <div className="font-display text-3xl font-bold text-[#2C3340]">4+</div>
                      <div className="text-xs text-[#2C3340]/60 uppercase tracking-widest mt-0.5 font-medium">{t.hero.stats.projectsLabel}</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#2C3340]/8 border border-[#2C3340]/15 rounded-xl px-5 py-3">
                      <div className="font-display text-3xl font-bold text-[#2C3340]">PyME</div>
                      <div className="text-xs text-[#2C3340]/60 uppercase tracking-widest mt-0.5 font-medium">{t.hero.stats.focus}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Swiss editorial circles — decorative, bottom-right */}
      <div
        className="absolute bottom-16 right-0 pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        <svg
          width="520"
          height="520"
          viewBox="0 0 520 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dominant large circle */}
          <circle cx="380" cy="380" r="220" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
          {/* Medium circle top-left of main */}
          <circle cx="210" cy="290" r="110" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/>
          {/* Small circle top */}
          <circle cx="310" cy="155" r="65" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5"/>
          {/* Tiny accent circle */}
          <circle cx="175" cy="175" r="35" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
          {/* Large circle cut by edge bottom-right */}
          <circle cx="490" cy="490" r="150" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.30)" strokeWidth="2"/>
        </svg>
      </div>

      {/* Technical Ticker at base */}
      <TechnicalTicker />
    </section>
  );
};

export default HeroBanner;