// src/hooks/useIntersectionObserver.js
// Hook para lazy loading y animaciones basadas en visibilidad

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * @param {Object} options - Opciones del IntersectionObserver
 * @param {number} options.threshold - Porcentaje de visibilidad para activar (0-1)
 * @param {string} options.rootMargin - Margen alrededor del root
 * @param {boolean} options.triggerOnce - Si solo debe activarse una vez
 * @param {boolean} options.freezeOnceVisible - Mantener estado visible después de primera detección
 * @returns {[React.RefObject, boolean, IntersectionObserverEntry]} - [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = ({
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = true,
  freezeOnceVisible = true,
} = {}) => {
  const elementRef = useRef(null);
  const [entry, setEntry] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef(false);

  const updateEntry = useCallback((entries) => {
    const [entry] = entries;
    
    // Si ya está congelado y visible, no actualizar
    if (frozen.current && freezeOnceVisible) return;
    
    setEntry(entry);
    setIsIntersecting(entry.isIntersecting);
    
    // Congelar si triggerOnce y está visible
    if (entry.isIntersecting && triggerOnce) {
      frozen.current = true;
    }
  }, [freezeOnceVisible, triggerOnce]);

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen.current || !node) return;

    const observerParams = { threshold, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, updateEntry]);

  return [elementRef, isIntersecting, entry];
};

/**
 * Hook simplificado para lazy loading de imágenes
 * @param {string} src - URL de la imagen
 * @param {string} placeholder - URL del placeholder (opcional)
 * @returns {Object} - { ref, isLoaded, currentSrc }
 */
export const useLazyImage = (src, placeholder = null) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    if (!isIntersecting || !src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
    };
  }, [isIntersecting, src]);

  return { ref, isLoaded, currentSrc, isIntersecting };
};

/**
 * Hook para lazy loading de componentes
 * @param {number} delay - Delay en ms antes de marcar como listo
 * @returns {[React.RefObject, boolean]} - [ref, shouldRender]
 */
export const useLazyComponent = (delay = 0) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px',
    triggerOnce: true,
  });
  
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isIntersecting) return;

    if (delay > 0) {
      const timer = setTimeout(() => setShouldRender(true), delay);
      return () => clearTimeout(timer);
    }
    
    setShouldRender(true);
  }, [isIntersecting, delay]);

  return [ref, shouldRender];
};

export default useIntersectionObserver;
