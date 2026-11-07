// src/features/hero/HeroBanner.jsx
// ONGEVAG Hero Banner - Institutional Fintech Design

import React from 'react';
// ⚠️ GUARDRAIL: No eliminar este import. `motion` se usa via JSX member expression
// (<motion.div>, <motion.h1>, etc.). ESLint solo reconoce su uso si la regla
// `react/jsx-uses-vars` está activa en eslint.config.js. Ver BITACORA 2026-06-09.
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import { useLocale } from '../../hooks/useLocale';

import TechnicalTicker from '../../components/TechnicalTicker';
import SolutionDoors from '../solutions/components/SolutionDoors';
import { FEATURES } from '../../config/features';


// onOpenSolution (opcional): abre la sección #soluciones en la home (FEATURE-12)
// showSolutions: por defecto FEATURES.solutions (src/config/features.js)
const HeroBanner = ({ onOpenSolution, showSolutions = FEATURES.solutions }) => {
  const { t } = useLocale();

  return (
    <section
      id="inicio"
      className={`relative ${showSolutions ? 'lg:min-h-screen' : 'min-h-screen'} flex flex-col bg-[#EEE0C9] overflow-hidden`}
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
      <div className="relative z-10 flex-1 flex items-start lg:items-center">
        <div className={`container mx-auto px-6 ${showSolutions ? 'pt-10 pb-12 lg:py-16' : 'pt-20 pb-6 lg:py-0'}`}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className={
              showSolutions
                ? // Columna izquierda (misma posición que el hero original), centrada en vertical;
                  // la mitad derecha queda libre para las figuras geométricas (sin superponerlas).
                  'w-full lg:w-1/2 lg:pr-10 flex flex-col items-start text-left space-y-8'
                : 'max-w-xl space-y-6 text-left'
            }
          >
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

            {/* Marca. Con FEATURES.solutions queda oculta a la vista pero presente
                para SEO y lectores de pantalla (el h1 de la home sigue siendo ONGEVAG). */}
            <div data-testid="hero-brand" className={showSolutions ? 'sr-only' : 'space-y-6'}>
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

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-[#4B5563] font-normal text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
              >
                {t.hero.description}
              </motion.p>
            </div>

            {/* FEATURE-12 — Sistemas de gestión: puertas Odoo / Dux, única acción del hero */}
            {showSolutions && (
              <motion.div variants={fadeInUp} className="w-full">
                <SolutionDoors onOpen={onOpenSolution} />
              </motion.div>
            )}
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
          <circle cx="380" cy="380" r="220" fill="rgba(44,51,64,0.05)"    stroke="#96B6C5" strokeWidth="1.5"/>
          {/* Medium circle top-left of main */}
          <circle cx="210" cy="290" r="110" fill="rgba(150,182,197,0.10)" stroke="#2C3340" strokeWidth="1.5"/>
          {/* Small circle top */}
          <circle cx="310" cy="155" r="65"  fill="rgba(44,51,64,0.06)"    stroke="#2C3340" strokeWidth="1"/>
          {/* Tiny accent circle */}
          <circle cx="175" cy="175" r="35"  fill="rgba(150,182,197,0.12)" stroke="#96B6C5" strokeWidth="1"/>
          {/* Large circle cut by edge bottom-right */}
          <circle cx="490" cy="490" r="150" fill="rgba(44,51,64,0.04)"    stroke="#96B6C5" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Technical Ticker at base */}
      <TechnicalTicker />
    </section>
  );
};

export default HeroBanner;