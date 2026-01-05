// src/features/contact/Contact.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiUser, FiMessageSquare } from 'react-icons/fi'
import { fadeInUp, staggerContainer } from '../../config/motionConfig'
import Button from '../../components/ui/Button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Construir el enlace mailto con los datos del formulario
    const email = 'lgavegno@gmail.com'
    const subject = encodeURIComponent(`Contacto desde Portfolio - ${formData.name}`)
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )
    
    // Abrir cliente de correo
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    
    // Reset del formulario después de un breve delay
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  const inputClasses = `
    w-full px-4 py-3 pl-12
    bg-white/5 backdrop-blur-sm
    border border-white/10 rounded-xl
    text-white placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-cobalt-400/50 focus:border-cobalt-400/50
    transition-all duration-200
  `

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-cobalt-500/10 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-mint-400/5 rounded-full filter blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cobalt-500/10 border border-cobalt-500/20 text-cobalt-400 text-sm font-medium mb-6">
              <FiMail className="w-4 h-4" />
              Contacto
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              ¿Trabajamos juntos?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Si necesitas ayuda con análisis de datos o automatización de procesos, estaré encantado de conversar contigo.
            </p>
          </motion.div>
          
          {/* Form */}
          <motion.div 
            variants={fadeInUp}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
              </div>
              
              {/* Email field */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>
              
              {/* Message field */}
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                  />
                </div>
              </div>
              
              {/* Submit button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={isSubmitting}
                  icon={<FiSend />}
                  iconPosition="right"
                  className="w-full"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact