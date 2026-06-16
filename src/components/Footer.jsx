// src/components/Footer.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { useVibrate } from '../hooks/useVibrate'
import { useLocale } from '../hooks/useLocale'

const socialLinks = [
  { href: 'https://github.com/lgavegno', icon: FaGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/leandro-gavegno/', icon: FaLinkedin, label: 'LinkedIn' },
  { href: '#contacto', icon: FaEnvelope, label: 'Email' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const vibrateLight = useVibrate(5)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLocale()

  const handleLinkClick = (e, link) => {
    vibrateLight()

    if (link.label === 'Email') {
      e.preventDefault()
      if (location.pathname === '/') {
        const element = document.getElementById('contacto')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        navigate('/', { state: { scrollTo: 'contacto' } })
      }
    }
  }

  return (
    <footer className="relative bg-[#2C3340] border-t border-[#ADC4CE]/15">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#96B6C5]/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Sobre mí */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl"
          >
            <h3 className="text-xl font-bold text-[#F1F0E8] mb-4">{t.common.footer.about}</h3>
            <p className="text-[rgba(241,240,232,0.60)]">
              {t.common.footer.description}
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
                target={link.label === 'Email' ? undefined : "_blank"}
                rel={link.label === 'Email' ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                onClick={(e) => handleLinkClick(e, link)}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                  p-3 rounded-xl
                  bg-[#F1F0E8]/8 border border-[#ADC4CE]/20
                  text-[rgba(241,240,232,0.60)] hover:text-[#F1F0E8]
                  hover:border-[#ADC4CE]/50 hover:bg-[#ADC4CE]/15
                  active:bg-[#ADC4CE]/20
                  transition-colors duration-300
                  touch-manipulation select-none
                  cursor-pointer
                "
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#ADC4CE]/25 to-transparent" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-[rgba(241,240,232,0.40)] text-sm">
              {t.common.footer.copyright.replace('{year}', currentYear)}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer