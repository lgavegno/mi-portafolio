// src/components/ui/ProgressBar.jsx
// Barra de progreso animada con Framer Motion

import React from 'react';
import { progressBar } from '../../config/motionConfig';

const ProgressBar = ({
  progress = 0,
  label = '',
  showPercentage = true,
  variant = 'default',
  size = 'md',
  className = '',
  animated = true
}) => {
  // Variantes de color
  const variantStyles = {
    default: 'from-cobalt-400 to-cobalt-600',
    success: 'from-mint-400 to-mint-500',
    warning: 'from-amber-400 to-orange-500',
    accent: 'from-purple-400 to-pink-500'
  };

  // Tamaños
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label y porcentaje */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-xs text-gray-400 font-medium truncate pr-2">
              {label}
            </span>
          )}
          {showPercentage && (
            <motion.span 
              className="text-xs text-gray-300 font-semibold tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.span>
          )}
        </div>
      )}

      {/* Barra de fondo */}
      <div className={`
        w-full rounded-full overflow-hidden
        bg-gray-700/50 backdrop-blur-sm
        ${sizeStyles[size]}
      `}>
        {/* Barra de progreso */}
        <motion.div
          className={`
            h-full rounded-full
            bg-gradient-to-r ${variantStyles[variant]}
            shadow-lg
          `}
          variants={animated ? progressBar : undefined}
          initial={animated ? "hidden" : { width: `${progress}%` }}
          whileInView={animated ? "visible" : undefined}
          viewport={{ once: true }}
          custom={progress}
          style={!animated ? { width: `${progress}%` } : undefined}
        >
          {/* Efecto de brillo */}
          <motion.div
            className="h-full w-full relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
