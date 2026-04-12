// src/features/hero/HeroBanner.jsx
// ONGEVAG Hero Banner - Institutional Fintech Design

import React from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiMail, FiDownload } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import GlowButton from '../../components/ui/GlowButton';

import TechnicalTicker from '../../components/TechnicalTicker';

// Lazy loading del componente pesado 3D
const WireframeGeometry = React.lazy(() => import('../../components/WireframeGeometry'));

const HeroBanner = () => {
  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col bg-obsidian overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
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
                {/* Mobile Background Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover -z-10 lg:hidden opacity-60 pointer-events-none"
                >
                  <source src="/videos/ongevagDesign.mp4" type="video/mp4" />
                </video>

                {/* Dark overlay for text legibility on mobile */}
                <div className="absolute inset-0 -z-10 bg-black/40 lg:hidden pointer-events-none" />

                {/* Block 1: Top (Title & Subtitle) */}
                <div className="pt-8 px-6 lg:p-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-none"
                    >
                      ONGEVAG
                    </motion.h1>

                    {/* Role Subtitle */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                      style={{ color: 'rgb(0, 255, 255)' }}
                    >
                      Software Developer · Data & Systems Enthusiast
                    </motion.p>
                  </div>
                </div>

                {/* Block 2: Bottom (Description & Buttons) */}
                <div className="pb-12 px-6 lg:p-0 space-y-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {/* Description */}
                  <motion.p
                    variants={fadeInUp}
                    className="text-gray-200 font-normal text-base md:text-lg lg:text-xl leading-relaxed max-w-xl lg:mt-6 max-lg:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  >
                    Diseño y desarrollo proyectos de software y análisis de datos.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <GlowButton
                      variant="primary"
                      onClick={scrollToProjects}
                      icon={<FiLayers />}
                    >
                      Ver proyectos
                    </GlowButton>

                    <GlowButton
                      variant="secondary"
                      onClick={scrollToContact}
                      icon={<FiMail />}
                    >
                      Contactar
                    </GlowButton>

                    <GlowButton
                      variant="secondary"
                      href="/CV_LeandroGavegno-04-26.pdf"
                      download="CV_LeandroGavegno-04-26.pdf"
                      icon={<FiDownload />}
                      className="lg:hidden"
                    >
                      Descargar CV
                    </GlowButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - 3D Wireframe with Frame */}
            <motion.div
              variants={fadeInUp}
              className="hidden lg:flex items-center justify-center h-full min-h-[400px] max-h-[500px] p-8"
            >
              {/* Cyan frame container with glow and float */}
              <motion.div
                className="relative p-6 border rounded-sm scale-90"
                style={{
                  borderColor: 'rgba(0, 255, 255, 0.4)',
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                }}
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 1, 0, -1, 0],
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