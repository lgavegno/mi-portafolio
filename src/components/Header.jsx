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
  const { t, locale } = useLocale();

  const navLinks = [
    { label: t.common.nav.inicio,   id: 'inicio'    },
    { label: t.common.nav.about,    id: 'sobre-mi'  },
    { label: t.common.nav.projects, id: 'proyectos' },
    { label: t.common.nav.services, id: 'que-hago'  },
    { label: t.common.agenciasNav,  href: locale === 'en' ? '/en/agencies' : '/agencias' },
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
          ? 'bg-[#F1F0E8]/90 backdrop-blur-xl border-b shadow-sm'
          : 'bg-transparent'
        }
      `}
      style={scrolled ? {
        borderBottomColor: 'rgba(150, 182, 197, 0.4)',
        boxShadow: '0 4px 6px -1px rgba(44, 51, 64, 0.08)'
      } : {}}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-bold text-xl md:text-2xl text-[#2C3340] flex items-center gap-2 cursor-pointer"
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
                    stroke="#96B6C5" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="24" y1="22" x2="40" y2="38"
                    stroke="#96B6C5" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="24" y1="22" x2="24" y2="6"
                    stroke="#96B6C5" strokeWidth="2" strokeLinecap="round"/>
                  {/* Nodo central */}
                  <circle cx="24" cy="22" r="5" fill="#2C3340"/>
                  {/* Nodos extremos */}
                  <circle cx="8" cy="38" r="3.5" fill="none"
                    stroke="#96B6C5" strokeWidth="1.5"/>
                  <circle cx="40" cy="38" r="3.5" fill="none"
                    stroke="#96B6C5" strokeWidth="1.5"/>
                  <circle cx="24" cy="6" r="3.5" fill="none"
                    stroke="#96B6C5" strokeWidth="1.5"/>
                </svg>
                {/* Wordmark */}
                <div className="flex flex-col leading-none">
                  <span className="font-display font-bold text-base
                    text-[#2C3340] tracking-tight">Ongevag</span>
                  <span className="text-[10px] text-[#96B6C5]
                    tracking-widest uppercase">Dev</span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.id ?? link.href}
                to={link.href ?? '/'}
                state={link.id ? { scrollTo: link.id } : undefined}
                onClick={link.href
                  ? () => { vibrate(); setIsOpen(false); }
                  : (e) => handleNavClick(e, link.id)
                }
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="relative px-5 py-3 text-base font-medium text-[#4B5563] hover:text-[#2C3340] transition-colors duration-200 cursor-pointer group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(to right, #96B6C5, #ADC4CE)' }}
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
                className="ml-6 px-5 py-2 rounded-lg text-[#F1F0E8] text-sm font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: '#2C3340',
                  boxShadow: '0 4px 10px -2px rgba(44, 51, 64, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(44, 51, 64, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(44, 51, 64, 0.15)';
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
            className="md:hidden p-2 rounded-lg text-[#4B5563] hover:text-[#2C3340] hover:bg-[#ADC4CE]/20 transition-colors cursor-pointer"
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
              className="md:hidden overflow-hidden bg-[#F1F0E8]/98 backdrop-blur-xl"
            >
              <div className="py-4 space-y-1 border-t border-[#ADC4CE]/40">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.id ?? link.href}
                    to={link.href ?? '/'}
                    state={link.id ? { scrollTo: link.id } : undefined}
                    onClick={link.href
                      ? () => { vibrate(); setIsOpen(false); }
                      : (e) => handleNavClick(e, link.id)
                    }
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block px-4 py-3 rounded-xl text-[#4B5563] hover:text-[#2C3340] hover:bg-[#ADC4CE]/20 active:bg-[#ADC4CE]/30 transition-colors touch-manipulation cursor-pointer"
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
                    className="px-4 py-3 rounded-xl text-center text-[#F1F0E8] font-semibold touch-manipulation cursor-pointer"
                    style={{ background: '#2C3340' }}
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