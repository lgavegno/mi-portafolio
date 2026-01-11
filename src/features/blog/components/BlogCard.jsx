// src/features/blog/components/BlogCard.jsx
// Card de artículo de blog con glassmorphism - ONGEVAG Identity

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { useVibrate } from '../../../hooks/useVibrate';

const BlogCard = ({
  title,
  excerpt,
  category,
  readTime,
  date,
  slug,
  image,
  index = 0,
  variant = 'default' // 'default' | 'compact' | 'featured'
}) => {
  const vibrate = useVibrate(10);

  const handleClick = () => {
    vibrate();
    // Navegación al artículo (placeholder)
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Placeholder de gradiente dinámico (Monocromático Cyan/Obsidian)
  const getGradient = () => 'from-cyan-900/20 to-slate-900/40';
  const gradientClass = getGradient();

  // Scroll Reveal Variant
  const scrollReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Wrapper común para el contenido del card
  const CardContent = () => (
    <>
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <>
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90" />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700`}>
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-institutional/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 w-16 h-16 rounded-full bg-cyan-institutional/10 backdrop-blur-md border border-cyan-institutional/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.2)] group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">
                🚀
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 relative">
        <div className="flex items-center justify-between mb-4">
          <span className="
            inline-block px-2 py-1 rounded-sm
            bg-cyan-institutional/10 border-[0.5px] border-cyan-institutional/30
            text-cyan-institutional font-mono text-[10px] uppercase tracking-widest
          ">
            {category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
            <FiCalendar className="w-3.5 h-3.5" />
            {formatDate(date)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-cyan-institutional transition-colors mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-cyan-institutional/10">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <FiClock className="w-3.5 h-3.5 text-gray-500" />
            {readTime} min de lectura
          </span>

          <span className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-institutional opacity-80 group-hover:opacity-100 transition-opacity">
            LEER_ARTÍCULO
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
            >
              <FiArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </span>
        </div>
      </div>
    </>
  );

  if (variant === 'compact') {
    return (
      <Link to={`/blog/${slug}`} className="block w-full" onClick={handleClick}>
        <motion.article
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          whileTap="tap"
          viewport={{ once: true }}
          className="
            group cursor-pointer
            flex items-start gap-4 p-4
            rounded-lg
            bg-obsidian/60 border border-cyan-institutional/10
            hover:border-cyan-institutional/40 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)]
            active:bg-cyan-institutional/5
            transition-all duration-300
            touch-manipulation select-none
          "
        >
          <div className="flex-1 min-w-0">
            <span className="
              inline-block px-1.5 py-0.5 rounded-sm
              bg-cyan-institutional/10 border-[0.5px] border-cyan-institutional/30
              text-cyan-institutional font-mono text-[9px] uppercase tracking-wider
              mb-2
            ">
              {category}
            </span>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-institutional transition-colors line-clamp-2 mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {readTime} min
              </span>
            </div>
          </div>

          <motion.div
            className="text-gray-600 group-hover:text-cyan-institutional transition-colors"
            whileHover={{ x: 3 }}
          >
            <FiArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${slug}`} className="block h-full" onClick={handleClick}>
      <motion.article
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        whileTap="tap"
        viewport={{ once: true, margin: "-50px" }}
        className="
          group cursor-pointer
          h-full flex flex-col
          rounded-xl overflow-hidden
          bg-obsidian/80 backdrop-blur-md
          border border-cyan-institutional/20
          hover:border-cyan-institutional/50
          hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]
          transition-all duration-300
          touch-manipulation select-none
        "
      >
        <CardContent />
      </motion.article>
    </Link>
  );
};

export default BlogCard;
