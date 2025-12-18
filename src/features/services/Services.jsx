import React, { useState, useEffect, useRef } from 'react';
import './Services3DCarousel.css';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const autoRotateInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const services = [
    {
      title: "Diseño Web",
      description: "Creación de sitios web modernos y responsivos con las últimas tecnologías.",
      icon: "💻",
      color: "from-gray-200 to-gray-700"
    },
    {
      title: "Desarrollo Frontend",
      description: "Interfaces de usuario dinámicas y atractivas con React y frameworks modernos.",
      icon: "🎨",
      color: "from-gray-200 to-gray-700"
    },
    {
      title: "Mantenimiento",
      description: "Servicios de mantenimiento y actualización de aplicaciones existentes.",
      icon: "🔧",
      color: "from-gray-200 to-gray-700"
    },
    {
      title: "Automatización",
      description: "Automatización de tareas y procesos con Python y otras herramientas.",
      icon: "🤖",
      color: "from-gray-200 to-gray-700"
    },
    {
      title: "UI/UX",
      description: "Diseño de interfaces centradas en el usuario y experiencias memorables.",
      icon: "🎯",
      color: "from-gray-200 to-gray-700"
    }
  ];

  // Auto-rotate functionality
  useEffect(() => {
    if (!isHovered) {
      autoRotateInterval.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % services.length);
      }, 3000);
    }
    
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [isHovered, services.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % services.length);
  };

  // Calculate rotation for each card with fixed depth (radius) to keep desktop curvature stable
  const getCardStyle = (index) => {
    const angle = (360 / services.length) * index;
    const rotate = angle - (currentIndex * (360 / services.length));
    const depth = window.innerWidth > 1024 ? 500 : 250; // ajuste móvil para mejor perspectiva

    return {
      transform: `rotateY(${rotate}deg) translateZ(${depth}px)`,
      transition: 'transform 0.5s ease-out',
    };
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10 md:mb-16 text-[#d3fd01]">
          Mis Servicios
        </h2>
        
        <div 
          className="carousel-container" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="carousel-track" ref={carouselRef}>
            {services.map((service, index) => (
              <div 
                key={index}
                className="carousel-card"
                style={getCardStyle(index)}
              >
                <div className="carousel-card-inner">
                  {/* CARA FRONTAL (Contenido actual) */}
                  <div className="carousel-card-front bg-gradient-to-br from-gray-200 to-gray-700 border-2 border-gray-700">
                    <div className="card-content">
                      <div className="text-6xl md:text-7xl mb-6">{service.icon}</div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-[#d3fd01]">{service.title}</h3>
                      <p className="text-gray-200 md:text-lg mb-6">{service.description}</p>
                      <button className="px-6 py-2 bg-[#d3fd01] text-gray-900 font-bold rounded-full hover:bg-[#b8e000] transition-colors">
                        Ver más
                      </button>
                    </div>
                  </div>

                  {/* CARA TRASERA (Sólida y oscura) */}
                  <div className="carousel-card-back bg-gray-900 border-2 border-gray-800">
                    {/* Puedes dejarla vacía o con un logo sutil */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-nav prev"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            ❮
          </button>
          <button 
            className="carousel-nav next"
            onClick={handleNext}
            aria-label="Siguiente"
          >
            ❯
          </button>
        </div>
      </div>
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default Services;