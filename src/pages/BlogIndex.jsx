import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts as blogPostsEn, categories as categoriesEn } from '../features/blog/data/blogData.en.js';
import { blogPosts as blogPostsEs, categories as categoriesEs } from '../features/blog/data/blogData.es.js';
import { blogPosts as blogPostsPt, categories as categoriesPt } from '../features/blog/data/blogData.pt.js';
import { CategoryFilter, FeaturedPost, Sidebar, PostGrid } from '../features/blog/components/BlogComponents';
import { useLocale } from '../hooks/useLocale';

const POSTS_BY_LOCALE = { es: blogPostsEs, en: blogPostsEn, pt: blogPostsPt };
const CATEGORIES_BY_LOCALE = { es: categoriesEs, en: categoriesEn, pt: categoriesPt };

const BlogIndex = () => {
    // 1. hook — locale
    const { locale, t } = useLocale();

    // 2-3. locale-conditional data (variables comunes, no hooks)
    const blogPosts = POSTS_BY_LOCALE[locale] || blogPostsEs;
    const categories = CATEGORIES_BY_LOCALE[locale] || categoriesEs;

    // 4. useState — antes de cualquier early return
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 5-7. valores derivados
    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post =>
            post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
        );

    const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
    const remainingPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

    // 8. early return — todos los hooks ya fueron declarados
    if (blogPosts.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <p className="text-white/60 text-lg">{t.blog.enOnlyBanner.message}</p>
            <Link
                to="/blog"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
                {t.blog.enOnlyBanner.linkText}
            </Link>
        </div>
    );

    // 9. JSX principal
    return (
        <>
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                <FeaturedPost post={featuredPost} />
                <Sidebar />
            </section>

            <PostGrid posts={remainingPosts} />
        </>
    );
};

export default BlogIndex;
