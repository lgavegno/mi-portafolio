import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { blogPosts, categories } from '../features/blog/data/blogData';
import { CategoryFilter, FeaturedPost, Sidebar, PostGrid } from '../features/blog/components/BlogComponents';

const BlogIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post =>
            post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
        );

    // Separate featured post (first one that is marked featured)
    const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];

    // The rest of the posts for the grid, excluding the featured one
    const remainingPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

    return (
        <>
            {/* Custom Scrollbar Styles can be global or scoped here if needed, but better in index.css. 
            For now, relying on global or Tailwind utilities if set up. 
            The template had specific scrollbar styles. */}

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

            {/* Pagination */}
            <div className="flex justify-center py-12">
                <nav className="flex items-center gap-2">
                    {/* Botón Anterior */}
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <FiChevronLeft size={20} />
                    </button>

                    {/* Página 1 (Activa) */}
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/30">
                        1
                    </button>

                    {/* Páginas intermedias (Ocultas en móvil para evitar desborde) */}
                    <div className="hidden md:flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            2
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            3
                        </button>
                        <span className="px-2 text-slate-400">...</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            8
                        </button>
                    </div>

                    {/* Botón Siguiente */}
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors">
                        <FiChevronRight size={20} />
                    </button>
                </nav>
            </div>
        </>
    );
};

export default BlogIndex;
