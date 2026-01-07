import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import { blogPosts } from '../features/blog/data/blogData';
import ShareButton from '../components/ui/ShareButton';

const BlogPostDetail = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
                <Link to="/" className="text-cobalt-400 hover:text-cobalt-300 flex items-center gap-2">
                    <FiArrowLeft /> Volver al inicio
                </Link>
            </div>
        );
    }

    const categoryColors = {
        'Data Engineering': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
        'Backend': 'bg-cobalt-500/20 text-cobalt-300 border-cobalt-400/30',
        'Performance': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
        'Frontend': 'bg-mint-400/20 text-mint-300 border-mint-400/30',
    };

    const categoryColor = categoryColors[post.category] || categoryColors['Frontend'];

    // Función para gradiente si no hay imagen
    const getGradient = (cat) => {
        switch (cat) {
            case 'Data Engineering': return 'from-purple-900/40 via-purple-800/20 to-slate-900';
            case 'Backend': return 'from-cobalt-900/40 via-cobalt-800/20 to-slate-900';
            case 'Performance': return 'from-amber-900/40 via-amber-800/20 to-slate-900';
            case 'Frontend': return 'from-mint-900/40 via-mint-800/20 to-slate-900';
            default: return 'from-gray-900/40 via-gray-800/20 to-slate-900';
        }
    };

    return (
        <article className="min-h-screen pt-24 pb-20">
            {/* Header / Hero del Post */}
            <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 mb-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Volver al Blog
                </Link>

                <header className="space-y-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className={`
inline - flex items - center px - 3 py - 1 rounded - full text - sm font - medium
              border backdrop - blur - sm ${categoryColor}
`}>
                            {post.category}
                        </span>
                        <span className="flex items-center gap-2 text-gray-400 text-sm">
                            <FiCalendar /> {post.date}
                        </span>
                        <span className="flex items-center gap-2 text-gray-400 text-sm">
                            <FiClock /> {post.readTime} min de lectura
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>
            </div>

            {/* Hero Image or Gradient */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w - full h - full bg - gradient - to - br ${getGradient(post.category)} flex items - center justify - center`}>
                            <div className="text-9xl opacity-20 filter blur-sm select-none">
                                {post.category === 'Data Engineering' ? '📊' :
                                    post.category === 'Backend' ? '⚙️' :
                                        post.category === 'Performance' ? '⚡' : '🎨'}
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <div
                    className="
                        text-gray-300 text-lg leading-relaxed space-y-6
                        [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-3xl [&>h2]:mt-10 [&>h2]:mb-6
                        [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:mt-8 [&>h3]:mb-4
                        [&>p]:mb-4
                        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:space-y-2 [&>ul]:text-gray-300
                        [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:space-y-2 [&>ol]:text-gray-300
                        [&>pre]:bg-slate-900/50 [&>pre]:border [&>pre]:border-white/10 [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:overflow-x-auto
                        [&>code]:text-mint-300 [&>code]:bg-white/5 [&>code]:rounded [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:font-mono [&>code]:text-sm
                        [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-slate-700 [&>table]:my-6 [&>table]:text-sm [&>table]:text-left
                        [&>div.table-wrapper]:overflow-x-auto [&>div.table-wrapper]:w-full
                    "
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer del Post */}
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                    <h4 className="text-white font-semibold">¿Te gustó este artículo?</h4>
                    <ShareButton
                        url={window.location.href}
                        title={post.title}
                        description={post.description || `${post.title} - ${post.readTime} min de lectura`}
                    />
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        to="/"
                        className="
              group
              px-8 py-3 rounded-full
              bg-cobalt-600/20 border border-cobalt-500/30
              text-cobalt-300 font-medium
              hover:bg-cobalt-600/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
              transition-all duration-300
              flex items-center gap-2
            "
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Volver a los artículos
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogPostDetail;
