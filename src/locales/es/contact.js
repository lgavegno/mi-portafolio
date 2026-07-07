export default {
  badge: 'Contacto',
  title: '¿Hablamos?',
  description: 'Si necesitas ayuda con análisis de datos o automatización de procesos, estaré encantado de conversar contigo.',
  form: {
    labels: {
      name: 'Nombre',
      email: 'Email',
      projectType: 'Tipo de Proyecto',
      message: 'Mensaje',
    },
    placeholders: {
      name: 'Tu nombre',
      email: 'tu@email.com',
      projectType: 'Selecciona un tipo',
      message: 'Cuéntame sobre tu proyecto...',
    },
    projectTypes: [
      'Software a Medida',
      'E-commerce',
      'Análisis de Datos',
      'Consultoría Técnica',
    ],
  },
  buttons: {
    submit: 'Enviar mensaje',
    submitting: 'Enviando...',
    success: '¡Enviado!',
  },
  messages: {
    successTitle: '¡Mensaje enviado con éxito!',
    successDescription: 'Te responderé lo antes posible.',
    errorDefault: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
    responseTime: 'Tiempo de respuesta: < 24hs (Horario de Argentina)',
  },
};
