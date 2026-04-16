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
        </>
    );
};

export default BlogIndex;
