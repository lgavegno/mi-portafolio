// src/config/motionConfig.js
// Configuración global de Framer Motion para animaciones consistentes

// Configuración de transiciones spring optimizadas
export const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  snappy: { type: "spring", stiffness: 260, damping: 20 },
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  smooth: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
};

// Transiciones de duración fija
export const durationConfig = {
  fast: { duration: 0.15, ease: "easeOut" },
  normal: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  slow: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
};

// Variantes reutilizables para entradas/salidas
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: springConfig.snappy
  },
  exit: { 
    opacity: 0, 
    y: -20,
    filter: "blur(5px)",
    transition: durationConfig.fast
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springConfig.gentle
  },
  exit: { opacity: 0, y: 30 }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springConfig.snappy
  },
  exit: { opacity: 0, x: 50 }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springConfig.snappy
  },
  exit: { opacity: 0, x: -50 }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springConfig.bouncy
  },
  exit: { opacity: 0, scale: 0.9 }
};

// Variantes para contenedores con stagger children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
};

// Variantes para cards con glassmorphism
export const glassCard = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: springConfig.snappy
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: springConfig.gentle
  },
  tap: {
    scale: 0.98,
    transition: durationConfig.fast
  }
};

// Variantes para botones con micro-interacciones
export const buttonVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.03, 
    y: -2,
    transition: springConfig.gentle
  },
  tap: { 
    scale: 0.97,
    transition: durationConfig.fast
  },
  disabled: { 
    opacity: 0.5,
    scale: 1
  }
};

// Variantes para transiciones de página
export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: "blur(10px)"
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    filter: "blur(5px)",
    transition: {
      duration: 0.2
    }
  }
};

// Variantes para skeleton loading
export const skeletonPulse = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Variantes para progress bars
export const progressBar = {
  hidden: { width: 0, opacity: 0 },
  visible: (progress) => ({
    width: `${progress}%`,
    opacity: 1,
    transition: {
      width: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
      opacity: { duration: 0.3 }
    }
  })
};

// Configuración para reducedMotion (accesibilidad)
export const reducedMotionConfig = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } }
};

// Helper para detectar preferencia de movimiento reducido
export const getMotionVariants = (variants, prefersReducedMotion) => {
  return prefersReducedMotion ? reducedMotionConfig : variants;
};

// Viewport config para animaciones al scroll
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3
};

// Animación de texto letra por letra
export const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

// Gradient border animation keyframes (para usar con CSS)
export const gradientBorderKeyframes = `
  @keyframes gradient-border {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;
