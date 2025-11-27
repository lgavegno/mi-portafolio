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
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Desarrollo Frontend",
      description: "Interfaces de usuario dinámicas y atractivas con React y frameworks modernos.",
      icon: "🎨",
      color: "from-purple-400 to-indigo-500"
    },
    {
      title: "Mantenimiento",
      description: "Servicios de mantenimiento y actualización de aplicaciones existentes.",
      icon: "🔧",
      color: "from-emerald-400 to-teal-500"
    },
    {
      title: "Automatización",
      description: "Automatización de tareas y procesos con Python y otras herramientas.",
      icon: "🤖",
      color: "from-rose-400 to-pink-500"
    },
    {
      title: "UI/UX",
      description: "Diseño de interfaces centradas en el usuario y experiencias memorables.",
      icon: "🎯",
      color: "from-amber-400 to-orange-500"
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

  // Calculate rotation for each card
  const getCardStyle = (index) => {
    const total = services.length;
    const angle = 360 / total;
    const rotateY = (index - currentIndex) * angle;
    const radius = 400; // Distance from center
    
    const radian = (rotateY * Math.PI) / 180;
    const x = Math.sin(radian) * radius;
    const z = Math.cos(radian) * radius - radius;
    
    return {
      transform: `rotateY(${rotateY}deg) translateZ(${z}px) translateX(${x}px)`,
      opacity: index === currentIndex ? 1 : 0.6,
      zIndex: index === currentIndex ? 10 : 1,
      transition: 'transform 1s ease, opacity 0.5s ease',
    };
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-20 text-[#d3fd01]">
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
                className={`carousel-card bg-gradient-to-br ${service.color}`}
                style={getCardStyle(index)}
              >
                <div className="card-content">
                  <div className="text-6xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-200 mb-6">{service.description}</p>
                  <button className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                    Ver más
                  </button>
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