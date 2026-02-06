// src/config/motionConfig.js

export const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 18 },
  snappy: { type: "spring", stiffness: 280, damping: 25 },
  bouncy: { type: "spring", stiffness: 400, damping: 12 },
  smooth: { type: "spring", stiffness: 80, damping: 20, mass: 0.5 },
};

export const durationConfig = {
  fast: { duration: 0.15, ease: "easeOut" },
  normal: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  slow: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
};

// --- Variantes de Entrada ---
export const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springConfig.snappy
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: durationConfig.fast
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: springConfig.gentle },
  exit: { opacity: 0, y: 20 }
};

// --- Contenedores Stagger ---
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

// --- UI Components ---
export const glassCard = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
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
  tap: { scale: 0.98, transition: durationConfig.fast }
};

export const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.03, y: -2, transition: springConfig.gentle },
  tap: { scale: 0.97, transition: durationConfig.fast }
};

// RESTAURADO: Variante para Skeleton.jsx
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

// RESTAURADO: Variante para ProgressBar.jsx
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

// --- Navigation & Page ---
export const pageTransition = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: durationConfig.normal
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: durationConfig.fast
  }
};

// --- Accesibilidad y Helpers ---
export const reducedMotionConfig = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } }
};

export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3
};