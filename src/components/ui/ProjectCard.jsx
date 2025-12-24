// src/components/ui/ProjectCard.jsx
// Card de proyecto con glassmorphism y micro-interacciones

import React from 'react';
import { motion } from 'framer-motion';
import { glassCard, springConfig } from '../../config/motionConfig';
import { useVibrate } from '../../hooks/useVibrate';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProgressBar from './ProgressBar';

const ProjectCard = ({
  title,
  description,
  stack = [],
  progress = 0,
  progressLabel = '',
  status = 'in-progress',
  image,
  link,
  className = '',
  index = 0
}) => {
  const vibrate = useVibrate(10);
  const prefersReducedMotion = useReducedMotion();

  // Estados visuales
  const statusConfig = {
    'in-progress': {
      label: 'En desarrollo',
      color: 'bg-amber-400/20 text-amber-400 border-amber-400/30'
    },
    'completed': {
      label: 'Completado',
      color: 'bg-mint-400/20 text-mint-400 border-mint-400/30'
    },
    'planning': {
      label: 'Planificación',
      color: 'bg-cobalt-400/20 text-cobalt-400 border-cobalt-400/30'
    }
  };

  const currentStatus = statusConfig[status] || statusConfig['in-progress'];

  const handleClick = () => {
    vibrate();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.article
      variants={glassCard}
      initial="hidden"
      whileInView="visible"
      whileHover={prefersReducedMotion ? {} : "hover"}
      whileTap={prefersReducedMotion ? {} : "tap"}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      className={`
        group relative cursor-pointer
        rounded-2xl overflow-hidden
        backdrop-blur-xl bg-white/5
        border border-white/10
        hover:border-cobalt-400/30
        transition-colors duration-300
        ${className}
      `}
    >
      {/* Efecto de brillo en hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 71, 171, 0.15), transparent 40%)'
        }}
      />

      {/* Imagen del proyecto (opcional) */}
      {image && (
        <div className="relative h-40 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={springConfig.gentle}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Contenido */}
      <div className="p-6 relative z-10">
        {/* Badge de estado */}
        <span className={`
          inline-flex items-center gap-1.5
          px-3 py-1 rounded-full text-xs font-medium
          border backdrop-blur-sm
          ${currentStatus.color}
          mb-4
        `}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {currentStatus.label}
        </span>

        {/* Título */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cobalt-300 transition-colors">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stack tecnológico */}
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                viewport={{ once: true }}
                className="
                  px-2.5 py-1 rounded-full text-xs font-medium
                  bg-slate-700/50 text-gray-300
                  border border-slate-600/50
                  hover:border-cobalt-400/50 hover:text-cobalt-300
                  transition-colors
                "
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        {/* Barra de progreso */}
        {progress > 0 && (
          <ProgressBar
            progress={progress}
            label={progressLabel}
            variant={progress >= 75 ? 'success' : 'default'}
            size="sm"
          />
        )}

        {/* Indicador de link */}
        {link && (
          <motion.div
            className="absolute bottom-6 right-6 text-gray-500 group-hover:text-cobalt-400 transition-colors"
            whileHover={{ x: 3 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Borde con gradiente animado en hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 71, 171, 0.3), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.article>
  );
};

export default ProjectCard;
