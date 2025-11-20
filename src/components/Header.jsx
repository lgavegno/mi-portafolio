import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-bold text-xl text-white">
            Mi Portafolio
          </div>

          {/* Menú de navegación - Desktop */}
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
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full hover:bg-gray-800 transition-colors text-white hover:text-yellow-400"
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors text-white hover:text-yellow-400"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button className="text-white hover:text-yellow-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header 