import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiTool, FiCpu, FiTarget, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fadeInUp, staggerContainer, glassCard } from '../../config/motionConfig';
import './Services3DCarousel.css';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const autoRotateInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const services = [
    {
      title: "Desarrollo Web",
      description: "Creación de aplicaciones web modernas, rápidas y escalables con React, Next.js y Node.js.",
      icon: FiCode,
      gradient: "from-cobalt-500 to-cobalt-600"
    },
    {
      title: "Frontend Avanzado",
      description: "Interfaces de usuario dinámicas con animaciones fluidas, micro-interacciones y UX premium.",
      icon: FiLayout,
      gradient: "from-mint-400 to-mint-500"
    },
    {
      title: "Mantenimiento",
      description: "Optimización, refactorización y actualización de aplicaciones existentes para mejor rendimiento.",
      icon: FiTool,
      gradient: "from-amber-400 to-orange-500"
    },
    {
      title: "Automatización",
      description: "Scripts y pipelines automatizados con Python para eliminar tareas repetitivas y reducir errores.",
      icon: FiCpu,
      gradient: "from-purple-400 to-purple-600"
    },
    {
      title: "Consultoría UX",
      description: "Auditorías de experiencia de usuario y recomendaciones para mejorar conversión y retención.",
      icon: FiTarget,
      gradient: "from-pink-400 to-rose-500"
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
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 text-white py-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cobalt-500/10 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-mint-400/5 rounded-full filter blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cobalt-500/10 border border-cobalt-400/20 text-cobalt-300 text-sm font-medium mb-6"
          >
            <FiCode className="w-4 h-4" />
            Servicios
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-white"
          >
            Lo que puedo hacer por ti
          </motion.h2>
        </motion.div>
        
        {/* Carousel */}
        <div 
          className="carousel-container" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="carousel-track" ref={carouselRef}>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="carousel-card"
                  style={getCardStyle(index)}
                >
                  <div className="carousel-card-inner">
                    {/* CARA FRONTAL */}
                    <div className={`carousel-card-front bg-gradient-to-br ${service.gradient} border border-white/10`}>
                      <div className="card-content">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white">{service.title}</h3>
                        <p className="text-white/80 md:text-lg mb-6">{service.description}</p>
                        <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-colors border border-white/20">
                          Saber más
                        </button>
                      </div>
                    </div>

                    {/* CARA TRASERA */}
                    <div className="carousel-card-back bg-slate-900 border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Navigation buttons */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="carousel-nav prev glass"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="carousel-nav next glass"
            onClick={handleNext}
            aria-label="Siguiente"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'w-8 bg-cobalt-400' 
                  : 'bg-white/20 hover:bg-white/40'
                }
              `}
              aria-label={`Ir al servicio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;