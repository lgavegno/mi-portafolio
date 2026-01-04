// src/hooks/useVibrate.js
// Hook para feedback táctil en dispositivos móviles

import { useCallback } from 'react';

/**
 * Hook para vibración táctil
 * @param {number|number[]} pattern - Duración en ms o patrón de vibración [vibrar, pausa, vibrar...]
 * @returns {Function} - Función para activar la vibración
 */
export const useVibrate = (pattern = 10) => {
  const vibrate = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [pattern]);

  return vibrate;
};

// Patrones predefinidos para diferentes interacciones
export const vibrationPatterns = {
  tap: 10,           // Toque suave
  success: [50, 30, 50], // Confirmación exitosa
  error: [100, 50, 100, 50, 100], // Error/alerta
  notification: [50, 100, 50], // Notificación
  heavy: 50,         // Impacto fuerte
  light: 5,          // Impacto ligero
};

/**
 * Hook con patrones predefinidos
 * @param {'tap'|'success'|'error'|'notification'|'heavy'|'light'} type 
 */
export const useVibratePattern = (type = 'tap') => {
  const pattern = vibrationPatterns[type] || vibrationPatterns.tap;
  return useVibrate(pattern);
};

export default useVibrate;
