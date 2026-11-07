export default {
  badge: 'Qué hago',
  title: '¿En qué puedo ayudarte?',
  services: [
    {
      title: 'Desarrollo Web de Alto Rendimiento',
      description: 'Aplicaciones web con React, Vite y Next.js. Arquitectura limpia, code splitting, Core Web Vitals optimizados y rendimiento medible desde el primer deploy.',
    },
    {
      title: 'E-commerce Escalable & Integraciones API',
      description: 'Tiendas online a medida con arquitectura headless. Integración con pasarelas de pago, sistemas de inventario y APIs de terceros sin depender de plataformas genéricas.',
    },
    {
      title: 'Software de Gestión a Medida',
      description: 'Desarrollo propio para PyMEs cuando ningún sistema estándar encaja: módulos de inventario, presupuestos, reportes y flujos diseñados según los procesos del negocio.',
    },
    {
      title: 'Automatización & Análisis de Datos',
      description: 'Pipelines de datos, dashboards con KPIs en tiempo real y automatización de procesos manuales para reducir errores operativos y liberar tiempo de tu equipo.',
    },
    {
      title: 'Sistemas de Gestión: Odoo y Dux',
      description: 'Te oriento sobre qué plataforma conviene y te conecto con un equipo especializado que la implementa: Odoo para empresas en crecimiento, Dux para comercios.',
      links: [{ label: 'Ver Odoo', path: 'odoo' }, { label: 'Ver Dux', path: 'dux' }],
    },
  ],
  carousel: {
    prev: 'Anterior',
    next: 'Siguiente',
    serviceIndicator: 'Ir al servicio',
  },
};
