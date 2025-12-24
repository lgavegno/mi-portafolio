// src/data/projects.js
// Datos de proyectos destacados para el portafolio

export const featuredProjects = [
  {
    id: 'smart-booking',
    title: 'Smart-Booking Engine & Revenue Optimizer',
    description: 'Sistema de optimización de ingresos para negocios de estética con reservas inteligentes y analítica predictiva.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'TensorFlow'],
    progress: 75,
    progressLabel: 'Fase de integración: Pasarela + Analítica predictiva',
    status: 'in-progress',
    image: null, // Añadir imagen cuando esté disponible
    link: '#',
    featured: true,
    category: 'fullstack'
  },
  {
    id: 'enterprise-erp',
    title: 'Enterprise Resource Architect: Java Ecosystem',
    description: 'ERP robusto con Spring Boot para escalabilidad empresarial, gestión de recursos y reportes en tiempo real.',
    stack: ['Java', 'Spring Boot', 'JavaFX', 'MySQL'],
    progress: 60,
    progressLabel: 'Refactorización: Módulos core + Queries concurrentes',
    status: 'in-progress',
    image: null,
    link: '#',
    featured: true,
    category: 'backend'
  },
  {
    id: 'financial-ocr',
    title: 'Automated Financial Data Extraction (OCR & NLP)',
    description: 'Extractor de datos financieros que elimina error humano mediante visión por computadora y procesamiento de lenguaje natural.',
    stack: ['Python', 'OpenCV', 'Tesseract', 'spaCy'],
    progress: 50,
    progressLabel: 'Entrenamiento del modelo + Normalización CSV/JSON',
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
