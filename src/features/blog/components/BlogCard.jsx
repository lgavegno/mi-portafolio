// src/features/blog/components/BlogCard.jsx
// Card de artículo de blog con glassmorphism

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { glassCard } from '../../../config/motionConfig';
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

  // Colores por categoría
  const categoryColors = {
    'Data Engineering': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    'Backend': 'bg-cobalt-500/20 text-cobalt-300 border-cobalt-400/30',
    'Performance': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    'Frontend': 'bg-mint-400/20 text-mint-300 border-mint-400/30',
  };

  const categoryColor = categoryColors[category] || categoryColors['Frontend'];

  // Placeholder de gradiente dinámico si no hay imagen
  const getGradient = (cat) => {
    switch (cat) {
      case 'Data Engineering': return 'from-purple-600/20 to-blue-600/20';
      case 'Backend': return 'from-indigo-600/20 to-cobalt-600/20';
      case 'Performance': return 'from-amber-600/20 to-orange-600/20';
      case 'Frontend': return 'from-emerald-600/20 to-teal-600/20';
      default: return 'from-slate-600/20 to-slate-400/20';
    }
  };

  const gradientClass = getGradient(category);

  // Wrapper común para el contenido del card
  const CardContent = () => (
    <>
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <>
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80" />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700`}>
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl filter drop-shadow-md">
                {category === 'Data Engineering' ? '📊' :
                  category === 'Backend' ? '⚙️' :
                    category === 'Performance' ? '⚡' : '🎨'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className={`
            inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            border backdrop-blur-sm ${categoryColor}
          `}>
            {category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <FiCalendar className="w-3.5 h-3.5" />
            {formatDate(date)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cobalt-300 transition-colors mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <FiClock className="w-3.5 h-3.5" />
            {readTime} min de lectura
          </span>

          <span className="flex items-center gap-2 text-sm font-semibold text-cobalt-400 group-hover:text-cobalt-300 transition-colors">
            Leer artículo
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
            >
              <FiArrowRight className="w-4 h-4" />
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
          variants={glassCard}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          whileTap="tap"
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="
            group cursor-pointer
            flex items-start gap-4 p-4
            rounded-xl
            bg-white/5 border border-white/10
            hover:border-cobalt-400/30
            active:bg-white/8
            transition-colors duration-300
            touch-manipulation select-none
          "
        >
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

          <motion.div
            className="text-gray-500 group-hover:text-cobalt-400 transition-colors"
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
        variants={glassCard}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        whileTap="tap"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1 }}
        className="
          group cursor-pointer
          h-full flex flex-col
          rounded-2xl overflow-hidden
          backdrop-blur-xl bg-white/5
          border border-white/10
          hover:border-cobalt-400/30
          active:bg-white/8
          transition-all duration-300
          hover:shadow-2xl hover:shadow-cobalt-500/10
          touch-manipulation select-none
        "
      >
        <CardContent />
      </motion.article>
    </Link>
  );
};

export default BlogCard;
