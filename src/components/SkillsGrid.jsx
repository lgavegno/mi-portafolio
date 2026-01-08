import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJava, FaPython, FaWindows, FaChartBar } from 'react-icons/fa';
import { DiSqllite } from 'react-icons/di';
import { staggerContainer, fadeInUp } from '../config/motionConfig';

const skills = [
    { name: 'React', icon: FaReact, color: 'text-cyan-400' },
    { name: 'SQL', icon: DiSqllite, color: 'text-blue-400' },
    { name: 'Java', icon: FaJava, color: 'text-orange-600' },
    { name: 'Python', icon: FaPython, color: 'text-yellow-300' },
    { name: 'PowerBI', icon: FaChartBar, color: 'text-yellow-500' },
    { name: 'Microsoft 365', icon: FaWindows, color: 'text-blue-400' },
];

const SkillsGrid = () => {
    return (
        <section className="py-20 relative bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Stack Tecnológico
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
                        Tecnologías clave que manejo para el desarrollo y análisis de datos.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={fadeInUp}
                            className="group p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mint-400/30 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-default"
                        >
                            <skill.icon className={`w-12 h-12 ${skill.color} mb-2 group-hover:scale-110 transition-transform duration-300`} />
                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors text-center">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsGrid;
