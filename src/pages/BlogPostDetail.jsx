import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCalendar, FiHeart } from 'react-icons/fi';
import { MdLightbulb } from 'react-icons/md';
import DOMPurify from 'dompurify';
import { blogPosts as blogPostsEs } from '../features/blog/data/blogData.es';
import { blogPosts as blogPostsEn } from '../features/blog/data/blogData.en';
import { blogPosts as blogPostsPt } from '../features/blog/data/blogData.pt';
import ShareButton from '../components/ui/ShareButton';
import BlogMetaTags from '../components/BlogMetaTags';
import { useLocale } from '../hooks/useLocale';

const POSTS_BY_LOCALE = { es: blogPostsEs, en: blogPostsEn, pt: blogPostsPt };
const BLOG_INDEX_PATH_BY_LOCALE = { es: '/blog', en: '/en/blog', pt: '/pt/blog' };

const BlogPostDetail = () => {
    const { slug } = useParams();
    const { t, locale } = useLocale();
    const blogPosts = POSTS_BY_LOCALE[locale] || blogPostsEs;
    const blogIndexPath = BLOG_INDEX_PATH_BY_LOCALE[locale] || '/blog';
    const post = blogPosts.find(p => p.slug === slug);
    const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

    // DOMPurify config: only allow safe HTML tags
    const purifyConfig = {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'a', 'img', 'hr', 'div', 'span', 'table', 'thead', 'tbody', 'tr', 'td', 'th'],
        ALLOWED_ATTR: ['src', 'alt', 'href', 'title', 'class', 'loading', 'decoding']
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-[#2C3340]">
                <h2 className="text-2xl font-bold mb-4">{t.blog.detail.notFound}</h2>
                <Link to={blogIndexPath} className="text-primary hover:text-blue-400 flex items-center gap-2">
                    <FiArrowLeft /> {t.blog.detail.backToBlog}
                </Link>
            </div>
        );
    }

    // Sanitize content
    const sanitizedContent = DOMPurify.sanitize(post.content, purifyConfig);

    const categoryColors = {
        'Data Engineering': 'bg-purple-100 text-purple-700 border-purple-300',
        'Backend': 'bg-blue-100 text-blue-700 border-blue-300',
        'Performance': 'bg-amber-100 text-amber-700 border-amber-300',
        'Frontend': 'bg-green-100 text-green-700 border-green-300',
    };

    const categoryColor = categoryColors[post.category] || categoryColors['Frontend'];

    return (
        <>
            <BlogMetaTags
                title={post.title}
                description={post.excerpt}
                slug={post.slug}
                imageUrl={post.image}
                publishDate={post.date}
            />
            <article className="min-h-screen pt-12 pb-20">
            {/* Header / Hero del Post */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <Link
                    to={blogIndexPath}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 group font-medium"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    {t.blog.detail.backToBlog}
                </Link>

                <header className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
                    <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start mb-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${categoryColor}`}>
                            {post.category}
                        </span>
                        <span className="flex items-center gap-2 text-slate-500 text-sm">
                            <FiCalendar /> {post.date}
                        </span>
                        <span className="flex items-center gap-2 text-slate-500 text-sm">
                            <FiClock /> {post.readTime} {t.blog.detail.minRead}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
                        {post.title}
                    </h1>
                </header>
            </div>

            {/* Hero Image */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="relative aspect-video lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200 min-h-[200px] bg-[#EEE0C9]">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                            decoding="async"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#EEE0C9] to-[#ADC4CE] flex items-center justify-center">
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
                        <button className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 hover:text-primary hover:scale-110 transition-all flex items-center justify-center group flex-col gap-1">
                            <FiHeart className="text-xl" />
                            <span className="text-[10px] font-bold">24</span>
                        </button>
                        <div className="scale-75 origin-top">
                            <ShareButton
                                url={`https://ongevag.com${blogIndexPath}/${post.slug}`}
                                title={post.title}
                                description={post.excerpt}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Main Content (Center) */}
                <div className="lg:col-span-8">
                    <div
                        className="
                            max-w-4xl mx-auto
                            [&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:leading-tight [&_h1]:mb-8
                            [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-8
                            [&_h3]:text-xl [&_h3]:lg:text-2xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-4
                            [&_p]:text-lg [&_p]:lg:text-xl [&_p]:leading-loose [&_p]:text-slate-600 [&_p]:mb-6
                            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-slate-600
                            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-slate-600
                            [&_li]:text-lg [&_li]:lg:text-xl [&_li]:mb-2
                            [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline
                            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:my-8
                            [&_hr]:my-12 [&_hr]:border-slate-200
                            [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-8 [&_img]:w-full
                            [&_div.bg-slate-50]:text-lg [&_div.bg-slate-50]:lg:text-xl
                            [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:border [&_pre]:border-slate-700 [&_pre]:p-4 [&_pre]:my-4 [&_pre]:text-sm
                            [&_code]:font-mono [&_code]:text-sm [&_code]:break-words
                            [&_pre_code]:break-normal [&_pre_code]:whitespace-pre
                            [&_table]:overflow-x-auto [&_table]:block [&_table]:max-w-full
                        "
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />

                    {/* Bloque de Flujo de Trabajo Sugerido */}
                    <div className="mt-16 p-8 rounded-2xl bg-[#EEE0C9]/60 border border-[#ADC4CE]/30">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <MdLightbulb className="text-primary text-2xl" />
                            {t.blog.detail.workflowTitle}
                        </h3>
                        <ol className="list-decimal list-inside space-y-3 text-slate-600">
                            {t.blog.detail.workflowSteps.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                    </div>

                    {/* Footer Post */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">{t.blog.detail.tags}</h4>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share en mobile — visible solo en mobile */}
                    <div className="flex lg:hidden items-center justify-between pt-6 mt-6 border-t border-slate-700">
                        <span className="text-sm text-slate-400 font-medium">
                            {t.blog.detail.sharePrompt}
                        </span>
                        <ShareButton
                            url={`https://www.ongevag.com${blogIndexPath}/${post.slug}`}
                            title={post.title}
                            description={post.excerpt}
                        />
                    </div>
                </div>

                {/* 3. Right Widgets */}
                <aside className="lg:col-span-3 space-y-8 text-center md:text-left">
                    {/* Contact CTA */}
                    <div className="p-6 rounded-2xl bg-[#2C3340] text-white shadow-xl">
                        <h3 className="font-bold text-lg mb-2">{t.blog.detail.contactTitle}</h3>
                        <p className="text-slate-400 text-sm mb-4">{t.blog.detail.contactDescription}</p>
                        <a
                            href={`${locale === 'es' ? '' : `/${locale}`}/#contacto`}
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 transition-colors font-bold py-2 rounded-lg text-sm text-white"
                        >
                            {t.blog.detail.contactCta}
                        </a>
                    </div>

                    {/* Recommended Articles */}
                    <div>
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6">
                            {t.blog.detail.recommended}
                        </h3>
                        <div className="space-y-6">
                            {relatedPosts.map(p => (
                                <Link key={p.id} to={`${blogIndexPath}/${p.slug}`} className="group flex gap-4">
                                    <div className="w-20 h-20 min-h-[80px] rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
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
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                            {p.title}
                                        </h4>
                                        <span className="text-xs text-slate-500 mt-1 block">{p.readTime} {t.blog.minRead}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </article>
        </>
    );
};

export default BlogPostDetail;
