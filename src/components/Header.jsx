// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-bold text-xl text-white">
            Mi Portafolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-yellow-400 transition-colors duration-300 px-4 py-2">
              Inicio
            </a>
            <a href="#works" className="text-white hover:text-yellow-400 transition-colors duration-300 px-4 py-2">
              Proyectos
            </a>
            <a href="#services" className="text-white hover:text-yellow-400 transition-colors duration-300 px-4 py-2">
              Servicios
            </a>
            <a href="#contact" className="text-white hover:text-yellow-400 transition-colors duration-300 px-4 py-2">
              Contacto
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#home"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#works"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Proyectos
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;