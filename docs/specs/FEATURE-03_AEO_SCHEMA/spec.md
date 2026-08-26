FEATURE-03: AEO Schema Implementation
Spec Version: 1.0
Status: Done
Date: 2026-06-11
Related ADRs: ADR-009
Owner: Leandro Gavegno (ONGEVAG)

1. Propósito (1 oración exacta)
Implementar Answer Engine Optimization (AEO) mediante Schema.org JSON-LD y archivos específicos para posicionar el portfolio como fuente autorizada en motores de IA y búsqueda convencional.

2. Alcance
✅ Incluye
D1: Configuración de `public/robots.txt` para permitir acceso a bots de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Googlebot, Bingbot) y referencia al sitemap.
D2: Creación de `public/llms.txt` en inglés, orientado a conversión internacional, con información sobre la identidad, servicios, proyectos, contacto y alcance limitado del freelancer.
D3: Implementación de Schema.org Organization y Person en `index.html` con `areaServed: "Worldwide"`.
D4: Implementación de Schema.org ProfessionalService en `index.html` para clarificar la naturaleza de servicio como freelancer global.
D5: Integración de Schema.org SoftwareApplication en `src/pages/ProjectDetail.jsx` usando Helmet para describir cada proyecto como una aplicación entregable.
D6: Integración de Schema.org FAQPage en `src/features/services/Services.jsx` con al menos 4 preguntas orientadas a conversión internacional.
D8: Validación post-despliegue utilizando Google Rich Results Test y Schema.org Validator para asegurar correcta indexación.
✅ Incluye también (derivado de bitácora y SDD)
Actualización del dominio canónico en sitemap a `https://www.ongevag.com`.
Automatización del sitemap (`scripts/generate-sitemap.js`) para generar 27 URLs (home EN/ES, blog EN/ES, posts x6, proyectos x5 EN/ES).

❌ Excluye
D7: Implementación de Schema.org VideoObject (no hay demos embebidas).
LocalBusiness schema (descartado por señales geográficas restrictivas).
LLM-specific fine-tuning (requiere políticas privadas de cada LLM).
Variante de `llms.txt` o esquemas específicos para idiomas distintos al inglés en esta iteración inicial (Phase 2).

3. Requisitos Funcionales
| ID | Requisito | Descripción | Prioridad |
| --- | --- | --- | --- |
| FR-001 | Acceso de Bots de IA | Los bots reconocidos (GPTBot, ClaudeBot, PerplexityBot, etc.) deben poder acceder a todas las páginas del sitio según `robots.txt`. | MUST |
| FR-002 | Contexto para LLMs | El archivo `llms.txt` debe proporcionar contexto estructurado (identidad, servicios, portafolio, contacto, alcance) en inglés para facilitar su indexación por LLMs. | MUST |
| FR-003 | Datos Estructurados Estáticos | La página principal (`index.html`) debe incluir JSON-LD válido para Organization, Person y ProfessionalService con alcance internacional. | MUST |
| FR-004 | Datos Estructurados Dinámicos (Proyectos) | Las páginas de detalle de proyectos (`ProjectDetail.jsx`) deben inyectar JSON-LD para SoftwareApplication con nombre, descripción, categoría y oferta. | MUST |
| FR-005 | Datos Estructurados Preguntas Frecuentes | La página de servicios (`Services.jsx`) debe incluir JSON-LD para FAQPage con al menos 4 pares de pregunta-respuesta orientadas a conversión. | MUST |

4. Requisitos No-Funcionales
| ID | Requisito | Target |
| --- | --- | --- |
| NFR-001 | Validez de Schema | Todo el JSON-LD generado debe cumplir con la sintaxis RFC 8259 y el vocabulario de Schema.org. |
| NFR-002 | Rendimiento | La inclusión de JSON-LD no debe impactar negativamente en métricas de rendimiento como LCP, FID o CLS. Debe ser renderizado de forma síncrona en el `<head>` o asincrónicamente no bloqueante si usa Helmet. |
| NFR-003 | Mantenibilidad | La estructura de datos para JSON-LD debe ser clara y reutilizable, facilitando futuras actualizaciones o extensiones. |
| NFR-004 | Seguridad | Las propiedades del esquema deben provenir de fuentes confiables y seguras, evitando inyecciones de script. |

5. Especificación Técnica

Componentes Afectados
public/
├── robots.txt
├── llms.txt
└── sitemap.xml (generado por script)
src/
├── index.html
├── pages/
│   └── ProjectDetail.jsx
├── features/
│   └── services/
│       └── Services.jsx
└── components/
    └── ui/
        └── ShareButton.jsx (existente, usa meta de MOD-02)

API/Datos (si aplica)
// Ejemplo de estructura para JSON-LD en ProjectDetail.jsx (via Helmet)
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Nombre del Proyecto]",
  "description": "[Descripción del Proyecto]",
  "applicationCategory": "Web Application", // o "DesktopApplication", "Library", etc.
  "offers": {
    "@type": "Offer",
    "price": "0", // o "Consultar" si es un caso de estudio
    "priceCurrency": "USD"
  }
}

Flujos Principales
Flujo A: Indexación por Bot de IA: Un bot como ClaudeBot visita el sitio -> Lee `robots.txt` y obtiene permiso -> Extrae contexto de `llms.txt` -> Lee JSON-LD en las páginas relevantes -> Incluye la información en su conocimiento o contexto para futuras consultas.
Flujo B: Indexación de Contenido de Proyecto: Google Bot visita una página de proyecto -> Lee el JSON-LD `SoftwareApplication` -> Indexa el proyecto como una entidad de aplicación en su Knowledge Graph -> Potencialmente muestra un rich snippet en los resultados de búsqueda.
Flujo C: Generación de Sitemap Automático: En el proceso de build, se ejecuta `scripts/generate-sitemap.js` -> Se recopilan URLs válidas (home, blog, posts, proyectos EN/ES) -> Se genera `public/sitemap.xml` -> Se referencia en `robots.txt`.

6. Criterios de Aceptación
[ ] Archivo `public/robots.txt` actualizado con reglas para bots de IA y referencia al sitemap.
[ ] Archivo `public/llms.txt` creado en inglés con la estructura definida (identidad, servicios, portafolio, contacto, alcance).
[ ] JSON-LD de Organization, Person y ProfessionalService presente y válido en `index.html`.
[ ] JSON-LD de SoftwareApplication generado dinámicamente y correctamente en cada `ProjectDetail.jsx` vía Helmet.
[ ] JSON-LD de FAQPage presente y válido en `Services.jsx`.
[ ] Script de generación de sitemap (`scripts/generate-sitemap.js`) actualizado y funcional, generando `sitemap.xml` con 27 URLs.
[ ] Dominio canónico en sitemap actualizado a `https://www.ongevag.com`.
[ ] Validación exitosa con Google Rich Results Test (al menos 1 tipo de rich result habilitado, ej. FAQPage o SoftwareApplication).
[ ] Validación exitosa con Schema.org Validator (todos los tipos de esquema cumplen con la especificación).
[ ] Tests de integración (si aplica) cubren la generación de esquemas dinámicos.
[ ] Documentación actualizada (SDD_MASTER, posiblemente nuevos módulos en specs/FEATURE-03/).
[ ] Build y despliegue exitosos sin errores introducidos por la nueva funcionalidad.

7. Consideraciones Especiales
Accesibilidad
La inclusión de Schema.org no afecta directamente la accesibilidad web para usuarios humanos, pero puede mejorar indirectamente la visibilidad del contenido para tecnologías de asistividade si mejora la indexación general.
Performance
Los esquemas JSON-LD estáticos en `index.html` tienen costo cero en tiempo de ejecución. Los dinámicos vía Helmet en `ProjectDetail.jsx` deben renderizarse asincrónicamente y no bloquear la renderización principal para no afectar LCP/FID/CLS.
Seguridad
Asegurar que los datos utilizados para poblar los esquemas JSON-LD provengan de fuentes confiables y no permitan inyección de scripts maliciosos. DOMPurify ya está en uso y actualizado (ver bitácora).
Internacionalización (i18n)
Actualmente, el esquema se define principalmente en inglés (`llms.txt`, `areaServed: "Worldwide"`). Estrategias de i18n para esquemas específicos (ej. variantes de `llms.txt.es`) se considerarán en una fase posterior (Phase 2).

8. Referencias
[ADR-009](../docs/adr/ADR-009.md): Decisión sobre el uso de Schema JSON-LD global.
[MOD-03_AEO_SCHEMA.md](../docs/specs/FEATURE-03/mod-03_aeo-schema.md): Documento de módulo original con detalles de diseño.
[MOD-02_SEO_METATAGS.md](../docs/specs/FEATURE-02/mod-02_seo-metatags.md): Base de metatags SEO (dependencia).
[Schema.org Vocabulary](https://schema.org/): Referencia oficial para tipos y propiedades de esquema.
[Google Rich Results Guide](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data): Documentación de Google sobre datos estructurados.
[BITACORA_TECNICA.md](../docs/BITACORA_TECNICA.md): Registro de decisiones técnicas, incluyendo automatización del sitemap.
[SDD_MASTER.md](../docs/SDD_MASTER.md): Índice central del proyecto.

Próximo paso: Crear plan.md con desglose de tasks