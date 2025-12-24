// src/components/Footer.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

const socialLinks = [
  { href: 'https://github.com/lgavegno', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com/in/lgavegno', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'mailto:contacto@lgavegno.dev', icon: FaEnvelope, label: 'Email' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cobalt-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cobalt-500 to-mint-400 flex items-center justify-center text-lg font-bold text-white">
              LG
            </span>
            <span className="text-xl font-bold text-white">Leandro Gavegno</span>
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
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="
                  p-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-gray-400 hover:text-mint-400
                  hover:border-mint-400/30 hover:bg-mint-400/5
                  transition-colors duration-300
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
            <p className="text-gray-500 text-sm flex items-center gap-1 justify-center">
              © {currentYear} Hecho con 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <FaHeart className="text-red-500 w-3 h-3" />
              </motion.span>
              por Leandro Gavegno
            </p>
            <p className="text-gray-600 text-xs mt-1">
              React + Vite + Tailwind + Framer Motion
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer