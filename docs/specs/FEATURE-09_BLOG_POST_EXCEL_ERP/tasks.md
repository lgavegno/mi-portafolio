# FEATURE-09: Blog Post — Integración Excel + ERP — Task Breakdown

**Formato:** Cada T-XX representa una tarea atómica de entre 30 minutos y 1 hora de trabajo.

---

# Fase A — Investigación y Diseño Editorial

### T-01: Analizar el proyecto realizado

**Effort:** 0.5h

**Dependencies:** Ninguna

**Acceptance Criteria:**

* [ ] Comprendido el flujo completo del proyecto.
* [ ] Identificados los puntos de mayor valor para el lector.
* [ ] Definido el objetivo principal del artículo.

**Subtasks:**

1. Revisar documentación existente.
2. Identificar el problema original.
3. Definir el mensaje principal.

**Notas:**

* El foco debe estar en el problema de negocio, no en Excel.

---

### T-02: Identificar problemas de negocio

**Effort:** 0.5h

**Dependencies:** T-01

**Acceptance Criteria:**

* [ ] Problemas listados.
* [ ] Impacto sobre el cliente identificado.
* [ ] Beneficios cuantificados cuando sea posible.

**Subtasks:**

1. Documentar proceso manual.
2. Detectar cuellos de botella.
3. Priorizar problemas.

---

### T-03: Seleccionar decisiones técnicas relevantes

**Effort:** 0.5h

**Dependencies:** T-02

**Acceptance Criteria:**

* [ ] Solo permanecen decisiones con valor para el lector.
* [ ] Eliminados detalles innecesarios.
* [ ] Lenguaje accesible.

**Subtasks:**

1. Seleccionar desafíos técnicos.
2. Traducirlos a lenguaje comprensible.
3. Eliminar jerga innecesaria.

---

### T-04: Diseñar el storytelling

**Effort:** 0.5h

**Dependencies:** T-03

**Acceptance Criteria:**

* [ ] Estructura narrativa definida.
* [ ] Flujo lógico validado.
* [ ] CTA identificado.

**Subtasks:**

1. Problema.
2. Solución.
3. Resultados.
4. Aprendizajes.

---

### T-05: Auditoría de anonimización

**Effort:** 0.5h

**Dependencies:** T-04

**Acceptance Criteria:**

* [ ] No existen nombres del cliente.
* [ ] No existen APIs reales.
* [ ] No existen endpoints.
* [ ] No existen credenciales.
* [ ] No existen capturas sensibles.

**Subtasks:**

1. Revisar nombres.
2. Revisar ejemplos.
3. Revisar imágenes.
4. Revisar código.

---

# Fase B — Redacción del Caso de Estudio

### T-06: Redactar introducción

**Effort:** 0.5h

**Dependencies:** T-05

**Acceptance Criteria:**

* [ ] Hook inicial atractivo.
* [ ] Problema explicado en menos de tres párrafos.

---

### T-07: Explicar el problema inicial

**Effort:** 0.5h

**Dependencies:** T-06

**Acceptance Criteria:**

* [ ] El lector comprende el contexto.
* [ ] Se explica por qué la solución era necesaria.

---

### T-08: Describir la arquitectura

**Effort:** 0.5h

**Dependencies:** T-07

**Acceptance Criteria:**

* [ ] Arquitectura explicada sin código propietario.
* [ ] Flujo fácilmente entendible.

---

### T-09: Documentar desafíos técnicos

**Effort:** 0.5h

**Dependencies:** T-08

**Acceptance Criteria:**

* [ ] Explicados los principales obstáculos.
* [ ] Explicadas las decisiones tomadas.

---

### T-10: Documentar resultados

**Effort:** 0.5h

**Dependencies:** T-09

**Acceptance Criteria:**

* [ ] Beneficios claros.
* [ ] Valor de negocio demostrado.

---

### T-11: Redactar conclusiones

**Effort:** 0.5h

**Dependencies:** T-10

**Acceptance Criteria:**

* [ ] Aprendizajes resumidos.
* [ ] Mensaje final consistente.

---

### T-12: Incorporar CTA

**Effort:** 0.5h

**Dependencies:** T-11

**Acceptance Criteria:**

* [ ] CTA profesional.
* [ ] No invasivo.
* [ ] Orientado a empresas.

---

# Fase C — Integración al Portfolio

### T-13: Crear entrada del Blog

**Effort:** 0.5h

**Dependencies:** T-12

**Acceptance Criteria:**

* [ ] Entrada creada en `blogData.es.js`.
* [ ] Slug registrado.

---

### T-14: Agregar SEO

**Effort:** 0.5h

**Dependencies:** T-13

**Acceptance Criteria:**

* [ ] Title.
* [ ] Description.
* [ ] Keywords.
* [ ] OpenGraph.

---

### T-15: Verificar navegación

**Effort:** 0.5h

**Dependencies:** T-14

**Acceptance Criteria:**

* [ ] Link correcto.
* [ ] Slug correcto.
* [ ] Breadcrumb correcto.

---

### T-16: Revisar Responsive

**Effort:** 0.5h

**Dependencies:** T-15

**Acceptance Criteria:**

* [ ] Desktop.
* [ ] Tablet.
* [ ] Mobile.

---

### T-17: Validar Performance

**Effort:** 0.5h

**Dependencies:** T-16

**Acceptance Criteria:**

* [ ] No aumenta el bundle.
* [ ] Lighthouse sin regresiones.

---

# Fase D — QA Editorial y Publicación

### T-18: Corrección ortográfica

**Effort:** 0.5h

**Dependencies:** T-17

**Acceptance Criteria:**

* [ ] Sin errores ortográficos.
* [ ] Consistencia de estilo.

---

### T-19: Revisión técnica

**Effort:** 0.5h

**Dependencies:** T-18

**Acceptance Criteria:**

* [ ] Exactitud técnica.
* [ ] Terminología consistente.

---

### T-20: Auditoría de confidencialidad

**Effort:** 0.5h

**Dependencies:** T-19

**Acceptance Criteria:**

* [ ] No existe información sensible.
* [ ] No existen referencias identificables.

---

### T-21: Validación SEO

**Effort:** 0.5h

**Dependencies:** T-20

**Acceptance Criteria:**

* [ ] Meta tags completas.
* [ ] Heading hierarchy correcta.
* [ ] Longitud adecuada.

---

### T-22: QA visual

**Effort:** 0.5h

**Dependencies:** T-21

**Acceptance Criteria:**

* [ ] Imágenes correctas.
* [ ] Espaciado correcto.
* [ ] Código renderiza correctamente.

---

### T-23: Merge y cierre

**Effort:** 0.5h

**Dependencies:** T-22

**Acceptance Criteria:**

* [ ] Documentación actualizada.
* [ ] PR aprobado.
* [ ] Merge a `develop`.
* [ ] Entrada agregada a `BITACORA_TECNICA.md`.

---

# Estado Tracking

| Task | Status       | Effort Actual | Blocker | Notes |
| ---- | ------------ | ------------- | ------- | ----- |
| T-01 | ✅ Done      | 0.5h          | —       | Realizado por Ongevag directamente |
| T-02 | ✅ Done      | 0.5h          | T-01    | Realizado por Ongevag directamente |
| T-03 | ✅ Done      | 0.5h          | T-02    | Realizado por Ongevag directamente |
| T-04 | ✅ Done      | 0.5h          | T-03    | Realizado por Ongevag directamente |
| T-05 | ✅ Done      | 0.5h          | T-04    | Auditoría aprobada — sin datos sensibles |
| T-06 | ✅ Done      | 0.5h          | T-05    | Contenido redactado y aprobado por Ongevag |
| T-07 | ✅ Done      | 0.5h          | T-06    | Contenido redactado y aprobado por Ongevag |
| T-08 | ✅ Done      | 0.5h          | T-07    | Contenido redactado y aprobado por Ongevag |
| T-09 | ✅ Done      | 0.5h          | T-08    | Contenido redactado y aprobado por Ongevag |
| T-10 | ✅ Done      | 0.5h          | T-09    | Contenido redactado y aprobado por Ongevag |
| T-11 | ✅ Done      | 0.5h          | T-10    | Contenido redactado y aprobado por Ongevag |
| T-12 | ✅ Done      | 0.5h          | T-11    | CTA incorporado al final del artículo |
| T-13 | ✅ Done      | 0.5h          | T-12    | Entrada creada en blogData.es.js, blogData.en.js y blogData.pt.js |
| T-14 | ✅ Done      | —             | T-13    | SEO heredado de la arquitectura existente (title, excerpt, slug, category, tags) |
| T-15 | ✅ Done      | —             | T-14    | Slug verificado: igual en los tres locales — node verify OK |
| T-16 | ⏳ Pending   | —             | T-15    | Revisión visual pendiente (Ongevag) |
| T-17 | ⏳ Pending   | —             | T-16    | Lighthouse pendiente post-revisión |
| T-18 | ⏳ Pending   | —             | T-17    | —     |
| T-19 | ⏳ Pending   | —             | T-18    | —     |
| T-20 | ⏳ Pending   | —             | T-19    | —     |
| T-21 | ⏳ Pending   | —             | T-20    | —     |
| T-22 | ⏳ Pending   | —             | T-21    | —     |
| T-23 | ⏳ Pending   | —             | T-22    | —     |

---

**Próximo paso:** Comenzar la Fase A ejecutando T-01 y avanzar secuencialmente hasta completar la publicación del caso de estudio.
