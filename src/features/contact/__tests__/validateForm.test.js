// src/features/contact/__tests__/validateForm.test.js
// Unit tests for Contact form validation logic

import { describe, it, expect } from 'vitest'
import { validateForm, getValidationError } from '../validateForm'

describe('Contact Form Validation', () => {
  describe('validateForm - Happy Path', () => {
    it('should accept valid form data (name, email, message)', () => {
      const validData = {
        name: 'Juan García',
        email: 'juan@example.com',
        message: 'Quiero contratar tus servicios para mi empresa'
      }

      const result = validateForm(validData)
      expect(result).toBe(true)
    })

    it('should accept minimal valid data', () => {
      const minimalData = {
        name: 'J',
        email: 'a@b.co',
        message: 'Hi'
      }

      const result = validateForm(minimalData)
      expect(result).toBe(true)
    })

    it('should accept email with special characters (before @)', () => {
      const data = {
        name: 'Test',
        email: 'test.user+tag@example.co.uk',
        message: 'Message here'
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })

    it('should accept message with special characters and newlines', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        message: 'Line 1\nLine 2\nWith special chars: !@#$%&*()'
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })
  })

  describe('validateForm - Name Validation', () => {
    it('should reject empty name', () => {
      const data = {
        name: '',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      const error = getValidationError(data)
      expect(result).toBe(false)
      expect(error).toBe('Por favor, ingresa tu nombre')
    })

    it('should reject name with only whitespace', () => {
      const data = {
        name: '   ',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      const error = getValidationError(data)
      expect(result).toBe(false)
      expect(error).toBe('Por favor, ingresa tu nombre')
    })

    it('should reject name with tabs and newlines', () => {
      const data = {
        name: '\t\n  ',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result).toBe(false)
    })

    it('should trim whitespace from name before validating', () => {
      const data = {
        name: '  Juan  ',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })
  })

  describe('validateForm - Email Validation', () => {
    it('should reject empty email', () => {
      const data = {
        name: 'Juan',
        email: '',
        message: 'Message'
      }

      const result = validateForm(data)
      const error = getValidationError(data)
      expect(result).toBe(false)
      expect(error).toBe('Por favor, ingresa un email válido')
    })

    it('should reject email without @', () => {
      const data = {
        name: 'Juan',
        email: 'invalidemail.com',
        message: 'Message'
      }

      const result = validateForm(data)
      const error = getValidationError(data)
      expect(result).toBe(false)
      expect(error).toBe('Por favor, ingresa un email válido')
    })

    it('should reject email without domain extension', () => {
      const data = {
        name: 'Juan',
        email: 'test@example',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result).toBe(false)
    })

    it('should reject email with multiple @ symbols', () => {
      const data = {
        name: 'Juan',
        email: 'test@@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result).toBe(false)
    })

    it('should reject email with spaces', () => {
      const data = {
        name: 'Juan',
        email: 'test @example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result).toBe(false)
    })

    it('should accept valid emails with subdomains', () => {
      const validEmails = [
        'test@mail.example.com',
        'user.name@example.co.uk',
        'info@subdomain.example.org',
        'admin+tag@example.com'
      ]

      validEmails.forEach(email => {
        const data = {
          name: 'Test',
          email,
          message: 'Message'
        }
        expect(validateForm(data)).toBe(true)
      })
    })

    it('should trim whitespace from email before validating', () => {
      const data = {
        name: 'Juan',
        email: '  test@example.com  ',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })
  })

  describe('validateForm - Message Validation', () => {
    it('should reject empty message', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: ''
      }

      const result = validateForm(data)
      const error = getValidationError(data)
      expect(result).toBe(false)
      expect(error).toBe('Por favor, escribe un mensaje')
    })

    it('should reject message with only whitespace', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: '    '
      }

      const result = validateForm(data)
      expect(result).toBe(false)
    })

    it('should trim whitespace from message before validating', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: '  Quiero contratar servicios  '
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })

    it('should accept messages with minimal length', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: 'Hi'
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })

    it('should accept very long messages', () => {
      const longMessage = 'A'.repeat(1000) // 1000 characters
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: longMessage
      }

      const result = validateForm(data)
      expect(result).toBe(true)
    })
  })

  describe('validateForm - Error Priority', () => {
    it('should check name before email', () => {
      const data = {
        name: '',
        email: 'invalid-email',
        message: 'Message'
      }

      const error = getValidationError(data)
      expect(error).toBe('Por favor, ingresa tu nombre')
    })

    it('should check email before message', () => {
      const data = {
        name: 'Juan',
        email: 'invalid-email',
        message: ''
      }

      const error = getValidationError(data)
      expect(error).toBe('Por favor, ingresa un email válido')
    })

    it('should return name error when all fields are empty', () => {
      const data = {
        name: '',
        email: '',
        message: ''
      }

      const error = getValidationError(data)
      expect(error).toContain('nombre')
    })
  })

  describe('validateForm - Edge Cases', () => {
    it('should handle null values gracefully', () => {
      expect(() => {
        validateForm({ name: null, email: null, message: null })
      }).not.toThrow()
    })

    it('should handle unicode characters in name', () => {
      const data = {
        name: 'José García Martínez',
        email: 'jose@example.com',
        message: 'Quiero automatizar mi proceso'
      }

      expect(validateForm(data)).toBe(true)
    })

    it('should handle unicode characters in message', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: 'Necesito ayuda con análisis de datos: estadísticas, gráficos, etc.'
      }

      expect(validateForm(data)).toBe(true)
    })

    it('should accept emails from different country TLDs', () => {
      const validEmails = [
        'test@example.com',    // .com
        'test@example.ar',     // .ar (Argentina)
        'test@example.mx',     // .mx (Mexico)
        'test@example.es',     // .es (Spain)
        'test@example.io',     // .io
        'test@example.museum', // long TLD
      ]

      validEmails.forEach(email => {
        const data = {
          name: 'Test',
          email,
          message: 'Message'
        }
        expect(validateForm(data)).toBe(true)
      })
    })
  })
})
