// src/features/hero/HeroBanner.jsx
// ONGEVAG Hero Banner - Institutional Fintech Design

import React from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiMail } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import GlowButton from '../../components/ui/GlowButton';
import WireframeGeometry from '../../components/WireframeGeometry';
import TechnicalTicker from '../../components/TechnicalTicker';

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
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-20 lg:py-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column - Brand & CTAs */}
            <motion.div variants={fadeInUp} className="space-y-8 text-left">
              {/* Monumental Brand Name */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none"
                >
                  ONGEVAG
                </motion.h1>

                {/* Role Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                  style={{ color: 'rgb(0, 255, 255)' }}
                >
                  Software Developer · Data & Systems Enthusiast
                </motion.p>
              </div>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
              >
                Diseño y desarrollo proyectos de software y análisis de datos, explorando cómo los sistemas bien pensados pueden mejorar decisiones y procesos reales.
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
              </motion.div>
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
                <WireframeGeometry />
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