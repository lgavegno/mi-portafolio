// src/features/blog/components/BlogPreview.jsx
// Preview de artículos recientes para el Hero

import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../../config/motionConfig';
import BlogCard from './BlogCard';
import { featuredPosts } from '../data/blogData';

const BlogPreview = ({ 
  limit = 3,
  variant = 'grid', // 'grid' | 'list' | 'compact'
  showHeader = true,
  className = ''
}) => {
  const posts = featuredPosts.slice(0, limit);

  if (variant === 'compact') {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`space-y-3 ${className}`}
      >
        {showHeader && (
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-between mb-4"
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <FiBookOpen className="w-4 h-4" />
              Últimos artículos
            </h3>
            <motion.a
              href="/blog"
              whileHover={{ x: 3 }}
              className="text-xs text-cobalt-400 hover:text-cobalt-300 flex items-center gap-1"
            >
              Ver todos
              <FiArrowRight className="w-3 h-3" />
            </motion.a>
          </motion.div>
        )}

        {posts.map((post, index) => (
          <motion.div key={post.id} variants={fadeInUp}>
            <BlogCard
              {...post}
              index={index}
              variant="compact"
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={className}
      >
        {showHeader && (
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-sm font-medium mb-4">
                <FiBookOpen className="w-4 h-4" />
                Blog
              </span>
              <h2 className="text-3xl font-bold text-white">
                Últimos artículos
              </h2>
            </div>
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                hidden sm:flex items-center gap-2
                px-5 py-2.5 rounded-xl
                bg-white/5 border border-white/10
                text-gray-300 hover:text-white
                hover:border-purple-400/30
                transition-colors
              "
            >
              Ver todos
              <FiArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}

        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <BlogCard
                {...post}
                index={index}
                variant="default"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default: grid
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {showHeader && (
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-sm font-medium mb-6">
            <FiBookOpen className="w-4 h-4" />
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Compartiendo conocimiento
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Artículos técnicos sobre desarrollo, arquitectura y optimización de sistemas.
          </p>
        </motion.div>
      )}

      <motion.div 
        variants={fadeInUp}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            {...post}
            index={index}
          />
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div 
        variants={fadeInUp}
        className="text-center mt-12"
      >
        <motion.a
          href="/blog"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            inline-flex items-center gap-3
            px-8 py-4 rounded-xl
            bg-white/5 border border-white/10
            text-gray-300 hover:text-white
            hover:border-purple-400/30 hover:bg-purple-500/5
            transition-all duration-300
            font-medium
          "
        >
          <FiBookOpen className="w-5 h-5" />
          Ver todos los artículos
          <FiArrowRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default BlogPreview;
