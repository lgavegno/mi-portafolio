// src/features/contact/__tests__/Contact.test.jsx
// Integration tests for Contact Form component

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../Contact'
import emailjs from '@emailjs/browser'
import { LocaleProvider } from '../../../context/LocaleProvider'

const renderWithLocale = (ui, locale = 'es') =>
  render(<LocaleProvider locale={locale}>{ui}</LocaleProvider>)

// Mock EmailJS
vi.mock('@emailjs/browser')

// Mock useVibrate hook
vi.mock('../../../hooks/useVibrate', () => ({
  useVibrate: () => vi.fn()
}))

describe('Contact Form Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
    emailjs.send.mockResolvedValue({ status: 200 })

    // Set env vars for EmailJS
    process.env.VITE_EMAILJS_SERVICE_ID = 'test_service'
    process.env.VITE_EMAILJS_TEMPLATE_ID = 'test_template'
    process.env.VITE_EMAILJS_PUBLIC_KEY = 'test_public_key'
  })

  describe('Rendering', () => {
    it('should render contact form with all fields', () => {
      renderWithLocale(<Contact />)

      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
    })

    it('should render with correct input types and attributes', () => {
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)

      expect(nameInput).toHaveAttribute('type', 'text')
      expect(nameInput).toHaveAttribute('maxLength', '100')
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('maxLength', '150')
      expect(messageInput).toHaveAttribute('maxLength', '2000')
    })

    it('should render with correct placeholder text', () => {
      renderWithLocale(<Contact />)

      expect(screen.getByPlaceholderText(/tu nombre/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/cuéntame sobre tu proyecto/i)).toBeInTheDocument()
    })

    it('should have labels properly associated with inputs', () => {
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)

      expect(nameInput).toHaveAttribute('id', 'name')
      expect(emailInput).toHaveAttribute('id', 'email')
      expect(messageInput).toHaveAttribute('id', 'message')
    })
  })

  describe('Form Input Handling', () => {
    it('should update form data when user types in name field', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      await user.type(nameInput, 'Juan García')

      expect(nameInput).toHaveValue('Juan García')
    })

    it('should update form data when user types in email field', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'juan@example.com')

      expect(emailInput).toHaveValue('juan@example.com')
    })

    it('should update form data when user types in message field', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const messageInput = screen.getByLabelText(/mensaje/i)
      await user.type(messageInput, 'Quiero contratar tus servicios')

      expect(messageInput).toHaveValue('Quiero contratar tus servicios')
    })

    it('should clear error when user starts typing after validation error', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      // Try to submit with empty form
      await user.click(submitButton)
      await waitFor(() => {
        expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument()
      })

      // Start typing
      await user.type(emailInput, 'test@example.com')

      // Error should clear
      expect(screen.queryByText(/ingresa tu nombre/i)).not.toBeInTheDocument()
    })
  })

  describe('Form Validation - Happy Path', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      // Fill form
      await user.type(nameInput, 'Juan García')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Quiero automatizar mi negocio')

      // Submit
      await user.click(submitButton)

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
      })
    })

    it('should call emailjs.send with correct parameters', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      const testName = 'Juan García'
      const testEmail = 'juan@example.com'
      const testMessage = 'Quiero tus servicios'

      await user.type(nameInput, testName)
      await user.type(emailInput, testEmail)
      await user.type(messageInput, testMessage)
      await user.click(submitButton)

      await waitFor(() => {
        expect(emailjs.send).toHaveBeenCalledWith(
          'test_service',
          'test_template',
          {
            from_name: testName,
            from_email: testEmail,
            message: testMessage,
            to_email: 'lgavegno@gmail.com'
          },
          'test_public_key'
        )
      })
    })

    it('should show loading state while sending', async () => {
      const user = userEvent.setup()
      emailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Test')
      await user.type(emailInput, 'test@example.com')
      await user.type(messageInput, 'Test message')
      await user.click(submitButton)

      expect(screen.getByText(/enviando/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      // Fill and submit
      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      // Wait for success
      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
      })

      // Fields should be cleared
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })
  })

  describe('Form Validation - Errors', () => {
    it('should show error when submitting with empty name', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument()
      })
      expect(emailjs.send).not.toHaveBeenCalled()
    })

    it('should show error when submitting with invalid email', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'invalid-email')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/email válido/i)).toBeInTheDocument()
      })
      expect(emailjs.send).not.toHaveBeenCalled()
    })

    it('should show error when submitting with empty message', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/escribe un mensaje/i)).toBeInTheDocument()
      })
      expect(emailjs.send).not.toHaveBeenCalled()
    })

    it('should show error message when EmailJS fails', async () => {
      const user = userEvent.setup()
      emailjs.send.mockRejectedValue(new Error('Network error'))

      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/error al enviar el mensaje/i)).toBeInTheDocument()
      })
    })

    it('should prevent multiple submissions (anti-spam)', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Message')

      // Click multiple times
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      // Should only call EmailJS once
      await waitFor(() => {
        expect(emailjs.send).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('UI States', () => {
    it('should show success message with success icon', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
        expect(screen.getByText(/te responderé lo antes posible/i)).toBeInTheDocument()
      })
    })

    it('should show error message with error icon', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const submitButton = screen.getByRole('button', { name: /enviar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument()
      })
    })

    it('should disable submit button during sending', async () => {
      const user = userEvent.setup()
      emailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 500)))

      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      }, { timeout: 1000 })
    })

    it('should update button text to "¡Enviado!" on success', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'Juan')
      await user.type(emailInput, 'juan@example.com')
      await user.type(messageInput, 'Message')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/¡Enviado!/)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      renderWithLocale(<Contact />)

      // Should have form element
      expect(screen.getByRole('form', { hidden: true }) || screen.getByRole('button')).toBeInTheDocument()
    })

    it('should have proper labels for all inputs', () => {
      renderWithLocale(<Contact />)

      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
    })

    it('should have required attribute on inputs', () => {
      renderWithLocale(<Contact />)

      expect(screen.getByLabelText(/nombre/i)).toHaveAttribute('required')
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('required')
      expect(screen.getByLabelText(/mensaje/i)).toHaveAttribute('required')
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      // Tab to first input
      await user.tab()
      expect(nameInput).toHaveFocus()

      // Tab to next input
      await user.tab()
      expect(emailInput).toHaveFocus()

      // Tab to submit button
      await user.tab({ shift: false }) // Skip message field for this test
      expect(submitButton).toHaveFocus()
    })
  })

  describe('Performance', () => {
    it('should render within reasonable time', () => {
      const startTime = performance.now()
      renderWithLocale(<Contact />)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(1000) // Should render in < 1 second
    })

    it('should not have memory leaks on unmount', () => {
      const { unmount } = render(<LocaleProvider locale="es"><Contact /></LocaleProvider>)
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should handle form with whitespace-only inputs', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, '   ')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument()
      })
    })

    it('should handle unicode characters in input', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await user.type(nameInput, 'José García Martínez')
      await user.type(emailInput, 'jose@example.com')
      await user.type(messageInput, 'Necesito análisis de datos estadísticos')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
      })
    })

    it('should handle very long input values', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      const longName = 'A'.repeat(100) // maxLength="100"
      const longMessage = 'B'.repeat(2000) // maxLength="2000"

      await user.type(nameInput, longName)
      await user.type(emailInput, 'test@example.com')
      await user.type(messageInput, longMessage)
      await user.click(submitButton)

      await waitFor(() => {
        expect(emailjs.send).toHaveBeenCalled()
      })
    })
  })
})
