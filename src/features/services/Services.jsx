import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiLayout, FiTool, FiCpu, FiMonitor, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import { useVibrate } from '../../hooks/useVibrate';
import { useLocale } from '../../hooks/useLocale';
import './Services3DCarousel.css';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is your typical project delivery time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines depend on scope: landing pages take 2–4 weeks, SPAs and management tools 4–8 weeks, and multi-feature platforms 6–12 weeks. Every project starts with a scoping call to define milestones and a clear calendar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. I work fully remote with clients worldwide. All communication, documentation, and deliverables are available in English and Spanish. I operate across time zones and adapt to async or sync workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'My core stack for web applications is React, Vite, Tailwind CSS, Framer Motion, and React Router. For cross-platform desktop apps I use Tauri (Rust). I also work with Google Apps Script, SQLite, Python, and Power BI for data and automation projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide post-launch support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Post-launch support is available as a maintenance package covering bug fixes, minor feature additions, dependency updates, and performance monitoring. Support terms are agreed on per project.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does your pricing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Projects are quoted as fixed-price milestones after a free scoping call. This ensures clear scope, predictable budgets, and no surprise invoices. Hourly consulting is also available for audits and short-term advisory work.',
      },
    },
  ],
};

const Services = () => {
  const { t, locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const autoRotateInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const vibrateLight = useVibrate(5);

  const iconArray = [FiMonitor, FiLayout, FiCpu, FiTool];
  const gradientArray = [
    "from-[#96B6C5] to-[#ADC4CE]",
    "from-[#ADC4CE] to-[#96B6C5]",
    "from-[#ADC4CE] to-[#96B6C5]",
    "from-amber-400 to-orange-500"
  ];

  const services = t.services.services.map((service, index) => ({
    ...service,
    icon: iconArray[index],
    gradient: gradientArray[index]
  }));

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
    <section id="que-hago" className="w-full relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 text-[#2C3340] py-32 md:py-40 lg:py-48">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
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
            <FiMonitor className="w-4 h-4" />
            {t.services.badge}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-[#2C3340]"
          >
            {t.services.title}
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
                  className="carousel-card will-change-transform"
                  style={getCardStyle(index)}
                >
                  <div className="carousel-card-inner" style={{ transformStyle: 'preserve-3d' }}>
                    {/* CARA FRONTAL */}
                    <div className={`carousel-card-front backface-hidden bg-gradient-to-br ${service.gradient} border border-[#2C3340]/20`}>
                      <div className="card-content">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                          <IconComponent className="w-8 h-8 text-[#2C3340]" />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-[#2C3340]">{service.title}</h3>
                        <p className="text-[#2C3340]/80 md:text-xl mb-6">{service.description}</p>

                      </div>
                    </div>

                    {/* CARA TRASERA */}
                    <div className="carousel-card-back backface-hidden bg-slate-900 border border-white/5">
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
            aria-label={t.services.carousel.prev}
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="carousel-nav next glass touch-manipulation select-none"
            onClick={handleNext}
            aria-label={t.services.carousel.next}
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
              aria-label={`${t.services.carousel.serviceIndicator} ${index + 1}`}
            />
          ))}
        </div>

        <div className="border-t border-slate-700/60 pt-6 mt-8 text-center">
          <span className="text-[#4B5563]">
            {locale === 'en' ? 'Are you from an agency? ' : '¿Sos de una agencia? '}
          </span>
          <a
            href={locale === 'en' ? '/en/agencies' : '/agencias'}
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            {locale === 'en' ? '→ See agency proposal' : '→ Ver propuesta para agencias'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;