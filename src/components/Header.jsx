// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useVibrate } from '../hooks/useVibrate';
import { useLocale } from '../hooks/useLocale';
import LangSwitcher from './ui/LangSwitcher';

const Header = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false); // Managed by parent
  const [scrolled, setScrolled] = useState(false);
  const vibrate = useVibrate(10);
  const location = useLocation();
  const { t } = useLocale();

  const navLinks = [
    { label: t.common.nav.inicio,   id: 'inicio'    },
    { label: t.common.nav.about,    id: 'sobre-mi'  },
    { label: t.common.nav.projects, id: 'proyectos' },
    { label: t.common.nav.services, id: 'que-hago'  },
    { label: t.common.nav.blog,     id: 'blog'      },
  ];

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
        <nav className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-bold text-xl md:text-2xl text-white flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                {/* Ícono SVG del nodo */}
                <svg width="36" height="36" viewBox="0 0 48 48"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Líneas del nodo */}
                  <line x1="24" y1="22" x2="8" y2="38"
                    stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="24" y1="22" x2="40" y2="38"
                    stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="24" y1="22" x2="24" y2="6"
                    stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
                  {/* Nodo central */}
                  <circle cx="24" cy="22" r="5" fill="#0ea5e9"/>
                  {/* Nodos extremos */}
                  <circle cx="8" cy="38" r="3.5" fill="none"
                    stroke="#22d3ee" strokeWidth="1.5"/>
                  <circle cx="40" cy="38" r="3.5" fill="none"
                    stroke="#22d3ee" strokeWidth="1.5"/>
                  <circle cx="24" cy="6" r="3.5" fill="none"
                    stroke="#22d3ee" strokeWidth="1.5"/>
                </svg>
                {/* Wordmark */}
                <div className="flex flex-col leading-none">
                  <span className="font-display font-bold text-base
                    text-white tracking-tight">Ongevag</span>
                  <span className="text-[10px] text-slate-500
                    tracking-widest uppercase">Studio</span>
                </div>
              </div>
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
                  className="relative px-5 py-3 text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(to right, rgba(0, 255, 255, 0.8), rgba(0, 255, 255, 0.6))' }}
                  />
                </motion.div>
              </Link>
            ))}

            <LangSwitcher />

            {/* CTA Button */}
            <Link
              to="/"
              state={{ scrollTo: 'contacto' }}
              onClick={(e) => handleNavClick(e, 'contacto')}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-6 px-5 py-2 rounded-lg text-black text-sm font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, rgb(0, 255, 255), rgba(0, 255, 255, 0.9))',
                  boxShadow: '0 4px 10px -2px rgba(0, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 255, 255, 0.3)';
                }}
              >
                {t.common.nav.contact}
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

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="px-4 py-3"
                >
                  <LangSwitcher />
                </motion.div>

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
                    {t.common.nav.contactMobile}
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