// src/components/Footer.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { useVibrate } from '../hooks/useVibrate'

const socialLinks = [
  { href: 'https://github.com/lgavegno', icon: FaGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/leandro-gavegno/', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'mailto:lgavegno@gmail.com', icon: FaEnvelope, label: 'Email' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const vibrateLight = useVibrate(5)

  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cobalt-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Sobre mí */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">Sobre mí</h3>
            <p className="text-gray-400">
              Perfil técnico-analítico en formación, enfocado en el análisis de datos y el desarrollo de soluciones prácticas mediante la programación.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                onClick={() => vibrateLight()}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                  p-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-gray-400 hover:text-mint-400
                  hover:border-mint-400/30 hover:bg-mint-400/5
                  active:bg-mint-400/10
                  transition-colors duration-300
                  touch-manipulation select-none
                "
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm">
              © {currentYear} Leandro Gavegno — Aprendizaje continuo en tecnología y análisis
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer