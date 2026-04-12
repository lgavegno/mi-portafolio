// src/data/projects.js
// Datos de proyectos destacados para el portafolio
import fitnessImg from '../assets/fig_clusters_ai.png';
import omnistock1Img from '../assets/omnistock1.webp';
import omnistock2Img from '../assets/omnistock2.webp';
import faroart1Img from '../assets/faroart1.webp';
import faroart2Img from '../assets/faroart2.webp';
import generador1Img from '../assets/generador1.webp';
import generador2Img from '../assets/generador2.webp';

export const featuredProjects = [
  {
    id: 'fitness-retention-analysis',
    title: 'Análisis de Retención & ML - FitNess App',
    description: 'Refactorización técnica y modelado de datos para reducir el Churn del 65% al 45%. Auditoría de integridad sobre 1,168 registros y segmentación de perfiles de riesgo mediante Clustering K-Means.',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Power BI'],
    progress: 100,
    progressLabel: 'Finalizado: Reporte de Insights entregado',
    status: 'completed',
    image: fitnessImg,
    link: 'https://github.com/lgavegno/proyecto-fitNess-retencion',
    featured: true,
    category: 'ai-ml',
    highlights: ['Integridad de Datos', 'K-Means Clustering', 'Métricas DAU/MAU'],
    longDescription: 'El proyecto consistió en un análisis profundo de una base de datos de 11,600 registros con una tasa de churn inicial del 65%. Tras detectar inconsistencias masivas (89% de ruido), se realizó un proceso ETL para consolidar un dataset veraz de 1,168 usuarios. Se aplicó aprendizaje no supervisado para segmentar usuarios y predecir el abandono temprano.',
    methodology: ['Auditoría de Integridad Referencial', 'ETL & Saneamiento de Datos', 'Modelado K-Means Clustering', 'Análisis de Sticky Factor (DAU/MAU)'],
    results: ['Reducción proyectada de Churn al 45%', 'Identificación de HIIT/Fuerza como drivers de retención', 'Detección de falla de activación en el Día 0'],
    notionLink: 'https://wind-texture-7af.notion.site/FitNess-App-Estrategia-de-Retenci-n-basada-en-Datos-Machine-Learning-2fea3541aceb80598ae3d60e469ca31b'
  },
  {
    id: 'omnistock',
    title: 'OmniStock — Sistema de Inventario Desktop',
    description: 'Aplicación desktop para control de stock, presupuestos, proveedores, recetas y auditoría interna. Arquitectura offline-first con base de datos local SQLite.',
    stack: ['Tauri', 'React', 'Rust', 'SQLite', 'TypeScript'],
    progress: 70,
    progressLabel: 'En desarrollo activo — v2.0 alpha',
    status: 'in-progress',
    image: omnistock1Img,
    link: null,
    featured: true,
    category: 'fullstack',
    highlights: ['App nativa cross-platform', 'Offline-first con SQLite', 'Software comercial con licenciamiento HWID'],
    longDescription: 'Sistema de inventario y gestión comercial para PyMEs desarrollado con Tauri. Permite control de stock, punto de venta, presupuestos, gestión de proveedores, recetas BOM y auditoría interna. Funciona 100% offline con base de datos SQLite local. Producto comercial en desarrollo activo bajo metodología SDD.',
    methodology: ['Spec-Driven Development (SDD)', 'Arquitectura modular por bloques lógicos', 'Testing unitario en Rust', 'Licenciamiento por HWID'],
    results: ['App nativa para Windows, macOS y Linux', 'Módulos: POS, Inventario, Presupuestos, Proveedores, Recetas & BOM', 'Producto listo para comercialización en MercadoLibre'],
    notionLink: null
  },
  {
    id: 'faro-art-shop',
    title: 'Faro Art Shop — Tienda Online',
    description: 'Tienda e-commerce de kits de String Art. Setup completo en Tienda Nube con dominio propio, CSS personalizado y optimización de conversión.',
    stack: ['Tienda Nube', 'CSS3', 'Hostinger DNS', 'MercadoPago'],
    progress: 100,
    progressLabel: 'Finalizado: Tienda en producción con ventas activas',
    status: 'completed',
    image: faroart1Img,
    link: 'https://faroartshop.com',
    linkLabel: 'Ver tienda online',
    featured: true,
    category: 'frontend',
    highlights: ['Tienda en producción con ventas activas', 'Dominio propio configurado', 'CSS personalizado sobre Tienda Nube'],
    longDescription: 'Diseño, configuración y lanzamiento de tienda online en Tienda Nube para venta de kits de String Art artesanales. Incluye customización completa del tema via CSS editor avanzado, configuración DNS con Hostinger para dominio propio, optimización de fichas de producto y configuración de MercadoPago como pasarela de pago.',
    methodology: ['Setup completo en Tienda Nube', 'Customización CSS avanzada', 'Configuración DNS y dominio propio', 'Optimización de conversión'],
    results: ['Tienda operativa en faroartshop.com', 'Integración MercadoPago funcionando', 'Dominio propio con SSL activo'],
    notionLink: null
  },
  {
    id: 'generador-presupuestos',
    title: 'Generador de Presupuestos Web',
    description: 'Herramienta para cotizaciones de proyectos web en tiempo real. Backend serverless con Google Apps Script, almacenamiento en Google Sheets y notificaciones por email.',
    stack: ['Vanilla JS', 'Google Apps Script', 'Google Sheets API', 'HTML5', 'CSS3'],
    progress: 100,
    progressLabel: 'Finalizado: En producción — v2.2.0',
    status: 'completed',
    image: generador1Img,
    link: 'https://lgavegno.github.io/generador-presupuestos/presupuestador/',
    featured: true,
    category: 'fullstack',
    highlights: ['Infraestructura $0/mes — serverless', 'Flujo automático a Google Sheets', 'Modo proyecto a medida con derivación'],
    longDescription: 'Calculadora de presupuestos para servicios de desarrollo web. El cliente configura tipo de sitio, secciones y funcionalidades premium — el sistema calcula el precio en tiempo real, envía los datos a Google Apps Script y notifica al propietario por email. Incluye modo especial para proyectos a medida que deriva automáticamente a entrevista técnica.',
    methodology: ['Spec-Driven Development (SDD)', 'Arquitectura serverless sin backend propio', 'Google Apps Script como webhook', 'Google Sheets como base de datos'],
    results: ['Infraestructura a $0/mes usando servicios Google gratuitos', 'Notificaciones automáticas por email al propietario', 'Documentación técnica completa en /docs del repositorio'],
    notionLink: null
  },
  {
    id: 'form-invent',
    title: 'form-invent — Sistema de Inventario Excel',
    description: 'Sistema de inventario comercial en Excel con VBA. Control de entradas, salidas, stock en tiempo real y dashboard con filtros por mes. Producto a la venta en MercadoLibre.',
    stack: ['Excel', 'VBA', 'Macros', 'Dashboard'],
    progress: 100,
    progressLabel: 'Finalizado: Disponible en MercadoLibre',
    status: 'completed',
    image: null,
    link: null,
    featured: true,
    category: 'tools',
    highlights: ['Sistema completo con macros VBA', 'Dashboard con filtros dinámicos por mes', 'Producto comercial en MercadoLibre'],
    longDescription: 'Sistema de inventario desarrollado en Excel con macros VBA para PyMEs que no requieren software especializado. Incluye módulos de entradas y salidas de stock, validaciones automáticas, dashboard con filtros dinámicos por mes y bloqueo de productos inactivos. Comercializado como producto digital en MercadoLibre.',
    methodology: ['Desarrollo en Excel + VBA puro', 'Arquitectura con tablas estructuradas (tbl_Stock)', 'Fórmulas SUMAR.SI.CONJUNTO para reportes', 'Testing manual exhaustivo'],
    results: ['Control completo de inventario sin software adicional', 'Dashboard mensual con filtros dinámicos', 'Producto listo para venta en MercadoLibre'],
    notionLink: null
  }
];

export const allProjects = [
  ...featuredProjects
];

// Categorías de proyectos
export const projectCategories = [
  { id: 'all', label: 'Todos', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'ai-ml', label: 'Data Science / ML', icon: '🤖' },
  { id: 'tools', label: 'Herramientas', icon: '🔧' }
];

export default featuredProjects;