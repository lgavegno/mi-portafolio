import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocale } from '../hooks/useLocale';

const WhatsAppFloat = () => {
  const { t } = useLocale();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const phoneNumber = '5493492665453';
  const message = t.common.whatsapp.prefilledMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationConfig = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0, scale: 1 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: 0 } }
    : {
        initial: { opacity: 0, y: 20, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { delay: 2.5, duration: 0.4, ease: 'easeOut' },
      };

  const baseShadow = '0 0 15px rgba(37, 211, 102, 0.4), 0 0 30px rgba(150, 182, 197, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2)';
  const hoverShadow = '0 0 20px rgba(37, 211, 102, 0.6), 0 0 40px rgba(150, 182, 197, 0.35), 0 10px 20px rgba(0, 0, 0, 0.3)';

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
    >
      {/* Tooltip */}
      {isTooltipVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-20 right-0 mb-2 bg-gray-900 text-white text-sm rounded-lg px-4 py-2 whitespace-nowrap shadow-lg"
          role="tooltip"
        >
          {t.common.whatsapp.tooltip}
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1" />
        </motion.div>
      )}

      {/* WhatsApp Button with Pulse Glow */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.whatsapp.tooltip}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
        animate={
          prefersReducedMotion
            ? { scale: 1 }
            : {
                scale: [1, 1.05, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        style={{
          boxShadow: isHovering ? hoverShadow : baseShadow,
        }}
        onMouseEnter={() => {
          setIsTooltipVisible(true);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsTooltipVisible(false);
          setIsHovering(false);
        }}
        onFocus={() => {
          setIsTooltipVisible(true);
          setIsHovering(true);
        }}
        onBlur={() => {
          setIsTooltipVisible(false);
          setIsHovering(false);
        }}
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppFloat;
