import React from 'react';
import { Outlet } from 'react-router-dom';

const BlogLayout = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
        </main>
    );
};

export default BlogLayout;
