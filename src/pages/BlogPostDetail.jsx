import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiHeart } from 'react-icons/fi';
import { MdLightbulb } from 'react-icons/md';
import { blogPosts } from '../features/blog/data/blogData';
import ShareButton from '../components/ui/ShareButton';

const BlogPostDetail = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);
    const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
                <Link to="/blog" className="text-primary hover:text-blue-400 flex items-center gap-2">
                    <FiArrowLeft /> Volver al Blog
                </Link>
            </div>
        );
    }

    const categoryColors = {
        'Data Engineering': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
        'Backend': 'bg-primary/20 text-blue-300 border-blue-400/30',
        'Performance': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
        'Frontend': 'bg-green-400/20 text-green-300 border-green-400/30',
    };

    const categoryColor = categoryColors[post.category] || categoryColors['Frontend'];

    return (
        <article className="min-h-screen pt-12 pb-20">
            {/* Header / Hero del Post */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-8 group font-medium"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Volver al Blog
                </Link>

                <header className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
                    <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start mb-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${categoryColor}`}>
                            {post.category}
                        </span>
                        <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <FiCalendar /> {post.date}
                        </span>
                        <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <FiClock /> {post.readTime} min de lectura
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Autor Gemini AI */}
                    <div className="flex flex-col md:flex-row items-center gap-4 border-t border-b border-slate-200 dark:border-slate-800 py-6">
                        <div className="relative">
                            <img
                                src="/gemini-avatar.png"
                                alt="Gemini AI"
                                className="w-12 h-12 rounded-full border-2 border-primary/30 p-0.5 object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-primary text-[10px] text-white px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                                AI
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                                Gemini AI
                                <span className="px-2 py-0.5 rounded text-[10px] bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold uppercase tracking-wider">
                                    IA Collaborator
                                </span>
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Co-created with advanced reasoning models</p>
                        </div>
                    </div>
                </header>
            </div>

            {/* Hero Image */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="relative aspect-video lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800/50 min-h-[200px] bg-slate-800">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                            decoding="async"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <span className="text-6xl">✨</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Layout 3 Columnas */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* 1. Sticky Sidebar (Left) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-32 flex flex-col items-center gap-6">
                        <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:scale-110 transition-all flex items-center justify-center group flex-col gap-1">
                            <FiHeart className="text-xl" />
                            <span className="text-[10px] font-bold">24</span>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 transition-colors flex items-center justify-center">
                            <FiShare2 />
                        </button>
                    </div>
                </div>

                {/* 2. Main Content (Center) */}
                <div className="lg:col-span-8">
                    <div
                        className="
                            max-w-4xl mx-auto
                            [&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:dark:text-white [&_h1]:leading-tight [&_h1]:mb-8
                            [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-12 [&_h2]:mb-8
                            [&_h3]:text-xl [&_h3]:lg:text-2xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-8 [&_h3]:mb-4
                            [&_p]:text-lg [&_p]:lg:text-xl [&_p]:leading-loose [&_p]:text-slate-600 [&_p]:dark:text-slate-300 [&_p]:mb-6
                            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-slate-600 [&_ul]:dark:text-slate-300
                            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-slate-600 [&_ol]:dark:text-slate-300
                            [&_li]:text-lg [&_li]:lg:text-xl [&_li]:mb-2
                            [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline
                            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:dark:text-slate-400 [&_blockquote]:my-8
                            [&_hr]:my-12 [&_hr]:border-slate-200 [&_hr]:dark:border-slate-800
                            [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-8 [&_img]:w-full
                            [&_div.bg-slate-50]:text-lg [&_div.bg-slate-50]:lg:text-xl
                        "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Bloque de Flujo de Trabajo Sugerido */}
                    <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <MdLightbulb className="text-primary text-2xl" />
                            Flujo de Trabajo Sugerido
                        </h3>
                        <ol className="list-decimal list-inside space-y-3 text-slate-600 dark:text-slate-300">
                            <li>Analiza los requisitos primero.</li>
                            <li>Diseña la solución en papel o pizarra.</li>
                            <li>Implementa el MVP (Producto Mínimo Viable).</li>
                            <li>Itera basándote en feedback real.</li>
                        </ol>
                    </div>

                    {/* Footer Post */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Etiquetas</h4>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Right Widgets */}
                <aside className="lg:col-span-3 space-y-8 text-center md:text-left">
                    {/* Newsletter Widget */}
                    <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl">
                        <h3 className="font-bold text-lg mb-2">Newsletter Semanal</h3>
                        <p className="text-slate-400 text-sm mb-4">Recibe lo mejor de mi blog directo en tu correo.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                            />
                            <button className="w-full bg-primary hover:bg-blue-600 transition-colors font-bold py-2 rounded-lg text-sm">
                                Suscribirme
                            </button>
                        </form>
                    </div>

                    {/* Recommended Articles */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-6">
                            Recomendados
                        </h3>
                        <div className="space-y-6">
                            {relatedPosts.map(p => (
                                <Link key={p.id} to={`/blog/${p.slug}`} className="group flex gap-4">
                                    <div className="w-20 h-20 min-h-[80px] rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                        {p.image ? (
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl">📄</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                            {p.title}
                                        </h4>
                                        <span className="text-xs text-slate-500 mt-1 block">{p.readTime} min read</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </article>
    );
};

export default BlogPostDetail;
