export default {
  badge: 'What I Do',
  title: 'How Can I Help You?',
  services: [
    {
      title: 'High-Performance Web Development',
      description: 'Web applications with React, Vite, and Next.js. Clean architecture, code splitting, optimized Core Web Vitals, and measurable performance from your first deploy.',
    },
    {
      title: 'Scalable E-commerce & API Integrations',
      description: 'Custom online stores with headless architecture. Integration with payment gateways, inventory systems, and third-party APIs without relying on generic platforms.',
    },
    {
      title: 'Custom Management Software',
      description: 'Custom development for SMBs when no standard system fits: inventory modules, quotes, reports, and workflows designed around your business processes.',
    },
    {
      title: 'Data Automation & Analytics',
      description: 'Data pipelines, real-time KPI dashboards, and process automation to reduce operational errors and free up your team\'s time.',
    },
    {
      title: 'Management Systems: Odoo & Dux',
      description: 'I advise you on which platform fits and connect you with a specialized team that implements it: Odoo for growing companies, Dux for retail stores.',
      links: [{ label: 'See Odoo', path: 'odoo' }, { label: 'See Dux', path: 'dux' }],
    },
  ],
  carousel: {
    prev: 'Previous',
    next: 'Next',
    serviceIndicator: 'Go to service',
  },
};
