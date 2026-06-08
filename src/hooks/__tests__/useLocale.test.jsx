import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useLocale } from '../useLocale'
import { LocaleProvider } from '../../context/LocaleProvider'

const wrapper = (locale) =>
  ({ children }) => <LocaleProvider locale={locale}>{children}</LocaleProvider>

describe('useLocale', () => {
  it('throws when used outside LocaleProvider', () => {
    expect(() => renderHook(() => useLocale())).toThrow(
      'useLocale must be used within a LocaleProvider'
    )
  })

  it('resolves locale "en" and returns t object', () => {
    const { result } = renderHook(() => useLocale(), { wrapper: wrapper('en') })
    expect(result.current.locale).toBe('en')
    expect(result.current.t).toBeDefined()
    expect(result.current.t.common).toBeDefined()
    expect(result.current.t.hero).toBeDefined()
    expect(result.current.t.contact).toBeDefined()
  })

  it('resolves locale "es" and returns t object', () => {
    const { result } = renderHook(() => useLocale(), { wrapper: wrapper('es') })
    expect(result.current.locale).toBe('es')
    expect(result.current.t).toBeDefined()
    expect(result.current.t.common).toBeDefined()
    expect(result.current.t.hero).toBeDefined()
    expect(result.current.t.contact).toBeDefined()
  })

  it('en and es t objects have different string values', () => {
    const { result: en } = renderHook(() => useLocale(), { wrapper: wrapper('en') })
    const { result: es } = renderHook(() => useLocale(), { wrapper: wrapper('es') })
    expect(en.current.t.contact.badge).not.toBe(es.current.t.contact.badge)
  })
})
