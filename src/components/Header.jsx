// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useVibrate } from '../hooks/useVibrate';

const navLinks = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Servicios', id: 'servicios' },
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
    // Si estamos en la home, hacemos scroll suave manual
    if (location.pathname === '/') {
      e.preventDefault();
      vibrate();
      setIsOpen(false);

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si no estamos en la home, permitimos que el Link navegue,
      // pasando el estado para que MainLayout maneje el scroll al montar.
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
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent'
        }
      `}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-bold text-xl text-white flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cobalt-500 to-mint-400 flex items-center justify-center text-sm font-bold">
                OS
              </span>
              <span className="hidden sm:inline">Ongevag Studio</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
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
                  className="
                    relative px-4 py-2 text-sm font-medium
                    text-gray-300 hover:text-white
                    transition-colors duration-200
                    cursor-pointer
                    group
                  "
                >
                  {link.label}
                  <span className="
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    w-0 h-0.5 bg-gradient-to-r from-cobalt-400 to-mint-400
                    group-hover:w-full transition-all duration-300
                  " />
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
                className="
                  ml-4 px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-cobalt-500 to-cobalt-600
                  text-white text-sm font-semibold
                  shadow-lg shadow-cobalt-500/20
                  hover:shadow-xl hover:shadow-cobalt-500/30
                  transition-shadow duration-300
                  cursor-pointer
                "
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
            className="
              md:hidden p-2 rounded-lg
              text-gray-300 hover:text-white
              hover:bg-white/5
              transition-colors
              cursor-pointer
            "
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
                      className="
                        block px-4 py-3 rounded-xl
                        text-gray-300 hover:text-white
                        hover:bg-white/5 active:bg-white/10
                        transition-colors touch-manipulation
                        cursor-pointer
                      "
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
                    className="
                      px-4 py-3 rounded-xl text-center
                      bg-gradient-to-r from-cobalt-500 to-cobalt-600
                      active:from-cobalt-600 active:to-cobalt-700
                      text-white font-semibold
                      touch-manipulation
                      cursor-pointer
                    "
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