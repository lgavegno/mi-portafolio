import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { glassCard, springConfig } from '../../config/motionConfig';
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
  linkLabel,
  highlights = [], // Nueva prop añadida
  className = '',
  index = 0
}) => {
  const vibrate = useVibrate(10);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

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

  const handleClick = (e) => {
    // Si el clic fue en un enlace externo (si lo hubiera dentro de la card) o botón específico, no navegar
    if (e.target.closest('a') || e.target.closest('button')) return;

    vibrate();
    if (id) {
      navigate(`/proyecto/${id}`);
    } else if (link) {
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

        <div className="mt-auto">
          {/* Stack tecnológico */}
          <div className="flex flex-wrap gap-2 mb-6">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-gray-300 border border-white/5 group-hover:border-cobalt-400/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Barra de progreso */}
          {progress > 0 && (
            <ProgressBar
              progress={progress}
              label={progressLabel}
              variant={progress >= 75 ? 'success' : 'default'}
              size="sm"
            />
          )}
        </div>

        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-cobalt-500/10 border border-white/10 hover:border-cobalt-400/30 transition-all"
            whileHover={{ x: 2 }}
          >
            {linkLabel || 'Ver proyecto'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        )}
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