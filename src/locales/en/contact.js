export default {
  badge: 'Contact',
  title: 'Let\'s Talk?',
  description: 'If you need help with data analysis or process automation, I\'d be happy to chat with you.',
  form: {
    labels: {
      name: 'Name',
      email: 'Email',
      projectType: 'Project Type',
      message: 'Message',
    },
    placeholders: {
      name: 'Your name',
      email: 'your@email.com',
      projectType: 'Select a type',
      message: 'Tell me about your project...',
    },
    projectTypes: [
      'Custom Software',
      'E-commerce',
      'Data Analysis',
      'Technical Consulting',
    ],
  },
  buttons: {
    submit: 'Send Message',
    submitting: 'Sending...',
    success: 'Sent!',
  },
  messages: {
    successTitle: 'Message Sent Successfully!',
    successDescription: 'I\'ll get back to you as soon as possible.',
    errorDefault: 'Error sending message. Please try again.',
    responseTime: 'Response time: < 24hs (ART timezone)',
  },
};
