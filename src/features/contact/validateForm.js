/**
 * Form validation logic for Contact form
 * Handles null values, whitespace, and email format validation
 */

export const validateForm = (data) => {
  // 1. Manejo de nulos (Edge Case)
  if (!data) return false

  const name = (data.name || "").trim()
  const email = (data.email || "").trim()
  const message = (data.message || "").trim()

  // 2. Validaciones
  if (name.length === 0) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return false

  if (message.length === 0) return false

  return true
}

/**
 * Get validation error message in Spanish
 * Returns null if validation passes
 */
export const getValidationError = (data) => {
  if (!data) return null

  const name = (data.name || "").trim()
  const email = (data.email || "").trim()
  const message = (data.message || "").trim()

  if (name.length === 0) {
    return 'Por favor, ingresa tu nombre'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Por favor, ingresa un email válido'
  }

  if (message.length === 0) {
    return 'Por favor, escribe un mensaje'
  }

  return null
}
