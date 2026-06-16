export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn(`[trackEvent] ${eventName}`, params, e)
    }
  }
}
