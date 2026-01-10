import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiSun, FiMoon, FiCode, FiTerminal, FiShare2 } from 'react-icons/fi';

const BlogLayout = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 font-sans">
            <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">D</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight">DEV<span className="text-primary">LOG</span></span>
                        </Link>
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
                            <Link to="/#about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">About</Link>
                            <Link to="/#proyectos" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">Projects</Link>
                            <Link to="/blog" className="text-primary font-semibold border-b-2 border-primary py-1">Blog</Link>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {isDark ? (
                                    <FiSun className="text-[20px] align-middle" />
                                ) : (
                                    <FiMoon className="text-[20px] align-middle" />
                                )}
                            </button>
                        </div>
                        {/* Mobile menu button could go here */}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-12 bg-white dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">D</span>
                                </div>
                                <span className="font-bold text-lg tracking-tight uppercase">DevLog</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Compartiendo conocimiento sobre ingeniería de datos, arquitectura de software y desarrollo frontend moderno.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold">Social</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <FiCode className="text-lg" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <FiTerminal className="text-lg" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <FiShare2 className="text-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                        <p>© 2026 DevLog. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:underline">Privacidad</a>
                            <a href="#" className="hover:underline">Términos</a>
                            <a href="#" className="hover:underline">RSS Feed</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogLayout;
