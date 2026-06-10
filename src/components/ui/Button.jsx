// src/components/ui/Button.jsx
// Componente Button con micro-interacciones de dopamina

import React from 'react';
import { motion } from 'framer-motion';
import { useVibrate } from '../../hooks/useVibrate';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { buttonVariants, springConfig } from '../../config/motionConfig';

// Spinner para estado loading
const Spinner = ({ className = '' }) => (
  <svg
    className={`animate-spin h-5 w-5 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Estilos base por variante
const variantStyles = {
  primary: `
    bg-gradient-to-r from-cobalt-500 to-cobalt-600
    hover:from-cobalt-400 hover:to-cobalt-500
    text-white font-semibold
    shadow-lg shadow-cobalt-500/25
    hover:shadow-xl hover:shadow-cobalt-500/30
    border-0
  `,
  secondary: `
    bg-transparent
    border-2 border-mint-400
    text-mint-400
    hover:bg-mint-400/10
    font-semibold
  `,
  ghost: `
    bg-transparent
    text-gray-300
    hover:text-white
    hover:bg-white/5
    font-medium
  `,
  accent: `
    bg-gradient-to-r from-mint-400 to-mint-500
    text-slate-900 font-bold
    shadow-lg shadow-mint-400/25
    hover:shadow-xl hover:shadow-mint-400/30
    border-0
  `,
  danger: `
    bg-gradient-to-r from-red-500 to-red-600
    text-white font-semibold
    shadow-lg shadow-red-500/25
    hover:shadow-xl hover:shadow-red-500/30
    border-0
  `,
  success: `
    bg-gradient-to-r from-mint-400 to-mint-500
    text-slate-900 font-bold
    shadow-lg shadow-mint-400/25
    hover:shadow-xl hover:shadow-mint-400/30
    border-0
  `
};

// Tamaños
const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
  xl: 'px-10 py-5 text-xl rounded-2xl'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  vibrate = true,
  ...props
}) => {
  const triggerVibration = useVibrate(10);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e) => {
    if (disabled || loading) return;
    
    if (vibrate) {
      triggerVibration();
    }
    
    onClick?.(e);
  };

  const isDisabled = disabled || loading;

  // Variantes de animación adaptadas a accesibilidad
  const motionVariants = prefersReducedMotion
    ? {}
    : {
        whileHover: isDisabled ? {} : buttonVariants.hover,
        whileTap: isDisabled ? {} : buttonVariants.tap,
      };

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center gap-2
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-cobalt-400 focus:ring-offset-2 focus:ring-offset-slate-900
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden touch-manipulation
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      onClick={handleClick}
      disabled={isDisabled}
      {...motionVariants}
      {...props}
    >
      {/* Gradient border animation para primary */}
      {variant === 'primary' && !isDisabled && (
        <motion.span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <Spinner className={variant === 'accent' ? 'text-slate-900' : 'text-current'} />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <motion.span 
                className="flex-shrink-0"
                whileHover={prefersReducedMotion ? {} : { x: 3 }}
                transition={springConfig.gentle}
              >
                {icon}
              </motion.span>
            )}
          </>
        )}
      </span>

      {/* Ripple effect en tap */}
      {!prefersReducedMotion && !isDisabled && (
        <motion.span
          className="absolute inset-0 bg-white/20 rounded-xl"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};

// Variante de botón con icono solo
export const IconButton = ({
  icon,
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props
}) => {
  const iconSizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  return (
    <Button
      variant={variant}
      className={`${iconSizes[size]} !rounded-full ${className}`}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default Button;
