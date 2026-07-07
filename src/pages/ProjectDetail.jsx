import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { featuredProjects as projectsEs } from '../data/projects.es';
import { featuredProjects as projectsEn } from '../data/projects.en';
import { featuredProjects as projectsPt } from '../data/projects.pt';
import { fadeInUp, staggerContainer } from '../config/motionConfig';
import { useLocale } from '../hooks/useLocale';

const PROJECTS_BY_LOCALE = { es: projectsEs, en: projectsEn, pt: projectsPt };

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, locale } = useLocale();
    const featuredProjects = PROJECTS_BY_LOCALE[locale] || projectsEs;

    const project = featuredProjects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-obsidian text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">{t.works.project.notFound}</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-cyan-institutional hover:underline"
                    >
                        {t.works.project.goBack}
                    </button>
                </div>
            </div>
        );
    }

    const truncateText = (text, maxLen) =>
        text && text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;

    const description = project.shortDescription || project.description;
    const pageUrl = `https://www.ongevag.com/proyecto/${project.id}`;

    const appCategory = project.category === 'tools' || project.stack?.includes('Tauri')
        ? 'DesktopApplication'
        : project.category === 'ai-ml'
        ? 'WebApplication'
        : 'WebApplication';

    const softwareAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: truncateText(description, 300),
        applicationCategory: appCategory,
        operatingSystem: project.stack?.includes('Tauri') ? 'Windows, macOS, Linux' : 'Web',
        url: pageUrl,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };
    const pageUrlEs = `https://www.ongevag.com/es/proyecto/${project.id}`;
    const fallbackImage = 'https://www.ongevag.com/og-image.png';
    const ogImage = typeof project.image === 'string' && project.image.startsWith('http')
        ? project.image
        : fallbackImage;

    return (
        <>
        <Helmet>
            <title>{project.title} — Ongevag Works</title>
            <meta name="description" content={truncateText(description, 155)} />

            <meta property="og:title" content={project.title} />
            <meta property="og:description" content={truncateText(description, 155)} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content="article" />
            <meta property="og:locale" content="en_US" />

            <link rel="alternate" hreflang="en" href={pageUrl} />
            <link rel="alternate" hreflang="es" href={pageUrlEs} />
            <link rel="alternate" hreflang="x-default" href={pageUrl} />

            <link rel="canonical" href={pageUrl} />
            <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
        </Helmet>
        <motion.main
            initial="initial"
            animate="animate"
            className="min-h-screen bg-obsidian pt-24 pb-12"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.button
                    variants={fadeInUp}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-mint-400 transition-colors mb-8 group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t.works.project.back}
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido Principal (66%) */}
                    <motion.div
                        variants={staggerContainer}
                        className="lg:col-span-2 space-y-12"
                    >
                        <motion.div variants={fadeInUp} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500">
                                    <span className="text-lg">{t.works.project.imageUnavailable}</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                        </motion.div>

                        {/* Análisis de Retención & ML */}
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                                {project.title.split(' - ')[0]}
                                <span className="block text-2xl lg:text-3xl text-mint-400 mt-2 font-medium tracking-normal normal-case opacity-90">
                                    {project.title.split(' - ')[1] || 'Case Study'}
                                </span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-300 lg:leading-[1.6] max-w-none">
                                {project.longDescription || project.description}
                            </p>
                        </motion.div>

                        {/* Metodología Section */}
                        {project.methodology && project.methodology.length > 0 && (
                            <motion.section variants={fadeInUp} className="space-y-6">
                                <h2 className="text-2xl font-bold text-cyan-institutional uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 bg-cyan-institutional rounded-full" />
                                    {t.works.project.methodology}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.methodology.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-6 lg:p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                        >
                                            <p className="text-gray-300 text-lg lg:text-xl font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Resultados Section */}
                        {project.results && project.results.length > 0 && (
                            <motion.section variants={fadeInUp} className="space-y-6">
                                <h2 className="text-2xl font-bold text-mint-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 bg-mint-400 rounded-full" />
                                    {t.works.project.results}
                                </h2>
                                <div className="space-y-6">
                                    {project.results.map((result, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-6 p-6 lg:p-8 rounded-xl border border-mint-400/10 bg-mint-400/5 backdrop-blur-sm"
                                        >
                                            <span className="text-mint-400 mt-1">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            <p className="text-gray-300 text-lg lg:text-xl font-medium">{result}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Key Insights Section */}
                        {project.highlights && project.highlights.length > 0 && (
                            <motion.section variants={fadeInUp} className="space-y-6">
                                <h2 className="text-2xl font-bold text-mint-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 bg-mint-400 rounded-full" />
                                    Key Insights
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.highlights.map((insight, index) => (
                                        <div
                                            key={index}
                                            className="p-6 lg:p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-institutional/30 transition-colors"
                                        >
                                            <p className="text-gray-300 text-lg lg:text-xl font-medium">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </motion.div>

                    {/* Sidebar Técnico (33%) */}
                    <motion.aside
                        variants={fadeInUp}
                        className="space-y-6"
                    >
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl sticky top-24">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                                <svg className="w-6 h-6 text-cyan-institutional" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                                {t.works.project.techStack}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-5 py-2.5 rounded-lg bg-cyan-institutional/10 text-cyan-institutional border border-cyan-institutional/20 text-base lg:text-lg font-mono font-semibold"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {project.link && project.link !== '#' && (
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cyan-institutional text-black text-base font-bold hover:bg-cyan-institutional/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {t.works.project.viewGithub}
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            )}

                            {project.notionLink && (
                                <div className="mt-4">
                                    <a
                                        href={project.notionLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/10 text-white text-base font-bold border border-white/20 hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {t.works.project.viewNotion}
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.aside>
                </div>
            </div>
        </motion.main>
        </>
    );
};

export default ProjectDetail;
