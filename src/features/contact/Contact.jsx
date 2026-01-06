// src/features/contact/Contact.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMail, FiUser, FiMessageSquare, FiCheck, FiAlertCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { fadeInUp, staggerContainer } from '../../config/motionConfig'
import Button from '../../components/ui/Button'
import { useVibrate } from '../../hooks/useVibrate'

// Estados del formulario
const FORM_STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error'
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState(FORM_STATUS.IDLE)
  const [errorMessage, setErrorMessage] = useState('')
  
  const vibrateFocus = useVibrate(5)
  const vibrateSuccess = useVibrate(50)
  const vibrateError = useVibrate(100)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar estado de error al escribir
    if (status === FORM_STATUS.ERROR) {
      setStatus(FORM_STATUS.IDLE)
      setErrorMessage('')
    }
  }

  const handleFocus = () => {
    vibrateFocus()
  }

  // Validación simple
  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Por favor, ingresa tu nombre')
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Por favor, ingresa un email válido')
      return false
    }
    if (!formData.message.trim()) {
      setErrorMessage('Por favor, escribe un mensaje')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar antes de enviar
    if (!validateForm()) {
      setStatus(FORM_STATUS.ERROR)
      vibrateError()
      return
    }

    setStatus(FORM_STATUS.SENDING)
    setErrorMessage('')

    try {
      // Enviar email con EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'lgavegno@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      // Éxito
      setStatus(FORM_STATUS.SUCCESS)
      vibrateSuccess()
      setFormData({ name: '', email: '', message: '' })

      // Volver a estado idle después de 5 segundos
      setTimeout(() => {
        setStatus(FORM_STATUS.IDLE)
      }, 5000)

    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus(FORM_STATUS.ERROR)
      setErrorMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.')
      vibrateError()
    }
  }

  const inputClasses = `
    w-full px-4 py-3 pl-12
    bg-white/5 backdrop-blur-sm
    border border-white/10 rounded-xl
    text-white placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-cobalt-400/50 focus:border-cobalt-400/50
    active:scale-[0.99] active:bg-white/8
    transition-all duration-200
    touch-manipulation
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
                    onFocus={handleFocus}
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
                    onFocus={handleFocus}
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
                    onFocus={handleFocus}
                    className={`${inputClasses} resize-none`}
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                  />
                </div>
              </div>
              
              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === FORM_STATUS.SUCCESS && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-mint-400/10 border border-mint-400/30"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mint-400/20 flex items-center justify-center">
                      <FiCheck className="w-5 h-5 text-mint-400" />
                    </div>
                    <div>
                      <p className="text-mint-400 font-medium">¡Mensaje enviado con éxito!</p>
                      <p className="text-mint-400/70 text-sm">Te responderé lo antes posible.</p>
                    </div>
                  </motion.div>
                )}

                {status === FORM_STATUS.ERROR && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <FiAlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-red-400 font-medium">{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant={status === FORM_STATUS.SUCCESS ? 'success' : 'accent'}
                  size="lg"
                  loading={status === FORM_STATUS.SENDING}
                  disabled={status === FORM_STATUS.SENDING || status === FORM_STATUS.SUCCESS}
                  icon={status === FORM_STATUS.SUCCESS ? <FiCheck /> : <FiSend />}
                  iconPosition="right"
                  className="w-full"
                >
                  {status === FORM_STATUS.SENDING && 'Enviando...'}
                  {status === FORM_STATUS.SUCCESS && '¡Enviado!'}
                  {(status === FORM_STATUS.IDLE || status === FORM_STATUS.ERROR) && 'Enviar mensaje'}
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