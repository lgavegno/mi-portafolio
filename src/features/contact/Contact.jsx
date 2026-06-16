// src/features/contact/Contact.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMail, FiUser, FiMessageSquare, FiCheck, FiAlertCircle, FiBriefcase, FiClock } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { fadeInUp, staggerContainer } from '../../config/motionConfig'
import Button from '../../components/ui/Button'
import { useVibrate } from '../../hooks/useVibrate'
import { useLocale } from '../../hooks/useLocale'
import { validateForm } from './validateForm'

// Estados del formulario
const FORM_STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error'
}

const Contact = () => {
  const { t } = useLocale()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  })
  const [status, setStatus] = useState(FORM_STATUS.IDLE)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Validación del formulario
  const handleValidateForm = () => {
    const { isValid, errors } = validateForm(formData)
    if (!isValid) {
      // Show first error encountered
      const firstError = Object.values(errors)[0]
      setErrorMessage(firstError)
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    // CRITICAL: Persist event immediately for Safari (prevents React event recycling)
    if (e && e.persist) e.persist();

    // Protección: PreventDefault seguro
    if (e && e.preventDefault) e.preventDefault();

    // Anti-spam: Prevent double submit
    if (isSubmitting) return;

    // IMPORTANT: Validate FIRST (before any state changes that could break Safari user activation)
    if (!handleValidateForm()) {
      setStatus(FORM_STATUS.ERROR);
      vibrateError();
      return;
    }

    // Set submitting flag to prevent spam
    setIsSubmitting(true);

    // NOW set sending status (after validation passes)
    setStatus(FORM_STATUS.SENDING);
    setErrorMessage('');


    try {
      // Direct EmailJS call - no delays or intermediate steps
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.projectType,
          message: formData.message,
          to_email: import.meta.env.VITE_CONTACT_EMAIL
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Éxito
      setStatus(FORM_STATUS.SUCCESS);
      vibrateSuccess();
      setFormData({ name: '', email: '', projectType: '', message: '' });

      // Volver a estado idle después de 5 segundos
      setTimeout(() => {
        setStatus(FORM_STATUS.IDLE);
        setIsSubmitting(false);
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);

      setStatus(FORM_STATUS.ERROR);
      setErrorMessage(t.contact.messages.errorDefault);
      vibrateError();

      // Reset submit flag after 3 seconds to allow retry
      setTimeout(() => {
        setIsSubmitting(false);
      }, 3000);
    }
  }

  const inputClasses = `
    w-full px-4 py-3 pl-12
    bg-[#F1F0E8]/8 backdrop-blur-sm
    border border-[#ADC4CE]/25 rounded-xl
    text-[#F1F0E8] placeholder-[rgba(241,240,232,0.35)]
    focus:outline-none focus:ring-2 focus:ring-[#ADC4CE]/50 focus:border-[#ADC4CE]/50
    active:scale-[0.99] active:bg-white/8
    transition-all duration-200
    touch-manipulation
  `

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#2C3340] to-[#1a1f28] py-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#ADC4CE]/8 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#96B6C5]/5 rounded-full filter blur-[128px]" />
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ADC4CE]/15 border border-[#ADC4CE]/30 text-[#ADC4CE] text-sm font-medium mb-6">
              <FiMail className="w-4 h-4" />
              {t.contact.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F1F0E8] mb-4">
              {t.contact.title}
            </h2>
            <p className="text-[rgba(241,240,232,0.65)] text-xl max-w-2xl mx-auto">
              {t.contact.description}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeInUp}
            className="glass-card bg-[#F1F0E8]/5 border border-[#ADC4CE]/15 p-8"
          >
            <form aria-label="Formulario de contacto"
              onSubmit={(e) => {
                if (e && e.preventDefault) e.preventDefault();
                handleSubmit(e);
              }}
              noValidate
              className="space-y-6"
            >
              {/* Name field */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-[rgba(241,240,232,0.75)] mb-2">
                  {t.contact.form.labels.name}
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(241,240,232,0.35)] w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className={inputClasses}
                    placeholder={t.contact.form.placeholders.name}
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-[rgba(241,240,232,0.75)] mb-2">
                  {t.contact.form.labels.email}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(241,240,232,0.35)] w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className={inputClasses}
                    placeholder={t.contact.form.placeholders.email}
                    maxLength={150}
                    required
                  />
                </div>
              </div>

              {/* Project type field */}
              <div className="relative">
                <label htmlFor="projectType" className="block text-sm font-medium text-[rgba(241,240,232,0.75)] mb-2">
                  {t.contact.form.labels.projectType}
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(241,240,232,0.35)] w-5 h-5 pointer-events-none z-10" />
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    required
                  >
                    <option value="" disabled className="bg-[#2C3340]">{t.contact.form.placeholders.projectType}</option>
                    {t.contact.form.projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#2C3340]">{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message field */}
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-[rgba(241,240,232,0.75)] mb-2">
                  {t.contact.form.labels.message}
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-[rgba(241,240,232,0.35)] w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className={`${inputClasses} resize-none`}
                    placeholder={t.contact.form.placeholders.message}
                    maxLength={2000}
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
                      <p className="text-mint-400 font-medium">{t.contact.messages.successTitle}</p>
                      <p className="text-mint-400/70 text-sm">{t.contact.messages.successDescription}</p>
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
              <div className="pt-4 space-y-3">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant={status === FORM_STATUS.SUCCESS ? 'success' : 'accent'}
                  size="lg"
                  loading={status === FORM_STATUS.SENDING || isSubmitting}
                  disabled={status === FORM_STATUS.SENDING || status === FORM_STATUS.SUCCESS || isSubmitting}
                  icon={status === FORM_STATUS.SUCCESS ? <FiCheck /> : <FiSend />}
                  iconPosition="right"
                  className="w-full cursor-pointer"
                >
                  {(status === FORM_STATUS.SENDING || isSubmitting) && t.contact.buttons.submitting}
                  {status === FORM_STATUS.SUCCESS && t.contact.buttons.success}
                  {(status === FORM_STATUS.IDLE || status === FORM_STATUS.ERROR) && !isSubmitting && t.contact.buttons.submit}
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-[rgba(241,240,232,0.40)]">
                  <FiClock className="w-3.5 h-3.5" />
                  {t.contact.messages.responseTime}
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact