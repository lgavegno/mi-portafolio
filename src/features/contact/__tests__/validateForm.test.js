// src/features/contact/__tests__/validateForm.test.js
// Unit tests for Contact form validation logic

import { describe, it, expect } from 'vitest'
import { validateForm } from '../validateForm'

describe('Contact Form Validation', () => {
  describe('validateForm - Happy Path', () => {
    it('should accept valid form data (name, email, message)', () => {
      const validData = {
        name: 'Juan García',
        email: 'juan@example.com',
        message: 'Quiero contratar tus servicios para mi empresa'
      }

      const result = validateForm(validData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
      expect(result.data).toEqual({
        name: 'Juan García',
        email: 'juan@example.com',
        message: 'Quiero contratar tus servicios para mi empresa'
      })
    })

    it('should accept minimal valid data', () => {
      const minimalData = {
        name: 'J',
        email: 'a@b.co',
        message: 'Hi'
      }

      const result = validateForm(minimalData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
      expect(result.data.name).toBe('J')
    })

    it('should accept email with special characters (before @)', () => {
      const data = {
        name: 'Test',
        email: 'test.user+tag@example.co.uk',
        message: 'Message here'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should accept message with special characters and newlines', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        message: 'Line 1\nLine 2\nWith special chars: !@#$%&*()'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
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
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Por favor, ingresa tu nombre')
    })

    it('should reject name with only whitespace', () => {
      const data = {
        name: '   ',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Por favor, ingresa tu nombre')
    })

    it('should reject name with tabs and newlines', () => {
      const data = {
        name: '\t\n  ',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBeDefined()
    })

    it('should trim whitespace from name before validating', () => {
      const data = {
        name: '  Juan  ',
        email: 'test@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
      expect(result.data.name).toBe('Juan')
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
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBe('Por favor, ingresa un email válido')
    })

    it('should reject email without @', () => {
      const data = {
        name: 'Juan',
        email: 'invalidemail.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBe('Por favor, ingresa un email válido')
    })

    it('should reject email without domain extension', () => {
      const data = {
        name: 'Juan',
        email: 'test@example',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it('should reject email with multiple @ symbols', () => {
      const data = {
        name: 'Juan',
        email: 'test@@example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it('should reject email with spaces', () => {
      const data = {
        name: 'Juan',
        email: 'test @example.com',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
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
        const result = validateForm(data)
        expect(result.isValid).toBe(true)
      })
    })

    it('should trim whitespace from email before validating', () => {
      const data = {
        name: 'Juan',
        email: '  test@example.com  ',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
      expect(result.data.email).toBe('test@example.com')
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
      expect(result.isValid).toBe(false)
      expect(result.errors.message).toBe('Por favor, escribe un mensaje')
    })

    it('should reject message with only whitespace', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: '    '
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.message).toBeDefined()
    })

    it('should trim whitespace from message before validating', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: '  Quiero contratar servicios  '
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
      expect(result.data.message).toBe('Quiero contratar servicios')
    })

    it('should accept messages with minimal length', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: 'Hi'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
    })

    it('should accept very long messages', () => {
      const longMessage = 'A'.repeat(1000)
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: longMessage
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateForm - Error Priority', () => {
    it('should include name error when empty', () => {
      const data = {
        name: '',
        email: 'invalid-email',
        message: 'Message'
      }

      const result = validateForm(data)
      expect(result.errors.name).toBe('Por favor, ingresa tu nombre')
    })

    it('should include email error when invalid', () => {
      const data = {
        name: 'Juan',
        email: 'invalid-email',
        message: ''
      }

      const result = validateForm(data)
      expect(result.errors.email).toBe('Por favor, ingresa un email válido')
      expect(result.errors.message).toBe('Por favor, escribe un mensaje')
    })

    it('should return all errors when multiple fields are invalid', () => {
      const data = {
        name: '',
        email: '',
        message: ''
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBeDefined()
      expect(result.errors.email).toBeDefined()
      expect(result.errors.message).toBeDefined()
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

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
    })

    it('should handle unicode characters in message', () => {
      const data = {
        name: 'Juan',
        email: 'test@example.com',
        message: 'Necesito ayuda con análisis de datos: estadísticas, gráficos, etc.'
      }

      const result = validateForm(data)
      expect(result.isValid).toBe(true)
    })

    it('should accept emails from different country TLDs', () => {
      const validEmails = [
        'test@example.com',
        'test@example.ar',
        'test@example.mx',
        'test@example.es',
        'test@example.io',
        'test@example.museum'
      ]

      validEmails.forEach(email => {
        const data = {
          name: 'Test',
          email,
          message: 'Message'
        }
        const result = validateForm(data)
        expect(result.isValid).toBe(true)
      })
    })
  })
})
