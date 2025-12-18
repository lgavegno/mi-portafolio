// src/features/home/Home.jsx
import React from 'react'
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa'
import { FiMail, FiArrowRight } from 'react-icons/fi'

const Home = () => {
  return (
    <section id="inicio" className="w-full relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center py-20 md:py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-block bg-[#d3fd01]/10 px-4 py-2 rounded-full mb-6">
            <span className="text-[#d3fd01] text-sm font-semibold flex items-center justify-center gap-2">
              <FaCode className="text-lg" />
              Desarrollador Full Stack
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hola, soy <span className="text-[#d3fd01]">Leandro</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Creo experiencias digitales excepcionales con tecnologías modernas y diseño atractivo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#proyectos"
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-[#d3fd01] text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#d3fd01]/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver mis proyectos
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            
            <a 
              href="#contacto"
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#d3fd01] text-[#d3fd01] font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#d3fd01]/10"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FiMail className="text-lg" />
                Contactar
              </span>
            </a>
          </div>
          
          <div className="mt-12 flex justify-center space-x-6">
            <a 
              href="https://github.com/tu-usuario" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#d3fd01] transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/tu-perfil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#d3fd01] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home