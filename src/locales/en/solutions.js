// FEATURE-12 — Management systems (Odoo / Dux). UI strings.
// Slide content lives in src/features/solutions/data/slides.en.js (ADR-015).
export default {
  doors: {
    heading: 'Does your business need a management system?',
    lead: 'I guide you and connect you with a specialized team that implements it.',
    dux: {
      question: 'Do you run a store?',
      product: 'Dux',
      pitch: 'Invoicing, stock and online sales in days.',
      cta: 'See presentation',
    },
    odoo: {
      question: 'Distributor, manufacturer or growing company?',
      product: 'Odoo',
      pitch: 'Your whole operation on one platform.',
      cta: 'See presentation',
    },
    whatsappAria: 'Ask about {product} on WhatsApp (opens in a new tab)',
  },
  section: {
    badge: 'Management systems',
    title: 'Management systems for your business',
    lead: 'You tell me what you need. A specialized team implements it.',
    switchLabel: 'Choose a presentation',
    switch: { odoo: 'Odoo', dux: 'Dux' },
    loading: 'Loading presentation…',
  },
  carousel: {
    roleDescription: 'presentation',
    slideRoleDescription: 'chapter',
    chaptersLabel: 'Chapters',
    prev: 'Previous chapter',
    next: 'Next chapter',
    progress: 'Chapter {current} of {total}',
    slideLabel: '{current} of {total}: {chapter}',
    exampleData: 'Sample data for illustration.',
    sourceLabel: 'Source',
    goToOdoo: 'See the Odoo presentation',
    goToDux: 'See the Dux presentation',
  },
  whatsapp: {
    cta: 'Ask on WhatsApp',
    ariaLabel: 'Ask on WhatsApp (opens in a new tab)',
    messageSlide: "Hi Leo, I saw the {product} presentation on ongevag.com and I'd like to ask about it. (ref: {ref})",
    messageDoor: "Hi Leo, I saw the {product} option on ongevag.com and I'd like to ask about it. (ref: {ref})",
  },
  pages: {
    backHome: 'See all ONGEVAG services',
    odoo: {
      h1: 'Odoo: your whole operation on one platform',
      intro: 'For distributors, manufacturers and growing companies. I guide you and connect you with a specialized team that implements it.',
      meta: {
        title: 'Odoo for growing companies — ONGEVAG',
        description: 'Sales, stock, purchasing, manufacturing and accounting on one platform. I guide you on Odoo and connect you with a specialized team that implements it.',
        ogTitle: 'Odoo for growing companies — ONGEVAG',
        ogDescription: 'Your whole operation on one platform. First conversation, no strings attached, on WhatsApp.',
      },
    },
    dux: {
      h1: 'Dux: your store organized in days',
      intro: 'For stores and small businesses selling in person and online. I advise you and connect you with the team that implements it.',
      meta: {
        title: 'Dux for retail stores — ONGEVAG',
        description: 'Electronic invoicing, real-time stock, point of sale and connected online sales. I advise you on Dux and connect you with the team that implements it.',
        ogTitle: 'Dux for retail stores — ONGEVAG',
        ogDescription: 'Invoicing, stock and online sales in days. First conversation, no strings attached, on WhatsApp.',
      },
    },
  },
  disclaimer: 'Odoo and Dux are trademarks of their respective owners. ONGEVAG is not an official partner: I guide you and connect you with a specialized team that carries out the implementation.',
};
