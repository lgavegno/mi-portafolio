import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi';
import { fadeInUp, staggerContainer } from '../../config/motionConfig';
import { allProjects as projectsEN } from '../../data/projects.en';
import { allProjects as projectsES } from '../../data/projects.es';
import { useLocale } from '../../hooks/useLocale';
import ProjectCard from '../../components/ui/ProjectCard';

const Works = () => {
  const { t, locale } = useLocale();
  const projects = locale === 'es' ? projectsES : projectsEN;

  return (
    <section className="w-full relative overflow-hidden bg-obsidian py-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-institutional/5 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-cyan-institutional/10 rounded-full filter blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-institutional/10 border border-cyan-institutional/20 text-cyan-institutional text-sm font-medium mb-6">
              <FiFolder className="w-4 h-4" />
              {t.works.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.works.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.works.description}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                stack={project.stack}
                progress={project.progress}
                progressLabel={project.progressLabel}
                status={project.status}
                image={project.image}
                link={project.link}
                linkLabel={project.linkLabel}
                index={index}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/lgavegno"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center gap-3
                px-8 py-4 rounded-xl
                bg-white/5 border border-white/10
                text-gray-300 hover:text-white
                hover:border-cobalt-400/30 hover:bg-cobalt-500/5
                transition-all duration-300
                font-medium
              "
            >
              <FiGithub className="w-5 h-5" />
              {t.works.cta.github}
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Works