// src/data/projects.js
// Datos de proyectos destacados para el portafolio

export const featuredProjects = [
  {
    id: 'sistema-reservas',
    title: 'Sistema de Gestión de Turnos',
    description: 'Plataforma para gestión de turnos con funcionalidades básicas de programación y seguimiento de clientes.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    progress: 75,
    progressLabel: 'En desarrollo: Integración de notificaciones',
    status: 'in-progress',
    image: null,
    link: '#',
    featured: true,
    category: 'fullstack'
  },
  {
    id: 'sistema-gestion',
    title: 'Sistema de Gestión Empresarial (ERP) – Proyecto de Aprendizaje',
    description: 'Sistema de gestión básico desarrollado con Java y Spring Boot para aprender sobre arquitectura de software. Incluye módulos para gestión de inventario, ventas y reportes simples.',
    stack: ['Java', 'Spring Boot', 'JavaFX', 'MySQL'],
    progress: 60,
    progressLabel: 'En desarrollo: Mejora de reportes',
    status: 'in-progress',
    image: null,
    link: '#',
    featured: true,
    category: 'backend'
  },
  {
    id: 'procesamiento-documentos',
    title: 'Procesamiento de Documentos con OCR',
    description: 'Herramienta para extraer información de documentos financieros usando reconocimiento óptico de caracteres.',
    stack: ['Python', 'OpenCV', 'Tesseract'],
    progress: 50,
    progressLabel: 'En desarrollo: Mejora de precisión',
    status: 'in-progress',
    image: null,
    link: '#',
    featured: true,
    category: 'ai-ml'
  }
];

export const allProjects = [
  ...featuredProjects,
  // Proyectos adicionales pueden ir aquí
];

// Categorías de proyectos
export const projectCategories = [
  { id: 'all', label: 'Todos', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'backend', label: 'Backend', icon: '⚙️' },
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'ai-ml', label: 'AI/ML', icon: '🤖' },
  { id: 'automation', label: 'Automatización', icon: '🔄' }
];

export default featuredProjects;
