import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import profileImage from '../assets/profile-about.webp';
import { fadeInUp, staggerContainer } from '../config/motionConfig';

const About = () => {
    return (
        <section id="sobre-mi" className="py-20 relative bg-slate-950 overflow-hidden">
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
                                        ¡Hola! Soy estudiante avanzado de la Tecnicatura Universitaria en Programación en la UTN (FRRA)
                                        con un interés creciente en el análisis de datos y la automatización de procesos.
                                        Mi perfil combina conocimientos en entornos administrativos y operativos
                                        con una base técnica en programación, trabajando con SQL y Python para el procesamiento y análisis de datos,
                                        y con conocimientos en Java y React aplicados al desarrollo de soluciones.
                                    </p>
                                    <p>
                                        Mi enfoque está en organizar y preparar información para su análisis.
                                        Gracias a mi trayectoria en sectores como el automotriz y el agroindustrial,
                                        comprendo la importancia de la correcta carga, validación y control de datos operativos.
                                    </p>
                                    <p>
                                        Actualmente estoy profundizando en PowerBI para la creación de visualizaciones claras y continúo desarrollando mis habilidades técnicas para resolver problemas reales
                                        mediante el análisis y la exploración de datos.
                                    </p>
                                </div>
                            </div>

                            {/* Education & Methodology Grid */}
                            <div className="grid grid-cols-1 gap-6 pt-4">

                                {/* Formación Académica */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <FaGraduationCap className="text-mint-400" />
                                        Formación Académica
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {/* Tecnicatura */}
                                        <motion.div
                                            variants={fadeInUp}
                                            className="p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-mint-400/30 transition-colors group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-lg text-white font-semibold group-hover:text-mint-400 transition-colors">Tecnicatura Universitaria en Programación</h4>
                                                <span className="text-[11px] px-3 py-1 rounded-full bg-mint-500/20 text-mint-300 border border-mint-500/20 whitespace-nowrap">
                                                    En curso (Plan 2024)
                                                </span>
                                            </div>
                                            <p className="text-base lg:text-lg text-slate-400 mb-6">UTN - FRRA</p>
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                {['SQL Server', 'Programación C', 'Java', 'Matemática', 'Estadística', 'Base de Datos', 'Intro Análisis de Datos'].map((subject) => (
                                                    <span key={subject} className="px-2 py-1 rounded bg-white/5 text-[11px] text-slate-300 border border-white/5">
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-500 italic">
                                                * Transición de Plan 2003 a Plan 2024
                                            </p>
                                        </motion.div>

                                        {/* Licenciatura */}
                                        <motion.div
                                            variants={fadeInUp}
                                            className="p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-blue-400/30 transition-colors group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-lg text-white font-semibold group-hover:text-blue-400 transition-colors">Licenciatura en Organización Industrial</h4>
                                                <span className="text-[11px] px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20 whitespace-nowrap">
                                                    En curso
                                                </span>
                                            </div>
                                            <p className="text-base lg:text-lg text-slate-400 mb-6">UTN - FRRA</p>
                                            <div className="flex flex-wrap gap-3">
                                                {['Álgebra', 'Economía General', 'Org. Industrial I'].map((subject) => (
                                                    <span key={subject} className="px-2 py-1 rounded bg-white/5 text-[11px] text-slate-300 border border-white/5">
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
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
