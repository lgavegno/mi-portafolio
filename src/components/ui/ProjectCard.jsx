import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { springConfig } from '../../config/motionConfig';
import { useVibrate } from '../../hooks/useVibrate';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProgressBar from './ProgressBar';

const ProjectCard = ({
  id, // Asegúrate de recibir el id
  title,
  description,
  stack = [],
  progress = 0,
  progressLabel = '',
  status = 'in-progress',
  image,
  link,
  highlights = [], // Nueva prop añadida
  className = '',
  index = 0
}) => {
  const vibrate = useVibrate(10);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
  const safeTransition = {
    delay: safeIndex * 0.15,
    ...(springConfig?.snappy ?? { type: 'spring', stiffness: 280, damping: 25 }),
  };

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

  const safeIndex = typeof index === 'number' ? index : 0;
  const safeTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 60, damping: 18, delay: safeIndex * 0.12 };

  const handleClick = () => {
    vibrate();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (id) {
      navigate(`/proyecto/${id}`);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, x: safeIndex % 2 === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={safeTransition}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onClick={handleClick}
      className={`
        group relative cursor-pointer
        rounded-2xl overflow-hidden
        backdrop-blur-xl bg-white/10
        border border-white/15
        hover:border-cyan-institutional/30
        active:bg-white/8
        transition-colors duration-300
        touch-manipulation select-none
        h-full flex flex-col
        z-30
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

      {/* Imagen del proyecto */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={springConfig.gentle}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </div>
      )}

      {/* Contenido */}
      <div className="p-6 relative z-10 flex-1 flex flex-col">
        <span className={`
          inline-flex items-center gap-1.5
          px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold
          border backdrop-blur-sm
          ${currentStatus.color}
          mb-4 w-fit
        `}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {currentStatus.label}
        </span>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cobalt-300 transition-colors">
          {title}
        </h3>

        <p className="text-white/80 text-base leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        {/* Technical Highlights (NUEVO SECCIÓN) */}
        {highlights.length > 0 && (
          <div className="mb-6 space-y-2">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Key Insights</p>
            <div className="flex flex-col gap-2">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-mint-400/90 font-medium">
                  <span className="w-1 h-1 rounded-full bg-mint-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3">
          {/* Bloque de progreso */}
          {progress > 0 && (
            <div className="w-full">
              <ProgressBar
                progress={progress}
                label={progressLabel}
                variant={progress >= 75 ? 'success' : 'default'}
                size="sm"
              />
            </div>
          )}

          {/* Bloque de acciones (stack tecnológico) */}
          <div className="flex flex-wrap gap-2 items-center">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-gray-300 border border-white/5 group-hover:border-cobalt-400/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {link && (
              <span className="ml-auto text-xs text-gray-500 group-hover:text-cyan-institutional transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visitar
              </span>
            )}
          </div>
        </div>

      </div>

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