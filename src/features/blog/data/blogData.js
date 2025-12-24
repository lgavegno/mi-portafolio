// src/features/blog/data/blogData.js
// Datos de artículos del blog

export const blogPosts = [
  {
    id: 'real-time-data-python',
    title: 'Análisis de datos en tiempo real con Python',
    excerpt: 'Cómo implementar pipelines de streaming con Apache Kafka y pandas para procesar millones de eventos por segundo.',
    category: 'Data Engineering',
    readTime: 8,
    date: '2024-12-20',
    image: null,
    tags: ['Python', 'Kafka', 'Streaming', 'pandas'],
    featured: true,
    slug: 'analisis-datos-tiempo-real-python'
  },
  {
    id: 'spring-boot-automation',
    title: 'Automatización de procesos con Spring Boot',
    excerpt: 'Arquitectura de microservicios para automatizar workflows empresariales con Spring Boot y RabbitMQ.',
    category: 'Backend',
    readTime: 12,
    date: '2024-12-15',
    image: null,
    tags: ['Java', 'Spring Boot', 'Microservices', 'RabbitMQ'],
    featured: true,
    slug: 'automatizacion-procesos-spring-boot'
  },
  {
    id: 'erp-query-optimization',
    title: 'Optimización de queries en ERP de alto volumen',
    excerpt: 'Técnicas avanzadas de indexación y query tuning para sistemas ERP que manejan millones de transacciones.',
    category: 'Performance',
    readTime: 10,
    date: '2024-12-10',
    image: null,
    tags: ['SQL', 'PostgreSQL', 'Performance', 'ERP'],
    featured: true,
    slug: 'optimizacion-queries-erp-alto-volumen'
  },
  {
    id: 'react-performance-2025',
    title: 'React Performance: Guía definitiva 2025',
    excerpt: 'Code splitting, lazy loading, y micro-interacciones que mejoran la percepción de velocidad.',
    category: 'Frontend',
    readTime: 15,
    date: '2024-12-05',
    image: null,
    tags: ['React', 'Performance', 'Vite', 'Framer Motion'],
    featured: false,
    slug: 'react-performance-guia-2025'
  }
];

export const featuredPosts = blogPosts.filter(post => post.featured);

export const categories = [
  { id: 'all', label: 'Todos', count: blogPosts.length },
  { id: 'data-engineering', label: 'Data Engineering', count: 1 },
  { id: 'backend', label: 'Backend', count: 1 },
  { id: 'performance', label: 'Performance', count: 1 },
  { id: 'frontend', label: 'Frontend', count: 1 },
];

export default blogPosts;
