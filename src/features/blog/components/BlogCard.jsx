// src/features/blog/components/BlogCard.jsx
// Card de artículo de blog con glassmorphism

import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { glassCard, springConfig } from '../../../config/motionConfig';
import { useVibrate } from '../../../hooks/useVibrate';

const BlogCard = ({
  title,
  excerpt,
  category,
  readTime,
  date,
  tags = [],
  slug,
  image,
  index = 0,
  variant = 'default' // 'default' | 'compact' | 'featured'
}) => {
  const vibrate = useVibrate(10);

  const handleClick = () => {
    vibrate();
    // Navegación al artículo (placeholder)
    console.log(`Navigate to: /blog/${slug}`);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Colores por categoría
  const categoryColors = {
    'Data Engineering': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    'Backend': 'bg-cobalt-500/20 text-cobalt-300 border-cobalt-400/30',
    'Performance': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    'Frontend': 'bg-mint-400/20 text-mint-300 border-mint-400/30',
  };

  const categoryColor = categoryColors[category] || categoryColors['Frontend'];

  if (variant === 'compact') {
    return (
      <motion.article
        variants={glassCard}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        whileTap="tap"
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={handleClick}
        className="
          group cursor-pointer
          flex items-start gap-4 p-4
          rounded-xl
          bg-white/5 border border-white/10
          hover:border-cobalt-400/30
          transition-colors duration-300
        "
      >
        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className={`
            inline-block px-2 py-0.5 rounded text-xs font-medium
            border ${categoryColor}
            mb-2
          `}>
            {category}
          </span>
          <h3 className="text-sm font-semibold text-white group-hover:text-cobalt-300 transition-colors line-clamp-2 mb-1">
            {title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {readTime} min
            </span>
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          className="text-gray-500 group-hover:text-cobalt-400 transition-colors"
          whileHover={{ x: 3 }}
        >
          <FiArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={glassCard}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      className="
        group cursor-pointer
        rounded-2xl overflow-hidden
        backdrop-blur-xl bg-white/5
        border border-white/10
        hover:border-cobalt-400/30
        transition-colors duration-300
      "
    >
      {/* Image placeholder */}
      {image ? (
        <div className="relative h-40 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={springConfig.gentle}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>
      ) : (
        <div className="relative h-32 bg-gradient-to-br from-cobalt-600/20 to-mint-400/10 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category & Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className={`
            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            border ${categoryColor}
          `}>
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <FiCalendar className="w-3 h-3" />
            {formatDate(date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-cobalt-300 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <FiClock className="w-3.5 h-3.5" />
            {readTime} min de lectura
          </span>
          
          <motion.span
            className="flex items-center gap-1 text-sm font-medium text-cobalt-400 group-hover:text-cobalt-300"
            whileHover={{ x: 3 }}
          >
            Leer más
            <FiArrowRight className="w-4 h-4" />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
