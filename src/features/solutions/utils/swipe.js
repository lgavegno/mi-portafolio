export const SWIPE_OFFSET_PX = 50;
export const SWIPE_VELOCITY_PX_S = 500;

/**
 * Decide la navegación al terminar un arrastre horizontal.
 * Arrastrar hacia la izquierda (offset negativo) → siguiente (1).
 * @returns {1 | -1 | 0}
 */
export function resolveSwipe(offsetX = 0, velocityX = 0) {
  if (offsetX <= -SWIPE_OFFSET_PX || velocityX <= -SWIPE_VELOCITY_PX_S) return 1;
  if (offsetX >= SWIPE_OFFSET_PX || velocityX >= SWIPE_VELOCITY_PX_S) return -1;
  return 0;
}
