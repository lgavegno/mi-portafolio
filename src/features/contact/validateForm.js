/**
 * Validates Contact form data with pure function contract
 *
 * @param {Object} data - Form data object
 * @param {string} data.name - User name
 * @param {string} data.email - User email
 * @param {string} data.message - User message
 *
 * @returns {Object} Validation result object
 * @returns {boolean} .isValid - True if all fields are valid
 * @returns {Object} .errors - Object mapping field names to error messages (empty if valid)
 * @returns {Object} .data - Normalized form data (trimmed strings)
 *
 * @example
 * const result = validateForm({ name: 'Juan', email: 'juan@test.com', message: 'Hola' })
 * // { isValid: true, errors: {}, data: { name: 'Juan', email: 'juan@test.com', message: 'Hola' } }
 *
 * const result = validateForm({ name: '', email: 'invalid', message: '' })
 * // { isValid: false, errors: { name: 'Por favor, ingresa tu nombre' }, data: { name: '', email: 'invalid', message: '' } }
 */
export const validateForm = (data) => {
  const errors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

  if (!data) {
    return {
      isValid: false,
      errors: { form: 'Datos de formulario inválidos' },
      data: { name: '', email: '', message: '' }
    }
  }

  const normalizedData = {
    name: (data.name || '').trim(),
    email: (data.email || '').trim(),
    message: (data.message || '').trim()
  }

  if (normalizedData.name.length === 0) {
    errors.name = 'Por favor, ingresa tu nombre'
  }

  if (!emailRegex.test(normalizedData.email)) {
    errors.email = 'Por favor, ingresa un email válido'
  }

  if (normalizedData.message.length === 0) {
    errors.message = 'Por favor, escribe un mensaje'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: normalizedData
  }
}
