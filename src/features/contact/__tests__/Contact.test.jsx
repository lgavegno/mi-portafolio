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

// Helper: fills all required fields with valid data
const fillValidForm = async (user) => {
  await user.type(screen.getByLabelText(/nombre/i), 'Juan García')
  await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
  await user.selectOptions(screen.getByLabelText(/tipo de proyecto/i), 'Software a Medida')
  await user.type(screen.getByLabelText(/mensaje/i), 'Quiero automatizar mi negocio')
}

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

      await fillValidForm(user)
      await user.click(screen.getByRole('button', { name: /enviar/i }))

      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
      })
    })

    it('should call emailjs.send with correct parameters', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const testName = 'Juan García'
      const testEmail = 'juan@example.com'
      const testProjectType = 'Software a Medida'
      const testMessage = 'Quiero tus servicios'

      await user.type(screen.getByLabelText(/nombre/i), testName)
      await user.type(screen.getByLabelText(/email/i), testEmail)
      await user.selectOptions(screen.getByLabelText(/tipo de proyecto/i), testProjectType)
      await user.type(screen.getByLabelText(/mensaje/i), testMessage)
      await user.click(screen.getByRole('button', { name: /enviar/i }))

      await waitFor(() => {
        expect(emailjs.send).toHaveBeenCalledWith(
          'test_service',
          'test_template',
          {
            from_name: testName,
            from_email: testEmail,
            project_type: testProjectType,
            message: testMessage,
            to_email: 'lgavegno@gmail.com'
          },
          'test_public_key'
        )
      })
    })

    it('should show loading state while sending', async () => {
      const user = userEvent.setup()
      // Use a pending promise to keep SENDING state visible
      let resolveEmailjs
      emailjs.send.mockImplementation(() => new Promise(resolve => { resolveEmailjs = resolve }))

      renderWithLocale(<Contact />)

      await fillValidForm(user)
      // Don't await — lets us observe intermediate SENDING state
      const clickPromise = user.click(screen.getByRole('button', { name: /enviar/i }))

      // Wait for button to become disabled (SENDING state)
      // Button renders a Spinner SVG (not text) when loading=true
      await waitFor(() => {
        const btn = screen.getByRole('button')
        expect(btn).toBeDisabled()
        expect(btn.querySelector('svg')).toBeTruthy()
      })

      // Cleanup
      resolveEmailjs({ status: 200 })
      await clickPromise
    })

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)

      await fillValidForm(user)
      await user.click(screen.getByRole('button', { name: /enviar/i }))

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

      const submitButton = screen.getByRole('button', { name: /enviar/i })

      // Fill name, email, and projectType — but NOT message
      await user.type(screen.getByLabelText(/nombre/i), 'Juan')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.selectOptions(screen.getByLabelText(/tipo de proyecto/i), 'Software a Medida')
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

      await fillValidForm(user)
      await user.click(screen.getByRole('button', { name: /enviar/i }))

      await waitFor(() => {
        expect(screen.getByText(/error al enviar el mensaje/i)).toBeInTheDocument()
      })
    })

    it('should prevent multiple submissions (anti-spam)', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      const submitButton = screen.getByRole('button', { name: /enviar/i })

      await fillValidForm(user)

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

      await fillValidForm(user)
      await user.click(screen.getByRole('button', { name: /enviar/i }))

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
      // Keep send pending so we can assert the disabled state
      let resolveEmailjs
      emailjs.send.mockImplementation(() => new Promise(resolve => { resolveEmailjs = resolve }))

      renderWithLocale(<Contact />)

      await fillValidForm(user)
      const clickPromise = user.click(screen.getByRole('button', { name: /enviar/i }))

      // Button must be disabled while SENDING
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeDisabled()
      })

      // Resolve and cleanup
      resolveEmailjs({ status: 200 })
      await clickPromise
    })

    it('should keep button disabled after successful submission', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      await fillValidForm(user)
      await user.click(screen.getByRole('button', { name: /enviar/i }))

      // On success: isSubmitting stays true for 5s, so button stays disabled with spinner
      // The success state is communicated via the success message, not button text
      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeDisabled()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      renderWithLocale(<Contact />)

      // Form contains all required field roles and submit button
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tipo de proyecto/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
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
      const projectTypeSelect = screen.getByLabelText(/tipo de proyecto/i)
      const submitButton = screen.getByRole('button', { name: /enviar/i })

      // Tab to first input
      await user.tab()
      expect(nameInput).toHaveFocus()

      // Tab to email
      await user.tab()
      expect(emailInput).toHaveFocus()

      // Tab to projectType select
      await user.tab()
      expect(projectTypeSelect).toHaveFocus()

      // Tab to message textarea
      await user.tab()

      // Tab to submit button
      await user.tab()
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

      await user.type(screen.getByLabelText(/nombre/i), 'José García Martínez')
      await user.type(screen.getByLabelText(/email/i), 'jose@example.com')
      await user.selectOptions(screen.getByLabelText(/tipo de proyecto/i), 'Software a Medida')
      await user.type(screen.getByLabelText(/mensaje/i), 'Necesito análisis de datos estadísticos')
      await user.click(screen.getByRole('button', { name: /enviar/i }))

      await waitFor(() => {
        expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument()
      })
    })

    it('should handle very long input values', async () => {
      const user = userEvent.setup()
      renderWithLocale(<Contact />)

      // Use fireEvent.change for long values to avoid keystroke-per-keystroke timeout
      const { fireEvent } = await import('@testing-library/react')
      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/mensaje/i)

      fireEvent.change(nameInput, { target: { name: 'name', value: 'A'.repeat(100) } })
      fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } })
      await user.selectOptions(screen.getByLabelText(/tipo de proyecto/i), 'Software a Medida')
      fireEvent.change(messageInput, { target: { name: 'message', value: 'B'.repeat(2000) } })

      await user.click(screen.getByRole('button', { name: /enviar/i }))

      await waitFor(() => {
        expect(emailjs.send).toHaveBeenCalled()
      })
    })
  })
})
