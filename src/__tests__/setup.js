// src/__tests__/setup.js
// Vitest setup file - runs before all tests

import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia (for responsive components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver (for lazy loading)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock EmailJS (for Contact Form tests)
vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(() => Promise.resolve({ status: 200 })),
  },
}))

// Mock Framer Motion (reduces render overhead in tests)
vi.mock('framer-motion', async () => {
  const React = await import('react')

  // Filter out motion-specific props that aren't valid DOM attributes
  const filterMotionProps = (props) => {
    const motionProps = [
      'variants', 'initial', 'animate', 'exit', 'transition',
      'whileHover', 'whileTap', 'whileInView', 'whileDrag',
      'whileFeatureInView', 'whileFocus', 'whileGroup',
      'viewport', 'layout', 'layoutId', 'drag', 'dragConstraints'
    ]

    return Object.keys(props).reduce((acc, key) => {
      if (!motionProps.includes(key)) {
        acc[key] = props[key]
      }
      return acc
    }, {})
  }

  const createMotionComponent = (tag) => {
    return ({ children, ...props }) =>
      React.createElement(tag, filterMotionProps(props), children)
  }

  return {
    motion: {
      div: createMotionComponent('div'),
      h2: createMotionComponent('h2'),
      p: createMotionComponent('p'),
      section: createMotionComponent('section'),
      span: createMotionComponent('span'),
      button: createMotionComponent('button'),
      form: createMotionComponent('form'),
    },
    AnimatePresence: ({ children }) => children,
  }
})

// Suppress console warnings in tests (optional)
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('act(...)'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Not implemented: HTMLFormElement.prototype.submit')
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Set test environment variables
process.env.VITE_EMAILJS_SERVICE_ID = 'test_service_id'
process.env.VITE_EMAILJS_TEMPLATE_ID = 'test_template_id'
process.env.VITE_EMAILJS_PUBLIC_KEY = 'test_public_key'
