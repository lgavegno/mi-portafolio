import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg hover:bg-mint-400/20 hover:border-mint-400/50 transition-colors z-50 group"
                    aria-label="Volver arriba"
                >
                    <FaArrowUp className="w-5 h-5 group-hover:text-mint-400 transition-colors" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
