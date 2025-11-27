import React from 'react';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import heroImage from '../../assets/images/IMG-lg-blanca.png';

// Usando una imagen importada desde assets

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#d3fd01]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="text-center lg:text-left">
            <div className="inline-block bg-[#d3fd01]/10 px-4 py-2 rounded-full mb-6">
              <span className="text-[#d3fd01] text-sm font-semibold flex items-center gap-2">
                <FaCode className="text-lg" />
                Desarrollador Full Stack
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Hola, soy <span className="text-[#d3fd01] bg-clip-text bg-gradient-to-r from-[#d3fd01] to-[#b8e000] text-transparent">Leandro</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Creo experiencias digitales excepcionales con tecnologías modernas y diseño atractivo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#trabajos"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d3fd01] to-[#b8e000] text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#d3fd01]/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver mis proyectos
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              
              <a 
                href="#contacto"
                className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-[#d3fd01] text-[#d3fd01] font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#d3fd01]/10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiMail className="text-lg" />
                  Contactar
                </span>
              </a>
            </div>
            
            <div className="mt-12 flex justify-center lg:justify-start space-x-6">
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
            
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700">
                React
              </span>
              <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700">
                Node.js
              </span>
              <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700">
                Tailwind CSS
              </span>
            </div>
          </div>
          
          {/* Imagen del héroe */}
          <div className="relative">
            <div className="relative z-10 w-full max-w-lg mx-auto">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl opacity-70 blur-lg animate-pulse"></div>
                <img 
                  src={heroImage} 
                  alt="Leandro - Desarrollador Full Stack" 
                  className="relative z-10 w-full h-auto rounded-2xl"
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 72%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse at center, black 72%, transparent 100%)'
                  }}
                />
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#d3fd01] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 right-20 w-20 h-20 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Efecto de partículas */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNLTUwLTUwSDEyNTB2MTI1MEgtNTB6Ii8+PC9zdmc+')]"></div>
      </div>
    </div>
  );
};

export default Home;