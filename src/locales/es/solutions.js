// FEATURE-12 — Sistemas de gestión (Odoo / Dux). Strings de UI.
// El contenido de los slides vive en src/features/solutions/data/slides.es.js (ADR-015).
export default {
  doors: {
    heading: '¿Tu empresa necesita un sistema de gestión?',
    lead: 'Te oriento y te conecto con un equipo especializado que lo implementa.',
    dux: {
      question: '¿Tenés un comercio?',
      product: 'Dux',
      pitch: 'Facturación, stock y ventas online en días.',
      cta: 'Ver presentación',
    },
    odoo: {
      question: '¿Distribuidora, industria o empresa en crecimiento?',
      product: 'Odoo',
      pitch: 'Toda la operación en una plataforma.',
      cta: 'Ver presentación',
    },
    whatsappAria: 'Consultar por WhatsApp sobre {product} (se abre en una pestaña nueva)',
  },
  section: {
    badge: 'Sistemas de gestión',
    title: 'Sistemas de gestión para tu empresa',
    lead: 'Vos me contás qué necesitás. Un equipo especializado lo implementa.',
    switchLabel: 'Elegí una presentación',
    switch: { odoo: 'Odoo', dux: 'Dux' },
    loading: 'Cargando presentación…',
  },
  carousel: {
    roleDescription: 'presentación',
    slideRoleDescription: 'capítulo',
    chaptersLabel: 'Capítulos',
    prev: 'Capítulo anterior',
    next: 'Capítulo siguiente',
    progress: 'Capítulo {current} de {total}',
    slideLabel: '{current} de {total}: {chapter}',
    exampleData: 'Datos de ejemplo para ilustrar.',
    sourceLabel: 'Fuente',
    goToOdoo: 'Ver presentación de Odoo',
    goToDux: 'Ver presentación de Dux',
  },
  whatsapp: {
    cta: 'Consultar por WhatsApp',
    ariaLabel: 'Consultar por WhatsApp (se abre en una pestaña nueva)',
    messageSlide: 'Hola Leo, vi la presentación de {product} en ongevag.com y quiero consultar. (ref: {ref})',
    messageDoor: 'Hola Leo, vi en ongevag.com la opción de {product} y quiero consultar. (ref: {ref})',
  },
  pages: {
    backHome: 'Ver todos los servicios de ONGEVAG',
    odoo: {
      h1: 'Odoo: toda la operación en una plataforma',
      intro: 'Para distribuidoras, industrias y empresas en crecimiento. Te oriento y te conecto con un equipo especializado que lo implementa.',
      meta: {
        title: 'Odoo para empresas en crecimiento — ONGEVAG',
        description: 'Ventas, stock, compras, producción y contabilidad en una sola plataforma. Te oriento sobre Odoo y te conecto con un equipo especializado que lo implementa.',
        ogTitle: 'Odoo para empresas en crecimiento — ONGEVAG',
        ogDescription: 'Toda la operación de tu empresa en una plataforma. Primera charla sin compromiso por WhatsApp.',
      },
    },
    dux: {
      h1: 'Dux: tu comercio ordenado en días',
      intro: 'Para comercios y pymes que venden en mostrador y online. Te asesoro y te conecto con el equipo que lo implementa.',
      meta: {
        title: 'Dux para comercios — ONGEVAG',
        description: 'Facturación electrónica, stock en tiempo real, punto de venta y ventas online conectadas. Te asesoro sobre Dux y te conecto con el equipo que lo implementa.',
        ogTitle: 'Dux para comercios — ONGEVAG',
        ogDescription: 'Facturación, stock y ventas online en días. Primera charla sin compromiso por WhatsApp.',
      },
    },
  },
  disclaimer: 'Odoo y Dux son marcas de sus respectivos titulares. ONGEVAG no es partner oficial: te oriento y te conecto con un equipo especializado que realiza la implementación.',
};
