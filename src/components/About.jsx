import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import profileImage from '../assets/profile-about.png';
import { fadeInUp, staggerContainer } from '../config/motionConfig';

const About = () => {
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
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Sobre <span className="text-mint-400">Mí</span>
                                </h2>

                                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                                    <p>
                                        ¡Hola! Soy un entusiasta de los datos y estudiante avanzado de la Tecnicatura en Programación en la UTN (FRRA).
                                        Mi perfil combina más de 10 años de experiencia en gestión administrativa y operativa con una sólida formación técnica en SQL y Python.
                                    </p>
                                    <p>
                                        Mi enfoque está en transformar el caos de la información en estructuras claras.
                                        Gracias a mi trayectoria en sectores como el automotriz y el agroindustrial, comprendo la importancia de la precisión en la carga y el control de datos operativos.
                                        Hoy, integro esos conocimientos con el análisis de datos para automatizar tareas, explorar tendencias y aportar claridad a la toma de decisiones.
                                    </p>
                                    <p>
                                        Actualmente, estoy profundizando en Power BI para dar vida a los indicadores y sigo evolucionando mis habilidades técnicas para resolver problemas reales mediante el análisis inteligente.
                                    </p>
                                </div>
                            </div>

                            {/* Highlights Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                {/* Academic Focus */}
                                <motion.div
                                    variants={fadeInUp}
                                    className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-mint-400/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-mint-400/10 flex items-center justify-center text-mint-400">
                                            <FaGraduationCap className="w-4 h-4" />
                                        </div>
                                        <h3 className="text-white font-semibold">Formación UTN</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Estadística', 'SQL Server', 'Intro Datos'].map((subject) => (
                                            <span key={subject} className="px-2 py-1 rounded-md bg-white/5 text-xs text-slate-300 border border-white/5">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Experience Focus */}
                                <motion.div
                                    variants={fadeInUp}
                                    className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cobalt-400/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-cobalt-400/10 flex items-center justify-center text-cobalt-400">
                                            <FaBriefcase className="w-4 h-4" />
                                        </div>
                                        <h3 className="text-white font-semibold">Trayectoria</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        +10 años en gestión operativa y reporting. Visión de negocio aplicada a datos.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
