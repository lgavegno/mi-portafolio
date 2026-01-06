import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiTool, FiCpu, FiTarget, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fadeInUp, staggerContainer, glassCard } from '../../config/motionConfig';
import { useVibrate } from '../../hooks/useVibrate';
import './Services3DCarousel.css';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const autoRotateInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const vibrateLight = useVibrate(5);

  const services = [
    {
      title: "Procesamiento de Datos",
      description: "Transformación y limpieza de datos para su análisis. Extraigo información relevante de fuentes diversas y la preparo para su interpretación mediante Python y SQL.",
      icon: FiCode,
      gradient: "from-cobalt-500 to-cobalt-600"
    },
    {
      title: "Automatización de Procesos",
      description: "Identificación y automatización de tareas repetitivas. Desarrollo scripts en Python que optimizan flujos de trabajo, reduciendo tiempos de ejecución y minimizando errores humanos.",
      icon: FiCpu,
      gradient: "from-mint-400 to-mint-500"
    },
    {
      title: "Análisis de Negocios",
      description: "Interpretación de métricas e indicadores clave. Analizo datos operacionales para identificar tendencias, oportunidades de mejora y respaldar decisiones estratégicas.",
      icon: FiTarget,
      gradient: "from-amber-400 to-orange-500"
    },
    {
      title: "Validación de Hipótesis",
      description: "Desarrollo de pruebas conceptuales para evaluar la viabilidad de iniciativas. Implemento análisis rápidos que permiten tomar decisiones basadas en evidencia con mínima inversión de recursos.",
      icon: FiTool,
      gradient: "from-purple-400 to-purple-600"
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
    vibrateLight();
    setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    vibrateLight();
    setCurrentIndex(prev => (prev + 1) % services.length);
  };

  const handleIndicatorClick = (index) => {
    vibrateLight();
    setCurrentIndex(index);
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
                        <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 active:bg-white/40 active:scale-95 transition-all border border-white/20 touch-manipulation select-none">
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
            className="carousel-nav prev glass touch-manipulation select-none"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="carousel-nav next glass touch-manipulation select-none"
            onClick={handleNext}
            aria-label="Siguiente"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              whileTap={{ scale: 0.85 }}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                touch-manipulation select-none
                ${index === currentIndex 
                  ? 'w-8 bg-cobalt-400' 
                  : 'bg-white/20 hover:bg-white/40 active:bg-white/60'
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