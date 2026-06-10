// src/components/SkillsGrid.jsx
import {
    FaReact,
    FaPython,
    FaJava,
    FaWindows,
    FaChartBar
} from 'react-icons/fa';
import { DiSqllite } from 'react-icons/di';
import { fadeInUp, staggerContainer, springConfig } from '../config/motionConfig';
import { useLocale } from '../hooks/useLocale';

// Lista de tecnologías con sus iconos y colores
// Orden solicitado: React, SQL, Java, Python, PowerBI, 365
const skills = [
    { name: 'React', icon: FaReact, color: 'from-cyan-400 to-blue-500' },
    { name: 'SQL', icon: DiSqllite, color: 'from-blue-500 to-indigo-600' },
    { name: 'Java', icon: FaJava, color: 'from-red-500 to-orange-600' },
    { name: 'Python', icon: FaPython, color: 'from-blue-400 to-yellow-500' },
    { name: 'Power BI', icon: FaChartBar, color: 'from-yellow-500 to-orange-500' },
    { name: 'Microsoft 365', icon: FaWindows, color: 'from-blue-400 to-cyan-300' },
];

// Componente de tarjeta individual
const SkillCard = ({ skill }) => {
    const Icon = skill.icon;

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={springConfig.gentle}
            className="
        group relative
        p-6 rounded-2xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        hover:bg-white/10 hover:border-cobalt-400/30
        transition-all duration-300
        cursor-pointer
        overflow-hidden
      "
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cobalt-500/5 to-mint-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Icon with gradient */}
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`
            w-16 h-16 rounded-xl
            bg-gradient-to-br ${skill.color}
            flex items-center justify-center
            shadow-lg shadow-black/20
            group-hover:shadow-xl group-hover:shadow-cobalt-500/30
            transition-shadow duration-300
          `}
                >
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Skill name */}
                <h3 className="
          text-sm font-semibold
          bg-gradient-to-r from-cobalt-300 via-mint-400 to-cobalt-300
          bg-clip-text text-transparent
          group-hover:from-mint-400 group-hover:via-cobalt-300 group-hover:to-mint-400
          transition-all duration-300
        ">
                    {skill.name}
                </h3>
            </div>

            {/* Glow effect on bottom */}
            <div className="
        absolute bottom-0 left-1/2 -translate-x-1/2
        w-3/4 h-px
        bg-gradient-to-r from-transparent via-mint-400/50 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      " />
        </motion.div>
    );
};

// Componente principal
const SkillsGrid = ({ className = '' }) => {
    const { t } = useLocale();
    return (
        <section className={`w-full relative overflow-hidden py-24 md:py-32 lg:py-40 ${className}`}>
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cobalt-500/10 rounded-full filter blur-[128px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-mint-400/5 rounded-full filter blur-[128px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="
              inline-flex items-center gap-2 
              px-4 py-2 rounded-full 
              bg-gradient-to-r from-cobalt-500/15 to-mint-400/10
              border border-cobalt-400/30
              backdrop-blur-sm
              text-cobalt-300 text-sm font-medium mb-6
            ">
                            <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
                            Tecnologías
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            {t.works.techStackSection}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Herramientas y tecnologías con las que trabajo para crear soluciones modernas y eficientes
                        </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <motion.div
                        variants={staggerContainer}
                        className="
              grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6
              gap-6 md:gap-6 lg:gap-4
              max-w-7xl mx-auto
              px-2 sm:px-0
            "
                    >
                        {skills.map((skill, index) => (
                            <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsGrid;
