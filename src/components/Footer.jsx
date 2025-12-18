// src/components/Footer.jsx
import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900/50 backdrop-blur-md py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Mi Portafolio. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#d3fd01] transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/tu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#d3fd01] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:tu@email.com"
              className="text-gray-400 hover:text-[#d3fd01] transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer