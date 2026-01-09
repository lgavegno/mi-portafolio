// src/components/ui/GlowButton.jsx
// CTA button with cyan glow effect for ONGEVAG brand

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const GlowButton = ({
    children,
    onClick,
    variant = 'primary',
    icon,
    className = ''
}) => {
    const variants = {
        primary: 'border-cyan-institutional text-cyan-institutional hover:shadow-cyan-glow-lg hover:bg-cyan-institutional/10',
        secondary: 'border-cyan-institutional/50 text-white hover:border-cyan-institutional hover:shadow-cyan-glow hover:bg-cyan-institutional/5',
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
        group relative
        px-8 py-4
        border-2 ${variants[variant]}
        bg-obsidian
        font-bold text-sm tracking-widest uppercase
        transition-all duration-300
        overflow-hidden
        ${className}
      `}
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-institutional/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-3">
                {children}
                {icon && (
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {icon}
                    </motion.span>
                )}
            </span>
        </motion.button>
    );
};

export default GlowButton;
