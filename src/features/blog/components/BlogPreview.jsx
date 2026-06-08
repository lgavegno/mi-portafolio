// src/features/blog/components/BlogPreview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../../../config/motionConfig';
import BlogCard from './BlogCard';
import { useLocale } from '../../../hooks/useLocale';
import { blogPosts as blogPostsEs } from '../data/blogData.es';
import { blogPosts as blogPostsEn } from '../data/blogData.en';

const BlogPreview = ({
  limit = 3,
  variant = 'grid', // 'grid' | 'list' | 'compact'
  showHeader = true,
  className = ''
}) => {
  const { locale, t } = useLocale();
  const posts = (locale === 'en' ? blogPostsEn : blogPostsEs).slice(0, limit);

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
              {t.blog.preview.latestArticles}
            </h3>
            <Link
              to={locale === 'en' ? '/en/blog' : '/blog'}
              className="text-xs text-cyan-institutional hover:text-cyan-institutional/80 flex items-center gap-1"
            >
              {t.blog.preview.seeAll}
              <FiArrowRight className="w-3 h-3" />
            </Link>
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-institutional/10 border border-cyan-institutional/20 text-cyan-institutional text-sm font-medium mb-4">
                <FiBookOpen className="w-4 h-4" />
                Blog
              </span>
              <h2 className="text-3xl font-bold text-white">
                {t.blog.preview.latestArticles}
              </h2>
            </div>
            <Link
              to={locale === 'en' ? '/en/blog' : '/blog'}
              className="
                hidden sm:flex items-center gap-2
                px-5 py-2.5 rounded-xl
                bg-white/5 border border-cyan-institutional/10
                text-gray-300 hover:text-white
                hover:border-cyan-institutional/40
                transition-colors
              "
            >
              {t.blog.preview.seeAll}
              <FiArrowRight className="w-4 h-4" />
            </Link>
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-institutional/10 border border-cyan-institutional/20 text-cyan-institutional text-sm font-medium mb-6">
            <FiBookOpen className="w-4 h-4" />
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.blog.preview.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.blog.preview.subheading}
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
        <Link
          to={locale === 'en' ? '/en/blog' : '/blog'}
          className="
            inline-flex items-center gap-3
            px-8 py-4 rounded-xl
            bg-white/5 border border-cyan-institutional/10
            text-gray-300 hover:text-white
            hover:border-cyan-institutional/40 hover:bg-cyan-institutional/5
            transition-all duration-300
            font-medium
          "
        >
          <FiBookOpen className="w-5 h-5" />
          {t.blog.preview.seeAllArticles}
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default BlogPreview;
