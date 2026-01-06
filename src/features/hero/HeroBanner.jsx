// src/features/hero/HeroBanner.jsx
// Hero Banner 2025 con micro-interacciones de dopamina
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { 
  fadeInUp, 
  staggerContainer, 
  springConfig,
  viewportConfig 
} from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/ui/Button';
import ProjectCard from '../../components/ui/ProjectCard';
import NeuralNetworkBackground from '../../components/NeuralNetworkBackground';
import { BlogPreview } from '../blog';
import { featuredProjects } from '../../data/projects';

// Componente de texto animado letra por letra
const AnimatedText = ({ text, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: i * 0.03,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Componente de badge animado
const Badge = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={springConfig.bouncy}
      className={`
        inline-flex items-center gap-2
        px-4 py-2 rounded-full
        bg-gradient-to-r from-cobalt-500/15 to-blue-500/10
        border border-cobalt-400/30
        backdrop-blur-sm
        relative overflow-hidden
        ${className}
      `}
    >
      {children}
      
      {/* Efecto de partículas de luz */}
      {isHovered && (
        <>
          <motion.div 
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ x: -10, y: "50%", opacity: 0.8 }}
            animate={{ 
              x: "100%",
              transition: { duration: 0.5, repeat: Infinity }
            }}
          />
          <motion.div 
            className="absolute w-1 h-1 bg-blue-300 rounded-full"
            initial={{ x: -5, y: "30%", opacity: 0.6 }}
            animate={{ 
              x: "100%",
              transition: { duration: 0.7, repeat: Infinity, delay: 0.2 }
            }}
          />
        </>
      )}
      
      {/* Brillo base sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
    </motion.div>
  );
};

// Iconos sociales con animación
const SocialLink = ({ href, icon: Icon, label, delay = 0 }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, ...springConfig.gentle }}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="
      p-3 rounded-full
      bg-white/5 border border-white/10
      text-gray-400 hover:text-mint-400
      hover:border-mint-400/30 hover:bg-mint-400/5
      transition-colors duration-300
    "
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

const HeroBanner = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-8 md:pt-0"
    >
      {/* Neural Network Animation - Solo en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <NeuralNetworkBackground />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cobalt-500/20 rounded-full filter blur-[128px] animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-mint-400/10 rounded-full filter blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt-600/5 rounded-full filter blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <Badge className="mb-8">
            <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
            <span className="text-cobalt-300 text-sm font-medium tracking-wide">
              Perfil técnico en formación
            </span>
          </Badge>

          {/* Headline principal */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Aprendiendo a resolver problemas reales</span>
            <br />
            <span className="bg-gradient-to-r from-cobalt-400 via-cobalt-300 to-mint-400 bg-clip-text text-transparent">
              con software y datos
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Desarrollo proyectos como parte de mi aprendizaje en programación y análisis,
            explorando cómo los sistemas y los datos pueden apoyar decisiones
            y mejorar procesos reales.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-6 sm:mt-8 px-4 sm:px-0"
          >
            <Button
              variant="accent"
              size="lg"
              icon={<FiArrowRight />}
              iconPosition="right"
              onClick={scrollToProjects}
            >
              Ver proyectos completos
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              icon={<FiMail />}
              onClick={scrollToContact}
            >
              Contactar
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-4 mb-20"
          >
            <SocialLink 
              href="https://github.com/lgavegno" 
              icon={FaGithub} 
              label="GitHub"
              delay={0.5}
            />
            <SocialLink 
              href="https://linkedin.com/in/lgavegno" 
              icon={FaLinkedin} 
              label="LinkedIn"
              delay={0.6}
            />
          </motion.div>

          {/* Vision Cards - Proyectos destacados */}
          <motion.div
            variants={fadeInUp}
            className="mt-8"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8"
            >
              Proyectos en desarrollo
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  stack={project.stack}
                  progress={project.progress}
                  progressLabel={project.progressLabel}
                  status={project.status}
                  image={project.image}
                  link={project.link}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Quick Blog Preview */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 max-w-md mx-auto"
          >
            <BlogPreview 
              limit={3} 
              variant="compact" 
              showHeader={true}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-gray-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
