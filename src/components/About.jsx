import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import profileImage from '../assets/profile-about.webp';
import { fadeInUp, staggerContainer } from '../config/motionConfig';

const About = () => {
    const [activeTab, setActiveTab] = useState('formacion');

    return (
        <section className="py-20 relative bg-slate-950 overflow-hidden">
            {/* Background Elements for depth */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cobalt-500/5 blur-3xl rounded-l-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        {/* Image Column */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cobalt-500 to-mint-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] max-w-[300px] w-full">
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        loading="lazy"
                                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Content Column */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-7 lg:col-span-8 space-y-8"
                        >
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                                    Sobre <span className="text-mint-400">Mí</span>
                                </h2>

                                <div className="space-y-6 text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                                    <p>
                                        Hola, soy Leandro — estudiante de la Tecnicatura
                                        Universitaria en Programación en UTN FRRA y desarrollador
                                        independiente.
                                    </p>
                                    <p>
                                        Construyo herramientas digitales: aplicaciones de escritorio,
                                        sitios web y automatizaciones.
                                    </p>
                                    <p>
                                        Actualmente desarrollo OmniStock, un sistema de inventario
                                        desktop para PyMEs. Tengo experiencia entregando proyectos
                                        reales — como la tienda online de Faro Art Shop, hoy en
                                        producción en{' '}
                                        <a
                                            href="https://faroartshop.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            faroartshop.com
                                        </a>.
                                    </p>
                                    <p>
                                        Si tenés un problema concreto en tu negocio y creés que una
                                        herramienta puede ayudar, con gusto lo charlamos.
                                    </p>
                                </div>
                            </div>

                            {/* Education & Methodology Grid */}
                            <div className="grid grid-cols-1 gap-6 pt-4">

                                {/* SECCIÓN EDUCACIÓN CON TABS */}
                                <div className="w-full">

                                    {/* TABS */}
                                    <div className="flex gap-2 mb-6">
                                        <button
                                            onClick={() => setActiveTab('formacion')}
                                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                                ${activeTab === 'formacion'
                                                    ? 'bg-cyan-500 text-slate-900 border-cyan-500'
                                                    : 'bg-transparent text-slate-400 border-slate-600 hover:border-slate-400'
                                                }`}
                                        >
                                            <FaGraduationCap className="inline mr-2" /> Formación académica
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('cursos')}
                                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                                ${activeTab === 'cursos'
                                                    ? 'bg-cyan-500 text-slate-900 border-cyan-500'
                                                    : 'bg-transparent text-slate-400 border-slate-600 hover:border-slate-400'
                                                }`}
                                        >
                                            <FaGraduationCap className="inline mr-2" /> Cursos y certificaciones
                                        </button>
                                    </div>

                                    {/* PANEL FORMACIÓN */}
                                    {activeTab === 'formacion' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <p className="text-xs text-slate-500 mb-3">← deslizá para ver más</p>
                                            <div className="flex gap-4 overflow-x-auto scroll-smooth pb-3"
                                                 style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>

                                                {/* Card 1 — Tecnicatura en Programación */}
                                                <div className="flex-shrink-0 w-64 rounded-xl bg-slate-800/50 border-l-4 border-cyan-500 p-4"
                                                     style={{ scrollSnapAlign: 'start' }}>
                                                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-green-900/40 text-green-400">
                                                        2022 – Actualidad
                                                    </span>
                                                    <h4 className="text-white font-semibold text-sm mb-1">
                                                        Tecnicatura Universitaria en Programación
                                                    </h4>
                                                    <p className="text-slate-400 text-xs mb-3">UTN — FRRA · Plan 2024</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {['SQL Server', 'Java', 'Programación C', 'Matemática', 'Estadística', 'Base de Datos', 'Intro Análisis de Datos'].map(m => (
                                                            <span key={m} className="px-2 py-0.5 text-xs rounded bg-slate-700 text-slate-300">{m}</span>
                                                        ))}
                                                    </div>
                                                    <p className="text-slate-500 text-xs mt-3 italic">* Transición Plan 2003 → Plan 2024</p>
                                                </div>

                                                {/* Card 2 — Org. Industrial */}
                                                <div className="flex-shrink-0 w-64 rounded-xl bg-slate-800/50 border-l-4 border-amber-500 p-4"
                                                     style={{ scrollSnapAlign: 'start' }}>
                                                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                                                    2020
                                                    </span>
                                                    <h4 className="text-white font-semibold text-sm mb-1">
                                                        Lic. en Organización Industrial
                                                    </h4>
                                                    <p className="text-slate-400 text-xs mb-3">UTN — FRRA</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {['Álgebra', 'Economía General', 'Org. Industrial I', 'Informática (Excel)'].map(m => (
                                                            <span key={m} className="px-2 py-0.5 text-xs rounded bg-slate-700 text-slate-300">{m}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Card 3 — Logística */}
                                                <div className="flex-shrink-0 w-64 rounded-xl bg-slate-800/50 border-l-4 border-purple-500 p-4"
                                                     style={{ scrollSnapAlign: 'start' }}>
                                                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                                                        2016
                                                    </span>
                                                    <h4 className="text-white font-semibold text-sm mb-1">
                                                        Tecnicatura Superior en Logística
                                                    </h4>
                                                    <p className="text-slate-400 text-xs mb-3">ISFD Dr. Joaquín V. González</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {['Comunicación UDI', 'Comunicación Organizacional', 'Contabilidad', 'Inglés Técnico', 'Gestión de Abastecimiento', 'Economía'].map(m => (
                                                            <span key={m} className="px-2 py-0.5 text-xs rounded bg-slate-700 text-slate-300">{m}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}

                                    {/* PANEL CURSOS */}
                                    {activeTab === 'cursos' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <p className="text-xs text-slate-500 mb-3">← deslizá para ver más</p>
                                            <div className="flex gap-4 overflow-x-auto scroll-smooth pb-3"
                                                 style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>

                                                {/* Curso 1 */}
                                                <div className="flex-shrink-0 w-56 rounded-xl bg-slate-800/50 border-l-4 border-cyan-400 p-4"
                                                     style={{ scrollSnapAlign: 'start' }}>
                                                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/40 text-cyan-400">
                                                        2022 – 2023
                                                    </span>
                                                    <h4 className="text-white font-semibold text-sm mb-1">
                                                        Programación y Desarrollo de Aplicaciones
                                                    </h4>
                                                    <p className="text-slate-400 text-xs">Argentina Programa 4.0</p>
                                                </div>

                                                {/* Curso 2 */}
                                                <div className="flex-shrink-0 w-56 rounded-xl bg-slate-800/50 border-l-4 border-purple-400 p-4"
                                                     style={{ scrollSnapAlign: 'start' }}>
                                                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-400">
                                                        2023
                                                    </span>
                                                    <h4 className="text-white font-semibold text-sm mb-1">
                                                        Full Stack Java
                                                    </h4>
                                                    <p className="text-slate-400 text-xs">Codo a Codo 4.0</p>
                                                </div>

                                                {/* Curso 3 */}
                                                <div className="flex-shrink-0 w-56 rounded-xl bg-slate-800/50 border-l-4 border-amber-400 p-4"
                                                     style={{ scrollSnapAlign: 'start' }}>
                                                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-900/40 text-amber-400">
                                                        2025
                                                    </span>
                                                    <h4 className="text-white font-semibold text-sm mb-1">
                                                        Automatización con n8n
                                                    </h4>
                                                    <p className="text-slate-400 text-xs">Formación independiente</p>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}

                                </div>

                                {/* IA & Trayectoria */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* AI Block */}
                                    <motion.div
                                        variants={fadeInUp}
                                        className="p-8 rounded-xl backdrop-blur-md bg-cyan-institutional/5 border border-cyan-institutional/20 relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-institutional/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-institutional/20 transition-colors" />

                                        <h3 className="text-lg text-white font-bold mb-4 relative z-10 flex items-center gap-2">
                                            Herramientas de IA y Asistencia al Desarrollo
                                        </h3>
                                        <p className="text-base text-slate-300 leading-relaxed relative z-10">
                                            Metodología de trabajo potenciada por modelos de lenguaje avanzados para optimización de código, generación de documentación técnica y resolución eficiente de problemas complejos.
                                        </p>
                                    </motion.div>

                                    {/* Trayectoria Block */}
                                    <motion.div
                                        variants={fadeInUp}
                                        className="p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cobalt-400/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-cobalt-400/10 flex items-center justify-center text-cobalt-400">
                                                <FaBriefcase className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg text-white font-semibold">Trayectoria</h3>
                                        </div>
                                        <p className="text-base text-slate-400 leading-relaxed">
                                            +10 años de experiencia en gestión operativa y administrativa, aportando una visión sistémica a los desafíos de negocio.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
