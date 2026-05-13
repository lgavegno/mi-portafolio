# UC-01 — Contact Form Submission

**ID:** UC-01
**Título:** Submit contact form and send email via EmailJS
**Actores:** End User (cliente potencial)
**Prioridad:** CRÍTICA (lead generation)
**Precondiciones:** Página cargada, Contact Form visible
**Postcondiciones:** Email enviado OR error mostrado y forma en estado inicial

---

## 1. Actores

| Actor | Descripción | Rol |
|-------|-------------|-----|
| **End User** | Visitante del portfolio | Inicia el flujo, completa forma, verifica feedback |
| **ContactForm Component** | src/features/contact/Contact.jsx | Orquesta validación, estado, envío |
| **EmailJS Service** | @emailjs/browser | Envía email via SMTP |
| **Backend (opcional)** | No usado actualmente | Podría loggear contactos en futuro |

---

## 2. Precondiciones

- ✅ Usuario está en home page (/, sección #contacto)
- ✅ Contact Form componente está renderizado y visible
- ✅ VITE_EMAILJS_PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID están en .env
- ✅ Browser tiene soporte para fetch/Promise

---

## 3. Happy Path (Flujo exitoso)

```
Paso 1: Usuario visualiza Contact Form
  → Forma mostrando 3 campos: Name, Email, Message
  → Campos vacíos, estado inicial IDLE
  → Botón "Enviar" deshabilitado (si validación fallida)

Paso 2: Usuario ingresa nombre
  → e.target.name = "name", e.target.value = "Juan"
  → setFormData: { name: "Juan", email: "", message: "" }
  → Si estaba en estado ERROR: resetea a IDLE

Paso 3: Usuario ingresa email
  → e.target.value = "juan@example.com"
  → setFormData: { ..., email: "juan@example.com" }

Paso 4: Usuario ingresa mensaje
  → e.target.value = "Quiero contratar tus servicios"
  → setFormData: { ..., message: "Quiero contratar..." }
  → Todos los campos completados ✓

Paso 5: Usuario hace focus en campo (opcional)
  → useVibrate() ejecuta haptic feedback (5ms)
  → [Desktop: sin efecto, Mobile: vibración corta]

Paso 6: Usuario clickea botón "Enviar"
  → handleSubmit() llamado
  → validateForm() ejecuta:
      ✓ name.length > 0?
      ✓ email.match(/^[^@]+@[^@]+\.[^@]+$/)? (regex simple)
      ✓ message.length > 10?
  → Si validación OK: continuar a Paso 7
  → Si validación FALLA: mostrar error inline (ver Flujo Alternativo 1)

Paso 7: Estado = SENDING, botón deshabilitado
  → setStatus(FORM_STATUS.SENDING)
  → setIsSubmitting(true)
  → Spinner/loading indicator visible

Paso 8: EmailJS.send() llamado
  → serviceId: VITE_EMAILJS_SERVICE_ID
  → templateId: VITE_EMAILJS_TEMPLATE_ID
  → templateParams: { from_name, from_email, message }
  → publicKey: VITE_EMAILJS_PUBLIC_KEY

Paso 9: Respuesta exitosa (200 OK)
  → setStatus(FORM_STATUS.SUCCESS)
  → vibrateSuccess() ejecuta haptic (50ms)
  → Toast/alert mostrando "Email enviado correctamente"
  → setFormData({name: "", email: "", message: ""}) — forma limpiada

Paso 10: Usuario puede enviar otro email (volver a Paso 2)
  → Forma está en estado inicial después de 3-5 segundos
```

**Tiempo esperado:** 30-60 segundos (entrada de usuario)

---

## 4. Flujos Alternativos

### Alternativa 1: Validación falla
```
Usuario clickea "Enviar" pero forma incompleta o email inválido
  → validateForm() devuelve false
  → setStatus(FORM_STATUS.ERROR)
  → setErrorMessage("Por favor completa todos los campos correctamente")
  → vibrateError() ejecuta haptic (100ms)
  → Error mostrado en rojo debajo del campo correspondiente
  → Botón permanece habilitado (usuario puede corregir)
  → Cuando usuario escribe nuevamente:
      → status se resetea a IDLE
      → errorMessage limpiado
```

**Trigger:** Usuario deja campo vacío, email sin @, o mensaje <10 caracteres

---

### Alternativa 2: Network timeout o error temporal
```
EmailJS.send() no responde en timeout (5-10s)
  → Promise rechazada
  → catch block ejecuta:
      setStatus(FORM_STATUS.ERROR)
      setErrorMessage("Fallo de conexión. Intenta nuevamente.")
      vibrateError(100)
  → Usuario puede reintentar
```

**Trigger:** Usuario sin internet, servicio EmailJS caído, CORS error

---

### Alternativa 3: Quota excedido en EmailJS
```
EmailJS devuelve error 429 o "quota exceeded"
  → setStatus(FORM_STATUS.ERROR)
  → setErrorMessage("Demasiados intentos. Intenta más tarde.")
  → Form resetea después de 10s
```

**Trigger:** Usuario (o bot) envía múltiples emails en poco tiempo

---

## 5. Excepciones (Fallos esperados y manejo)

| Excepción | Causa | Manejo | Experiencia Usuario |
|-----------|-------|--------|-------------------|
| **Missing env vars** | VITE_EMAILJS_PUBLIC_KEY no configurado | EmailJS.init() falla, console.error | Form deshabilitado, error silencioso (dev solo) |
| **Invalid email** | Regex no matchea | validateForm devuelve false | Toast: "Email inválido" |
| **Empty fields** | Usuario no completó forma | Validación client-side | Toast: "Completa todos los campos" |
| **Network error** | CORS, timeout, DNS | Promise catch | Toast: "Error de conexión, reintenta" |
| **Spam detection** | EmailJS detecta spam | 429 response | Toast: "Demasiados intentos, intenta más tarde" |
| **Browser unsupported** | Fetch no disponible | Graceful degradation (form deshabilitada) | Toast: "Tu navegador no es compatible" |

---

## 6. Definition of Done

**Criterios de aceptación (medibles):**

- ✅ **Validación:**
  - [ ] Name: required, min 1 char, max 100 chars
  - [ ] Email: required, regex /^[^@]+@[^@]+\.[^@]+$/ (simple)
  - [ ] Message: required, min 10 chars, max 5000 chars

- ✅ **Functionality:**
  - [ ] EmailJS.send() ejecuta correctamente
  - [ ] Template variables ({{from_name}}, {{from_email}}, {{message}}) sustituidas
  - [ ] Email recibido en bandeja del propietario
  - [ ] Form limpiada después de envío exitoso

- ✅ **UX/Feedback:**
  - [ ] Estado SENDING: loading spinner visible
  - [ ] Estado SUCCESS: toast verde con "Email enviado"
  - [ ] Estado ERROR: toast rojo con mensaje específico
  - [ ] Haptic feedback en mobile (focus, success, error)

- ✅ **Accessibility:**
  - [ ] Labels asociados a inputs
  - [ ] Aria-live para mensajes de error
  - [ ] Tab navigation funcional
  - [ ] Error messages descriptivos

- ✅ **Testing:**
  - [ ] Unit test: validateForm() para todos los casos
  - [ ] Integration test: form submission con EmailJS mockado
  - [ ] E2E test: usuario completa form, ve success (Playwright/Cypress)
  - [ ] Coverage: >95% para Contact.jsx

- ✅ **Performance:**
  - [ ] Form TTI (Time To Interactive) <3s
  - [ ] EmailJS response <5s (timeout fallback en 10s)
  - [ ] No bloques en main thread durante submit

- ✅ **Security:**
  - [ ] XSS: inputs sanitizados (DOMPurify si necesario)
  - [ ] CSRF: EmailJS maneja tokens
  - [ ] Env vars no expuestas en HTML
  - [ ] Rate limiting considerado (future)

---

## 7. Notas de Implementación

**Ubicación:** `src/features/contact/Contact.jsx`

**Dependencias:**
```javascript
import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVibrate } from '@hooks/useVibrate'
import Button from '@components/ui/Button'
import { fadeInUp, staggerContainer } from '@config/motionConfig'
```

**Variables de entorno requeridas:**
```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

**[INFERIDO — requiere validación]:**
- EmailJS template debe tener variables: {{from_name}}, {{from_email}}, {{message}}
- Destinatario del email configurado en EmailJS dashboard
- Rate limiting no está implementado (considera agregar si spam)

---

## 8. Test Plan (Phase 2)

### Unit Tests
```javascript
// src/features/contact/__tests__/Contact.test.jsx
test('validateForm() accepts valid data')
test('validateForm() rejects invalid email')
test('validateForm() rejects short message')
test('handleChange() updates form state')
test('handleSubmit() calls emailjs.send() on valid form')
test('Haptic feedback fires on focus, success, error')
```

### Integration Tests
```javascript
// E2E: form submission → success toast
test('Full flow: user fills form → sees success message → form resets')
```

---

**SEQ Diagram:** [SEQ-01_contact_form.puml](./SEQ-01_contact_form.puml)

**Related ADRs:**
- [ADR-003: EmailJS para contacto](../adr/ADR-003.md)

**Status:** ⏳ Ready for Phase 2 testing implementation
