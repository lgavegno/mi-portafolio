// src/data/projects.js
// Datos de proyectos destacados para el portafolio
import fitnessImg from '../assets/fig_clusters_ai.png'; // Importación explícita

export const featuredProjects = [
  {
    id: 'fitness-retention-analysis',
    title: 'Análisis de Retención & ML - FitNess App',
    description: 'Refactorización técnica y modelado de datos para reducir el Churn del 65% al 45%. Auditoría de integridad sobre 1,168 registros y segmentación de perfiles de riesgo mediante Clustering K-Means.',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Power BI'],
    progress: 100,
    progressLabel: 'Finalizado: Reporte de Insights entregado',
    status: 'completed',
    image: fitnessImg, // Asegúrate de mover la imagen aquí
    link: 'https://github.com/lgavegno/proyecto-fitNess-retencion', // Tu link de GitHub
    featured: true,
    category: 'ai-ml',
    highlights: ['Integridad de Datos', 'K-Means Clustering', 'Métricas DAU/MAU'],
    longDescription: 'El proyecto consistió en un análisis profundo de una base de datos de 11,600 registros con una tasa de churn inicial del 65%. Tras detectar inconsistencias masivas (89% de ruido), se realizó un proceso ETL para consolidar un dataset veraz de 1,168 usuarios. Se aplicó aprendizaje no supervisado para segmentar usuarios y predecir el abandono temprano.',
    methodology: ['Auditoría de Integridad Referencial', 'ETL & Saneamiento de Datos', 'Modelado K-Means Clustering', 'Análisis de Sticky Factor (DAU/MAU)'],
    results: ['Reducción proyectada de Churn al 45%', 'Identificación de HIIT/Fuerza como drivers de retención', 'Detección de falla de activación en el Día 0'],
    notionLink: 'https://wind-texture-7af.notion.site/FitNess-App-Estrategia-de-Retenci-n-basada-en-Datos-Machine-Learning-2fea3541aceb80598ae3d60e469ca31b'
  },
  {
    id: 'sistema-reservas',
    title: 'Sistema de Gestión de Turnos',
    description: 'Plataforma para gestión de turnos con funcionalidades de programación y seguimiento de clientes.',
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
    title: 'ERP Empresarial - Core Engine',
    description: 'Arquitectura de software para gestión de inventario y ventas desarrollada con Spring Boot. Enfoque en escalabilidad y módulos de reportes dinámicos.',
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
  ...featuredProjects
];

// Categorías de proyectos
export const projectCategories = [
  { id: 'all', label: 'Todos', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'backend', label: 'Backend', icon: '⚙️' },
  { id: 'ai-ml', label: 'Data Science / ML', icon: '🤖' }, // Refinado el label
  { id: 'automation', label: 'Automatización', icon: '🔄' }
];

export default featuredProjects;