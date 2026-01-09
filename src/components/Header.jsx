// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useVibrate } from '../hooks/useVibrate';

const navLinks = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Sobre Mí', id: 'sobre-mi' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contacto', id: 'contacto' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const vibrate = useVibrate(10);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      vibrate();
      setIsOpen(false);

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      vibrate();
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b shadow-lg'
          : 'bg-transparent'
        }
      `}
      style={scrolled ? {
        borderBottomColor: 'rgba(0, 255, 255, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 255, 255, 0.05)'
      } : {}}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-bold text-xl md:text-2xl text-white flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <span
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-base md:text-lg font-bold shadow-lg text-black"
                style={{
                  background: 'linear-gradient(to bottom right, rgb(0, 255, 255), rgba(0, 255, 255, 0.8))',
                  boxShadow: '0 10px 15px -3px rgba(0, 255, 255, 0.3)'
                }}
              >
                OS
              </span>
              <span className="hidden sm:inline">Ongevag Studio</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.id}
                to="/"
                state={{ scrollTo: link.id }}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="relative px-5 py-2.5 text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(to right, rgba(0, 255, 255, 0.8), rgba(0, 255, 255, 0.6))' }}
                  />
                </motion.div>
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              to="/"
              state={{ scrollTo: 'contacto' }}
              onClick={(e) => handleNavClick(e, 'contacto')}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-6 py-3 rounded-xl text-black text-base font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, rgb(0, 255, 255), rgba(0, 255, 255, 0.9))',
                  boxShadow: '0 10px 15px -3px rgba(0, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 255, 255, 0.3)';
                }}
              >
                Hablemos
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              vibrate();
              setIsOpen(!isOpen);
            }}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-1 border-t border-white/10">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.id}
                    to="/"
                    state={{ scrollTo: link.id }}
                    onClick={(e) => handleNavClick(e, link.id)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors touch-manipulation cursor-pointer"
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                ))}

                <Link
                  to="/"
                  state={{ scrollTo: 'contacto' }}
                  onClick={(e) => handleNavClick(e, 'contacto')}
                  className="block mt-4"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="px-4 py-3 rounded-xl text-center text-black font-semibold touch-manipulation cursor-pointer"
                    style={{ background: 'linear-gradient(to right, rgb(0, 255, 255), rgba(0, 255, 255, 0.9))' }}
                  >
                    Hablemos
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;