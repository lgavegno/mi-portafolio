import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 custom-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                >
                    {cat.label} ({cat.count})
                </button>
            ))}
        </div>
    );
};

export const FeaturedPost = ({ post }) => {
    if (!post) return null;

    return (
        <div className="lg:col-span-8 group cursor-pointer">
            <Link to={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-video lg:aspect-[16/9] mb-6">
                    <img
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={post.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCbC2o7NniBI2pQlRJvyxcjIdklcQMnspXd7ETdF1PcC1lEPtiGikMGCpeK3sXS6MwDF69JOYKnSNv38TSc8kfgyMbDmbqcvobmRvyty1EdAOZYkJr8HK9c721_1ul31S64pdmUYn-tBGv_lXVhCi37ihWjUof0a7VqYiefAhR9j1wBWj7wsp2v_wUWmZq9G6GDRPrhSQqMD6MTVQts9t1jJqtfWsGGlP3KGBykecmeV2HZ71_kZt74SG3N4f4RrnGSqaIeS-1AMuOV"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent flex items-end p-8">
                        <div>
                            <span className="bg-primary px-3 py-1 rounded text-xs font-bold text-white mb-4 inline-block uppercase tracking-wider">
                                Featured Post
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                {post.title}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                        <FiCalendar className="text-base" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <FiClock className="text-base" /> {post.readTime} min read
                    </span>
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {post.excerpt}
                </p>
                <div className="flex gap-2 mb-6">
                    {post.tags && post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-mono rounded">#{tag}</span>
                    ))}
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-2 underline-offset-4">
                    Read Full Story <FiArrowRight />
                </span>
            </Link>
        </div>
    );
};

export const Sidebar = () => {
    return (
        <aside className="lg:col-span-4 space-y-12">
            <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4">¿Querés estar al tanto?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    Escribime y te aviso cuando publique contenido nuevo.
                </p>
                <a
                    href="/#contacto"
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors"
                >
                    Contactarme →
                </a>
            </div>
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
                    Lo más leído
                </h3>
                <div className="space-y-6">
                    {/* Dummy data for now as per template */}
                    <div className="flex gap-4 group cursor-pointer">
                        <span className="text-3xl font-bold text-slate-200 dark:text-slate-800">01</span>
                        <div>
                            <h4 className="font-bold group-hover:text-primary transition-colors line-clamp-2">Optimización de queries SQL en entornos productivos</h4>
                            <span className="text-xs text-slate-500 uppercase">Performance</span>
                        </div>
                    </div>
                    <div className="flex gap-4 group cursor-pointer">
                        <span className="text-3xl font-bold text-slate-200 dark:text-slate-800">02</span>
                        <div>
                            <h4 className="font-bold group-hover:text-primary transition-colors line-clamp-2">Migrando mi blog a Next.js y Tailwind CSS</h4>
                            <span className="text-xs text-slate-500 uppercase">Frontend</span>
                        </div>
                    </div>
                    <div className="flex gap-4 group cursor-pointer">
                        <span className="text-3xl font-bold text-slate-200 dark:text-slate-800">03</span>
                        <div>
                            <h4 className="font-bold group-hover:text-primary transition-colors line-clamp-2">Guía definitiva de Airflow 2.0</h4>
                            <span className="text-xs text-slate-500 uppercase">Data Engineering</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export const PostGrid = ({ posts }) => {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Últimas Publicaciones</h2>
                <div className="h-[1px] flex-grow mx-8 bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="flex flex-col h-full group">
                        <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                                <img
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={post.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuD7w9KyEWaF3CrqSob_8-4gd1dAE_at2RECeq3Z2Z6jxpnzVgGW4rdE2KgSpSUtEKdwipuBiF2RkoyA1_RIXl3K9A9-i5GkNrbaPSW7qnA3ZXunN5YguYRc9jKv9ru9O9Yq1-a3ufJQwvlLiN5moC7ag-3ppaLo1YyboiERGFQytqcHb20Z0v6wXiDdD107edpL7vSMKUPmbKx967G0z4uHw2Dh4zxFmXp_5b0Q-pIT0pR2fo5ei8Fx_MQrZvLA7Sgm53_EsGvvQW-W"}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime} min read</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg line-clamp-3 mb-4">
                                    {post.excerpt}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {post.tags && post.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-mono rounded">#{tag}</span>
                                ))}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};
