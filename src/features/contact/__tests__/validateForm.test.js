// src/features/contact/__tests__/validateForm.test.js
// Unit tests for Contact form validation logic

import { describe, it, expect } from 'vitest'
import { validateForm } from '../validateForm'

// Fixture: baseline valid object for all four required fields
const validBase = {
  name: 'Juan García',
  email: 'juan@example.com',
  projectType: 'Software a Medida',
  message: 'Quiero contratar tus servicios para mi empresa'
}

describe('Contact Form Validation', () => {
  describe('validateForm - Happy Path', () => {
    it('should accept valid form data with all required fields', () => {
      const result = validateForm(validBase)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
      expect(result.data).toEqual(validBase)
    })

    it('should accept minimal valid data', () => {
      const result = validateForm({ name: 'J', email: 'a@b.co', projectType: 'E-commerce', message: 'Hi' })
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
      expect(result.data.name).toBe('J')
    })

    it('should accept email with special characters (before @)', () => {
      const result = validateForm({ ...validBase, email: 'test.user+tag@example.co.uk' })
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should accept message with special characters and newlines', () => {
      const result = validateForm({ ...validBase, message: 'Line 1\nLine 2\nWith special chars: !@#$%&*()' })
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })
  })

  describe('validateForm - Name Validation', () => {
    it('should reject empty name', () => {
      const result = validateForm({ ...validBase, name: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Por favor, ingresa tu nombre')
    })

    it('should reject name with only whitespace', () => {
      const result = validateForm({ ...validBase, name: '   ' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Por favor, ingresa tu nombre')
    })

    it('should reject name with tabs and newlines', () => {
      const result = validateForm({ ...validBase, name: '\t\n  ' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBeDefined()
    })

    it('should trim whitespace from name before validating', () => {
      const result = validateForm({ ...validBase, name: '  Juan  ' })
      expect(result.isValid).toBe(true)
      expect(result.data.name).toBe('Juan')
    })
  })

  describe('validateForm - Email Validation', () => {
    it('should reject empty email', () => {
      const result = validateForm({ ...validBase, email: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBe('Por favor, ingresa un email válido')
    })

    it('should reject email without @', () => {
      const result = validateForm({ ...validBase, email: 'invalidemail.com' })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBe('Por favor, ingresa un email válido')
    })

    it('should reject email without domain extension', () => {
      const result = validateForm({ ...validBase, email: 'test@example' })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it('should reject email with multiple @ symbols', () => {
      const result = validateForm({ ...validBase, email: 'test@@example.com' })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it('should reject email with spaces', () => {
      const result = validateForm({ ...validBase, email: 'test @example.com' })
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
        const result = validateForm({ ...validBase, email })
        expect(result.isValid).toBe(true)
      })
    })

    it('should trim whitespace from email before validating', () => {
      const result = validateForm({ ...validBase, email: '  test@example.com  ' })
      expect(result.isValid).toBe(true)
      expect(result.data.email).toBe('test@example.com')
    })
  })

  describe('validateForm - Project Type Validation', () => {
    it('should reject empty projectType', () => {
      const result = validateForm({ ...validBase, projectType: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.projectType).toBe('Por favor, selecciona el tipo de proyecto')
    })

    it('should reject null projectType', () => {
      const result = validateForm({ ...validBase, projectType: null })
      expect(result.isValid).toBe(false)
      expect(result.errors.projectType).toBeDefined()
    })

    it('should reject undefined projectType', () => {
      const { projectType: _, ...dataWithoutType } = validBase
      const result = validateForm(dataWithoutType)
      expect(result.isValid).toBe(false)
      expect(result.errors.projectType).toBeDefined()
    })

    it('should reject projectType with only whitespace', () => {
      const result = validateForm({ ...validBase, projectType: '   ' })
      expect(result.isValid).toBe(false)
      expect(result.errors.projectType).toBeDefined()
    })

    it('should accept "Software a Medida"', () => {
      const result = validateForm({ ...validBase, projectType: 'Software a Medida' })
      expect(result.isValid).toBe(true)
      expect(result.data.projectType).toBe('Software a Medida')
    })

    it('should accept "E-commerce"', () => {
      const result = validateForm({ ...validBase, projectType: 'E-commerce' })
      expect(result.isValid).toBe(true)
      expect(result.data.projectType).toBe('E-commerce')
    })

    it('should accept "Análisis de Datos"', () => {
      const result = validateForm({ ...validBase, projectType: 'Análisis de Datos' })
      expect(result.isValid).toBe(true)
      expect(result.data.projectType).toBe('Análisis de Datos')
    })

    it('should accept "Consultoría Técnica"', () => {
      const result = validateForm({ ...validBase, projectType: 'Consultoría Técnica' })
      expect(result.isValid).toBe(true)
      expect(result.data.projectType).toBe('Consultoría Técnica')
    })

    it('should include projectType in normalized data when valid', () => {
      const result = validateForm({ ...validBase, projectType: '  Software a Medida  ' })
      expect(result.isValid).toBe(true)
      expect(result.data.projectType).toBe('Software a Medida')
    })
  })

  describe('validateForm - Message Validation', () => {
    it('should reject empty message', () => {
      const result = validateForm({ ...validBase, message: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.message).toBe('Por favor, escribe un mensaje')
    })

    it('should reject message with only whitespace', () => {
      const result = validateForm({ ...validBase, message: '    ' })
      expect(result.isValid).toBe(false)
      expect(result.errors.message).toBeDefined()
    })

    it('should trim whitespace from message before validating', () => {
      const result = validateForm({ ...validBase, message: '  Quiero contratar servicios  ' })
      expect(result.isValid).toBe(true)
      expect(result.data.message).toBe('Quiero contratar servicios')
    })

    it('should accept messages with minimal length', () => {
      const result = validateForm({ ...validBase, message: 'Hi' })
      expect(result.isValid).toBe(true)
    })

    it('should accept very long messages', () => {
      const result = validateForm({ ...validBase, message: 'A'.repeat(1000) })
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateForm - Error Priority', () => {
    it('should include name error when empty', () => {
      const result = validateForm({ ...validBase, name: '', email: 'invalid-email' })
      expect(result.errors.name).toBe('Por favor, ingresa tu nombre')
    })

    it('should include email and message errors simultaneously', () => {
      const result = validateForm({ ...validBase, email: 'invalid-email', message: '' })
      expect(result.errors.email).toBe('Por favor, ingresa un email válido')
      expect(result.errors.message).toBe('Por favor, escribe un mensaje')
    })

    it('should return all errors when all fields are invalid', () => {
      const result = validateForm({ name: '', email: '', projectType: '', message: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBeDefined()
      expect(result.errors.email).toBeDefined()
      expect(result.errors.projectType).toBeDefined()
      expect(result.errors.message).toBeDefined()
    })
  })

  describe('validateForm - Edge Cases', () => {
    it('should handle null input gracefully', () => {
      expect(() => validateForm(null)).not.toThrow()
      const result = validateForm(null)
      expect(result.isValid).toBe(false)
      expect(result.data).toEqual({ name: '', email: '', projectType: '', message: '' })
    })

    it('should handle null field values gracefully', () => {
      expect(() => {
        validateForm({ name: null, email: null, projectType: null, message: null })
      }).not.toThrow()
    })

    it('should handle unicode characters in name', () => {
      const result = validateForm({ ...validBase, name: 'José García Martínez' })
      expect(result.isValid).toBe(true)
    })

    it('should handle unicode characters in message', () => {
      const result = validateForm({
        ...validBase,
        message: 'Necesito ayuda con análisis de datos: estadísticas, gráficos, etc.'
      })
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
        const result = validateForm({ ...validBase, email })
        expect(result.isValid).toBe(true)
      })
    })
  })
})
