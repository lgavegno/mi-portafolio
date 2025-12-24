// src/hooks/useReducedMotion.js
// Hook para detectar preferencia de movimiento reducido (accesibilidad)

import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el usuario prefiere movimiento reducido
 * @returns {boolean} - true si prefiere movimiento reducido
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
